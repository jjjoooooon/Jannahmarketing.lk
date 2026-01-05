import React from 'react';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

const reviews = [
  {
    name: "Alex Chen",
    role: "Fitness Enthusiast",
    company: "Los Angeles, CA",
    text: "Sunstar Orange has become my go-to post-workout drink. The natural ingredients and refreshing taste make it the perfect recovery beverage. Zero sugar and amazing flavor!",
    rating: 5,
    verified: true
  },
  {
    name: "Sarah Martinez",
    role: "Business Owner",
    company: "Miami, FL",
    text: "We stock Sunstar at our café and customers absolutely love it. The quality is exceptional and the variety of flavors keeps everyone coming back for more.",
    rating: 5,
    verified: true
  },
  {
    name: "Marcus Johnson",
    role: "Food Blogger",
    company: "New York, NY",
    text: "As someone who reviews beverages professionally, I'm impressed by Sunstar's commitment to quality. The Midnight Cola is my personal favorite - bold flavor without the guilt.",
    rating: 5,
    verified: true
  }
];

const Testimonials: React.FC = () => {
  return (
    <section className="py-20 md:py-32 bg-[#050505] border-y border-white/5 overflow-hidden">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-[#CCFF00]/10 rounded-full border border-[#CCFF00]/20 mb-4"
          >
            <Star className="w-4 h-4 text-[#CCFF00] fill-[#CCFF00]" />
            <span className="text-[#CCFF00] font-bold uppercase tracking-wider text-xs">Customer Reviews</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-black text-white mb-4 font-['Plus_Jakarta_Sans']"
          >
            What Our Customers Say
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 text-base md:text-lg max-w-2xl mx-auto"
          >
            Join thousands of satisfied customers who've made the switch to Sunstar
          </motion.p>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {reviews.map((review, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.15, duration: 0.5 }}
              viewport={{ once: true }}
              className="relative p-6 md:p-8 rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-transparent backdrop-blur-sm hover:border-[#CCFF00]/30 transition-all duration-300 group"
            >
              {/* Quote Icon */}
              <div className="absolute top-6 right-6 opacity-10 group-hover:opacity-20 transition-opacity">
                <Quote className="w-12 h-12 md:w-16 md:h-16 text-[#CCFF00]" />
              </div>

              {/* Star Rating */}
              <div className="flex gap-1 mb-4">
                {[...Array(review.rating)].map((_, index) => (
                  <Star key={index} className="w-4 h-4 text-[#CCFF00] fill-[#CCFF00]" />
                ))}
              </div>

              {/* Review Text */}
              <p className="text-gray-300 mb-6 leading-relaxed text-sm md:text-base font-['Inter'] relative z-10">
                "{review.text}"
              </p>

              {/* Reviewer Info */}
              <div className="flex items-center justify-between border-t border-white/10 pt-4">
                <div>
                  <h4 className="text-white font-bold font-['Plus_Jakarta_Sans'] text-base md:text-lg">
                    {review.name}
                  </h4>
                  <p className="text-xs text-gray-500 font-medium font-['Inter']">
                    {review.role}
                  </p>
                  <p className="text-xs text-gray-600 font-['Inter']">
                    {review.company}
                  </p>
                </div>
                {review.verified && (
                  <div className="flex items-center gap-1 text-[10px] bg-[#CCFF00]/10 text-[#CCFF00] px-2 py-1 rounded-full border border-[#CCFF00]/20 font-bold uppercase">
                    <Star className="w-3 h-3 fill-[#CCFF00]" />
                    Verified
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Trust Indicators */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-12 md:mt-16 flex flex-wrap justify-center items-center gap-6 md:gap-12 text-center"
        >
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-black text-white mb-1 font-['Plus_Jakarta_Sans']">10K+</div>
            <div className="text-xs md:text-sm text-gray-500 uppercase tracking-wider font-bold">Happy Customers</div>
          </div>
          <div className="hidden md:block w-px h-12 bg-white/10" />
          <div className="text-center">
            <div className="flex items-center gap-1 justify-center mb-1">
              <span className="text-3xl md:text-4xl font-black text-white font-['Plus_Jakarta_Sans']">4.9</span>
              <Star className="w-6 h-6 text-[#CCFF00] fill-[#CCFF00]" />
            </div>
            <div className="text-xs md:text-sm text-gray-500 uppercase tracking-wider font-bold">Average Rating</div>
          </div>
          <div className="hidden md:block w-px h-12 bg-white/10" />
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-black text-white mb-1 font-['Plus_Jakarta_Sans']">100%</div>
            <div className="text-xs md:text-sm text-gray-500 uppercase tracking-wider font-bold">Natural Ingredients</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;