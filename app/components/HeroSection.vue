<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const parallaxY = ref(0)
const blobY1 = ref(0)
const blobY2 = ref(0)

function onScroll() {
  const y = window.scrollY
  parallaxY.value = y * 0.35
  blobY1.value   = y * 0.18
  blobY2.value   = y * 0.25
}

onMounted(() => window.addEventListener('scroll', onScroll, { passive: true }))
onUnmounted(() => window.removeEventListener('scroll', onScroll))
</script>

<template>
  <section class="relative min-h-[92vh] flex flex-col justify-center px-6 lg:px-12 max-w-6xl mx-auto overflow-hidden">
    <!-- Parallax blobs -->
    <div
      class="absolute top-24 right-8 lg:right-12 w-64 h-64 rounded-full bg-accent/10 animate-float pointer-events-none blur-2xl"
      :style="{ transform: `translateY(${blobY1}px)` }"
    />
    <div
      class="absolute bottom-16 left-4 lg:left-8 w-40 h-40 rounded-full bg-teal/10 animate-float-slow pointer-events-none blur-2xl"
      :style="{ transform: `translateY(${blobY2}px)` }"
    />
    <div
      class="absolute top-1/2 left-1/2 w-96 h-96 rounded-full bg-accent/5 pointer-events-none blur-3xl -translate-x-1/2 -translate-y-1/2"
    />

    <!-- Content shifts gently on scroll -->
    <div
      class="relative z-10"
      :style="{ transform: `translateY(${-parallaxY}px)` }"
    >
      <!-- Label -->
      <p
        class="text-xs font-semibold tracking-widest uppercase text-accent opacity-0 animate-fade-in"
        style="animation-fill-mode: forwards;"
      >
        Frontend Developer
      </p>

      <!-- Name -->
      <h1
        class="text-5xl lg:text-7xl font-sans font-bold text-fg leading-tight tracking-tight mt-4 opacity-0 animate-fade-up"
        style="animation-delay: 120ms; animation-fill-mode: forwards;"
      >
        Ridhwan<br />
        <span class="text-accent">R Siddiq</span>
      </h1>

      <!-- Tagline -->
      <p
        class="text-base lg:text-lg text-fg-secondary max-w-xl mt-6 leading-relaxed opacity-0 animate-fade-up"
        style="animation-delay: 240ms; animation-fill-mode: forwards;"
      >
        I build fast, focused web experiences — clean interfaces, thoughtful interactions, and code that holds up over time.
      </p>

      <!-- CTA -->
      <div
        class="mt-10 flex gap-4 opacity-0 animate-fade-up"
        style="animation-delay: 360ms; animation-fill-mode: forwards;"
      >
        <NuxtLink
          to="/work"
          class="bg-accent text-white px-8 py-3.5 font-semibold tracking-widest uppercase text-xs transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-accent/25 active:translate-y-0"
        >
          View Work
        </NuxtLink>
        <NuxtLink
          to="/about"
          class="relative text-xs font-semibold tracking-widest uppercase text-fg-secondary hover:text-accent transition-colors duration-300 after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:bg-accent after:transition-all after:duration-300 hover:after:w-full self-center"
        >
          About Me
        </NuxtLink>
      </div>

      <!-- Scroll hint -->
      <div
        class="mt-20 flex flex-col items-start gap-2 opacity-0 animate-fade-in"
        style="animation-delay: 800ms; animation-fill-mode: forwards;"
      >
        <span class="text-xs tracking-widest uppercase text-fg-tertiary">Scroll</span>
        <div class="w-px h-12 bg-gradient-to-b from-fg-tertiary to-transparent" />
      </div>
    </div>
  </section>
</template>
