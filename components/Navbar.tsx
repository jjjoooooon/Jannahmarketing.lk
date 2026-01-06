import React, { useState, useEffect, useMemo } from 'react';
import { Menu, X, ShoppingBag, Instagram, Twitter, Facebook } from 'lucide-react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent, Variants } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import logo from '../assets/sunstar_logo.png';

// --- Constants ---
const MENU_ITEMS = [
  { name: 'Home', href: '/' },
  { name: 'Shop', href: '/shop' },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' },
] as const;

const SOCIAL_LINKS = [Instagram, Twitter, Facebook];

// --- Animation Variants ---
const NAV_VARIANTS: Variants = {
  visible: { y: 0 },
  hidden: { y: '-100%' },
};

// "Curtain" Effect: Smoother and more "premium" than simple opacity
const MENU_CONTAINER_VARIANTS: Variants = {
  initial: { scaleY: 0, transformOrigin: "top" },
  animate: {
    scaleY: 1,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
  },
  exit: {
    scaleY: 0,
    transition: { delay: 0.5, duration: 0.5, ease: [0.22, 1, 0.36, 1] }
  }
};

const LINK_CONTAINER_VARIANTS: Variants = {
  initial: { transition: { staggerChildren: 0.09, staggerDirection: -1 } },
  open: { transition: { delayChildren: 0.4, staggerChildren: 0.09 } }
};

const LINK_ITEM_VARIANTS: Variants = {
  initial: { y: "30vh", transition: { duration: 0.5, ease: [0.37, 0, 0.63, 1] } },
  open: { y: 0, transition: { duration: 0.7, ease: [0, 0.55, 0.45, 1] } }
};

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const { scrollY } = useScroll();
  const location = useLocation();

  // Scroll Logic
  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() || 0;
    if (latest > previous && latest > 150 && !isOpen) {
      if (!hidden) setHidden(true);
    } else {
      if (hidden) setHidden(false);
    }
    const isScrolled = latest > 50;
    if (scrolled !== isScrolled) setScrolled(isScrolled);
  });

  // Body Scroll Lock
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  const navBackgroundClass = useMemo(() =>
    scrolled || isOpen || location.pathname !== '/'
      ? 'bg-[#050505]/80 backdrop-blur-xl py-3 border-b border-white/5'
      : 'bg-transparent py-4 md:py-6 border-b border-transparent',
    [scrolled, isOpen, location.pathname]);

  return (
    <>
      <motion.nav
        variants={NAV_VARIANTS}
        animate={hidden ? "hidden" : "visible"}
        transition={{ duration: 0.35, ease: "easeInOut" }}
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 will-change-transform ${navBackgroundClass}`}
      >
        <div className="container mx-auto px-6 flex justify-between items-center relative z-50">

          {/* --- Logo --- */}
          <Link to="/" aria-label="Home" className="z-50">
            <motion.div
              className="flex items-center space-x-2 cursor-pointer group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="relative">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
                  className="absolute inset-0 bg-[#CCFF00] blur-lg opacity-20 rounded-full"
                />
                <img src={logo} alt="Sunstar Logo" className="w-8 h-8 md:w-10 md:h-10 relative z-10 object-contain" />
              </div>
              <span className="text-xl md:text-2xl font-black tracking-tighter text-white font-['Plus_Jakarta_Sans']">
                SUNSTAR
              </span>
            </motion.div>
          </Link>

          {/* --- Desktop Menu --- */}
          <div className="hidden md:flex items-center space-x-12">
            {MENU_ITEMS.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`relative text-sm uppercase tracking-widest font-bold transition-colors font-['Inter'] group ${location.pathname === item.href ? 'text-white' : 'text-gray-400 hover:text-white'}`}
              >
                {item.name}
                <span className={`absolute -bottom-1 left-0 h-[2px] bg-[#CCFF00] transition-all duration-300 group-hover:w-full box-shadow-[0_0_10px_#CCFF00] ${location.pathname === item.href ? 'w-full' : 'w-0'}`} />
              </Link>
            ))}
          </div>

          {/* --- Desktop Actions --- */}
          <div className="hidden md:flex items-center">
            <Link to="/shop">
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(204, 255, 0, 0.4)" }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#CCFF00] text-black font-bold text-xs uppercase tracking-widest font-['Plus_Jakarta_Sans'] hover:bg-white transition-colors"
              >
                <span>Shop</span>
                <ShoppingBag size={16} />
              </motion.button>
            </Link>
          </div>

          {/* --- Mobile Toggle --- */}
          <motion.button
            className="md:hidden text-white z-50 p-2 focus:outline-none relative"
            onClick={() => setIsOpen(!isOpen)}
            whileTap={{ scale: 0.9 }}
          >
            {isOpen ? <X size={28} className="text-[#CCFF00]" /> : <Menu size={28} />}
          </motion.button>
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
            className="fixed inset-0 bg-[#050505] z-40 flex flex-col h-[100dvh] w-full origin-top overflow-hidden"
          >
            {/* Grid Background Pattern */}
            <div className="absolute inset-0 z-0 opacity-10 pointer-events-none"
              style={{ backgroundImage: 'linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)', backgroundSize: '40px 40px' }}
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
                        onClick={() => setIsOpen(false)}
                        className={`text-5xl font-black font-['Plus_Jakarta_Sans'] uppercase tracking-tighter block py-2 transition-colors ${location.pathname === item.href
                          ? 'text-[#CCFF00]'
                          : 'text-white/50 hover:text-white'
                          }`}
                      >
                        {item.name}
                      </Link>
                    </motion.div>
                  </div>
                ))}
              </motion.div>

              {/* Mobile Footer Info (New Addition) */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.5 }}
                className="border-t border-white/10 pt-8"
              >
                <div className="flex flex-col space-y-6">
                  {/* Action Button */}
                  <Link to="/shop" onClick={() => setIsOpen(false)} className="w-full">
                    <button className="w-full py-4 rounded-full bg-[#CCFF00] text-black font-bold uppercase text-sm tracking-widest shadow-[0_0_20px_rgba(204,255,0,0.2)]">
                      Shop Now
                    </button>
                  </Link>

                  {/* Contact & Socials */}
                  <div className="flex justify-between items-end">
                    <div className="text-white/40 text-xs font-['Inter'] uppercase tracking-widest space-y-1">
                      <p>hello@sunstar.com</p>
                      <p>+94 77 123 4567</p>
                    </div>

                    <div className="flex space-x-4">
                      {SOCIAL_LINKS.map((Icon, i) => (
                        <div key={i} className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/50 hover:text-[#CCFF00] hover:border-[#CCFF00] transition-colors">
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

export default Navbar;