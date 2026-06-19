<script setup lang="ts">
import { ref, computed, onMounted, watch, nextTick } from 'vue'

const { data: posts } = await useAsyncData('blog-posts', () =>
  queryCollection('blog').order('date', 'DESC').all()
)

const query = ref('')

const published = computed(() =>
  (posts.value ?? []).filter(p => p.meta?.draft !== true)
)

const filtered = computed(() => {
  const q = query.value.trim().toLowerCase()
  if (!q) return [...published.value]
  return published.value.filter(p =>
    p.title?.toLowerCase().includes(q) ||
    p.description?.toLowerCase().includes(q) ||
    p.tags?.some((t: string) => t.toLowerCase().includes(q))
  )
})

const observeReveal = () => {
  const observer = new IntersectionObserver(
    (entries) => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target) } }),
    { threshold: 0.1 }
  )
  document.querySelectorAll('#blog .reveal:not(.visible)').forEach(el => observer.observe(el))
}

onMounted(observeReveal)

watch(filtered, async () => {
  await nextTick()
  observeReveal()
})
</script>

<template>
  <section id="blog" class="py-24 lg:py-32 px-6 lg:px-12 max-w-6xl mx-auto border-t border-border">
    <!-- Section header + search inline -->
    <div class="mb-10 reveal">
      <div class="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <div>
          <p class="text-xs font-semibold tracking-widest uppercase text-accent mb-3">Writing</p>
          <h2 class="text-3xl lg:text-4xl font-sans font-bold text-fg tracking-tight">Articles</h2>
        </div>
        <div class="relative w-full sm:max-w-xs shrink-0">
          <svg
            class="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-fg-tertiary pointer-events-none"
            fill="none" stroke="currentColor" viewBox="0 0 24 24"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
          </svg>
          <input
            v-model="query"
            type="search"
            placeholder="Search articles…"
            class="search-input w-full pl-9 pr-4 py-2.5 text-sm bg-transparent border border-border text-fg placeholder:text-fg-tertiary focus:outline-none focus:border-accent transition-colors duration-200"
            aria-label="Search articles"
          />
          <button
            v-if="query"
            class="absolute right-3 top-1/2 -translate-y-1/2 text-fg-tertiary hover:text-fg transition-colors duration-150"
            aria-label="Clear search"
            @click="query = ''"
          >
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
      <p v-if="query" class="mt-3 text-xs text-fg-tertiary tracking-wide">
        {{ filtered.length }} result{{ filtered.length !== 1 ? 's' : '' }} for
        <span class="text-fg-secondary">"{{ query }}"</span>
      </p>
    </div>

    <!-- Post list -->
    <div class="min-h-[40vh] divide-y divide-border">
      <div v-if="filtered.length === 0" class="py-16 text-center list-fade">
        <p class="text-fg-tertiary text-sm tracking-wide">No articles match your search.</p>
      </div>
      <template v-else>
        <article
          v-for="(post, idx) in filtered"
          :key="post.path"
          class="py-8 group transition-colors duration-300 reveal"
          :style="`transition-delay: ${idx * 80}ms`"
        >
          <div class="flex flex-col md:flex-row md:items-baseline md:justify-between gap-2 mb-3">
            <h3 class="text-lg lg:text-xl font-sans font-bold text-fg group-hover:text-accent transition-colors duration-300">
              <NuxtLink :to="`/read/${post.path.split('/').pop()}`">
                <HighlightText :text="post.title" :query="query" />
              </NuxtLink>
            </h3>
            <time
              v-if="post.date"
              class="text-xs font-semibold tracking-widest uppercase text-fg-tertiary shrink-0"
            >
              {{ new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) }}
            </time>
          </div>
          <p class="text-sm text-fg-secondary leading-relaxed max-w-2xl">
            <HighlightText :text="post.description" :query="query" />
          </p>
          <div v-if="post.tags?.length" class="flex flex-wrap gap-3 mt-3">
            <span
              v-for="tag in post.tags"
              :key="tag"
              class="text-xs font-semibold tracking-widest uppercase"
              :class="query && tag.toLowerCase().includes(query.toLowerCase()) ? 'text-accent' : 'text-teal'"
            >
              {{ tag }}
            </span>
          </div>
        </article>
      </template>
    </div>
  </section>
</template>

<style scoped>
.search-input {
  border-radius: 0;
}

.search-input:focus {
  box-shadow: 0 0 0 1px var(--color-accent);
}

.list-fade {
  animation: fadeIn 0.2s ease;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to   { opacity: 1; }
}
</style>
