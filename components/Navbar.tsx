import React, { useState, useEffect } from 'react';
import { Menu, X, Droplets, ShoppingBag } from 'lucide-react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import logo from '../assets/sunstar_logo.png';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();
  const location = useLocation();

  // Smart Scroll Logic: Hide on scroll down, show on scroll up
  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() || 0;
    if (latest > previous && latest > 150 && !isOpen) {
      setHidden(true);
    } else {
      setHidden(false);
    }
    setScrolled(latest > 50);
  });

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const menuItems = [
    { name: 'Home', href: '/' },
    { name: 'Shop', href: '/shop' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <>
      <motion.nav
        variants={{
          visible: { y: 0 },
          hidden: { y: '-100%' },
        }}
        animate={hidden ? "hidden" : "visible"}
        transition={{ duration: 0.35, ease: "easeInOut" }}
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${scrolled || isOpen || location.pathname !== '/'
            ? 'bg-[#050505]/80 backdrop-blur-xl border-b border-white/10 py-3'
            : 'bg-transparent py-4 md:py-6'
          }`}
      >
        <div className="container mx-auto px-6 flex justify-between items-center relative z-50">

          {/* Logo Section */}
          <Link to="/">
            <motion.div
              className="flex items-center space-x-2 cursor-pointer group relative z-50"
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
              <span className="text-xl md:text-2xl font-black tracking-tighter text-white font-['Plus_Jakarta_Sans'] group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-[#CCFF00] transition-all">
                SUNSTAR
              </span>
            </motion.div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-12">
            {menuItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`relative text-sm uppercase tracking-widest font-bold transition-colors font-['Inter'] group ${location.pathname === item.href ? 'text-white' : 'text-gray-400 hover:text-white'
                  }`}
              >
                {item.name}
                <span className={`absolute -bottom-1 left-0 h-[2px] bg-[#CCFF00] transition-all duration-300 group-hover:w-full box-shadow-[0_0_10px_#CCFF00] ${location.pathname === item.href ? 'w-full' : 'w-0'
                  }`} />
              </Link>
            ))}
          </div>

          {/* CTA Button */}
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

          {/* Mobile Toggle */}
          <motion.button
            className="md:hidden text-white z-50 p-2 focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
            whileTap={{ scale: 0.9 }}
          >
            {isOpen ? <X size={28} className="text-[#CCFF00]" /> : <Menu size={28} />}
          </motion.button>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay - Moved outside nav to ensure full screen coverage */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, clipPath: "circle(0% at 100% 0%)" }}
            animate={{ opacity: 1, clipPath: "circle(150% at 100% 0%)" }}
            exit={{ opacity: 0, clipPath: "circle(0% at 100% 0%)" }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="fixed inset-0 bg-[#050505] z-40 flex flex-col items-center justify-center h-[100dvh] w-full"
          >
            {/* Background Decorations */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
              <div className="absolute top-1/4 -left-20 w-64 h-64 bg-[#CCFF00] rounded-full mix-blend-exclusion filter blur-[100px] opacity-20 animate-pulse" />
              <div className="absolute bottom-1/4 -right-20 w-64 h-64 bg-purple-500 rounded-full mix-blend-exclusion filter blur-[100px] opacity-20 animate-pulse" />
            </div>

            <motion.div
              className="flex flex-col items-center space-y-6 md:space-y-8 z-10 w-full px-6"
              initial="closed"
              animate="open"
              exit="closed"
              variants={{
                open: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
                closed: { transition: { staggerChildren: 0.05, staggerDirection: -1 } }
              }}
            >
              {menuItems.map((item) => (
                <motion.div
                  key={item.name}
                  variants={{
                    open: { y: 0, opacity: 1 },
                    closed: { y: 50, opacity: 0 }
                  }}
                  className="w-full text-center"
                >
                  <Link
                    to={item.href}
                    onClick={() => setIsOpen(false)}
                    className={`text-4xl md:text-5xl font-black transition-all duration-300 font-['Plus_Jakarta_Sans'] uppercase tracking-tight block py-2 ${location.pathname === item.href
                        ? 'text-[#CCFF00]'
                        : 'text-transparent stroke-text hover:text-[#CCFF00] hover:stroke-0'
                      }`}
                  >
                    {item.name}
                  </Link>
                </motion.div>
              ))}

              <motion.div
                variants={{ open: { y: 0, opacity: 1 }, closed: { y: 50, opacity: 0 } }}
                className="pt-8 w-full flex justify-center"
              >
                <Link to="/shop" onClick={() => setIsOpen(false)} className="w-full max-w-xs">
                  <button
                    className="px-10 py-4 rounded-full bg-[#CCFF00] text-black font-bold uppercase text-sm tracking-widest shadow-[0_0_30px_rgba(204,255,0,0.3)] hover:scale-105 transition-transform font-['Plus_Jakarta_Sans'] w-full"
                  >
                    Shop All Flavors
                  </button>
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .stroke-text {
          -webkit-text-stroke: 1px rgba(255, 255, 255, 0.5);
          color: transparent;
        }
      `}</style>
    </>
  );
};

export default Navbar;