<script setup lang="ts">
const route = useRoute()
const slug = route.params.slug as string

const { data: post } = await useAsyncData(`blog-${slug}`, () =>
  queryCollection('blog').path(`/blog/${slug}`).first()
)

if (!post.value) {
  throw createError({ statusCode: 404, statusMessage: 'Post not found' })
}

const { public: cfg } = useRuntimeConfig()
const postPath = `/read/${slug}`
const postUrl = absoluteUrl(postPath)
const authorName = (cfg.fullName as string) || (cfg.siteName as string)

const isDraft = post.value.draft === true || (post.value.meta as any)?.draft === true

const tocLinks = computed(() => post.value?.body?.toc?.links ?? [])

useSeo({
  title: post.value.title,
  description: post.value.description,
  path: postPath,
  type: 'article',
  noindex: isDraft,
  publishedTime: post.value.date,
  tags: post.value.tags,
  jsonLd: [
    {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: post.value.title,
      description: post.value.description,
      datePublished: post.value.date,
      dateModified: post.value.date,
      keywords: post.value.tags?.join(', '),
      inLanguage: 'en',
      author: { '@type': 'Person', name: authorName, url: cfg.siteUrl },
      publisher: { '@type': 'Person', name: authorName, url: cfg.siteUrl },
      mainEntityOfPage: { '@type': 'WebPage', '@id': postUrl },
      url: postUrl,
      image: absoluteUrl('/og.png'),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: absoluteUrl('/') },
        { '@type': 'ListItem', position: 2, name: 'Articles', item: absoluteUrl('/articles') },
        { '@type': 'ListItem', position: 3, name: post.value.title, item: postUrl },
      ],
    },
  ],
})
</script>

<template>
  <div class="min-h-screen bg-surface">
    <div class="max-w-6xl mx-auto px-6 py-24 lg:py-32">
      <!-- Back link -->
      <NuxtLink
        to="/articles"
        class="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-fg-tertiary hover:text-accent transition-colors duration-200 mb-12"
      >
        <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
        </svg>
        Back
      </NuxtLink>

      <!-- Two-column layout: article + TOC sidebar -->
      <div class="lg:grid lg:grid-cols-[1fr_220px] lg:gap-16 xl:gap-24">
        <!-- Main content -->
        <div class="min-w-0">
          <!-- Header -->
          <header class="mb-12">
            <div class="flex flex-wrap gap-3 mb-4">
              <span
                v-for="tag in post.tags"
                :key="tag"
                class="text-xs font-semibold tracking-widest uppercase text-teal"
              >
                {{ tag }}
              </span>
            </div>
            <h1 class="text-3xl lg:text-4xl font-sans font-bold text-fg tracking-tight leading-tight mb-4">
              {{ post.title }}
            </h1>
            <p class="text-fg-secondary text-base leading-relaxed mb-6">{{ post.description }}</p>
            <time class="text-xs font-semibold tracking-widest uppercase text-fg-tertiary">
              {{ new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) }}
            </time>
          </header>

          <hr class="border-border mb-12" />

          <!-- Body -->
          <div class="prose prose-slate dark:prose-invert max-w-none prose-headings:font-sans prose-headings:font-bold prose-headings:text-fg prose-p:text-fg-secondary prose-p:leading-relaxed prose-li:text-fg-secondary prose-a:text-accent prose-a:no-underline hover:prose-a:underline">
            <ContentRenderer :value="post" />
          </div>

          <!-- Share -->
          <hr class="border-border mt-16 mb-8" />
          <ShareButtons :path="postPath" :title="post.title" :text="post.description" />
        </div>

        <!-- TOC sidebar (desktop only) -->
        <aside class="hidden lg:block">
          <ArticleToc :links="tocLinks" />
        </aside>
      </div>
    </div>
  </div>
</template>
