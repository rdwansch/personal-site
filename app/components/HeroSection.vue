<template>
  <section class="relative min-h-[70vh] flex flex-col justify-center px-6 lg:px-12 max-w-6xl mx-auto overflow-hidden">
    <!-- Animated accent shapes -->
    <div class="absolute top-24 right-8 lg:right-12 w-28 h-28 lg:w-40 lg:h-40 rounded-full bg-brand-teal/10 animate-pulse pointer-events-none" />
    <div class="absolute bottom-16 left-4 lg:left-8 w-16 h-16 rounded-full bg-brand-violet/8 animate-pulse pointer-events-none" style="animation-delay: 1.2s;" />

    <!-- Label -->
    <p
      class="text-xs font-semibold tracking-widest uppercase text-brand-violet opacity-0 animate-fade-in"
      style="animation-fill-mode: forwards;"
    >
      Frontend Developer
    </p>

    <!-- Name -->
    <h1
      class="text-5xl lg:text-6xl font-display font-bold text-brand-dark leading-tight tracking-tight mt-4 opacity-0 animate-fade-up"
      style="animation-delay: 100ms; animation-fill-mode: forwards;"
    >
      Ridhwan R Siddiq
    </h1>

    <!-- Tagline -->
    <p
      class="text-base lg:text-lg text-brand-text-secondary max-w-xl mt-6 leading-relaxed opacity-0 animate-fade-up"
      style="animation-delay: 200ms; animation-fill-mode: forwards;"
    >
      I build fast, focused web experiences — clean interfaces, thoughtful interactions, and code that holds up over time.
    </p>

    <!-- CTA -->
    <div
      class="mt-8 flex gap-4 opacity-0 animate-fade-up"
      style="animation-delay: 300ms; animation-fill-mode: forwards;"
    >
      <a
        href="#projects"
        class="bg-brand-violet text-white px-8 py-3 font-semibold tracking-widest uppercase text-xs transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-violet-200/50"
      >
        View Work
      </a>
      <a
        href="#about"
        class="relative text-xs font-semibold tracking-widest uppercase text-brand-text-secondary hover:text-brand-violet transition-colors duration-300 after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:bg-brand-violet after:transition-all after:duration-300 hover:after:w-full self-center"
      >
        About Me
      </a>
    </div>
  </section>
</template>
