<script setup lang="ts">
const { data: posts } = await useAsyncData('blog-posts', () =>
  queryCollection('blog').order('date', 'DESC').limit(3).all()
)
</script>

<template>
  <section id="blog" class="py-24 lg:py-32 px-6 lg:px-12 max-w-6xl mx-auto border-t border-border">
    <!-- Section header -->
    <div class="mb-12">
      <p class="text-xs font-semibold tracking-widest uppercase text-accent mb-3">Writing</p>
      <h2 class="text-3xl lg:text-4xl font-sans font-bold text-fg tracking-tight">Articles</h2>
    </div>

    <!-- Post list -->
    <div class="space-y-0 divide-y divide-border">
      <article
        v-for="post in posts"
        :key="post.path"
        class="py-8 group transition-colors duration-300"
      >
        <div class="flex flex-col md:flex-row md:items-baseline md:justify-between gap-2 mb-3">
          <h3 class="text-lg lg:text-xl font-sans font-bold text-fg group-hover:text-accent transition-colors duration-300">
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
