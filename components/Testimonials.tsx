import React from 'react';
import { motion } from 'framer-motion';
import { MessageSquareQuote } from 'lucide-react';

const reviews = [
  {
    name: "Alex C.",
    role: "Visual Artist",
    text: "I haven't slept in 3 days but I feel amazing. Sunstar Orange is literally liquid gold. The packaging alone is a work of art.",
    tag: "Verified Sipper"
  },
  {
    name: "Sarah K.",
    role: "Pro Gamer",
    text: "The focus I get from Neon Cream is unmatched. No jitters, just pure flow state. It's like an aimbot for real life.",
    tag: "Pro League"
  },
  {
    name: "Marcus J.",
    role: "Night Owl",
    text: "Finally a soda that doesn't taste like chemicals. Midnight Cola is deep, spicy, and hits different at 2AM.",
    tag: "Night Shift"
  }
];

const Testimonials: React.FC = () => {
  return (
    <section className="py-20 md:py-24 bg-[#050505] border-y border-white/5 overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="flex items-center gap-4 mb-10 md:mb-16">
          <div className="w-2 h-2 rounded-full bg-[#CCFF00] animate-pulse" />
          <span className="text-[#CCFF00] font-mono uppercase tracking-widest text-xs md:text-sm">Incoming Transmissions</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {reviews.map((review, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.2 }}
              viewport={{ once: true }}
              className="relative p-6 md:p-8 rounded-tr-[2rem] rounded-bl-[2rem] border border-white/10 bg-gradient-to-br from-white/5 to-transparent backdrop-blur-sm hover:border-[#CCFF00]/50 transition-colors group"
            >
              <MessageSquareQuote className="text-white/20 mb-4 md:mb-6 group-hover:text-[#CCFF00] transition-colors" size={32} />
              <p className="text-gray-300 mb-4 md:mb-6 leading-relaxed italic text-base md:text-lg font-['Inter']">"{review.text}"</p>
              
              <div className="flex justify-between items-end border-t border-white/10 pt-4 md:pt-6">
                <div>
                  <h4 className="text-white font-bold font-['Plus_Jakarta_Sans'] text-lg md:text-xl">{review.name}</h4>
                  <p className="text-[10px] md:text-xs text-gray-500 uppercase font-bold tracking-wider font-['Inter']">{review.role}</p>
                </div>
                <span className="text-[10px] bg-[#CCFF00]/10 text-[#CCFF00] px-2 py-1 md:px-3 rounded-full border border-[#CCFF00]/20 font-bold uppercase font-['Inter']">
                  {review.tag}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;