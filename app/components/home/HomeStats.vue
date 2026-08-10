<script setup lang="ts">
import { ref, onMounted } from 'vue'

const { data: projects } = await useAsyncData('home-projects-count', () =>
  queryCollection('projects').first()
)
const { data: posts } = await useAsyncData('home-posts-count', () =>
  queryCollection('blog').all()
)

const publishedCount = computed(() =>
  (posts.value ?? []).filter((p: any) => p.draft !== true && p.meta?.draft !== true).length
)

const stats = computed(() => [
  { label: 'Years Experience', value: '2+', hint: 'in production software' },
  { label: 'Projects Shipped', value: String(projects.value?.items?.length ?? 0), hint: 'solo & team builds' },
  { label: 'Articles Written', value: String(publishedCount.value), hint: 'on web engineering' },
  { label: 'Countries Reached', value: '90+', hint: 'via shipping web apps' },
])

const root = ref<HTMLElement | null>(null)

onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target) } }),
    { threshold: 0.15 }
  )
  if (root.value) root.value.querySelectorAll('.reveal').forEach(el => observer.observe(el))
})
</script>

<template>
  <section ref="root" class="py-20 lg:py-24 px-6 lg:px-12 max-w-6xl mx-auto">
    <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
      <div
        v-for="(s, i) in stats"
        :key="s.label"
        class="reveal group relative overflow-hidden rounded-2xl border border-border bg-raised p-6 lg:p-8 transition-all duration-300 ease-out-quart hover:-translate-y-1 hover:shadow-xl hover:shadow-accent/10"
        :style="{ transitionDelay: `${i * 80}ms` }"
      >
        <div class="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-accent to-teal opacity-60 transition-opacity duration-300 group-hover:opacity-100" />
        <p
          class="text-4xl lg:text-5xl font-bold font-sans tracking-tight bg-gradient-to-r from-accent to-teal bg-clip-text text-transparent"
        >
          {{ s.value }}
        </p>
        <p class="mt-3 text-xs font-semibold tracking-widest uppercase text-fg mb-1">{{ s.label }}</p>
        <p class="text-sm text-fg-tertiary leading-relaxed">{{ s.hint }}</p>
      </div>
    </div>
  </section>
</template>
