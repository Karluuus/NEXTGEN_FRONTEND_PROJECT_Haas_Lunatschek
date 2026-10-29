# ADR: Rendering-Strategien für FrontendNow 2026

## Kontext & Allgemeine Auswahlkriterien

Für die Konferenzplattform FrontendNow 2026 muss für jeden Anwendungsbereich eine dedizierte Rendering-Strategie (SSG, CSR, SSR oder ISR/SWR) festgelegt werden. Statt eines pauschalen Framework-Defaults wählen wir die Strategie anhand der konkreten Dateneigenschaften und Interaktionsmuster aus.

Zentrale Kriterien sind:

1. **Veränderlichkeit der Daten zur Laufzeit:** Sind Inhalte während der Konferenz statisch, zeitkritisch oder personalisiert?
2. **Ladezeit & Core Web Vitals:** Schnelle Time-to-First-Byte (TTFB) und minimierte Cumulative Layout Shifts (CLS) in mobilen Konferenz-Netzwerken.
3. **SEO & Crawlbarkeit:** Auffindbarkeit von Sessions und Speakern über Suchmaschinen.
4. **Client-Interaktivität:** Flüssige Interaktionen ohne störende Full-Page-Reloads.

---

## 1. Session-Übersicht mit Filterung (Person 1)

### Kontext

Die Session-Übersicht dient als zentraler Einstiegspunkt der Konferenz. Sie aggregiert alle 20 Fachvorträge und bietet interaktive Filter nach Track, Konferenztag und Level sowie eine Volltextsuche. Zeitpläne können sich im Vorfeld oder am Konferenztag kurzfristig ändern (z. B. Raumtausch oder Programmverschiebungen).

### Betrachtete Optionen

- **Option 1: Reines Client-Side Rendering (CSR)**  
  Der Server liefert lediglich ein leeres App-Gerüst aus. Ein Client-Script lädt den Datensatz und rendert die Liste im Browser.  
  _Vorteil:_ Unkomplizierte Handhabung des reaktiven Filter-States.  
  _Nachteil:_ Schlechterer TTFB, leere Startseite bei deaktiviertem JavaScript, spürbare Layout-Verschiebungen und suboptimale Suchmaschinenindexierung.
- **Option 2: Hybrides ISR / SWR mit clientseitiger Reaktivität (Gewählt)**  
  Die initiale Übersicht wird server- bzw. build-seitig vorgerendert und über Nuxt per Stale-While-Revalidate gecacht (`swr: 60`). Die Filterung (Track, Tag, Level) operiert im Browser headless über das Composable `useSessionFilter`.  
  _Vorteil:_ Sofort sichtbares HTML beim Erstaufruf (hervorragender First Contentful Paint). Werden Session-Zeiten im Hintergrund aktualisiert, revalidiert der Nitro-Server die Seite im 60-Sekunden-Intervall ohne Rebuild der gesamten Plattform. Gleichzeitig filtert die Benutzeroberfläche ohne Netzwerklatenz.  
  _Nachteil:_ Erfordert ein klares Schnittstellendesign zwischen statischem Server-Markup und reaktivem Client-State.

### Entscheidung

Wir wählen **Option 2 (ISR/SWR via `swr: 60` in `nuxt.config.ts`)**. Das initial ausgelieferte HTML gewährleistet blitzschnelle Ladezeiten in überlasteten Konferenz-WLANs. Die Entkopplung der Filterung in `useSessionFilter` stellt sicher, dass die UND-Verknüpfungen reaktiv im Client ohne Server-Roundtrips ablaufen.

### Konsequenzen

- Die Route `/` bzw. `/sessions` nutzt die SWR-Cache-Regel.
- Die Filterlogik liegt headless in `composables/useSessionFilter.ts` und manipuliert die Daten rein clientseitig.
- Browser-Scraping und Suchmaschinen erfassen stets das vollständige, vorgerenderte Konferenzprogramm.

---

## 2. Speaker-Profilseiten (Person 1)

### Kontext

Die Plattform umfasst 18 Speaker-Profile unter der dynamischen Route `/speakers/[id]`. Jedes Profil zeigt biografische Angaben, Unternehmenszugehörigkeit und die zugeordneten Vorträge.

### Betrachtete Optionen

- **Option 1: Server-Side Rendering (SSR) On-Demand**  
  Die Seite wird bei jedem einzelnen Request auf dem Node.js-Server dynamisch aus dem Datensatz generiert.  
  _Vorteil:_ Immer garantiert synchron zum Datensatz.  
  _Nachteil:_ Unnötige Serverlast und erhöhte Latenzen bei jedem Seitenaufruf für Daten, die sich während der Konferenztage praktisch nicht verändern.
- **Option 2: Static Site Generation via Prerendering (SSG) (Gewählt)**  
  Alle 18 Speaker-Routen werden zur Build-Zeit vollständig als statische HTML- und JSON-Dateien generiert (`prerender: true`).  
  _Vorteil:_ Maximale Auslieferungsgeschwindigkeit via CDN (TTFB < 20ms), kein Server-Overhead, vollständige Offline-Verfügbarkeit im Browsercache und optimale Barrierefreiheit sowie Indexierbarkeit.  
  _Nachteil:_ Inhaltliche Korrekturen an einer Biografie erfordern einen erneuten Build- und Deployment-Lauf.

### Entscheidung

Wir wählen **Option 2 (SSG via `prerender: true` in `nuxt.config.ts`)**. Da Speaker-Biografien und Profilbilder redaktionell vorab feststehen und sich während des Events nicht minütlich ändern, ist der Performance-Vorteil von vorab generiertem HTML entscheidend.

### Konsequenzen

- In `nuxt.config.ts` ist `/speakers/**` als `prerender: true` deklariert.
- Zur Build-Zeit werden alle 18 Routen als fertiges HTML exportiert.
- Navigationen von der Session-Übersicht zu einem Speaker erfolgen im Browser verzögerungsfrei via Nuxt-Payload-Prefetching.

---

## 3. Session-Detailseiten (Person 2)

<!-- Person 2 -->

---

## 4. "Mein Programm"-Dashboard (Person 2)

<!-- Person 2 -->
