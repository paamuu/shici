
# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

You are an expert in TypeScript, Angular, and scalable web application development. You write functional, maintainable, performant, and accessible code following Angular and TypeScript best practices.

## Commands

```bash
npm start              # Dev server (http://localhost:4200)
npm run build          # Production build
npm run watch          # Dev build with watch
npm test               # Run all tests (Vitest)
npx vitest --reporter=verbose                  # Run all tests with verbose output
npx vitest path/to/file.spec.ts                # Run a single test file
npx vitest -t "test name pattern"              # Run tests matching a pattern
npm run serve:ssr:shici                        # Serve the SSR build locally
```

No lint script is configured yet. Formatting uses Prettier (`npx prettier --check .` / `npx prettier --write .`).

## Architecture

This is an **Angular v21+** application with **SSR** (server-side rendering) via the `@angular/ssr` package and an **Express v5** server. Styling uses **Tailwind CSS v4** (`@tailwindcss/postcss` plugin). Testing uses **Vitest** (not Jasmine/Karma).

### SSR / dual-entry setup

- **Client entry**: `src/main.ts` → bootstraps `App` with `appConfig` (`provideRouter`, `provideClientHydration` with event replay)
- **Server entry**: `src/main.server.ts` → bootstraps `App` with a merged config that adds `provideServerRendering`
- **Express server**: `src/server.ts` — serves static browser files, falls back to `AngularNodeAppEngine` for SSR
- **Server routes**: `src/app/app.routes.server.ts` — currently set to prerender all routes (`**` → `RenderMode.Prerender`)

### Key files

| File | Purpose |
|------|---------|
| `src/app/app.config.ts` | Client app config (router, hydration) |
| `src/app/app.config.server.ts` | Server app config (adds SSR provider, merges with client config) |
| `src/app/app.routes.ts` | Route definitions (currently empty) |
| `src/app/app.routes.server.ts` | SSR render mode per route |
| `src/app/app.ts` | Root component (signal-based state, `RouterOutlet`) |
| `src/server.ts` | Express server entry point |
| `tsconfig.app.json` | App TS config (targets ES2022, includes `src/**/*.ts`, excludes `.spec.ts`) |
| `tsconfig.spec.json` | Test TS config (uses Vitest globals) |

### Tech stack

- Angular v21.2+ (standalone components by default)
- TypeScript v5.9 (strict mode, isolated modules)
- Express v5.1
- Tailwind CSS v4.1 (PostCSS plugin, imported in `src/styles.css`)
- Vitest v4.0 (configured via `@angular/build:unit-test` builder)

## TypeScript Best Practices

- Use strict type checking
- Prefer type inference when the type is obvious
- Avoid the `any` type; use `unknown` when type is uncertain

## Angular Best Practices

- Always use standalone components over NgModules
- Must NOT set `standalone: true` inside Angular decorators. It's the default in Angular v20+.
- Use signals for state management
- Implement lazy loading for feature routes
- Do NOT use the `@HostBinding` and `@HostListener` decorators. Put host bindings inside the `host` object of the `@Component` or `@Directive` decorator instead
- Use `NgOptimizedImage` for all static images.
  - `NgOptimizedImage` does not work for inline base64 images.

## Accessibility Requirements

- It MUST pass all AXE checks.
- It MUST follow all WCAG AA minimums, including focus management, color contrast, and ARIA attributes.

### Components

- Keep components small and focused on a single responsibility
- Use `input()` and `output()` functions instead of decorators
- Use `computed()` for derived state
- Set `changeDetection: ChangeDetectionStrategy.OnPush` in `@Component` decorator
- Prefer inline templates for small components
- Prefer Reactive forms instead of Template-driven ones
- Do NOT use `ngClass`, use `class` bindings instead
- Do NOT use `ngStyle`, use `style` bindings instead
- When using external templates/styles, use paths relative to the component TS file.

## State Management

- Use signals for local component state
- Use `computed()` for derived state
- Keep state transformations pure and predictable
- Do NOT use `mutate` on signals, use `update` or `set` instead

## Templates

- Keep templates simple and avoid complex logic
- Use native control flow (`@if`, `@for`, `@switch`) instead of `*ngIf`, `*ngFor`, `*ngSwitch`
- Use the async pipe to handle observables
- Do not assume globals like (`new Date()`) are available.

## Services

- Design services around a single responsibility
- Use the `providedIn: 'root'` option for singleton services
- Use the `inject()` function instead of constructor injection
