/**
 * Site-wide behavior. Every feature is an enhancement: the page is complete and
 * readable before this runs, and nothing here blocks first paint.
 */
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

// Theme toggle. The saved choice is applied before paint by the inline head script.
document.getElementById('theme-toggle')?.addEventListener('click', () => {
  const root = document.documentElement;
  const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  const apply = () => {
    root.setAttribute('data-theme', next);
    try {
      localStorage.setItem('dipriva-theme', next);
    } catch {
      /* storage can be blocked; the toggle still works for this page view */
    }
  };
  const doc = document as Document & { startViewTransition?: (cb: () => void) => unknown };
  if (doc.startViewTransition && !reduceMotion) doc.startViewTransition(apply);
  else apply();
});

// Reveal sections as they enter the viewport.
const revealables = document.querySelectorAll<HTMLElement>('.reveal');
if ('IntersectionObserver' in window && !reduceMotion) {
  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      }
    },
    { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
  );
  revealables.forEach((el) => io.observe(el));
} else {
  revealables.forEach((el) => el.classList.add('in'));
}

// Cursor spotlight on cards, for mouse and trackpad users only.
if (finePointer) {
  document.querySelectorAll<HTMLElement>('.spotlight').forEach((card) => {
    let frame = 0;
    card.addEventListener('pointermove', (event) => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        const rect = card.getBoundingClientRect();
        card.style.setProperty('--mx', `${event.clientX - rect.left}px`);
        card.style.setProperty('--my', `${event.clientY - rect.top}px`);
        frame = 0;
      });
    });
  });
}

// Count-up figures. The final value is already in the HTML for crawlers and
// for visitors without JavaScript; this only animates toward it.
const counters = document.querySelectorAll<HTMLElement>('[data-countup]');
if (counters.length && 'IntersectionObserver' in window && !reduceMotion) {
  const format = (value: number, el: HTMLElement) =>
    `${el.dataset.prefix ?? ''}${Math.round(value).toLocaleString('en-US')}${el.dataset.suffix ?? ''}`;
  const run = (el: HTMLElement) => {
    const to = Number(el.dataset.to);
    const start = performance.now();
    const duration = 1400;
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = format(to * eased, el);
      if (p < 1) requestAnimationFrame(tick);
    };
    el.textContent = format(0, el);
    requestAnimationFrame(tick);
  };
  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          run(entry.target as HTMLElement);
          io.unobserve(entry.target);
        }
      }
    },
    { threshold: 0.6 },
  );
  counters.forEach((el) => io.observe(el));
}

// Close the mobile menu after following an in-page link.
const mobileNav = document.getElementById('mobile-nav') as (HTMLElement & { hidePopover?: () => void }) | null;
mobileNav?.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => mobileNav.hidePopover?.()));

// Lea, the AI assistant. The greeting renders locally with no API call; it is
// sent as the first assistant turn once the visitor writes, so Lea has it as
// context. Production posts to the dipriva-chat Worker; QA shows a fixed notice.
const panel = document.getElementById('lea-panel');
const form = panel?.querySelector<HTMLFormElement>('.lea-form');
const log = panel?.querySelector<HTMLElement>('.lea-log');
const input = panel?.querySelector<HTMLTextAreaElement>('#lea-input');
type Turn = { role: 'user' | 'assistant'; content: string };
let history: Turn[] = [];
let sending = false;

const bubble = (content: string, mine: boolean) => {
  const p = document.createElement('p');
  p.className = mine
    ? 'ml-auto max-w-[85%] whitespace-pre-wrap rounded-2xl rounded-tr-sm bg-brand px-4 py-3 text-sm leading-relaxed text-on-brand'
    : 'max-w-[85%] whitespace-pre-wrap rounded-2xl rounded-tl-sm bg-surface px-4 py-3 text-sm leading-relaxed';
  p.textContent = content;
  log?.append(p);
  if (log) log.scrollTop = log.scrollHeight;
  return p;
};

