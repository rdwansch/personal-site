<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

interface TocLink {
  id: string
  text: string
  depth: number
  children?: TocLink[]
}

const props = defineProps<{
  links: TocLink[]
}>()

const activeId = ref<string>('')

function onScroll() {
  const headings = document.querySelectorAll<HTMLElement>('h2[id], h3[id]')
  const scrollY = window.scrollY + 120

  let current = ''
  for (const h of headings) {
    if (h.offsetTop <= scrollY) current = h.id
  }
  activeId.value = current
}

onMounted(() => {
  window.addEventListener('scroll', onScroll, { passive: true })
  onScroll()
})

onUnmounted(() => window.removeEventListener('scroll', onScroll))

function scrollTo(id: string) {
  const el = document.getElementById(id)
  if (!el) return
  const y = el.getBoundingClientRect().top + window.scrollY - 96
  window.scrollTo({ top: y, behavior: 'smooth' })
}
</script>

<template>
  <nav v-if="links.length" aria-label="Table of contents" class="toc">
    <p class="text-xs font-semibold tracking-widest uppercase text-fg-tertiary mb-4">On this page</p>
    <ul class="space-y-1">
      <template v-for="link in links" :key="link.id">
        <li>
          <button
            class="toc-link w-full text-left"
            :class="activeId === link.id ? 'toc-link--active' : ''"
            @click="scrollTo(link.id)"
          >
            {{ link.text }}
          </button>
        </li>
        <li v-for="child in link.children ?? []" :key="child.id">
          <button
            class="toc-link toc-link--child w-full text-left"
            :class="activeId === child.id ? 'toc-link--active' : ''"
            @click="scrollTo(child.id)"
          >
            {{ child.text }}
          </button>
        </li>
      </template>
    </ul>
  </nav>
</template>

<style scoped>
.toc {
  position: sticky;
  top: 5.5rem;
  max-height: calc(100vh - 7rem);
  overflow-y: auto;
  padding-right: 0.5rem;
}

.toc-link {
  display: block;
  font-size: 0.8125rem;
  line-height: 1.5;
  padding: 0.2rem 0.5rem;
  border-left: 2px solid transparent;
  color: var(--color-fg-tertiary);
  transition: color 0.2s ease, border-color 0.2s ease;
}

.toc-link--child {
  padding-left: 1.25rem;
}

.toc-link:hover {
  color: var(--color-fg-secondary);
  border-left-color: var(--color-border);
}

.toc-link--active {
  color: var(--color-accent);
  border-left-color: var(--color-accent);
}
</style>
