# Design System Master File

> **LOGIC:** When building a specific page, first check `design-system/pages/[page-name].md`.
> If that file exists, its rules **override** this Master file.
> If not, strictly follow the rules below.

---

**Project:** Alejandro Alas Portfolio  
**Updated:** 2026-11-08  
**Category:** Portfolio / Personal (developer)  
**Target reference:** **opencode.ai** — developer-product, minimal, high-contrast, confident, static (no framework)

> This file locks the visual/interaction direction for the portfolio remake. It supersedes the previous "Brutalism/Caveat+Quicksand/mesh" direction.

---

## Global Rules

### Design Principles (OpenCode-like)
- **Product-grade minimalism:** clean sections, strong hierarchy, generous whitespace, restrained decoration.
- **Dark-first, high contrast:** near-black surfaces, off-white text, crisp 1px borders. A light mode may be added later, but dark is the default identity.
- **Typographic confidence:** large, tight headlines; readable body; no decorative/display gimmicks as the core identity.
- **Static + fast:** no background mesh, no cursor-reactive effects, no magnetic/tilt behaviors. Subtle, purposeful motion only.

### Color Palette (dark-first tokens)

| Role | Hex | CSS Variable | Notes |
|------|-----|--------------|-------|
| Background | `#0A0A0A` | `--color-bg` | Page background |
| Surface | `#111111` | `--color-surface` | Sections / raised areas |
| Card | `#161616` | `--color-card` | Cards/panels |
| Card Hover | `#1C1C1C` | `--color-card-hover` | Hover state, no layout shift |
| Border | `#262626` | `--color-border` | Subtle 1px dividers/borders |
| Border Strong | `#333333` | `--color-border-strong` | Emphasis borders |
| Foreground | `#FAFAFA` | `--color-fg` | Primary text (verify ≥ 4.5:1) |
| Muted | `#A1A1AA` | `--color-muted` | Secondary text (verify ≥ 4.5:1 on bg) |
| Faint | `#71717A` | `--color-faint` | Tertiary/meta (use for non-essential only) |
| Primary / Accent | `#3B82F6` | `--color-accent` | Links, primary CTAs, focus — used sparingly |
| Accent Hover | `#60A5FA` | `--color-accent-hover` | Hover/focus emphasis |
| On Accent | `#FFFFFF` | `--color-on-accent` | Text on accent fills (verify contrast) |
| Focus Ring | `#60A5FA` | `--color-ring` | Visible keyboard focus |
| Success | `#22C55E` | `--color-success` | Status only |
| Destructive | `#EF4444` | `--color-destructive` | Errors only |

**Color Notes:** Neutral monochrome foundation + a single cool blue accent. No gradients as identity, no pearlescent text, no glow meshes. Accent is functional (actions/links/focus), not decorative fill.

### Typography

- **Primary / UI / Body:** **Inter** (400, 500, 600, 700) — clean, product-grade grotesk.
- **Mono (optional, sparse):** system mono or **JetBrains Mono** for labels/meta/code-adjacent details only — not for body.
- **Mood:** confident, technical, clear, modern, restrained.
- **Google Fonts:** [Inter](https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap)

**CSS Import:**
```css
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
```

**Type scale (guidance):**
| Element | Size (clamp/rem) | Weight | Tracking/Leading |
|---------|-------------------|--------|------------------|
| Hero H1 | `clamp(2.25rem, 5vw, 3.5rem)` | 700 | tight (`-0.02em`), leading ~1.1 |
| H2 | `clamp(1.5rem, 3vw, 2rem)` | 600 | tight, leading ~1.2 |
| H3 | `1.125–1.25rem` | 600 | normal |
| Body | `1rem` (16px) | 400 | leading 1.6 |
| Small/meta | `0.875rem` | 500 | muted color |

### Spacing Variables

| Token | Value | Usage |
|-------|-------|-------|
| `--space-1` | `4px` / `0.25rem` | Tight gaps |
| `--space-2` | `8px` / `0.5rem` | Inline/icon gaps |
| `--space-3` | `12px` / `0.75rem` | Compact padding |
| `--space-4` | `16px` / `1rem` | Standard padding |
| `--space-6` | `24px` / `1.5rem` | Card/section padding |
| `--space-8` | `32px` / `2rem` | Large gaps |
| `--space-12` | `48px` / `3rem` | Section spacing |
| `--space-16` | `64px` / `4rem` | Section margins |
| `--space-24` | `96px` / `6rem` | Hero/major section padding |

### Layout
- **Max content width:** ~`1100–1200px`, centered, with responsive side padding (`5%` / `1.25–2rem`).
- **Grid:** simple, consistent column grids for cards/lists; collapse cleanly at 768px / 480px.
- **Radius:** subtle, consistent — `8px` (controls), `12px` (cards). No playful extremes.
- **Borders over heavy shadows:** prefer `1px solid var(--color-border)`; shadows, if any, very subtle.

### Shadow Depths (subtle)

