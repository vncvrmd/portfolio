import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { useLenis } from 'lenis/react'
import { useMotionPreference } from '../motionPreference'

const BEST_KEY = 'bug-squash-best'
const BUG_COUNT = 5
const easeOut = [0.16, 1, 0.3, 1] as const

interface IntroState {
  done: boolean
  replay: () => void
}

const IntroContext = createContext<IntroState>({ done: true, replay: () => {} })

// False only while the opt-in bug-squash game is open, so the hero can start its own entrance afterwards.
export function useIntroDone(): boolean {
  return useContext(IntroContext).done
}

export function useReplayIntro(): () => void {
  return useContext(IntroContext).replay
}

function readStorage(storage: 'session' | 'local', key: string): string | null {
  try {
    return (storage === 'session' ? sessionStorage : localStorage).getItem(key)
  } catch {
    return null
  }
}

function writeStorage(storage: 'session' | 'local', key: string, value: string) {
  try {
    ;(storage === 'session' ? sessionStorage : localStorage).setItem(key, value)
  } catch {
    // Storage unavailable (private mode): the best time just isn't remembered.
  }
}

// Random position inside the arena, as percentages, kept clear of the edges.
function randomSpot(): { x: number; y: number } {
  return { x: 8 + Math.random() * 84, y: 10 + Math.random() * 80 }
}

function BugIcon() {
  return (
    <svg width="34" height="34" viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <path
        d="M16 9v18M9 14l-4-2M23 14l4-2M8 19H4M24 19h4M9 24l-4 2M23 24l4 2M12 8l-2-3M20 8l2-3"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <ellipse cx="16" cy="18.5" rx="7" ry="8.5" fill="#09090b" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="16" cy="9.5" r="3.5" fill="#09090b" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="14.6" cy="9.2" r="0.9" fill="#a3e635" />
      <circle cx="17.4" cy="9.2" r="0.9" fill="#a3e635" />
    </svg>
  )
}

function Splat({ x, y }: { x: number; y: number }) {
  return (
    <span aria-hidden="true" className="pointer-events-none absolute" style={{ left: `${x}%`, top: `${y}%` }}>
      {Array.from({ length: 8 }, (_, i) => {
        const angle = (i / 8) * Math.PI * 2
        return (
          <motion.span
            key={i}
            className="absolute h-1 w-1 rounded-full bg-ink"
            initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
            animate={{ x: Math.cos(angle) * 34, y: Math.sin(angle) * 34, opacity: 0, scale: 0.4 }}
            transition={{ duration: 0.5, ease: easeOut }}
          />
        )
      })}
      <motion.span
        className="absolute -left-5 -top-5 h-10 w-10 rounded-full border border-ink/60"
        initial={{ scale: 0.3, opacity: 1 }}
        animate={{ scale: 1.6, opacity: 0 }}
        transition={{ duration: 0.45, ease: easeOut }}
      />
    </span>
  )
}

function Bug({ id, onSquash, wander }: { id: number; onSquash: (spot: { x: number; y: number }) => void; wander: boolean }) {
  const [spot, setSpot] = useState(randomSpot)
  const ref = useRef<HTMLButtonElement>(null)

  // Bugs scuttle to a new spot every so often, so there's a little chase.
  useEffect(() => {
    if (!wander) return
    const coarse = window.matchMedia('(pointer: coarse)').matches
    const timer = setInterval(() => setSpot(randomSpot()), coarse ? 1800 : 1100)
    return () => clearInterval(timer)
  }, [wander])

  // Keyboard players: each new bug takes focus so Enter / Space squashes it.
  useEffect(() => {
    ref.current?.focus({ preventScroll: true })
  }, [])

  return (
    <motion.button
      ref={ref}
      type="button"
      aria-label={`Bug ${id + 1} of ${BUG_COUNT} — squash it`}
      onPointerDown={e => {
        if (e.pointerType !== 'mouse') onSquash(spot)
      }}
      onClick={e => {
        // Touch squashes on pointer-down (before the bug can move away); mouse and keyboard use click.
        if (e.detail === 0 || (e.nativeEvent as PointerEvent).pointerType === 'mouse' || !('pointerType' in e.nativeEvent)) onSquash(spot)
      }}
      className="absolute -ml-7 -mt-7 flex h-14 w-14 cursor-crosshair items-center justify-center rounded-full text-ink outline-none transition-colors duration-200 hover:text-accent2 focus-visible:ring-1 focus-visible:ring-ink/60"
      initial={{ left: `${spot.x}%`, top: `${spot.y}%`, scale: 0, rotate: -40 }}
      animate={{ left: `${spot.x}%`, top: `${spot.y}%`, scale: 1, rotate: 0 }}
      exit={{ scale: 0, rotate: 90, opacity: 0, transition: { duration: 0.18 } }}
      transition={{ type: 'spring', stiffness: 160, damping: 18 }}
    >
      <BugIcon />
    </motion.button>
  )
}

