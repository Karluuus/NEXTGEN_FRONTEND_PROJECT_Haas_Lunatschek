<!-- app/pages/mein-programm.vue -->
<script setup lang="ts">
import { computed } from 'vue'
import { useSchedule } from '~~/composables/useSchedule'
import { useConferenceData } from '~~/composables/useConferenceData'
import SessionCard from '~~/components/sessions/SessionCard.vue'

const { savedSessionIds } = useSchedule()
const { getSessionsByIds } = useConferenceData()

// Löst die gespeicherten IDs reaktiv in Session-Objekte auf
const bookmarkedSessions = computed(() => getSessionsByIds(savedSessionIds.value).value)
</script>

<template>
  <div class="my-program-page">
    <div class="page-header">
      <h1 class="page-title">Mein Programm</h1>
      <p class="page-desc">
        Deine persönlich vorgemerkten Sessions der FrontendNow 2026. Gespeichert im lokalen Speicher deines Browsers.
      </p>
    </div>

    <!-- Anzeige der gemerkten Sessions -->
    <div v-if="bookmarkedSessions.length > 0" class="program-content">
      <div class="stats-bar">
        <span>Du hast <strong>{{ bookmarkedSessions.length }}</strong> Session(s) in deiner Merkliste.</span>
      </div>

      <div class="sessions-grid">
        <SessionCard
          v-for="session in bookmarkedSessions"
          :key="session.id"
          :session="session"
        />
      </div>
    </div>

    <!-- Leer-Zustand -->
    <div v-else class="empty-state">
      <h2>Dein Zeitplan ist noch leer</h2>
      <p>Klicke in der Programmübersicht oder auf einer Detailseite auf „Vormerken“, um deine Favoriten zu speichern.</p>
      <NuxtLink to="/" class="browse-btn">
        Zum Konferenzprogramm →
      </NuxtLink>
    </div>
  </div>
</template>

<style scoped>
.my-program-page {
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

.stats-bar {
  margin-bottom: var(--space-4);
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
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
}

.empty-state h2 {
  margin: 0 0 var(--space-2) 0;
  color: var(--color-text-primary);
}

.empty-state p {
  color: var(--color-text-secondary);
  margin-bottom: var(--space-4);
}

.browse-btn {
  display: inline-block;
  background-color: var(--color-interactive-primary);
  color: var(--color-text-inverse);
  padding: var(--space-2) var(--space-4);
  border-radius: 4px;
  text-decoration: none;
  font-weight: var(--font-weight-medium);
  transition: background-color 0.15s ease;
}

.browse-btn:hover {
  background-color: var(--color-interactive-hover);
}
</style>