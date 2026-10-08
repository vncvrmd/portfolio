## Why

The portfolio needed to match the owner's current résumé and give the scroll journey's busiest levels more detail. Awards mixed graduation honors with later university awards and still listed the Dean's List, the "Leading on campus" level named events (Crank IT, Build IT) the owner no longer features, and several skills on the résumé were missing from the site. On phones, the wider journey props ran off the right edge of the screen.

## What Changes

- Awards section: drop "Outstanding Academic Achiever, Dean's List" (it stays in the journey's Dean's List level).
- Journey: give the July 2026 St. Dominic de Guzman and Pope Leo XIII awards their own level, separate from the June 2026 Cum Laude graduation level, and point the header's Awards link at it.
- Journey "Leading on campus": replace Crank IT and Build IT with a festival board of the 11 events the owner headed; update the Experience timeline to match.
- Journey Samsung level: add Galaxy phones that light up, take a selfie, and pop notifications, keeping the "1 of 50" grid.
- Journey Kidlat level: add an ALICE chat on Messenger (access code, question, typing, an answer citing an ALS module) and a mini admin cost-and-replies dashboard.
- Journey Credentials level: make the IT Passport stamp and Gemini badge open their verification pages.
- Journey toolbox and Skills section: add the skills on the current résumé (C#, ASP.NET MVC, SQL Server, Docker, Vercel, Render, and more).
- Journey props wider than the space to the right of their anchor scale down to fit the screen; on phones each wide prop drops one secondary element so its text stays readable.

## Capabilities

### New Capabilities
- `awards`: what the Awards section lists.
- `skills`: the Skills section's groups and items.
- `experience-timeline`: the campus events named in the Experience timeline.
- `scroll-journey`: the journey levels changed here and how props fit narrow screens.

### Modified Capabilities
<!-- None: this repository had no specs before this change. -->

## Impact

- Code: `client/src/pages/Awards.tsx`, `client/src/pages/Skills.tsx`, `client/src/pages/Experience.tsx`, `client/src/components/journey/scenes.tsx`, `client/src/components/journey/Journey.tsx`, new `client/src/components/journey/primitives.tsx` and `client/src/components/journey/props/{AliceLab,AwardMedals,CampusEvents,GalaxyAmbassador}.tsx`.
- No API, route, or dependency changes; the Render API is untouched.
- Shipped in commit `9931bd9` on `main`; this change records it retroactively.
