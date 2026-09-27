import { useEffect, useRef, useState, type PointerEvent } from 'react'
import {
  AnimatePresence,
  motion,
  stagger,
  useMotionTemplate,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  type Variants
} from 'motion/react'
import ScrollLink from './ScrollLink'
import BlurText from './reactbits/BlurText'
import Magnet from './reactbits/Magnet'
import RotatingText from './reactbits/RotatingText'
import SkewButton from './uiverse/SkewButton'
import StripeLoader from './uiverse/StripeLoader'
import { usePointerEffects } from '../hooks'
import { useMotionPreference } from '../motionPreference'

interface About {
  headline: string
  details: string[]
}

type ModeId = 'fullstack' | 'salesforce' | 'qa'

interface TerminalStep {
  command: string
  output: string
  tone?: 'ok' | 'muted' | 'ink'
}

const modes: { id: ModeId; label: string; file: string; steps: TerminalStep[] }[] = [
  {
    id: 'fullstack',
    label: 'Full-stack',
    file: 'deploy.sh',
    steps: [
      { command: 'whoami', output: 'IT graduate · full-stack & Salesforce developer', tone: 'ink' },
      { command: 'cat stack.txt', output: 'React · TypeScript · ASP.NET Core · C# · Node.js · Tailwind CSS', tone: 'muted' },
      { command: './deploy.sh --env production', output: '✓ build passed · deployed to Vercel + Render', tone: 'ok' }
    ]
  },
  {
    id: 'salesforce',
    label: 'Salesforce',
    file: 'automation.apex',
    steps: [
      { command: 'sf flow list', output: 'Screen · Record-Triggered · Schedule-Triggered flows', tone: 'ink' },
      { command: 'sf apex run --file triggers.apex', output: 'Apex classes · triggers · DML · SOQL/SOSL queries', tone: 'muted' },
      { command: 'sf data import --plan migration.json', output: '✓ records migrated · reports & dashboards refreshed', tone: 'ok' }
    ]
  },
  {
    id: 'qa',
    label: 'QA',
    file: 'test.sh',
    steps: [
      { command: 'npm run test', output: 'Jest · Vitest · React Testing Library', tone: 'ink' },
      { command: 'npx cypress run', output: 'E2E flows · Supertest HTTP checks', tone: 'muted' },
      { command: 'echo $?', output: '✓ 0 — all suites green', tone: 'ok' }
    ]
  }
]

const toneClass = { ok: 'text-ok', muted: 'text-faint', ink: 'text-ink' } as const

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
}

const lineList: Variants = {
  hidden: {},
  visible: { transition: { delayChildren: stagger(0.28) } }
}

const lineItem: Variants = {
  hidden: { opacity: 0, x: -8 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.3, ease: 'easeOut' } }
}

