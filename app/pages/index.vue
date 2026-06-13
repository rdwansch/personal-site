<script setup lang="ts">
const { public: cfg } = useRuntimeConfig()

useSeo({
  // No title → falls back to the default "<name> — Software Developer" template.
  description:
    'Ridhwan R Siddiq — software developer with 2 years building production React, Next.js, Vue and Nuxt apps. Clean interfaces, real-time systems, and code that lasts.',
  type: 'profile',
  jsonLd: {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    name: `${cfg.siteName} — Software Developer`,
    url: absoluteUrl('/'),
    about: { '@type': 'Person', name: cfg.fullName || cfg.siteName },
  },
})
</script>

<template>
  <div>
    <HeroSection />
    <AboutSection />
  </div>
</template>
