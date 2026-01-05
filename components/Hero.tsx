import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useMotionValue } from 'framer-motion';
import Bubbles from './Bubbles';
import { ArrowDown, Zap } from 'lucide-react';

const Hero: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  
  // Parallax & Mouse tracking
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    mouseX.set(clientX / innerWidth);
    mouseY.set(clientY / innerHeight);
  };
  
  // Smooth parallax values - reduced intensity for mobile
  const moveX = useTransform(mouseX, [0, 1], [15, -15]);
  const moveY = useTransform(mouseY, [0, 1], [15, -15]);
  const moveXReverse = useTransform(mouseX, [0, 1], [-15, 15]);
  const moveYReverse = useTransform(mouseY, [0, 1], [-15, 15]);
  
  // Scroll parallax
  const { scrollY } = useScroll();
  const yText = useTransform(scrollY, [0, 500], [0, 200]);
  const opacityHero = useTransform(scrollY, [0, 400], [1, 0]);

  return (
    <section 
      ref={ref}
      onMouseMove={handleMouseMove}
      className="relative w-full h-[100dvh] bg-[#050505] overflow-hidden flex flex-col items-center justify-center [perspective:1000px]"
    >
      {/* Cinematic Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#111] via-[#050505] to-[#000000] z-0" />
      
      {/* Noise Texture Overlay */}
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none z-[1]" 
           style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='1'/%3E%3C/svg%3E")` }} 
      />

      <div className="absolute inset-0 z-[2]">
        <Bubbles color="rgba(204, 255, 0, 0.1)" />
      </div>

      {/* Main Content Container */}
      <motion.div 
        style={{ opacity: opacityHero, y: yText }}
        className="relative z-10 w-full max-w-[1400px] px-6 h-full flex flex-col items-center justify-center"
      >
        {/* Brand Tag - Adjusted position for mobile */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="absolute top-[12%] md:top-[18%] flex items-center gap-2 md:gap-3 z-30"
        >
           <div className="h-[1px] w-6 md:w-16 bg-[#CCFF00]" />
           <span className="text-[#CCFF00] uppercase tracking-[0.2em] md:tracking-[0.3em] font-bold text-[10px] md:text-xs font-['Inter'] whitespace-nowrap">
             Premium Carbonation
           </span>
           <div className="h-[1px] w-6 md:w-16 bg-[#CCFF00]" />
        </motion.div>

        {/* 3D Composition Wrapper */}
        <div className="relative w-full flex items-center justify-center py-0 h-[60vh] md:h-auto">
          
          {/* Back Text Layer - "FEEL" */}
          <motion.h1 
            style={{ x: moveX, y: moveY }}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-[25vw] md:text-[14rem] leading-none font-bold font-['Plus_Jakarta_Sans'] text-transparent stroke-text absolute left-1/2 -translate-x-1/2 md:translate-x-0 md:left-[5%] top-[10%] md:top-auto z-0 select-none pointer-events-none opacity-30 md:opacity-100 tracking-tighter w-full text-center md:text-left md:w-auto"
          >
            FEEL
          </motion.h1>

          {/* Central 3D Product (CSS Constructed Can) */}
          <motion.div 
            style={{ x: moveXReverse, y: moveYReverse, rotate: 5 }}
            initial={{ scale: 0.8, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ duration: 1, type: "spring" }}
            className="relative z-10 w-[160px] h-[280px] md:w-[280px] md:h-[500px]"
          >
            {/* Can Body Gradient */}
            <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-[#CCFF00] via-[#050505] to-[#CCFF00] p-[1px] shadow-[0_0_60px_-10px_rgba(204,255,0,0.3)] md:shadow-[0_0_100px_-20px_rgba(204,255,0,0.3)]">
              <div className="w-full h-full bg-[#111] rounded-[2rem] overflow-hidden relative border border-white/10 backdrop-blur-md">
                 {/* Liquid Animation inside Can */}
                 <div className="absolute bottom-0 left-0 w-full h-[60%] bg-gradient-to-t from-[#CCFF00] to-transparent opacity-20 animate-pulse"></div>
                 
                 {/* Bubbles inside Can */}
                 <div className="absolute inset-0">
                   {[...Array(5)].map((_, i) => (
                      <motion.div
                        key={i}
                        animate={{ y: [0, -400], opacity: [0, 1, 0] }}
                        transition={{ 
                          repeat: Infinity, 
                          duration: 2 + Math.random() * 2, 
                          ease: "linear", 
                          delay: Math.random() * 2 
                        }}
                        style={{ left: `${20 + Math.random() * 60}%` }}
                        className="absolute bottom-0 w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-white/50"
                      />
                   ))}
                 </div>
                 
                 {/* Label Text */}
                 <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rotate-[-90deg] whitespace-nowrap">
                   <span className="text-4xl md:text-6xl font-extrabold text-white/10 tracking-tight font-['Plus_Jakarta_Sans']">SUNSTAR</span>
                 </div>
                 
                 {/* Highlighting */}
                 <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-white/5 to-transparent pointer-events-none" />
                 <div className="absolute top-4 left-4 w-2 h-16 rounded-full bg-white/20 blur-[2px]" />
              </div>
            </div>
            
            {/* Can Top/Rim Detail (Visual) */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-[80%] h-6 bg-[#222] rounded-[50%] border border-white/10 shadow-lg" />
          </motion.div>

          {/* Front Text Layer - "THE FIZZ" */}
          <motion.div
             style={{ x: moveX, y: moveY }}
             initial={{ opacity: 0, x: 50 }}
             animate={{ opacity: 1, x: 0 }}
             transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
             className="absolute left-1/2 -translate-x-1/2 md:translate-x-0 md:left-auto md:right-[5%] bottom-[10%] md:bottom-auto md:top-1/2 md:-translate-y-1/2 z-20 flex flex-col items-center md:items-start pointer-events-none w-full md:w-auto"
          >
             <span className="text-xl md:text-4xl font-light italic text-white mb-[-5px] md:mb-[-20px] mr-2 md:mr-0 opacity-80 font-['Inter']">the</span>
             <h1 className="text-[25vw] md:text-[14rem] leading-none font-bold font-['Plus_Jakarta_Sans'] text-white mix-blend-overlay md:mix-blend-normal liquid-text drop-shadow-[0_0_20px_rgba(204,255,0,0.4)] tracking-tighter">
               FIZZ
             </h1>
          </motion.div>
        </div>

        {/* Action Area */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="absolute bottom-[8%] md:bottom-[10%] w-full flex flex-col md:flex-row items-center justify-center gap-6 md:gap-8 z-30"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group relative px-8 md:px-10 py-4 md:py-5 bg-white/5 backdrop-blur-md border border-white/10 rounded-full overflow-hidden"
          >
            <div className="absolute inset-0 w-full h-full bg-[#CCFF00] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="flex items-center gap-3 relative z-10">
              <span className="text-white font-bold tracking-widest text-[10px] md:text-xs uppercase group-hover:text-black transition-colors font-['Inter']">Taste The Future</span>
              <Zap size={16} className="text-[#CCFF00] group-hover:text-black transition-colors" />
            </div>
          </motion.button>
          
          <div className="flex items-center gap-4 md:gap-6 text-[10px] md:text-xs text-gray-500 font-medium tracking-wider font-['Inter']">
             <span className="whitespace-nowrap">0g SUGAR</span>
             <span className="w-1 h-1 bg-[#CCFF00] rounded-full" />
             <span className="whitespace-nowrap">NATURAL CAFFEINE</span>
             <span className="hidden md:block w-1 h-1 bg-[#CCFF00] rounded-full" />
             <span className="hidden md:inline whitespace-nowrap">100% VIBES</span>
          </div>
        </motion.div>

        {/* Animated Scroll Indicator */}
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="absolute bottom-4 md:bottom-6 left-1/2 -translate-x-1/2 text-white/30"
        >
          <ArrowDown size={20} className="md:w-6 md:h-6" />
        </motion.div>
      </motion.div>
      
      {/* Styles for outline text */}
      <style>{`
        .stroke-text {
          -webkit-text-stroke: 1px rgba(255, 255, 255, 0.2);
          color: transparent;
        }
        @media (min-width: 768px) {
           .stroke-text {
            -webkit-text-stroke: 4px rgba(255, 255, 255, 0.15);
           }
        }
      `}</style>
    </section>
  );
};

export default Hero;