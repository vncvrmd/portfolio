import { useState } from 'react'
import { Routes, Route, Link, NavLink } from 'react-router-dom'
import Home from './pages/Home'
import ProjectsPage from './pages/Projects'
import ContactPage from './pages/Contact'
import Certifications from './pages/Certifications'
import Skills from './pages/Skills'
import Experience from './pages/Experience'
import ProjectDetail from './pages/ProjectDetail'

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/projects', label: 'Projects' },
  { to: '/experience', label: 'Experience' },
  { to: '/skills', label: 'Skills' },
  { to: '/certifications', label: 'Certifications' }
]

function App() {
  const [menuOpen, setMenuOpen] = useState(false)

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `cursor-pointer rounded-full px-4 py-2 text-sm transition-colors duration-200 ${
      isActive ? 'text-cyan-300 font-semibold' : 'text-slate-100 hover:text-cyan-300'
    }`

  const contactLinkClass = ({ isActive }: { isActive: boolean }) =>
    `cursor-pointer rounded-full px-4 py-2 text-sm font-semibold text-slate-950 transition-colors duration-200 ${
      isActive ? 'bg-cyan-300' : 'bg-cyan-500 hover:bg-cyan-400'
    }`

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <header className="mx-auto max-w-6xl px-6 py-8 sm:px-10">
        <div className="flex items-center justify-between">
          <Link
            to="/"
            className="cursor-pointer font-heading text-lg font-semibold text-slate-100 transition-colors duration-200 hover:text-cyan-300"
            onClick={() => setMenuOpen(false)}
          >
            IT Portfolio
          </Link>

          <nav className="hidden items-center gap-1 md:flex">
            {navLinks.map(link => (
              <NavLink key={link.to} to={link.to} className={navLinkClass} end={link.to === '/'}>
                {link.label}
              </NavLink>
            ))}
            <NavLink to="/contact" className={contactLinkClass}>
              Contact
            </NavLink>
          </nav>

          <button
            type="button"
            className="cursor-pointer rounded-full p-2 text-slate-100 transition-colors duration-200 hover:text-cyan-300 md:hidden"
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
          <nav id="mobile-nav" className="mt-4 flex flex-col gap-1 md:hidden">
            {navLinks.map(link => (
              <NavLink
                key={link.to}
                to={link.to}
                className={navLinkClass}
                end={link.to === '/'}
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </NavLink>
            ))}
            <NavLink to="/contact" onClick={() => setMenuOpen(false)} className={contactLinkClass}>
              Contact
            </NavLink>
          </nav>
        )}
      </header>

      <main className="mx-auto max-w-6xl px-6 pb-20 sm:px-10">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/experience" element={<Experience />} />
          <Route path="/skills" element={<Skills />} />
          <Route path="/certifications" element={<Certifications />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/projects/:id" element={<ProjectDetail />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
