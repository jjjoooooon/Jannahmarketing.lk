import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Check, Loader2, AlertCircle } from 'lucide-react';
import emailjs from '@emailjs/browser';

const Newsletter: React.FC = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus('sending');

    // REPLACE THESE WITH YOUR ACTUAL EMAILJS CREDENTIALS
    const SERVICE_ID = 'service_q5ks567';
    const TEMPLATE_ID = 'template_olrefpj'; // You might want a separate template for newsletter
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
    <section className="py-20 md:py-24 bg-[#CCFF00] text-black relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '30px 30px' }} />

      <div className="container max-w-7xl mx-auto px-6 relative z-10 text-center">
        <h2 className="text-4xl md:text-8xl font-black font-['Plus_Jakarta_Sans'] mb-4 md:mb-6 uppercase tracking-tighter leading-none">
          Don't Miss <br /> The Drop
        </h2>
        <p className="text-base md:text-xl font-medium mb-8 md:mb-10 max-w-lg mx-auto font-['Inter']">
          Join the inner circle. Get early access to limited edition flavors and exclusive merch drops.
        </p>

        <motion.form
          onSubmit={handleSubmit}
          initial={{ scale: 0.9, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          className="max-w-md mx-auto relative"
        >
          {status === 'success' ? (
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              className="bg-black text-white p-5 rounded-full flex items-center justify-center gap-2 font-bold font-['Plus_Jakarta_Sans'] text-lg md:text-xl"
            >
              <Check size={24} className="text-[#CCFF00]" />
              <span>Welcome to the crew.</span>
            </motion.div>
          ) : (
            <div className="relative">
              <input
                type="email"
                placeholder={status === 'error' ? "FAILED. TRY AGAIN." : "ENTER YOUR EMAIL"}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={status === 'sending'}
                className={`w-full bg-black text-white px-6 py-4 md:px-8 md:py-5 rounded-full font-mono text-sm focus:outline-none focus:ring-4 focus:ring-black/20 placeholder:text-gray-500 border-2 ${status === 'error' ? 'border-red-500' : 'border-black'}`}
              />
              <button
                type="submit"
                disabled={status === 'sending'}
                className={`absolute right-2 top-2 bottom-2 transition-colors text-black px-4 md:px-6 rounded-full flex items-center justify-center border border-black ${status === 'sending' ? 'bg-gray-500 cursor-not-allowed' : 'bg-[#CCFF00] hover:bg-white'}`}
              >
                {status === 'sending' ? <Loader2 size={20} className="animate-spin" /> : <ArrowRight size={20} />}
              </button>
            </div>
          )}
        </motion.form>

        <p className="mt-8 text-[10px] md:text-xs font-bold opacity-60 uppercase tracking-widest font-mono">
          No Spam. Just Vibes.
        </p>
      </div>
    </section>
  );
};

export default Newsletter;