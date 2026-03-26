import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Loader from './components/Loader';
import CartDrawer from './components/CartDrawer';
import { CartProvider } from './context/CartContext';

// Lazy load pages for performance
const Home = React.lazy(() => import('./pages/Home'));
const About = React.lazy(() => import('./pages/About'));
const Contact = React.lazy(() => import('./pages/Contact'));
const Shop = React.lazy(() => import('./pages/Shop'));
const Checkout = React.lazy(() => import('./pages/Checkout'));
const PrivacyPolicy = React.lazy(() => import('./pages/PrivacyPolicy'));
const TermsOfService = React.lazy(() => import('./pages/TermsOfService'));

// ScrollToTop component to reset scroll on route change
const ScrollToTop = () => {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return null;
};

const App: React.FC = () => {
    return (
        <CartProvider>
            <Router>
                <ScrollToTop />
                <div className="bg-brand-black min-h-screen selection:bg-brand-lime selection:text-black flex flex-col overflow-x-hidden">
                    <React.Suspense fallback={<Loader />}>
                        <Navbar />
                        <CartDrawer />
                        <main className="grow">
                            <Routes>
                                <Route path="/" element={<Home />} />
                                <Route path="/about" element={<About />} />
                                <Route path="/contact" element={<Contact />} />
                                <Route path="/shop" element={<Shop />} />
                                <Route path="/checkout" element={<Checkout />} />
                                <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                                <Route path="/terms-of-service" element={<TermsOfService />} />
                            </Routes>
                        </main>
                        <Footer />
                    </React.Suspense>
                </div>
            </Router>
        </CartProvider>
    );
};

export default App;
