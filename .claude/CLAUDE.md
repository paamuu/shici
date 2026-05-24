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

Tests use Vitest via `@angular/build:unit-test`. Run with:
```bash
ng test                   # Run all tests
npx vitest --run          # Direct vitest (needs the Angular build step first)
```

No lint script is configured yet. Formatting uses Prettier:
```bash
npx prettier --check .     # Check formatting
npx prettier --write .     # Fix formatting
```

## Architecture

This is a **Chinese poetry showcase** app ("诗词集") built with **Angular v21.2+**, **SSR**, **Tailwind CSS v4**, and **Vitest**. All poem data (6 poems) is static and served from `PoemsService`. Theme and font settings are managed via `SettingsService` (signal-based state).

### SSR / dual-entry setup

- **Client entry**: `src/main.ts` → bootstraps `App` with `appConfig` (`provideRouter`, `provideClientHydration` with event replay)
- **Server entry**: `src/main.server.ts` → exports a bootstrap function that merges client config with `provideServerRendering`
- **Express server**: `src/server.ts` — serves static files from `dist/shici/browser`, falls back to `AngularNodeAppEngine` for SSR; listens on `PORT` env var (default 4000)
- **Server routes**: `src/app/app.routes.server.ts` — home page prerendered, `poem/:id` and wildcard are server-rendered

### Routes

| Path | Page | SSR Mode |
|------|------|----------|
| `/` | `HomeComponent` (lazy) | Prerender |
| `/poem/:id` | `DetailComponent` (lazy) | Server |

### Project structure

```
src/
  index.html                    # zh-CN, Google Fonts (Ma Shan Zheng, Noto Serif SC, ZCOOL XiaoWei)
  styles.css                    # Tailwind v4 @import + @theme tokens (poetry color palettes, font families)
  main.ts                       # Client bootstrap
  main.server.ts                # Server bootstrap
  server.ts                     # Express v5 SSR server (port 4000)
  app/
    app.ts                      # Root — minimal, just <router-outlet/>
    app.config.ts               # Client: provideRouter + provideClientHydration(withEventReplay())
    app.config.server.ts        # Server: merges provideServerRendering
    app.routes.ts               # Lazy routes: '' → Home, 'poem/:id' → Detail
    app.routes.server.ts        # SSR modes: Home prerendered, others server-rendered
    theme-utils.ts              # Shared theme→Tailwind class mappings (bg, card, title, text, muted, accent, border)
    services/
      poems.service.ts          # Injectable — 6 hardcoded poems + getAuthors/getCipais/getDynasties/getThemes/getPoemById
      settings.service.ts       # Injectable — signals for currentTheme (classic|inkwash|vermilion|jade|night) and currentFont (serif|kai|xiaowei)
    pages/
      home/home.component.ts    # Index page: CoverPage splash, FilterBar, PoemListItem list, Settings panel
      detail/detail.component.ts# Poem detail: poem card, tabs (注释/译文/赏析), prev/next nav, share modal
    components/
      cover-page/               # Splash screen with theme gradient, "开卷有益" CTA
      filter-bar/               # 4 dropdown filters (author/cipai/dynasty/theme)
      poem-list-item/           # Compact poem card for index list
      poem-card/                # Horizontal poem detail card
      poem-card-vertical/       # Vertical RTL poem card (writing-mode: vertical-rl)
      share-card/               # Shareable 3:4 card modal content
      theme-selector/           # 5-theme palette picker
      font-selector/            # 3-font (宋体/楷书/小篆) picker
```

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
