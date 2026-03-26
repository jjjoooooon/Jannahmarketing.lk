import React, { useState, memo, useRef, useEffect } from 'react';
import { ArrowRight, Check, Loader2 } from 'lucide-react';
import emailjs from '@emailjs/browser';

const Newsletter: React.FC = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [visible, setVisible] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    const el = formRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus('sending');

    const SERVICE_ID = 'service_q5ks567';
    const TEMPLATE_ID = 'template_olrefpj';
    const PUBLIC_KEY = 'c0QlLfxOR3zDbpgHF';

    try {
      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          to_email: 'jannahne@gmail.com',
          from_email: email,
          subject: 'New Newsletter Subscription',
          message: `New subscriber: ${email}`,
        },
        PUBLIC_KEY
      );
      setStatus('success');
      setEmail('');
    } catch (error) {
      console.error('EmailJS Error:', error);
      setStatus('error');
    }
  };

  return (
    <section className="py-20 md:py-24 bg-brand-lime text-black relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '30px 30px' }} />

      <div className="container max-w-7xl mx-auto px-6 relative z-10 text-center">
        <h2 className="text-4xl md:text-8xl font-black font-display mb-4 md:mb-6 uppercase tracking-tighter leading-none italic">
          Don't Miss <br /> The Drop
        </h2>
        <p className="text-base md:text-xl font-bold mb-8 md:mb-10 max-w-lg mx-auto font-sans uppercase tracking-tight">
          Join the inner circle. Get early access to limited edition flavors and exclusive merch drops.
        </p>

        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="max-w-md mx-auto relative transition-all duration-700 ease-out will-change-transform"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'translate3d(0, 0, 0) scale(1)' : 'translate3d(0, 20px, 0) scale(0.95)'
          }}
        >
          {status === 'success' ? (
            <div
              className="bg-black text-white p-5 rounded-full flex items-center justify-center gap-2 font-black font-display text-lg md:text-xl uppercase tracking-tighter animate-fade-in"
            >
              <Check size={24} className="text-brand-lime" />
              <span>Welcome to the crew.</span>
            </div>
          ) : (
            <div className="relative">
              <input
                type="email"
                placeholder={status === 'error' ? "FAILED. TRY AGAIN." : "ENTER YOUR EMAIL"}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={status === 'sending'}
                className={`w-full bg-black text-white px-6 py-4 md:px-8 md:py-5 rounded-full font-sans text-sm font-bold uppercase tracking-widest focus:outline-none focus:ring-4 focus:ring-black/20 placeholder:text-gray-600 border-2 transition-all ${status === 'error' ? 'border-red-500' : 'border-black'}`}
                required
              />
              <button
                type="submit"
                disabled={status === 'sending'}
                className={`absolute right-2 top-2 bottom-2 transition-all text-black px-4 md:px-6 rounded-full flex items-center justify-center border border-black active:scale-95 ${status === 'sending' ? 'bg-gray-800' : 'bg-brand-lime hover:bg-white'}`}
              >
                {status === 'sending' ? <Loader2 size={20} className="animate-spin text-white" /> : <ArrowRight size={20} />}
              </button>
            </div>
          )}
        </form>

        <p className="mt-8 text-[10px] md:text-xs font-black opacity-60 uppercase tracking-[0.3em] font-sans">
          No Spam. Just Vibes.
        </p>
      </div>
    </section>
  );
};

export default memo(Newsletter);