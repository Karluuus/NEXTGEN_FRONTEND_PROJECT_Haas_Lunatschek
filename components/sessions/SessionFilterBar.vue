<!-- components/sessions/SessionFilterBar.vue -->
<script setup lang="ts">
import type { Track } from "~~/types/conference";

defineProps<{
  tracks: Track[];
  days: string[];
  levels: string[];
  totalCount: number;
  filteredCount: number;
  hasActiveFilters: boolean;
}>();

const track = defineModel<string>("track");
const day = defineModel<string>("day");
const level = defineModel<string>("level");
const search = defineModel<string>("search");

const emit = defineEmits<{
  (e: "reset"): void;
}>();

const formatDay = (dateStr: string) => {
  if (dateStr === "2026-09-15") return "Tag 1 (15. Sept.)";
  if (dateStr === "2026-09-16") return "Tag 2 (16. Sept.)";
  return dateStr;
};
</script>

<template>
  <section class="filter-panel" aria-label="Session Filter">
    <div class="filter-controls">
      <div class="filter-group filter-search">
        <label for="filter-search-input" class="filter-label">Suche</label>
        <input
          id="filter-search-input"
          v-model="search"
          type="search"
          placeholder="Titel oder Stichwort..."
          class="filter-input"
        />
      </div>

      <div class="filter-group">
        <label for="filter-day-select" class="filter-label">Tag</label>
        <select id="filter-day-select" v-model="day" class="filter-select">
          <option value="">Alle Tage</option>
          <option v-for="d in days" :key="d" :value="d">
            {{ formatDay(d) }}
          </option>
        </select>
      </div>

      <div class="filter-group">
        <label for="filter-track-select" class="filter-label">Track</label>
        <select id="filter-track-select" v-model="track" class="filter-select">
          <option value="">Alle Tracks</option>
          <option v-for="t in tracks" :key="t.id" :value="t.id">
            {{ t.name }}
          </option>
        </select>
      </div>

      <div class="filter-group">
        <label for="filter-level-select" class="filter-label">Level</label>
        <select id="filter-level-select" v-model="level" class="filter-select">
          <option value="">Alle Level</option>
          <option v-for="l in levels" :key="l" :value="l">
            {{ l }}
          </option>
        </select>
      </div>
    </div>

    <div class="filter-status">
      <p class="status-text">
        Zeige <strong>{{ filteredCount }}</strong> von
        <strong>{{ totalCount }}</strong> Sessions
      </p>

      <button
        v-if="hasActiveFilters"
        type="button"
        class="reset-button"
        @click="emit('reset')"
      >
        Filter zurücksetzen
      </button>
    </div>
  </section>
</template>

<style scoped>
.filter-panel {
  background-color: var(--color-surface-card);
  border: 1px solid var(--color-border-subtle);
  border-radius: 8px;
  padding: var(--space-4);
  margin-bottom: var(--space-6);
}

.filter-controls {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: var(--space-4);
}

.filter-group {
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
}

.filter-label {
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  color: var(--color-text-secondary);
}

.filter-input,
.filter-select {
  padding: var(--space-2) var(--space-3);
  font-size: var(--font-size-base);
  color: var(--color-text-primary);
  background-color: var(--palette-white);
  border: 1px solid var(--color-border-subtle);
  border-radius: 6px;
  outline: none;
  transition:
    border-color 0.15s ease,
    box-shadow 0.15s ease;
}

.filter-input:focus,
.filter-select:focus {
  border-color: var(--color-interactive-primary);
  box-shadow: 0 0 0 2px var(--color-interactive-focus);
}

.filter-status {
  margin-top: var(--space-4);
  padding-top: var(--space-3);
  border-top: 1px solid var(--color-border-subtle);
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: var(--space-2);
}

.status-text {
  margin: 0;
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
}

/* Spezifische Transitions statt transition: all (SonarQube S9449) */
.reset-button {
  background: transparent;
  border: 1px solid var(--color-interactive-primary);
  color: var(--color-interactive-primary);
  padding: var(--space-1) var(--space-3);
  border-radius: 4px;
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  cursor: pointer;
  transition:
    background-color 0.15s ease,
    color 0.15s ease;
}

.reset-button:hover {
  background-color: var(--color-interactive-primary);
  color: var(--color-text-inverse);
}
</style>
