import { motion } from 'framer-motion';
import { useLocation } from 'wouter';
import { Button } from '@/components/ui/button';

export default function Privacy() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen bg-obsidian text-silver">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-40 bg-obsidian/80 backdrop-blur-md border-b border-silver/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <button
            onClick={() => setLocation('/')}
            className="text-silver hover:text-gold transition-colors"
          >
            ← Back to Home
          </button>
          <h1 className="text-lg font-playfair font-bold" style={{ letterSpacing: '0.05em' }}>
            Privacy Policy
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
              Privacy Policy
            </h1>
            <p className="text-silver/60">Last updated: March 2026</p>
          </div>

          {/* Data Collection */}
          <section>
            <h2
              className="text-2xl font-playfair font-bold text-silver mb-4"
              style={{ letterSpacing: '0.13em' }}
            >
              Data Collection
            </h2>
            <p className="text-silver/80 mb-4" style={{ lineHeight: '1.6' }}>
              When you submit the contact form on our website, we collect the following information:
            </p>
            <ul className="list-disc list-inside space-y-2 text-silver/80 ml-4" style={{ lineHeight: '1.6' }}>
              <li>First Name</li>
              <li>Last Name</li>
              <li>Email Address</li>
              <li>Phone Number</li>
              <li>Business Challenge Description</li>
            </ul>
          </section>

          {/* Data Storage */}
          <section>
            <h2
              className="text-2xl font-playfair font-bold text-silver mb-4"
              style={{ letterSpacing: '0.13em' }}
            >
              Data Storage
            </h2>
            <p className="text-silver/80" style={{ lineHeight: '1.6' }}>
              Your submitted information is stored in two secure locations:
            </p>
            <ul className="list-disc list-inside space-y-2 text-silver/80 ml-4 mt-3" style={{ lineHeight: '1.6' }}>
              <li>
                <strong>GoHighLevel CRM:</strong> Primary storage for lead management and follow-up
              </li>
              <li>
                <strong>Supabase Database:</strong> Backup storage for redundancy and operational continuity
              </li>
            </ul>
          </section>

          {/* Data Usage */}
          <section>
            <h2
              className="text-2xl font-playfair font-bold text-silver mb-4"
              style={{ letterSpacing: '0.13em' }}
            >
              How We Use Your Data
            </h2>
            <p className="text-silver/80" style={{ lineHeight: '1.6' }}>
              We use the information you provide solely to:
            </p>
            <ul className="list-disc list-inside space-y-2 text-silver/80 ml-4 mt-3" style={{ lineHeight: '1.6' }}>
              <li>Contact you to schedule a strategy session</li>
              <li>Understand your business challenges and needs</li>
              <li>Provide tailored consulting recommendations</li>
              <li>Follow up on your inquiry</li>
            </ul>
          </section>

          {/* Data Protection */}
          <section>
            <h2
              className="text-2xl font-playfair font-bold text-silver mb-4"
              style={{ letterSpacing: '0.13em' }}
            >
              Data Protection
            </h2>
            <p className="text-silver/80" style={{ lineHeight: '1.6' }}>
              Your data is never sold to third parties. We do not share your information with external organizations or data brokers. Your privacy is our priority.
            </p>
          </section>

          {/* Data Deletion */}
          <section>
            <h2
              className="text-2xl font-playfair font-bold text-silver mb-4"
              style={{ letterSpacing: '0.13em' }}
            >
              Data Deletion Requests
            </h2>
            <p className="text-silver/80" style={{ lineHeight: '1.6' }}>
              If you wish to request deletion of your personal data, please contact us at:
            </p>
            <p className="text-gold font-semibold mt-3">
              <a href="mailto:manuel@dipriva.com" className="hover:text-gold/80 transition-colors">
                manuel@dipriva.com
              </a>
            </p>
            <p className="text-silver/60 text-sm mt-3">
              We will process deletion requests within 30 days.
            </p>
          </section>

          {/* Contact */}
          <section>
            <h2
              className="text-2xl font-playfair font-bold text-silver mb-4"
              style={{ letterSpacing: '0.13em' }}
            >
              Questions?
            </h2>
            <p className="text-silver/80" style={{ lineHeight: '1.6' }}>
              If you have any questions about this privacy policy or our data practices, please reach out to us at{' '}
              <a href="mailto:manuel@dipriva.com" className="text-gold hover:text-gold/80 transition-colors">
                manuel@dipriva.com
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
              Return to Home
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
