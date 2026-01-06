import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
        type: 'Flagship Store',
        address: 'B293 Boliverian Village, Sainthamaruthu',
        stock: 'High',
        flavors: ['Orange', 'Cola', 'Ginger', 'Nesta', 'Cream Soda'],
        shops: 7
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

    const handleLocationClick = (districtId: string, districtName: string) => {
        // Find if we have a location in this district
        const location = LOCATIONS.find(l =>
            l.district.toLowerCase() === districtName?.toLowerCase() ||
            l.district.toLowerCase() === districtId?.toLowerCase()
        );

        if (location) {
            setActiveLocation(location);
        }
    };

    return (
        <section className="py-20 md:py-32 bg-[#050505] relative overflow-hidden border-t border-white/5">
            {/* Background Elements */}
            <div className="absolute inset-0 opacity-10 pointer-events-none">
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,_#CCFF00_1px,_transparent_1px)] bg-[length:40px_40px]" />
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-[#CCFF00]/10 rounded-full border border-[#CCFF00]/20 mb-4"
                    >
                        <Navigation className="w-4 h-4 text-[#CCFF00]" />
                        <span className="text-[#CCFF00] font-bold uppercase tracking-wider text-xs">Island-wide Availability</span>
                    </motion.div>
                    <h2 className="text-3xl md:text-6xl font-black text-white mb-6 font-['Plus_Jakarta_Sans']">
                        Find Your <span className="text-[#CCFF00]">Fuel</span>
                    </h2>
                    <p className="text-gray-400 max-w-2xl mx-auto text-lg font-['Inter']">
                        Select a district to see availability. We are expanding rapidly across the island.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Map Container */}
                    <div className="relative w-full aspect-[4/5] md:aspect-square lg:aspect-[4/5] max-w-2xl mx-auto shadow-2xl overflow-hidden p-8 flex items-center justify-center">
                        {/* Grid Overlay */}
                        {/* <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" /> */}

                        <div className="relative w-full h-full">
                            <svg
                                viewBox={SriLanka.viewBox}
                                className="w-full h-full"
                                role="img"
                                aria-label={SriLanka.label}
                            >
                                {SriLanka.locations.map((location: any) => (
                                    <path
                                        key={location.id}
                                        id={location.id}
                                        name={location.name}
                                        d={location.path}
                                        className="fill-[#1a1a1a] stroke-[#333] stroke-[1px] transition-all duration-300 hover:fill-[#CCFF00] hover:opacity-50 focus:outline-none cursor-pointer"
                                        onClick={() => handleLocationClick(location.id, location.name)}
                                        onMouseEnter={() => setHoveredLocation(location.name)}
                                        onMouseLeave={() => setHoveredLocation(null)}
                                    />
                                ))}
                            </svg>

                            {/* Blinking Pins Overlay */}
                            {LOCATIONS.map((loc) => (
                                <motion.button
                                    key={loc.id}
                                    className="absolute group z-10"
                                    style={{ left: `${loc.x}%`, top: `${loc.y}%` }}
                                    onClick={() => setActiveLocation(loc)}
                                    whileHover={{ scale: 1.2 }}
                                    whileTap={{ scale: 0.9 }}
                                >
                                    <div className="relative -translate-x-1/2 -translate-y-1/2">
                                        {/* Blinking Effect */}
                                        <div className={`absolute inset-0 rounded-full blur-md animate-pulse ${activeLocation?.id === loc.id ? 'bg-[#CCFF00] opacity-80 w-8 h-8 -m-2' : 'bg-[#CCFF00] opacity-40 w-4 h-4'}`} />

                                        {/* Pin Core */}
                                        <div className={`relative w-4 h-4 rounded-full border-2 transition-colors duration-300 ${activeLocation?.id === loc.id ? 'bg-[#CCFF00] border-black' : 'bg-black border-[#CCFF00]'}`} />

                                        {/* Label on Hover/Active */}
                                        <div className={`absolute top-full left-1/2 -translate-x-1/2 mt-2 px-2 py-1 bg-black/80 backdrop-blur border border-white/10 rounded text-[10px] font-bold uppercase tracking-wider text-white whitespace-nowrap transition-all duration-300 ${activeLocation?.id === loc.id ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 group-hover:opacity-100 group-hover:translate-y-0'}`}>
                                            {loc.name}
                                        </div>
                                    </div>
                                </motion.button>
                            ))}
                        </div>

                        {/* Hover Tooltip */}
                        <AnimatePresence>
                            {hoveredLocation && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0 }}
                                    className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-black/80 backdrop-blur border border-[#CCFF00]/30 px-4 py-2 rounded-full text-[#CCFF00] font-bold text-sm uppercase tracking-wider pointer-events-none z-20 whitespace-nowrap"
                                >
                                    {hoveredLocation}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Info Panel */}
                    <div className="relative h-full min-h-[300px] flex flex-col justify-center">
                        <AnimatePresence mode="wait">
                            {activeLocation ? (
                                <motion.div
                                    key={activeLocation.id}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    transition={{ duration: 0.3 }}
                                    className="bg-[#111] border border-white/10 rounded-3xl p-8 relative overflow-hidden group"
                                >
                                    <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button onClick={() => setActiveLocation(null)} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                                            <X className="w-5 h-5 text-gray-400" />
                                        </button>
                                    </div>

                                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#CCFF00]/10 rounded-full text-[#CCFF00] text-xs font-bold uppercase tracking-wider mb-6">
                                        <MapPin className="w-3 h-3" />
                                        {activeLocation.name}
                                    </div>

                                    <h3 className="text-3xl font-black text-white mb-2 font-['Plus_Jakarta_Sans']">{activeLocation.type}</h3>
                                    <p className="text-gray-400 mb-8 font-['Inter']">{activeLocation.address}</p>

                                    <div className="grid grid-cols-2 gap-4 mb-8">
                                        <div className="bg-white/5 rounded-xl p-4 border border-white/5">
                                            <div className="flex items-center gap-2 text-gray-400 text-xs uppercase tracking-wider font-bold mb-2">
                                                <Store className="w-4 h-4" />
                                                Active Shops
                                            </div>
                                            <div className="text-2xl font-black text-white">{activeLocation.shops}</div>
                                        </div>
                                        <div className="bg-white/5 rounded-xl p-4 border border-white/5">
                                            <div className="flex items-center gap-2 text-gray-400 text-xs uppercase tracking-wider font-bold mb-2">
                                                <Package className="w-4 h-4" />
                                                Stock Level
                                            </div>
                                            <div className={`text-2xl font-black ${activeLocation.stock === 'High' ? 'text-[#CCFF00]' : activeLocation.stock === 'Medium' ? 'text-yellow-500' : 'text-red-500'}`}>
                                                {activeLocation.stock}
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <div className="text-xs text-gray-500 uppercase tracking-wider font-bold mb-3">Available Flavors</div>
                                        <div className="flex flex-wrap gap-2">
                                            {activeLocation.flavors.map((flavor) => (
                                                <span key={flavor} className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-xs font-medium text-gray-300 hover:border-[#CCFF00]/30 hover:text-white transition-colors cursor-default">
                                                    {flavor}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </motion.div>
                            ) : (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="flex flex-col items-center justify-center text-center p-8 border border-white/5 rounded-3xl bg-white/[0.02] h-full min-h-[400px]"
                                >
                                    <div className="w-16 h-16 rounded-full bg-[#CCFF00]/10 flex items-center justify-center mb-6 animate-pulse">
                                        <MapPin className="w-8 h-8 text-[#CCFF00]" />
                                    </div>
                                    <h3 className="text-xl font-bold text-white mb-2">Select a District</h3>
                                    <p className="text-gray-500 max-w-xs">
                                        Click on any district on the map to view distribution details and stock availability.
                                        <br /><span className="text-xs text-gray-600 mt-2 block">(Try Colombo, Kandy, Galle, Jaffna, Trincomalee)</span>
                                    </p>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SriLankaMap;
