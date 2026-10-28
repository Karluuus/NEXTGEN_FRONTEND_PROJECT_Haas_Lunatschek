<!-- pages/speakers/[id].vue -->
<script setup lang="ts">
import { useRoute } from "vue-router";
import { computed } from "vue";
import { useConferenceData } from "~~/composables/useConferenceData";
import SpeakerDetail from "~~/components/speakers/SpeakerDetail.vue";

const route = useRoute();
const speakerId = computed(() => route.params.id as string);

const { getSpeakerById, getSessionsForSpeaker } = useConferenceData();

const speaker = getSpeakerById(speakerId.value);
const speakerSessions = getSessionsForSpeaker(speakerId.value);
</script>

<template>
  <div class="speaker-page">
    <div class="breadcrumbs">
      <NuxtLink to="/speakers" class="back-link"
        >← Zurück zu allen Speakern</NuxtLink
      >
    </div>

    <!-- Speaker gefunden -->
    <SpeakerDetail
      v-if="speaker"
      :speaker="speaker"
      :sessions="speakerSessions"
    />

    <!-- 404 Fallback -->
    <div v-else class="not-found">
      <h2>Speaker nicht gefunden</h2>
      <p>Zu der ID "{{ speakerId }}" existiert kein Speaker-Eintrag.</p>
      <NuxtLink to="/speakers" class="back-link"
        >Zur Speaker-Übersicht</NuxtLink
      >
    </div>
  </div>
</template>

<style scoped>
.speaker-page {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}

.breadcrumbs {
  margin-bottom: var(--space-2);
}

.back-link {
  color: var(--color-interactive-primary);
  text-decoration: none;
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  transition: color 0.15s ease;
}

.back-link:hover {
  text-decoration: underline;
  color: var(--color-interactive-hover);
}

.not-found {
  background-color: var(--color-surface-card);
  border: 1px dashed var(--color-border-subtle);
  border-radius: 8px;
  padding: var(--space-8);
  text-align: center;
}
</style>
