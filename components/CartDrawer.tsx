import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingCart, Trash2, Plus, Minus, ArrowRight, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const CartDrawer: React.FC = () => {
    const { cart, removeFromCart, updateQuantity, totalPrice, isDrawerOpen, setIsDrawerOpen, totalItems } = useCart();

    // Lock body scroll when drawer is open
    useEffect(() => {
        if (isDrawerOpen) {
            document.body.style.overflow = 'hidden';
            // Prevent horizontal shift by using scrollbar-gutter if supported
            document.body.style.scrollbarGutter = 'stable';
        } else {
            document.body.style.overflow = 'unset';
            document.body.style.scrollbarGutter = 'auto';
        }
        return () => {
            document.body.style.overflow = 'unset';
            document.body.style.scrollbarGutter = 'auto';
        };
    }, [isDrawerOpen]);

    return (
        <AnimatePresence>
            {isDrawerOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsDrawerOpen(false)}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
                    />

                    {/* Drawer */}
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className="fixed right-0 top-0 h-dvh w-full max-w-md bg-[#050505] border-l border-white/10 z-[101] shadow-2xl flex flex-col overflow-x-hidden"
                    >
                        {/* Header */}
                        <div className="p-6 border-b border-white/10 flex items-center justify-between bg-[#050505] sticky top-0 z-10">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-brand-lime/10 flex items-center justify-center">
                                    <ShoppingCart size={20} className="text-brand-lime" />
                                </div>
                                <div>
                                    <h2 className="text-xl font-black font-['Plus_Jakarta_Sans'] text-white">Your Cart</h2>
                                    <p className="text-xs text-brand-lime uppercase tracking-widest font-black italic">{totalItems} Items</p>
                                </div>
                            </div>
                            <button
                                onClick={() => setIsDrawerOpen(false)}
                                className="p-2 hover:bg-white/5 rounded-full transition-colors text-gray-400 hover:text-white"
                            >
                                <X size={24} />
                            </button>
                        </div>

                        {/* Cart Items */}
                        <div className="flex-grow overflow-y-auto p-6 space-y-6 custom-scrollbar">
                            {cart.length > 0 ? (
                                cart.map((item) => (
                                    <div key={`${item.productId}-${item.size}`} className="flex gap-4 group">
                                        <div className="w-24 h-24 bg-white/5 rounded-2xl p-2 flex-shrink-0 border border-white/5 group-hover:border-[#CCFF00]/30 transition-colors">
                                            <img src={item.image} alt={item.productName} className="w-full h-full object-contain" />
                                        </div>
                                        <div className="flex-grow flex flex-col justify-between py-1">
                                            <div>
                                                <div className="flex justify-between items-start mb-1">
                                                    <h3 className="font-bold text-white font-['Plus_Jakarta_Sans']">{item.productName}</h3>
                                                    <button
                                                        onClick={() => removeFromCart(item.productId, item.size)}
                                                        className="text-gray-500 hover:text-red-500 transition-colors p-1"
                                                    >
                                                        <Trash2 size={16} />
                                                    </button>
                                                </div>
                                                <p className="text-xs text-brand-lime font-bold uppercase tracking-wider">{item.size}</p>
                                            </div>

                                            <div className="flex justify-between items-center mt-2">
                                                <div className="flex items-center bg-white/5 rounded-lg p-1 border border-white/10">
                                                    <button
                                                        onClick={() => updateQuantity(item.productId, item.size, -1)}
                                                        className="w-7 h-7 flex items-center justify-center hover:bg-brand-lime hover:text-black rounded-md transition-all text-gray-400"
                                                    >
                                                        <Minus size={14} />
                                                    </button>
                                                    <span className="w-8 text-center text-sm font-bold text-white">{item.quantity}</span>
                                                    <button
                                                        onClick={() => updateQuantity(item.productId, item.size, 1)}
                                                        className="w-7 h-7 flex items-center justify-center hover:bg-brand-lime hover:text-black rounded-md transition-all text-gray-400"
                                                    >
                                                        <Plus size={14} />
                                                    </button>
                                                </div>
                                                <div className="text-right">
                                                    <p className="text-sm font-black text-white">LKR {(item.price * item.quantity).toLocaleString()}</p>
                                                    <p className="text-[10px] text-gray-500">LKR {item.price.toLocaleString()} ea</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="h-full flex flex-col items-center justify-center text-center space-y-6 py-20">
                                    <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center animate-pulse">
                                        <ShoppingBag size={40} className="text-gray-600" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-white mb-2">Cart is Empty</h3>
                                        <p className="text-gray-500 max-w-[200px] mx-auto text-sm">Looks like you haven't added any drinks yet.</p>
                                    </div>
                                    <button
                                        onClick={() => setIsDrawerOpen(false)}
                                        className="px-8 py-3 bg-brand-lime/10 text-brand-lime font-bold rounded-full border border-brand-lime/20 hover:bg-brand-lime hover:text-black transition-all uppercase text-xs tracking-widest"
                                    >
                                        Start Shopping
                                    </button>
                                </div>
                            )}
                        </div>

                        {/* Footer */}
                        {cart.length > 0 && (
                            <div className="p-6 bg-white/[0.02] border-t border-white/10 space-y-4">
                                <div className="space-y-2">
                                    <div className="flex justify-between text-gray-400 text-sm">
                                        <span>Subtotal</span>
                                        <span>LKR {totalPrice.toLocaleString()}</span>
                                    </div>
                                    <div className="flex justify-between text-gray-400 text-sm">
                                        <span>Delivery</span>
                                        <span className="text-brand-lime text-xs font-bold uppercase tracking-wider italic">Calculated at next step</span>
                                    </div>
                                    <div className="flex justify-between items-center pt-2 border-t border-white/5">
                                        <span className="text-lg font-bold text-white uppercase tracking-tighter">Total Price</span>
                                        <span className="text-2xl font-black text-brand-lime">LKR {totalPrice.toLocaleString()}</span>
                                    </div>
                                </div>
                                <Link to="/checkout" onClick={() => setIsDrawerOpen(false)}>
                                    <button className="w-full py-4 bg-brand-lime text-black font-bold rounded-full hover:bg-white transition-all uppercase text-xs tracking-widest flex items-center justify-center gap-3 shadow-[0_10px_30px_rgba(204,255,0,0.2)]">
                                        Proceed to Checkout
                                        <ArrowRight size={18} />
                                    </button>
                                </Link>
                                <p className="text-[10px] text-gray-500 text-center tracking-widest font-bold mt-4">
                                    Secure Checkout Powered by Sunstar
                                </p>
                            </div>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default CartDrawer;
