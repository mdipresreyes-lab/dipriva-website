// Fails the build when an active client in src/lib/clients.ts has a url that is
// not https or a logo file missing from public/. Runs before the Astro build.
// clients.ts is imported with Node's built-in type stripping (Node 22.18+).
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const site = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const { clients } = await import(pathToFileURL(path.join(site, 'src', 'lib', 'clients.ts')).href);

const failures = [];
const slugs = new Set();
for (const c of clients) {
  if (slugs.has(c.slug)) failures.push(`${c.slug}: duplicate slug`);
  slugs.add(c.slug);
  if (!c.active) continue;
  let url;
  try {
    url = new URL(c.url);
  } catch {
    failures.push(`${c.slug}: url "${c.url}" does not parse`);
  }
  if (url && url.protocol !== 'https:') failures.push(`${c.slug}: url "${c.url}" is not https`);
  if (url && [...url.searchParams.keys()].some((k) => k.toLowerCase().startsWith('utm_'))) {
    failures.push(`${c.slug}: url "${c.url}" carries UTM parameters`);
  }
  const file = path.join(site, 'public', c.logo.replace(/^\//, ''));
  if (!c.logo.startsWith('/') || !fs.existsSync(file)) failures.push(`${c.slug}: logo ${c.logo} not found in public/`);
  if (!(typeof c.sizeScale === 'number' && c.sizeScale > 0)) failures.push(`${c.slug}: sizeScale must be a positive number`);
}

if (failures.length) {
  console.error('Client logo check failed:');
  for (const f of failures) console.error(`  ${f}`);
  process.exit(1);
}
console.log(`Client logo check passed (${clients.filter((c) => c.active).length} active).`);
