import React, { useRef, useState, useEffect, memo, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';
import { Product } from '../types';

// import { generateMarketingCopy } from '../services/geminiService'; // Removed for performance
// import Bubbles from './Bubbles'; // Disable Bubbles for testing performance if needed

// Import bottle images
import orange from '../assets/orange.webp';
import ginger from '../assets/ginger.webp';
import cola from '../assets/cola.webp';
import creamsoda from '../assets/creamsoda.webp';
import nesta from '../assets/nesta.webp';

// --- Constants & Types ---
interface ExtendedProduct extends Product {
  image: string;
  sizes: readonly string[];
}

const PRODUCT_SIZES = ['250ml', '330ml', '750ml', '1050ml', '1.5L'] as const;

const SHOWCASE_PRODUCTS: ExtendedProduct[] = [
  {
    id: 'orange',
    name: 'Sunstar Orange',
    tagline: 'The Classic Refresh',
    description: 'The soda that everybody loves. It\'s sweet, tangy, and has that perfect orange kick that makes you want more.',
    color: '#F37021', // Classic Orange
    accent: '#F37021',
    flavorProfile: 'Sweet, Zesty, Classic',
    imagePlaceholderColor: 'bg-orange-600',
    image: orange,
    sizes: PRODUCT_SIZES
  },
  {
    id: 'ginger',
    name: 'Solar Ginger',
    tagline: 'That Spicy Kick',
    description: 'If you like that real ginger burn, this is for you. It\'s bold, it\'s spicy, and it\'s the best partner for your favorite Sri Lankan rice and curry.',
    color: '#005432', // Deep EGB Green
    accent: '#D4AF37', // Gold accent
    flavorProfile: 'Spicy, Strong, Bold',
    imagePlaceholderColor: 'bg-green-900',
    image: ginger,
    sizes: PRODUCT_SIZES
  },
  {
    id: 'cola',
    name: 'Midnight Cola',
    tagline: 'Nothing Beats Cola',
    description: 'A deep, rich cola flavor with maximum fizz. Whether you\'re at a party or just thirsty, this is the one you reach for.',
    color: '#2B1B17', // Cola Brown-Black
    accent: '#ED1C24', // Classic Red accent
    flavorProfile: 'Bold, Fizzy, Rich',
    imagePlaceholderColor: 'bg-black',
    image: cola,
    sizes: PRODUCT_SIZES
  },
  {
    id: 'cream-soda',
    name: 'Cream Dream',
    tagline: 'Smooth and Sweet',
    description: 'That classic green soda we all grew up with. It\'s sweet, creamy, and has that vanilla vibe that takes you back to childhood.',
    color: '#00A651', // Classic Sri Lankan Cream Soda Green
    accent: '#00A651',
    flavorProfile: 'Creamy, Vanilla, Sweet',
    imagePlaceholderColor: 'bg-green-500',
    image: creamsoda,
    sizes: PRODUCT_SIZES
  },
  {
    id: 'nesta',
    name: 'Nesta Ice',
    tagline: 'Refreshing Peach Tea',
    description: 'A cool mix of tea and peach. It\'s not just a drink; it\'s a vibe. Perfect for a hot afternoon when you need something light and fruity.',
    color: '#D2691E', // Tea/Amber
    accent: '#008B8B', // Teal accent
    flavorProfile: 'Fruity, Cool, Light',
    imagePlaceholderColor: 'bg-amber-800',
    image: nesta,
    sizes: PRODUCT_SIZES
  },
];

// --- Sub-Components ---

const BottleImage = memo(({ src, alt }: { src: string; alt: string }) => (
  // Optimization: Removed blur-3xl which kills mobile FPS. Used simple opacity gradient.
  <div className="relative w-auto h-[28dvh] md:h-[65vh] flex items-center justify-center transform-gpu">
    {/* Optimized Glow: Simple radial gradient instead of blur filter */}
    <div
      className="absolute inset-0 opacity-40 scale-110 pointer-events-none"
      style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 70%)' }}
    />

    <img
      src={src}
      alt={alt}
      loading="eager" // Load these eager as they are the main show
      decoding="async"
      className="relative w-auto h-full object-contain drop-shadow-xl" // Reduced shadow complexity
    />
  </div>
));

interface ProductCardProps {
  product: ExtendedProduct;
  index: number;
  total: number;
  progress: MotionValue<number>;
}

