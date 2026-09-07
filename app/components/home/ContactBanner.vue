<script setup lang="ts">
const { public: { email, github, linkedin } } = useRuntimeConfig()
</script>

<template>
  <section id="contact" class="contact-section" aria-labelledby="contact-title">
    <div class="contact-index">Contact</div>
    <div class="contact-copy">
      <h2 id="contact-title">Building a product with real users and complex workflows?</h2>
      <p>Bring the product context. I will bring frontend execution across React, Vue, and TypeScript.</p>
    </div>
    <div class="contact-actions">
      <a v-if="email" :href="`mailto:${email}`" class="email-link">Email Ridhwan</a>
      <a v-if="github" :href="github as string" target="_blank" rel="noopener noreferrer">GitHub</a>
      <a v-if="linkedin" :href="linkedin as string" target="_blank" rel="noopener noreferrer">LinkedIn</a>
    </div>
  </section>
</template>

<style scoped>
.contact-section {
  width: min(100%, 90rem);
  display: grid;
  grid-template-columns: minmax(8rem, 0.3fr) 1fr auto;
  gap: clamp(2rem, 5vw, 5rem);
  align-items: end;
  margin-inline: auto;
  padding: clamp(4rem, 8vw, 8rem) clamp(1.25rem, 4vw, 4rem);
  background: var(--color-fg);
  color: var(--color-surface-raised);
}

.contact-index {
  align-self: start;
  color: var(--color-highlight);
  font-family: var(--font-mono);
  font-size: 0.78rem;
}

.contact-copy h2 {
  max-width: 16ch;
  font-size: clamp(2.5rem, 5.5vw, 5.75rem);
  font-variation-settings: "wdth" 112, "wght" 700;
  letter-spacing: -0.06em;
  line-height: 0.95;
}

.contact-copy p {
  max-width: 38rem;
  margin-top: 2rem;
  color: var(--color-surface);
  line-height: 1.65;
}

.contact-actions {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: flex-start;
  color: var(--color-surface-raised);
  font-family: var(--font-mono);
  font-size: 0.78rem;
}

.contact-actions a {
  text-decoration: underline;
  text-underline-offset: 0.35rem;
}

.email-link {
  padding: 0.9rem 1rem;
  background: var(--color-highlight);
  color: var(--color-fg);
  text-decoration: none !important;
}

@media (max-width: 820px) {
  .contact-section {
    grid-template-columns: 1fr;
    align-items: start;
  }
}

@media (max-width: 640px) {
  .contact-section {
    padding-inline: 1rem;
  }
}
</style>
