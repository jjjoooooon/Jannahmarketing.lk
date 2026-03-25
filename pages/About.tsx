import React from 'react';
import { motion } from 'framer-motion';
import { Target, Users, Award, Heart, TrendingUp, Leaf } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

const About: React.FC = () => {
    const values = [
        {
            icon: Heart,
            title: 'Unbeatable Taste',
            description: 'We focus on delivering that perfect, crisp soda experience that keeps you coming back for more.'
        },
        {
            icon: Leaf,
            title: 'Maximum Fizz',
            description: 'Highly carbonated and perfectly flavored to give you that refreshing kick in every sip.'
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
        { year: '2023', event: 'Jannah Marketing Founded', desc: 'Started in Sainthamaruthu with a vision to create the perfect soda' },
        { year: '2024', event: 'Sunstar Brand Launch', desc: 'Introduced our 5 core flavors to the Eastern Province' },
        { year: '2025', event: 'Island-wide Expansion', desc: 'Now distributing across all over Sri Lanka, reaching many provinces' },
        { year: '2026', event: 'A Growing Name', desc: 'Becoming a household favorite for refreshing carbonated drinks' }
    ];

    return (
        <div className="bg-brand-black min-h-screen text-white">
            <Helmet>
                <title>About Jannah Marketing - The Story of Sunstar Soda</title>
                <meta name="description" content="Founded in 2023 in Sainthamaruthu, Jannah Marketing (Pvt) Ltd is a fast-growing beverage company. Learn how Sunstar soda is taking over Sri Lanka." />
                <link rel="canonical" href="https://jannahmarketing.lk/about" />

                {/* Open Graph */}
                <meta property="og:title" content="About Jannah Marketing - Our Journey" />
                <meta property="og:description" content="Founded in 2023, Jannah Marketing brings you the refreshing Sunstar soda. From Sainthamaruthu to all over Sri Lanka." />
                <meta property="og:image" content="https://jannahmarketing.lk/og-sunstar-about.jpg" />
                <meta property="og:url" content="https://jannahmarketing.lk/about" />
                <meta property="og:type" content="website" />
                <meta property="og:site_name" content="Jannah Marketing" />

                {/* Twitter Card */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="About Sunstar - Our Story & Values" />
                <meta name="twitter:description" content="Founded in 2015, Sunstar brings authentic Sri Lankan flavors to life. Learn about our journey and values." />
                <meta name="twitter:image" content="https://jannahmarketing.lk/og-sunstar-about.jpg" />
            </Helmet>
            {/* Hero Section */}
            <section className="relative py-20 md:py-32 overflow-hidden">
                <div className="absolute inset-0 opacity-5">
                    <div className="absolute top-20 right-20 w-96 h-96 bg-brand-lime rounded-full blur-[120px]" />
                    <div className="absolute bottom-20 left-20 w-96 h-96 bg-brand-lime rounded-full blur-[120px]" />
                </div>

                <div className="container mx-auto px-6 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center max-w-4xl mx-auto"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand-lime/10 rounded-full border border-brand-lime/20 mb-6">
                            <Target className="w-4 h-4 text-brand-lime" />
                            <span className="text-brand-lime font-bold uppercase tracking-wider text-xs">About Us</span>
                        </div>
                        <h1 className="text-4xl md:text-7xl font-black mb-6 font-['Plus_Jakarta_Sans']">
                            Refreshing Sri Lanka Since 2023
                        </h1>
                        <p className="text-lg md:text-xl text-gray-400 leading-relaxed">
                            Jannah Marketing (Pvt) Ltd is on a mission to bring high-quality, flavorful carbonated sodas to every corner of Sri Lanka. Starting from our roots in Sainthamaruthu, we've grown into a national name for bold refreshment.
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
                                    Jannah Marketing (Pvt) Ltd was founded in 2023 with a simple goal: to make a soda that people actually love. We aren't here for the boardroom talk; we're here for the fizz.
                                </p>
                                <p>
                                    We started in Sainthamaruthu, where our local community first got a taste of Sunstar. The response was incredible, and within just a couple of years, we've expanded from the East to distribute across many provinces all over Sri Lanka.
                                </p>
                                <p>
                                    Whether it's the kick of our Ginger or the sweetness of our Orange, every Sunstar bottle is packed with flavors that hit the spot. We are a growing team, dedicated to fueling the island with the best carbonated drinks.
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
                            <div className="absolute inset-0 bg-linear-to-t from-black/80 to-transparent" />
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
                                className="p-6 rounded-2xl border border-white/10 bg-white/5 hover:border-brand-lime/30 transition-all"
                            >
                                <value.icon className="w-12 h-12 text-brand-lime mb-4" />
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
                                    <div className="w-16 h-16 rounded-full bg-brand-lime flex items-center justify-center font-black text-black text-sm">
                                        {milestone.year}
                                    </div>
                                    {i < milestones.length - 1 && <div className="w-0.5 h-full bg-brand-lime/20 mt-2" />}
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
                                <div className="text-4xl md:text-6xl font-black text-brand-lime mb-2 font-['Plus_Jakarta_Sans']">
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
