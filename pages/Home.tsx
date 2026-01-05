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

const Home: React.FC = () => {
    return (
        <main>
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
