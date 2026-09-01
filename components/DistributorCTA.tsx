import React, { memo, useRef } from 'react';
import { ArrowRight, TrendingUp, Users, Globe, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const BENEFITS = [
  { icon: TrendingUp, title: "High Growth Potential", description: "Join Sri Lanka's fastest-growing soda brand with Jannah Marketing." },
  { icon: Users, title: "Exclusive Territories", description: "Secure dedicated distribution zones for maximum profitability." },
  { icon: ShieldCheck, title: "Marketing Support", description: "Full backing with premium POS materials and digital campaigns." },
  { icon: Globe, title: "Island-wide Network", description: "Be part of a robust supply chain covering the entire nation." },
];

const DistributorCTA: React.FC = memo(() => {
  const containerRef = useRef<HTMLDivElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Reveal left column content
    gsap.fromTo(leftColRef.current?.children ? Array.from(leftColRef.current.children) : [],
      { opacity: 0, y: 30 },
      {
        opacity: 1, 
        y: 0, 
        duration: 1.2, 
        stagger: 0.2, 
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
        }
      }
    );

    // Stagger right column cards
    gsap.fromTo(".benefit-card",
      { opacity: 0, x: 30 },
      {
        opacity: 1, 
        x: 0, 
        duration: 1, 
        stagger: 0.15, 
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
        }
      }
    );
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="py-24 md:py-32 bg-brand-black relative overflow-hidden border-t border-white/5">
      {/* Background glow */}
      <div className="absolute bottom-0 right-0 w-[800px] h-[800px] bg-white/5 rounded-full blur-[150px] opacity-10 translate-y-1/2 translate-x-1/3 pointer-events-none" />

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

          {/* Text Content */}
          <div ref={leftColRef} className="flex flex-col items-center lg:items-start text-center lg:text-left">
            <div className="inline-flex items-center gap-2 mb-8">
              <span className="w-8 h-[1px] bg-white/30" />
              <span className="text-white/50 uppercase tracking-[0.3em] text-xs font-bold font-sans">Business Opportunities</span>
              <span className="w-8 h-[1px] bg-white/30" />
            </div>

            <h2 className="text-5xl md:text-7xl font-sans font-light text-white mb-6 leading-tight tracking-tight">
              Become a <span className="font-grace text-6xl md:text-8xl block mt-2 text-white/90">Distributor.</span>
            </h2>

            <p className="text-white/50 text-lg md:text-xl mb-10 max-w-lg font-mplus font-light leading-relaxed">
              Are you ready to grow with us? We are looking for passionate partners to expand our distribution network across all provinces. Join Jannah Marketing and be part of the Sunstar luxury success story.
            </p>

            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-4 px-10 py-4 bg-[#6F9578] text-white hover:bg-[#597860] transition-all duration-300 font-bold text-[11px] uppercase tracking-[0.2em] group"
            >
              Apply Now
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Benefits Grid */}
          <div ref={rightColRef} className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {BENEFITS.map((benefit) => (
              <div 
                key={benefit.title} 
                className="benefit-card bg-white/[0.02] border border-white/10 p-8 rounded-3xl hover:bg-white/[0.05] hover:border-white/30 transition-all duration-500 group flex flex-col items-start text-left"
              >
                <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-6 group-hover:bg-white transition-colors duration-500">
                  <benefit.icon className="w-5 h-5 text-white/50 group-hover:text-black transition-colors duration-500" />
                </div>
                <h3 className="text-xl font-light text-white mb-3 font-sans tracking-tight">{benefit.title}</h3>
                <p className="text-sm text-white/40 font-mplus font-light leading-relaxed">{benefit.description}</p>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
});

export default DistributorCTA;
