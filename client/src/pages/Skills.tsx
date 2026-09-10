interface SkillGroup {
  category: string
  items: string[]
}

export const skillGroups: SkillGroup[] = [
  {
    category: 'Salesforce & CRM',
    items: ['Apex (classes, triggers, DML)', 'SOQL/SOSL queries', 'Salesforce Flow', 'Schema modeling']
  },
  {
    category: 'Web & Mobile Development',
    items: ['React', 'Node.js', 'Express', 'Tailwind CSS', 'Vite', 'Swift', 'HTML', 'CSS', 'JavaScript', 'PHP', 'MySQL', 'Laravel', 'Python']
  },
  {
    category: 'Quality Assurance & Testing',
    items: ['Jest', 'Vitest', 'React Testing Library', 'Cypress', 'Mocha', 'Supertest']
  },
  {
    category: 'Leadership & Management',
    items: ['Project management', 'Strategic planning', 'Documentation', 'Quality management']
  },
  {
    category: 'Multimedia Production',
    items: ['Canva', 'CapCut', 'Adobe Creative Cloud']
  },
  {
    category: 'Tools',
    items: ['Microsoft Office', 'Google Workspace', 'Pantheon']
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
            <div className="mt-3 flex flex-wrap gap-2">
              {group.items.map(item => (
                <span key={item} className="pill-tag">
                  {item}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}
