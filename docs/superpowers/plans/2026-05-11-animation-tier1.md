# Animation Tier 1 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add View Transitions between pages, 4 directional reveal variants, and staggered grid entrances — all without new libraries, touching only `transform` and `opacity`.

**Architecture:** CSS-first approach. New CSS classes in `global.css` handle all visual states. A single `IntersectionObserver` in `GlobalEffects.tsx` drives all reveals. Stagger uses `setTimeout` with index-based delay (capped at index 7 = 560ms max). Astro's built-in `<ViewTransitions />` handles page-to-page fades natively.

**Tech Stack:** Astro ViewTransitions (built-in), CSS transitions, IntersectionObserver (existing pattern), `transform`/`opacity` only.

---

### Task 1: Add all new CSS to `global.css`

**Files:**
- Modify: `src/styles/global.css`

- [ ] **Step 1: Add view transition animations**

Insert after the existing `@media (prefers-reduced-motion: reduce)` block near the bottom of `global.css`:

```css
/* === View Transitions — page navigation fade === */
::view-transition-old(root) {
  animation: 220ms ease both vt-fade-out;
}
::view-transition-new(root) {
  animation: 280ms ease both vt-fade-in;
}
@keyframes vt-fade-out {
  to { opacity: 0; transform: translateY(-4px); }
}
@keyframes vt-fade-in {
  from { opacity: 0; transform: translateY(4px); }
}
@media (prefers-reduced-motion: reduce) {
  ::view-transition-old(root),
  ::view-transition-new(root) { animation: none; }
}

/* === Reveal variants — directional scroll entrances === */
.reveal,
.reveal-left,
.reveal-right,
.reveal-scale {
  transition: opacity 0.6s ease, transform 0.6s cubic-bezier(0.22, 1, 0.36, 1);
}
.reveal       { opacity: 0; transform: translateY(20px); }
.reveal-left  { opacity: 0; transform: translateX(-28px); }
.reveal-right { opacity: 0; transform: translateX(28px); }
.reveal-scale { opacity: 0; transform: scale(0.96); }

.reveal.visible,
.reveal-left.visible,
.reveal-right.visible,
.reveal-scale.visible {
  opacity: 1;
  transform: none;
}

@media (prefers-reduced-motion: reduce) {
  .reveal, .reveal-left, .reveal-right, .reveal-scale {
    opacity: 1; transform: none; transition: none;
  }
}

/* === Stagger grid — children animate in cascade === */
.stagger-grid > * {
  opacity: 0;
  transform: translateY(16px);
  transition: opacity 0.5s ease, transform 0.5s cubic-bezier(0.22, 1, 0.36, 1);
}
.stagger-grid > *.visible {
  opacity: 1;
  transform: none;
}
@media (prefers-reduced-motion: reduce) {
  .stagger-grid > * { opacity: 1; transform: none; transition: none; }
}
```

- [ ] **Step 2: Commit**

```bash
git add src/styles/global.css
git commit -m "style: add view-transition, reveal variants, and stagger grid CSS"
```

---

### Task 2: Enable View Transitions in BaseLayout.astro

**Files:**
- Modify: `src/layouts/BaseLayout.astro`

- [ ] **Step 1: Import ViewTransitions**

In the frontmatter block at the top of `BaseLayout.astro`, add the import:

```astro
---
import { ViewTransitions } from 'astro:transitions';
// ...existing imports below...
---
```

- [ ] **Step 2: Add `<ViewTransitions />` to `<head>`**

Find the closing `</head>` tag and insert `<ViewTransitions />` just before it:

```astro
  <!-- Cloudflare Web Analytics -->
  <script defer src="..." is:inline></script>

  <ViewTransitions />
</head>
```

- [ ] **Step 3: Verify**

Run `npm run dev`, open http://localhost:4321, navigate from Home → Portfolio → About. You should see a smooth 250ms fade instead of an instant jump. Check in Chrome DevTools that `view-transition` appears in the Animation panel during navigation.

- [ ] **Step 4: Commit**

```bash
git add src/layouts/BaseLayout.astro
git commit -m "feat: add Astro ViewTransitions for smooth page navigation"
```

---

### Task 3: Extend IntersectionObserver in `GlobalEffects.tsx`

**Files:**
- Modify: `src/components/effects/GlobalEffects.tsx`

- [ ] **Step 1: Replace the existing blur-reveal observer**

Find this block in `GlobalEffects.tsx`:

