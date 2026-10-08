# awards Specification

## Purpose
Defines what the portfolio's Awards section lists: university awards and honors, kept separate from certifications.

## Requirements

### Requirement: Awards section lists university awards only
The Awards section SHALL list exactly these four items, in this order, each with "University of Santo Tomas" and its date: St. Dominic de Guzman Award (July 2026), Pope Leo XIII Community Development Award (July 2026), Cum Laude (June 2026, with GWA 1.721), and Manuel L. Quezon Leadership Award (College Level) (July 2025). It MUST NOT list the Dean's List or any certification.

#### Scenario: Visitor opens the Awards section
- **WHEN** a visitor views the Awards section in the classic layout
- **THEN** it shows the four awards above, numbered 01 to 04, and no "Outstanding Academic Achiever, Dean's List" entry

#### Scenario: Home page award count
- **WHEN** the home page stats render in the classic layout
- **THEN** the Awards stat counts four

### Requirement: Dean's List remains in the journey
The scroll journey's Dean's List level SHALL keep presenting "Dean's List, every year" (Outstanding Academic Achiever, 2022 – 2026), even though the Awards section omits it.

#### Scenario: Visitor reaches the Dean's List level
- **WHEN** a visitor scrolls the journey to level 3
- **THEN** the story card reads "Dean's List, every year" with the four-step staircase
