<script setup lang="ts">
const skills = [
  { category: 'Frontend', items: ['Vue 3', 'Nuxt', 'React', 'TypeScript', 'Tailwind CSS'] },
  { category: 'Backend', items: ['Node.js', 'Express', 'REST APIs'] },
  { category: 'Tools', items: ['Git', 'Figma', 'Vercel', 'Vite'] },
]
</script>

<template>
  <section id="about" class="py-24 lg:py-32 px-6 lg:px-12 max-w-6xl mx-auto">
    <!-- Section header -->
    <div class="mb-12">
      <p class="text-xs font-semibold tracking-widest uppercase text-brand-violet mb-3">Background</p>
      <h2 class="text-3xl lg:text-4xl font-display font-bold text-brand-dark tracking-tight">About</h2>
    </div>

    <!-- Two-column layout: story + skills -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
      <!-- Story -->
      <div class="space-y-5">
        <p class="text-base lg:text-lg text-brand-text-primary leading-relaxed">
          I'm a frontend developer focused on building clean, performant web experiences. I care about the details — smooth interactions, readable code, and interfaces that just work.
        </p>
        <p class="text-base lg:text-lg text-brand-text-secondary leading-relaxed">
          My work sits at the intersection of design and engineering. I like turning well-thought-out designs into precise implementations, and I'm comfortable owning a feature from concept to deployment.
        </p>
        <p class="text-base lg:text-lg text-brand-text-secondary leading-relaxed">
          When I'm not building things, I'm usually reading about new web platform features or thinking about how to make software feel less like software.
        </p>
      </div>

      <!-- Skills -->
      <div class="space-y-8">
        <div v-for="group in skills" :key="group.category">
          <p class="text-xs font-semibold tracking-widest uppercase text-brand-text-tertiary mb-3">
            {{ group.category }}
          </p>
          <div class="flex flex-wrap gap-2">
            <span
              v-for="skill in group.items"
              :key="skill"
              class="border border-brand-border px-3 py-1 text-sm text-brand-text-secondary font-body hover:border-brand-violet hover:text-brand-violet transition-colors duration-300"
            >
              {{ skill }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
