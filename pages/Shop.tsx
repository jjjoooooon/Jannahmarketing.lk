import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, Plus, Minus, Star, Package, Truck, Shield } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

// Import product images
import orange from '../assets/orange.png';
import ginger from '../assets/ginger.png';
import cola from '../assets/cola.png';
import creamsoda from '../assets/creamsoda.png';
import nesta from '../assets/nesta.png';

interface Product {
    id: string;
    name: string;
    price: number;
    image: string;
    description: string;
    inStock: boolean;
    rating: number;
}

const products: Product[] = [
    {
        id: '1',
        name: 'Sunstar Orange',
        price: 150,
        image: orange,
        description: 'Explosive orange zest with sparkling finish',
        inStock: true,
        rating: 4.9
    },
    {
        id: '2',
        name: 'Solar Ginger',
        price: 150,
        image: ginger,
        description: 'Bold ginger kick with natural extracts',
        inStock: true,
        rating: 4.8
    },
    {
        id: '3',
        name: 'Midnight Cola',
        price: 150,
        image: cola,
        description: 'Classic cola taste, zero sugar',
        inStock: true,
        rating: 5.0
    },
    {
        id: '4',
        name: 'Cream Dream',
        price: 150,
        image: creamsoda,
        description: 'Creamy vanilla heaven in every sip',
        inStock: true,
        rating: 4.7
    },
    {
        id: '5',
        name: 'Nesta Ice',
        price: 150,
        image: nesta,
        description: 'Refreshing peach tea with tropical vibes',
        inStock: true,
        rating: 4.9
    }
];

const Shop: React.FC = () => {
    const [cart, setCart] = useState<{ [key: string]: number }>({});

    const addToCart = (productId: string) => {
        setCart(prev => ({
            ...prev,
            [productId]: (prev[productId] || 0) + 1
        }));
    };

    const removeFromCart = (productId: string) => {
        setCart(prev => {
            const newCart = { ...prev };
            if (newCart[productId] > 1) {
                newCart[productId]--;
            } else {
                delete newCart[productId];
            }
            return newCart;
        });
    };

    const getTotalItems = () => {
        return Object.values(cart).reduce((sum, qty) => sum + qty, 0);
    };

    const getTotalPrice = () => {
        return Object.entries(cart).reduce((sum, [productId, qty]) => {
            const product = products.find(p => p.id === productId);
            return sum + (product?.price || 0) * qty;
        }, 0);
    };



    return (
        <div className="bg-[#050505] min-h-screen text-white">
            <Helmet>
                <title>Shop Sunstar - Premium Energy Drinks</title>
                <meta name="description" content="Order Sunstar online. Explore our range of zero-sugar, natural energy drinks including Orange, Ginger, Cola, Cream Soda, and Nesta Ice." />
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
                        <p className="text-lg md:text-xl text-gray-400">
                            Discover our full range of premium carbonated beverages. All products feature zero sugar and 100% natural ingredients.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Features */}
            <section className="py-12 border-b border-white/5">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { icon: Package, title: 'Free Delivery', desc: 'On orders over LKR 1,000' },
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
                        {products.map((product, i) => (
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
                                    <div className="relative h-64 mb-6 flex items-center justify-center overflow-hidden rounded-xl bg-white/5">
                                        <img
                                            src={product.image}
                                            alt={product.name}
                                            className="h-full w-auto object-contain group-hover:scale-110 transition-transform duration-500"
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

                                        <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/10">
                                            <div>
                                                <span className="text-2xl font-black text-[#CCFF00]">LKR {product.price}</span>
                                                <span className="text-sm text-gray-500 ml-2">/ bottle</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Add to Cart */}
                                    <div className="mt-4">
                                        {cart[product.id] ? (
                                            <div className="flex items-center justify-between gap-4">
                                                <div className="flex items-center gap-3 flex-1 bg-white/5 rounded-full p-1">
                                                    <button
                                                        onClick={() => removeFromCart(product.id)}
                                                        className="w-10 h-10 rounded-full bg-white/10 hover:bg-[#CCFF00] hover:text-black transition-all flex items-center justify-center"
                                                    >
                                                        <Minus className="w-4 h-4" />
                                                    </button>
                                                    <span className="flex-1 text-center font-bold">{cart[product.id]}</span>
                                                    <button
                                                        onClick={() => addToCart(product.id)}
                                                        className="w-10 h-10 rounded-full bg-white/10 hover:bg-[#CCFF00] hover:text-black transition-all flex items-center justify-center"
                                                    >
                                                        <Plus className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </div>
                                        ) : (
                                            <button
                                                onClick={() => addToCart(product.id)}
                                                className="w-full px-6 py-3 bg-[#CCFF00] text-black font-black rounded-full hover:bg-white transition-all flex items-center justify-center gap-2 uppercase tracking-wider"
                                            >
                                                <ShoppingCart className="w-5 h-5" />
                                                <span>Add to Cart</span>
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Floating Cart Summary */}
            {getTotalItems() > 0 && (
                <motion.div
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="fixed bottom-8 right-8 p-6 rounded-2xl border border-[#CCFF00]/30 bg-[#050505] shadow-2xl z-50"
                >
                    <div className="flex items-center gap-4 mb-4">
                        <ShoppingCart className="w-6 h-6 text-[#CCFF00]" />
                        <div>
                            <div className="font-bold font-['Plus_Jakarta_Sans']">Cart Summary</div>
                            <div className="text-sm text-gray-400">{getTotalItems()} items</div>
                        </div>
                    </div>
                    <div className="text-2xl font-black text-[#CCFF00] mb-4">
                        LKR {getTotalPrice().toLocaleString()}
                    </div>
                    <button className="w-full px-6 py-3 bg-[#CCFF00] text-black font-black rounded-full hover:bg-white transition-all uppercase tracking-wider">
                        Checkout
                    </button>
                </motion.div>
            )}
        </div>
    );
};

export default Shop;
