import React, { memo, lazy, Suspense } from 'react';
import Hero from '../components/Hero';
import Marquee from '../components/Marquee';
import Story from '../components/Story';
import Ingredients from '../components/Ingredients';
import ProductShowcase from '../components/ProductShowcase';
import { Helmet } from 'react-helmet-async';

// Lazy load below-the-fold components for performance
const Testimonials = lazy(() => import('../components/Testimonials'));
const SriLankaMap = lazy(() => import('../components/SriLankaMap'));
const DistributorCTA = lazy(() => import('../components/DistributorCTA'));

const Home: React.FC = () => {
    return (
        <main>
            <Helmet>
                <title>Sunstar by Jannah Marketing - Sri Lanka's Growing Carbonated Beverage Brand</title>
                <meta name="description" content="Discover Sunstar, the refreshing carbonated soda brand by Jannah Marketing (Pvt) Ltd. Founded in 2023 in Sainthamaruthu, we now distribute our 5 iconic flavors across all over Sri Lanka." />
                <link rel="canonical" href="https://jannahmarketing.lk/" />

                {/* Open Graph */}
                <meta property="og:title" content="Sunstar by Jannah Marketing - Premium Sri Lankan Sodas" />
                <meta property="og:description" content="Sunstar is a growing beverage brand by Jannah Marketing (Pvt) Ltd. Founded in 2023, bringing 5 refreshing soda flavors to every province in Sri Lanka." />
                <meta property="og:image" content="https://jannahmarketing.lk/og-sunstar-home.jpg" />
                <meta property="og:url" content="https://jannahmarketing.lk/" />
                <meta property="og:type" content="website" />
                <meta property="og:site_name" content="Jannah Marketing" />

                {/* Twitter Card */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="Sunstar by Jannah Marketing" />
                <meta name="twitter:description" content="Sri Lanka's growing soda brand. 5 flavors, island-wide distribution. Founded 2023." />
                <meta name="twitter:image" content="https://jannahmarketing.lk/og-sunstar-home.jpg" />
            </Helmet>

            <Hero />
            <Marquee />
            <Story />
            <Ingredients />
            <ProductShowcase />

            <Suspense fallback={<div className="h-96 bg-brand-black animate-pulse" />}>
                <Testimonials />
                <SriLankaMap />
                <DistributorCTA />
            </Suspense>
        </main>
    );
};

export default memo(Home);
