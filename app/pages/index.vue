<!-- index.vue -->
<script setup lang="ts">
import { useConferenceData } from "~~/composables/useConferenceData";
import { useSessionFilter } from "~~/composables/useSessionFilter";
import SessionFilterBar from "~~/components/sessions/SessionFilterBar.vue";
import SessionCard from "~~/components/sessions/SessionCard.vue";

// 1. Zentrale Konferenzdaten beziehen
const { sessions, tracks, days, levels } = useConferenceData();

// 2. Headless-Filter initialisieren
const {
  selectedTrack,
  selectedDay,
  selectedLevel,
  searchQuery,
  filteredSessions,
  hasActiveFilters,
  resetFilters,
} = useSessionFilter(sessions);
</script>

<template>
  <div class="sessions-page">
    <div class="page-header">
      <h2 class="page-title">Konferenzprogramm</h2>
      <p class="page-desc">
        Entdecke alle 20 Fachvorträge und Workshops der FrontendNow 2026.
      </p>
    </div>

    <!-- Filterleiste (UND-Verknüpfung) -->
    <SessionFilterBar
      v-model:track="selectedTrack"
      v-model:day="selectedDay"
      v-model:level="selectedLevel"
      v-model:search="searchQuery"
      :tracks="tracks"
      :days="days"
      :levels="levels"
      :total-count="sessions.length"
      :filtered-count="filteredSessions.length"
      :has-active-filters="hasActiveFilters"
      @reset="resetFilters"
    />

    <!-- Liste der Sessions -->
    <div v-if="filteredSessions.length > 0" class="sessions-grid">
      <SessionCard
        v-for="session in filteredSessions"
        :key="session.id"
        :session="session"
      />
    </div>

    <!-- Leer-Zustand bei zu restriktiven Filtern -->
    <div v-else class="empty-state">
      <h3>Keine Sessions gefunden</h3>
      <p>Für die gewählte Filterkombination gibt es keine Treffer.</p>
      <button type="button" class="empty-reset-btn" @click="resetFilters">
        Filter zurücksetzen
      </button>
    </div>
  </div>
</template>

<style scoped>
.sessions-page {
  display: flex;
  flex-direction: column;
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

.sessions-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-4);
}

.empty-state {
  background-color: var(--color-surface-card);
  border: 1px dashed var(--color-border-subtle);
  border-radius: 8px;
  padding: var(--space-8);
  text-align: center;
  color: var(--color-text-secondary);
}

.empty-state h3 {
  margin: 0 0 var(--space-2) 0;
  color: var(--color-text-primary);
}

.empty-reset-btn {
  margin-top: var(--space-3);
  background-color: var(--color-interactive-primary);
  color: var(--color-text-inverse);
  border: none;
  padding: var(--space-2) var(--space-4);
  border-radius: 4px;
  font-weight: var(--font-weight-medium);
  cursor: pointer;
  transition: background-color 0.15s ease;
}

.empty-reset-btn:hover {
  background-color: var(--color-interactive-hover);
}
</style>
