import { createContext, useCallback, useContext, useRef, useState, type ReactNode } from 'react'

type ZzfxModule = typeof import('zzfx')

// 8-bit effects generated in code by ZzFX (no audio files). Sparse arrays keep ZzFX defaults.
export const SFX = {
  blip: [, , 1200, , 0.01, 0.04, 1, 2],
  step: [0.4, 0.1, 90, , 0.01, 0.03, 4, , , , , , , 1],
  jump: [, , 300, , 0.05, 0.15, , 1.5, 12],
  coin: [, , 1675, , 0.06, 0.24, 1, 1.82, , , 837, 0.06],
  squash: [, , 180, 0.01, 0.02, 0.08, 4, 2, , , , , , 1.5],
  levelUp: [, , 537, 0.02, 0.02, 0.22, 1, 1.59, -6.98, 4.97]
} satisfies Record<string, (number | undefined)[]>

export type SfxName = keyof typeof SFX

interface SoundState {
  soundOn: boolean
  setSoundOn: (on: boolean) => void
  play: (name: SfxName) => void
}

const STORAGE_KEY = 'sound-preference'
const SoundContext = createContext<SoundState>({ soundOn: false, setSoundOn: () => {}, play: () => {} })

function readChoice(): boolean {
  try {
    return localStorage.getItem(STORAGE_KEY) === 'on'
  } catch {
    return false
  }
}

// Sound is opt-in (muted by default, WCAG 1.4.2) and the ZzFX module only loads once it's turned on.
export function SoundProvider({ children }: { children: ReactNode }) {
  const [soundOn, setSoundOnState] = useState(readChoice)
  const zzfxRef = useRef<ZzfxModule | null>(null)

  const load = useCallback(async () => {
    zzfxRef.current ??= await import('zzfx')
    zzfxRef.current.ZZFX.volume = 0.25
    return zzfxRef.current
  }, [])

  const play = useCallback(
    (name: SfxName) => {
      if (!soundOn || document.visibilityState !== 'visible') return
      load().then(m => m.zzfx(...SFX[name])).catch(() => {})
    },
    [soundOn, load]
  )

  const setSoundOn = (on: boolean) => {
    setSoundOnState(on)
    try {
      localStorage.setItem(STORAGE_KEY, on ? 'on' : 'off')
    } catch {
      // Storage unavailable: the choice still applies for this visit.
    }
    // Called from a click, so the browser allows the AudioContext to start.
    if (on) load().then(m => m.zzfx(...SFX.blip)).catch(() => {})
  }

  return <SoundContext.Provider value={{ soundOn, setSoundOn, play }}>{children}</SoundContext.Provider>
}

export function useSound(): SoundState {
  return useContext(SoundContext)
}
