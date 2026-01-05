import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Newspaper, ChefHat, Leaf, Calendar } from 'lucide-react';

// Beverage company content types
const contentPosts = [
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

const BlogSection: React.FC = () => {
  return (
    <section id="blog" className="py-20 md:py-32 bg-[#050505] text-white relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 right-20 w-96 h-96 bg-[#CCFF00] rounded-full blur-[120px]" />
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-[#CCFF00] rounded-full blur-[120px]" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 md:mb-16">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-[#CCFF00]/10 rounded-full border border-[#CCFF00]/20 mb-4"
            >
              <Newspaper className="w-4 h-4 text-[#CCFF00]" />
              <span className="text-[#CCFF00] font-bold uppercase tracking-wider text-xs">Latest Updates</span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-3xl md:text-6xl font-['Plus_Jakarta_Sans'] font-black tracking-tight"
            >
              News & Resources
            </motion.h2>
          </div>
          <motion.button
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="hidden md:flex items-center gap-2 text-white hover:text-[#CCFF00] transition-colors group font-bold uppercase tracking-wider text-sm font-['Inter']"
          >
            View All <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </motion.button>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {contentPosts.map((post, i) => {
            const IconComponent = post.icon;
            return (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.5 }}
                className="group cursor-pointer"
              >
                {/* Image Container */}
                <div className="relative h-56 md:h-64 overflow-hidden rounded-2xl mb-4 md:mb-6 bg-gray-800 border border-white/10 group-hover:border-[#CCFF00]/30 transition-all duration-300">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  {/* Overlay Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                  {/* Category Badge */}
                  <div className="absolute top-4 left-4 flex items-center gap-2 bg-black/80 backdrop-blur-sm px-3 py-1.5 rounded-full border border-[#CCFF00]/20">
                    <IconComponent className="w-3 h-3 text-[#CCFF00]" />
                    <span className="text-[10px] md:text-xs font-bold uppercase text-[#CCFF00] font-['Inter']">
                      {post.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="flex items-center gap-3 text-xs text-gray-500 mb-3 font-['Inter']">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3 h-3" />
                    <span>{post.date}</span>
                  </div>
                  <span className="w-1 h-1 rounded-full bg-[#CCFF00]"></span>
                  <span>{post.readTime}</span>
                </div>

                <h3 className="text-xl md:text-2xl font-bold font-['Plus_Jakarta_Sans'] mb-3 group-hover:text-[#CCFF00] transition-colors leading-tight">
                  {post.title}
                </h3>

                <p className="text-gray-400 leading-relaxed mb-4 line-clamp-2 font-['Inter'] text-sm md:text-base">
                  {post.excerpt}
                </p>

                <span className="inline-flex items-center gap-2 text-xs md:text-sm font-bold uppercase tracking-wider group-hover:gap-3 transition-all duration-300 text-white group-hover:text-[#CCFF00] font-['Inter']">
                  Read More <ArrowRight size={14} />
                </span>
              </motion.div>
            );
          })}
        </div>

        {/* Mobile View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-10 text-center md:hidden"
        >
          <button className="inline-flex items-center gap-2 text-white hover:text-[#CCFF00] transition-colors group font-bold uppercase tracking-wider text-sm font-['Inter']">
            View All <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default BlogSection;