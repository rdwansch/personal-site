<script setup lang="ts">
const { public: cfg } = useRuntimeConfig()
const displayName = (cfg.fullName as string) || 'Ridhwan R Siddiq'
</script>

<template>
  <footer>
    <p>{{ displayName }}</p>
    <p class="footer-meta">Frontend Developer / {{ new Date().getFullYear() }}</p>
    <div class="footer-links">
      <a v-if="cfg.github" :href="cfg.github as string" target="_blank" rel="noopener noreferrer">GitHub</a>
      <a v-if="cfg.linkedin" :href="cfg.linkedin as string" target="_blank" rel="noopener noreferrer">LinkedIn</a>
    </div>
  </footer>
</template>

<style scoped>
footer {
  width: min(100%, 90rem);
  display: grid;
  grid-template-columns: 1fr auto auto;
  gap: 2rem;
  align-items: baseline;
  margin-inline: auto;
  padding: 2rem clamp(1.25rem, 4vw, 4rem);
  border-top: 1px solid var(--color-border);
  color: var(--color-fg);
}

.footer-meta,
.footer-links {
  color: var(--color-fg-secondary);
  font-family: var(--font-mono);
  font-size: 0.72rem;
}

.footer-links {
  display: flex;
  gap: 1.25rem;
}

.footer-links a:hover {
  color: var(--color-accent);
}

@media (max-width: 640px) {
  footer {
    grid-template-columns: 1fr;
    gap: 0.65rem;
    padding-inline: 1rem;
  }
}
</style>
