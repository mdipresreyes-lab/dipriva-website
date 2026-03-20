import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import HeroSection from '@/components/sections/HeroSection';
import ServicesSection from '@/components/sections/ServicesSection';
import AboutSection from '@/components/sections/AboutSection';
import LeadCaptureForm from '@/components/sections/LeadCaptureForm';
import FooterSection from '@/components/sections/FooterSection';

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);

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
          <div className="text-2xl font-playfair font-bold tracking-luxury text-silver">
            Dipriva
          </div>
          <div className="hidden md:flex gap-8">
            <a href="#services" className="text-silver hover:text-gold transition-colors">
              Services
            </a>
            <a href="#about" className="text-silver hover:text-gold transition-colors">
              About
            </a>
            <a href="#contact" className="text-silver hover:text-gold transition-colors">
              Contact
            </a>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="pt-16">
        <HeroSection />
        <ServicesSection />
        <AboutSection />
        <LeadCaptureForm />
        <FooterSection />
      </main>
    </div>
  );
}
