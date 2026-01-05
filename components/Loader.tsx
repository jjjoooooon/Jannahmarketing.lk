import React from 'react';
import { motion } from 'framer-motion';

const Loader: React.FC = () => {
    return (
        <div className="fixed inset-0 bg-[#050505] flex items-center justify-center z-50 overflow-hidden">
            <div className="relative flex flex-col items-center justify-center">
                {/* Central Abstract Symbol */}
                <div className="relative w-24 h-24 mb-12">
                    {/* Outer Ring */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="absolute inset-0 border border-[#CCFF00]/20 rounded-full"
                    />

                    {/* Rotating Arc */}
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-0 rounded-full border-t border-[#CCFF00] opacity-80"
                    />

                    {/* Inner Pulse */}
                    <motion.div
                        animate={{
                            scale: [0.8, 1, 0.8],
                            opacity: [0.3, 0.6, 0.3],
                        }}
                        transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                        className="absolute inset-8 bg-[#CCFF00] rounded-full blur-md"
                    />

                    {/* Core Dot */}
                    <div className="absolute inset-0 m-auto w-2 h-2 bg-[#CCFF00] rounded-full" />
                </div>

                {/* Typography */}
                <div className="text-center space-y-4">
                    <motion.h1
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.8 }}
                        className="text-3xl font-bold font-['Plus_Jakarta_Sans'] tracking-[0.3em] text-white"
                    >
                        SUNSTAR
                    </motion.h1>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5, duration: 0.8 }}
                        className="flex items-center justify-center gap-2"
                    >
                        <span className="h-[1px] w-8 bg-[#CCFF00]/30" />
                        <span className="text-[10px] uppercase tracking-widest text-[#CCFF00]/80">Premium Energy</span>
                        <span className="h-[1px] w-8 bg-[#CCFF00]/30" />
                    </motion.div>
                </div>

                {/* Minimal Progress Line */}
                <div className="absolute bottom-20 left-1/2 -translate-x-1/2 w-48 h-[1px] bg-white/10 overflow-hidden">
                    <motion.div
                        initial={{ x: '-100%' }}
                        animate={{ x: '100%' }}
                        transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                        className="w-full h-full bg-gradient-to-r from-transparent via-[#CCFF00] to-transparent opacity-50"
                    />
                </div>
            </div>
        </div>
    );
};

export default Loader;
