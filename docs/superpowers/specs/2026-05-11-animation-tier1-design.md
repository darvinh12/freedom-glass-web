# Animation Tier 1 — Design Spec
**Date:** 2026-05-11  
**Project:** Freedom Glass Remodeling — Astro + React site  
**Style chosen:** Elegant & Refined (no new libraries, performance-first)

---

## Goal

Make the site feel noticeably more fluid and premium without adding any new libraries or hurting Core Web Vitals. All animations run on `transform` and `opacity` only — no layout-triggering properties.

---

## Feature 1: View Transitions (Page Navigation)

### What it does
Adds a smooth fade transition when navigating between pages instead of the default instant jump.

### Implementation
- **`src/layouts/BaseLayout.astro`**: Import `ViewTransitions` from `astro:transitions` and add `<ViewTransitions />` inside `<head>`.
- **`src/styles/global.css`**: Define custom entry/exit animations:
  - Exit: fade out + 4px translateY up, 220ms ease
  - Enter: fade in + 4px translateY up (from below), 280ms ease
  - Respect `prefers-reduced-motion`: skip animation, instant swap

### Constraints
- Uses Astro's built-in View Transitions with automatic browser fallback
- Zero JavaScript bundle increase
- No impact on Lighthouse scores

---

## Feature 2: Reveal Variety

### What it does
Replaces the single uniform `.blur-reveal` (fade + blur + translateY up) with 4 directional variants so each section feels intentionally designed.

### CSS classes

| Class | Initial state | Used for |
|-------|--------------|----------|
| `.reveal` | `opacity:0; translateY(20px)` | Paragraphs, subtitles, body text |
| `.reveal-left` | `opacity:0; translateX(-28px)` | Section titles, left-side content |
| `.reveal-right` | `opacity:0; translateX(28px)` | Images, right-side content, aside elements |
| `.reveal-scale` | `opacity:0; scale(0.96)` | Cards, badges, stat numbers, CTA blocks |

All variants:
- Transition: `opacity 0.6s ease, transform 0.6s cubic-bezier(0.22, 1, 0.36, 1)`
- Add `.visible` class on intersection to trigger animation
- `prefers-reduced-motion`: set `opacity:1; transform:none; transition:none` immediately

### IntersectionObserver update (`GlobalEffects.tsx`)
Change the observer selector from `'.blur-reveal'` to `'.blur-reveal, .reveal, .reveal-left, .reveal-right, .reveal-scale'`. Behavior is identical: add `.visible` when `isIntersecting`, unobserve after.

### Backward compatibility
`.blur-reveal` keeps working exactly as before — it is NOT removed, just kept as the legacy variant for existing elements not yet updated.

### Apply to components
Update class names in these files to use the appropriate variant:

| File | Element | New class |
|------|---------|-----------|
| `about.astro` | Section titles (Story, MVV, Values) | `.reveal-left` |
| `about.astro` | Story aside (badge, year, quote) | `.reveal-right` |
| `about.astro` | MVV cards, value cards, cred cards | `.reveal-scale` |
| `services.astro` | Page title, section headings | `.reveal-left` |
| `contact.astro` | Form container | `.reveal-right` |
| `portfolio/index.astro` | Page title | `.reveal-left` |
| `DifferentiatorsSection.astro` | diff-intro block | `.reveal-left` |
| `ContactCTA.astro` | CTA inner block | `.reveal-scale` |
| `faq.astro` | Page title | `.reveal-left` |

---

## Feature 3: Stagger Grid Entrances

### What it does
When a grid enters the viewport, its child items appear sequentially with 80ms delay between each — instead of all at once. Capped at 8 items max delay to avoid feeling slow.

### Mechanic
1. In `GlobalEffects.tsx`, after the existing `blur-reveal` observer, add a second `IntersectionObserver` watching `.stagger-grid` containers.
2. When a `.stagger-grid` enters the viewport (`threshold: 0.08`):
   - Query all direct children
   - For each child at index `i`: `setTimeout(() => child.classList.add('visible'), i * 80)`
   - Unobserve the container after triggering
3. CSS on `.stagger-grid > *`:
   - Initial: `opacity: 0; transform: translateY(16px)`
   - `.visible`: `opacity: 1; transform: none`
   - Transition: `opacity 0.5s ease, transform 0.5s cubic-bezier(0.22, 1, 0.36, 1)`
   - `prefers-reduced-motion`: all children immediately visible, no transition

### Apply `.stagger-grid` to these containers

| File | Container element | Child count |
|------|------------------|-------------|
| `portfolio/index.astro` | `.cat-grid` | 15 (stagger first 8 only) |
| `portfolio/[category].astro` | `.gallery-grid` | up to 33 (stagger first 8 only) |
| `services.astro` | service cards grid | varies |
| `about.astro` | `.values-grid` | 4 |
| `about.astro` | `.creds-grid` | 3 |
| `about.astro` | `.obj-grid` | 4 |
| `DifferentiatorsSection.astro` | `.diff-list` | 6 |

**Cap logic:** Only apply stagger delay to `i < 8`. Items at index 8+ get `transition-delay: 0` so they appear without delay if the user scrolls fast.

---

## Files Changed (complete list)

1. `src/layouts/BaseLayout.astro` — add `<ViewTransitions />`
2. `src/styles/global.css` — view transition keyframes + 4 reveal variant classes + stagger child CSS
3. `src/components/effects/GlobalEffects.tsx` — extend IntersectionObserver selector + add stagger observer
4. `src/pages/about.astro` — update reveal classes on multiple elements
5. `src/pages/services.astro` — update reveal classes + add `.stagger-grid`
6. `src/pages/contact.astro` — update reveal classes
7. `src/pages/portfolio/index.astro` — update reveal classes + add `.stagger-grid`
8. `src/pages/portfolio/[category].astro` — add `.stagger-grid`
9. `src/pages/faq.astro` — update reveal classes
10. `src/components/sections/DifferentiatorsSection.astro` — update reveal classes + add `.stagger-grid`
11. `src/components/sections/ContactCTA.astro` — update reveal class

---

## Non-goals

- No new npm packages
- No GSAP, anime.js, or additional React islands
- No parallax on section backgrounds (performance risk on mobile)
- No magnetic buttons (out of scope for Tier 1)
- No changes to HeroSection.tsx (already has Framer Motion stagger — leave it)

---

## Performance contract

- All animated properties: `transform`, `opacity` only
- `will-change` is NOT added (browser decides — avoids unnecessary compositing layers)
- All animations gated behind `IntersectionObserver` (never animate off-screen)
- `prefers-reduced-motion` respected in every feature
- Lighthouse score impact: none expected
