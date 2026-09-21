<template>
  <div class="min-h-screen bg-surface text-fg font-sans">
    <a href="#main-content" class="skip-link">Skip to content</a>
    <NavBar />
    <main id="main-content" tabindex="-1">
      <slot />
    </main>
    <SiteFooter />
  </div>
</template>
