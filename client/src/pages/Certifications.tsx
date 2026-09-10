import Reveal from '../components/Reveal'

interface Certification {
  title: string
  detail: string
  url?: string
}

export const certifications: Certification[] = [
  {
    title: 'Information Technology Passport (IP) Certification Exam',
    detail: 'IP01-0169 · October 2025',
    url: 'https://itpec.org/statsandresults/all-passers-information/Philippines/2025A_IP.pdf'
  },
  {
    title: 'Gemini Certified University Student',
    detail: '',
    url: 'https://edu.google.accredible.com/622d87cc-9b0a-483d-bb25-6653e5b70e60#acc.TVB9bav8'
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
      <Reveal>
        <span className="section-label">Recognition</span>
        <h2 className="font-heading text-3xl font-bold text-ink">Certifications</h2>
      </Reveal>
      <div className="grid gap-4 sm:grid-cols-2">
        {certifications.map((cert, index) => (
          <Reveal key={cert.title} delay={Math.min(index * 60, 240)}>
            <article className="card">
              <h3 className="font-heading font-semibold text-ink">{cert.title}</h3>
              {cert.detail && <p className="mt-2 text-sm font-medium text-accent2">{cert.detail}</p>}
              {cert.url && (
                <a
                  href={cert.url}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-3 inline-block cursor-pointer text-sm font-medium text-accent2 transition-colors duration-200 hover:text-ink"
                >
                  Verify ↗
                </a>
              )}
            </article>
          </Reveal>
        ))}
      </div>
    </div>
  )
}
