import { defineCollection } from 'astro:content';
import type { Loader } from 'astro/loaders';
import { z } from 'astro/zod';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { parse as parseYaml } from 'yaml';
import { slashInternalLinks } from './lib/internalLinks.mjs';

/**
 * Blog posts are Markdown files written in Claude Code sessions and merged to main:
 *   content/blog/<slug>.md      English  (collection "blog")
 *   content/blog/es/<slug>.md   Spanish  (collection "blogEs", lang: es, translationOf: <English slug>)
 *
 * Frontmatter is parsed as YAML and validated by the schema below. Malformed YAML, an
 * unknown key, a bad date or a field of the wrong type stops the build with the file name.
 * Posts with `published: false` are skipped.
 */
const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;

/** YAML turns an unquoted 2026-09-03 into a Date and a quoted one into a string; accept both, store the string. */
const isoDate = z
  .union([z.string(), z.date()])
  .transform((v) => (v instanceof Date ? v.toISOString().slice(0, 10) : v))
  .pipe(z.string().regex(ISO_DATE, 'expected a date as YYYY-MM-DD'))
  .refine((v) => !Number.isNaN(new Date(`${v}T12:00:00Z`).getTime()), 'not a real calendar date');

/** Post dates reach templates as Dates (noon UTC, so formatting in any US time zone keeps the day). */
const isoDateAsDate = isoDate.transform((v) => new Date(`${v}T12:00:00Z`));

const source = z
  .object({
    url: z.url().refine((u) => u.startsWith('https://'), 'source links must be https'),
    publisher: z.string().min(1),
    title: z.string().min(1),
    published: isoDate,
    retrieved: isoDate,
    /** The exact sentence found on the cited page. Required by the blog gate for every new post. */
    quote: z.string().min(1).optional(),
    /** Figures in the post that this source supports, written as they appear in the post. */
    figures: z.array(z.string().min(1)).optional(),
  })
  .strict()
  .refine((s) => s.published <= s.retrieved, { message: 'published must not be later than retrieved', path: ['published'] });

const postSchema = z
  .object({
    title: z.string().min(1),
    slug: z.string().regex(/^[a-z0-9]+(-[a-z0-9]+)*$/, 'slug must be lowercase words joined by hyphens'),
    date: isoDateAsDate,
    published: z.boolean(),
    description: z.string().min(1),
    cluster: z.string().min(1),
    keyword: z.string().min(1),
    author: z.string().min(1).default('Manuel Diprés'),
    /** Title tag. 60 characters at most; the page title is used when absent. */
    seoTitle: z.string().min(1).max(60).optional(),
    /** Last substantive edit. Becomes dateModified. */
    updated: isoDateAsDate.optional(),
    /** Three self-contained sentences that stand on their own when quoted. */
    takeaways: z.array(z.string().min(1)).length(3).optional(),
    faq: z.array(z.object({ q: z.string().min(1), a: z.string().min(1) }).strict()).min(1).optional(),
    sources: z.array(source).optional(),
    /** Figures that are scenario numbers the author made up, not outside facts. The post must say so in the text. */
    illustrative: z.array(z.string().min(1)).optional(),
    lang: z.enum(['en', 'es']).default('en'),
    /** Spanish posts only: the slug of the English post this one translates. */
    translationOf: z
      .string()
      .regex(/^[a-z0-9]+(-[a-z0-9]+)*$/)
      .optional(),
    words: z.number(),
  })
  .strict()
  .superRefine((d, ctx) => {
    if (d.lang === 'es' && !d.translationOf) ctx.addIssue({ code: 'custom', path: ['translationOf'], message: 'Spanish posts need translationOf' });
    if (d.lang === 'en' && d.translationOf) ctx.addIssue({ code: 'custom', path: ['translationOf'], message: 'translationOf is for Spanish posts only' });
    if (d.updated && d.updated < d.date) ctx.addIssue({ code: 'custom', path: ['updated'], message: 'updated must not be earlier than date' });
  });

function splitFrontmatter(raw: string, file: string): { meta: unknown; body: string } {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!match) throw new Error(`${file}: missing frontmatter block`);
  let meta: unknown;
  try {
    meta = parseYaml(match[1]);
  } catch (e) {
    throw new Error(`${file}: malformed frontmatter (${(e as Error).message.split('\n')[0]})`);
  }
  if (!meta || typeof meta !== 'object' || Array.isArray(meta)) throw new Error(`${file}: frontmatter must be a YAML mapping`);
  return { meta, body: match[2] };
}

function wordCount(markdown: string): number {
  return markdown.replace(/[#>*_`[\]()!-]/g, ' ').split(/\s+/).filter(Boolean).length;
}

function diprivaBlogLoader(sub: string, lang: 'en' | 'es'): Loader {
  return {
    name: `dipriva-blog-loader-${lang}`,
    load: async ({ store, parseData, renderMarkdown, generateDigest, config, logger }) => {
      const dir = path.resolve(fileURLToPath(config.root), '..', 'content', 'blog', sub);
      const files = (await fs.readdir(dir).catch(() => [] as string[])).filter((f) => f.endsWith('.md') && !f.startsWith('.'));
      store.clear();
      for (const file of files) {
        const label = path.posix.join('content/blog', sub, file);
        const raw = await fs.readFile(path.join(dir, file), 'utf8');
        const { meta, body } = splitFrontmatter(raw, label);
        const data = await parseData({ id: file.replace(/\.md$/, ''), data: { ...(meta as object), words: wordCount(body) } }).catch((e: Error) => {
          throw new Error(`${label}: invalid frontmatter\n${e.message}`);
        });
        const d = data as z.infer<typeof postSchema>;
        if (!d.published) {
          logger.info(`skipped ${label} (published: false)`);
          continue;
        }
        if (d.slug !== file.replace(/\.md$/, '')) throw new Error(`${label}: slug "${d.slug}" must match the file name`);
        if (d.lang !== lang) throw new Error(`${label}: lang is "${d.lang}" but this folder holds ${lang} posts`);
        store.set({
          id: d.slug,
          data,
          body,
          // Internal links without a trailing slash are rewritten to the slash form.
          rendered: await renderMarkdown(body).then((r) => ({ ...r, html: slashInternalLinks(r.html) })),
          digest: generateDigest(raw),
        });
      }
    },
  };
}

const blog = defineCollection({ loader: diprivaBlogLoader('', 'en'), schema: postSchema });
const blogEs = defineCollection({ loader: diprivaBlogLoader('es', 'es'), schema: postSchema });

export const collections = { blog, blogEs };
