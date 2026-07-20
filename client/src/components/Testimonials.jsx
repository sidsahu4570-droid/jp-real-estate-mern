import React, { useState, useEffect } from 'react';
import { Star, Quote, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';

const defaultReviews = [
  {
    _id: "t1",
    name: "Vikramaditya Singhania",
    role: "Managing Director, Apex Global",
    location: "Mumbai",
    rating: 5,
    quote: "Surabhi Luxury Real Estate secured our Pali Hill penthouse off-market with utmost discretion and efficiency. Their deep market network and transparent advisory are unmatched in India.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80",
    propertyName: "The Grand Pavilion Penthouse"
  },
  {
    _id: "t2",
    name: "Dr. Sunita & Rajesh Kothari",
    role: "NRI Investors",
    location: "London / Goa",
    rating: 5,
    quote: "Purchasing a oceanfront villa in Goa while living in London felt effortless thanks to the Surabhi team. From video walkthroughs to RERA legal title closing, everything was handled impeccably.",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80",
    propertyName: "Aura Oceanfront Villa"
  },
  {
    _id: "t3",
    name: "Ananya & Rohan Merchant",
    role: "Tech Founders",
    location: "Bengaluru",
    rating: 5,
    quote: "The level of professionalism, discretion, and market depth provided by Surabhi's advisory desk is top-tier. They guided us to the ideal golf course residence in record time.",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80",
    propertyName: "Verdant Heights Golf Residence"
  }
];

const Testimonials = ({ items = [] }) => {
  const reviews = items.length > 0 ? items : defaultReviews;
  const [index, setIndex] = useState(0);

  const handlePrev = () => {
    setIndex((prev) => (prev === 0 ? reviews.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setIndex((prev) => (prev + 1) % reviews.length);
  };

  const current = reviews[index] || defaultReviews[0];

  return (
    <section className="py-20 bg-navy-900 text-white relative overflow-hidden">
      
      {/* Background Decor */}
      <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-gold-500/10 blur-3xl pointer-events-none"></div>
      <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-navy-700/30 blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-400 text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" /> Client Endorsements
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-white">
            Trusted by India’s Premier Families & Global Investors
          </h2>
          <p className="text-slate-400 text-sm">
            Read how our private advisory desk crafts exceptional real estate outcomes.
          </p>
        </div>

        {/* Testimonial Showcase Card */}
        <div className="max-w-4xl mx-auto bg-navy-800/80 border border-gold-500/30 rounded-3xl p-8 sm:p-12 shadow-2xl backdrop-blur-xl relative">
          
          <Quote className="w-16 h-16 text-gold-500/20 absolute top-6 right-8 pointer-events-none" />

          <div className="flex flex-col md:flex-row items-center gap-8">
            
            {/* Avatar */}
            <div className="relative shrink-0">
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full p-1 gold-gradient-bg shadow-xl">
                <img
                  src={current.avatar || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80'}
                  alt={current.name}
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
            </div>

            {/* Testimonial Text & Info */}
            <div className="flex-1 text-center md:text-left space-y-4">
              
              {/* Star Rating */}
              <div className="flex items-center justify-center md:justify-start gap-1">
                {[...Array(current.rating || 5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-gold-400 text-gold-400" />
                ))}
              </div>

              {/* Quote */}
              <p className="font-serif text-lg sm:text-xl text-slate-100 italic leading-relaxed">
                "{current.quote}"
              </p>

              {/* Client Info */}
              <div>
                <h4 className="font-bold text-white text-base font-serif">
                  {current.name}
                </h4>
                <p className="text-xs text-gold-400 font-medium">
                  {current.role} • {current.location}
                </p>
                {current.propertyName && (
                  <span className="inline-block mt-2 px-3 py-1 rounded-md bg-white/5 border border-white/10 text-[11px] text-slate-300 font-mono">
                    Purchased: {current.propertyName}
                  </span>
                )}
              </div>

            </div>

          </div>

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between pt-8 mt-8 border-t border-white/10">
            <div className="flex items-center gap-2">
              {reviews.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setIndex(i)}
                  className={`transition-all rounded-full ${
                    i === index ? 'w-8 h-2 gold-gradient-bg' : 'w-2 h-2 bg-white/30'
                  }`}
                ></button>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handlePrev}
                className="p-2 rounded-full border border-white/20 hover:border-gold-400 text-slate-300 hover:text-gold-400 transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={handleNext}
                className="p-2 rounded-full border border-white/20 hover:border-gold-400 text-slate-300 hover:text-gold-400 transition-colors"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

        </div>

      </div>

    </section>
  );
};

export default Testimonials;
