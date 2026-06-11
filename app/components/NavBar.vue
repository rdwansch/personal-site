<script setup lang="ts">
const links = [
  { label: 'Work', href: '#projects' },
  { label: 'About', href: '#about' },
  { label: 'Blog', href: '#blog' },
  { label: 'Contact', href: '#contact' },
]
</script>

<template>
  <nav class="sticky top-0 z-50 h-16 flex items-center justify-between px-6 lg:px-12 bg-brand-base/90 backdrop-blur-sm border-b border-brand-border">
    <!-- Wordmark -->
    <a href="#" class="font-display font-bold text-brand-dark text-lg hover:text-brand-violet transition-colors duration-300">
      RRS
    </a>

    <!-- Desktop links -->
    <ul class="hidden md:flex gap-8">
      <li v-for="link in links" :key="link.label">
        <a
          :href="link.href"
          class="relative text-xs font-semibold tracking-widest uppercase text-brand-text-secondary hover:text-brand-violet transition-colors duration-300 after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:bg-brand-violet after:transition-all after:duration-300 hover:after:w-full"
        >
          {{ link.label }}
        </a>
      </li>
    </ul>

    <!-- Mobile: simple text links -->
    <div class="flex md:hidden gap-5">
      <a
        v-for="link in links"
        :key="link.label"
        :href="link.href"
        class="text-xs font-semibold tracking-widest uppercase text-brand-text-secondary hover:text-brand-violet transition-colors duration-300"
      >
        {{ link.label }}
      </a>
    </div>
  </nav>
</template>
