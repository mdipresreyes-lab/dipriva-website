import { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { LanguageToggle } from '@/components/LanguageToggle';
import FooterSection from '@/components/sections/FooterSection';

const consentText = {
  en: 'By submitting this form, you consent to Dipriva Consulting Group collecting and processing the information provided to contact you regarding your business needs. You may withdraw consent at any time.',
  es: 'Al enviar este formulario, usted da su consentimiento a Dipriva Consulting Group para recopilar y procesar la información proporcionada con el fin de contactarle sobre sus necesidades empresariales. Puede retirar su consentimiento en cualquier momento.',
};

const pageText = {
  en: {
    heading: 'Start the Conversation',
    subheading: 'Tell us about your business needs and we will be in touch.',
  },
  es: {
    heading: 'Inicia la Conversación',
    subheading: 'Cuéntanos sobre tus necesidades empresariales y nos pondremos en contacto.',
  },
};

export default function Schedule() {
  const { language } = useLanguage();
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
      <main id="main-content" className="pt-24">
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
                title="Contact Form — Start the Conversation"
                src="https://forms.cloud.microsoft/Pages/ResponsePage.aspx?id=zkMAMxEb1U6oyZeD4vLkQhBR3cb14l5DvvK1DsDmhEdUNUdMRE9TNUJOT1ozOFpDVUZJUk5ORkFEUS4u&embed=true"
                allowFullScreen
                style={{ border: 'none', width: '100%', height: '820px', maxWidth: '100%' }}
              />
              <p className="mt-3 text-center text-sm" style={{ color: 'rgba(232,232,232,0.5)' }}>
                {language === 'en'
                  ? <>Can't load the form? <a href="mailto:hello@dipriva.com" className="underline hover:text-gold transition-colors">Email us directly.</a></>
                  : <>¿No carga el formulario? <a href="mailto:hello@dipriva.com" className="underline hover:text-gold transition-colors">Escríbenos directamente.</a></>
                }
              </p>
            </div>

            {/* Consent Text */}
            <p className="mt-6 text-silver/60 text-sm text-center leading-relaxed max-w-2xl mx-auto">
              {consentText[language]}
            </p>
          </div>
        </section>

        <FooterSection />
      </main>
    </div>
  );
}
