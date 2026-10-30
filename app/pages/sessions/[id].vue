<!-- app/pages/sessions/[id].vue -->
<script setup lang="ts">
import { useRoute } from '#app'
import { computed } from 'vue'
import { useConferenceData } from '~~/composables/useConferenceData'
import BaseCard from '~~/components/ui/BaseCard.vue'
import BaseBadge from '~~/components/ui/BaseBadge.vue'

const route = useRoute()
const sessionId = route.params.id as string

const { getSessionById, getTrackById, getRoomById, getSpeakersForSession } = useConferenceData()

const session = getSessionById(sessionId)
const track = computed(() => session.value ? getTrackById(session.value.trackId).value : null)
const room = computed(() => session.value ? getRoomById(session.value.roomId).value : null)
const sessionSpeakers = computed(() => session.value ? getSpeakersForSession(session.value).value : [])

const formatDay = (dateStr: string) => {
  return dateStr === '2026-09-15' ? '15. September 2026 (Tag 1)' : '16. September 2026 (Tag 2)'
}
</script>

<template>
  <div class="session-detail-page">
    <div class="navigation-back">
      <NuxtLink to="/" class="back-link">← Zurück zum Konferenzprogramm</NuxtLink>
    </div>

    <!-- Fehleranzeige, falls eine ungültige ID aufgerufen wird -->
    <div v-if="!session" class="error-box">
      <h2>Session nicht gefunden</h2>
      <p>Die angeforderte Session existiert nicht im Konferenzprogramm.</p>
      <NuxtLink to="/" class="back-link">Zurück zur Übersicht</NuxtLink>
    </div>

    <!-- Vollständige Detailansicht -->
    <article v-else class="detail-container">
      <header class="detail-header">
        <div class="meta-row">
          <div class="badges">
            <BaseBadge variant="track">{{ track?.name }}</BaseBadge>
            <BaseBadge variant="level">{{ session.level }}</BaseBadge>
            <BaseBadge>{{ session.format }}</BaseBadge>
          </div>
        </div>

        <h1 class="session-title">{{ session.title }}</h1>

        <div class="time-location-card">
          <div class="info-item">
            <span class="info-label">Konferenztag:</span>
            <span class="info-val">{{ formatDay(session.day) }}</span>
          </div>
          <div class="info-item">
            <span class="info-label">Uhrzeit:</span>
            <span class="info-val">{{ session.startTime }} – {{ session.endTime }} Uhr</span>
          </div>
          <div class="info-item">
            <span class="info-label">Raum:</span>
            <span class="info-val">{{ room?.name }} (Kapazität: {{ room?.capacity }} Plätze)</span>
          </div>
        </div>
      </header>

      <section class="abstract-section">
        <h2>Inhalt & Abstract</h2>
        <p class="abstract-text">{{ session.abstract }}</p>
      </section>

      <!-- Vortragende mit Verlinkung zu /speakers/[id] -->
      <section class="speakers-section">
        <h2>Vortragende</h2>
        <div class="speakers-grid">
          <BaseCard v-for="sp in sessionSpeakers" :key="sp.id" class="speaker-card">
            <h3 class="speaker-name">
              <NuxtLink :to="`/speakers/${sp.id}`" class="speaker-link">
                {{ sp.name }}
              </NuxtLink>
            </h3>
            <p class="speaker-company">{{ sp.title }} bei <strong>{{ sp.company }}</strong></p>
            <p class="speaker-bio">{{ sp.bio }}</p>
            <NuxtLink :to="`/speakers/${sp.id}`" class="view-profile-btn">
              Vollständiges Profil ansehen →
            </NuxtLink>
          </BaseCard>
        </div>
      </section>
    </article>
  </div>
</template>

<style scoped>
.session-detail-page {
  display: flex;
  flex-direction: column;
  gap: var(--space-6);
}

.back-link {
  color: var(--color-interactive-primary);
  text-decoration: none;
  font-weight: var(--font-weight-medium);
  font-size: var(--font-size-sm);
}

.back-link:hover {
  text-decoration: underline;
}

.detail-container {
  display: flex;
  flex-direction: column;
  gap: var(--space-6);
}

.meta-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: var(--space-3);
  margin-bottom: var(--space-4);
}

.badges {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
}

.session-title {
  margin: 0 0 var(--space-4) 0;
  font-size: var(--font-size-2xl);
  color: var(--color-text-primary);
  line-height: 1.25;
}

.time-location-card {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-4);
  background-color: var(--color-surface-card);
  padding: var(--space-4);
  border-radius: 8px;
  border: 1px solid var(--color-border-subtle);
}

.info-item {
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
}

.info-label {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
}

.info-val {
  font-weight: var(--font-weight-medium);
  color: var(--color-text-primary);
}

.abstract-section h2, .speakers-section h2 {
  font-size: var(--font-size-xl);
  color: var(--color-text-primary);
  margin-top: 0;
  margin-bottom: var(--space-3);
}

.abstract-text {
  font-size: var(--font-size-lg);
  line-height: 1.6;
  color: var(--color-text-primary);
  margin: 0;
}

.speakers-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: var(--space-4);
}

.speaker-card {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

.speaker-name {
  margin: 0;
  font-size: var(--font-size-lg);
}

.speaker-link {
  color: var(--color-interactive-primary);
  text-decoration: none;
}

.speaker-link:hover {
  text-decoration: underline;
}

.speaker-company {
  margin: 0;
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
}

.speaker-bio {
  margin: 0;
  font-size: var(--font-size-sm);
  line-height: 1.4;
  color: var(--color-text-primary);
}

.view-profile-btn {
  margin-top: auto;
  font-size: var(--font-size-sm);
  color: var(--color-interactive-primary);
  text-decoration: none;
  font-weight: var(--font-weight-medium);
}

.view-profile-btn:hover {
  text-decoration: underline;
}

.error-box {
  background-color: var(--color-surface-card);
  padding: var(--space-8);
  text-align: center;
  border-radius: 8px;
  border: 1px solid var(--color-border-subtle);
}
</style>