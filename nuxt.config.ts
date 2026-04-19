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
      lmModelsEndpoint: process.env.LM_MODELS_ENDPOINT || '/V1/models'
    }
  },
  compatibilityDate: '2025-10-01'
})
