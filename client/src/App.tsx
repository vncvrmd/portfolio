import { useEffect, useState } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import ScrollLink from './components/ScrollLink'
import Home from './pages/Home'
import ProjectsPage from './pages/Projects'
import ContactPage from './pages/Contact'
import Certifications from './pages/Certifications'
import Skills from './pages/Skills'
import Experience from './pages/Experience'
import ProjectDetail from './pages/ProjectDetail'

const sections = [
  { id: 'home', label: 'Home', Component: Home },
  { id: 'projects', label: 'Projects', Component: ProjectsPage },
  { id: 'experience', label: 'Experience', Component: Experience },
  { id: 'skills', label: 'Skills', Component: Skills },
  { id: 'certifications', label: 'Certifications', Component: Certifications },
  { id: 'contact', label: 'Contact', Component: ContactPage }
]

const navLinks = sections.filter(s => s.id !== 'contact').map(({ id, label }) => ({ id, label }))

function OnePageContent() {
  return (
    <>
      {sections.map(({ id, Component }, index) => (
        <section
          key={id}
          id={id}
          className={`scroll-mt-24 py-16 sm:py-20 ${index > 0 ? 'border-t border-edge' : ''}`}
        >
          <Component />
        </section>
      ))}
    </>
  )
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeId, setActiveId] = useState('home')
  const location = useLocation()
  const isHome = location.pathname === '/'

  useEffect(() => {
    if (!isHome || !location.hash) return
    const id = location.hash.slice(1)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [isHome, location.hash])

  useEffect(() => {
    if (!isHome) return
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
  }, [isHome])

  const navLinkClass = (isActive: boolean) =>
    `cursor-pointer rounded-full px-4 py-2 text-sm transition-colors duration-200 ${
      isActive ? 'bg-surface-3 font-semibold text-accent2' : 'text-body hover:text-ink'
    }`

  return (
    <div className="flex min-h-screen flex-col">
      <header className="glass-nav">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6 sm:px-10">
          <ScrollLink
            to="/#home"
            className="inline-flex cursor-pointer items-baseline gap-0.5 font-heading text-lg font-bold tracking-tight text-ink"
            onNavigate={() => setMenuOpen(false)}
          >
            <span>IT</span>
            <span className="text-accent2">Portfolio</span>
          </ScrollLink>

          <nav className="hidden items-center gap-1 md:flex">
            {navLinks.map(link => (
              <ScrollLink key={link.id} to={`/#${link.id}`} className={navLinkClass(isHome && activeId === link.id)}>
                {link.label}
              </ScrollLink>
            ))}
            <ScrollLink to="/#contact" className="btn-primary ml-2 !px-5 !py-2 text-sm">
              Contact
            </ScrollLink>
          </nav>

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
                <path
                  d="M6 6l12 12M18 6L6 18"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              ) : (
                <path
                  d="M4 7h16M4 12h16M4 17h16"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              )}
            </svg>
          </button>
        </div>

        {menuOpen && (
          <nav id="mobile-nav" className="flex flex-col gap-1 border-t border-edge px-6 py-4 md:hidden">
            {navLinks.map(link => (
              <ScrollLink
                key={link.id}
                to={`/#${link.id}`}
                className={navLinkClass(isHome && activeId === link.id)}
                onNavigate={() => setMenuOpen(false)}
              >
                {link.label}
              </ScrollLink>
            ))}
            <ScrollLink
              to="/#contact"
              onNavigate={() => setMenuOpen(false)}
              className="btn-primary mt-1 w-fit !px-5 !py-2 text-sm"
            >
              Contact
            </ScrollLink>
          </nav>
        )}
      </header>

      <main className="mx-auto w-full max-w-6xl flex-1 px-6 sm:px-10">
        <Routes>
          <Route path="/" element={<OnePageContent />} />
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

      <footer className="flex flex-col items-center gap-3 border-t border-edge px-6 py-10 text-center text-sm text-muted">
        <a
          href="https://github.com/vncvrmd"
          target="_blank"
          rel="noreferrer"
          className="btn-outline !px-4 !py-2"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
            <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8Z" />
          </svg>
          GitHub
        </a>
        <p>Built with React, Tailwind CSS, and ASP.NET Core.</p>
      </footer>
    </div>
  )
}

export default App