```tsx
// Blur-reveal: scroll-triggered entrance for any .blur-reveal element
useEffect(() => {
  const els = document.querySelectorAll<HTMLElement>('.blur-reveal');
  if (!els.length) return;
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); }
    });
  }, { threshold: 0.15 });
  els.forEach(el => io.observe(el));
  return () => io.disconnect();
}, []);
```

Replace it with:

```tsx
// Reveal observer — watches blur-reveal + all directional variants
useEffect(() => {
  const els = document.querySelectorAll<HTMLElement>(
    '.blur-reveal, .reveal, .reveal-left, .reveal-right, .reveal-scale'
  );
  if (!els.length) return;
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); }
    });
  }, { threshold: 0.12 });
  els.forEach(el => io.observe(el));
  return () => io.disconnect();
}, []);

// Stagger observer — when .stagger-grid enters viewport, cascade children in
useEffect(() => {
  const grids = document.querySelectorAll<HTMLElement>('.stagger-grid');
  if (!grids.length) return;
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const children = [...e.target.children] as HTMLElement[];
      children.forEach((child, i) => {
        setTimeout(() => child.classList.add('visible'), Math.min(i, 7) * 80);
      });
      io.unobserve(e.target);
    });
  }, { threshold: 0.08 });
  grids.forEach(g => io.observe(g));
  return () => io.disconnect();
}, []);
```

- [ ] **Step 2: Verify**

With `npm run dev` running, open the About page. Open DevTools → Elements. Scroll to the Values section. Confirm the `.values-grid` children (once you add the class in Task 5) get `.visible` added one by one as you scroll them into view. The reveal variants will be visible once classes are applied in Tasks 4 and 5.

- [ ] **Step 3: Commit**

```bash
git add src/components/effects/GlobalEffects.tsx
git commit -m "feat: extend IntersectionObserver for reveal variants and stagger grids"
```

---

### Task 4: Apply reveal classes to components and simple pages

**Files:**
- Modify: `src/components/sections/DifferentiatorsSection.astro`
- Modify: `src/components/sections/ContactCTA.astro`
- Modify: `src/pages/services.astro`
- Modify: `src/pages/faq.astro`

#### DifferentiatorsSection.astro

- [ ] **Step 1: Add `reveal-left` to `.diff-intro`**

Find:
```astro
<div class="diff-intro">
```
Replace with:
```astro
<div class="diff-intro reveal-left">
```

#### ContactCTA.astro

- [ ] **Step 2: Change `.cta-content` from `blur-reveal` to `reveal-scale`**

Find:
```astro
<div class="cta-content blur-reveal">
```
Replace with:
```astro
<div class="cta-content reveal-scale">
```

#### services.astro

- [ ] **Step 3: Change service content and CTA reveal classes**

Find (appears once per service, multiple times):
```astro
<div class="service-content blur-reveal">
```
Replace all occurrences with:
```astro
<div class="service-content reveal-left">
```

Find:
```astro
<div class="services-cta glass blur-reveal">
```
Replace with:
```astro
<div class="services-cta glass reveal-scale">
```

#### faq.astro

- [ ] **Step 4: Change FAQ reveal classes**

Find (appears multiple times, once per group):
```astro
<h2 class="faq-group-title blur-reveal">
```
Replace all occurrences with:
```astro
<h2 class="faq-group-title reveal-left">
```

Find:
```astro
<div class="faq-cta glass blur-reveal">
```
Replace with:
```astro
<div class="faq-cta glass reveal-scale">
```

- [ ] **Step 5: Commit**

```bash
git add src/components/sections/DifferentiatorsSection.astro src/components/sections/ContactCTA.astro src/pages/services.astro src/pages/faq.astro
git commit -m "feat: apply directional reveal classes to services, faq, differentiators, cta"
```

---

### Task 5: Apply reveal classes to `about.astro`

**Files:**
- Modify: `src/pages/about.astro`

- [ ] **Step 1: Story section — left aside slides from left, right content slides from right**

Find:
```astro
<aside class="story-left blur-reveal">
```
Replace with:
```astro
<aside class="story-left reveal-left">
```

Find:
```astro
<div class="story-right blur-reveal">
```
Replace with:
```astro
<div class="story-right reveal-right">
```

- [ ] **Step 2: MVV section — header slides from left, cards scale in**

Find:
```astro
<div class="mvv-header blur-reveal">
```
Replace with:
```astro
<div class="mvv-header reveal-left">
```

