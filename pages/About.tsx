import React, { memo, useRef } from 'react';
import { Target, Users, Heart, TrendingUp, Leaf } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Static data outside component — never re-allocated
const VALUES = [
    { icon: Heart, title: 'Unbeatable Taste', description: 'We focus on delivering that perfect, crisp soda experience that keeps you coming back for more.' },
    { icon: Leaf, title: 'Maximum Fizz', description: 'Highly carbonated and perfectly flavored to give you that refreshing kick in every sip.' },
    { icon: Users, title: 'Community Driven', description: 'Building connections through shared moments and refreshing experiences.' },
    { icon: TrendingUp, title: 'Innovation', description: 'Constantly pushing boundaries to create new, exciting flavor experiences.' },
];

const MILESTONES = [
    { year: '2023', event: 'Jannah Marketing Founded', desc: 'Started in Sainthamaruthu with a vision to create the perfect soda' },
    { year: '2024', event: 'Sunstar Brand Launch', desc: 'Introduced our 5 core flavors to the Eastern Province' },
    { year: '2025', event: 'Island-wide Expansion', desc: 'Now distributing across all over Sri Lanka, reaching many provinces' },
    { year: '2026', event: 'A Growing Name', desc: 'Becoming a household favorite for refreshing carbonated drinks' },
];

const STATS = [
    { num: '10K+', label: 'Happy Customers' },
    { num: '5', label: 'Unique Flavors' },
    { num: '100%', label: 'Natural Ingredients' },
    { num: '500+', label: 'Retail Partners' },
];

// Memoized sub-components
const ValueCard = memo(({ value }: { value: typeof VALUES[0] }) => (
    <div className="about-value-card opacity-0 transform translate-y-8 p-8 border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/10 transition-all duration-500 backdrop-blur-xl group">
        <value.icon className="w-8 h-8 text-white/50 mb-6 group-hover:text-white transition-colors duration-500" strokeWidth={1.5} />
        <h3 className="text-[15px] font-bold tracking-widest text-white mb-3">{value.title}</h3>
        <p className="text-white/50 text-[13px] font-mplus leading-relaxed">{value.description}</p>
    </div>
));

const MilestoneItem = memo(({ milestone, index, total }: { milestone: typeof MILESTONES[0]; index: number; total: number }) => (
    <div className="about-milestone-item opacity-0 transform translate-x-[-20px] flex gap-8 mb-12 last:mb-0 group">
        <div className="flex flex-col items-center">
            <div className="w-16 h-16 border flex items-center justify-center font-bold text-white text-[11px] tracking-[0.1em] shrink-0 border-white/20 bg-white/5 backdrop-blur-sm group-hover:border-white/40 group-hover:bg-white/10 transition-colors duration-500">
                {milestone.year}
            </div>
            {index < total - 1 && <div className="w-[1px] grow bg-gradient-to-b from-white/20 to-transparent mt-4" />}
        </div>
        <div className="flex-1 pb-12 pt-2">
            <h3 className="text-4xl font-grace leading-none mb-3 text-white group-hover:text-white/90 transition-colors">{milestone.event}</h3>
            <p className="text-white/50 text-[13px] font-mplus leading-relaxed max-w-lg">{milestone.desc}</p>
        </div>
    </div>
));

const StatItem = memo(({ stat }: { stat: typeof STATS[0] }) => (
    <div className="about-stat-item opacity-0 transform scale-95 text-center p-8">
        <div className="text-5xl md:text-7xl font-grace text-white mb-4">{stat.num}</div>
        <div className="text-white/40 text-[10px] uppercase tracking-[0.2em] font-bold">{stat.label}</div>
    </div>
));

