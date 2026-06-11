---
title: Five Tailwind CSS Patterns I Use Every Day
date: 2026-05-18
description: After two years of daily Tailwind use, these are the patterns that have stuck — from responsive modifiers to composing complex hover states.
tags: [Tailwind, CSS, Frontend]
---

Tailwind can feel verbose at first, but after a while you start seeing patterns emerge. Here are five that I reach for constantly.

**1. Group hover for child effects** — `group` on the parent and `group-hover:` on the child makes card interactions effortless.

**2. Arbitrary values for one-offs** — `w-[342px]` or `top-[3px]` beats creating a custom config entry for a single use.

**3. `@apply` sparingly** — useful for repeated utility combinations in component styles, but don't overuse it or you lose the benefit.

**4. `clamp()` via arbitrary values** — `text-[clamp(1.5rem,4vw,3rem)]` gives you fluid typography without a plugin.

**5. CSS variable tokens in config** — extend the theme with CSS variables so you can update values at runtime (dark mode, theming) without regenerating CSS.