function BugSquashGame({ onDone }: { onDone: () => void }) {
  const { motionAllowed } = useMotionPreference()
  const [squashed, setSquashed] = useState(0)
  const [splats, setSplats] = useState<{ key: number; x: number; y: number }[]>([])
  const [finishedIn, setFinishedIn] = useState<number | null>(null)
  const [best, setBest] = useState(() => Number(readStorage('local', BEST_KEY)) || null)
  const startedAt = useRef<number | null>(null)
  const exited = useRef(false)

  const exit = useCallback(() => {
    if (exited.current) return
    exited.current = true
    onDone()
  }, [onDone])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') exit()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [exit])

  const squash = (spot: { x: number; y: number }) => {
    startedAt.current ??= performance.now()
    const next = squashed + 1
    setSquashed(next)
    if (motionAllowed) setSplats(s => [...s.slice(-4), { key: next, ...spot }])

    if (next === BUG_COUNT) {
      const seconds = (performance.now() - startedAt.current) / 1000
      setFinishedIn(seconds)
      if (!best || seconds < best) {
        setBest(seconds)
        writeStorage('local', BEST_KEY, seconds.toFixed(2))
      }
      setTimeout(exit, 1600)
    }
  }

  const cleared = finishedIn !== null

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col bg-surface"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.5, ease: easeOut } }}
      role="dialog"
      aria-modal="true"
      aria-label="Bug squash — a quick mini-game"
    >
      <div className="flex items-center justify-between px-6 py-5 sm:px-10">
        <span className="font-heading text-sm font-semibold tracking-tight text-ink">
          Vince Tyrone <span className="text-muted">Vermudo</span>
        </span>
        <button
          type="button"
          onClick={exit}
          className="nav-underline relative min-h-[44px] cursor-pointer px-3 py-1.5 text-sm text-muted transition-colors duration-200 hover:text-ink"
        >
          Back to site →
        </button>
      </div>

      <div className="mx-auto flex w-full max-w-5xl flex-1 flex-col px-6 pb-8 sm:px-10">
        <div className="flex flex-wrap items-end justify-between gap-4 pb-6">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted">Mini-game</p>
            <h1 className="mt-3 font-heading text-3xl font-semibold tracking-[-0.03em] text-ink sm:text-5xl">
              {cleared ? 'All clear. Nice work.' : `Squash ${BUG_COUNT} bugs.`}
            </h1>
          </div>
          <div className="text-right font-mono text-xs text-muted" aria-live="polite">
            <p className="text-2xl tabular-nums text-ink">
              {squashed}
              <span className="text-faint">/{BUG_COUNT}</span>
            </p>
            <p className="mt-1">
              {cleared
                ? `Debugged in ${finishedIn!.toFixed(1)}s${best && best >= finishedIn! ? ' · new best' : ''}`
                : best
                  ? `Best ${best.toFixed(1)}s`
                  : 'Click or tap · Enter works too'}
            </p>
          </div>
        </div>

        <div className="relative flex-1 touch-manipulation overflow-hidden rounded-xl border border-edge bg-[radial-gradient(circle,rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:28px_28px]">
          <AnimatePresence>
            {!cleared && <Bug key={squashed} id={squashed} onSquash={squash} wander={motionAllowed} />}
          </AnimatePresence>
          {splats.map(s => (
            <Splat key={s.key} x={s.x} y={s.y} />
          ))}
          {cleared && (
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: easeOut }}
            >
              <p className="font-mono text-sm text-ok">✓ 0 bugs remaining — back to the portfolio…</p>
            </motion.div>
          )}
          <div className="absolute inset-x-0 bottom-0 h-px bg-edge">
            <motion.div
              className="h-full origin-left bg-ink"
              animate={{ scaleX: squashed / BUG_COUNT }}
              transition={{ duration: 0.4, ease: easeOut }}
            />
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export function IntroProvider({ children }: { children: ReactNode }) {
  // The game is opt-in: the site opens straight away and visitors start it from a "Play" button.
  const [done, setDone] = useState(true)
  const [round, setRound] = useState(0)
  const lenis = useLenis()

  // Keep the page behind the game from scrolling while it's open.
  useEffect(() => {
    if (done) return
    lenis?.stop()
    const root = document.documentElement
    const previous = root.style.overflow
    root.style.overflow = 'hidden'
    return () => {
      root.style.overflow = previous
      lenis?.start()
    }
  }, [done, lenis])

  const replay = useCallback(() => {
    if (lenis) lenis.scrollTo(0, { immediate: true })
    else window.scrollTo({ top: 0 })
    setRound(r => r + 1)
    setDone(false)
  }, [lenis])

  return (
    <IntroContext.Provider value={{ done, replay }}>
      {children}
      <AnimatePresence>{!done && <BugSquashGame key={round} onDone={() => setDone(true)} />}</AnimatePresence>
    </IntroContext.Provider>
  )
}
