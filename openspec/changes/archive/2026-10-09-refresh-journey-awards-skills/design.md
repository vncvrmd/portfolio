## Context

The scroll journey renders one prop per level inside an absolutely positioned anchor at 44vw (46vw from `sm`). Props are scaled by the CSS variable `--scene-scale` (0.72 on phones in portrait), and the `origin-bottom` utility on `.journey-prop` makes that scale pivot on the prop's bottom centre. The new props are about 370–480px wide, wider than the room to the right of the anchor on a 390px phone.

## Goals / Non-Goals

**Goals:**
- Every journey prop fits on screen at any width, without per-prop breakpoints.
- New props reuse the existing look (thick ink outlines, hard shadows, mono labels) from one shared module.

**Non-Goals:**
- Changing the anchor position or the `--scene-scale` values.
- Making decorative props accessible beyond `aria-hidden`; only the credential links are interactive.

## Decisions

- **Fit-to-screen in `Landmark`:** after every render and on resize, measure the prop's natural width, read the computed `scale` and `transform-origin`, and apply an extra `scale` so the prop's right edge stays 12px inside the viewport. Measuring on every render (not only through `ResizeObserver`) catches content that arrives later, such as the arcade's projects. Alternative considered: hand-tuned `max-sm` sizes per prop. Rejected because every new prop would need its own numbers.
- **`scale` passed as a string:** React appends `px` to a bare number for the `scale` property, which the browser rejects.
- **Drop one secondary element on phones** (`max-sm:hidden`): the SOCC building, the ALICE dashboard monitor, and the "1 of 50" grid. Fit-to-screen alone would shrink these props until their 9–10px text became unreadable.
- **Shared `primitives.tsx`:** `ink`, `Building`, `Sign`, `Parol`, and `Confetti` moved out of `scenes.tsx` so the new prop files could be built in parallel without editing `scenes.tsx`.
- **Credentials link URLs come from `certifications`** in `pages/Certifications.tsx`, so the verification links live in one place.

## Risks / Trade-offs

- [Fit-to-screen can make the widest props small on 320px screens] → Mitigated by hiding one secondary element per wide prop on phones.
- [Measuring after every render costs a layout read per Landmark] → There are 15 Landmarks and renders happen on level changes, so the cost is negligible; `setFit` ignores changes under 0.001 to avoid re-render loops.
