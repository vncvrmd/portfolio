import { useLayoutEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useScroll, useSpring, useTransform, type MotionValue } from 'motion/react'
import SectionHeading from '../components/SectionHeading'
import { useMotionPreference } from '../motionPreference'

type Kind = 'Career' | 'Campus' | 'Academics'

interface Entry {
  kind: Kind
  title: string
  subtitle: string
  bullets: string[]
}

const entries: Entry[] = [
  {
    kind: 'Career',
    title: 'Software Developer (Independent Contractor), Kidlat CivicLabs',
    subtitle: 'Jun 2026 – Present',
    bullets: [
      'Built a government agency’s public website as the only front-end developer (Angular, TypeScript, SCSS).',
      'Built the admin cost dashboard for ALICE, an AI tutor that Alternative Learning System (ALS) learners chat with on Facebook Messenger, and review teammates’ code across the platform (Python, FastAPI, React, PostgreSQL).',
      'Taught AI literacy to about 2,000 high school and senior high school students and teachers across 8 remote schools in Bicol (Sep 2026), in Bikol, Tagalog, and English.'
    ]
  },
  {
    kind: 'Career',
    title: 'QA Officer and Developer (Freelance), BASAdent Dental Center',
    subtitle: 'Sep 2025 – Present',
    bullets: [
      'Plan and run testing for a multi-branch dental clinic management system with Jest, Vitest, React Testing Library, Cypress, and Supertest.',
      'Filed 120 bug reports and improvement tickets on GitHub, each rated by severity, and did a security review before launch.',
      'Fixed over 10 reported bugs, including one where dental charts could save only partly.'
    ]
  },
  {
    kind: 'Career',
    title: 'Salesforce Developer Intern, Accenture, Inc. (Salesforce Capability)',
    subtitle: 'Dec 2025 – May 2026',
    bullets: [
      'Built automated workflows with Salesforce Flow (Screen, Record-Triggered, and Scheduled flows).',
      'Wrote Apex classes and triggers, and used SOQL and SOSL to query data.',
      'Set up custom objects, object relationships, and user access with profiles, permission sets, and sharing settings.',
      'Imported and cleaned data with Data Import Wizard and Data Loader, and made reports and dashboards.'
    ]
  },
  {
    kind: 'Campus',
    title: 'Samsung Galaxy Campus Ambassador (Batch 3)',
    subtitle: 'Sep 2025 – Sep 2026',
    bullets: ['One of 50 students picked nationwide to promote Samsung and run campus activities.']
  },
  {
    kind: 'Campus',
    title: 'Chief of Staff / VP for Quality Management & Assurance, SOCC',
    subtitle: 'Sep 2023 – Jun 2026',
    bullets: [
      'Led quality checks for student organization projects at the Student Organizations Coordinating Council.',
      'Served as Vice President of the Project Evaluations Committee.'
    ]
  },
  {
    kind: 'Campus',
    title: 'Project Head & Lead Organizer',
    subtitle: 'Various Dates',
    bullets: ['Headed university events including Crank IT, Build IT 2023, and UST Paskuhan 2024 and 2025 (Lead Organizer and Documentation Head).']
  },
  {
    kind: 'Academics',
    title: 'Bachelor of Science in Information Technology',
    subtitle: 'Major in Web and Mobile Application Development · University of Santo Tomas · August 2022 – June 2026',
    bullets: ['Cum Laude, GWA 1.721', 'Dean’s List every year, 2022–2026']
  }
]

const kindStyle: Record<Kind, { dot: string; text: string }> = {
  Career: { dot: '#a3e635', text: 'text-accent2' },
  Campus: { dot: '#7c6bf5', text: 'text-accent' },
  Academics: { dot: '#f4f6fb', text: 'text-ink' }
}

interface Stop {
  x: number
  y: number
  at: number // 0–1 position along the path
}

interface Geometry {
  width: number
  height: number
  d: string
  stops: Stop[]
}

const DOT_OFFSET = 30 // px from the card's top edge to its milestone dot
const SWING = 44 // how far the line bends toward each card on desktop

// Builds the winding line from the measured card positions and records where each milestone
// falls along its length, so dots and cards light up exactly when the line reaches them.
function buildGeometry(container: HTMLElement, cards: HTMLElement[], desktop: boolean): Geometry {
  const width = container.offsetWidth
  const height = container.offsetHeight
  const spineX = desktop ? width / 2 : 12
  const anchors = cards.map((card, i) => ({
    x: desktop ? spineX + (i % 2 === 0 ? -SWING : SWING) : spineX,
    y: card.offsetTop + DOT_OFFSET
  }))

  const measurer = document.createElementNS('http://www.w3.org/2000/svg', 'path')
  let d = `M ${spineX} 0`
  const stops: Stop[] = []
  let prev = { x: spineX, y: 0 }
  const lengths: number[] = []

  for (const a of anchors) {
    const midY = (prev.y + a.y) / 2
    d += desktop ? ` C ${prev.x} ${midY}, ${a.x} ${midY}, ${a.x} ${a.y}` : ` L ${a.x} ${a.y}`
    measurer.setAttribute('d', d)
    lengths.push(measurer.getTotalLength())
    stops.push({ x: a.x, y: a.y, at: 0 })
    prev = a
  }
  const endY = height
  const midY = (prev.y + endY) / 2
  d += desktop ? ` C ${prev.x} ${midY}, ${spineX} ${midY}, ${spineX} ${endY}` : ` L ${spineX} ${endY}`
  measurer.setAttribute('d', d)
  const total = measurer.getTotalLength() || 1
  stops.forEach((s, i) => (s.at = lengths[i] / total))

  return { width, height, d, stops }
}

