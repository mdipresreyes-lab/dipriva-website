/**
 * Two-step download form. Step 1 collects the needs, step 2 the contact
 * details and the Turnstile token. The request body matches the dipriva-leads
 * Worker contract field for field. With no endpoint (QA builds without a QA
 * Worker) the form validates and shows the success state without sending.
 */

declare global {
  interface Window {
    turnstile?: {
      render: (el: HTMLElement, opts: Record<string, unknown>) => string;
      reset: (id?: string) => void;
      remove: (id?: string) => void;
    };
    gtag?: (...args: unknown[]) => void;
  }
}

const TURNSTILE_SRC = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';
const EMAIL = /^[^\s@]{1,64}@[^\s@]{1,255}\.[^\s@]{2,}$/;

interface FileLink {
  label: string;
  href: string;
  otherLabel: string;
  otherHref: string;
}

interface Messages {
  pickOne: string;
  required: string;
  spam: string;
  failed: string;
  sending: string;
  submit: string;
}

function readSource(): string {
  const params = new URLSearchParams(window.location.search);
  return (params.get('utm_source') ?? params.get('src') ?? '')
    .toLowerCase()
    .replace(/[^a-z0-9_\-.]/g, '')
    .slice(0, 60);
}

function loadTurnstile(): Promise<void> {
  if (window.turnstile) return Promise.resolve();
  return new Promise((resolve, reject) => {
    let script = document.querySelector<HTMLScriptElement>(`script[src="${TURNSTILE_SRC}"]`);
    if (!script) {
      script = document.createElement('script');
      script.src = TURNSTILE_SRC;
      script.async = true;
      document.head.appendChild(script);
    }
    script.addEventListener('load', () => resolve());
    script.addEventListener('error', () => reject(new Error('turnstile')));
  });
}

function link(href: string, label: string, className: string): HTMLAnchorElement {
  const a = document.createElement('a');
  a.href = href;
  a.textContent = label;
  a.className = className;
  a.setAttribute('download', '');
  return a;
}

