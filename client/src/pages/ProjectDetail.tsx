import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

interface Project {
  id: number
  title: string
  description: string
  url: string
}

export default function ProjectDetail() {
  const { id } = useParams()
  const [project, setProject] = useState<Project | null>(null)

  useEffect(() => {
    fetch('/api/projects')
      .then(res => res.json())
      .then(data => {
        const found = data.projects.find((p: Project) => String(p.id) === String(id))
        setProject(found || null)
      })
  }, [id])

  if (!project) {
    return <div className="text-slate-300">Project not found.</div>
  }

  return (
    <section className="rounded-3xl border border-slate-800 bg-slate-900/80 p-8 shadow-xl shadow-slate-950/20">
      <h2 className="text-2xl font-semibold text-slate-100">{project.title}</h2>
      <p className="mt-4 text-slate-300">{project.description}</p>
      <a href={project.url} target="_blank" rel="noreferrer" className="mt-6 inline-block text-cyan-300">Visit project</a>
    </section>
  )
}
