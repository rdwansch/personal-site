<script setup lang="ts">
import { ref, onMounted } from 'vue'

const { public: { email, github, linkedin } } = useRuntimeConfig()

const root = ref<HTMLElement | null>(null)

onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target) } }),
    { threshold: 0.2 }
  )
  if (root.value) root.value.querySelectorAll('.reveal').forEach(el => observer.observe(el))
})
</script>

<template>
  <section ref="root" class="py-24 lg:py-32 px-6 lg:px-12 max-w-6xl mx-auto">
    <div
      class="relative overflow-hidden rounded-3xl border border-border bg-raised px-8 py-16 lg:px-16 lg:py-24 text-center reveal"
    >
      <div class="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-accent to-teal" />
      <div class="absolute top-0 left-0 w-64 h-64 rounded-full bg-accent/10 blur-3xl pointer-events-none" />
      <div class="absolute bottom-0 right-0 w-72 h-72 rounded-full bg-teal/10 blur-3xl pointer-events-none" />

      <p class="relative text-xs font-semibold tracking-widest uppercase text-teal mb-4">Let's talk</p>
      <h2 class="relative text-3xl lg:text-5xl font-sans font-bold text-fg tracking-tight mb-6">
        Have a project in mind?
      </h2>
      <p class="relative text-fg-secondary text-base lg:text-lg max-w-xl mx-auto leading-relaxed mb-10">
        I'm open to new opportunities, collaborations, or just a conversation about something interesting. Drop me a line.
      </p>

      <div class="relative flex flex-col sm:flex-row items-center justify-center gap-4">
        <a
          :href="`mailto:${email}`"
          class="bg-gradient-to-r from-accent to-teal text-white px-8 py-3.5 font-semibold tracking-widest uppercase text-xs transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-accent/25 active:translate-y-0"
        >
          Email Me
        </a>
        <div class="flex gap-6">
          <a
            v-if="github"
            :href="github"
            target="_blank"
            rel="noopener noreferrer"
            class="relative text-xs font-semibold tracking-widest uppercase text-fg-secondary hover:text-accent transition-colors duration-300"
          >
            GitHub
          </a>
          <a
            v-if="linkedin"
            :href="linkedin"
            target="_blank"
            rel="noopener noreferrer"
            class="relative text-xs font-semibold tracking-widest uppercase text-fg-secondary hover:text-accent transition-colors duration-300"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </div>
  </section>
</template>
