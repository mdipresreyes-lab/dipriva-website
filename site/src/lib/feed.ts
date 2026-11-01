import type { APIRoute } from 'astro';
import { getPosts, postPath, blogIndexPath } from './blog';
import { absolute } from './site';
import type { Lang } from './copy';

const escapeXml = (text: string) =>
  text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const copy = {
  en: { title: 'Dipriva Consulting Group: Insights', description: 'Strategy, operations and AI guidance for owners and executives of companies with 10 to 500 employees.', language: 'en-us' },
  es: { title: 'Dipriva Consulting Group: Análisis', description: 'Guía de estrategia, operaciones e IA para dueños y directivos de empresas de 10 a 500 empleados.', language: 'es-us' },
};

/** An RSS 2.0 feed of the published posts, newest first. Built from the same data as the blog pages. */
export const feed = (lang: Lang, feedPath: string): APIRoute => async () => {
  const posts = await getPosts(lang);
  const newest = posts[0]?.data.updated ?? posts[0]?.data.date;
  const items = posts.map((p) => {
    const url = absolute(postPath(lang, p.id));
    return [
      '    <item>',
      `      <title>${escapeXml(p.data.title)}</title>`,
      `      <link>${url}</link>`,
      `      <guid isPermaLink="true">${url}</guid>`,
      `      <pubDate>${p.data.date.toUTCString()}</pubDate>`,
      `      <category>${escapeXml(p.data.cluster)}</category>`,
      `      <description>${escapeXml(p.data.description)}</description>`,
      '    </item>',
    ].join('\n');
  });
  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">',
    '  <channel>',
    `    <title>${escapeXml(copy[lang].title)}</title>`,
    `    <link>${absolute(blogIndexPath(lang))}</link>`,
    `    <description>${escapeXml(copy[lang].description)}</description>`,
    `    <language>${copy[lang].language}</language>`,
    ...(newest ? [`    <lastBuildDate>${newest.toUTCString()}</lastBuildDate>`] : []),
    `    <atom:link href="${absolute(feedPath)}" rel="self" type="application/rss+xml" />`,
    ...items,
    '  </channel>',
    '</rss>',
    '',
  ].join('\n');
  return new Response(xml, { headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' } });
};
