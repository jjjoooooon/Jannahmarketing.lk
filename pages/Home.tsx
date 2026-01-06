import React from 'react';
import Hero from '../components/Hero';
import Marquee from '../components/Marquee';
import Story from '../components/Story';
import Ingredients from '../components/Ingredients';
import ProductShowcase from '../components/ProductShowcase';
import Testimonials from '../components/Testimonials';
import BlogSection from '../components/BlogSection';
import SriLankaMap from '../components/SriLankaMap';
import DistributorCTA from '../components/DistributorCTA';
import Newsletter from '../components/Newsletter';
import { Helmet } from 'react-helmet-async';



const Home: React.FC = () => {
    return (
        <main>
            <Helmet>
                <title>Sunstar - Premium Sri Lankan Carbonated Beverages | Feel The Fizz</title>
                <meta name="description" content="Experience Sunstar - Sri Lanka's premium carbonated beverage brand. Available in Orange, Ginger, Cola, Cream Soda & Nesta flavors. Authentic taste, modern fizz. Find us island-wide." />
                <link rel="canonical" href="https://jannahmarketing.lk/" />

                {/* Open Graph */}
                <meta property="og:title" content="Sunstar - Premium Sri Lankan Carbonated Beverages" />
                <meta property="og:description" content="Experience Sunstar - Sri Lanka's premium carbonated beverage brand. Available in 5 refreshing flavors. Authentic taste, modern fizz." />
                <meta property="og:image" content="https://jannahmarketing.lk/og-sunstar-home.jpg" />
                <meta property="og:url" content="https://jannahmarketing.lk/" />
                <meta property="og:type" content="website" />
                <meta property="og:site_name" content="Sunstar" />

                {/* Twitter Card */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="Sunstar - Premium Sri Lankan Carbonated Beverages" />
                <meta name="twitter:description" content="Experience Sunstar - Sri Lanka's premium carbonated beverage brand. Available in 5 refreshing flavors." />
                <meta name="twitter:image" content="https://jannahmarketing.lk/og-sunstar-home.jpg" />
            </Helmet>
            <Hero />
            <Marquee />
            <Story />
            <Ingredients />
            <ProductShowcase />
            <Testimonials />
            <BlogSection />
            <SriLankaMap />
            <DistributorCTA />
            <Newsletter />
        </main>
    );
};

export default Home;
