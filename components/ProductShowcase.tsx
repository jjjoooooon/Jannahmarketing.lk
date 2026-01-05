import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';
import { PRODUCTS } from '../constants';
import { Product } from '../types';
import { generateMarketingCopy } from '../services/geminiService';
import Bubbles from './Bubbles';

// Single Product Card Component
interface ProductCardProps {
  product: Product;
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

  const imageScale = useTransform(scrollYProgress, [0, 1], [1.5, 1]);
  const scale = useTransform(progress, range, [1, targetScale]);
  
  const [aiText, setAiText] = useState<string>('');

  useEffect(() => {
    let mounted = true;
    generateMarketingCopy(product.name).then(text => {
      if(mounted) setAiText(text);
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
              {product.name.split(' ')[0]}<br/>
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
            <button className="self-start px-6 py-3 md:px-8 md:py-4 rounded-full bg-white text-black font-bold hover:bg-black hover:text-white border-2 border-white transition-all text-xs md:text-base active:scale-95 touch-manipulation font-['Plus_Jakarta_Sans'] uppercase tracking-wider">
              Taste It
            </button>
          </div>
        </div>

        {/* Visual Content (Bottle Placeholder) */}
        <div className="w-full md:w-1/2 relative h-[50%] md:h-full overflow-hidden flex items-center justify-center bg-black/10 order-1 md:order-2">
          <motion.div style={{ scale: imageScale }} className="relative z-10 w-full h-full flex items-center justify-center">
             {/* Abstract Bottle Representation */}
             <div className="relative w-28 h-[30dvh] md:w-64 md:h-[60vh]">
                <div className={`absolute inset-0 rounded-full blur-3xl opacity-50 ${product.imagePlaceholderColor}`}></div>
                {/* Bottle Shape SVG */}
                <svg viewBox="0 0 100 300" className="w-full h-full drop-shadow-2xl filter brightness-110">
                   <defs>
                      <linearGradient id={`grad-${index}`} x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" style={{stopColor: '#ffffff', stopOpacity: 0.2}} />
                        <stop offset="50%" style={{stopColor: 'transparent', stopOpacity: 0}} />
                        <stop offset="100%" style={{stopColor: '#ffffff', stopOpacity: 0.1}} />
                      </linearGradient>
                   </defs>
                   <path d="M30,0 L70,0 C75,0 80,5 80,10 L80,60 C80,80 90,90 90,110 L90,280 C90,295 80,300 50,300 C20,300 10,295 10,280 L10,110 C10,90 20,80 20,60 L20,10 C20,5 25,0 30,0 Z" 
                         fill={product.accent} stroke="rgba(255,255,255,0.2)" strokeWidth="2" />
                   <path d="M30,0 L70,0 C75,0 80,5 80,10 L80,60 C80,80 90,90 90,110 L90,280 C90,295 80,300 50,300 C20,300 10,295 10,280 L10,110 C10,90 20,80 20,60 L20,10 C20,5 25,0 30,0 Z" 
                         fill={`url(#grad-${index})`} />
                   {/* Label */}
                   <rect x="11" y="130" width="78" height="100" fill="rgba(255,255,255,0.9)" />
                   <text x="50" y="180" textAnchor="middle" fontSize="16" fontWeight="900" fill="black" fontFamily="Plus Jakarta Sans">{product.name.split(' ')[0]}</text>
                   <text x="50" y="200" textAnchor="middle" fontSize="12" fill="black" fontFamily="Inter">PREMIUM</text>
                </svg>
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
      {PRODUCTS.map((product, index) => {
        const targetScale = 1 - ((PRODUCTS.length - index) * 0.05);
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