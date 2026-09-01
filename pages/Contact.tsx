import React, { useState, memo, useRef, useCallback } from 'react';
import { Mail, Phone, MapPin, Send, Facebook, Instagram, Twitter, Clock, CheckCircle } from 'lucide-react';
import DistributorCTA from '../components/DistributorCTA';
import { Helmet } from 'react-helmet-async';
import emailjs from '@emailjs/browser';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// --- Static Data ---
const CONTACT_INFO = [
    {
        icon: Phone,
        title: 'Phone',
        details: ['077 907 7134'],
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
        details: ['B293 Boliverian Village', 'Sainthamaruthu'],
        link: 'https://maps.google.com'
    },
    {
        icon: Clock,
        title: 'Business Hours',
        details: ['Mon - Fri: 9:00 AM - 6:00 PM', 'Sat: 9:00 AM - 2:00 PM'],
        link: null
    }
];

const SOCIAL_LINKS = [
    { icon: Facebook, link: '#' },
    { icon: Instagram, link: '#' },
    { icon: Twitter, link: '#' }
];

// --- Sub-Components ---
const InfoCard = memo(({ info }: { info: typeof CONTACT_INFO[0] }) => (
    <div className="contact-info-card opacity-0 transform -translate-x-8 flex gap-5 p-5 border-b border-white/5 bg-transparent hover:bg-white/[0.02] transition-colors duration-500 group">
        <div className="flex-shrink-0">
            <div className="w-12 h-12 flex items-center justify-center border border-white/10 group-hover:border-white/30 transition-colors duration-500 bg-white/5 backdrop-blur-md">
                <info.icon className="w-5 h-5 text-white/50 group-hover:text-white transition-colors duration-500" strokeWidth={1.5} />
            </div>
        </div>
        <div>
            <h3 className="font-bold mb-1 font-sans text-sm tracking-widest text-white uppercase">{info.title}</h3>
            {info.details.map((detail, idx) => (
                <p key={idx} className="text-[13px] text-white/50 font-mplus leading-relaxed">
                    {info.link && idx === 0 ? (
                        <a href={info.link} className="hover:text-white transition-colors border-b border-transparent hover:border-white/30 pb-0.5">
                            {detail}
                        </a>
                    ) : (
                        detail
                    )}
                </p>
            ))}
        </div>
    </div>
));

