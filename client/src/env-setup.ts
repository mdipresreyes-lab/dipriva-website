// This file handles environment variable setup for analytics
// It must be imported early in main.tsx to ensure window.ENV is set before other code runs

export function setupEnvironmentVariables() {
  (window as any).ENV = {
    GA4_ID: (import.meta.env as any).VITE_GA4_ID || '',
    CLARITY_ID: (import.meta.env as any).VITE_CLARITY_ID || ''
  };
}
