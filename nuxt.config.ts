// nuxt.config.ts
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },

  // lädt die Tokens global in die gesamte App
  css: ["~~/tokens/tokens.css"],

  modules: [
    "@vite-pwa/nuxt"
  ],

  pwa: {
    registerType: "autoUpdate",
    manifest: {
      name: "FrontendNow 2026 — PineDev Schedule",
      short_name: "FrontendNow",
      description: "Ressourcenschonender Konferenz-Begleiter für die FrontendNow 2026",
      theme_color: "#166534", // --palette-pine-800 / --color-interactive-primary
      background_color: "#f0fdf4", // --palette-pine-50 / --color-surface-page
      display: "standalone",
      start_url: "/",
      icons: [
        {
          src: "/pwa-192x192.png",
          sizes: "192x192",
          type: "image/png"
        },
        {
          src: "/pwa-512x512.png",
          sizes: "512x512",
          type: "image/png"
        }
      ]
    },
    workbox: {
      navigateFallback: "/"
    },
    client: {
      installPrompt: true
    },
    devOptions: {
      enabled: true, // Erlaubt lokales Testen des Service Workers im Dev-Modus
      type: "module"
    }
  },

  routeRules: {
    "/speakers/**": { prerender: true },
    "/sessions/**": { swr: 60 },
    "/schedule": { ssr: false },
  },
});