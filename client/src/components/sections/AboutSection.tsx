import { motion } from 'framer-motion';

export default function AboutSection() {
  return (
    <section
      id="about"
      className="relative bg-obsidian overflow-hidden px-4 sm:px-6 lg:px-8"
      style={{ paddingTop: '160px', paddingBottom: '160px' }}
    >
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl sm:text-5xl font-playfair font-bold text-silver mb-8" style={{ letterSpacing: '0.18em' }}>
            About Dipriva
          </h2>

          <div className="space-y-6 text-lg text-silver/80" style={{ lineHeight: '1.6' }}>
            <p>
              We partner with growth-oriented businesses to architect operational clarity. Corporate strategy, startup operations, and AI-driven automation—translating complexity into competitive advantage.
            </p>

            <p>
              Direct approach. Diagnose root causes, design scalable systems, execute with precision. Strategic clarity that drives measurable results.
            </p>

            <p className="text-gold font-semibold">
              Dipriva. Strategic clarity for businesses built to grow.
            </p>
          </div>
        </motion.div>
      </div>


    </section>
  );
}
