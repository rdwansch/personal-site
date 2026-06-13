<script setup lang="ts">
import { ref, computed } from 'vue'

const props = defineProps<{
  /** Root-relative path of the page being shared. */
  path: string
  title: string
  text?: string
}>()

const url = computed(() => absoluteUrl(props.path))
const copied = ref(false)
const canNativeShare = ref(false)

onMounted(() => {
  canNativeShare.value = typeof navigator !== 'undefined' && !!navigator.share
})

const twitter = computed(
  () => `https://twitter.com/intent/tweet?text=${encodeURIComponent(props.title)}&url=${encodeURIComponent(url.value)}`
)
const linkedin = computed(
  () => `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url.value)}`
)

async function nativeShare() {
  try {
    await navigator.share({ title: props.title, text: props.text ?? props.title, url: url.value })
  } catch {
    /* user dismissed — ignore */
  }
}

async function copyLink() {
  try {
    await navigator.clipboard.writeText(url.value)
    copied.value = true
    setTimeout(() => (copied.value = false), 1800)
  } catch {
    /* clipboard unavailable — ignore */
  }
}
</script>

<template>
  <div class="flex items-center gap-3 flex-wrap">
    <span class="text-xs font-semibold tracking-widest uppercase text-fg-tertiary mr-1">Share</span>

    <button
      v-if="canNativeShare"
      type="button"
      aria-label="Share this article"
      class="share-btn"
      @click="nativeShare"
    >
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>
    </button>

    <a :href="twitter" target="_blank" rel="noopener noreferrer" aria-label="Share on X" class="share-btn">
      <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
    </a>

    <a :href="linkedin" target="_blank" rel="noopener noreferrer" aria-label="Share on LinkedIn" class="share-btn">
      <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
    </a>

    <button type="button" :aria-label="copied ? 'Link copied' : 'Copy link'" class="share-btn" @click="copyLink">
      <svg v-if="!copied" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>
      <svg v-else width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-teal"><polyline points="20 6 9 17 4 12"/></svg>
    </button>
  </div>
</template>

<style scoped>
.share-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.25rem;
  height: 2.25rem;
  border: 1px solid var(--color-border);
  color: var(--color-fg-secondary);
  border-radius: 9999px;
  transition: color 0.25s ease, border-color 0.25s ease, transform 0.25s var(--ease-out-back);
}
.share-btn:hover {
  color: var(--color-accent);
  border-color: var(--color-accent);
  transform: translateY(-2px);
}
</style>
