<!-- components/schedule/BookmarkButton.vue -->
<script setup lang="ts">
import { useSchedule } from '~~/composables/useSchedule'

const props = defineProps<{
  sessionId: string
}>()

const { isBookmarked, toggleBookmark } = useSchedule()
</script>

<template>
  <button
    type="button"
    class="bookmark-btn"
    :class="{ 'is-active': isBookmarked(sessionId) }"
    :aria-label="isBookmarked(sessionId) ? 'Aus persönlichem Programm entfernen' : 'Zu persönlichem Programm hinzufügen'"
    @click.stop="toggleBookmark(sessionId)"
  >
    <span class="bookmark-icon">{{ isBookmarked(sessionId) ? '★' : '☆' }}</span>
    <span class="bookmark-text">
      {{ isBookmarked(sessionId) ? 'Im Programm' : 'Vormerken' }}
    </span>
  </button>
</template>

<style scoped>
.bookmark-btn {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  background-color: transparent;
  color: var(--color-interactive-primary);
  border: 1px solid var(--color-interactive-primary);
  padding: var(--space-2) var(--space-3);
  border-radius: 4px;
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  cursor: pointer;
  transition: all 0.15s ease;
}

.bookmark-btn:hover {
  background-color: var(--color-surface-subtle);
}

.bookmark-btn.is-active {
  background-color: var(--color-interactive-primary);
  color: var(--color-text-inverse);
}

.bookmark-btn.is-active:hover {
  background-color: var(--color-interactive-hover);
}

.bookmark-icon {
  font-size: 1.1em;
  line-height: 1;
}
</style>