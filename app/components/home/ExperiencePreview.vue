<script setup lang="ts">
const { data: work } = await useAsyncData('home-experience', () =>
  queryCollection('work').first()
)
</script>

<template>
  <section class="experience-section" aria-labelledby="experience-title">
    <div class="section-shell">
      <header class="experience-heading">
        <h2 id="experience-title">Experience</h2>
        <NuxtLink to="/experiences">View full history</NuxtLink>
      </header>

      <ol class="experience-list">
        <li v-for="job in work?.experience" :key="`${job.company}-${job.period}`">
          <time>{{ job.period }}</time>
          <div class="job-title">
            <h3>{{ job.role }}</h3>
            <p>{{ job.company }}, {{ job.location }}</p>
          </div>
          <div class="job-detail">
            <p>{{ job.highlights[0]?.text }}</p>
            <p class="job-stack">{{ job.highlights[0]?.stack }}</p>
          </div>
        </li>
      </ol>
    </div>
  </section>
</template>

<style scoped>
.experience-section {
  background: var(--color-surface-raised);
}

.section-shell {
  padding-block: clamp(5rem, 10vw, 9rem);
}

.experience-heading {
  display: flex;
  justify-content: space-between;
  gap: 2rem;
  align-items: end;
  margin-bottom: clamp(3rem, 6vw, 5rem);
}

.experience-heading h2 {
  font-size: clamp(2.5rem, 6vw, 6rem);
  font-variation-settings: "wdth" 112, "wght" 720;
  letter-spacing: -0.06em;
  line-height: 0.9;
}

.experience-heading a {
  color: var(--color-accent);
  text-decoration: underline;
  text-decoration-thickness: 2px;
  text-underline-offset: 0.35rem;
}

.experience-list {
  border-top: 1px solid var(--color-fg);
}

.experience-list li {
  display: grid;
  grid-template-columns: minmax(9rem, 0.4fr) minmax(13rem, 0.7fr) 1.3fr;
  gap: clamp(1.5rem, 4vw, 4rem);
  padding-block: 2rem;
  border-bottom: 1px solid var(--color-border);
}

.experience-list time,
.job-stack {
  font-family: var(--font-mono);
  font-size: 0.72rem;
  line-height: 1.6;
}

.job-title h3 {
  font-size: 1.15rem;
  font-weight: 720;
}

.job-title p,
.job-detail,
.experience-list time {
  color: var(--color-fg-secondary);
}

.job-title p {
  margin-top: 0.35rem;
  font-size: 0.88rem;
}

.job-detail > p:first-child {
  line-height: 1.6;
}

.job-stack {
  margin-top: 1rem;
  color: var(--color-fg);
}

@media (max-width: 800px) {
  .experience-list li {
    grid-template-columns: 1fr 1fr;
  }

  .job-detail {
    grid-column: 1 / -1;
  }
}

@media (max-width: 540px) {
  .experience-heading {
    display: block;
  }

  .experience-heading a {
    display: inline-block;
    margin-top: 1.5rem;
  }

  .experience-list li {
    grid-template-columns: 1fr;
  }

  .job-detail {
    grid-column: auto;
  }
}
</style>
