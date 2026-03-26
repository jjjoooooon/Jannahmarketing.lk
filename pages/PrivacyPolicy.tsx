import React, { memo, useEffect, useRef, useState } from 'react';
import { Helmet } from 'react-helmet-async';

const PrivacyPolicy: React.FC = () => {
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
                <title>Privacy Policy - Jannah Marketing</title>
                <meta name="description" content="Sunstar Privacy Policy - Learn how we collect, use, and protect your personal information." />
                <meta name="robots" content="noindex" />
                <link rel="canonical" href="https://jannahmarketing.lk/privacy-policy" />
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
                    <h1 className="text-4xl md:text-5xl font-black mb-8 font-display text-brand-lime uppercase tracking-tighter">Privacy Policy</h1>
                    <p className="text-gray-500 mb-8 font-sans">Last updated: January 6, 2026</p>

                    <section className="mb-12">
                        <h2 className="text-2xl font-bold mb-4 font-display text-white uppercase tracking-tight">1. Introduction</h2>
                        <p className="text-gray-400 font-sans leading-relaxed">
                            Welcome to Sunstar ("we," "our," or "us"). We respect your privacy and are committed to protecting your personal data. This privacy policy will inform you as to how we look after your personal data when you visit our website (jannahmarketing.lk) and tell you about your privacy rights and how the law protects you.
                        </p>
                    </section>

                    <section className="mb-12">
                        <h2 className="text-2xl font-bold mb-4 font-display text-white uppercase tracking-tight">2. Important Information and Who We Are</h2>
                        <h3 className="text-xl font-bold mb-2 text-white font-display">Controller</h3>
                        <p className="text-gray-400 mb-4 font-sans leading-relaxed">
                            Sunstar is the controller and responsible for your personal data. If you have any questions about this privacy policy, including any requests to exercise your legal rights, please contact us using the details set out below.
                        </p>
                        <h3 className="text-xl font-bold mb-2 text-white font-display">Contact Details</h3>
                        <p className="text-gray-400 font-sans leading-relaxed">
                            Full name of legal entity: Jannah Marketing (Pvt) Ltd<br />
                            Email address: hello@jannahmarketing.lk<br />
                            Postal address: B293 Boliverian Village, Sainthamaruthu, Sri Lanka<br />
                            Telephone number: 077 907 7134
                        </p>
                    </section>

                    <section className="mb-12">
                        <h2 className="text-2xl font-bold mb-4 font-display text-white uppercase tracking-tight">3. The Data We Collect About You</h2>
                        <p className="text-gray-400 mb-4 font-sans leading-relaxed">
                            We may collect, use, store and transfer different kinds of personal data about you which we have grouped together follows:
                        </p>
                        <ul className="list-disc pl-6 text-gray-400 space-y-3 font-sans leading-relaxed">
                            <li><strong className="text-white">Identity Data:</strong> includes first name, last name, username or similar identifier.</li>
                            <li><strong className="text-white">Contact Data:</strong> includes billing address, delivery address, email address and telephone numbers.</li>
                            <li><strong className="text-white">Financial Data:</strong> includes bank account and payment card details (processed securely by our payment providers).</li>
                            <li><strong className="text-white">Transaction Data:</strong> includes details about payments to and from you and other details of products and services you have purchased from us.</li>
                            <li><strong className="text-white">Technical Data:</strong> includes internet protocol (IP) address, your login data, browser type and version, time zone setting and location, browser plug-in types and versions, operating system and platform and other technology on the devices you use to access this website.</li>
                            <li><strong className="text-white">Usage Data:</strong> includes information about how you use our website, products and services.</li>
                            <li><strong className="text-white">Marketing and Communications Data:</strong> includes your preferences in receiving marketing from us and our third parties and your communication preferences.</li>
                        </ul>
                    </section>

                    <section className="mb-12">
                        <h2 className="text-2xl font-bold mb-4 font-display text-white uppercase tracking-tight">4. How We Use Your Personal Data</h2>
                        <p className="text-gray-400 mb-4 font-sans leading-relaxed">
                            We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:
                        </p>
                        <ul className="list-disc pl-6 text-gray-400 space-y-3 font-sans">
                            <li>Where we need to perform the contract we are about to enter into or have entered into with you.</li>
                            <li>Where it is necessary for our legitimate interests (or those of a third party) and your interests and fundamental rights do not override those interests.</li>
                            <li>Where we need to comply with a legal or regulatory obligation.</li>
                        </ul>
                    </section>

                    <section className="mb-12">
                        <h2 className="text-2xl font-bold mb-4 font-display text-white uppercase tracking-tight">5. Disclosures of Your Personal Data</h2>
                        <p className="text-gray-400 mb-4 font-sans leading-relaxed">
                            We may have to share your personal data with the parties set out below for the purposes set out in paragraph 4 above.
                        </p>
                        <ul className="list-disc pl-6 text-gray-400 space-y-3 font-sans">
                            <li>External Third Parties: Service providers acting as processors who provide IT and system administration services.</li>
                            <li>Professional advisers: Acting as processors or joint controllers including lawyers, bankers, auditors and insurers.</li>
                            <li>Regulators and other authorities: Acting as processors or joint controllers who require reporting of processing activities in certain circumstances.</li>
                        </ul>
                        <p className="text-gray-400 mt-4 font-sans leading-relaxed">
                            We require all third parties to respect the security of your personal data and to treat it in accordance with the law. We do not allow our third-party service providers to use your personal data for their own purposes and only permit them to process your personal data for specified purposes and in accordance with our instructions.
                        </p>
                    </section>

                    <section className="mb-12">
                        <h2 className="text-2xl font-bold mb-4 font-display text-white uppercase tracking-tight">6. Data Security</h2>
                        <p className="text-gray-400 font-sans leading-relaxed">
                            We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used or accessed in an unauthorized way, altered or disclosed. In addition, we limit access to your personal data to those employees, agents, contractors and other third parties who have a business need to know. They will only process your personal data on our instructions and they are subject to a duty of confidentiality.
                        </p>
                    </section>

                    <section className="mb-12">
                        <h2 className="text-2xl font-bold mb-4 font-display text-white uppercase tracking-tight">7. Data Retention</h2>
                        <p className="text-gray-400 font-sans leading-relaxed">
                            We will only retain your personal data for as long as necessary to fulfil the purposes we collected it for, including for the purposes of satisfying any legal, accounting, or reporting requirements.
                        </p>
                    </section>

                    <section className="mb-12">
                        <h2 className="text-2xl font-bold mb-4 font-display text-white uppercase tracking-tight">8. Your Legal Rights</h2>
                        <p className="text-gray-400 mb-4 font-sans leading-relaxed">
                            Under certain circumstances, you have rights under data protection laws in relation to your personal data, including the right to:
                        </p>
                        <ul className="list-disc pl-6 text-gray-400 space-y-3 font-sans">
                            <li>Request access to your personal data.</li>
                            <li>Request correction of your personal data.</li>
                            <li>Request erasure of your personal data.</li>
                            <li>Object to processing of your personal data.</li>
                            <li>Request restriction of processing your personal data.</li>
                            <li>Request transfer of your personal data.</li>
                            <li>Right to withdraw consent.</li>
                        </ul>
                        <p className="text-gray-400 mt-4 font-sans leading-relaxed">
                            If you wish to exercise any of the rights set out above, please contact us.
                        </p>
                    </section>

                    <section className="mb-12">
                        <h2 className="text-2xl font-bold mb-4 font-display text-white uppercase tracking-tight">9. Contact Us</h2>
                        <p className="text-gray-400 font-sans leading-relaxed">
                            If you have any questions about this privacy policy or our privacy practices, please contact us at: <a href="mailto:hello@jannahmarketing.lk" className="text-brand-lime hover:underline">hello@jannahmarketing.lk</a>.
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default memo(PrivacyPolicy);
