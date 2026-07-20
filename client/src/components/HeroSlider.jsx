import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';
import { useApp } from '../context/AppContext';

const defaultBanners = [
  {
    _id: "ban-1",
    title: "Redefining Luxury Real Estate Excellence",
    subtitle: "Curated portfolio of prime sea-front penthouses, architectural villas & landmark commercial developments across Mumbai, Goa & NCR.",
    badge: "SURABHI EXCLUSIVE REALTY",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=80",
    ctaText: "Explore Portfolio",
    ctaLink: "/properties"
  },
  {
    _id: "ban-2",
    title: "Surabhi Sovereign Twin Sky Towers",
    subtitle: "Pre-launch opportunities for Worli's iconic sea-facing residential skyscraper with private sky decks.",
    badge: "FLAGSHIP DEVELOPMENT",
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1600&q=80",
    ctaText: "View Sovereign Towers",
    ctaLink: "/projects"
  },
  {
    _id: "ban-3",
    title: "Aura Oceanfront Sanctuaries - Goa",
    subtitle: "Portuguese-contemporary fusion beachfront villas nestled in Candolim with private sundecks.",
    badge: "BESPOKE VILLA COLLECTION",
    image: "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1600&q=80",
    ctaText: "Discover Goa Villas",
    ctaLink: "/properties"
  }
];

const HeroSlider = ({ banners = [] }) => {
  const slides = banners.length > 0 ? banners : defaultBanners;
  const [currentSlide, setCurrentSlide] = useState(0);
  const { openEnquiryModal } = useApp();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  return (
    <div className="relative w-full h-[600px] md:h-[680px] lg:h-[720px] bg-navy-900 overflow-hidden select-none">
      
      {/* Slides Carousel */}
      {slides.map((slide, index) => (
        <div
          key={slide._id || index}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentSlide ? 'opacity-100 z-10 pointer-events-auto' : 'opacity-0 z-0 pointer-events-none'
          }`}
        >
          {/* Background Image with Overlay */}
          <div 
            className="absolute inset-0 bg-cover bg-center transition-transform duration-10000 ease-out transform scale-105"
            style={{ backgroundImage: `url(${slide.image})` }}
          >
            <div className="absolute inset-0 hero-overlay"></div>
          </div>

          {/* Slide Hero Content */}
          <div className="relative z-20 h-full max-w-7xl mx-auto px-4 sm:px-6 flex flex-col justify-center text-white pb-20">
            <div className="max-w-3xl space-y-5 animate-fade-in">
              
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gold-500/20 border border-gold-500/50 backdrop-blur-md text-gold-400 text-xs font-semibold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-gold-400" />
                <span>{slide.badge || 'SURABHI LUXURY REALTY'}</span>
              </div>

              {/* Title */}
              <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.15] drop-shadow-lg">
                {slide.title}
              </h1>

              {/* Subtitle */}
              <p className="text-slate-200 text-base sm:text-xl font-normal leading-relaxed max-w-2xl text-shadow">
                {slide.subtitle}
              </p>

              {/* Actions */}
              <div className="flex flex-wrap items-center gap-4 pt-4">
                <Link
                  to={slide.ctaLink || '/properties'}
                  className="px-7 py-3.5 rounded-xl gold-gradient-bg text-navy-900 font-bold text-sm sm:text-base shadow-2xl hover:scale-105 transition-all flex items-center gap-2"
                >
                  <span>{slide.ctaText || 'Explore Listings'}</span>
                  <ArrowRight className="w-5 h-5" />
                </Link>

                <button
                  onClick={() => openEnquiryModal()}
                  className="px-7 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/30 backdrop-blur-md text-white font-semibold text-sm sm:text-base transition-all flex items-center gap-2"
                >
                  <ShieldCheck className="w-5 h-5 text-gold-400" />
                  <span>Request Callback</span>
                </button>
              </div>

            </div>
          </div>
        </div>
      ))}

      {/* Navigation Arrow Controls */}
      <button
        onClick={handlePrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-navy-900/60 border border-white/20 hover:border-gold-400 text-white hover:text-gold-400 backdrop-blur-md flex items-center justify-center transition-all hidden sm:flex"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <button
        onClick={handleNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-navy-900/60 border border-white/20 hover:border-gold-400 text-white hover:text-gold-400 backdrop-blur-md flex items-center justify-center transition-all hidden sm:flex"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Slider Indicator Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex items-center gap-3">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentSlide(idx)}
            className={`transition-all duration-300 rounded-full ${
              idx === currentSlide
                ? 'w-10 h-2.5 gold-gradient-bg'
                : 'w-2.5 h-2.5 bg-white/40 hover:bg-white/70'
            }`}
          ></button>
        ))}
      </div>

    </div>
  );
};

export default HeroSlider;
