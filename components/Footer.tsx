import React, { memo } from 'react';
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

// --- Constants ---
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
    <footer className="bg-brand-black text-white pt-24 pb-12 border-t border-white/5 overflow-hidden relative">
      {/* Subtle Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      
      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-16 mb-24">
          
          {/* Brand Column */}
          <div className="col-span-1 md:col-span-5 flex flex-col items-center md:items-start text-center md:text-left">
            <div className="flex items-center gap-4 mb-8">
              <img
                src="/Sunstar Logo.png"
                alt="Sunstar Logo"
                className="w-28 h-28 object-contain transition-all duration-500"
                loading="lazy"
              />
              <div className="flex flex-col">
                <h2 className="text-xl font-bold font-sans tracking-[0.2em] uppercase text-white/90 leading-none mb-1">
                  SUNSTAR
                </h2>
                <span className="font-grace text-xl text-white/50">by Jannah Marketing</span>
              </div>
            </div>
            
            <p className="text-white/40 max-w-sm mb-10 font-mplus font-light text-base leading-relaxed">
              Redefining refreshment for the modern era. Premium flavor profiles formulated for the bold, distributed nation-wide.
            </p>
            
            <div className="flex space-x-4">
              {SOCIAL_LINKS.map(({ icon: Icon, href }, i) => (
                <a
                  key={i}
                  href={href}
                  className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:bg-white hover:text-black hover:border-white transition-all duration-300 group"
                  aria-label="Social Link"
                >
                  <Icon size={16} className="group-hover:scale-110 transition-transform" />
                </a>
              ))}
            </div>
          </div>

          {/* Spacer */}
          <div className="hidden md:block md:col-span-1"></div>

          {/* Explore Links */}
          <div className="col-span-1 md:col-span-2 text-center md:text-left">
            <h4 className="text-[10px] uppercase tracking-[0.2em] font-bold font-sans text-white/30 mb-8 whitespace-nowrap">Corporate Links</h4>
            <ul className="space-y-4">
              {EXPLORE_LINKS.map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.path} 
                    className="text-white/50 font-mplus font-light text-sm hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Spacer */}
          <div className="hidden md:block md:col-span-1"></div>

          {/* Contact Info */}
          <div className="col-span-1 md:col-span-3 text-center md:text-left">
            <h4 className="text-[10px] uppercase tracking-[0.2em] font-bold font-sans text-white/30 mb-8 whitespace-nowrap">Direct Contact</h4>
            <ul className="space-y-5">
              {CONTACT_INFO.map((info, index) => {
                const IconComponent = info.icon;
                return (
                  <li key={index} className="flex flex-col md:flex-row items-center md:items-start justify-center md:justify-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-white/[0.03] border border-white/5 flex items-center justify-center shrink-0">
                      <IconComponent className="w-3.5 h-3.5 text-white/40" />
                    </div>
                    <div className="mt-1.5 flex-1">
                      {info.href ? (
                        <a href={info.href} className="text-white/50 font-sans font-light text-sm hover:text-white transition-colors break-all">
                          {info.text}
                        </a>
                      ) : (
                        <span className="text-white/50 font-sans font-light text-sm leading-relaxed block">{info.text}</span>
                      )}
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          
          {/* Copyright */}
          <div className="flex flex-col md:flex-row items-center text-center md:text-left gap-2 md:gap-4">
            <p className="text-[10px] uppercase tracking-[0.1em] font-bold font-sans text-white/30">
              &copy; {new Date().getFullYear()} Jannah Marketing (PVT) Ltd. All rights reserved.
            </p>
          </div>

          {/* Development Credit */}
          <div className="text-[10px] uppercase tracking-[0.1em] font-bold font-sans text-white/30">
            Engineered by <a href="https://inzeedo.com" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-white transition-colors">Inzeedo</a>
          </div>

          {/* Policy Links */}
          <div className="flex items-center gap-6">
            <Link to="/privacy-policy" onClick={scrollToTop} className="text-[10px] uppercase tracking-[0.1em] font-bold font-sans text-white/30 hover:text-white transition-colors">
              Privacy
            </Link>
            <span className="w-1 h-1 rounded-full bg-white/10" />
            <Link to="/terms-of-service" onClick={scrollToTop} className="text-[10px] uppercase tracking-[0.1em] font-bold font-sans text-white/30 hover:text-white transition-colors">
              Terms
            </Link>
          </div>

        </div>
      </div>
    </footer>
  );
};

export default memo(Footer);