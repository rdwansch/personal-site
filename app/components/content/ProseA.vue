<script setup lang="ts">
const props = defineProps<{
  href?: string
  target?: string
}>()

const isExternal = computed(() => /^https?:\/\//.test(props.href ?? ''))
</script>

<template>
  <NuxtLink
    :href="href"
    :target="target ?? '_blank'"
    :rel="isExternal ? 'noopener noreferrer' : undefined"
  >
    <slot />
  </NuxtLink>
</template>
