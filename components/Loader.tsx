import React, { memo } from 'react';

const Loader: React.FC = memo(() => {
    return (
        <div className="fixed inset-0 bg-brand-black flex items-center justify-center z-50 overflow-hidden">
            <div className="relative flex flex-col items-center justify-center">
                {/* Central Abstract Symbol */}
                <div className="relative w-24 h-24 mb-12">
                    {/* Outer Ring */}
                    <div className="absolute inset-0 border border-brand-lime/20 rounded-full animate-scale-in" />

                    {/* Rotating Arc */}
                    <div className="absolute inset-0 rounded-full border-t border-brand-lime opacity-80 animate-spin-slow" />

                    {/* Inner Pulse */}
                    <div className="absolute inset-8 bg-brand-lime rounded-full blur-md animate-pulse-slow" />

                    {/* Core Dot */}
                    <div className="absolute inset-0 m-auto w-2 h-2 bg-brand-lime rounded-full" />
                </div>

                {/* Typography */}
                <div className="text-center space-y-4 animate-fade-in-up">
                    <h1 className="text-3xl font-black font-display tracking-[0.3em] text-white">
                        SUNSTAR
                    </h1>

                    <div className="flex items-center justify-center gap-2 opacity-80">
                        <span className="h-px w-8 bg-brand-lime/30" />
                        <span className="text-[10px] uppercase tracking-widest text-brand-lime">Maximum Fizz</span>
                        <span className="h-px w-8 bg-brand-lime/30" />
                    </div>
                </div>

                {/* Minimal Progress Line */}
                <div className="absolute bottom-20 left-1/2 -translate-x-1/2 w-48 h-px bg-white/10 overflow-hidden">
                    <div className="w-full h-full bg-linear-to-r from-transparent via-brand-lime to-transparent opacity-50 animate-shimmer" />
                </div>
            </div>

            <style>{`
                @keyframes spin-slow {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
                @keyframes pulse-slow {
                    0%, 100% { transform: scale(0.8); opacity: 0.3; }
                    50% { transform: scale(1); opacity: 0.6; }
                }
                @keyframes shimmer {
                    from { transform: translateX(-100%); }
                    to { transform: translateX(100%); }
                }
                .animate-spin-slow {
                    animation: spin-slow 3s linear infinite;
                }
                .animate-pulse-slow {
                    animation: pulse-slow 3s ease-in-out infinite;
                }
                .animate-shimmer {
                    animation: shimmer 1.5s ease-in-out infinite;
                }
            `}</style>
        </div>
    );
});

export default Loader;