function Milestone({ stop, color, draw }: { stop: Stop; color: string; draw: MotionValue<number> }) {
  const scale = useTransform(draw, [stop.at - 0.015, stop.at + 0.01], [0, 1])
  const pop = useSpring(scale, { stiffness: 400, damping: 12 })
  return (
    <motion.g style={{ scale: pop, originX: '50%', originY: '50%' }}>
      <circle cx={stop.x} cy={stop.y} r={9} fill={color} opacity={0.12} />
      <circle cx={stop.x} cy={stop.y} r={4} fill={color} stroke="#09090b" strokeWidth={2.5} />
    </motion.g>
  )
}

function TimelineCard({
  entry,
  index,
  stop,
  draw,
  desktop,
  cardRef
}: {
  entry: Entry
  index: number
  stop?: Stop
  draw: MotionValue<number>
  desktop: boolean
  cardRef: (el: HTMLElement | null) => void
}) {
  const at = stop?.at ?? 0
  const side = desktop && index % 2 === 1 ? 1 : -1
  const opacity = useTransform(draw, [at - 0.05, at], [0.2, 1])
  const x = useTransform(draw, [at - 0.05, at], [desktop ? side * -28 : 16, 0])
  const style = kindStyle[entry.kind]

  return (
    <motion.article
      ref={cardRef}
      style={{ opacity, x }}
      className={`relative rounded-xl border border-edge bg-panel/80 p-6 md:w-[calc(50%-4.5rem)] ${
        index % 2 === 1 ? 'md:ml-auto' : ''
      } ${index > 0 ? 'md:-mt-10' : ''}`}
    >
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-xs">
        <span className={`uppercase tracking-[0.18em] ${style.text}`}>{entry.kind}</span>
        <span className="text-faint">/</span>
        <span className="text-muted">{entry.subtitle}</span>
      </div>
      <h3 className="mt-3 font-heading text-lg font-semibold leading-snug text-ink">{entry.title}</h3>
      <ul className="mt-3 space-y-2 text-sm leading-relaxed text-body">
        {entry.bullets.map(bullet => (
          <li key={bullet} className="flex items-start gap-2.5">
            <span className="mt-2 h-1 w-1 flex-shrink-0 rounded-full bg-edge-strong" />
            <span>{bullet}</span>
          </li>
        ))}
      </ul>
    </motion.article>
  )
}

export default function Experience() {
  const containerRef = useRef<HTMLDivElement>(null)
  const cardEls = useRef<(HTMLElement | null)[]>([])
  const [geometry, setGeometry] = useState<Geometry | null>(null)
  const [desktop, setDesktop] = useState(() => window.matchMedia('(min-width: 768px)').matches)
  const { motionAllowed } = useMotionPreference()

  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start 75%', 'end 65%'] })
  // The spring makes the line trail the scrollbar slightly instead of snapping to it.
  const trailing = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.0005 })
  const fullyDrawn = useMotionValue(1)
  const draw = motionAllowed ? trailing : fullyDrawn

  useLayoutEffect(() => {
    const container = containerRef.current
    if (!container) return
    const mql = window.matchMedia('(min-width: 768px)')

    const measure = () => {
      const cards = cardEls.current.filter((el): el is HTMLElement => el !== null)
      setDesktop(mql.matches)
      setGeometry(buildGeometry(container, cards, mql.matches))
    }

    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(container)
    mql.addEventListener('change', measure)
    return () => {
      observer.disconnect()
      mql.removeEventListener('change', measure)
    }
  }, [])

  return (
    <div className="experience-grid relative">
      <SectionHeading index={2} label="Journey" title="Experience" className="mb-14" />

      <div ref={containerRef} className="relative space-y-10 pb-4 pl-10 md:space-y-0 md:pl-0">
        {entries.map((entry, i) => (
          <TimelineCard
            key={entry.title}
            entry={entry}
            index={i}
            stop={geometry?.stops[i]}
            draw={draw}
            desktop={desktop}
            cardRef={el => {
              cardEls.current[i] = el
            }}
          />
        ))}

        {geometry && (
          <svg
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 overflow-visible"
            width={geometry.width}
            height={geometry.height}
            viewBox={`0 0 ${geometry.width} ${geometry.height}`}
          >
            <defs>
              <linearGradient id="timeline-stroke" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#fafafa" />
                <stop offset="60%" stopColor="#7c6bf5" />
                <stop offset="100%" stopColor="#7c6bf5" stopOpacity="0.3" />
              </linearGradient>
            </defs>
            <path d={geometry.d} fill="none" stroke="#1e1e23" strokeWidth={1.5} strokeLinecap="round" />
            <motion.path
              d={geometry.d}
              fill="none"
              stroke="url(#timeline-stroke)"
              strokeWidth={1.5}
              strokeLinecap="round"
              style={{ pathLength: draw }}
            />
            {geometry.stops.map((stop, i) => (
              <Milestone key={i} stop={stop} color={kindStyle[entries[i].kind].dot} draw={draw} />
            ))}
          </svg>
        )}
      </div>
    </div>
  )
}
