import React, { memo } from 'react';
import { Facebook, Twitter, Instagram, Linkedin, LucideIcon, Mail, Phone, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import logo from '../assets/sunstar_logo.webp';

// --- Constants (Defined outside for performance) ---
const SOCIAL_LINKS = [
  { icon: Instagram, href: '#' },
  { icon: Twitter, href: '#' },
  { icon: Facebook, href: '#' },
  { icon: Linkedin, href: '#' },
];

const EXPLORE_LINKS = [
  { name: 'Our Flavors', path: '/shop' },
  { name: 'The Lab', path: '/about' },
  { name: 'Contact Us', path: '/contact' },
];

const CONTACT_INFO = [
  { icon: Mail, text: 'hello@jannahmarketing.lk', href: 'mailto:hello@jannahmarketing.lk' },
  { icon: Phone, text: '077 907 7134', href: 'tel:0779077134' },
  { icon: MapPin, text: 'B293 Boliverian Village, Sainthamaruthu', href: null },
];

const Footer: React.FC = () => {
  const scrollToTop = () => window.scrollTo(0, 0);

  return (
    <footer className="bg-[#050505] text-white py-12 md:py-20 border-t border-white/10 font-['Inter']">
      <div className="container mx-auto px-6">

        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-12 mb-16">

          {/* Brand Column */}
          <div className="col-span-1 md:col-span-2 flex flex-col items-center md:items-start text-center md:text-left">
            <div className="flex items-center gap-3 mb-6">
              <img
                src={logo}
                alt="Sunstar Logo"
                className="w-12 h-12 object-contain"
                loading="lazy"
              />
              <h2 className="text-5xl font-black font-['Plus_Jakarta_Sans'] tracking-tighter text-[#CCFF00]">
                SUNSTAR
              </h2>
            </div>
            <p className="text-gray-400 max-w-sm mb-8 font-light text-lg">
              Redefining refreshment for the digital age. Zero gravity flavor profiles crafted for the bold.
            </p>
            <div className="flex space-x-4">
              {SOCIAL_LINKS.map(({ icon: Icon, href }, i) => (
                <a
                  key={i}
                  href={href}
                  className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center hover:bg-[#CCFF00] hover:text-black hover:border-[#CCFF00] transition-all duration-300 group"
                  aria-label="Social Link"
                >
                  <Icon size={20} className="group-hover:scale-110 transition-transform" />
                </a>
              ))}
            </div>
          </div>

          {/* Explore Links */}
          <div className="text-center md:text-left">
            <h4 className="text-lg font-bold mb-6 font-['Plus_Jakarta_Sans'] uppercase tracking-wider">Explore</h4>
            <ul className="space-y-4 text-gray-400">
              {EXPLORE_LINKS.map((link) => (
                <li key={link.name}>
                  <Link to={link.path} className="hover:text-[#CCFF00] transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="text-center md:text-left">
            <h4 className="text-lg font-bold mb-6 font-['Plus_Jakarta_Sans'] uppercase tracking-wider">Contact</h4>
            <ul className="space-y-4 text-gray-400">
              {CONTACT_INFO.map((info, index) => {
                const IconComponent = info.icon;
                return (
                  <li key={index} className="flex items-start justify-center md:justify-start gap-3">
                    <IconComponent className="w-5 h-5 text-[#CCFF00] flex-shrink-0 mt-0.5" />
                    {info.href ? (
                      <a href={info.href} className="hover:text-[#CCFF00] transition-colors">
                        {info.text}
                      </a>
                    ) : (
                      <span>{info.text}</span>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        {/* Bottom Section - Optimized Alignment */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-600 font-mono uppercase tracking-wider">

          {/* Copyright & Developer Credits - Stacked nicely on mobile */}
          <div className="flex flex-col md:flex-row items-center text-center md:text-left gap-2 md:gap-4 mb-4 md:mb-0">
            <p>&copy; 2024 - 2026 Jannah Marketing (PVT) Ltd.</p>
            <span className="hidden md:block text-white/20">|</span>
            <p>
              Developed by{' '}
              <a
                href="https://inzeedo.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#CCFF00] transition-colors font-bold text-gray-500"
              >
                Inzeedo (PVT) Ltd
              </a>
            </p>
          </div>

          {/* Policy Links */}
          <div className="flex flex-wrap justify-center gap-4 md:gap-6">
            <Link to="/privacy-policy" onClick={scrollToTop} className="hover:text-[#CCFF00] transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms-of-service" onClick={scrollToTop} className="hover:text-[#CCFF00] transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default memo(Footer);