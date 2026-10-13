// @ts-check
import { defineConfig, fontProviders } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// qa (default) builds carry noindex, a closed robots.txt and the review banner.
// Set PUBLIC_DEPLOY_ENV=production only for the www.dipriva.com build.
const isProduction = process.env.PUBLIC_DEPLOY_ENV === 'production';

export default defineConfig({
  site: 'https://www.dipriva.com',
  // One URL form everywhere: canonicals, sitemap, hreflang and internal links
  // all end in a slash, which is what the static host serves without a redirect.
  trailingSlash: 'always',
  build: {
    format: 'directory',
    // Inline the stylesheet so first paint never waits on a CSS request.
    inlineStylesheets: 'always',
  },
  integrations: [
    sitemap({
      filter: (page) => !page.includes('/404'),
      i18n: { defaultLocale: 'en', locales: { en: 'en', es: 'es' } },
    }),
  ],
  fonts: [
    {
      provider: fontProviders.local(),
      name: 'Playfair Display',
      cssVariable: '--font-playfair',
      fallbacks: ['Georgia', 'serif'],
      options: {
        variants: [
          {
            src: ['@fontsource-variable/playfair-display/files/playfair-display-latin-wght-normal.woff2'],
            weight: '400 900',
            style: 'normal',
          },
          {
            src: ['@fontsource-variable/playfair-display/files/playfair-display-latin-wght-italic.woff2'],
            weight: '400 900',
            style: 'italic',
          },
        ],
      },
    },
    {
      provider: fontProviders.local(),
      name: 'Inter',
      cssVariable: '--font-inter',
      fallbacks: ['system-ui', 'sans-serif'],
      options: {
        variants: [
          {
            src: ['@fontsource-variable/inter/files/inter-latin-wght-normal.woff2'],
            weight: '100 900',
            style: 'normal',
          },
        ],
      },
    },
  ],
  vite: {
    plugins: [tailwindcss()],
    define: {
      'import.meta.env.PUBLIC_IS_PRODUCTION': JSON.stringify(isProduction),
    },
  },
});
