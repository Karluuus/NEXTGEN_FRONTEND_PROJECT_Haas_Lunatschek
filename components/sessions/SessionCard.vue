<!-- components/sessions/SessionCard.vue -->
<script setup lang="ts">
import type { Session } from "~~/types/conference";
import BaseCard from "~~/components/ui/BaseCard.vue";
import BaseBadge from "~~/components/ui/BaseBadge.vue";
import BookmarkButton from '~~/components/schedule/BookmarkButton.vue'
import { useConferenceData } from "~~/composables/useConferenceData";

const props = defineProps<{
  session: Session;
}>();

const { getTrackById, getRoomById, getSpeakersForSession } =
  useConferenceData();

const track = getTrackById(props.session.trackId);
const room = getRoomById(props.session.roomId);
const sessionSpeakers = getSpeakersForSession(props.session);

const formatDay = (dateStr: string) => {
  return dateStr === "2026-09-15" ? "15. Sept. (Tag 1)" : "16. Sept. (Tag 2)";
};
</script>

<template>
  <BaseCard class="session-card">
    <header class="card-header">
      <div class="time-room">
        <span class="session-time">
          {{ formatDay(session.day) }} • {{ session.startTime }} –
          {{ session.endTime }}
        </span>
        <span class="session-room">{{ room?.name }}</span>
      </div>

      <div class="badges">
        <BaseBadge variant="track">{{ track?.name }}</BaseBadge>
        <BaseBadge variant="level">{{ session.level }}</BaseBadge>
        <BaseBadge>{{ session.format }}</BaseBadge>
      </div>

      <BookmarkButton :session-id="session.id" />
    </header>

    <h2 class="session-title">
      <NuxtLink :to="`/sessions/${session.id}`" class="title-link">
        {{ session.title }}
      </NuxtLink>
    </h2>

    <p class="session-abstract">{{ session.abstract }}</p>

    <footer class="card-footer">
      <div class="speakers-list">
        <span class="speaker-intro">Speaker:</span>
        <div class="speaker-links">
          <NuxtLink
            v-for="sp in sessionSpeakers"
            :key="sp.id"
            :to="`/speakers/${sp.id}`"
            class="speaker-link"
          >
            {{ sp.name }} ({{ sp.company }})
          </NuxtLink>
        </div>
      </div>
    </footer>
  </BaseCard>
</template>

<style scoped>
.session-card {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;
  gap: var(--space-2);
}

.time-room {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  font-weight: var(--font-weight-medium);
  display: flex;
  gap: var(--space-2);
}

.badges {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-1);
}

.session-title {
  margin: 0;
  font-size: var(--font-size-lg);
  line-height: 1.3;
}

.title-link {
  color: var(--color-interactive-primary);
  text-decoration: none;
  transition: color 0.15s ease;
}

.title-link:hover {
  color: var(--color-interactive-hover);
  text-decoration: underline;
}

.session-abstract {
  margin: 0;
  color: var(--color-text-primary);
  font-size: var(--font-size-base);
  line-height: 1.5;
}

.card-footer {
  margin-top: auto;
  padding-top: var(--space-3);
  border-top: 1px solid var(--color-border-subtle);
}

.speakers-list {
  display: flex;
  align-items: baseline;
  flex-wrap: wrap;
  gap: var(--space-2);
  font-size: var(--font-size-sm);
}

.speaker-intro {
  color: var(--color-text-secondary);
  font-weight: var(--font-weight-medium);
}

.speaker-links {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
}

.speaker-link {
  color: var(--color-interactive-primary);
  text-decoration: none;
  font-weight: var(--font-weight-medium);
}

.speaker-link:hover {
  text-decoration: underline;
}
</style>
