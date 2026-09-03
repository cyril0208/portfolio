# CLAUDE.md

Guidance for Claude Code working in this repo.

## Project

Personal portfolio for Cyril Zhang (AI Engineer). Vite + React, plain CSS per component, no UI framework. Deployed on Vercel.

Run locally: `npm run dev` (or the `portfolio` config in `.claude/launch.json`).

Fonts load from Google Fonts in `index.html`: **Inter** (400–800) and **JetBrains Mono** (400–700). Both are already linked — don't add more families.

---

# Design system

Dark, animated, single-page site. Flat surfaces, one periwinkle accent, generous vertical space, mono type for anything label-shaped.

## Colours — always tokens, never literals

Every colour lives in `:root` in `src/index.css` as OKLCH. Never hardcode a hex or `rgba()` in a component; if you need a new shade, add a token.

| Token | Use |
|---|---|
| `--bg-page` | Hero, Skills, Projects |
| `--bg-alt` | About, Experience, Contact — the alternating shade |
| `--bg-surface` | Cards and chips |
| `--text-primary` / `--text-secondary` / `--text-muted` | Headings / body / labels |
| `--accent` | Links, labels, primary fill, timeline dots |
| `--accent-light` | Accent hover only |
| `--accent-soft` | Accent at 10% — chip and tag backgrounds |
| `--border` / `--border-strong` | White at 8% / 20% |
| `--radius-card` (14px) / `--radius-pill` (999px) | Cards / buttons and chips |
| `--shadow-card` | Card hover only |
| `--mono` | The JetBrains Mono stack |
| `--pad-x` (6vw) / `--nav-h` | Horizontal inset / nav height |

The accent also appears as the hex `0x8fa3ff` inside the three.js scenes, since WebGL can't read CSS variables. Keep the two in sync by hand.

## Typography

- **Inter** — headings and body. Hero name `clamp(56px, 10vw, 128px)`/800, section titles `clamp(32px, 5vw, 48px)`/700, contact title `clamp(36px, 6vw, 64px)`/800.
- **JetBrains Mono** (`var(--mono)`) — section labels, skill chips, project tags, timeline periods, cert issuers, the footer bar, the nav logo, the engineer clock. Rule of thumb: if it's a label, a tag, or a number, it's mono. If it's a sentence, it's Inter.
- Labels are uppercase, 11–13px, 1–3px letter-spacing.

## Layout

