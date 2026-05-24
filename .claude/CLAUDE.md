# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

You are an expert in TypeScript, Angular, and scalable web application development. You write functional, maintainable, performant, and accessible code following Angular and TypeScript best practices.

## Commands

```bash
npm start              # Dev server (http://localhost:4200)
npm run build          # Production build (outputs to dist/)
npm run watch          # Dev build with watch
npm test               # Run all tests (Vitest via @angular/build:unit-test)
npx vitest --reporter=verbose                  # Run all tests with verbose output
npx vitest path/to/file.spec.ts                # Run a single test file
npx vitest -t "test name pattern"              # Run tests matching a pattern
npm run serve:ssr:shici                        # Serve the SSR build locally (port 4000)
```

No lint script is configured yet. Formatting uses Prettier:
```bash
npx prettier --check .     # Check formatting
npx prettier --write .     # Fix formatting
```

## Architecture

This is an **Angular v21.2+** application with **SSR** via the `@angular/ssr` package and an **Express v5** server. Styling uses **Tailwind CSS v4** via the `@tailwindcss/postcss` PostCSS plugin. Testing uses **Vitest** (not Jasmine/Karma).

### SSR / dual-entry setup

- **Client entry**: `src/main.ts` → bootstraps `App` with `appConfig` (`provideRouter`, `provideClientHydration` with event replay)
- **Server entry**: `src/main.server.ts` → exports a bootstrap function that merges client config with `provideServerRendering`
- **Express server**: `src/server.ts` — serves static files from `dist/shici/browser`, falls back to `AngularNodeAppEngine` for SSR; listens on `PORT` env var (default 4000)
- **Server routes**: `src/app/app.routes.server.ts` — currently prerenders all routes (`**` → `RenderMode.Prerender`)

### Key files

| File | Purpose |
|------|---------|
| `src/app/app.config.ts` | Client app config (router, hydration) |
| `src/app/app.config.server.ts` | Server app config (merges SSR provider with client config) |
| `src/app/app.routes.ts` | Route definitions (currently empty array) |
| `src/app/app.routes.server.ts` | SSR render mode per route |
| `src/app/app.ts` | Root component (signal-based title, `RouterOutlet`) |
| `src/app/app.html` | Root template — currently Angular's default placeholder; the test expects "Hello, shici" |
| `src/server.ts` | Express server entry point |
| `tsconfig.json` | Root TS config (strict mode, `strictTemplates`, `strictInjectionParameters`, `strictInputAccessModifiers`) |
| `tsconfig.app.json` | App TS config (targets ES2022, includes `src/**/*.ts`, excludes `.spec.ts`) |
| `tsconfig.spec.json` | Test TS config (uses `vitest/globals` types) |
| `public/` | Static assets served at build time (currently only `favicon.ico`) |

### Tech stack

- Angular v21.2+ (standalone components by default)
- TypeScript v5.9 (strict mode, isolated modules)
- Express v5.1
- Tailwind CSS v4.1 (imported via `@import 'tailwindcss'` in `src/styles.css`)
- Vitest v4.0 (configured via `@angular/build:unit-test` builder)
- PostCSS with `@tailwindcss/postcss` plugin
- Prettier v3.8 (printWidth: 100, single quotes, Angular parser for HTML)

## Project conventions

- **Standalone components only** — do NOT set `standalone: true` inside decorators (it's the default in Angular v20+)
- **Signals for state** — use `input()`, `output()`, `computed()`, `signal()`; avoid decorator-based `@Input`/`@Output`
- **OnPush change detection** by default on all components
- **Native control flow** in templates (`@if`, `@for`, `@switch`) — never `*ngIf`/`*ngFor`/`*ngSwitch`
- **Use `inject()`** instead of constructor injection for services
- **No `ngClass` or `ngStyle`** — use `[class]` and `[style]` bindings
- **No `@HostBinding` or `@HostListener`** — use the `host` property in the `@Component`/`@Directive` decorator
- **External templates/styles** use paths relative to the component TS file
- **Reactive forms** over template-driven forms
- **2-space indent**, single quotes in TypeScript (`tsconfig.json` + `.editorconfig` + `.prettierrc` all enforce this)
- **Accessibility**: pass AXE checks, meet WCAG AA minimums (focus management, color contrast, ARIA attributes)
- **NgOptimizedImage** for all static images (not for inline base64)
