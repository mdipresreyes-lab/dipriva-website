import { useEffect, useState } from 'react';
import { useLocation } from 'wouter';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { LanguageToggle } from '@/components/LanguageToggle';
import { LeadForm } from '@/components/LeadForm';
import FooterSection from '@/components/sections/FooterSection';
import { useLanguage } from '@/contexts/LanguageContext';
import { MAGNET_PAGES, type MagnetId } from '@/lib/leadMagnets';

const back = { en: 'Back to Home', es: 'Volver al Inicio' };

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

export default function LeadMagnetPage({ magnet }: { magnet: MagnetId }) {
  const page = MAGNET_PAGES[magnet];
  const [isScrolled, setIsScrolled] = useState(false);
  const [, setLocation] = useLocation();
  const { language } = useLanguage();
  const c = page.copy[language];

  useEffect(() => {
    window.scrollTo(0, 0);
    const prevTitle = document.title;
    document.title = page.title;
    const cleanups = [
      setMeta('meta[name="description"]', 'content', page.description),
      setMeta('meta[property="og:title"]', 'content', page.title),
      setMeta('meta[property="og:description"]', 'content', page.description),
      setMeta('meta[property="og:type"]', 'content', 'website'),
    ];
    return () => {
      document.title = prevTitle;
      cleanups.forEach((fn) => fn());
    };
  }, [page]);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <nav
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled ? 'bg-background/95' : 'bg-background/80'
        } backdrop-blur-md border-b border-border`}
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <button
            onClick={() => setLocation('/')}
            className="flex items-center gap-2 text-foreground hover:text-primary transition-colors"
          >
            <ArrowLeft size={16} />
            <span className="text-sm">{back[language]}</span>
          </button>
          <span className="text-lg font-playfair font-bold" style={{ letterSpacing: '0.05em' }}>
            Dipriva
          </span>
          <LanguageToggle />
        </div>
      </nav>

      <main id="main-content" className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-24 mt-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="grid gap-12 lg:grid-cols-2 lg:gap-16"
        >
          <div className="space-y-10">
            <div>
              <p className="text-primary text-sm tracking-widest uppercase mb-4">{c.overline}</p>
              <h1 className="text-4xl sm:text-5xl font-playfair font-bold text-foreground mb-6 leading-tight">{c.h1}</h1>
              <p className="text-foreground/80 text-lg" style={{ lineHeight: '1.7' }}>{c.intro}</p>
            </div>
            <div className="border-l-2 border-primary/40 pl-6">
              <h2 className="text-2xl font-playfair font-bold text-foreground mb-4">{c.insideHeading}</h2>
              <ul className="space-y-3">
                {c.inside.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="text-primary mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" aria-hidden="true" />
                    <span className="text-foreground/80" style={{ lineHeight: '1.6' }}>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <section aria-labelledby="lead-form-heading" className="border border-border rounded-lg p-6 sm:p-8 bg-card self-start">
            <h2 id="lead-form-heading" className="text-2xl font-playfair font-bold text-foreground mb-6">{c.formHeading}</h2>
            <LeadForm page={page} language={language} />
          </section>
        </motion.div>
      </main>

      <FooterSection />
    </div>
  );
}
