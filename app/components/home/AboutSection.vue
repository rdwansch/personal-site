<script setup lang="ts">
import { onMounted, ref } from 'vue'

const { data: about } = await useAsyncData('about', () =>
  queryCollection('about').first()
)

const els = ref<Element[]>([])

onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => entries.forEach(e => e.isIntersecting && e.target.classList.add('visible')),
    { threshold: 0.12 }
  )
  document.querySelectorAll('.reveal').forEach(el => {
    observer.observe(el)
    els.value.push(el)
  })
})
</script>

<template>
  <section id="about" class="py-24 lg:py-32 px-6 lg:px-12 max-w-6xl mx-auto">
    <div class="mb-12 reveal">
      <p class="text-xs font-semibold tracking-widest uppercase text-accent mb-3">Background</p>
      <h2 class="text-3xl lg:text-4xl font-sans font-bold text-fg tracking-tight">About</h2>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
      <div class="space-y-5">
        <p
          v-for="(paragraph, i) in about?.bio"
          :key="i"
          class="text-base lg:text-lg leading-relaxed reveal"
          :class="i === 0 ? 'text-fg' : 'text-fg-secondary'"
          :style="{ transitionDelay: `${(i + 1) * 80}ms` }"
        >
          {{ paragraph }}
        </p>
      </div>

      <div class="space-y-8">
        <div
          v-for="(group, i) in about?.skills"
          :key="group.category"
          class="reveal"
          :style="{ transitionDelay: `${(i + 1) * 100}ms` }"
        >
          <p class="text-xs font-semibold tracking-widest uppercase text-fg-tertiary mb-3">
            {{ group.category }}
          </p>
          <div class="flex flex-wrap gap-2">
            <span
              v-for="skill in group.items"
              :key="skill"
              class="skill-tag"
            >
              {{ skill }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.skill-tag {
  display: inline-block;
  border: 1px solid var(--color-border);
  padding: 0.25rem 0.75rem;
  font-size: 0.875rem;
  color: var(--color-fg-secondary);
  position: relative;
  overflow: hidden;
  transition:
    color 0.25s ease,
    border-color 0.25s ease,
    transform 0.25s var(--ease-out-back),
    box-shadow 0.25s ease;
}

.skill-tag::before {
  content: '';
  position: absolute;
  inset: 0;
  background-color: var(--overlay-accent);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.3s var(--ease-out-expo);
}

.skill-tag:hover {
  color: var(--color-accent);
  border-color: var(--color-accent);
  transform: translateY(-2px) scale(1.04);
  box-shadow: 0 4px 14px var(--overlay-accent);
}

.skill-tag:hover::before {
  transform: scaleX(1);
}
</style>
