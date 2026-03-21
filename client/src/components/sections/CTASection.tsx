import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { t } from '@/i18n/translations';
import { useLocation } from 'wouter';

export default function CTASection() {
  const { language } = useLanguage();
  const [, navigate] = useLocation();

  return (
    <section id="cta" className="relative py-20 px-4 sm:px-6 lg:px-8 bg-obsidian border-t border-silver/10">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl sm:text-5xl font-playfair font-bold text-silver mb-6">
            {t('cta.headline', language) || 'Ready to Transform Your Business?'}
          </h2>
          <p className="text-lg text-silver/80 mb-12 max-w-2xl mx-auto">
            {t('cta.subheadline', language) || 'Let\'s discuss how we can help you achieve operational clarity and sustainable growth.'}
          </p>
          <Button
            onClick={() => navigate('/schedule')}
            className="px-8 py-3 bg-gold text-obsidian font-semibold hover:bg-gold/90 transition-all rounded-lg shadow-lg hover:shadow-glow"
          >
            {t('cta.button', language) || 'Schedule Your Session'}
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
