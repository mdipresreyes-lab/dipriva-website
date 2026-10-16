// Screenshots and browser checks for the client logo block on / and /es/.
//
// Usage: node check-logos.cjs <playwright node_modules dir> <base url> <out dir>
//   e.g. node check-logos.cjs ~/.npm/_npx/<hash>/node_modules http://localhost:4321 /tmp/shots
// Uses the system Chrome (channel "chrome"); no browser download.
//
// Writes <out>/<lang>-<width>-<theme>.png (the hero bottom through the logo block),
// <lang>-forced-colors.png, <lang>-focus.png and report.json, and prints the report:
// console errors, link attributes, accessible names, Tab order with the focus
// outline, forced-colors fill and the client_logo_click payload (gtag stubbed).
const path = require('node:path');
const fs = require('node:fs');
const { chromium } = require(path.join(process.argv[2], 'playwright'));
const BASE = process.argv[3].replace(/\/$/, '');
const OUT = process.argv[4];
fs.mkdirSync(OUT, { recursive: true });

const block = (p) => p.locator('#clients');
async function open(ctx, page) {
  const p = await ctx.newPage();
  const errors = [];
  p.on('console', (m) => m.type() === 'error' && errors.push(m.text()));
  p.on('pageerror', (e) => errors.push(String(e)));
  await p.goto(BASE + page, { waitUntil: 'networkidle' });
  // Decline consent so the banner does not cover the block.
  const reject = p.locator('button', { hasText: /^(Reject|Rechazar)$/ });
  if (await reject.count()) await reject.first().click();
  await p.evaluate(() => document.querySelectorAll('.reveal').forEach((e) => e.classList.add('in')));
  return { p, errors };
}

(async () => {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const report = {};
  for (const page of ['/', '/es/']) {
    const lang = page === '/' ? 'en' : 'es';
    for (const width of [375, 1280]) {
      for (const theme of ['light', 'dark']) {
        const ctx = await browser.newContext({ viewport: { width, height: 900 }, deviceScaleFactor: 2, colorScheme: theme });
        await ctx.addInitScript((t) => localStorage.setItem('dipriva-theme', t), theme);
        const { p, errors } = await open(ctx, page);
        await block(p).scrollIntoViewIfNeeded();
        await p.waitForTimeout(400);
        const bb = await block(p).boundingBox();
        // Include 260px above the block so the screenshot shows where it sits.
        const top = Math.max(0, bb.y - 260);
        await p.screenshot({ path: `${OUT}/${lang}-${width}-${theme}.png`, clip: { x: 0, y: top, width, height: bb.y + bb.height + 60 - top } });
        report[`${lang}-${width}-${theme}`] = { errors };
        await ctx.close();
      }
    }

    const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 }, deviceScaleFactor: 2, forcedColors: 'active' });
    const { p } = await open(ctx, page);
    await block(p).scrollIntoViewIfNeeded();
    await p.waitForTimeout(300);
    await block(p).screenshot({ path: `${OUT}/${lang}-forced-colors.png` });
    report[`${lang}-forced`] = await p.$$eval('.client-logo', (els) => els.map((e) => getComputedStyle(e).backgroundColor));

    // Keyboard: focus a temporary button just before the list, then Tab through it.
    await p.evaluate(() => {
      const b = document.createElement('button');
      b.id = '__start';
      document.querySelector('.client-logos').before(b);
      b.focus();
    });
    const count = await p.locator('.client-logos a').count();
    const order = [];
    for (let i = 0; i < count; i++) {
      await p.keyboard.press('Tab');
      order.push(
        await p.evaluate(() => {
          const a = document.activeElement;
          const cs = getComputedStyle(a);
          return { slug: a.dataset.client, outline: `${cs.outlineStyle} ${cs.outlineWidth}` };
        }),
      );
      if (i === 0) await block(p).screenshot({ path: `${OUT}/${lang}-focus.png` });
    }
    report[`${lang}-keyboard`] = order;
    await p.evaluate(() => document.getElementById('__start').remove());
    report[`${lang}-links`] = await p.$$eval('.client-logos a', (as) =>
      as.map((a) => ({ href: a.getAttribute('href'), target: a.target, rel: a.getAttribute('rel') })),
    );
    report[`${lang}-aria`] = await block(p).ariaSnapshot();
    report[`${lang}-event`] = await p.evaluate(() => {
      const calls = [];
      window.gtag = (...args) => calls.push(args);
      const a = document.querySelector('.client-logos a');
      a.addEventListener('click', (e) => e.preventDefault(), { once: true });
      a.click();
      delete window.gtag;
      return calls;
    });
    await ctx.close();
  }
  fs.writeFileSync(`${OUT}/report.json`, JSON.stringify(report, null, 2));
  console.log(JSON.stringify(report, null, 2));
  await browser.close();
})();
