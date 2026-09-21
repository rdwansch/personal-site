<script setup lang="ts">
const { public: cfg } = useRuntimeConfig()
const displayName = (cfg.fullName as string) || 'Ridhwan R Siddiq'
const wordmark = displayName.split(' ')[0]

const links = [
  { label: 'Work', href: '/#work' },
  { label: 'Experience', href: '/experiences' },
  { label: 'Notes', href: '/articles' },
  { label: 'Say hi', href: '/#contact' },
]
</script>

<template>
  <header class="site-header">
    <NuxtLink to="/" class="wordmark">{{ wordmark }}<span> makes websites.</span></NuxtLink>
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
  position: sticky;
  top: 0.75rem;
  z-index: 20;
  width: min(100%, 96rem);
  min-height: var(--site-header-height);
  background: color-mix(in srgb, var(--color-ink) 72%, transparent);
  border: 1px solid color-mix(in srgb, var(--color-paper) 24%, transparent);
  border-radius: 1.25rem;
  box-shadow: 0 0.75rem 2.5rem color-mix(in srgb, var(--color-ink) 48%, transparent);
  backdrop-filter: blur(1.5rem) saturate(150%);
  -webkit-backdrop-filter: blur(1.5rem) saturate(150%);
  display: flex;
  justify-content: space-between;
  gap: 2rem;
  align-items: center;
  margin: 0.75rem auto 0;
  padding: 1rem clamp(1.25rem, 4vw, 4rem);
}

.wordmark {
  flex: 0 0 auto;
  color: var(--color-fg);
  font-family: var(--font-display);
  font-weight: 650;
  letter-spacing: -0.03em;
}
.wordmark span { color: var(--color-fg-secondary); font-family: var(--font-sans); font-size: 0.9rem; font-weight: 400; letter-spacing: 0; }

nav {
  display: flex;
  gap: clamp(1rem, 2.5vw, 2.25rem);
  align-items: center;
}

nav a {
  color: var(--color-fg-secondary);
  font-size: 0.9rem;
  min-height: 2rem;
  display: inline-flex;
  align-items: center;
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
    top: 0.5rem;
    border-radius: 1rem;
    padding: 0.6rem 1rem;
  }

  nav {
    margin-top: 0.6rem;
    padding-top: 0.5rem;
    overflow-x: auto;
  }
}
</style>
