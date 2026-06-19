import { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { LanguageToggle } from '@/components/LanguageToggle';
import { t } from '@/i18n/translations';
import LeadCaptureForm from '@/components/sections/LeadCaptureForm';
import FooterSection from '@/components/sections/FooterSection';

export default function Schedule() {
  const { language } = useLanguage();
  const [, navigate] = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-obsidian text-silver overflow-x-hidden">
      {/* Navigation Bar */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-obsidian/95 backdrop-blur-md border-b border-silver/10'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <a
            href="/"
            onClick={(e) => { e.preventDefault(); window.location.href = '/'; window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className="text-2xl font-playfair font-bold tracking-luxury text-silver hover:text-gold transition-colors cursor-pointer"
          >
            Dipriva
          </a>
          <div className="hidden md:flex gap-8 items-center">
            <div className="border-l border-silver/20 pl-8">
              <LanguageToggle />
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="pt-24">
        <LeadCaptureForm />
        <FooterSection />
      </main>
    </div>
  );
}
