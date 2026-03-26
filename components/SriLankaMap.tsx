import React, { useState, memo, useEffect, useRef } from 'react';
import { MapPin, Navigation, Store, Package, X } from 'lucide-react';
import SriLanka from '@svg-maps/sri-lanka';

// Location Data
const LOCATIONS = [
    {
        id: 'sainthamaruthu',
        name: 'Sainthamaruthu',
        district: 'Ampara',
        x: 82,
        y: 68,
        type: 'Home Base & Factory',
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
    const [headerVisible, setHeaderVisible] = useState(false);
    const headerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const el = headerRef.current;
        if (!el) return;
        const observer = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) { setHeaderVisible(true); observer.disconnect(); } },
            { threshold: 0.1 }
        );
        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    const handleLocationClick = (districtId: string, districtName: string) => {
        const location = LOCATIONS.find(l =>
            l.district.toLowerCase() === districtName?.toLowerCase() ||
            l.district.toLowerCase() === districtId?.toLowerCase()
        );
        if (location) setActiveLocation(location);
    };

    return (
        <section className="py-20 md:py-32 bg-brand-black relative overflow-hidden border-t border-white/5">
            <div className="absolute inset-0 opacity-10 pointer-events-none">
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,#CCFF00_1px,transparent_1px)] bg-[length:40px_40px]" />
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <div
                    ref={headerRef}
                    className="text-center mb-16 transition-all duration-700 ease-out will-change-transform"
                    style={{
                        opacity: headerVisible ? 1 : 0,
                        transform: headerVisible ? 'translate3d(0, 0, 0)' : 'translate3d(0, 20px, 0)'
                    }}
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand-lime/10 rounded-full border border-brand-lime/20 mb-4">
                        <Navigation className="w-4 h-4 text-brand-lime" />
                        <span className="text-brand-lime font-bold uppercase tracking-wider text-[10px]">Island-wide Availability</span>
                    </div>
                    <h2 className="text-3xl md:text-6xl font-black text-white mb-6 font-display uppercase tracking-tighter">
                        Island-wide <span className="text-brand-lime">Freshness</span>
                    </h2>
                    <p className="text-gray-500 max-w-2xl mx-auto text-lg font-sans">
                        From our humble beginnings in Sainthamaruthu, we've expanded rapidly. We now distribute our refreshing Sunstar sodas to every province in Sri Lanka.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Map Container */}
                    <div className="relative w-full aspect-[4/5] md:aspect-square lg:aspect-[4/5] max-w-2xl mx-auto shadow-2xl overflow-hidden p-8 flex items-center justify-center bg-white/[0.02] rounded-3xl border border-white/5">
                        <div className="relative w-full h-full">
                            <svg viewBox={SriLanka.viewBox} className="w-full h-full" role="img" aria-label={SriLanka.label}>
                                {SriLanka.locations.map((location: any) => (
                                    <path
                                        key={location.id}
                                        id={location.id}
                                        name={location.name}
                                        d={location.path}
                                        className="fill-[#1a1a1a] stroke-[#333] stroke-[1px] transition-all duration-300 hover:fill-brand-lime hover:opacity-50 focus:outline-none cursor-pointer"
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
                                    className="absolute group z-10 transition-transform duration-300 hover:scale-125 active:scale-95"
                                    style={{ left: `${loc.x}%`, top: `${loc.y}%` }}
                                    onClick={() => setActiveLocation(loc)}
                                >
                                    <div className="relative -translate-x-1/2 -translate-y-1/2">
                                        <div className={`absolute inset-0 rounded-full blur-md animate-pulse ${activeLocation?.id === loc.id ? 'bg-brand-lime opacity-80 w-8 h-8 -m-2' : 'bg-brand-lime opacity-40 w-4 h-4'}`} />
                                        <div className={`relative w-4 h-4 rounded-full border-2 transition-colors duration-300 ${activeLocation?.id === loc.id ? 'bg-brand-lime border-black' : 'bg-black border-brand-lime'}`} />
                                        <div className={`absolute top-full left-1/2 -translate-x-1/2 mt-2 px-2 py-1 bg-black/90 backdrop-blur border border-white/10 rounded text-[10px] font-black uppercase tracking-widest text-white whitespace-nowrap transition-all duration-300 pointer-events-none ${activeLocation?.id === loc.id ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 group-hover:opacity-100 group-hover:translate-y-0'}`}>
                                            {loc.name}
                                        </div>
                                    </div>
                                </button>
                            ))}
                        </div>

                        {/* Hover Tooltip (Simplified) */}
                        <div
                            className={`absolute bottom-8 left-1/2 -translate-x-1/2 bg-black/80 backdrop-blur border border-brand-lime/30 px-4 py-2 rounded-full text-brand-lime font-black text-[10px] uppercase tracking-widest pointer-events-none z-20 whitespace-nowrap transition-all duration-300 ${hoveredLocation ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
                        >
                            {hoveredLocation}
                        </div>
                    </div>

                    {/* Info Panel (Refactored without AnimatePresence) */}
                    <div className="relative h-full min-h-[400px]">
                        {/* Empty State */}
                        <div className={`absolute inset-0 flex flex-col items-center justify-center text-center p-8 border border-white/5 rounded-3xl bg-white/[0.02] h-full transition-all duration-500 ${activeLocation ? 'opacity-0 pointer-events-none scale-95' : 'opacity-100 scale-100'}`}>
                            <div className="w-16 h-16 rounded-full bg-brand-lime/10 flex items-center justify-center mb-6 animate-pulse">
                                <MapPin className="w-8 h-8 text-brand-lime" />
                            </div>
                            <h3 className="text-xl font-black text-white mb-2 uppercase tracking-tight font-display">Select a District</h3>
                            <p className="text-gray-500 max-w-xs font-sans text-sm">
                                Click on any district on the map to view distribution details and stock availability.
                            </p>
                        </div>

                        {/* Active Panel */}
                        {LOCATIONS.map(loc => (
                            <div
                                key={loc.id}
                                className={`absolute inset-0 bg-[#111] rounded-3xl p-8 border border-brand-lime/20 flex flex-col justify-center transition-all duration-500 will-change-transform ${activeLocation?.id === loc.id ? 'opacity-100 translate-x-0 z-10' : 'opacity-0 translate-x-8 pointer-events-none'}`}
                            >
                                <div className="absolute top-0 right-0 p-4">
                                    <button onClick={() => setActiveLocation(null)} className="p-2 hover:bg-white/10 rounded-full transition-colors active:scale-95">
                                        <X className="w-5 h-5 text-gray-400" />
                                    </button>
                                </div>

                                <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-lime/10 rounded-full text-brand-lime text-[10px] font-black uppercase tracking-widest leading-none mb-6 w-fit">
                                    <MapPin className="w-3 h-3" />
                                    {loc.name} {loc.id === 'sainthamaruthu' && '(Our Origin)'}
                                </div>

                                <h3 className="text-3xl font-black text-white mb-2 font-display uppercase tracking-tight italic">{loc.type}</h3>
                                <p className="text-gray-500 mb-8 font-sans text-sm">{loc.address}</p>

                                <div className="grid grid-cols-2 gap-4 mb-8">
                                    <div className="bg-white/5 rounded-xl p-4 border border-white/5">
                                        <div className="flex items-center gap-2 text-gray-500 text-[10px] uppercase tracking-widest font-black mb-2 leading-none">
                                            <Store className="w-4 h-4" /> Shops
                                        </div>
                                        <div className="text-2xl font-black text-white font-display">{loc.shops}</div>
                                    </div>
                                    <div className="bg-white/5 rounded-xl p-4 border border-white/5">
                                        <div className="flex items-center gap-2 text-gray-500 text-[10px] uppercase tracking-widest font-black mb-2 leading-none">
                                            <Package className="w-4 h-4" /> Stock
                                        </div>
                                        <div className={`text-2xl font-black font-display ${loc.stock === 'High' ? 'text-brand-lime' : loc.stock === 'Medium' ? 'text-yellow-500' : 'text-red-500'}`}>
                                            {loc.stock}
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <div className="text-[10px] text-gray-600 uppercase tracking-[0.2em] font-black mb-3 leading-none">Available Flavors</div>
                                    <div className="flex flex-wrap gap-2">
                                        {loc.flavors.map((flavor) => (
                                            <span key={flavor} className="px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-[10px] font-black uppercase tracking-wider text-gray-400 hover:border-brand-lime/30 hover:text-white transition-all cursor-default leading-none">
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
