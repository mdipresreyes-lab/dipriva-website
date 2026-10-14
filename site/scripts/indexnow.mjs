// Tells Bing and the other IndexNow search engines which pages exist, so new and
// changed pages are found within minutes instead of days (https://www.indexnow.org).
// Google does not use IndexNow; it relies on the sitemap and Search Console.
//
//   node scripts/indexnow.mjs            submit every indexable page from dist/
//   node scripts/indexnow.mjs --dry-run  print what would be sent
//
// The key is a public value by design: it is the name and content of one text
// file at the site root, which the engines fetch to confirm that we own the site.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const dist = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', 'dist');
const HOST = 'www.dipriva.com';
const dry = process.argv.includes('--dry-run');

const keyFile = fs.readdirSync(dist).find((f) => /^[a-f0-9]{32}\.txt$/.test(f));
if (!keyFile) {
  console.error('No IndexNow key file (32 hex characters .txt) found in dist/.');
  process.exit(1);
}
const key = keyFile.replace(/\.txt$/, '');
if (fs.readFileSync(path.join(dist, keyFile), 'utf8').trim() !== key) {
  console.error('The key file content does not match its name.');
  process.exit(1);
}

// Every URL in the sitemap. Pages kept out of search (intake forms, unsubscribe) are not in it.
const urls = new Set();
for (const f of fs.readdirSync(dist).filter((n) => /^sitemap-\d+\.xml$/.test(n))) {
  for (const m of fs.readFileSync(path.join(dist, f), 'utf8').matchAll(/<loc>([^<]+)<\/loc>/g)) urls.add(m[1]);
}
const urlList = [...urls].filter((u) => new URL(u).host === HOST).sort();
if (urlList.length === 0) {
  console.error('No URLs found in the sitemap.');
  process.exit(1);
}

const body = { host: HOST, key, keyLocation: `https://${HOST}/${keyFile}`, urlList };
console.log(`IndexNow: ${urlList.length} URLs for ${HOST}, key file ${keyFile}`);
if (dry) {
  console.log(urlList.slice(0, 5).join('\n') + '\n...');
  process.exit(0);
}

const res = await fetch('https://api.indexnow.org/indexnow', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
  body: JSON.stringify(body),
});
console.log(`IndexNow response: HTTP ${res.status} ${res.statusText}`);
// 200 and 202 mean accepted. 202 means the key check is still pending, which is normal on the first run.
process.exit([200, 202].includes(res.status) ? 0 : 1);
