import { getCollection, type CollectionEntry } from 'astro:content';
import type { Lang } from './copy';

/** English posts live in the "blog" collection, Spanish posts in "blogEs" (content/blog/es/). */
export type Post = CollectionEntry<'blog'> | CollectionEntry<'blogEs'>;

export const blogIndexPath = (lang: Lang) => (lang === 'es' ? '/es/blog/' : '/blog/');
export const postPath = (lang: Lang, slug: string) => `${blogIndexPath(lang)}${slug}/`;

const newestFirst = (a: Post, z: Post) => z.data.date.getTime() - a.data.date.getTime();

export async function getPosts(lang: Lang): Promise<Post[]> {
  const posts: Post[] = lang === 'es' ? await getCollection('blogEs') : await getCollection('blog');
  return posts.sort(newestFirst);
}

/**
 * The same post in the other language. A Spanish post names its English original in
 * translationOf; an English post is found by the Spanish post that points at it.
 */
export async function counterpartOf(post: Post): Promise<Post | undefined> {
  if (post.data.lang === 'es') return (await getCollection('blog')).find((p) => p.id === post.data.translationOf);
  return (await getCollection('blogEs')).find((p) => p.data.translationOf === post.id);
}

/**
 * Topic labels. Posts in both languages carry the same `cluster` key (English), so topics group
 * across languages and each page shows the label in its own language.
 */
const clusterLabels: Record<Lang, Record<string, string>> = {
  en: {},
  es: {
    'Corporate Strategy': 'Estrategia corporativa',
    'Startup Operations': 'Operaciones de startups',
    'AI and Automation': 'IA y automatización',
  },
};
export const clusterLabel = (lang: Lang, cluster: string) => clusterLabels[lang][cluster] ?? cluster;

/** ISO date (YYYY-MM-DD) of a post date. */
export const isoDay = (date: Date) => date.toISOString().slice(0, 10);
