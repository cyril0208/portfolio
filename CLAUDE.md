# CLAUDE.md

Guidance for Claude Code working in this repo.

## Project

Personal portfolio for Cyril Zhang (AI Engineer). Vite + React, plain CSS per component, no UI framework. Deployed on Vercel.

Run locally: `npm run dev` (or the `portfolio` config in `.claude/launch.json`).

## Project descriptions

All portfolio projects live in the `projects` array in `src/components/Projects.jsx`. When adding or editing one, follow these rules.

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

Screenshots are hosted on Cloudflare R2 under `references/assets/`. Ask Cyril for the URL rather than guessing one.
