import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Loader from './components/Loader';
import CartDrawer from './components/CartDrawer';
import { CartProvider } from './context/CartContext';

import AnimatedRoutes from './components/AnimatedRoutes';

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
                    <Navbar />
                    <CartDrawer />
                    <main className="grow relative">
                        <AnimatedRoutes />
                    </main>
                    <Footer />
                </div>
            </Router>
        </CartProvider>
    );
};

export default App;
