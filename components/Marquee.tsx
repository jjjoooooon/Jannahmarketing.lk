import React from 'react';
import { motion } from 'framer-motion';

const Marquee: React.FC = () => {
  return (
    <div className="relative w-full py-6 md:py-10 bg-[#CCFF00] overflow-hidden flex items-center transform -skew-y-2 origin-top-left z-20 border-y-4 border-black">
      <div className="flex whitespace-nowrap">
        <motion.div
          animate={{ x: [0, -1000] }}
          transition={{ repeat: Infinity, ease: "linear", duration: 20 }}
          className="flex items-center gap-6 md:gap-12 pr-6 md:pr-12"
        >
          {[...Array(8)].map((_, i) => (
            <span key={i} className="text-4xl md:text-8xl font-black text-black font-['Plus_Jakarta_Sans'] tracking-tight uppercase flex items-center gap-4 md:gap-8">
              FEEL THE FIZZ <span className="text-2xl md:text-4xl text-black">✦</span> HYDRATE YOUR SOUL <span className="text-2xl md:text-4xl text-black">✦</span>
            </span>
          ))}
        </motion.div>
        <motion.div
          animate={{ x: [0, -1000] }}
          transition={{ repeat: Infinity, ease: "linear", duration: 20 }}
          className="flex items-center gap-6 md:gap-12 pr-6 md:pr-12"
        >
          {[...Array(8)].map((_, i) => (
            <span key={i} className="text-4xl md:text-8xl font-black text-black font-['Plus_Jakarta_Sans'] tracking-tight uppercase flex items-center gap-4 md:gap-8">
              FEEL THE FIZZ <span className="text-2xl md:text-4xl text-black">✦</span> HYDRATE YOUR SOUL <span className="text-2xl md:text-4xl text-black">✦</span>
            </span>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Marquee;