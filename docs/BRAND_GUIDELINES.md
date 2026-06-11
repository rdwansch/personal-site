# Personal Site Brand Guidelines
**Ridhwan R Siddiq** — Web / Frontend Developer  
A minimal, gallery-inspired design system with cool tones, soft accents, and expressive micro-interactions.

---

## Color Palette

### Primary Colors

**Primary Surface: Cool Off-White**
- Name: Cool Base
- OKLCH: `oklch(97% 0.01 240)`
- Hex: `#F7F8FB`
- Tailwind: `bg-slate-50` (closest match; use CSS variable for precision)
- Usage: Main background, panels, cards
- Notes: Slightly cool undertone. Not pure white. Reduces harshness.

**Primary Dark: Cool Charcoal**
- Name: Slate Dark
- OKLCH: `oklch(22% 0.02 240)`
- Hex: `#1E2229`
- Tailwind: `text-slate-900`
- Usage: Headlines, primary text, borders
- Notes: Deep cool-leaning dark. Not pure black.

---

### Accent Colors

**Primary Accent: Soft Purple**
- Name: Violet
- OKLCH: `oklch(62% 0.14 290)`
- Hex: `#7C6FAF`
- Tailwind: `text-violet-500` / `bg-violet-500` (closest)
- Usage: Links, CTA buttons, highlights, active states, accent shapes
- Notes: Muted, not neon. Sophisticated presence.

**Secondary Accent: Soft Teal**
- Name: Teal
- OKLCH: `oklch(68% 0.10 195)`
- Hex: `#4DA8A0`
- Tailwind: `text-teal-500` / `bg-teal-500` (closest)
- Usage: Secondary highlights, hover states, decorative elements
- Notes: Complements Violet. Cool, calm, non-aggressive.

---

### Semantic Colors

**Text Primary**
- Hex: `#1E2229`
- Tailwind: `text-slate-900`

**Text Secondary**
- Hex: `#64748B`
- Tailwind: `text-slate-500`
- For meta-info, captions, timestamps

**Text Tertiary**
- Hex: `#94A3B8`
- Tailwind: `text-slate-400`
- For disabled states, subtle labels

**Borders & Dividers**
- Hex: `#E2E8F0`
- Tailwind: `border-slate-200`
- Subtle separation without harshness

**Hover / Active Overlay**
- Violet at 12% opacity: `rgba(124, 111, 175, 0.12)`
- Teal at 10% opacity: `rgba(77, 168, 160, 0.10)`

---

## Tailwind CSS Configuration

### `tailwind.config.ts`

```ts
import type { Config } from 'tailwindcss'

export default {
  content: [
    './components/**/*.{vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './app.vue',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          base: '#F7F8FB',
          dark: '#1E2229',
          violet: '#7C6FAF',
          teal: '#4DA8A0',
          'text-primary': '#1E2229',
          'text-secondary': '#64748B',
          'text-tertiary': '#94A3B8',
          border: '#E2E8F0',
        },
      },
      fontFamily: {
        display: ['Georgia', 'Garamond', 'serif'],
        body: ['Segoe UI', 'Helvetica Neue', 'sans-serif'],
      },
      spacing: {
        '18': '4.5rem',   // 72px
        '22': '5.5rem',   // 88px
      },
      animation: {
        'fade-up': 'fadeUp 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) forwards',
        'fade-in': 'fadeIn 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'stagger': 'fadeUp 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) forwards',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      transitionTimingFunction: {
        'out-back': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
        'out-quart': 'cubic-bezier(0.4, 0, 0.2, 1)',
        'out-expo': 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
  },
} satisfies Config
```

### CSS Root Variables

Paste ke `assets/css/main.css`:

