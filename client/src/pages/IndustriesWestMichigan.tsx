import { useEffect, useState } from 'react';
import { useLocation } from 'wouter';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { LanguageToggle } from '@/components/LanguageToggle';
import FooterSection from '@/components/sections/FooterSection';

const TITLE = 'West Michigan Business Consulting | Dipriva Consulting Group';
const DESCRIPTION =
  'Dipriva helps West Michigan business owners build the operational and sales systems to close deals consistently. Most are experts at their craft. Few have the infrastructure to sell it. Bilingual delivery in English and Spanish.';

const JSON_LD = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  '@id': 'https://www.dipriva.com/industries/west-michigan#service',
  name: 'West Michigan Business Consulting',
  description:
    'Operational and sales infrastructure for West Michigan business owners who are experts at delivery but need a repeatable system to close new clients consistently.',
  provider: {
    '@id': 'https://www.dipriva.com/#organization',
  },
  areaServed: [
    { '@type': 'City', name: 'Grand Rapids' },
    { '@type': 'State', name: 'Michigan' },
  ],
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

export default function IndustriesWestMichigan() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [, setLocation] = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
    const prevTitle = document.title;
    document.title = TITLE;

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

      {/* Main */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24 mt-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-16"
        >
          {/* Section 1 — Hero */}
          <div>
            <p className="text-gold text-sm tracking-widest uppercase mb-4">West Michigan</p>
            <h1 className="text-4xl sm:text-5xl font-playfair font-bold text-silver mb-6 leading-tight">
              You Are Excellent at What You Do. Now Build the System That Sells It.
            </h1>
          </div>

          {/* Section 2 — Problem */}
          <div className="border-l-2 border-gold/40 pl-6">
            <h2 className="text-2xl font-playfair font-bold text-silver mb-4">
              The West Michigan Gap
            </h2>
            <p className="text-silver/80" style={{ lineHeight: '1.7' }}>
              West Michigan produces exceptional operators. Builders, service providers, and
              specialists who are deeply skilled at delivering results for their clients. What most
              do not have is a repeatable system for winning new ones. The pipeline is inconsistent.
              Follow-up falls through. Proposals go out and disappear. The problem is not the
              expertise. The problem is the absence of an operational sales infrastructure to
              support it.
            </p>
          </div>

          {/* Section 3 — What we do */}
          <div>
            <h2 className="text-2xl font-playfair font-bold text-silver mb-4">
              What Dipriva Builds for West Michigan Owners
            </h2>
            <p className="text-silver/80" style={{ lineHeight: '1.7' }}>
              Dipriva works with West Michigan business owners to close the gap between delivery
              excellence and sales consistency. We audit your current client acquisition process,
              identify where deals are stalling, and build the operational infrastructure that turns
              expertise into a repeatable close. Every engagement is delivered in English or Spanish.
              The outcome is a documented sales system your team executes without the owner present
              for every conversation.
            </p>
          </div>

          {/* Section 4 — Who this is for */}
          <div>
            <h2 className="text-2xl font-playfair font-bold text-silver mb-6">Who This Is For</h2>
            <ul className="space-y-4">
              {[
                'West Michigan business owners who win on referrals but cannot scale beyond them',
                'Founders whose close rate depends entirely on their personal involvement in every deal',
                'Service businesses where proposals go out but follow-up is inconsistent or absent',
                'Growing companies where the owner is both the best salesperson and the primary delivery resource',
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

          {/* Section 5 — Results */}
          <div>
            <h2 className="text-2xl font-playfair font-bold text-silver mb-6">
              What West Michigan Owners Have Built With Dipriva
            </h2>
            <ul className="space-y-4">
              {[
                'Insurance agency: defined sales strategy increased per-client policy premiums by $1,000 and improved renewal rates by 13%',
                'Roofing company: sales team alignment improved lead-to-close ratio by 20% over a 6-month window',
                'Tax agency: re-purchase rate increased by 9 percentage points and services successfully upsold to Schedule C clients',
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

          {/* Section 6 — CTA */}
          <div className="border border-silver/10 rounded-lg p-8 bg-silver/5">
            <h2 className="text-2xl font-playfair font-bold text-silver mb-4">
              Ready to Build the System?
            </h2>
            <p className="text-silver/80 mb-6" style={{ lineHeight: '1.7' }}>
              If your expertise is not the problem but your pipeline is, that is exactly the gap we
              close. Start with a conversation.
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
