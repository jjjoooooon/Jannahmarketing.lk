import React from 'react';
import { motion } from 'framer-motion';
import { Target, Users, Award, Heart, TrendingUp, Leaf } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

const About: React.FC = () => {
    const values = [
        {
            icon: Heart,
            title: 'Passion for Quality',
            description: 'Every bottle is crafted with care, using only the finest natural ingredients.'
        },
        {
            icon: Leaf,
            title: 'Sustainability First',
            description: 'Committed to 100% recyclable packaging and eco-friendly production methods.'
        },
        {
            icon: Users,
            title: 'Community Driven',
            description: 'Building connections through shared moments and refreshing experiences.'
        },
        {
            icon: TrendingUp,
            title: 'Innovation',
            description: 'Constantly pushing boundaries to create new, exciting flavor experiences.'
        }
    ];

    const milestones = [
        { year: '2015', event: 'Sunstar Founded', desc: 'Started with a vision for healthier refreshments' },
        { year: '2018', event: 'National Launch', desc: 'Expanded to stores across Sri Lanka' },
        { year: '2021', event: 'Zero Sugar Line', desc: 'Introduced our revolutionary zero-sugar formula' },
        { year: '2024', event: '10K+ Retailers', desc: 'Now available in thousands of locations nationwide' }
    ];

    return (
        <div className="bg-[#050505] min-h-screen text-white">
            <Helmet>
                <title>About Sunstar - Our Story & Values</title>
                <meta name="description" content="Founded in 2015, Sunstar is revolutionizing refreshments with bold flavors and zero compromise. Learn about our journey, values, and commitment to quality." />
            </Helmet>
            {/* Hero Section */}
            <section className="relative py-20 md:py-32 overflow-hidden">
                <div className="absolute inset-0 opacity-5">
                    <div className="absolute top-20 right-20 w-96 h-96 bg-[#CCFF00] rounded-full blur-[120px]" />
                    <div className="absolute bottom-20 left-20 w-96 h-96 bg-[#CCFF00] rounded-full blur-[120px]" />
                </div>

                <div className="container mx-auto px-6 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center max-w-4xl mx-auto"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#CCFF00]/10 rounded-full border border-[#CCFF00]/20 mb-6">
                            <Target className="w-4 h-4 text-[#CCFF00]" />
                            <span className="text-[#CCFF00] font-bold uppercase tracking-wider text-xs">About Us</span>
                        </div>
                        <h1 className="text-4xl md:text-7xl font-black mb-6 font-['Plus_Jakarta_Sans']">
                            Refreshing Lives Since 2015
                        </h1>
                        <p className="text-lg md:text-xl text-gray-400 leading-relaxed">
                            Sunstar is more than just a beverage company. We're on a mission to revolutionize how people enjoy refreshment - combining bold flavors, natural ingredients, and zero compromises.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Our Story */}
            <section className="py-20 border-t border-white/5">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="text-3xl md:text-5xl font-black mb-6 font-['Plus_Jakarta_Sans']">Our Story</h2>
                            <div className="space-y-4 text-gray-400 leading-relaxed">
                                <p>
                                    Founded in 2015, Sunstar was born from a simple idea: people deserve better beverages. No artificial sweeteners, no excessive sugar, just pure, refreshing taste from natural ingredients.
                                </p>
                                <p>
                                    We started small, crafting our first batches in a local facility in Sri Lanka. Today, we're proud to serve thousands of customers across the nation, offering five distinct flavors that cater to every taste preference.
                                </p>
                                <p>
                                    Every bottle tells our story - a commitment to quality, sustainability, and the belief that great taste doesn't require compromise.
                                </p>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="relative h-96 rounded-2xl overflow-hidden"
                        >
                            <img
                                src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop"
                                alt="Sunstar Story"
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Our Values */}
            <section className="py-20 border-t border-white/5">
                <div className="container mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-3xl md:text-5xl font-black mb-4 font-['Plus_Jakarta_Sans']">Our Values</h2>
                        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                            These core principles guide everything we do
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {values.map((value, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="p-6 rounded-2xl border border-white/10 bg-white/5 hover:border-[#CCFF00]/30 transition-all"
                            >
                                <value.icon className="w-12 h-12 text-[#CCFF00] mb-4" />
                                <h3 className="text-xl font-bold mb-2 font-['Plus_Jakarta_Sans']">{value.title}</h3>
                                <p className="text-gray-400 text-sm">{value.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Timeline */}
            <section className="py-20 border-t border-white/5">
                <div className="container mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-3xl md:text-5xl font-black mb-4 font-['Plus_Jakarta_Sans']">Our Journey</h2>
                    </motion.div>

                    <div className="max-w-4xl mx-auto">
                        {milestones.map((milestone, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: -30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="flex gap-8 mb-12 last:mb-0"
                            >
                                <div className="flex flex-col items-center">
                                    <div className="w-16 h-16 rounded-full bg-[#CCFF00] flex items-center justify-center font-black text-black text-sm">
                                        {milestone.year}
                                    </div>
                                    {i < milestones.length - 1 && <div className="w-0.5 h-full bg-[#CCFF00]/20 mt-2" />}
                                </div>
                                <div className="flex-1 pb-12">
                                    <h3 className="text-2xl font-bold mb-2 font-['Plus_Jakarta_Sans']">{milestone.event}</h3>
                                    <p className="text-gray-400">{milestone.desc}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Stats */}
            <section className="py-20 border-t border-white/5">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {[
                            { num: '10K+', label: 'Happy Customers' },
                            { num: '5', label: 'Unique Flavors' },
                            { num: '100%', label: 'Natural Ingredients' },
                            { num: '500+', label: 'Retail Partners' }
                        ].map((stat, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="text-center"
                            >
                                <div className="text-4xl md:text-6xl font-black text-[#CCFF00] mb-2 font-['Plus_Jakarta_Sans']">
                                    {stat.num}
                                </div>
                                <div className="text-gray-400 text-sm uppercase tracking-wider font-bold">{stat.label}</div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default About;
