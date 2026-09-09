import React from 'react'
import { Link } from 'react-router-dom'

const highlights = [
  { to: '/experience', title: 'Experience', description: 'Internships, leadership roles, and education.' },
  { to: '/skills', title: 'Skills', description: 'Salesforce, full-stack development, and QA.' },
  { to: '/certifications', title: 'Certifications', description: 'Credentials and academic honors.' }
]

export default function Home() {
  return (
    <div className="space-y-8">
      <section className="rounded-3xl border border-slate-800 bg-slate-900/80 p-8 shadow-xl shadow-slate-950/20">
        <h1 className="font-heading text-3xl font-semibold text-slate-100">Welcome</h1>
        <p className="mt-4 text-slate-300">This is my IT portfolio. Explore projects, experience, skills, and get in touch.</p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            to="/projects"
            className="cursor-pointer rounded-full bg-cyan-500 px-6 py-3 text-sm font-semibold text-slate-950 transition-colors duration-200 hover:bg-cyan-400"
          >
            View projects
          </Link>
          <Link
            to="/contact"
            className="cursor-pointer rounded-full border border-slate-700 px-6 py-3 text-sm font-semibold text-slate-100 transition-colors duration-200 hover:border-cyan-400 hover:text-cyan-300"
          >
            Contact
          </Link>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-3">
        {highlights.map(item => (
          <Link
            key={item.to}
            to={item.to}
            className="cursor-pointer rounded-2xl border border-slate-800 bg-slate-900/80 p-5 transition-colors duration-200 hover:border-cyan-400"
          >
            <h2 className="font-heading font-semibold text-slate-100">{item.title}</h2>
            <p className="mt-2 text-sm text-slate-300">{item.description}</p>
          </Link>
        ))}
      </section>
    </div>
  )
}
