# CONTEXT — Personal Site Rebuild

## Locked Decisions

### Design
- **Aesthetic:** Minimalist + cool tones (slate, cool gray, soft violet/teal)
- **Background:** Cool off-white `#F7F8FB` (`bg-slate-50`)
- **Text:** Slate dark `#1E2229` (`text-slate-900`)
- **Accent 1:** Soft violet `#7C6FAF` (`text-violet-500`) — links, CTA, active states
- **Accent 2:** Soft teal `#4DA8A0` (`text-teal-500`) — hover, decorative
- **Hero:** Staggered text reveal + animated accent shape (CSS/SVG)
- **Projects:** Grid layout (`grid-cols-1 md:grid-cols-2 lg:grid-cols-3`) + stagger fade-up on scroll
- **Typography:** Georgia serif for headings, Segoe UI for body
- **Motion:** Entrance 0.8s `ease-out-back`; Hover 0.3s `ease-out-quart`
- **Package Manager:** Bun

### What is NOT allowed (v1)
- ❌ Warm tones (amber, cream, beige)
- ❌ Neon or bright colors
- ❌ Complex animations beyond stagger fade-up
- ❌ Scope creep

### Stack
- **Framework:** Nuxt 3
- **Content:** Nuxt Content (Markdown)
- **Styling:** Tailwind CSS
- **Deployment:** Vercel

### Scope (v1)
- [ ] Hero section
- [ ] Projects grid
- [ ] About section (story + skills)
- [ ] Blog (Nuxt Content + Markdown)
- [ ] Contact (email link + social) + Navbar + Footer

### Priority Rule
**Done on time (June 12) > Perfect design**

---

## Current Status
- Phase: Setup — Milestone 1.1 in progress
- Last milestone completed: none
- Next milestone: 1.1 — Project setup + Tailwind config + folder structure

## Active Blockers
- none

---

## Reference Files
- `BRAND_GUIDELINES.md` — Full design system + Tailwind config + component patterns
- `CHECKPOINT.md` — Milestone tracking + evidence log
- `EXECUTION_PLAN.md` — Daily schedule + check-in formats

---

**Version:** 1.1
**Updated:** June 11, 2026
**Change:** Design direction revised from warm tones → cool tones (slate, violet, teal)