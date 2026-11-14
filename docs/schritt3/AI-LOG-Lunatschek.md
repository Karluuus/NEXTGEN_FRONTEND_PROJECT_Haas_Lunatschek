# AI-LOG — Schritt 3: PWA & Offline-Strategie (Person 2)

## Eintrag 1
* **Datum:** 2026-11-13
* **Tool:** Gemini 3.8 Flash
* **Prompt im Wortlaut:**  
> "Wie konfiguriere ich in `@vite-pwa/nuxt` über workbox.runtimeCaching eine Stale-While-Revalidate-Strategie spezifisch für eine lokale JSON-Datei wie 'conference-data.json'? Welche Optionen für Expiration und Cache-Namen sind best practice?"
* **Zweck:**  
  Umsetzung der federführenden Aufgabe C von Person 2: Caching-Regel für die Konferenzdaten, um Updates transparent im Hintergrund abzurufen, während der Nutzer sofort Daten angezeigt bekommt.

---

## Eintrag 2
* **Datum:** 2026-11-14
* **Tool:** Gemini 3.8 Flash
* **Prompt im Wortlaut:**  
> "Ich muss ein Entscheidungsprotokoll im ADR-Format (Kontext -> Optionen -> Entscheidung -> Konsequenzen) für eine PWA-Offline-Strategie verfassen. Welche Argumente sprechen bei Konferenzdaten für Stale-While-Revalidate statt purem Cache-First oder Network-First bezogen auf kurzfristige Raumänderungen?"
* **Zweck:**  
  Strukturierung und Formulierung der Begründungstiefe für Aufgabe D (`03-entscheidungsprotokoll.md`), insbesondere für den Abgleich zwischen Cache-First und SWR bei Konferenzszenarien.

---

## Eintrag 3
* **Datum:** 2026-11-14
* **Tool:** Gemini 3.8 Flash
* **Prompt im Wortlaut:**  
> "Für die PWA-Abgabe müssen 3 konkrete Offline-Szenarien beschrieben werden: 1. Programm geladen -> Flugmodus -> Übersicht erneut öffnen; 2. 'Mein Programm' offline öffnen nach Hinzufügen von Sessions; 3. Erstbesuch komplett offline. Wie beschreibe ich das erwartete vs. akzeptable Verhalten für Szenario 3 technisch präzise?"
* **Zweck:**  
  Ausarbeitung der drei Testszenarien für das Protokoll mit jeweils 80–120 Wörtern, insbesondere die technische Begründung des Grenzwert-Falls (Szenario iii).

---

## Eintrag 4
* **Datum:** 2026-11-14
* **Tool:** Gemini 3.8 Flash
* **Prompt im Wortlaut:**  
> "Welche Kriterien prüft das Lighthouse PWA-Audit in Chrome DevTools genau und welche typischen Lücken oder Einschränkungen sollte man in einem Verifikationsbericht (150-200 Wörter) ehrlich reflektieren?"
* **Zweck:**  
  Vorbereitung von Aufgabe E (`04-verifikations-nachweis.md`), um die Testergebnisse sachlich einzuordnen und die im Bewertungsfokus geforderten Lücken (z. B. fehlendes Update-Toast-Banner bei SWR-Datenaktualisierung) fundiert zu dokumentieren.