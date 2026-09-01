import React, { useState, memo, useCallback } from 'react';
import { ShoppingCart, Star, Package, Truck, Shield } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { useCart, BottleSize, SIZE_PRICES } from '../context/CartContext';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Import product images
import orange from '../assets/orange.webp';
import ginger from '../assets/ginger.webp';
import cola from '../assets/cola.webp';
import creamsoda from '../assets/creamsoda.webp';
import nesta from '../assets/nesta.webp';

gsap.registerPlugin(ScrollTrigger);

// --- Types & Data ---
interface Product {
    id: string;
    name: string;
    image: string;
    description: string;
    inStock: boolean;
    rating: number;
    color: string;
}

const PRODUCTS: Product[] = [
    { id: '1', name: 'Sunstar Orange', image: orange, description: 'Explosive orange zest with sparkling finish', inStock: true, rating: 4.9, color: '#FF8C00' },
    { id: '2', name: 'Sunstar Ginger', image: ginger, description: 'Bold ginger kick with natural extracts', inStock: true, rating: 4.8, color: '#CD853F' },
    { id: '3', name: 'Sunstar Cola', image: cola, description: 'Classic cola taste, zero sugar', inStock: true, rating: 5.0, color: '#4A2C2A' },
    { id: '4', name: 'Sunstar Cream Soda', image: creamsoda, description: 'Creamy vanilla heaven in every sip', inStock: true, rating: 4.7, color: '#00E676' },
    { id: '5', name: 'Sunstar Nesta', image: nesta, description: 'Refreshing peach tea with tropical vibes', inStock: true, rating: 4.9, color: '#FFAB40' }
];

const FEATURES = [
    { icon: Package, title: 'Event Bundles', desc: 'Perfect for parties & gatherings' },
    { icon: Truck, title: 'Fast Shipping', desc: 'Delivered within 2-3 days' },
    { icon: Shield, title: 'Quality Guarantee', desc: '100% satisfaction guaranteed' }
];

// --- Sub-Components ---
const FeatureCard = memo(({ feature }: { feature: typeof FEATURES[0] }) => (
    <div className="feature-card flex items-center gap-4 p-6 border border-white/10 bg-white/5 hover:bg-white/10 transition-colors duration-500 opacity-0 transform translate-y-8">
        <feature.icon className="w-8 h-8 text-white/80" strokeWidth={1.5} />
        <div>
            <h3 className="font-bold tracking-[0.15em] text-[11px] uppercase text-white mb-1">{feature.title}</h3>
            <p className="text-[11px] text-white/50 font-mplus">{feature.desc}</p>
        </div>
    </div>
));

