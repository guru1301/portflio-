import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Mail, User, MessageSquare, Check, Sparkles, Loader2, Clock, CheckCircle2 } from 'lucide-react';
import { submitInquiry, type ContactInquiry } from '../services/contactService';

interface BuildWithMeModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultService?: string;
}

const SERVICE_OPTIONS = [
  'Client Website',
  'Web Application',
  'Backend & APIs',
  'Consultation / Other',
];

export const BuildWithMeModal: React.FC<BuildWithMeModalProps> = ({
  isOpen,
  onClose,
  defaultService = 'Client Website',
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [serviceType, setServiceType] = useState(defaultService);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submittedData, setSubmittedData] = useState<ContactInquiry | null>(null);

  // Errors state
  const [errors, setErrors] = useState<{ name?: string; email?: string; message?: string }>({});

  const nameInputRef = useRef<HTMLInputElement>(null);

  // Prevent background scrolling when modal is open and handle Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && !isSubmitting) {
        handleClose();
      }
    };

    if (isOpen) {
      document.body.classList.add('modal-open');
      document.documentElement.classList.add('lenis-stopped');
      try {
        (window as unknown as { lenis?: { stop: () => void } }).lenis?.stop();
      } catch {
        // ignore
      }
      window.addEventListener('keydown', handleKeyDown);
      const timer = setTimeout(() => {
        if (!isSuccess && nameInputRef.current) {
          nameInputRef.current.focus();
        }
      }, 150);
      return () => {
        clearTimeout(timer);
        window.removeEventListener('keydown', handleKeyDown);
      };
    } else {
      document.body.classList.remove('modal-open');
      document.documentElement.classList.remove('lenis-stopped');
      try {
        (window as unknown as { lenis?: { start: () => void } }).lenis?.start();
      } catch {
        // ignore
      }
    }

    return () => {
      document.body.classList.remove('modal-open');
      document.documentElement.classList.remove('lenis-stopped');
      try {
        (window as unknown as { lenis?: { start: () => void } }).lenis?.start();
      } catch {
        // ignore
      }
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, isSubmitting, isSuccess]);

  const handleClose = () => {
    if (isSubmitting) return;
    onClose();
    // Reset state after animation finishes
    setTimeout(() => {
      setIsSuccess(false);
      setName('');
      setEmail('');
      setMessage('');
      setErrors({});
      setSubmittedData(null);
    }, 300);
  };

  const validateForm = () => {
    const newErrors: { name?: string; email?: string; message?: string } = {};

    if (!name.trim()) {
      newErrors.name = 'Please enter your name';
    }

    if (!email.trim()) {
      newErrors.email = 'Please enter your email address';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!message.trim()) {
      newErrors.message = 'Please enter a message about your project';
    } else if (message.trim().length < 5) {
      newErrors.message = 'Message is too short (min 5 characters)';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    const inquiry: ContactInquiry = {
      name: name.trim(),
      email: email.trim(),
      message: message.trim(),
      serviceType,
    };

    try {
      await submitInquiry(inquiry);
      setSubmittedData(inquiry);
      setIsSuccess(true);
    } catch (err) {
      console.error('Submission failed:', err);
      // Still show success since it is backed up to localStorage
      setSubmittedData(inquiry);
      setIsSuccess(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSendAnother = () => {
    setIsSuccess(false);
    setEmail('');
    setMessage('');
    setSubmittedData(null);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-[10000] flex items-center justify-center p-3 sm:p-5 md:p-6 overflow-y-auto overscroll-contain"
          data-lenis-prevent="true"
          data-lenis-prevent-wheel="true"
          data-lenis-prevent-touch="true"
          onWheel={(e) => e.stopPropagation()}
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/85 backdrop-blur-md cursor-pointer"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 25 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-xl bg-[#0e0e13] border border-white/15 rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl pointer-events-auto my-auto z-10 flex flex-col max-h-[92vh] overscroll-contain"
            data-lenis-prevent="true"
            data-lenis-prevent-wheel="true"
            data-lenis-prevent-touch="true"
            onWheel={(e) => e.stopPropagation()}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Bar */}
            <div className="flex items-center justify-between px-5 sm:px-7 py-4 bg-[#141419]/90 backdrop-blur-md border-b border-white/10 shrink-0">
              <div className="flex items-center gap-2.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#e63946] animate-pulse" />
                <span className="font-mono-custom text-xs font-bold text-[#e63946] tracking-wider uppercase">
                  [ BUILD WITH ME ]
                </span>
                <span className="text-white/40 text-xs hidden sm:inline">•</span>
                <span className="font-mono-custom text-[11px] text-white/50 uppercase tracking-widest hidden sm:inline">
                  PROJECT INQUIRY
                </span>
              </div>

              <button
                onClick={handleClose}
                disabled={isSubmitting}
                className="p-1.5 sm:p-2 rounded-full border border-white/20 bg-white/5 hover:bg-[#e63946] hover:border-[#e63946] text-white/80 hover:text-white transition-all cursor-pointer focus:outline-none disabled:opacity-50"
                aria-label="Close dialog"
              >
                <X className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
              </button>
            </div>

            {/* Scrollable Content Body */}
            <div
              className="overflow-y-auto p-5 sm:p-8 overscroll-contain touch-pan-y"
              data-lenis-prevent="true"
              data-lenis-prevent-wheel="true"
              data-lenis-prevent-touch="true"
              onWheel={(e) => e.stopPropagation()}
            >
              {!isSuccess ? (
                /* FORM VIEW */
                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Headline & Description */}
                  <div className="space-y-1.5">
                    <h3 className="font-display text-2xl sm:text-3xl font-black text-white tracking-tight uppercase" style={{ color: '#ffffff' }}>
                      LET’S BUILD SOMETHING.
                    </h3>
                    <p className="font-mono-custom text-xs sm:text-sm text-white/70 leading-relaxed">
                      Share your requirement below. Enter your name and email address, and I will contact you to discuss your project!
                    </p>
                  </div>

                  {/* Service Type Selection */}
                  <div className="space-y-2">
                    <label className="font-mono-custom text-[11px] uppercase tracking-wider text-white/60 block font-semibold">
                      WHAT ARE YOU LOOKING TO BUILD?
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {SERVICE_OPTIONS.map((srv) => {
                        const isSelected = serviceType === srv;
                        return (
                          <button
                            type="button"
                            key={srv}
                            onClick={() => setServiceType(srv)}
                            className={`px-3 py-2 rounded-xl text-left font-mono-custom text-[11px] font-medium transition-all border cursor-pointer ${
                              isSelected
                                ? 'bg-[#e63946]/20 border-[#e63946] text-white shadow-sm shadow-[#e63946]/20'
                                : 'bg-white/5 border-white/10 text-white/70 hover:bg-white/10 hover:text-white'
                            }`}
                          >
                            {srv}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Name & Email Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Name Field */}
                    <div className="space-y-1.5">
                      <label
                        htmlFor="inquiry-name"
                        className="font-mono-custom text-[11px] uppercase tracking-wider text-white/80 font-semibold flex items-center justify-between"
                      >
                        <span className="flex items-center gap-1.5">
                          <User className="w-3.5 h-3.5 text-[#e63946]" /> YOUR NAME *
                        </span>
                      </label>
                      <input
                        ref={nameInputRef}
                        id="inquiry-name"
                        type="text"
                        value={name}
                        onChange={(e) => {
                          setName(e.target.value);
                          if (errors.name) setErrors((prev) => ({ ...prev, name: undefined }));
                        }}
                        placeholder="e.g. John Doe"
                        className={`w-full px-3.5 py-2.5 rounded-xl bg-black/50 border font-mono-custom text-xs sm:text-sm text-white placeholder-white/30 focus:outline-none transition-all ${
                          errors.name
                            ? 'border-red-500 focus:border-red-500'
                            : 'border-white/15 focus:border-[#e63946]'
                        }`}
                      />
                      {errors.name && (
                        <p className="font-mono-custom text-[10px] text-red-400 mt-1">
                          {errors.name}
                        </p>
                      )}
                    </div>

                    {/* Email Field */}
                    <div className="space-y-1.5">
                      <label
                        htmlFor="inquiry-email"
                        className="font-mono-custom text-[11px] uppercase tracking-wider text-white/80 font-semibold flex items-center justify-between"
                      >
                        <span className="flex items-center gap-1.5">
                          <Mail className="w-3.5 h-3.5 text-[#e63946]" /> YOUR EMAIL ADDRESS *
                        </span>
                      </label>
                      <input
                        id="inquiry-email"
                        type="email"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
                        }}
                        placeholder="e.g. alex@example.com"
                        className={`w-full px-3.5 py-2.5 rounded-xl bg-black/50 border font-mono-custom text-xs sm:text-sm text-white placeholder-white/30 focus:outline-none transition-all ${
                          errors.email
                            ? 'border-red-500 focus:border-red-500'
                            : 'border-white/15 focus:border-[#e63946]'
                        }`}
                      />
                      {errors.email && (
                        <p className="font-mono-custom text-[10px] text-red-400 mt-1">
                          {errors.email}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Message Field */}
                  <div className="space-y-1.5">
                    <label
                      htmlFor="inquiry-message"
                      className="font-mono-custom text-[11px] uppercase tracking-wider text-white/80 font-semibold flex items-center justify-between"
                    >
                      <span className="flex items-center gap-1.5">
                        <MessageSquare className="w-3.5 h-3.5 text-[#e63946]" /> MESSAGE & PROJECT DETAILS *
                      </span>
                      <span className="text-[10px] text-white/40 font-normal">
                        {message.length} chars
                      </span>
                    </label>
                    <textarea
                      id="inquiry-message"
                      rows={4}
                      value={message}
                      onChange={(e) => {
                        setMessage(e.target.value);
                        if (errors.message) setErrors((prev) => ({ ...prev, message: undefined }));
                      }}
                      placeholder="Tell me what you have in mind: website redesign, new business web application, key features, timeframe..."
                      className={`w-full px-3.5 py-2.5 rounded-xl bg-black/50 border font-mono-custom text-xs sm:text-sm text-white placeholder-white/30 focus:outline-none transition-all resize-none ${
                        errors.message
                          ? 'border-red-500 focus:border-red-500'
                          : 'border-white/15 focus:border-[#e63946]'
                      }`}
                    />
                    {errors.message && (
                      <p className="font-mono-custom text-[10px] text-red-400 mt-1">
                        {errors.message}
                      </p>
                    )}
                  </div>

                  {/* Quick Note about Privacy */}
                  <div className="flex items-center gap-2 text-white/50 text-[11px] font-mono-custom">
                    <Clock className="w-3.5 h-3.5 text-[#e63946] shrink-0" />
                    <span>Quick response: Usually within 12 - 24 hours. Your details remain 100% confidential.</span>
                  </div>

                  {/* Action Buttons */}
                  <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full sm:w-auto sm:flex-1 py-3 px-6 rounded-full bg-[#e63946] hover:bg-[#ff4d6d] text-white font-mono-custom text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-lg shadow-[#e63946]/30 active:scale-95 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>SENDING INQUIRY...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-3.5 h-3.5" />
                          <span>SEND MESSAGE</span>
                        </>
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={handleClose}
                      disabled={isSubmitting}
                      className="w-full sm:w-auto py-3 px-5 rounded-full border border-white/20 bg-white/5 text-white/70 hover:text-white hover:border-white/40 font-mono-custom text-xs uppercase tracking-wider transition-colors cursor-pointer"
                    >
                      CANCEL
                    </button>
                  </div>
                </form>
              ) : (
                /* SUCCESS VIEW WITH ANIMATED TICK */
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="py-4 sm:py-6 text-center space-y-6"
                >
                  {/* Glowing Animated Circular Tick Badge */}
                  <div className="relative inline-flex items-center justify-center">
                    {/* Pulsing glow ring */}
                    <motion.div
                      initial={{ scale: 0.6, opacity: 0 }}
                      animate={{ scale: [1, 1.25, 1], opacity: [0.4, 0.8, 0.4] }}
                      transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
                      className="absolute w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-emerald-500/20 blur-xl"
                    />

                    {/* Outer border ring */}
                    <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-emerald-950/60 border-2 border-emerald-500/50 flex items-center justify-center shadow-lg shadow-emerald-500/30">
                      {/* Spring Check Icon */}
                      <motion.div
                        initial={{ scale: 0, rotate: -45 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{
                          type: 'spring',
                          stiffness: 350,
                          damping: 18,
                          delay: 0.15,
                        }}
                      >
                        <Check className="w-10 h-10 sm:w-12 sm:h-12 text-emerald-400 stroke-[3.5]" />
                      </motion.div>
                    </div>
                  </div>

                  {/* Main Success Headlines */}
                  <div className="space-y-2">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 font-mono-custom text-[11px] font-bold tracking-wider uppercase">
                      <Sparkles className="w-3.5 h-3.5" />
                      MESSAGE DELIVERED
                    </div>
                    <h3 className="font-display text-2xl sm:text-4xl font-black text-white uppercase tracking-tight">
                      WE WILL CONTACT YOU!
                    </h3>
                    <p className="font-mono-custom text-xs sm:text-sm text-white/80 max-w-md mx-auto leading-relaxed">
                      Thank you, <span className="text-white font-bold">{submittedData?.name}</span>. We have received your project details and will email you back shortly.
                    </p>
                  </div>

                  {/* Summary Card */}
                  <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-left max-w-md mx-auto space-y-2 font-mono-custom text-xs">
                    <div className="flex justify-between items-center text-white/60 pb-2 border-b border-white/10">
                      <span>CONTACT DETAILS</span>
                      <span className="text-emerald-400 font-semibold flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" /> RECORDED
                      </span>
                    </div>
                    <div className="flex justify-between text-white/80">
                      <span className="text-white/50">Email:</span>
                      <span className="text-white font-semibold">{submittedData?.email}</span>
                    </div>
                    <div className="flex justify-between text-white/80">
                      <span className="text-white/50">Service:</span>
                      <span className="text-[#e63946] font-semibold">{submittedData?.serviceType}</span>
                    </div>
                    <div className="flex justify-between text-white/80">
                      <span className="text-white/50">Status:</span>
                      <span className="text-white">Email reply scheduled (24h)</span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                    <button
                      onClick={handleClose}
                      className="w-full sm:w-auto px-8 py-3 rounded-full bg-emerald-500 hover:bg-emerald-400 text-black font-mono-custom text-xs font-bold uppercase tracking-wider transition-all shadow-lg shadow-emerald-500/30 active:scale-95 cursor-pointer"
                    >
                      DONE &amp; RETURN
                    </button>
                    <button
                      onClick={handleSendAnother}
                      className="w-full sm:w-auto px-5 py-3 rounded-full border border-white/20 bg-white/5 text-white/70 hover:text-white font-mono-custom text-xs uppercase tracking-wider transition-colors cursor-pointer"
                    >
                      SEND ANOTHER MESSAGE
                    </button>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
