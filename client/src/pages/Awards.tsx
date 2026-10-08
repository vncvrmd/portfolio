import RecordList, { type RecordItem } from '../components/RecordList'
import SectionHeading from '../components/SectionHeading'

export const awards: RecordItem[] = [
  {
    title: 'St. Dominic de Guzman Award',
    detail: 'University of Santo Tomas · July 2026'
  },
  {
    title: 'Pope Leo XIII Community Development Award',
    detail: 'University of Santo Tomas · July 2026'
  },
  {
    title: 'Cum Laude',
    detail: 'University of Santo Tomas · June 2026 · GWA 1.721'
  },
  {
    title: 'Manuel L. Quezon Leadership Award (College Level)',
    detail: 'University of Santo Tomas · July 2025'
  }
]

export default function Awards() {
  return (
    <div className="space-y-10">
      <SectionHeading index={5} label="Recognition" title="Awards" />
      <RecordList items={awards} />
    </div>
  )
}
