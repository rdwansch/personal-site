export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss', '@nuxt/content', '@nuxt/fonts'],
  fonts: {
    families: [
      { name: 'Preahvihear', provider: 'google' },
    ],
  },
  css: ['~/assets/css/main.css'],
})
