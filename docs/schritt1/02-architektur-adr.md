# B: Architekturentscheidung: Komponenten- & Ordnerstruktur (ADR)

## Kontext

Für die Frontend-Konferenzplattform „FrontendNow“ benötigen wir auf Basis von Nuxt 3 eine skalierbare und verständliche Projekt- und Ordnerstruktur. Die Anwendung umfasst Sessions, Speaker-Profile, Filtersysteme und einen personalisierten Zeitplan. Wir müssen definieren, wie Komponenten strukturiert werden (Base/UI, Feature, Layout) und wie komplexere Interaktionen (z.B. die Session-Filterung) entkoppelt werden, um Wartbarkeit zu sichern.

## Betrachtete Optionen

### Bereich 1: Ordner- und Schichtenstruktur

#### Option 1: Rein schichtenbasierte Ordnerstruktur (Layer-based)

- **Aufbau:** `components/base/` (neutrale Buttons, Badges) und `components/features/` (alle fachlichen Komponenten flach nebeneinander).
- **Vorteile:** Sehr einfacher Einstieg, spiegelt die geforderten Schichten 1:1 wider.
- **Nachteile:** Der Ordner `features/` wird bei vielen Komponenten schnell unübersichtlich; fachlich zusammenhängende Dateien (z. B. alles zu Speakern) liegen verstreut.

#### Option 2: Domänen-/Feature-basierte Ordnerstruktur mit getrennter UI-Schicht (Gewählt)

- **Aufbau:** `components/ui/` für das übergreifende Design-System sowie domänenspezifische Ordner (`components/sessions/`, `components/speakers/`, `components/schedule/`).
- **Vorteile:** Hoher fachlicher Zusammenhang (alles zu einem Thema liegt beieinander), gute Skalierbarkeit bei wachsender App und Nuxt benennt Komponenten über Ordner automatisch eindeutig (z. B. `<SessionsCard />`).
- **Nachteile:** Mehr Verzeichnisse und Abstimmungsbedarf bei Elementen die möglicherweise überschneidend sind.

---

### Bereich 2: Interaktions-Architektur (Session-Filterung)

#### Option A: Monolithische UI-Komponente

- **Aufbau:** Filterlogik (Such-Algorithmus, reaktive Filter-States) und Darstellung (Inputs, Badges, Dropdowns) liegen gemeinsam in einer `.vue`-Datei.
- **Vorteile:** Alles an einem Ort, schnelle Anfangsimplementierung.
- **Nachteile:** Filterlogik kann nicht wiederverwendet werden (z. B. für mobile Filter-Drawers vs. Desktop-Sidebar).

#### Option B: Headless-Aufteilung via Composable `useSessionFilter` (Gewählt)

- **Aufbau:** Die Filter-, Sortier- und Suchlogik wird als UI-unabhängiges Composable (`useSessionFilter.ts`) umgesetzt. Die Komponenten dienen rein zur Darstellung.
- **Vorteile:** UI austauschbar (z. B. schnelles Umschalten zwischen Suchleiste und Dropdowns), kein Duplizieren von Filtercode.
- **Nachteile:** Zusätzliche Abstraktionsschicht.

---

## Entscheidung

1. Wir wählen **Option 2 (Domänen-basierte Struktur)**: Neutrale Komponenten verbleiben in `components/ui/`, fachliche Komponenten werden nach Domänen gegliedert.
2. Wir wählen **Option B (Headless-Pattern)** für die Session-Filterung: Die Logik wird in ein separates Composable ausgelagert, um Darstellung und Filterregeln strikt zu trennen.

## Konsequenzen

- **Positiv:** Klare Trennung von Zuständigkeiten; Design-System-Komponenten sind unabhängig von Konferenzdaten wiederverwendbar; Filterlogik ist headless für verschiedene Geräteklassen nutzbar.
- **Negativ:** Mehr Dateien und Ordner; Disziplin im Team nötig, um UI-Komponenten strikt dumm zu halten.

---

## Komponentenübersicht (Geplante Struktur)

### 1. Layout-Schicht (`layouts/`)

- `app/layouts/default.vue`: Grundgerüst mit Header, Navigation, Inhaltsbereich und Footer.

### 2. Base / UI-Schicht (`components/ui/`)

- `BaseButton.vue`: Universeller Button.
- `BaseBadge.vue`: Status- und Track-Tags.
- `BaseCard.vue`: Universelle Kartenansicht für Inhalte.
- `BaseInput.vue`: Eingabefeld für Suchfunktion.

### 3. Feature-Schicht (`components/`)

- **Sessions (`components/sessions/`):**
  - `SessionList.vue`: Listenanzeige aller gefilterten Sessions.
  - `SessionCard.vue`: Einzelkarte einer Session mit Speaker, Raum und Zeit.
  - `SessionFilterBar.vue`: UI-Darstellung der Filterkriterien (greift auf `useSessionFilter` zu).
- **Speakers (`components/speakers/`):**
  - `SpeakerCard.vue`: Teaser-Profil eines Vortragenden.
  - `SpeakerDetail.vue`: Vollständige Biografie mit zugeordneten Talks.
- **Schedule (`components/schedule/`):**
  - `ScheduleTimeline.vue`: Chronologische Ansicht des persönlichen Plans.
  - `BookmarkButton.vue`: Button zum Merken einer Session.
