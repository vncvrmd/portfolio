import { useEffect, useState } from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home'
import ProjectsPage from './pages/Projects'
import ContactPage from './pages/Contact'
import Certifications from './pages/Certifications'
import ProjectDetail from './pages/ProjectDetail'

interface Project {
  id: number
  title: string
  description: string
  url: string
}

interface About {
  headline: string
  details: string[]
}

function App() {
  const [projects, setProjects] = useState<Project[]>([])
  const [skills, setSkills] = useState<string[]>([])
  const [about, setAbout] = useState<About>({ headline: '', details: [] })
  const [formState, setFormState] = useState({ name: '', email: '', message: '' })
  const [contactResponse, setContactResponse] = useState('')

  useEffect(() => {
    Promise.all([
      fetch('/api/about').then(res => res.json()),
      fetch('/api/skills').then(res => res.json()),
      fetch('/api/projects').then(res => res.json())
    ])
      .then(([aboutData, skillsData, projectsData]) => {
        setAbout(aboutData.about)
        setSkills(skillsData.skills)
        setProjects(projectsData.projects)
      })
      .catch(error => console.error('Error fetching portfolio data:', error))
  }, [])

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState({ ...formState, [event.target.name]: event.target.value })
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formState)
    })

    const result = await response.json()

    if (response.ok) {
      setContactResponse(result.message)
      setFormState({ name: '', email: '', message: '' })
    } else {
      setContactResponse(result.error || 'Unable to send message.')
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <header className="mx-auto max-w-6xl px-6 py-8 sm:px-10">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-lg font-semibold text-slate-100">IT Portfolio</Link>
          <nav className="flex gap-3">
            <Link to="/" className="rounded-full px-4 py-2 text-sm hover:text-cyan-300">Home</Link>
            <Link to="/projects" className="rounded-full px-4 py-2 text-sm hover:text-cyan-300">Projects</Link>
            <Link to="/certifications" className="rounded-full px-4 py-2 text-sm hover:text-cyan-300">Certifications</Link>
            <Link to="/contact" className="rounded-full bg-cyan-500 px-4 py-2 text-sm font-semibold text-slate-950">Contact</Link>
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 pb-20 sm:px-10">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/certifications" element={<Certifications />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/projects/:id" element={<ProjectDetail />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
