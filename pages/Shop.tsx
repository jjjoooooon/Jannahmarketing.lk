import React, { useState, memo, useEffect, useRef, useCallback } from 'react';
import { ShoppingCart, Star, Package, Truck, Shield } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { useCart, BottleSize, SIZE_PRICES } from '../context/CartContext';

// Import product images
import orange from '../assets/orange.webp';
import ginger from '../assets/ginger.webp';
import cola from '../assets/cola.webp';
import creamsoda from '../assets/creamsoda.webp';
import nesta from '../assets/nesta.webp';

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

const FeatureCard = memo(({ feature, visible, delay }: { feature: typeof FEATURES[0], visible: boolean, delay: number }) => (
    <div
        className="flex items-center gap-4 p-4 rounded-xl border border-white/10 bg-white/5 transition-all duration-500 will-change-transform"
        style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'translate3d(0, 0, 0)' : 'translate3d(0, 20px, 0)',
            transitionDelay: `${delay}ms`
        }}
    >
        <feature.icon className="w-8 h-8 text-brand-lime" />
        <div>
            <h3 className="font-bold font-display uppercase tracking-tight text-sm">{feature.title}</h3>
            <p className="text-xs text-gray-500 font-sans">{feature.desc}</p>
        </div>
    </div>
));

const ProductCard = memo(({
    product,
    visible,
    delay,
    currentSize,
    onSizeSelect,
    onAddToCart
}: {
    product: Product,
    visible: boolean,
    delay: number,
    currentSize: BottleSize,
    onSizeSelect: (id: string, size: BottleSize) => void,
    onAddToCart: (p: Product) => void
}) => {
    const price = SIZE_PRICES[currentSize];

    return (
        <div
            className="group transition-all duration-700 ease-out will-change-transform"
            style={{
                opacity: visible ? 1 : 0,
                transform: visible ? 'translate3d(0, 0, 0)' : 'translate3d(0, 30px, 0)',
                transitionDelay: `${delay}ms`
            }}
        >
            <div className="p-6 rounded-3xl border border-white/10 bg-white/5 hover:border-brand-lime/30 transition-all duration-500 h-full flex flex-col relative overflow-hidden">
                {/* Product Image Area */}
                <div
                    className="relative h-64 mb-6 flex items-center justify-center overflow-hidden rounded-2xl transition-colors duration-500"
                    style={{ backgroundColor: `${product.color}08` }}
                >
                    {/* Ambient Glow */}
                    <div
                        className="absolute inset-0 blur-[80px] opacity-10 transition-opacity duration-500 group-hover:opacity-25 pointer-events-none"
                        style={{ backgroundColor: product.color }}
                    />

                    {/* Inner White Glow */}
                    <div className="absolute w-32 h-32 bg-white blur-[60px] opacity-20 rounded-full pointer-events-none" />

                    <img
                        src={product.image}
                        alt={product.name}
                        className="h-full w-auto object-contain group-hover:scale-110 transition-transform duration-700 relative z-10 drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
                        loading="lazy"
                        decoding="async"
                    />
                </div>

                {/* Info Area */}
                <div className="flex-1">
                    <div className="flex items-center gap-1 mb-2">
                        <Star className="w-3.5 h-3.5 text-brand-lime fill-brand-lime" />
                        <span className="text-xs font-bold font-sans">{product.rating}</span>
                        <span className="text-[10px] text-gray-600 ml-1 font-sans uppercase tracking-widest">(250+ reviews)</span>
                    </div>

                    <h3 className="text-2xl font-black mb-1 font-display uppercase tracking-tight group-hover:text-brand-lime transition-colors">
                        {product.name}
                    </h3>
                    <p className="text-gray-500 text-xs mb-6 font-sans italic leading-relaxed">{product.description}</p>

                    <div className="mb-6">
                        <p className="text-[10px] text-gray-600 font-bold uppercase tracking-[0.2em] mb-3">Select Format</p>
                        <div className="flex flex-wrap gap-2">
                            {(Object.keys(SIZE_PRICES) as BottleSize[]).map(size => (
                                <button
                                    key={size}
                                    onClick={() => onSizeSelect(product.id, size)}
                                    className={`text-[10px] px-3 py-2 rounded-xl border transition-all duration-300 font-bold uppercase tracking-wider ${currentSize === size
                                        ? 'border-brand-lime bg-brand-lime/10 text-brand-lime'
                                        : 'border-white/5 text-gray-600 hover:border-white/20 hover:text-white'
                                        }`}
                                >
                                    {size}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/5">
                        <span className="text-2xl font-black text-brand-lime font-display">
                            <span className="text-xs font-medium text-gray-600 mr-1">LKR</span>
                            {price}
                        </span>
                    </div>
                </div>

                {/* Add Button */}
                <div className="mt-6">
                    <button
                        onClick={() => onAddToCart(product)}
                        className="w-full px-6 py-4 bg-brand-lime text-black font-black rounded-2xl hover:bg-white transition-all duration-300 flex items-center justify-center gap-3 uppercase tracking-[0.15em] text-xs active:scale-95 shadow-[0_10px_30px_rgba(204,255,0,0.1)] hover:shadow-[0_15px_40px_rgba(204,255,0,0.2)]"
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

    // Intersection Observers
    const heroRef = useRef<HTMLDivElement>(null);
    const featuresRef = useRef<HTMLDivElement>(null);
    const productsRef = useRef<HTMLDivElement>(null);

    const [heroInView, setHeroInView] = useState(false);
    const [featuresInView, setFeaturesInView] = useState(false);
    const [productsInView, setProductsInView] = useState(false);

    useEffect(() => {
        const obsOptions = { threshold: 0.1 };

        const hObs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setHeroInView(true); hObs.disconnect(); } }, obsOptions);
        const fObs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setFeaturesInView(true); fObs.disconnect(); } }, obsOptions);
        const pObs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setProductsInView(true); pObs.disconnect(); } }, obsOptions);

        if (heroRef.current) hObs.observe(heroRef.current);
        if (featuresRef.current) fObs.observe(featuresRef.current);
        if (productsRef.current) pObs.observe(productsRef.current);

        return () => { hObs.disconnect(); fObs.disconnect(); pObs.disconnect(); };
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
                <title>Shop Jannah Marketing - 5 Premium Flavors | Sainthamaruthu</title>
                <meta name="description" content="Shop Jannah Marketing online. Premium sodas in Orange, Ginger, Cola, Cream Soda & Nesta. Available in all sizes." />
                <link rel="canonical" href="https://jannahmarketing.lk/shop" />
            </Helmet>

            {/* Hero Section */}
            <section ref={heroRef} className="relative py-20 md:py-32 overflow-hidden border-b border-white/5">
                <div className="absolute inset-0 opacity-5 pointer-events-none">
                    <div className="absolute top-20 right-20 w-96 h-96 bg-brand-lime rounded-full blur-[120px]" />
                </div>

                <div className="container mx-auto px-6 relative z-10">
                    <div
                        className="text-center max-w-3xl mx-auto transition-all duration-700 ease-out will-change-transform"
                        style={{
                            opacity: heroInView ? 1 : 0,
                            transform: heroInView ? 'translate3d(0, 0, 0)' : 'translate3d(0, 20px, 0)'
                        }}
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand-lime/10 rounded-full border border-brand-lime/20 mb-6 font-sans">
                            <ShoppingCart className="w-4 h-4 text-brand-lime" />
                            <span className="text-brand-lime font-bold uppercase tracking-wider text-[10px]">Collection</span>
                        </div>
                        <h1 className="text-4xl md:text-7xl font-black mb-6 font-display uppercase tracking-tighter">
                            Our Products
                        </h1>
                        <p className="text-lg md:text-xl text-gray-500 mb-8 font-sans">
                            Discover our full range of premium carbonated beverages. Bold flavors, massive fizz, zero excuses.
                        </p>

                        <div className="inline-block bg-brand-lime/5 border border-brand-lime/10 rounded-2xl p-4 max-w-2xl backdrop-blur-sm">
                            <p className="text-brand-lime font-bold text-xs flex items-center justify-center gap-2 font-display uppercase tracking-widest leading-loose">
                                <Package className="w-4 h-4" />
                                Note: These are event bundles intended for special occasions. Not for commercial resale.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Bar */}
            <section ref={featuresRef} className="py-12 border-b border-white/5">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {FEATURES.map((feature, i) => (
                            <FeatureCard key={i} feature={feature} visible={featuresInView} delay={i * 100} />
                        ))}
                    </div>
                </div>
            </section>

            {/* Products Grid */}
            <section ref={productsRef} className="py-20 lg:py-32">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
                        {PRODUCTS.map((product, i) => (
                            <ProductCard
                                key={product.id}
                                product={product}
                                visible={productsInView}
                                delay={i * 100}
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
