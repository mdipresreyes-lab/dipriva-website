// Fails the build when the lead form definition drifts from the copies the
// dipriva-leads Worker validates against. The Worker reads
// dipriva-social/config/lead-form.json; this site ships src/lib/leadForm.json.
// A mismatch means the form can offer options the Worker rejects.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const site = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const ours = path.join(site, 'src', 'lib', 'leadForm.json');
const copies = [
  // The live React site's copy, while it remains in this repository.
  path.join(site, '..', 'client', 'src', 'lib', 'leadForm.json'),
  // The source of truth, when dipriva-social is checked out next to this repo.
  path.join(site, '..', '..', 'dipriva-social', 'config', 'lead-form.json'),
];

const failures = [];
const bytes = fs.readFileSync(ours);
let compared = 0;
for (const file of copies) {
  if (!fs.existsSync(file)) continue;
  compared++;
  if (!bytes.equals(fs.readFileSync(file))) {
    failures.push(`${path.relative(site, ours)} differs from ${path.relative(site, file)}`);
  }
}

// Every magnet's page must exist in magnets.ts with the same English path.
const form = JSON.parse(bytes.toString('utf8'));
const magnetsTs = fs.readFileSync(path.join(site, 'src', 'lib', 'magnets.ts'), 'utf8');
for (const [id, magnet] of Object.entries(form.magnets)) {
  const expected = `path: '${magnet.page}/'`;
  if (!magnetsTs.includes(expected)) failures.push(`magnet "${id}": magnets.ts has no ${expected}`);
}

if (failures.length) {
  console.error('Lead form check failed:');
  for (const f of failures) console.error(`  ${f}`);
  process.exit(1);
}
console.log(
  `Lead form check: ${Object.keys(form.magnets).length} magnets match` +
    (compared ? `, byte-identical to ${compared} other cop${compared === 1 ? 'y' : 'ies'}.` : '; no other copy found to compare.'),
);
