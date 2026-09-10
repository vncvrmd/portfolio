import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { apiUrl } from '../api'

interface Project {
  id: number
  title: string
  description: string
  url: string
  imageUrl: string
  techStack: string[] | null
}

export default function ProjectDetail() {
  const { id } = useParams()
  const [project, setProject] = useState<Project | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)
  const [retryCount, setRetryCount] = useState(0)

  useEffect(() => {
    setIsLoading(true)
    setHasError(false)
    fetch(apiUrl('/api/projects'))
      .then(res => {
        if (!res.ok) throw new Error(`Request failed with status ${res.status}`)
        return res.json()
      })
      .then(data => {
        const found = data.projects.find((p: Project) => String(p.id) === String(id))
        setProject(found || null)
      })
      .catch(err => {
        console.error(err)
        setHasError(true)
      })
      .finally(() => setIsLoading(false))
  }, [id, retryCount])

  if (isLoading) {
    return (
      <div className="section animate-pulse">
        <div className="h-3 w-24 rounded bg-surface-3" />
        <div className="mt-6 aspect-video w-full rounded-xl bg-surface-3" />
        <div className="mt-5 h-6 w-1/2 rounded bg-surface-3" />
        <div className="mt-4 h-3 w-full rounded bg-surface-3" />
        <div className="mt-2 h-3 w-4/5 rounded bg-surface-3" />
      </div>
    )
  }

  if (hasError) {
    return (
      <div className="section space-y-4">
        <p className="text-body">Couldn't load this project right now. The API may be waking up or temporarily unavailable.</p>
        <div className="flex gap-3">
          <button type="button" onClick={() => setRetryCount(c => c + 1)} className="btn-outline w-fit">
            Try again
          </button>
          <Link to="/projects" className="btn-outline w-fit">
            ← Back to projects
          </Link>
        </div>
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
    <section className="section !p-0 overflow-hidden">
      <div className="p-6 sm:p-8">
        <Link
          to="/projects"
          className="cursor-pointer inline-block text-sm text-muted transition-colors duration-200 hover:text-accent2"
        >
          ← Back to projects
        </Link>
      </div>

      {project.imageUrl ? (
        <img
          src={project.imageUrl}
          alt={`${project.title} preview`}
          className="aspect-video w-full border-y border-edge object-cover"
        />
      ) : (
        <div className="flex aspect-video w-full items-center justify-center border-y border-edge bg-gradient-to-br from-surface-3 to-surface-2">
          <div className="flex flex-col items-center gap-2 text-faint">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <rect x="3" y="4" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.5" />
              <path d="M3 15l4.5-4.5a1.5 1.5 0 0 1 2.12 0L14 14.9M13 14l1.88-1.88a1.5 1.5 0 0 1 2.12 0L21 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <circle cx="8" cy="8.5" r="1.25" fill="currentColor" />
            </svg>
            <span className="text-sm">Preview coming soon</span>
          </div>
        </div>
      )}

      <div className="p-6 sm:p-8">
        <h2 className="font-heading text-2xl font-bold text-ink">{project.title}</h2>
        <p className="mt-4 leading-relaxed text-body">{project.description}</p>
        {project.techStack && project.techStack.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {project.techStack.map(tech => (
              <span key={tech} className="pill-tag">
                {tech}
              </span>
            ))}
          </div>
        )}
        {project.url && (
          <a href={project.url} target="_blank" rel="noreferrer" className="btn-primary mt-6 inline-flex">
            Visit project ↗
          </a>
        )}
      </div>
    </section>
  )
}
