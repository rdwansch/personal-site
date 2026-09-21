<script setup lang="ts">
import type { FeaturedWork, StoryContent } from './types'
defineProps<{ work: FeaturedWork; copy: StoryContent['work']['chapters'][number] }>()
</script>

<template>
  <article :id="`project-${work.id}`" class="story-scene project-chapter" :class="`project-chapter--${work.id}`" data-chapter="work" :data-thread="work.id === 'global' ? 'lime' : 'ink'" :aria-labelledby="`project-title-${work.id}`">
    <div class="story-inner project-stage" data-pin="project">
      <div class="project-copy">
        <p class="project-intro">I worked on</p>
        <h3 :id="`project-title-${work.id}`">{{ copy.title }}</h3>
        <div class="project-notes">
          <div>
            <p class="project-description">{{ copy.description }}</p>
            <p class="project-summary">{{ work.summary }}</p>
          </div>
          <p class="project-fact" data-project-detail>
            <template v-if="copy.metricBefore">{{ copy.metricBefore }} </template>
            <strong>{{ work.metric }}</strong> {{ copy.metricAfter }}
          </p>
        </div>
        <p class="project-stack">Built with {{ work.stack.filter(item => !['Chakra UI', 'Tailwind CSS'].includes(item)).join(', ').replace(/, ([^,]*)$/, ' and $1') }}.</p>
      </div>
    </div>
  </article>
</template>

<style scoped>
.project-chapter--erp { background: var(--color-paper); color: var(--color-ink); }
.project-chapter--global { background: var(--color-cobalt); color: var(--color-paper); }
.project-chapter--booking { background: var(--color-pink); color: var(--color-ink); }
.project-stage { min-height: 88svh; display: flex; align-items: center; }
.project-copy { width: min(100%, 70rem); }
.project-intro { margin-bottom: 1.25rem; font-size: clamp(1.1rem, 1.7vw, 1.45rem); }
.project-copy h3 { max-width: 20ch; font-family: var(--font-display); font-size: clamp(2.75rem, 5.3vw, 5.75rem); font-variation-settings: 'wdth' 100, 'wght' 620; line-height: 1.05; letter-spacing: -0.055em; }
.project-notes { display: grid; grid-template-columns: minmax(0, 1fr) minmax(13rem, 0.55fr); gap: clamp(3rem, 9vw, 9rem); align-items: end; margin-top: clamp(3rem, 8vh, 7rem); }
.project-description { font-size: clamp(1.25rem, 2.3vw, 2rem); line-height: 1.35; }
.project-summary { max-width: 42rem; margin-top: 1.4rem; font-size: 1rem; line-height: 1.7; }
.project-fact { max-width: 17rem; padding-left: 1.25rem; border-left: 3px solid currentColor; font-size: clamp(1.05rem, 1.7vw, 1.4rem); line-height: 1.45; transform: rotate(-2deg); }
.project-fact strong { display: block; margin-block: 0.2rem; font-family: var(--font-display); font-size: clamp(2.6rem, 5vw, 5rem); font-variation-settings: 'wdth' 115, 'wght' 680; line-height: 0.95; letter-spacing: -0.06em; }
.project-stack { margin-top: clamp(3rem, 7vh, 6rem); font-size: 0.95rem; }
@media (max-width: 767px) {
  .project-stage { min-height: 0; }
  .project-copy h3 { font-size: clamp(2.5rem, 9vw, 4.5rem); }
  .project-notes { grid-template-columns: 1fr; gap: 2.5rem; margin-top: 2.5rem; }
  .project-fact { transform: none; }
  .project-stack { margin-top: 3rem; }
}
@media (prefers-reduced-motion: reduce) { .project-stage { min-height: 0; } }
</style>
