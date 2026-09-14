# Chromatic Assembly Homepage Design

**Date:** 2026-09-14
**Status:** Approved for implementation planning

## Purpose

Redesign the homepage as a scroll-led story about Ridhwan as a frontend/software developer. It should feel vivid, playful, and personal without resembling a SaaS landing page or an AI-generated portfolio template.

The story introduces Ridhwan conversationally, shows his tools and use of AI, then presents production work as restrained evidence. A colorful signal thread starts loosely, gains direction, and connects the story from introduction to contact.

## Goals

- Create a memorable, Apple-style scroll narrative without hijacking native scrolling.
- Make copy and variable typography the primary visual material.
- Express a restless-maker personality through color, timing, and controlled irregularity.
- Discuss AI honestly: it speeds up work but does not replace understanding or review.
- Keep project claims factual and sourced from existing content.
- Preserve complete content and navigation on mobile, with reduced motion, or if animation fails.

## Non-goals

- Do not make a SaaS or product-marketing landing page.
- Do not invent project screenshots, metrics, clients, testimonials, or technical claims.
- Do not add WebGL, particle systems, intercepted scrolling, fake terminals, card grids, gradient blobs, or ornamental section numbers.
- Do not rewrite blog posts, experience history, or project facts.
- Do not give inner pages the homepage's pinned cinematic sequences.

## Voice and Copy

The opening sounds like a casual introduction, not a manifesto or sales pitch. Copy appears in short fragments, usually one or two thoughts per viewport. It remains understandable in normal document order without animation.

### Opening

```text
Hey, I’m Ridhwan.

I make things
for the web.
```

```text
Usually with
too many tabs open.
```

```text
React. Vue.
TypeScript.

Whatever helps
the product work.
```

### AI interlude

```text
Yes,
I use AI too.

It helps me
move faster.
```

```text
But I still
read the code.
```

```text
No blind
vibe coding.
```

### Transition to work

```text
Anyway,

here are a few things
I’ve worked on.
```

### Projects

Project copy stays quiet and factual. The visual composition supplies the drama.

```text
Sales ERP

Lead tracking to order management.
Used daily by 15–20 sales reps.

React / Next.js / TypeScript
```

```text
Global landing page

English and Indonesian.
Reached users across 90+ countries.

Vue / Nuxt.js / TypeScript
```

```text
Booking platform

Three user roles.
60–80 interface pages delivered.

Next.js / TypeScript
```

### Outro

```text
Anyway,
say hi.
```

The final signal thread becomes the underline of the email link.

## Story Structure

1. **Hello:** conversational introduction with browser-tab fragments drifting at separate depths.
2. **How I work:** React, Vue, and TypeScript appear as practical tools. The signal thread begins organizing the scene.
3. **AI, casually:** suggestions appear, are accepted or rejected, and settle into the approved AI copy.
4. **Selected work:** Sales ERP, global landing page, and booking platform each receive one sticky factual scene.
5. **History and notes:** experience and recent writing pass as a compact production trail.
6. **Contact:** motion resolves, the page becomes quiet, and the thread ends at the email link.

The navbar includes a minimal chapter-progress treatment connected to the signal metaphor. It remains usable navigation, not an animation-only indicator.

## Visual System

### Palette

- **Blackbox:** `#090A0F` for the primary dark surface.
- **Electric cobalt:** `#2547FF` for structure and focus.
- **Heat orange:** `#FF5A1F` for energy and active transitions.
- **Laser pink:** `#FF2D9A` for controlled surprise.
- **Signal lime:** `#C9FF38` for interaction and selection.
- **Cold white:** `#F4F7FF` for primary text on dark surfaces.

Colors appear as solid fields, typography, selection states, and signal-thread segments. Avoid soft multicolor gradients. Chapter states may swap foreground and background roles while maintaining readable contrast.

### Typography

- **Anybody Variable:** display copy. Width and weight move from compressed or unsettled to wider and stable as a scene resolves.
- **Atkinson Hyperlegible Next:** body copy and longer descriptions.
- **Fragment Mono:** metrics, dates, stacks, progress, and metadata.

Large scale is reserved for a few meaningful words. Projects use calmer typography than the introduction. Not every sentence becomes a slogan.

### Signature element

`SignalThread` is one decorative SVG system shared across the homepage. It starts as loose paths, follows scroll progress, changes solid color by chapter, and pulls selected fragments into alignment. During the AI scene, alternate branches represent suggestions; rejected branches disappear while the retained path continues.

The SVG is `aria-hidden="true"` and never carries information absent from the document text.

## Motion Direction

- Use native browser scrolling; never intercept wheel, touch, or keyboard scrolling.
- Use GSAP with ScrollTrigger for pinned timing and coordinated timelines.
- Scope animations to the homepage root with `gsap.context()` and clean them up on unmount.
- Initialize client-side so Nuxt SSR produces complete readable markup before GSAP loads.
- Animate primarily `transform`, `opacity`, and SVG stroke properties.
- Limit simultaneous parallax to background fragments, signal thread, and foreground copy.
- Keep pins finite and purposeful; every pinned chapter must advance content.
- Pointer movement may subtly bend the signal thread, but it must not replace the native cursor or run on touch devices. Any pointer listener attaches to the homepage root and is removed on unmount.

