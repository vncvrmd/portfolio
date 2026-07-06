import React from 'react'
import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <div className="space-y-8">
      <section className="rounded-3xl border border-slate-800 bg-slate-900/80 p-8 shadow-xl shadow-slate-950/20">
        <h1 className="text-3xl font-semibold text-slate-100">Welcome</h1>
        <p className="mt-4 text-slate-300">This is my IT portfolio. Explore projects, skills, and get in touch.</p>
        <div className="mt-6 flex gap-3">
          <Link to="/projects" className="rounded-full bg-cyan-500 px-6 py-3 text-sm font-semibold text-slate-950">View projects</Link>
          <Link to="/contact" className="rounded-full border border-slate-700 px-6 py-3 text-sm font-semibold text-slate-100">Contact</Link>
        </div>
      </section>
    </div>
  )
}
