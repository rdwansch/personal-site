<script setup lang="ts">

const { public: cfg } = useRuntimeConfig()

useSeo({
  description:
    'Ridhwan R Siddiq builds production interfaces used by sales teams, customers across 90+ countries, and multi-role booking products.',
  type: 'profile',
  jsonLd: {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    name: `${cfg.siteName} — Frontend Developer`,
    url: absoluteUrl('/'),
    about: { '@type': 'Person', name: cfg.fullName || cfg.siteName },
  },
})
</script>

<template>
  <div>
    <HeroSection />
    <WorkEvidence />
    <AboutSection />
    <ExperiencePreview />
    <ArticlesPreview />
    <ContactBanner />
  </div>
</template>
