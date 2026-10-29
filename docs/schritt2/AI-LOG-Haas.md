# AI-Usage Log — Schritt 2 (Person 1)

## Chronologischer Ablauf & Prompt-Dokumentation

### Eintrag 1: Architektur & Routing-Umstellung

- **Datum:** 27. Oktober 2026
- **Tool:** Google Gemini 3.8 Flash
- **Prompt im Wortlaut:**
  > _„Wir haben Nuxt 4 mit app/app.vue und app/layouts/default.vue aus Schritt 1. Wir wollen jetzt dateibasiertes Routing aktivieren. In app.vue stand bisher nur ein statischer Funktionsnachweis. Wie muss app.vue strukturiert sein, damit Seiten aus dem pages-Ordner gerendert werden, und wie bauen wir ein Standard-Layout mit barrierefreier Navigation (Programm, Speaker, Mein Programm)?“_
- **Zweck & Reflexion:**  
  Klären der Nuxt-4-Konventionen für `<NuxtPage />` und Sicherstellen, dass das Layout-Template die in Schritt 1 definierten Design-Tokens verwendet. Das erzeugte Layout wurde manuell um Screenreader-Attribute (`aria-label`) und semantische HTML5-Tags erweitert.

---

### Eintrag 2: Headless-Composable für kombinierte UND-Filterung

- **Datum:** 28. Oktober 2026
- **Tool:** Google Gemini 3.8 Flash
- **Prompt im Wortlaut:**
  > _„Schreibe ein Vue 3 Composable useSessionFilter(sessions: Ref<Session[]>), das die Liste nach Track (trackId), Konferenztag (day) und Level (level) filtert. Alle Filter müssen als UND-Bedingung verknüpft sein. Biete Hilfsfunktionen wie resetFilters() und hasActiveFilters an. Das Composable muss headless sein, also komplett frei von UI-Code.“_
- **Zweck & Reflexion:**  
  Umsetzung der im Schritt-1-ADR versprochenen Headless-Architektur. Das Composable kapselt die Geschäftslogik für die Filterkombination strikt von der visuellen Darstellung. Die reaktive Computed-Property garantiert optimale Performance bei Werteänderungen.

---

### Eintrag 3: Behebung von TypeScript-Pfadaliasing & SonarQube-Warnungen

- **Datum:** 28. Oktober 2026
- **Tool:** Google Gemini 3.8 Flash
- **Prompt im Wortlaut:**
  > _„In Nuxt erhalte ich beim Import von ~/components/ die Meldung 'Cannot find module'. Die Komponenten liegen im Root, während app.vue in /app liegt. Wie ist der Unterschied zwischen ~ und ~~? Zudem meldet SonarQube zwei Warnungen: S6819 (role='region' statt section) und S9449 (transition: all vermeiden). Wie behebe ich das sauber?“_
- **Zweck & Reflexion:**  
  Diagnose des Nuxt-Root-Alias `~~/` und Code-Quality-Refactoring. Statt pauschaler CSS-Transitions (`transition: all`) wurden explizite Eigenschaften (`background-color`, `border-color`) definiert, um Nebeneffekte und Render-Jank zu verhindern. Das ARIA-Attribut wurde durch ein semantisches `<section aria-label="...">` ersetzt.

---

### Eintrag 4: Entkopplung von Speaker-Detailansicht und Teaser-Cards

- **Datum:** 28. Oktober 2026
- **Tool:** Google Gemini 3.8 Flash
- **Prompt im Wortlaut:**
  > _„Erstelle für Feature D zwei Komponenten: SpeakerCard.vue für die Übersicht und SpeakerDetail.vue für die Route /speakers/[id]. Ein Speaker hat id, name, title, company, bio und sessionIds. In der Detailansicht sollen alle gehaltenen Sessions mit Uhrzeit, Raum, Track und Level gerendert werden. Die Daten stammen aus useConferenceData().“_
- **Zweck & Reflexion:**  
  Einhaltung der in Schritt 1 definierten Komponentenstruktur (`components/speakers/`). Sicherstellen, dass die Relationen zwischen Speakern und Sessions über die IDs korrekt aufgelöst werden und kein redundanter State entsteht.

---

### Eintrag 5: Full-Bleed-Layout & Widescreen-Optimierung

- **Datum:** 28. Oktober 2026
- **Tool:** Google Gemini 3.8 Flash
- **Prompt im Wortlaut:**
  > _„Auf einem Breitbild-Monitor ziehen sich die Speaker-Karten zu weit auseinander und die Trennlinien von Header und Footer hören bei 1200px auf. Wie baut man ein Full-Bleed-Layout, bei dem die Trennlinien über die gesamte Viewport-Breite (100vw) laufen, der Inhalt aber auf max-width 1200px zentriert bleibt? Zudem soll der Hauptinhalt immer einen Sicherheitsabstand zum Footer haben.“_
- **Zweck & Reflexion:**  
  Optimierung der Benutzeroberfläche für verschiedene Bildschirmauflösungen. Einführung des inneren Zentrierungs-Containers (`.header-inner`, `.main-content`, `.footer-inner`) und Beseitigung von Layout-Overlap bei den Grid-Karten.

---

## Kritische Reflexion zum KI-Einsatz

Die generative KI wurde gezielt zur Fehlerdiagnose (Pfadauflösung, CSS-Box-Modell), zur Formulierung wiederholbarer UI-Bausteine und zur Absicherung gegen Accessibility-Regeln (SonarQube) eingesetzt. Sämtliche Datenflüsse wurden manuell mit den Schnittstellen aus `types/conference.ts` abgeglichen. Die architektonische Zuordnung der Rendering-Strategien (SSG für statische Profile, ISR/SWR für die filterbare Übersicht) basiert auf den realen Anforderungen der Konferenzplattform und wurde eigenständig validiert.
