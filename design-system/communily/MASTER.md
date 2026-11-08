# Design System Master File

> **LOGIC:** When building a specific page, first check `design-system/pages/[page-name].md`.
> If that file exists, its rules **override** this Master file.
> If not, strictly follow the rules below.

---

**Project:** Communily (CRM for charities) — landing page  
**Updated:** 2026-11-08  
**Category:** Non-profit / Charity CRM (SaaS-style marketing page)  
**Target reference:** **hubspot.com** — bright, friendly, conversion-focused platform page (structure, rhythm, clarity)  
**Canonical page:** `/communily.html`

> This file locks the visual/interaction direction for the Communily landing remake. It supersedes the previous cyan/orange + Playfair direction.

---

## Separation constraint (NON-NEGOTIABLE)

**`communily.html` shares NOTHING with portfolio pages.** It must be fully independent:
- **No** `/css/style.css`, **no** `/css/nav-cta.css`, **no** `/js/main.js`.
- **No** portfolio class names, tokens, components, or theme mechanism. Communily defines its **own** reset, variables, layout, components, and (if used) JS.
- **Own assets only:** e.g. `css/communily.css` (self-contained) and optionally `js/communily.js`.
- Portfolio may *link* to `/communily.html`; the hyperlink is fine — styling/code is not shared.
- If a theme preference is stored, use a **Communily-specific key/mechanism** (never the portfolio `theme` contract), or keep a fixed light mode.

---

## Global Rules

### Design Principles (HubSpot-like)
- **Conversion-focused clarity:** a visitor should immediately understand what Communily is, who it’s for (UK/Scottish charities & community orgs), and the next step.
- **Bright, approachable, trustworthy:** light surfaces, generous whitespace, friendly but professional tone, clear hierarchy — not "enterprise cold," not playful.
- **Proof over claims:** stats, real deployments/outcomes, transparent roadmap/tiers.
- **Structured SaaS rhythm:** hero with dual CTAs → trust/proof → capability blocks → how-it-works/who-it’s-for → social proof/results → integrations → pricing/tiers → closing CTA (+ optional FAQ).

### Color Palette (light-first, HubSpot-structured, charity-appropriate)

| Role | Hex | CSS Variable | Notes |
|------|-----|--------------|-------|
| Background | `#FFFFFF` | `--c-bg` | Primary page background |
| Background Alt | `#F6F9FC` | `--c-bg-alt` | Alternating sections (HubSpot-like soft neutral) |
| Surface / Card | `#FFFFFF` | `--c-surface` | Cards on alt sections |
| Border | `#DFE3EB` | `--c-border` | Subtle dividers/borders |
| Foreground | `#213343` | `--c-fg` | Primary text (deep slate; verify ≥ 4.5:1) |
| Muted | `#516F90` | `--c-muted` | Secondary text (verify ≥ 4.5:1 on white/alt) |
| Primary / Accent | `#FF5C35` | `--c-accent` | Primary CTAs/highlights (HubSpot orange family) |
| Accent Hover | `#E04826` | `--c-accent-hover` | Hover/active (darkened for contrast) |
| On Accent | `#FFFFFF` | `--c-on-accent` | Text on accent (verify contrast; darken accent if needed) |
| Secondary Accent | `#0091AE` | `--c-accent-2` | Links/info accents (used sparingly) |
| Focus Ring | `#213343` | `--c-ring` | High-visibility focus (or accent with sufficient contrast) |
| Success | `#0F8A5F` | `--c-success` | "Live"/positive indicators (verify contrast) |
| Highlight / Soft | `#FFF1EE` | `--c-accent-soft` | Tinted backgrounds/badges |

**Color Notes:** Keep the **HubSpot feel** (clean light canvas + confident orange CTA + calm secondary accents) while ensuring charity-appropriate trust and WCAG contrast. Do **not** reuse portfolio variables. All tokens are Communily-owned (`--c-*` or similar, defined in `communily.css`).

### Typography

- **Primary / UI / Body / Headings:** **Inter** (400, 500, 600, 700/800) — clear, friendly-professional, excellent for SaaS landing readability.
- **Mood:** approachable, clear, trustworthy, confident, modern.
- **Google Fonts:** [Inter](https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap)

**CSS Import (inside `communily.css` or Communily-owned `<head>` only):**
```css
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
```

**Type scale (guidance):**
| Element | Size (clamp/rem) | Weight | Notes |
|---------|-------------------|--------|-------|
| Hero H1 | `clamp(2rem, 5vw, 3.25rem)` | 800 | Strong value prop, leading ~1.1 |
| H2 | `clamp(1.5rem, 3vw, 2.25rem)` | 700 | Section headings |
| H3 | `1.125–1.25rem` | 600 | Card/feature titles |
| Body | `1rem` (16px) | 400 | leading 1.6, muted for secondary |
| Eyebrow/label | `0.8125–0.875rem` | 600 | uppercase/letterspaced sparingly |

### Spacing & Layout
- **Max content width:** ~`1080–1200px`, centered, responsive padding.
- **Section rhythm:** generous vertical padding (`56–96px`) with alternating `--c-bg` / `--c-bg-alt` bands (HubSpot-like).
- **Radius:** friendly/modern — `8px` (inputs/badges), `12–16px` (cards). Consistent.
- **Borders & depth:** light 1px borders + soft shadows for cards; clean, not heavy.

| Token | Value | Usage |
|-------|-------|-------|
| `--c-space-2` | `8px` | Inline/icon gaps |
| `--c-space-4` | `16px` | Standard padding |
| `--c-space-6` | `24px` | Card padding |
| `--c-space-8` | `32px` | Block gaps |
| `--c-space-12` | `48px` | Section inner spacing |
| `--c-space-16` | `64px` | Section padding (min) |
| `--c-space-24` | `96px` | Major section padding |

