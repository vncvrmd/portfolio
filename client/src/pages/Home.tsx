import { useEffect, useState } from 'react'
import ScrollLink from '../components/ScrollLink'
import { apiUrl } from '../api'
import { certifications } from './Certifications'
import { skillGroups } from './Skills'

interface About {
  headline: string
  details: string[]
}

interface Project {
  id: number
}

const highlights = [
  { to: '/#experience', title: 'Experience', description: 'Internships, leadership roles, and education.' },
  { to: '/#skills', title: 'Skills', description: 'Salesforce, full-stack development, and QA.' },
  { to: '/#certifications', title: 'Certifications', description: 'Credentials and academic honors.' }
]

export default function Home() {
  const [about, setAbout] = useState<About | null>(null)
  const [projectCount, setProjectCount] = useState<number | null>(null)

  useEffect(() => {
    fetch(apiUrl('/api/about'))
      .then(res => res.json())
      .then(data => setAbout(data.about))
      .catch(err => console.error(err))

    fetch(apiUrl('/api/projects'))
      .then(res => res.json())
      .then(data => setProjectCount((data.projects as Project[]).length))
      .catch(err => console.error(err))
  }, [])

  const stats = [
    { label: 'Projects', value: projectCount ?? '—' },
    { label: 'Certifications', value: certifications.length },
    { label: 'Skill areas', value: skillGroups.length }
  ]

  return (
    <div className="space-y-16">
      <section className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
        <div>
          <span className="badge">
            <span className="badge-dot" />
            Open to opportunities
          </span>

          <h1 className="mt-5 font-heading text-4xl font-bold leading-tight tracking-tight text-ink sm:text-5xl">
            Building{' '}
            <span className="relative whitespace-nowrap text-accent2">
              modern, scalable
              <svg
                className="absolute -bottom-1 left-0 w-full"
                height="8"
                viewBox="0 0 200 8"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <path d="M1 5.5C40 1.5 160 1.5 199 5.5" stroke="currentColor" strokeWidth="3" fill="none" strokeLinecap="round" />
              </svg>
            </span>{' '}
            web applications.
          </h1>

          <p className="mt-5 max-w-lg text-lg leading-relaxed text-body">
            {about?.headline ??
              'IT professional building modern, scalable web applications — from Salesforce automation to full-stack React and ASP.NET Core.'}
          </p>

          {about?.details && about.details.length > 0 && (
            <ul className="mt-5 space-y-2">
              {about.details.map(detail => (
                <li key={detail} className="flex items-start gap-2.5 text-sm text-body">
                  <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-accent2" />
                  {detail}
                </li>
              ))}
            </ul>
          )}

          <div className="mt-8 flex flex-wrap gap-3">
            <ScrollLink to="/#projects" className="btn-primary">
              View projects
            </ScrollLink>
            <ScrollLink to="/#contact" className="btn-outline">
              Contact
            </ScrollLink>
          </div>
        </div>

        <div className="terminal">
          <div className="terminal-bar">
            <span className="terminal-dot bg-[#ec6a5e]" />
            <span className="terminal-dot bg-[#f4be4f]" />
            <span className="terminal-dot bg-[#61c554]" />
            <span className="ml-2 text-xs text-faint">whoami.sh</span>
          </div>
          <div className="space-y-2.5 px-5 py-6 text-sm leading-relaxed">
            <p className="text-body">
              <span className="text-accent2">$</span> whoami
            </p>
            <p className="text-ink">IT graduate · full-stack &amp; Salesforce developer</p>
            <p className="mt-4 text-body">
              <span className="text-accent2">$</span> cat stack.txt
            </p>
            <p className="text-faint">
              React · TypeScript · ASP.NET Core · C# · Apex · Tailwind CSS
            </p>
            <p className="mt-4 text-body">
              <span className="text-accent2">$</span> ./deploy.sh --env production
            </p>
            <p className="text-ok">✓ build passed · deployed to Vercel + Render</p>
            <p className="text-body">
              <span className="text-accent2">$</span>{' '}
              <span className="ml-0.5 inline-block h-4 w-2 animate-pulse bg-accent2 align-middle" />
            </p>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-3 divide-x divide-edge border-y border-edge py-8">
        {stats.map(stat => (
          <div key={stat.label} className="text-center">
            <p className="font-heading text-3xl font-bold text-ink sm:text-4xl">{stat.value}</p>
            <p className="mt-1 text-xs uppercase tracking-[0.1em] text-muted">{stat.label}</p>
          </div>
        ))}
      </section>

      <section>
        <span className="section-label">Explore</span>
        <h2 className="mb-6 font-heading text-2xl font-semibold text-ink">Quick links</h2>
        <div className="grid gap-4 sm:grid-cols-3">
          {highlights.map(item => (
            <ScrollLink key={item.to} to={item.to} className="card block">
              <h3 className="font-heading font-semibold text-ink">{item.title}</h3>
              <p className="mt-2 text-sm text-body">{item.description}</p>
            </ScrollLink>
          ))}
        </div>
      </section>
    </div>
  )
}
