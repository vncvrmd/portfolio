import { useEffect, useState } from 'react'
import ScrollLink from '../components/ScrollLink'
import Reveal from '../components/Reveal'
import SectionHeading from '../components/SectionHeading'
import LandingHero from '../components/LandingHero'
import Journey from '../components/journey/Journey'
import { useMotionPreference } from '../motionPreference'
import { useIntroDone } from '../components/Intro'
import CountUp from '../components/reactbits/CountUp'
import SpotlightCard from '../components/reactbits/SpotlightCard'
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
  const introDone = useIntroDone()
  const { motionAllowed } = useMotionPreference()

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
    { label: 'Projects', value: projectCount },
    { label: 'Certifications', value: certifications.length },
    { label: 'Skill areas', value: skillGroups.length }
  ]

  // Journey mode: the whole home page is the journey (the start game sits on top until it's done).
  if (motionAllowed) return introDone ? <Journey /> : <div className="min-h-[100svh]" />

  return (
    <div className="space-y-20">
      {introDone ? <LandingHero about={about} /> : <div className="min-h-[calc(100svh-9rem)]" />}

      <Reveal>
        <section className="grid grid-cols-3 divide-x divide-edge rounded-3xl border border-edge bg-panel/50 py-8 backdrop-blur-md">
          {stats.map(stat => (
            <div key={stat.label} className="text-center">
              <p className="font-heading text-3xl font-bold text-ink sm:text-5xl">
                {stat.value === null ? '—' : <CountUp to={stat.value} duration={1.6} />}
              </p>
              <p className="mt-2 text-xs uppercase tracking-[0.14em] text-muted">{stat.label}</p>
            </div>
          ))}
        </section>
      </Reveal>

      <section>
        <SectionHeading label="Explore" title="Quick links" size="md" className="mb-6" />
        <div className="grid gap-4 sm:grid-cols-3">
          {highlights.map((item, index) => (
            <Reveal key={item.to} delay={Math.min(index * 80, 200)} className="h-full">
              <ScrollLink to={item.to} className="group block h-full">
                <SpotlightCard className="card h-full" spotlightColor="rgba(255, 255, 255, 0.06)">
                  <h3 className="flex items-center justify-between font-heading font-semibold text-ink">
                    {item.title}
                    <span
                      aria-hidden="true"
                      className="text-muted transition-transform duration-300 group-hover:translate-x-1 group-hover:text-ink"
                    >
                      →
                    </span>
                  </h3>
                  <p className="mt-2 text-sm text-body">{item.description}</p>
                </SpotlightCard>
              </ScrollLink>
            </Reveal>
          ))}
        </div>
      </section>
    </div>
  )
}
