<script setup lang="ts">
import { ref, onMounted } from 'vue'

const { data: work } = await useAsyncData('home-experience', () =>
  queryCollection('work').first()
)

const root = ref<HTMLElement | null>(null)

onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target) } }),
    { threshold: 0.1 }
  )
  if (root.value) root.value.querySelectorAll('.reveal').forEach(el => observer.observe(el))
})
</script>

<template>
  <section ref="root" class="py-24 lg:py-32 px-6 lg:px-12 max-w-6xl mx-auto border-t border-border">
    <div class="mb-12 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 reveal">
      <div>
        <p class="text-xs font-semibold tracking-widest uppercase text-teal mb-3">Career</p>
        <h2 class="text-3xl lg:text-4xl font-sans font-bold text-fg tracking-tight">Experience</h2>
      </div>
      <NuxtLink
        to="/experiences"
        class="self-start sm:self-auto text-xs font-semibold tracking-widest uppercase text-fg-secondary hover:text-accent transition-colors duration-300 after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:bg-accent after:transition-all after:duration-300 hover:after:w-full relative"
      >
        Full history →
      </NuxtLink>
    </div>

    <ol class="relative border-l border-border ml-2 space-y-10">
      <li
        v-for="(job, idx) in work?.experience"
        :key="job.company"
        class="pl-8 relative reveal"
        :style="{ transitionDelay: `${idx * 90}ms` }"
      >
        <span
          class="absolute -left-[5px] top-1.5 w-2.5 h-2.5 rounded-full bg-gradient-to-r from-accent to-teal ring-4 ring-surface"
        />
        <div class="flex flex-col md:flex-row md:items-baseline md:justify-between gap-1 mb-1">
          <h3 class="text-lg lg:text-xl font-sans font-bold text-fg">{{ job.role }}</h3>
          <time class="text-xs font-semibold tracking-widest uppercase text-fg-tertiary shrink-0">
            {{ job.period }}
          </time>
        </div>
        <p class="text-sm font-semibold text-accent mb-3">{{ job.company }} — {{ job.location }}</p>
        <p v-if="job.highlights?.length" class="text-sm text-fg-secondary leading-relaxed max-w-2xl">
          {{ job.highlights[0].text }}
        </p>
      </li>
    </ol>
  </section>
</template>
