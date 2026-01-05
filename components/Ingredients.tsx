import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Leaf, Droplets, Wind, Sun, BatteryCharging } from 'lucide-react';

const ingredients = [
  { icon: Zap, title: "Ionized Energy", desc: "Charged particles for instant uptake." },
  { icon: Leaf, title: "Organic Extracts", desc: "Sourced from vertical farms." },
  { icon: Droplets, title: "Deep Sea Aqua", desc: "Filtered through volcanic rock." },
  { icon: Sun, title: "Solar Infusion", desc: "Vitamin D boosted naturally." },
  { icon: Wind, title: "Nano Bubbles", desc: "Smoother mouthfeel, longer fizz." },
  { icon: BatteryCharging, title: "Electrolytes", desc: "Hydration at a cellular level." },
];

const Ingredients: React.FC = () => {
  return (
    <section className="py-20 md:py-32 bg-[#050505] relative">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12 md:mb-20">
          <h2 className="text-3xl md:text-6xl font-extrabold font-['Plus_Jakarta_Sans'] text-white mb-4 uppercase tracking-tight">
            The <span className="text-[#CCFF00]">Formula</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-base md:text-lg font-light font-['Inter']">
            We stripped away the junk and rebuilt the soda from the molecular level up. High tech, high taste.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {ingredients.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02, backgroundColor: "rgba(255, 255, 255, 0.05)" }}
              className="bg-white/5 border border-white/10 p-6 md:p-8 rounded-2xl group transition-colors duration-300 relative overflow-hidden hover:border-[#CCFF00]/50"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#CCFF00] blur-[100px] opacity-0 group-hover:opacity-10 transition-opacity duration-500" />
              
              <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-white/5 flex items-center justify-center mb-4 md:mb-6 text-[#CCFF00] group-hover:bg-[#CCFF00] group-hover:text-black transition-colors duration-300">
                <item.icon size={24} className="md:w-7 md:h-7" />
              </div>
              <h3 className="text-lg md:text-xl font-bold text-white font-['Plus_Jakarta_Sans'] mb-2 md:mb-3 uppercase tracking-wide">
                {item.title}
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed font-['Inter']">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Ingredients;