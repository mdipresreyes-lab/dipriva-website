import type { APIRoute } from 'astro';
import { IS_PRODUCTION } from '../lib/site';

// QA builds close the whole site to crawlers. Production keeps search and AI
// search crawlers welcome, blocks the private intake form and Bytespider, and
// points at the generated sitemap.
export const GET: APIRoute = ({ site }) => {
  const body = IS_PRODUCTION
    ? [
        'User-agent: *',
        'Allow: /',
        'Disallow: /client_form/',
        '',
        'User-agent: Bytespider',
        'Disallow: /',
        '',
        `Sitemap: ${new URL('sitemap-index.xml', site)}`,
        '',
      ].join('\n')
    : ['User-agent: *', 'Disallow: /', ''].join('\n');

  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
