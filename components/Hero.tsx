import React, { useEffect, useRef, useState, useMemo, useLayoutEffect } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ChevronDown } from 'lucide-react';

// Import bottle images
import orange from '../assets/orange.webp';
import ginger from '../assets/ginger.webp';
import cola from '../assets/cola.webp';
import creamsoda from '../assets/creamsoda.webp';
import nesta from '../assets/nesta.webp';

// --- Static Data ---
const FLAVORS = [
  {
    name: 'Orange',
    tagline: 'Citrus Burst',
    bgGradient: 'radial-gradient(circle at 50% 50%, rgba(255, 107, 53, 0.4) 0%, transparent 70%)',
    image: orange,
    description: 'Pure sunshine in every sip'
  },
  {
    name: 'Ginger',
    tagline: 'Spiced Refresh',
    bgGradient: 'radial-gradient(circle at 50% 50%, rgba(212, 165, 116, 0.4) 0%, transparent 70%)',
    image: ginger,
    description: 'Bold and invigorating'
  },
  {
    name: 'Cola',
    tagline: 'Classic Kick',
    bgGradient: 'radial-gradient(circle at 50% 50%, rgba(45, 24, 16, 0.6) 0%, transparent 70%)',
    image: cola,
    description: 'Timeless carbonated perfection'
  },
  {
    name: 'Cream Soda',
    tagline: 'Smooth Vanilla',
    bgGradient: 'radial-gradient(circle at 50% 50%, rgba(255, 182, 217, 0.4) 0%, transparent 70%)',
    image: creamsoda,
    description: 'Creamy, dreamy indulgence'
  },
  {
    name: 'Nesta',
    tagline: 'Tropical Escape',
    bgGradient: 'radial-gradient(circle at 50% 50%, rgba(0, 203, 169, 0.4) 0%, transparent 70%)',
    image: nesta,
    description: 'Island vibes in a bottle'
  }
];

