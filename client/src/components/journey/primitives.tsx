import type { ReactNode } from 'react'
import { motion } from 'motion/react'

// Shared drawing pieces for the journey's scene props: thick ink outlines, buildings, signposts, lanterns and confetti.

export const ink = 'border-[3px] border-[#09090b]'

export function Building({ label, color, floors = 4, width = 160 }: { label: string; color: string; floors?: number; width?: number }) {
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

export function Sign({ children, color = '#fef3c7' }: { children: ReactNode; color?: string }) {
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
export function Parol({ color, delay }: { color: string; delay: number }) {
  return (
    <motion.svg width="34" height="44" viewBox="0 0 34 44" animate={{ rotate: [-6, 6, -6] }} transition={{ duration: 2.4, repeat: Infinity, delay }}>
      <line x1="17" y1="0" x2="17" y2="8" stroke="#09090b" strokeWidth="2" />
      <polygon points="17,8 21,18 32,18 23,25 26,36 17,29 8,36 11,25 2,18 13,18" fill={color} stroke="#09090b" strokeWidth="2" />
      <path d="M13 34 L11 44 M21 34 L23 44" stroke={color} strokeWidth="2" />
    </motion.svg>
  )
}

// Fixed spread so the burst looks the same every time (no Math.random during render).
const confettiSpread = Array.from({ length: 24 }, (_, i) => {
  const r1 = Math.abs(Math.sin(i * 91.7)) % 1
  const r2 = Math.abs(Math.sin(i * 37.3)) % 1
  return { angle: -Math.PI / 2 + (r1 - 0.5) * Math.PI * 0.9, dist: 90 + r2 * 90 }
})

export function Confetti({ active }: { active: boolean }) {
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
