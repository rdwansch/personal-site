<script setup lang="ts">
import { ref, onMounted } from 'vue'

const skills = [
  { category: 'Frontend', items: ['Vue 3', 'Nuxt', 'React', 'TypeScript', 'Tailwind CSS'] },
  { category: 'Backend', items: ['Node.js', 'Express', 'REST APIs'] },
  { category: 'Tools', items: ['Git', 'Figma', 'Vercel', 'Vite'] },
]

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
    <!-- Section header -->
    <div class="mb-12 reveal">
      <p class="text-xs font-semibold tracking-widest uppercase text-accent mb-3">Background</p>
      <h2 class="text-3xl lg:text-4xl font-sans font-bold text-fg tracking-tight">About</h2>
    </div>

    <!-- Two-column layout: story + skills -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
      <!-- Story -->
      <div class="space-y-5">
        <p class="text-base lg:text-lg text-fg leading-relaxed reveal" style="transition-delay: 80ms">
          I'm a frontend developer focused on building clean, performant web experiences. I care about the details — smooth interactions, readable code, and interfaces that just work.
        </p>
        <p class="text-base lg:text-lg text-fg-secondary leading-relaxed reveal" style="transition-delay: 160ms">
          My work sits at the intersection of design and engineering. I like turning well-thought-out designs into precise implementations, and I'm comfortable owning a feature from concept to deployment.
        </p>
        <p class="text-base lg:text-lg text-fg-secondary leading-relaxed reveal" style="transition-delay: 240ms">
          When I'm not building things, I'm usually reading about new web platform features or thinking about how to make software feel less like software.
        </p>
      </div>

      <!-- Skills -->
      <div class="space-y-8">
        <div v-for="(group, i) in skills" :key="group.category" class="reveal" :style="{ transitionDelay: `${(i + 1) * 100}ms` }">
          <p class="text-xs font-semibold tracking-widest uppercase text-fg-tertiary mb-3">
            {{ group.category }}
          </p>
          <div class="flex flex-wrap gap-2">
            <span
              v-for="skill in group.items"
              :key="skill"
              class="border border-border px-3 py-1 text-sm text-fg-secondary hover:border-accent hover:text-accent transition-colors duration-300 cursor-default"
            >
              {{ skill }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
