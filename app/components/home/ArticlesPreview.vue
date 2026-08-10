<script setup lang="ts">
import { ref, onMounted } from 'vue'

const { data: posts } = await useAsyncData('home-articles', () =>
  queryCollection('blog').order('date', 'DESC').limit(3).all()
)

const published = computed(() =>
  (posts.value ?? []).filter((p: any) => p.draft !== true && p.meta?.draft !== true)
)

const root = ref<HTMLElement | null>(null)

onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target) } }),
    { threshold: 0.1 }
  )
  if (root.value) root.value.querySelectorAll('.reveal').forEach(el => observer.observe(el))
})
</script>

<template>
  <section ref="root" class="py-24 lg:py-32 px-6 lg:px-12 max-w-6xl mx-auto border-t border-border">
    <div class="mb-12 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 reveal">
      <div>
        <p class="text-xs font-semibold tracking-widest uppercase text-accent mb-3">Writing</p>
        <h2 class="text-3xl lg:text-4xl font-sans font-bold text-fg tracking-tight">Latest Articles</h2>
      </div>
      <NuxtLink
        to="/articles"
        class="self-start sm:self-auto text-xs font-semibold tracking-widest uppercase text-fg-secondary hover:text-accent transition-colors duration-300 after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:bg-accent after:transition-all after:duration-300 hover:after:w-full relative"
      >
        All articles →
      </NuxtLink>
    </div>

    <div class="divide-y divide-border">
      <article
        v-for="(post, idx) in published"
        :key="post.path"
        class="group py-8 transition-colors duration-300 reveal"
        :style="{ transitionDelay: `${idx * 80}ms` }"
      >
        <div class="flex flex-col md:flex-row md:items-baseline md:justify-between gap-2 mb-3">
          <h3 class="text-lg lg:text-xl font-sans font-bold text-fg group-hover:text-accent transition-colors duration-300 leading-snug">
            <NuxtLink :to="`/read/${post.path.split('/').pop()}`">{{ post.title }}</NuxtLink>
          </h3>
          <time
            v-if="post.date"
            class="text-xs font-semibold tracking-widest uppercase text-fg-tertiary shrink-0"
          >
            {{ new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) }}
          </time>
        </div>
        <p class="text-sm text-fg-secondary leading-relaxed max-w-2xl">{{ post.description }}</p>
        <div v-if="post.tags?.length" class="flex flex-wrap gap-3 mt-3">
          <span
            v-for="tag in post.tags"
            :key="tag"
            class="text-xs font-semibold tracking-widest uppercase text-teal"
          >
            {{ tag }}
          </span>
        </div>
      </article>
    </div>
  </section>
</template>
