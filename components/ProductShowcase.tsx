import React, { useRef, memo, useMemo, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../types';

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
    color: '#F37021',
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
    color: '#005432',
    accent: '#D4AF37',
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
    color: '#2B1B17',
    accent: '#ED1C24',
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
    color: '#00A651',
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
    color: '#D2691E',
    accent: '#008B8B',
    flavorProfile: 'Fruity, Cool, Light',
    imagePlaceholderColor: 'bg-amber-800',
    image: nesta,
    sizes: PRODUCT_SIZES
  },
];

const BottleImage = memo(({ src, alt }: { src: string; alt: string }) => (
  <div className="relative w-auto h-[30dvh] md:h-[60vh] flex items-center justify-center transform-gpu">
    <div
      className="absolute inset-0 opacity-40 scale-110 pointer-events-none"
      style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 70%)' }}
    />
    <img
      src={src}
      alt={alt}
      loading="lazy"
      decoding="async"
      className="relative w-auto h-full object-contain drop-shadow-2xl animate-float"
    />
  </div>
));

const ProductCard: React.FC<{ product: ExtendedProduct; index: number }> = memo(({ product, index }) => {
  const [firstName, secondName] = useMemo(() => product.name.split(' '), [product.name]);
  const cardRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (cardRef.current) observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={cardRef}
      className="min-h-dvh flex items-center justify-center sticky top-0 py-10"
    >
      <div
        style={{
          backgroundColor: product.color,
          transform: isVisible ? 'scale(1) translateY(0)' : 'scale(0.95) translateY(50px)',
          opacity: isVisible ? 1 : 0,
        }}
        className="relative flex flex-col md:flex-row w-[95vw] md:w-[90vw] h-[85dvh] md:h-[80vh] rounded-[2.5rem] overflow-hidden shadow-2xl transition-all duration-700 ease-out will-change-transform transform-gpu"
      >
        {/* Content Section */}
        <div className="w-full md:w-1/2 p-8 md:p-16 flex flex-col justify-center relative z-20 order-2 md:order-1 h-[45%] md:h-auto">
          <div className="relative z-10 flex flex-col h-full justify-center">
            <h3 className="text-xs md:text-xl font-bold uppercase tracking-[0.2em] mb-2 opacity-80 font-sans text-white">
              {product.tagline}
            </h3>

            <h2 className="text-4xl md:text-8xl font-black mb-4 md:mb-8 leading-[0.9] text-white font-display uppercase tracking-tight">
              {firstName}<br />
              <span className="text-transparent text-outline opacity-80">{secondName}</span>
            </h2>

            <p className="text-sm md:text-lg font-medium mb-6 md:mb-10 max-w-md text-white/90 line-clamp-3 md:line-clamp-none font-sans">
              {product.description}
            </p>

            <div className="mb-6 hidden xs:block">
              <div className="flex flex-wrap gap-2">
                {product.sizes.map(size => (
                  <span key={size} className="text-[10px] md:text-xs px-3 py-1 rounded-full border border-white/20 text-white/95 bg-white/5 backdrop-blur-sm">
                    {size}
                  </span>
                ))}
              </div>
            </div>

            <Link to="/shop" className="self-start">
              <button className="px-8 py-4 rounded-full bg-white text-black font-bold hover:bg-black hover:text-white border-2 border-white transition-all text-xs md:text-sm font-display uppercase tracking-widest active:scale-95 shadow-lg">
                Taste the Fizz
              </button>
            </Link>
          </div>
        </div>

        {/* Visual Section */}
        <div className="w-full md:w-1/2 relative h-[55%] md:h-full overflow-hidden flex items-center justify-center bg-black/5 order-1 md:order-2">
          <div className={`transition-all duration-1000 delay-300 ${isVisible ? 'scale-100 opacity-100' : 'scale-90 opacity-0'}`}>
            <BottleImage src={product.image} alt={product.name} />
          </div>
        </div>
      </div>
    </div>
  );
});

const ProductShowcase: React.FC = () => {
  return (
    <div id="flavors" className="relative bg-brand-black pb-20">
      <div className="sticky top-10 h-1 flex justify-center z-50 pointer-events-none mb-20">
        <div className="bg-white/10 px-8 py-3 backdrop-blur-xl rounded-full border border-white/20 shadow-2xl">
          <h2 className="text-xs md:text-xl font-black uppercase tracking-[0.3em] text-white font-display">
            Flavor Drop
          </h2>
        </div>
      </div>

      <div className="space-y-0">
        {SHOWCASE_PRODUCTS.map((product, index) => (
          <ProductCard
            key={product.id}
            index={index}
            product={product}
          />
        ))}
      </div>

      <style>{`
        .text-outline {
          -webkit-text-stroke: 1px rgba(255,255,255,0.8);
        }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default memo(ProductShowcase);