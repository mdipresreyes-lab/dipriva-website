import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { LanguageToggle } from '@/components/LanguageToggle';
import { t } from '@/i18n/translations';
import HeroSection from '@/components/sections/HeroSection';
import ServicesSection from '@/components/sections/ServicesSection';
import AboutSection from '@/components/sections/AboutSection';
import CTASection from '@/components/sections/CTASection';
import FooterSection from '@/components/sections/FooterSection';
import { Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function Home() {
  const { language } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 sm:py-4 flex justify-between items-center">
          <div className="text-xl sm:text-2xl font-playfair font-bold tracking-luxury text-silver">
            Dipriva
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex gap-8 items-center text-sm md:text-base">
            <a href="#services" className="text-silver hover:text-gold transition-colors">
              {t('nav.services', language)}
            </a>
            <a href="#about" className="text-silver hover:text-gold transition-colors">
              {t('nav.about', language)}
            </a>
            <a href="#cta" className="text-silver hover:text-gold transition-colors">
              {t('nav.contact', language)}
            </a>
            <div className="border-l border-silver/20 pl-8">
              <LanguageToggle />
            </div>
          </div>

          {/* Mobile/Landscape Navigation */}
          <div className="lg:hidden flex items-center gap-4">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-silver hover:text-gold transition-colors"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            <div className="border-l border-silver/20 pl-4">
              <LanguageToggle />
            </div>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMenuOpen && (
          <div className="lg:hidden bg-obsidian/95 backdrop-blur-md border-b border-silver/10 px-4 py-4">
            <div className="flex flex-col gap-4">
              <a
                href="#services"
                className="text-silver hover:text-gold transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {t('nav.services', language)}
              </a>
              <a
                href="#about"
                className="text-silver hover:text-gold transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {t('nav.about', language)}
              </a>
              <a
                href="#cta"
                className="text-silver hover:text-gold transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {t('nav.contact', language)}
              </a>
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main className="pt-16">
        <HeroSection />
        <ServicesSection />
        <AboutSection />
        <CTASection />
        <FooterSection />
      </main>
    </div>
  );
}
