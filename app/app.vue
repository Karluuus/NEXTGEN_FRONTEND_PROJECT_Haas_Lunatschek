<script setup lang="ts">
interface ConferenceData {
  sessions?: any[]
}

const { data: conference, pending, error } = useFetch<ConferenceData>('/conference-data.json', {
  server: false
})
</script>

<template>
  <main style="
    padding: var(--layout-page-padding);
    background-color: var(--color-surface-page);
    min-height: 100vh;
    color: var(--color-text-primary);
    font-family: var(--font-family-sans);
  ">
    <!-- Header mit sichtbarem Branding -->
    <header style="
      border-bottom: 1px solid var(--color-border-subtle);
      padding-bottom: var(--space-4);
      margin-bottom: var(--space-6);
    ">
      <h1 style="color: var(--color-interactive-primary); margin: 0; font-size: var(--font-size-2xl);">
        FrontendNow 2026
      </h1>
      <p style="color: var(--color-text-secondary); margin: var(--space-1) 0 0 0;">
        Plattform von PineDev gmbh & co. kg
      </p>
    </header>

    <!-- "Datenbasis" ausgelesen -->
    <section style="
      background: var(--color-surface-card);
      padding: var(--layout-card-padding);
      border: 1px solid var(--color-border-subtle);
      border-radius: 8px;
    ">
      <h2 style="margin-top: 0; font-size: var(--font-size-xl);">Schritt 1: Status des Grundgerüsts</h2>
      
      <p v-if="pending">Lade Konferenzdaten...</p>
      
      <p v-else-if="conference">
        Datenbasis erfolgreich verbunden: 
        <strong style="color: var(--color-interactive-primary);">
          {{ conference.sessions?.length ?? 0 }} Sessions
        </strong> geladen.
      </p>
      
      <p v-else-if="error" style="color: red;">
        Fehler beim Laden: Liegt 'conference-data.json' im Ordner 'public/'?
      </p>
    </section>
  </main>
</template>