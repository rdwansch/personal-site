import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { runInNewContext } from 'node:vm'
import { z } from '@nuxt/content'

// Evaluate the actual schemas without starting Nuxt or generating its artifacts.
// Collection wrappers are identities here; validation remains the real Zod schema.
const configSource = readFileSync(new URL('../content.config.ts', import.meta.url), 'utf8')
  .replace(/^import .* from '@nuxt\/content'\s*$/m, '')
  .replace('export default', 'result =')
const scope = { z, defineContentConfig: value => value, defineCollection: value => value, result: null }
runInNewContext(configSource, scope)
const { collections } = scope.result
const home = JSON.parse(readFileSync(new URL('../content/home.json', import.meta.url)))
const work = JSON.parse(readFileSync(new URL('../content/work.json', import.meta.url)))
assert.ok(collections.home.schema.safeParse(home).success, 'Homepage must match its collection schema')
assert.ok(collections.work.schema.safeParse(work).success, 'Work evidence must match its collection schema')
assert.equal(collections.home.schema.safeParse({ ...home, unexpected: true }).success, false)
assert.equal(collections.home.schema.safeParse({ ...home, hero: { ...home.hero, headline: [] } }).success, false)
assert.deepEqual(home.work.chapters.map(chapter => chapter.id), ['erp', 'global', 'booking'])
for (const chapter of home.work.chapters) {
  assert.ok(work.featured.find(item => item.id === chapter.id), `Missing project evidence: ${chapter.id}`)
}
console.log('Homepage schema, malformed-content rejection, and project references passed.')
