import React from 'react';
import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#050505] text-white py-20 border-t border-white/10">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-2">
            <h2 className="text-5xl font-black font-['Plus_Jakarta_Sans'] tracking-tighter mb-6 text-[#CCFF00]">SUNSTAR</h2>
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
              <li><a href="#" className="hover:text-[#CCFF00] transition-colors">Our Flavors</a></li>
              <li><a href="#" className="hover:text-[#CCFF00] transition-colors">The Lab</a></li>
              <li><a href="#" className="hover:text-[#CCFF00] transition-colors">Blog</a></li>
              <li><a href="#" className="hover:text-[#CCFF00] transition-colors">Careers</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-bold mb-6 font-['Plus_Jakarta_Sans'] uppercase tracking-wider">Contact</h4>
            <ul className="space-y-4 text-gray-400 font-['Inter']">
              <li>info@sunstarfizz.com</li>
              <li>+1 (555) 0123-4567</li>
              <li>123 Neon Way, Sector 7<br/>Cyber City, CA 90210</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/10 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-600 font-mono uppercase tracking-wider">
          <p>&copy; 2025 Sunstar Soft Drinks. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;