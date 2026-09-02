import React, { useEffect, useState, memo, useCallback } from 'react';
import { Link } from 'react-router-dom';
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

// Memoized flavor button to prevent re-rendering all buttons on every state change
const FlavorButton = memo(({ flavor, index, isActive, onClick }: {
  flavor: typeof FLAVORS[0];
  index: number;
  isActive: boolean;
  onClick: (i: number) => void;
}) => (
  <button
    onClick={() => onClick(index)}
    className={`group flex items-center gap-3 transition-all duration-300 ease-out transform-gpu ${isActive ? 'opacity-100' : 'opacity-50 hover:opacity-100'}`}
  >
    <span className={`hidden lg:block font-bold uppercase tracking-widest transition-all duration-300 ${isActive ? 'text-brand-lime text-sm translate-x-0' : 'text-white text-xs translate-x-2'}`}>
      {flavor.name}
    </span>
    <div className={`h-2 rounded-full transition-all duration-300 ${isActive ? 'w-8 bg-brand-lime lg:w-12 lg:h-1' : 'w-2 bg-white lg:w-6 lg:h-px group-hover:bg-brand-lime'}`} />
  </button>
));

const SunstarModernHero = () => {
  const [activeFlavor, setActiveFlavor] = useState(0);
  const [direction, setDirection] = useState<'in' | 'out'>('in');
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Preload images once on mount for smooth transitions
  useEffect(() => {
    FLAVORS.forEach((flavor) => {
      const img = new Image();
      img.src = flavor.image;
    });
  }, []);

  // useCallback prevents re-creation of this function on every render
  const handleFlavorChange = useCallback((index: number) => {
    if (index === activeFlavor || isTransitioning) return;

    setIsTransitioning(true);
    setDirection('out');

    setTimeout(() => {
      setActiveFlavor(index);
      setDirection('in');
      setTimeout(() => setIsTransitioning(false), 500);
    }, 300);
  }, [activeFlavor, isTransitioning]);

  const currentData = FLAVORS[activeFlavor];

  return (
    <div className="relative w-full min-h-dvh bg-brand-black overflow-hidden flex flex-col justify-center">
      {/* --- Background: translateZ(0) forces GPU compositing --- */}
      <div className="absolute inset-0 z-0 pointer-events-none" style={{ transform: 'translateZ(0)' }}>
        <div
          className="absolute inset-0 opacity-40 transition-all duration-700"
          style={{ background: currentData.bgGradient }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(transparent,black_80%)]" />
      </div>

      {/* --- Main Content --- */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:pr-24 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center pt-20">

        {/* Left: Text Content — GPU-accelerated transitions */}
        <div
          className={`order-2 lg:order-1 flex flex-col items-start space-y-6 will-change-transform transition-all duration-500 ease-out ${direction === 'in' ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
            }`}
          style={{ backfaceVisibility: 'hidden' }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/5 rounded-full border border-white/10 animate-fade-in">
            <span className="w-2 h-2 rounded-full bg-brand-lime animate-pulse" />
            <span className="text-xs font-bold text-white/80 uppercase tracking-widest">Sri Lankan Heritage</span>
          </div>

          <div className="space-y-2">
            <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black text-white leading-none tracking-tight font-['Plus_Jakarta_Sans'] animate-fade-in-up">
              {currentData.name}
            </h1>
            <p className="text-xl sm:text-3xl font-light text-brand-lime italic font-['Inter'] animate-fade-in-up [animation-delay:100ms]">
              {currentData.tagline}
            </p>
          </div>

          <div className="min-h-14 flex items-center animate-fade-in-up [animation-delay:200ms]">
            <p className="text-gray-400 text-sm sm:text-lg leading-relaxed max-w-lg">
              {currentData.description}. Crafted with authentic Sri Lankan tradition.
            </p>
          </div>

          <div className="flex flex-wrap gap-4 pt-4 animate-fade-in-up [animation-delay:300ms]">
            <a
              href="#flavors"
              className="px-8 py-3 bg-brand-lime text-black rounded-full font-bold uppercase tracking-widest text-xs hover:scale-105 transition-transform active:scale-95"
            >
              Explore Flavors
            </a>
            <Link
              to="/about"
              className="px-8 py-4 bg-transparent border border-white/30 text-white/90 hover:bg-white hover:text-black hover:border-white transition-all duration-300 font-bold text-[11px] uppercase tracking-[0.2em]"
            >
              Learn More
            </Link>
          </div>

          <div className="pt-8 border-t border-white/10 w-full animate-fade-in-up [animation-delay:400ms]">
            <p className="text-[10px] uppercase tracking-widest text-gray-500 mb-2">Available Sizes</p>
            <div className="flex gap-4 text-white font-mono text-sm opacity-60">
              <span>250ml</span>/<span>330ml</span>/<span>750ml</span>/<span>1050ml</span>/<span>1.5L</span>
            </div>
          </div>
        </div>

        {/* Right: Bottle — translate3d keeps animation on GPU composite layer */}
        <div className="order-1 lg:order-2 flex justify-center lg:justify-end relative h-[40vh] lg:h-[60vh]">
          {/* Glow: opacity-only animation avoids layout/paint */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[60%] bg-white/30 rounded-full blur-[80px] animate-glow-pulse z-0 pointer-events-none" />

          <img
            src={currentData.image}
            alt={currentData.name}
            loading="eager"
            decoding="async"
            className={`h-full w-auto object-contain drop-shadow-2xl animate-float-gpu will-change-transform z-10 transition-all duration-500 ease-out ${direction === 'in'
              ? 'opacity-100 translate-x-0 rotate-0 scale-100'
              : 'opacity-0 translate-x-20 rotate-12 scale-90'
              }`}
            style={{
              filter: 'drop-shadow(0 20px 30px rgba(0,0,0,0.5))',
              backfaceVisibility: 'hidden',
            }}
          />
        </div>
      </div>

      {/* --- Flavor Selector --- */}
      <div className="z-50 absolute bottom-8 left-0 w-full flex justify-center gap-2 lg:absolute lg:right-10 lg:top-1/2 lg:-translate-y-1/2 lg:w-auto lg:flex-col lg:items-end lg:gap-4 lg:bottom-auto lg:left-auto">
        {FLAVORS.map((flavor, index) => (
          <FlavorButton
            key={flavor.name}
            flavor={flavor}
            index={index}
            isActive={activeFlavor === index}
            onClick={handleFlavorChange}
          />
        ))}
      </div>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 animate-bounce hidden md:block pointer-events-none">
        <ChevronDown className="text-white/30" />
      </div>

      {/* --- All keyframes use translate3d to stay on GPU compositor --- */}
      <style>{`
        @keyframes float-gpu {
          0%, 100% { transform: translate3d(0, 0, 0); }
          50%       { transform: translate3d(0, -20px, 0); }
        }
        @keyframes fade-in-up {
          from { opacity: 0; transform: translate3d(0, 20px, 0); }
          to   { opacity: 1; transform: translate3d(0, 0, 0); }
        }
        @keyframes fade-in {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes glow-pulse {
          0%, 100% { opacity: 0.3; }
          50%       { opacity: 0.5; }
        }
        .animate-float-gpu {
          animation: float-gpu 6s cubic-bezier(0.45, 0, 0.55, 1) infinite;
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
        }
        .animate-fade-in {
          animation: fade-in 0.8s ease-out forwards;
        }
        .animate-glow-pulse {
          animation: glow-pulse 4s ease-in-out infinite;
          will-change: opacity;
        }
      `}</style>
    </div>
  );
};

export default memo(SunstarModernHero);