### Reduced motion and fallback

With `prefers-reduced-motion: reduce`, remove pinning, parallax, font-axis interpolation, and scroll-scrubbed transitions. Render a complete vertical narrative with static signal segments.

If GSAP fails or JavaScript is unavailable, SSR markup remains ordered, visible, and navigable. Initial CSS must not hide content while animation initializes.

## Responsive Behavior

Desktop and wide tablets use the full sticky sequence and three motion depths. Project chapters may pair large type with structural visualizations based only on real work details.

Mobile uses a shorter vertical story without long pinned sections. It stacks project facts in source order, preserves every claim and link, and keeps decorative signal fragments away from tap targets.

## Architecture

The homepage route is the data boundary. `app/pages/index.vue` fetches homepage story content, work data, and recent published posts, then passes them into focused components.

```text
app/pages/index.vue
└─ app/components/home/story/HomeStory.vue
   ├─ StoryHero.vue
   ├─ SignalThread.vue
   ├─ AiInterlude.vue
   ├─ ProjectChapter.vue
   ├─ ExperienceTrail.vue
   ├─ WritingTrail.vue
   └─ ContactOutro.vue

app/composables/useScrollStory.ts
└─ GSAP setup, matchMedia branches, and cleanup
```

- `HomeStory` owns scene order and provides one timeline scope.
- `StoryHero` renders the introduction and tool fragments.
- `SignalThread` renders shared SVG paths and stable animation refs.
- `AiInterlude` renders AI-use copy and suggestion branches.
- `ProjectChapter` receives one existing `work.featured` item and never invents claims.
- `ExperienceTrail` and `WritingTrail` retain links to their full routes.
- `ContactOutro` renders configured contact channels and the final thread endpoint.
- `useScrollStory` owns GSAP imports, media-query branches, and lifecycle cleanup.

## Content and Data Flow

Add `content/home.json` and a matching `home` collection to `content.config.ts`. It stores approved narrative copy and stable scene labels. Project evidence continues to come from `content/work.json`; recent posts continue to come from the blog collection.

Homepage draft filtering must continue checking both `post.draft !== true` and `post.meta?.draft !== true`.

The route performs content queries once and passes plain typed data down. Components do not repeat collection queries. Missing optional posts or contact links are omitted without breaking the main story. Restart the development server after adding the collection so Nuxt Content re-indexes its SQLite cache.

## Existing Site Boundaries

- The homepage receives the full cinematic treatment.
- `/articles`, `/experiences`, `/contact`, and `/read/*` adopt the palette and typography but retain their information architecture.
- Navbar, footer, focus styles, semantic tokens, theme metadata, and shared background update consistently.
- Remove replaced homepage components only after repository-wide usage checks show that no other route imports them.
- Leave blog content, work history, SEO route behavior, sitemap behavior, and RSS behavior unchanged unless compile compatibility requires a narrow fix.

## Accessibility and Performance

- Preserve semantic heading order, landmarks, keyboard access, and visible focus.
- Do not put animated copy in an `aria-live` region.
- Maintain sufficient contrast in every solid-color chapter state.
- Hide decorative fragments and the signal SVG from assistive technology.
- Ensure DOM order matches story order; do not encode meaning through color or motion alone.
- Add GSAP as the only new runtime animation dependency.
- Do not add WebGL, smooth-scroll libraries, canvas particles, or a second animation framework.
- Avoid unbounded animation loops and global pointer listeners; use `will-change` only while needed.
- Keep decorative DOM counts small and provide usable font fallbacks.

## Validation

There is no test or lint script. Completion requires:

1. Run `bun run build` and resolve errors attributable to the change.
2. Run `git diff --check` and inspect the changed-file scope.
3. Review the homepage near 1440×900 and 390×844.
4. Review keyboard navigation and the reduced-motion version.
5. Visit `/articles`, `/experiences`, and one `/read/*` route to confirm shared styling remains readable and functional.

Build artifacts in `.nuxt/`, `.data/`, `.output/`, and `node_modules/` remain unedited and uncommitted.

## Implementation Sequence

1. **Foundation:** add GSAP, fonts, semantic tokens, homepage schema/content, and the static story structure.
2. **Story:** build the hero, AI interlude, signal thread, and word-by-word typography choreography.
3. **Work:** build factual project chapters, experience/writing trails, and contact outro.
4. **Polish:** add desktop/mobile motion branches, reduced motion, cleanup, and shared-shell styling.
5. **Verify:** run the approved build plus static, responsive, keyboard, reduced-motion, and inner-route checks.

## Completion Criteria

The homepage reads as a coherent casual-to-professional story. The signal thread visibly connects every chapter. Projects remain factual. Motion enhances rather than blocks reading. Mobile and reduced-motion modes are complete alternatives. All validation steps pass without unrelated files entering the change set.
