# PWA-Setup & Manifest-Konfiguration

Für das PWA-Grundgerüst setzen wir auf das offizielle Nuxt-Modul `@vite-pwa/nuxt`. Es integriert Workbox nahtlos in die Vite-Build-Pipeline von Nuxt 3/4 und automatisiert die Service-Worker-Registrierung sowie das Manifest-Handling ohne manuellen Boilerplate-Code.

Die Werte des Web App Manifests spiegeln die visuelle Identität und Design Tokens von PineDev wider:
* **`theme_color: "#166534"`:** Entspricht `--palette-pine-800` (semantisch `--color-interactive-primary`). Steuert die Akzentfarbe der Browser-UI und Systemleiste im installierten Zustand.
* **`background_color: "#f0fdf4"`:** Entspricht `--palette-pine-50` (semantisch `--color-surface-page`) und dient als nahtlose Splash-Screen-Hintergrundfarbe beim App-Start, wodurch Flimmern vermieden wird.
* **`display: "standalone"` & `start_url: "/"`:** Ermöglichen ein natives App-Erlebnis ohne URL-Leiste mit direktem Einstieg auf der Programmübersicht.
* **Icons:** Bereitstellung in 192×192px und 512×512px im PineDev-Design für Homescreens und App-Switcher.