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
                <title>Sunstar - Fueling the New Generation</title>
                <meta name="description" content="Experience the kinetic energy of Sunstar. Premium carbonated beverages with zero sugar and natural ingredients. Join the revolution." />
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
