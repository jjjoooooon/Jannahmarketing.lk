import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Menu, X, Users, ShoppingCart, Instagram, Twitter, Facebook } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { motion, AnimatePresence, useScroll, useMotionValueEvent, Variants } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import logo from '../assets/sunstar_logo.webp';

// --- Constants ---
const MENU_ITEMS = [
  { name: 'Home', href: '/' },
  { name: 'Shop', href: '/shop' },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' },
] as const;

const SOCIAL_LINKS = [Instagram, Twitter, Facebook];

// --- Optimized Animation Variants ---
const NAV_VARIANTS: Variants = {
  visible: { y: 0 },
  hidden: { y: '-100%' },
};

const MENU_CONTAINER_VARIANTS: Variants = {
  initial: { scaleY: 0, transformOrigin: "top" },
  animate: {
    scaleY: 1,
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } // Slightly faster for mobile responsiveness
  },
  exit: {
    scaleY: 0,
    transition: { delay: 0.3, duration: 0.4, ease: [0.22, 1, 0.36, 1] }
  }
};

const LINK_CONTAINER_VARIANTS: Variants = {
  initial: { transition: { staggerChildren: 0.05, staggerDirection: -1 } },
  open: { transition: { delayChildren: 0.2, staggerChildren: 0.05 } }
};

