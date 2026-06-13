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
  nitro: {
    prerender: {
      crawlLinks: true,
      routes: ['/'],
    },
  },
  runtimeConfig: {
    public: {
      fullName: process.env.NUXT_PUBLIC_FULL_NAME,
      email: process.env.NUXT_PUBLIC_EMAIL,
      linkedin: process.env.NUXT_PUBLIC_LINKEDIN,
      github: process.env.NUXT_PUBLIC_GITHUB,
    },
  },
})
