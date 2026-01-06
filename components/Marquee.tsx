import React, { memo } from 'react';
import { motion, Transition } from 'framer-motion';

// --- Configuration ---
const MARQUEE_TEXT = "FEEL THE FIZZ";
const SECONDARY_TEXT = "HYDRATE YOUR SOUL";
const REPEAT_COUNT = 4; // Adjusted for balance between DOM size and coverage
const ANIMATION_DURATION = 200;

const TRANSITION_SETTINGS: Transition = {
  repeat: Infinity,
  ease: "linear",
  duration: ANIMATION_DURATION,
};

// --- Sub-component to reduce duplication ---
const MarqueeContent = memo(() => (
  <div className="flex items-center gap-6 md:gap-12 pr-6 md:pr-12 shrink-0">
    {[...Array(REPEAT_COUNT)].map((_, i) => (
      <span
        key={i}
        className="text-4xl md:text-8xl font-black text-black font-['Plus_Jakarta_Sans'] tracking-tight uppercase flex items-center gap-4 md:gap-8 whitespace-nowrap"
      >
        {MARQUEE_TEXT}
        <span className="text-2xl md:text-4xl text-black select-none">✦</span>
        {SECONDARY_TEXT}
        <span className="text-2xl md:text-4xl text-black select-none">✦</span>
      </span>
    ))}
  </div>
));

const Marquee: React.FC = () => {
  return (
    <div className="relative w-full py-6 md:py-10 bg-[#CCFF00] overflow-hidden flex items-center transform -skew-y-2 origin-top-left z-20 border-y-4 border-black user-select-none">
      <div className="flex whitespace-nowrap">
        {/* Block 1 */}
        <motion.div
          initial={{ x: 0 }}
          animate={{ x: "-100%" }}
          transition={TRANSITION_SETTINGS}
          className="will-change-transform transform-gpu"
        >
          <MarqueeContent />
        </motion.div>

        {/* Block 2 (Immediate follower for seamless loop) */}
        <motion.div
          initial={{ x: 0 }}
          animate={{ x: "-100%" }}
          transition={TRANSITION_SETTINGS}
          className="will-change-transform transform-gpu"
        >
          <MarqueeContent />
        </motion.div>
      </div>
    </div>
  );
};

export default memo(Marquee);