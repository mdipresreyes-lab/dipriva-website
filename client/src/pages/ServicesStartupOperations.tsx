import { useEffect, useState } from 'react';
import { useLocation } from 'wouter';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { LanguageToggle } from '@/components/LanguageToggle';
import FooterSection from '@/components/sections/FooterSection';

const TITLE = 'Startup Operations Consulting | Dipriva Consulting Group';
const DESCRIPTION =
  'Dipriva helps founders of 10-50 person professional services firms in West Michigan build the operational structure to step back from day-to-day execution. Bilingual delivery in English and Spanish.';

const JSON_LD = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  '@id': 'https://www.dipriva.com/services/startup-operations#service',
  name: 'Startup Operations Consulting',
  description:
    'Operational structure and 90-day roadmap for founders of 10-50 person professional services firms in West Michigan.',
  provider: {
    '@id': 'https://www.dipriva.com/#organization',
  },
  areaServed: {
    '@type': 'State',
    name: 'Michigan',
  },
  availableLanguage: ['English', 'Spanish'],
  serviceType: 'Business Operations Consulting',
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

export default function ServicesStartupOperations() {
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
            <p className="text-gold text-sm tracking-widest uppercase mb-4">Startup Operations</p>
            <h1 className="text-4xl sm:text-5xl font-playfair font-bold text-silver mb-6 leading-tight">
              You Built the Business. Now Build the Operating System.
            </h1>
          </div>

          {/* Section 2 */}
          <div className="border-l-2 border-gold/40 pl-6">
            <h2 className="text-2xl font-playfair font-bold text-silver mb-4">
              Everything Runs Through You
            </h2>
            <p className="text-silver/80" style={{ lineHeight: '1.7' }}>
              Most founders of growing professional services firms reach the same wall. Revenue is
              up, the team is expanding, and yet every decision, every client issue, and every
              internal process still lands on your desk. Stepping back feels impossible because there
              is no structure underneath you to hold it. That is not a leadership problem. It is an
              operations problem.
            </p>
          </div>

          {/* Section 3 */}
          <div>
            <h2 className="text-2xl font-playfair font-bold text-silver mb-4">
              What a Startup Operations Engagement Delivers
            </h2>
            <p className="text-silver/80" style={{ lineHeight: '1.7' }}>
              Dipriva works with founders of 10 to 50 person professional services companies in West
              Michigan to build the operational foundation their growth requires. Every engagement is
              delivered in English or Spanish and concludes with one primary deliverable: a 90-day
              operational roadmap your team can execute without you in the room.
            </p>
          </div>

          {/* Section 4 */}
          <div>
            <h2 className="text-2xl font-playfair font-bold text-silver mb-6">Who This Is For</h2>
            <ul className="space-y-4">
              {[
                'Professional services founders in West Michigan with 10 to 50 employees',
                'Companies where growth has outpaced internal structure and process',
                'Founders who need to delegate but have nothing documented to delegate to',
                'Leadership teams preparing for a key hire, a funding round, or an ownership transition',
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
              Ready to Step Back?
            </h2>
            <p className="text-silver/80 mb-6" style={{ lineHeight: '1.7' }}>
              If your business depends entirely on you to function, that is the problem we solve.
              Start with a conversation.
            </p>
            <a
              href="/schedule"
              className="inline-block bg-gold text-obsidian font-semibold px-8 py-3 rounded hover:bg-gold/90 transition-colors"
            >
              Schedule a Consultation
            </a>
          </div>
        </motion.div>
      </main>

      <FooterSection />
    </div>
  );
}
