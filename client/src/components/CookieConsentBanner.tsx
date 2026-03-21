import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { t } from '@/i18n/translations';

// Extend window type for dataLayer and gtag
declare global {
  interface Window {
    dataLayer: any[];
    gtag?: (...args: any[]) => void;
  }
}

const COOKIE_CONSENT_KEY = 'dipriva-cookie-consent';
const GA4_ID = 'G-GBW7DQ6T7V';

export function CookieConsentBanner() {
  const { language } = useLanguage();
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    // Check if user has already given consent
    const hasConsent = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (!hasConsent) {
      setShowBanner(true);
    } else if (hasConsent === 'accepted') {
      // Load analytics if consent was previously given
      loadAnalytics();
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem(COOKIE_CONSENT_KEY, 'accepted');
    setShowBanner(false);
    loadAnalytics();
  };

  const handleReject = () => {
    localStorage.setItem(COOKIE_CONSENT_KEY, 'rejected');
    setShowBanner(false);
  };

  const loadAnalytics = () => {
    // Load GA4 only after consent is given
    const gaScript = document.createElement('script');
    gaScript.async = true;
    gaScript.src = `https://www.googletagmanager.com/gtag/js?id=${GA4_ID}`;
    document.head.appendChild(gaScript);

    // Initialize dataLayer and gtag function
    window.dataLayer = window.dataLayer || [];
    const gtag = (...args: any[]) => {
      window.dataLayer.push(args);
    };
    window.gtag = gtag;

    // Initialize GA4
    gtag('js', new Date());
    gtag('config', GA4_ID);
  };

  return (
    <AnimatePresence>
      {showBanner && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-0 left-0 right-0 z-50 p-4 sm:p-6"
        >
          <div className="max-w-2xl mx-auto bg-charcoal/95 backdrop-blur-md border border-silver/20 rounded-lg p-6 shadow-lg">
            <p className="text-silver/80 text-sm mb-4">
              {t('cookie.message', language)}
            </p>
            <div className="flex gap-3">
              <Button
                onClick={handleReject}
                variant="outline"
                className="flex-1"
              >
                {t('cookie.reject', language)}
              </Button>
              <Button
                onClick={handleAccept}
                className="flex-1 bg-gold text-obsidian hover:bg-gold/90"
              >
                {t('cookie.accept', language)}
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
