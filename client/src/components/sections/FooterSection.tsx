import { Linkedin } from 'lucide-react';
import { useLocation } from 'wouter';

interface FooterSectionProps {}

type FooterSectionComponent = React.FC<FooterSectionProps> & {
  displayName?: string;
};

const FooterSectionComponent: FooterSectionComponent = () => {
  return (
    <footer className="bg-charcoal border-t border-silver/10 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-6">
          {/* Logo and domain */}
          <div className="flex flex-col items-center sm:items-start gap-2">
            <div className="text-2xl font-playfair font-bold tracking-luxury text-silver">
              Dipriva
            </div>
            <a
              href="https://www.dipriva.com"
              className="text-silver/60 hover:text-gold transition-colors text-sm"
            >
              www.dipriva.com
            </a>
          </div>

          {/* Links */}
          <div className="flex items-center gap-6">
            <a
              href="/privacy"
              className="text-silver/60 hover:text-gold transition-colors text-sm"
            >
              Privacy Policy
            </a>
            <a
              href="https://linkedin.com/company/dipriva"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-silver/60 hover:text-gold transition-colors"
            >
              <Linkedin className="w-5 h-5" />
              <span className="text-sm">LinkedIn</span>
            </a>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-8 border-t border-silver/10 text-center text-silver/40 text-sm">
          <p>&copy; {new Date().getFullYear()} Dipriva Consulting Group. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

FooterSectionComponent.displayName = 'FooterSection';
export default FooterSectionComponent;
