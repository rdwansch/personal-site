<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  text: string
  query: string
}>()

const parts = computed(() => {
  const q = props.query.trim()
  if (!q || !props.text) return [{ text: props.text, match: false }]

  const regex = new RegExp(`(${q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi')
  return props.text.split(regex).map(part => ({
    text: part,
    match: regex.test(part),
  }))
})
</script>

<template>
  <span>
    <template v-for="(part, i) in parts" :key="i">
      <mark v-if="part.match" class="highlight">{{ part.text }}</mark>
      <template v-else>{{ part.text }}</template>
    </template>
  </span>
</template>

<style scoped>
.highlight {
  background-color: color-mix(in srgb, var(--color-accent) 18%, transparent);
  color: var(--color-accent);
  border-radius: 2px;
  padding: 0 2px;
}
</style>
