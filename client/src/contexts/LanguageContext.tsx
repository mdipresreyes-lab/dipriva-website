import { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'en' | 'es';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => {
    // Initialize from localStorage or browser language
    if (typeof window !== 'undefined') {
      const storedLanguage = localStorage.getItem('preferredLanguage') as Language | null;
      if (storedLanguage) {
        return storedLanguage;
      }
      const browserLang = navigator.language.split('-')[0];
      if (browserLang === 'es') {
        return 'es';
      }
    }
    return 'en';
  });

  useEffect(() => {
    // Sync language to localStorage when it changes
    localStorage.setItem('preferredLanguage', language);
  }, [language]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);

    // Fire GA4 event for language toggle
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'language_toggle', {
        language: lang,
        previous_language: language,
      });
    }
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
}
