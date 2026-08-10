# AGENTS.md

Personal portfolio/blog: Nuxt 4 + Nuxt Content v3 + Tailwind CSS 3, TypeScript everywhere.

## Commands

- Install / run: `bun install`, `bun run dev`, `bun run build`, `bun run generate`, `bun run preview`
- No test suite and no lint script — verify changes with `bun run build`
- `postinstall` runs `nuxt prepare` (regenerates `.nuxt/` types). After content/schema changes, restart `dev` so the SQLite cache in `.data/` re-indexes.
- `.nuxt/`, `.data/`, `.output/`, `node_modules/` are gitignored build artifacts — never edit them.

## Content (edit these, not components)

- `content/about.json`, `work.json`, `projects.json`, `education.json` are the site data; `content/blog/*.md` are posts.
- Every collection is schema-validated by Zod in `content.config.ts` — adding a JSON/Markdown field requires updating that schema or content fails to load.
- Blog post URLs are `/read/[slug]`, backed by content path `/blog/[slug]` (`app/pages/read/[slug].vue`).
- Drafts: set `draft: true` in frontmatter. Filtering must check both `p.draft !== true && p.meta?.draft !== true` (see `app/components/BlogSection.vue`, `app/pages/articles.vue`, `server/routes/sitemap.xml.ts`, `server/routes/rss.xml.ts`).

## Env config

- `NUXT_PUBLIC_SITE_URL` (absolute, no trailing slash) is required — drives canonical, OG, sitemap, RSS. Defaults to the Vercel URL in `nuxt.config.ts`.
- Runtime config is read via `useRuntimeConfig().public.*` (`cfg.*` in components).

## Frontend conventions

- Theme colors are semantic Tailwind classes mapped to CSS vars in `tailwind.config.ts` + `app/assets/css/main.css`: `surface`, `raised`, `fg`, `fg-secondary`, `fg-tertiary`, `accent`, `teal`, `border`. Never hardcode raw hex.
- Dark mode is class-based — use `dark:` variants and `bg-surface`/`text-fg` primitives.
- Per-page SEO uses the `useSeo()` composable (`app/composables/useSeo.ts`); site-wide defaults + JSON-LD live in `app/app.vue`. Drafts must be `noindex`.
- `absoluteUrl()` is the only way to build absolute URLs.

## Git

- Conventional Commits: `type(scope): subject`, subject in imperative mood, ≤72 chars, lowercase, no trailing period. Types: `feat`, `fix`, `style`, `refactor`, `content` (JSON/Markdown), `chore`, `docs`.
- No remote is configured (git push requires manual setup).

## SEO

- `sitemap.xml`/`rss.xml` are server routes generated at runtime from the blog collection — keep their draft/exclusion logic consistent with the UI.
- `scripts/generate-og.mjs` regenerates `og.png` and app icons; it needs `@resvg/resvg-js` installed temporarily (see README) — it is a one-off, not part of the build.
- `/read` is a noindex mirror of `/articles`; new indexable pages must be added to `STATIC_ROUTES` in `server/routes/sitemap.xml.ts`.

## Note

- Dont build unless user asks.
