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
    <div className="space-y-6">
      <div>
        <span className="section-label">Toolbox</span>
        <h2 className="font-heading text-3xl font-bold text-ink">Skills</h2>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        {skillGroups.map(group => (
          <article key={group.category} className="card">
            <h3 className="font-heading font-semibold text-ink">{group.category}</h3>
            <p className="mt-2 text-sm leading-relaxed text-body">{group.items}</p>
          </article>
        ))}
      </div>
    </div>
  )
}
