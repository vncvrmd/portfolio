import RecordList, { type RecordItem } from '../components/RecordList'
import SectionHeading from '../components/SectionHeading'

export const certifications: RecordItem[] = [
  {
    title: 'Information Technology Passport (IP) Certification Exam',
    detail: 'PhilNITS / ITPEC · IP01-0169 · October 2025',
    url: 'https://itpec.org/statsandresults/all-passers-information/Philippines/2025A_IP.pdf'
  },
  {
    title: 'Gemini Certified University Student',
    detail: 'Google · June 2026 – June 2029',
    url: 'https://edu.google.accredible.com/622d87cc-9b0a-483d-bb25-6653e5b70e60#acc.TVB9bav8'
  }
]

export default function Certifications() {
  return (
    <div className="space-y-10">
      <SectionHeading index={4} label="Credentials" title="Certifications" />
      <RecordList items={certifications} />
    </div>
  )
}
