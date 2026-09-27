import { useEffect, useState } from 'react'
import { useMotionPreference } from './motionPreference'

function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(() => window.matchMedia(query).matches)

  useEffect(() => {
    const mql = window.matchMedia(query)
    const onChange = () => setMatches(mql.matches)
    onChange()
    mql.addEventListener('change', onChange)
    return () => mql.removeEventListener('change', onChange)
  }, [query])

  return matches
}

// Pointer-follow effects (magnet, spotlight) only make sense with a mouse and motion allowed.
export function usePointerEffects(): boolean {
  const finePointer = useMediaQuery('(hover: hover) and (pointer: fine)')
  const { motionAllowed } = useMotionPreference()
  return finePointer && motionAllowed
}

function supportsShader(): boolean {
  const nav = navigator as Navigator & { deviceMemory?: number; connection?: { saveData?: boolean } }
  if (nav.connection?.saveData) return false
  if ((nav.hardwareConcurrency ?? 8) <= 4) return false
  if (nav.deviceMemory !== undefined && nav.deviceMemory <= 4) return false
  try {
    const canvas = document.createElement('canvas')
    return !!(canvas.getContext('webgl2') || canvas.getContext('webgl'))
  } catch {
    return false
  }
}

export function useShaderBackground(): boolean {
  const { motionAllowed } = useMotionPreference()
  const [capable] = useState(supportsShader)
  return capable && motionAllowed
}
