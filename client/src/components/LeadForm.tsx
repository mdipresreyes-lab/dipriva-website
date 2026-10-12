import { useEffect, useRef, useState } from 'react';
import {
  leadForm,
  LEADS_ENDPOINT,
  TURNSTILE_SITE_KEY,
  TURNSTILE_TEST_KEY,
  type Lang,
  type MagnetPage,
} from '@/lib/leadMagnets';

declare global {
  interface Window {
    turnstile?: {
      render: (el: HTMLElement, opts: Record<string, unknown>) => string;
      reset: (id?: string) => void;
      remove: (id?: string) => void;
    };
  }
}

const TURNSTILE_SRC = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';

const ui = {
  en: {
    step: (n: number) => `Step ${n} of 2`,
    needsHeading: 'What is slowing the business down?',
    otherPlaceholder: 'Tell us in one line',
    next: 'Next',
    back: 'Back',
    pickOne: 'Pick at least one, or tell us in one line.',
    name: 'Name',
    email: 'Email',
    business: 'Business name',
    size: 'Team size (optional)',
    sizeNone: 'Choose one',
    sizeLabels: ['1 to 9', '10 to 50', '51 to 500', '500+'],
    privacy: 'Privacy policy',
    submit: 'Send me the download',
    sending: 'Sending',
    spam: 'The spam check did not pass. Try again.',
    failed: 'We could not send your request. Try again, or email manuel@dipriva.com.',
    required: 'Fill in your name, a valid email and your business name.',
    doneHeading: 'Your download is ready.',
    doneBody: (days: number) => `Manuel reads every request and replies within ${days} business days with one suggestion based on your picks.`,
    otherLang: 'Spanish version',
    schedule: 'Prefer to talk now? Schedule a consultation.',
  },
  es: {
    step: (n: number) => `Paso ${n} de 2`,
    needsHeading: '¿Qué está frenando su negocio?',
    otherPlaceholder: 'Cuéntenos en una línea',
    next: 'Siguiente',
    back: 'Atrás',
    pickOne: 'Elija al menos una opción o cuéntenos en una línea.',
    name: 'Nombre',
    email: 'Correo electrónico',
    business: 'Nombre del negocio',
    size: 'Tamaño del equipo (opcional)',
    sizeNone: 'Elija una opción',
    sizeLabels: ['1 a 9', '10 a 50', '51 a 500', 'Más de 500'],
    privacy: 'Política de privacidad',
    submit: 'Envíenme la descarga',
    sending: 'Enviando',
    spam: 'La verificación contra spam no se completó. Inténtelo de nuevo.',
    failed: 'No pudimos enviar su solicitud. Inténtelo de nuevo o escriba a manuel@dipriva.com.',
    required: 'Escriba su nombre, un correo válido y el nombre de su negocio.',
    doneHeading: 'Su descarga está lista.',
    doneBody: (days: number) => `Manuel lee cada solicitud y responde en un plazo de ${days} días hábiles con una sugerencia basada en sus respuestas.`,
    otherLang: 'Versión en inglés',
    schedule: '¿Prefiere hablar ahora? Agende una consulta.',
  },
} as const;

const EMAIL = /^[^\s@]{1,64}@[^\s@]{1,255}\.[^\s@]{2,}$/;

function readSource(): string {
  const params = new URLSearchParams(window.location.search);
  return (params.get('utm_source') ?? params.get('src') ?? '').toLowerCase().replace(/[^a-z0-9_\-.]/g, '').slice(0, 60);
}

function isLocalHost(): boolean {
  return ['localhost', '127.0.0.1', '[::1]'].includes(window.location.hostname);
}

const inputClass =
  'w-full rounded border border-border bg-background px-4 py-3 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none';

