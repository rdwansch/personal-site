import type { useHead } from '#imports'

type JsonLd = Record<string, any>

interface SeoOptions {
  /** Page <title> (gets " — Site Name" appended via the global template). */
  title?: string
  /** Meta description — keep it ~150–160 chars, action-oriented. */
  description?: string
  /** Route path to canonicalize. Defaults to the current route path. */
  path?: string
  /** Absolute or root-relative social image. Defaults to the site OG image. */
  image?: string
  /** Open Graph type. */
  type?: 'website' | 'article' | 'profile'
  /** ISO date for articles. */
  publishedTime?: string
  modifiedTime?: string
  /** Article tags / keywords. */
  tags?: string[]
  /** Set true to keep a page out of search indexes. */
  noindex?: boolean
  /** Extra JSON-LD blocks to inject. */
  jsonLd?: JsonLd | JsonLd[]
}

/** Join the site origin with a root-relative path into an absolute URL. */
export function absoluteUrl(path = '/') {
  const base = (useRuntimeConfig().public.siteUrl as string).replace(/\/$/, '')
  if (/^https?:\/\//.test(path)) return path
  return base + (path.startsWith('/') ? path : `/${path}`)
}

/**
 * Centralised, per-page SEO: title, description, canonical, Open Graph,
 * Twitter Card and optional JSON-LD. Global, site-wide tags live in app.vue.
 */
export function useSeo(options: SeoOptions = {}) {
  const route = useRoute()
  const { public: cfg } = useRuntimeConfig()

  const path = options.path ?? route.path
  const url = absoluteUrl(path)
  const description = options.description ?? (cfg.siteDescription as string)
  const image = absoluteUrl(options.image ?? '/og.png')
  const type = options.type ?? 'website'

  useSeoMeta({
    title: options.title,
    description,
    ogType: type,
    ogTitle: options.title ?? (cfg.siteName as string),
    ogDescription: description,
    ogUrl: url,
    ogImage: image,
    ogImageAlt: options.title ?? (cfg.siteName as string),
    twitterTitle: options.title ?? (cfg.siteName as string),
    twitterDescription: description,
    twitterImage: image,
    ...(type === 'article'
      ? {
          articlePublishedTime: options.publishedTime,
          articleModifiedTime: options.modifiedTime ?? options.publishedTime,
          articleTag: options.tags,
        }
      : {}),
    ...(options.noindex ? { robots: 'noindex, follow' } : {}),
  })

  const head: Parameters<typeof useHead>[0] = {
    link: [{ rel: 'canonical', href: url }],
  }

  if (options.jsonLd) {
    const blocks = Array.isArray(options.jsonLd) ? options.jsonLd : [options.jsonLd]
    head.script = blocks.map((block) => ({
      type: 'application/ld+json',
      innerHTML: JSON.stringify(block),
    }))
  }

  useHead(head)
}
