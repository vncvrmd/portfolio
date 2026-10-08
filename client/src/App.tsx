import { lazy, Suspense, useEffect, useState } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, MotionConfig, motion, useScroll, useSpring, useTransform } from 'motion/react'
import ScrollLink from './components/ScrollLink'
import MotionToggle from './components/MotionToggle'
import SoundToggle from './components/SoundToggle'
import SmoothScroll, { useScrollToSection } from './components/SmoothScroll'
import Home from './pages/Home'
import ProjectsPage from './pages/Projects'
import ContactPage from './pages/Contact'
import Certifications from './pages/Certifications'
import Awards from './pages/Awards'
import Skills from './pages/Skills'
import Experience from './pages/Experience'
import ProjectDetail from './pages/ProjectDetail'
import { useShaderBackground } from './hooks'
import { useMotionPreference } from './motionPreference'
import { useReplayIntro } from './components/Intro'

const GradientBackground = lazy(() => import('./components/GradientBackground'))

const sections = [
  { id: 'home', label: 'Home', Component: Home },
  { id: 'projects', label: 'Projects', Component: ProjectsPage },
  { id: 'experience', label: 'Experience', Component: Experience },
  { id: 'skills', label: 'Skills', Component: Skills },
  { id: 'certifications', label: 'Certifications', Component: Certifications },
  { id: 'awards', label: 'Awards', Component: Awards },
  { id: 'contact', label: 'Contact', Component: ContactPage }
]

const navLinks = sections.filter(s => s.id !== 'contact').map(({ id, label }) => ({ id, label }))

function OnePageContent({ journeyMode }: { journeyMode: boolean }) {
  // Journey mode: the whole site is the scroll journey; the classic sections are the motion-off view.
  if (journeyMode) return <Home />
  return (
    <>
      {sections.map(({ id, Component }, index) => (
        <section
          key={id}
          id={id}
          className={`scroll-mt-24 ${index === 0 ? 'pb-16 pt-10 sm:pb-20 sm:pt-14' : 'section-divider py-20 sm:py-24'}`}
        >
          <Component />
        </section>
      ))}
    </>
  )
}

function Backdrop({ hidden }: { hidden: boolean }) {
  // The journey stage is opaque, so the WebGL shader would only burn battery behind it.
  const useShader = useShaderBackground() && !hidden
  const { scrollY } = useScroll()
  // Lives behind the hero only, fading out as the page scrolls on.
  const shaderOpacity = useTransform(scrollY, [0, 800], [0.85, 0])

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10">
      <div className="backdrop-static absolute inset-0" />
      {useShader && (
        <motion.div className="absolute inset-0" style={{ opacity: shaderOpacity }}>
          <Suspense fallback={null}>
            <GradientBackground />
          </Suspense>
        </motion.div>
      )}
      <div className="backdrop-scrim absolute inset-0" />
    </div>
  )
}

