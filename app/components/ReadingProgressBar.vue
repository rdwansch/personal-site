<script setup lang="ts">
import { useReadingProgress } from '~/composables/useReadingProgress'

const { progress } = useReadingProgress()
</script>

<template>
  <div
    class="fixed top-0 left-0 z-[60] h-0.5 bg-accent origin-left transition-transform duration-75 ease-linear pointer-events-none"
    :style="{ transform: `scaleX(${progress / 100})`, width: '100%' }"
    aria-hidden="true"
    role="progressbar"
    :aria-valuenow="Math.round(progress)"
    aria-valuemin="0"
    aria-valuemax="100"
  />
</template>
