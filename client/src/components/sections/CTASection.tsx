import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { t } from '@/i18n/translations';
import { useLocation } from 'wouter';
import Clarity from '@microsoft/clarity';
import { ArrowRight } from 'lucide-react';

export default function CTASection() {
  const { language } = useLanguage();
  const [, navigate] = useLocation();

  const handleCTAClick = () => {
    try {
      Clarity.event('cta_click');
    } catch (error) {
      console.warn('Failed to track CTA click:', error);
    }
    navigate('/schedule');
  };

  return (
    <section 
      id="cta" 
      className="relative overflow-hidden px-4 sm:px-6 lg:px-12"
      style={{ paddingTop: '120px', paddingBottom: '120px' }}
    >
      {/* Background design */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-background" aria-hidden="true" />
        
        {/* Accent shapes */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/8 rounded-full blur-3xl -translate-y-1/2" aria-hidden="true" />
        <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-primary/6 rounded-full blur-3xl translate-y-1/2" aria-hidden="true" />
        
        {/* Diagonal lines */}
        <div className="absolute top-1/3 left-0 w-1 h-64 bg-gradient-to-b from-primary/20 to-transparent" aria-hidden="true" />
        <div className="absolute bottom-1/4 right-0 w-1 h-96 bg-gradient-to-t from-primary/20 to-transparent" aria-hidden="true" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left side - Text content */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            {/* Overline */}
            <div className="flex items-center gap-3">
              <div className="w-12 h-0.5 bg-primary" aria-hidden="true" />
              <span className="text-sm font-medium text-primary tracking-widest uppercase">
                {language === 'en' ? 'Next Steps' : 'Próximos Pasos'}
              </span>
            </div>

            {/* Headline */}
            <h2 
              className="text-5xl sm:text-6xl lg:text-7xl font-playfair font-bold text-foreground leading-tight"
              style={{ letterSpacing: '0.02em' }}
              role="heading"
              aria-level={2}
            >
              {t('cta.headline', language)}
            </h2>

            {/* Subheadline */}
            <p className="text-xl text-foreground/70 leading-relaxed max-w-xl">
              {t('cta.subheadline', language)}
            </p>

            {/* CTA Button */}
            <div className="pt-4">
              <button
                onClick={handleCTAClick}
                className="inline-flex items-center gap-3 px-8 py-4 bg-primary text-white font-medium rounded-lg hover:bg-primary/90 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 group"
              >
                <span>{t('cta.button', language)}</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </motion.div>

          {/* Right side - Visual element */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="hidden lg:block"
          >
            {/* Card with benefits */}
            <div className="relative">
              {/* Main card */}
              <div className="p-10 rounded-2xl border border-primary/20 bg-white/70 backdrop-blur-sm shadow-xl">
                {/* Gradient overlay */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/5 to-transparent pointer-events-none" aria-hidden="true" />

                {/* Content */}
                <div className="relative z-10 space-y-8">
                  <div>
                    <h3 className="text-2xl font-playfair font-bold text-foreground mb-2">
                      {language === 'en' ? 'What You\'ll Get' : 'Lo que Obtendrás'}
                    </h3>
                    <p className="text-foreground/70">
                      {language === 'en' 
                        ? 'A personalized strategy session designed for your business.' 
                        : 'Una sesión de estrategia personalizada diseñada para tu negocio.'}
                    </p>
                  </div>

                  {/* Benefits list */}
                  <div className="space-y-4">
                    {[
                      language === 'en' ? 'Operational clarity assessment' : 'Evaluación de claridad operacional',
                      language === 'en' ? 'Customized action roadmap' : 'Hoja de ruta de acción personalizada',
                      language === 'en' ? 'Executive-level insights' : 'Perspectivas a nivel ejecutivo',
                      language === 'en' ? 'Next steps defined' : 'Próximos pasos definidos',
                    ].map((benefit, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <div className="w-2 h-2 rounded-full bg-primary" aria-hidden="true" />
                        </div>
                        <span className="text-foreground/80 leading-relaxed">{benefit}</span>
                      </div>
                    ))}
                  </div>

                  {/* Timeline */}
                  <div className="pt-6 border-t border-primary/10">
                    <div className="text-sm font-medium text-primary uppercase tracking-widest mb-2">
                      {language === 'en' ? 'Timeline' : 'Cronograma'}
                    </div>
                    <p className="text-foreground/70">
                      {language === 'en' 
                        ? '30-minute strategy session within 48 hours' 
                        : 'Sesión de estrategia de 30 minutos dentro de 48 horas'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Floating accent */}
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-primary/10 rounded-full blur-2xl" aria-hidden="true" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
