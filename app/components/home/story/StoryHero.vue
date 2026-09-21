<script setup lang="ts">
import type { StoryContent } from './types'
defineProps<{ copy: StoryContent['hero'] }>()
</script>

<template>
  <section id="hello" class="story-scene story-hero" data-chapter="hello" data-thread="lime" aria-labelledby="hello-title">
    <div class="story-inner hero-stage" data-pin="hero">
      <p class="story-aside hero-greeting">{{ copy.greeting }}</p>
      <h1 id="hello-title" class="story-display hero-title" data-axis>
        <span v-for="line in copy.headline" :key="line" class="story-line">{{ line }}</span>
      </h1>
      <div class="hero-bottom">
        <p class="hero-tabs-copy">
          <span v-for="line in copy.tabs" :key="line" class="story-line">{{ line }}</span>
        </p>
        <div class="tab-fragments" aria-hidden="true">
          <span v-for="(tab, index) in copy.tabLabels" :key="tab" class="tab-fragment" :class="`tab-fragment--${index}`" data-tab>
            <span class="tab-fragment__mark" />{{ tab }}<span class="tab-fragment__close">×</span>
          </span>
        </div>
      </div>
    </div>
  </section>

  <section id="tools" class="story-scene story-tools" data-chapter="tools" data-thread="paper" aria-labelledby="tools-title">
    <div class="story-inner tools-stage">
      <h2 id="tools-title" class="story-display" data-axis>
        <span v-for="line in copy.tools" :key="line" class="story-line">{{ line }}</span>
      </h2>
      <p class="story-aside tools-approach" data-words>
        <span v-for="line in copy.approach" :key="line" class="story-line"><template v-for="(word, index) in line.split(' ')" :key="index"><span class="story-word">{{ word }}</span>{{ ' ' }}</template></span>
      </p>
    </div>
  </section>
</template>

<style scoped>
.story-hero { background: var(--color-ink); color: var(--color-paper); }
.hero-stage { min-height: calc(100svh - var(--story-pin-top)); display: flex; flex-direction: column; justify-content: center; }
.hero-greeting { margin-bottom: clamp(2rem, 5vh, 4rem); }
.home-story .hero-title { font-size: clamp(3.75rem, 9.4vw, 10rem); }
.hero-title .story-line:last-child { color: var(--color-lime); }
.hero-bottom { display: flex; align-items: center; gap: 3rem; justify-content: space-between; margin-top: clamp(3rem, 7vh, 6rem); }
.hero-tabs-copy { font-size: clamp(1rem, 1.5vw, 1.35rem); line-height: 1.4; }
.tab-fragments { position: relative; width: 42%; height: 6rem; margin-right: 3%; }
.tab-fragment { position: absolute; display: flex; align-items: center; gap: 0.8rem; width: 11rem; padding: 0.8rem 1rem; border: 1px solid currentColor; border-radius: 0.7rem 0.7rem 0 0; font-size: 0.8rem; background: var(--color-ink); }
.tab-fragment__mark { width: 0.4rem; height: 0.4rem; background: currentColor; }
.tab-fragment__close { margin-left: auto; }
.tab-fragment--0 { left: 0; top: 0; transform: rotate(-9deg); color: var(--color-pink); }
.tab-fragment--1 { left: 30%; top: 2.5rem; transform: rotate(7deg); color: var(--color-paper); }
.tab-fragment--2 { left: 60%; top: -1rem; transform: rotate(-3deg); color: var(--color-lime); }
.story-tools { background: var(--color-cobalt); color: var(--color-paper); }
.tools-stage { min-height: 85svh; display: flex; flex-direction: column; justify-content: center; gap: 4rem; }
.tools-approach { align-self: flex-end; margin-right: 12%; }
@media (max-width: 767px) {
  .hero-stage { min-height: calc(92svh - var(--story-pin-top)); padding-top: 3rem; }
  .home-story .hero-title { font-size: clamp(2.85rem, 10.7vw, 5.2rem); }
  .hero-bottom { flex-direction: column; align-items: flex-start; gap: 2.5rem; }
  .tab-fragments { width: min(85%, 22rem); height: 5rem; }
  .tab-fragment { width: 8rem; padding: 0.65rem; font-size: 0.6rem; gap: 0.45rem; }
  .tab-fragment--2 { left: 57%; }
  .tools-stage { min-height: 0; gap: 3rem; }
  .tools-approach { align-self: flex-start; margin-right: 0; }
}
@media (prefers-reduced-motion: reduce) {
  .hero-stage, .tools-stage { min-height: 0; }
  .tab-fragment { transform: none; }
}
</style>
