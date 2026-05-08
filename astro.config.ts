import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://freedomglassremodeling.com',
  integrations: [
    react(),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
  image: {
    formats: ['avif', 'webp'],
  },
  compressHTML: true,
});
