<!-- app/layouts/default.vue -->
<template>
  <div class="layout-container">
    <header class="header">
      <div class="header-brand">
        <NuxtLink to="/" class="brand-link">
          <h1 class="brand-title">FrontendNow 2026</h1>
        </NuxtLink>
        <p class="brand-sub">Plattform von PineDev gmbh & co. kg</p>
      </div>

      <nav class="nav" aria-label="Hauptnavigation">
        <NuxtLink to="/" class="nav-link">Programm</NuxtLink>
        <NuxtLink to="/speakers" class="nav-link">Speaker</NuxtLink>
        <NuxtLink to="/schedule" class="nav-link">Mein Programm</NuxtLink>
      </nav>
    </header>

    <main class="main-content">
      <slot />
    </main>

    <footer class="footer">
      <p>© 2026 PineDev gmbh & co. kg — FrontendNow Konferenzbegleiter</p>
    </footer>
  </div>
</template>

<style scoped>
/* Box-Sizing und 100vh ohne unnötigen Scrollbalken */
.layout-container {
  box-sizing: border-box;
  padding: var(--layout-page-padding, 1.5rem);
  background-color: var(--color-surface-page);
  min-height: 100vh;
  color: var(--color-text-primary);
  font-family: var(--font-family-sans);
  display: flex;
  flex-direction: column;
}

*,
*::before,
*::after {
  box-sizing: border-box;
}

.header {
  border-bottom: 1px solid var(--color-border-subtle);
  padding-bottom: var(--space-4);
  margin-bottom: var(--space-6);
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: var(--space-4);
}

.brand-link {
  text-decoration: none;
  color: inherit;
}

.brand-title {
  color: var(--color-interactive-primary);
  margin: 0;
  font-size: var(--font-size-2xl);
  font-weight: var(--font-weight-bold);
}

.brand-sub {
  color: var(--color-text-secondary);
  margin: var(--space-1) 0 0 0;
  font-size: var(--font-size-sm);
}

.nav {
  display: flex;
  gap: var(--space-2);
}

/* Nav-Links jetzt deutlich als Buttons/Pills erkennbar */
.nav-link {
  text-decoration: none;
  padding: var(--space-2) var(--space-3);
  color: var(--color-text-primary);
  background-color: var(--color-surface-card);
  border: 1px solid var(--color-border-subtle);
  border-radius: 6px;
  font-weight: var(--font-weight-medium);
  font-size: var(--font-size-sm);
  transition: all 0.15s ease;
}

.nav-link:hover {
  background-color: var(--color-surface-subtle);
  border-color: var(--color-interactive-primary);
}

/* Aktiver Tab wird optisch hervorgehoben */
.nav-link.router-link-exact-active,
.nav-link.router-link-active:not([href="/"]) {
  background-color: var(--color-interactive-primary);
  border-color: var(--color-interactive-primary);
  color: var(--color-text-inverse);
}

.main-content {
  flex: 1; /* Dehnt den Inhalt aus, damit der Footer unten bleibt */
}

.footer {
  margin-top: auto; /* Klebt den Footer an den unteren Rand ohne Überhang */
  padding-top: var(--space-6);
  padding-bottom: var(--space-2);
  border-top: 1px solid var(--color-border-subtle);
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  text-align: center;
}
</style>
