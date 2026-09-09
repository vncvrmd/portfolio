import React from 'react'

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
    <article className="rounded-2xl border border-slate-800 bg-slate-950/90 p-4 transition-colors duration-200 hover:border-cyan-400">
      <h3 className="font-heading font-semibold text-slate-100">{entry.title}</h3>
      <p className="mt-1 text-sm text-cyan-300">{entry.subtitle}</p>
      <ul className="mt-3 list-disc space-y-2 pl-5 text-slate-300">
        {entry.bullets.map(bullet => (
          <li key={bullet}>{bullet}</li>
        ))}
      </ul>
    </article>
  )
}

export default function Experience() {
  return (
    <div className="space-y-8">
      <section className="rounded-3xl border border-slate-800 bg-slate-900/80 p-8 shadow-xl shadow-slate-950/20">
        <h2 className="font-heading text-2xl font-semibold text-slate-100">Professional Experience</h2>
        <div className="mt-6 space-y-4">
          {professionalExperience.map(entry => (
            <EntryCard key={entry.title} entry={entry} />
          ))}
        </div>
      </section>

      <section className="rounded-3xl border border-slate-800 bg-slate-900/80 p-8 shadow-xl shadow-slate-950/20">
        <h2 className="font-heading text-2xl font-semibold text-slate-100">Leadership & University Experience</h2>
        <div className="mt-6 space-y-4">
          {leadershipExperience.map(entry => (
            <EntryCard key={entry.title} entry={entry} />
          ))}
        </div>
      </section>

      <section className="rounded-3xl border border-slate-800 bg-slate-900/80 p-8 shadow-xl shadow-slate-950/20">
        <h2 className="font-heading text-2xl font-semibold text-slate-100">Education</h2>
        <div className="mt-6">
          <EntryCard entry={education} />
        </div>
      </section>
    </div>
  )
}
