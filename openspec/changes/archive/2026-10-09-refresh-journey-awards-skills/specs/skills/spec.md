## Purpose

Defines the groups and items in the portfolio's Skills section, kept in line with the owner's résumé.

## ADDED Requirements

### Requirement: Skills cover the résumé's technical skills
The Skills section SHALL include, among its items: C#, ASP.NET Core, ASP.NET MVC, SQL Server, SCSS, Android Development, Docker, Vercel, Render, Git & GitHub, Claude Code, Prompt engineering, OpenSpec, Security testing, Bug reporting, Debugging, and Data Loader, alongside the existing web, database, testing, and Salesforce skills.

#### Scenario: Recruiter scans for a résumé skill
- **WHEN** a visitor looks for C#, ASP.NET MVC, SQL Server, Docker, or Vercel in the Skills section
- **THEN** each appears as its own item

### Requirement: Skills are grouped by area
The Skills section SHALL present these groups in order: Web Development, Databases & Mobile, Cloud & Deployment, AI & Workflow, Quality Assurance & Testing, Salesforce & CRM, Leadership & Management, Multimedia Production, and Tools. Cloud & Deployment SHALL contain Docker, Vercel, Render, and Git & GitHub.

#### Scenario: Visitor views the Skills section
- **WHEN** the Skills section renders
- **THEN** it shows the nine groups above, with Cloud & Deployment listing Docker, Vercel, Render, and Git & GitHub

### Requirement: Skill icons load
Every skill item that shows a brand icon SHALL use an icon URL that resolves; skills without a published icon MUST render as text only rather than a broken image. C# and SQL Server icons come from Iconify (`mdi:language-csharp`, `devicon-plain:microsoftsqlserver`) because Simple Icons does not publish them.

#### Scenario: Icons for newly added skills
- **WHEN** the Skills section renders C#, SQL Server, Docker, Vercel, Render, Android Development, and SCSS
- **THEN** each shows its icon with no broken-image placeholder
