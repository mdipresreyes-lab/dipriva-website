import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { t } from '@/i18n/translations';
import Clarity from '@microsoft/clarity';

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
  const acceptBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const hasConsent = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (!hasConsent) {
      setShowBanner(true);
    } else if (hasConsent === 'accepted') {
      loadAnalytics();
    }
  }, []);

  // Move focus to Accept button when banner appears
  useEffect(() => {
    if (showBanner) {
      acceptBtnRef.current?.focus();
    }
  }, [showBanner]);

  // Dismiss on Escape key
  useEffect(() => {
    if (!showBanner) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleReject();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [showBanner]);

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
    const clarityId = import.meta.env.VITE_CLARITY_ID;
    if (clarityId) {
      try {
        Clarity.init(clarityId);
        Clarity.consentV2({ ad_Storage: 'granted', analytics_Storage: 'granted' });
      } catch (error) {
        console.warn('Failed to initialize Clarity:', error);
      }
    }

    const gaScript = document.createElement('script');
    gaScript.async = true;
    gaScript.src = `https://www.googletagmanager.com/gtag/js?id=${GA4_ID}`;
    document.head.appendChild(gaScript);

    window.dataLayer = window.dataLayer || [];
    const gtag = (...args: any[]) => {
      window.dataLayer.push(args);
    };
    window.gtag = gtag;

    gtag('js', new Date());
    gtag('config', GA4_ID);
  };

  return (
    <AnimatePresence>
      {showBanner && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="fixed top-12 left-0 right-0 z-50 p-4 sm:p-6"
          role="alertdialog"
          aria-labelledby="cookie-banner-title"
          aria-describedby="cookie-banner-desc"
        >
          <div className="max-w-2xl mx-auto bg-charcoal/95 backdrop-blur-md border border-silver/20 rounded-lg p-6 shadow-lg">
            <p id="cookie-banner-title" className="sr-only">Cookie preferences</p>
            <p id="cookie-banner-desc" className="text-silver/80 text-sm mb-4">
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
                ref={acceptBtnRef}
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
