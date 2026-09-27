import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'

type Choice = 'on' | 'off' | null

interface MotionPreference {
  motionAllowed: boolean
  setMotionAllowed: (allowed: boolean) => void
}

const STORAGE_KEY = 'motion-preference'
const MotionPreferenceContext = createContext<MotionPreference | null>(null)

function readChoice(): Choice {
  try {
    const value = localStorage.getItem(STORAGE_KEY)
    return value === 'on' || value === 'off' ? value : null
  } catch {
    return null
  }
}

// Follows the OS "reduce motion" setting until the visitor explicitly chooses in the nav toggle.
export function MotionPreferenceProvider({ children }: { children: ReactNode }) {
  const [systemReduced, setSystemReduced] = useState(
    () => window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )
  const [choice, setChoice] = useState<Choice>(readChoice)

  useEffect(() => {
    const mql = window.matchMedia('(prefers-reduced-motion: reduce)')
    const onChange = () => setSystemReduced(mql.matches)
    mql.addEventListener('change', onChange)
    return () => mql.removeEventListener('change', onChange)
  }, [])

  const motionAllowed = choice ? choice === 'on' : !systemReduced

  useEffect(() => {
    document.documentElement.classList.toggle('reduce-motion', !motionAllowed)
  }, [motionAllowed])

  const setMotionAllowed = (allowed: boolean) => {
    const next = allowed ? 'on' : 'off'
    setChoice(next)
    try {
      localStorage.setItem(STORAGE_KEY, next)
    } catch {
      // Storage unavailable (private mode): the choice still applies for this visit.
    }
  }

  return (
    <MotionPreferenceContext.Provider value={{ motionAllowed, setMotionAllowed }}>
      {children}
    </MotionPreferenceContext.Provider>
  )
}

export function useMotionPreference(): MotionPreference {
  const ctx = useContext(MotionPreferenceContext)
  if (!ctx) throw new Error('useMotionPreference must be used inside MotionPreferenceProvider')
  return ctx
}
