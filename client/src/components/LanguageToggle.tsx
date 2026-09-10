import { useLanguage, type Language } from '@/contexts/LanguageContext';

export function LanguageToggle() {
  const { language, setLanguage } = useLanguage();

  const toggleLanguage = () => {
    const newLanguage: Language = language === 'en' ? 'es' : 'en';
    setLanguage(newLanguage);
  };

  return (
    <>
      <button
        onClick={toggleLanguage}
        className="text-silver/80 hover:text-gold transition-colors font-semibold text-sm"
        aria-label={language === 'en' ? 'Switch to Spanish' : 'Switch to English'}
        aria-pressed={language === 'es'}
      >
        {language === 'en' ? 'ES' : 'EN'}
      </button>
      {/* Announces language change to screen readers */}
      <span role="status" aria-live="polite" className="sr-only">
        {language === 'en' ? 'Language: English' : 'Idioma: Español'}
      </span>
    </>
  );
}
