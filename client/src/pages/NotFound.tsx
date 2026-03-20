import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useLocation } from "wouter";
import { useLanguage } from "@/contexts/LanguageContext";
import { t } from "@/i18n/translations";

export default function NotFound() {
  const { language } = useLanguage();
  const [, setLocation] = useLocation();

  const handleGoHome = () => {
    setLocation("/");
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-obsidian overflow-hidden">
      {/* Background texture overlay */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `radial-gradient(circle at 20% 50%, rgba(212, 212, 212, 0.1) 0%, transparent 50%),
                            radial-gradient(circle at 80% 80%, rgba(201, 169, 97, 0.05) 0%, transparent 50%)`,
        }}
      />

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
      >
        {/* 404 Number */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-8"
        >
          <h1
            className="text-9xl sm:text-[120px] font-playfair font-bold text-silver/30"
            style={{ letterSpacing: '0.18em', lineHeight: '1' }}
          >
            404
          </h1>
        </motion.div>

        {/* Headline */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-6"
        >
          <h2
            className="text-3xl sm:text-4xl font-playfair font-bold text-silver mb-4"
            style={{ letterSpacing: '0.18em' }}
            role="heading"
            aria-level={2}
          >
            {t('notFound.headline', language)}
          </h2>
          <p className="text-silver/60 text-lg" style={{ lineHeight: '1.6' }}>
            {t('notFound.description', language)}
          </p>
        </motion.div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12"
        >
          <Button
            onClick={handleGoHome}
            className="px-8 py-3 bg-gold text-obsidian font-semibold hover:bg-gold/90 transition-all duration-300 rounded-lg"
          >
            {t('notFound.cta', language)}
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
}
