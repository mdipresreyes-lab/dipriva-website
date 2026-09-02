import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'wouter';
import { motion } from 'framer-motion';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import { LanguageToggle } from '@/components/LanguageToggle';
import FooterSection from '@/components/sections/FooterSection';
import NotFound from '@/pages/NotFound';
import { getPostBySlug } from '@/lib/blog';
import { useLanguage } from '@/contexts/LanguageContext';
import { t } from '@/i18n/translations';

const CLUSTER_COLORS: Record<string, string> = {
  'Corporate Strategy': 'text-gold border-gold/40',
  'Startup Operations': 'text-gold border-gold/40',
  'AI and Automation': 'text-gold border-gold/40',
};

function clusterClass(cluster: string): string {
  return CLUSTER_COLORS[cluster] ?? 'text-gold border-gold/40';
}

// Imperatively set/restore a <meta> tag in <head>.
function setMeta(selector: string, attr: string, value: string): () => void {
  let el = document.querySelector(selector) as HTMLMetaElement | null;
  const created = !el;
  if (!el) {
    el = document.createElement('meta');
    document.head.appendChild(el);
  }
  const prev = el.getAttribute(attr) ?? '';
  el.setAttribute(attr, value);
  const captured = el;
  return () => {
    if (created) {
      captured.remove();
    } else {
      captured.setAttribute(attr, prev);
    }
  };
}

export default function BlogPost() {
  const params = useParams<{ slug: string }>();
  const [isScrolled, setIsScrolled] = useState(false);
  const [, setLocation] = useLocation();
  const { language } = useLanguage();

  const post = getPostBySlug(params.slug ?? '');
  const visible = post?.published === true;

  useEffect(() => {
    if (!visible || !post) return;
    window.scrollTo(0, 0);

    const prevTitle = document.title;
    document.title = `${post.title} | Dipriva`;

    const cleanups = [
      setMeta('meta[name="description"]', 'content', post.description),
      setMeta('meta[property="og:title"]', 'content', post.title),
      setMeta('meta[property="og:description"]', 'content', post.description),
      setMeta('meta[property="og:type"]', 'content', 'article'),
    ];

    // Ensure og:title/description/type have the right property attribute
    ['og:title', 'og:description', 'og:type'].forEach(prop => {
      const el = document.querySelector(`meta[property="${prop}"]`);
      if (el && !el.getAttribute('property')) {
        el.setAttribute('property', prop);
      }
    });

    return () => {
      document.title = prevTitle;
      cleanups.forEach(fn => fn());
    };
  }, [visible, post]);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Unknown slug or unpublished post → 404
  if (!post || !post.published) return <NotFound />;

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
            <a
              href="/blog"
              onClick={(e) => { e.preventDefault(); setLocation('/blog'); }}
              className="hidden md:block transition-colors text-sm"
              style={{ color: 'rgba(47,64,89,0.6)' }}
            >
              {t('blog.navLink', language)}
            </a>
            <div className="border-l border-silver/20 pl-6">
              <LanguageToggle />
            </div>
          </div>
        </div>
      </nav>

      <main className="pt-24">
        <article className="py-12 sm:py-20">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Back link */}
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
              className="mb-10"
            >
              <button
                onClick={() => setLocation('/blog')}
                className="flex items-center gap-2 transition-colors text-sm"
                style={{ color: 'rgba(47,64,89,0.55)' }}
                onMouseEnter={e => (e.currentTarget.style.color = '#D4AF37')}
                onMouseLeave={e => (e.currentTarget.style.color = 'rgba(47,64,89,0.55)')}
              >
                <ArrowLeft className="w-4 h-4" />
                {t('blog.backToInsights', language)}
              </button>
            </motion.div>

            {/* Post header */}
            <motion.header
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mb-12"
            >
              {/* Cluster badge */}
              {post.cluster && (
                <span
                  className="inline-block text-xs tracking-luxury uppercase border rounded-full px-3 py-1 mb-6"
                  style={{ color: '#D4AF37', borderColor: 'rgba(212,175,55,0.45)' }}
                >
                  {post.cluster}
                </span>
              )}

              {/* Title */}
              <h1
                className="font-playfair font-bold text-silver text-3xl sm:text-4xl lg:text-5xl leading-tight mb-6"
                style={{ letterSpacing: '0.05em' }}
              >
                {post.title}
              </h1>

              {/* Byline */}
              <div
                className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm pb-8"
                style={{ color: 'rgba(47,64,89,0.5)', borderBottom: '1px solid rgba(47,64,89,0.12)' }}
              >
                {post.author && <span>{post.author}</span>}
                {post.author && post.formattedDate && (
                  <span style={{ color: 'rgba(47,64,89,0.2)' }}>·</span>
                )}
                {post.formattedDate && (
                  <time dateTime={post.date ?? ''}>{post.formattedDate}</time>
                )}
                {/* Google Translate bridge — shown when UI is in Spanish; articles are English-only */}
                {language === 'es' && (
                  <>
                    <span style={{ color: 'rgba(47,64,89,0.2)' }}>·</span>
                    <a
                      href={`https://translate.google.com/translate?hl=es&sl=en&u=${encodeURIComponent(`https://www.dipriva.com/blog/${post.slug}`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 transition-colors"
                      style={{ color: '#D4AF37', fontSize: '0.8125rem' }}
                    >
                      {t('blog.translateLink', language)}
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </>
                )}
              </div>
            </motion.header>

            {/* Markdown body */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="blog-content"
              dangerouslySetInnerHTML={{ __html: post.html }}
            />

            {/* Bottom back link */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.4 }}
              className="mt-16 pt-8"
              style={{ borderTop: '1px solid rgba(47,64,89,0.15)' }}
            >
              <button
                onClick={() => setLocation('/blog')}
                className="flex items-center gap-2 transition-colors text-sm"
                style={{ color: 'rgba(47,64,89,0.55)' }}
                onMouseEnter={e => (e.currentTarget.style.color = '#D4AF37')}
                onMouseLeave={e => (e.currentTarget.style.color = 'rgba(47,64,89,0.55)')}
              >
                <ArrowLeft className="w-4 h-4" />
                {t('blog.backToInsights', language)}
              </button>
            </motion.div>
          </div>
        </article>

        <FooterSection />
      </main>
    </div>
  );
}
