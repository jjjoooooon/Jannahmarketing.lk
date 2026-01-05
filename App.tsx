import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import SmoothScroll from './components/SmoothScroll';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Shop from './pages/Shop';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';

// ScrollToTop component to reset scroll on route change
const ScrollToTop = () => {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return null;
};

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
        <Router>
            <ScrollToTop />
            <SmoothScroll>
                <div className="bg-[#050505] min-h-screen selection:bg-[#CCFF00] selection:text-black flex flex-col">
                    <Navbar />
                    <main className="flex-grow">
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/about" element={<About />} />
                            <Route path="/contact" element={<Contact />} />
                            <Route path="/shop" element={<Shop />} />
                            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                            <Route path="/terms-of-service" element={<TermsOfService />} />
                        </Routes>
                    </main>
                    <Footer />
                </div>
            </SmoothScroll>
        </Router>
    );
};

export default App;
