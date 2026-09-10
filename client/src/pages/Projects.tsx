import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { apiUrl } from '../api'

interface Project {
  id: number
  title: string
  description: string
  url: string
  imageUrl: string
  techStack: string[] | null
}

function ProjectThumb({ project }: { project: Project }) {
  if (project.imageUrl) {
    return (
      <img
        src={project.imageUrl}
        alt={`${project.title} preview`}
        className="aspect-video w-full object-cover"
        loading="lazy"
      />
    )
  }

  return (
    <div className="flex aspect-video w-full items-center justify-center bg-gradient-to-br from-surface-3 to-surface-2">
      <div className="flex flex-col items-center gap-2 text-faint">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <rect x="3" y="4" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.5" />
          <path d="M3 15l4.5-4.5a1.5 1.5 0 0 1 2.12 0L14 14.9M13 14l1.88-1.88a1.5 1.5 0 0 1 2.12 0L21 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="8" cy="8.5" r="1.25" fill="currentColor" />
        </svg>
        <span className="text-xs">Preview coming soon</span>
      </div>
    </div>
  )
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([])
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
      .then(data => setProjects(data.projects))
      .catch(err => {
        console.error(err)
        setHasError(true)
      })
      .finally(() => setIsLoading(false))
  }, [retryCount])

  return (
    <div className="space-y-8">
      <div>
        <span className="section-label">Work</span>
        <h2 className="font-heading text-3xl font-bold text-ink">Projects</h2>
      </div>

      {isLoading && (
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {[0, 1, 2].map(i => (
            <div key={i} className="card overflow-hidden !p-0">
              <div className="aspect-video w-full animate-pulse bg-surface-3" />
              <div className="p-5">
                <div className="h-4 w-2/3 animate-pulse rounded bg-surface-3" />
                <div className="mt-3 h-3 w-full animate-pulse rounded bg-surface-3" />
                <div className="mt-2 h-3 w-4/5 animate-pulse rounded bg-surface-3" />
              </div>
            </div>
          ))}
        </div>
      )}

      {!isLoading && hasError && (
        <div className="card flex flex-col items-start gap-3">
          <p className="text-body">Couldn't load projects right now. The API may be waking up or temporarily unavailable.</p>
          <button type="button" onClick={() => setRetryCount(c => c + 1)} className="btn-outline">
            Try again
          </button>
        </div>
      )}

      {!isLoading && !hasError && projects.length === 0 && <p className="text-muted">No projects to show right now.</p>}

      {!isLoading && !hasError && projects.length > 0 && (
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {projects.map(p => (
            <article key={p.id} className="card flex flex-col overflow-hidden !p-0">
              <div className="overflow-hidden rounded-t-2xl border-b border-edge">
                <ProjectThumb project={p} />
              </div>
              <div className="flex flex-1 flex-col p-5">
                <h3 className="font-heading font-semibold text-ink">{p.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-body">{p.description}</p>
                {p.techStack && p.techStack.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {p.techStack.map(tech => (
                      <span key={tech} className="pill-tag">
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
                <div className="mt-4 flex flex-col gap-2">
                  {p.url && (
                    <a href={p.url} target="_blank" rel="noreferrer" className="btn-primary w-full justify-center">
                      Visit site ↗
                    </a>
                  )}
                  <Link
                    to={`/projects/${p.id}`}
                    className={
                      p.url
                        ? 'btn-outline w-full justify-center !py-1.5 text-xs'
                        : 'btn-outline w-fit self-end !px-4 !py-1.5 text-xs'
                    }
                  >
                    Details
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  )
}
