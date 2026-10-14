/**
 * Internal links in blog Markdown end in a slash, the one URL form this site uses
 * (trailingSlash: 'always'): `/strategy` becomes `/strategy/` and
 * `https://www.dipriva.com/strategy` becomes `https://www.dipriva.com/strategy/`.
 *
 * Left alone: links that already end in a slash, links to a file (the last path segment has an
 * extension, such as /llms.txt or a PDF), hash-only and mailto links, and links to other sites.
 * Query strings and hashes are kept.
 */
const INTERNAL = /^(https?:\/\/(?:www\.)?dipriva\.com)?(\/(?!\/)[^?#]*)([?#].*)?$/i;

export function withTrailingSlash(href) {
  if (typeof href !== 'string') return href;
  const m = href.match(INTERNAL);
  if (!m) return href;
  const [, origin = '', pathname, rest = ''] = m;
  if (pathname.endsWith('/')) return href;
  const last = pathname.split('/').pop() ?? '';
  if (/\.[a-z0-9]{1,8}$/i.test(last)) return href;
  return `${origin}${pathname}/${rest}`;
}

/** Apply the rule to every <a href="..."> in rendered HTML. */
export function slashInternalLinks(html) {
  return html.replace(/(<a\s[^>]*?\bhref=")([^"]*)(")/g, (_m, open, href, close) => `${open}${withTrailingSlash(href)}${close}`);
}
