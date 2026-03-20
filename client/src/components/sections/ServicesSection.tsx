import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Zap, Lightbulb, Cog } from 'lucide-react';

const TEXTURE_1 = 'https://d2xsxph8kpxj0f.cloudfront.net/310519663453268811/gB77xUunk9zzj5LPxbmUtZ/texture-negative-space-1-Bgmb584PkUojdeYKQ4rVPd.webp';
const TEXTURE_2 = 'https://d2xsxph8kpxj0f.cloudfront.net/310519663453268811/gB77xUunk9zzj5LPxbmUtZ/texture-negative-space-2-GMkdGyi6hPe7hWvmPo2FZV.webp';

interface ServiceCard {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  texture: string;
}

const services: ServiceCard[] = [
  {
    id: 'corporate-strategy',
    title: 'Corporate Strategy',
    description: 'Navigate complexity. Unlock competitive advantage. We architect strategies that scale.',
    icon: <Lightbulb className="w-8 h-8" />,
    texture: TEXTURE_1,
  },
  {
    id: 'startup-operations',
    title: 'Startup Operations',
    description: 'Build operational foundations. From chaos to clarity. Systems that accelerate growth.',
    icon: <Zap className="w-8 h-8" />,
    texture: TEXTURE_2,
  },
  {
    id: 'ai-automation',
    title: 'AI and Automation',
    description: 'Leverage artificial intelligence to amplify human capability. Workflows reimagined.',
    icon: <Cog className="w-8 h-8" />,
    texture: TEXTURE_1,
  },
];

const ServiceCardComponent = ({ service, index }: { service: ServiceCard; index: number }) => {
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
      initial={{ opacity: 0, y: 20 }}
      animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group relative h-80 rounded-glass overflow-hidden border border-silver/20 backdrop-blur-md bg-charcoal/40 hover:border-gold/50 transition-all duration-300 hover:shadow-glass-hover cursor-pointer"
    >
      {/* Background texture */}
      <div
        className="absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity duration-300"
        style={{
          backgroundImage: `url(${service.texture})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-obsidian/20 to-obsidian/40" />

      {/* Content */}
      <div className="relative z-10 p-8 h-full flex flex-col justify-between">
        <div>
          <div className="mb-4 text-gold group-hover:scale-110 transition-transform duration-300">
            {service.icon}
          </div>
          <h3 className="text-2xl font-playfair font-bold tracking-luxury text-silver mb-3">
            {service.title}
          </h3>
        </div>

        <p className="text-silver/70 leading-luxury text-sm group-hover:text-silver/90 transition-colors">
          {service.description}
        </p>
      </div>

      {/* Glow effect on hover */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-glass shadow-glow" />
    </motion.div>
  );
};

export default function ServicesSection() {
  return (
    <section
      id="services"
      className="relative py-32 px-4 sm:px-6 lg:px-8 bg-obsidian overflow-hidden"
    >
      {/* Section padding */}
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-playfair font-bold tracking-luxury-plus text-silver mb-4">
            Strategic Services
          </h2>
          <p className="text-silver/60 text-lg leading-luxury max-w-2xl">
            Tailored solutions for operational excellence and sustainable growth.
          </p>
        </motion.div>

        {/* Bento Grid - 3 cards, max 2 visible in viewport */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <ServiceCardComponent key={service.id} service={service} index={index} />
          ))}
        </div>
      </div>

      {/* Decorative background elements */}
      <div className="absolute top-20 right-0 w-96 h-96 bg-gold/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-gold/5 rounded-full blur-3xl pointer-events-none" />
    </section>
  );
}
