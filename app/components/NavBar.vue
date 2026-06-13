<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue'

const links = [
  { label: 'Experiences', href: '/experiences' },
  { label: 'Articles', href: '/articles' },
  { label: 'Contact', href: '/contact' },
]

const isDark  = ref(false)
const scrolled = ref(false)
const menuOpen = ref(false)

function toggleTheme() {
  isDark.value = !isDark.value
  document.documentElement.classList.toggle('dark', isDark.value)
  localStorage.setItem('theme', isDark.value ? 'dark' : 'light')
}

function toggleMenu() {
  menuOpen.value = !menuOpen.value
}

function closeMenu() {
  menuOpen.value = false
}

function onScroll() {
  scrolled.value = window.scrollY > 8
}

// lock body scroll when menu is open
watch(menuOpen, (open) => {
  document.body.style.overflow = open ? 'hidden' : ''
})

onMounted(() => {
  const saved = localStorage.getItem('theme')
  if (saved === 'dark' || (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    isDark.value = true
    document.documentElement.classList.add('dark')
  }
  window.addEventListener('scroll', onScroll, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
  document.body.style.overflow = ''
})
</script>

<template>
  <nav
    class="sticky top-0 z-50 h-16 flex items-center justify-between px-6 lg:px-12 transition-all duration-300"
    :class="scrolled
      ? 'bg-surface border-b border-border shadow-sm'
      : 'bg-transparent'"
  >
    <!-- Wordmark -->
    <NuxtLink
      to="/"
      class="font-sans font-bold text-fg text-lg tracking-tight hover:text-accent transition-colors duration-300"
      @click="closeMenu"
    >
      RRS
    </NuxtLink>

    <!-- Desktop links -->
    <ul class="hidden md:flex gap-8 items-center">
      <li v-for="link in links" :key="link.label">
        <NuxtLink
          :to="link.href"
          class="relative text-xs font-semibold tracking-widest uppercase text-fg-secondary hover:text-accent transition-colors duration-300 after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:bg-accent after:transition-all after:duration-300 hover:after:w-full"
          active-class="text-accent after:w-full"
        >
          {{ link.label }}
        </NuxtLink>
      </li>
      <li>
        <button
          @click="toggleTheme"
          aria-label="Toggle theme"
          class="w-8 h-8 flex items-center justify-center rounded-full text-fg-secondary hover:text-accent hover:bg-accent/10 transition-all duration-300"
        >
          <svg v-if="isDark" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>
          <svg v-else xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
        </button>
      </li>
    </ul>

    <!-- Mobile: theme toggle + hamburger -->
    <div class="flex md:hidden items-center gap-3">
      <button
        @click="toggleTheme"
        aria-label="Toggle theme"
        class="w-8 h-8 flex items-center justify-center text-fg-secondary hover:text-accent transition-colors duration-300"
      >
        <svg v-if="isDark" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>
        <svg v-else xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
      </button>

      <!-- Hamburger -->
      <button
        @click="toggleMenu"
        :aria-label="menuOpen ? 'Close menu' : 'Open menu'"
        :aria-expanded="menuOpen"
        class="w-8 h-8 flex flex-col justify-center items-center gap-1.5 text-fg-secondary hover:text-accent transition-colors duration-300"
      >
        <span
          class="block w-5 h-px bg-current transition-all duration-300 origin-center"
          :class="menuOpen ? 'translate-y-[3.5px] rotate-45' : ''"
        />
        <span
          class="block w-5 h-px bg-current transition-all duration-300"
          :class="menuOpen ? 'opacity-0 scale-x-0' : ''"
        />
        <span
          class="block w-5 h-px bg-current transition-all duration-300 origin-center"
          :class="menuOpen ? '-translate-y-[3.5px] -rotate-45' : ''"
        />
      </button>
    </div>
  </nav>

  <!-- Mobile full-screen menu overlay -->
  <Teleport to="body">
    <Transition
      enter-active-class="transition-all duration-300 ease-out"
      enter-from-class="opacity-0 -translate-y-4"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition-all duration-200 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-4"
    >
      <div
        v-if="menuOpen"
        class="fixed inset-0 z-40 md:hidden bg-surface flex flex-col pt-24 px-8 pb-12"
      >
        <ul class="flex flex-col gap-2 flex-1">
          <li
            v-for="(link, i) in links"
            :key="link.label"
            class="overflow-hidden"
            :style="{ transitionDelay: `${i * 50}ms` }"
          >
            <NuxtLink
              :to="link.href"
              class="flex items-center justify-between py-6 border-b border-border text-4xl font-sans font-bold text-fg hover:text-accent transition-colors duration-200 group"
              active-class="text-accent"
              @click="closeMenu"
            >
              <span>{{ link.label }}</span>
              <svg
                class="w-6 h-6 text-fg-tertiary group-hover:text-accent group-hover:translate-x-1 transition-all duration-200"
                fill="none" stroke="currentColor" viewBox="0 0 24 24"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
            </NuxtLink>
          </li>
        </ul>

        <!-- Footer in menu -->
        <p class="text-xs text-fg-tertiary tracking-widest uppercase">Ridhwan R Siddiq</p>
      </div>
    </Transition>
  </Teleport>
</template>
