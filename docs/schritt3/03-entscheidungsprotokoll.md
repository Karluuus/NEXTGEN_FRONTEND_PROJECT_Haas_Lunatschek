# Entscheidungsprotokoll: Offline- & Caching-Strategie

## 1. Kontext & Problemstellung
Die Konferenz-Plattform *FrontendNow 2026* wird vor Ort unter realen Bedingungen genutzt: überlastete WLAN-Access-Points in den Vortragssälen, Verbindungsabbrüche beim Raumwechsel oder bewusste Nutzung des Flugmodus durch Besucher zur Akkuschonung. Ziel ist es, dass die Kernfunktionen der Applikation (Übersicht der Sessions, Detailinformationen, Filterung und das persönliche Programm) ohne Netzverbindung unterbrechungsfrei nutzbar bleiben, ohne dass weiße Bildschirme oder Browser-Fehlerseiten auftreten.

---

## 2. Optionen
* **Option A: Reines Network-First für alle Anfragen**
  * Versucht immer das Netzwerk zu erreichen; bei Fehlschlag Rückgriff auf Cache.
  * *Nachteil:* Bei schlechtem Empfang („Lie-Fi“) läuft der Browser in sekundenlange Timeouts, bevor Inhalte angezeigt werden. Unbrauchbar im Konferenzsaal.
* **Option B: Pauschales Cache-First für die gesamte Anwendung**
  * Alle Requests werden primär aus dem Cache bedient.
  * *Nachteil:* Raumverlegungen, kurzfristige Zeitplanänderungen oder Speaker-Absagen würden während der laufenden Konferenz niemals beim Besucher ankommen.
* **Option C: Differenzierte Strategie (Precache / Cache-First + Stale-While-Revalidate)** *(gewählt)*
  * Statische Assets (CSS, JS, Fonts, Icons) via Cache-First / Precaching.
  * Programmdaten (`conference-data.json`) via Stale-While-Revalidate (SWR).
  * Persönlicher State im `localStorage`, gestützt durch die gecachte HTML-App-Shell.

---

## 3. Entscheidung
Wir entscheiden uns für **Option C**:
1. **App-Shell & Statische Assets:** Pre-Rendering von `/` und `/schedule` via Nitro sowie Cache-First für statische Ressourcen, damit das Anwendungsgerüst in unter 50 ms gerendert wird.
2. **Konferenzdaten (`conference-data.json`):** Stale-While-Revalidate. Der Nutzer sieht sofort den lokalen Datenbestand. Im Hintergrund wird bei Netzempfang geprüft, ob Änderungen vorliegen, und der Cache transparent aktualisiert.
3. **Persönliches Programm:** Die App-Shell lädt offline via Service Worker; die gespeicherten Favoriten-IDs werden aus dem `localStorage` rehydriert.

Dieses Protokoll baut auf `docs/schritt2/01-rendering-strategie-adr.md` auf (`/speakers/**` via SSG `prerender: true`, `/sessions/**` via `swr: 60`, `/schedule` via CSR `ssr: false`). Um in Schritt 3 die Offline-Fähigkeit der PWA zu gewährleisten, wurden in `nuxt.config.ts` die Routen `/` und `/schedule` zusätzlich über `nitro.prerender.routes` als statische App-Shells vorgerendert, damit Workbox sie per `globPatterns` precachen kann. Die Aktualität der Programmdaten auf `/` bleibt dadurch gewahrt, dass `useConferenceData.ts` die `conference-data.json` clientseitig nachlädt und über die Workbox-Regel `StaleWhileRevalidate` aktuell hält.

---

## 4. Konsequenzen
* **Positiv:** Maximale Offline-Ausfallsicherheit bei gleichzeitig sofortiger visueller Rückmeldung ohne Ladezeiten. Kurzfristige Programmupdates fließen bei Netzverbindung automatisch ein.
* **Negativ / Trade-offs:** Änderungen am Zeitplan werden erst beim übernächsten Seitenaufruf sichtbar (SWR-Charakteristik), sofern kein manueller Reload-Prompt implementiert ist. Erfordert saubere Trennung von statischer HTML-Shell und dynamischen Daten.

---

## 5. Durchgeführte Testszenarien

### Szenario i: Programm online geladen, Flugmodus aktiviert, Session-Übersicht erneut geöffnet
* **Ausgangslage:** Die Web-App wird bei aktiver Internetverbindung im Browser geladen. Der Service Worker registriert sich erfolgreich (`activated and is running`), die App-Shell sowie `conference-data.json` werden in die Caches geschrieben.
* **Aktion:** Im Network-Tab der Chrome DevTools wird die Drosselung auf „Offline“ gestellt (Simulation des Flugmodus). Anschließend wird die Seite über die Adresszeile oder via `F5` hart neu geladen.
* **Beobachtetes Verhalten & Ergebnis:** Die Seite rendert ohne Verzögerung. Alle 20 Sessions werden vollständig angezeigt. Sämtliche Filter (Track, Level, Tag) funktionieren interaktiv clientseitig, da das Daten-Array im Speicher liegt. Im Network-Tab ist erkennbar, dass Dokumente und JSON-Dateien mit Status `200 (ServiceWorker)` ausgeliefert werden. Es erscheint keine Fehlermeldung.

### Szenario ii: „Mein Programm“ offline geöffnet nach Hinzufügen von Sessions
* **Ausgangslage:** Der Nutzer befindet sich online auf der Übersicht und markiert mehrere Vorträge über den Bookmark-Button (z. B. 3 Sessions für „Mein Programm“). Die IDs werden im `localStorage` persistiert.
* **Aktion:** Die Netzwerkverbindung wird gekappt („Offline“-Modus). Der Nutzer navigiert im Header über den Link `/schedule` auf „Mein Programm“ und führt anschließend einen Hard-Reload (`F5`) durch.
* **Beobachtetes Verhalten & Ergebnis:** Dank der vorberechneten Route `/schedule` und des `navigateFallback` liefert der Service Worker sofort die HTML-Shell für „Mein Programm“ aus. Das Composable `useSchedule` liest die 3 IDs aus dem `localStorage` aus und gleicht sie mit den gecachten Sessions ab. Alle 3 vorgemerkten Sessions werden korrekt dargestellt; Bookmarks können auch offline entfernt oder hinzugefügt werden.

### Szenario iii: Erstbesuch ohne vorheriges Online-Laden im Offline-Zustand (Grenzfall)
* **Ausgangslage:** Ein neuer Browser-Tab oder ein Inkognito-Fenster ohne vorigen Besuch der Konferenz-Website; der Cache und der `localStorage` sind komplett leer, der Service Worker ist noch nie installiert worden.
* **Aktion:** Bei bereits aktiviertem Offline-Modus wird die URL `http://localhost:3000/` aufgerufen.
* **Beobachtetes Verhalten & Ergebnis:** Der Browser zeigt die native Verbindungsfehlerseite (`ERR_INTERNET_DISCONNECTED`). Dies ist das einzig technisch mögliche und akzeptable Verhalten: Da ohne Erstverbindung weder ein Service Worker registriert noch die HTML-App-Shell heruntergeladen werden konnte, kann kein clientseitiges Caching greifen. PWAs erfordern zwingend mindestens einen initialen Online-Aufruf zur Installation des Offline-Fundaments.