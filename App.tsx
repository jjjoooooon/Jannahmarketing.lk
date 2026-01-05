import React, { useState, useEffect } from 'react';
import SmoothScroll from './components/SmoothScroll';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Marquee from './components/Marquee';
import Story from './components/Story';
import Ingredients from './components/Ingredients';
import ProductShowcase from './components/ProductShowcase';
import Testimonials from './components/Testimonials';
import BlogSection from './components/BlogSection';
import Distributors from './components/Distributors';
import Newsletter from './components/Newsletter';
import Footer from './components/Footer';

const App: React.FC = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate initial asset loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="fixed inset-0 bg-[#050505] flex items-center justify-center z-50">
        <div className="relative">
          <div className="w-16 h-16 rounded-full border-4 border-[#CCFF00]/30 border-t-[#CCFF00] animate-spin"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-2 h-2 bg-[#CCFF00] rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <SmoothScroll>
      <div className="bg-[#050505] min-h-screen selection:bg-[#CCFF00] selection:text-black">
        <Navbar />
        <main>
          <Hero />
          <Marquee />
          <Story />
          <Ingredients />
          <ProductShowcase />
          <Testimonials />
          <BlogSection />
          <Distributors />
          <Newsletter />
        </main>
        <Footer />
      </div>
    </SmoothScroll>
  );
};

export default App;