import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { t } from '@/i18n/translations';

export default function AboutSection() {
  const { language } = useLanguage();

  return (
    <section
      id="about"
      className="relative bg-background overflow-hidden px-4 sm:px-6 lg:px-12"
      style={{ paddingTop: '120px', paddingBottom: '120px' }}
    >
      {/* Background accents */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-primary/4 rounded-full blur-3xl" aria-hidden="true" />
        <div className="absolute -bottom-20 right-1/4 w-96 h-96 bg-primary/3 rounded-full blur-3xl" aria-hidden="true" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="space-y-12"
        >
          {/* Overline */}
          <div className="flex items-center gap-3">
            <div className="w-12 h-0.5 bg-primary" aria-hidden="true" />
            <span className="text-sm font-medium text-primary tracking-widest uppercase">
              {language === 'en' ? 'About Dipriva' : 'Acerca de Dipriva'}
            </span>
          </div>

          {/* Title */}
          <h2 
            className="text-5xl sm:text-6xl lg:text-7xl font-playfair font-bold text-foreground leading-tight"
            style={{ letterSpacing: '0.02em' }}
            role="heading"
            aria-level={2}
          >
            {t('about.title', language)}
          </h2>

          {/* Description with enhanced typography */}
          <div className="space-y-8">
            <p className="text-xl lg:text-2xl text-foreground/80 leading-relaxed font-light">
              {t('about.description', language)}
            </p>

            {/* Key points */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8 border-t border-primary/10">
              {[
                {
                  label: language === 'en' ? 'Founded' : 'Fundado',
                  value: language === 'en' ? '2010' : '2010',
                  detail: language === 'en' ? 'Strategic consulting excellence' : 'Excelencia en consultoría estratégica',
                },
                {
                  label: language === 'en' ? 'Expertise' : 'Experiencia',
                  value: language === 'en' ? '15+' : '15+',
                  detail: language === 'en' ? 'Years in operational design' : 'Años en diseño operacional',
                },
                {
                  label: language === 'en' ? 'Clients' : 'Clientes',
                  value: language === 'en' ? '500+' : '500+',
                  detail: language === 'en' ? 'Executives transformed' : 'Ejecutivos transformados',
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="space-y-2"
                >
                  <div className="text-sm font-medium text-primary uppercase tracking-widest">
                    {item.label}
                  </div>
                  <div className="text-4xl lg:text-5xl font-playfair font-bold text-foreground">
                    {item.value}
                  </div>
                  <p className="text-foreground/70">
                    {item.detail}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Divider with accent */}
          <div className="flex items-center gap-4 pt-8">
            <div className="flex-grow h-px bg-gradient-to-r from-primary/30 via-primary/10 to-transparent" aria-hidden="true" />
            <div className="w-2 h-2 rounded-full bg-primary" aria-hidden="true" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
