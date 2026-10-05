import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

// Vercel (default): site at the domain root.
// GitHub Pages: build with DEPLOY_TARGET=ghpages (the workflow does this) ->
//   site 'https://jqasim522.github.io', base '/portfolio'.
const gh = process.env.DEPLOY_TARGET === 'ghpages';

export default defineConfig({
  site: gh ? 'https://jqasim522.github.io' : 'https://qasim-portfolio.vercel.app', // change to your Vercel domain
  base: gh ? '/portfolio' : '/',
  output: 'static',
  integrations: [react(), tailwind({ applyBaseStyles: false }), sitemap()],
});
