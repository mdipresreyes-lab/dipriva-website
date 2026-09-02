import { useEffect, useState } from 'react';
import { useLocation } from 'wouter';
import { motion } from 'framer-motion';
import { LanguageToggle } from '@/components/LanguageToggle';
import FooterSection from '@/components/sections/FooterSection';
import { publishedPosts } from '@/lib/blog';
import { useLanguage } from '@/contexts/LanguageContext';
import { t } from '@/i18n/translations';
import { ArrowRight } from 'lucide-react';

const CLUSTER_COLORS: Record<string, string> = {
  'Corporate Strategy': 'text-gold border-gold/40',
  'Startup Operations': 'text-gold border-gold/40',
  'AI and Automation': 'text-gold border-gold/40',
};

function clusterClass(cluster: string): string {
  return CLUSTER_COLORS[cluster] ?? 'text-gold border-gold/40';
}

export default function Blog() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [, setLocation] = useLocation();
  const { language } = useLanguage();

  useEffect(() => {
    window.scrollTo(0, 0);
    const prev = document.title;
    document.title = 'Insights | Dipriva';
    return () => { document.title = prev; };
  }, []);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="min-h-screen bg-obsidian text-silver overflow-x-hidden">
      {/* Nav */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-obsidian/95 backdrop-blur-md border-b border-silver/10'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <a
            href="/"
            onClick={(e) => { e.preventDefault(); setLocation('/'); }}
            className="text-2xl font-playfair font-bold tracking-luxury text-silver hover:text-gold transition-colors cursor-pointer"
          >
            Dipriva
          </a>
          <div className="flex items-center gap-6">
            <a href="/" className="hidden md:block transition-colors text-sm" style={{ color: 'rgba(47,64,89,0.6)' }}>
              {language === 'en' ? 'Home' : 'Inicio'}
            </a>
            <div className="border-l border-silver/20 pl-6">
              <LanguageToggle />
            </div>
          </div>
        </div>
      </nav>

      <main className="pt-24">
        {/* Header */}
        <section className="py-16 sm:py-24 border-b border-silver/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <p className="text-sm tracking-luxury uppercase mb-4" style={{ color: '#D4AF37' }}>{t('blog.sectionLabel', language)}</p>
              <h1
                className="text-4xl sm:text-5xl lg:text-6xl font-playfair font-bold"
                style={{ letterSpacing: '0.13em', color: '#2F4059' }}
              >
                {t('blog.headline', language)}
              </h1>
              <p className="mt-6 text-lg max-w-2xl leading-relaxed" style={{ color: 'rgba(47,64,89,0.65)' }}>
                {t('blog.subheadline', language)}
              </p>
            </motion.div>
          </div>
        </section>

        {/* Post grid */}
        <section className="py-16 sm:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {publishedPosts.length === 0 ? (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-lg"
                style={{ color: 'rgba(47,64,89,0.4)' }}
              >
                {t('blog.noPosts', language)}
              </motion.p>
            ) : (
              <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {publishedPosts.map((post, i) => (
                  <motion.article
                    key={post.slug}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: i * 0.08 }}
                    className="group flex flex-col bg-charcoal border border-silver/10 rounded-xl p-6 hover:border-silver/20 transition-all duration-300 cursor-pointer"
                    onClick={() => setLocation(`/blog/${post.slug}`)}
                  >
                    {/* Cluster badge */}
                    {post.cluster && (
                      <span
                        className="self-start text-xs tracking-luxury uppercase border rounded-full px-3 py-1 mb-4"
                        style={{ color: '#D4AF37', borderColor: 'rgba(212,175,55,0.45)' }}
                      >
                        {post.cluster}
                      </span>
                    )}

                    {/* Title */}
                    <h2 className="font-playfair font-bold text-silver text-xl leading-snug mb-3 group-hover:text-gold transition-colors duration-300" style={{ letterSpacing: '0.05em' }}>
                      {post.title}
                    </h2>

                    {/* Description */}
                    <p className="text-silver/60 text-sm leading-relaxed flex-1 mb-6">
                      {post.description}
                    </p>

                    {/* Footer: date + read link */}
                    <div className="flex items-center justify-between mt-auto pt-4 border-t border-silver/10">
                      {post.formattedDate ? (
                        <time className="text-silver/40 text-xs" dateTime={post.date ?? ''}>
                          {post.formattedDate}
                        </time>
                      ) : (
                        <span />
                      )}
                      <span
                        className="flex items-center gap-1 text-xs group-hover:gap-2 transition-all duration-200"
                        style={{ color: '#D4AF37' }}
                      >
                        {t('blog.readMore', language)} <ArrowRight className="w-3 h-3" />
                      </span>
                    </div>
                  </motion.article>
                ))}
              </div>
            )}
          </div>
        </section>

        <FooterSection />
      </main>
    </div>
  );
}
