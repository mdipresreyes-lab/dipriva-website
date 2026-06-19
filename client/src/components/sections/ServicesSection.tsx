import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Lightbulb, Zap, Cog, ArrowRight } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { t } from '@/i18n/translations';

interface ServiceCard {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  details: string[];
}

const ServiceCardComponent = ({ service, index }: { service: ServiceCard; index: number }) => {
  const { language } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.2 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      className="group relative"
    >
      {/* Card container */}
      <div className="relative p-8 lg:p-10 rounded-2xl border border-primary/15 bg-white hover:bg-white/80 transition-all duration-300 shadow-sm hover:shadow-xl overflow-hidden">
        {/* Gradient accent background */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/3 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" aria-hidden="true" />

        {/* Top accent line */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-primary/50 to-transparent" aria-hidden="true" />

        {/* Content */}
        <div className="relative z-10 space-y-6">
          {/* Icon */}
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-lg bg-primary/10 group-hover:bg-primary/15 transition-colors duration-300">
            <div className="text-primary group-hover:scale-110 transition-transform duration-300">
              {service.icon}
            </div>
          </div>

          {/* Title */}
          <div>
            <h3 className="text-2xl lg:text-3xl font-playfair font-bold text-foreground mb-3">
              {service.title}
            </h3>
            <p className="text-foreground/70 text-lg leading-relaxed">
              {service.description}
            </p>
          </div>

          {/* Details list */}
          <div className="space-y-3 pt-2">
            {service.details.map((detail, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" aria-hidden="true" />
                <span className="text-foreground/70 text-sm leading-relaxed">{detail}</span>
              </div>
            ))}
          </div>

          {/* CTA link */}
          <div className="pt-4 border-t border-primary/10">
            <a href="#cta" className="inline-flex items-center gap-2 text-primary font-medium hover:gap-3 transition-all duration-300 group/link">
              <span>{language === 'en' ? 'Contact us to learn what this means for your business' : 'Contáctenos para saber lo que esto significa para su negocio'}</span>
              <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default function ServicesSection() {
  const { language } = useLanguage();

  const services: ServiceCard[] = [
    {
      id: 'corporate-strategy',
      title: t('services.card1.title', language),
      description: t('services.card1.description', language),
      icon: <Lightbulb className="w-6 h-6" />,
      details: [
        language === 'en' ? 'Strategic decision architecture' : 'Arquitectura de decisiones estratégicas',
        language === 'en' ? 'Competitive positioning' : 'Posicionamiento competitivo',
        language === 'en' ? 'Execution roadmaps' : 'Mapas de ejecución',
      ],
    },
    {
      id: 'startup-operations',
      title: t('services.card2.title', language),
      description: t('services.card2.description', language),
      icon: <Zap className="w-6 h-6" />,
      details: [
        language === 'en' ? 'Operational infrastructure' : 'Infraestructura operacional',
        language === 'en' ? 'Process documentation' : 'Documentación de procesos',
        language === 'en' ? 'Team scaling systems' : 'Sistemas de escalamiento de equipos',
      ],
    },
    {
      id: 'ai-automation',
      title: t('services.card3.title', language),
      description: t('services.card3.description', language),
      icon: <Cog className="w-6 h-6" />,
      details: [
        language === 'en' ? 'Workflow automation' : 'Automatización de flujos de trabajo',
        language === 'en' ? 'AI integration' : 'Integración de IA',
        language === 'en' ? 'Efficiency optimization' : 'Optimización de eficiencia',
      ],
    },
  ];

  return (
    <section
      id="services"
      className="relative bg-background overflow-hidden px-4 sm:px-6 lg:px-12"
      style={{ paddingTop: '120px', paddingBottom: '120px' }}
    >
      {/* Background accents */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-0 w-96 h-96 bg-primary/3 rounded-full blur-3xl" aria-hidden="true" />
        <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-primary/2 rounded-full blur-3xl" aria-hidden="true" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          {/* Overline */}
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-0.5 bg-primary" aria-hidden="true" />
            <span className="text-sm font-medium text-primary tracking-widest uppercase">
              {language === 'en' ? 'Our Services' : 'Nuestros Servicios'}
            </span>
          </div>

          {/* Title and description */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            <h2 
              className="text-5xl sm:text-6xl lg:text-7xl font-playfair font-bold text-foreground leading-tight"
              style={{ letterSpacing: '0.02em' }}
              role="heading"
              aria-level={2}
            >
              {t('services.title', language)}
            </h2>
            <p className="text-lg text-foreground/70 leading-relaxed pt-2">
              {t('services.description', language)}
            </p>
          </div>
        </motion.div>

        {/* Service cards grid - 3 columns with responsive layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {services.map((service, index) => (
            <ServiceCardComponent key={service.id} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