export function LeadForm({ page, language }: { page: MagnetPage; language: Lang }) {
  const t = ui[language];
  const [step, setStep] = useState<1 | 2 | 'done'>(1);
  const [needs, setNeeds] = useState<string[]>([]);
  const [otherOpen, setOtherOpen] = useState(false);
  const [otherText, setOtherText] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [business, setBusiness] = useState('');
  const [size, setSize] = useState('');
  const [insightsOptin, setInsightsOptin] = useState(false);
  const [website, setWebsite] = useState('');
  const [token, setToken] = useState('');
  const [error, setError] = useState('');
  const [sending, setSending] = useState(false);
  const widgetEl = useRef<HTMLDivElement>(null);
  const widgetId = useRef<string | null>(null);

  // The page's own service line is listed first.
  const groups = [...leadForm.groups].sort(
    (a, b) => Number(b.id === leadForm.magnets[page.id].serviceLine) - Number(a.id === leadForm.magnets[page.id].serviceLine),
  );

  useEffect(() => {
    if (step !== 2 || !widgetEl.current) return;
    let cancelled = false;
    const render = () => {
      if (cancelled || !window.turnstile || !widgetEl.current || widgetId.current) return;
      widgetId.current = window.turnstile.render(widgetEl.current, {
        sitekey: isLocalHost() ? TURNSTILE_TEST_KEY : TURNSTILE_SITE_KEY,
        language,
        theme: 'light',
        callback: (value: string) => setToken(value),
        'expired-callback': () => setToken(''),
        'error-callback': () => setToken(''),
      });
    };
    if (window.turnstile) {
      render();
    } else {
      let script = document.querySelector<HTMLScriptElement>(`script[src="${TURNSTILE_SRC}"]`);
      if (!script) {
        script = document.createElement('script');
        script.src = TURNSTILE_SRC;
        script.async = true;
        document.head.appendChild(script);
      }
      script.addEventListener('load', render);
    }
    return () => {
      cancelled = true;
      if (widgetId.current && window.turnstile) window.turnstile.remove(widgetId.current);
      widgetId.current = null;
      setToken('');
    };
  }, [step, language]);

  const toggleNeed = (id: string) => {
    setError('');
    setNeeds((current) => (current.includes(id) ? current.filter((n) => n !== id) : [...current, id]));
  };

  const goNext = () => {
    if (needs.length === 0 && otherText.trim() === '') {
      setError(t.pickOne);
      return;
    }
    setError('');
    setStep(2);
  };

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (name.trim().length < 2 || !EMAIL.test(email.trim()) || business.trim().length < 2) {
      setError(t.required);
      return;
    }
    if (!token) {
      setError(t.spam);
      return;
    }
    setError('');
    setSending(true);
    try {
      const response = await fetch(LEADS_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          magnet: page.id,
          language,
          name: name.trim(),
          email: email.trim(),
          business: business.trim(),
          size,
          needs,
          otherText: otherOpen ? otherText.trim() : '',
          insightsOptin,
          source: readSource(),
          website,
          turnstileToken: token,
        }),
      });
      const result = (await response.json().catch(() => ({}))) as { ok?: boolean; error?: string };
      if (response.ok && result.ok) {
        window.gtag?.('event', 'generate_lead', { magnet: page.id, language });
        setStep('done');
        return;
      }
      setError(result.error === 'spam_check_failed' ? t.spam : result.error === 'invalid' ? t.required : t.failed);
      if (widgetId.current) window.turnstile?.reset(widgetId.current);
      setToken('');
    } catch {
      setError(t.failed);
    } finally {
      setSending(false);
    }
  };

  if (step === 'done') {
    const other: Lang = language === 'en' ? 'es' : 'en';
    return (
      <div className="space-y-6" role="status">
        <h3 className="text-2xl font-playfair font-bold text-foreground">{t.doneHeading}</h3>
        <div className="flex flex-wrap gap-3">
          {page.files.map((file) => (
            <a
              key={file.href[language]}
              href={file.href[language]}
              download
              className="inline-block bg-primary text-primary-foreground font-semibold px-6 py-3 rounded hover:bg-primary/90 transition-colors"
            >
              {file.label[language]}
            </a>
          ))}
        </div>
        <p className="text-sm text-muted-foreground">
          {t.otherLang}:{' '}
          {page.files.map((file, i) => (
            <span key={file.href[other]}>
              {i > 0 && ', '}
              <a href={file.href[other]} download className="underline hover:text-primary">
                {file.label[other]}
              </a>
            </span>
          ))}
        </p>
        <p className="text-foreground/80" style={{ lineHeight: '1.7' }}>
          {t.doneBody(leadForm.replyBusinessDays)}
        </p>
        <a href="/schedule" className="inline-block text-primary underline hover:text-primary/80">
          {t.schedule}
        </a>
      </div>
    );
  }

  return (
    <form onSubmit={submit} noValidate className="space-y-6">
      <p className="text-primary text-xs tracking-widest uppercase">{t.step(step)}</p>

      {step === 1 && (
        <fieldset className="space-y-6">
          <legend className="text-xl font-playfair font-bold text-foreground mb-2">{t.needsHeading}</legend>
          <p className="text-sm text-muted-foreground">{leadForm.copy.helper[language]}</p>
          {groups.map((group) => (
            <div key={group.id} className="space-y-3">
              <p className="text-sm font-semibold text-foreground/90">{group.label[language]}</p>
              {leadForm.options
                .filter((option) => option.group === group.id)
                .map((option) => (
                  <label key={option.id} className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={needs.includes(option.id)}
                      onChange={() => toggleNeed(option.id)}
                      className="mt-1 h-4 w-4 shrink-0 accent-[#2F4059]"
                    />
                    <span className="text-foreground/80">{option.label[language]}</span>
                  </label>
                ))}
            </div>
          ))}
          <div className="space-y-3">
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={otherOpen}
                onChange={() => setOtherOpen((open) => !open)}
                className="mt-1 h-4 w-4 shrink-0 accent-[#2F4059]"
              />
              <span className="text-foreground/80">{leadForm.otherLabel[language]}</span>
            </label>
            {otherOpen && (
              <div>
                <input
                  type="text"
                  value={otherText}
                  maxLength={leadForm.otherMaxChars}
                  onChange={(e) => { setError(''); setOtherText(e.target.value); }}
                  placeholder={t.otherPlaceholder}
                  aria-label={leadForm.otherLabel[language]}
                  className={inputClass}
                />
                <p className="mt-1 text-right text-xs text-muted-foreground">
                  {otherText.length}/{leadForm.otherMaxChars}
                </p>
              </div>
            )}
          </div>
          {error && <p className="text-sm text-destructive" role="alert">{error}</p>}
          <button
            type="button"
            onClick={goNext}
            className="bg-primary text-primary-foreground font-semibold px-8 py-3 rounded hover:bg-primary/90 transition-colors"
          >
            {t.next}
          </button>
        </fieldset>
      )}

      {step === 2 && (
        <div className="space-y-5">
          <label className="block space-y-2">
            <span className="text-sm text-foreground/90">{t.name}</span>
            <input type="text" autoComplete="name" required maxLength={100} value={name} onChange={(e) => setName(e.target.value)} className={inputClass} />
          </label>
          <label className="block space-y-2">
            <span className="text-sm text-foreground/90">{t.email}</span>
            <input type="email" autoComplete="email" required maxLength={320} value={email} onChange={(e) => setEmail(e.target.value)} className={inputClass} />
          </label>
          <label className="block space-y-2">
            <span className="text-sm text-foreground/90">{t.business}</span>
            <input type="text" autoComplete="organization" required maxLength={120} value={business} onChange={(e) => setBusiness(e.target.value)} className={inputClass} />
          </label>
          <label className="block space-y-2">
            <span className="text-sm text-foreground/90">{t.size}</span>
            <select value={size} onChange={(e) => setSize(e.target.value)} className={inputClass}>
              <option value="">{t.sizeNone}</option>
              {leadForm.sizes.map((value, i) => (
                <option key={value} value={value}>
                  {t.sizeLabels[i]}
                </option>
              ))}
            </select>
          </label>

          {/* Hidden from people. Bots that fill it are dropped by the Worker. */}
          <div aria-hidden="true" className="absolute -left-[10000px] h-px w-px overflow-hidden">
            <label>
              Website
              <input type="text" tabIndex={-1} autoComplete="off" value={website} onChange={(e) => setWebsite(e.target.value)} />
            </label>
          </div>

          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={insightsOptin}
              onChange={(e) => setInsightsOptin(e.target.checked)}
              className="mt-1 h-4 w-4 shrink-0 accent-[#2F4059]"
            />
            <span className="text-sm text-foreground/80">{leadForm.copy.insightsConsent[language]}</span>
          </label>

          <p className="text-xs text-muted-foreground">
            {leadForm.copy.notice[language]}{' '}
            <a href="/privacy" className="underline hover:text-primary">{t.privacy}</a>
          </p>

          <div ref={widgetEl} />

          {error && <p className="text-sm text-destructive" role="alert">{error}</p>}

          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => { setError(''); setStep(1); }}
              className="text-foreground/70 hover:text-primary transition-colors"
            >
              {t.back}
            </button>
            <button
              type="submit"
              disabled={sending}
              className="bg-primary text-primary-foreground font-semibold px-8 py-3 rounded hover:bg-primary/90 transition-colors disabled:opacity-60"
            >
              {sending ? t.sending : t.submit}
            </button>
          </div>
        </div>
      )}
    </form>
  );
}
