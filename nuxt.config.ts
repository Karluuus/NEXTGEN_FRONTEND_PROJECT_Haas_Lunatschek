// nuxt.config.ts
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },

  experimental: {
    payloadExtraction: false,
  },

  css: ["~~/tokens/tokens.css"],

  modules: ["@vite-pwa/nuxt"],

  nitro: {
    prerender: {
      routes: ["/", "/schedule"],
    },
  },

  pwa: {
    registerType: "autoUpdate",
    devOptions: {
      enabled: true,
      type: "module",
    },
    manifest: {
      name: "FrontendNow 2026 — PineDev Schedule",
      short_name: "FrontendNow",
      description:
        "Ressourcenschonender Konferenz-Begleiter für die FrontendNow 2026",
      theme_color: "#166534",
      background_color: "#f0fdf4",
      display: "standalone",
      start_url: "/",
      icons: [
        {
          src: "/pwa-192x192.png",
          sizes: "192x192",
          type: "image/png",
        },
        {
          src: "/pwa-512x512.png",
          sizes: "512x512",
          type: "image/png",
        },
      ],
    },
    workbox: {
      navigateFallback: "/",
      globPatterns: ["**/*.{js,css,html,png,svg,ico,woff2}"],
      cleanupOutdatedCaches: true,
      runtimeCaching: [
        {
          // 1. Statische Assets & Stylesheets: Cache-First (Aufgabe Person 1 / Konzept 2.A)
          urlPattern: ({ request }: any) =>
            request.destination === "style" ||
            request.destination === "script" ||
            request.destination === "worker",
          handler: "CacheFirst",
          options: {
            cacheName: "pinedev-static-assets-cache",
            expiration: {
              maxEntries: 100,
              maxAgeSeconds: 60 * 60 * 24 * 30,
            },
          },
        },
        {
          // 2. Bilder & Icons: Cache-First (Aufgabe Person 1 / Konzept 2.A)
          urlPattern: ({ request }: any) => request.destination === "image",
          handler: "CacheFirst",
          options: {
            cacheName: "pinedev-images-cache",
            expiration: {
              maxEntries: 60,
              maxAgeSeconds: 60 * 60 * 24 * 30,
            },
          },
        },
        {
          // 3. Konferenzdaten: Stale-While-Revalidate (Aufgabe Person 2 / Konzept 2.B)
          urlPattern: ({ url }: any) =>
            url.pathname.endsWith("conference-data.json"),
          handler: "StaleWhileRevalidate",
          options: {
            cacheName: "pinedev-conference-data-cache",
          },
        },
      ],
    },
    client: {
      installPrompt: true,
    },
  },

  routeRules: {
    "/speakers/**": { prerender: true },
    "/sessions/**": { swr: 60 },
    "/schedule": { ssr: false },
  },
});