const Contact: React.FC = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        // Hero text stagger 
        gsap.to(".contact-hero-element", {
            y: 0,
            opacity: 1,
            duration: 1.2,
            stagger: 0.2,
            ease: "power3.out",
            delay: 0.1
        });

        // Info Cards (Left)
        gsap.to(".contact-info-header", {
            scrollTrigger: { trigger: ".contact-grid-section", start: "top 75%" },
            x: 0, opacity: 1, duration: 1, ease: "power2.out"
        });
        gsap.to(".contact-info-card", {
            scrollTrigger: { trigger: ".contact-grid-section", start: "top 75%" },
            x: 0, opacity: 1, stagger: 0.1, duration: 1, ease: "power2.out", delay: 0.2
        });
        gsap.to(".contact-socials", {
            scrollTrigger: { trigger: ".contact-grid-section", start: "top 75%" },
            y: 0, opacity: 1, duration: 1, ease: "power2.out", delay: 0.6
        });

        // Form (Right)
        gsap.to(".contact-form-container", {
            scrollTrigger: { trigger: ".contact-grid-section", start: "top 75%" },
            y: 0, opacity: 1, filter: "blur(0px)", duration: 1.2, ease: "power3.out", delay: 0.2
        });

        // Map
        gsap.to(".contact-map-header", {
            scrollTrigger: { trigger: ".contact-map-section", start: "top 80%" },
            x: 0, opacity: 1, duration: 1, ease: "power2.out"
        });
        gsap.to(".contact-map-container", {
            scrollTrigger: { trigger: ".contact-map-section", start: "top 80%" },
            y: 0, opacity: 1, duration: 1.2, ease: "power3.out", delay: 0.2
        });

    }, { scope: containerRef });

    const handleSubmit = useCallback(async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('sending');

        const SERVICE_ID = 'service_q5ks567';
        const TEMPLATE_ID = 'template_olrefpj';
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
    }, [formData]);

    return (
        <div ref={containerRef} className="bg-brand-black min-h-screen text-white overflow-x-hidden">
            <Helmet>
                <title>Contact Jannah Marketing - Get in Touch | Sainthamaruthu</title>
                <meta name="description" content="Contact Jannah Marketing for inquiries or distributor opportunities. Located in Sainthamaruthu, Sri Lanka. Call 077 907 7134." />
                <link rel="canonical" href="https://jannahmarketing.lk/contact" />
            </Helmet>

            {/* Hero Section */}
            <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden border-b border-white/5">
                <div className="absolute inset-0 z-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)] pointer-events-none" />

                <div className="container mx-auto px-6 max-w-7xl relative z-10">
                    <div className="text-center max-w-4xl mx-auto">
                        <div className="contact-hero-element opacity-0 translate-y-12 inline-flex items-center gap-3 px-6 py-2 border border-white/20 mb-8 backdrop-blur-md">
                            <Mail className="w-3.5 h-3.5 text-white/70" />
                            <span className="text-white/70 font-bold uppercase tracking-[0.2em] text-[9px]">Connect</span>
                        </div>
                        <h1 className="contact-hero-element opacity-0 translate-y-12 text-6xl md:text-8xl font-normal mb-8 font-grace leading-tight">
                            Start a Conversation
                        </h1>
                        <p className="contact-hero-element opacity-0 translate-y-12 text-lg text-white/50 mb-10 font-mplus max-w-2xl mx-auto leading-relaxed">
                            Whether you are a customer with questions or an enterprise looking for wholesale distribution, our corporate desk is ready to assist.
                        </p>
                    </div>
                </div>
            </section>

            {/* Contact Form & Info Grid */}
            <section className="contact-grid-section py-24 lg:py-32 bg-black/50 border-b border-white/5">
                <div className="container mx-auto px-6 max-w-7xl">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
                        
                        {/* Contact Information (Left) */}
                        <div className="lg:col-span-5 space-y-6 flex flex-col justify-center">
                            <div className="contact-info-header opacity-0 transform -translate-x-8 mb-10">
                                <h2 className="text-4xl md:text-6xl font-normal mb-6 font-grace">Corporate Desk</h2>
                                <p className="text-white/40 text-[13px] font-mplus max-w-sm leading-relaxed">Direct pipelines to our administrative units. Expect a response within 24 business hours.</p>
                            </div>

                            <div className="border-t border-white/5 flex flex-col">
                                {CONTACT_INFO.map((info, i) => (
                                    <InfoCard key={i} info={info} />
                                ))}
                            </div>

                            {/* Social Media */}
                            <div className="contact-socials pt-10 opacity-0 transform translate-y-8">
                                <h3 className="font-bold mb-5 font-sans uppercase tracking-[0.2em] text-[10px] text-white/30">Digital Presence</h3>
                                <div className="flex gap-4">
                                    {SOCIAL_LINKS.map((social, i) => (
                                        <a
                                            key={i}
                                            href={social.link}
                                            className="w-12 h-12 border border-white/10 bg-white/[0.02] flex items-center justify-center hover:bg-white/10 hover:border-white/30 transition-all duration-300"
                                        >
                                            <social.icon className="w-5 h-5 text-white/60" strokeWidth={1.5} />
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Contact Form (Right) */}
                        <div className="lg:col-span-7">
                            <div className="contact-form-container opacity-0 transform translate-y-12 blur-sm p-8 md:p-12 lg:p-16 border border-white/10 bg-white/[0.02] backdrop-blur-2xl relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-[80px] pointer-events-none" />
                                
                                <h2 className="text-3xl md:text-5xl font-normal mb-10 font-grace relative z-10">Direct Message</h2>
                                
                                <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <div>
                                            <label className="block text-[10px] font-bold mb-3 text-white/40 uppercase tracking-[0.2em] font-sans">Full Name</label>
                                            <input
                                                type="text"
                                                value={formData.name}
                                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                className="w-full px-5 py-4 bg-white/[0.03] border border-white/10 focus:border-white/50 focus:bg-white/[0.05] focus:outline-none transition-all duration-300 text-white font-mplus text-sm placeholder:text-white/20"
                                                placeholder="John Doe"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-[10px] font-bold mb-3 text-white/40 uppercase tracking-[0.2em] font-sans">Email Address</label>
                                            <input
                                                type="email"
                                                value={formData.email}
                                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                className="w-full px-5 py-4 bg-white/[0.03] border border-white/10 focus:border-white/50 focus:bg-white/[0.05] focus:outline-none transition-all duration-300 text-white font-mplus text-sm placeholder:text-white/20"
                                                placeholder="john@example.com"
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-[10px] font-bold mb-3 text-white/40 uppercase tracking-[0.2em] font-sans">Inquiry Type</label>
                                        <select
                                            value={formData.subject}
                                            onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                            className="w-full px-5 py-4 bg-white/[0.03] border border-white/10 focus:border-white/50 focus:bg-white/[0.05] focus:outline-none transition-all duration-300 text-white font-mplus text-sm appearance-none cursor-pointer"
                                            required
                                        >
                                            <option value="" disabled className="bg-brand-black text-white">Select a specific division</option>
                                            <option value="General Inquiry" className="bg-brand-black text-white">General Inquiry</option>
                                            <option value="Distributor Application" className="bg-brand-black text-white">Distributions & Wholesale</option>
                                            <option value="Support" className="bg-brand-black text-white">Customer Support</option>
                                            <option value="Feedback" className="bg-brand-black text-white">Feedback & Suggestions</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-[10px] font-bold mb-3 text-white/40 uppercase tracking-[0.2em] font-sans">Details</label>
                                        <textarea
                                            value={formData.message}
                                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                            rows={6}
                                            className="w-full px-5 py-4 bg-white/[0.03] border border-white/10 focus:border-white/50 focus:bg-white/[0.05] focus:outline-none transition-all duration-300 text-white font-mplus text-sm placeholder:text-white/20 resize-none"
                                            placeholder="Please describe your requirement in detail..."
                                            required
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={status === 'sending' || status === 'success'}
                                        className={`w-full md:w-auto px-8 py-4 font-bold text-[11px] uppercase tracking-[0.2em] transition-all duration-300 flex justify-center items-center gap-3 ${status === 'success'
                                            ? 'bg-white/10 text-white/50 border border-white/10 cursor-not-allowed'
                                            : status === 'error'
                                                ? 'bg-red-900/50 text-white border border-red-500 hover:bg-red-900'
                                                : 'bg-[#6F9578] text-white hover:bg-[#597860]'
                                            }`}
                                    >
                                        {status === 'sending' ? (
                                            <span>Transmitting...</span>
                                        ) : status === 'success' ? (
                                            <>
                                                <span>Delivered</span>
                                                <CheckCircle className="w-4 h-4" />
                                            </>
                                        ) : (
                                            <>
                                                <span>Transmit Message</span>
                                                <Send className="w-4 h-4" />
                                            </>
                                        )}
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <DistributorCTA />

            {/* Map Section */}
            <section className="contact-map-section py-24 lg:py-32 border-t border-white/5">
                <div className="container mx-auto px-6 max-w-7xl">
                    <div className="contact-map-header opacity-0 transform -translate-x-8 inline-flex items-center gap-2 mb-8">
                        <span className="w-8 h-[1px] bg-white/30" />
                        <span className="text-white/50 uppercase tracking-[0.3em] text-xs font-bold font-sans">Location Grid</span>
                    </div>

                    <div className="contact-map-container opacity-0 transform translate-y-12 h-[500px] border border-white/10 bg-white/[0.02] p-2">
                        <div className="w-full h-full relative overflow-hidden">
                            <div className="absolute inset-0 bg-black/20 pointer-events-none z-10" />
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3960.798467128444!2d79.84759631477269!3d6.914961795007538!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae259a5cef2bc07%3A0x1d7f2f6f3c8c4e0c!2sColombo%2C%20Sri%20Lanka!5e0!3m2!1sen!2sus!4v1234567890123"
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen
                                loading="lazy"
                                title="Sunstar Location"
                                className="relative z-0"
                            />
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default memo(Contact);
