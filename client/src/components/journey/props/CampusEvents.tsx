import { motion } from 'motion/react'
import { Building, Parol, ink } from '../primitives'

interface CampusEvent {
  name: string
  color: string
  width: number // px, fixed so long names wrap the same way every time
  parol?: string // lantern color hung above the Paskuhan tags
}

// Three rows on the festival board, top to bottom. Widths are tuned for 9px JetBrains Mono (about 5.4px per character).
const eventRows: CampusEvent[][] = [
  [
    { name: 'R101 2024', color: '#f9a8d4', width: 72 },
    { name: 'R101 2025', color: '#fdba74', width: 72 },
    { name: 'UST Paskuhan 2024', color: '#fde047', width: 84, parol: '#f43f5e' },
    { name: 'UST Paskuhan 2025', color: '#86efac', width: 84, parol: '#facc15' }
  ],
  [
    { name: 'ROARientation and Welcome Walk 2024', color: '#7dd3fc', width: 112 },
    { name: 'Thomasian Welcome Party 2024', color: '#bef264', width: 112 },
    { name: 'Secretariat 2024', color: '#c4b5fd', width: 80 }
  ],
  [
    { name: 'Thomasian Youth Ambassador and Ambassadress 2025', color: '#fda4af', width: 112 },
    { name: 'SOCC 50th Homecoming Anniversary', color: '#fef08a', width: 96 },
    { name: 'MAKIBATA 2025', color: '#5eead4', width: 64 },
    { name: 'Diamonds 2024', color: '#e9d5ff', width: 64 }
  ]
]

// Running index of the first tag in each row, so tags pop in reading order.
const rowStart = eventRows.map((_, r) => eventRows.slice(0, r).reduce((n, row) => n + row.length, 0))

const buntingColors = ['#f43f5e', '#facc15', '#38bdf8', '#a3e635', '#f472b6', '#fb923c']
// Pennant flags along a sagging string (quadratic curve from y=2 at the ends to y=5 in the middle).
const bunting = Array.from({ length: 18 }, (_, i) => {
  const x = 6 + i * 21
  const t = (x + 7) / 378
  const y = 2 + 12 * t * (1 - t)
  return `${x},${y.toFixed(1)} ${x + 14},${y.toFixed(1)} ${x + 7},${(y + 9).toFixed(1)}`
})

// SOCC headquarters beside a festival board; the event tags pop in one after another and Parol lanterns hang over Paskuhan.
export function CampusEvents({ active }: { active: boolean }) {
  return (
    <div className="flex items-end gap-2" aria-hidden="true">
      {/* On phones only the board shows, so the event names stay readable. */}
      <div className="max-sm:hidden">
        <Building label="SOCC" color="#0f766e" floors={3} width={88} />
      </div>
      <div className="flex flex-col items-center">
        <div className={`flex w-[384px] flex-col ${ink} bg-[#1f2937] px-2 pb-2 shadow-[4px_4px_0_#09090b]`}>
          <svg className="-mx-2 block" width="378" height="14" viewBox="0 0 378 14">
            <path d="M0 2 Q189 8 378 2" fill="none" stroke="#fafafa" strokeWidth="1.5" />
            {bunting.map((points, i) => (
              <polygon
                key={i}
                points={points}
                fill={buntingColors[i % buntingColors.length]}
                stroke="#09090b"
                strokeWidth="1.5"
              />
            ))}
          </svg>
          <div className="flex flex-col gap-1.5">
            {eventRows.map((row, r) => (
              <div key={r} className="flex items-end justify-center gap-1.5">
                {row.map((ev, c) => {
                  const i = rowStart[r] + c
                  return (
                    <div key={ev.name} className="flex flex-col items-center">
                      {ev.parol && (
                        <motion.div
                          initial={false}
                          animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: -16 }}
                          transition={{ type: 'spring', stiffness: 200, damping: 12, delay: active ? 0.3 + i * 0.08 : 0 }}
                        >
                          <Parol color={ev.parol} delay={i * 0.2} />
                        </motion.div>
                      )}
                      <motion.div
                        className={`relative ${ink} px-1 py-1 text-center font-mono text-[9px] font-bold leading-tight text-surface shadow-[2px_2px_0_rgba(0,0,0,0.5)]`}
                        style={{ width: ev.width, background: ev.color }}
                        initial={false}
                        animate={active ? { scale: 1, opacity: 1, rotate: i % 2 ? 1.5 : -1.5 } : { scale: 0, opacity: 0, rotate: 0 }}
                        transition={{ type: 'spring', stiffness: 260, damping: 14, delay: active ? 0.15 + i * 0.08 : 0 }}
                      >
                        <span className="absolute -top-1.5 left-1/2 h-2 w-2 -translate-x-1/2 rounded-full border-2 border-[#09090b] bg-[#f43f5e]" />
                        {ev.name}
                      </motion.div>
                    </div>
                  )
                })}
              </div>
            ))}
          </div>
        </div>
        <div className="flex w-[320px] justify-between">
          <span className="h-9 w-2 border-x-[3px] border-[#09090b] bg-[#92400e]" />
          <span className="h-9 w-2 border-x-[3px] border-[#09090b] bg-[#92400e]" />
        </div>
      </div>
    </div>
  )
}
