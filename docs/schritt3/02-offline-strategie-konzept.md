# Konzept: Offline- & Caching-Strategie für FrontendNow 2026

## 1. Kontext & Reale Nutzungssituation
Auf einer Konferenz mit hunderten Teilnehmenden ist die Netzwerkinfrastruktur oft instabil: Überlastete WLAN-Access-Points im Vortragssaal, Verbindungsabbrüche beim Wechsel zwischen Räumen oder bewusste Nutzung des Flugmodus zur Schonung des Smartphone-Akkus gehören zum Alltag. Eine Konferenz-App darf in solchen Momenten weder einfrieren („Lie-Fi“) noch eine Browser-Fehlerseite anzeigen. Aus diesem Grund setzen wir auf eine zielgerichtete Caching-Strategie, differenziert nach Datentyp und Veränderlichkeit.

---

## 2. Caching-Strategien nach Datentyp im Vergleich

### A. Statische Assets & App-Shell (Strategie: Cache-First / Precache)
* **Umfang:** HTML-Gerüst, JavaScript-Bundles, Design-Tokens-CSS (`tokens.css`), Webfonts und PWA-Icons.
* **Begründung:** Diese Dateien sind immutable (mit Content-Hashes versehen) und verändern sich während der laufenden Konferenz nicht. Mit **Cache-First** umgeht die App die Netzwerkanfrage vollständig.
* **Nutzungssituation:** Selbst im tiefsten Funkloch des Keller-Vortragssaals lädt die Anwendung in unter 50 ms direkt aus dem lokalen Cache. Die Festlegung von `navigateFallback: "/"` garantiert, dass die App-Shell für sämtliche Routen (auch Deep-Links) offline sofort verfügbar ist. Ein *Network-First*-Ansatz wäre fatal, da der Browser bei schlechtem Empfang sekundenlang in einen Netzwerk-Timeout läuft.

### B. Konferenzdaten & Zeitplan (Strategie: Stale-While-Revalidate)
* **Umfang:** `conference-data.json` sowie die aggregierten Session- und Speaker-Daten.
* **Begründung:** Programmdaten sind nach Veröffentlichung weitgehend statisch, aber nicht unantastbar. Am Eventtag kann es zu kurzfristigen Raumverlegungen, Programmverschiebungen oder Speaker-Absagen kommen.
* **Vergleich Cache-First vs. Stale-While-Revalidate:**
  * Reines *Cache-First* würde Änderungen ignorieren, sodass Besucher vor verschlossenen Türen stünden, da der Cache nie von sich aus aktualisiert.
  * **Stale-While-Revalidate (SWR)** liefert dem Nutzer sofort und ohne Ladezeit den aktuell gecachten Zeitplan aus dem Speicher. Gleichzeitig sendet der Service Worker im Hintergrund eine Anfrage an das Netzwerk. Erreicht diese den Server, wird der Cache für den nächsten Aufruf transparent aktualisiert.

### C. „Mein Programm“ / Persönliche Merkliste (Strategie: Hybrid localStorage + Cache-First App-Shell)
* **Umfang:** Persönliche Favoriten unter `/schedule`.
* **Begründung:** Der persönliche State (Session-IDs) wird clientseitig im `localStorage` persistiert. Client-Storage nützt offline jedoch nichts, wenn die Route `/schedule` ohne Netzwerk nicht geladen werden kann. Durch das Caching der App-Shell rendert die Seite offline fehlerfrei; das Composable `useSchedule` rehydriert die gespeicherten IDs lokal und gleicht sie mit den gecachten Sessions ab. Vormerkungen können selbst im Flugmodus unterbrechungsfrei vorgenommen werden.

---

## 3. Worst-Case-Szenario: Verbindungsabbruch während der Nutzung
Bricht die WLAN-Verbindung mitten in der Bedienung ab, fängt die App diesen Zustand transparent ab:
* Anfragen nach Programmdaten fallen lautlos auf den gecachten Stand zurück – es erscheint weder ein Ladebalken noch ein Netzwerk-Error.
* Lesezeichen werden synchron in den `localStorage` geschrieben und gehen nicht verloren.
* Der Besucher kann sich weiterhin im kompletten Programm orientieren, Räume nachschlagen und den eigenen Zeitplan organisieren.