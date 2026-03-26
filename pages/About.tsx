import React, { memo, useEffect, useRef, useState } from 'react';
import { Target, Users, Heart, TrendingUp, Leaf } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

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

// Reusable hook — fires once when element enters viewport
const useReveal = (threshold = 0.15) => {
    const ref = useRef<HTMLDivElement>(null);
    const [visible, setVisible] = useState(false);
    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const observer = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
            { threshold }
        );
        observer.observe(el);
        return () => observer.disconnect();
    }, [threshold]);
    return { ref, visible };
};

// Reusable reveal wrapper
const revealStyle = (visible: boolean, delay = 0, direction: 'up' | 'left' | 'right' | 'scale' = 'up'): React.CSSProperties => {
    const transforms: Record<string, string> = {
        up: 'translate3d(0, 28px, 0)',
        left: 'translate3d(-28px, 0, 0)',
        right: 'translate3d(28px, 0, 0)',
        scale: 'scale3d(0.95, 0.95, 1)',
    };
    return {
        opacity: visible ? 1 : 0,
        transform: visible ? (direction === 'scale' ? 'scale3d(1,1,1)' : 'translate3d(0,0,0)') : transforms[direction],
        transition: `opacity 0.65s ease-out ${delay}ms, transform 0.65s ease-out ${delay}ms`,
        willChange: 'transform',
        backfaceVisibility: 'hidden',
    };
};

// Memoized sub-components
const ValueCard = memo(({ value, visible, delay }: { value: typeof VALUES[0]; visible: boolean; delay: number }) => (
    <div style={revealStyle(visible, delay, 'up')} className="p-6 rounded-2xl border border-white/10 bg-white/5 hover:border-brand-lime/30 transition-colors duration-300">
        <value.icon className="w-12 h-12 text-brand-lime mb-4" />
        <h3 className="text-xl font-bold mb-2 font-display">{value.title}</h3>
        <p className="text-gray-400 text-sm font-sans">{value.description}</p>
    </div>
));

const MilestoneItem = memo(({ milestone, index, total, visible, delay }: { milestone: typeof MILESTONES[0]; index: number; total: number; visible: boolean; delay: number }) => (
    <div style={revealStyle(visible, delay, 'left')} className="flex gap-8 mb-12 last:mb-0">
        <div className="flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-brand-lime flex items-center justify-center font-black text-black text-sm shrink-0">
                {milestone.year}
            </div>
            {index < total - 1 && <div className="w-0.5 grow bg-brand-lime/20 mt-2" />}
        </div>
        <div className="flex-1 pb-12">
            <h3 className="text-2xl font-bold mb-2 font-display">{milestone.event}</h3>
            <p className="text-gray-400 font-sans">{milestone.desc}</p>
        </div>
    </div>
));

const StatItem = memo(({ stat, visible, delay }: { stat: typeof STATS[0]; visible: boolean; delay: number }) => (
    <div style={revealStyle(visible, delay, 'scale')} className="text-center">
        <div className="text-4xl md:text-6xl font-black text-brand-lime mb-2 font-display">{stat.num}</div>
        <div className="text-gray-400 text-sm uppercase tracking-wider font-bold font-sans">{stat.label}</div>
    </div>
));

