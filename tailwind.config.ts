import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './client/index.html',
    './client/src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        playfair: ['Playfair Display', 'serif'],
      },
      letterSpacing: {
        luxury: '0.13em',
        'luxury-plus': '0.18em',
      },
      lineHeight: {
        luxury: '1.6',
      },
      colors: {
        obsidian: '#0A0A0A',
        charcoal: '#1A1A1A',
        slate: '#2A2A2A',
        silver: '#E8E8E8',
        gold: '#D4AF37',
        'dark-navy': '#0F1419',
      },
      borderRadius: {
        glass: '24px',
      },
      backdropBlur: {
        glass: '10px',
      },
      boxShadow: {
        glass: '0 8px 32px 0 rgba(255, 255, 255, 0.1)',
        'glass-hover': '0 8px 32px 0 rgba(255, 255, 255, 0.15), 0 0 20px rgba(212, 175, 55, 0.2)',
        glow: '0 0 30px rgba(212, 175, 55, 0.3)',
      },
      animation: {
        'glow-pulse': 'glow-pulse 2s ease-in-out infinite',
      },
      keyframes: {
        'glow-pulse': {
          '0%, 100%': { boxShadow: '0 0 20px rgba(212, 175, 55, 0.2)' },
          '50%': { boxShadow: '0 0 40px rgba(212, 175, 55, 0.4)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
