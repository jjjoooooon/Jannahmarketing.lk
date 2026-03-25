import React from 'react';
import { ArrowRight, TrendingUp, Users, Globe, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

const BENEFITS = [
    {
        icon: TrendingUp,
        title: "High Growth Potential",
        description: "Join Sri Lanka's fastest-growing soda brand with Jannah Marketing."
    },
    {
        icon: Users,
        title: "Exclusive Territories",
        description: "Secure dedicated distribution zones for maximum profitability."
    },
    {
        icon: ShieldCheck,
        title: "Marketing Support",
        description: "Full backing with premium POS materials and digital campaigns."
    },
    {
        icon: Globe,
        title: "Island-wide Network",
        description: "Be part of a robust supply chain covering the entire nation."
    }
];

const DistributorCTA: React.FC = React.memo(() => {
    return (
        <section className="py-20 bg-brand-black relative overflow-hidden border-t border-white/5">
            {/* Background Elements */}
            <div className="absolute inset-0 opacity-10 pointer-events-none">
                <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-brand-lime rounded-full blur-[150px] translate-y-1/2 translate-x-1/3" />
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

                    {/* Content */}
                    <div className="animate-fade-in-up">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand-lime/10 rounded-full border border-brand-lime/20 mb-6">
                            <Users className="w-4 h-4 text-brand-lime" />
                            <span className="text-brand-lime font-bold uppercase tracking-wider text-xs">Partner With Us</span>
                        </div>

                        <h2 className="text-4xl md:text-6xl font-black text-white mb-6 font-['Plus_Jakarta_Sans'] leading-tight">
                            Become a <span className="text-brand-lime">Distributor</span>
                        </h2>

                        <p className="text-gray-400 text-lg mb-8 max-w-xl font-['Inter']">
                            Are you ready to grow with us? We are looking for passionate partners to expand our distribution network across all provinces. Join Jannah Marketing and be part of the Sunstar success story.
                        </p>

                        <div>
                            <Link
                                to="/contact"
                                className="inline-flex items-center gap-2 px-8 py-4 bg-brand-lime text-black font-black rounded-full hover:bg-white transition-all uppercase tracking-wider group"
                            >
                                Apply Now
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </div>
                    </div>

                    {/* Benefits Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {BENEFITS.map((benefit, index) => (
                            <div
                                key={index}
                                className="bg-white/5 border border-white/10 p-6 rounded-2xl hover:border-brand-lime/30 transition-colors group animate-fade-in-right"
                                style={{ animationDelay: `${(index + 2) * 100}ms` }}
                            >
                                <div className="w-12 h-12 rounded-full bg-brand-lime/10 flex items-center justify-center mb-4 group-hover:bg-brand-lime transition-colors">
                                    <benefit.icon className="w-6 h-6 text-brand-lime group-hover:text-black transition-colors" />
                                </div>
                                <h3 className="text-xl font-bold text-white mb-2 font-['Plus_Jakarta_Sans']">{benefit.title}</h3>
                                <p className="text-sm text-gray-400 font-['Inter']">{benefit.description}</p>
                            </div>
                        ))}
                    </div>

                </div>
            </div>
        </section>
    );
});

export default DistributorCTA;
