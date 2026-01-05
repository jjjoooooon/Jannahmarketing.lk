import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronDown, Sparkles } from 'lucide-react';

// Import your bottle images
import orange from '../assets/orange.png';
import ginger from '../assets/ginger.png';
import cola from '../assets/cola.png';
import creamsoda from '../assets/creamsoda.png';
import nesta from '../assets/nesta.png';

gsap.registerPlugin(ScrollTrigger);

const SunstarModernHero = () => {
  const [activeFlavor, setActiveFlavor] = useState(0);
  const heroRef = useRef(null);
  const bottleRef = useRef(null);
  const contentRef = useRef(null);

  const flavors = [
    {
      name: 'Orange',
      tagline: 'Citrus Burst',
      color: '#FF6B35',
      gradient: 'from-orange-400 via-orange-500 to-red-500',
      image: orange,
      description: 'Pure sunshine in every sip'
    },
    {
      name: 'Ginger',
      tagline: 'Spiced Refresh',
      color: '#D4A574',
      gradient: 'from-amber-400 via-yellow-600 to-orange-700',
      image: ginger,
      description: 'Bold and invigorating'
    },
    {
      name: 'Cola',
      tagline: 'Classic Kick',
      color: '#2D1810',
      gradient: 'from-stone-700 via-stone-900 to-black',
      image: cola,
      description: 'Timeless carbonated perfection'
    },
    {
      name: 'Cream Soda',
      tagline: 'Smooth Vanilla',
      color: '#FFB6D9',
      gradient: 'from-pink-300 via-pink-400 to-rose-500',
      image: creamsoda,
      description: 'Creamy, dreamy indulgence'
    },
    {
      name: 'Nesta',
      tagline: 'Tropical Escape',
      color: '#00CBA9',
      gradient: 'from-teal-400 via-emerald-500 to-green-600',
      image: nesta,
      description: 'Island vibes in a bottle'
    }
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial entrance animation
      const tl = gsap.timeline();

      tl.from(contentRef.current.children, {
        y: 80,
        opacity: 0,
        stagger: 0.15,
        duration: 1,
        ease: 'power3.out'
      })
        .from(bottleRef.current, {
          x: 200,
          opacity: 0,
          rotation: 15,
          duration: 1.2,
          ease: 'back.out(1.4)'
        }, '-=0.8');

      // Continuous floating animation
      gsap.to(bottleRef.current, {
        y: -20,
        duration: 2.5,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      });

    }, heroRef);

    return () => ctx.revert();
  }, []);

  const changeFlavor = (index) => {
    if (index === activeFlavor) return;

    gsap.timeline()
      .to(bottleRef.current, {
        x: -100,
        opacity: 0,
        rotation: -20,
        duration: 0.4,
        ease: 'power2.in'
      })
      .call(() => setActiveFlavor(index))
      .to(bottleRef.current, {
        x: 0,
        opacity: 1,
        rotation: 0,
        duration: 0.6,
        ease: 'back.out(1.4)'
      });

    gsap.fromTo(contentRef.current.children,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, stagger: 0.1, duration: 0.6, ease: 'power2.out' }
    );
  };

  return (
    <div
      ref={heroRef}
      className="relative w-full min-h-[100dvh] bg-[#050505] overflow-hidden flex flex-col"
    >
      {/* Animated Background Gradient */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className={`absolute inset-0 bg-gradient-to-br ${flavors[activeFlavor].gradient} opacity-5 transition-all duration-1000`}
        />
        <div className="absolute -top-20 sm:-top-40 -right-20 sm:-right-40 w-48 h-48 sm:w-96 sm:h-96 bg-[#CCFF00]/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 sm:-bottom-40 -left-20 sm:-left-40 w-48 h-48 sm:w-96 sm:h-96 bg-[#CCFF00]/3 rounded-full blur-3xl" />
      </div>

      {/* Main Content Grid */}
      <div className="relative z-10 flex-1 grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 px-4 sm:px-6 md:px-12 lg:px-16 py-6 sm:py-8 lg:py-12 max-w-7xl mx-auto items-center w-full">

        {/* Left: Content */}
        <div ref={contentRef} className="space-y-4 sm:space-y-6 lg:space-y-8 lg:pr-12 order-2 lg:order-1">
          <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-white/5 backdrop-blur-sm rounded-full text-xs sm:text-sm font-bold text-white/60 border border-white/10 uppercase tracking-wider">
            <div className="w-2 h-2 rounded-full bg-[#CCFF00] animate-pulse" />
            Sri Lankan Heritage
          </div>

          <div className="space-y-2 sm:space-y-4">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black text-white leading-none tracking-tight font-['Plus_Jakarta_Sans']">
              {flavors[activeFlavor].name}
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-light text-[#CCFF00] italic">
              {flavors[activeFlavor].tagline}
            </p>
          </div>

          <p className="text-sm sm:text-base lg:text-lg text-gray-400 max-w-md leading-relaxed">
            {flavors[activeFlavor].description}. Crafted with authentic Sri Lankan tradition and modern carbonation technology.
          </p>

          <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4">
            <Link
              to="/shop"
              className="group px-6 sm:px-8 py-3 sm:py-4 bg-[#CCFF00] text-black rounded-full font-black text-xs sm:text-sm hover:bg-white transition-all hover:shadow-lg hover:shadow-[#CCFF00]/40 flex items-center justify-center gap-2 uppercase tracking-widest"
            >
              Explore Flavors
              <ChevronDown className="w-4 h-4 rotate-[-90deg] group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/about"
              className="px-6 sm:px-8 py-3 sm:py-4 bg-white/5 text-white rounded-full font-bold text-xs sm:text-sm hover:bg-white/10 transition-all border border-white/10 backdrop-blur-sm uppercase tracking-widest"
            >
              Learn More
            </Link>
          </div>

          {/* Nutritional Info */}
          <div className="flex gap-4 sm:gap-6 lg:gap-8 pt-4 sm:pt-6 border-t border-white/10">
            <div>
              <div className="text-[10px] sm:text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">Calories</div>
              <div className="text-2xl sm:text-3xl font-bold text-white">0</div>
            </div>
            <div>
              <div className="text-[10px] sm:text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">Volume</div>
              <div className="text-2xl sm:text-3xl font-bold text-white">500<span className="text-sm sm:text-lg">ml</span></div>
            </div>
            <div>
              <div className="text-[10px] sm:text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">Sugar</div>
              <div className="text-2xl sm:text-3xl font-bold text-white">0<span className="text-sm sm:text-lg">g</span></div>
            </div>
          </div>
        </div>

        {/* Right: Bottle Showcase */}
        <div className="relative flex items-center justify-center lg:justify-end order-1 lg:order-2 min-h-[300px] sm:min-h-[400px] lg:min-h-0">
          <div ref={bottleRef} className="relative w-full max-w-[250px] sm:max-w-[350px] md:max-w-md">
            {/* Glow Effect */}
            <div
              className={`absolute inset-0 bg-gradient-to-br ${flavors[activeFlavor].gradient} blur-3xl opacity-20 scale-75 transition-all duration-1000`}
            />

            {/* Bottle Image */}
            <img
              src={flavors[activeFlavor].image}
              alt={flavors[activeFlavor].name}
              className="relative w-full h-auto drop-shadow-2xl z-10"
            />

            {/* Decorative Circle */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 sm:w-60 sm:h-60 md:w-72 md:h-72 border border-white/10 rounded-full -z-10" />
          </div>
        </div>
      </div>

      {/* Flavor Selector */}
      <div className="relative z-20 flex flex-wrap justify-center gap-2 sm:gap-3 px-4 sm:px-8 pb-8 sm:pb-12">
        {flavors.map((flavor, index) => (
          <button
            key={flavor.name}
            onClick={() => changeFlavor(index)}
            className={`group relative px-3 sm:px-4 md:px-6 py-2 sm:py-2.5 md:py-3 rounded-full font-bold text-xs sm:text-sm transition-all uppercase tracking-wider ${activeFlavor === index
              ? 'bg-[#CCFF00] text-black shadow-lg shadow-[#CCFF00]/20'
              : 'bg-white/5 text-gray-400 hover:bg-white/10 border border-white/10 hover:text-white'
              }`}
          >
            <span className="relative z-10">{flavor.name}</span>
            {activeFlavor === index && (
              <div className={`absolute inset-0 bg-gradient-to-r ${flavor.gradient} opacity-30 rounded-full blur-sm`} />
            )}
          </button>
        ))}
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-4 sm:bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 sm:gap-2 text-gray-600 animate-bounce hidden sm:flex">
        <span className="text-xs font-medium uppercase tracking-wider">Scroll</span>
        <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5" />
      </div>
    </div>
  );
};

export default SunstarModernHero;