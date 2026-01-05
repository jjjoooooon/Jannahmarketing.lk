import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, TrendingUp, Users, Globe, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

const DistributorCTA: React.FC = () => {
    const benefits = [
        {
            icon: TrendingUp,
            title: "High Growth Potential",
            description: "Join Sri Lanka's fastest-growing energy drink brand."
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

    return (
        <section className="py-20 bg-[#050505] relative overflow-hidden border-t border-white/5">
            {/* Background Elements */}
            <div className="absolute inset-0 opacity-10 pointer-events-none">
                <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-[#CCFF00] rounded-full blur-[150px] translate-y-1/2 translate-x-1/3" />
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

                    {/* Content */}
                    <div>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="inline-flex items-center gap-2 px-4 py-2 bg-[#CCFF00]/10 rounded-full border border-[#CCFF00]/20 mb-6"
                        >
                            <Users className="w-4 h-4 text-[#CCFF00]" />
                            <span className="text-[#CCFF00] font-bold uppercase tracking-wider text-xs">Partner With Us</span>
                        </motion.div>

                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="text-4xl md:text-6xl font-black text-white mb-6 font-['Plus_Jakarta_Sans'] leading-tight"
                        >
                            Become a <span className="text-[#CCFF00]">Distributor</span>
                        </motion.h2>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="text-gray-400 text-lg mb-8 max-w-xl font-['Inter']"
                        >
                            Are you ready to fuel the nation? We are looking for passionate partners to expand our distribution network. Join us and drive the energy revolution.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3 }}
                        >
                            <Link
                                to="/contact"
                                className="inline-flex items-center gap-2 px-8 py-4 bg-[#CCFF00] text-black font-black rounded-full hover:bg-white transition-all uppercase tracking-wider group"
                            >
                                Apply Now
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </motion.div>
                    </div>

                    {/* Benefits Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {benefits.map((benefit, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.2 + (index * 0.1) }}
                                className="bg-white/5 border border-white/10 p-6 rounded-2xl hover:border-[#CCFF00]/30 transition-colors group"
                            >
                                <div className="w-12 h-12 rounded-full bg-[#CCFF00]/10 flex items-center justify-center mb-4 group-hover:bg-[#CCFF00] transition-colors">
                                    <benefit.icon className="w-6 h-6 text-[#CCFF00] group-hover:text-black transition-colors" />
                                </div>
                                <h3 className="text-xl font-bold text-white mb-2 font-['Plus_Jakarta_Sans']">{benefit.title}</h3>
                                <p className="text-sm text-gray-400 font-['Inter']">{benefit.description}</p>
                            </motion.div>
                        ))}
                    </div>

                </div>
            </div>
        </section>
    );
};

export default DistributorCTA;
