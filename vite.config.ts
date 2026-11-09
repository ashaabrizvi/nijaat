import { defineConfig } from 'vite';
import preact from '@preact/preset-vite';
import { VitePWA } from 'vite-plugin-pwa';
import pkg from './package.json' with { type: 'json' };

// Relative base so the same build works on GitHub Pages (/nijaat/),
// a custom domain, and later inside the Capacitor app shell.
export default defineConfig({
  base: './',
  define: { __APP_VERSION__: JSON.stringify(pkg.version) },
  plugins: [
    preact(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg', 'icons/apple-touch-icon.png', 'dar-e-nijaat.html'],
      manifest: {
        id: './',
        name: 'Dar-e-Nijaat',
        short_name: 'Dar-e-Nijaat',
        description:
          'The door of return. A gentle, private companion for tawbah, salah, Qur’an and walking back to Allah — in English and Urdu.',
        lang: 'en',
        dir: 'auto',
        start_url: './',
        scope: './',
        display: 'standalone',
        orientation: 'portrait',
        background_color: '#FBF4E8',
        theme_color: '#FBF4E8',
        categories: ['lifestyle', 'education', 'books'],
        icons: [
          { src: 'icons/icon-192.png', sizes: '192x192', type: 'image/png' },
          { src: 'icons/icon-512.png', sizes: '512x512', type: 'image/png' },
          { src: 'icons/icon-maskable-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,svg,png,woff2,json}'],
        maximumFileSizeToCacheInBytes: 4 * 1024 * 1024,
      },
    }),
  ],
});