form?.addEventListener('submit', async (event) => {
  event.preventDefault();
  const text = input?.value.trim();
  if (!text || !log || !panel || sending) return;
  const d = panel.dataset;
  if (history.length === 0) history = [{ role: 'assistant', content: d.greeting ?? '' }];
  history.push({ role: 'user', content: text });
  bubble(text, true);
  if (input) input.value = '';

  if (!d.endpoint) {
    window.setTimeout(() => bubble(d.reply ?? '', false), 650);
    return;
  }

  sending = true;
  const typing = bubble(`${d.thinking ?? ''}...`, false);
  typing.classList.add('text-muted');
  let reply = d.fallback ?? '';
  try {
    const response = await fetch(d.endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages: history }),
    });
    const data = (await response.json()) as { reply?: string };
    if (data.reply) reply = data.reply;
  } catch {
    /* network or Worker failure: show the email fallback */
  }
  typing.remove();
  history.push({ role: 'assistant', content: reply });
  bubble(reply, false);
  sending = false;
});
input?.addEventListener('keydown', (event) => {
  if (event.key === 'Enter' && !event.shiftKey) {
    event.preventDefault();
    form?.requestSubmit();
  }
});

// Language switch keeps the visitor's place. Home sections share the same ids in
// both languages, so the link gets the id of the section in view. Other pages
// have the same sections in the same order in both languages, so the next page
// scrolls to the same section and the same distance into it. Posts, whose
// headings differ, fall back to the same relative position.
const SCROLL_KEY = 'dipriva-lang-scroll';
const isHome = /^\/(es\/)?$/.test(location.pathname);
const OFFSET = 100;
const pageSections = () => Array.from(document.querySelectorAll<HTMLElement>('main section'));

function sectionInView(): string | null {
  const current = Array.from(document.querySelectorAll<HTMLElement>('main section[id]')).filter(
    (el) => el.getBoundingClientRect().top <= 140,
  );
  return window.scrollY < 200 ? null : (current.at(-1)?.id ?? null);
}

document.querySelectorAll<HTMLAnchorElement>('a[hreflang]').forEach((a) =>
  a.addEventListener('click', () => {
    const gtag = (window as unknown as { gtag?: (...args: unknown[]) => void }).gtag;
    gtag?.('event', 'language_toggle', {
      language: a.hreflang,
      previous_language: document.documentElement.lang,
    });
    const url = new URL(a.href, location.href);
    const id = isHome ? sectionInView() : null;
    if (id) {
      url.hash = id;
      a.href = url.toString();
      return;
    }
    if (window.scrollY < 120) return;
    const sections = pageSections();
    let index = -1;
    sections.forEach((el, i) => {
      if (el.getBoundingClientRect().top <= OFFSET) index = i;
    });
    const rect = index >= 0 ? sections[index].getBoundingClientRect() : null;
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const saved = {
      to: url.pathname,
      at: Date.now(),
      count: sections.length,
      index,
      frac: rect ? Math.min(1, Math.max(0, (OFFSET - rect.top) / Math.max(rect.height, 1))) : 0,
      ratio: max > 0 ? window.scrollY / max : 0,
    };
    try {
      sessionStorage.setItem(SCROLL_KEY, JSON.stringify(saved));
    } catch {
      /* storage blocked: the switch still works, it just starts at the top */
    }
  }),
);

try {
  const saved = JSON.parse(sessionStorage.getItem(SCROLL_KEY) ?? 'null') as {
    to: string;
    at: number;
    count: number;
    index: number;
    frac: number;
    ratio: number;
  } | null;
  sessionStorage.removeItem(SCROLL_KEY);
  if (saved && saved.to === location.pathname && Date.now() - saved.at < 15000 && !location.hash) {
    const restore = () => {
      const sections = pageSections();
      let top: number;
      if (saved.index >= 0 && sections.length === saved.count && saved.count >= 3) {
        const el = sections[saved.index];
        top = el.getBoundingClientRect().top + window.scrollY + saved.frac * el.offsetHeight - OFFSET;
      } else {
        top = saved.ratio * (document.documentElement.scrollHeight - window.innerHeight);
      }
      window.scrollTo({ top: Math.max(0, Math.round(top)), behavior: 'instant' });
    };
    if (document.readyState === 'complete') restore();
    else window.addEventListener('load', restore, { once: true });
  }
} catch {
  /* nothing saved, or storage blocked */
}
