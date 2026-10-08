import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'motion/react'

export interface JourneyProject {
  id: number
  title: string
  imageUrl: string
}

export interface SceneContext {
  projects: JourneyProject[]
  playGame: () => void
}

// A raised platform inside a scene slot, in vw from the slot's left edge; the character hops onto it.
export interface Terrain {
  from: number
  to: number
  height: number // px above the ground
  label?: string
}

export interface Scene {
  id: string
  when: string
  title: string
  subtitle?: string
  body: ReactNode
  sky: string
  bubble: string
  nav?: string // nav label that jumps to this scene
  flag?: string // year checkpoint planted at the start of the scene
  terrain?: Terrain[]
  // Landmark the character walks up to; `active` is true once the character has arrived.
  prop: (active: boolean, ctx: SceneContext) => ReactNode
}

const ink = 'border-[3px] border-[#09090b]'

function Building({ label, color, floors = 4, width = 160 }: { label: string; color: string; floors?: number; width?: number }) {
  return (
    <div className="flex flex-col items-center" aria-hidden="true">
      <div className={`mb-1 rounded-sm ${ink} bg-white px-2 py-0.5 font-mono text-[10px] font-bold uppercase tracking-widest text-surface`}>{label}</div>
      <div className={`${ink} border-b-0 shadow-[8px_0_0_rgba(0,0,0,0.25)]`} style={{ width, background: color }}>
        {Array.from({ length: floors }, (_, f) => (
          <div key={f} className="flex justify-around px-2 py-2">
            {Array.from({ length: 3 }, (_, w) => (
              <span key={w} className="h-5 w-5 border-2 border-[#09090b] bg-[#fde68a]" />
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

function Sign({ children, color = '#fef3c7' }: { children: ReactNode; color?: string }) {
  return (
    <div className="flex flex-col items-center" aria-hidden="true">
      <div className={`rounded-md ${ink} px-4 py-2 font-heading text-sm font-bold text-surface shadow-[4px_4px_0_#09090b]`} style={{ background: color }}>
        {children}
      </div>
      <span className="h-16 w-2 border-x-[3px] border-[#09090b] bg-[#92400e]" />
    </div>
  )
}

// Parol: the Filipino star lantern, hung over the Paskuhan stage.
function Parol({ color, delay }: { color: string; delay: number }) {
  return (
    <motion.svg width="34" height="44" viewBox="0 0 34 44" animate={{ rotate: [-6, 6, -6] }} transition={{ duration: 2.4, repeat: Infinity, delay }}>
      <line x1="17" y1="0" x2="17" y2="8" stroke="#09090b" strokeWidth="2" />
      <polygon points="17,8 21,18 32,18 23,25 26,36 17,29 8,36 11,25 2,18 13,18" fill={color} stroke="#09090b" strokeWidth="2" />
      <path d="M13 34 L11 44 M21 34 L23 44" stroke={color} strokeWidth="2" />
    </motion.svg>
  )
}

function EventStages({ active }: { active: boolean }) {
  const stages = [
    { name: 'Crank IT', color: '#f472b6' },
    { name: 'Build IT 2023', color: '#38bdf8' },
    { name: 'Paskuhan 24–25', color: '#facc15' }
  ]
  return (
    <div className="flex items-end gap-4" aria-hidden="true">
      <Building label="Org HQ" color="#0f766e" floors={3} width={120} />
      {stages.map((s, i) => (
        <motion.div
          key={s.name}
          className="flex flex-col items-center"
          initial={false}
          animate={active ? { y: 0, opacity: 1 } : { y: 60, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 260, damping: 14, delay: active ? 0.15 + i * 0.15 : 0 }}
        >
          {i === 2 && (
            <div className="mb-1 flex gap-2">
              <Parol color="#f43f5e" delay={0} />
              <Parol color="#facc15" delay={0.4} />
            </div>
          )}
          <div className={`${ink} px-2 py-1 font-mono text-[10px] font-bold uppercase text-surface`} style={{ background: s.color }}>
            {s.name}
          </div>
          <div className={`h-12 w-24 ${ink} border-t-0 bg-[#1f2937]`} />
        </motion.div>
      ))}
    </div>
  )
}

// Fixed spread so the burst looks the same every time (no Math.random during render).
const confettiSpread = Array.from({ length: 24 }, (_, i) => {
  const r1 = Math.abs(Math.sin(i * 91.7)) % 1
  const r2 = Math.abs(Math.sin(i * 37.3)) % 1
  return { angle: -Math.PI / 2 + (r1 - 0.5) * Math.PI * 0.9, dist: 90 + r2 * 90 }
})

function Confetti({ active }: { active: boolean }) {
  if (!active) return null
  const colors = ['#a3e635', '#7c6bf5', '#f472b6', '#facc15', '#38bdf8']
  return (
    <span className="pointer-events-none absolute left-1/2 top-0" aria-hidden="true">
      {confettiSpread.map(({ angle, dist }, i) => (
        <motion.span
          key={i}
          className="absolute h-2 w-1.5"
          style={{ background: colors[i % colors.length] }}
          initial={{ x: 0, y: 0, rotate: 0, opacity: 1 }}
          animate={{ x: Math.cos(angle) * dist, y: [0, Math.sin(angle) * dist, 160], rotate: 540, opacity: [1, 1, 0] }}
          transition={{ duration: 1.8, ease: 'easeOut', delay: i * 0.015 }}
        />
      ))}
    </span>
  )
}

function Trophy({ active }: { active: boolean }) {
  return (
    <div className="relative flex flex-col items-center" aria-hidden="true">
      <Confetti active={active} />
      <svg width="90" height="110" viewBox="0 0 90 110">
        <path d="M20 8h50v24c0 16-11 28-25 28S20 48 20 32z" fill="#facc15" stroke="#09090b" strokeWidth="4" />
        <path d="M20 16H8c0 14 6 22 14 22M70 16h12c0 14-6 22-14 22" fill="none" stroke="#09090b" strokeWidth="4" />
        <rect x="38" y="60" width="14" height="18" fill="#eab308" stroke="#09090b" strokeWidth="4" />
        <rect x="24" y="78" width="42" height="14" fill="#a16207" stroke="#09090b" strokeWidth="4" />
        <text x="45" y="38" textAnchor="middle" fontFamily="monospace" fontWeight="700" fontSize="12" fill="#09090b">MLQ</text>
      </svg>
      <div className={`${ink} bg-white px-2 py-0.5 font-mono text-[10px] font-bold uppercase text-surface`}>Leadership 2025</div>
    </div>
  )
}

const toolbox = ['Apex', 'Flow', 'React', 'Angular', 'Node.js', 'Python', 'Laravel', 'Kotlin', 'SQL']

// Tool crates drop in one after another and stack up when the character arrives.
function Crates({ active }: { active: boolean }) {
  return (
    <div className="grid w-[270px] grid-cols-3 gap-1.5" aria-hidden="true">
      {toolbox.map((tool, i) => (
        <motion.span
          key={tool}
          className={`flex h-11 items-center justify-center ${ink} bg-[#d97706] font-mono text-[10px] font-bold uppercase text-surface shadow-[inset_0_-4px_0_rgba(0,0,0,0.25)]`}
          initial={false}
          animate={active ? { y: 0, opacity: 1, rotate: 0 } : { y: -260, opacity: 0, rotate: i % 2 ? 12 : -12 }}
          transition={{ type: 'spring', stiffness: 260, damping: 14, delay: active ? (toolbox.length - 1 - i) * 0.07 : 0 }}
        >
          {tool}
        </motion.span>
      ))}
    </div>
  )
}

// QA swamp: bugs crawl around, then get squashed by the test suite when the character arrives.
function BugSwamp({ active }: { active: boolean }) {
  const suites = ['Jest', 'Vitest', 'RTL', 'Cypress', 'Supertest']
  return (
    <div className="flex flex-col items-center gap-2" aria-hidden="true">
      <div className="flex gap-1.5">
        {suites.map((s, i) => (
          <motion.span
            key={s}
            className={`${ink} bg-[#22c55e] px-1.5 py-0.5 font-mono text-[10px] font-bold text-surface`}
            initial={false}
            animate={active ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 400, damping: 12, delay: active ? i * 0.12 : 0 }}
          >
            ✓ {s}
          </motion.span>
        ))}
      </div>
      <div className={`relative h-14 w-72 ${ink} rounded-t-[40px] bg-[#365314]`}>
        {Array.from({ length: 6 }, (_, i) => (
          <motion.span
            key={i}
            className="absolute top-3 text-lg"
            style={{ left: `${10 + i * 14}%` }}
            initial={false}
            animate={active ? { scaleY: 0.2, opacity: 0.3, y: 0 } : { y: [0, -4, 0], scaleY: 1, opacity: 1 }}
            transition={active ? { duration: 0.2, delay: 0.3 + i * 0.1 } : { duration: 0.6, repeat: Infinity, delay: i * 0.1 }}
          >
            🐞
          </motion.span>
        ))}
      </div>
    </div>
  )
}

// "One of 50": a crowd grid where a single square lights up.
function CrowdGrid({ active }: { active: boolean }) {
  return (
    <div className="flex flex-col items-center gap-2" aria-hidden="true">
      <div className={`${ink} bg-[#1d4ed8] px-2 py-0.5 font-mono text-[10px] font-bold uppercase text-white`}>Galaxy Campus Ambassadors</div>
      <div className="grid grid-cols-10 gap-1">
        {Array.from({ length: 50 }, (_, i) => (
          <motion.span
            key={i}
            className="h-3.5 w-3.5 border-2 border-[#09090b]"
            initial={false}
            animate={{ backgroundColor: active && i === 27 ? '#a3e635' : '#93c5fd', scale: active && i === 27 ? 1.5 : 1 }}
            transition={{ duration: 0.4, delay: active ? 0.5 : 0 }}
          />
        ))}
      </div>
    </div>
  )
}

// Accenture "boss stage": a Flow conveyor carrying records into the org.
function FlowMachine({ active }: { active: boolean }) {
  return (
    <div className="flex items-end gap-3" aria-hidden="true">
      <div className="flex flex-col items-center">
        <div className={`relative h-10 w-56 overflow-hidden ${ink} bg-[#374151]`}>
          {['Flow', 'Apex', 'DML', 'SOQL', 'Report'].map((item, i) => (
            <motion.span
              key={item}
              className={`absolute top-1 ${ink} bg-[#a78bfa] px-1 font-mono text-[9px] font-bold text-surface`}
              initial={false}
              animate={active ? { x: [-60, 230] } : { x: -60 }}
              transition={active ? { duration: 3, repeat: Infinity, delay: i * 0.6, ease: 'linear' } : { duration: 0 }}
            >
              {item}
            </motion.span>
          ))}
        </div>
        <div className="flex w-56 justify-around">
          {[0, 1, 2, 3].map(i => (
            <motion.span
              key={i}
              className="h-4 w-4 rounded-full border-[3px] border-[#09090b] bg-[#9ca3af] [border-top-color:#fafafa]"
              animate={active ? { rotate: 360 } : { rotate: 0 }}
              transition={active ? { duration: 1, repeat: Infinity, ease: 'linear' } : { duration: 0 }}
            />
          ))}
        </div>
      </div>
      <Building label="Accenture" color="#6d28d9" floors={6} width={150} />
    </div>
  )
}

// Project arcade: one cabinet per project, each opening its detail page.
function Arcade({ active, projects }: { active: boolean; projects: JourneyProject[] }) {
  if (projects.length === 0) {
    return <Sign color="#c4b5fd">Arcade loading…</Sign>
  }
  return (
    <div className="flex max-w-[92vw] flex-wrap items-end justify-center gap-2 sm:max-w-none sm:flex-nowrap">
      {projects.map((p, i) => (
        <motion.div
          key={p.id}
          initial={false}
          animate={active ? { y: 0, opacity: 1 } : { y: 80, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 16, delay: active ? i * 0.08 : 0 }}
        >
          <Link
            to={`/projects/${p.id}`}
            tabIndex={active ? 0 : -1}
            className={`group pointer-events-auto flex w-[76px] flex-col items-center ${ink} bg-[#7c3aed] px-1.5 pb-2 pt-1.5 shadow-[4px_4px_0_#09090b] transition-transform duration-200 hover:-translate-y-1 focus-visible:-translate-y-1`}
            aria-label={`Open project: ${p.title}`}
          >
            <span className="flex h-12 w-full items-center justify-center overflow-hidden border-2 border-[#09090b] bg-[#0b1020]">
              {p.imageUrl ? (
                <img src={p.imageUrl} alt="" className="h-full w-full object-cover opacity-80 transition-opacity group-hover:opacity-100" loading="lazy" />
              ) : (
                <span className="font-mono text-[8px] text-[#a3e635]">PLAY</span>
              )}
            </span>
            <span className="mt-1 line-clamp-2 text-center font-mono text-[8px] font-bold uppercase leading-tight text-white">{p.title}</span>
            <span className="mt-1 h-2 w-2 rounded-full border border-[#09090b] bg-[#f43f5e]" />
          </Link>
        </motion.div>
      ))}
    </div>
  )
}

function Credentials({ active }: { active: boolean }) {
  return (
    <div className="flex items-end gap-4" aria-hidden="true">
      <motion.div
        className={`flex h-24 w-24 -rotate-6 flex-col items-center justify-center rounded-full ${ink} bg-[#ef4444] text-center font-mono text-[10px] font-bold uppercase text-white`}
        initial={false}
        animate={active ? { scale: [2.2, 0.9, 1], opacity: 1 } : { scale: 2.2, opacity: 0 }}
        transition={{ duration: 0.45, delay: active ? 0.2 : 0 }}
      >
        IT Passport
        <span className="text-[8px]">Oct 2025</span>
      </motion.div>
      <motion.div
        className={`${ink} bg-white px-3 py-2 font-mono text-[10px] font-bold uppercase text-surface`}
        initial={false}
        animate={active ? { y: 0, opacity: 1 } : { y: 40, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 15, delay: active ? 0.5 : 0 }}
      >
        ✦ Gemini Certified
      </motion.div>
    </div>
  )
}

function Graduation({ active }: { active: boolean }) {
  return (
    <div className="relative flex flex-col items-center" aria-hidden="true">
      <Confetti active={active} />
      <motion.svg
        width="70"
        height="40"
        viewBox="0 0 70 40"
        initial={false}
        animate={active ? { y: [0, -160, 0], rotate: [0, 540, 720] } : { y: 0, rotate: 0 }}
        transition={{ duration: 1.4, ease: 'easeOut', delay: active ? 0.2 : 0 }}
      >
        <polygon points="35,2 68,14 35,26 2,14" fill="#09090b" stroke="#fafafa" strokeWidth="2" />
        <rect x="20" y="20" width="30" height="12" fill="#09090b" stroke="#fafafa" strokeWidth="2" />
        <path d="M62 16 V30" stroke="#facc15" strokeWidth="3" />
      </motion.svg>
      <Sign color="#fde68a">🎓 Cum Laude</Sign>
    </div>
  )
}

// Kidlat: the civic tech office, with an ALICE chat popping up beside it.
function CivicLab({ active }: { active: boolean }) {
  const chat = [
    { text: 'Hi ALICE! What is photosynthesis?', mine: true },
    { text: 'It’s how plants turn sunlight into food 🌱', mine: false },
    { text: 'Salamat po!', mine: true }
  ]
  return (
    <div className="flex items-end gap-4" aria-hidden="true">
      <Building label="Kidlat ⚡" color="#0369a1" floors={4} width={140} />
      <div className="mb-4 flex w-[180px] flex-col gap-1.5">
        {chat.map((m, i) => (
          <motion.span
            key={m.text}
            className={`${ink} max-w-[160px] rounded-lg px-2 py-1 text-[10px] font-bold leading-tight text-surface ${m.mine ? 'self-end bg-[#bae6fd]' : 'self-start bg-[#fefce8]'}`}
            initial={false}
            animate={active ? { scale: 1, opacity: 1 } : { scale: 0.4, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 380, damping: 16, delay: active ? 0.3 + i * 0.45 : 0 }}
          >
            {m.text}
          </motion.span>
        ))}
      </div>
    </div>
  )
}

// Bicol: eight schoolhouses pop up one by one.
function Schools({ active }: { active: boolean }) {
  const roofs = ['#dc2626', '#2563eb', '#16a34a', '#d97706', '#7c3aed', '#db2777', '#0891b2', '#65a30d']
  return (
    <div className="flex flex-col items-center gap-2" aria-hidden="true">
      <div className="grid grid-cols-4 gap-2">
        {roofs.map((roof, i) => (
          <motion.svg
            key={roof}
            width="44"
            height="40"
            viewBox="0 0 44 40"
            initial={false}
            animate={active ? { y: 0, opacity: 1 } : { y: 40, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 320, damping: 14, delay: active ? 0.15 + i * 0.1 : 0 }}
          >
            <polygon points="22,3 41,17 3,17" fill={roof} stroke="#09090b" strokeWidth="3" strokeLinejoin="round" />
            <rect x="7" y="17" width="30" height="20" fill="#fef3c7" stroke="#09090b" strokeWidth="3" />
            <rect x="18" y="24" width="8" height="13" fill="#92400e" stroke="#09090b" strokeWidth="2" />
          </motion.svg>
        ))}
      </div>
      <div className={`${ink} bg-white px-2 py-0.5 font-mono text-[10px] font-bold uppercase text-surface`}>≈ 2,000 learners</div>
    </div>
  )
}

export const scenes: Scene[] = [
  {
    id: 'start',
    when: 'Press start',
    title: 'Hi, I’m Vince Tyrone Vermudo.',
    subtitle: 'Software developer · web apps, AI tools, and QA',
    body: <p>This is my résumé as a walk through Manila. Keep scrolling and I’ll show you where I’ve been.</p>,
    sky: '#1b1640',
    bubble: 'Let’s go! →',
    nav: 'Home',
    prop: (active, ctx) => (
      <div className="flex items-end gap-5">
        <Sign>Scroll to start →</Sign>
        <button
          type="button"
          onClick={ctx.playGame}
          tabIndex={active ? 0 : -1}
          className={`pointer-events-auto mb-2 cursor-pointer rounded-md ${ink} bg-[#a3e635] px-3 py-2 font-mono text-xs font-bold uppercase text-surface shadow-[4px_4px_0_#09090b] transition-transform duration-200 hover:-translate-y-1 focus-visible:-translate-y-1`}
        >
          🐞 Play bug squash
        </button>
      </div>
    )
  },
  {
    id: 'ust',
    when: '2022',
    title: 'Enrolled at UST',
    subtitle: 'BS Information Technology — Web & Mobile Application Development',
    body: <p>University of Santo Tomas, August 2022. The start of four years building web and mobile apps.</p>,
    sky: '#231c5c',
    bubble: 'Go Tigers! 🐯',
    flag: '2022',
    prop: () => <Building label="UST" color="#b45309" floors={4} width={190} />
  },
  {
    id: 'deans',
    when: '2022 – 2026',
    title: 'Dean’s List, every year',
    subtitle: 'Outstanding Academic Achiever',
    body: <p>Four years, four steps up. Climb the stairs to see them.</p>,
    sky: '#2a2168',
    bubble: 'Level up! ⬆',
    terrain: [
      { from: 20, to: 32, height: 34, label: 'Y1' },
      { from: 32, to: 44, height: 68, label: 'Y2' },
      { from: 44, to: 56, height: 102, label: 'Y3' },
      { from: 56, to: 70, height: 136, label: 'Y4' }
    ],
    prop: () => null
  },
  {
    id: 'leadership',
    when: '2023 – 2026',
    title: 'Leading on campus',
    subtitle: 'Chief of Staff / VP for Quality Management & Assurance',
    body: (
      <p>
        Led quality checks across student organizations, served as VP of the Project Evaluations Committee, and headed Crank IT, Build IT 2023, and UST
        Paskuhan 2024 and 2025.
      </p>
    ),
    sky: '#2e2170',
    bubble: 'Event day!',
    nav: 'Experience',
    flag: '2023',
    prop: active => <EventStages active={active} />
  },
  {
    id: 'mlq',
    when: '2025',
    title: 'Manuel L. Quezon Leadership Award',
    subtitle: 'College level · University of Santo Tomas',
    body: <p>Recognized for leadership across the university’s student organizations.</p>,
    sky: '#3b1f7a',
    bubble: 'Thank you! 🙌',
    flag: '2025',
    prop: active => <Trophy active={active} />
  },
  {
    id: 'skills',
    when: 'Toolbox',
    title: 'What I build with',
    body: (
      <ul className="space-y-1">
        <li>Web — Angular, React, TypeScript, Node.js, FastAPI, Laravel, PostgreSQL</li>
        <li>Mobile — Kotlin, Firebase</li>
        <li>AI — Claude Code, prompt engineering, spec-driven development</li>
        <li>Salesforce — Apex, SOQL/SOSL, Flow, schema modeling</li>
      </ul>
    ),
    sky: '#0f766e',
    bubble: 'My toolbox.',
    nav: 'Skills',
    prop: active => <Crates active={active} />
  },
  {
    id: 'samsung',
    when: '2025 – 2026',
    title: 'Samsung Galaxy Campus Ambassador',
    subtitle: 'Batch 3 — one of 50 students nationwide',
    body: <p>Drove brand advocacy and ran strategic engagement missions on campus.</p>,
    sky: '#1e3a8a',
    bubble: 'Say cheese 📱',
    prop: active => <CrowdGrid active={active} />
  },
  {
    id: 'qa',
    when: 'Sep 2025 – Present',
    title: 'Freelance: squashing bugs at BASAdent',
    subtitle: 'QA Officer and Developer · dental clinic system',
    body: (
      <p>
        I plan and run testing for a multi-branch dental clinic system with Jest, Vitest, React Testing Library, Cypress, and Supertest, and filed 120
        bug and security reports before launch.
      </p>
    ),
    sky: '#14532d',
    bubble: 'Tests green ✓',
    prop: active => <BugSwamp active={active} />
  },
  {
    id: 'accenture',
    when: 'Dec 2025 – May 2026',
    title: 'Boss stage: Accenture',
    subtitle: 'Salesforce Developer Intern · Salesforce Capability',
    body: <p>Automated workflows with Flow, wrote Apex classes and triggers, modeled data, migrated records with Data Loader, and built reports and dashboards.</p>,
    sky: '#4c1d95',
    bubble: 'Automating…',
    flag: 'Dec 2025',
    prop: active => <FlowMachine active={active} />
  },
  {
    id: 'projects',
    when: 'Arcade',
    title: 'The project arcade',
    subtitle: 'Pick a cabinet to open a project',
    body: <p>Web apps, a mobile app, QA work and systems — each cabinet opens its full details.</p>,
    sky: '#581c87',
    bubble: 'Insert coin 🕹️',
    nav: 'Projects',
    prop: (active, ctx) => <Arcade active={active} projects={ctx.projects} />
  },
  {
    id: 'credentials',
    when: 'Checkpoint',
    title: 'Credentials',
    body: (
      <ul className="space-y-1">
        <li>Information Technology Passport (IP) Exam — Oct 2025</li>
        <li>Gemini Certified University Student</li>
      </ul>
    ),
    sky: '#7c2d12',
    bubble: 'Stamped ✓',
    nav: 'Certifications',
    prop: active => <Credentials active={active} />
  },
  {
    id: 'grad',
    when: 'June 2026',
    title: 'Graduated Cum Laude',
    body: <p>BS Information Technology, University of Santo Tomas, with a GWA of 1.721.</p>,
    sky: '#7c2d12',
    bubble: 'Cum Laude! 🎓',
    flag: '2026',
    prop: active => <Graduation active={active} />
  },
  {
    id: 'kidlat',
    when: 'Jun 2026 – Present',
    title: 'Software Developer at Kidlat CivicLabs',
    subtitle: 'Civic tech · independent contractor',
    body: (
      <ul className="space-y-1">
        <li>Built a government agency’s public website as the only front-end developer (Angular).</li>
        <li>Built the admin cost dashboard for ALICE, an AI learning assistant students chat with on Messenger.</li>
        <li>Review teammates’ code across the ALICE platform.</li>
      </ul>
    ),
    sky: '#0c4a6e',
    bubble: 'Shipping! ⚡',
    nav: 'Experience',
    prop: active => <CivicLab active={active} />
  },
  {
    id: 'bicol',
    when: 'Sep 2026',
    title: 'Teaching AI in Bicol',
    subtitle: '8 remote schools · about 2,000 students and teachers',
    body: (
      <p>
        Kidlat sent me to teach AI basics, good prompting, and the risks of AI to high school and senior high students and their teachers, in Bikol,
        Tagalog, and English. Hop in the balloon — one last stop.
      </p>
    ),
    sky: '#9a3412',
    bubble: 'Marhay na aga! 👋',
    flag: 'Sep 2026',
    prop: active => <Schools active={active} />
  }
]
