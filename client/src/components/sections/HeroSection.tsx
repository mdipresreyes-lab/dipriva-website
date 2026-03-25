import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ChevronDown } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { t } from '@/i18n/translations';

const HERO_TEXTURE = 'https://d2xsxph8kpxj0f.cloudfront.net/310519663453268811/gB77xUunk9zzj5LPxbmUtZ/texture-hero-obsidian-silver-H8EKwvoAnF5MzujnTdgUT4.webp';
// {{MS365_BOOKINGS_URL}}
const MS365_BOOKINGS_URL = 'https://outlook.office.com/bookwithme/user/df9f836ac682468ab12b1891f552c6d6@dipriva.com/meetingtype/6UWVEWsqzk-ufJSvC0xFfA2?anonymous&ep=mlink';

export default function HeroSection() {
  const { language } = useLanguage();
  const scrollToServices = () => {
    const servicesSection = document.getElementById('services');
    servicesSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative w-full h-screen flex items-center justify-center overflow-hidden bg-obsidian">
      {/* Background texture overlay */}
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage: `url(${HERO_TEXTURE})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
        role="img"
        aria-label="Abstract obsidian and silver 3D texture representing operational clarity and strategic consulting excellence"
      />

      {/* Dark overlay for text legibility */}
      <div className="absolute inset-0 bg-gradient-to-b from-obsidian/50 via-obsidian/30 to-obsidian/70" aria-hidden="true" />

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-playfair font-bold text-silver mb-6 leading-tight" style={{ letterSpacing: '0.18em' }} role="heading" aria-level={1}>
            {t('hero.headline', language)}
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <p className="text-lg sm:text-xl text-silver/80 mb-12 max-w-2xl mx-auto" style={{ lineHeight: '1.6' }}>
            {t('hero.subheadline', language)}
          </p>
        </motion.div>


      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <ChevronDown className="w-6 h-6 text-gold" />
      </motion.div>
    </section>
  );
}
