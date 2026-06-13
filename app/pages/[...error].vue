<template>
  <section class="min-h-[92vh] flex flex-col items-center justify-center px-6 text-center">
    <!-- Big 404 -->
    <div class="relative select-none mb-10">
     
      <span
        class="absolute inset-0 flex items-center justify-center  font-bold leading-none tracking-tighter text-accent/20 blur-sm"
      >404</span>
    </div>

    <div class="opacity-0 animate-fade-up" style="animation-fill-mode: forwards;">
      <p class="text-xs font-thin tracking-widest uppercase text-accent mb-4">Page not found</p>
      <p class="text-fg-secondary text-base max-w-sm leading-relaxed">
        Whatever you were looking for isn't here. It may have moved, been removed, or never existed.
      </p>
    </div>

    <div
      class="mt-10 flex gap-4 opacity-0 animate-fade-up"
      style="animation-delay: 200ms; animation-fill-mode: forwards;"
    >
      <NuxtLink
        to="/"
        class="bg-accent text-white px-8 py-3.5 font-semibold tracking-widest uppercase text-xs transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-accent/25 active:translate-y-0"
      >
        Go Home
      </NuxtLink>
      <NuxtLink
        to="/experiences"
        class="relative text-xs font-semibold tracking-widest uppercase text-fg-secondary hover:text-accent transition-colors duration-300 after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:bg-accent after:transition-all after:duration-300 hover:after:w-full self-center"
      >
        View Experiences
      </NuxtLink>
    </div>
  </section>
</template>