function InteractiveTerminal() {
  const [modeId, setModeId] = useState<ModeId>('fullstack')
  const [running, setRunning] = useState(false)
  const { motionAllowed } = useMotionPreference()
  const mode = modes.find(m => m.id === modeId)!

  const selectMode = (id: ModeId) => {
    if (id === modeId) return
    setModeId(id)
    if (motionAllowed) setRunning(true)
  }

  useEffect(() => {
    if (!running) return
    const timer = setTimeout(() => setRunning(false), 650)
    return () => clearTimeout(timer)
  }, [running, modeId])

  return (
    <div className="terminal shadow-[0_30px_80px_-40px_rgba(0,0,0,0.9)]">
      <div className="terminal-bar">
        <span className="terminal-dot" />
        <span className="terminal-dot" />
        <span className="terminal-dot" />
        <span className="ml-2 text-xs text-faint">{mode.file}</span>
      </div>

      <div role="tablist" aria-label="What I work on" className="flex gap-1 border-b border-white/5 px-3 pt-3">
        {modes.map(m => {
          const active = m.id === modeId
          return (
            <button
              key={m.id}
              type="button"
              role="tab"
              aria-selected={active}
              aria-controls="terminal-output"
              onClick={() => selectMode(m.id)}
              className={`relative cursor-pointer rounded-t-lg px-3 py-2 font-mono text-xs transition-colors duration-200 ${
                active ? 'text-ink' : 'text-faint hover:text-body'
              }`}
            >
              {m.label}
              {active && (
                <motion.span
                  layoutId="terminal-tab"
                  className="absolute inset-x-2 -bottom-px h-px bg-ink"
                  transition={{ type: 'spring', stiffness: 500, damping: 36 }}
                />
              )}
            </button>
          )
        })}
      </div>

      <div id="terminal-output" role="tabpanel" aria-live="polite" className="min-h-[248px] px-5 py-6 text-sm leading-relaxed">
        <AnimatePresence mode="wait" initial={false}>
          {running ? (
            <motion.div
              key="running"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="flex h-[200px] flex-col items-start justify-center gap-3"
            >
              <p className="text-body">
                <span className="text-accent2">$ </span>./{mode.file}
              </p>
              <StripeLoader label={`Running ${mode.label}`} />
            </motion.div>
          ) : (
            <motion.div
              key={modeId}
              variants={lineList}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0, transition: { duration: 0.15 } }}
              className="space-y-2.5"
            >
              {mode.steps.map((step, index) => (
                <div key={step.command} className={index > 0 ? 'pt-3' : ''}>
                  <motion.p variants={lineItem} className="text-body">
                    <span className="text-accent2">$ </span>
                    {step.command}
                  </motion.p>
                  <motion.p variants={lineItem} className={toneClass[step.tone ?? 'ink']}>
                    {step.output}
                  </motion.p>
                </div>
              ))}
              <motion.p variants={lineItem} className="pt-1 text-body">
                <span className="text-accent2">$</span>{' '}
                <span className="ml-0.5 inline-block h-4 w-2 animate-pulse bg-accent2 align-middle" />
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default function LandingHero({ about }: { about: About | null }) {
  const pointerEffects = usePointerEffects()
  const { motionAllowed } = useMotionPreference()
  const heroRef = useRef<HTMLElement>(null)

  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const terminalY = useTransform(scrollYProgress, [0, 1], [0, 80])
  const copyY = useTransform(scrollYProgress, [0, 1], [0, 40])
  const cueOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0])

  // Soft glow that trails the cursor across the hero.
  const glowX = useSpring(useMotionValue(0), { stiffness: 120, damping: 22 })
  const glowY = useSpring(useMotionValue(0), { stiffness: 120, damping: 22 })
  const glowOpacity = useSpring(0, { stiffness: 90, damping: 20 })
  const glow = useMotionTemplate`radial-gradient(520px circle at ${glowX}px ${glowY}px, rgba(255, 255, 255, 0.04), rgba(124, 107, 245, 0.05) 40%, transparent 70%)`

  const handlePointerMove = (e: PointerEvent<HTMLElement>) => {
    if (!pointerEffects || !heroRef.current) return
    const rect = heroRef.current.getBoundingClientRect()
    glowX.set(e.clientX - rect.left)
    glowY.set(e.clientY - rect.top)
    glowOpacity.set(1)
  }

  return (
    <section
      ref={heroRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={() => glowOpacity.set(0)}
      className="relative grid min-h-[calc(100svh-9rem)] items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]"
    >
      {pointerEffects && (
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute -inset-x-24 -inset-y-10 -z-10"
          style={{ background: glow, opacity: glowOpacity }}
        />
      )}

      <motion.div
        style={{ y: copyY }}
        initial="hidden"
        animate="visible"
        variants={{ hidden: {}, visible: { transition: { delayChildren: stagger(0.12, { startDelay: 0.9 }) } } }}
      >
        <motion.span
          className="badge"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <span className="badge-dot" />
          Open to opportunities
        </motion.span>

        <motion.p variants={fadeUp} className="mt-6 font-mono text-sm text-muted">
          Hi, I’m <span className="text-ink">Vince Tyrone Vermudo</span> —
        </motion.p>

        <h1 className="mt-3 font-heading text-4xl font-semibold leading-[1.05] tracking-[-0.03em] text-ink sm:text-6xl">
          <BlurText as="span" text="Building" delay={90} className="!inline-flex" initialDelay={0.1} />{' '}
          <span className="relative whitespace-nowrap text-ink">
            <BlurText as="span" text="modern, scalable" delay={90} className="!inline-flex !flex-nowrap" initialDelay={0.25} />
            <svg
              className="absolute -bottom-1.5 left-0 w-full"
              height="10"
              viewBox="0 0 200 10"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <motion.path
                d="M1 6.5C40 2 160 2 199 6.5"
                stroke="currentColor"
                strokeWidth="1.5"
                fill="none"
                className="text-accent"
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.9, delay: 0.85, ease: [0.65, 0, 0.35, 1] }}
              />
            </svg>
          </span>{' '}
          <BlurText as="span" text="web applications." delay={90} className="!inline-flex" initialDelay={0.45} />
        </h1>

        <motion.div variants={fadeUp} className="mt-7 flex flex-wrap items-center gap-x-2 gap-y-1 font-heading text-lg text-muted sm:text-xl">
          <span>I specialize in</span>
          <RotatingText
            texts={['full-stack web apps.', 'Salesforce automation.', 'QA & test automation.']}
            auto={motionAllowed}
            rotationInterval={2800}
            staggerDuration={0.02}
            staggerFrom="last"
            initial={{ y: '100%', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: '-110%', opacity: 0 }}
            transition={{ type: 'spring', damping: 30, stiffness: 400 }}
            mainClassName="overflow-hidden rounded-md border border-edge-strong bg-surface-3 px-2.5 py-0.5 font-medium text-ink"
            splitLevelClassName="overflow-hidden pb-0.5"
          />
        </motion.div>

        <motion.p variants={fadeUp} className="mt-5 max-w-lg leading-relaxed text-body">
          {about?.headline ??
            'IT professional building modern, scalable web applications — from Salesforce automation to full-stack React and ASP.NET Core.'}
        </motion.p>

        {about?.details && about.details.length > 0 && (
          <motion.ul variants={fadeUp} className="mt-4 space-y-2">
            {about.details.map(detail => (
              <li key={detail} className="flex items-start gap-2.5 text-sm text-body">
                <span className="mt-2 h-px w-3 flex-shrink-0 bg-faint" />
                {detail}
              </li>
            ))}
          </motion.ul>
        )}

        <motion.div variants={fadeUp} className="mt-10 flex flex-wrap items-center gap-5">
          <Magnet padding={60} magnetStrength={4} disabled={!pointerEffects}>
            <SkewButton to="/#projects">
              View projects <span aria-hidden="true">→</span>
            </SkewButton>
          </Magnet>
          <Magnet padding={60} magnetStrength={5} disabled={!pointerEffects}>
            <ScrollLink to="/#contact" className="nav-underline relative inline-flex items-center gap-2 px-3 py-3 text-sm text-body transition-colors duration-200 hover:text-ink">
              Get in touch <span aria-hidden="true">↗</span>
            </ScrollLink>
          </Magnet>
        </motion.div>
      </motion.div>

      <motion.div
        style={{ y: terminalY }}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <InteractiveTerminal />
        <p className="mt-3 text-center font-mono text-xs text-faint">Pick a tab to run a different stack ↑</p>
      </motion.div>

      <motion.div
        aria-hidden="true"
        style={{ opacity: cueOpacity }}
        className="pointer-events-none absolute -bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-faint lg:flex"
      >
        <span className="flex h-9 w-5 justify-center rounded-full border border-edge-strong pt-1.5">
          <motion.span
            className="h-2 w-1 rounded-full bg-ink/70"
            animate={motionAllowed ? { y: [0, 12, 0], opacity: [1, 0.2, 1] } : undefined}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          />
        </span>
        Scroll
      </motion.div>
    </section>
  )
}
