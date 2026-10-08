import { motion } from 'motion/react'
import { ink } from '../primitives'

const wallpaper = {
  bar: 'linear-gradient(160deg, #93c5fd 0%, #3b82f6 55%, #1d4ed8 100%)',
  fold: 'linear-gradient(120deg, #a3e635 0%, #3b82f6 55%, #1d4ed8 100%)',
  flip: 'linear-gradient(200deg, #ffffff 0%, #93c5fd 40%, #1d4ed8 100%)'
}

const sparkles = [
  { left: 4, top: 52, color: '#a3e635' },
  { left: 112, top: 4, color: '#ffffff' },
  { left: 238, top: 44, color: '#93c5fd' },
  { left: 186, top: 76, color: '#a3e635' },
  { left: 70, top: 30, color: '#ffffff' }
]

const spring = (delay: number, active: boolean) => ({ type: 'spring' as const, stiffness: 300, damping: 14, delay: active ? delay : 0 })

// "One of 50" plus a phone display: the phones spring up, light up, snap a selfie and pop notifications.
export function GalaxyAmbassador({ active }: { active: boolean }) {
  return (
    <div className="flex items-end gap-5" aria-hidden="true">
      {/* The "1 of 50" grid is left out on phones so the phones stay readable; the story card says it in words. */}
      <div className="flex flex-col items-center gap-2 max-sm:hidden">
        <div className={`${ink} bg-white px-2 py-0.5 font-mono text-[10px] font-bold uppercase text-surface`}>Batch 3 · 1 of 50</div>
        <div className="grid grid-cols-10 gap-[3px]">
          {Array.from({ length: 50 }, (_, i) => (
            <motion.span
              key={i}
              className="relative h-3 w-3 border-2 border-[#09090b]"
              initial={false}
              animate={{ backgroundColor: active && i === 27 ? '#a3e635' : '#93c5fd', scale: active && i === 27 ? 1.6 : 1 }}
              transition={{ duration: 0.4, delay: active ? 0.5 : 0 }}
            >
              {i === 27 && (
                <motion.span
                  className="absolute -inset-[3px] border-2 border-[#a3e635]"
                  initial={false}
                  animate={active ? { scale: [1, 2.2], opacity: [0.9, 0] } : { scale: 1, opacity: 0 }}
                  transition={active ? { duration: 1.2, repeat: Infinity, repeatDelay: 0.8, delay: 0.9 } : { duration: 0 }}
                />
              )}
            </motion.span>
          ))}
        </div>
      </div>

      <div className="flex flex-col items-stretch">
        <div className="relative flex items-end gap-3 px-4 pt-12">
          {sparkles.map((s, i) => (
            <motion.span
              key={i}
              className="absolute z-20 font-mono text-sm font-bold leading-none"
              style={{ left: s.left, top: s.top, color: s.color, textShadow: '1px 1px 0 #09090b' }}
              initial={false}
              animate={active ? { scale: [0, 1.2, 0], rotate: [0, 90] } : { scale: 0, rotate: 0 }}
              transition={active ? { duration: 1.1, repeat: Infinity, repeatDelay: 1.4, delay: 1.2 + i * 0.35 } : { duration: 0.2 }}
            >
              ✦
            </motion.span>
          ))}

          <motion.div
            className="absolute left-[44px] top-[-6px] z-20 border-2 border-[#09090b] bg-white p-[3px] pb-2 shadow-[3px_3px_0_#09090b]"
            initial={false}
            animate={active ? { scale: 1, opacity: 1, y: 0, rotate: 10 } : { scale: 0, opacity: 0, y: 40, rotate: 0 }}
            transition={spring(1.35, active)}
          >
            <div className="relative h-[28px] w-[34px] overflow-hidden border-2 border-[#09090b]" style={{ background: wallpaper.bar }}>
              <span className="absolute left-1/2 top-[5px] -ml-[5px] h-2.5 w-2.5 rounded-full border-2 border-[#09090b] bg-[#fde68a]" />
              <span className="absolute -bottom-[4px] left-1/2 -ml-[9px] h-[10px] w-[18px] rounded-t-full border-2 border-[#09090b] bg-[#a3e635]" />
            </div>
          </motion.div>

          <BarPhone active={active} />
          <FoldPhone active={active} />
          <FlipPhone active={active} />
        </div>
        <div className={`relative z-10 ${ink} bg-[#1d4ed8] px-2 py-0.5 text-center font-mono text-[10px] font-bold uppercase text-white`}>
          Galaxy Campus Ambassadors
        </div>
      </div>
    </div>
  )
}

