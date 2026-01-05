import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, Facebook, Instagram, Twitter, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import DistributorCTA from '../components/DistributorCTA';
import { Helmet } from 'react-helmet-async';
import emailjs from '@emailjs/browser';

const Contact: React.FC = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('sending');

        // REPLACE THESE WITH YOUR ACTUAL EMAILJS CREDENTIALS
        const SERVICE_ID = 'service_q5ks567';
        const TEMPLATE_ID = 'template_olrefpj'; // You might want a separate template for newsletter
        const PUBLIC_KEY = 'c0QlLfxOR3zDbpgHF';

        try {
            await emailjs.send(
                SERVICE_ID,
                TEMPLATE_ID,
                {
                    to_email: 'jannahne@gmail.com',
                    from_name: formData.name,
                    from_email: formData.email,
                    subject: formData.subject,
                    message: formData.message,
                },
                PUBLIC_KEY
            );
            setStatus('success');
            setFormData({ name: '', email: '', subject: '', message: '' });
        } catch (error) {
            console.error('EmailJS Error:', error);
            setStatus('error');
        }
    };

    const contactInfo = [
        {
            icon: Phone,
            title: 'Phone',
            details: ['077 907 7134', '075 438 5840', '075 342 1104'],
            link: 'tel:0779077134'
        },
        {
            icon: Mail,
            title: 'Email',
            details: ['hello@jannahmarketing.lk', 'inquiry@jannahmarketing.lk'],
            link: 'mailto:hello@jannahmarketing.lk'
        },
        {
            icon: MapPin,
            title: 'Head Office',
            details: ['300,B Boliverian Village', 'Sainthamaruthu'],
            link: 'https://maps.google.com'
        },
        {
            icon: Clock,
            title: 'Business Hours',
            details: ['Mon - Fri: 9:00 AM - 6:00 PM', 'Sat: 9:00 AM - 2:00 PM'],
            link: null
        }
    ];

    return (
        <div className="bg-[#050505] min-h-screen text-white">
            <Helmet>
                <title>Contact Sunstar - Get in Touch</title>
                <meta name="description" content="Have questions or want to become a distributor? Contact Sunstar today. We're here to help and explore partnership opportunities." />
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
                            <Mail className="w-4 h-4 text-[#CCFF00]" />
                            <span className="text-[#CCFF00] font-bold uppercase tracking-wider text-xs">Get In Touch</span>
                        </div>
                        <h1 className="text-4xl md:text-7xl font-black mb-6 font-['Plus_Jakarta_Sans']">
                            Contact Us
                        </h1>
                        <p className="text-lg md:text-xl text-gray-400">
                            Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Contact Form & Info */}
            <section className="py-20">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                        {/* Contact Information */}
                        <div className="lg:col-span-1 space-y-6">
                            <motion.h2
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                className="text-3xl font-black mb-8 font-['Plus_Jakarta_Sans']"
                            >
                                Contact Information
                            </motion.h2>

                            {contactInfo.map((info, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }}
                                    className="flex gap-4 p-4 rounded-xl border border-white/10 bg-white/5 hover:border-[#CCFF00]/30 transition-all"
                                >
                                    <div className="flex-shrink-0">
                                        <div className="w-12 h-12 rounded-full bg-[#CCFF00]/10 flex items-center justify-center">
                                            <info.icon className="w-6 h-6 text-[#CCFF00]" />
                                        </div>
                                    </div>
                                    <div>
                                        <h3 className="font-bold mb-1 font-['Plus_Jakarta_Sans']">{info.title}</h3>
                                        {info.details.map((detail, idx) => (
                                            <p key={idx} className="text-sm text-gray-400">
                                                {info.link && idx === 0 ? (
                                                    <a href={info.link} className="hover:text-[#CCFF00] transition-colors">
                                                        {detail}
                                                    </a>
                                                ) : (
                                                    detail
                                                )}
                                            </p>
                                        ))}
                                    </div>
                                </motion.div>
                            ))}

                            {/* Social Media */}
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                className="pt-8"
                            >
                                <h3 className="font-bold mb-4 font-['Plus_Jakarta_Sans']">Follow Us</h3>
                                <div className="flex gap-3">
                                    {[
                                        { icon: Facebook, link: '#' },
                                        { icon: Instagram, link: '#' },
                                        { icon: Twitter, link: '#' }
                                    ].map((social, i) => (
                                        <a
                                            key={i}
                                            href={social.link}
                                            className="w-10 h-10 rounded-full border border-white/10 bg-white/5 flex items-center justify-center hover:bg-[#CCFF00] hover:border-[#CCFF00] hover:text-black transition-all"
                                        >
                                            <social.icon className="w-5 h-5" />
                                        </a>
                                    ))}
                                </div>
                            </motion.div>
                        </div>

                        {/* Contact Form */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="lg:col-span-2"
                        >
                            <div className="p-8 md:p-12 rounded-2xl border border-white/10 bg-white/5">
                                <h2 className="text-3xl font-black mb-8 font-['Plus_Jakarta_Sans']">Send Us a Message</h2>
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-bold mb-2 text-gray-300">Name</label>
                                            <input
                                                type="text"
                                                value={formData.name}
                                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-[#CCFF00] focus:outline-none transition-colors text-white"
                                                placeholder="Your name"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-bold mb-2 text-gray-300">Email</label>
                                            <input
                                                type="email"
                                                value={formData.email}
                                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-[#CCFF00] focus:outline-none transition-colors text-white"
                                                placeholder="your@email.com"
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-bold mb-2 text-gray-300">Subject</label>
                                        <select
                                            value={formData.subject}
                                            onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                            className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-[#CCFF00] focus:outline-none transition-colors text-white appearance-none"
                                            required
                                        >
                                            <option value="" disabled className="bg-[#111]">Select a subject</option>
                                            <option value="General Inquiry" className="bg-[#111]">General Inquiry</option>
                                            <option value="Distributor Application" className="bg-[#111]">Become a Distributor</option>
                                            <option value="Support" className="bg-[#111]">Customer Support</option>
                                            <option value="Feedback" className="bg-[#111]">Feedback</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-bold mb-2 text-gray-300">Message</label>
                                        <textarea
                                            value={formData.message}
                                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                            rows={6}
                                            className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-[#CCFF00] focus:outline-none transition-colors text-white resize-none"
                                            placeholder="Tell us more..."
                                            required
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={status === 'sending' || status === 'success'}
                                        className={`w-full md:w-auto px-8 py-4 rounded-full font-black transition-all flex items-center justify-center gap-2 uppercase tracking-wider ${status === 'success'
                                            ? 'bg-green-500 text-white cursor-default'
                                            : status === 'error'
                                                ? 'bg-red-500 text-white hover:bg-red-600'
                                                : 'bg-[#CCFF00] text-black hover:bg-white'
                                            }`}
                                    >
                                        {status === 'sending' ? (
                                            <span>Sending...</span>
                                        ) : status === 'success' ? (
                                            <>
                                                <span>Message Sent!</span>
                                                <CheckCircle className="w-5 h-5" />
                                            </>
                                        ) : status === 'error' ? (
                                            <>
                                                <span>Failed. Try Again.</span>
                                                <AlertCircle className="w-5 h-5" />
                                            </>
                                        ) : (
                                            <>
                                                <span>Send Message</span>
                                                <Send className="w-5 h-5" />
                                            </>
                                        )}
                                    </button>
                                </form>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Distributor CTA */}
            <DistributorCTA />

            {/* Map Section */}
            <section className="py-20 border-t border-white/5">
                <div className="container mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="rounded-2xl overflow-hidden border border-white/10 h-96"
                    >
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3960.798467128444!2d79.84759631477269!3d6.914961795007538!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae259a5cef2bc07%3A0x1d7f2f6f3c8c4e0c!2sColombo%2C%20Sri%20Lanka!5e0!3m2!1sen!2sus!4v1234567890123"
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen
                            loading="lazy"
                            title="Sunstar Location"
                        />
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default Contact;
