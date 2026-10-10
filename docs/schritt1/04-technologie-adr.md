# ADR: Technologieentscheidung Projekt-Setup

## Status
Akzeptiert

## Kontext
Für die Konferenzplattform "FrontendNow 2026" von PineDev muss das grundlegende Entwicklungs-Setup und Tooling verbindlich festgelegt werden. Die Plattform wird in späteren Schritten mehrere Seitentypen umfassen: eine aggregierte Übersicht aller Sessions, dynamische Detailansichten für einzelne Vorträge und Speaker sowie ein personalisiertes Dashboard ("Mein Programm"). Gegenstand dieses ADRs ist ausschließlich die Setup- und Tooling-Entscheidung; Rendering-Strategien (wie SSG oder SSR) sind explizit Gegenstand von Schritt 2.

## Betrachtete Optionen

### Option 1: Vue 3 + Vite + vue-router
* **Beschreibung:** Ein klassisches Single-Page-Application-Setup mit manuellem Routing.
* **Vorteile:** Volle Kontrolle über jede einzelne Konfigurationszeile, minimaler Framework-Overhead, sehr transparente Lernkurve für das Entwicklerteam.
* **Nachteile:** Dynamische Routen (z. B. Session-Detailseiten) müssen manuell in einer Konfigurationsdatei gepflegt werden. Zukünftige Optimierungen der Rendering-Strategie in Schritt 2 erfordern manuellen Konfigurationsaufwand und Plugin-Erweiterungen.

### Option 2: Nuxt 3 (Gewählt)
* **Beschreibung:** Auf Vue 3 und Vite aufsetzendes Meta-Framework mit konventionsbasiertem, dateibasiertem Routing und Auto-Imports.
* **Vorteile:**
  * **Dateibasiertes Routing:** Routen und dynamische Parameterseiten entstehen intuitiv über das Dateisystem (`pages/sessions/[id].vue`), was Konfigurationscode und Fehlerquellen im Team minimiert.
  * **Auto-Imports:** Nuxt importiert Composables (`useConferenceData`, `useSchedule`) sowie Vue-Core-APIs automatisch, was die Codebasis schlank und wartbar hält.
  * **Zukunftssicherheit für Schritt 2:** Nuxt bietet eine native Vorbereitung auf hybride Rendering-Strategien (SSG, Prerendering), wodurch spätere Architekturanpassungen ohne Tooling-Wechsel umsetzbar sind.
* **Nachteile:** Höhere Abstraktionsebene; Zugriffe auf browserbasierte APIs wie den `localStorage` müssen bewusst in Client-Only-Hooks gekapselt werden, um Hydration-Mismatches zu vermeiden.

## Entscheidung
Wir entscheiden uns für **Option 2: Nuxt 3**.

Die strukturellen Vorteile des automatischen Routings für verschiedene Seitentypen sowie die nahtlose Basis für die Rendering-Anforderungen in Schritt 2 überwiegen die Einarbeitungszeit deutlich. Die nötige Kapselung von `localStorage`-Zugriffen wird durch klare Architekturvorgaben im Composable gelöst.

## Konsequenzen
* Das Projekt wird über die Nuxt CLI aufgesetzt.
* Die Seitenstruktur wird über den Ordner `/pages` verwaltet.
* Das State-Management berücksichtigt Nuxt-Client-Lifecycles für den `localStorage`.