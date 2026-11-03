import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// GitHub Pages serves project sites from a sub-path (https://name.github.io/repo/),
// so every asset path is relative ('./'). This works under any sub-path or at a domain root.
//
// Social-media link previews need an absolute image URL. The deploy workflow sets SITE_URL
// (for example https://name.github.io/repo/); locally it is left empty and a relative path is used.
const siteUrl = (process.env.SITE_URL || '').replace(/\/?$/, '/');

function absoluteOgImage() {
  return {
    name: 'absolute-og-image',
    transformIndexHtml(html) {
      const image = process.env.SITE_URL ? `${siteUrl}og-image.png` : 'og-image.png';
      return html.replace('__OG_IMAGE__', image);
    },
  };
}

export default defineConfig({
  base: './',
  plugins: [react(), absoluteOgImage()],
});
