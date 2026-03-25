import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Newspaper, Calendar } from 'lucide-react';

import { BLOG_POSTS, BlogPost } from '../data/blogPosts';

// --- Sub-Component (Memoized for Performance) ---
const BlogPostCard = memo(({ post, index }: { post: BlogPost, index: number }) => {
  const IconComponent = post.icon;

  return (
    <Link to={`/blog/${post.id}`} className="block h-full animate-fade-in-up opacity-0" style={{ animationDelay: `${index * 150}ms`, animationFillMode: 'forwards' }}>
      <div className="group cursor-pointer flex flex-col h-full">
        {/* Image Container */}
        <div className="relative h-56 md:h-64 overflow-hidden rounded-2xl mb-4 md:mb-6 bg-gray-800 border border-white/10 group-hover:border-brand-lime/30 transition-colors duration-300 isolate">
          <img
            src={post.image}
            alt={post.title}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 transform-gpu will-change-transform"
          />
          {/* Overlay Gradient */}
          <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

          {/* Category Badge */}
          <div className="absolute top-4 left-4 flex items-center gap-2 bg-black/80 backdrop-blur-sm px-3 py-1.5 rounded-full border border-brand-lime/20 z-10">
            <IconComponent className="w-3 h-3 text-brand-lime" />
            <span className="text-[10px] md:text-xs font-bold uppercase text-brand-lime font-sans">
              {post.category}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-col grow">
          <div className="flex items-center gap-3 text-xs text-gray-500 mb-3 font-sans">
            <div className="flex items-center gap-1.5">
              <Calendar className="w-3 h-3" />
              <span>{post.date}</span>
            </div>
            <span className="w-1 h-1 rounded-full bg-brand-lime" />
            <span>{post.readTime}</span>
          </div>

          <h3 className="text-xl md:text-2xl font-bold font-display mb-3 group-hover:text-brand-lime transition-colors leading-tight">
            {post.title}
          </h3>

          <p className="text-gray-400 leading-relaxed mb-4 line-clamp-2 font-sans text-sm md:text-base grow">
            {post.excerpt}
          </p>

          <div className="mt-auto">
            <span className="inline-flex items-center gap-2 text-xs md:text-sm font-bold uppercase tracking-wider group-hover:gap-3 transition-all duration-300 text-white group-hover:text-brand-lime font-sans">
              Read More <ArrowRight size={14} />
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
});

// --- Main Component ---
const BlogSection: React.FC = () => {
  return (
    <section id="blog" className="py-20 md:py-32 bg-brand-black text-white relative overflow-hidden">

      {/* Background Decoration */}
      <div className="absolute inset-0 opacity-5 pointer-events-none select-none">
        <div className="absolute top-20 right-20 w-96 h-96 bg-brand-lime rounded-full blur-[120px] transform-gpu" />
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-brand-lime rounded-full blur-[120px] transform-gpu" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 md:mb-16 animate-fade-in-up">
          <div>
            <div
              className="inline-flex items-center gap-2 px-4 py-2 bg-brand-lime/10 rounded-full border border-brand-lime/20 mb-4"
            >
              <Newspaper className="w-4 h-4 text-brand-lime" />
              <span className="text-brand-lime font-bold uppercase tracking-wider text-xs">Latest Updates</span>
            </div>
            <h2
              className="text-3xl md:text-6xl font-display font-black tracking-tighter"
            >
              News & Resources
            </h2>
          </div>

          <div className="hidden md:block">
            <Link to="/blog" className="flex items-center gap-2 text-white hover:text-brand-lime transition-colors group font-bold uppercase tracking-wider text-sm font-sans">
              View All <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {BLOG_POSTS.map((post, i) => (
            <BlogPostCard key={post.id} post={post} index={i} />
          ))}
        </div>

        {/* Mobile View All Button */}
        <div
          className="mt-10 text-center md:hidden animate-fade-in-up opacity-0"
          style={{ animationDelay: '450ms', animationFillMode: 'forwards' }}
        >
          <Link to="/blog" className="inline-flex items-center gap-2 text-white hover:text-brand-lime transition-colors group font-bold uppercase tracking-wider text-sm font-sans">
            View All <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default memo(BlogSection);