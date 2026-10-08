import Reveal from '../components/Reveal'
import SectionHeading from '../components/SectionHeading'

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
    detail: 'Google · June 2026 – June 2029',
    url: 'https://edu.google.accredible.com/622d87cc-9b0a-483d-bb25-6653e5b70e60#acc.TVB9bav8'
  },
  {
    title: 'Cum Laude',
    detail: 'University of Santo Tomas · June 2026 · GWA 1.721'
  },
  {
    title: 'St. Dominic de Guzman Award',
    detail: 'University of Santo Tomas · July 2026'
  },
  {
    title: 'Pope Leo XIII Community Development Award',
    detail: 'University of Santo Tomas · July 2026'
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
    <div className="space-y-10">
      <SectionHeading index={4} label="Recognition" title="Certifications" />
      <div className="border-t border-edge">
        {certifications.map((cert, index) => (
          <Reveal key={cert.title} delay={Math.min(index * 60, 240)}>
            <div className="group grid grid-cols-[3rem_1fr] items-baseline gap-x-4 gap-y-1 border-b border-edge py-6 transition-colors duration-300 hover:bg-white/[0.02] sm:grid-cols-[4rem_1fr_auto] sm:px-2">
              <span className="font-mono text-sm text-faint transition-colors duration-300 group-hover:text-ink">
                {String(index + 1).padStart(2, '0')}
              </span>
              <div>
                <h3 className="font-heading text-lg font-medium text-ink sm:text-xl">{cert.title}</h3>
                {cert.detail && <p className="mt-1 text-sm text-muted">{cert.detail}</p>}
              </div>
              {cert.url ? (
                <a
                  href={cert.url}
                  target="_blank"
                  rel="noreferrer"
                  className="col-start-2 mt-2 inline-flex w-fit cursor-pointer items-center gap-1.5 rounded-full border border-edge-strong px-4 py-1.5 text-xs font-medium text-body transition-colors duration-200 hover:border-ink/60 hover:text-ink sm:col-start-3 sm:mt-0"
                >
                  Verify <span aria-hidden="true">↗</span>
                </a>
              ) : (
                <span className="hidden sm:block" />
              )}
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  )
}
