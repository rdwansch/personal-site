<script setup lang="ts">
const { data: posts } = await useAsyncData('all-blog-posts', () =>
  queryCollection('blog').order('date', 'DESC').all()
)

// /articles is the canonical, indexed listing — keep this mirror out of the index.
useSeo({
  title: 'Read my posts',
  description:
    'Articles by Ridhwan R Siddiq on web development — React, Next.js, Vue, Nuxt and JavaScript.',
  path: '/articles',
  noindex: true,
})
</script>

<template>
  <div class="min-h-screen bg-surface">
    <div class="max-w-2xl mx-auto px-6 py-24 lg:py-32">
      <header class="mb-16">
        <h1 class="text-4xl lg:text-5xl font-bold text-fg tracking-tight font-preahvihear">
          Read my posts
        </h1>
      </header>

      <hr class="border-border mb-12" />

      <div class="space-y-0 divide-y divide-border">
        <article
          v-for="post in posts"
          :key="post.path"
          class="py-8 group"
        >
          <div class="flex flex-col md:flex-row md:items-baseline md:justify-between gap-2 mb-3">
            <h2 class="text-lg lg:text-xl font-sans font-bold text-fg group-hover:text-accent transition-colors duration-300">
              <NuxtLink :to="`/read/${post.path.split('/').pop()}`">{{ post.title }}</NuxtLink>
            </h2>
            <time
              v-if="post.date"
              class="text-xs font-semibold tracking-widest uppercase text-fg-tertiary shrink-0"
            >
              {{ new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) }}
            </time>
          </div>
          <p class="text-sm text-fg-secondary leading-relaxed max-w-2xl mb-3">{{ post.description }}</p>
          <div v-if="post.tags?.length" class="flex flex-wrap gap-3">
            <span
              v-for="tag in post.tags"
              :key="tag"
              class="text-xs font-semibold tracking-widest uppercase text-teal"
            >
              {{ tag }}
            </span>
          </div>
        </article>
      </div>
    </div>
  </div>
</template>
