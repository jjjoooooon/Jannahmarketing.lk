import React, { memo, useEffect, useRef, useState } from 'react';
import { ArrowRight, TrendingUp, Users, Globe, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

const BENEFITS = [
    { icon: TrendingUp, title: "High Growth Potential", description: "Join Sri Lanka's fastest-growing soda brand with Jannah Marketing." },
    { icon: Users, title: "Exclusive Territories", description: "Secure dedicated distribution zones for maximum profitability." },
    { icon: ShieldCheck, title: "Marketing Support", description: "Full backing with premium POS materials and digital campaigns." },
    { icon: Globe, title: "Island-wide Network", description: "Be part of a robust supply chain covering the entire nation." },
];

const BenefitCard = memo(({ benefit, visible, delay }: { benefit: typeof BENEFITS[0]; visible: boolean; delay: number }) => (
    <div
        className="bg-white/5 border border-white/10 p-6 rounded-2xl hover:border-brand-lime/30 transition-colors group will-change-transform"
        style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'translate3d(0, 0, 0)' : 'translate3d(20px, 0, 0)',
            transition: `opacity 0.6s ease-out ${delay}ms, transform 0.6s ease-out ${delay}ms`,
        }}
    >
        <div className="w-12 h-12 rounded-full bg-brand-lime/10 flex items-center justify-center mb-4 group-hover:bg-brand-lime transition-colors duration-300">
            <benefit.icon className="w-6 h-6 text-brand-lime group-hover:text-black transition-colors duration-300" />
        </div>
        <h3 className="text-xl font-bold text-white mb-2 font-display">{benefit.title}</h3>
        <p className="text-sm text-gray-400 font-sans">{benefit.description}</p>
    </div>
));

const DistributorCTA: React.FC = memo(() => {
    const ref = useRef<HTMLDivElement>(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const observer = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
            { threshold: 0.1 }
        );
        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    return (
        <section className="py-20 bg-brand-black relative overflow-hidden border-t border-white/5">
            {/* Background glow — opacity only, compositor-safe */}
            <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-brand-lime rounded-full blur-[150px] opacity-5 translate-y-1/2 translate-x-1/3 pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10" ref={ref}>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

                    {/* Content */}
                    <div
                        className="will-change-transform"
                        style={{
                            opacity: visible ? 1 : 0,
                            transform: visible ? 'translate3d(0, 0, 0)' : 'translate3d(0, 24px, 0)',
                            transition: 'opacity 0.7s ease-out, transform 0.7s ease-out',
                        }}
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand-lime/10 rounded-full border border-brand-lime/20 mb-6">
                            <Users className="w-4 h-4 text-brand-lime" />
                            <span className="text-brand-lime font-bold uppercase tracking-wider text-xs">Partner With Us</span>
                        </div>

                        <h2 className="text-4xl md:text-6xl font-black text-white mb-6 font-display leading-tight">
                            Become a <span className="text-brand-lime">Distributor</span>
                        </h2>

                        <p className="text-gray-400 text-lg mb-8 max-w-xl font-sans">
                            Are you ready to grow with us? We are looking for passionate partners to expand our distribution network across all provinces. Join Jannah Marketing and be part of the Sunstar success story.
                        </p>

                        <Link
                            to="/contact"
                            className="inline-flex items-center gap-2 px-8 py-4 bg-brand-lime text-black font-black rounded-full hover:bg-white transition-all uppercase tracking-wider group active:scale-95"
                        >
                            Apply Now
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform will-change-transform" />
                        </Link>
                    </div>

                    {/* Benefits Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {BENEFITS.map((benefit, i) => (
                            <BenefitCard key={benefit.title} benefit={benefit} visible={visible} delay={i * 100 + 200} />
                        ))}
                    </div>

                </div>
            </div>
        </section>
    );
});

export default DistributorCTA;
