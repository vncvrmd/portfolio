import { motion } from 'motion/react'
import { Building, ink } from '../primitives'

const spring = { type: 'spring', stiffness: 380, damping: 16 } as const

// Fixed shapes for the mini admin chart (illustration only, not real numbers).
const replyBars = [18, 26, 22, 34, 30, 42] // px tall, bottom-aligned in a 56px chart
const costPoints = [28, 22, 25, 14, 17, 8] // y of the cost line in the same 96x56 box
const costPath = costPoints.map((y, i) => `${i === 0 ? 'M' : 'L'}${8 + i * 16} ${y}`).join(' ')

function pop(active: boolean, delay: number) {
  return {
    initial: false as const,
    animate: active ? { scale: 1, opacity: 1 } : { scale: 0.4, opacity: 0 },
    transition: { ...spring, delay: active ? delay : 0 }
  }
}

function MiniAvatar() {
  return (
    <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full border-2 border-[#09090b] bg-[#fde68a] font-mono text-[8px] font-bold text-surface">
      A
    </span>
  )
}

// Kidlat: the civic tech office, with ALICE chatting on Messenger and its admin cost dashboard beside it.
export function AliceLab({ active }: { active: boolean }) {
  return (
    <div className="flex items-end gap-4" aria-hidden="true">
      <Building label="Kidlat ⚡" color="#0369a1" floors={3} width={140} />

      {/* Messenger-style phone: access code, learner question, typing dots, grounded reply, thanks. */}
      <div className={`mb-2 flex w-[176px] flex-col overflow-hidden rounded-2xl ${ink} bg-white shadow-[4px_4px_0_#09090b]`}>
        <div className="flex items-center gap-1.5 border-b-[3px] border-[#09090b] bg-[#0084ff] px-2 py-1.5">
          <span className="relative flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 border-[#09090b] bg-[#fde68a] font-mono text-[10px] font-bold text-surface">
            A
            <motion.span
              className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-2 border-[#09090b]"
              initial={false}
              animate={{ backgroundColor: active ? '#22c55e' : '#9ca3af' }}
              transition={{ duration: 0.3, delay: active ? 0.15 : 0 }}
            />
          </span>
          <span className="flex min-w-0 flex-col leading-tight">
            <span className="text-[10px] font-bold text-white">ALICE</span>
            <span className="text-[8px] font-bold text-[#e0f2fe]">AI tutor · ALS</span>
          </span>
          <span className="ml-auto font-mono text-[8px] font-bold uppercase text-[#e0f2fe]">Messenger</span>
        </div>

        <div className="flex flex-col gap-1 bg-[#f0f9ff] px-2 py-1.5">
          <motion.span
            className="self-center rounded-full border-2 border-[#09090b] bg-[#dcfce7] px-1.5 font-mono text-[8px] font-bold uppercase leading-tight text-surface"
            {...pop(active, 0.2)}
          >
            🔑 Access code ✓
          </motion.span>

          <motion.span
            className={`${ink} max-w-[140px] self-end rounded-lg bg-[#bae6fd] px-2 py-1 text-[10px] font-bold leading-tight text-surface`}
            {...pop(active, 0.5)}
          >
            Hi ALICE! What is photosynthesis?
          </motion.span>

          {/* Typing dots and the reply share one grid cell, so the reply takes the dots' place. */}
          <div className="grid">
            <motion.div
              className="col-start-1 row-start-1 flex items-end gap-1 self-start"
              initial={false}
              animate={active ? { opacity: [0, 1, 1, 0], scale: [0.4, 1, 1, 0.8] } : { opacity: 0, scale: 0.4 }}
              transition={active ? { duration: 1, times: [0, 0.15, 0.85, 1], delay: 0.9 } : { duration: 0 }}
            >
              <MiniAvatar />
              <span className={`flex gap-1 ${ink} rounded-lg bg-[#fefce8] px-2 py-1.5`}>
                {[0, 1, 2].map(i => (
                  <motion.span
                    key={i}
                    className="h-1.5 w-1.5 rounded-full bg-[#09090b]"
                    initial={false}
                    animate={active ? { y: [0, -3, 0] } : { y: 0 }}
                    transition={active ? { duration: 0.35, repeat: 2, delay: 0.95 + i * 0.12 } : { duration: 0 }}
                  />
                ))}
              </span>
            </motion.div>

            <div className="col-start-1 row-start-1 flex flex-col items-start gap-1">
              <motion.div className="flex items-end gap-1" {...pop(active, 1.9)}>
                <MiniAvatar />
                <span className={`${ink} max-w-[134px] rounded-lg bg-[#fefce8] px-2 py-1 text-[10px] font-bold leading-tight text-surface`}>
                  It’s how plants turn sunlight into food 🌱
                </span>
              </motion.div>
              <motion.span
                className="ml-5 border-2 border-[#09090b] bg-white px-1 font-mono text-[8px] font-bold uppercase leading-tight text-surface"
                {...pop(active, 2.15)}
              >
                From: ALS Module · Science
              </motion.span>
            </div>
          </div>

          <motion.span
            className={`${ink} self-end rounded-lg bg-[#bae6fd] px-2 py-1 text-[10px] font-bold leading-tight text-surface`}
            {...pop(active, 2.5)}
          >
            Salamat po!
          </motion.span>
        </div>

        <div className="flex items-center gap-1.5 border-t-[3px] border-[#09090b] bg-white px-2 py-1">
          <span className="flex-1 rounded-full border-2 border-[#09090b] bg-[#f4f4f5] px-2 font-mono text-[8px] font-bold leading-tight text-[#71717a]">Aa</span>
          <span className="text-[10px] font-bold leading-tight text-[#0084ff]">➤</span>
        </div>
      </div>

      {/* Admin cost dashboard on a small monitor (left out on phones): reply bars grow, then the cost line draws across. */}
      <motion.div
        className="flex flex-col items-center max-sm:hidden"
        initial={false}
        animate={active ? { y: 0, opacity: 1 } : { y: 40, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 15, delay: active ? 2.8 : 0 }}
      >
        <div className={`w-[116px] ${ink} bg-white shadow-[4px_4px_0_#09090b]`}>
          <div className="border-b-[3px] border-[#09090b] bg-[#0369a1] px-1.5 py-0.5 font-mono text-[8px] font-bold uppercase leading-tight text-white">
            ALICE · Admin
          </div>
          <div className="flex flex-col gap-1 px-1.5 py-1">
            <span className="text-[10px] font-bold leading-tight text-surface">Cost &amp; replies</span>
            <div className="relative h-14 w-24 self-center border-b-2 border-l-2 border-[#09090b]">
              <div className="absolute inset-0 flex items-end justify-around">
                {replyBars.map((h, i) => (
                  <motion.span
                    key={i}
                    className="w-2.5 border-2 border-b-0 border-[#09090b] bg-[#7dd3fc]"
                    style={{ height: h, originY: 1 }}
                    initial={false}
                    animate={{ scaleY: active ? 1 : 0 }}
                    transition={{ type: 'spring', stiffness: 260, damping: 18, delay: active ? 3.0 + i * 0.08 : 0 }}
                  />
                ))}
              </div>
              <svg className="absolute inset-0" width="96" height="56" viewBox="0 0 96 56">
                <motion.path
                  d={costPath}
                  fill="none"
                  stroke="#f43f5e"
                  strokeWidth="2.5"
                  strokeLinejoin="round"
                  initial={false}
                  animate={active ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
                  transition={{ duration: 0.7, ease: 'easeOut', delay: active ? 3.5 : 0 }}
                />
              </svg>
            </div>
            <div className="flex justify-center gap-2 font-mono text-[8px] font-bold uppercase leading-tight text-surface">
              <span className="flex items-center gap-0.5">
                <span className="h-2 w-2 border-2 border-[#09090b] bg-[#7dd3fc]" />
                Replies
              </span>
              <span className="flex items-center gap-0.5">
                <span className="h-[3px] w-3 bg-[#f43f5e]" />
                Cost
              </span>
            </div>
          </div>
        </div>
        <span className="h-3 w-3 border-x-[3px] border-[#09090b] bg-[#9ca3af]" />
        <span className={`h-2.5 w-14 ${ink} bg-[#9ca3af]`} />
      </motion.div>
    </div>
  )
}
