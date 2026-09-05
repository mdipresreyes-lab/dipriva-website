import { useEffect, useState } from 'react';
import { useLocation } from 'wouter';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { LanguageToggle } from '@/components/LanguageToggle';
import FooterSection from '@/components/sections/FooterSection';

const TITLE = 'AI and Automation Consulting | Dipriva Consulting Group';
const DESCRIPTION =
  'Dipriva identifies high-friction workflows and deploys AI and automation to eliminate operational drag for West Michigan business owners. Bilingual delivery in English and Spanish.';

const JSON_LD = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  '@id': 'https://www.dipriva.com/services/ai-automation#service',
  name: 'AI and Automation Consulting',
  description:
    'Workflow audit and AI and automation implementation to eliminate operational drag for West Michigan business owners and executives.',
  provider: {
    '@id': 'https://www.dipriva.com/#organization',
  },
  areaServed: {
    '@type': 'State',
    name: 'Michigan',
  },
  availableLanguage: ['English', 'Spanish'],
  serviceType: 'AI and Automation Consulting',
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

export default function ServicesAiAutomation() {
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
            <p className="text-gold text-sm tracking-widest uppercase mb-4">AI and Automation</p>
            <h1 className="text-4xl sm:text-5xl font-playfair font-bold text-silver mb-6 leading-tight">
              Eliminate the Work That Should Not Require You.
            </h1>
          </div>

          {/* Section 2 */}
          <div className="border-l-2 border-gold/40 pl-6">
            <h2 className="text-2xl font-playfair font-bold text-silver mb-4">
              Operational Drag Is a Revenue Problem
            </h2>
            <p className="text-silver/80" style={{ lineHeight: '1.7' }}>
              Every hour your team spends on manual data entry, repetitive follow-up, or disconnected
              handoffs is an hour not spent on execution that moves the business forward. Most West
              Michigan business owners know the drag exists. Few have the bandwidth to architect the
              fix. That is exactly what this engagement does.
            </p>
          </div>

          {/* Section 3 */}
          <div>
            <h2 className="text-2xl font-playfair font-bold text-silver mb-4">
              What an AI and Automation Engagement Delivers
            </h2>
            <p className="text-silver/80" style={{ lineHeight: '1.7' }}>
              Dipriva audits your highest-friction workflows, identifies where AI and automation
              create the most leverage, and implements the systems that reduce manual effort without
              adding complexity. Every engagement is delivered in English or Spanish and concludes
              with deployed, documented automation your team operates independently. No theoretical
              frameworks. No vendor recommendations without implementation.
            </p>
          </div>

          {/* Section 4 */}
          <div>
            <h2 className="text-2xl font-playfair font-bold text-silver mb-6">Who This Is For</h2>
            <ul className="space-y-4">
              {[
                'Business owners whose teams spend significant time on manual, repeatable tasks that slow execution',
                'Operations leaders managing disconnected tools and manual handoffs between systems',
                'Companies where growth has increased administrative load faster than headcount',
                'Founders who want AI deployed in their business but do not know where to start without creating more complexity',
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
              Ready to Eliminate the Drag?
            </h2>
            <p className="text-silver/80 mb-6" style={{ lineHeight: '1.7' }}>
              If your team is working hard but the business is not accelerating, operational drag is
              the most likely cause. Start with a conversation.
            </p>
            <a
              href="/schedule"
              className="inline-block bg-gold text-obsidian font-semibold px-8 py-3 rounded hover:bg-gold/90 transition-colors"
            >
              Schedule an Automation Audit
            </a>
          </div>
        </motion.div>
      </main>

      <FooterSection />
    </div>
  );
}
