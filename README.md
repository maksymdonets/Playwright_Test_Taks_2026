# Playwright TodoMVC Showcase

Production-style Playwright showcase against the official Playwright TodoMVC demo at `https://demo.playwright.dev/todomvc/`.

This repository mirrors the structure and operating model of the neighboring Cypress showcase, but rewrites it for Playwright + TypeScript and for an AUT that Playwright itself uses in official docs and examples.

## Quick Start

```bash
npm install
npx playwright install
npm run test:local
```

## Useful Commands

```bash
npm run test:local
npm run test:e2e:chromium
npm run test:e2e:firefox
npm run test:e2e:webkit
npm run test:smoke
npm run test:ui
npm run test:debug
npm run report:open
```

## Test Coverage

The suite covers the full TodoMVC feature set in focused spec files:

1. `create-todos`
2. `input-validation`
3. `completion`
4. `filters`
5. `editing`
6. `persistence`

The suite is split into focused spec files so each behavior stays easy to review, debug, and rerun.

## Best-Practice Notes

- official Playwright demo site instead of a toy custom app
- deterministic preloaded state through `localStorage` seeding
- page object model with thin but expressive helpers
- fixture-driven page construction to keep specs clean
- no hard waits or brittle CSS chains
- cross-browser projects for Chromium, Firefox, and WebKit
- CI-friendly HTML reporting and failure artifacts

## Configuration

Optional environment variables:

```bash
PLAYWRIGHT_BASE_URL=https://demo.playwright.dev/todomvc/
```

## Project Structure

```text
.
├── pages/
├── tests/
│   ├── fixtures/
│   ├── specs/
│   └── support/
├── scripts/
└── .github/workflows/
```
