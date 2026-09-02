import { marked } from 'marked';

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string | null;       // ISO YYYY-MM-DD or null when unparseable
  formattedDate: string;     // e.g. "September 2, 2026"
  cluster: string;
  author: string;
  published: boolean;
  html: string;
}

// Simple line-by-line frontmatter parser that tolerates the known malformed
// date format produced by the upstream automation: `date: "{{"2026-09-02"}}"`
function parseFrontmatter(raw: string): {
  data: Record<string, string | boolean>;
  content: string;
} {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!match) return { data: {}, content: raw };

  const fmStr = match[1];
  const content = match[2] ?? '';
  const data: Record<string, string | boolean> = {};

  for (const line of fmStr.split(/\r?\n/)) {
    const colonIdx = line.indexOf(':');
    if (colonIdx === -1) continue;
    const key = line.slice(0, colonIdx).trim();
    if (!key) continue;
    let value = line.slice(colonIdx + 1).trim();
    // Strip surrounding YAML quotes (single or double)
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    if (value === 'true') data[key] = true;
    else if (value === 'false') data[key] = false;
    else data[key] = value;
  }

  return { data, content };
}

// Extracts a clean YYYY-MM-DD date from potentially malformed automation output.
// Handles both `"2026-09-02"` (clean) and `{{"2026-09-02"}}` (broken).
function extractIsoDate(raw: string | boolean | undefined): string | null {
  if (!raw || typeof raw !== 'string') return null;
  const cleaned = raw.replace(/[{}"]/g, '').trim();
  return /^\d{4}-\d{2}-\d{2}$/.test(cleaned) ? cleaned : null;
}

function formatDate(iso: string | null): string {
  if (!iso) return '';
  const [y, m, d] = iso.split('-').map(Number);
  return new Date(y, m - 1, d).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

// Load all markdown files as raw strings at build time via Vite's glob import.
// The path is relative to this file (client/src/lib/blog.ts), so three levels
// up reaches the repo root, then into content/blog/.
const rawFiles = import.meta.glob('../../../content/blog/*.md', {
  eager: true,
  query: '?raw',
  import: 'default',
}) as Record<string, string>;

function buildPost(_filePath: string, raw: string): BlogPost | null {
  const { data, content } = parseFrontmatter(raw);
  const slug = typeof data.slug === 'string' ? data.slug.trim() : '';
  const title = typeof data.title === 'string' ? data.title.trim() : '';
  if (!slug || !title) return null;

  const date = extractIsoDate(data.date as string | undefined);
  return {
    slug,
    title,
    description: typeof data.description === 'string' ? data.description : '',
    date,
    formattedDate: formatDate(date),
    cluster: typeof data.cluster === 'string' ? data.cluster : '',
    author: typeof data.author === 'string' ? data.author : '',
    published: data.published === true,
    html: marked(content, { async: false }),
  };
}

const allPosts: BlogPost[] = Object.entries(rawFiles)
  .map(([path, raw]) => buildPost(path, raw))
  .filter((p): p is BlogPost => p !== null);

// Published posts sorted newest-first; unparseable dates sort to the end.
export const publishedPosts: BlogPost[] = [...allPosts]
  .filter(p => p.published)
  .sort((a, b) => {
    if (!a.date && !b.date) return 0;
    if (!a.date) return 1;
    if (!b.date) return -1;
    return b.date.localeCompare(a.date);
  });

// Returns any post (including unpublished) for the slug; callers must check
// `post.published` and 404 accordingly.
export function getPostBySlug(slug: string): BlogPost | undefined {
  return allPosts.find(p => p.slug === slug);
}