// Bar phone in selfie mode: screen wakes up, shutter clicks, the flash goes off.
function BarPhone({ active }: { active: boolean }) {
  return (
    <motion.div className="relative" initial={false} animate={active ? { y: 0, rotate: -6 } : { y: 12, rotate: 0 }} transition={spring(0.2, active)}>
      <div className={`relative h-[124px] w-[62px] rounded-[12px] ${ink} bg-[#111827] p-[3px] shadow-[4px_4px_0_#09090b]`}>
        <div className="relative h-full w-full overflow-hidden rounded-[7px] bg-[#1f2937]">
          <motion.div
            className="absolute inset-0"
            style={{ background: wallpaper.bar }}
            initial={false}
            animate={{ opacity: active ? 1 : 0 }}
            transition={{ duration: 0.4, delay: active ? 0.45 : 0 }}
          >
            <span className="absolute left-1/2 top-[34px] -ml-[11px] h-[22px] w-[22px] rounded-full border-2 border-[#09090b] bg-[#fde68a]" />
            <span className="absolute left-1/2 top-[58px] -ml-[18px] h-[22px] w-[36px] rounded-t-full border-2 border-[#09090b] bg-[#a3e635]" />
            <motion.span
              className="absolute bottom-[6px] left-1/2 -ml-[8px] h-4 w-4 rounded-full border-2 border-[#09090b] bg-white"
              initial={false}
              animate={active ? { scale: [1, 0.6, 1] } : { scale: 1 }}
              transition={{ duration: 0.25, delay: active ? 0.95 : 0 }}
            />
          </motion.div>
          <motion.div
            className="absolute inset-0 bg-white"
            initial={false}
            animate={active ? { opacity: [0, 1, 0] } : { opacity: 0 }}
            transition={{ duration: 0.6, times: [0, 0.15, 1], delay: active ? 1.05 : 0 }}
          />
        </div>
        <span className="absolute left-1/2 top-[8px] h-2 w-2 -translate-x-1/2 rounded-full border border-[#93c5fd] bg-[#09090b]" />
      </div>
      <motion.span
        className="pointer-events-none absolute left-1/2 top-[12px] -ml-5 -mt-5 h-10 w-10 rounded-full border-[3px] border-white"
        initial={false}
        animate={active ? { scale: [0.2, 1.5, 2.8], opacity: [0, 1, 0] } : { scale: 0.2, opacity: 0 }}
        transition={{ duration: 0.7, delay: active ? 1.05 : 0 }}
      />
    </motion.div>
  )
}

// Foldable: the right half swings open and a notification slides in across the hinge.
function FoldPhone({ active }: { active: boolean }) {
  const half = 'relative h-[104px] w-[46px] bg-[#111827] p-[3px]'
  return (
    <motion.div className="relative flex" initial={false} animate={active ? { y: 0 } : { y: 12 }} transition={spring(0.35, active)}>
      <div className={`${half} rounded-l-[10px] ${ink} shadow-[4px_4px_0_#09090b]`}>
        <div className="relative h-full w-full overflow-hidden rounded-l-[6px] bg-[#1f2937]">
          <motion.div
            className="absolute inset-0"
            style={{ backgroundImage: wallpaper.fold, backgroundSize: '200% 100%', backgroundPosition: 'left' }}
            initial={false}
            animate={{ opacity: active ? 1 : 0 }}
            transition={{ duration: 0.4, delay: active ? 0.6 : 0 }}
          />
        </div>
      </div>
      <motion.div
        className={`${half} rounded-r-[10px] ${ink} border-l-0 shadow-[4px_4px_0_#09090b]`}
        style={{ originX: 0, transformPerspective: 400 }}
        initial={false}
        animate={{ rotateY: active ? 0 : 88 }}
        transition={spring(0.5, active)}
      >
        <div className="relative h-full w-full overflow-hidden rounded-r-[6px] border-l-2 border-[#09090b] bg-[#1f2937]">
          <motion.div
            className="absolute inset-0"
            style={{ backgroundImage: wallpaper.fold, backgroundSize: '200% 100%', backgroundPosition: 'right' }}
            initial={false}
            animate={{ opacity: active ? 1 : 0 }}
            transition={{ duration: 0.4, delay: active ? 0.6 : 0 }}
          />
        </div>
      </motion.div>
      <motion.div
        className="absolute left-1/2 top-[16px] z-10 -ml-[40px] w-[80px] rounded-md border-2 border-[#09090b] bg-white px-1 py-0.5 font-mono text-[8px] font-bold uppercase leading-tight text-surface shadow-[2px_2px_0_#09090b]"
        initial={false}
        animate={active ? { y: 0, opacity: 1, scale: 1 } : { y: -14, opacity: 0, scale: 0.6 }}
        transition={spring(1.0, active)}
      >
        🔔 Welcome,
        <span className="block text-[#1d4ed8]">Ambassador!</span>
      </motion.div>
    </motion.div>
  )
}

