export default defineNuxtConfig({
  modules: ['@nuxt/ui', '@nuxtjs/color-mode'],
  ui: {
    fonts: false
  },
  devtools: { enabled: false },
  css: ['~/assets/css/main.css'],
  colorMode: {
    preference: 'dark',
    fallback: 'dark',
    classSuffix: ''
  },
  runtimeConfig: {
    public: {
      gigachatEndpoint: process.env.GIGACHAT_ENDPOINT || '/api/chat',
      gigachatModel: process.env.GIGACHAT_MODEL || 'GigaChat'
    }
  },
  compatibilityDate: '2025-10-01'
})
