import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { t } from '@/i18n/translations';
import { useLocation } from 'wouter';
import Clarity from '@microsoft/clarity';

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
          <button
            onClick={() => {
              try {
                Clarity.event('cta_click');
              } catch (error) {
                console.warn('Failed to track CTA click:', error);
              }
              navigate('/schedule');
            }}
            className="text-gold font-semibold hover:text-gold/80 transition-colors underline decoration-gold hover:decoration-gold/80 cursor-pointer text-lg"
          >
            {t('cta.button', language) || 'Schedule Your Session'}
          </button>
        </motion.div>
      </div>
    </section>
  );
}
