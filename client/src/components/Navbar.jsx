import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { 
  Phone, 
  Menu, 
  X, 
  Building2, 
  Sparkles, 
  ShieldCheck, 
  ChevronRight,
  UserCheck
} from 'lucide-react';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { openEnquiryModal, adminUser } = useApp();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Properties', path: '/properties' },
    { name: 'Projects', path: '/projects' },
    { name: 'About Us', path: '/about' },
    { name: 'Blogs & Insights', path: '/blogs' },
    { name: 'Contact', path: '/contact' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <>
      {/* Top Advisory Strip */}
      <div className="bg-navy-900 border-b border-gold-500/20 text-xs py-2 px-4 text-slate-300 hidden md:block">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5 text-gold-400 font-medium">
              <Sparkles className="w-3.5 h-3.5" /> India's Premier Luxury Real Estate Advisory
            </span>
            <span className="text-slate-400">|</span>
            <span className="text-slate-300">Mumbai • Goa • Gurugram • Bengaluru</span>
          </div>
          <div className="flex items-center gap-5">
            <a href="tel:+919876543210" className="flex items-center gap-1.5 hover:text-gold-400 transition-colors">
              <Phone className="w-3.5 h-3.5 text-gold-400" /> +91 98765 43210
            </a>
            {adminUser ? (
              <Link to="/admin/dashboard" className="flex items-center gap-1.5 text-gold-400 font-semibold hover:underline">
                <UserCheck className="w-3.5 h-3.5" /> Admin Dashboard
              </Link>
            ) : (
              <Link to="/admin/login" className="text-slate-400 hover:text-white transition-colors">
                Admin Portal
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Main Glass Navbar */}
      <header className={`sticky top-0 z-40 transition-all duration-300 ${
        scrolled ? 'glass-nav shadow-xl py-3 border-b border-gold-500/30' : 'bg-navy-900 py-4 border-b border-white/10'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl gold-gradient-bg flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
              <Building2 className="w-6 h-6 text-navy-900" />
            </div>
            <div>
              <span className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-white block leading-none">
                SURABHI
              </span>
              <span className="text-[10px] tracking-[0.2em] text-gold-400 uppercase font-medium">
                LUXURY REALTY
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-medium transition-all relative py-1 ${
                  isActive(link.path)
                    ? 'text-gold-400 font-semibold'
                    : 'text-slate-200 hover:text-gold-400'
                }`}
              >
                {link.name}
                {isActive(link.path) && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 gold-gradient-bg rounded-full"></span>
                )}
              </Link>
            ))}
          </nav>

          {/* Right Action CTA */}
          <div className="hidden lg:flex items-center gap-4">
            <button
              onClick={() => openEnquiryModal()}
              className="px-5 py-2.5 rounded-lg gold-gradient-bg text-navy-900 font-semibold text-sm shadow-lg hover:shadow-gold-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2"
            >
              <ShieldCheck className="w-4 h-4" /> Enquire Now
            </button>
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-slate-200 hover:text-gold-400 hover:bg-white/5 transition-colors"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setMobileMenuOpen(false)}></div>
          
          <div className="relative ml-auto w-full max-w-xs bg-navy-900 h-full shadow-2xl p-6 flex flex-col justify-between overflow-y-auto border-l border-gold-500/30">
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-white/10">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg gold-gradient-bg flex items-center justify-center">
                    <Building2 className="w-5 h-5 text-navy-900" />
                  </div>
                  <span className="font-serif text-lg font-bold text-white">SURABHI</span>
                </div>
                <button 
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1.5 text-slate-400 hover:text-white"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="py-6 space-y-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-base font-medium transition-colors ${
                      isActive(link.path)
                        ? 'bg-gold-500/10 text-gold-400 font-semibold border-l-2 border-gold-400'
                        : 'text-slate-300 hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    <span>{link.name}</span>
                    <ChevronRight className="w-4 h-4 opacity-40" />
                  </Link>
                ))}
              </div>
            </div>

            <div className="pt-6 border-t border-white/10 space-y-3">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  openEnquiryModal();
                }}
                className="w-full py-3 rounded-lg gold-gradient-bg text-navy-900 font-semibold text-sm text-center shadow-lg"
              >
                Schedule Private Consultation
              </button>
              <a 
                href="tel:+919876543210" 
                className="flex items-center justify-center gap-2 py-2.5 text-sm text-slate-300 hover:text-gold-400"
              >
                <Phone className="w-4 h-4 text-gold-400" /> +91 98765 43210
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
