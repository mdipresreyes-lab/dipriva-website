import { motion } from 'framer-motion';

export default function AboutSection() {
  return (
    <section
      id="about"
      className="relative py-32 px-4 sm:px-6 lg:px-8 bg-obsidian overflow-hidden"
    >
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl sm:text-5xl font-playfair font-bold tracking-luxury-plus text-silver mb-8">
            About Dipriva
          </h2>

          <div className="space-y-6 text-lg leading-luxury text-silver/80">
            <p>
              Dipriva Consulting Group partners with growth-oriented businesses to architect operational clarity. We specialize in corporate strategy, startup operations, and AI-driven automation—translating complexity into competitive advantage.
            </p>

            <p>
              Our approach is direct. We diagnose root causes, design scalable systems, and execute with precision. No jargon. No filler. Just strategic clarity that drives measurable results.
            </p>

            <p>
              We work with operationally overwhelmed executives who understand that clarity is competitive advantage. They're sophisticated. They're time-constrained. They make decisions based on credibility signals and proven frameworks.
            </p>

            <p className="text-gold font-semibold">
              Dipriva. Strategic clarity for businesses built to grow.
            </p>
          </div>
        </motion.div>
      </div>

      {/* Decorative background */}
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-gold/5 rounded-full blur-3xl pointer-events-none" />
    </section>
  );
}
