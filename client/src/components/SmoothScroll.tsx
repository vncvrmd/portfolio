import { useCallback, useEffect, useState } from 'react'
import { ReactLenis, useLenis } from 'lenis/react'
import { useMotionPreference } from '../motionPreference'

// Module-scope so ReactLenis's JSON-based change detection doesn't recreate the instance each render.
const lenisOptions = { lerp: 0.1, anchors: true, allowNestedScroll: true, stopInertiaOnNavigate: true }

// Inertial scrolling like the reference sites. Not mounted when motion is off, which leaves plain native scroll.
export default function SmoothScroll() {
  const { motionAllowed } = useMotionPreference()
  const finePointer = useFinePointer()
  // Touch devices keep native momentum scrolling; Lenis only smooths mouse/trackpad input.
  if (!motionAllowed || !finePointer) return null
  return <ReactLenis root options={lenisOptions} />
}

function useFinePointer(): boolean {
  const query = '(hover: hover) and (pointer: fine)'
  const [fine, setFine] = useState(() => window.matchMedia(query).matches)
  useEffect(() => {
    const mql = window.matchMedia(query)
    const onChange = () => setFine(mql.matches)
    mql.addEventListener('change', onChange)
    return () => mql.removeEventListener('change', onChange)
  }, [])
  return fine
}

// Scrolls to a section through Lenis when it's running (matching its easing), otherwise natively.
// Lenis honours the sections' CSS scroll-margin, so no extra header offset is needed.
export function useScrollToSection() {
  const lenis = useLenis()
  const { motionAllowed } = useMotionPreference()

  return useCallback(
    (id: string) => {
      const el = document.getElementById(id)
      if (!el) return
      if (lenis) lenis.scrollTo(el, { duration: 1.2 })
      else el.scrollIntoView({ behavior: motionAllowed ? 'smooth' : 'auto', block: 'start' })
    },
    [lenis, motionAllowed]
  )
}
