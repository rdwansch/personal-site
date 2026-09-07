<script setup lang="ts">
const { data: posts } = await useAsyncData('home-articles', () =>
  queryCollection('blog').order('date', 'DESC').limit(3).all()
)

const published = computed(() =>
  (posts.value ?? []).filter((post: any) => post.draft !== true && post.meta?.draft !== true)
)
</script>

<template>
  <section class="section-shell articles-section" aria-labelledby="articles-title">
    <header class="articles-heading">
      <div>
        <p>Engineering notes</p>
        <h2 id="articles-title">Writing</h2>
      </div>
      <NuxtLink to="/articles">Read all articles</NuxtLink>
    </header>

    <div class="article-list">
      <article v-for="post in published" :key="post.path">
        <time v-if="post.date">
          {{ new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) }}
        </time>
        <div>
          <h3>
            <NuxtLink :to="`/read/${post.path.split('/').pop()}`">{{ post.title }}</NuxtLink>
          </h3>
          <p>{{ post.description }}</p>
        </div>
        <p class="article-tags">{{ post.tags?.join(' / ') }}</p>
      </article>
    </div>
  </section>
</template>

<style scoped>
.articles-section {
  padding-block: clamp(5rem, 10vw, 9rem);
}

.articles-heading {
  display: flex;
  justify-content: space-between;
  gap: 2rem;
  align-items: end;
  margin-bottom: clamp(3rem, 6vw, 5rem);
}

.articles-heading p {
  margin-bottom: 0.75rem;
  color: var(--color-accent);
  font-family: var(--font-mono);
  font-size: 0.76rem;
}

.articles-heading h2 {
  font-size: clamp(2.5rem, 6vw, 6rem);
  font-variation-settings: "wdth" 112, "wght" 720;
  letter-spacing: -0.06em;
  line-height: 0.9;
}

.articles-heading > a {
  color: var(--color-accent);
  text-decoration: underline;
  text-decoration-thickness: 2px;
  text-underline-offset: 0.35rem;
}

.article-list {
  border-top: 1px solid var(--color-fg);
}

.article-list article {
  display: grid;
  grid-template-columns: minmax(8rem, 0.3fr) 1fr minmax(8rem, 0.35fr);
  gap: clamp(1.5rem, 4vw, 4rem);
  padding-block: 2rem;
  border-bottom: 1px solid var(--color-border);
}

.article-list time,
.article-tags {
  color: var(--color-fg-secondary);
  font-family: var(--font-mono);
  font-size: 0.72rem;
  line-height: 1.6;
}

.article-list h3 {
  font-size: clamp(1.25rem, 2vw, 1.8rem);
  font-weight: 680;
  letter-spacing: -0.025em;
  line-height: 1.15;
}

.article-list h3 a:hover {
  color: var(--color-accent);
  text-decoration: underline;
  text-underline-offset: 0.25rem;
}

.article-list div > p {
  max-width: 43rem;
  margin-top: 0.7rem;
  color: var(--color-fg-secondary);
  line-height: 1.6;
}

@media (max-width: 720px) {
  .article-list article {
    grid-template-columns: 1fr;
    gap: 0.85rem;
  }
}

@media (max-width: 540px) {
  .articles-heading {
    display: block;
  }

  .articles-heading > a {
    display: inline-block;
    margin-top: 1.5rem;
  }
}
</style>
