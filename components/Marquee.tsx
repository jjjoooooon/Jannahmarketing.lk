import React, { memo, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

// --- Configuration ---
const MARQUEE_TEXT = "Jannah Marketing";
const SECONDARY_TEXT = "Premium Beverage Group";
const REPEAT_COUNT = 8; // Large enough for seamless loop

const Marquee: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // 1. Create continuous linear animation (moves text left by -50%)
    const marqueeTween = gsap.to(textRef.current, {
      xPercent: -50,
      repeat: -1,
      duration: 60, // Much slower base loop
      ease: "none"
    });

    // 2. Bind ScrollTrigger to adjust timeScale based on scroll direction
    ScrollTrigger.create({
      trigger: document.documentElement,
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => {
        // Reduced the scroll acceleration factor for a smoother, less dizzying effect
        const targetScale = self.direction === 1 ? 1.5 : -1.5;
        
        gsap.to(marqueeTween, {
          timeScale: targetScale,
          duration: 0.2, // Snap to fast speed quickly
          overwrite: "auto"
        });
        
        // Ease back to normal 1x speed after scrolling stops
        gsap.to(marqueeTween, {
          timeScale: 1,
          duration: 1.5, // Slow graceful return
          delay: 0.2,
          overwrite: "auto"
        });
      }
    });
  }, { scope: containerRef });

  const content = (
    <div className="flex items-center gap-8 md:gap-16 pr-8 md:pr-16 shrink-0 whitespace-nowrap">
      {[...Array(REPEAT_COUNT)].map((_, i) => (
        <span
          key={i}
          className="text-2xl md:text-5xl font-light text-white/70 font-mplus tracking-[0.2em] capitalize flex items-center gap-8 md:gap-16"
        >
          {MARQUEE_TEXT}
          <span className="text-xl md:text-3xl text-brand-lime select-none opacity-50">✦</span>
          {SECONDARY_TEXT}
          <span className="text-xl md:text-3xl text-brand-lime select-none opacity-50">✦</span>
        </span>
      ))}
    </div>
  );

  return (
    <div ref={containerRef} className="relative w-full py-6 md:py-8 bg-black/40 backdrop-blur-md overflow-hidden flex items-center z-20 border-y border-white/5 select-none">
      <div ref={textRef} className="flex">
        {content}
        {content}
      </div>
    </div>
  );
};

export default memo(Marquee);