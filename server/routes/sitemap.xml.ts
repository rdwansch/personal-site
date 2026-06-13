import { queryCollection } from '@nuxt/content/server'

// Static, indexable routes. (/read is a noindex mirror of /articles, so it's excluded.)
const STATIC_ROUTES: { path: string; priority: string; changefreq: string }[] = [
  { path: '/', priority: '1.0', changefreq: 'monthly' },
  { path: '/experiences', priority: '0.8', changefreq: 'monthly' },
  { path: '/articles', priority: '0.9', changefreq: 'weekly' },
  { path: '/contact', priority: '0.6', changefreq: 'yearly' },
]

function xmlEscape(value: string) {
  return value.replace(/[<>&'"]/g, (c) =>
    ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', "'": '&apos;', '"': '&quot;' })[c]!,
  )
}

export default defineEventHandler(async (event) => {
  const base = (useRuntimeConfig(event).public.siteUrl as string).replace(/\/$/, '')
  const today = new Date().toISOString().slice(0, 10)

  const posts = await queryCollection(event, 'blog').order('date', 'DESC').all()
  const published = posts.filter((p: any) => p.draft !== true && p.meta?.draft !== true)

  const urls: string[] = []

  for (const route of STATIC_ROUTES) {
    urls.push(
      `  <url>\n    <loc>${base}${route.path}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>${route.changefreq}</changefreq>\n    <priority>${route.priority}</priority>\n  </url>`,
    )
  }

  for (const post of published) {
    const slug = post.path.split('/').pop()
    const lastmod = post.date ? new Date(post.date).toISOString().slice(0, 10) : today
    urls.push(
      `  <url>\n    <loc>${xmlEscape(`${base}/read/${slug}`)}</loc>\n    <lastmod>${lastmod}</lastmod>\n    <changefreq>yearly</changefreq>\n    <priority>0.7</priority>\n  </url>`,
    )
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join('\n')}\n</urlset>\n`

  setHeader(event, 'content-type', 'application/xml; charset=utf-8')
  return xml
})
