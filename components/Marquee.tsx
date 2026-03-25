import React, { memo } from 'react';

// --- Configuration ---
const MARQUEE_TEXT = "FEEL THE FIZZ";
const SECONDARY_TEXT = "MAXIMUM REFRESHMENT";
const REPEAT_COUNT = 10; // Large enough for seamless loop

const Marquee: React.FC = () => {
  const content = (
    <div className="flex items-center gap-6 md:gap-12 pr-6 md:pr-12 shrink-0 animate-marquee whitespace-nowrap">
      {[...Array(REPEAT_COUNT)].map((_, i) => (
        <span
          key={i}
          className="text-4xl md:text-8xl font-black text-black font-display tracking-tight uppercase flex items-center gap-4 md:gap-8"
        >
          {MARQUEE_TEXT}
          <span className="text-2xl md:text-4xl text-black select-none">✦</span>
          {SECONDARY_TEXT}
          <span className="text-2xl md:text-4xl text-black select-none">✦</span>
        </span>
      ))}
    </div>
  );

  return (
    <div className="relative w-full py-6 md:py-10 bg-brand-lime overflow-hidden flex items-center transform -skew-y-2 origin-top-left z-20 border-y-4 border-black select-none">
      <div className="flex">
        {content}
        {content}
      </div>

      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 60s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default memo(Marquee);