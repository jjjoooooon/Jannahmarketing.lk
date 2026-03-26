import React, { memo, useEffect, useRef, useState } from 'react';
import { Star, Quote } from 'lucide-react';

const REVIEWS = [
  {
    name: "Alex Chen",
    role: "Fitness Enthusiast",
    company: "Los Angeles, CA",
    text: "Sunstar Orange has become my go-to post-workout drink. The natural ingredients and refreshing taste make it the perfect recovery beverage. Zero sugar and amazing flavor!",
    rating: 5,
    verified: true
  },
  {
    name: "Sarah Martinez",
    role: "Business Owner",
    company: "Miami, FL",
    text: "We stock Sunstar at our café and customers absolutely love it. The quality is exceptional and the variety of flavors keeps everyone coming back for more.",
    rating: 5,
    verified: true
  },
  {
    name: "Marcus Johnson",
    role: "Food Blogger",
    company: "New York, NY",
    text: "As someone who reviews beverages professionally, I'm impressed by Sunstar's commitment to quality. The Midnight Cola is my personal favorite - bold flavor without the guilt.",
    rating: 5,
    verified: true
  }
];

// Static stars — memo avoids re-render on parent state changes
const Stars = memo(({ rating }: { rating: number }) => (
  <div className="flex gap-1 mb-4">
    {[...Array(rating)].map((_, i) => (
      <Star key={i} className="w-4 h-4 text-brand-lime fill-brand-lime" />
    ))}
  </div>
));

const ReviewCard = memo(({ review, visible, delay }: { review: typeof REVIEWS[0]; visible: boolean; delay: number }) => (
  <div
    className="relative p-6 md:p-8 rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-transparent hover:border-brand-lime/30 transition-colors duration-300 group will-change-transform"
    style={{
      opacity: visible ? 1 : 0,
      transform: visible ? 'translate3d(0, 0, 0)' : 'translate3d(0, 24px, 0)',
      transition: `opacity 0.6s ease-out ${delay}ms, transform 0.6s ease-out ${delay}ms`,
    }}
  >
    <div className="absolute top-6 right-6 opacity-10 group-hover:opacity-20 transition-opacity pointer-events-none">
      <Quote className="w-12 h-12 md:w-16 md:h-16 text-brand-lime" />
    </div>

    <Stars rating={review.rating} />

    <p className="text-gray-300 mb-6 leading-relaxed text-sm md:text-base font-sans relative z-10">
      "{review.text}"
    </p>

    <div className="flex items-center justify-between border-t border-white/10 pt-4">
      <div>
        <h4 className="text-white font-bold font-display text-base md:text-lg">{review.name}</h4>
        <p className="text-xs text-gray-500 font-medium font-sans">{review.role}</p>
        <p className="text-xs text-gray-600 font-sans">{review.company}</p>
      </div>
      {review.verified && (
        <div className="flex items-center gap-1 text-[10px] bg-brand-lime/10 text-brand-lime px-2 py-1 rounded-full border border-brand-lime/20 font-bold uppercase">
          <Star className="w-3 h-3 fill-brand-lime" />
          Verified
        </div>
      )}
    </div>
  </div>
));

const Testimonials: React.FC = memo(() => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="py-20 md:py-32 bg-brand-black border-y border-white/5 overflow-hidden">
      <div className="container mx-auto px-6" ref={ref}>
        {/* Header */}
        <div
          className="text-center mb-12 md:mb-20 will-change-transform"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'translate3d(0, 0, 0)' : 'translate3d(0, 20px, 0)',
            transition: 'opacity 0.7s ease-out, transform 0.7s ease-out',
          }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand-lime/10 rounded-full border border-brand-lime/20 mb-4">
            <Star className="w-4 h-4 text-brand-lime fill-brand-lime" />
            <span className="text-brand-lime font-bold uppercase tracking-wider text-xs">Customer Reviews</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-white mb-4 font-display">What Our Customers Say</h2>
          <p className="text-gray-400 text-base md:text-lg max-w-2xl mx-auto font-sans">
            Join thousands of satisfied customers who've made the switch to Sunstar
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {REVIEWS.map((review, i) => (
            <ReviewCard key={review.name} review={review} visible={visible} delay={i * 120} />
          ))}
        </div>

        {/* Trust Indicators */}
        <div
          className="mt-12 md:mt-16 flex flex-wrap justify-center items-center gap-6 md:gap-12 text-center will-change-transform"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'translate3d(0, 0, 0)' : 'translate3d(0, 20px, 0)',
            transition: 'opacity 0.7s ease-out 500ms, transform 0.7s ease-out 500ms',
          }}
        >
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-black text-white mb-1 font-display">10+</div>
            <div className="text-xs md:text-sm text-gray-500 uppercase tracking-tight font-bold">Total Distributors</div>
          </div>
          <div className="hidden md:block w-px h-12 bg-white/10" />
          <div className="text-center">
            <div className="flex items-center gap-1 justify-center mb-1">
              <span className="text-3xl md:text-4xl font-black text-white font-display">4.9</span>
              <Star className="w-6 h-6 text-brand-lime fill-brand-lime" />
            </div>
            <div className="text-xs md:text-sm text-gray-500 uppercase tracking-tight font-bold">Average Rating</div>
          </div>
          <div className="hidden md:block w-px h-12 bg-white/10" />
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-black text-white mb-1 font-display">100%</div>
            <div className="text-xs md:text-sm text-gray-500 uppercase tracking-tight font-bold">Maximum Fizz</div>
          </div>
        </div>
      </div>
    </section>
  );
});

export default Testimonials;