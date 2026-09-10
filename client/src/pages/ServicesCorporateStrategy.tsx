import { useEffect, useState } from 'react';
import { useLocation } from 'wouter';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { LanguageToggle } from '@/components/LanguageToggle';
import FooterSection from '@/components/sections/FooterSection';
import { useLanguage } from '@/contexts/LanguageContext';

const pageContent = {
  en: {
    back: 'Back to Home',
    overline: 'Corporate Strategy',
    h1: 'Your Strategy Needs More Than a Plan. It Needs Infrastructure.',
    s2heading: 'The Gap Between Strategy and Execution',
    s2body: 'Most companies do not fail because of a bad strategy. They fail because the strategy never became a system. Decisions get made in meetings, initiatives get launched, and six months later the organization is back where it started — busy, but not advancing. The gap between strategic intent and operational reality is where growth stalls.',
    s3heading: 'What a Corporate Strategy Engagement Delivers',
    s3body: 'Dipriva works with business owners and executives of growing and mid-size West Michigan companies to architect decisions that hold under pressure. Every engagement includes strategic decision architecture, competitive positioning, operational due diligence, and a 90-day execution roadmap. Delivered in English or Spanish. The outcome is a documented strategy your leadership team can execute without you present for every decision.',
    s4heading: 'Who This Is For',
    list: [
      'Business owners and executives of 10 to 50 person companies in West Michigan facing a growth inflection',
      'Mid-size organizations navigating ownership transition, market expansion, or competitive shift',
      'Leadership teams where strategy exists on paper but has not translated into disciplined execution',
      'Founders preparing for a key hire, capital raise, or structural reorganization',
    ],
    ctaHeading: 'Ready to Architect the Decision?',
    ctaBody: 'If your organization is moving fast but not advancing, that is the gap we close. Start with a conversation.',
    ctaButton: 'Schedule a Strategy Session',
  },
  es: {
    back: 'Volver al Inicio',
    overline: 'Estrategia Corporativa',
    h1: 'Tu Estrategia Necesita Más Que un Plan. Necesita Infraestructura.',
    s2heading: 'La Brecha Entre Estrategia y Ejecución',
    s2body: 'La mayoría de las empresas no fracasan por tener una mala estrategia. Fracasan porque la estrategia nunca se convirtió en un sistema. Las decisiones se toman en reuniones, se lanzan iniciativas y seis meses después la organización está de vuelta donde empezó: ocupada, pero sin avanzar. La brecha entre la intención estratégica y la realidad operacional es donde el crecimiento se detiene.',
    s3heading: 'Qué Entrega un Compromiso de Estrategia Corporativa',
    s3body: 'Dipriva trabaja con dueños de negocios y ejecutivos de empresas medianas y en crecimiento en West Michigan para diseñar decisiones que resistan la presión. Cada compromiso incluye arquitectura de decisiones estratégicas, posicionamiento competitivo, debida diligencia operacional y un mapa de ejecución de 90 días. Entregado en inglés o español. El resultado es una estrategia documentada que tu equipo directivo puede ejecutar sin que estés presente en cada decisión.',
    s4heading: 'Para Quién Es Esto',
    list: [
      'Dueños de negocios y ejecutivos de empresas de 10 a 50 personas en West Michigan que enfrentan un punto de inflexión en su crecimiento',
      'Organizaciones medianas que navegan una transición de propiedad, expansión de mercado o cambio competitivo',
      'Equipos directivos donde la estrategia existe en papel pero no se ha traducido en ejecución disciplinada',
      'Fundadores que se preparan para una contratación clave, ronda de capital o reorganización estructural',
    ],
    ctaHeading: '¿Listo para Diseñar la Decisión?',
    ctaBody: 'Si tu organización se mueve rápido pero no avanza, esa es la brecha que cerramos. Comienza con una conversación.',
    ctaButton: 'Agendar una Sesión de Estrategia',
  },
};

const TITLE = 'Corporate Strategy Consulting | Dipriva Consulting Group';
const DESCRIPTION =
  'Dipriva architects structured execution plans for business owners and executives navigating growth, transition, or competitive pressure in West Michigan. Bilingual delivery in English and Spanish.';

