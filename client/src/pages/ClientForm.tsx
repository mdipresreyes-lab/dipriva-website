import { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { LanguageToggle } from '@/components/LanguageToggle';
import FooterSection from '@/components/sections/FooterSection';

const consentText = {
  en: 'By submitting this form, you consent to Dipriva Consulting Group collecting and processing the business and financial information you provide for the purpose of analyzing your business and preparing your growth strategy. This information is treated as confidential and is not sold or shared for marketing purposes. To request access to or deletion of your information, contact manuel@dipriva.com. See our Privacy Policy for details.',
  es: 'Al enviar este formulario, usted da su consentimiento a Dipriva Consulting Group para recopilar y procesar la información empresarial y financiera que proporcione, con el fin de analizar su negocio y preparar su estrategia de crecimiento. Esta información se trata de manera confidencial y no se vende ni se comparte con fines de marketing. Para solicitar el acceso a sus datos o su eliminación, escriba a manuel@dipriva.com. Consulte nuestra Política de Privacidad para más detalles.',
};

const pageText = {
  en: {
    heading: 'Client Intake',
    subheading: 'Please complete the following information to help us prepare your strategy.',
  },
  es: {
    heading: 'Formulario de Cliente',
    subheading: 'Por favor complete la siguiente información para ayudarnos a preparar su estrategia.',
  },
};

export default function ClientForm() {
  const { language } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);

  // Override the global robots meta tag for this page (belt-and-suspenders with server-side X-Robots-Tag)
  useEffect(() => {
    const existingMeta = document.querySelector('meta[name="robots"]');
    const originalContent = existingMeta?.getAttribute('content') || 'index, follow';
    if (existingMeta) {
      existingMeta.setAttribute('content', 'noindex, nofollow');
    }
    return () => {
      if (existingMeta) {
        existingMeta.setAttribute('content', originalContent);
      }
    };
  }, []);

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
        <section className="py-16 sm:py-24">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Heading */}
            <div className="text-center mb-10">
              <h1
                className="text-3xl sm:text-4xl lg:text-5xl font-playfair font-bold text-silver mb-4"
                style={{ letterSpacing: '0.13em' }}
              >
                {pageText[language].heading}
              </h1>
              <p className="text-silver/70 text-lg">
                {pageText[language].subheading}
              </p>
            </div>

            {/* MS Form Embed */}
            <div className="rounded-xl overflow-hidden bg-white/5 border border-silver/10 backdrop-blur-sm">
              <iframe
                title="Dipriva Client Intake"
                src="https://forms.cloud.microsoft/Pages/ResponsePage.aspx?id=zkMAMxEb1U6oyZeD4vLkQhBR3cb14l5DvvK1DsDmhEdUMzBXSlkxUlEwVjZVMVcwQU1XT0xSV0dYRy4u&embed=true"
                allowFullScreen
                style={{ border: 'none', width: '100%', height: '1400px', maxWidth: '100%' }}
              />
            </div>

            {/* Consent Text */}
            <p className="mt-6 text-silver/60 text-sm text-center leading-relaxed max-w-2xl mx-auto">
              {consentText[language]}{' '}
              <a href="/privacy" className="text-gold hover:text-gold/80 transition-colors underline">
                {language === 'en' ? 'Privacy Policy' : 'Política de Privacidad'}
              </a>
            </p>
          </div>
        </section>

        <FooterSection />
      </main>
    </div>
  );
}
