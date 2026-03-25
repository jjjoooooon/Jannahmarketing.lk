import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, Plus, Minus, Star, Package, Truck, Shield, Check, ArrowRight } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { useCart, BottleSize, SIZE_PRICES } from '../context/CartContext';

// Import product images
import orange from '../assets/orange.webp';
import ginger from '../assets/ginger.webp';
import cola from '../assets/cola.webp';
import creamsoda from '../assets/creamsoda.webp';
import nesta from '../assets/nesta.webp';

interface Product {
    id: string;
    name: string;
    image: string;
    description: string;
    inStock: boolean;
    rating: number;
    color: string;
}

const products: Product[] = [
    {
        id: '1',
        name: 'Sunstar Orange',
        image: orange,
        description: 'Explosive orange zest with sparkling finish',
        inStock: true,
        rating: 4.9,
        color: '#FF8C00'
    },
    {
        id: '2',
        name: 'Sunstar Ginger',
        image: ginger,
        description: 'Bold ginger kick with natural extracts',
        inStock: true,
        rating: 4.8,
        color: '#CD853F'
    },
    {
        id: '3',
        name: 'Sunstar Cola',
        image: cola,
        description: 'Classic cola taste, zero sugar',
        inStock: true,
        rating: 5.0,
        color: '#4A2C2A'
    },
    {
        id: '4',
        name: 'Sunstar Cream Soda',
        image: creamsoda,
        description: 'Creamy vanilla heaven in every sip',
        inStock: true,
        rating: 4.7,
        color: '#00E676'
    },
    {
        id: '5',
        name: 'Sunstar Nesta',
        image: nesta,
        description: 'Refreshing peach tea with tropical vibes',
        inStock: true,
        rating: 4.9,
        color: '#FFAB40'
    }
];