// Flip phone: closed with a tiny cover screen, then the top half flips up and a like counter pops.
function FlipPhone({ active }: { active: boolean }) {
  return (
    <motion.div className="relative flex flex-col" initial={false} animate={active ? { y: 0 } : { y: 12 }} transition={spring(0.5, active)}>
      <motion.div
        className={`relative h-[54px] w-[50px] rounded-t-[10px] ${ink} bg-[#111827] p-[3px] shadow-[4px_0_0_#09090b]`}
        style={{ originY: 1, transformPerspective: 400 }}
        initial={false}
        animate={{ rotateX: active ? 0 : -88 }}
        transition={spring(0.65, active)}
      >
        <div className="relative h-full w-full overflow-hidden rounded-t-[6px]" style={{ backgroundImage: wallpaper.flip, backgroundSize: '100% 200%', backgroundPosition: 'top' }}>
          <span className="absolute left-1/2 top-[4px] h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-[#09090b]" />
        </div>
      </motion.div>
      <div className={`relative h-[54px] w-[50px] rounded-b-[10px] ${ink} bg-[#111827] p-[3px] shadow-[4px_4px_0_#09090b]`}>
        <div className="relative h-full w-full overflow-hidden rounded-b-[6px] bg-[#1f2937]">
          <div className="absolute left-[4px] top-[4px] flex gap-1">
            <span className="h-2.5 w-2.5 rounded-full border-2 border-[#93c5fd] bg-[#09090b]" />
            <span className="h-2.5 w-2.5 rounded-full border-2 border-[#93c5fd] bg-[#09090b]" />
          </div>
          <span className="absolute bottom-[4px] right-[4px] font-mono text-[8px] font-bold text-[#a3e635]">10:09</span>
          <motion.div
            className="absolute inset-0 grid grid-cols-3 content-end gap-1 p-1.5"
            style={{ backgroundImage: wallpaper.flip, backgroundSize: '100% 200%', backgroundPosition: 'bottom' }}
            initial={false}
            animate={{ opacity: active ? 1 : 0 }}
            transition={{ duration: 0.4, delay: active ? 0.8 : 0 }}
          >
            {['#a3e635', '#ffffff', '#93c5fd', '#ffffff', '#a3e635', '#3b82f6'].map((c, i) => (
              <span key={i} className="h-2 w-2 rounded-[3px] border border-[#09090b]" style={{ background: c }} />
            ))}
          </motion.div>
        </div>
      </div>
      <motion.div
        className={`absolute -right-3 -top-7 z-10 ${ink} rounded-full bg-[#a3e635] px-1.5 font-mono text-[10px] font-bold text-surface`}
        initial={false}
        animate={active ? { scale: 1, opacity: 1, y: 0 } : { scale: 0, opacity: 0, y: 10 }}
        transition={{ type: 'spring', stiffness: 400, damping: 12, delay: active ? 1.6 : 0 }}
      >
        ♥ +1
      </motion.div>
    </motion.div>
  )
}