const SunstarModernHero = () => {
  const [activeFlavor, setActiveFlavor] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const bottleRef = useRef<HTMLImageElement>(null);
  const textGroupRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  // 1. Image Preloader
  useEffect(() => {
    FLAVORS.forEach((flavor) => {
      const img = new Image();
      img.src = flavor.image;
    });
  }, []);

  // 2. Initial Entrance Animation
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      tl.from(bottleRef.current, {
        x: 100,
        opacity: 0,
        rotation: 10,
        duration: 1.2,
        ease: 'power3.out'
      })
        .from(textGroupRef.current?.children || [], {
          y: 30,
          opacity: 0,
          stagger: 0.1,
          duration: 0.8,
          ease: 'power2.out'
        }, '-=0.8');

    }, containerRef);
    return () => ctx.revert();
  }, []);

  // 3. Switch Logic
  const handleFlavorChange = (index: number) => {
    if (index === activeFlavor || isAnimating) return;
    setIsAnimating(true);

    const tl = gsap.timeline({
      onComplete: () => setIsAnimating(false)
    });

    tl.to(bottleRef.current, {
      x: -50,
      opacity: 0,
      rotation: -10,
      duration: 0.3,
      ease: 'power1.in'
    })
      .to(textGroupRef.current, {
        opacity: 0,
        x: -20,
        duration: 0.2
      }, 0)

      .call(() => {
        setActiveFlavor(index);
      })

      .to(bottleRef.current, {
        x: 0,
        opacity: 1,
        rotation: 0,
        duration: 0.5,
        ease: 'back.out(1.2)'
      })
      .to(textGroupRef.current, {
        opacity: 1,
        x: 0,
        duration: 0.4
      }, '-=0.3');
  };

  const currentData = FLAVORS[activeFlavor];

  return (
    <div
      ref={containerRef}
      className="relative w-full min-h-[100dvh] bg-[#050505] overflow-hidden flex flex-col justify-center"
    >
      {/* --- Background --- */}
      <div className="absolute inset-0 z-0 transition-opacity duration-700 ease-in-out">
        <div
          ref={bgRef}
          className="absolute inset-0 opacity-40 transition-all duration-700"
          style={{ background: currentData.bgGradient }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(transparent,black_80%)]" />
      </div>

      {/* --- Main Content --- */}
      {/* Added lg:pr-24 to make room for the right-side menu */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:pr-24 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center pt-20">

        {/* Left: Text Content */}
        <div ref={textGroupRef} className="order-2 lg:order-1 flex flex-col items-start space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/5 rounded-full border border-white/10">
            <span className="w-2 h-2 rounded-full bg-[#CCFF00] animate-pulse" />
            <span className="text-xs font-bold text-white/80 uppercase tracking-widest">Sri Lankan Heritage</span>
          </div>

          <div className="space-y-2">
            <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black text-white leading-none tracking-tight font-['Plus_Jakarta_Sans']">
              {currentData.name}
            </h1>
            <p className="text-xl sm:text-3xl font-light text-[#CCFF00] italic font-['Inter']">
              {currentData.tagline}
            </p>
          </div>

          <div className="min-h-[3.5rem] flex items-center">
            <p className="text-gray-400 text-sm sm:text-lg leading-relaxed max-w-lg">
              {currentData.description}. Crafted with authentic Sri Lankan tradition.
            </p>
          </div>

          <div className="flex flex-wrap gap-4 pt-4">
            <Link to="/shop" className="px-8 py-3 bg-[#CCFF00] text-black rounded-full font-bold uppercase tracking-widest text-xs hover:scale-105 transition-transform">
              Explore Flavors
            </Link>
            <Link to="/about" className="px-8 py-3 bg-white/5 text-white border border-white/10 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-white/10 transition-colors">
              Learn More
            </Link>
          </div>

          <div className="pt-8 border-t border-white/10 w-full">
            <p className="text-[10px] uppercase tracking-widest text-gray-500 mb-2">Available Sizes</p>
            <div className="flex gap-4 text-white font-mono text-sm opacity-60">
              <span>250ml</span>/<span>330ml</span>/<span>750ml</span>/<span>1050ml</span>/<span>1.5L</span>
            </div>
          </div>
        </div>

        {/* Right: Bottle */}
        <div className="order-1 lg:order-2 flex justify-center lg:justify-end relative h-[40vh] lg:h-[60vh]">
          {/* White Glow Effect */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[60%] bg-white/30 rounded-full blur-[80px] animate-float z-0"
          />

          <img
            ref={bottleRef}
            src={currentData.image}
            alt={currentData.name}
            className="h-full w-auto object-contain drop-shadow-2xl animate-float will-change-transform z-10"
            style={{ filter: 'drop-shadow(0 20px 30px rgba(0,0,0,0.5))' }}
          />
        </div>

      </div>

      {/* --- Optimized Flavor Selector (Vertical Right) --- */}
      <div className="
        z-50
        /* Mobile: Horizontal Bottom */
        absolute bottom-8 left-0 w-full flex justify-center gap-2
        /* Desktop: Vertical Right Fixed */
        lg:fixed lg:right-10 lg:top-1/2 lg:-translate-y-1/2 lg:w-auto lg:flex-col lg:items-end lg:gap-4 lg:bottom-auto lg:left-auto
      ">
        {FLAVORS.map((flavor, index) => {
          const isActive = activeFlavor === index;
          return (
            <button
              key={flavor.name}
              onClick={() => handleFlavorChange(index)}
              className={`
                group flex items-center gap-3 transition-all duration-300 ease-out
                ${isActive ? 'opacity-100' : 'opacity-50 hover:opacity-100'}
              `}
            >
              {/* Text Label - Hidden on mobile, visible on desktop */}
              <span className={`
                hidden lg:block font-bold uppercase tracking-widest transition-all duration-300
                ${isActive ? 'text-[#CCFF00] text-sm translate-x-0' : 'text-white text-xs translate-x-2'}
              `}>
                {flavor.name}
              </span>

              {/* Indicator Dot / Pill */}
              <div className={`
                h-2 rounded-full transition-all duration-300
                /* Mobile sizing vs Desktop sizing */
                ${isActive
                  ? 'w-8 bg-[#CCFF00] lg:w-12 lg:h-1' // Active: Wide pill
                  : 'w-2 bg-white lg:w-6 lg:h-[1px] group-hover:bg-[#CCFF00]' // Inactive: Small dot/line
                }
              `} />
            </button>
          );
        })}
      </div>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 animate-bounce hidden md:block">
        <ChevronDown className="text-white/30" />
      </div>

      {/* --- CSS for Float Animation --- */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default SunstarModernHero;