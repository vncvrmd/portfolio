import React, { useEffect, useState } from 'react'
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
    return <p className="text-slate-400">Loading project...</p>
  }

  if (!project) {
    return (
      <div className="space-y-4 text-slate-300">
        <p>Project not found.</p>
        <Link to="/projects" className="cursor-pointer inline-block text-cyan-300 transition-colors duration-200 hover:text-cyan-200">
          Back to projects
        </Link>
      </div>
    )
  }

  return (
    <section className="rounded-3xl border border-slate-800 bg-slate-900/80 p-8 shadow-xl shadow-slate-950/20">
      <Link
        to="/projects"
        className="cursor-pointer inline-block text-sm text-slate-400 transition-colors duration-200 hover:text-cyan-300"
      >
        ← Back to projects
      </Link>
      <h2 className="mt-4 font-heading text-2xl font-semibold text-slate-100">{project.title}</h2>
      <p className="mt-4 text-slate-300">{project.description}</p>
      {project.url && (
        <a
          href={project.url}
          target="_blank"
          rel="noreferrer"
          className="cursor-pointer mt-6 inline-block text-cyan-300 transition-colors duration-200 hover:text-cyan-200"
        >
          Visit project
        </a>
      )}
    </section>
  )
}
