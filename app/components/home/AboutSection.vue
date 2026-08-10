<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'

const { data: about } = await useAsyncData('about', () =>
  queryCollection('about').first()
)

const els = ref<Element[]>([])
let observer: IntersectionObserver | null = null

onMounted(() => {
  observer = new IntersectionObserver(
    (entries) => entries.forEach(e => e.isIntersecting && e.target.classList.add('visible')),
    { threshold: 0.12 }
  )
  document.querySelectorAll('.reveal').forEach(el => {
    observer?.observe(el)
    els.value.push(el)
  })
})

onUnmounted(() => observer?.disconnect())
</script>

<template>
  <section id="about" class="mx-auto max-w-6xl px-6 py-24 lg:px-12 lg:py-32">
    <div class="reveal  py-6 lg:flex lg:items-end lg:justify-between lg:gap-12">
      <div>
        <!-- <p class="mb-4 text-xs font-semibold uppercase tracking-[0.25em] text-accent">01 / Profile</p> -->
        <h2 class="max-w-2xl text-4xl font-sans font-bold leading-[0.98] tracking-tight text-fg sm:text-5xl lg:text-6xl">
          Building the useful<br class="hidden sm:block" /> parts of the web.
        </h2>
      </div>
      <p class="mt-6 max-w-xs text-sm leading-relaxed text-fg-secondary lg:mb-1 lg:mt-0">
        <!-- A frontend-focused developer who turns complex workflows into clear, dependable products. -->
      </p>
    </div>

    <div class="grid grid-cols-1 gap-14 pt-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-24 lg:pt-20">
      <div>
        <p
          v-for="(paragraph, i) in about?.bio"
          :key="i"
          class="reveal border-l-2 border-teal pl-5 text-base leading-[1.8] sm:pl-6 lg:text-lg"
          :class="i === 0 ? 'text-fg' : 'mt-7 text-fg-secondary'"
          :style="{ transitionDelay: `${(i + 1) * 80}ms` }"
        >
          {{ paragraph }}
        </p>
      </div>

      <div class="">
        <div class="flex items-center justify-end border-b border-border py-4">
          <p class="text-xs font-semibold uppercase tracking-[0.22em] text-fg">Working toolkit</p>
          <!-- <span class="text-xs text-fg-tertiary">{{ about?.skills?.length ?? 0 }} areas</span> -->
        </div>
        <div
          v-for="(group, i) in about?.skills"
          :key="group.category"
          class="reveal group grid grid-cols-[7.5rem_1fr] gap-4 border-b border-border py-5 sm:grid-cols-[9rem_1fr]"
          :style="{ transitionDelay: `${(i + 1) * 100}ms` }"
        >
          <p class="text-xs font-semibold uppercase tracking-[0.16em] text-fg-tertiary transition-colors group-hover:text-accent">
            {{ group.category }}
          </p>
          <div class="flex flex-wrap gap-2">
            <span
              v-for="skill in group.items"
              :key="skill"
              class="tool-badge"
            >
              <span class="tool-dot" aria-hidden="true" />
              {{ skill }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.tool-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  border: 1px solid var(--color-border);
  border-radius: 9999px;
  padding: 0.42rem 0.7rem;
  color: var(--color-fg-secondary);
  background-color: var(--color-surface-raised);
  font-size: 0.75rem;
  line-height: 1;
  transition:
    color 0.25s ease,
    border-color 0.25s ease,
    background-color 0.25s ease,
    transform 0.25s var(--ease-out-back);
}

.tool-dot {
  width: 0.35rem;
  height: 0.35rem;
  flex: 0 0 auto;
  border-radius: 9999px;
  background: var(--color-accent-teal);
  opacity: 0.75;
  transition: transform 0.25s var(--ease-out-back), background-color 0.25s ease;
}

.tool-badge:hover {
  color: var(--color-fg);
  border-color: var(--color-accent);
  background: var(--overlay-accent);
  transform: translateY(-2px);
}

.tool-badge:hover .tool-dot {
  background: var(--color-accent);
  opacity: 1;
  transform: scale(1.5);
}
</style>
