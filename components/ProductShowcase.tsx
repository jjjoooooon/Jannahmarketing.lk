import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';
import { Product } from '../types';
import { generateMarketingCopy } from '../services/geminiService';
import Bubbles from './Bubbles';

// Import bottle images
import orange from '../assets/orange.png';
import ginger from '../assets/ginger.png';
import cola from '../assets/cola.png';
import creamsoda from '../assets/creamsoda.png';
import nesta from '../assets/nesta.png';

// Updated products array with actual bottle images
const SHOWCASE_PRODUCTS: (Product & { image: string })[] = [
  {
    id: 'orange',
    name: 'Sunstar Orange',
    tagline: 'Citrus Burst',
    description: 'Explosive orange zest with a sparkling finish that wakes up your senses.',
    color: '#FF8C00',
    accent: '#FF8C00',
    flavorProfile: 'Zesty, Sweet, Sharp',
    imagePlaceholderColor: 'bg-orange-500',
    image: orange
  },
  {
    id: 'ginger',
    name: 'Solar Ginger',
    tagline: 'Spiced Refresh',
    description: 'Real ginger root extract delivers a bold, spicy kick that burns so good.',
    color: '#CD853F',
    accent: '#CD853F',
    flavorProfile: 'Spicy, Bold, Invigorating',
    imagePlaceholderColor: 'bg-amber-700',
    image: ginger
  },
  {
    id: 'cola',
    name: 'Midnight Cola',
    tagline: 'Classic Kick',
    description: 'Deep, rich cola notes with the perfect balance of sweetness and carbonation.',
    color: '#4A2C2A',
    accent: '#4A2C2A',
    flavorProfile: 'Bold, Classic, Timeless',
    imagePlaceholderColor: 'bg-stone-800',
    image: cola
  },
  {
    id: 'cream-soda',
    name: 'Cream Dream',
    tagline: 'Smooth Vanilla',
    description: 'Creamy vanilla heaven with a bubbly twist. Pure indulgence in every sip.',
    color: '#FF69B4',
    accent: '#FF69B4',
    flavorProfile: 'Creamy, Dreamy, Sweet',
    imagePlaceholderColor: 'bg-pink-300',
    image: creamsoda
  },
  {
    id: 'nesta',
    name: 'Nesta Ice',
    tagline: 'Tropical Escape',
    description: 'Refreshing peach-infused tea with island vibes and a crisp finish.',
    color: '#00BCD4',
    accent: '#00BCD4',
    flavorProfile: 'Refreshing, Fruity, Tropical',
    imagePlaceholderColor: 'bg-teal-500',
    image: nesta
  },
];

// Single Product Card Component
interface ProductCardProps {
  product: Product & { image: string };
  index: number;
  progress: MotionValue<number>;
  range: [number, number];
  targetScale: number;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, index, progress, range, targetScale }) => {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start end', 'start start'],
  });

  const imageScale = useTransform(scrollYProgress, [0, 1], [1.2, 1]);
  const scale = useTransform(progress, range, [1, targetScale]);

  const [aiText, setAiText] = useState<string>('');

  useEffect(() => {
    let mounted = true;
    generateMarketingCopy(product.name).then(text => {
      if (mounted) setAiText(text);
    });
    return () => { mounted = false; };
  }, [product.name]);

  return (
    <div ref={container} className="h-[100dvh] flex items-center justify-center sticky top-0 bg-[#050505] text-white overflow-hidden border-t border-white/5 pt-10 md:pt-0">
      <Bubbles color={`${product.color}40`} />

      <motion.div
        style={{ scale, backgroundColor: product.color }}
        className="relative flex flex-col md:flex-row w-[92vw] md:w-[90vw] h-[80dvh] md:h-[80vh] rounded-[2rem] overflow-hidden shadow-2xl origin-top"
      >
        {/* Text Content */}
        <div className="w-full md:w-1/2 p-6 md:p-16 flex flex-col justify-center relative z-20 bg-black/20 backdrop-blur-sm md:bg-transparent h-[50%] md:h-auto order-2 md:order-1">
          <div className="flex flex-col h-full justify-center">
            <h3 className="text-[10px] md:text-xl font-bold uppercase tracking-widest mb-1 md:mb-2 opacity-80 font-['Inter']" style={{ color: '#fff' }}>
              {product.tagline}
            </h3>
            <h2 className="text-3xl md:text-8xl font-black mb-2 md:mb-6 leading-[0.9] text-white font-['Plus_Jakarta_Sans'] uppercase tracking-tight">
              {product.name.split(' ')[0]}<br />
              <span className="text-transparent text-outline">{product.name.split(' ')[1]}</span>
            </h2>
            <p className="text-xs md:text-xl font-medium mb-3 md:mb-8 max-w-md text-white/90 line-clamp-3 md:line-clamp-none font-['Inter']">
              {product.description}
            </p>
            <div className="mb-3 md:mb-8 hidden md:block">
              <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest bg-black/20 px-2 py-1 md:px-3 md:py-1 rounded text-white border border-white/20 font-['Inter']">
                AI Generated Vibe:
              </span>
              <p className="italic text-white/90 mt-1 md:mt-2 text-[10px] md:text-sm font-medium font-['Inter'] line-clamp-2">"{aiText || 'Loading vibe...'}"</p>
            </div>
            <Link to="/shop" className="self-start">
              <button className="px-6 py-3 md:px-8 md:py-4 rounded-full bg-white text-black font-bold hover:bg-black hover:text-white border-2 border-white transition-all text-xs md:text-base active:scale-95 touch-manipulation font-['Plus_Jakarta_Sans'] uppercase tracking-wider">
                Taste It
              </button>
            </Link>
          </div>
        </div>

        {/* Visual Content (Actual Bottle Image) */}
        <div className="w-full md:w-1/2 relative h-[50%] md:h-full overflow-hidden flex items-center justify-center bg-black/10 order-1 md:order-2">
          <motion.div style={{ scale: imageScale }} className="relative z-10 w-full h-full flex items-center justify-center">
            {/* Bottle Image */}
            <div className="relative w-auto h-[28dvh] md:h-[65vh] flex items-center justify-center">
              {/* Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/30 to-transparent blur-3xl opacity-50 scale-110" />

              {/* Actual Bottle */}
              <img
                src={product.image}
                alt={product.name}
                className="relative w-auto h-full object-contain drop-shadow-2xl filter brightness-110"
              />
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

const ProductShowcase: React.FC = () => {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start start', 'end end'],
  });

  return (
    <div id="flavors" ref={container} className="relative mt-0 md:mt-20">
      <div className="sticky top-0 h-[8vh] flex items-center justify-center z-10 pointer-events-none mix-blend-difference text-white">
        <h2 className="text-sm md:text-3xl font-bold uppercase tracking-widest bg-white/10 px-4 py-1.5 md:px-6 md:py-2 backdrop-blur-md rounded-full font-['Plus_Jakarta_Sans'] border border-white/20">Flavor Drop</h2>
      </div>
      {SHOWCASE_PRODUCTS.map((product, index) => {
        const targetScale = 1 - ((SHOWCASE_PRODUCTS.length - index) * 0.05);
        return (
          <ProductCard
            key={product.id}
            index={index}
            product={product}
            progress={scrollYProgress}
            range={[index * 0.25, 1]}
            targetScale={targetScale}
          />
        );
      })}
    </div>
  );
};

export default ProductShowcase;