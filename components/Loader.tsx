import React, { memo } from 'react';

const Loader: React.FC = memo(() => {
    return (
        <div className="fixed inset-0 bg-[#050505] flex items-center justify-center z-[9999] overflow-hidden">
            <div className="relative flex flex-col items-center">
                {/* Minimal Sun Logo SVG */}
                <div className="relative mb-12 animate-pulse-gentle">
                    <svg
                        width="80"
                        height="80"
                        viewBox="0 0 100 100"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="text-white opactiy-90"
                    >
                        <circle cx="50" cy="50" r="20" stroke="currentColor" strokeWidth="2" />
                        {[...Array(12)].map((_, i) => (
                            <line
                                key={i}
                                x1="50"
                                y1="20"
                                x2="50"
                                y2="5"
                                stroke="currentColor"
                                strokeWidth="2"
                                transform={`rotate(${i * 30} 50 50)`}
                                className="opacity-60"
                            />
                        ))}
                    </svg>
                    {/* Subtle Glow */}
                    <div className="absolute inset-0 bg-brand-lime/10 blur-2xl rounded-full scale-150 animate-glow" />
                </div>

                {/* Professional Progress Bar */}
                <div className="relative w-48 h-[2px] bg-white/10 rounded-full overflow-hidden mb-6">
                    <div className="absolute inset-0 bg-brand-lime h-full w-full -translate-x-full animate-progress rounded-full" />
                </div>

                {/* Business Typography */}
                <div className="text-center">
                    <p className="text-[10px] uppercase tracking-[0.5em] text-white/50 font-sans font-bold">
                        Loading Experience
                    </p>
                </div>
            </div>

            <style>{`
        @keyframes progress {
          0% { transform: translateX(-100%); }
          50% { transform: translateX(-10%); }
          100% { transform: translateX(100%); }
        }
        @keyframes pulse-gentle {
          0%, 100% { opacity: 0.8; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.02); }
        }
        @keyframes glow {
          0%, 100% { opacity: 0.3; transform: scale(1.5); }
          50% { opacity: 0.6; transform: scale(1.8); }
        }
        .animate-progress {
          animation: progress 2s cubic-bezier(0.65, 0, 0.35, 1) infinite;
        }
        .animate-pulse-gentle {
          animation: pulse-gentle 3s ease-in-out infinite;
        }
        .animate-glow {
          animation: glow 4s ease-in-out infinite;
        }
      `}</style>
        </div>
    );
});

export default Loader;
