import React from 'react';
import { DISTRIBUTORS } from '../constants';
import { MapPin } from 'lucide-react';

const Distributors: React.FC = () => {
  return (
    <section id="find-us" className="py-20 md:py-24 bg-[#0a0a0a] border-t border-white/5">
      <div className="container mx-auto px-6">
        <div className="text-center mb-10 md:mb-16">
          <h2 className="text-3xl md:text-5xl font-['Plus_Jakarta_Sans'] font-bold text-white mb-4 tracking-tight">FIND THE FIZZ NEAR YOU</h2>
          <p className="text-gray-400 max-w-xl mx-auto font-['Inter'] text-sm md:text-base">
            Sunstar is invading fridges across the island. Check our main distribution hubs or visit your local neon-lit convenience store.
          </p>
        </div>

        <div className="relative w-full h-[350px] md:h-[500px] bg-[#111] rounded-3xl overflow-hidden border border-white/10 shadow-2xl flex items-center justify-center">
          {/* Abstract Map Background */}
          <div className="absolute inset-0 opacity-20" style={{ 
            backgroundImage: 'radial-gradient(circle at center, #333 1px, transparent 1px)', 
            backgroundSize: '20px 20px' 
          }}></div>
          
          {/* Stylized Map SVG */}
           <svg viewBox="0 0 800 500" className="w-full h-full absolute inset-0 text-white/10">
              <path d="M150,400 Q300,350 400,250 T650,150" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="10 5" />
              <path d="M100,100 Q250,150 400,250 T700,400" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="10 5" />
           </svg>

          {/* Markers */}
          {DISTRIBUTORS.map((dist, idx) => (
            <div 
              key={dist.id}
              className="absolute flex flex-col items-center group cursor-pointer"
              style={{ 
                top: `${30 + idx * 20}%`, 
                left: `${20 + idx * 25}%` 
              }}
            >
              <div className="relative">
                <div className="absolute -inset-4 bg-[#00F5D4] rounded-full blur-xl opacity-20 group-hover:opacity-60 transition-opacity"></div>
                <div className="w-8 h-8 md:w-10 md:h-10 bg-[#00F5D4] rounded-full flex items-center justify-center text-black z-10 relative shadow-[0_0_15px_#00F5D4]">
                  <MapPin size={16} className="md:w-5 md:h-5" />
                </div>
              </div>
              <div className="mt-4 bg-black/80 backdrop-blur px-3 py-1.5 md:px-4 md:py-2 rounded border border-white/20 opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0 text-center z-20 absolute top-full w-32 -ml-12 pointer-events-none group-hover:pointer-events-auto">
                <p className="font-bold text-white font-['Plus_Jakarta_Sans'] text-xs md:text-sm">{dist.name}</p>
                <p className="text-[10px] md:text-xs text-gray-400 font-['Inter']">{dist.address}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Distributors;