const ProductCard: React.FC<ProductCardProps> = memo(({ product, index, total, progress }) => {
  const [aiText, setAiText] = useState<string>('');

  // --- Optimization: Single Scroll Source ---
  // Instead of creating a new useScroll for every card (expensive!), 
  // we derive animation values from the PARENT progress passed down.

  // Calculate when this specific card is active in the scroll timeline
  // We divide the total scroll (0 to 1) into segments for each card
  const step = 1 / total;
  const start = index * step;
  const end = start + step;

  // Scale Effect: Stacking cards scale down slightly as they go up
  const targetScale = 1 - ((total - index) * 0.05);

  // We map the GLOBAL progress to this card's specific scale needs
  // The range [0, 1] essentially says "listen to the whole scroll interaction"
  // but we clamp it so it doesn't shrink infinitely.
  const scale = useTransform(progress, [start, 1], [1, targetScale]);

  // Parallax for image: As global progress moves, shift image slightly
  const imageScale = useTransform(progress, [start, end], [1.1, 1]);

  // --- Optimization: Static Text ---
  // Removed AI generation for performance. Using static description from product data.
  useEffect(() => {
    setAiText(product.description);
  }, [product.description]);

  const [firstName, secondName] = product.name.split(' ');

  return (
    // Height container needs to be strictly defined to prevent "half showing" glitch
    <div className="h-dvh flex items-center justify-center sticky top-0">

      <motion.div
        style={{
          scale,
          backgroundColor: product.color,
          // Force hardware acceleration to prevent repaint lag
          transform: 'translateZ(0)'
        }}
        className="relative flex flex-col md:flex-row w-[95vw] md:w-[90vw] h-[90dvh] md:h-[85vh] rounded-4xl overflow-hidden shadow-xl origin-top will-change-transform"
      >
        {/* Text Content */}
        <div className="w-full md:w-1/2 p-6 md:p-14 flex flex-col justify-center relative z-20 h-[45%] md:h-auto order-2 md:order-1">
          {/* Removed backdrop-blur-sm for performance. Using simple semi-transparent bg */}
          <div className="absolute inset-0 bg-black/10 md:bg-transparent pointer-events-none" />

          <div className="relative z-10 flex flex-col h-full justify-center">
            <h3 className="text-[10px] md:text-xl font-bold uppercase tracking-widest mb-1 md:mb-2 opacity-80 font-['Inter'] text-white">
              {product.tagline}
            </h3>

            <h2 className="text-4xl md:text-8xl font-black mb-2 md:mb-6 leading-[0.9] text-white font-['Plus_Jakarta_Sans'] uppercase tracking-tight">
              {firstName}<br />
              <span className="text-transparent text-outline">{secondName}</span>
            </h2>

            <p className="text-sm md:text-xl font-medium mb-3 md:mb-8 max-w-md text-white/90 line-clamp-3 md:line-clamp-none font-['Inter']">
              {product.description}
            </p>

            {/* Sizes - Hidden on very small screens to save space if needed */}
            <div className="mb-4 md:mb-6 hidden xs:block">
              <div className="flex flex-wrap gap-2">
                {product.sizes.map(size => (
                  <span key={size} className="text-[10px] md:text-xs px-2 py-1 rounded-full border border-white/20 text-white/90 bg-white/10">
                    {size}
                  </span>
                ))}
              </div>
            </div>

            <Link to="/shop" className="self-start mt-auto md:mt-0">
              <button className="px-6 py-3 md:px-8 md:py-4 rounded-full bg-white text-black font-bold hover:bg-black hover:text-white border-2 border-white transition-colors text-xs md:text-base font-['Plus_Jakarta_Sans'] uppercase tracking-wider">
                Taste It
              </button>
            </Link>
          </div>
        </div>

        {/* Visual Content */}
        <div className="w-full md:w-1/2 relative h-[55%] md:h-full overflow-hidden flex items-center justify-center bg-black/5 order-1 md:order-2">
          <motion.div style={{ scale: imageScale }} className="relative z-10 w-full h-full flex items-center justify-center">
            <BottleImage src={product.image} alt={product.name} />
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
});

// --- Main Component ---
const ProductShowcase: React.FC = () => {
  const container = useRef<HTMLDivElement>(null);

  // Fix for "Half showing": 
  // We track scroll over a longer distance than just the content height
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start start', 'end end'],
  });

  return (
    // FIX: Add unnecessary bottom padding (pb-[25vh]) to ensure the last card 
    // has "track" space to exist before the next section invades.
    <div id="flavors" ref={container} className="relative bg-brand-black pb-[10vh]">

      {/* Sticky Header */}
      <div className="sticky top-5 h-12 flex justify-center z-50 pointer-events-none mix-blend-difference text-white mb-20">
        <h2 className="text-sm md:text-3xl font-bold uppercase tracking-widest bg-white/10 px-4 py-1.5 backdrop-blur-md rounded-full border border-white/20">
          Flavor Drop
        </h2>
      </div>

      {SHOWCASE_PRODUCTS.map((product, index) => (
        <ProductCard
          key={product.id}
          index={index}
          total={SHOWCASE_PRODUCTS.length}
          product={product}
          progress={scrollYProgress}
        />
      ))}
    </div>
  );
};

export default memo(ProductShowcase);