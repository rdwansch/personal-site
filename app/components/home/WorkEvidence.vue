<script setup lang="ts">
const { data: work } = await useAsyncData('home-work-evidence', () =>
  queryCollection('work').first()
)
</script>

<template>
  <section class="work-shell" aria-labelledby="evidence-title">
    <header class="evidence-heading">
      <h2 id="evidence-title">Proof from production</h2>
      <p>Three systems, three different interface problems.</p>
    </header>

    <div class="evidence-stack">
      <article
        v-for="proof in work?.featured"
        :id="`case-${proof.id}`"
        :key="proof.id"
        class="evidence-case"
        :class="`case-${proof.id}`"
      >
        <div class="case-heading">
          <div>
            <p class="case-kind">{{ proof.selector }}</p>
            <h3>{{ proof.title }}</h3>
          </div>
          <p class="case-metric">
            <strong>{{ proof.metric }}</strong>
            <span>{{ proof.metricLabel }}</span>
          </p>
        </div>

        <div v-if="proof.id === 'erp'" class="workflow-track" aria-label="ERP workflow scope">
          <div v-for="detail in proof.details" :key="detail">
            <span>{{ detail }}</span>
          </div>
        </div>

        <div v-else-if="proof.id === 'global'" class="global-record">
          <p class="locale-pair">EN <span>/</span> ID</p>
          <ul>
            <li v-for="detail in proof.details" :key="detail">{{ detail }}</li>
          </ul>
        </div>

        <div v-else class="role-matrix" aria-label="Booking platform roles">
          <div v-for="detail in proof.details" :key="detail">
            <span>{{ detail }}</span>
          </div>
        </div>

        <div class="case-notes">
          <p>{{ proof.summary }}</p>
          <p class="case-stack">{{ proof.stack.join(' / ') }}</p>
        </div>
      </article>
    </div>
  </section>
</template>

<style scoped>
.work-shell {
  width: min(100%, 90rem);
  margin-inline: auto;
  padding-inline: clamp(1.25rem, 4vw, 4rem);
}

.evidence-heading {
  display: flex;
  justify-content: space-between;
  gap: 2rem;
  align-items: end;
  padding: 2rem 0 1.25rem;
  border-top: 1px solid var(--color-fg);
}

.evidence-heading h2 {
  font-size: clamp(1.75rem, 3vw, 2.75rem);
  font-variation-settings: "wdth" 110, "wght" 680;
  letter-spacing: -0.04em;
}

.evidence-heading p {
  max-width: 24rem;
  color: var(--color-fg-secondary);
}

.evidence-case {
  min-height: 31rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: clamp(1.5rem, 4vw, 4rem);
}

.case-heading {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  gap: 2rem;
  align-items: start;
}

.case-kind {
  color: var(--color-accent);
  font-family: var(--font-mono);
  font-size: 0.76rem;
}

.case-heading h3 {
  max-width: 18ch;
  margin-top: 0.65rem;
  font-size: clamp(2.25rem, 5vw, 5.5rem);
  font-variation-settings: "wdth" 110, "wght" 720;
  letter-spacing: -0.06em;
  line-height: 0.94;
}

.case-metric {
  width: min-content;
  font-family: var(--font-mono);
}

.case-metric strong {
  display: block;
  font-size: clamp(2.5rem, 5vw, 5rem);
  font-weight: 400;
  letter-spacing: -0.08em;
  line-height: 0.9;
}

.case-metric span {
  display: block;
  width: 13ch;
  margin-top: 0.75rem;
  font-size: 0.72rem;
  line-height: 1.45;
}

.case-erp {
  background: var(--color-surface-raised);
}

.workflow-track {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  margin-block: clamp(4rem, 9vw, 8rem);
  border-block: 1px solid var(--color-fg);
}

.workflow-track div {
  position: relative;
  padding: 2rem 1.25rem;
  border-right: 1px solid var(--color-border);
}

.workflow-track div:last-child {
  border-right: 0;
}

.workflow-track div::before {
  content: "";
  position: absolute;
  top: -0.42rem;
  left: 1.25rem;
  width: 0.75rem;
  height: 0.75rem;
  background: var(--color-accent);
}

.workflow-track span,
.role-matrix span {
  font-weight: 650;
}

.case-global {
  background: var(--color-highlight);
}

.case-global .case-kind {
  color: var(--color-fg);
}

.global-record {
  display: grid;
  grid-template-columns: minmax(11rem, 0.65fr) 1fr;
  gap: 3rem;
  align-items: end;
  margin-block: clamp(3rem, 7vw, 6rem);
}

.locale-pair {
  font-family: var(--font-mono);
  font-size: clamp(3rem, 8vw, 8rem);
  letter-spacing: -0.1em;
  line-height: 0.85;
}

.locale-pair span {
  color: var(--color-accent);
}

.global-record ul {
  border-top: 1px solid var(--color-fg);
}

.global-record li {
  padding: 1rem 0;
  border-bottom: 1px solid var(--color-border);
}

.case-booking {
  background: var(--color-accent);
  color: var(--color-surface-raised);
}

.case-booking .case-kind,
.case-booking .case-notes,
.case-booking .case-stack {
  color: var(--color-surface-raised);
}

.role-matrix {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  margin-block: clamp(4rem, 9vw, 8rem);
  border: 1px solid rgba(248, 251, 250, 0.75);
}

.role-matrix div {
  min-height: 10rem;
  display: flex;
  align-items: end;
  padding: 1.25rem;
  border-right: 1px solid rgba(248, 251, 250, 0.5);
}

.role-matrix div:last-child {
  border-right: 0;
}

.case-notes {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(15rem, 0.55fr);
  gap: 3rem;
  align-items: end;
  color: var(--color-fg-secondary);
  line-height: 1.65;
}

.case-stack {
  font-family: var(--font-mono);
  font-size: 0.72rem;
}

@media (max-width: 640px) {
  .work-shell {
    padding-inline: 1rem;
  }

  .evidence-heading {
    display: block;
  }

  .evidence-heading p {
    margin-top: 0.75rem;
  }

  .evidence-case {
    min-height: 0;
    padding-block: 2.5rem;
  }

  .case-heading,
  .case-notes,
  .global-record {
    grid-template-columns: 1fr;
  }

  .case-heading {
    gap: 2.5rem;
  }

  .case-metric strong {
    font-size: 3.5rem;
  }

  .workflow-track,
  .role-matrix {
    grid-template-columns: 1fr;
    margin-block: 3.5rem;
  }

  .workflow-track div,
  .role-matrix div {
    min-height: auto;
    border-right: 0;
    border-bottom: 1px solid var(--color-border);
  }

  .workflow-track div:last-child,
  .role-matrix div:last-child {
    border-bottom: 0;
  }

  .case-notes,
  .global-record {
    gap: 2rem;
  }

  .locale-pair {
    font-size: 4rem;
  }
}
</style>
