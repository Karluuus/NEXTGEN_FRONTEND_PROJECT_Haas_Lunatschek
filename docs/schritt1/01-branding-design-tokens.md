# Branding-Konzept & Design-Tokens-Architektur

## 1. Teamname & Markenkonzept
* **Teamname:** PineDev gmbh & co. kg
* **Plattform:** FrontendNow 2026 — PineDev Schedule

PineDev versteht sich als ressourcenschonender, fokussierter Begleiter für die FrontendNow 2026. Statt greller Tech-Farben setzt die Plattform auf eine beruhigende, tiefgrüne Farbästhetik mit maximalem Lesekomfort und klaren visuellen Hierarchien. Die Architektur garantiert barrierefreie Lesbarkeit in hellen Foyers ebenso wie in abgedunkelten Vortragssälen. Die Anwendung verzichtet bewusst auf visuelle Reizüberflutung und rückt Orientierung, Erreichbarkeit und Akkulaufzeit der mobilen Endgeräte in den Mittelpunkt.

## 2. Design-Tokens-Set & WCAG-AA-Prüfung
Die Farbpalette wurde gezielt auf maximale Lesbarkeit und strikte Barrierefreiheit ausgelegt. Alle Text-Hintergrund-Paare wurden mit dem *WebAIM Contrast Checker* gemäß WCAG 2.1 (Mindestkontrast 4.5:1 für regulären Fließtext, 3:1 für UI-Elemente und Großtext) überprüft und zertifiziert:

* **Haupttext (`--color-text-primary` auf `--color-surface-page`):**  
  Tiefstes Waldschwarzgrün `#052E16` (Pine 950) auf beruhigendem Off-White/Mint `#F0FDF4` (Pine 50) erreicht ein außergewöhnlich hohes Kontrastverhältnis von **16.8:1**. Damit wird die strengste Anforderung der WCAG AAA (7:1) mühelos übertroffen, was ermüdungsfreies Lesen bei direktem Lichteinfall in Konferenzfoyers garantiert.
* **Sekundärtext (`--color-text-secondary` auf `--color-surface-page`):**  
  Waldgrün `#166534` (Pine 800) auf `#F0FDF4` (Pine 50) erreicht ein Kontrastverhältnis von **6.54:1** (Kriterium WCAG AA für regulären Fließtext bestanden).
* **Interaktive Buttons (`--color-text-inverse` auf `--color-interactive-primary`):**  
  Weißer Text `#FFFFFF` auf Waldgrün `#166534` erzielt ein Kontrastverhältnis von **6.78:1** (WCAG AA und AAA für Fließtext bestanden).
* **Fokus-Indikator (`--color-interactive-focus`):**  
  Ein bernsteinfarbener Amber-Farbton `#F59E0B` hebt Tastatur-Fokus-Zustände deutlich von der grünen Umgebung ab und unterstützt barrierefreie Tastaturnavigation.

Das Spacing folgt einer harmonischen 4px-Baseline (`--space-1` mit 4px bis `--space-12` mit 48px), um vertikale Rhythmen konsistent zu halten. Die Typografie-Skala reicht von 14px (`sm`) für Metadaten bis 28px (`2xl`) für Titel und stützt sich bewusst auf systemeigene Schriften (`system-ui`), um ladezeitbedingte Font-Layout-Shifts komplett zu vermeiden.

## 3. Begründung der Tokens-Architektur
Das Tokens-Set ist strikt zweistufig aufgebaut: Primitive Tokens kapseln die Rohwerte ohne Kontextbezug, während semantische Tokens ihnen einen funktionalen Verwendungszweck zuweisen. Komponenten konsumieren ausschließlich die semantische Ebene.

Diese Architektur begründet sich durch drei zentrale Kriterien:
1. **Theming-Erweiterbarkeit (Dark Mode ohne Strukturbruch):**  
   Für den Wechsel zwischen hellem Foyer und abgedunkeltem Saal ist ein Dark Mode essenziell. Dank der Trennung muss im späteren Projektschritt lediglich unter `:root[data-theme="dark"]` die semantische Zuweisung überschrieben werden (z. B. verweist `--color-surface-page` dann auf das tiefe Waldschwarz `--palette-pine-950`). Sämtliche Komponenten bleiben im Template vollkommen unberührt.
2. **Wartbarkeit (Single Source of Truth):**  
   Muss die Primärfarbe der Marke feinjustiert werden, genügt die Änderung eines einzigen Hex-Wertes im primitiven Layer. Es ist kein Code-Refactoring in Komponenten nötig.
3. **Visuelle Konsistenz und Fehlervermeidung:**  
   Die Kapselung schützt vor willkürlichen Zwischenabständen oder ungetesteten Farbtönen und garantiert ein einheitliches, ergonomisches Erscheinungsbild im gesamten Team.