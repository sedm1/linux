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
      gigachatFilesEndpoint: process.env.GIGACHAT_FILES_ENDPOINT || '/api/chat/files',
      gigachatModelsEndpoint: process.env.GIGACHAT_MODELS_ENDPOINT || '/api/chat/models',
      gigachatModel: process.env.GIGACHAT_MODEL || 'GigaChat'
    }
  },
  compatibilityDate: '2025-10-01'
})
