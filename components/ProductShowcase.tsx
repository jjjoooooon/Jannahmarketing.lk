import React, { useRef, memo } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

// Import bottle images
import orange from '../assets/orange.webp';
import ginger from '../assets/ginger.webp';
import cola from '../assets/cola.webp';
import creamsoda from '../assets/creamsoda.webp';
import nesta from '../assets/nesta.webp';

gsap.registerPlugin(ScrollTrigger);

const SHOWCASE_PRODUCTS = [
  {
    id: 'orange',
    name: 'Sunstar Orange',
    tagline: 'The Classic Refresh',
    description: 'The soda that everybody loves. Sweet, tangy, and expertly formulated for that perfect citrus kick.',
    color: '#F37021',
    image: orange,
  },
  {
    id: 'ginger',
    name: 'Solar Ginger',
    tagline: 'That Spicy Kick',
    description: 'Bold, spicy, and the ultimate companion. Featuring our heavily guarded traditional island recipe.',
    color: '#D4AF37',
    image: ginger,
  },
  {
    id: 'cola',
    name: 'Midnight Cola',
    tagline: 'Nothing Beats Cola',
    description: 'A deep, rich cola flavor packed with maximum fizz. The undeniable champion of any gathering.',
    color: '#ED1C24',
    image: cola,
  },
  {
    id: 'cream-soda',
    name: 'Cream Dream',
    tagline: 'Smooth and Sweet',
    description: 'The nostalgic favorite. Sweet, creamy, and brimming with our signature vanilla smooth finish.',
    color: '#00A651',
    image: creamsoda,
  },
  {
    id: 'nesta',
    name: 'Nesta Ice',
    tagline: 'Refreshing Peach Tea',
    description: 'A cool, delicate infusion of tea and peach. A sophisticated, light, and fruity escape.',
    color: '#008B8B',
    image: nesta,
  }
];

// Total slides = intro + products
const TOTAL_SLIDES = SHOWCASE_PRODUCTS.length + 1;

const ProductShowcase: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const track = trackRef.current;
    const container = containerRef.current;
    if (!track || !container) return;

    const getScrollDist = () => track.scrollWidth - container.offsetWidth;

    const st = ScrollTrigger.create({
      trigger: container,
      pin: true,
      pinSpacing: true,
      scrub: 1.5,
      start: "top top",
      end: () => `+=${getScrollDist()}`,
      invalidateOnRefresh: true,
      anticipatePin: 1,
      animation: gsap.to(track, {
        x: () => -getScrollDist(),
        ease: "none",
      }),
    });

    // In a React SPA, window.load never re-fires after client-side navigation.
    // Use a short timeout to let images/fonts paint before locking measurements.
    const timerId = setTimeout(() => ScrollTrigger.refresh(), 200);

    return () => {
      clearTimeout(timerId);
      st.kill();
    };

  }, { scope: containerRef });

  return (
    <section
      ref={containerRef}
      id="flavors"
      className="relative bg-brand-black border-t border-white/5 overflow-hidden"
    >
      {/* Track: wider than viewport, translated by GSAP */}
      <div className="h-screen w-full flex items-center">
        <div
          ref={trackRef}
          className="flex h-full items-center will-change-transform"
          style={{ width: `${TOTAL_SLIDES * 100}vw` }}
        >

          {/* Introductory Title Slide */}
          <div
            className="w-screen h-full shrink-0 flex flex-col justify-center items-center px-[8vw]"
          >
            <div className="max-w-2xl flex flex-col items-center text-center">
              <p className="text-white/40 uppercase tracking-[0.4em] text-xs font-bold font-sans mb-6">
                Our Portfolio
              </p>
              <h2 className="text-6xl md:text-8xl font-sans font-light text-white tracking-tighter mb-4">
                Premium{' '}
                <span className="font-grace text-7xl md:text-9xl block mt-2 text-white/90">
                  Curations
                </span>
              </h2>
              <p className="text-white/50 text-lg md:text-xl font-mplus font-light leading-relaxed max-w-lg mt-4">
                Scroll to explore our exclusive collection of flagship beverages,
                meticulously formulated for maximum refreshment.
              </p>
            </div>
          </div>

          {SHOWCASE_PRODUCTS.map((product, index) => (
            <div
              key={product.id}
              className="w-screen h-full shrink-0 flex flex-col md:flex-row items-center justify-center px-[5vw] md:px-[8vw] gap-8 md:gap-16"
            >
              {/* Product Info */}
              <div className="w-full md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left z-10">
                <span
                  className="text-xs uppercase tracking-[0.3em] font-bold font-sans mb-4"
                  style={{ color: product.color }}
                >
                  0{index + 1} / {product.tagline}
                </span>

                <h3 className="text-5xl md:text-7xl font-sans font-bold text-white tracking-tight mb-6">
                  {product.name}
                </h3>

                <p className="text-white/50 text-base md:text-lg font-mplus font-light leading-relaxed max-w-md mb-8">
                  {product.description}
                </p>

                <Link to="/shop">
                  <button className="px-8 py-4 bg-transparent text-white border border-white hover:bg-white hover:text-black transition-all duration-300 font-bold text-[11px] uppercase tracking-[0.2em]">
                    View Details
                  </button>
                </Link>
              </div>

              {/* Product Visual */}
              <div className="w-full md:w-1/2 h-[40vh] md:h-[65vh] flex items-center justify-center relative">
                <div
                  className="absolute inset-0 opacity-20 blur-[80px] rounded-full scale-75 pointer-events-none"
                  style={{
                    background: `radial-gradient(circle, ${product.color} 0%, transparent 70%)`
                  }}
                />
                <img
                  src={product.image}
                  alt={product.name}
                  loading="lazy"
                  className="relative w-auto h-full object-contain drop-shadow-[0_20px_30px_rgba(0,0,0,0.5)] transform-gpu hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
};

export default memo(ProductShowcase);