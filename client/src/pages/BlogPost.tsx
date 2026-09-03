import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'wouter';
import { motion } from 'framer-motion';
import { ArrowLeft, ExternalLink, Mail, Link2, Check } from 'lucide-react';
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
  const [copied, setCopied] = useState(false);
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

            {/* Share row */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.35 }}
              className="mt-16 pt-8 flex flex-wrap items-center gap-3"
              style={{ borderTop: '1px solid rgba(47,64,89,0.15)' }}
            >
              <span className="text-xs tracking-luxury uppercase mr-1" style={{ color: 'rgba(47,64,89,0.4)' }}>
                {language === 'es' ? 'Compartir' : 'Share'}
              </span>

              {/* LinkedIn */}
              <a
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(`https://www.dipriva.com/blog/${post.slug}`)}`}
                target="_blank" rel="noopener noreferrer"
                aria-label="Share on LinkedIn"
                className="flex items-center justify-center w-8 h-8 rounded-full transition-colors"
                style={{ border: '1px solid rgba(47,64,89,0.2)', color: 'rgba(47,64,89,0.55)' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = '#D4AF37'; (e.currentTarget as HTMLElement).style.borderColor = '#D4AF37'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'rgba(47,64,89,0.55)'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(47,64,89,0.2)'; }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>

              {/* X */}
              <a
                href={`https://x.com/intent/tweet?url=${encodeURIComponent(`https://www.dipriva.com/blog/${post.slug}`)}&text=${encodeURIComponent(post.title)}`}
                target="_blank" rel="noopener noreferrer"
                aria-label="Share on X"
                className="flex items-center justify-center w-8 h-8 rounded-full transition-colors"
                style={{ border: '1px solid rgba(47,64,89,0.2)', color: 'rgba(47,64,89,0.55)' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = '#D4AF37'; (e.currentTarget as HTMLElement).style.borderColor = '#D4AF37'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'rgba(47,64,89,0.55)'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(47,64,89,0.2)'; }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>

              {/* Facebook */}
              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(`https://www.dipriva.com/blog/${post.slug}`)}`}
                target="_blank" rel="noopener noreferrer"
                aria-label="Share on Facebook"
                className="flex items-center justify-center w-8 h-8 rounded-full transition-colors"
                style={{ border: '1px solid rgba(47,64,89,0.2)', color: 'rgba(47,64,89,0.55)' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = '#D4AF37'; (e.currentTarget as HTMLElement).style.borderColor = '#D4AF37'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'rgba(47,64,89,0.55)'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(47,64,89,0.2)'; }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>

              {/* Email */}
              <a
                href={`mailto:?subject=${encodeURIComponent(post.title)}&body=${encodeURIComponent(`I thought you'd find this interesting: https://www.dipriva.com/blog/${post.slug}`)}`}
                aria-label="Share via Email"
                className="flex items-center justify-center w-8 h-8 rounded-full transition-colors"
                style={{ border: '1px solid rgba(47,64,89,0.2)', color: 'rgba(47,64,89,0.55)' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = '#D4AF37'; (e.currentTarget as HTMLElement).style.borderColor = '#D4AF37'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'rgba(47,64,89,0.55)'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(47,64,89,0.2)'; }}
              >
                <Mail className="w-3.5 h-3.5" />
              </a>

              {/* Copy link */}
              <button
                onClick={() => {
                  navigator.clipboard.writeText(`https://www.dipriva.com/blog/${post.slug}`);
                  setCopied(true);
                  setTimeout(() => setCopied(false), 2000);
                }}
                aria-label="Copy link"
                className="flex items-center justify-center w-8 h-8 rounded-full transition-colors"
                style={{ border: '1px solid rgba(47,64,89,0.2)', color: copied ? '#D4AF37' : 'rgba(47,64,89,0.55)', borderColor: copied ? '#D4AF37' : 'rgba(47,64,89,0.2)' }}
                onMouseEnter={e => { if (!copied) { (e.currentTarget as HTMLElement).style.color = '#D4AF37'; (e.currentTarget as HTMLElement).style.borderColor = '#D4AF37'; } }}
                onMouseLeave={e => { if (!copied) { (e.currentTarget as HTMLElement).style.color = 'rgba(47,64,89,0.55)'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(47,64,89,0.2)'; } }}
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Link2 className="w-3.5 h-3.5" />}
              </button>
            </motion.div>

            {/* Bottom back link */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.4 }}
              className="mt-8"
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
