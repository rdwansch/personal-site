<script setup lang="ts">
const { public: { email, linkedin, github } } = useRuntimeConfig()
</script>

<template>
  <section id="contact" class="py-24 lg:py-32 px-6 lg:px-12 max-w-6xl mx-auto border-t border-border">
    <div class="max-w-xl">
      <p class="text-xs font-semibold tracking-widest uppercase text-accent mb-3">Get in Touch</p>
      <h2 class="text-3xl lg:text-4xl font-sans font-bold text-fg tracking-tight mb-6">Contact</h2>
      <p class="text-base lg:text-lg text-fg-secondary leading-relaxed mb-10">
        Open to new opportunities, collaborations, or just a conversation about something interesting. Drop me a line.
      </p>

      <a
        :href="`mailto:${email}`"
        class="inline-block bg-accent text-white px-8 py-3.5 font-semibold tracking-widest uppercase text-xs transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-accent/25 mb-10"
      >
        {{ email }}
      </a>

      <div class="flex gap-6">
        <a
          :href="github"
          target="_blank"
          rel="noopener noreferrer"
          class="relative text-xs font-semibold tracking-widest uppercase text-fg-secondary hover:text-accent transition-colors duration-300 after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:bg-accent after:transition-all after:duration-300 hover:after:w-full"
        >
          GitHub
        </a>
        <a
          :href="linkedin"
          target="_blank"
          rel="noopener noreferrer"
          class="relative text-xs font-semibold tracking-widest uppercase text-fg-secondary hover:text-accent transition-colors duration-300 after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:bg-accent after:transition-all after:duration-300 hover:after:w-full"
        >
          LinkedIn
        </a>
      </div>
    </div>
  </section>
</template>