const ProductCard = memo(({
    product,
    currentSize,
    onSizeSelect,
    onAddToCart
}: {
    product: Product,
    currentSize: BottleSize,
    onSizeSelect: (id: string, size: BottleSize) => void,
    onAddToCart: (p: Product) => void
}) => {
    const price = SIZE_PRICES[currentSize];

    return (
        <div className="product-card group opacity-0 transform translate-y-12">
            <div className="p-8 border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/10 transition-all duration-500 h-full flex flex-col relative overflow-hidden backdrop-blur-xl">
                {/* Product Image Area */}
                <div className="relative h-72 mb-8 flex items-center justify-center">
                    {/* Ambient Glow */}
                    <div
                        className="absolute inset-0 opacity-20 blur-[60px] rounded-full scale-90 pointer-events-none group-hover:opacity-40 transition-opacity duration-500"
                        style={{
                            background: `radial-gradient(circle, ${product.color} 0%, transparent 70%)`
                        }}
                    />
                    <img
                        src={product.image}
                        alt={product.name}
                        className="h-full w-auto object-contain group-hover:scale-105 transition-transform duration-700 relative z-10 drop-shadow-[0_20px_40px_rgba(0,0,0,0.6)]"
                        loading="lazy"
                        decoding="async"
                    />
                </div>

                {/* Info Area */}
                <div className="flex-1 flex flex-col">
                    <div className="flex items-center gap-2 mb-4">
                        <Star className="w-3 h-3 text-white fill-white" />
                        <span className="text-[11px] font-bold tracking-widest">{product.rating}</span>
                        <span className="text-[9px] text-white/40 ml-1 uppercase tracking-[0.2em]">(250+ reviews)</span>
                    </div>

                    <h3 className="text-3xl font-grace leading-none mb-3 text-white group-hover:text-white/80 transition-colors">
                        {product.name}
                    </h3>
                    <p className="text-white/50 text-[13px] mb-8 font-mplus leading-relaxed">{product.description}</p>

                    <div className="mb-8 mt-auto">
                        <p className="text-[9px] text-white/40 font-bold uppercase tracking-[0.2em] mb-4">Select Format</p>
                        <div className="flex flex-wrap gap-2">
                            {(Object.keys(SIZE_PRICES) as BottleSize[]).map(size => (
                                <button
                                    key={size}
                                    onClick={() => onSizeSelect(product.id, size)}
                                    className={`text-[10px] px-4 py-2 border transition-all duration-300 font-bold uppercase tracking-[0.1em] ${currentSize === size
                                        ? 'border-[#6F9578] bg-[#6F9578]/10 text-white'
                                        : 'border-white/10 text-white/50 hover:border-white/30 hover:text-white'
                                        }`}
                                >
                                    {size}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="flex items-center justify-between mb-8 pb-6 border-b border-white/5">
                        <span className="text-2xl font-mplus tracking-tight text-white flex items-baseline gap-1">
                            <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-white/40">LKR</span>  
                            {price}
                        </span>
                    </div>

                    {/* Add Button */}
                    <button
                        onClick={() => onAddToCart(product)}
                        className="w-full py-4 bg-[#6F9578] text-white hover:bg-[#597860] transition-all duration-300 font-bold text-[11px] uppercase tracking-[0.2em] flex items-center justify-center gap-3 shadow-[0_10px_30px_rgba(111,149,120,0.2)]"
                    >
                        <ShoppingCart className="w-4 h-4" />
                        <span>Add To Cart</span>
                    </button>
                </div>
            </div>
        </div>
    );
});

const Shop: React.FC = () => {
    const { addToCart } = useCart();
    const [selectedSizes, setSelectedSizes] = useState<{ [key: string]: BottleSize }>({});

    // GSAP Scroll Animations
    useGSAP(() => {
        // Hero Anim
        gsap.to(".shop-hero-content", {
            y: 0,
            opacity: 1,
            duration: 1.2,
            ease: "power3.out",
            delay: 0.1
        });

        // Features Automagic Stagger
        gsap.to(".feature-card", {
            scrollTrigger: {
                trigger: ".shop-features-section",
                start: "top 80%",
            },
            y: 0,
            opacity: 1,
            stagger: 0.15,
            duration: 1,
            ease: "power3.out"
        });

        // Products Grid Reveal Look
        gsap.to(".product-card", {
            scrollTrigger: {
                trigger: ".shop-products-section",
                start: "top 75%",
            },
            y: 0,
            opacity: 1,
            stagger: 0.1,
            duration: 1.2,
            ease: "power2.out"
        });
    }, []);

    const handleSizeSelect = useCallback((productId: string, size: BottleSize) => {
        setSelectedSizes(prev => ({ ...prev, [productId]: size }));
    }, []);

    const handleAddToCart = useCallback((product: Product) => {
        const size = selectedSizes[product.id] || '250ml';
        addToCart({ id: product.id, name: product.name, image: product.image }, size);
    }, [addToCart, selectedSizes]);

    return (
        <div className="bg-brand-black min-h-screen text-white overflow-x-hidden">
            <Helmet>
                <title>Store | Jannah Marketing | Premium Beverages</title>
                <meta name="description" content="Shop Jannah Marketing online. Premium sodas in Orange, Ginger, Cola, Cream Soda & Nesta. Available in all sizes." />
                <link rel="canonical" href="https://jannahmarketing.lk/shop" />
            </Helmet>

            {/* Hero Section */}
            <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden border-b border-white/5">
                <div className="absolute inset-0 z-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)] pointer-events-none" />

                <div className="container mx-auto px-6 relative z-10">
                    <div className="shop-hero-content text-center max-w-4xl mx-auto opacity-0 translate-y-12">
                        <div className="inline-flex items-center gap-3 px-6 py-2 border border-white/20 mb-8 backdrop-blur-md">
                            <ShoppingCart className="w-3.5 h-3.5 text-white/70" />
                            <span className="text-white/70 font-bold uppercase tracking-[0.2em] text-[9px]">Storefront</span>
                        </div>
                        <h1 className="text-6xl md:text-8xl font-normal mb-6 font-grace">
                            Browse Collection
                        </h1>
                        <p className="text-lg text-white/50 mb-10 font-mplus max-w-2xl mx-auto">
                            Discover our full range of premium carbonated beverages. Masterfully crafted flavors for every occasion.
                        </p>

                        <div className="inline-block bg-white/5 border border-white/10 p-5 px-8 max-w-2xl backdrop-blur-xl">
                            <p className="text-white/80 font-bold text-[10px] flex items-center justify-center gap-3 uppercase tracking-[0.15em]">
                                <Package className="w-4 h-4 opacity-50" />
                                Note: Bundles are intended for special occasions. Not for commercial resale.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Bar */}
            <section className="shop-features-section py-8 md:py-12 border-b border-white/5 bg-black/50">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {FEATURES.map((feature, i) => (
                            <FeatureCard key={i} feature={feature} />
                        ))}
                    </div>
                </div>
            </section>

            {/* Products Grid */}
            <section className="shop-products-section pt-12 pb-24 lg:pt-20 lg:pb-32">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {PRODUCTS.map((product) => (
                            <ProductCard
                                key={product.id}
                                product={product}
                                currentSize={selectedSizes[product.id] || '250ml'}
                                onSizeSelect={handleSizeSelect}
                                onAddToCart={handleAddToCart}
                            />
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default memo(Shop);
