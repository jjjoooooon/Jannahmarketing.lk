import React, { useState, useEffect, useRef, memo } from "react";
import { motion } from "framer-motion";
import {
  Menu,
  X,
  Users,
  ShoppingCart,
  Instagram,
  Twitter,
  Facebook,
} from "lucide-react";
import { useCart } from "../context/CartContext";
import { Link, useLocation } from "react-router-dom";
import logo from "../assets/sunstar_logo.webp";

// --- Constants ---
const MENU_ITEMS = [
  { name: "Home", href: "/" },
  { name: "Shop", href: "/shop" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
] as const;

const SOCIAL_LINKS = [Instagram, Twitter, Facebook];

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const prevScrollY = useRef(0);
  const location = useLocation();
  const { totalItems, setIsDrawerOpen } = useCart();

  // Scroll Logic
  useEffect(() => {
    const handleScroll = () => {
      const latest = window.scrollY;
      setScrolled(latest > 50);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Body Scroll Lock
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      document.body.style.touchAction = "none";
    } else {
      document.body.style.overflow = "unset";
      document.body.style.touchAction = "auto";
    }
    return () => {
      document.body.style.overflow = "unset";
      document.body.style.touchAction = "auto";
    };
  }, [isOpen]);

  // Route change closing
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const isSolid = scrolled || location.pathname !== "/";

  const navClasses = `
    fixed left-0 right-0 mx-auto w-full z-50 transition-all duration-500 will-change-transform translate-y-0 opacity-100
    ${
      isOpen
        ? "top-0 bg-brand-black/95 py-3 border-b border-white/10"
        : isSolid
          ? "top-0 lg:top-4 lg:w-[90%] lg:max-w-5xl bg-[#0a0a0a]/60 backdrop-blur-xl border-b lg:border border-white/10 py-2 lg:rounded-[2rem] shadow-[0_8px_32px_rgba(0,0,0,0.3)]"
          : "top-0 lg:top-6 lg:w-[92%] lg:max-w-6xl bg-transparent py-4 border-b border-transparent"
    }
  `;

  return (
    <>
      <nav className={navClasses}>
        <div className="px-6 lg:px-8 flex justify-between items-center relative z-50 w-full h-full">
          <Link
            to="/"
            aria-label="Home"
            className="z-50 block transition-transform active:scale-95 group"
          >
            <div className="flex items-center space-x-2">
              <div className="relative">
                <div className="absolute inset-0 bg-brand-lime blur-md opacity-20 rounded-full group-hover:opacity-40 transition-opacity" />
                <img
                  src={logo}
                  alt="Sunstar Logo"
                  className="w-8 h-8 md:w-9 md:h-9 relative z-10 object-contain"
                  loading="eager"
                  width="40"
                  height="40"
                />
              </div>
              <span className="text-lg md:text-xl font-black tracking-tighter text-white font-display">
                SUNSTAR
              </span>
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex flex-1 justify-center">
            <div className="flex items-center space-x-1 lg:space-x-2 bg-white/5 rounded-full px-2 py-1.5 border border-white/10 backdrop-blur-md">
              {MENU_ITEMS.map((item) => {
                const isActive = location.pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`relative px-4 py-2 text-[10px] uppercase tracking-[0.15em] font-bold rounded-full transition-colors duration-300 ${isActive ? "text-brand-lime" : "text-gray-400 hover:text-white"}`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="nav-active-pill"
                        className="absolute inset-0 bg-white/15 rounded-full shadow-inner border border-white/5"
                        transition={{ type: "spring", stiffness: 350, damping: 30 }}
                      />
                    )}
                    <span className="relative z-10">{item.name}</span>
                  </Link>
                );
              })}
            </div>
          </div>

          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={() => setIsDrawerOpen(true)}
              className="relative p-2.5 text-white bg-white/5 rounded-full border border-white/10 hover:bg-white/10 hover:text-brand-lime transition-colors group"
            >
              <ShoppingCart size={18} />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-brand-lime text-black text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center border border-brand-black">
                  {totalItems}
                </span>
              )}
            </button>
            <Link to="/contact">
              <button className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-brand-lime text-black font-bold text-[10px] uppercase tracking-[0.1em] font-display hover:bg-[#d4ff00] hover:shadow-[0_0_15px_rgba(204,255,0,0.3)] active:scale-95 transition-all">
                <span>Distributors</span>
                <Users size={14} />
              </button>
            </Link>
          </div>

          {/* Mobile UI */}
          <div className="flex md:hidden items-center gap-3">
            <button
              onClick={() => setIsDrawerOpen(true)}
              className="relative p-2 text-white bg-white/5 rounded-full border border-white/10 active:text-brand-lime transition-colors"
              aria-label="Open Cart"
            >
              <ShoppingCart size={18} />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-brand-lime text-black text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button>
            <button
              className="text-white bg-white/5 border border-white/10 rounded-full z-50 p-2 focus:outline-none relative touch-manipulation transition-colors"
              onClick={() => setIsOpen(!isOpen)}
              aria-label={isOpen ? "Close Menu" : "Open Menu"}
            >
              {isOpen ? (
                <X size={20} className="text-brand-lime" />
              ) : (
                <Menu size={20} />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 bg-brand-black z-40 flex flex-col h-dvh w-full origin-top overflow-hidden transform-gpu transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${isOpen ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"}`}
        style={{ pointerEvents: isOpen ? "auto" : "none" }}
      >
        <div
          className="absolute inset-0 z-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
        <div className="flex flex-col justify-between h-full w-full px-6 pt-24 pb-10 z-10 relative">
          <div className="flex flex-col space-y-2">
            {MENU_ITEMS.map((item, i) => (
              <Link
                key={item.name}
                to={item.href}
                className={`text-5xl font-black font-display uppercase tracking-tighter block py-2 transition-all duration-500 ${isOpen ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"} ${location.pathname === item.href ? "text-brand-lime" : "text-white/50 active:text-white"}`}
                style={{ transitionDelay: `${i * 50 + 200}ms` }}
              >
                {item.name}
              </Link>
            ))}
          </div>

          <div
            className={`border-t border-white/10 pt-8 transition-all duration-700 delay-400 ${isOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
          >
            <div className="flex flex-col space-y-6">
              <div className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/10">
                <div className="flex items-center gap-3">
                  <ShoppingCart size={20} className="text-brand-lime" />
                  <span className="text-white font-black uppercase tracking-widest text-[10px]">
                    My Cart
                  </span>
                </div>
                <button
                  onClick={() => {
                    setIsOpen(false);
                    setIsDrawerOpen(true);
                  }}
                  className="px-4 py-2 bg-brand-lime text-black text-[10px] font-black rounded-full uppercase tracking-widest leading-none"
                >
                  {totalItems} Items
                </button>
              </div>
              <Link to="/contact" className="w-full">
                <button className="w-full py-4 rounded-full bg-brand-lime text-black font-bold uppercase text-sm tracking-widest active:scale-[0.98] transition-transform flex items-center justify-center gap-2">
                  <span>Become a Distributor</span>
                  <Users size={18} />
                </button>
              </Link>
              <div className="flex justify-between items-end">
                <div className="text-white/40 text-[10px] font-black uppercase tracking-widest space-y-1 text-left leading-relaxed">
                  <p>hello@jannahmarketing.lk</p>
                  <p>+94 77 907 7134</p>
                </div>
                <div className="flex space-x-4">
                  {SOCIAL_LINKS.map((Icon, i) => (
                    <div
                      key={i}
                      className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/50 active:text-brand-lime transition-all active:scale-95"
                    >
                      <Icon size={18} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default memo(Navbar);