```css
:root {
  /* Colors */
  --color-base: #F7F8FB;
  --color-dark: #1E2229;
  --color-violet: #7C6FAF;
  --color-teal: #4DA8A0;
  --color-text-primary: #1E2229;
  --color-text-secondary: #64748B;
  --color-text-tertiary: #94A3B8;
  --color-border: #E2E8F0;

  /* Hover overlays */
  --overlay-violet: rgba(124, 111, 175, 0.12);
  --overlay-teal: rgba(77, 168, 160, 0.10);

  /* Typography */
  --font-display: 'Georgia', 'Garamond', serif;
  --font-body: 'Segoe UI', 'Helvetica Neue', sans-serif;

  /* Spacing */
  --space-xs: 4px;
  --space-sm: 8px;
  --space-md: 16px;
  --space-lg: 24px;
  --space-xl: 32px;
  --space-2xl: 48px;
  --space-3xl: 64px;
  --space-4xl: 96px;

  /* Timing & Easing */
  --duration-fast: 0.3s;
  --duration-normal: 0.6s;
  --duration-slow: 0.8s;
  --ease-out-back: cubic-bezier(0.34, 1.56, 0.64, 1);
  --ease-out-quart: cubic-bezier(0.4, 0, 0.2, 1);
  --ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1);
}
```

---

## Typography System

### Font Stack

**Headings & Display**
```css
font-family: 'Georgia', 'Garamond', serif; /* var(--font-display) */
font-weight: 700;
letter-spacing: -0.02em;
```
Tailwind: `font-display font-bold tracking-tight`

**Body & UI Text**
```css
font-family: 'Segoe UI', 'Helvetica Neue', sans-serif; /* var(--font-body) */
font-weight: 400–500;
line-height: 1.6;
```
Tailwind: `font-body font-normal leading-relaxed`

**Labels & Navigation**
```css
font-weight: 600;
letter-spacing: 0.04em;
text-transform: uppercase;
font-size: 0.75rem–0.875rem;
```
Tailwind: `font-semibold tracking-widest uppercase text-xs`

---

### Type Scale

| Role | Mobile | Desktop | Tailwind (desktop) |
|------|--------|---------|-------------------|
| **H1** Hero Title | 36px | 56px | `text-5xl lg:text-6xl` |
| **H2** Section Title | 28px | 40px | `text-3xl lg:text-4xl` |
| **H3** Subsection | 22px | 32px | `text-2xl lg:text-3xl` |
| **H4** Card Title | 18px | 24px | `text-lg lg:text-2xl` |
| **Body** Main text | 16px | 18px | `text-base lg:text-lg` |
| **Body Small** Meta | 14px | 16px | `text-sm lg:text-base` |
| **Label** Button/Nav | 13px | 14px | `text-xs lg:text-sm` |
| **Caption** | 12px | 13px | `text-xs` |

---

## Layout & Spacing

### Page Structure
```
Navbar (sticky)         | h-16 (64px)
Hero Section            | min-h-[70vh]
Projects Section        | py-24 lg:py-32
About Section           | py-24 lg:py-32
Blog Section            | py-24 lg:py-32
Contact + Footer        | py-16 lg:py-24
```

**Tailwind Classes for Sections:**
```html
<section class="py-24 lg:py-32 px-6 lg:px-12 max-w-6xl mx-auto">
```

**Grid System:**
```html
<!-- Projects grid -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
```

---

## Micro-interactions & Motion

### Standard Easing

| Use | Duration | Easing | Tailwind |
|-----|----------|--------|---------|
| Entrance (scroll) | 0.8s | `ease-out-back` | `duration-700` |
| Hover/Interactive | 0.3s | `ease-out-quart` | `duration-300` |
| Page transition | 0.6s | `ease-out-expo` | `duration-500` |
| Stagger delay | +100ms per item | — | `delay-[100ms]` |

### Stagger Animation (Intersection Observer)

```js
// In composable: useStaggerReveal.ts
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('animate-fade-up')
        entry.target.classList.remove('opacity-0')
      }, i * 100)
    }
  })
}, { threshold: 0.1 })
```

Usage on cards:
```html
<div class="opacity-0" ref="cardRef">...</div>
```

### Component Motion

**Links**
```html
<a class="relative after:absolute after:bottom-0 after:left-0 after:h-px 
          after:w-0 after:bg-brand-violet after:transition-all 
          after:duration-300 hover:after:w-full">
  Link text
</a>
```

**Buttons (Primary)**
```html
<button class="bg-brand-violet text-white px-8 py-3 font-semibold 
               tracking-widest uppercase text-xs transition-all 
               duration-300 hover:-translate-y-0.5 
               hover:shadow-lg hover:shadow-violet-200/50">
  Button
</button>
```

**Cards**
```html
<div class="border border-brand-border bg-brand-base p-6 
            transition-shadow duration-300 
            hover:shadow-md hover:shadow-slate-200">
```

---

