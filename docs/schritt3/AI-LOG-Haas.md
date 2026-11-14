# AI-LOG — Schritt 3: PWA & Offline-Strategie (Person 1)

## Eintrag 1
* **Datum:** 2026-11-12
* **Tool:** Gemini 3.8 Flash
* **Prompt im Wortlaut:**  
  > "Ich nutze Nuxt 4 mit dem Modul `@vite-pwa/nuxt`. Wie konfiguriere ich in der nuxt.config.ts das Web App Manifest mit eigenem Farbschema (theme_color #166534, background_color #f0fdf4), standalone display und Icons in 192x192 und 512x512?"
* **Zweck:**  
  Erstellung des initialen PWA-Grundgerüsts und saubere Übernahme der Design-Tokens aus Schritt 1 in die Manifest-Konfiguration für die Erfüllung von Aufgabe A.

---

## Eintrag 2
* **Datum:** 2026-11-13
* **Tool:** Gemini 3.8 Flash
* **Prompt im Wortlaut:**  
  > "Für unsere Konferenz-App soll für statische Assets (CSS, Scripts, Webfonts) und Bilder eine Cache-First-Strategie via Workbox in `@vite-pwa/nuxt` konfiguriert werden. Wie sieht der runtimeCaching-Block in nuxt.config.ts dafür syntaktisch korrekt aus inklusive Ablaufzeiten und Cache-Namen?"
* **Zweck:**  
  Implementierung der Cache-First-Caching-Regel für statische Assets und UI-Ressourcen im Rahmen von Aufgabe C (Federführung Person 1).

---

## Eintrag 3
* **Datum:** 2026-11-14
* **Tool:** Gemini 3.8 Flash
* **Prompt im Wortlaut:**  
  > "Wenn ich in Chrome DevTools im Network-Tab auf Offline schalte und die Seite neu lade, erhalte ich ERR_INTERNET_DISCONNECTED. Warum greift der Service Worker im dev-Modus von `@vite-pwa/nuxt` nicht und wie teste ich das korrekt?"
* **Zweck:**  
  Fehlersuche, warum der Service Worker lokal nicht abgefangen hat. Erkenntnisgewinn über die Trennung von Dev-Server (`npm run dev`) vs. Production-Build (`npm run build && npm run preview`) sowie die Option `devOptions.enabled: true`.

---

## Eintrag 4
* **Datum:** 2026-11-14
* **Tool:** Gemini 3.8 Flash
* **Prompt im Wortlaut:**  
  > "Beim Befehl `npm run build` bricht Nitro beim Prerendern der Root-Route '/' mit folgendem Fehler ab: '[unstorage] Invalid key: \"\"'. Wie behebe ich diesen Fehler in Nuxt 4 ohne mein Setup zu zerstören?"
* **Zweck:**  
  Lösung des bekannten Nitro/Unstorage-Bugs bei der Payload-Extraktion für `/`, damit die App-Shells für den Offline-Betrieb fehlerfrei gerendert werden können.

---

## Eintrag 5
* **Datum:** 2026-11-14
* **Tool:** Gemini 3.8 Flash
* **Prompt im Wortlaut:**  
  > "Warum leitet mich die PWA im Offline-Zustand bei einem Reload auf '/schedule' wieder zurück auf die Startseite '/', wenn navigateFallback auf '/' gesetzt ist? Wie sorge ich dafür, dass 'Mein Programm' offline beim Neuladen direkt als richtige Shell erscheint?"
* **Zweck:**  
  Optimierung des Pre-Renderings in Nitro (`prerender.routes: ['/', '/schedule']`), damit die App-Shell für „Mein Programm“ offline eigenständig gerendert wird und nicht nur auf die Root-Fallback-Shell ausweicht.