function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 })

  return (
    <motion.div
      aria-hidden="true"
      className="fixed inset-x-0 top-0 z-[60] h-px origin-left bg-ink/70"
      style={{ scaleX }}
    />
  )
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeId, setActiveId] = useState('home')
  const location = useLocation()
  const isHome = location.pathname === '/'
  const { motionAllowed } = useMotionPreference()
  const scrollToSection = useScrollToSection()
  const replayGame = useReplayIntro()
  const journeyMode = isHome && motionAllowed

  useEffect(() => {
    if (!isHome || !location.hash) return
    const id = location.hash.slice(1)
    if (journeyMode) window.dispatchEvent(new CustomEvent('journey:goto', { detail: id }))
    else scrollToSection(id)
    // Re-run only on navigation, not when the Lenis instance is (re)created.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isHome, location.hash, location.key, journeyMode])

  // In journey mode the current level reports which nav item is active.
  useEffect(() => {
    if (!journeyMode) return
    const onScene = (e: Event) => setActiveId((e as CustomEvent<string>).detail)
    window.addEventListener('journey:scene', onScene)
    return () => window.removeEventListener('journey:scene', onScene)
  }, [journeyMode])

  useEffect(() => {
    if (!isHome || journeyMode) return
    const elements = sections
      .map(s => document.getElementById(s.id))
      .filter((el): el is HTMLElement => el !== null)
    if (elements.length === 0) return

    const observer = new IntersectionObserver(
      entries => {
        const visible = entries.find(entry => entry.isIntersecting)
        if (visible) setActiveId(visible.target.id)
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: 0 }
    )
    elements.forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [isHome, journeyMode])

  const navLinkClass = (isActive: boolean) =>
    `relative cursor-pointer rounded-full px-3.5 py-1.5 text-sm transition-colors duration-200 ${
      isActive ? 'text-ink' : 'nav-underline text-muted hover:text-ink'
    }`

  const navLinkContent = (label: string, isActive: boolean, pillId: string) => (
    <>
      {isActive && (
        <motion.span
          layoutId={pillId}
          className="absolute inset-0 -z-10 rounded-full border border-edge bg-surface-3"
          transition={{ type: 'spring', stiffness: 380, damping: 32 }}
        />
      )}
      {label}
    </>
  )

  return (
    <MotionConfig reducedMotion={motionAllowed ? 'never' : 'always'}>
      <SmoothScroll />
      <Backdrop hidden={journeyMode} />
      <ScrollProgress />
      <div className="flex min-h-screen flex-col">
        <header className="glass-nav">
          <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6 sm:px-10">
            <ScrollLink
              to="/#home"
              className="inline-flex cursor-pointer items-baseline gap-1.5 font-heading text-base font-semibold tracking-tight text-ink"
              onNavigate={() => setMenuOpen(false)}
            >
              <span>Vince Tyrone</span>
              <span className="text-muted">Vermudo</span>
            </ScrollLink>

            <nav className="isolate hidden items-center gap-1 md:flex">
              {navLinks.map(link => {
                const isActive = isHome && activeId === link.id
                return (
                  <ScrollLink key={link.id} to={`/#${link.id}`} className={navLinkClass(isActive)}>
                    {navLinkContent(link.label, isActive, 'nav-pill')}
                  </ScrollLink>
                )
              })}
              <SoundToggle className="ml-1" />
              <MotionToggle />
              <ScrollLink to="/#contact" className="btn-primary ml-1 !px-5 !py-2 text-sm">
                Contact
              </ScrollLink>
            </nav>

            <div className="flex items-center gap-1 md:hidden">
            <SoundToggle />
            <MotionToggle />
            <button
              type="button"
              className="cursor-pointer rounded-full p-2 text-body transition-colors duration-200 hover:text-ink md:hidden"
              aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={menuOpen}
              aria-controls="mobile-nav"
              onClick={() => setMenuOpen(open => !open)}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                {menuOpen ? (
                  <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                ) : (
                  <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                )}
              </svg>
            </button>
            </div>
          </div>

          <AnimatePresence initial={false}>
            {menuOpen && (
              <motion.nav
                id="mobile-nav"
                className="overflow-hidden border-t border-edge md:hidden"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.28, ease: [0.4, 0, 0.2, 1] }}
              >
                <div className="isolate flex flex-col gap-1 px-6 py-4">
                  {navLinks.map(link => {
                    const isActive = isHome && activeId === link.id
                    return (
                      <ScrollLink
                        key={link.id}
                        to={`/#${link.id}`}
                        className={`${navLinkClass(isActive)} w-fit`}
                        onNavigate={() => setMenuOpen(false)}
                      >
                        {navLinkContent(link.label, isActive, 'mobile-nav-pill')}
                      </ScrollLink>
                    )
                  })}
                  <ScrollLink
                    to="/#contact"
                    onNavigate={() => setMenuOpen(false)}
                    className="btn-primary mt-1 w-fit !px-5 !py-2 text-sm"
                  >
                    Contact
                  </ScrollLink>
                </div>
              </motion.nav>
            )}
          </AnimatePresence>
        </header>

        <main className="mx-auto w-full max-w-6xl flex-1 px-6 sm:px-10">
          <Routes>
            <Route path="/" element={<OnePageContent journeyMode={journeyMode} />} />
            <Route
              path="/projects/:id"
              element={
                <div className="py-12">
                  <ProjectDetail />
                </div>
              }
            />
          </Routes>
        </main>

        <footer className="flex flex-col items-center gap-3 border-t border-edge bg-surface/60 px-6 py-10 text-center text-sm text-muted backdrop-blur-sm">
          <a href="https://github.com/vncvrmd" target="_blank" rel="noreferrer" className="btn-outline !px-4 !py-2">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
              <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8Z" />
            </svg>
            GitHub
          </a>
          <p className="text-body">© {new Date().getFullYear()} Vince Tyrone Vermudo</p>
          <p>Built with React, Motion, Lenis, ShaderGradient, React Bits, Uiverse, and ASP.NET Core.</p>
          {isHome && (
            <button
              type="button"
              onClick={replayGame}
              className="nav-underline relative cursor-pointer px-3 py-1 font-mono text-xs text-muted transition-colors duration-200 hover:text-ink"
            >
              Play the bug-squash game
            </button>
          )}
        </footer>
      </div>
    </MotionConfig>
  )
}

export default App
