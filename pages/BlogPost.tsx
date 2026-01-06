import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft, Calendar, Share2, Clock } from 'lucide-react';
import { BLOG_POSTS } from '../data/blogPosts';

const BlogPost: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const post = BLOG_POSTS.find(p => p.id === id);

    useEffect(() => {
        if (!post) {
            navigate('/blog');
        }
    }, [post, navigate]);

    if (!post) return null;

    const IconComponent = post.icon;

    return (
        <>
            <Helmet>
                <title>{post.title} - Sunstar Blog</title>
                <meta name="description" content={post.excerpt} />
                <link rel="canonical" href={`https://jannahmarketing.lk/blog/${post.id}`} />

                {/* Open Graph */}
                <meta property="og:title" content={post.title} />
                <meta property="og:description" content={post.excerpt} />
                <meta property="og:image" content={post.image} />
                <meta property="og:url" content={`https://jannahmarketing.lk/blog/${post.id}`} />
                <meta property="og:type" content="article" />

                {/* Twitter Card */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={post.title} />
                <meta name="twitter:description" content={post.excerpt} />
                <meta name="twitter:image" content={post.image} />
            </Helmet>

            <article className="min-h-screen bg-[#050505] text-white pt-24 pb-20">
                {/* Progress Bar (Optional, could be added later) */}

                <div className="container mx-auto px-6 max-w-4xl">

                    {/* Back Button */}
                    <Link to="/blog" className="inline-flex items-center gap-2 text-gray-400 hover:text-[#CCFF00] transition-colors mb-8 font-['Inter'] text-sm font-bold uppercase tracking-wider">
                        <ArrowLeft size={16} /> Back to Blog
                    </Link>

                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="flex items-center gap-3 mb-6">
                            <span className="inline-flex items-center gap-2 px-3 py-1 bg-[#CCFF00]/10 rounded-full border border-[#CCFF00]/20 text-[#CCFF00] text-xs font-bold uppercase tracking-wider">
                                <IconComponent size={14} />
                                {post.category}
                            </span>
                            <span className="text-gray-500 text-sm font-['Inter'] flex items-center gap-2">
                                <Calendar size={14} /> {post.date}
                            </span>
                            <span className="text-gray-500 text-sm font-['Inter'] flex items-center gap-2">
                                <Clock size={14} /> {post.readTime}
                            </span>
                        </div>

                        <h1 className="text-3xl md:text-5xl lg:text-6xl font-black font-['Plus_Jakarta_Sans'] mb-8 leading-tight">
                            {post.title}
                        </h1>
                    </motion.div>

                    {/* Featured Image */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="relative aspect-video rounded-3xl overflow-hidden mb-12 border border-white/10"
                    >
                        <img
                            src={post.image}
                            alt={post.title}
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent opacity-40" />
                    </motion.div>

                    {/* Content */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="prose prose-invert prose-lg max-w-none font-['Inter'] prose-headings:font-['Plus_Jakarta_Sans'] prose-headings:font-bold prose-p:text-gray-300 prose-a:text-[#CCFF00] prose-strong:text-white"
                        dangerouslySetInnerHTML={{ __html: post.content }}
                    />

                    {/* Share Section */}
                    <div className="mt-16 pt-8 border-t border-white/10 flex justify-between items-center">
                        <p className="text-gray-400 font-['Inter']">Share this article:</p>
                        <div className="flex gap-4">
                            <button className="p-2 rounded-full bg-white/5 hover:bg-[#CCFF00] hover:text-black transition-colors">
                                <Share2 size={20} />
                            </button>
                            {/* Add real share functionality later if needed */}
                        </div>
                    </div>

                </div>
            </article>
        </>
    );
};

export default BlogPost;
