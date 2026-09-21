<script setup lang="ts">
import { ref } from 'vue'
import type { ContactLinks, Experience, StoryContent, StoryPost } from './types'
import StoryHero from './StoryHero.vue'
import SignalThread from './SignalThread.vue'
import AiInterlude from './AiInterlude.vue'
import ExperienceTrail from './ExperienceTrail.vue'
import WritingTrail from './WritingTrail.vue'
import ContactOutro from './ContactOutro.vue'

defineProps<{
  story: StoryContent
  experience: Experience[]
  posts: StoryPost[]
  contacts: ContactLinks
}>()
const root = ref<HTMLElement | null>(null)
useScrollStory(root)
</script>

<template>
  <div ref="root" class="home-story">
    <SignalThread />
    <StoryHero :copy="story.hero" />
    <AiInterlude :copy="story.ai" />

    <!-- Work sections are hidden for now; keep the content available for a future re-enable. -->
    <ExperienceTrail v-if="experience.length" :items="experience" :copy="story.experience" />
    <WritingTrail v-if="posts.length" :posts="posts" :copy="story.writing" />
    <ContactOutro :copy="story.contact" :contacts="contacts" />
  </div>
</template>

<style>
.home-story {
  position: relative;
  isolation: isolate;
  --story-gutter: clamp(1.5rem, 6vw, 7rem);
  --story-pin-top: 0px;
}
.home-story .story-scene { position: relative; scroll-margin-top: var(--story-pin-top); }
.home-story .story-inner {
  position: relative;
  z-index: 2;
  width: min(100%, 96rem);
  margin-inline: auto;
  padding: clamp(4rem, 9vh, 8rem) var(--story-gutter);
}
.home-story .story-display {
  font-family: var(--font-display);
  font-variation-settings: 'wdth' 100, 'wght' 650;
  font-size: clamp(3rem, 7.8vw, 8.5rem);
  line-height: 1.02;
  letter-spacing: -0.065em;
}
.home-story .story-line { display: block; }
.home-story .story-word { display: inline-block; }
.home-story .story-aside { font-size: clamp(1.15rem, 2vw, 1.75rem); line-height: 1.4; }
.home-story .story-meta { font-size: 0.9rem; line-height: 1.7; }
.home-story .story-link { text-decoration: underline; text-underline-offset: 0.35em; text-decoration-thickness: 1px; }
.home-story .story-link:hover { text-decoration-thickness: 3px; }
.home-story .story-trail { padding-block: clamp(1rem, 3vw, 3rem); }
.home-story .trail-heading { display: flex; justify-content: space-between; align-items: baseline; gap: 2rem; margin-bottom: 3rem; }
.home-story .trail-heading h2 { font-family: var(--font-display); font-size: clamp(2rem, 3.6vw, 4rem); line-height: 1.1; letter-spacing: -0.045em; }
.home-story .trail-heading a { flex-shrink: 0; color: var(--color-accent); }
@media (max-width: 767px) {
  .home-story { --story-gutter: 1.5rem; }
  .home-story .story-display { font-size: clamp(2.8rem, 10.5vw, 5rem); letter-spacing: -0.06em; }
  .home-story .story-inner { padding-right: 2rem; }
  .home-story .trail-heading { flex-direction: column; align-items: flex-start; gap: 1.25rem; margin-bottom: 2rem; }
}
</style>
