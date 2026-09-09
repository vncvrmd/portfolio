import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { apiUrl } from '../api'

interface Project {
  id: number
  title: string
  description: string
  url: string
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetch(apiUrl('/api/projects'))
      .then(res => res.json())
      .then(data => setProjects(data.projects))
      .catch(err => console.error(err))
      .finally(() => setIsLoading(false))
  }, [])

  return (
    <div className="space-y-8">
      <section className="rounded-3xl border border-slate-800 bg-slate-900/80 p-8 shadow-xl shadow-slate-950/20">
        <h2 className="font-heading text-2xl font-semibold text-slate-100">Projects</h2>
        {isLoading && <p className="mt-6 text-slate-400">Loading projects...</p>}
        {!isLoading && projects.length === 0 && (
          <p className="mt-6 text-slate-400">No projects to show right now.</p>
        )}
        <div className="mt-6 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {projects.map(p => (
            <article
              key={p.id}
              className="rounded-2xl border border-slate-800 bg-slate-950/90 p-4 transition-colors duration-200 hover:border-cyan-400"
            >
              <h3 className="font-heading font-semibold text-slate-100">{p.title}</h3>
              <p className="mt-2 text-slate-300">{p.description}</p>
              <div className="mt-4 flex gap-3">
                {p.url && (
                  <a
                    href={p.url}
                    target="_blank"
                    rel="noreferrer"
                    className="cursor-pointer inline-block text-cyan-300 transition-colors duration-200 hover:text-cyan-200"
                  >
                    Visit
                  </a>
                )}
                <Link
                  to={`/projects/${p.id}`}
                  className="cursor-pointer inline-block rounded bg-slate-800 px-3 py-1 text-sm font-semibold text-slate-100 transition-colors duration-200 hover:bg-slate-700"
                >
                  Details
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  )
}
