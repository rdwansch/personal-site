<script setup lang="ts">
const { public: cfg } = useRuntimeConfig()
const displayName = (cfg.fullName as string) || 'Ridhwan R Siddiq'
const wordmark = displayName.split(' ')[0]

const links = [
  { label: 'Work', href: '/#work' },
  { label: 'Experience', href: '/experiences' },
  { label: 'Writing', href: '/articles' },
  { label: 'Contact', href: '/#contact' },
]
</script>

<template>
  <header class="site-header">
    <NuxtLink to="/" class="wordmark">{{ wordmark }}</NuxtLink>
    <nav aria-label="Main navigation">
      <NuxtLink
        v-for="link in links"
        :key="link.label"
        :to="link.href"
      >
        {{ link.label }}
      </NuxtLink>
    </nav>
  </header>
</template>

<style scoped>
.site-header {
  width: min(100%, 90rem);
  display: flex;
  justify-content: space-between;
  gap: 2rem;
  align-items: center;
  margin-inline: auto;
  padding: 1.25rem clamp(1.25rem, 4vw, 4rem);
  border-bottom: 1px solid var(--color-border);
}

.wordmark {
  flex: 0 0 auto;
  color: var(--color-fg);
  font-weight: 740;
  letter-spacing: -0.03em;
}

nav {
  display: flex;
  gap: clamp(1rem, 2.5vw, 2.25rem);
  align-items: center;
}

nav a {
  color: var(--color-fg-secondary);
  font-size: 0.82rem;
  text-decoration-color: transparent;
  text-decoration-thickness: 2px;
  text-underline-offset: 0.4rem;
}

nav a:hover,
nav a:focus-visible {
  color: var(--color-accent);
  text-decoration-color: currentColor;
}

@media (max-width: 640px) {
  .site-header {
    display: block;
    padding-inline: 1rem;
  }

  nav {
    margin-top: 1rem;
    padding-top: 0.85rem;
    border-top: 1px solid var(--color-border);
    overflow-x: auto;
  }
}
</style>
