import React from 'react';
import { motion, Variants } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { ArrowRight, Calendar, Search } from 'lucide-react';
import { BLOG_POSTS } from '../data/blogPosts';

// --- Animation Variants ---
const FADE_UP_VARIANTS: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, ease: "easeOut" }
    }
};

const STAGGER_CONTAINER: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.1 }
    }
};

const Blog: React.FC = () => {
    return (
        <>
            <Helmet>
                <title>Blog - Sunstar | News, Recipes & Updates</title>
                <meta name="description" content="Stay updated with the latest news, refreshing recipes, and sustainability initiatives from Sunstar. Discover how we're redefining carbonated beverages." />
                <link rel="canonical" href="https://jannahmarketing.lk/blog" />

                {/* Open Graph */}
                <meta property="og:title" content="Sunstar Blog - News & Recipes" />
                <meta property="og:description" content="Discover refreshing recipes, latest news, and our sustainability journey." />
                <meta property="og:image" content="https://jannahmarketing.lk/og-sunstar-blog.jpg" />
                <meta property="og:url" content="https://jannahmarketing.lk/blog" />
                <meta property="og:type" content="website" />

                {/* Twitter Card */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="Sunstar Blog - News & Recipes" />
                <meta name="twitter:description" content="Discover refreshing recipes, latest news, and our sustainability journey." />
                <meta name="twitter:image" content="https://jannahmarketing.lk/og-sunstar-blog.jpg" />
            </Helmet>

            <div className="min-h-screen bg-[#050505] text-white pt-24 pb-20">
                {/* Background Elements */}
                <div className="fixed inset-0 pointer-events-none z-0">
                    <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#CCFF00] rounded-full blur-[150px] opacity-5" />
                    <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#CCFF00] rounded-full blur-[150px] opacity-5" />
                </div>

                <div className="container mx-auto px-6 relative z-10">

                    {/* Header */}
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={FADE_UP_VARIANTS}
                        className="text-center max-w-3xl mx-auto mb-16 md:mb-24"
                    >
                        <span className="inline-block text-[#CCFF00] font-bold uppercase tracking-widest text-xs mb-4 px-3 py-1 bg-[#CCFF00]/10 rounded-full border border-[#CCFF00]/20">
                            The Fizz Feed
                        </span>
                        <h1 className="text-4xl md:text-7xl font-black font-['Plus_Jakarta_Sans'] mb-6 tracking-tight">
                            Stories & <span className="text-transparent text-outline">Sips</span>
                        </h1>
                        <p className="text-gray-400 text-lg md:text-xl font-['Inter'] leading-relaxed">
                            Dive into our world of flavor. From mixology secrets to behind-the-scenes stories, explore what makes Sunstar sparkle.
                        </p>

                        {/* Search Bar (Visual Only for now) */}
                        <div className="mt-8 relative max-w-md mx-auto">
                            <input
                                type="text"
                                placeholder="Search articles..."
                                className="w-full bg-white/5 border border-white/10 rounded-full py-3 pl-12 pr-4 text-white placeholder-gray-500 focus:outline-none focus:border-[#CCFF00]/50 transition-colors"
                            />
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                        </div>
                    </motion.div>

                    {/* Blog Grid */}
                    <motion.div
                        variants={STAGGER_CONTAINER}
                        initial="hidden"
                        animate="visible"
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                    >
                        {BLOG_POSTS.map((post) => {
                            const IconComponent = post.icon;
                            return (
                                <Link to={`/blog/${post.id}`} key={post.id} className="block h-full">
                                    <motion.article
                                        variants={FADE_UP_VARIANTS}
                                        className="group flex flex-col h-full bg-white/5 rounded-3xl overflow-hidden border border-white/5 hover:border-[#CCFF00]/30 transition-colors duration-300"
                                    >
                                        {/* Image */}
                                        <div className="relative h-64 overflow-hidden">
                                            <img
                                                src={post.image}
                                                alt={post.title}
                                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-[#050505] to-transparent opacity-60" />

                                            <div className="absolute top-4 left-4 flex items-center gap-2 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">
                                                <IconComponent className="w-3 h-3 text-[#CCFF00]" />
                                                <span className="text-[10px] font-bold uppercase text-white font-['Inter']">
                                                    {post.category}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Content */}
                                        <div className="p-6 md:p-8 flex flex-col flex-grow">
                                            <div className="flex items-center gap-3 text-xs text-gray-500 mb-4 font-['Inter']">
                                                <div className="flex items-center gap-1.5">
                                                    <Calendar className="w-3 h-3" />
                                                    <span>{post.date}</span>
                                                </div>
                                                <span className="w-1 h-1 rounded-full bg-[#CCFF00]" />
                                                <span>{post.readTime}</span>
                                            </div>

                                            <h2 className="text-xl md:text-2xl font-bold font-['Plus_Jakarta_Sans'] mb-3 group-hover:text-[#CCFF00] transition-colors leading-tight">
                                                {post.title}
                                            </h2>

                                            <p className="text-gray-400 text-sm leading-relaxed mb-6 line-clamp-3 font-['Inter'] flex-grow">
                                                {post.excerpt}
                                            </p>

                                            <span className="inline-flex items-center gap-2 text-white font-bold uppercase tracking-wider text-xs group-hover:gap-3 transition-all duration-300">
                                                Read Article <ArrowRight size={14} className="text-[#CCFF00]" />
                                            </span>
                                        </div>
                                    </motion.article>
                                </Link>
                            );
                        })}
                    </motion.div>

                </div>
            </div>
        </>
    );
};

export default Blog;
