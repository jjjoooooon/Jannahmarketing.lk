import React, { memo } from 'react';
import { motion, Variants } from 'framer-motion';
import { ArrowRight, Newspaper, ChefHat, Leaf, Calendar, LucideIcon } from 'lucide-react';

// --- Types ---
interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  icon: LucideIcon;
  image: string;
  readTime: string;
}

// --- Constants (Defined outside to prevent recreation) ---
const BLOG_POSTS: readonly BlogPost[] = [
  {
    id: 'news-1',
    title: 'Sunstar Launches New Tropical Flavor Line',
    excerpt: 'Introducing our latest innovation - a refreshing blend of exotic fruits with zero sugar. Available in stores nationwide starting next month.',
    date: 'Jan 3, 2026',
    category: 'News',
    icon: Newspaper,
    image: 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=600&h=400&fit=crop',
    readTime: '2 min read'
  },
  {
    id: 'recipe-1',
    title: 'Summer Mocktail Recipes with Sunstar',
    excerpt: 'Beat the heat with these refreshing mocktail recipes featuring Sunstar Orange and Nesta Ice. Perfect for your next backyard party.',
    date: 'Dec 28, 2025',
    category: 'Recipes',
    icon: ChefHat,
    image: 'https://images.unsplash.com/photo-1514361892635-6b07e31e75f9?w=600&h=400&fit=crop',
    readTime: '5 min read'
  },
  {
    id: 'sustainability-1',
    title: 'Our Commitment to 100% Recyclable Packaging',
    excerpt: 'Learn about our journey towards sustainability and how we\'re reducing our environmental footprint while delivering the drinks you love.',
    date: 'Dec 20, 2025',
    category: 'Sustainability',
    icon: Leaf,
    image: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=600&h=400&fit=crop',
    readTime: '4 min read'
  }
];

// --- Animation Variants ---
const SECTION_VARIANTS: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 } // Handles the delay logic automatically
  }
};

const FADE_UP_VARIANTS: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" }
  }
};

// --- Sub-Component (Memoized for Performance) ---
const BlogPostCard = memo(({ post }: { post: BlogPost }) => {
  const IconComponent = post.icon;

  return (
    <motion.div
      variants={FADE_UP_VARIANTS}
      className="group cursor-pointer flex flex-col h-full"
    >
      {/* Image Container */}
      <div className="relative h-56 md:h-64 overflow-hidden rounded-2xl mb-4 md:mb-6 bg-gray-800 border border-white/10 group-hover:border-[#CCFF00]/30 transition-colors duration-300 isolate">
        <img
          src={post.image}
          alt={post.title}
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 transform-gpu will-change-transform"
        />
        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

        {/* Category Badge */}
        <div className="absolute top-4 left-4 flex items-center gap-2 bg-black/80 backdrop-blur-sm px-3 py-1.5 rounded-full border border-[#CCFF00]/20 z-10">
          <IconComponent className="w-3 h-3 text-[#CCFF00]" />
          <span className="text-[10px] md:text-xs font-bold uppercase text-[#CCFF00] font-['Inter']">
            {post.category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-grow">
        <div className="flex items-center gap-3 text-xs text-gray-500 mb-3 font-['Inter']">
          <div className="flex items-center gap-1.5">
            <Calendar className="w-3 h-3" />
            <span>{post.date}</span>
          </div>
          <span className="w-1 h-1 rounded-full bg-[#CCFF00]" />
          <span>{post.readTime}</span>
        </div>

        <h3 className="text-xl md:text-2xl font-bold font-['Plus_Jakarta_Sans'] mb-3 group-hover:text-[#CCFF00] transition-colors leading-tight">
          {post.title}
        </h3>

        <p className="text-gray-400 leading-relaxed mb-4 line-clamp-2 font-['Inter'] text-sm md:text-base flex-grow">
          {post.excerpt}
        </p>

        <div className="mt-auto">
          <span className="inline-flex items-center gap-2 text-xs md:text-sm font-bold uppercase tracking-wider group-hover:gap-3 transition-all duration-300 text-white group-hover:text-[#CCFF00] font-['Inter']">
            Read More <ArrowRight size={14} />
          </span>
        </div>
      </div>
    </motion.div>
  );
});

// --- Main Component ---
const BlogSection: React.FC = () => {
  return (
    <section id="blog" className="py-20 md:py-32 bg-[#050505] text-white relative overflow-hidden">

      {/* Background Decoration - Optimized with minimal DOM */}
      <div className="absolute inset-0 opacity-5 pointer-events-none select-none">
        <div className="absolute top-20 right-20 w-96 h-96 bg-[#CCFF00] rounded-full blur-[120px] transform-gpu" />
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-[#CCFF00] rounded-full blur-[120px] transform-gpu" />
      </div>

      <motion.div
        className="container mx-auto px-6 relative z-10"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={SECTION_VARIANTS}
      >
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 md:mb-16">
          <div>
            <motion.div
              variants={FADE_UP_VARIANTS}
              className="inline-flex items-center gap-2 px-4 py-2 bg-[#CCFF00]/10 rounded-full border border-[#CCFF00]/20 mb-4"
            >
              <Newspaper className="w-4 h-4 text-[#CCFF00]" />
              <span className="text-[#CCFF00] font-bold uppercase tracking-wider text-xs">Latest Updates</span>
            </motion.div>
            <motion.h2
              variants={FADE_UP_VARIANTS}
              className="text-3xl md:text-6xl font-['Plus_Jakarta_Sans'] font-black tracking-tight"
            >
              News & Resources
            </motion.h2>
          </div>

          <motion.div variants={FADE_UP_VARIANTS} className="hidden md:block">
            <button className="flex items-center gap-2 text-white hover:text-[#CCFF00] transition-colors group font-bold uppercase tracking-wider text-sm font-['Inter']">
              View All <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {BLOG_POSTS.map((post) => (
            <BlogPostCard key={post.id} post={post} />
          ))}
        </div>

        {/* Mobile View All Button */}
        <motion.div
          variants={FADE_UP_VARIANTS}
          className="mt-10 text-center md:hidden"
        >
          <button className="inline-flex items-center gap-2 text-white hover:text-[#CCFF00] transition-colors group font-bold uppercase tracking-wider text-sm font-['Inter']">
            View All <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default memo(BlogSection);