### Shadow Depths
| Level | Value | Usage |
|-------|-------|-------|
| `--c-shadow-sm` | `0 1px 3px rgba(33,51,67,0.08)` | Subtle lift |
| `--c-shadow-md` | `0 8px 24px rgba(33,51,67,0.10)` | Cards |

---

## Component Specs (Communily-owned classes; examples)

> Use Communily-prefixed/owned class names (e.g. `c-btn`, `c-card`, `c-hero`) — **not** `.btn`, `.hero-section`, etc. from the portfolio.

### Buttons
```css
.c-btn {
  display: inline-flex; align-items: center; justify-content: center; gap: 0.5rem;
  padding: 0.75rem 1.25rem; border-radius: 8px;
  font: inherit; font-weight: 600; font-size: 1rem;
  text-decoration: none; cursor: pointer; border: 2px solid transparent;
  transition: background-color 150ms ease, border-color 150ms ease, color 150ms ease;
}
.c-btn--primary { background: var(--c-accent); color: var(--c-on-accent); border-color: var(--c-accent); }
.c-btn--primary:hover { background: var(--c-accent-hover); border-color: var(--c-accent-hover); }
.c-btn--secondary { background: #fff; color: var(--c-accent); border-color: var(--c-accent); }
.c-btn--secondary:hover { background: var(--c-accent-soft); }
.c-btn:focus-visible { outline: 3px solid var(--c-ring); outline-offset: 2px; }
```

### Cards / Feature blocks
```css
.c-card {
  background: var(--c-surface);
  border: 1px solid var(--c-border);
  border-radius: 16px;
  padding: var(--c-space-6);
  box-shadow: var(--c-shadow-sm);
}
```

### Header / Nav
- Simple, clean top bar (Communily branding/mark + anchor nav + primary CTA). Sticky optional; mobile menu accessible (`aria-expanded`).
- Independent implementation — no portfolio navbar JS/CSS.

---

## Page Pattern (HubSpot-like landing)

**Pattern Name:** Conversion-focused SaaS/charity-CRM landing

- **Conversion Strategy:** clear value prop + low-friction next step (conversation/demo). Reinforce with proof (real deployments, stats) and reduce risk (self-hosted/data ownership, transparent roadmap & tiers).
- **CTA Placement:** **Dual CTA in hero** (primary: “Book a conversation”/get in touch; secondary: “See tiers”/learn more) + repeated CTA near pricing and closing band. Keep nav CTA visible.
- **Suggested section order (preserve/adapt existing real content):**
  1. **Hero** — what Communily is, who it’s for (charities/community orgs), core outcome, dual CTAs.
  2. **Proof / trust strip** — real stats/outcomes (e.g. 350+ members managed, 50% queue reduction, 100% self-hosted / your data) — concrete, not generic.
  3. **What it does today** — capability/feature blocks (“hubs” feel): members/beneficiaries, services & visits, volunteers, tasks/workflow, reporting/export, roles/access. Mark live clearly.
  4. **How it works / who it’s for** — simple, scannable (deployment model: self-hosted, your server; UK/Scottish charities).
  5. **Roadmap (honest)** — what’s coming (donors, payments & Gift Aid, campaigns, comms, events, accounting sync) — transparent sequencing.
  6. **Integrations** — planned/current tools (Stripe, GoCardless, Xero, QuickBooks, HMRC Gift Aid, SMS/Email).
  7. **Pricing / tiers** — Community & Growth (clear inclusions, CTA per tier).
  8. **Closing CTA band** — strong prompt to get in touch.
  9. *(Optional)* FAQ/objections.

### Motion & Accessibility
- Transitions 150–200ms, purposeful; no layout-shifting hovers.
- **Respect `prefers-reduced-motion: reduce`.**
- Visible focus rings (≥ 3px or strong outline), keyboard-navigable, logical heading order, landmarks.
- Contrast ≥ 4.5:1 for text; verify accent/on-accent and success badges. Tap targets ≥ 44px.
- Don’t rely on color alone for “Live/Planned” status (use labels).

---

## Anti-Patterns (Do NOT Use)

- ❌ **Any dependency on portfolio assets:** `style.css`, `nav-cta.css`, `main.js`, portfolio classes/tokens/theme. (Hard rule.)
- ❌ Generic SaaS claims with no proof; hiding deployment/data-ownership facts.
- ❌ Low-contrast orange-on-white text or accent fills that fail contrast.
- ❌ Layout-shifting hover transforms; autoplaying/carousel motion without controls & reduced-motion handling.
- ❌ Emojis as icons — inline SVG, consistent style.
- ❌ Invisible focus states; keyboard traps in any menu/dialog.

## Pre-Delivery Checklist

- [ ] `communily.html` loads **only** Communily-owned CSS/JS/fonts (verify Network: no `style.css`/`main.js`).
- [ ] Own reset/tokens/components; no portfolio class/token reuse.
- [ ] HubSpot-like structure present (hero dual CTA, proof, features, roadmap, integrations, tiers, closing CTA).
- [ ] Contrast verified (text, CTAs, badges) ≥ 4.5:1 where required.
- [ ] `:focus-visible` clear; keyboard + mobile nav accessible.
- [ ] `prefers-reduced-motion` respected; no layout-shifting hovers.
- [ ] Responsive at 375px, 768px, 1024px, 1440px; no horizontal scroll.
- [ ] Real content/proof preserved; root-relative paths + cache-bust correct.