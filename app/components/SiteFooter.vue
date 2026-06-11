<template>
  <footer class="border-t border-border px-6 lg:px-12 py-8 max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
    <span class="font-sans font-bold text-fg">RRS</span>
    <p class="text-xs text-fg-tertiary tracking-wide">
      © {{ new Date().getFullYear() }} Ridhwan R Siddiq
    </p>
    <div class="flex gap-6">
      <a
        href="https://github.com/rdwansch"
        target="_blank"
        rel="noopener noreferrer"
        class="text-xs font-semibold tracking-widest uppercase text-fg-tertiary hover:text-accent transition-colors duration-300"
      >
        GitHub
      </a>
      <a
        href="https://linkedin.com/in/rdwansch"
        target="_blank"
        rel="noopener noreferrer"
        class="text-xs font-semibold tracking-widest uppercase text-fg-tertiary hover:text-accent transition-colors duration-300"
      >
        LinkedIn
      </a>
    </div>
  </footer>
</template>
