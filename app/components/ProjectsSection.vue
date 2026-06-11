<script setup lang="ts">
import { useStaggerReveal } from '~/composables/useStaggerReveal'

const { containerRef } = useStaggerReveal()

const projects = [
  {
    title: 'Project One',
    description: 'A short description of what this project does and the problem it solves.',
    tags: ['Vue', 'Nuxt', 'Tailwind'],
    image: null,
  },
  {
    title: 'Project Two',
    description: 'A short description of what this project does and the problem it solves.',
    tags: ['TypeScript', 'Node.js'],
    image: null,
  },
  {
    title: 'Project Three',
    description: 'A short description of what this project does and the problem it solves.',
    tags: ['React', 'CSS'],
    image: null,
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
        class="border border-brand-border bg-brand-base p-6 transition-shadow duration-300 ease-out-quart hover:shadow-md hover:shadow-slate-200 opacity-0"
        style="animation-fill-mode: forwards;"
      >
        <!-- Thumbnail -->
        <div class="aspect-video bg-slate-100 mb-4 overflow-hidden">
          <img
            v-if="project.image"
            :src="project.image"
            :alt="project.title"
            class="w-full h-full object-cover"
          />
          <div v-else class="w-full h-full flex items-center justify-center">
            <span class="text-brand-text-tertiary text-xs font-semibold tracking-widest uppercase">Image</span>
          </div>
        </div>

        <!-- Tags -->
        <div class="flex flex-wrap gap-2 mb-3">
          <span
            v-for="tag in project.tags"
            :key="tag"
            class="text-xs font-semibold tracking-widest uppercase text-brand-violet"
          >
            {{ tag }}
          </span>
        </div>

        <!-- Title -->
        <h4 class="text-lg font-display font-bold text-brand-dark mb-2">{{ project.title }}</h4>

        <!-- Description -->
        <p class="text-sm text-brand-text-secondary leading-relaxed">{{ project.description }}</p>
      </article>
    </div>
  </section>
</template>
