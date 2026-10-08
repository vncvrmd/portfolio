import Reveal from '../components/Reveal'
import SectionHeading from '../components/SectionHeading'
import SpotlightCard from '../components/reactbits/SpotlightCard'

interface SkillGroup {
  category: string
  items: string[]
}

function simpleIcon(slug: string): string {
  return `https://cdn.simpleicons.org/${slug}/b8b8c1`
}

// Brands not published on Simple Icons (Adobe, Microsoft, Salesforce, Canva, CapCut)
// are pulled from Iconify's brand icon sets instead, tinted to match.
function iconifyIcon(icon: string): string {
  return `https://api.iconify.design/${icon}.svg?color=%23b8b8c1`
}

const skillIcons: Record<string, string> = {
  TypeScript: simpleIcon('typescript'),
  Angular: simpleIcon('angular'),
  React: simpleIcon('react'),
  'Node.js': simpleIcon('nodedotjs'),
  FastAPI: simpleIcon('fastapi'),
  'ASP.NET Core': simpleIcon('dotnet'),
  Kotlin: simpleIcon('kotlin'),
  Firebase: simpleIcon('firebase'),
  PostgreSQL: simpleIcon('postgresql'),
  Supabase: simpleIcon('supabase'),
  'Claude Code': simpleIcon('claude'),
  'Git & GitHub': simpleIcon('github'),
  Express: simpleIcon('express'),
  'Tailwind CSS': simpleIcon('tailwindcss'),
  Vite: simpleIcon('vite'),
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
    category: 'Web Development',
    items: ['TypeScript', 'JavaScript', 'Angular', 'React', 'Tailwind CSS', 'Vite', 'HTML', 'CSS', 'Node.js', 'Express', 'FastAPI', 'ASP.NET Core', 'PHP', 'Laravel', 'Python']
  },
  {
    category: 'Databases & Mobile',
    items: ['PostgreSQL', 'MySQL', 'Supabase', 'Firebase', 'Kotlin']
  },
  {
    category: 'AI & Workflow',
    items: ['Claude Code', 'Prompt engineering', 'OpenSpec', 'Git & GitHub']
  },
  {
    category: 'Quality Assurance & Testing',
    items: ['Jest', 'Vitest', 'React Testing Library', 'Cypress', 'Mocha', 'Supertest', 'Security testing', 'Bug reporting']
  },
  {
    category: 'Salesforce & CRM',
    items: ['Apex (classes, triggers, DML)', 'SOQL/SOSL queries', 'Salesforce Flow', 'Data Loader', 'Schema modeling']
  },
  {
    category: 'Leadership & Management',
    items: ['Project management', 'Strategic planning', 'Technical training', 'Documentation', 'Quality management']
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
      <SectionHeading index={3} label="Toolbox" title="Skills" />
      <div className="grid gap-4 sm:grid-cols-2">
        {skillGroups.map((group, index) => (
          <Reveal key={group.category} delay={Math.min(index * 60, 240)} className="h-full">
            <SpotlightCard className="card h-full" spotlightColor="rgba(255, 255, 255, 0.06)">
              <h3 className="font-heading font-semibold text-ink">{group.category}</h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {group.items.map(item => (
                  <span key={item} className="pill-tag inline-flex items-center gap-1.5 transition-colors duration-200 hover:border-edge-strong hover:text-ink">
                    {skillIcons[item] && (
                      <img src={skillIcons[item]} alt="" aria-hidden="true" className="h-3.5 w-3.5" loading="lazy" />
                    )}
                    {item}
                  </span>
                ))}
              </div>
            </SpotlightCard>
          </Reveal>
        ))}
      </div>
    </div>
  )
}
