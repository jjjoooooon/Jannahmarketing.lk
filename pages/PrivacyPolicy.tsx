import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';

const PrivacyPolicy: React.FC = () => {
    return (
        <div className="bg-[#050505] min-h-screen text-white pt-32 pb-20">
            <Helmet>
                <title>Privacy Policy - Sunstar</title>
                <meta name="robots" content="noindex" />
            </Helmet>
            <div className="container mx-auto px-6 max-w-4xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="prose prose-invert prose-lg max-w-none"
                >
                    <h1 className="text-4xl md:text-5xl font-black mb-8 font-['Plus_Jakarta_Sans'] text-[#CCFF00]">Privacy Policy</h1>
                    <p className="text-gray-400 mb-8">Last updated: January 6, 2026</p>

                    <section className="mb-8">
                        <h2 className="text-2xl font-bold mb-4 font-['Plus_Jakarta_Sans']">1. Introduction</h2>
                        <p className="text-gray-300">
                            Welcome to Sunstar ("we," "our," or "us"). We respect your privacy and are committed to protecting your personal data. This privacy policy will inform you as to how we look after your personal data when you visit our website (jannahmarketing.lk) and tell you about your privacy rights and how the law protects you.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-bold mb-4 font-['Plus_Jakarta_Sans']">2. Important Information and Who We Are</h2>
                        <h3 className="text-xl font-bold mb-2 text-white">Controller</h3>
                        <p className="text-gray-300 mb-4">
                            Sunstar is the controller and responsible for your personal data. If you have any questions about this privacy policy, including any requests to exercise your legal rights, please contact us using the details set out below.
                        </p>
                        <h3 className="text-xl font-bold mb-2 text-white">Contact Details</h3>
                        <p className="text-gray-300">
                            Full name of legal entity: Jannah Marketing<br />
                            Email address: hello@jannahmarketing.lk<br />
                            Postal address: B293 Boliverian Village, Sainthamaruthu, Sri Lanka<br />
                            Telephone number: 077 907 7134
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-bold mb-4 font-['Plus_Jakarta_Sans']">3. The Data We Collect About You</h2>
                        <p className="text-gray-300 mb-4">
                            We may collect, use, store and transfer different kinds of personal data about you which we have grouped together follows:
                        </p>
                        <ul className="list-disc pl-6 text-gray-300 space-y-2">
                            <li><strong>Identity Data:</strong> includes first name, last name, username or similar identifier.</li>
                            <li><strong>Contact Data:</strong> includes billing address, delivery address, email address and telephone numbers.</li>
                            <li><strong>Financial Data:</strong> includes bank account and payment card details (processed securely by our payment providers).</li>
                            <li><strong>Transaction Data:</strong> includes details about payments to and from you and other details of products and services you have purchased from us.</li>
                            <li><strong>Technical Data:</strong> includes internet protocol (IP) address, your login data, browser type and version, time zone setting and location, browser plug-in types and versions, operating system and platform and other technology on the devices you use to access this website.</li>
                            <li><strong>Usage Data:</strong> includes information about how you use our website, products and services.</li>
                            <li><strong>Marketing and Communications Data:</strong> includes your preferences in receiving marketing from us and our third parties and your communication preferences.</li>
                        </ul>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-bold mb-4 font-['Plus_Jakarta_Sans']">4. How We Use Your Personal Data</h2>
                        <p className="text-gray-300 mb-4">
                            We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:
                        </p>
                        <ul className="list-disc pl-6 text-gray-300 space-y-2">
                            <li>Where we need to perform the contract we are about to enter into or have entered into with you.</li>
                            <li>Where it is necessary for our legitimate interests (or those of a third party) and your interests and fundamental rights do not override those interests.</li>
                            <li>Where we need to comply with a legal or regulatory obligation.</li>
                        </ul>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-bold mb-4 font-['Plus_Jakarta_Sans']">5. Disclosures of Your Personal Data</h2>
                        <p className="text-gray-300 mb-4">
                            We may have to share your personal data with the parties set out below for the purposes set out in paragraph 4 above.
                        </p>
                        <ul className="list-disc pl-6 text-gray-300 space-y-2">
                            <li>External Third Parties: Service providers acting as processors who provide IT and system administration services.</li>
                            <li>Professional advisers: Acting as processors or joint controllers including lawyers, bankers, auditors and insurers.</li>
                            <li>Regulators and other authorities: Acting as processors or joint controllers who require reporting of processing activities in certain circumstances.</li>
                        </ul>
                        <p className="text-gray-300 mt-4">
                            We require all third parties to respect the security of your personal data and to treat it in accordance with the law. We do not allow our third-party service providers to use your personal data for their own purposes and only permit them to process your personal data for specified purposes and in accordance with our instructions.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-bold mb-4 font-['Plus_Jakarta_Sans']">6. Data Security</h2>
                        <p className="text-gray-300">
                            We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used or accessed in an unauthorized way, altered or disclosed. In addition, we limit access to your personal data to those employees, agents, contractors and other third parties who have a business need to know. They will only process your personal data on our instructions and they are subject to a duty of confidentiality.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-bold mb-4 font-['Plus_Jakarta_Sans']">7. Data Retention</h2>
                        <p className="text-gray-300">
                            We will only retain your personal data for as long as necessary to fulfil the purposes we collected it for, including for the purposes of satisfying any legal, accounting, or reporting requirements.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-bold mb-4 font-['Plus_Jakarta_Sans']">8. Your Legal Rights</h2>
                        <p className="text-gray-300 mb-4">
                            Under certain circumstances, you have rights under data protection laws in relation to your personal data, including the right to:
                        </p>
                        <ul className="list-disc pl-6 text-gray-300 space-y-2">
                            <li>Request access to your personal data.</li>
                            <li>Request correction of your personal data.</li>
                            <li>Request erasure of your personal data.</li>
                            <li>Object to processing of your personal data.</li>
                            <li>Request restriction of processing your personal data.</li>
                            <li>Request transfer of your personal data.</li>
                            <li>Right to withdraw consent.</li>
                        </ul>
                        <p className="text-gray-300 mt-4">
                            If you wish to exercise any of the rights set out above, please contact us.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-bold mb-4 font-['Plus_Jakarta_Sans']">9. Contact Us</h2>
                        <p className="text-gray-300">
                            If you have any questions about this privacy policy or our privacy practices, please contact us at: <a href="mailto:hello@jannahmarketing.lk" className="text-[#CCFF00] hover:underline">hello@jannahmarketing.lk</a>.
                        </p>
                    </section>
                </motion.div>
            </div>
        </div>
    );
};

export default PrivacyPolicy;
