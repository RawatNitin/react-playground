# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev` — start Vite dev server
- `npm run build` — type-check (`tsc -b`) then production build
- `npm run build-local` — production build without type-checking
- `npm run lint` — run ESLint over the repo
- `npm test` — run the Vitest suite once (`vitest run`)
- Run a single test file: `npx vitest run path/to/file.test.tsx`
- `npm run preview` — preview the production build

## Architecture

This is a React + TypeScript + Vite playground: a collection of small, independent UI experiments, not a single cohesive app.

- **`src/experiments/<name>/`** — each experiment is self-contained (its own components, hooks, styles) and exports a top-level component from an `index.ts(x)` barrel. Experiments do not import from each other.
- **`src/App.tsx`** — defines the `experiments` array (`ExperimentRoute[]`: `path`, `title`, `description`, `element`) mapping each experiment to a route, and implements a minimal hand-rolled client-side router (`useLocationPath`/`NavLink`) using `history.pushState`/`popstate` — there is no router library. `App()` renders either the experiment grid (`NavigationPage`), a single experiment (`ExperimentPage`), or `NotFoundPage` based on the current path.
- **`src/playground/`** — a scratch area (`Playground` component) for work-in-progress experiments before they're wired into the `experiments` array in `App.tsx`. `App.tsx` currently renders `<Playground />` directly instead of the router (see the commented-out block in `App()`) while an experiment is under active development — restore the routed JSX when that's done.
- When adding a new experiment: create `src/experiments/<name>/`, export its root component, then add an entry to the `experiments` array in `src/App.tsx` with a route path, title, and description.

## Tooling notes

- Styling uses Tailwind CSS v4 via `@tailwindcss/vite` (no `tailwind.config.js` — v4 is CSS-first).
- `vite.config.ts` includes `rollup-plugin-visualizer`, which writes bundle analysis to `bundles.html` on every build and opens it automatically.
- Tests run in `jsdom` via `vitest.config.ts`, with `globals: true` (no need to import `describe`/`it`/`expect`).
- ESLint config (`eslint.config.js`) is flat-config based with `typescript-eslint`, `eslint-plugin-react-hooks`, and `eslint-plugin-react-refresh`.

## Editor agent configs

`.cursor/agents/` and `.cursor/skills/` define Cursor-specific personas (frontend agent, web-performance agent, react-review skill). Their substance:
- Use TypeScript, follow React best practices, keep components under ~150 lines, extract business logic into custom hooks.
- For performance work: measure first, focus on Core Web Vitals (LCP/INP/CLS), bundle size, caching/CDN, image optimization.
- For code review: flag React anti-patterns, unnecessary re-renders, hooks dependency issues, accessibility issues, and TypeScript typing issues.