const About: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        // Hero
        gsap.to(".about-hero-content", {
            y: 0,
            opacity: 1,
            duration: 1.2,
            ease: "power3.out",
            delay: 0.1
        });

        // Story
        gsap.to(".about-story-text", {
             scrollTrigger: { trigger: ".about-story-section", start: "top 75%" },
             x: 0, opacity: 1, duration: 1, ease: "power2.out"
        });
        gsap.to(".about-story-img", {
            scrollTrigger: { trigger: ".about-story-section", start: "top 75%" },
            x: 0, opacity: 1, duration: 1, ease: "power2.out", delay: 0.2
        });

        // Values
        gsap.to(".about-value-card", {
            scrollTrigger: { trigger: ".about-values-section", start: "top 75%" },
            y: 0, opacity: 1, stagger: 0.1, duration: 1, ease: "power2.out"
        });

        // Journey
        gsap.to(".about-milestone-item", {
            scrollTrigger: { trigger: ".about-journey-section", start: "top 75%" },
            x: 0, opacity: 1, stagger: 0.15, duration: 1, ease: "power2.out"
        });

        // Stats
        gsap.to(".about-stat-item", {
            scrollTrigger: { trigger: ".about-stats-section", start: "top 80%" },
            scale: 1, opacity: 1, stagger: 0.1, duration: 1, ease: "back.out(1.5)"
        });
    }, { scope: containerRef });

    return (
        <div ref={containerRef} className="bg-brand-black min-h-screen text-white overflow-x-hidden">
            <Helmet>
                <title>Who We Are | Jannah Marketing | The Story of Sunstar</title>
                <meta name="description" content="Founded in 2023 in Sainthamaruthu, Jannah Marketing (Pvt) Ltd is a fast-growing beverage company. Learn how Sunstar soda is taking over Sri Lanka." />
                <link rel="canonical" href="https://jannahmarketing.lk/about" />
            </Helmet>

            {/* Hero */}
            <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden border-b border-white/5">
                <div className="absolute inset-0 z-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)] pointer-events-none" />

                <div className="container mx-auto px-6 max-w-7xl relative z-10">
                    <div className="about-hero-content text-center max-w-4xl mx-auto opacity-0 translate-y-12">
                        <div className="inline-flex items-center gap-3 px-6 py-2 border border-white/20 mb-8 backdrop-blur-md">
                            <Target className="w-3.5 h-3.5 text-white/70" />
                            <span className="text-white/70 font-bold uppercase tracking-[0.2em] text-[9px]">Our Story</span>
                        </div>
                        <h1 className="text-6xl md:text-8xl font-normal mb-8 font-grace leading-tight">
                            Refreshing Sri Lanka Since 2023
                        </h1>
                        <p className="text-lg text-white/50 mb-10 font-mplus max-w-2xl mx-auto leading-relaxed">
                            Jannah Marketing (Pvt) Ltd is on a mission to bring high-quality, flavorful carbonated sodas to every corner of Sri Lanka. Starting from our roots in Sainthamaruthu, we've grown into a national name for elite refreshment.
                        </p>
                    </div>
                </div>
            </section>

            {/* Our Story */}
            <section className="about-story-section py-24 lg:py-32 border-b border-white/5">
                <div className="container mx-auto px-6 max-w-7xl">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div className="about-story-text opacity-0 transform -translate-x-8">
                            <h2 className="text-5xl md:text-7xl font-normal mb-8 font-grace">The Genesis</h2>
                            <div className="space-y-6 text-white/50 leading-relaxed font-mplus text-[15px]">
                                <p>Jannah Marketing (Pvt) Ltd was founded in 2023 with a simple, uncompromising goal: to make a soda that people actually love. We aren't here for the boardroom talk; we're here for the fizz.</p>
                                <p>We started in Sainthamaruthu, where our local community first got a taste of Sunstar Beverages. The response was incredible, and within just a couple of years, we've expanded from the East to distribute across many provinces all over Sri Lanka.</p>
                                <p>Whether it's the kick of our Ginger or the sweetness of our Orange, every Sunstar bottle is packed with flavors that hit the spot. We are a growing team, dedicated to fueling the island with the finest carbonated drinks.</p>
                            </div>
                        </div>
                        <div className="about-story-img relative h-[500px] border border-white/5 overflow-hidden backdrop-blur-xl opacity-0 transform translate-x-8 p-2 bg-white/[0.02]">
                             <div className="w-full h-full relative overflow-hidden">
                                <img
                                    src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop"
                                    alt="Sunstar Story"
                                    className="w-full h-full object-cover grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-700"
                                    loading="lazy"
                                    decoding="async"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Our Values */}
            <section className="about-values-section py-24 lg:py-32 border-b border-white/5 bg-black/50">
                <div className="container mx-auto px-6 max-w-7xl">
                    <div className="text-center mb-20">
                        <h2 className="text-5xl md:text-7xl font-normal mb-6 font-grace">Core Values</h2>
                        <p className="text-white/40 text-[11px] uppercase tracking-[0.2em] font-bold max-w-2xl mx-auto">Guiding principles for every drop</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {VALUES.map((value) => (
                            <ValueCard key={value.title} value={value} />
                        ))}
                    </div>
                </div>
            </section>

            {/* Timeline */}
            <section className="about-journey-section py-24 lg:py-32 border-b border-white/5">
                <div className="container mx-auto px-6 max-w-7xl">
                    <div className="text-center mb-24">
                        <h2 className="text-5xl md:text-7xl font-normal mb-6 font-grace">The Journey</h2>
                        <p className="text-white/40 text-[11px] uppercase tracking-[0.2em] font-bold max-w-2xl mx-auto">Our path to excellence</p>
                    </div>
                    <div className="max-w-3xl mx-auto pl-4 md:pl-0">
                        {MILESTONES.map((milestone, i) => (
                            <MilestoneItem
                                key={milestone.year}
                                milestone={milestone}
                                index={i}
                                total={MILESTONES.length}
                            />
                        ))}
                    </div>
                </div>
            </section>

            {/* Stats */}
            <section className="about-stats-section py-24 lg:py-32 border-b border-white/5 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] relative">
                <div className="absolute inset-0 bg-black/80 backdrop-blur-sm pointer-events-none" />
                <div className="container mx-auto px-6 max-w-7xl relative z-10">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
                        {STATS.map((stat) => (
                            <StatItem key={stat.label} stat={stat} />
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default memo(About);
