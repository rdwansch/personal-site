# Personal Site

Minimal portfolio built with Nuxt 3, Tailwind CSS, and Nuxt Content.

## Setup

Install dependencies:

```bash
bun install
```

Copy the environment file and fill in your values:

```bash
cp .env.example .env
```

| Variable | Description |
|---|---|
| `NUXT_PUBLIC_FULL_NAME` | Your full name (shown in hero) |
| `NUXT_PUBLIC_EMAIL` | Contact email address |
| `NUXT_PUBLIC_LINKEDIN` | Full LinkedIn profile URL |
| `NUXT_PUBLIC_GITHUB` | Full GitHub profile URL |

## Development

```bash
bun run dev
```

## Content

Site data lives in `content/` as JSON files — edit these instead of touching components:

| File | What it controls |
|---|---|
| `content/about.json` | Bio paragraphs and skill groups |
| `content/work.json` | Work experience entries |
| `content/projects.json` | Project cards |
| `content/education.json` | Education history |

Blog posts live in `content/blog/` as Markdown files.

## Production

```bash
bun run build
bun run preview
```

---

## Commit Message Convention

This project follows [Conventional Commits](https://www.conventionalcommits.org/).

### Format

```
<type>(<scope>): <subject>
```

- **type** — what kind of change (required)
- **scope** — what area it touches (optional, lowercase)
- **subject** — short description in imperative mood, no period at the end

### Types

| Type | Use for |
|---|---|
| `feat` | New feature or visible content addition |
| `fix` | Bug fix |
| `style` | Visual/CSS changes with no logic change |
| `refactor` | Code restructure without behavior change |
| `content` | Updating JSON/Markdown content data |
| `chore` | Tooling, config, dependencies |
| `docs` | README or documentation only |

### Examples

```
feat(hero): add scroll-based parallax animation
fix(contact): correct LinkedIn URL
style(about): tighten skill tag spacing
content(projects): add Circle project entry
chore: bump nuxt to 3.13
docs: add commit convention to README
```

### Rules

- Subject line ≤ 72 characters
- Use imperative mood — "add" not "added" or "adds"
- No capital letter at the start of the subject
- No period at the end
