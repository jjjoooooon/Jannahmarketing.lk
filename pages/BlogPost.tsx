import React, { useEffect, memo, useState, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft, Calendar, Share2, Clock } from 'lucide-react';
import { BLOG_POSTS } from '../data/blogPosts';

const BlogPost: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const post = BLOG_POSTS.find(p => p.id === id);

    const [headerVisible, setHeaderVisible] = useState(false);
    const [imageVisible, setImageVisible] = useState(false);
    const [contentVisible, setContentVisible] = useState(false);

    const headerRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!post) { navigate('/blog'); return; }

        const obsOptions = { threshold: 0.1 };
        const hObs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setHeaderVisible(true); hObs.disconnect(); } }, obsOptions);
        const iObs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setImageVisible(true); iObs.disconnect(); } }, obsOptions);
        const cObs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setContentVisible(true); cObs.disconnect(); } }, obsOptions);

        if (headerRef.current) hObs.observe(headerRef.current);
        if (imageRef.current) iObs.observe(imageRef.current);
        if (contentRef.current) cObs.observe(contentRef.current);

        return () => { hObs.disconnect(); iObs.disconnect(); cObs.disconnect(); };
    }, [post, navigate]);

    if (!post) return null;
    const IconComponent = post.icon;

    return (
        <div className="bg-brand-black min-h-screen text-white pt-24 pb-20 overflow-x-hidden">
            <Helmet>
                <title>{post.title} - Jannah Marketing Blog</title>
                <meta name="description" content={post.excerpt} />
                <link rel="canonical" href={`https://jannahmarketing.lk/blog/${post.id}`} />
            </Helmet>

            <article className="container mx-auto px-6 max-w-4xl">
                {/* Back Button */}
                <Link to="/blog" className="inline-flex items-center gap-2 text-gray-500 hover:text-brand-lime transition-colors mb-8 font-sans text-[10px] font-black uppercase tracking-[0.2em]">
                    <ArrowLeft size={16} /> Back to Blog
                </Link>

                {/* Header */}
                <header
                    ref={headerRef}
                    className="transition-all duration-700 ease-out will-change-transform"
                    style={{
                        opacity: headerVisible ? 1 : 0,
                        transform: headerVisible ? 'translate3d(0, 0, 0)' : 'translate3d(0, 20px, 0)'
                    }}
                >
                    <div className="flex flex-wrap items-center gap-4 mb-6">
                        <span className="inline-flex items-center gap-2 px-3 py-1 bg-brand-lime/10 rounded-full border border-brand-lime/20 text-brand-lime text-[10px] font-black uppercase tracking-widest leading-none">
                            <IconComponent size={14} />
                            {post.category}
                        </span>
                        <span className="text-gray-500 text-xs font-sans flex items-center gap-2 uppercase tracking-widest">
                            <Calendar size={14} /> {post.date}
                        </span>
                        <span className="text-gray-500 text-xs font-sans flex items-center gap-2 uppercase tracking-widest">
                            <Clock size={14} /> {post.readTime}
                        </span>
                    </div>

                    <h1 className="text-3xl md:text-5xl lg:text-7xl font-black font-display mb-8 leading-tight uppercase tracking-tighter italic">
                        {post.title}
                    </h1>
                </header>

                {/* Featured Image */}
                <div
                    ref={imageRef}
                    className="relative aspect-video rounded-3xl overflow-hidden mb-12 border border-white/10 transition-all duration-1000 ease-out will-change-transform"
                    style={{
                        opacity: imageVisible ? 1 : 0,
                        transform: imageVisible ? 'scale(1)' : 'scale(0.95)'
                    }}
                >
                    <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-transparent to-transparent opacity-40" />
                </div>

                {/* Content */}
                <div
                    ref={contentRef}
                    className="transition-all duration-700 delay-200 ease-out will-change-transform"
                    style={{
                        opacity: contentVisible ? 1 : 0,
                        transform: contentVisible ? 'translate3d(0, 0, 0)' : 'translate3d(0, 20px, 0)'
                    }}
                >
                    <div
                        className="prose prose-invert prose-lg max-w-none font-sans prose-headings:font-display prose-headings:font-black prose-headings:uppercase prose-headings:tracking-tight prose-p:text-gray-400 prose-p:leading-relaxed prose-a:text-brand-lime prose-strong:text-white"
                        dangerouslySetInnerHTML={{ __html: post.content }}
                    />

                    {/* Share Section */}
                    <div className="mt-16 pt-8 border-t border-white/10 flex justify-between items-center">
                        <p className="text-gray-500 font-sans uppercase tracking-[0.2em] text-[10px] font-black">Share this article</p>
                        <div className="flex gap-4">
                            <button className="w-12 h-12 rounded-full border border-white/10 bg-white/5 hover:bg-brand-lime hover:border-brand-lime hover:text-black flex items-center justify-center transition-all active:scale-95">
                                <Share2 size={20} />
                            </button>
                        </div>
                    </div>
                </div>
            </article>
        </div>
    );
};

export default memo(BlogPost);
