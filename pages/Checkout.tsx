import React, { useState, memo, useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft, Trash2, Mail, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import SearchableComboBox from '../components/SearchableComboBox';
import { UNIQUE_CITIES } from '../data/cities';

const Checkout: React.FC = () => {
    const { cart, removeFromCart, updateQuantity, totalPrice } = useCart();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        district: '',
        purpose: ''
    });

    const [visible, setVisible] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const el = containerRef.current;
        if (!el) return;
        const observer = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
            { threshold: 0.05 }
        );
        observer.observe(el);
        return () => observer.disconnect();
    }, []);

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
        const phoneNumber = '94779077134';
        window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
    };

    const handleEmailOrder = () => {
        const subject = encodeURIComponent(`New Order from ${formData.name}`);
        const body = generateOrderMessage();
        window.location.href = `mailto:hello@jannahmarketing.lk?subject=${subject}&body=${body}`;
    };

    if (cart.length === 0) {
        return (
            <div className="min-h-screen bg-brand-black text-white pt-32 pb-20 px-6 flex flex-col items-center justify-center text-center">
                <Helmet>
                    <title>Checkout - Jannah Marketing</title>
                </Helmet>
                <div className="w-24 h-24 bg-brand-lime/10 rounded-full flex items-center justify-center mb-6">
                    <Trash2 className="w-10 h-10 text-brand-lime" />
                </div>
                <h1 className="text-3xl font-black font-display mb-4 uppercase tracking-tight">Your Cart is Empty</h1>
                <p className="text-gray-400 mb-8 max-w-md font-sans">Looks like you haven't added any refreshing drinks to your cart yet.</p>
                <Link to="/shop">
                    <button className="px-10 py-5 bg-brand-lime text-black font-black rounded-full hover:bg-white transition-all uppercase tracking-widest text-xs active:scale-95">
                        Start Shopping
                    </button>
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-brand-black text-white pt-32 pb-20 overflow-x-hidden">
            <Helmet>
                <title>Checkout - Jannah Marketing</title>
            </Helmet>

            <div className="container mx-auto px-6 max-w-6xl" ref={containerRef}>
                <Link to="/shop" className="inline-flex items-center gap-2 text-gray-500 hover:text-brand-lime transition-colors mb-8 font-black uppercase text-[10px] tracking-[0.2em]">
                    <ArrowLeft size={18} /> Continue Shopping
                </Link>

                <div
                    className="grid grid-cols-1 lg:grid-cols-2 gap-12 transition-all duration-700 ease-out will-change-transform"
                    style={{
                        opacity: visible ? 1 : 0,
                        transform: visible ? 'translate3d(0, 0, 0)' : 'translate3d(0, 20px, 0)'
                    }}
                >
                    {/* Cart Items */}
                    <div className="space-y-6">
                        <h2 className="text-2xl font-black font-display mb-6 flex items-center gap-3 uppercase tracking-tight">
                            <span className="w-8 h-8 rounded-full bg-brand-lime text-black flex items-center justify-center text-xs font-black">1</span>
                            Order Summary
                        </h2>

                        <div className="bg-white/5 rounded-3xl p-6 border border-white/10 space-y-6">
                            {cart.map((item) => (
                                <div key={`${item.productId}-${item.size}`} className="flex gap-4 items-center">
                                    <div className="w-20 h-20 bg-white/5 rounded-xl p-2 flex-shrink-0">
                                        <img src={item.image} alt={item.productName} className="w-full h-full object-contain" />
                                    </div>
                                    <div className="flex-grow">
                                        <h3 className="font-bold font-display text-sm uppercase tracking-tight">{item.productName}</h3>
                                        <p className="text-[10px] text-gray-500 font-sans uppercase tracking-widest">{item.size} - LKR {item.price}</p>
                                    </div>
                                    <div className="flex items-center gap-3 bg-brand-black rounded-full p-1 border border-white/10">
                                        <button
                                            onClick={() => updateQuantity(item.productId, item.size, -1)}
                                            className="w-8 h-8 rounded-full hover:bg-brand-lime hover:text-black flex items-center justify-center transition-colors font-bold"
                                        >
                                            -
                                        </button>
                                        <span className="text-xs font-bold w-4 text-center">{item.quantity}</span>
                                        <button
                                            onClick={() => updateQuantity(item.productId, item.size, 1)}
                                            className="w-8 h-8 rounded-full hover:bg-brand-lime hover:text-black flex items-center justify-center transition-colors font-bold"
                                        >
                                            +
                                        </button>
                                    </div>
                                    <button
                                        onClick={() => removeFromCart(item.productId, item.size)}
                                        className="p-2 text-gray-600 hover:text-red-500 transition-colors"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            ))}

                            <div className="border-t border-white/10 pt-6 mt-6">
                                <div className="flex justify-between items-center text-xl font-black font-display uppercase tracking-tight">
                                    <span>Total</span>
                                    <span className="text-brand-lime">LKR {totalPrice.toLocaleString()}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Checkout Form */}
                    <div>
                        <h2 className="text-2xl font-black font-display mb-6 flex items-center gap-3 uppercase tracking-tight">
                            <span className="w-8 h-8 rounded-full bg-brand-lime text-black flex items-center justify-center text-xs font-black">2</span>
                            Delivery Details
                        </h2>

                        <form className="bg-white/5 rounded-3xl p-8 border border-white/10 space-y-6" onSubmit={(e) => e.preventDefault()}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Full Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        required
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        className="w-full bg-brand-black border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-brand-lime transition-colors font-sans"
                                        placeholder="Full name"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Phone Number</label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        required
                                        value={formData.phone}
                                        onChange={handleInputChange}
                                        className="w-full bg-brand-black border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-brand-lime transition-colors font-sans"
                                        placeholder="077 123 4567"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Email Address</label>
                                <input
                                    type="email"
                                    name="email"
                                    required
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    className="w-full bg-brand-black border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-brand-lime transition-colors font-sans"
                                    placeholder="your@email.com"
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
                                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Purpose / Note</label>
                                <textarea
                                    name="purpose"
                                    rows={3}
                                    value={formData.purpose}
                                    onChange={handleInputChange}
                                    className="w-full bg-brand-black border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-brand-lime transition-colors font-sans resize-none"
                                    placeholder="Retail Stock, Party Bundle, etc."
                                />
                            </div>

                            <div className="pt-6 space-y-4">
                                <button
                                    onClick={handleWhatsAppOrder}
                                    disabled={!formData.name || !formData.phone}
                                    className="w-full py-4 bg-[#25D366] text-white font-black rounded-xl hover:bg-[#128C7E] transition-all flex items-center justify-center gap-3 uppercase tracking-widest text-xs disabled:opacity-50 disabled:cursor-not-allowed active:scale-95"
                                >
                                    <MessageCircle size={20} /> Send via WhatsApp
                                </button>
                                <button
                                    onClick={handleEmailOrder}
                                    disabled={!formData.name || !formData.email}
                                    className="w-full py-4 bg-white/10 text-white font-black rounded-xl hover:bg-white/20 transition-all flex items-center justify-center gap-3 uppercase tracking-widest text-xs disabled:opacity-50 disabled:cursor-not-allowed active:scale-95"
                                >
                                    <Mail size={20} /> Send via Email
                                </button>
                            </div>
                            <p className="text-[10px] text-gray-600 text-center font-sans">
                                By placing an order, you agree to our Terms of Service and Privacy Policy.
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default memo(Checkout);
