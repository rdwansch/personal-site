<script setup lang="ts">
const route = useRoute()
const slug = route.params.slug as string

const { data: post } = await useAsyncData(`blog-${slug}`, () =>
  queryCollection('blog').path(`/blog/${slug}`).first()
)

if (!post.value) {
  throw createError({ statusCode: 404, statusMessage: 'Post not found' })
}

useSeoMeta({
  title: post.value.title,
  description: post.value.description,
})
</script>

<template>
  <div class="min-h-screen bg-surface">
    <div class="max-w-2xl mx-auto px-6 py-24 lg:py-32">
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
    </div>
  </div>
</template>
