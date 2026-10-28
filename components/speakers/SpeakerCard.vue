<!-- components/speakers/SpeakerCard.vue -->
<script setup lang="ts">
import type { Speaker } from "~~/types/conference";
import BaseCard from "~~/components/ui/BaseCard.vue";

defineProps<{
  speaker: Speaker;
}>();
</script>

<template>
  <BaseCard class="speaker-card">
    <div class="speaker-header">
      <div class="speaker-avatar" aria-hidden="true">
        {{ speaker.name.charAt(0) }}
      </div>
      <div class="speaker-info">
        <h3 class="speaker-name">
          <NuxtLink :to="`/speakers/${speaker.id}`" class="speaker-link">
            {{ speaker.name }}
          </NuxtLink>
        </h3>
        <p class="speaker-role">
          {{ speaker.title }} bei {{ speaker.company }}
        </p>
      </div>
    </div>

    <p class="speaker-bio-preview">{{ speaker.bio }}</p>

    <footer class="speaker-footer">
      <NuxtLink :to="`/speakers/${speaker.id}`" class="profile-btn">
        Profil & Vorträge ansehen →
      </NuxtLink>
    </footer>
  </BaseCard>
</template>

<style scoped>
.speaker-card {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}

.speaker-header {
  display: flex;
  align-items: center;
  gap: var(--space-3);
}

.speaker-info {
  min-width: 0;
}

.speaker-avatar {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background-color: var(--color-surface-subtle);
  color: var(--color-interactive-primary);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: var(--font-weight-bold);
  font-size: var(--font-size-base);
  flex-shrink: 0;
}

.speaker-name {
  margin: 0;
  font-size: var(--font-size-lg);
  line-height: 1.2;
}

.speaker-link {
  color: var(--color-text-primary);
  text-decoration: none;
  transition: color 0.15s ease;
}

.speaker-link:hover {
  color: var(--color-interactive-primary);
  text-decoration: underline;
}

.speaker-role {
  margin: var(--space-1) 0 0 0;
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
}

.speaker-bio-preview {
  margin: 0;
  font-size: var(--font-size-sm);
  color: var(--color-text-primary);
  line-height: 1.5;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.speaker-footer {
  margin-top: auto;
  padding-top: var(--space-2);
}

.profile-btn {
  display: block;
  text-align: center;
  padding: var(--space-2) var(--space-3);
  background-color: var(--color-surface-subtle);
  color: var(--color-interactive-primary);
  border: 1px solid var(--color-border-subtle);
  border-radius: 6px;
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  text-decoration: none;
  transition:
    background-color 0.15s ease,
    color 0.15s ease,
    border-color 0.15s ease;
}

.profile-btn:hover {
  background-color: var(--color-interactive-primary);
  border-color: var(--color-interactive-primary);
  color: var(--color-text-inverse);
}
</style>
