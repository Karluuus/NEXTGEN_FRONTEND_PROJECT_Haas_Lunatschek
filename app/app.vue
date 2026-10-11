<!-- app/app.vue -->
<script setup lang="ts">
interface ConferenceData {
  sessions?: any[];
}

const {
  data: conference,
  pending,
  error,
} = useFetch<ConferenceData>("/conference-data.json", {
  server: false,
});
</script>

<template>
  <NuxtLayout>
    <!-- Funktionsnachweis: Datenbasis ausgelesen -->
    <section
      style="
        background: var(--color-surface-card, #ffffff);
        padding: var(--layout-card-padding, 1.5rem);
        border: 1px solid var(--color-border-subtle, #e2e8f0);
        border-radius: 8px;
      "
    >
      <h2 style="margin-top: 0; font-size: var(--font-size-xl, 1.5rem)">
        Schritt 1: Status des Grundgerüsts
      </h2>

      <p v-if="pending">Lade Konferenzdaten...</p>

      <p v-else-if="conference">
        Datenbasis erfolgreich verbunden:
        <strong style="color: var(--color-interactive-primary, #2563eb)">
          {{ conference.sessions?.length ?? 0 }} Sessions
        </strong>
        geladen.
      </p>

      <p v-else-if="error" style="color: red">
        Fehler beim Laden: Liegt 'conference-data.json' im Ordner 'public/'?
      </p>
    </section>
  </NuxtLayout>
</template>
