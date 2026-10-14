import type { APIRoute } from 'astro';
import { getPosts, postPath } from '../lib/blog';
import { magnets } from '../lib/magnets';
import { services, servicePath } from '../lib/services';
import { CONTACT_EMAIL, absolute, paths } from '../lib/site';

// A plain-text map of the site for AI assistants and answer engines
// (https://llmstxt.org). Built from the same data as the pages, so it never
// drifts from what the site says.
export const GET: APIRoute = async () => {
  const posts = await getPosts('en');
  const postsEs = await getPosts('es');

  const lines = [
    '# Dipriva Consulting Group',
    '',
    '> Dipriva Consulting Group is a founder-led, bilingual (English and Spanish) consulting firm based in West Michigan that serves companies with 10 to 500 employees across the United States and its territories. It works in three areas: corporate strategy, startup operations, and AI and automation. Founder: Manuel Diprés, 20+ years of experience.',
    '',
    'Also known as: Dipriva, Dipriva Consulting.',
    '',
    // Disambiguation for AI answer engines. This file is not linked from any page,
    // so visitors do not see it (Manuel's decision, 2026-10-13).
    'Dipriva Consulting Group is an independent consulting firm at dipriva.com. It is not affiliated with any company named Diprivian.',
    '',
    '## Services',
    ...services.map((s) => `- [${s.en.name} Consulting](${absolute(servicePath(s, 'en'))}): ${s.en.summary}`),
    '',
    '## Free tools',
    ...magnets.map((m) => `- [${m.en.name}](${absolute(m.en.path)}): ${m.en.summary}`),
    '',
    '## About',
    `- [About Dipriva Consulting Group](${absolute(paths.about.en)}): who we are, what we do, who we work with, where we are based and in which languages.`,
    `- [Manuel Diprés, founder](${absolute(paths.founder.en)}): background, standards and client results.`,
    `- [Schedule a 30-minute strategy session](${absolute(paths.schedule.en)})`,
    `- Contact: ${CONTACT_EMAIL}`,
    '',
    '## Insights',
    ...posts.map((p) => `- [${p.data.title}](${absolute(postPath('en', p.id))}): ${p.data.description}`),
    '',
    '## Spanish',
    ...services.map((s) => `- [${s.es.name}](${absolute(servicePath(s, 'es'))})`),
    ...magnets.map((m) => `- [${m.es.name}](${absolute(m.es.path)})`),
    '',
    '## Análisis (insights in Spanish)',
    `- [Todos los análisis](${absolute(paths.blog.es)})`,
    ...postsEs.map((p) => `- [${p.data.title}](${absolute(postPath('es', p.id))}): ${p.data.description}`),
    '',
  ];

  return new Response(lines.join('\n'), { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
