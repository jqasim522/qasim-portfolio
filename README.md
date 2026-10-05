# Qasim Javed — Portfolio (v4)

Astro 4 · React 18 islands · Tailwind 3.4 · Framer Motion 11 · TypeScript. Dark only.
Fonts from Fontshare: Cabinet Grotesk (display), Satoshi (body), JetBrains Mono (mono; falls back to system monospace if Fontshare doesn't serve it).

## Run
```bash
npm install
npm run dev            # http://localhost:4321
npm run build && npm run preview
```
Test videos on `localhost` or a deployed URL, not `file://` (YouTube Error 153 = no referrer).

## Add your hero photo
Place a **square photo at `public/hero.jpg`** (800×800 px, compressed under 150 KB, e.g. with tinypng.com). Until the file exists, the QJ monogram is shown (no broken image).

## Deploy
**Vercel:** push to GitHub → vercel.com/new → import → Deploy. Set `site` in `astro.config.mjs`. `vercel.json` sets `Referrer-Policy` and cache headers.
**GitHub Pages:** Settings → Pages → Source: GitHub Actions; push to `main` (builds with `DEPLOY_TARGET=ghpages`, base `/portfolio`).

## Update content
- Projects, video IDs, code links, stats: `src/components/Projects.tsx`.
- Skills and "Used in" tooltips: `src/components/Skills.tsx`. Marquee: `src/components/ui/Marquee.tsx`.
- Experience, education, certifications, about: the matching `.astro` files.
- Resume: replace `public/resume.pdf` (keep the filename). OG image: `public/og-image.png`.

MIT licensed.
