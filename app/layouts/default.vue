<!-- layouts/default.vue -->
<template>
  <div
    style="
      padding: var(--layout-page-padding, 2rem);
      background-color: var(--color-surface-page, #f8fafc);
      min-height: 100vh;
      color: var(--color-text-primary, #0f172a);
      font-family: var(--font-family-sans, sans-serif);
    "
  >
    <!-- Header mit sichtbarem Branding -->
    <header
      style="
        border-bottom: 1px solid var(--color-border-subtle, #e2e8f0);
        padding-bottom: var(--space-4, 1rem);
        margin-bottom: var(--space-6, 1.5rem);
      "
    >
      <h1
        style="
          color: var(--color-interactive-primary, #2563eb);
          margin: 0;
          font-size: var(--font-size-2xl, 2rem);
        "
      >
        FrontendNow 2026
      </h1>
      <p
        style="
          color: var(--color-text-secondary, #64748b);
          margin: var(--space-1, 0.25rem) 0 0 0;
        "
      >
        Plattform von PineDev gmbh & co. kg
      </p>
    </header>

    <!-- Hier wird der Inhalt aus app.vue bzw. den Pages dynamisch eingesetzt -->
    <main>
      <slot />
    </main>
  </div>
</template>
