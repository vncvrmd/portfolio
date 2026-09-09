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
    <div className="space-y-6">
      <div>
        <span className="section-label">Recognition</span>
        <h2 className="font-heading text-3xl font-bold text-ink">Certifications</h2>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        {certifications.map(cert => (
          <article key={cert.title} className="card">
            <h3 className="font-heading font-semibold text-ink">{cert.title}</h3>
            {cert.detail && <p className="mt-2 text-sm font-medium text-accent2">{cert.detail}</p>}
          </article>
        ))}
      </div>
    </div>
  )
}
