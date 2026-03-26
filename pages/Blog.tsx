import React, { memo, useEffect, useRef, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { ArrowRight, Calendar, Search } from 'lucide-react';
import { BLOG_POSTS } from '../data/blogPosts';

// --- Sub-Components ---

const BlogCard = memo(({ post, visible, delay }: { post: typeof BLOG_POSTS[0], visible: boolean, delay: number }) => {
    const IconComponent = post.icon;
    return (
        <Link
            to={`/blog/${post.id}`}
            className="block h-full transition-all duration-700 ease-out will-change-transform"
            style={{
                opacity: visible ? 1 : 0,
                transform: visible ? 'translate3d(0, 0, 0)' : 'translate3d(0, 30px, 0)',
                transitionDelay: `${delay}ms`
            }}
        >
            <article className="group flex flex-col h-full bg-white/5 rounded-3xl overflow-hidden border border-white/5 hover:border-brand-lime/30 transition-all duration-300">
                {/* Image */}
                <div className="relative h-64 overflow-hidden">
                    <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-black to-transparent opacity-60" />

                    <div className="absolute top-4 left-4 flex items-center gap-2 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">
                        <IconComponent className="w-3 h-3 text-brand-lime" />
                        <span className="text-[10px] font-bold uppercase text-white font-sans">
                            {post.category}
                        </span>
                    </div>
                </div>

                {/* Content */}
                <div className="p-6 md:p-8 flex flex-col flex-grow">
                    <div className="flex items-center gap-3 text-xs text-gray-500 mb-4 font-sans">
                        <div className="flex items-center gap-1.5">
                            <Calendar className="w-3 h-3" />
                            <span>{post.date}</span>
                        </div>
                        <span className="w-1 h-1 rounded-full bg-brand-lime" />
                        <span>{post.readTime}</span>
                    </div>

                    <h2 className="text-xl md:text-2xl font-bold font-display mb-3 group-hover:text-brand-lime transition-colors leading-tight uppercase tracking-tight">
                        {post.title}
                    </h2>

                    <p className="text-gray-400 text-sm leading-relaxed mb-6 line-clamp-3 font-sans flex-grow">
                        {post.excerpt}
                    </p>

                    <span className="inline-flex items-center gap-2 text-white font-bold uppercase tracking-widest text-[10px] group-hover:gap-3 transition-all duration-300">
                        Read Article <ArrowRight size={14} className="text-brand-lime" />
                    </span>
                </div>
            </article>
        </Link>
    );
});

const Blog: React.FC = () => {
    const [visible, setVisible] = useState(false);
    const [headerVisible, setHeaderVisible] = useState(false);
    const headerRef = useRef<HTMLDivElement>(null);
    const gridRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const obsOptions = { threshold: 0.1 };

        const hObs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setHeaderVisible(true); hObs.disconnect(); } }, obsOptions);
        const gObs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); gObs.disconnect(); } }, obsOptions);

        if (headerRef.current) hObs.observe(headerRef.current);
        if (gridRef.current) gObs.observe(gridRef.current);

        return () => { hObs.disconnect(); gObs.disconnect(); };
    }, []);

    return (
        <div className="min-h-screen bg-brand-black text-white pt-24 pb-20 overflow-x-hidden">
            <Helmet>
                <title>Blog - Jannah Marketing | News, Recipes & Updates</title>
                <meta name="description" content="Stay updated with the latest news, refreshing recipes, and sustainability initiatives from Jannah Marketing. Discover how we're redefining carbonated beverages." />
                <link rel="canonical" href="https://jannahmarketing.lk/blog" />
            </Helmet>

            {/* Background Elements */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-brand-lime rounded-full blur-[150px] opacity-5" />
                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-brand-lime rounded-full blur-[150px] opacity-5" />
            </div>

            <div className="container mx-auto px-6 relative z-10">

                {/* Header */}
                <div
                    ref={headerRef}
                    className="text-center max-w-3xl mx-auto mb-16 md:mb-24 transition-all duration-700 ease-out will-change-transform"
                    style={{
                        opacity: headerVisible ? 1 : 0,
                        transform: headerVisible ? 'translate3d(0, 0, 0)' : 'translate3d(0, 20px, 0)'
                    }}
                >
                    <span className="inline-block text-brand-lime font-bold uppercase tracking-widest text-[10px] mb-4 px-3 py-1 bg-brand-lime/10 rounded-full border border-brand-lime/20">
                        The Fizz Feed
                    </span>
                    <h1 className="text-4xl md:text-7xl font-black font-display mb-6 tracking-tighter uppercase italic">
                        Stories & <span className="text-transparent text-outline">Sips</span>
                    </h1>
                    <p className="text-gray-400 text-lg md:text-xl font-sans leading-relaxed">
                        Dive into our world of flavor. From mixology secrets to behind-the-scenes stories, explore what makes Jannah Marketing sparkle.
                    </p>

                    <div className="mt-8 relative max-w-md mx-auto">
                        <input
                            type="text"
                            placeholder="Search articles..."
                            className="w-full bg-white/5 border border-white/10 rounded-full py-4 pl-12 pr-4 text-white placeholder-gray-500 focus:outline-none focus:border-brand-lime/50 transition-colors font-sans"
                        />
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                    </div>
                </div>

                {/* Blog Grid */}
                <div
                    ref={gridRef}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                    {BLOG_POSTS.map((post, i) => (
                        <BlogCard key={post.id} post={post} visible={visible} delay={i * 100} />
                    ))}
                </div>

            </div>
        </div>
    );
};

export default memo(Blog);
