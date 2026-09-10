interface SkillGroup {
  category: string
  items: string[]
}

function simpleIcon(slug: string): string {
  return `https://cdn.simpleicons.org/${slug}/a3e635`
}

// Brands not published on Simple Icons (Adobe, Microsoft, Salesforce, Canva, CapCut)
// are pulled from Iconify's brand icon sets instead, tinted to match.
function iconifyIcon(icon: string): string {
  return `https://api.iconify.design/${icon}.svg?color=%23a3e635`
}

const skillIcons: Record<string, string> = {
  React: simpleIcon('react'),
  'Node.js': simpleIcon('nodedotjs'),
  Express: simpleIcon('express'),
  'Tailwind CSS': simpleIcon('tailwindcss'),
  Vite: simpleIcon('vite'),
  Swift: simpleIcon('swift'),
  HTML: simpleIcon('html5'),
  CSS: simpleIcon('css'),
  JavaScript: simpleIcon('javascript'),
  PHP: simpleIcon('php'),
  MySQL: simpleIcon('mysql'),
  Laravel: simpleIcon('laravel'),
  Python: simpleIcon('python'),
  Jest: simpleIcon('jest'),
  Vitest: simpleIcon('vitest'),
  'React Testing Library': simpleIcon('testinglibrary'),
  Cypress: simpleIcon('cypress'),
  Mocha: simpleIcon('mocha'),
  Pantheon: simpleIcon('pantheon'),
  Canva: iconifyIcon('cib:canva'),
  CapCut: iconifyIcon('hugeicons:capcut'),
  'Adobe Creative Cloud': iconifyIcon('cib:adobe-creative-cloud'),
  'Microsoft Office': iconifyIcon('mdi:microsoft-office'),
  'Google Workspace': iconifyIcon('cib:google'),
  'Salesforce Flow': iconifyIcon('cib:salesforce')
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
                <span key={item} className="pill-tag inline-flex items-center gap-1.5">
                  {skillIcons[item] && (
                    <img src={skillIcons[item]} alt="" aria-hidden="true" className="h-3.5 w-3.5" loading="lazy" />
                  )}
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
