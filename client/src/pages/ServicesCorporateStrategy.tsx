import { useEffect, useState } from 'react';
import { useLocation } from 'wouter';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { LanguageToggle } from '@/components/LanguageToggle';
import FooterSection from '@/components/sections/FooterSection';

const TITLE = 'Corporate Strategy Consulting | Dipriva Consulting Group';
const DESCRIPTION =
  'Dipriva architects structured execution plans for business owners and executives navigating growth, transition, or competitive pressure in West Michigan. Bilingual delivery in English and Spanish.';

const JSON_LD = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  '@id': 'https://www.dipriva.com/services/corporate-strategy#service',
  name: 'Corporate Strategy Consulting',
  description:
    'Strategic decision architecture, competitive positioning, operational due diligence, and 90-day execution roadmaps for West Michigan business owners and executives.',
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
            <span className="text-sm">Back to Home</span>
          </button>
          <h1 className="text-lg font-playfair font-bold" style={{ letterSpacing: '0.05em' }}>
            Dipriva
          </h1>
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
            <p className="text-gold text-sm tracking-widest uppercase mb-4">Corporate Strategy</p>
            <h1 className="text-4xl sm:text-5xl font-playfair font-bold text-silver mb-6 leading-tight">
              Your Strategy Needs More Than a Plan. It Needs Infrastructure.
            </h1>
          </div>

          {/* Section 2 */}
          <div className="border-l-2 border-gold/40 pl-6">
            <h2 className="text-2xl font-playfair font-bold text-silver mb-4">
              The Gap Between Strategy and Execution
            </h2>
            <p className="text-silver/80" style={{ lineHeight: '1.7' }}>
              Most companies do not fail because of a bad strategy. They fail because the strategy
              never became a system. Decisions get made in meetings, initiatives get launched, and
              six months later the organization is back where it started — busy, but not advancing.
              The gap between strategic intent and operational reality is where growth stalls.
            </p>
          </div>

          {/* Section 3 */}
          <div>
            <h2 className="text-2xl font-playfair font-bold text-silver mb-4">
              What a Corporate Strategy Engagement Delivers
            </h2>
            <p className="text-silver/80" style={{ lineHeight: '1.7' }}>
              Dipriva works with business owners and executives of growing and mid-size West Michigan
              companies to architect decisions that hold under pressure. Every engagement includes
              strategic decision architecture, competitive positioning, operational due diligence,
              and a 90-day execution roadmap. Delivered in English or Spanish. The outcome is a
              documented strategy your leadership team can execute without you present for every
              decision.
            </p>
          </div>

          {/* Section 4 */}
          <div>
            <h2 className="text-2xl font-playfair font-bold text-silver mb-6">Who This Is For</h2>
            <ul className="space-y-4">
              {[
                'Business owners and executives of 10 to 50 person companies in West Michigan facing a growth inflection',
                'Mid-size organizations navigating ownership transition, market expansion, or competitive shift',
                'Leadership teams where strategy exists on paper but has not translated into disciplined execution',
                'Founders preparing for a key hire, capital raise, or structural reorganization',
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="text-gold mt-1 shrink-0">—</span>
                  <span className="text-silver/80" style={{ lineHeight: '1.6' }}>
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Section 5 — CTA */}
          <div className="border border-silver/10 rounded-lg p-8 bg-silver/5">
            <h2 className="text-2xl font-playfair font-bold text-silver mb-4">
              Ready to Architect the Decision?
            </h2>
            <p className="text-silver/80 mb-6" style={{ lineHeight: '1.7' }}>
              If your organization is moving fast but not advancing, that is the gap we close. Start
              with a conversation.
            </p>
            <a
              href="/schedule"
              className="inline-block bg-gold text-obsidian font-semibold px-8 py-3 rounded hover:bg-gold/90 transition-colors"
            >
              Schedule a Strategy Session
            </a>
          </div>
        </motion.div>
      </main>

      <FooterSection />
    </div>
  );
}
