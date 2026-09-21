<script setup lang="ts">
import type { StoryContent, StoryPost } from './types'
defineProps<{ posts: StoryPost[]; copy: StoryContent['writing'] }>()
const formatDate = (date: string) => new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC' })
</script>

<template>
  <section id="writing" class="story-scene story-trail writing-trail" data-chapter="writing" data-thread="lime" aria-labelledby="writing-title">
    <div class="story-inner">
      <header class="trail-heading">
        <h2 id="writing-title">{{ copy.title }}</h2>
        <NuxtLink to="/articles" class="story-link">{{ copy.link }}</NuxtLink>
      </header>
      <article v-for="post in posts" :key="post.path" class="writing-entry">
        <div>
          <h3><NuxtLink :to="`/read/${post.path.split('/').pop()}`" class="story-link">{{ post.title }}</NuxtLink></h3>
          <p>{{ post.description }}</p>
          <time :datetime="post.date">{{ formatDate(post.date) }}</time>
        </div>
      </article>
    </div>
  </section>
</template>

<style scoped>
.writing-trail { background: var(--color-ink); color: var(--color-paper); }
.writing-entry { max-width: 50rem; padding-block: 1.75rem; }
.writing-entry + .writing-entry { margin-left: clamp(0rem, 8vw, 7rem); }
.writing-entry time, .writing-entry p { color: var(--color-fg-secondary); }
.writing-entry h3 { font-family: var(--font-display); font-size: clamp(1.5rem, 2.8vw, 2.6rem); font-weight: 600; line-height: 1.2; }
.writing-entry p { margin-top: 0.85rem; max-width: 50ch; line-height: 1.6; }
.writing-entry time { display: block; margin-top: 0.8rem; font-size: 0.9rem; }
.writing-entry a:hover { color: var(--color-lime); }
@media (max-width: 767px) { .writing-entry + .writing-entry { margin-left: 0; } }
</style>
