# Cyril Zhang — AI Engineer Portfolio

**Live:** [cyrilzhang.dev](https://cyrilzhang.dev/)

Personal portfolio site built with React and Vite. Showcases my experience, skills, projects, and certifications as an AI Engineer.

![Portfolio Preview](https://pub-a0e4dc01588c4b99b1eecb877acbb697.r2.dev/references/portfolio-preview.png.webp)

## Stack

- **React 18** + **Vite**
- Plain CSS (no UI libraries, no Tailwind)
- Deployed on **Vercel**
- Binary assets (photo, resume, certs) hosted on **Cloudflare R2**

## Features

- Typewriter hero with cycling role titles
- Scroll-triggered fade-in animations (IntersectionObserver)
- Tabbed skills section
- Side navigation with scroll progress bar
- 3D tilt effect on photo
- Vercel Analytics + Speed Insights

## Local Development

```bash
npm install
npm run dev
```

> Note: Photo, resume PDF, and certification images are served from Cloudflare R2 and are not included in this repo.

## Deployment

Pushing to `main` triggers an automatic Vercel deploy. SPA routing is handled via `vercel.json`.