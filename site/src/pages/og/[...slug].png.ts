import type { APIRoute, GetStaticPaths } from 'astro';
import { clusterLabel, getPosts } from '../../lib/blog';
import { renderOgImage } from '../../lib/ogImage';

/** One 1200 x 630 PNG per post: /og/<slug>.png for English, /og/es/<slug>.png for Spanish. */
export const getStaticPaths: GetStaticPaths = async () => {
  const [en, es] = await Promise.all([getPosts('en'), getPosts('es')]);
  return [
    ...en.map((p) => ({ params: { slug: p.id }, props: { title: p.data.title, label: clusterLabel('en', p.data.cluster), section: 'Insights' } })),
    ...es.map((p) => ({ params: { slug: `es/${p.id}` }, props: { title: p.data.title, label: clusterLabel('es', p.data.cluster), section: 'Análisis' } })),
  ];
};

export const GET: APIRoute = async ({ props }) => {
  const png = await renderOgImage(props as { title: string; label: string; section: string });
  return new Response(new Uint8Array(png), { headers: { 'Content-Type': 'image/png' } });
};
