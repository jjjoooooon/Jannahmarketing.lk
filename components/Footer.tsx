import React from 'react';
import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import { Link } from 'react-router-dom';
import logo from '../assets/sunstar_logo.png';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#050505] text-white py-20 border-t border-white/10">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <img src={logo} alt="Sunstar Logo" className="w-12 h-12 object-contain" />
              <h2 className="text-5xl font-black font-['Plus_Jakarta_Sans'] tracking-tighter text-[#CCFF00]">SUNSTAR</h2>
            </div>
            <p className="text-gray-400 max-w-sm mb-8 font-light text-lg font-['Inter']">
              Redefining refreshment for the digital age. Zero gravity flavor profiles crafted for the bold.
            </p>
            <div className="flex space-x-4">
              {[Instagram, Twitter, Facebook, Linkedin].map((Icon, i) => (
                <a key={i} href="#" className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center hover:bg-[#CCFF00] hover:text-black hover:border-[#CCFF00] transition-all duration-300 group">
                  <Icon size={20} className="group-hover:scale-110 transition-transform" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-6 font-['Plus_Jakarta_Sans'] uppercase tracking-wider">Explore</h4>
            <ul className="space-y-4 text-gray-400 font-['Inter']">
              <li><Link to="/shop" className="hover:text-[#CCFF00] transition-colors">Our Flavors</Link></li>
              <li><Link to="/about" className="hover:text-[#CCFF00] transition-colors">The Lab</Link></li>
              <li><Link to="/" className="hover:text-[#CCFF00] transition-colors">News & Resources</Link></li>
              <li><Link to="/contact" className="hover:text-[#CCFF00] transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-6 font-['Plus_Jakarta_Sans'] uppercase tracking-wider">Contact</h4>
            <ul className="space-y-4 text-gray-400 font-['Inter']">
              <li>hello@jannahmarketing.lk</li>
              <li>077 907 7134 / 075 438 5840</li>
              <li>300,B Boliverian Village<br />Sainthamaruthu</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-600 font-mono uppercase tracking-wider">
          <p>&copy; 2026 Sunstar Soft Drinks. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link to="/" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;