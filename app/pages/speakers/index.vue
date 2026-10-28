<!-- pages/speakers/index.vue -->
<script setup lang="ts">
import { useConferenceData } from "~~/composables/useConferenceData";
import SpeakerCard from "~~/components/speakers/SpeakerCard.vue";

const { speakers } = useConferenceData();
</script>

<template>
  <div class="speakers-overview">
    <header class="page-header">
      <h2 class="page-title">Speaker & Referenten</h2>
      <p class="page-desc">
        Alle 18 Expertinnen und Experten der FrontendNow 2026 im Überblick.
      </p>
    </header>

    <div class="speakers-grid">
      <SpeakerCard
        v-for="speaker in speakers"
        :key="speaker.id"
        :speaker="speaker"
      />
    </div>
  </div>
</template>

<style scoped>
.speakers-overview {
  display: flex;
  flex-direction: column;
  margin-bottom: var(--space-8); /* Genug Abstand zum Footer */
}

.page-header {
  margin-bottom: var(--space-6);
}

.page-title {
  margin: 0;
  font-size: var(--font-size-2xl);
  color: var(--color-text-primary);
}

.page-desc {
  margin: var(--space-1) 0 0 0;
  color: var(--color-text-secondary);
  font-size: var(--font-size-base);
}

.speakers-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: var(--space-6); /* Angenehmer Abstand zwischen den Karten */
}
</style>
