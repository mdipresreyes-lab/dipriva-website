import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { t } from '@/i18n/translations';

export default function AboutSection() {
  const { language } = useLanguage();
  return (
    <section
      id="about"
      className="relative bg-obsidian overflow-hidden px-4 sm:px-6 lg:px-8"
      style={{ paddingTop: '160px', paddingBottom: '160px' }}
    >
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl sm:text-5xl font-playfair font-bold text-silver mb-8" style={{ letterSpacing: '0.18em' }} role="heading" aria-level={2}>
            {t('about.title', language)}
          </h2>

          <p className="text-lg text-silver/80" style={{ lineHeight: '1.6' }}>
            {t('about.description', language)}
          </p>
        </motion.div>
      </div>


    </section>
  );
}