const JSON_LD = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  '@id': 'https://www.dipriva.com/services/corporate-strategy#service',
  name: 'Corporate Strategy Consulting',
  description:
    'Structured strategy engagements for West Michigan business owners and executives: decision architecture, competitive positioning, and 90-day execution roadmaps.',
  provider: {
    '@id': 'https://www.dipriva.com/#organization',
  },
  areaServed: {
    '@type': 'State',
    name: 'Michigan',
  },
  availableLanguage: ['English', 'Spanish'],
  serviceType: 'Business Strategy Consulting',
};

function setMeta(selector: string, attr: string, value: string): () => void {
  let el = document.querySelector(selector) as HTMLMetaElement | null;
  const created = !el;
  if (!el) {
    el = document.createElement('meta');
    document.head.appendChild(el);
  }
  const prev = el.getAttribute(attr) ?? '';
  el.setAttribute(attr, value);
  const captured = el;
  return () => {
    if (created) captured.remove();
    else captured.setAttribute(attr, prev);
  };
}

export default function ServicesCorporateStrategy() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [, setLocation] = useLocation();
  const { language } = useLanguage();
  const c = pageContent[language];

  useEffect(() => {
    window.scrollTo(0, 0);
    const prevTitle = document.title;
    document.title = TITLE;

    // Inject JSON-LD
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(JSON_LD);
    document.head.appendChild(script);

    const cleanups = [
      setMeta('meta[name="description"]', 'content', DESCRIPTION),
      setMeta('meta[property="og:title"]', 'content', TITLE),
      setMeta('meta[property="og:description"]', 'content', DESCRIPTION),
      setMeta('meta[property="og:type"]', 'content', 'website'),
    ];
    return () => {
      document.title = prevTitle;
      script.remove();
      cleanups.forEach(fn => fn());
    };
  }, []);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="min-h-screen bg-obsidian text-silver overflow-x-hidden">
      {/* Nav */}
      <nav
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-obsidian/95 backdrop-blur-md border-b border-silver/10'
            : 'bg-obsidian/80 backdrop-blur-md border-b border-silver/10'
        }`}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <button
            onClick={() => setLocation('/')}
            className="flex items-center gap-2 text-silver hover:text-gold transition-colors"
          >
            <ArrowLeft size={16} />
            <span className="text-sm">{c.back}</span>
          </button>
          <span className="text-lg font-playfair font-bold" style={{ letterSpacing: '0.05em' }}>
            Dipriva
          </span>
          <LanguageToggle />
        </div>
      </nav>

      {/* Hero */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24 mt-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-16"
        >
          {/* Section 1 */}
          <div>
            <p className="text-gold text-sm tracking-widest uppercase mb-4">{c.overline}</p>
            <h1 className="text-4xl sm:text-5xl font-playfair font-bold text-silver mb-6 leading-tight">
              {c.h1}
            </h1>
          </div>

          {/* Section 2 */}
          <div className="border-l-2 border-gold/40 pl-6">
            <h2 className="text-2xl font-playfair font-bold text-silver mb-4">{c.s2heading}</h2>
            <p className="text-silver/80" style={{ lineHeight: '1.7' }}>{c.s2body}</p>
          </div>

          {/* Section 3 */}
          <div>
            <h2 className="text-2xl font-playfair font-bold text-silver mb-4">{c.s3heading}</h2>
            <p className="text-silver/80" style={{ lineHeight: '1.7' }}>{c.s3body}</p>
          </div>

          {/* Section 4 */}
          <div>
            <h2 className="text-2xl font-playfair font-bold text-silver mb-6">{c.s4heading}</h2>
            <ul className="space-y-4">
              {c.list.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="text-gold mt-1 shrink-0">—</span>
                  <span className="text-silver/80" style={{ lineHeight: '1.6' }}>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Section 5 — CTA */}
          <div className="border border-silver/10 rounded-lg p-8 bg-silver/5">
            <h2 className="text-2xl font-playfair font-bold text-silver mb-4">{c.ctaHeading}</h2>
            <p className="text-silver/80 mb-6" style={{ lineHeight: '1.7' }}>{c.ctaBody}</p>
            <a
              href="/schedule"
              className="inline-block bg-gold text-obsidian font-semibold px-8 py-3 rounded hover:bg-gold/90 transition-colors"
            >
              {c.ctaButton}
            </a>
          </div>
        </motion.div>
      </main>

      <FooterSection />
    </div>
  );
}
