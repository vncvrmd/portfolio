interface Entry {
  title: string
  subtitle: string
  bullets: string[]
}

const professionalExperience: Entry[] = [
  {
    title: 'Internship, Accenture, Inc. (Salesforce Capability)',
    subtitle: 'Dec 2025 – May 2026',
    bullets: [
      'Engineered and automated end-to-end business workflows using Salesforce Flow, including Screen, Record-Triggered, and Schedule-Triggered flows to optimize system processes.',
      'Developed backend automation using Apex classes, triggers, and DML operations, utilizing SOQL and SOSL queries for advanced data retrieval and manipulation.',
      'Designed complex relational data models, including custom objects, lookup and master-detail relationships, and managed system security through profiles, permission sets, and OWD configurations.',
      'Performed data migration and integrity management using Data Import Wizard and Data Loader, while building custom reports and dashboards for organizational data analysis.'
    ]
  }
]

const leadershipExperience: Entry[] = [
  {
    title: 'Samsung Galaxy Campus Ambassador (Batch 3)',
    subtitle: '2025–2026',
    bullets: ['Selected as one of only 50 students nationwide to drive brand advocacy and execute strategic engagement missions.']
  },
  {
    title: 'Chief-of-Staff / VP for Quality Management & Assurance',
    subtitle: '2023 – 2026',
    bullets: [
      'Led quality management and assurance initiatives across student organizations.',
      'Served as Chief of Staff and Vice President for the Project Evaluations Committee.'
    ]
  },
  {
    title: 'Project Head & Lead Organizer',
    subtitle: 'Various Dates',
    bullets: ['Directed major university events including Crank IT, Build IT 2023 and UST Paskuhan 2024 (Lead Organizer & Documentation Head).']
  }
]

const education: Entry = {
  title: 'Bachelor of Science in Information Technology',
  subtitle: 'Major in Web and Mobile Application Development · University of Santo Tomas · August 2022 – June 2026',
  bullets: ['Cum Laude']
}

function EntryCard({ entry }: { entry: Entry }) {
  return (
    <article className="card">
      <h3 className="font-heading font-semibold text-ink">{entry.title}</h3>
      <p className="mt-1 text-sm font-medium text-accent2">{entry.subtitle}</p>
      <ul className="mt-3 space-y-2 text-body">
        {entry.bullets.map(bullet => (
          <li key={bullet} className="flex items-start gap-2.5">
            <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-edge-strong" />
            <span>{bullet}</span>
          </li>
        ))}
      </ul>
    </article>
  )
}

function Group({ label, title, entries }: { label: string; title: string; entries: Entry[] }) {
  return (
    <section>
      <span className="section-label">{label}</span>
      <h2 className="mb-6 font-heading text-2xl font-bold text-ink">{title}</h2>
      <div className="space-y-4">
        {entries.map(entry => (
          <EntryCard key={entry.title} entry={entry} />
        ))}
      </div>
    </section>
  )
}

export default function Experience() {
  return (
    <div className="space-y-12">
      <Group label="Career" title="Professional Experience" entries={professionalExperience} />
      <Group label="Campus" title="Leadership & University Experience" entries={leadershipExperience} />
      <Group label="Academics" title="Education" entries={[education]} />
    </div>
  )
}
