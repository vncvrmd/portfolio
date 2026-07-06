import React, { useEffect, useState } from 'react'

interface Project {
  id: number
  title: string
  description: string
  url: string
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([])

  useEffect(() => {
    fetch('/api/projects')
      .then(res => res.json())
      .then(data => setProjects(data.projects))
      .catch(err => console.error(err))
  }, [])

  return (
    <div className="space-y-8">
      <section className="rounded-3xl border border-slate-800 bg-slate-900/80 p-8 shadow-xl shadow-slate-950/20">
        <h2 className="text-2xl font-semibold text-slate-100">Projects</h2>
        <div className="mt-6 grid gap-6 xl:grid-cols-3">
          {projects.map(p => (
            <article key={p.id} className="rounded-2xl border border-slate-800 bg-slate-950/90 p-4">
              <h3 className="font-semibold text-slate-100">{p.title}</h3>
              <p className="mt-2 text-slate-300">{p.description}</p>
              <div className="mt-4 flex gap-3">
                <a href={p.url} target="_blank" rel="noreferrer" className="inline-block text-cyan-300">Visit</a>
                <a href={`/projects/${p.id}`} className="inline-block text-sm font-semibold text-slate-100 bg-slate-800 px-3 py-1 rounded hover:bg-slate-700">Details</a>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  )
}
