## Purpose

Defines the scroll journey levels updated in this change, and how journey props fit narrow screens.

## ADDED Requirements

### Requirement: Separate levels for graduation and the July 2026 awards
The journey SHALL show graduation (June 2026) and the July 2026 awards as separate levels. The graduation level SHALL present only Cum Laude with the GWA of 1.721. A level titled "Two more awards" (July 2026, University of Santo Tomas) SHALL present the St. Dominic de Guzman Award and the Pope Leo XIII Community Development Award with two medals, a "July 2026" plaque, and confetti. It SHALL sit after the Kidlat level and before the Bicol level, and the header's Awards link SHALL jump to it.

#### Scenario: Visitor uses the header Awards link in journey mode
- **WHEN** a visitor activates "Awards" in the header while the journey is on
- **THEN** the journey scrolls to the "Two more awards" level and the header highlights Awards

#### Scenario: Graduation level content
- **WHEN** a visitor reaches the graduation level
- **THEN** its card mentions Cum Laude and the GWA, and does not mention the St. Dominic or Pope Leo awards

### Requirement: Leading on campus shows the events headed
The "Leading on campus" level SHALL show a SOCC building beside a festival board listing these 11 events exactly as written: ROARientation and Welcome Walk 2024, Thomasian Welcome Party 2024, R101 2024, R101 2025, Thomasian Youth Ambassador and Ambassadress 2025, MAKIBATA 2025, Secretariat 2024, Diamonds 2024, SOCC 50th Homecoming Anniversary, UST Paskuhan 2024, and UST Paskuhan 2025. Parol lanterns SHALL hang over both Paskuhan tags. Crank IT and Build IT MUST NOT appear.

#### Scenario: Visitor reaches the level
- **WHEN** the character arrives at the "Leading on campus" level
- **THEN** the 11 event tags pop in one after another and stay legible

### Requirement: Samsung level shows Galaxy phones
The Samsung Galaxy Campus Ambassador level SHALL keep the "Batch 3 · 1 of 50" grid with one highlighted square, and add Galaxy phones that spring up and light up, a selfie with a camera flash, and notification pop-ups. It MUST NOT draw the Samsung logo or wordmark. The card text SHALL read "One of 50 students picked nationwide to promote Samsung and run campus activities."

#### Scenario: Visitor reaches the Samsung level
- **WHEN** the character arrives at the Samsung level
- **THEN** the phones light up, the selfie is taken with a flash, and the notifications appear

### Requirement: Kidlat level shows ALICE in use
The Kidlat CivicLabs level SHALL show the Kidlat building, an ALICE chat styled after Messenger, and a small admin dashboard. The chat SHALL play this sequence: an access-code confirmation, a learner question, typing dots, ALICE's answer with a source chip "From: ALS Module · Science", and a learner's thanks. The dashboard SHALL chart replies as bars and cost as a line. The props MUST NOT depict the government website or name its client; the story card may describe that work only without naming the agency.

#### Scenario: Visitor reaches the Kidlat level
- **WHEN** the character arrives at the Kidlat level
- **THEN** the chat plays in order and the dashboard's bars and cost line draw in afterward

### Requirement: Credentials link to verification pages
On the Credentials level, the IT Passport stamp SHALL link to the ITPEC passers list and the Gemini badge SHALL link to the Google Gemini credential page, both opening in a new tab. Each link SHALL have a descriptive accessible name, SHALL be keyboard-focusable only while its level is active, and SHALL receive pointer clicks over its whole face.

#### Scenario: Visitor clicks a credential
- **WHEN** a visitor clicks the IT Passport stamp or the Gemini badge
- **THEN** the matching verification page opens in a new tab

#### Scenario: Keyboard user on another level
- **WHEN** the Credentials level is not active
- **THEN** neither credential link is in the tab order

### Requirement: Toolbox shows twelve crates
The toolbox level SHALL drop twelve crates in a 4×3 grid: Apex, Flow, React, Angular, TypeScript, Node.js, Python, FastAPI, Laravel, Kotlin, SQL, and Docker.

#### Scenario: Visitor reaches the toolbox
- **WHEN** the character arrives at the toolbox level
- **THEN** all twelve crates land in four columns and three rows

### Requirement: Props fit the screen
Every journey prop SHALL fit between its anchor and 12px inside the right edge of the viewport. Props wider than that space SHALL scale down, accounting for `--scene-scale` and the prop's transform origin, and SHALL re-check their size after content loads (such as the project arcade's cabinets) and on window resize. Below the `sm` breakpoint, the Leading on campus level SHALL hide its SOCC building, the Kidlat level its admin dashboard, and the Samsung level its "1 of 50" grid, so the remaining text stays readable.

#### Scenario: Phone in portrait
- **WHEN** the journey runs in a 390px-wide portrait viewport
- **THEN** no level's prop extends past the right edge, including the arcade after its projects load

#### Scenario: Desktop
- **WHEN** the viewport leaves enough room to the right of the anchor
- **THEN** props render at their normal size with no extra scaling
