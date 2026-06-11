<script setup lang="ts">
import { useStaggerReveal } from '~/composables/useStaggerReveal'

const { containerRef } = useStaggerReveal()

const projects = [
  {
    title: 'Personal Site',
    description: 'This site — a minimal, gallery-inspired portfolio built with Nuxt 3, Tailwind CSS, and Nuxt Content. Focused on clean motion and typographic hierarchy.',
    tags: ['Nuxt', 'Tailwind', 'TypeScript'],
    accent: '#7C6FAF',
    link: 'https://github.com/rdwansch/personal-site',
  },
  {
    title: 'UI Component Library',
    description: 'A set of accessible, composable Vue 3 components with a consistent design language. Built for reuse across projects with minimal configuration.',
    tags: ['Vue 3', 'TypeScript', 'Vite'],
    accent: '#4DA8A0',
    link: null,
  },
  {
    title: 'REST API Boilerplate',
    description: 'Production-ready Node.js API starter with authentication, validation, error handling, and structured logging baked in from day one.',
    tags: ['Node.js', 'Express', 'TypeScript'],
    accent: '#64748B',
    link: null,
  },
]
</script>

<template>
  <section id="projects" class="py-24 lg:py-32 px-6 lg:px-12 max-w-6xl mx-auto">
    <!-- Section header -->
    <div class="mb-12">
      <p class="text-xs font-semibold tracking-widest uppercase text-brand-violet mb-3">Selected Work</p>
      <h2 class="text-3xl lg:text-4xl font-display font-bold text-brand-dark tracking-tight">Projects</h2>
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
        class="group border border-brand-border bg-brand-base transition-shadow duration-300 ease-out-quart hover:shadow-md hover:shadow-slate-200 opacity-0"
        style="animation-fill-mode: forwards;"
      >
        <!-- Thumbnail -->
        <div
          class="aspect-video mb-0 overflow-hidden"
          :style="{ backgroundColor: project.accent + '18' }"
        >
          <div class="w-full h-full flex items-center justify-center">
            <span class="font-display font-bold text-2xl" :style="{ color: project.accent + '60' }">
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
              class="text-xs font-semibold tracking-widest uppercase text-brand-violet"
            >
              {{ tag }}
            </span>
          </div>

          <!-- Title + link -->
          <h4 class="text-lg font-display font-bold text-brand-dark mb-2">
            <a
              v-if="project.link"
              :href="project.link"
              target="_blank"
              rel="noopener noreferrer"
              class="hover:text-brand-violet transition-colors duration-300"
            >
              {{ project.title }}
            </a>
            <span v-else>{{ project.title }}</span>
          </h4>

          <!-- Description -->
          <p class="text-sm text-brand-text-secondary leading-relaxed">{{ project.description }}</p>
        </div>
      </article>
    </div>
  </section>
</template>
