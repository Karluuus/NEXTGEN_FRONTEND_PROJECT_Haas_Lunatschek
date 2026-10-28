<template>
  <div class="base-card">
    <slot />
  </div>
</template>

<style scoped>
.base-card {
  background-color: var(--color-surface-card);
  border: 1px solid var(--color-border-subtle);
  border-radius: 8px;
  padding: var(--layout-card-padding);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  transition:
    transform 0.15s ease,
    box-shadow 0.15s ease;
}

.base-card:hover {
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.08);
}
</style>