const Shop: React.FC = () => {
    const { addToCart, totalItems, totalPrice } = useCart();
    const [selectedSizes, setSelectedSizes] = useState<{ [key: string]: BottleSize }>({});
    const [selectedQuantities, setSelectedQuantities] = useState<{ [key: string]: number }>({});

    const handleSizeSelect = (productId: string, size: BottleSize) => {
        setSelectedSizes(prev => ({ ...prev, [productId]: size }));
    };

    const handleQuantityChange = (productId: string, delta: number) => {
        setSelectedQuantities(prev => {
            const current = prev[productId] || 1;
            const newQty = Math.max(1, current + delta);
            return { ...prev, [productId]: newQty };
        });
    };

    const handleAddToCart = (product: Product) => {
        const size = selectedSizes[product.id] || '250ml'; // Default to 250ml
        const quantity = selectedQuantities[product.id] || 1;

        // Add item multiple times based on quantity
        for (let i = 0; i < quantity; i++) {
            addToCart({ id: product.id, name: product.name, image: product.image }, size);
        }

        // Reset quantity after adding
        setSelectedQuantities(prev => ({ ...prev, [product.id]: 1 }));
    };

    return (
        <div className="bg-[#050505] min-h-screen text-white">
            <Helmet>
                <title>Shop Sunstar - 5 Premium Flavors | Orange, Ginger, Cola & More</title>
                <meta name="description" content="Shop Sunstar premium carbonated beverages online. Available in Orange, Ginger, Cola, Cream Soda & Nesta. All sizes from 250ml to 1.5L. Free delivery over LKR 1,000." />
                <link rel="canonical" href="https://jannahmarketing.lk/shop" />

                {/* Open Graph */}
                <meta property="og:title" content="Shop Sunstar - 5 Premium Flavors" />
                <meta property="og:description" content="Shop Sunstar premium carbonated beverages online. Available in Orange, Ginger, Cola, Cream Soda & Nesta. Free delivery over LKR 1,000." />
                <meta property="og:image" content="https://jannahmarketing.lk/og-sunstar-shop.jpg" />
                <meta property="og:url" content="https://jannahmarketing.lk/shop" />
                <meta property="og:type" content="website" />
                <meta property="og:site_name" content="Sunstar" />

                {/* Twitter Card */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="Shop Sunstar - 5 Premium Flavors" />
                <meta name="twitter:description" content="Shop Sunstar premium carbonated beverages online. Available in Orange, Ginger, Cola, Cream Soda & Nesta." />
                <meta name="twitter:image" content="https://jannahmarketing.lk/og-sunstar-shop.jpg" />
            </Helmet>
            {/* Hero Section */}
            <section className="relative py-20 md:py-32 overflow-hidden border-b border-white/5">
                <div className="absolute inset-0 opacity-5">
                    <div className="absolute top-20 right-20 w-96 h-96 bg-[#CCFF00] rounded-full blur-[120px]" />
                </div>

                <div className="container mx-auto px-6 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center max-w-3xl mx-auto"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#CCFF00]/10 rounded-full border border-[#CCFF00]/20 mb-6">
                            <ShoppingCart className="w-4 h-4 text-[#CCFF00]" />
                            <span className="text-[#CCFF00] font-bold uppercase tracking-wider text-xs">Shop</span>
                        </div>
                        <h1 className="text-4xl md:text-7xl font-black mb-6 font-['Plus_Jakarta_Sans']">
                            Our Products
                        </h1>
                        <p className="text-lg md:text-xl text-gray-400 mb-8">
                            Discover our full range of premium carbonated beverages. All products feature zero sugar and 100% natural ingredients.
                        </p>

                        <div className="inline-block bg-[#CCFF00]/10 border border-[#CCFF00]/20 rounded-xl p-4 max-w-2xl">
                            <p className="text-[#CCFF00] font-bold text-sm md:text-base flex items-center justify-center gap-2">
                                <Package className="w-5 h-5" />
                                Note: These are event bundles intended for special occasions. Not for commercial resale.
                            </p>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Features */}
            <section className="py-12 border-b border-white/5">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { icon: Package, title: 'Event Bundles', desc: 'Perfect for parties & gatherings' },
                            { icon: Truck, title: 'Fast Shipping', desc: 'Delivered within 2-3 days' },
                            { icon: Shield, title: 'Quality Guarantee', desc: '100% satisfaction guaranteed' }
                        ].map((feature, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="flex items-center gap-4 p-4 rounded-xl border border-white/10 bg-white/5"
                            >
                                <feature.icon className="w-8 h-8 text-[#CCFF00]" />
                                <div>
                                    <h3 className="font-bold font-['Plus_Jakarta_Sans']">{feature.title}</h3>
                                    <p className="text-sm text-gray-400">{feature.desc}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Products Grid */}
            <section className="py-20">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {products.map((product, i) => {
                            const currentSize = selectedSizes[product.id] || '250ml';
                            const currentPrice = SIZE_PRICES[currentSize];

                            return (
                                <motion.div
                                    key={product.id}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }}
                                    className="group"
                                >
                                    <div className="p-6 rounded-2xl border border-white/10 bg-white/5 hover:border-[#CCFF00]/30 transition-all h-full flex flex-col">
                                        {/* Product Image */}
                                        <div
                                            className="relative h-64 mb-6 flex items-center justify-center overflow-hidden rounded-xl transition-colors duration-500"
                                            style={{ backgroundColor: `${product.color}10` }}
                                        >
                                            {/* Colored Ambient Glow */}
                                            <div
                                                className="absolute inset-0 blur-3xl opacity-20 transition-opacity duration-500 group-hover:opacity-30"
                                                style={{ backgroundColor: product.color }}
                                            />

                                            {/* White Glow Behind Bottle */}
                                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-white blur-[60px] opacity-40 rounded-full pointer-events-none" />

                                            <img
                                                src={product.image}
                                                alt={product.name}
                                                className="h-full w-auto object-contain group-hover:scale-110 transition-transform duration-500 relative z-10 drop-shadow-2xl"
                                            />
                                        </div>

                                        {/* Product Info */}
                                        <div className="flex-1">
                                            <div className="flex items-center gap-1 mb-2">
                                                <Star className="w-4 h-4 text-[#CCFF00] fill-[#CCFF00]" />
                                                <span className="text-sm font-bold">{product.rating}</span>
                                                <span className="text-xs text-gray-500 ml-1">(250+ reviews)</span>
                                            </div>

                                            <h3 className="text-2xl font-black mb-2 font-['Plus_Jakarta_Sans']">
                                                {product.name}
                                            </h3>
                                            <p className="text-gray-400 text-sm mb-4">{product.description}</p>

                                            <div className="mb-6">
                                                <p className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-2">Select Size</p>
                                                <div className="flex flex-wrap gap-2">
                                                    {(Object.keys(SIZE_PRICES) as BottleSize[]).map(size => (
                                                        <button
                                                            key={size}
                                                            onClick={() => handleSizeSelect(product.id, size)}
                                                            className={`text-xs px-3 py-1.5 rounded-lg border transition-all ${currentSize === size
                                                                ? 'border-[#CCFF00] bg-[#CCFF00]/10 text-[#CCFF00] font-bold'
                                                                : 'border-white/20 text-gray-400 hover:border-white/40'
                                                                }`}
                                                        >
                                                            {size}
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>

                                            <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/10">
                                                <div>
                                                    <span className="text-2xl font-black text-[#CCFF00]">LKR {currentPrice}</span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Add to Cart */}
                                        <div className="mt-4">
                                            <button
                                                onClick={() => handleAddToCart(product)}
                                                className="w-full px-6 py-3 bg-[#CCFF00] text-black font-black rounded-full hover:bg-white transition-all flex items-center justify-center gap-2 uppercase tracking-wider active:scale-95"
                                            >
                                                <ShoppingCart className="w-5 h-5" />
                                                <span>Add to Cart</span>
                                            </button>
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </section>

        </div>
    );
};

export default Shop;
