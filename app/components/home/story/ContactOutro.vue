<script setup lang="ts">
import type { ContactLinks, StoryContent } from './types'
defineProps<{ copy: StoryContent['contact']; contacts: ContactLinks }>()
</script>

<template>
  <section id="contact" class="story-scene contact-outro" data-chapter="contact" data-thread="ink" aria-labelledby="contact-title">
    <div class="story-inner">
      <h2 id="contact-title" class="story-display">
        <span v-for="line in copy.title" :key="line" class="story-line">{{ line }}</span>
      </h2>
      <div v-if="contacts.email" class="contact-email-wrap">
        <a :href="`mailto:${contacts.email}`" class="contact-email" data-thread-end>{{ contacts.email }}</a>
      </div>
      <div v-if="contacts.github || contacts.linkedin" class="contact-socials story-meta">
        <a v-if="contacts.github" :href="contacts.github" target="_blank" rel="noopener noreferrer" class="story-link">GitHub <span aria-hidden="true">↗</span></a>
        <a v-if="contacts.linkedin" :href="contacts.linkedin" target="_blank" rel="noopener noreferrer" class="story-link">LinkedIn <span aria-hidden="true">↗</span></a>
      </div>
    </div>
  </section>
</template>

<style scoped>
.contact-outro { background: var(--color-lime); color: var(--color-ink); }
.contact-outro .story-inner { padding-block: clamp(5rem, 12vw, 12rem); }
.contact-email-wrap { margin-top: 3rem; }
.contact-email { display: inline-block; max-width: 100%; overflow-wrap: anywhere; padding-bottom: 0.6rem; border-bottom: 3px solid currentColor; font-size: clamp(1.15rem, 3.3vw, 3.25rem); line-height: 1.4; letter-spacing: -0.035em; }
.contact-email:hover { color: var(--color-cobalt); }
.contact-socials { display: flex; flex-wrap: wrap; gap: 2rem; margin-top: 2.5rem; }
</style>
