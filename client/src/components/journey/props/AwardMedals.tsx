import { motion } from 'motion/react'
import { Confetti, ink } from '../primitives'

interface Medal {
  name: string
  strap: string
  stripe: string
  emblem: 'star' | 'people'
}

const medals: Medal[] = [
  { name: 'St. Dominic de Guzman Award', strap: '#1e3a8a', stripe: '#fafafa', emblem: 'star' },
  { name: 'Pope Leo XIII Community Development Award', strap: '#fafafa', stripe: '#1e3a8a', emblem: 'people' }
]

function Emblem({ kind }: { kind: Medal['emblem'] }) {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40">
      {kind === 'star' ? (
        <polygon points="20,4 24.5,15 36,15.5 27,23 30,35 20,28.5 10,35 13,23 4,15.5 15.5,15" fill="#1e3a8a" stroke="#09090b" strokeWidth="2" strokeLinejoin="round" />
      ) : (
        <g fill="#1e3a8a" stroke="#09090b" strokeWidth="2">
          <circle cx="11" cy="15" r="4.5" />
          <circle cx="29" cy="15" r="4.5" />
          <circle cx="20" cy="11" r="5" />
          <path d="M3 33c0-7 4-11 8-11s8 4 8 11zM21 33c0-7 4-11 8-11s8 4 8 11z" />
          <path d="M11 34c0-9 4-15 9-15s9 6 9 15z" />
        </g>
      )}
    </svg>
  )
}

// Two medals swing down from a gold rail with a shine sweep and a confetti burst when the character arrives.
export function AwardMedals({ active }: { active: boolean }) {
  return (
    <div className="relative flex flex-col items-center" aria-hidden="true">
      <Confetti active={active} />
      <div className="relative flex gap-5 px-5 pb-3">
        <span className={`absolute inset-x-0 top-0 z-10 h-3 rounded-full ${ink} bg-[#eab308]`} />
        <span className="absolute bottom-0 left-0 top-0 w-3 border-x-[3px] border-[#09090b] bg-[#a16207]" />
        <span className="absolute bottom-0 right-0 top-0 w-3 border-x-[3px] border-[#09090b] bg-[#a16207]" />
        {medals.map((m, i) => (
          <div key={m.name} className="flex w-[150px] flex-col items-center pt-2">
            <motion.div
              className="flex flex-col items-center"
              style={{ originX: 0.5, originY: 0 }}
              initial={false}
              animate={active ? { rotate: 0, y: 0, opacity: 1 } : { rotate: i ? 70 : -70, y: -30, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 90, damping: 7, delay: active ? 0.2 + i * 0.25 : 0 }}
            >
              <motion.div
                className="flex flex-col items-center"
                style={{ originX: 0.5, originY: 0 }}
                initial={false}
                animate={active ? { rotate: [-2, 2, -2] } : { rotate: 0 }}
                transition={active ? { duration: 3.2, repeat: Infinity, ease: 'easeInOut', delay: 1.6 + i * 0.4 } : { duration: 0 }}
              >
                <svg width="60" height="52" viewBox="0 0 60 52">
                  <polygon points="4,0 24,0 40,50 22,50" fill={m.strap} stroke="#09090b" strokeWidth="3" strokeLinejoin="round" />
                  <polygon points="36,0 56,0 38,50 20,50" fill={m.strap} stroke="#09090b" strokeWidth="3" strokeLinejoin="round" />
                  <path d="M14 0 L31 50 M46 0 L29 50" stroke={m.stripe} strokeWidth="4" />
                  <path d="M14 0 L31 50 M46 0 L29 50" stroke="#facc15" strokeWidth="1.5" />
                  <rect x="20" y="44" width="20" height="8" fill="#eab308" stroke="#09090b" strokeWidth="3" />
                </svg>
                <div className={`relative -mt-1 flex h-[76px] w-[76px] items-center justify-center overflow-hidden rounded-full ${ink} bg-[#facc15] shadow-[4px_4px_0_#09090b]`}>
                  <span className="absolute inset-1.5 rounded-full border-2 border-dashed border-[#a16207] bg-[#eab308]" />
                  <span className="relative">
                    <Emblem kind={m.emblem} />
                  </span>
                  <motion.span
                    className="absolute -top-4 h-[110px] w-4 bg-white/70"
                    style={{ rotate: 20 }}
                    initial={false}
                    animate={active ? { x: [-60, 60] } : { x: -60 }}
                    transition={
                      active ? { duration: 0.8, ease: 'easeInOut', delay: 1 + i * 0.25, repeat: Infinity, repeatDelay: 3.5 } : { duration: 0 }
                    }
                  />
                </div>
              </motion.div>
            </motion.div>
            <motion.div
              className={`mt-3 w-full ${ink} bg-white px-1.5 py-1 text-center font-mono text-[9px] font-bold uppercase leading-tight text-surface shadow-[4px_4px_0_#09090b]`}
              initial={false}
              animate={active ? { scale: 1, opacity: 1 } : { scale: 0.4, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 15, delay: active ? 0.7 + i * 0.25 : 0 }}
            >
              {m.name}
            </motion.div>
          </div>
        ))}
      </div>
      <div className={`relative flex w-[370px] justify-center ${ink} bg-[#1e3a8a] py-1.5 shadow-[4px_4px_0_#09090b]`}>
        <span className={`${ink} bg-[#facc15] px-2 py-0.5 font-mono text-[10px] font-bold uppercase text-surface`}>July 2026</span>
      </div>
    </div>
  )
}
