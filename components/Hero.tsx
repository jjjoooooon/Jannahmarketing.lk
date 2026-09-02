import React, { useState, useEffect, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const SCENES = [
  {
    id: 0,
    image: "/assets/hero_backgrounds/Orange.jpg",
    title: "Sunstar Orange",
    subtitle: "Pure sunshine in every sip. The ultimate citrus burst.",
    highlight: "Classic Flavor",
    buttons: [
      { text: "SHOP ORANGE", href: "#flavors", primary: true },
      { text: "VIEW ALL", href: "#flavors", primary: false }
    ]
  },
  {
    id: 1,
    image: "/assets/hero_backgrounds/Cola.jpg",
    title: "Classic Cola",
    subtitle: "Timeless carbonated perfection with a classic kick.",
    highlight: "Original Series",
    buttons: [
      { text: "SHOP COLA", href: "#flavors", primary: true }
    ]
  },
  {
    id: 2,
    image: "/assets/hero_backgrounds/Nesta_flavour.jpg",
    title: "Tropical Nesta",
    subtitle: "A smooth tropical escape infused in every bottle.",
    highlight: "Tropical Refresh",
    buttons: [
      { text: "SHOP NESTA", href: "#flavors", primary: true }
    ]
  },
  {
    id: 3,
    image: "/assets/hero_backgrounds/Lemenup.jpg",
    title: "Zesty Lemon Up",
    subtitle: "Crisp, zesty, and infinitely refreshing.",
    highlight: "Zesty Energy",
    buttons: [
      { text: "SHOP LEMON UP", href: "#flavors", primary: true }
    ]
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 }
  },
  exit: {
    opacity: 0,
    transition: { staggerChildren: 0.1, staggerDirection: -1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30, filter: 'blur(10px)' },
  show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] } },
  exit: { opacity: 0, y: -20, filter: 'blur(10px)', transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
};

// We no longer use AnimatePresence for images to prevent DOM mount/unmount lag.
// Instead we keep all images in the DOM and just animate opacity for GPU acceleration.


const Hero = () => {
    const [currentScene, setCurrentScene] = useState(0);

    // Preload all images on mount to ensure smooth cross-fading
    useEffect(() => {
        SCENES.forEach((scene) => {
            const img = new Image();
            img.src = scene.image;
        });
    }, []);

    // Change slide every 6 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentScene((prev) => (prev + 1) % SCENES.length);
        }, 6000); 
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="relative w-full h-dvh bg-brand-black overflow-hidden flex flex-col justify-center items-center">
            {/* Background Images Carousel - Optimized for GPU */}
            <div className="absolute inset-0 w-full h-full z-0 bg-black overflow-hidden">
                {SCENES.map((scene, idx) => {
                    const isActive = currentScene === idx;
                    return (
                        <motion.div
                            key={scene.id}
                            initial={false}
                            animate={{
                                opacity: isActive ? 1 : 0,
                                scale: isActive ? 1 : 1.05
                            }}
                            transition={{
                                opacity: { duration: 1.5, ease: "easeInOut" },
                                scale: { duration: 10, ease: "linear" }
                            }}
                            className="absolute inset-0 w-full h-full pointer-events-none"
                            style={{ 
                                willChange: "opacity, transform",
                                zIndex: isActive ? 1 : 0 
                            }}
                        >
                            <img 
                                src={scene.image}
                                alt=""
                                className="w-full h-full object-cover"
                                loading={idx === 0 ? "eager" : "lazy"}
                                decoding="async" 
                            />
                        </motion.div>
                    );
                })}
                
                {/* Dark Overlay for Text Legibility */}
                <div className="absolute inset-0 bg-black/60 z-10 pointer-events-none" />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-transparent to-black/40 z-10 pointer-events-none" />
            </div>

            {/* Foreground Animated Content */}
            <div className="relative z-20 w-full max-w-7xl mx-auto px-6 h-full flex flex-col justify-center items-center md:items-start pt-16">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentScene}
                        variants={containerVariants}
                        initial="hidden"
                        animate="show"
                        exit="exit"
                        className="flex flex-col items-center text-center md:text-left md:items-start gap-4 max-w-4xl"
                    >
                        <motion.h1 variants={itemVariants} className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-normal text-white leading-[1.0] font-grace drop-shadow-md">
                            {SCENES[currentScene].title}
                        </motion.h1>
                        
                        <motion.p variants={itemVariants} className="text-lg sm:text-xl md:text-2xl text-white/90 font-normal max-w-2xl leading-relaxed mt-2 font-mplus drop-shadow-md">
                            {SCENES[currentScene].subtitle}
                        </motion.p>
                        
                        {SCENES[currentScene].buttons && (
                            <motion.div variants={itemVariants} className="flex gap-4 mt-6">
                                {SCENES[currentScene].buttons.map((btn, i) => (
                                    <a 
                                        key={i} 
                                        href={btn.href} 
                                        className={`px-8 py-4 font-bold text-[11px] uppercase tracking-[0.2em] transition-all duration-300 ${
                                            btn.primary 
                                                ? 'bg-[#6F9578] text-white hover:bg-[#597860]' 
                                                : 'bg-transparent text-white border border-white hover:bg-white hover:text-black'
                                        }`}
                                    >
                                        {btn.text}
                                    </a>
                                ))}
                            </motion.div>
                        )}
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Carousel Navigation Indicators */}
            <div className="absolute bottom-24 left-1/2 -translate-x-1/2 z-30 flex gap-3">
                {SCENES.map((_, idx) => (
                    <button 
                        key={idx}
                        onClick={() => setCurrentScene(idx)}
                        className={`transition-all duration-500 rounded-full ${
                            currentScene === idx 
                            ? 'w-8 h-2 bg-brand-lime' 
                            : 'w-2 h-2 bg-white/30 hover:bg-white/60'
                        }`}
                        aria-label={`Go to slide ${idx + 1}`}
                    />
                ))}
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 animate-bounce cursor-pointer pointer-events-none hover:text-brand-lime transition-colors">
                <ChevronDown size={36} className="text-white/50" />
            </div>
        </div>
    );
};

export default memo(Hero);