import React, { memo, useRef } from 'react';
import { ArrowRight, Globe, ShieldCheck, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import story1 from '../assets/banner.webp';

gsap.registerPlugin(ScrollTrigger);

const StatCard = memo(() => (
  <div className="absolute bottom-6 left-6 right-6 md:bottom-10 md:left-10 md:right-10 z-20">
    <div className="bg-black/40 backdrop-blur-xl border border-white/10 p-6 md:p-8 rounded-3xl">
      <div className="flex justify-between items-center">
        <div>
          <p className="text-white/60 text-sm font-medium mb-1 tracking-widest uppercase">Nationwide Reach</p>
          <h4 className="text-4xl md:text-5xl font-light text-white font-sans tracking-tight">25+ <span className="text-xl text-white/50 font-normal">Districts</span></h4>
        </div>
        <div className="w-14 h-14 md:w-16 md:h-16 bg-white rounded-full flex items-center justify-center text-black">
          <Globe className="w-7 h-7" />
        </div>
      </div>
    </div>
  </div>
));

const Story: React.FC = memo(() => {
  const containerRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Elegant slow reveal for the image side
    gsap.fromTo(imageRef.current, 
      { opacity: 0, y: 100 },
      { 
        opacity: 1, 
        y: 0, 
        duration: 1.5, 
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
        }
      }
    );

    // Staggered reveal for the text content with a cinematic blur
    gsap.fromTo(contentRef.current?.children ? Array.from(contentRef.current.children) : [], 
      { opacity: 0, y: 40, filter: 'blur(12px)' },
      { 
        opacity: 1, 
        y: 0, 
        filter: 'blur(0px)',
        duration: 1.5, 
        stagger: 0.25,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 70%",
        }
      }
    );
  }, { scope: containerRef });

  return (
    <section ref={containerRef} id="our-story" className="relative py-24 md:py-40 bg-brand-black overflow-hidden border-t border-white/5">
      <div className="container mx-auto px-6 md:px-12 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center">

          {/* Visual Side (Left) */}
          <div ref={imageRef} className="lg:col-span-5 relative group">
            <div className="relative rounded-[2rem] overflow-hidden aspect-[4/5] bg-[#111]">
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent z-10 opacity-80" />
              <img
                src={story1}
                alt="Jannah Marketing Operations"
                className="w-full h-full object-cover transition-transform duration-[2s] ease-out group-hover:scale-105"
                loading="lazy"
              />
              <StatCard />
            </div>
          </div>

          {/* Content Side (Right) */}
          <div ref={contentRef} className="lg:col-span-7 flex flex-col justify-center">
            
            <div className="inline-flex items-center gap-2 mb-8">
              <span className="w-8 h-[1px] bg-white/30" />
              <span className="text-white/50 uppercase tracking-[0.3em] text-xs font-bold">Our Heritage</span>
            </div>

            <h2 className="text-5xl md:text-7xl font-light text-white mb-8 font-sans leading-[1.1] tracking-tight">
              Rooted in Tradition. <br />
              <span className="font-grace text-6xl md:text-8xl text-white/90">Built for tomorrow.</span>
            </h2>

            <p className="text-white/60 text-lg md:text-xl mb-12 leading-relaxed font-mplus font-light max-w-2xl">
              Jannah Marketing (Pvt) Ltd was born in Sainthamaruthu in 2023 with a singular vision: to elevate Sri Lankan brands to unprecedented heights. Today, we stand as a premier corporate hub, managing massive distribution networks for top-tier beverages like Sunstar and Zoom Max.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12 border-t border-white/10 pt-12">
              <div className="flex gap-5">
                <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                  <MapPin className="w-6 h-6 text-white/70" />
                </div>
                <div>
                  <h4 className="text-white font-medium text-lg font-sans mb-1">Local Excellence</h4>
                  <p className="text-white/50 text-sm font-mplus">Proudly operating from the heart of Sri Lanka.</p>
                </div>
              </div>
              
              <div className="flex gap-5">
                <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-6 h-6 text-white/70" />
                </div>
                <div>
                  <h4 className="text-white font-medium text-lg font-sans mb-1">Premium Quality</h4>
                  <p className="text-white/50 text-sm font-mplus">Uncompromised standards across all brands.</p>
                </div>
              </div>
            </div>

            <Link
              to="/about"
              className="group inline-flex items-center gap-4 text-white text-sm font-bold uppercase tracking-[0.2em] transition-all hover:text-white/70 w-max"
            >
              <span className="border-b border-white/30 group-hover:border-transparent pb-1 transition-colors">Discover Our Journey</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
});

export default Story;