const About: React.FC = () => {
    const hero = useReveal(0.1);
    const story = useReveal(0.1);
    const values = useReveal(0.1);
    const journey = useReveal(0.1);
    const stats = useReveal(0.1);

    return (
        <div className="bg-brand-black min-h-screen text-white">
            <Helmet>
                <title>About Jannah Marketing - The Story of Sunstar Soda</title>
                <meta name="description" content="Founded in 2023 in Sainthamaruthu, Jannah Marketing (Pvt) Ltd is a fast-growing beverage company. Learn how Sunstar soda is taking over Sri Lanka." />
                <link rel="canonical" href="https://jannahmarketing.lk/about" />
                <meta property="og:title" content="About Jannah Marketing - Our Journey" />
                <meta property="og:description" content="Founded in 2023, Jannah Marketing brings you the refreshing Sunstar soda. From Sainthamaruthu to all over Sri Lanka." />
                <meta property="og:image" content="https://jannahmarketing.lk/og-sunstar-about.jpg" />
                <meta property="og:url" content="https://jannahmarketing.lk/about" />
                <meta property="og:type" content="website" />
                <meta property="og:site_name" content="Jannah Marketing" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="About Sunstar - Our Story & Values" />
                <meta name="twitter:description" content="Founded in 2023, Sunstar brings authentic Sri Lankan flavors to life. Learn about our journey and values." />
                <meta name="twitter:image" content="https://jannahmarketing.lk/og-sunstar-about.jpg" />
            </Helmet>

            {/* Hero */}
            <section className="relative py-20 md:py-32 overflow-hidden">
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-20 right-20 w-96 h-96 bg-brand-lime rounded-full blur-[120px] opacity-5" />
                    <div className="absolute bottom-20 left-20 w-96 h-96 bg-brand-lime rounded-full blur-[120px] opacity-5" />
                </div>
                <div className="container mx-auto px-6 relative z-10">
                    <div ref={hero.ref} style={revealStyle(hero.visible, 0, 'up')} className="text-center max-w-4xl mx-auto">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand-lime/10 rounded-full border border-brand-lime/20 mb-6">
                            <Target className="w-4 h-4 text-brand-lime" />
                            <span className="text-brand-lime font-bold uppercase tracking-wider text-xs">About Us</span>
                        </div>
                        <h1 className="text-4xl md:text-7xl font-black mb-6 font-display">
                            Refreshing Sri Lanka Since 2023
                        </h1>
                        <p className="text-lg md:text-xl text-gray-400 leading-relaxed font-sans">
                            Jannah Marketing (Pvt) Ltd is on a mission to bring high-quality, flavorful carbonated sodas to every corner of Sri Lanka. Starting from our roots in Sainthamaruthu, we've grown into a national name for bold refreshment.
                        </p>
                    </div>
                </div>
            </section>

            {/* Our Story */}
            <section className="py-20 border-t border-white/5">
                <div className="container mx-auto px-6">
                    <div ref={story.ref} className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div style={revealStyle(story.visible, 0, 'left')}>
                            <h2 className="text-3xl md:text-5xl font-black mb-6 font-display">Our Story</h2>
                            <div className="space-y-4 text-gray-400 leading-relaxed font-sans">
                                <p>Jannah Marketing (Pvt) Ltd was founded in 2023 with a simple goal: to make a soda that people actually love. We aren't here for the boardroom talk; we're here for the fizz.</p>
                                <p>We started in Sainthamaruthu, where our local community first got a taste of Sunstar. The response was incredible, and within just a couple of years, we've expanded from the East to distribute across many provinces all over Sri Lanka.</p>
                                <p>Whether it's the kick of our Ginger or the sweetness of our Orange, every Sunstar bottle is packed with flavors that hit the spot. We are a growing team, dedicated to fueling the island with the best carbonated drinks.</p>
                            </div>
                        </div>
                        <div style={revealStyle(story.visible, 150, 'right')} className="relative h-96 rounded-2xl overflow-hidden">
                            <img
                                src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop"
                                alt="Sunstar Story"
                                className="w-full h-full object-cover"
                                loading="lazy"
                                decoding="async"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                        </div>
                    </div>
                </div>
            </section>

            {/* Our Values */}
            <section className="py-20 border-t border-white/5">
                <div className="container mx-auto px-6">
                    <div ref={values.ref} style={revealStyle(values.visible, 0, 'up')} className="text-center mb-16">
                        <h2 className="text-3xl md:text-5xl font-black mb-4 font-display">Our Values</h2>
                        <p className="text-gray-400 text-lg max-w-2xl mx-auto font-sans">These core principles guide everything we do</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {VALUES.map((value, i) => (
                            <ValueCard key={value.title} value={value} visible={values.visible} delay={i * 100} />
                        ))}
                    </div>
                </div>
            </section>

            {/* Timeline */}
            <section className="py-20 border-t border-white/5">
                <div className="container mx-auto px-6">
                    <div ref={journey.ref} style={revealStyle(journey.visible, 0, 'up')} className="text-center mb-16">
                        <h2 className="text-3xl md:text-5xl font-black mb-4 font-display">Our Journey</h2>
                    </div>
                    <div className="max-w-4xl mx-auto">
                        {MILESTONES.map((milestone, i) => (
                            <MilestoneItem
                                key={milestone.year}
                                milestone={milestone}
                                index={i}
                                total={MILESTONES.length}
                                visible={journey.visible}
                                delay={i * 120}
                            />
                        ))}
                    </div>
                </div>
            </section>

            {/* Stats */}
            <section className="py-20 border-t border-white/5">
                <div className="container mx-auto px-6">
                    <div ref={stats.ref} className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {STATS.map((stat, i) => (
                            <StatItem key={stat.label} stat={stat} visible={stats.visible} delay={i * 100} />
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default memo(About);