Find (appears twice, one per mv-card):
```astro
<div class="mv-card glass blur-reveal">
```
Replace both with:
```astro
<div class="mv-card glass reveal-scale">
```

Find:
```astro
<div class="obj-section blur-reveal">
```
Replace with:
```astro
<div class="obj-section reveal-scale">
```

- [ ] **Step 3: Values section header slides from left**

Find:
```astro
<div class="section-header blur-reveal">
```
Replace with:
```astro
<div class="section-header reveal-left">
```

- [ ] **Step 4: Credentials cards scale in**

Find (appears 3 times):
```astro
<div class="cred-card glass blur-reveal">
```
Replace all 3 with:
```astro
<div class="cred-card glass reveal-scale">
```

- [ ] **Step 5: About CTA scales in**

Find:
```astro
<div class="about-cta glass blur-reveal">
```
Replace with:
```astro
<div class="about-cta glass reveal-scale">
```

- [ ] **Step 6: Commit**

```bash
git add src/pages/about.astro
git commit -m "feat: apply directional reveal classes to about page"
```

---

### Task 6: Add `.stagger-grid` to all grid containers

**Files:**
- Modify: `src/pages/portfolio/index.astro`
- Modify: `src/pages/portfolio/[category].astro`
- Modify: `src/pages/about.astro`
- Modify: `src/components/sections/DifferentiatorsSection.astro`

#### portfolio/index.astro

- [ ] **Step 1: Add stagger to category grid**

Find:
```astro
<div class="cat-grid">
```
Replace with:
```astro
<div class="cat-grid stagger-grid">
```

#### portfolio/[category].astro

- [ ] **Step 2: Add stagger to gallery grid**

Find:
```astro
<div class="gallery-grid" id="gallery-grid">
```
Replace with:
```astro
<div class="gallery-grid stagger-grid" id="gallery-grid">
```

#### about.astro

- [ ] **Step 3: Add stagger to values, credentials, and objectives grids**

Find:
```astro
<div class="values-grid">
```
Replace with:
```astro
<div class="values-grid stagger-grid">
```

Find:
```astro
<div class="creds-grid">
```
Replace with:
```astro
<div class="creds-grid stagger-grid">
```

Find:
```astro
<div class="obj-grid">
```
Replace with:
```astro
<div class="obj-grid stagger-grid">
```

#### DifferentiatorsSection.astro

- [ ] **Step 4: Add stagger to diff-list**

Find:
```astro
<div class="diff-list">
```
Replace with:
```astro
<div class="diff-list stagger-grid">
```

**Note:** `DifferentiatorsSection.astro` already has its own IntersectionObserver in a `<script>` tag that adds `.visible` to `.diff-item` elements. Remove that script block entirely since `GlobalEffects.tsx` stagger observer now handles it:

Find and delete this entire block from `DifferentiatorsSection.astro`:
```astro
<script>
  const items = document.querySelectorAll<HTMLElement>('.diff-item');
  const io = new IntersectionObserver(
    entries => entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        io.unobserve(e.target);
      }
    }),
    { threshold: 0.12 }
  );
  items.forEach(el => io.observe(el));
</script>
```

- [ ] **Step 5: Commit**

```bash
git add src/pages/portfolio/index.astro src/pages/portfolio/[category].astro src/pages/about.astro src/components/sections/DifferentiatorsSection.astro
git commit -m "feat: add stagger-grid to portfolio, about, and differentiators grids"
```

---

### Task 7: Final verification and push

- [ ] **Step 1: Run dev server and do a full walkthrough**

```bash
npm run dev
```

Check each of these in the browser:

| Page | What to verify |
|------|---------------|
| Home → About | Smooth fade transition (not instant jump) |
| About | story-left slides from left, story-right from right, value cards stagger in |
| Portfolio index | 15 category cards stagger in on scroll |
| Portfolio category | Gallery images stagger in (first 8 with delay) |
| Services | service-content slides from left |
| FAQ | Group titles slide from left |
| Any page | `.faq-cta`, `.about-cta`, `.obj-section` scale in from 96% |
| Mobile | All animations work, no layout shift |
| Reduced motion | Enable in OS accessibility settings — all animations disabled |

- [ ] **Step 2: Build and check for errors**

```bash
npm run build
```

Expected: build completes with no TypeScript or Astro errors.

- [ ] **Step 3: Push to GitHub (triggers Vercel deploy)**

```bash
git push origin master
```

Expected: Vercel auto-deploys within ~2 minutes.