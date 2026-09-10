import { useLanguage, type Language } from '@/contexts/LanguageContext';

export function LanguageToggle() {
  const { language, setLanguage } = useLanguage();

  const toggleLanguage = () => {
    const newLanguage: Language = language === 'en' ? 'es' : 'en';
    setLanguage(newLanguage);
  };

  return (
    <button
      onClick={toggleLanguage}
      className="text-silver/80 hover:text-gold transition-colors font-semibold text-sm"
      aria-label={language === 'en' ? 'ES — Switch to Spanish' : 'EN — Switch to English'}
    >
      {language === 'en' ? 'ES' : 'EN'}
    </button>
  );
}
