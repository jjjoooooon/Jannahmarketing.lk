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
        ? "top-0 bg-[#000000]/90 backdrop-blur-xl border-b border-white/5 py-4 shadow-[0_8px_32px_rgba(0,0,0,0.5)]"
        : "top-0 bg-transparent py-5 border-b border-transparent"
    }
  `;

  return (
    <>
      <nav className={navClasses}>
        <div className="px-6 lg:px-12 flex justify-between items-center relative z-50 w-full h-full max-w-[1920px] mx-auto">
          {/* Logo Area */}
          <Link
            to="/"
            aria-label="Home"
            className="z-50 block transition-transform active:scale-95 group"
          >
            <div className="flex items-center">
              <div className="relative">
                <div className="absolute inset-0 bg-white blur-md opacity-0 group-hover:opacity-10 transition-opacity rounded-full" />
                <img
                  src="/jannah_logo_hq_transparent.png"
                  alt="Jannah Marketing Logo"
                  className="w-12 h-12 md:w-14 md:h-14 relative z-10 object-contain rounded-full bg-white border-2 border-transparent p-1"
                  loading="eager"
                  width="56"
                  height="56"
                />
              </div>
            </div>
          </Link>

          {/* Desktop Menu - Central Pill */}
          <div className="hidden md:flex flex-1 justify-center">
            <div className="flex items-center space-x-12 bg-[#101010] rounded-[2rem] px-10 py-3.5 border border-white/5 shadow-2xl">
              {MENU_ITEMS.map((item) => {
                const isActive = location.pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`relative text-[11px] uppercase tracking-[0.15em] font-black font-['Plus_Jakarta_Sans'] transition-all duration-300 ${
                      isActive 
                        ? "text-[#D4FF00] drop-shadow-[0_0_12px_rgba(212,255,0,0.3)]" 
                        : "text-white/30 hover:text-white/60"
                    }`}
                  >
                    <span className="relative z-10">{item.name}</span>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Right Action Icons & Button */}
          <div className="hidden md:flex items-center gap-4">
            <button
              onClick={() => setIsDrawerOpen(true)}
              className="relative w-11 h-11 rounded-full flex items-center justify-center bg-transparent border border-white/20 text-white/70 hover:bg-white/10 hover:border-white/40 hover:text-white transition-all group"
            >
              <ShoppingCart size={18} />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-white text-black text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center border border-brand-black">
                  {totalItems}
                </span>
              )}
            </button>
            <Link to="/contact">
              <button className="flex items-center gap-3 px-6 py-3 bg-transparent text-white border border-white/80 hover:bg-white hover:text-black font-black text-[11px] uppercase tracking-[0.2em] transition-all duration-300">
                <span>Distributors</span>
                <Users size={16} className={isSolid ? "opacity-100" : "opacity-80"} />
              </button>
            </Link>
          </div>

          {/* Mobile UI */}
          <div className="flex md:hidden items-center gap-3">
            <button
              onClick={() => setIsDrawerOpen(true)}
              className="relative p-2.5 text-white/70 bg-transparent border border-white/20 hover:bg-white/10 hover:text-white transition-colors"
              aria-label="Open Cart"
            >
              <ShoppingCart size={18} />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-white text-black text-[9px] font-bold w-4 h-4 flex items-center justify-center border border-brand-black">
                  {totalItems}
                </span>
              )}
            </button>
            <button
              className="text-white/70 bg-transparent border border-white/20 p-2.5 focus:outline-none relative touch-manipulation hover:bg-white/10 hover:text-white transition-colors"
              onClick={() => setIsOpen(!isOpen)}
              aria-label={isOpen ? "Close Menu" : "Open Menu"}
            >
              {isOpen ? (
                <X size={18} className="text-white" />
              ) : (
                <Menu size={18} />
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
                className={`text-5xl font-normal font-grace uppercase tracking-[0.1em] block py-2 transition-all duration-500 ${isOpen ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"} ${location.pathname === item.href ? "text-white" : "text-white/30 active:text-white"}`}
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
                  <ShoppingCart size={20} className="text-white/70" />
                  <span className="text-white/70 font-bold uppercase tracking-widest text-[10px]">
                    My Cart
                  </span>
                </div>
                <button
                  onClick={() => {
                    setIsOpen(false);
                    setIsDrawerOpen(true);
                  }}
                  className="px-4 py-2 bg-transparent border border-white/20 text-white/70 text-[10px] font-bold rounded-sm uppercase tracking-widest leading-none"
                >
                  {totalItems} Items
                </button>
              </div>
              <Link to="/contact" className="w-full">
                <button className="w-full py-4 bg-[#6F9578] text-white hover:bg-[#597860] font-bold uppercase text-[11px] tracking-[0.2em] transition-all duration-300 flex items-center justify-center gap-2">
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
                      className="w-10 h-10 border border-white/10 flex items-center justify-center text-white/50 active:bg-white/10 active:text-white transition-all active:scale-95"
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