function init(root: HTMLElement) {
  const form = root.querySelector('form')!;
  const step1 = form.querySelector<HTMLFieldSetElement>('[data-step="1"]')!;
  const step2 = form.querySelector<HTMLFieldSetElement>('[data-step="2"]')!;
  const done = root.querySelector<HTMLElement>('[data-done]')!;
  const otherToggle = form.querySelector<HTMLInputElement>('[data-other-toggle]')!;
  const otherWrap = form.querySelector<HTMLElement>('[data-other-wrap]')!;
  const otherInput = otherWrap.querySelector<HTMLInputElement>('input')!;
  const otherCount = form.querySelector<HTMLElement>('[data-other-count]')!;
  const widgetEl = form.querySelector<HTMLElement>('[data-turnstile]')!;
  const submitBtn = form.querySelector<HTMLButtonElement>('[data-submit]')!;

  const magnet = root.dataset.magnet!;
  const language = root.dataset.lang as 'en' | 'es';
  const endpoint = root.dataset.endpoint ?? '';
  const sitekey = root.dataset.sitekey!;
  const files = JSON.parse(root.dataset.files!) as FileLink[];
  const t = JSON.parse(root.dataset.messages!) as Messages;

  let token = '';
  let widgetId: string | null = null;

  const setError = (fieldset: HTMLElement, message: string) => {
    const el = fieldset.querySelector<HTMLElement>('[data-error]');
    if (el) el.textContent = message;
  };

  const needs = () =>
    [...form.querySelectorAll<HTMLInputElement>('input[name="needs"]:checked')].map((input) => input.value);

  const otherText = () => (otherToggle.checked ? otherInput.value.trim() : '');

  otherToggle.addEventListener('change', () => {
    otherWrap.hidden = !otherToggle.checked;
    if (otherToggle.checked) otherInput.focus();
    setError(step1, '');
  });
  otherInput.addEventListener('input', () => {
    otherCount.textContent = String(otherInput.value.length);
    setError(step1, '');
  });
  step1.addEventListener('change', () => setError(step1, ''));
  step2.addEventListener('input', () => setError(step2, ''));

  const renderWidget = async () => {
    if (widgetId) return;
    try {
      await loadTurnstile();
    } catch {
      setError(step2, t.spam);
      return;
    }
    if (!window.turnstile || widgetId) return;
    widgetId = window.turnstile.render(widgetEl, {
      sitekey,
      language,
      theme: document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light',
      callback: (value: string) => {
        token = value;
        setError(step2, '');
      },
      'expired-callback': () => (token = ''),
      'error-callback': () => (token = ''),
    });
  };

  const showStep = (n: 1 | 2) => {
    step1.hidden = n !== 1;
    step2.hidden = n !== 2;
    root.dataset.step = String(n);
    const focusTarget = n === 1 ? step1.querySelector<HTMLElement>('input') : step2.querySelector<HTMLElement>('input');
    focusTarget?.focus({ preventScroll: true });
    if (n === 2) void renderWidget();
  };

  form.querySelector('[data-next]')!.addEventListener('click', () => {
    if (needs().length === 0 && otherText() === '') {
      setError(step1, t.pickOne);
      return;
    }
    setError(step1, '');
    showStep(2);
  });

  form.querySelector('[data-back]')!.addEventListener('click', () => {
    setError(step2, '');
    showStep(1);
  });

  const showDone = (dryRun: boolean) => {
    form.hidden = true;
    const primary = done.querySelector<HTMLElement>('[data-done-files]')!;
    const otherLinks = done.querySelector<HTMLElement>('[data-done-other]')!;
    files.forEach((file, i) => {
      primary.append(link(file.href, file.label, i === 0 ? 'btn btn-primary' : 'btn btn-ghost'));
      if (i > 0) otherLinks.append(', ');
      otherLinks.append(link(file.otherHref, file.otherLabel, 'underline underline-offset-2 hover:text-ink'));
    });
    if (dryRun) done.querySelector<HTMLElement>('[data-dry-run]')?.removeAttribute('hidden');
    done.hidden = false;
    const still = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    root.closest('section')?.scrollIntoView({ block: 'start', behavior: still ? 'auto' : 'smooth' });
    done.focus({ preventScroll: true });
    if (widgetId && window.turnstile) window.turnstile.remove(widgetId);
  };

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const data = new FormData(form);
    const value = (key: string) => String(data.get(key) ?? '').trim();
    const name = value('name');
    const email = value('email');
    const business = value('business');

    if (name.length < 2 || !EMAIL.test(email) || business.length < 2) {
      setError(step2, t.required);
      return;
    }
    if (!token) {
      setError(step2, t.spam);
      return;
    }
    setError(step2, '');

    if (!endpoint) {
      showDone(true);
      return;
    }

    submitBtn.disabled = true;
    submitBtn.textContent = t.sending;
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          magnet,
          language,
          name,
          email,
          business,
          size: value('size'),
          needs: needs(),
          otherText: otherText(),
          insightsOptin: data.get('insightsOptin') === 'on',
          source: readSource(),
          website: String(data.get('website') ?? ''),
          turnstileToken: token,
        }),
      });
      const result = (await response.json().catch(() => ({}))) as { ok?: boolean; error?: string };
      if (response.ok && result.ok) {
        window.gtag?.('event', 'generate_lead', { magnet, language });
        showDone(false);
        return;
      }
      setError(
        step2,
        result.error === 'spam_check_failed' ? t.spam : result.error === 'invalid' ? t.required : t.failed,
      );
      if (widgetId) window.turnstile?.reset(widgetId);
      token = '';
    } catch {
      setError(step2, t.failed);
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = t.submit;
    }
  });
}

export function initLeadForms() {
  document.querySelectorAll<HTMLElement>('[data-lead-form]').forEach(init);
}
