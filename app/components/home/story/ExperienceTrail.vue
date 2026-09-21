<script setup lang="ts">
import type { Experience, StoryContent } from './types'
defineProps<{ items: Experience[]; copy: StoryContent['experience'] }>()
</script>

<template>
  <section id="experience" class="story-scene story-trail experience-trail" data-chapter="experience" data-thread="heat" aria-labelledby="experience-title">
    <div class="story-inner">
      <header class="trail-heading">
        <h2 id="experience-title">{{ copy.title }}</h2>
        <NuxtLink to="/experiences" class="story-link">{{ copy.link }}</NuxtLink>
      </header>
      <ol class="experience-list">
        <li v-for="(job, index) in items" :key="`${job.company}-${job.period}`" :class="`experience-item--${index}`">
          <div>
            <h3>{{ job.role }}</h3>
            <p>{{ [job.company, job.location].filter(Boolean).join(' · ') }}</p>
            <p class="experience-period">{{ job.period }}</p>
          </div>
        </li>
      </ol>
    </div>
  </section>
</template>

<style scoped>
.experience-trail { background: var(--color-ink); color: var(--color-paper); }
.experience-list { display: grid; gap: 3rem; padding-block: 1rem 3rem; }
.experience-list li { position: relative; max-width: 42rem; padding-left: 2rem; }
.experience-list li::before { content: ''; position: absolute; top: 0.5rem; left: 0; width: 0.8rem; height: 0.8rem; border-radius: 50%; background: var(--color-heat); }
.experience-list li:nth-child(even) { margin-left: clamp(0rem, 12vw, 10rem); }
.experience-list h3 { font-family: var(--font-display); font-size: clamp(1.35rem, 2.3vw, 2.15rem); font-weight: 600; line-height: 1.15; }
.experience-list p { color: var(--color-fg-secondary); }
.experience-list h3 + p { margin-top: 0.5rem; }
.experience-period { margin-top: 0.5rem; font-size: 0.9rem; }
@media (max-width: 767px) { .experience-list li:nth-child(even) { margin-left: 0; } }
</style>
