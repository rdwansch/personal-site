<script setup lang="ts">
import { useStaggerReveal } from '~/composables/useStaggerReveal'

const { containerRef } = useStaggerReveal()

const projects = [
  {
    title: 'Personal Site',
    description: 'This site — a minimal, gallery-inspired portfolio built with Nuxt 3, Tailwind CSS, and Nuxt Content. Focused on clean motion and typographic hierarchy.',
    tags: ['Nuxt', 'Tailwind', 'TypeScript'],
    accent: 'var(--color-accent)',
    accentHex: '#7C6FAF',
    link: 'https://github.com/rdwansch/personal-site',
  },
  {
    title: 'UI Component Library',
    description: 'A set of accessible, composable Vue 3 components with a consistent design language. Built for reuse across projects with minimal configuration.',
    tags: ['Vue 3', 'TypeScript', 'Vite'],
    accent: 'var(--color-accent-teal)',
    accentHex: '#4DA8A0',
    link: null,
  },
  {
    title: 'REST API Boilerplate',
    description: 'Production-ready Node.js API starter with authentication, validation, error handling, and structured logging baked in from day one.',
    tags: ['Node.js', 'Express', 'TypeScript'],
    accent: 'var(--color-fg-secondary)',
    accentHex: '#64748B',
    link: null,
  },
]
</script>

<template>
  <section id="projects" class="py-24 lg:py-32 px-6 lg:px-12 max-w-6xl mx-auto">
    <!-- Section header -->
    <div class="mb-12">
      <p class="text-xs font-semibold tracking-widest uppercase text-accent mb-3">Selected Work</p>
      <h2 class="text-3xl lg:text-4xl font-sans font-bold text-fg tracking-tight">Projects</h2>
    </div>

    <!-- Grid -->
    <div
      ref="containerRef"
      class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
    >
      <article
        v-for="project in projects"
        :key="project.title"
        data-stagger
        class="group border border-border bg-raised transition-all duration-300 ease-out-quart hover:shadow-xl hover:-translate-y-1 opacity-0"
        style="animation-fill-mode: forwards;"
      >
        <!-- Thumbnail -->
        <div
          class="aspect-video overflow-hidden relative"
          :style="{ backgroundColor: project.accentHex + '18' }"
        >
          <div class="w-full h-full flex items-center justify-center transition-transform duration-500 group-hover:scale-105">
            <span class="font-sans font-bold text-4xl" :style="{ color: project.accentHex + '60' }">
              {{ project.title.charAt(0) }}
            </span>
          </div>
        </div>

        <div class="p-6">
          <!-- Tags -->
          <div class="flex flex-wrap gap-3 mb-3">
            <span
              v-for="tag in project.tags"
              :key="tag"
              class="text-xs font-semibold tracking-widest uppercase text-accent"
            >
              {{ tag }}
            </span>
          </div>

          <!-- Title + link -->
          <h4 class="text-lg font-sans font-bold text-fg mb-2">
            <a
              v-if="project.link"
              :href="project.link"
              target="_blank"
              rel="noopener noreferrer"
              class="hover:text-accent transition-colors duration-300"
            >
              {{ project.title }}
            </a>
            <span v-else>{{ project.title }}</span>
          </h4>

          <!-- Description -->
          <p class="text-sm text-fg-secondary leading-relaxed">{{ project.description }}</p>
        </div>
      </article>
    </div>
  </section>
</template>
