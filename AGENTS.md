# AGENTS.md

## Project

Personal portfolio website — vanilla HTML5, CSS3, and vanilla JavaScript. No framework, no bundler, no build step.

## Commands

- No scripts, no package.json. No lint, typecheck, or tests exist.
- Local dev: open `index.html` in a browser, or serve the repo root, e.g. `python3 -m http.server 8000` (or VS Code Live Server).

## Structure

- Pages live at the repo root: `index.html`, `projects.html`, `about.html`, `communily.html`, and `project-*.html` (case studies).
- Shared styles: `css/style.css` (design tokens + shared components). Page-specific styles live next to it and are scoped (e.g. `.communily-page` in `css/communily.css`, `.nav-communily-btn` in `css/nav-cta.css`).
- Shared JS: `js/main.js` — all behavior (theme, nav, animations, modals) in one file behind `DOMContentLoaded`.
- Assets: `assets/` (favicon, OG image, images incl. CV PDF).

## Gotchas

- Asset paths are absolute and root-relative: `/css/style.css`, `/js/main.js?v=1`, `/assets/...`. Serve from the repo root; they will not resolve via `file://` or subpaths.
- Cache-bust by version: referenced assets use `?v=1` query strings. Bump when changing cached assets.
- Theme: `data-theme` attribute on `<html>` (`dark` default). Colors come from CSS variables (`--bg`, `--card`, `--border`, `--text`, `--muted`, `--blue`, `--yellow`, `--green`); light values in `:root`, dark in `[data-theme="dark"]`. Default `dark`; an inline head script reads `localStorage` key `theme` before render to avoid flash.
- `prefers-reduced-motion: reduce` disables the bold/magnetic/tilt animations in `js/main.js`.

## Conventions

- New page-specific CSS must be scoped (prefix like `.communily-`) and extend design tokens rather than duplicating resets/typography — `css/communily.css` explicitly says not to duplicate shared rules.
- New shared behavior belongs in `js/main.js` using existing patterns (`DOMContentLoaded`, query selectors with null checks).

## Design

- UI/UX design intelligence via the `uipro` CLI / `ui-ux-pro-max` skill (installed for OpenCode in `.opencode/skills/`, mirrored to `.claude/skills/`).
- Persisted design systems (locked targets): `design-system/<project>/MASTER.md` — portfolio: `design-system/alejandro-alas-portfolio/MASTER.md`, Communily: `design-system/communily/MASTER.md`. Regenerate/persist via `python3 .opencode/skills/ui-ux-pro-max/scripts/search.py "<query>" --design-system --persist -p "<Name>" --output-dir .`
- **Portfolio (remake target, OpenCode-like):** static, dark-first, high-contrast, minimal/product-grade (neutral surfaces, Inter, restrained blue accent, crisp borders, subtle motion only). No mesh/pearlescent/magnetic/tilt.
- **Communily `/communily.html` (remake target, HubSpot-like):** bright, conversion-focused charity-CRM landing (light canvas, clear dual CTAs, proof → features → roadmap → integrations → tiers → closing CTA, approachable Inter).
- **Hard separation (non-negotiable):** Communily shares **nothing** with portfolio pages — no `style.css`, no `nav-cta.css`, no `main.js`, no shared classes/tokens/theme. It uses its own self-contained assets (e.g. `css/communily.css`, optional `js/communily.js`). Portfolio may link to `/communily.html`.

## Verification

- No automated checks available; verify manually by serving locally and exercising the changed page (light/dark theme, mobile menu, any modal or animation).

## Deployment

- Static site hosted on Netlify at https://aalas-dev.netlify.app (source: `github.com/aalassv/alejandro-alas-portfolio`). No deploy config files in repo.
