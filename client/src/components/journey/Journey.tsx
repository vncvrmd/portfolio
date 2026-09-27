import { memo, useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import {
  AnimatePresence,
  motion,
  transform,
  useMotionValueEvent,
  useScroll,
  useTransform,
  useVelocity,
  type MotionValue
} from 'motion/react'
import { useLenis } from 'lenis/react'
import confetti from 'canvas-confetti'
import PixelSprite, { type SpriteFrame } from './PixelSprite'
import { scenes, type JourneyProject, type Scene, type SceneContext } from './scenes'
import JourneyFinale from './JourneyFinale'
import { apiUrl } from '../../api'
import { useSound } from '../../soundPreference'

const ASCENT_SCENES = 1.6 // extra scroll (in scenes) for the balloon ride up to the finale
const STRIDE_PX = 55 // scroll distance per walk-cycle frame
const IDLE_AFTER_MS = 180
const walkCycle: SpriteFrame[] = ['stand', 'strideA', 'stand', 'strideB']

const span = scenes.length - 1
const totalScenes = scenes.length + ASCENT_SCENES
const WALK_SHARE = scenes.length / totalScenes // share of the scroll spent walking sideways

// Scroll offset (px from the page top) where a scene is centred, used for nav and level buttons.
export function sceneScrollOffset(index: number, container: HTMLElement): number {
  const travel = container.offsetHeight - window.innerHeight
  const top = container.getBoundingClientRect().top + window.scrollY
  if (index > span) return top + travel
  return top + travel * WALK_SHARE * (index / span)
}

function seeded(i: number) {
  const x = Math.sin(i * 12.9898) * 43758.5453
  return x - Math.floor(x)
}

function Layer({ x, y, className, width, children }: {
  x: MotionValue<string>
  y?: MotionValue<string>
  className?: string
  width: string
  children?: ReactNode
}) {
  return (
    <motion.div aria-hidden="true" className={`absolute left-0 ${className ?? ''}`} style={{ x, y, width }}>
      {children}
    </motion.div>
  )
}

const Clouds = memo(function Clouds({ count }: { count: number }) {
  return (
    <>
      {Array.from({ length: count }, (_, i) => {
        const w = 70 + seeded(i) * 90
        return (
          <span key={i} className="absolute" style={{ left: `${i * 38 + seeded(i + 7) * 20}vw`, top: `${10 + seeded(i + 3) * 55}%`, opacity: 0.5 + seeded(i + 11) * 0.35 }}>
            <span className="block h-5 bg-white/80" style={{ width: w }} />
            <span className="-mt-9 ml-4 block h-5 bg-white/80" style={{ width: w * 0.55 }} />
          </span>
        )
      })}
    </>
  )
})

const Skyline = memo(function Skyline({ count }: { count: number }) {
  return (
    <div className="absolute inset-x-0 bottom-0 flex h-full items-end gap-2">
      {Array.from({ length: count }, (_, i) => (
        <span
          key={i}
          className="flex-shrink-0 bg-black/30"
          style={{ width: 40 + seeded(i) * 60, height: `${30 + seeded(i + 5) * 65}%`, marginLeft: seeded(i + 9) * 40 }}
        />
      ))}
    </div>
  )
})

function SceneCard({ scene, index, progress }: { scene: Scene; index: number; progress: MotionValue<number> }) {
  const center = index / span
  const half = 0.5 / span
  const isFirst = index === 0
  const isLast = index === span
  const fadeRange = isFirst
    ? [center + half * 0.35, center + half]
    : isLast
      ? [center - half, center - half * 0.35]
      : [center - half, center - half * 0.35, center + half * 0.35, center + half]
  const fadeValues = isFirst ? [1, 0] : isLast ? [0, 1] : [0, 1, 1, 0]
  // Function form keeps this on the JS side: the natively accelerated version stalled on the edge cards.
  const opacity = useTransform(progress, p => transform(p, fadeRange, fadeValues))
  const y = useTransform(progress, p => (isFirst ? 0 : transform(p, [center - half, center - half * 0.35], [24, 0])))

  return (
    <motion.article
      style={{ opacity, y }}
      className="journey-card absolute left-[5vw] top-[11vh] w-[min(440px,90vw)] rounded-2xl border-[3px] border-surface bg-[#fefce8] p-5 text-surface shadow-[6px_6px_0_#09090b] sm:left-[8vw] sm:top-[15vh] sm:p-6"
    >
      <p className="font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-accent-strong">
        Level {String(index + 1).padStart(2, '0')} · {scene.when}
      </p>
      <h2 className="mt-2 font-heading text-2xl font-bold leading-tight sm:text-3xl">{scene.title}</h2>
      {scene.subtitle && <p className="mt-1 text-sm font-medium text-surface/60">{scene.subtitle}</p>}
      <div className="mt-3 text-sm leading-relaxed text-surface/85">{scene.body}</div>
    </motion.article>
  )
}

function Landmark({ scene, active, ctx }: { scene: Scene; active: boolean; ctx: SceneContext }) {
  return (
    <motion.div
      className="journey-prop origin-bottom"
      initial={false}
      animate={active ? { scaleY: 1, opacity: 1, y: 0 } : { scaleY: 0.2, opacity: 0, y: 30 }}
      transition={{ type: 'spring', stiffness: 320, damping: 13 }}
    >
      {scene.prop(active, ctx)}
    </motion.div>
  )
}

function Flag({ label }: { label: string }) {
  return (
    <div className="absolute bottom-[var(--ground)] left-[4vw] flex items-end" aria-hidden="true">
      <span className="h-32 w-1.5 bg-[#e5e7eb] shadow-[2px_0_0_#09090b]" />
      <motion.span
        className="mb-[5.5rem] -ml-px border-[3px] border-[#09090b] bg-accent2 px-2 py-1 font-mono text-xs font-bold text-surface"
        animate={{ skewY: [0, -4, 0, 4, 0] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
      >
        {label}
      </motion.span>
    </div>
  )
}

// Envelope and ropes sit behind the character; the basket is drawn in front so it looks like they're standing in it.
function BalloonTop() {
  return (
    <svg width="130" height="220" viewBox="0 0 130 220" aria-hidden="true" className="absolute bottom-[10px] left-1/2 -translate-x-1/2">
      <path d="M65 4C31 4 10 30 10 60c0 28 24 48 43 64h24c19-16 43-36 43-64C120 30 99 4 65 4z" fill="#7c6bf5" stroke="#09090b" strokeWidth="4" />
      <path d="M65 4c-15 0-23 26-23 56s13 48 17 64M65 4c15 0 23 26 23 56s-13 48-17 64" fill="none" stroke="#a3e635" strokeWidth="4" />
      <rect x="52" y="122" width="26" height="10" fill="#6152e0" stroke="#09090b" strokeWidth="3" />
      <path d="M54 132L34 206M76 132l20 74" stroke="#09090b" strokeWidth="3" />
    </svg>
  )
}

function BalloonBasket() {
  return <span aria-hidden="true" className="absolute -bottom-3 left-1/2 h-9 w-[76px] -translate-x-1/2 border-[3px] border-[#09090b] bg-[#92400e] shadow-[inset_0_-6px_0_rgba(0,0,0,0.25)]" />
}

type Phase = 'walk' | 'ascent' | 'finale'

// The character owns its walk-cycle state, so scrolling re-renders only this small subtree,
// not the whole stage (scenery, cards, props).
const Character = memo(function Character({ scrollY, scrollYProgress, walk, phase, bubble, charVw }: {
  scrollY: MotionValue<number>
  scrollYProgress: MotionValue<number>
  walk: MotionValue<number>
  phase: Phase
  bubble: string
  charVw: number
}) {
  const { play } = useSound()
  const [frame, setFrame] = useState<SpriteFrame>('stand')
  const [facing, setFacing] = useState<1 | -1>(1)
  const [walking, setWalking] = useState(false)
  const [lift, setLift] = useState(0)
  const velocity = useVelocity(scrollY)
  const idleTimer = useRef<ReturnType<typeof setTimeout>>()
  const lastStep = useRef(0)
  // Walk cycle follows scroll distance, so the character stops the moment scrolling stops.
  useMotionValueEvent(scrollY, 'change', y => {
    const p = scrollYProgress.get()
    if (p <= 0 || p >= WALK_SHARE) return
    const step = Math.floor(y / STRIDE_PX)
    setFrame(walkCycle[((step % walkCycle.length) + walkCycle.length) % walkCycle.length])
    if (step !== lastStep.current && step % 2 === 0) play('step')
    lastStep.current = step
    setWalking(true)
    clearTimeout(idleTimer.current)
    idleTimer.current = setTimeout(() => {
      setWalking(false)
      setFrame('stand')
    }, IDLE_AFTER_MS)
  })

  // Terrain under the character: its world position in vw, then the platform in that scene slot.
  useMotionValueEvent(walk, 'change', w => {
    const worldVw = charVw + w * span * 100
    const slot = Math.floor(worldVw / 100)
    const local = worldVw - slot * 100
    const platform = scenes[slot]?.terrain?.find(t => local >= t.from && local < t.to)
    setLift(prev => {
      const next = platform?.height ?? 0
      if (next > prev) play('jump')
      return next
    })
  })

  useMotionValueEvent(velocity, 'change', v => {
    if (Math.abs(v) > 20) setFacing(v > 0 ? 1 : -1)
  })

  useEffect(() => () => clearTimeout(idleTimer.current), [])

  const riding = phase !== 'walk'
  const spriteFrame: SpriteFrame = phase === 'finale' ? 'cheer' : riding ? 'stand' : frame


  return (
    <div className="journey-character absolute bottom-[var(--ground)]" style={{ left: `${charVw}vw` }}>
      <motion.div animate={{ y: -lift }} transition={{ type: 'spring', stiffness: 500, damping: 18 }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={bubble}
            className="absolute bottom-full left-1/2 -translate-x-1/2 whitespace-nowrap rounded-lg border-[3px] border-surface bg-white px-3 py-1.5 font-mono text-xs font-bold text-surface shadow-[3px_3px_0_#09090b]"
            style={{ marginBottom: riding ? 225 : 12 }}
            initial={{ opacity: 0, y: 8, scale: 0.8 }}
            animate={{ opacity: walking ? 0 : 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 400, damping: 22 }}
          >
            {bubble}
            <span className="absolute left-1/2 top-full -ml-1.5 h-0 w-0 border-x-[6px] border-t-[8px] border-x-transparent border-t-surface" />
          </motion.div>
        </AnimatePresence>
        {riding && <BalloonTop />}
        <motion.div
          className="journey-sprite relative"
          animate={walking ? { y: [0, -4, 0] } : phase === 'finale' ? { y: [0, -16, 0] } : { y: [0, -3, 0] }}
          transition={
            walking
              ? { duration: 0.3, repeat: Infinity }
              : phase === 'finale'
                ? { duration: 0.6, repeat: 6, repeatDelay: 0.4, ease: 'easeOut' }
                : { duration: 1.6, repeat: 3, ease: 'easeInOut' }
          }
        >
          <PixelSprite frame={spriteFrame} facing={facing} />
        </motion.div>
        {riding && <BalloonBasket />}
      </motion.div>
    </div>
  )
})

export default function Journey() {
  const containerRef = useRef<HTMLDivElement>(null)
  const lenis = useLenis()
  const { play } = useSound()
  const { scrollYProgress, scrollY } = useScroll({ target: containerRef, offset: ['start start', 'end end'] })

  // Two phases: walk sideways, then ride the balloon straight up to the finale.
  const walk = useTransform(scrollYProgress, p => Math.min(p / WALK_SHARE, 1))
  const ascent = useTransform(scrollYProgress, p => transform(p, [WALK_SHARE, 1], [0, 1]))
  const worldX = useTransform(walk, w => `${-w * span * 100}vw`)
  const drop = useTransform(ascent, a => `${a * 115}vh`) // world sinks = camera rises
  const dropSlow = useTransform(ascent, a => `${a * 45}vh`)
  const cardsOpacity = useTransform(ascent, a => transform(a, [0, 0.2], [1, 0]))
  const layerX = (factor: number) => (w: number) => `${-w * span * 100 * factor}vw`
  const starsX = useTransform(walk, layerX(0.05))
  const cloudsX = useTransform(walk, layerX(0.12))
  const skylineX = useTransform(walk, layerX(0.25))
  const hillsX = useTransform(walk, layerX(0.5))
  const groundX = useTransform(walk, layerX(1))
  const layerWidth = (factor: number) => `${(span * factor + 1) * 100 + 10}vw`
  const sky = useTransform(
    scrollYProgress,
    [...scenes.map((_, i) => (i / span) * WALK_SHARE), 1],
    [...scenes.map(s => s.sky), '#0b1030']
  )

  const [sceneIndex, setSceneIndex] = useState(0)
  const [phase, setPhase] = useState<Phase>('walk')
  const [projects, setProjects] = useState<JourneyProject[]>([])
  const [charVw, setCharVw] = useState(() => (window.innerWidth >= 640 ? 30 : 20))

  useEffect(() => {
    fetch(apiUrl('/api/projects'))
      .then(res => res.json())
      .then(data => setProjects(data.projects))
      .catch(err => console.error(err))
  }, [])

  useEffect(() => {
    const onResize = () => setCharVw(window.innerWidth >= 640 ? 30 : 20)
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  useMotionValueEvent(walk, 'change', w => {
    const index = Math.round(w * span)
    setSceneIndex(prev => {
      if (index > prev) play('coin')
      return index
    })
  })

  useMotionValueEvent(ascent, 'change', a => setPhase(a <= 0 ? 'walk' : a < 0.85 ? 'ascent' : 'finale'))

  // Finale celebration: confetti cannons and a level-up jingle, once per arrival.
  useEffect(() => {
    if (phase !== 'finale') return
    play('levelUp')
    const colors = ['#a3e635', '#7c6bf5', '#fafafa', '#facc15']
    const end = Date.now() + 1800
    let frameId = 0
    const burst = () => {
      confetti({ particleCount: 4, angle: 60, spread: 60, origin: { x: 0, y: 0.8 }, colors, disableForReducedMotion: true, zIndex: 40 })
      confetti({ particleCount: 4, angle: 120, spread: 60, origin: { x: 1, y: 0.8 }, colors, disableForReducedMotion: true, zIndex: 40 })
      if (Date.now() < end) frameId = requestAnimationFrame(burst)
    }
    burst()
    return () => {
      cancelAnimationFrame(frameId)
      confetti.reset()
    }
  }, [phase, play])

  const goToScene = useCallback(
    (index: number) => {
      const container = containerRef.current
      if (!container) return
      const target = sceneScrollOffset(index, container)
      if (lenis) lenis.scrollTo(target, { duration: 1.4 })
      else window.scrollTo({ top: target })
    },
    [lenis]
  )

  // Header nav: "/#projects" etc. arrive as events and map to their level; the current level is reported back.
  useEffect(() => {
    const onGoto = (e: Event) => {
      const id = (e as CustomEvent<string>).detail
      if (id === 'contact') return goToScene(span + 1)
      const index = scenes.findIndex(s => s.nav?.toLowerCase() === id)
      if (index >= 0) goToScene(index)
    }
    window.addEventListener('journey:goto', onGoto)
    return () => window.removeEventListener('journey:goto', onGoto)
  }, [goToScene])

  useEffect(() => {
    let navId = 'home'
    if (phase !== 'walk') navId = 'contact'
    else
      for (let i = sceneIndex; i >= 0; i--) {
        if (scenes[i].nav) {
          navId = scenes[i].nav!.toLowerCase()
          break
        }
      }
    window.dispatchEvent(new CustomEvent('journey:scene', { detail: navId }))
  }, [sceneIndex, phase])

  // Arrow keys / A-D jump between levels while the journey is on screen.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement
      if (target.closest('input, textarea, select, [contenteditable]')) return
      const current = phase === 'walk' ? sceneIndex : span + 1
      if (e.key === 'ArrowRight' || e.key.toLowerCase() === 'd') {
        e.preventDefault()
        goToScene(Math.min(current + 1, span + 1))
      } else if (e.key === 'ArrowLeft' || e.key.toLowerCase() === 'a') {
        e.preventDefault()
        goToScene(Math.max(current - 1, 0))
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [goToScene, phase, sceneIndex])

  const ctx = useMemo<SceneContext>(() => ({ projects }), [projects])
  const bubble = phase === 'finale' ? 'You made it! 🎉' : phase === 'ascent' ? 'Up we go! 🎈' : scenes[sceneIndex].bubble

  return (
    <div
      ref={containerRef}
      id="journey"
      className="journey-root relative left-1/2 w-screen -translate-x-1/2"
      style={{ height: `calc(var(--scene-scroll) * ${totalScenes})` }}
    >
      <motion.div className="sticky top-0 h-[100lvh] overflow-hidden" style={{ backgroundColor: sky }}>
        {/* Far → near parallax layers; lower layers sink faster during the ascent */}
        <Layer x={starsX} width={layerWidth(0.05)} className="journey-stars top-0 h-[70%]" />
        <Layer x={cloudsX} y={dropSlow} width={layerWidth(0.12)} className="top-[6%] h-[34%]">
          <Clouds count={Math.ceil(((span * 0.12 + 1) * 100) / 38) + 1} />
        </Layer>
        <Layer x={skylineX} y={drop} width={layerWidth(0.25)} className="bottom-[var(--ground)] h-[30vh]">
          <Skyline count={Math.ceil((span * 0.25 + 1) * 30)} />
        </Layer>
        <Layer x={hillsX} y={drop} width={layerWidth(0.5)} className="journey-hills bottom-[var(--ground)] h-[20vh]" />

        {/* World: one screen-wide slot per scene */}
        <motion.div className="absolute inset-y-0 left-0 flex" style={{ x: worldX, y: drop, width: `${scenes.length * 100}vw` }}>
          {scenes.map((scene, i) => (
            <div key={scene.id} className="relative h-full w-screen flex-shrink-0">
              {scene.flag && <Flag label={scene.flag} />}
              {scene.terrain?.map(t => (
                <div
                  key={t.from}
                  aria-hidden="true"
                  className="absolute border-[3px] border-b-0 border-[#09090b] bg-[#a16207] shadow-[inset_0_6px_0_#a3e635]"
                  style={{ left: `${t.from}vw`, width: `${t.to - t.from}vw`, bottom: 'var(--ground)', height: t.height }}
                >
                  {t.label && <span className="absolute left-2 top-2 font-mono text-[10px] font-bold text-[#fef3c7]">{t.label}</span>}
                </div>
              ))}
              <div className="absolute bottom-[var(--ground)] left-[44vw] sm:left-[46vw]">
                <Landmark scene={scene} active={sceneIndex >= i} ctx={ctx} />
              </div>
            </div>
          ))}
        </motion.div>

        <Layer x={groundX} y={drop} width={layerWidth(1)} className="journey-ground bottom-0 h-[var(--ground)]" />

        {/* Character stays put while the world moves; hops onto platforms, then boards the balloon */}
        <Character scrollY={scrollY} scrollYProgress={scrollYProgress} walk={walk} phase={phase} bubble={bubble} charVw={charVw} />

        {/* Story cards (walk phase) */}
        <motion.div className="pointer-events-none absolute inset-0" style={{ opacity: cardsOpacity }}>
          {scenes.map((scene, i) => (
            <SceneCard key={scene.id} scene={scene} index={i} progress={walk} />
          ))}
        </motion.div>

        {/* Finale on the clouds: contact */}
        <JourneyFinale ascent={ascent} />

        {/* HUD: level buttons (real controls for keyboard and touch) */}
        <nav aria-label="Journey levels" className="absolute inset-x-0 bottom-3 flex items-center justify-center gap-1 pb-[env(safe-area-inset-bottom)]">
          {[...scenes.map(s => ({ id: s.id, title: s.title })), { id: 'contact', title: 'Contact' }].map((s, i) => {
            const current = phase === 'walk' ? i === sceneIndex : i === span + 1
            const visited = phase === 'walk' ? i < sceneIndex : i <= span
            return (
              <button
                key={s.id}
                type="button"
                onClick={() => goToScene(i)}
                aria-label={`Level ${i + 1}: ${s.title}`}
                aria-current={current ? 'step' : undefined}
                className="group flex h-8 min-w-[18px] cursor-pointer items-center justify-center"
              >
                <span
                  className={`block h-2 transition-all duration-300 ${current ? 'w-7 bg-white' : visited ? 'w-2 bg-white/70 group-hover:bg-white' : 'w-2 bg-white/25 group-hover:bg-white/60'}`}
                />
              </button>
            )
          })}
        </nav>

        <p className="sr-only" aria-live="polite">
          {phase === 'walk' ? `Level ${sceneIndex + 1} of ${span + 2}: ${scenes[sceneIndex].title}` : phase === 'finale' ? 'Final level: contact' : ''}
        </p>
      </motion.div>
    </div>
  )
}
