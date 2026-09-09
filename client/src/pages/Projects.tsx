import { useEffect, useState } from 'react'
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
      <div>
        <span className="section-label">Work</span>
        <h2 className="font-heading text-3xl font-bold text-ink">Projects</h2>
      </div>

      {isLoading && (
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {[0, 1, 2].map(i => (
            <div key={i} className="card animate-pulse">
              <div className="h-4 w-2/3 rounded bg-surface-3" />
              <div className="mt-3 h-3 w-full rounded bg-surface-3" />
              <div className="mt-2 h-3 w-4/5 rounded bg-surface-3" />
            </div>
          ))}
        </div>
      )}

      {!isLoading && projects.length === 0 && <p className="text-muted">No projects to show right now.</p>}

      {!isLoading && projects.length > 0 && (
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {projects.map(p => (
            <article key={p.id} className="card flex flex-col">
              <h3 className="font-heading font-semibold text-ink">{p.title}</h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-body">{p.description}</p>
              <div className="mt-4 flex flex-wrap items-center gap-3">
                {p.url && (
                  <a
                    href={p.url}
                    target="_blank"
                    rel="noreferrer"
                    className="cursor-pointer text-sm font-medium text-accent2 transition-colors duration-200 hover:text-ink"
                  >
                    Visit ↗
                  </a>
                )}
                <Link to={`/projects/${p.id}`} className="btn-outline ml-auto !px-4 !py-1.5 text-xs">
                  Details
                </Link>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  )
}