Sections are full-bleed; content is inset by `6vw` via `.container` (capped at 1600px so ultrawides don't sprawl).

```jsx
<section id="skills" className="skills section--tight">
  <div className="container">…</div>
</section>
```

- `section` — 160px vertical padding by default, 100px under 780px wide.
- `.section--alt` — the `--bg-alt` shade. Alternate it; never two adjacent sections in the same shade.
- `.section--tight` — 100px padding, for lighter sections like Skills.

Section headers use the shared classes, with a stagger via `--reveal-delay`:

```jsx
<p className="section-label" data-reveal="">Skills</p>
<h2 className="section-title" data-reveal="" style={{ '--reveal-delay': '0.08s' }}>…</h2>
<p className="section-desc" data-reveal="" style={{ '--reveal-delay': '0.16s' }}>…</p>
```

## Scroll reveal — must fail open

`useReveal` (`src/hooks/useReveal.js`) reveals each `[data-reveal]` element once as it enters view.

**The hidden state is opt-in per element.** The hook adds `reveal-armed` to the elements it actually observes, and only `[data-reveal].reveal-armed` is hidden by CSS. Anything the hook never reached — a node mounted later, an HMR swap, a JS failure — renders visible.

This matters: an earlier version hid every `[data-reveal]` globally, so one missed observer left whole sections permanently blank. **Never gate visibility on a class that JS must add to make content appear.** If you touch this, the invariant is: content is visible unless JS has explicitly armed it and is able to unarm it.

Stagger lists with `--reveal-delay`, roughly 0.08–0.1s per item. Don't exceed ~0.5s total or the last item feels broken.

## Motion and 3D

Two three.js scenes, both on transparent canvases behind content:

- `ParticleField.jsx` — hero background. Point cloud plus lines between points closer than a threshold, slow auto-rotation, cursor parallax. `intensity` prop: `subtle` / `normal` / `bold`.
- `WireShape.jsx` — rotating wireframe icosahedron, decorative, floats off the right edge of About.

Conventions every scene follows — match them in any new one:

- Pause with `if (document.hidden) return` inside the rAF loop.
- Under `prefers-reduced-motion`, render one static frame and start no loop.
- Dispose geometry, material, and renderer in the effect cleanup; remove every listener.
- Cap pixel ratio at 2.

`CursorDot.jsx` is the cursor: a 12px `mix-blend-mode: difference` circle easing toward the pointer at 0.18/frame. Returns `null` on coarse pointers and under reduced motion. It is the *only* cursor effect — don't add a second one.

Every decorative animation needs a `prefers-reduced-motion` escape. Hero entrance, scroll-cue dot, and typewriter caret are all disabled there.

## Adding a section

Four places, or the navs drift out of sync:

1. The component, with an `id` and a `section--alt` / `section--tight` choice that keeps the alternation intact.
2. Render it in `src/App.jsx` (inside `<main>`; Footer sits outside).
3. `links` in `src/components/Navbar.jsx` — objects of `{ id, label }`. **Label and id are independent on purpose**: `#resume` is labelled "Experience".
4. `sections` in `src/components/SideNav.jsx`.

Icons live in `src/components/icons.jsx` — only glyphs used in more than one place, or referenced from content data, belong there.

---

# Content

## Project descriptions

All portfolio projects live in the `projects` array in `src/content/projects.js` (rendered by `src/components/Projects.jsx`). When adding or editing one, follow these rules.

### `details` — always bullets, never prose

`details` is an **array of strings**, rendered as a `<ul class="modal-details">` in the modal. Never a paragraph string — `.modal-details` has no `white-space: pre-line`, so `\n` breaks collapse and prose becomes an unreadable wall.

- **5–7 bullets.** Fewer means the project looks thin; more and nobody reads it.
- **One idea per bullet**, 1–2 lines rendered. If a bullet needs a semicolon plus an "and", split it.
- **Lead with what it does and who it's for**, then how it works, then results.
- **Last bullet is the stack** — one line, only what's load-bearing. Full list lives in `tech`.
- **Keep concrete numbers** (accuracy, latency, page counts, ID formats). They are the whole point; cut adjectives instead.
- **Keep the interesting engineering decision** — the tradeoff, the bug found, the thing that didn't work first. That's what a reader remembers.
- Cut: "Built with", "leveraging", "robust", "seamless", "cutting-edge", and any sentence that would be true of every project.

### Other fields

- `summary` — 1–2 sentences for the card. Lead with the outcome or a metric.
- `tags` — max 5, headline tech only. Must be a subset of `tech`.
- `tech` — full stack list, modal only.
- `github` / `live` / `college` / `screenshot` — `null` when absent; each is conditionally rendered.
- `id` — arbitrary, only used as a React key. Display order is array order, not id order.

`screenshot` now carries real weight: it fills the card's 16:10 header, not just the modal. Without one the card falls back to a diagonal hatch with a "Project screenshot" label — fine as a placeholder, weak in a grid next to real images. Screenshots are hosted on Cloudflare R2 under `references/assets/`. Ask Cyril for the URL rather than guessing one.

## Skills

`groups` in `src/content/skills.js` — `{ category, skills }`. Rendered as a mono category label plus a wrapping chip row. Categories are plain data with no icons; don't reintroduce per-category icons or tab switching, the point is seeing everything at once.

## Experience and education

`timeline` in `src/content/resume.js` — `{ type: 'work' | 'edu', role, org, location, period, bullets, tech? }`.

- `period` uses an en dash and month-year: `'Jul 2023 – Jan 2026'`, or `'Apr 2026 – Present'`. `Resume.jsx` parses this to compute per-role duration, so the format is load-bearing.
- `type` drives the dot and period colour — `edu` entries render muted.
- `tech` is optional and work-only in practice.
- The engineer clock is anchored by `ENGINEER_START` in `Resume.jsx`, since `period` only carries month granularity.

## Certifications

`certs` in `src/content/about.js` — `{ name, issuer, year, skills, pdf }`. Rendered as a bordered list under the About bio. `year` may be an empty string.

## Links and copy

- Real destinations, in one place each: email `cyrilyiming@gmail.com`, GitHub `cyril0208`, LinkedIn, and the R2-hosted resume PDF.
- **Don't make a primary CTA a `mailto:`** — it silently does nothing for visitors with no mail client. The hero's "Get in touch" scrolls to `#contact`; keep `mailto:` for the explicit Email link and icon.
- External links need `target="_blank"` and `rel="noreferrer"`. `mailto:` gets neither.

---

# Verifying changes

The Browser pane can report a hidden tab (`document.hidden: true`) and a zero-width viewport. Both silently invalidate what you observe, and have produced false conclusions in both directions here — blank screenshots of a working page, and a phantom layout bug from a collapsed viewport.

Before trusting any observation, check `document.hidden` and `window.innerWidth`. If the viewport is 0, call `resize_window` with real dimensions first. In a hidden tab, rAF, IntersectionObserver, CSS animations, smooth scrolling, and `getComputedStyle` for animated properties are all unreliable — verify behaviour by asserting on the DOM and by instrumenting handlers (e.g. patch `scrollIntoView` to confirm the target) rather than by reading pixels or scroll offsets. Never report a change as visually verified on the strength of a screenshot from a hidden pane.