## Component Patterns

### Hero Section
```html
<section class="min-h-[70vh] flex flex-col justify-center 
                px-6 lg:px-12 max-w-6xl mx-auto bg-brand-base">
  <!-- Accent shape (animated SVG or CSS element) -->
  <div class="absolute top-24 right-12 w-32 h-32 rounded-full 
              bg-brand-teal/10 animate-pulse"></div>

  <!-- Staggered text reveal -->
  <p class="text-xs font-semibold tracking-widest uppercase 
            text-brand-violet opacity-0 animate-fade-in">
    Frontend Developer
  </p>
  <h1 class="text-5xl lg:text-6xl font-display font-bold 
             text-brand-dark leading-tight tracking-tight mt-4 
             opacity-0 animate-fade-up [animation-delay:100ms]">
    Ridhwan R Siddiq
  </h1>
  <p class="text-lg text-brand-text-secondary max-w-xl mt-6 leading-relaxed 
            opacity-0 animate-fade-up [animation-delay:200ms]">
    Brief intro text here.
  </p>
  <div class="mt-8 opacity-0 animate-fade-up [animation-delay:300ms]">
    <a href="#projects"><!-- CTA button --></a>
  </div>
</section>
```

### Project Card
```html
<article class="border border-brand-border bg-brand-base p-6 
                transition-shadow duration-300 ease-out-quart
                hover:shadow-md hover:shadow-slate-200 opacity-0">
  <!-- Image -->
  <div class="aspect-video bg-slate-100 mb-4 overflow-hidden">
    <img class="w-full h-full object-cover" />
  </div>
  <!-- Tags -->
  <div class="flex gap-2 mb-3">
    <span class="text-xs font-semibold tracking-widest uppercase 
                 text-brand-violet">Vue</span>
  </div>
  <!-- Title -->
  <h4 class="text-lg font-display font-bold text-brand-dark mb-2">
    Project Title
  </h4>
  <!-- Description -->
  <p class="text-sm text-brand-text-secondary leading-relaxed">
    Description text.
  </p>
</article>
```

### Navbar
```html
<nav class="sticky top-0 z-50 h-16 flex items-center justify-between 
            px-6 lg:px-12 bg-brand-base/90 backdrop-blur-sm 
            border-b border-brand-border">
  <span class="font-display font-bold text-brand-dark">RRS</span>
  <ul class="hidden md:flex gap-8">
    <li>
      <a class="text-xs font-semibold tracking-widest uppercase 
                text-brand-text-secondary hover:text-brand-violet 
                transition-colors duration-300">
        Work
      </a>
    </li>
  </ul>
</nav>
```

---

## Responsive Breakpoints

```css
/* Mobile: default (< 768px) */
/* Tablet: md (768px+) */
/* Desktop: lg (1024px+) */
/* Large: xl (1440px+) */
```

Tailwind prefixes: `md:` `lg:` `xl:`

---

## What NOT to Use

- ❌ Warm tones (amber, cream, beige, terracotta)
- ❌ Neon colors (bright cyan, electric purple, hot pink)
- ❌ Brutalist elements (thick borders, raw typography)
- ❌ Gradient backgrounds (keep it flat and clean)
- ❌ More than 2 accent colors on one page

---

## Summary

| Aspect | Value |
|--------|-------|
| **Background** | Cool off-white `#F7F8FB` / `bg-slate-50` |
| **Text** | Slate dark `#1E2229` / `text-slate-900` |
| **Accent 1** | Soft violet `#7C6FAF` / `text-violet-500` |
| **Accent 2** | Soft teal `#4DA8A0` / `text-teal-500` |
| **Headings** | Georgia serif, bold, tight tracking |
| **Body** | Segoe UI sans, normal, 1.6 line-height |
| **Spacing** | Generous: `py-24 lg:py-32` between sections |
| **Motion** | Entrance: 0.8s ease-out-back; Hover: 0.3s ease-out-quart |
| **Grid** | `grid-cols-1 md:grid-cols-2 lg:grid-cols-3` |
| **Aesthetic** | Minimal, cool, gallery-like, intentional |

---

**Version:** 1.1 (revised from warm to cool tones)
**Original:** June 2026 — Claude Design
**Revised:** June 11, 2026 — aligned with brief
**Purpose:** AI-ready brand guidelines for personal site development