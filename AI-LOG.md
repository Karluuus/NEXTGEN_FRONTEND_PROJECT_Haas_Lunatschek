# AI-Usage Log & Dokumentation (Schritt 1)

## 1. Grundsatz & Transparenzerklärung
Im Rahmen von Schritt 1 der Projektarbeit im Master-Modul *Next Generation Web Frontends* wurde generative KI als assistierendes Werkzeug zur Ideenfindung, Konzeption, Textoptimierung (Grammatik, Rechtschreibung, Stilistik) sowie zur Überprüfung von Barrierefreiheitswerten eingesetzt. Alle architektonischen und gestalterischen Richtungsentscheidungen wurden eigenständig im Team diskutiert, bewertet und validiert.

* **Meta-Transparenz:** Zur vollständigen Offenlegung wird festgehalten, dass auch das Grundgerüst und die Formulierung dieses Transparenzberichts (`AI-LOG.md`) mithilfe des KI-Assistenten entworfen und anschließend von den Teammitgliedern geprüft und freigegeben wurden.
* **Verwendetes Werkzeug:** LLM-basierter Entwicklungsassistent
* **Datum / Bearbeitungszeitraum:** Oktober 2026
* **Beteiligte Teammitglieder:** Person 1 & Person 2 (PineDev gmbh & co. kg)

---

## 2. Einsatzbereiche & Workflows

| Phase / Aufgabe | Einsatzbereich der KI | Eigene Leistung & Kritische Reflexion |
| :--- | :--- | :--- |
| **A: Branding & Tokens** | Inspiration für Farbnamen; theoretische Kontrastberechnung; Formulierungshilfe für die Design-Begründung. | Festlegung der tiefgrünen Markenidentität (*PineDev*); manuelle Gegenprüfung im *WebAIM Contrast Checker* und Korrektur auf die realen 14.23:1; Definition des 4px-Rhythmus. |
| **A: Token-Architektur** | Strukturierungsvorschlag zur sauberen Kapselung von primitiven und semantischen Tokens in CSS Custom Properties. | Technische Einbindung der Tokens in `nuxt.config.ts`; Sicherstellung, dass primitive Werte nicht direkt im UI verwendet werden. |
| **D: Technologie-ADR** | Entwurf von Gegenüberstellungs-Kriterien für Single-Page (Vite) vs. Meta-Framework (Nuxt 3); stilistische Überarbeitung. | Bewertung der Frameworks anhand unseres Team-Wissensstands; bewusste Entscheidung für Nuxt 3 zur Vermeidung von Migrationsaufwänden in Schritt 2. |
| **B: Architektur-ADR** | Strukturierungsvorlage für das ADR nach Nygard/MADR; Formulierungshilfe und sprachliche Glättung (Grammatik & Fachtermini) für die Schichten- und Headless-Optionen. | Auswahl der Feature-/Domänen-Struktur (`components/{sessions,speakers,schedule}`); Definition der konkreten Komponentenübersicht; bewusste Entscheidung für die Entkopplung der Filterlogik in `useSessionFilter`. |
| **C: State-Management** | Syntaxunterstützung für das Mermaid.js-Sequenzdiagramm; sprachliche Verfeinerung des Konzepts. | Festlegung auf reine ID-Persistierung im `localStorage` zur Vermeidung von Stale Data; architektonische Absicherung der Rehydration gegen Nuxt-SSR-Hydration-Mismatches (`process.client` / `onMounted`). |
| **Dokumentation & Meta** | Erstellung der Struktur und Vorlage für dieses `AI-LOG.md`. | Kritische Überprüfung der Angaben, Abgleich mit den tatsächlich getroffenen Entscheidungen und finale Freigabe durch das Team. |

---

## 3. Kritische Reflexion & Erkenntnisse
* **Textgenerierung & Sprachqualität:** Generative KI wurde gezielt eingesetzt, um Argumentationen in den ADRs präzise zu formulieren und Rechtschreibung sowie Grammatik abzusichern. Alle vorgeschlagenen Begründungen wurden auf fachliche Korrektheit bezüglich Nuxt 3 und Vue 3 geprüft.
* **Manuelle Validierung:** Theoretische Werte (wie Luminanz und Kontrast) wurden nicht blind übernommen, sondern über das offizielle WebAIM-Werkzeug nachgemessen und im Dokument korrigiert.
* **Architektur-Verantwortung:** Die vorgeschlagenen Schichten und Composables wurden nicht als Selbstzweck übernommen, sondern passgenau auf die Anforderungen der Konferenzplattform (Trennung von UI und Filter-/Bookmark-Logik) zugeschnitten. Das Projekt-Grundgerüst (Nuxt-Scaffolding, Ordnerhierarchie, Design-Token-Einbindung) wurde eigenständig aufgesetzt und lokal via npm run dev auf Fehlerfreiheit verifiziert.