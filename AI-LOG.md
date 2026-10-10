# AI-Usage Log & Dokumentation (Schritt 1)

## 1. Grundsatz & Transparenzerklärung
Im Rahmen von Schritt 1 der Projektarbeit im Master-Modul *Next Generation Web Frontends* wurde generative KI als assistierendes Werkzeug zur Ideenfindung, Konzeption und Überprüfung von Barrierefreiheitswerten eingesetzt. Alle architektonischen und gestalterischen Richtungsentscheidungen wurden eigenständig im Team diskutiert, bewertet und validiert.

* **Verwendetes Werkzeug:** LLM-basierter Entwicklungsassistent
* **Beteiligte Teammitglieder:** Person 1 & Person 2 (PineDev gmbh & co. kg)

---

## 2. Einsatzbereiche & Workflows

| Phase / Aufgabe | Einsatzbereich der KI | Eigene Leistung & Kritische Reflexion |
| :--- | :--- | :--- |
| **A: Branding & Tokens** | Inspiration für Farbnamen; Berechnung von relativen Kontrastwerten basierend auf WCAG 2.1 Richtlinien. | Festlegung der tiefgrünen Markenidentität (*PineDev*); manuelle Gegenprüfung der Kontrastwerte im *WebAIM Contrast Checker* (u. a. Validierung von 16.8:1 für Haupttext). |
| **A: Token-Architektur** | Strukturierungsvorschlag zur sauberen Kapselung von primitiven und semantischen Tokens in CSS Custom Properties. | Festlegung des 4px-Rhythmus und manuelle Sicherstellung, dass Tokens in der Nuxt-Konfiguration global verfügbar sind. |
| **D: Technologie-ADR** | Entwurf von Gegenüberstellungs-Kriterien für Single-Page (Vite) vs. Meta-Framework (Nuxt 3). | Bewertung der Frameworks anhand unseres Team-Wissensstands; bewusste Entscheidung für Nuxt 3 zur Vermeidung von Migrationsaufwänden in Schritt 2. |
| **B & C: Architektur & State** ....

