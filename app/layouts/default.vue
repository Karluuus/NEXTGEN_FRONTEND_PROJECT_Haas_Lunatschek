<!-- app/layouts/default.vue -->
<template>
  <div class="layout-container">
    <!-- Header spannt über die volle Bildschirmbreite -->
    <header class="header">
      <div class="header-inner">
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
      </div>
    </header>

    <!-- Zentraler Inhaltsbereich mit festem Sicherheitsabstand nach unten -->
    <main class="main-content">
      <slot />
    </main>

    <!-- Footer spannt über die volle Bildschirmbreite -->
    <footer class="footer">
      <div class="footer-inner">
        <p>© 2026 PineDev gmbh & co. kg — FrontendNow Konferenzbegleiter</p>
      </div>
    </footer>
  </div>
</template>

<style scoped>
.layout-container {
  box-sizing: border-box;
  background-color: var(--color-surface-page);
  min-height: 100vh;
  color: var(--color-text-primary);
  font-family: var(--font-family-sans);
  display: flex;
  flex-direction: column;
}

/* 1. Header über die volle Bildschirmbreite mit durchgehender Linie */
.header {
  width: 100%;
  border-bottom: 1px solid var(--color-border-subtle);
  background-color: var(--color-surface-page);
}

.header-inner {
  max-width: 1200px;
  margin: 0 auto;
  padding: var(--space-4) var(--space-6);
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

.nav-link {
  text-decoration: none;
  padding: var(--space-2) var(--space-3);
  color: var(--color-text-primary);
  background-color: var(--color-surface-card);
  border: 1px solid var(--color-border-subtle);
  border-radius: 6px;
  font-weight: var(--font-weight-medium);
  font-size: var(--font-size-sm);
  transition:
    background-color 0.15s ease,
    border-color 0.15s ease,
    color 0.15s ease;
}

.nav-link:hover {
  background-color: var(--color-surface-subtle);
  border-color: var(--color-interactive-primary);
}

.nav-link.router-link-exact-active,
.nav-link.router-link-active:not([href="/"]) {
  background-color: var(--color-interactive-primary);
  border-color: var(--color-interactive-primary);
  color: var(--color-text-inverse);
}

/* 2. Hauptinhalt zentriert und mit ausreichend Abstand zum Footer */
.main-content {
  flex: 1;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: var(--space-6) var(--space-6) var(--space-12) var(--space-6);
}

/* 3. Footer über die volle Bildschirmbreite mit durchgehender Linie */
.footer {
  width: 100%;
  margin-top: auto;
  border-top: 1px solid var(--color-border-subtle);
  background-color: var(--color-surface-page);
}

.footer-inner {
  max-width: 1200px;
  margin: 0 auto;
  padding: var(--space-6);
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  text-align: center;
}

.footer-inner p {
  margin: 0;
}
</style>