| Level | Value | Usage |
|-------|-------|-------|
| `--shadow-sm` | `0 1px 2px rgba(0,0,0,0.4)` | Minimal lift (dark UI) |
| `--shadow-md` | `0 8px 24px rgba(0,0,0,0.35)` | Elevated panels only, sparingly |

---

## Component Specs

### Buttons
```css
.btn {
  display: inline-flex; align-items: center; gap: 0.5rem;
  padding: 0.625rem 1rem; border-radius: 8px;
  font: inherit; font-weight: 600; font-size: 0.9375rem;
  text-decoration: none; cursor: pointer;
  border: 1px solid transparent;
  transition: background-color 150ms ease, border-color 150ms ease, color 150ms ease;
}
.btn-primary { background: var(--color-accent); color: var(--color-on-accent); }
.btn-primary:hover { background: var(--color-accent-hover); }
.btn-secondary { background: transparent; color: var(--color-fg); border-color: var(--color-border-strong); }
.btn-secondary:hover { border-color: var(--color-muted); background: var(--color-card); }
.btn:focus-visible { outline: 2px solid var(--color-ring); outline-offset: 2px; }
```

### Cards / Panels
```css
.card {
  background: var(--color-card);
  border: 1px solid var(--color-border);
  border-radius: 12px;
  padding: var(--space-6);
}
.card:hover { border-color: var(--color-border-strong); } /* no scale/translate that shifts layout */
```

### Navigation
- Sticky top nav, solid/blurred dark surface with a bottom border; clear active state; mobile menu accessible (toggle button with `aria-expanded`, focusable links).
- No decorative motion; scrolled state may only adjust border/background subtly.

### Links
- Default: accent or foreground with underline/clear affordance on hover; always visible focus ring.

---

## Style Guidelines

**Style:** Minimal / developer-product (OpenCode-like)  
**Keywords:** minimal, high-contrast, dark, typographic, restrained, crisp, product-grade, static  
**Best For:** Personal developer portfolio, credibility, selected work, contact  
**Key Effects:** subtle color/border transitions (150–200ms), clear focus rings; **no** mesh, parallax, magnetic, tilt, or continuous decorative animation.

### Page Pattern (portfolio)

**Pattern Name:** Credibility-first developer portfolio

- **Conversion Strategy:** make it obvious who you are, what you build, and how to reach you — fast. Lead with proof (experience, shipped work) over ornament.
- **Primary CTA:** Contact / View work (kept visible in hero and/or nav).
- **Suggested section order (home):**
  1. **Hero** — name/role, sharp value prop, 1–2 CTAs.
  2. **Proof/credibility strip** — key stats or trust markers (concise).
  3. **Selected work** — a few strong project/case-study cards linking to detail pages.
  4. **Capabilities / focus** — what you do (PERN, CRMs for charities, infra background) — factual, scannable.
  5. **Contact / footer** — clear ways to get in touch.
- **Other pages:** `projects` (index), `about`, `project-*` case studies — consistent chrome, same tokens.

### Motion & Accessibility
- Transitions: 150–200ms, `ease`/standard; only on color, opacity, border, shadow — never layout-shifting transforms.
- **Respect `prefers-reduced-motion: reduce`** — disable non-essential motion.
- Visible `:focus-visible` ring on all interactive elements.
- Text contrast ≥ 4.5:1 (normal), ≥ 3:1 (large/non-text UI); verify accent/on-accent pairs.
- Semantic landmarks (`header`, `nav`, `main`, `footer`), logical heading order, tap targets ≥ 44px.

---

## Anti-Patterns (Do NOT Use)

- ❌ Cursor-reactive gradient mesh, pearlescent animated text, magnetic buttons, 3D tilt cards.
- ❌ Decorative/display handwriting fonts as the identity (no Caveat-led headings).
- ❌ Heavy glow/gradient fills as the primary aesthetic; noisy backgrounds.
- ❌ Layout-shifting hover effects (no scaling cards/buttons that move neighbors).
- ❌ Emojis as icons — use inline SVG with consistent style/size.
- ❌ Invisible focus states; low-contrast muted text; color-only meaning.
- ❌ Sharing styles, classes, tokens, or JS with `communily.html` (Communily is fully independent).

## Pre-Delivery Checklist

- [ ] No emojis as icons; SVGs consistent.
- [ ] Dark-first palette with verified contrast (≥ 4.5:1 text).
- [ ] `cursor: pointer` on clickables; hover/focus states present.
- [ ] Transitions subtle (150–200ms); no layout-shifting transforms.
- [ ] `:focus-visible` ring visible; keyboard-navigable menus/dialogs.
- [ ] `prefers-reduced-motion` respected.
- [ ] Responsive at 375px, 768px, 1024px, 1440px; no horizontal scroll.
- [ ] No content hidden behind sticky nav; root-relative asset paths + cache-bust preserved.
- [ ] Portfolio assets/JS **not** loaded by `communily.html`.