const LINK_ITEM_VARIANTS: Variants = {
  initial: { y: 50, opacity: 0 },
  open: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.4, ease: "easeOut" }
  }
};

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const { scrollY } = useScroll();
  const location = useLocation();
  const { totalItems, setIsDrawerOpen } = useCart();

  // Optimized Scroll Logic
  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() || 0;

    // Logic for hiding navbar
    if (latest > previous && latest > 150 && !isOpen) {
      if (!hidden) setHidden(true);
    } else {
      if (hidden) setHidden(false);
    }

    // Logic for background style
    const isScrolled = latest > 50;
    if (scrolled !== isScrolled) setScrolled(isScrolled);
  });

  // Lock body scroll efficiently
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      // iOS specific fix to prevent rubber banding
      document.body.style.touchAction = 'none';
    } else {
      document.body.style.overflow = 'unset';
      document.body.style.touchAction = 'auto';
    }
    return () => {
      document.body.style.overflow = 'unset';
      document.body.style.touchAction = 'auto';
    };
  }, [isOpen]);

  // Handle route change closing
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  // Optimized Background Class: Removed backdrop-blur for mobile performance
  const navBackgroundClass = useMemo(() =>
    scrolled || isOpen || location.pathname !== '/'
      ? 'bg-brand-black/95 py-3 border-b border-white/5 shadow-lg'
      : 'bg-transparent py-4 md:py-6 border-b border-transparent',
    [scrolled, isOpen, location.pathname]);

  return (
    <>
      <motion.nav
        variants={NAV_VARIANTS}
        animate={hidden ? "hidden" : "visible"}
        transition={{ duration: 0.35, ease: "easeInOut" }}
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 will-change-transform ${navBackgroundClass}`}
        style={{ transform: 'translateZ(0)' }} // Hardware acceleration
      >
        <div className="container mx-auto px-6 flex justify-between items-center relative z-50">

          {/* --- Logo --- */}
          <Link to="/" aria-label="Home" className="z-50 block transition-transform active:scale-95 group">
            <div className="flex items-center space-x-2">
              <div className="relative">
                <div className="absolute inset-0 bg-brand-lime blur-md opacity-20 rounded-full" />
                <img
                  src={logo}
                  alt="Sunstar Logo"
                  className="w-8 h-8 md:w-10 md:h-10 relative z-10 object-contain"
                  loading="eager"
                  width="40"
                  height="40"
                />
              </div>
              <span className="text-xl md:text-2xl font-black tracking-tighter text-white font-display">
                SUNSTAR
              </span>
            </div>
          </Link>

          {/* --- Desktop Menu --- */}
          <div className="hidden md:flex items-center space-x-12">
            {MENU_ITEMS.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`relative text-sm uppercase tracking-widest font-bold transition-colors font-sans group ${location.pathname === item.href ? 'text-white' : 'text-gray-400 hover:text-white'
                  }`}
              >
                {item.name}
                <span className={`absolute -bottom-1 left-0 h-[2px] bg-brand-lime transition-all duration-300 group-hover:w-full box-shadow-[0_0_10px_#CCFF00] ${location.pathname === item.href ? 'w-full' : 'w-0'
                  }`} />
              </Link>
            ))}
          </div>

          {/* --- Desktop Actions --- */}
          <div className="hidden md:flex items-center gap-4">
            {/* Cart Icon */}
            <button
              onClick={() => setIsDrawerOpen(true)}
              className="relative p-2 text-white hover:text-brand-lime transition-colors group"
            >
              <ShoppingCart size={24} />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-brand-lime text-black text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center border-2 border-brand-black group-hover:scale-110 transition-transform">
                  {totalItems}
                </span>
              )}
            </button>

            <Link to="/contact">
              <button
                className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-brand-lime text-black font-bold text-xs uppercase tracking-widest font-display hover:bg-white hover:shadow-[0_0_20px_rgba(204,255,0,0.4)] active:scale-95 transition-all"
              >
                <span>Join 150+ Distributors</span>
                <Users size={16} />
              </button>
            </Link>
          </div>

          {/* --- Mobile Controls --- */}
          <div className="flex md:hidden items-center gap-4">
            {/* Mobile Cart Icon */}
            <button
              onClick={() => setIsDrawerOpen(true)}
              className="relative p-2 text-white active:text-brand-lime transition-colors"
              aria-label="Open Cart"
            >
              <ShoppingCart size={24} />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-brand-lime text-black text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center border-2 border-brand-black">
                  {totalItems}
                </span>
              )}
            </button>

            <button
              className="text-white z-50 p-2 focus:outline-none relative touch-manipulation"
              onClick={() => setIsOpen(!isOpen)}
              aria-label={isOpen ? "Close Menu" : "Open Menu"}
            >
              {isOpen ? <X size={28} className="text-brand-lime" /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* --- Optimized Mobile Menu Overlay --- */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="mobile-menu"
            variants={MENU_CONTAINER_VARIANTS}
            initial="initial"
            animate="animate"
            exit="exit"
            className="fixed inset-0 bg-brand-black z-40 flex flex-col h-dvh w-full origin-top overflow-hidden transform-gpu"
          >
            {/* Grid Background - Static & Optimized */}
            <div className="absolute inset-0 z-0 opacity-10 pointer-events-none"
              style={{
                backgroundImage: 'linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)',
                backgroundSize: '40px 40px',
                // Avoid complex blend modes on mobile
              }}
            />

            {/* Content Container */}
            <div className="flex flex-col justify-between h-full w-full px-6 pt-24 pb-10 z-10 relative">

              {/* Navigation Links */}
              <motion.div
                variants={LINK_CONTAINER_VARIANTS}
                initial="initial"
                animate="open"
                exit="initial"
                className="flex flex-col space-y-2"
              >
                {MENU_ITEMS.map((item) => (
                  <div key={item.name} className="overflow-hidden">
                    <motion.div variants={LINK_ITEM_VARIANTS}>
                      <Link
                        to={item.href}
                        className={`text-5xl font-black font-display uppercase tracking-tighter block py-2 transition-colors ${location.pathname === item.href
                          ? 'text-brand-lime'
                          : 'text-white/50 active:text-white' // "active" is better than "hover" for touch
                          }`}
                      >
                        {item.name}
                      </Link>
                    </motion.div>
                  </div>
                ))}
              </motion.div>

              {/* Mobile Footer Info */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.4 }} // Delayed slightly less for snappiness
                className="border-t border-white/10 pt-8"
              >
                <div className="flex flex-col space-y-6">
                  {/* Cart Mobile */}
                  <div className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/10">
                    <div className="flex items-center gap-3">
                      <ShoppingCart size={20} className="text-brand-lime" />
                      <span className="text-white font-bold uppercase tracking-widest text-xs">My Cart</span>
                    </div>
                    <button
                      onClick={() => {
                        setIsOpen(false);
                        setIsDrawerOpen(true);
                      }}
                      className="px-4 py-2 bg-brand-lime text-black text-xs font-black rounded-full uppercase tracking-widest"
                    >
                      {totalItems} Items
                    </button>
                  </div>

                  {/* Action Button */}
                  <Link to="/contact" className="w-full">
                    <button className="w-full py-4 rounded-full bg-brand-lime text-black font-bold uppercase text-sm tracking-widest active:scale-[0.98] transition-transform flex items-center justify-center gap-2">
                      <span>Become a Distributor</span>
                      <Users size={18} />
                    </button>
                  </Link>

                  {/* Contact & Socials */}
                  <div className="flex justify-between items-end">
                    <div className="text-white/40 text-xs font-sans uppercase tracking-widest space-y-1 text-left">
                      <p>hello@sunstar.com</p>
                      <p>+94 77 123 4567</p>
                    </div>

                    <div className="flex space-x-4">
                      {SOCIAL_LINKS.map((Icon, i) => (
                        <div key={i} className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/50 active:text-brand-lime active:border-brand-lime transition-colors">
                          <Icon size={18} />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default React.memo(Navbar);