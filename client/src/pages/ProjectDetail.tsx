import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { apiUrl } from '../api'

interface Project {
  id: number
  title: string
  description: string
  url: string
}

export default function ProjectDetail() {
  const { id } = useParams()
  const [project, setProject] = useState<Project | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setIsLoading(true)
    fetch(apiUrl('/api/projects'))
      .then(res => res.json())
      .then(data => {
        const found = data.projects.find((p: Project) => String(p.id) === String(id))
        setProject(found || null)
      })
      .finally(() => setIsLoading(false))
  }, [id])

  if (isLoading) {
    return (
      <div className="section animate-pulse">
        <div className="h-3 w-24 rounded bg-surface-3" />
        <div className="mt-5 h-6 w-1/2 rounded bg-surface-3" />
        <div className="mt-4 h-3 w-full rounded bg-surface-3" />
        <div className="mt-2 h-3 w-4/5 rounded bg-surface-3" />
      </div>
    )
  }

  if (!project) {
    return (
      <div className="section space-y-4">
        <p className="text-body">Project not found.</p>
        <Link to="/projects" className="btn-outline w-fit">
          ← Back to projects
        </Link>
      </div>
    )
  }

  return (
    <section className="section">
      <Link
        to="/projects"
        className="cursor-pointer inline-block text-sm text-muted transition-colors duration-200 hover:text-accent2"
      >
        ← Back to projects
      </Link>
      <h2 className="mt-4 font-heading text-2xl font-bold text-ink">{project.title}</h2>
      <p className="mt-4 leading-relaxed text-body">{project.description}</p>
      {project.url && (
        <a
          href={project.url}
          target="_blank"
          rel="noreferrer"
          className="btn-primary mt-6 inline-flex"
        >
          Visit project ↗
        </a>
      )}
    </section>
  )
}
