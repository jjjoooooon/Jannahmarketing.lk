import React, { memo, useRef } from 'react';
import { Zap, Leaf, Droplets, Wind, Sun, ShieldCheck } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const INGREDIENTS = [
  { icon: Droplets, title: "Pure Filtration", desc: "Our water goes through advanced high-tech filtration, guaranteeing absolute purity in every single drop." },
  { icon: Zap, title: "Maximum Carbonation", desc: "Engineered for intense, long-lasting carbonation that provides the crisp, sharp fizz soda lovers crave." },
  { icon: Leaf, title: "Refined Flavors", desc: "Expertly balanced flavor profiles designed to deliver punchy, authentic taste without overwhelming sweetness." },
  { icon: Sun, title: "Thermal Integrity", desc: "Formulated to maintain carbonation stability even when served ice-cold, ensuring maximum refreshment." },
  { icon: Wind, title: "Clean Finish", desc: "Crafted for a flawlessly smooth palate finish, entirely free from artificial aftertastes." },
  { icon: ShieldCheck, title: "The Jannah Standard", desc: "Every bottle undergoes rigorous quality assurance to meet our uncompromising corporate benchmarks." },
];

const Ingredients: React.FC = memo(() => {
  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Reveal Header
    gsap.fromTo(headerRef.current,
      { opacity: 0, y: 40, filter: 'blur(8px)' },
      {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        duration: 1.5,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
        }
      }
    );

    // Staggered Cards Reveal
    gsap.fromTo(gridRef.current?.children ? Array.from(gridRef.current.children) : [],
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1.2,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: gridRef.current,
          start: "top 80%",
        }
      }
    );
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="py-24 md:py-40 bg-[#0a0a0a] relative border-t border-white/5">
      {/* Subtle Background Glows */}
      <div className="absolute top-1/4 left-1/4 w-[30rem] h-[30rem] bg-white/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[30rem] h-[30rem] bg-brand-lime/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        {/* Header Section */}
        <div ref={headerRef} className="text-center mb-16 md:mb-24 flex flex-col items-center">
          <div className="inline-flex items-center gap-2 mb-6">
            <span className="w-8 h-[1px] bg-white/30" />
            <span className="text-white/50 uppercase tracking-[0.3em] text-xs font-bold font-sans">Quality Assurance</span>
            <span className="w-8 h-[1px] bg-white/30" />
          </div>

          <h2 className="text-5xl md:text-7xl font-light font-sans text-white mb-6 leading-tight tracking-tight">
            The Anatomy of <span className="font-grace text-6xl md:text-8xl block mt-2 text-white/90">Excellence.</span>
          </h2>
          
          <p className="text-white/50 max-w-2xl mx-auto text-lg md:text-xl font-light font-mplus leading-relaxed">
            Every product distributed by Jannah Marketing is engineered to perfection. From high-retention carbonation to flawless flavor profiles, we set the benchmark for Sri Lankan beverages.
          </p>
        </div>

        {/* Dynamic Grid */}
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {INGREDIENTS.map((item, i) => (
            <div
              key={i}
              className="group relative bg-white/[0.02] border border-white/10 p-8 md:p-10 rounded-3xl overflow-hidden hover:bg-white/[0.04] transition-colors duration-500"
            >
              {/* Glassmorphic internal glow */}
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-[50px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

              <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-8 text-white/60 group-hover:text-white transition-colors duration-500">
                <item.icon size={26} strokeWidth={1.5} />
              </div>
              
              <h3 className="text-xl md:text-2xl font-normal text-white font-sans tracking-tight mb-4">{item.title}</h3>
              <p className="text-white/50 text-sm md:text-base leading-relaxed font-mplus font-light">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
});

export default Ingredients;