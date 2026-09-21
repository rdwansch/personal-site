<script setup lang="ts">
import type { Collections } from '@nuxt/content'
import HomeStory from '~/components/home/story/HomeStory.vue'

const { public: cfg } = useRuntimeConfig()
const [{ data: story }, { data: work }, { data: posts }] = await Promise.all([
  useAsyncData('home-story', () => queryCollection('home').first()),
  useAsyncData('work', () => queryCollection('work').first()),
  useAsyncData('home-posts', () => queryCollection('blog').order('date', 'DESC').all()),
])

if (!story.value) {
  throw createError({ statusCode: 500, statusMessage: 'Homepage content is unavailable' })
}

const published = computed(() => (posts.value ?? [])
  .filter((post: Collections['blog'] & { draft?: boolean }) => post.draft !== true && post.meta?.draft !== true)
  .slice(0, 3))

const contacts = {
  email: cfg.email as string | undefined,
  github: cfg.github as string | undefined,
  linkedin: cfg.linkedin as string | undefined,
}

useSeo({
  description:
    'Ridhwan R Siddiq builds production interfaces used by sales teams, customers across 90+ countries, and multi-role booking products.',
  type: 'profile',
  jsonLd: {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    name: `${cfg.siteName} — Frontend Developer`,
    url: absoluteUrl('/'),
    about: { '@type': 'Person', name: cfg.fullName || cfg.siteName },
  },
})
</script>

<template>
  <HomeStory
    v-if="story"
    :story="story"
    :experience="work?.experience ?? []"
    :posts="published"
    :contacts="contacts"
  />
</template>
