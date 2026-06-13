// Generates the social share image + app icons from inline SVG.
// One-off / regenerate utility — requires @resvg/resvg-js:
//   bun add -d @resvg/resvg-js && node scripts/generate-og.mjs
import { Resvg } from '@resvg/resvg-js'
import { writeFileSync, mkdirSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const PUBLIC = resolve(__dirname, '../public')
mkdirSync(PUBLIC, { recursive: true })

const SANS = "'Helvetica Neue', Helvetica, Arial, sans-serif"

const ogSvg = `<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="violet" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#6B5CA5" stop-opacity="0.20"/>
      <stop offset="100%" stop-color="#6B5CA5" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="teal" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#4DA8A0" stop-opacity="0.18"/>
      <stop offset="100%" stop-color="#4DA8A0" stop-opacity="0"/>
    </radialGradient>
  </defs>

  <rect width="1200" height="630" fill="#F7F8FB"/>
  <circle cx="1030" cy="150" r="280" fill="url(#violet)"/>
  <circle cx="1110" cy="560" r="220" fill="url(#teal)"/>
  <rect x="32" y="32" width="1136" height="566" fill="none" stroke="#E2E8F0" stroke-width="2"/>

  <rect x="96" y="148" width="54" height="5" fill="#6B5CA5"/>
  <text x="96" y="205" font-family="${SANS}" font-size="26" font-weight="600" letter-spacing="6" fill="#6B5CA5">SOFTWARE DEVELOPER</text>

  <text x="92" y="328" font-family="${SANS}" font-size="92" font-weight="800" fill="#1E2229">Ridhwan R Siddiq</text>

  <text x="96" y="404" font-family="${SANS}" font-size="30" font-weight="400" fill="#64748B">Fast, focused web interfaces — built to last.</text>

  <text x="96" y="476" font-family="${SANS}" font-size="26" font-weight="500" fill="#94A3B8">React · Next.js · Vue · Nuxt · TypeScript</text>

  <text x="96" y="558" font-family="${SANS}" font-size="24" font-weight="600" fill="#6B5CA5">personal-site.vercel.app</text>
</svg>`

const iconSvg = `<svg width="512" height="512" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#6B5CA5"/>
      <stop offset="100%" stop-color="#4DA8A0"/>
    </linearGradient>
  </defs>
  <rect width="512" height="512" fill="url(#g)"/>
  <text x="256" y="256" font-family="${SANS}" font-size="200" font-weight="800" fill="#FFFFFF" text-anchor="middle" dominant-baseline="central" letter-spacing="2">RRS</text>
</svg>`

function render(svg, width) {
  const resvg = new Resvg(svg, {
    fitTo: { mode: 'width', value: width },
    font: { loadSystemFonts: true },
  })
  return resvg.render().asPng()
}

writeFileSync(resolve(PUBLIC, 'og.png'), render(ogSvg, 1200))
writeFileSync(resolve(PUBLIC, 'icon-512.png'), render(iconSvg, 512))
writeFileSync(resolve(PUBLIC, 'icon-192.png'), render(iconSvg, 192))
writeFileSync(resolve(PUBLIC, 'icon-180.png'), render(iconSvg, 180))

console.log('✓ Generated og.png + icons in public/')
