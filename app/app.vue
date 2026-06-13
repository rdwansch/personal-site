<script setup lang="ts">
const { public: cfg } = useRuntimeConfig()
const siteName = cfg.siteName as string
const siteUrl = (cfg.siteUrl as string).replace(/\/$/, '')

// Site-wide head defaults. Per-page tags (title, description, canonical, OG)
// are layered on top via the useSeo() composable.
useHead({
  titleTemplate: (title) => (title ? `${title} — ${siteName}` : `${siteName} — Software Developer`),
  meta: [
    { name: 'author', content: siteName },
    { name: 'robots', content: 'index, follow, max-image-preview:large' },
    { name: 'theme-color', content: '#F7F8FB', media: '(prefers-color-scheme: light)' },
    { name: 'theme-color', content: '#0F1117', media: '(prefers-color-scheme: dark)' },
  ],
})

useSeoMeta({
  ogSiteName: siteName,
  ogLocale: 'en_US',
  twitterCard: 'summary_large_image',
})

// Site-wide structured data: who runs the site + the site itself.
useHead({
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Person',
        name: cfg.fullName || siteName,
        alternateName: siteName,
        url: siteUrl,
        image: `${siteUrl}/og.png`,
        jobTitle: 'Software Developer',
        email: cfg.email ? `mailto:${cfg.email}` : undefined,
        sameAs: [cfg.github, cfg.linkedin].filter(Boolean),
        knowsAbout: ['React', 'Next.js', 'Vue', 'Nuxt.js', 'TypeScript', 'Web Development'],
      }),
    },
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: siteName,
        url: siteUrl,
        inLanguage: 'en',
      }),
    },
  ],
})
</script>

<template>
  <div>
    <CursorEffect />
    <NuxtRouteAnnouncer />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
