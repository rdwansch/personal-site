<script setup lang="ts">
const { data: work } = await useAsyncData('work', () =>
  queryCollection('work').first()
)
</script>

<template>
  <div class="min-h-screen">
    <section class="py-24 lg:py-32 px-6 lg:px-12 max-w-6xl mx-auto">
      <div class="mb-12">
        <p class="text-xs font-semibold tracking-widest uppercase text-accent mb-3">Experience</p>
        <h2 class="text-3xl lg:text-4xl font-sans font-bold text-fg tracking-tight">Work</h2>
      </div>

      <div class="space-y-16">
        <article
          v-for="job in work?.experience"
          :key="job.company"
          class="grid grid-cols-1 lg:grid-cols-4 gap-4 lg:gap-12"
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

    <ProjectsSection />
  </div>
</template>
