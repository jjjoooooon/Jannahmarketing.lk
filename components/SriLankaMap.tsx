import React, { useState, memo, useRef } from 'react';
import { MapPin, Navigation, Store, Package, X } from 'lucide-react';
import SriLanka from '@svg-maps/sri-lanka';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

// Location Data
const LOCATIONS = [
  {
    id: 'sainthamaruthu',
    name: 'Sainthamaruthu',
    district: 'Ampara',
    x: 82,
    y: 68,
    type: 'Corporate Headquarters',
    address: 'Jannah Marketing (Pvt) Ltd, Sainthamaruthu',
    stock: 'High',
    flavors: ['Orange', 'Cola', 'Ginger', 'Nesta', 'Cream Soda'],
    shops: 'Expanding'
  },
  {
    id: 'kandy',
    name: 'Kandy',
    district: 'Kandy',
    x: 48,
    y: 65,
    type: 'Distribution Hub',
    address: 'Kandy City Centre',
    stock: 'Medium',
    flavors: ['Orange', 'Ginger', 'Cream Soda'],
    shops: 5
  },
  {
    id: 'galle',
    name: 'Galle',
    district: 'Galle',
    x: 30,
    y: 93,
    type: 'Retail Partner',
    address: 'Galle Fort Precinct',
    stock: 'High',
    flavors: ['Nesta', 'Orange', 'Cola'],
    shops: 3
  },
  {
    id: 'katankudy',
    name: 'Katankudy',
    district: 'Batticaloa',
    x: 75,
    y: 52,
    type: 'Distribution Hub',
    address: 'Hospital Road, Jaffna',
    stock: 'Low',
    flavors: ['Orange', 'Cola', 'Ginger', 'Nesta', 'Cream Soda'],
    shops: 9
  },
  {
    id: 'trinco',
    name: 'Trincomalee',
    district: 'Trincomalee',
    x: 68,
    y: 38,
    type: 'Retail Partner',
    address: 'Uppuveli, Trincomalee',
    stock: 'Medium',
    flavors: ['Nesta', 'Orange'],
    shops: 8
  },
];

