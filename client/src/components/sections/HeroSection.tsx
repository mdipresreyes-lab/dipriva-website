import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { t } from '@/i18n/translations';

export default function HeroSection() {
  const { language } = useLanguage();

  const scrollToServices = () => {
    const servicesSection = document.getElementById('services');
    servicesSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-background">
      {/* Asymmetric background design */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Top-right accent shape */}
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-primary/5 to-primary/10 rounded-full blur-3xl" aria-hidden="true" />
        
        {/* Bottom-left accent shape */}
        <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-gradient-to-tr from-primary/3 to-primary/8 rounded-full blur-3xl" aria-hidden="true" />
        
        {/* Diagonal accent line */}
        <div className="absolute top-1/4 right-0 w-1 h-96 bg-gradient-to-b from-primary/20 via-primary/5 to-transparent" aria-hidden="true" />
      </div>

      {/* Content Grid - Asymmetric layout */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-20 lg:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left column - Main content (spans 7 columns on desktop) */}
          <div className="lg:col-span-7 space-y-8">
            {/* Overline accent */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="inline-block"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-0.5 bg-primary" aria-hidden="true" />
                <span className="text-sm font-medium text-primary tracking-widest uppercase">
                  {language === 'en' ? 'Strategic Clarity' : 'Claridad Estratégica'}
                </span>
              </div>
            </motion.div>

            {/* Main headline */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h1 
                className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-playfair font-bold text-foreground leading-tight"
                style={{ letterSpacing: '0.02em' }}
                role="heading"
                aria-level={1}
              >
                {t('hero.headline', language)}
              </h1>
            </motion.div>

            {/* Subheadline */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <p className="text-lg sm:text-xl lg:text-2xl text-foreground/70 max-w-xl leading-relaxed font-light">
                {t('hero.subheadline', language)}
              </p>
            </motion.div>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="pt-4"
            >
              <button
                onClick={scrollToServices}
                className="inline-flex items-center gap-3 px-8 py-4 bg-primary text-white font-medium rounded-lg hover:bg-primary/90 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
              >
                <span>{language === 'en' ? 'Explore Services' : 'Explorar Servicios'}</span>
                <ChevronDown className="w-5 h-5" />
              </button>
            </motion.div>
          </div>

          {/* Right column - Visual element (spans 5 columns on desktop) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="lg:col-span-5 hidden lg:block"
          >
            <div className="relative">
              {/* Card with gradient border effect */}
              <div className="relative p-8 rounded-2xl border border-primary/20 bg-white/50 backdrop-blur-sm shadow-xl">
                {/* Gradient overlay accent */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/5 to-transparent pointer-events-none" aria-hidden="true" />
                
                {/* Content */}
                <div className="relative z-10 space-y-6">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-primary" aria-hidden="true" />
                      <span className="text-sm font-semibold text-primary uppercase tracking-wide">
                        {language === 'en' ? 'Our Approach' : 'Nuestro Enfoque'}
                      </span>
                    </div>
                    <h3 className="text-2xl font-playfair font-bold text-foreground">
                      {language === 'en' ? 'Structured Execution' : 'Ejecución Estructurada'}
                    </h3>
                  </div>

                  <p className="text-foreground/70 leading-relaxed">
                    {language === 'en' 
                      ? 'We architect systems that eliminate operational friction and accelerate growth.' 
                      : 'Diseñamos sistemas que eliminan la fricción operacional y aceleran el crecimiento.'}
                  </p>

                  {/* Stats or features */}
                  <div className="grid grid-cols-2 gap-4 pt-4 border-t border-primary/10">
                    <div>
                      <div className="text-3xl font-playfair font-bold text-primary">500+</div>
                      <div className="text-sm text-foreground/60">
                        {language === 'en' ? 'Executives Served' : 'Ejecutivos Atendidos'}
                      </div>
                    </div>
                    <div>
                      <div className="text-3xl font-playfair font-bold text-primary">15+</div>
                      <div className="text-sm text-foreground/60">
                        {language === 'en' ? 'Years Experience' : 'Años de Experiencia'}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating accent element */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary/10 rounded-full blur-2xl" aria-hidden="true" />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 lg:block hidden"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <button
          onClick={scrollToServices}
          className="flex flex-col items-center gap-2 text-primary hover:text-primary/70 transition-colors"
          aria-label="Scroll to services"
        >
          <span className="text-xs uppercase tracking-widest font-medium">Scroll</span>
          <ChevronDown className="w-5 h-5" />
        </button>
      </motion.div>
    </section>
  );
}
