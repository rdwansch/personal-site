<script setup lang="ts">
import type { StoryContent } from './types'
defineProps<{ copy: StoryContent['ai'] }>()
</script>

<template>
  <section id="ai" class="story-scene ai-interlude" data-chapter="ai" data-thread="pink" aria-labelledby="ai-title">
    <div class="story-inner ai-stage" data-pin="ai">
      <div class="ai-opening">
        <h2 id="ai-title" class="story-display">
          <span v-for="line in copy.intro" :key="line" class="story-line">{{ line }}</span>
        </h2>
        <p class="story-aside ai-speed">
          <span v-for="line in copy.speed" :key="line" class="story-line">{{ line }}</span>
        </p>
      </div>
      <div class="ai-decisions" aria-hidden="true">
        <span class="ai-suggestion" data-suggestion>{{ copy.suggestions[0] }}</span>
        <span class="ai-keep" data-keep>✓ {{ copy.suggestions[1] }}</span>
        <span class="ai-reject" data-reject>× {{ copy.suggestions[2] }}</span>
      </div>
      <div class="ai-resolution">
        <p class="ai-review" data-words>
          <span v-for="line in copy.review" :key="line" class="story-line"><template v-for="(word, index) in line.split(' ')" :key="index"><span class="story-word">{{ word }}</span>{{ ' ' }}</template></span>
        </p>
        <p class="story-aside ai-principle">
          <span v-for="line in copy.principle" :key="line" class="story-line">{{ line }}</span>
        </p>
      </div>
    </div>
  </section>
</template>

<style scoped>
.ai-interlude { background: var(--color-ink); color: var(--color-paper); }
.ai-stage { min-height: calc(100svh - var(--story-pin-top)); display: flex; flex-direction: column; justify-content: center; gap: clamp(2rem, 5vh, 4rem); }
.ai-opening, .ai-resolution { display: grid; grid-template-columns: 1.5fr 1fr; align-items: end; gap: 3rem; }
.home-story .ai-opening h2 { font-size: clamp(3.5rem, 7vw, 7.25rem); }
.ai-opening h2 .story-line:first-child { color: var(--color-pink); }
.ai-speed, .ai-principle { padding-bottom: 0.4rem; }
.ai-decisions { display: flex; flex-wrap: wrap; align-items: center; gap: 1.5rem 3rem; font-size: 0.9rem; }
.ai-suggestion { color: var(--color-fg-secondary); }
.ai-keep { color: var(--color-lime); border-bottom: 1px solid currentColor; padding-block: 0.4rem; }
.ai-reject { color: var(--color-pink); text-decoration: line-through; }
.ai-review { font-family: var(--font-display); font-size: clamp(2.5rem, 4.7vw, 5rem); letter-spacing: -0.05em; line-height: 1.1; }
.ai-principle { color: var(--color-lime); }
@media (max-width: 767px) {
  .ai-stage { min-height: 0; gap: 2.5rem; }
  .ai-opening, .ai-resolution { grid-template-columns: 1fr; gap: 1.75rem; }
  .home-story .ai-opening h2 { font-size: clamp(2.8rem, 10.5vw, 5rem); }
  .ai-decisions { gap: 1.25rem; }
}
@media (prefers-reduced-motion: reduce) { .ai-stage { min-height: 0; } }
</style>
