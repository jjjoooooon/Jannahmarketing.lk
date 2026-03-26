import React, { useState, memo, useEffect, useRef, useCallback } from 'react';
import { Mail, Phone, MapPin, Send, Facebook, Instagram, Twitter, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import DistributorCTA from '../components/DistributorCTA';
import { Helmet } from 'react-helmet-async';
import emailjs from '@emailjs/browser';

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
const InfoCard = memo(({ info, visible, delay }: { info: typeof CONTACT_INFO[0], visible: boolean, delay: number }) => (
    <div
        className="flex gap-4 p-4 rounded-xl border border-white/10 bg-white/5 hover:border-brand-lime/30 transition-all duration-300 will-change-transform"
        style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'translate3d(0, 0, 0)' : 'translate3d(-20px, 0, 0)',
            transition: `opacity 0.6s ease-out ${delay}ms, transform 0.6s ease-out ${delay}ms`
        }}
    >
        <div className="flex-shrink-0">
            <div className="w-12 h-12 rounded-full bg-brand-lime/10 flex items-center justify-center">
                <info.icon className="w-6 h-6 text-brand-lime" />
            </div>
        </div>
        <div>
            <h3 className="font-bold mb-1 font-display">{info.title}</h3>
            {info.details.map((detail, idx) => (
                <p key={idx} className="text-sm text-gray-400 font-sans">
                    {info.link && idx === 0 ? (
                        <a href={info.link} className="hover:text-brand-lime transition-colors">
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

    // Intersection Observer for scroll animations
    const heroRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const mapRef = useRef<HTMLDivElement>(null);

    const [heroVisible, setHeroVisible] = useState(false);
    const [contentVisible, setContentVisible] = useState(false);
    const [mapVisible, setMapVisible] = useState(false);

    useEffect(() => {
        const observerOptions = { threshold: 0.1 };

        const heroObserver = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) { setHeroVisible(true); heroObserver.disconnect(); }
        }, observerOptions);

        const contentObserver = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) { setContentVisible(true); contentObserver.disconnect(); }
        }, observerOptions);

        const mapObserver = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) { setMapVisible(true); mapObserver.disconnect(); }
        }, observerOptions);

        if (heroRef.current) heroObserver.observe(heroRef.current);
        if (contentRef.current) contentObserver.observe(contentRef.current);
        if (mapRef.current) mapObserver.observe(mapRef.current);

        return () => {
            heroObserver.disconnect();
            contentObserver.disconnect();
            mapObserver.disconnect();
        };
    }, []);

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
        <div className="bg-brand-black min-h-screen text-white overflow-x-hidden">
            <Helmet>
                <title>Contact Jannah Marketing - Get in Touch | Sainthamaruthu</title>
                <meta name="description" content="Contact Jannah Marketing for inquiries or distributor opportunities. Located in Sainthamaruthu, Sri Lanka. Call 077 907 7134." />
                <link rel="canonical" href="https://jannahmarketing.lk/contact" />
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
                            opacity: heroVisible ? 1 : 0,
                            transform: heroVisible ? 'translate3d(0, 0, 0)' : 'translate3d(0, 20px, 0)'
                        }}
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand-lime/10 rounded-full border border-brand-lime/20 mb-6 font-sans">
                            <Mail className="w-4 h-4 text-brand-lime" />
                            <span className="text-brand-lime font-bold uppercase tracking-wider text-xs">Get In Touch</span>
                        </div>
                        <h1 className="text-4xl md:text-7xl font-black mb-6 font-display uppercase tracking-tighter">
                            Contact Us
                        </h1>
                        <p className="text-lg md:text-xl text-gray-400 font-sans">
                            Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
                        </p>
                    </div>
                </div>
            </section>

            {/* Contact Form & Info */}
            <section ref={contentRef} className="py-20">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                        {/* Contact Information */}
                        <div className="lg:col-span-1 space-y-6">
                            <h2
                                className="text-3xl font-black mb-8 font-display transition-all duration-500 will-change-transform"
                                style={{ opacity: contentVisible ? 1 : 0, transform: contentVisible ? 'translate3d(0,0,0)' : 'translate3d(-20px,0,0)' }}
                            >
                                Contact Information
                            </h2>

                            {CONTACT_INFO.map((info, i) => (
                                <InfoCard key={i} info={info} visible={contentVisible} delay={i * 100} />
                            ))}

                            {/* Social Media */}
                            <div
                                className="pt-8 transition-all duration-500 delay-400"
                                style={{ opacity: contentVisible ? 1 : 0 }}
                            >
                                <h3 className="font-bold mb-4 font-display uppercase tracking-widest text-xs text-gray-500">Follow Us</h3>
                                <div className="flex gap-3">
                                    {SOCIAL_LINKS.map((social, i) => (
                                        <a
                                            key={i}
                                            href={social.link}
                                            className="w-10 h-10 rounded-full border border-white/10 bg-white/5 flex items-center justify-center hover:bg-brand-lime hover:border-brand-lime hover:text-black transition-all active:scale-95"
                                        >
                                            <social.icon className="w-5 h-5" />
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Contact Form */}
                        <div
                            className="lg:col-span-2 transition-all duration-700 ease-out will-change-transform"
                            style={{
                                opacity: contentVisible ? 1 : 0,
                                transform: contentVisible ? 'translate3d(0, 0, 0)' : 'translate3d(20px, 0, 0)'
                            }}
                        >
                            <div className="p-8 md:p-12 rounded-2xl border border-white/10 bg-white/5">
                                <h2 className="text-3xl font-black mb-8 font-display">Send Us a Message</h2>
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-bold mb-2 text-gray-500 uppercase tracking-widest font-sans">Name</label>
                                            <input
                                                type="text"
                                                value={formData.name}
                                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-brand-lime focus:outline-none transition-colors text-white font-sans"
                                                placeholder="Your name"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-bold mb-2 text-gray-500 uppercase tracking-widest font-sans">Email</label>
                                            <input
                                                type="email"
                                                value={formData.email}
                                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-brand-lime focus:outline-none transition-colors text-white font-sans"
                                                placeholder="your@email.com"
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-bold mb-2 text-gray-500 uppercase tracking-widest font-sans">Subject</label>
                                        <select
                                            value={formData.subject}
                                            onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                            className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-brand-lime focus:outline-none transition-colors text-white appearance-none font-sans"
                                            required
                                        >
                                            <option value="" disabled className="bg-brand-black">Select a subject</option>
                                            <option value="General Inquiry" className="bg-brand-black">General Inquiry</option>
                                            <option value="Distributor Application" className="bg-brand-black">Become a Distributor</option>
                                            <option value="Support" className="bg-brand-black">Customer Support</option>
                                            <option value="Feedback" className="bg-brand-black">Feedback</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-bold mb-2 text-gray-500 uppercase tracking-widest font-sans">Message</label>
                                        <textarea
                                            value={formData.message}
                                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                            rows={6}
                                            className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-brand-lime focus:outline-none transition-colors text-white resize-none font-sans"
                                            placeholder="Tell us more..."
                                            required
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={status === 'sending' || status === 'success'}
                                        className={`w-full md:w-auto px-10 py-4 rounded-full font-black transition-all flex items-center justify-center gap-2 uppercase tracking-widest text-[10px] ${status === 'success'
                                            ? 'bg-green-500 text-white cursor-default'
                                            : status === 'error'
                                                ? 'bg-red-500 text-white hover:bg-red-600'
                                                : 'bg-brand-lime text-black hover:bg-white active:scale-95'
                                            }`}
                                    >
                                        {status === 'sending' ? (
                                            <span>Sending...</span>
                                        ) : status === 'success' ? (
                                            <>
                                                <span>Message Sent!</span>
                                                <CheckCircle className="w-5 h-5" />
                                            </>
                                        ) : (
                                            <>
                                                <span>Send Message</span>
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
            <section ref={mapRef} className="py-20 border-t border-white/5">
                <div className="container mx-auto px-6">
                    <div
                        className="rounded-2xl overflow-hidden border border-white/10 h-96 transition-all duration-1000 ease-out will-change-transform"
                        style={{
                            opacity: mapVisible ? 1 : 0,
                            transform: mapVisible ? 'translate3d(0, 0, 0)' : 'translate3d(0, 40px, 0)'
                        }}
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
                    </div>
                </div>
            </section>
        </div>
    );
};

export default memo(Contact);
