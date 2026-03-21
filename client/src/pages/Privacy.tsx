import { motion } from 'framer-motion';
import { useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { t } from '@/i18n/translations';

export default function Privacy() {
  const { language } = useLanguage();
  const [, setLocation] = useLocation();

  const privacyData = t('privacy', language) as any;

  return (
    <div className="min-h-screen bg-obsidian text-silver">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-40 bg-obsidian/80 backdrop-blur-md border-b border-silver/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <button
            onClick={() => setLocation('/')}
            className="text-silver hover:text-gold transition-colors"
          >
            {privacyData.backToHome}
          </button>
          <h1 className="text-lg font-playfair font-bold" style={{ letterSpacing: '0.05em' }}>
            {privacyData.title}
          </h1>
          <div className="w-24" />
        </div>
      </nav>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24 mt-16"
      >
        <div className="space-y-8">
          {/* Header */}
          <div className="mb-12">
            <h1
              className="text-4xl sm:text-5xl font-playfair font-bold text-silver mb-4"
              style={{ letterSpacing: '0.18em' }}
            >
              {privacyData.title}
            </h1>
            <p className="text-silver/60">{privacyData.lastUpdated}</p>
          </div>

          {/* Data Collection */}
          <section>
            <h2
              className="text-2xl font-playfair font-bold text-silver mb-4"
              style={{ letterSpacing: '0.13em' }}
            >
              {privacyData.sections.dataCollection.title}
            </h2>
            <p className="text-silver/80 mb-4" style={{ lineHeight: '1.6' }}>
              {privacyData.sections.dataCollection.content}
            </p>
            <ul className="list-disc list-inside space-y-2 text-silver/80 ml-4" style={{ lineHeight: '1.6' }}>
              {privacyData.sections.dataCollection.items.map((item: string, idx: number) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </section>

          {/* Data Storage */}
          <section>
            <h2
              className="text-2xl font-playfair font-bold text-silver mb-4"
              style={{ letterSpacing: '0.13em' }}
            >
              {privacyData.sections.dataStorage.title}
            </h2>
            <p className="text-silver/80" style={{ lineHeight: '1.6' }}>
              {privacyData.sections.dataStorage.content}
            </p>
            <ul className="list-disc list-inside space-y-2 text-silver/80 ml-4 mt-3" style={{ lineHeight: '1.6' }}>
              {privacyData.sections.dataStorage.items.map((item: string, idx: number) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </section>

          {/* Data Usage */}
          <section>
            <h2
              className="text-2xl font-playfair font-bold text-silver mb-4"
              style={{ letterSpacing: '0.13em' }}
            >
              {privacyData.sections.dataUsage.title}
            </h2>
            <p className="text-silver/80" style={{ lineHeight: '1.6' }}>
              {privacyData.sections.dataUsage.content}
            </p>
            <ul className="list-disc list-inside space-y-2 text-silver/80 ml-4 mt-3" style={{ lineHeight: '1.6' }}>
              {privacyData.sections.dataUsage.items.map((item: string, idx: number) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </section>

          {/* Data Protection */}
          <section>
            <h2
              className="text-2xl font-playfair font-bold text-silver mb-4"
              style={{ letterSpacing: '0.13em' }}
            >
              {privacyData.sections.dataProtection.title}
            </h2>
            <p className="text-silver/80" style={{ lineHeight: '1.6' }}>
              {privacyData.sections.dataProtection.content}
            </p>
          </section>

          {/* Analytics */}
          <section>
            <h2
              className="text-2xl font-playfair font-bold text-silver mb-4"
              style={{ letterSpacing: '0.13em' }}
            >
              {privacyData.sections.analytics.title}
            </h2>
            <p className="text-silver/80 mb-4" style={{ lineHeight: '1.6' }}>
              {privacyData.sections.analytics.intro}
            </p>
            <p className="text-silver/80 mb-4" style={{ lineHeight: '1.6' }}>
              {privacyData.sections.analytics.usage}
            </p>
            <p className="text-silver/80 mb-4" style={{ lineHeight: '1.6' }}>
              {privacyData.sections.analytics.transfer}{' '}
              <a href={privacyData.sections.analytics.googlePrivacy} target="_blank" rel="noopener noreferrer" className="text-gold hover:text-gold/80 transition-colors">
                {privacyData.sections.analytics.googlePrivacy}
              </a>
              .
            </p>
            <p className="text-silver/80 mb-4" style={{ lineHeight: '1.6' }}>
              {privacyData.sections.analytics.optOut}{' '}
              <a href={privacyData.sections.analytics.optOutUrl} target="_blank" rel="noopener noreferrer" className="text-gold hover:text-gold/80 transition-colors">
                {privacyData.sections.analytics.optOutUrl}
              </a>
              .
            </p>
            <p className="text-silver/80" style={{ lineHeight: '1.6' }}>
              {privacyData.sections.analytics.remarketing}{' '}
              <a href={privacyData.sections.analytics.naiUrl} target="_blank" rel="noopener noreferrer" className="text-gold hover:text-gold/80 transition-colors">
                {privacyData.sections.analytics.naiUrl}
              </a>
              .
            </p>
          </section>

          {/* Data Deletion */}
          <section>
            <h2
              className="text-2xl font-playfair font-bold text-silver mb-4"
              style={{ letterSpacing: '0.13em' }}
            >
              {privacyData.sections.dataDeletion.title}
            </h2>
            <p className="text-silver/80" style={{ lineHeight: '1.6' }}>
              {privacyData.sections.dataDeletion.content}
            </p>
            <p className="text-gold font-semibold mt-3">
              <a href={`mailto:${privacyData.sections.dataDeletion.email}`} className="hover:text-gold/80 transition-colors">
                {privacyData.sections.dataDeletion.email}
              </a>
            </p>
            <p className="text-silver/60 text-sm mt-3">
              {privacyData.sections.dataDeletion.note}
            </p>
          </section>

          {/* Contact */}
          <section>
            <h2
              className="text-2xl font-playfair font-bold text-silver mb-4"
              style={{ letterSpacing: '0.13em' }}
            >
              {privacyData.sections.questions.title}
            </h2>
            <p className="text-silver/80" style={{ lineHeight: '1.6' }}>
              {privacyData.sections.questions.content}{' '}
              <a href="mailto:manuel@dipriva.com" className="text-gold hover:text-gold/80 transition-colors">
                manuel@dipriva.com
              </a>
              .
            </p>
          </section>

          {/* Analytics */}
          <section>
            <h2
              className="text-2xl font-playfair font-bold text-silver mb-4"
              style={{ letterSpacing: '0.13em' }}
            >
              {privacyData.sections.analytics.title}
            </h2>
            <p className="text-silver/80 mb-4" style={{ lineHeight: '1.6' }}>
              {privacyData.sections.analytics.intro}
            </p>
            <p className="text-silver/80 mb-4" style={{ lineHeight: '1.6' }}>
              {privacyData.sections.analytics.usage}
            </p>
            <p className="text-silver/80 mb-4" style={{ lineHeight: '1.6' }}>
              {privacyData.sections.analytics.transfer}{' '}
              <a href={privacyData.sections.analytics.googlePrivacy} target="_blank" rel="noopener noreferrer" className="text-gold hover:text-gold/80 transition-colors">
                {privacyData.sections.analytics.googlePrivacy}
              </a>
              .
            </p>
            <p className="text-silver/80 mb-4" style={{ lineHeight: '1.6' }}>
              {privacyData.sections.analytics.optOut}{' '}
              <a href={privacyData.sections.analytics.optOutUrl} target="_blank" rel="noopener noreferrer" className="text-gold hover:text-gold/80 transition-colors">
                {privacyData.sections.analytics.optOutUrl}
              </a>
              .
            </p>
            <p className="text-silver/80" style={{ lineHeight: '1.6' }}>
              {privacyData.sections.analytics.remarketing}{' '}
              <a href={privacyData.sections.analytics.naiUrl} target="_blank" rel="noopener noreferrer" className="text-gold hover:text-gold/80 transition-colors">
                {privacyData.sections.analytics.naiUrl}
              </a>
              .
            </p>
          </section>

          {/* Footer CTA */}
          <div className="mt-16 pt-12 border-t border-silver/10">
            <Button
              onClick={() => setLocation('/')}
              className="px-8 py-3 bg-gold text-obsidian font-semibold hover:bg-gold/90 transition-all duration-300 rounded-lg"
            >
              {t('notFound.cta', language)}
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
