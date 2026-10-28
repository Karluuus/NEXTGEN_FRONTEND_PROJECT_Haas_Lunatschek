<!-- components/speakers/SpeakerDetail.vue -->
<script setup lang="ts">
import type { Speaker, Session } from "~~/types/conference";
import BaseCard from "~~/components/ui/BaseCard.vue";
import BaseBadge from "~~/components/ui/BaseBadge.vue";
import { useConferenceData } from "~~/composables/useConferenceData";

defineProps<{
  speaker: Speaker;
  sessions: Session[];
}>();

const { getTrackById, getRoomById } = useConferenceData();

const formatDay = (dateStr: string) => {
  return dateStr === "2026-09-15" ? "15. Sept. (Tag 1)" : "16. Sept. (Tag 2)";
};
</script>

<template>
  <article class="speaker-detail">
    <!-- Header-Bereich mit Name & Position -->
    <header class="detail-header">
      <div class="avatar-large" aria-hidden="true">
        {{ speaker.name.charAt(0) }}
      </div>
      <div>
        <h1 class="speaker-name">{{ speaker.name }}</h1>
        <p class="speaker-title">{{ speaker.title }} • {{ speaker.company }}</p>
      </div>
    </header>

    <!-- Biografie -->
    <section class="section-block" aria-labelledby="bio-heading">
      <h2 id="bio-heading" class="section-title">Über {{ speaker.name }}</h2>
      <p class="bio-text">{{ speaker.bio }}</p>
    </section>

    <!-- Zugeordnete Sessions -->
    <section class="section-block" aria-labelledby="sessions-heading">
      <h2 id="sessions-heading" class="section-title">
        Gehaltene Sessions ({{ sessions.length }})
      </h2>

      <div class="speaker-sessions-list">
        <BaseCard
          v-for="session in sessions"
          :key="session.id"
          class="session-item"
        >
          <header class="card-top">
            <div class="session-meta">
              <span class="session-time">
                {{ formatDay(session.day) }} • {{ session.startTime }} –
                {{ session.endTime }}
              </span>
              <span class="meta-separator">•</span>
              <span class="session-room">{{
                getRoomById(session.roomId).value?.name
              }}</span>
            </div>

            <div class="badges">
              <BaseBadge variant="track">{{
                getTrackById(session.trackId).value?.name
              }}</BaseBadge>
              <BaseBadge variant="level">{{ session.level }}</BaseBadge>
              <BaseBadge>{{ session.format }}</BaseBadge>
            </div>
          </header>

          <h3 class="session-title">
            <NuxtLink :to="`/sessions/${session.id}`" class="session-link">
              {{ session.title }}
            </NuxtLink>
          </h3>

          <p class="session-abstract">{{ session.abstract }}</p>
        </BaseCard>
      </div>
    </section>
  </article>
</template>

<style scoped>
.speaker-detail {
  display: flex;
  flex-direction: column;
  gap: var(--space-6);
  width: 100%;
}

.detail-header {
  display: flex;
  align-items: center;
  gap: var(--space-4);
  padding-bottom: var(--space-4);
  border-bottom: 1px solid var(--color-border-subtle);
}

.avatar-large {
  width: 72px;
  height: 72px;
  border-radius: 50%;
  background-color: var(--color-surface-subtle);
  color: var(--color-interactive-primary);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: var(--font-size-2xl);
  font-weight: var(--font-weight-bold);
  flex-shrink: 0;
}

.speaker-name {
  margin: 0;
  font-size: var(--font-size-2xl);
  color: var(--color-text-primary);
}

.speaker-title {
  margin: var(--space-1) 0 0 0;
  font-size: var(--font-size-lg);
  color: var(--color-text-secondary);
}

.section-block {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

.section-title {
  margin: 0;
  font-size: var(--font-size-xl);
  color: var(--color-text-primary);
}

.bio-text {
  margin: 0;
  font-size: var(--font-size-base);
  line-height: 1.6;
  color: var(--color-text-primary);
}

.speaker-sessions-list {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
  margin-top: var(--space-2);
}

.session-item {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}

.card-top {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;
  gap: var(--space-2);
}

.session-meta {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: var(--space-2);
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
}

.meta-separator {
  color: var(--color-border-subtle);
}

.badges {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-1);
}

.session-title {
  margin: 0;
  font-size: var(--font-size-lg);
}

.session-link {
  color: var(--color-interactive-primary);
  text-decoration: none;
  transition: color 0.15s ease;
}

.session-link:hover {
  text-decoration: underline;
  color: var(--color-interactive-hover);
}

.session-abstract {
  margin: 0;
  font-size: var(--font-size-base);
  color: var(--color-text-primary);
  line-height: 1.5;
}
</style>
