import React from 'react'

interface Certification {
  title: string
  detail: string
}

const certifications: Certification[] = [
  {
    title: 'Information Technology Passport (IP) Certification Exam',
    detail: 'IP01-0169 · October 2025'
  },
  {
    title: 'Gemini Certified University Student',
    detail: ''
  },
  {
    title: 'Manuel L. Quezon Leadership Award (College Level)',
    detail: 'University of Santo Tomas · 2025'
  },
  {
    title: 'Outstanding Academic Achiever, Dean’s List',
    detail: '2022–2026'
  }
]

export default function Certifications() {
  return (
    <section className="rounded-3xl border border-slate-800 bg-slate-900/80 p-8 shadow-xl shadow-slate-950/20">
      <h2 className="font-heading text-2xl font-semibold text-slate-100">Certifications</h2>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {certifications.map(cert => (
          <article
            key={cert.title}
            className="rounded-2xl border border-slate-800 bg-slate-950/90 p-4 transition-colors duration-200 hover:border-cyan-400"
          >
            <h3 className="font-heading font-semibold text-slate-100">{cert.title}</h3>
            {cert.detail && <p className="mt-2 text-slate-300">{cert.detail}</p>}
          </article>
        ))}
      </div>
    </section>
  )
}
