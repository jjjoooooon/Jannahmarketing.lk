import React, { memo, useEffect, useRef, useState } from 'react';
import { Helmet } from 'react-helmet-async';

const TermsOfService: React.FC = () => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const el = sectionRef.current;
        if (!el) return;
        const observer = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
            { threshold: 0.05 }
        );
        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    return (
        <div className="bg-brand-black min-h-screen text-white pt-32 pb-20">
            <Helmet>
                <title>Terms of Service - Jannah Marketing</title>
                <meta name="description" content="Sunstar Terms of Service - Read our terms and conditions for using our website and purchasing our products." />
                <meta name="robots" content="noindex" />
                <link rel="canonical" href="https://jannahmarketing.lk/terms-of-service" />
            </Helmet>
            <div className="container mx-auto px-6 max-w-4xl">
                <div
                    ref={sectionRef}
                    className="prose prose-invert prose-lg max-w-none transition-all duration-700 ease-out will-change-transform"
                    style={{
                        opacity: visible ? 1 : 0,
                        transform: visible ? 'translate3d(0, 0, 0)' : 'translate3d(0, 20px, 0)'
                    }}
                >
                    <h1 className="text-4xl md:text-5xl font-black mb-8 font-display text-brand-lime uppercase tracking-tighter">Terms of Service</h1>
                    <p className="text-gray-500 mb-8 font-sans">Last updated: January 6, 2026</p>

                    <section className="mb-12">
                        <h2 className="text-2xl font-bold mb-4 font-display text-white uppercase tracking-tight">1. Agreement to Terms</h2>
                        <p className="text-gray-400 font-sans leading-relaxed">
                            These Terms of Service constitute a legally binding agreement made between you, whether personally or on behalf of an entity ("you") and Sunstar ("we," "us" or "our"), concerning your access to and use of the jannahmarketing.lk website as well as any other media form, media channel, mobile website or mobile application related, linked, or otherwise connected thereto (collectively, the "Site"). You agree that by accessing the Site, you have read, understood, and agreed to be bound by all of these Terms of Service. IF YOU DO NOT AGREE WITH ALL OF THESE TERMS OF SERVICE, THEN YOU ARE EXPRESSLY PROHIBITED FROM USING THE SITE AND YOU MUST DISCONTINUE USE IMMEDIATELY.
                        </p>
                    </section>

                    <section className="mb-12">
                        <h2 className="text-2xl font-bold mb-4 font-display text-white uppercase tracking-tight">2. Intellectual Property Rights</h2>
                        <p className="text-gray-400 font-sans leading-relaxed">
                            Unless otherwise indicated, the Site is our proprietary property and all source code, databases, functionality, software, website designs, audio, video, text, photographs, and graphics on the Site (collectively, the "Content") and the trademarks, service marks, and logos contained therein (the "Marks") are owned or controlled by us or licensed to us, and are protected by copyright and trademark laws and various other intellectual property rights and unfair competition laws of Sri Lanka, international copyright laws, and international conventions. The Content and the Marks are provided on the Site "AS IS" for your information and personal use only. Except as expressly provided in these Terms of Service, no part of the Site and no Content or Marks may be copied, reproduced, aggregated, republished, uploaded, posted, publicly displayed, encoded, translated, transmitted, distributed, sold, licensed, or otherwise exploited for any commercial purpose whatsoever, without our express prior written permission.
                        </p>
                    </section>

                    <section className="mb-12">
                        <h2 className="text-2xl font-bold mb-4 font-display text-white uppercase tracking-tight">3. User Representations</h2>
                        <p className="text-gray-400 mb-4 font-sans leading-relaxed">
                            By using the Site, you represent and warrant that:
                        </p>
                        <ul className="list-disc pl-6 text-gray-400 space-y-3 font-sans">
                            <li>All registration information you submit will be true, accurate, current, and complete.</li>
                            <li>You will maintain the accuracy of such information and promptly update such registration information as necessary.</li>
                            <li>You have the legal capacity and you agree to comply with these Terms of Service.</li>
                            <li>You are not a minor in the jurisdiction in which you reside.</li>
                            <li>You will not access the Site through automated or non-human means, whether through a bot, script, or otherwise.</li>
                            <li>You will not use the Site for any illegal or unauthorized purpose.</li>
                            <li>Your use of the Site will not violate any applicable law or regulation.</li>
                        </ul>
                    </section>

                    <section className="mb-12">
                        <h2 className="text-2xl font-bold mb-4 font-display text-white uppercase tracking-tight">4. Products</h2>
                        <p className="text-gray-400 font-sans leading-relaxed">
                            We make every effort to display as accurately as possible the colors, features, specifications, and details of the products available on the Site. However, we do not guarantee that the colors, features, specifications, and details of the products will be accurate, complete, reliable, current, or free of other errors, and your electronic display may not accurately reflect the actual colors and details of the products. All products are subject to availability, and we cannot guarantee that items will be in stock. We reserve the right to discontinue any products at any time for any reason. Prices for all products are subject to change.
                        </p>
                    </section>

                    <section className="mb-12">
                        <h2 className="text-2xl font-bold mb-4 font-display text-white uppercase tracking-tight">5. Purchases and Payment</h2>
                        <p className="text-gray-400 font-sans leading-relaxed">
                            We accept the following forms of payment: Visa, Mastercard, and other local payment methods. You agree to provide current, complete, and accurate purchase and account information for all purchases made via the Site. You further agree to promptly update account and payment information, including email address, payment method, and payment card expiration date, so that we can complete your transactions and contact you as needed. Sales tax will be added to the price of purchases as deemed required by us. We may change prices at any time. All payments shall be in Sri Lankan Rupees (LKR).
                        </p>
                    </section>

                    <section className="mb-12">
                        <h2 className="text-2xl font-bold mb-4 font-display text-white uppercase tracking-tight">6. Return Policy</h2>
                        <p className="text-gray-400 font-sans leading-relaxed">
                            Please review our Return Policy posted on the Site prior to making any purchases.
                        </p>
                    </section>

                    <section className="mb-12">
                        <h2 className="text-2xl font-bold mb-4 font-display text-white uppercase tracking-tight">7. Prohibited Activities</h2>
                        <p className="text-gray-400 mb-4 font-sans leading-relaxed">
                            You may not access or use the Site for any purpose other than that for which we make the Site available. The Site may not be used in connection with any commercial endeavors except those that are specifically endorsed or approved by us. As a user of the Site, you agree not to:
                        </p>
                        <ul className="list-disc pl-6 text-gray-400 space-y-3 font-sans">
                            <li>Systematically retrieve data or other content from the Site to create or compile, directly or indirectly, a collection, compilation, database, or directory without written permission from us.</li>
                            <li>Make any unauthorized use of the Site, including collecting usernames and/or email addresses of users by electronic or other means for the purpose of sending unsolicited email, or creating user accounts by automated means or under false pretenses.</li>
                            <li>Circumvent, disable, or otherwise interfere with security-related features of the Site.</li>
                            <li>Engage in unauthorized framing of or linking to the Site.</li>
                            <li>Trick, defraud, or mislead us and other users, especially in any attempt to learn sensitive account information such as user passwords.</li>
                            <li>Make improper use of our support services or submit false reports of abuse or misconduct.</li>
                        </ul>
                    </section>

                    <section className="mb-12">
                        <h2 className="text-2xl font-bold mb-4 font-display text-white uppercase tracking-tight">8. Modifications and Interruptions</h2>
                        <p className="text-gray-400 font-sans leading-relaxed">
                            We reserve the right to change, modify, or remove the contents of the Site at any time or for any reason at our sole discretion without notice. However, we have no obligation to update any information on our Site. We also reserve the right to modify or discontinue all or part of the Site without notice at any time. We will not be liable to you or any third party for any modification, price change, suspension, or discontinuance of the Site.
                        </p>
                    </section>

                    <section className="mb-12">
                        <h2 className="text-2xl font-bold mb-4 font-display text-white uppercase tracking-tight">9. Governing Law</h2>
                        <p className="text-gray-400 font-sans leading-relaxed">
                            These Terms shall be governed by and defined following the laws of Sri Lanka. Sunstar and yourself irrevocably consent that the courts of Sri Lanka shall have exclusive jurisdiction to resolve any dispute which may arise in connection with these terms.
                        </p>
                    </section>

                    <section className="mb-12">
                        <h2 className="text-2xl font-bold mb-4 font-display text-white uppercase tracking-tight">10. Contact Us</h2>
                        <p className="text-gray-400 font-sans leading-relaxed">
                            In order to resolve a complaint regarding the Site or to receive further information regarding use of the Site, please contact us at: <a href="mailto:hello@jannahmarketing.lk" className="text-brand-lime hover:underline">hello@jannahmarketing.lk</a>.
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default memo(TermsOfService);
