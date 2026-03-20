import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';

// Extend window type for dataLayer and gtag
declare global {
  interface Window {
    dataLayer: any[];
    gtag?: (...args: any[]) => void;
  }
}

const COOKIE_CONSENT_KEY = 'dipriva-cookie-consent';

export function CookieConsentBanner() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    // Check if user has already given consent
    const hasConsent = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (!hasConsent) {
      setShowBanner(true);
    } else {
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
    // Load GA4
    if (import.meta.env.VITE_GA4_ID) {
      const gaScript = document.createElement('script');
      gaScript.async = true;
      gaScript.src = `https://www.googletagmanager.com/gtag/js?id=${import.meta.env.VITE_GA4_ID}`;
      document.head.appendChild(gaScript);

      window.dataLayer = window.dataLayer || [];
      const gtag = (...args: any[]) => {
        window.dataLayer.push(args);
      };
      gtag('js', new Date());
      gtag('config', import.meta.env.VITE_GA4_ID);
    }

    // Load Microsoft Clarity
    if (import.meta.env.VITE_CLARITY_ID) {
      const clarityScript = document.createElement('script');
      clarityScript.type = 'text/javascript';
      clarityScript.async = true;
      clarityScript.src = `https://www.clarity.ms/tag/${import.meta.env.VITE_CLARITY_ID}`;
      document.head.appendChild(clarityScript);
    }
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
            <p className="text-silver/80 text-sm sm:text-base mb-4" style={{ lineHeight: '1.6' }}>
              We use Google Analytics and Microsoft Clarity to understand how you interact with our site. These tools help us improve your experience. Your consent is optional and can be withdrawn anytime.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:justify-end">
              <Button
                variant="outline"
                onClick={handleReject}
                className="text-silver border-silver/30 hover:bg-silver/10"
              >
                Reject
              </Button>
              <Button
                onClick={handleAccept}
                className="bg-gold text-obsidian hover:bg-gold/90"
              >
                Accept
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
