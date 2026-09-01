import React, { Suspense } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Loader from './Loader';

// Lazy load pages for performance
const Home = React.lazy(() => import('../pages/Home'));
const About = React.lazy(() => import('../pages/About'));
const Contact = React.lazy(() => import('../pages/Contact'));
const Shop = React.lazy(() => import('../pages/Shop'));
const Checkout = React.lazy(() => import('../pages/Checkout'));
const PrivacyPolicy = React.lazy(() => import('../pages/PrivacyPolicy'));
const TermsOfService = React.lazy(() => import('../pages/TermsOfService'));

const pageVariants = {
  initial: { opacity: 0, y: 15, scale: 0.99 },
  in: { opacity: 1, y: 0, scale: 1 },
  out: { opacity: 0, y: -15, scale: 0.99 }
};

const springTransition = {
  type: "spring",
  stiffness: 120,
  damping: 20,
  mass: 1,
};

const AnimatedPage = ({ children }: { children: React.ReactNode }) => (
    <motion.div 
        initial="initial" 
        animate="in" 
        exit="out" 
        variants={pageVariants} 
        transition={springTransition} 
        className="w-full h-full"
    >
        <Suspense fallback={<Loader />}>
            {children}
        </Suspense>
    </motion.div>
);

const AnimatedRoutes: React.FC = () => {
    const location = useLocation();

    return (
        <AnimatePresence mode="wait">
            {/* @ts-expect-error React Router types incorrectly exclude key sometimes */}
            <Routes location={location} key={location.pathname}>
                <Route path="/" element={<AnimatedPage><Home /></AnimatedPage>} />
                <Route path="/about" element={<AnimatedPage><About /></AnimatedPage>} />
                <Route path="/contact" element={<AnimatedPage><Contact /></AnimatedPage>} />
                <Route path="/shop" element={<AnimatedPage><Shop /></AnimatedPage>} />
                <Route path="/checkout" element={<AnimatedPage><Checkout /></AnimatedPage>} />
                <Route path="/privacy-policy" element={<AnimatedPage><PrivacyPolicy /></AnimatedPage>} />
                <Route path="/terms-of-service" element={<AnimatedPage><TermsOfService /></AnimatedPage>} />
            </Routes>
        </AnimatePresence>
    );
};

export default AnimatedRoutes;
