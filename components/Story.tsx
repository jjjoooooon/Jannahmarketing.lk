import React from 'react';
import { motion } from 'framer-motion';

const Story: React.FC = () => {
  return (
    <section id="our-story" className="relative py-20 md:py-32 bg-[#050505] overflow-hidden">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
        
        {/* Text Content */}
        <div className="relative z-10 order-2 md:order-1">
          <motion.span 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-[#CCFF00] font-medium tracking-widest text-xs md:text-sm uppercase mb-3 md:mb-4 block font-['Inter']"
          >
            Origin Sequence
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-7xl font-extrabold font-['Plus_Jakarta_Sans'] text-white mb-6 md:mb-8 leading-[0.9] tracking-tight"
          >
            BREWED IN <br/> <span className="text-transparent stroke-text text-outline">ZERO GRAVITY</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
            className="text-gray-400 text-base md:text-xl leading-relaxed mb-8 font-light font-['Inter']"
          >
            It started as a jagged experiment in a orbital lab. We wanted to capture the essence of a supernova in a bottle. Sunstar isn't just a drink; it's a kinetic energy transfer system designed to elevate your frequency.
          </motion.p>
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            viewport={{ once: true }}
            className="flex gap-8 md:gap-12"
          >
            <div>
              <h3 className="text-3xl md:text-4xl font-bold text-white font-['Plus_Jakarta_Sans']">2025</h3>
              <p className="text-xs md:text-sm text-[#CCFF00] uppercase tracking-wider font-bold mt-1 font-['Inter']">Launch</p>
            </div>
            <div>
              <h3 className="text-3xl md:text-4xl font-bold text-white font-['Plus_Jakarta_Sans']">5M+</h3>
              <p className="text-xs md:text-sm text-[#CCFF00] uppercase tracking-wider font-bold mt-1 font-['Inter']">Bottles</p>
            </div>
          </motion.div>
        </div>

        {/* Abstract Graphic */}
        <div className="relative h-[300px] md:h-[600px] flex items-center justify-center order-1 md:order-2">
          {/* Rotating Rings */}
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
            className="absolute w-48 h-48 md:w-96 md:h-96 rounded-full border border-[#CCFF00]/20"
          />
          <motion.div 
            animate={{ rotate: -360 }}
            transition={{ repeat: Infinity, duration: 15, ease: "linear" }}
            className="absolute w-36 h-36 md:w-72 md:h-72 rounded-full border border-dashed border-[#CCFF00]/40"
          />
          <motion.div 
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            className="absolute w-16 h-16 md:w-32 md:h-32 rounded-full bg-[#CCFF00] blur-[40px] md:blur-[80px] opacity-40"
          />
          {/* Core */}
          <div className="relative z-10 w-24 h-24 md:w-48 md:h-48 bg-black border border-[#CCFF00] rounded-full flex items-center justify-center shadow-[0_0_50px_rgba(204,255,0,0.3)]">
             <div className="text-[#CCFF00] font-black text-3xl md:text-5xl font-['Plus_Jakarta_Sans'] animate-pulse">S*</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Story;