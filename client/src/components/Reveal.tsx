import type { ReactNode } from 'react'
import { motion } from 'motion/react'
import { useMotionPreference } from '../motionPreference'

interface RevealProps {
  children: ReactNode
  className?: string
  delay?: number
}

export default function Reveal({ children, className = '', delay = 0 }: RevealProps) {
  const { motionAllowed } = useMotionPreference()

  // MotionConfig's reduced mode only skips transforms, so opacity/blur fades would still run.
  if (!motionAllowed) return <div className={className}>{children}</div>

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 24, filter: 'blur(6px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, amount: 0.15, margin: '0px 0px -10% 0px' }}
      transition={{ duration: 0.7, ease: [0, 0, 0.2, 1], delay: delay / 1000 }}
    >
      {children}
    </motion.div>
  )
}
