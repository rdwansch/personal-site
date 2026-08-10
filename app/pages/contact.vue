<script setup lang="ts">
const { public: cfg } = useRuntimeConfig()

useSeo({
  title: 'Contact',
  description:
    'Get in touch with Ridhwan R Siddiq — open to new opportunities, collaborations and conversations. Reach out by email, GitHub or LinkedIn.',
})
</script>

<template>
  <main class="bg-surface">
    <section class="mx-auto flex min-h-[calc(100svh-5rem)] max-w-6xl flex-col justify-center px-5 py-24 sm:px-8 sm:py-28 lg:px-12 lg:py-32">
      <div class="max-w-2xl">
        <p class="mb-5 text-xs font-semibold uppercase tracking-[0.28em] text-teal">Get in touch</p>
        <h1 class="text-5xl font-sans font-bold leading-[0.95] tracking-[-0.05em] text-fg sm:text-7xl lg:text-8xl">
          Let's talk.
        </h1>
        <p class="mt-8 max-w-xl border-l-2 border-accent pl-5 text-base leading-[1.8] text-fg-secondary sm:pl-6 lg:text-lg">
          Open to new opportunities, collaborations, or a conversation about something interesting. Drop me a line.
        </p>
      </div>

      <div class="mt-14 grid max-w-3xl gap-4 sm:grid-cols-3 sm:gap-5 lg:mt-20">
        <a
          v-if="cfg.linkedin"
          :href="cfg.linkedin"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Connect on LinkedIn"
          class="social-button social-button--linkedin"
        >
          <svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor" class="social-button__icon">
            <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.35V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.26 2.37 4.26 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM3.56 20.45h3.57V9H3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0Z" />
          </svg>
          <span>LinkedIn</span>
          <span aria-hidden="true">↗</span>
        </a>
        <a
          v-if="cfg.github"
          :href="cfg.github"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="View GitHub profile"
          class="social-button social-button--github"
        >
          <svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor" class="social-button__icon">
            <path d="M12 .3a12 12 0 0 0-3.79 23.39c.6.11.82-.26.82-.58v-2.04c-3.34.73-4.04-1.61-4.04-1.61-.55-1.4-1.34-1.77-1.34-1.77-1.09-.75.08-.74.08-.74 1.2.08 1.83 1.24 1.83 1.24 1.07 1.83 2.8 1.3 3.49.99.11-.77.42-1.3.76-1.6-2.67-.3-5.47-1.34-5.47-5.95 0-1.31.47-2.38 1.24-3.22-.12-.3-.54-1.52.12-3.17 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.29-1.55 3.3-1.23 3.3-1.23.66 1.65.24 2.87.12 3.17.77.84 1.24 1.91 1.24 3.22 0 4.62-2.81 5.64-5.49 5.94.43.37.81 1.1.81 2.22v3.29c0 .32.22.69.83.57A12 12 0 0 0 12 .3Z" />
          </svg>
          <span>GitHub</span>
          <span aria-hidden="true">↗</span>
        </a>
        <a
          v-if="cfg.email"
          :href="`mailto:${cfg.email}`"
          aria-label="Send an email"
          class="social-button social-button--email"
        >
          <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" class="social-button__icon">
            <rect x="3" y="5" width="18" height="14" rx="1.5" />
            <path d="m3 7 9 6 9-6" />
          </svg>
          <span>Email</span>
          <span aria-hidden="true">↗</span>
        </a>
      </div>
    </section>
  </main>
</template>

<style scoped>
.social-button {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  min-height: 4rem;
  padding: 0.9rem 1.1rem;
  border: 1px solid currentColor;
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  opacity: 0.55;
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.social-button__icon {
  width: 1.25rem;
  height: 1.25rem;
  flex: 0 0 auto;
}

.social-button > span:first-of-type {
  margin-right: auto;
}

.social-button:hover {
  opacity: 1;
  transform: translateY(-3px);
}

.social-button--linkedin {
  background-color: color-mix(in srgb, #0a66c2 14%, transparent);
  color: #0a66c2;
}

.social-button--github {
  background-color: color-mix(in srgb, #24292f 14%, transparent);
  color: #24292f;
}

.social-button--email {
  background-color: color-mix(in srgb, var(--color-accent) 14%, transparent);
  color: var(--color-accent);
}

.dark .social-button--github {
  color: #f0f6fc;
}
</style>
