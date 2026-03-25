import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft, Trash2, Send, Mail, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import SearchableComboBox from '../components/SearchableComboBox';
import { UNIQUE_CITIES } from '../data/cities';

const Checkout: React.FC = () => {
    const { cart, removeFromCart, updateQuantity, totalPrice, totalItems } = useCart();

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        district: '',
        purpose: ''
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const generateOrderMessage = () => {
        let message = `*New Order from ${formData.name}*\n\n`;
        message += `*Contact Details:*\n`;
        message += `Phone: ${formData.phone}\n`;
        message += `Email: ${formData.email}\n`;
        message += `District: ${formData.district}\n`;
        message += `Purpose: ${formData.purpose}\n\n`;

        message += `*Order Summary:*\n`;
        cart.forEach(item => {
            message += `- ${item.productName} (${item.size}) x ${item.quantity} = LKR ${item.price * item.quantity}\n`;
        });

        message += `\n*Total Amount: LKR ${totalPrice.toLocaleString()}*`;
        return encodeURIComponent(message);
    };

    const handleWhatsAppOrder = () => {
        const message = generateOrderMessage();
        const phoneNumber = '94779077134'; // Updated phone number
        window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
    };

    const handleEmailOrder = () => {
        const subject = encodeURIComponent(`New Order from ${formData.name}`);
        const body = generateOrderMessage();
        window.location.href = `mailto:sunstar@jannahmarketing.lk?subject=${subject}&body=${body}`;
    };

    if (cart.length === 0) {
        return (
            <div className="min-h-screen bg-[#050505] text-white pt-32 pb-20 px-6 flex flex-col items-center justify-center text-center">
                <Helmet>
                    <title>Checkout - Sunstar</title>
                </Helmet>
                <div className="w-24 h-24 bg-[#CCFF00]/10 rounded-full flex items-center justify-center mb-6">
                    <Trash2 className="w-10 h-10 text-[#CCFF00]" />
                </div>
                <h1 className="text-3xl font-black font-['Plus_Jakarta_Sans'] mb-4">Your Cart is Empty</h1>
                <p className="text-gray-400 mb-8 max-w-md">Looks like you haven't added any refreshing drinks to your cart yet.</p>
                <Link to="/shop">
                    <button className="px-8 py-4 bg-[#CCFF00] text-black font-bold rounded-full hover:bg-white transition-colors uppercase tracking-wider">
                        Start Shopping
                    </button>
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#050505] text-white pt-32 pb-20">
            <Helmet>
                <title>Checkout - Sunstar</title>
            </Helmet>

            <div className="container mx-auto px-6 max-w-6xl">
                <Link to="/shop" className="inline-flex items-center gap-2 text-gray-400 hover:text-[#CCFF00] transition-colors mb-8 font-bold uppercase text-sm tracking-wider">
                    <ArrowLeft size={18} /> Continue Shopping
                </Link>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Cart Items */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="space-y-6"
                    >
                        <h2 className="text-2xl font-black font-['Plus_Jakarta_Sans'] mb-6 flex items-center gap-3">
                            <span className="w-8 h-8 rounded-full bg-[#CCFF00] text-black flex items-center justify-center text-sm">1</span>
                            Order Summary
                        </h2>

                        <div className="bg-white/5 rounded-3xl p-6 border border-white/10 space-y-6">
                            {cart.map((item) => (
                                <div key={`${item.productId}-${item.size}`} className="flex gap-4 items-center">
                                    <div className="w-20 h-20 bg-white/5 rounded-xl p-2 flex-shrink-0">
                                        <img src={item.image} alt={item.productName} className="w-full h-full object-contain" />
                                    </div>
                                    <div className="flex-grow">
                                        <h3 className="font-bold font-['Plus_Jakarta_Sans']">{item.productName}</h3>
                                        <p className="text-sm text-gray-400">{item.size} - LKR {item.price}</p>
                                    </div>
                                    <div className="flex items-center gap-3 bg-[#050505] rounded-full p-1 border border-white/10">
                                        <button
                                            onClick={() => updateQuantity(item.productId, item.size, -1)}
                                            className="w-8 h-8 rounded-full hover:bg-[#CCFF00] hover:text-black flex items-center justify-center transition-colors"
                                        >
                                            -
                                        </button>
                                        <span className="text-sm font-bold w-4 text-center">{item.quantity}</span>
                                        <button
                                            onClick={() => updateQuantity(item.productId, item.size, 1)}
                                            className="w-8 h-8 rounded-full hover:bg-[#CCFF00] hover:text-black flex items-center justify-center transition-colors"
                                        >
                                            +
                                        </button>
                                    </div>
                                    <button
                                        onClick={() => removeFromCart(item.productId, item.size)}
                                        className="p-2 text-gray-500 hover:text-red-500 transition-colors"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            ))}

                            <div className="border-t border-white/10 pt-6 mt-6">
                                <div className="flex justify-between items-center text-xl font-black">
                                    <span>Total</span>
                                    <span className="text-[#CCFF00]">LKR {totalPrice.toLocaleString()}</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Checkout Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        <h2 className="text-2xl font-black font-['Plus_Jakarta_Sans'] mb-6 flex items-center gap-3">
                            <span className="w-8 h-8 rounded-full bg-[#CCFF00] text-black flex items-center justify-center text-sm">2</span>
                            Delivery Details
                        </h2>

                        <form className="bg-white/5 rounded-3xl p-8 border border-white/10 space-y-6" onSubmit={(e) => e.preventDefault()}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-gray-400 uppercase tracking-wider">Full Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        required
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        className="w-full bg-[#050505] border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-[#CCFF00] transition-colors"
                                        placeholder="John Doe"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-gray-400 uppercase tracking-wider">Phone Number</label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        required
                                        value={formData.phone}
                                        onChange={handleInputChange}
                                        className="w-full bg-[#050505] border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-[#CCFF00] transition-colors"
                                        placeholder="077 123 4567"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-bold text-gray-400 uppercase tracking-wider">Email Address</label>
                                <input
                                    type="email"
                                    name="email"
                                    required
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    className="w-full bg-[#050505] border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-[#CCFF00] transition-colors"
                                    placeholder="john@example.com"
                                />
                            </div>

                            <SearchableComboBox
                                label="City / District"
                                options={UNIQUE_CITIES}
                                value={formData.district}
                                onChange={(value) => setFormData(prev => ({ ...prev, district: value }))}
                                placeholder="Search for your city..."
                                required
                            />

                            <div className="space-y-2">
                                <label className="text-sm font-bold text-gray-400 uppercase tracking-wider">Purpose / Note</label>
                                <textarea
                                    name="purpose"
                                    rows={3}
                                    value={formData.purpose}
                                    onChange={handleInputChange}
                                    className="w-full bg-[#050505] border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-[#CCFF00] transition-colors"
                                    placeholder="e.g. Birthday Party, Retail Stock, etc."
                                />
                            </div>

                            <div className="pt-6 space-y-4">
                                <button
                                    onClick={handleWhatsAppOrder}
                                    disabled={!formData.name || !formData.phone}
                                    className="w-full py-4 bg-[#25D366] text-white font-bold rounded-xl hover:bg-[#128C7E] transition-colors flex items-center justify-center gap-3 uppercase tracking-wider disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <MessageCircle size={20} /> Send via WhatsApp
                                </button>
                                <button
                                    onClick={handleEmailOrder}
                                    disabled={!formData.name || !formData.email}
                                    className="w-full py-4 bg-white/10 text-white font-bold rounded-xl hover:bg-white/20 transition-colors flex items-center justify-center gap-3 uppercase tracking-wider disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <Mail size={20} /> Send via Email
                                </button>
                            </div>
                            <p className="text-xs text-gray-500 text-center">
                                By placing an order, you agree to our Terms of Service and Privacy Policy.
                            </p>
                        </form>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
