<script setup lang="ts">
const { public: cfg } = useRuntimeConfig()

const { data: posts } = await useAsyncData('articles-seo', () =>
  queryCollection('blog').order('date', 'DESC').all()
)

const published = computed(() =>
  (posts.value ?? []).filter((p: any) => p.draft !== true && p.meta?.draft !== true)
)

useSeo({
  title: 'Articles',
  description:
    'Articles by Ridhwan R Siddiq on web development — React, Next.js, Vue, Nuxt, JavaScript architecture and the craft of building for the web.',
  jsonLd: {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: `Articles — ${cfg.siteName}`,
    url: absoluteUrl('/articles'),
    inLanguage: 'en',
    blogPost: published.value.map((p: any) => ({
      '@type': 'BlogPosting',
      headline: p.title,
      description: p.description,
      datePublished: p.date,
      url: absoluteUrl(`/read/${p.path.split('/').pop()}`),
    })),
  },
})
</script>

<template>
  <div class="min-h-screen">
    <BlogSection />
  </div>
</template>
