## 1. Awards

- [x] 1.1 Remove "Outstanding Academic Achiever, Dean's List" from `awards` in `pages/Awards.tsx`; verify the Awards section lists four awards and the Dean's List level remains in the journey
- [x] 1.2 Limit the graduation level to Cum Laude and add an `awards` level (July 2026) with `AwardMedals`, placed between Kidlat and Bicol; move `nav: 'Awards'` to it and verify the header link lands there

## 2. Leading on campus

- [x] 2.1 Build `props/CampusEvents.tsx` with the SOCC building and a festival board of the 11 events, with Parol lanterns over both Paskuhan tags; verify each name character by character
- [x] 2.2 Update the leadership level's text and the Experience timeline's events entry; confirm "Crank IT" and "Build IT" no longer appear anywhere in `client/src`

## 3. Samsung and Kidlat levels

- [x] 3.1 Build `props/GalaxyAmbassador.tsx` (phones that light up, a selfie with flash, notifications, and the "1 of 50" grid) and update the level text to the résumé wording
- [x] 3.2 Build `props/AliceLab.tsx` (Kidlat building, ALICE Messenger chat with an ALS module source, admin cost-and-replies dashboard); lower the building to 3 floors so the story card doesn't cover its sign at 1037×698

## 4. Credentials, toolbox, and skills

- [x] 4.1 Turn the IT Passport stamp and Gemini badge into links to their verification pages (new tab, focusable only while the level is active); verify a click at each one's centre reaches the link
- [x] 4.2 Grow the toolbox to 12 crates in a 4×3 grid and update the toolbox text
- [x] 4.3 Add the missing résumé skills to `pages/Skills.tsx`, with a new "Cloud & Deployment" group, checking each icon URL returns 200

## 5. Fit props to the screen

- [x] 5.1 Move `ink`, `Building`, `Sign`, `Parol`, and `Confetti` into `journey/primitives.tsx`
- [x] 5.2 Add fit-to-screen scaling to `Landmark` in `Journey.tsx`, accounting for `--scene-scale` and the bottom-centre transform origin
- [x] 5.3 Hide one secondary element per wide prop below `sm`; verify in a 390px frame that no prop's right edge passes the viewport, including the arcade after its projects load

## 6. Verification and release

- [x] 6.1 Run `tsc --noEmit` and `npm run build` with no errors
- [x] 6.2 Check every changed level in Chrome at 1037×698; at 390px wide, view the Leading on campus, Samsung, arcade, Kidlat, and awards levels and measure every level's prop bounds; check the Awards, Skills, and Experience sections in the classic layout
- [x] 6.3 Commit to `main` as `vincevermudo@gmail.com` and push (`9931bd9`); confirm the live Vercel bundle has the new content
