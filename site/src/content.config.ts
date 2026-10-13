import { defineCollection } from 'astro:content';
import type { Loader } from 'astro/loaders';
import { z } from 'astro/zod';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

/**
 * Blog posts are Markdown files in content/blog/<slug>.md, written in Claude Code
 * sessions from an outside draft and merged to main. Make.com wrote two early
 * posts (2026-09-02 to 2026-09-04) with malformed dates such as date: ""2026-09-04"",
 * so this loader reads each line leniently until those files are cleaned up.
 * Unpublished or slugless files are skipped.
 */
function parseFrontmatter(raw: string): { meta: Record<string, string>; body: string } {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!match) return { meta: {}, body: raw };
  const meta: Record<string, string> = {};
  for (const line of match[1].split(/\r?\n/)) {
    const colon = line.indexOf(':');
    if (colon < 0) continue;
    const key = line.slice(0, colon).trim();
    const value = line
      .slice(colon + 1)
      .trim()
      .replace(/^[{'"\s]+|[}'"\s]+$/g, '');
    if (key) meta[key] = value;
  }
  return { meta, body: match[2] };
}

function parseDate(value: string | undefined): Date | null {
  const iso = value?.match(/\d{4}-\d{2}-\d{2}/)?.[0];
  if (!iso) return null;
  const date = new Date(`${iso}T12:00:00Z`);
  return Number.isNaN(date.getTime()) ? null : date;
}

function wordCount(markdown: string): number {
  return markdown.replace(/[#>*_`[\]()!-]/g, ' ').split(/\s+/).filter(Boolean).length;
}

const ACRONYMS = new Set(['AI', 'B2B', 'SKU', 'ROI', 'KPI', 'CEO', 'CFO', 'SOP', 'CRM', 'US', 'USA', 'SMB']);

/** "THE DEEPER TIP" reads as shouting in a heading; show it as "The Deeper Tip". */
function normalizeHeading(text: string): string {
  if (!/[A-Z]/.test(text) || text !== text.toUpperCase()) return text;
  return text
    .toLowerCase()
    .split(' ')
    .map((word) => (ACRONYMS.has(word.toUpperCase()) ? word.toUpperCase() : word.charAt(0).toUpperCase() + word.slice(1)))
    .join(' ');
}

/**
 * The page title is the only H1. Pipeline posts sometimes use "# Section" in the
 * body, so body H1s render as H2s and all-caps headings are set in title case.
 */
function normalizeRendered<T extends { html: string; metadata?: { headings?: { depth: number; text: string }[] } }>(
  rendered: T,
): T {
  rendered.html = rendered.html
    .replace(/<h1(\s|>)/g, '<h2$1')
    .replace(/<\/h1>/g, '</h2>')
    .replace(/<h([23])([^>]*)>([^<]+)<\/h\1>/g, (_m, level, attrs, text) => `<h${level}${attrs}>${normalizeHeading(text)}</h${level}>`);
  if (rendered.metadata?.headings) {
    rendered.metadata.headings = rendered.metadata.headings.map((h) => ({
      ...h,
      depth: h.depth === 1 ? 2 : h.depth,
      text: normalizeHeading(h.text),
    }));
  }
  return rendered;
}

function diprivaBlogLoader(): Loader {
  return {
    name: 'dipriva-blog-loader',
    load: async ({ store, parseData, renderMarkdown, generateDigest, config, logger }) => {
      const dir = path.resolve(fileURLToPath(config.root), '..', 'content', 'blog');
      const files = (await fs.readdir(dir)).filter((f) => f.endsWith('.md') && !f.startsWith('.'));
      store.clear();
      for (const file of files) {
        const raw = await fs.readFile(path.join(dir, file), 'utf8');
        const { meta, body } = parseFrontmatter(raw);
        const slug = meta.slug || file.replace(/\.md$/, '');
        if (meta.published !== 'true' || !slug || !meta.title) {
          logger.info(`skipped ${file} (unpublished or incomplete)`);
          continue;
        }
        const data = await parseData({
          id: slug,
          data: {
            title: meta.title,
            slug,
            description: meta.description ?? '',
            cluster: meta.cluster || 'Insights',
            keyword: meta.keyword ?? '',
            author: meta.author || 'Manuel Diprés',
            date: parseDate(meta.date),
            words: wordCount(body),
          },
        });
        store.set({
          id: slug,
          data,
          body,
          rendered: normalizeRendered(await renderMarkdown(body)),
          digest: generateDigest(raw),
        });
      }
    },
  };
}

const blog = defineCollection({
  loader: diprivaBlogLoader(),
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    description: z.string(),
    cluster: z.string(),
    keyword: z.string(),
    author: z.string(),
    date: z.date().nullable(),
    words: z.number(),
  }),
});

export const collections = { blog };
