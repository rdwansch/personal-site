<script setup lang="ts">
import { computed, ref } from 'vue'

const { public: { fullName } } = useRuntimeConfig()
const displayName = (fullName as string) || 'Ridhwan R Siddiq'

const { data: work } = await useAsyncData('home-featured-work', () =>
  queryCollection('work').first()
)

const activeProofId = ref('erp')
const proofs = computed(() => work.value?.featured ?? [])
const activeProof = computed(() =>
  proofs.value.find(proof => proof.id === activeProofId.value) ?? proofs.value[0]
)
</script>

<template>
  <section id="work" class="hero-shell" aria-labelledby="hero-title">
    <div class="identity-line">
      <p class="identity-name">{{ displayName }}</p>
      <p>Frontend Developer</p>
      <p class="identity-tenure">2 years in production</p>
    </div>

    <div class="hero-grid">
      <div class="hero-thesis">
        <h1 id="hero-title">
          Built for 15–20 sales reps daily, 90+ countries, and 60–80 booking screens.
        </h1>
        <p class="hero-stack">React / Next.js / Vue / Nuxt.js / TypeScript</p>
      </div>

      <aside class="proof-console" aria-label="Production work evidence">
        <div class="proof-selector" aria-label="Choose work evidence">
          <button
            v-for="proof in proofs"
            :key="proof.id"
            type="button"
            :aria-pressed="activeProofId === proof.id"
            aria-controls="active-proof-detail"
            :class="{ active: activeProofId === proof.id }"
            @click="activeProofId = proof.id"
          >
            <span>{{ proof.selector }}</span>
            <span class="selector-metric">{{ proof.metric }}</span>
          </button>
        </div>

        <div
          v-if="activeProof"
          id="active-proof-detail"
          :key="activeProof.id"
          class="proof-detail"
          aria-live="polite"
        >
          <p class="proof-context">{{ activeProof.metricLabel }}</p>
          <h2>{{ activeProof.title }}</h2>
          <p>{{ activeProof.summary }}</p>
          <p class="proof-stack">{{ activeProof.stack.join(' / ') }}</p>
        </div>
      </aside>
    </div>
  </section>
</template>

<style scoped>
.hero-shell {
  width: min(100%, 90rem);
  margin-inline: auto;
  padding: 2rem clamp(1.25rem, 4vw, 4rem) 0;
}

.identity-line {
  display: grid;
  grid-template-columns: 1fr auto auto;
  gap: 2rem;
  align-items: baseline;
  padding-block: 1rem;
  border-block: 1px solid var(--color-border);
  color: var(--color-fg-secondary);
  font-family: var(--font-mono);
  font-size: 0.78rem;
}

.identity-name {
  color: var(--color-fg);
  font-family: var(--font-sans);
  font-size: 1rem;
  font-weight: 700;
}

.hero-grid {
  display: grid;
  grid-template-columns: minmax(0, 1.7fr) minmax(17rem, 0.55fr);
  gap: clamp(3rem, 7vw, 8rem);
  align-items: end;
  padding-block: clamp(4.5rem, 9vw, 9rem);
}

.hero-thesis h1 {
  max-width: 19ch;
  margin: 0;
  color: var(--color-fg);
  font-size: clamp(3rem, 6.3vw, 6rem);
  font-variation-settings: "wdth" 112, "wght" 720;
  letter-spacing: -0.065em;
  line-height: 0.93;
}

.hero-stack,
.proof-stack {
  font-family: var(--font-mono);
}

.hero-stack {
  margin-top: 2.5rem;
  color: var(--color-fg-secondary);
  font-size: clamp(0.75rem, 1.1vw, 0.9rem);
}

.proof-console {
  border-left: 1px solid var(--color-border);
  padding-left: clamp(1.25rem, 2.5vw, 2.5rem);
}

.proof-selector {
  border-top: 1px solid var(--color-fg);
}

.proof-selector button {
  width: 100%;
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 1rem;
  align-items: center;
  padding: 0.95rem 0.75rem;
  border-bottom: 1px solid var(--color-border);
  color: var(--color-fg-secondary);
  text-align: left;
}

.proof-selector button:hover {
  color: var(--color-accent);
}

.proof-selector button.active {
  background: var(--color-highlight);
  color: var(--color-fg);
  font-weight: 650;
}

.selector-metric {
  font-family: var(--font-mono);
  font-size: 0.78rem;
}

.proof-detail {
  min-height: 17rem;
  padding: 2rem 0.75rem 0;
  animation: proof-scan 260ms cubic-bezier(0.22, 1, 0.36, 1) both;
}

.proof-context {
  color: var(--color-accent);
  font-family: var(--font-mono);
  font-size: 0.76rem;
}

.proof-detail h2 {
  margin-top: 1.25rem;
  font-size: clamp(1.7rem, 2.5vw, 2.35rem);
  font-variation-settings: "wdth" 108, "wght" 680;
  letter-spacing: -0.04em;
  line-height: 1;
}

.proof-detail > p:not(.proof-context, .proof-stack) {
  margin-top: 1.25rem;
  color: var(--color-fg-secondary);
  font-size: 0.95rem;
  line-height: 1.65;
}

.proof-stack {
  margin-top: 1.5rem;
  color: var(--color-fg);
  font-size: 0.7rem;
  line-height: 1.7;
}

@keyframes proof-scan {
  from {
    clip-path: inset(0 100% 0 0);
    transform: translateX(-0.5rem);
  }
  to {
    clip-path: inset(0);
    transform: translateX(0);
  }
}

@media (max-width: 900px) {
  .identity-line {
    grid-template-columns: 1fr auto;
  }

  .identity-tenure {
    grid-column: 1 / -1;
  }

  .hero-grid {
    grid-template-columns: 1fr;
    align-items: start;
  }

  .proof-console {
    border-top: 1px solid var(--color-border);
    border-left: 0;
    padding-top: 2rem;
    padding-left: 0;
  }

  .proof-selector {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
  }

  .proof-selector button {
    display: flex;
    min-height: 5rem;
    flex-direction: column;
    align-items: start;
    border-right: 1px solid var(--color-border);
  }

  .proof-selector button:last-child {
    border-right: 0;
  }

  .proof-detail {
    min-height: 14rem;
  }
}

@media (max-width: 640px) {
  .hero-shell {
    padding-inline: 1rem;
  }

  .identity-line {
    grid-template-columns: 1fr;
    gap: 0.35rem;
  }

  .identity-line p {
    grid-column: 1;
  }

  .hero-grid {
    gap: 3.5rem;
    padding-block: 4.5rem;
  }

  .hero-thesis h1 {
    max-width: none;
    font-size: clamp(2.65rem, 11vw, 4.25rem);
  }

  .proof-selector {
    grid-template-columns: 1fr;
  }

  .proof-selector button {
    min-height: auto;
    flex-direction: row;
    align-items: center;
    border-right: 0;
  }
}

@media (prefers-reduced-motion: reduce) {
  .proof-detail {
    animation: none;
  }
}
</style>