const SriLankaMap: React.FC = () => {
  const [activeLocation, setActiveLocation] = useState<typeof LOCATIONS[0] | null>(null);
  const [hoveredLocation, setHoveredLocation] = useState<string | null>(null);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Cinematic Header Reveal
    gsap.fromTo(headerRef.current,
      { opacity: 0, y: 40, filter: 'blur(10px)' },
      {
        opacity: 1, 
        y: 0, 
        filter: 'blur(0px)',
        duration: 1.5, 
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
        }
      }
    );

    // Staggered reveal for map and panel
    gsap.fromTo(contentRef.current?.children ? Array.from(contentRef.current.children) : [],
      { opacity: 0, scale: 0.95 },
      {
        opacity: 1,
        scale: 1,
        duration: 1.5,
        stagger: 0.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 65%",
        }
      }
    );
  }, { scope: containerRef });

  const handleLocationClick = (districtId: string, districtName: string) => {
    const location = LOCATIONS.find(l =>
      l.district.toLowerCase() === districtName?.toLowerCase() ||
      l.district.toLowerCase() === districtId?.toLowerCase()
    );
    if (location) setActiveLocation(location);
  };

  return (
    <section ref={containerRef} className="py-24 md:py-40 bg-brand-black relative overflow-hidden border-t border-white/5">
      {/* Subtle Background Elements */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[length:40px_40px]" />
      </div>
      
      {/* Decorative Glows */}
      <div className="absolute top-0 right-0 w-[40rem] h-[40rem] bg-white/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        
        {/* Header Section */}
        <div ref={headerRef} className="text-center mb-16 md:mb-24 flex flex-col items-center">
          <div className="inline-flex items-center gap-2 mb-6">
            <span className="w-8 h-[1px] bg-white/30" />
            <span className="text-white/50 uppercase tracking-[0.3em] text-xs font-bold font-sans">National Presence</span>
            <span className="w-8 h-[1px] bg-white/30" />
          </div>

          <h2 className="text-5xl md:text-7xl font-light font-sans text-white mb-6 leading-tight tracking-tight">
            Island-wide <span className="font-grace text-6xl md:text-8xl block mt-2 text-white/90">Network.</span>
          </h2>
          
          <p className="text-white/50 max-w-2xl mx-auto text-lg md:text-xl font-light font-mplus leading-relaxed">
            From our corporate headquarters in Sainthamaruthu, our distribution logistics spanning every province ensure Jannah Marketing's premium beverages are always within reach.
          </p>
        </div>

        {/* Content Layout */}
        <div ref={contentRef} className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Map Container (Left) */}
          <div className="lg:col-span-7 relative w-full aspect-square md:aspect-auto md:h-[600px] overflow-hidden p-8 flex items-center justify-center bg-white/[0.02] border border-white/5 rounded-3xl group">
            
            {/* Subtle internal glow behind map */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03)_0%,transparent_70%)] pointer-events-none" />

            <div className="relative w-full h-full max-w-[400px]">
              <svg viewBox={SriLanka.viewBox} className="w-full h-full drop-shadow-2xl" role="img" aria-label={SriLanka.label}>
                {SriLanka.locations.map((location: any) => (
                  <path
                    key={location.id}
                    id={location.id}
                    name={location.name}
                    d={location.path}
                    className="fill-[#111] stroke-white/10 stroke-[0.5px] transition-all duration-500 hover:fill-white/10 focus:outline-none cursor-pointer"
                    onClick={() => handleLocationClick(location.id, location.name)}
                    onMouseEnter={() => setHoveredLocation(location.name)}
                    onMouseLeave={() => setHoveredLocation(null)}
                  />
                ))}
              </svg>

              {/* Pins Overlay */}
              {LOCATIONS.map((loc) => (
                <button
                  key={loc.id}
                  className="absolute z-10 transition-transform duration-500 hover:scale-125 group/pin"
                  style={{ left: `${loc.x}%`, top: `${loc.y}%` }}
                  onClick={() => setActiveLocation(loc)}
                >
                  <div className="relative -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
                    <div className={`absolute rounded-full blur-md transition-all duration-700 ${activeLocation?.id === loc.id ? 'bg-white opacity-40 w-12 h-12' : 'bg-white opacity-10 w-6 h-6'}`} />
                    <div className={`relative rounded-full border border-white/20 backdrop-blur-md transition-all duration-500 flex items-center justify-center ${activeLocation?.id === loc.id ? 'bg-white text-black w-4 h-4' : 'bg-white/10 text-white w-3 h-3 group-hover/pin:bg-white group-hover/pin:text-black group-hover/pin:w-4 group-hover/pin:h-4'}`} />
                    
                    {/* Floating Label */}
                    <div className={`absolute top-full left-1/2 -translate-x-1/2 mt-3 px-3 py-1.5 bg-black/80 backdrop-blur-xl border border-white/10 rounded-full text-[9px] font-bold font-sans uppercase tracking-[0.2em] text-white whitespace-nowrap transition-all duration-500 pointer-events-none ${activeLocation?.id === loc.id ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 group-hover/pin:opacity-100 group-hover/pin:translate-y-0'}`}>
                      {loc.name}
                    </div>
                  </div>
                </button>
              ))}
            </div>

            {/* Hover Tooltip - District Name */}
            <div
              className={`absolute bottom-8 left-1/2 -translate-x-1/2 bg-black/80 backdrop-blur-xl border border-white/10 px-6 py-2 rounded-full text-white font-bold font-sans text-[10px] uppercase tracking-[0.3em] pointer-events-none z-20 whitespace-nowrap transition-all duration-500 ${hoveredLocation ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
            >
              {hoveredLocation}
            </div>
          </div>

          {/* Info Panel (Right) */}
          <div className="lg:col-span-5 relative h-full min-h-[500px]">
            
            {/* Empty State */}
            <div className={`absolute inset-0 flex flex-col items-center justify-center text-center p-8 md:p-12 border border-white/5 rounded-3xl bg-white/[0.01] transition-all duration-700 ${activeLocation ? 'opacity-0 pointer-events-none scale-95' : 'opacity-100 scale-100'}`}>
              <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-6">
                <Navigation className="w-6 h-6 text-white/40" />
              </div>
              <h3 className="text-2xl font-light text-white mb-3 font-sans tracking-tight">Select a Location</h3>
              <p className="text-white/40 font-mplus font-light text-base leading-relaxed">
                Click on any highlighted marker on the map to view real-time distribution details and stock availability across our network.
              </p>
            </div>

            {/* Active Panel */}
            {LOCATIONS.map(loc => (
              <div
                key={loc.id}
                className={`absolute inset-0 bg-[#0a0a0a] rounded-3xl p-8 md:p-10 border border-white/10 flex flex-col justify-center transition-all duration-700 will-change-transform ${activeLocation?.id === loc.id ? 'opacity-100 translate-x-0 z-10' : 'opacity-0 translate-x-12 pointer-events-none'}`}
              >
                {/* Close Button */}
                <div className="absolute top-6 right-6">
                  <button onClick={() => setActiveLocation(null)} className="p-3 hover:bg-white/10 rounded-full transition-colors active:scale-95 text-white/50 hover:text-white">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/5 border border-white/10 rounded-full text-white/80 text-[10px] font-bold font-sans uppercase tracking-[0.2em] mb-8 w-fit">
                  <MapPin className="w-3 h-3" />
                  {loc.name} {loc.id === 'sainthamaruthu' && ' (Origin)'}
                </div>

                <h3 className="text-4xl md:text-5xl font-light text-white mb-2 font-sans tracking-tight">{loc.type}</h3>
                <p className="text-white/50 mb-10 font-mplus font-light text-base">{loc.address}</p>

                <div className="grid grid-cols-2 gap-6 mb-10">
                  <div className="bg-white/[0.02] rounded-2xl p-6 border border-white/5">
                    <div className="flex items-center gap-2 text-white/40 text-[10px] uppercase tracking-[0.2em] font-bold font-sans mb-3">
                      <Store className="w-4 h-4" /> Retailers
                    </div>
                    <div className="text-3xl font-light text-white font-sans">{loc.shops}</div>
                  </div>
                  
                  <div className="bg-white/[0.02] rounded-2xl p-6 border border-white/5">
                    <div className="flex items-center gap-2 text-white/40 text-[10px] uppercase tracking-[0.2em] font-bold font-sans mb-3">
                      <Package className="w-4 h-4" /> Stock Status
                    </div>
                    <div className={`text-3xl font-light font-sans ${loc.stock === 'High' ? 'text-white' : loc.stock === 'Medium' ? 'text-white/70' : 'text-white/40'}`}>
                      {loc.stock}
                    </div>
                  </div>
                </div>

                <div>
                  <div className="text-[10px] text-white/30 uppercase tracking-[0.3em] font-bold font-sans mb-4">Stocked Beverages</div>
                  <div className="flex flex-wrap gap-2">
                    {loc.flavors.map((flavor) => (
                      <span key={flavor} className="px-4 py-2 bg-white/[0.03] border border-white/10 rounded-xl text-[10px] font-bold font-sans uppercase tracking-[0.1em] text-white/60 hover:bg-white hover:text-black transition-all cursor-default">
                        {flavor}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default memo(SriLankaMap);
