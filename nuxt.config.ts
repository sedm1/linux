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
    gigaChatBaseUrl: process.env.GIGACHAT_BASE_URL || '',
    gigaChatToken: process.env.GIGACHAT_TOKEN || '',
    gigachatEndpoint: process.env.GIGACHAT_ENDPOINT || '/api/chat',
    lmBaseUrl: process.env.LM_BASE_URL || '',
    lmToken: process.env.LM_TOKEN || '',
    lmModelsEndpoint: process.env.LM_MODELS_ENDPOINT || '/V1/models'
  },
  compatibilityDate: '2025-10-01'
})
