# Nuxt Minimal Starter

Look at the [Nuxt documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Setup

Make sure to install dependencies:

```bash
npm install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
npm run dev
```

## Production

Build the application for production:

```bash
npm run build
```

Locally preview production build:

```bash
npm run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.

## Rendering-Strategie: Session-Übersicht

- **Gewählte Strategie:** ISR / SWR (Stale-While-Revalidate) kombiniert mit clientseitiger Filterung
- **Begründung:** Die Session-Übersicht bildet das Herzstück der Plattform. Die Seite wird über Nuxt mit SWR bereitgestellt, was für schnelle Ladezeiten sorgt. Das interaktive Filtern (Track, Tag, Level) erfolgt verzögerungsfrei auf dem Client über das Headless-Composable `useSessionFilter`.
