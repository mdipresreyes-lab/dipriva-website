import { useEffect, useState } from 'react';
import { useLocation } from 'wouter';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { LanguageToggle } from '@/components/LanguageToggle';
import FooterSection from '@/components/sections/FooterSection';

const TITLE = 'Manuel Diprés | Founder, Dipriva Consulting Group';
const DESCRIPTION =
  'Manuel Diprés is the Founder of Dipriva Consulting Group, bringing over 20 years of experience building revenue operations and go-to-market systems for businesses in the Americas and Europe. Bilingual in English and Spanish.';

const JSON_LD = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  '@id': 'https://www.dipriva.com/#founder',
  name: 'Manuel Diprés',
  jobTitle: 'Founder',
  worksFor: {
    '@id': 'https://www.dipriva.com/#organization',
  },
  knowsLanguage: ['English', 'Spanish'],
  description:
    'Founder of Dipriva Consulting Group with over 20 years of experience in revenue operations, sales enablement, and go-to-market systems across the Americas and Europe.',
  sameAs: ['https://www.linkedin.com/in/manueldipres/'],
  url: 'https://www.dipriva.com/about/manuel-dipres',
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

export default function AboutManuelDipres() {
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
          {/* Section 1 — Identity */}
          <div>
            <p className="text-gold text-sm tracking-widest uppercase mb-4">About</p>
            <h1 className="text-4xl sm:text-5xl font-playfair font-bold text-silver mb-4 leading-tight">
              Manuel Diprés
            </h1>
            <h2 className="text-xl font-playfair text-silver/70">
              Founder, Dipriva Consulting Group
            </h2>
          </div>

          {/* Section 2 — Bio */}
          <div className="border-l-2 border-gold/40 pl-6">
            <p className="text-silver/80" style={{ lineHeight: '1.7' }}>
              Manuel Diprés brings over 20 years of global experience building revenue operations,
              sales enablement programs, and go-to-market systems at scale. Having led
              cross-functional teams across the Americas and Europe, his approach focuses on
              engineering operational clarity and closing the gap between strategic intent and the
              infrastructure required to execute it. Manuel delivers precise, scalable solutions for
              startups and mid-market businesses, ensuring that high-growth ambitions are supported
              by disciplined execution. He delivers consulting services in English and Spanish.
            </p>
          </div>

          {/* Section 3 — Approach */}
          <div>
            <h2 className="text-2xl font-playfair font-bold text-silver mb-4">
              The Dipriva Approach
            </h2>
            <p className="text-silver/80" style={{ lineHeight: '1.7' }}>
              Every engagement starts with one question: where is the gap between what the business
              intends to do and what its infrastructure can actually support? From that diagnosis,
              Dipriva architects the systems, processes, and execution frameworks that close it. No
              theoretical deliverables. No recommendations without implementation. Measurable
              outcomes or the engagement is not finished.
            </p>
          </div>

          {/* Section 4 — Results */}
          <div>
            <h2 className="text-2xl font-playfair font-bold text-silver mb-6">Client Results</h2>
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

          {/* Section 5 — CTA */}
          <div className="border border-silver/10 rounded-lg p-8 bg-silver/5">
            <h2 className="text-2xl font-playfair font-bold text-silver mb-4">
              Work With Manuel
            </h2>
            <p className="text-silver/80 mb-6" style={{ lineHeight: '1.7' }}>
              If your business needs operational clarity and an execution system that holds under
              pressure, start with a conversation.
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
