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
  app: {
    head: {
      htmlAttrs: { lang: 'en' },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      ],
      link: [
        { rel: 'icon', href: '/favicon.ico', sizes: 'any' },
        { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' },
        { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png' },
        { rel: 'apple-touch-icon', href: '/icon-180.png' },
        { rel: 'manifest', href: '/site.webmanifest' },
        { rel: 'alternate', type: 'application/rss+xml', title: 'Ridhwan R Siddiq — Articles', href: '/rss.xml' },
      ],
    },
  },
  nitro: {
    prerender: {
      crawlLinks: true,
      routes: ['/', '/sitemap.xml', '/rss.xml'],
    },
  },
  runtimeConfig: {
    public: {
      fullName: process.env.NUXT_PUBLIC_FULL_NAME,
      email: process.env.NUXT_PUBLIC_EMAIL,
      linkedin: process.env.NUXT_PUBLIC_LINKEDIN,
      github: process.env.NUXT_PUBLIC_GITHUB,
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL || 'https://ridhwan-siddiq.vercel.app',
      siteName: process.env.NUXT_PUBLIC_SITE_NAME || 'Ridhwan R Siddiq',
      siteDescription:
        process.env.NUXT_PUBLIC_SITE_DESCRIPTION ||
        'Ridhwan R Siddiq is a software developer specializing in React, Next.js, Vue and Nuxt — building fast, accessible, production-grade web interfaces.',
    },
  },
})
