import React from 'react'

interface SkillGroup {
  category: string
  items: string
}

const skillGroups: SkillGroup[] = [
  {
    category: 'Salesforce & CRM',
    items:
      'Apex (classes, triggers, DML), SOQL/SOSL queries, Salesforce Flow (Screen, Record-Triggered, Scheduled, Autolaunched), and Schema modeling.'
  },
  {
    category: 'Web & Mobile Development',
    items: 'React, Node.js, Express, Tailwind CSS, Vite, Swift, HTML, CSS, JavaScript, PHP, MySQL, Laravel, and Python.'
  },
  {
    category: 'Quality Assurance & Testing',
    items:
      'Unit testing (Jest, Vitest), Component testing (React Testing Library), E2E testing (Cypress), and backend/HTTP testing (Mocha, Supertest).'
  },
  {
    category: 'Leadership & Management',
    items: 'Project management, strategic planning, documentation, and quality management.'
  },
  {
    category: 'Multimedia Production',
    items: 'Photo and video editing using Canva, CapCut, and Adobe Creative Cloud.'
  },
  {
    category: 'Tools',
    items: 'Microsoft Office, Google Workspace, and Pantheon.'
  }
]

export default function Skills() {
  return (
    <section className="rounded-3xl border border-slate-800 bg-slate-900/80 p-8 shadow-xl shadow-slate-950/20">
      <h2 className="text-2xl font-semibold text-slate-100">Skills</h2>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {skillGroups.map(group => (
          <article key={group.category} className="rounded-2xl border border-slate-800 bg-slate-950/90 p-4">
            <h3 className="font-semibold text-slate-100">{group.category}</h3>
            <p className="mt-2 text-slate-300">{group.items}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
