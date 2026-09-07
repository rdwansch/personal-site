<script setup lang="ts">
const { data: about } = await useAsyncData('about', () =>
  queryCollection('about').first()
)
</script>

<template>
  <section id="about" class="section-shell about-section" aria-labelledby="about-title">
    <header class="section-heading">
      <p>Working range</p>
      <h2 id="about-title">Frontend delivery across product surfaces.</h2>
    </header>

    <div class="about-grid">
      <div class="bio-copy">
        <p v-for="paragraph in about?.bio" :key="paragraph">{{ paragraph }}</p>
      </div>

      <div class="skill-ledger" aria-label="Technical capabilities">
        <div v-for="group in about?.skills" :key="group.category" class="skill-row">
          <h3>{{ group.category }}</h3>
          <p>{{ group.items.join(' / ') }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.about-section {
  padding-block: clamp(5rem, 10vw, 9rem);
}

.section-heading {
  display: grid;
  grid-template-columns: minmax(9rem, 0.35fr) 1fr;
  gap: 3rem;
  align-items: start;
  padding-bottom: clamp(3rem, 6vw, 5rem);
}

.section-heading > p {
  color: var(--color-accent);
  font-family: var(--font-mono);
  font-size: 0.78rem;
}

.section-heading h2 {
  max-width: 17ch;
  font-size: clamp(2.5rem, 5.5vw, 5.75rem);
  font-variation-settings: "wdth" 112, "wght" 700;
  letter-spacing: -0.06em;
  line-height: 0.95;
}

.about-grid {
  display: grid;
  grid-template-columns: minmax(0, 0.75fr) minmax(0, 1.25fr);
  gap: clamp(3rem, 8vw, 8rem);
}

.bio-copy {
  font-size: clamp(1.05rem, 1.6vw, 1.35rem);
  line-height: 1.65;
}

.bio-copy p + p {
  margin-top: 1.5rem;
  color: var(--color-fg-secondary);
}

.skill-ledger {
  border-top: 1px solid var(--color-fg);
}

.skill-row {
  display: grid;
  grid-template-columns: minmax(8rem, 0.35fr) 1fr;
  gap: 2rem;
  padding-block: 1.3rem;
  border-bottom: 1px solid var(--color-border);
}

.skill-row h3 {
  font-size: 0.9rem;
  font-weight: 700;
}

.skill-row p {
  color: var(--color-fg-secondary);
  font-family: var(--font-mono);
  font-size: 0.73rem;
  line-height: 1.7;
}

@media (max-width: 760px) {
  .section-heading,
  .about-grid {
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  .skill-row {
    grid-template-columns: 1fr;
    gap: 0.65rem;
  }
}
</style>
