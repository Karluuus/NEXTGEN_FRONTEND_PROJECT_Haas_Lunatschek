// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  //lädt die Tokens global in die gesamte App
  css: ['~/tokens/tokens.css']
})
