'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { CheckCircle2, AlertCircle } from 'lucide-react';
import { trpc } from '@/lib/trpc';
import { useLanguage } from '@/contexts/LanguageContext';
import { t } from '@/i18n/translations';

type FormStep = 'firstName' | 'lastName' | 'email' | 'phone' | 'challenge';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  challenge: string;
}

const getFormSteps = (language: 'en' | 'es') => [
  { step: 'firstName' as FormStep, label: t('form.firstName', language), placeholder: t('form.placeholder.firstName', language) },
  { step: 'lastName' as FormStep, label: t('form.lastName', language), placeholder: t('form.placeholder.lastName', language) },
  { step: 'email' as FormStep, label: t('form.email', language), placeholder: t('form.placeholder.email', language) },
  { step: 'phone' as FormStep, label: t('form.phone', language), placeholder: t('form.placeholder.phone', language) },
  {
    step: 'challenge' as FormStep,
    label: t('form.challenge', language),
    placeholder: t('form.placeholder.challenge', language),
  },
];

export default function LeadCaptureForm() {
  const { language } = useLanguage();
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    challenge: '',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const formSteps = getFormSteps(language);
  const currentStep = formSteps[currentStepIndex];
  const isLastStep = currentStepIndex === formSteps.length - 1;

  // Create mutation WITHOUT callbacks - we'll handle response manually
  const submitMutation = trpc.leads.submitForm.useMutation();

  const handleInputChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      [currentStep.step]: value,
    }));
  };

  const isValidEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleNext = async () => {
    const currentValue = formData[currentStep.step as keyof FormData];

    // Validation
    if (!currentValue.trim()) {
      setErrorMessage(`${currentStep.label} is required`);
      return;
    }

    if (currentStep.step === 'email' && !isValidEmail(currentValue)) {
      setErrorMessage('Please enter a valid email address');
      return;
    }

    setErrorMessage('');

    if (isLastStep) {
      // Submit form
      await submitForm();
    } else {
      setCurrentStepIndex((prev) => prev + 1);
    }
  };

  const submitForm = async () => {
    console.log('[Form] submitForm called with data:', formData);
    setStatus('loading');
    setErrorMessage('');

    try {
      // Make the API call directly
      console.log('[Form] Calling mutateAsync...');
      const response = await submitMutation.mutateAsync({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        primaryChallenge: formData.challenge,
        preferredLanguage: language as 'en' | 'es',
      });

      // Check the response
      console.log('[Form] Response received:', response);
      if (response && response.success) {
        console.log('[Form] Success! Setting status to success');
        setStatus('success');
        // Reset form after success
        setCurrentStepIndex(0);
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          challenge: '',
        });
      } else {
        setStatus('error');
        setErrorMessage(response?.message || 'Failed to submit form. Please try again.');
      }
    } catch (error: any) {
      setStatus('error');
      setErrorMessage(error?.message || 'An error occurred. Please try again.');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleNext();
    }
  };

  const handleBack = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex((prev) => prev - 1);
      setErrorMessage('');
    }
  };

  const handleResetForm = () => {
    setStatus('idle');
    setCurrentStepIndex(0);
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      challenge: '',
    });
    setErrorMessage('');
    submitMutation.reset();
  };

  return (
    <section
      id="contact"
      className="relative bg-obsidian overflow-hidden px-4 sm:px-6 lg:px-8"
      style={{ paddingTop: '160px', paddingBottom: '160px' }}
    >
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h2 className="text-4xl sm:text-5xl font-playfair font-bold text-silver mb-4" style={{ letterSpacing: '0.18em' }} role="heading" aria-level={2}>
            {t('form.title', language)}
          </h2>
          <p className="text-silver/60 text-lg" style={{ lineHeight: '1.6' }}>
            {t('form.subtitle', language)}
          </p>
        </motion.div>

        {/* Form Container */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
          className="relative rounded-glass border border-silver/20 backdrop-blur-md bg-charcoal/40 p-8 sm:p-12 shadow-glass"
        >
          <AnimatePresence mode="wait">
            {/* Success State */}
            {status === 'success' && (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="flex flex-col items-center justify-center py-12"
              >
                <CheckCircle2 className="w-16 h-16 text-gold mb-4" />
                <h3 className="text-2xl font-playfair font-bold text-silver mb-2" role="heading" aria-level={3}>
                  {t('form.success', language)}
                </h3>
                <p className="text-silver/60 text-center mb-6">
                  {t('form.successMessage', language)}
                </p>
                <Button
                  onClick={() => window.location.href = 'https://www.dipriva.com'}
                  className="px-6 py-2 bg-gold text-obsidian font-semibold hover:bg-gold/90"
                >
                  {t('form.returnHome', language)}
                </Button>
              </motion.div>
            )}

            {/* Error State */}
            {status === 'error' && (
              <motion.div
                key="error"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="flex flex-col items-center justify-center py-12"
              >
                <AlertCircle className="w-16 h-16 text-red-500 mb-4" />
                <h3 className="text-2xl font-playfair font-bold text-silver mb-2" role="heading" aria-level={3}>
                  {t('form.error', language)}
                </h3>
                <p className="text-silver/60 text-center mb-6">
                  {errorMessage || 'Something went wrong. Please try again.'}
                </p>
                <Button
                  onClick={handleResetForm}
                  className="px-6 py-2 bg-gold text-obsidian font-semibold hover:bg-gold/90"
                >
                  {t('form.tryAgain', language)}
                </Button>
              </motion.div>
            )}

            {/* Form Steps */}
            {status !== 'success' && status !== 'error' && (
              <motion.div
                key="form"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <div className="mb-8">
                  <label className="block text-silver/80 text-sm font-medium mb-3">
                    {currentStep.label}
                  </label>

                  {currentStep.step === 'challenge' ? (
                    <Textarea
                      value={formData[currentStep.step as keyof FormData]}
                      onChange={(e) => handleInputChange(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder={currentStep.placeholder}
                      className="w-full bg-obsidian/50 border border-silver/20 text-silver placeholder:text-silver/40 rounded-lg focus:border-gold focus:ring-gold"
                      rows={4}
                      autoFocus
                    />
                  ) : (
                    <Input
                      type={currentStep.step === 'email' ? 'email' : currentStep.step === 'phone' ? 'tel' : 'text'}
                      value={formData[currentStep.step as keyof FormData]}
                      onChange={(e) => handleInputChange(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder={currentStep.placeholder}
                      className="w-full bg-obsidian/50 border border-silver/20 text-silver placeholder:text-silver/40 rounded-lg focus:border-gold focus:ring-gold"
                      autoFocus
                    />
                  )}

                  {errorMessage && (
                    <p className="text-red-500 text-sm mt-2">{errorMessage}</p>
                  )}
                </div>

                {/* Progress Bar */}
                <div className="mb-8">
                  <div className="flex gap-1">
                    {formSteps.map((_, index) => (
                      <div
                        key={index}
                        className={`h-1 flex-1 rounded-full transition-colors ${
                          index <= currentStepIndex ? 'bg-gold' : 'bg-silver/20'
                        }`}
                      />
                    ))}
                  </div>
                </div>

                {/* Buttons */}
                <div className="flex gap-4">
                  <Button
                    onClick={handleBack}
                    disabled={currentStepIndex === 0 || status === 'loading'}
                    variant="outline"
                    className="flex-1 border-silver/20 text-silver hover:bg-silver/10"
                  >
                    {t('form.back', language)}
                  </Button>
                  <Button
                    onClick={handleNext}
                    disabled={status === 'loading'}
                    className="flex-1 bg-gold text-obsidian font-semibold hover:bg-gold/90"
                  >
                    {status === 'loading' ? (
                      <>
                        <span className="inline-block animate-spin mr-2">⏳</span>
                        {t('form.submitting', language)}
                      </>
                    ) : isLastStep ? (
                      t('form.submit', language)
                    ) : (
                      t('form.next', language)
                    )}
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
