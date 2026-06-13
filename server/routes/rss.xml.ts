import { queryCollection } from '@nuxt/content/server'

function xmlEscape(value: string) {
  return value.replace(/[<>&'"]/g, (c) =>
    ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', "'": '&apos;', '"': '&quot;' })[c]!,
  )
}

export default defineEventHandler(async (event) => {
  const cfg = useRuntimeConfig(event).public
  const base = (cfg.siteUrl as string).replace(/\/$/, '')
  const siteName = cfg.siteName as string
  const author = (cfg.email as string)
    ? `${cfg.email} (${cfg.fullName || siteName})`
    : (cfg.fullName as string) || siteName

  const posts = await queryCollection(event, 'blog').order('date', 'DESC').all()
  const published = posts.filter((p: any) => p.draft !== true && p.meta?.draft !== true)

  const items = published
    .map((post: any) => {
      const slug = post.path.split('/').pop()
      const link = `${base}/read/${slug}`
      const pubDate = post.date ? new Date(post.date).toUTCString() : new Date().toUTCString()
      const categories = (post.tags ?? [])
        .map((t: string) => `      <category>${xmlEscape(t)}</category>`)
        .join('\n')
      return `    <item>
      <title>${xmlEscape(post.title)}</title>
      <link>${link}</link>
      <guid isPermaLink="true">${link}</guid>
      <description>${xmlEscape(post.description ?? '')}</description>
      <pubDate>${pubDate}</pubDate>
      <author>${xmlEscape(author)}</author>
${categories}
    </item>`
    })
    .join('\n')

  const lastBuild = published[0]?.date
    ? new Date(published[0].date).toUTCString()
    : new Date().toUTCString()

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${xmlEscape(siteName)} — Articles</title>
    <link>${base}/articles</link>
    <description>${xmlEscape(cfg.siteDescription as string)}</description>
    <language>en</language>
    <lastBuildDate>${lastBuild}</lastBuildDate>
    <atom:link href="${base}/rss.xml" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>
`

  setHeader(event, 'content-type', 'application/rss+xml; charset=utf-8')
  return xml
})
