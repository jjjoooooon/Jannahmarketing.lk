import React, { useEffect, useState } from 'react';
import { generateBlogTopics } from '../services/geminiService';
import { BlogPost } from '../types';
import { ArrowRight } from 'lucide-react';

const BlogSection: React.FC = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      const generated = await generateBlogTopics();
      const mapped: BlogPost[] = generated.map((g, i) => ({
        id: `post-${i}`,
        title: g.title,
        excerpt: g.excerpt,
        date: 'Oct 12, 2025',
        category: 'Lifestyle'
      }));
      setPosts(mapped);
      setLoading(false);
    };
    fetchPosts();
  }, []);

  return (
    <section id="blog" className="py-20 md:py-32 bg-[#050505] text-white relative">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-10 md:mb-16">
          <div>
            <span className="text-[#CCFF00] font-bold uppercase tracking-widest font-mono text-xs md:text-sm">The Fizz Feed</span>
            <h2 className="text-4xl md:text-7xl font-['Plus_Jakarta_Sans'] font-extrabold mt-2 md:mt-4 tracking-tight">LATEST STORIES</h2>
          </div>
          <button className="hidden md:flex items-center gap-2 text-white hover:text-[#CCFF00] transition-colors border-b border-white/20 pb-1 font-bold uppercase tracking-wider text-sm font-['Inter']">
            View All Posts <ArrowRight size={18} />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {loading
            ? [1, 2, 3].map((n) => (
                <div key={n} className="h-80 md:h-96 bg-white/5 animate-pulse rounded-2xl"></div>
              ))
            : posts.map((post, i) => (
                <div key={post.id} className="group cursor-pointer">
                  <div className="relative h-56 md:h-64 overflow-hidden rounded-2xl mb-4 md:mb-6 bg-gray-800 border border-white/5 group-hover:border-[#CCFF00]/30 transition-colors">
                    <img 
                      src={`https://picsum.photos/seed/${post.title}/600/400`} 
                      alt={post.title} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100 grayscale group-hover:grayscale-0"
                    />
                    <div className="absolute top-4 left-4 bg-black/80 backdrop-blur px-3 py-1 rounded-full text-[10px] md:text-xs font-bold uppercase text-[#CCFF00] border border-[#CCFF00]/20 font-['Inter']">
                      {post.category}
                    </div>
                  </div>
                  <div className="flex items-center gap-4 text-xs md:text-sm text-gray-500 mb-2 md:mb-3 font-mono">
                    <span>{post.date}</span>
                    <span className="w-1 h-1 rounded-full bg-[#CCFF00]"></span>
                    <span>3 min read</span>
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold font-['Plus_Jakarta_Sans'] mb-2 md:mb-3 group-hover:text-[#CCFF00] transition-colors leading-tight">
                    {post.title}
                  </h3>
                  <p className="text-gray-400 leading-relaxed mb-4 line-clamp-2 font-['Inter'] text-sm md:text-base">
                    {post.excerpt}
                  </p>
                  <span className="inline-flex items-center gap-2 text-xs md:text-sm font-bold uppercase tracking-wider group-hover:translate-x-2 transition-transform duration-300 text-white group-hover:text-[#CCFF00] font-['Inter']">
                    Read More <ArrowRight size={14} />
                  </span>
                </div>
              ))}
        </div>
        
        <div className="mt-8 text-center md:hidden">
          <button className="inline-flex items-center gap-2 text-white hover:text-[#CCFF00] transition-colors border-b border-white/20 pb-1 font-bold uppercase tracking-wider text-sm font-['Inter']">
            View All Posts <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;