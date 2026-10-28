<script setup lang="ts">
defineProps<{
  variant?: "track" | "level" | "default";
}>();
</script>

<template>
  <span class="base-badge" :class="variant || 'default'">
    <slot />
  </span>
</template>

<style scoped>
.base-badge {
  display: inline-block;
  padding: var(--space-1) var(--space-2);
  border-radius: 4px;
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  background-color: var(--color-surface-subtle);
  color: var(--color-text-secondary);
}

.base-badge.level {
  background-color: var(--color-surface-card);
  border: 1px solid var(--color-border-subtle);
  color: var(--color-text-primary);
}

.base-badge.track {
  background-color: var(--color-interactive-primary);
  color: var(--color-text-inverse);
}
</style>
