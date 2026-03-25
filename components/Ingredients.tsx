import React, { memo } from 'react';
import { Zap, Leaf, Droplets, Wind, Sun, BatteryCharging } from 'lucide-react';

const ingredients = [
  { icon: Zap, title: "TRIPLE FILTERED WATER", desc: "Our water goes through high-tech filtration to ensure every sip is as pure as it gets." },
  { icon: Leaf, title: "HIGH CARBONATION", desc: "We don't do weak bubbles. Sunstar is packed with the crisp, sharp fizz that soda lovers crave." },
  { icon: Droplets, title: "BOLD FLAVORING", desc: "Our artificial flavors are carefully crafted to deliver that punchy, nostalgic taste in every bottle." },
  { icon: Sun, title: "PERFECT CHILL", desc: "Designed to be served ice cold, our soda holds its carbonation longer for maximum refreshment." },
  { icon: Wind, title: "CLEAN FINISH", desc: "No weird aftertaste here. Just a smooth, refreshing finish that clears the palate." },
  { icon: BatteryCharging, title: "CONSISTENT QUALITY", desc: "Same great fizz, same bold flavor. From Sainthamaruthu to your doorstep, every time." },
];

const Ingredients: React.FC = memo(() => {
  return (
    <section className="py-20 md:py-32 bg-brand-black relative">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12 md:mb-20 animate-fade-in-up">
          <h2 className="text-3xl md:text-6xl font-black font-display text-white mb-4 uppercase tracking-tighter">
            The <span className="text-brand-lime">Formula</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-base md:text-lg font-medium font-sans">
            We've perfected the science of the fizz. High carbonation, bold flavors, and zero excuses. This is soda how it should be.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {ingredients.map((item, i) => (
            <div
              key={i}
              className="bg-white/5 border border-white/10 p-6 md:p-8 rounded-2xl group transition-all duration-300 relative overflow-hidden hover:border-brand-lime/50 animate-fade-in-up opacity-0 hover:scale-[1.02] active:scale-95 cursor-default"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-brand-lime blur-[100px] opacity-0 group-hover:opacity-10 transition-opacity duration-500" />

              <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-white/5 flex items-center justify-center mb-4 md:mb-6 text-brand-lime group-hover:bg-brand-lime group-hover:text-black transition-colors duration-300">
                <item.icon size={24} className="md:w-7 md:h-7" />
              </div>
              <h3 className="text-lg md:text-xl font-bold text-white font-display mb-2 md:mb-3 uppercase tracking-wide">
                {item.title}
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed font-sans">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
});

export default Ingredients;