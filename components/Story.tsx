import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Zap, Clock, Trophy } from 'lucide-react';
import { Link } from 'react-router-dom';
import story1 from '../assets/banner.webp'

const Story: React.FC = () => {
  return (
    <section id="our-story" className="relative py-12 md:py-32 bg-brand-black overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">

          {/* Visual Side */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative order-2 lg:order-1"
          >
            <div className="relative rounded-3xl overflow-hidden border border-white/10 aspect-square lg:aspect-4/5 group">
              <div className="absolute inset-0 bg-linear-to-t from-black via-transparent to-transparent z-10" />
              <img
                src={story1}
                alt="Sunstar Carbonated Soda"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />

              {/* Floating Stats Card */}
              <div className="absolute bottom-8 left-8 right-8 z-20">
                <div className="bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-2xl">
                  <div className="flex justify-between items-end">
                    <div>
                      <p className="text-gray-300 text-sm font-medium mb-1">Market Growth</p>
                      <h4 className="text-3xl font-black text-white">+240%</h4>
                    </div>
                    <div className="w-12 h-12 bg-brand-lime rounded-full flex items-center justify-center text-black">
                      <TrendingUp className="w-6 h-6" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute -top-10 -left-10 w-32 h-32 bg-brand-lime rounded-full blur-[80px] opacity-20" />
            <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-brand-lime rounded-full blur-[80px] opacity-20" />
          </motion.div>

          {/* Content Side */}
          <div className="order-1 lg:order-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-brand-lime/10 rounded-full border border-brand-lime/20 mb-6"
            >
              <Zap className="w-4 h-4 text-brand-lime" />
              <span className="text-brand-lime font-bold uppercase tracking-wider text-xs">The Birthplace</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-6xl font-black text-white mb-6 font-['Plus_Jakarta_Sans'] leading-tight"
            >
              From Sainthamaruthu <br />
              <span className="text-brand-lime">To The Island</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-gray-400 text-lg mb-8 leading-relaxed font-['Inter']"
            >
              Jannah Marketing (Pvt) Ltd didn't start in a corporate office. We started in Sainthamaruthu back in 2023, driven by a simple love for that perfect soda fizz. We wanted to create a drink that hits different—powerful carbonation and bold, refreshing flavors.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="grid grid-cols-2 gap-6 mb-10"
            >
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                  <Clock className="w-6 h-6 text-brand-lime" />
                </div>
                <div>
                  <h4 className="text-white font-bold text-lg">Maximum Fizz</h4>
                  <p className="text-gray-500 text-sm">High carbonation for that real kick.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                  <Trophy className="w-6 h-6 text-brand-lime" />
                </div>
                <div>
                  <h4 className="text-white font-bold text-lg">Bold Flavors</h4>
                  <p className="text-gray-500 text-sm">Perfectly crafted taste.</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              <Link
                to="/about"
                className="inline-flex items-center gap-2 text-white font-bold hover:text-brand-lime transition-colors group"
              >
                Read our full story
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};

// Import TrendingUp icon which was missing in the top imports
import { TrendingUp } from 'lucide-react';

export default Story;