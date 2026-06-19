<script setup lang="ts">
import { onMounted } from 'vue'

const { data: work } = await useAsyncData('work', () =>
  queryCollection('work').first()
)

useSeo({
  title: 'Experiences',
  description:
    'Work history of Ridhwan R Siddiq — shipping internal tools, real-time systems and customer-facing web apps with React, Next.js, Vue, Nuxt and TypeScript.',
})

onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target) } }),
    { threshold: 0.1 }
  )
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el))
})
</script>

<template>
  <div class="min-h-screen">
    <section class="py-24 lg:py-32 px-6 lg:px-12 max-w-6xl mx-auto">
      <div class="mb-12 reveal">
        <p class="text-xs font-semibold tracking-widest uppercase text-accent mb-3">Experience</p>
        <h2 class="text-3xl lg:text-4xl font-sans font-bold text-fg tracking-tight">Experiences</h2>
      </div>

      <div class="space-y-16">
        <article
          v-for="(job, idx) in work?.experience"
          :key="job.company"
          class="grid grid-cols-1 lg:grid-cols-4 gap-4 lg:gap-12 reveal"
          :style="`transition-delay: ${idx * 80}ms`"
        >
          <div class="lg:col-span-1">
            <p class="text-sm text-fg-tertiary">{{ job.period }}</p>
          </div>
          <div class="lg:col-span-3">
            <h3 class="text-xl font-sans font-bold text-fg mb-1">{{ job.role }}</h3>
            <p class="text-sm font-semibold text-accent mb-4">{{ job.company }} — {{ job.location }}</p>
            <ul class="space-y-3">
              <li
                v-for="(highlight, i) in job.highlights"
                :key="i"
                class="text-sm text-fg-secondary leading-relaxed"
              >
                {{ highlight.text }}
                <span class="text-fg-tertiary"> {{ highlight.stack }}</span>
              </li>
            </ul>
          </div>
        </article>
      </div>
    </section>

    <!-- <ProjectsSection /> -->
  </div>
</template>
