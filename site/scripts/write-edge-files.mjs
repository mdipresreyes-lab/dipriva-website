// Writes dist/_headers and dist/_redirects for Cloudflare static assets.
// QA builds carry X-Robots-Tag noindex on every response; production does not.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const dist = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', 'dist');
const production = process.env.PUBLIC_DEPLOY_ENV === 'production';

const headers = [
  '/*',
  '  X-Content-Type-Options: nosniff',
  '  Referrer-Policy: strict-origin-when-cross-origin',
  '  Permissions-Policy: camera=(), microphone=(), geolocation=()',
  ...(production ? ['  Strict-Transport-Security: max-age=31536000'] : ['  X-Robots-Tag: noindex, nofollow']),
  '',
  // Spanish titles live in llms.txt. Say the encoding outright so no browser or
  // crawler has to guess it.
  '/llms.txt',
  '  Content-Type: text/plain; charset=utf-8',
  '',
  '/_astro/*',
  '  Cache-Control: public, max-age=31536000, immutable',
  '',
  // Downloads are reached through the lead form; keep the files out of search.
  '/downloads/*',
  '  X-Robots-Tag: noindex',
  '',
  '/unsubscribe/*',
  '  X-Robots-Tag: noindex, nofollow, noarchive',
  '  Referrer-Policy: no-referrer',
  '',
  '/client_form/*',
  '  X-Robots-Tag: noindex, nofollow',
  '',
  '/es/formulario-de-cliente/*',
  '  X-Robots-Tag: noindex, nofollow',
  '',
];

// Legacy URLs. Today these live as Cloudflare redirect rules; keeping them here
// lets the rules be deleted at cutover without losing any old link.
const redirects = [
  '/home / 301',
  '/home-716983 / 301',
  '/approach-318656 / 301',
  '/impact / 301',
  '/industries / 301',
  // /about and /about/ serve the company page (2026-10-13). They used to redirect to the founder page.
  // Retired posts (2026-10-13: written for solo founders, outside the 10 to 500 employee audience).
  '/blog/architect-the-micro-multinational-scaling-global-enterprise-without-headcount-drag/ /blog/operational-capacity-architecture-decoupling-headcount-b2b-scale/ 301',
  '/blog/architect-the-micro-multinational-scaling-global-enterprise-without-headcount-drag /blog/operational-capacity-architecture-decoupling-headcount-b2b-scale/ 301',
  // The old AI-crawler mirror. Remove the Cloudflare Transform Rule at cutover.
  '/bot/* /:splat 301',
  '',
];

fs.writeFileSync(path.join(dist, '_headers'), headers.join('\n'));
fs.writeFileSync(path.join(dist, '_redirects'), redirects.join('\n'));
console.log(`Edge files written for ${production ? 'production' : 'QA'}.`);
