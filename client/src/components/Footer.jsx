import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Building2, 
  Phone, 
  Mail, 
  MapPin, 
  ArrowRight, 
  Instagram, 
  Facebook, 
  Linkedin, 
  Youtube,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';
import { useApp } from '../context/AppContext';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const { showToast } = useApp();

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    showToast('Subscribed to Surabhi Private Market Insights!');
    setEmail('');
  };

  return (
    <footer className="bg-navy-900 border-t border-gold-500/20 text-slate-300">
      
      {/* Top Banner Callout */}
      <div className="bg-navy-800/60 border-b border-white/5 py-10 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <h3 className="font-serif text-2xl font-bold text-white mb-2">
              Seeking Off-Market Luxury Properties & Private Advisory?
            </h3>
            <p className="text-slate-400 text-sm">
              Connect directly with our senior luxury real estate advisors for confidential portfolios.
            </p>
          </div>
          <a
            href="tel:+919876543210"
            className="px-6 py-3 rounded-lg gold-gradient-bg text-navy-900 font-semibold text-sm shadow-xl hover:scale-105 transition-all shrink-0 flex items-center gap-2"
          >
            <Phone className="w-4 h-4" /> Call Senior Advisor: +91 98765 43210
          </a>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        
        {/* Col 1: Brand Info */}
        <div className="lg:col-span-2 space-y-5">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl gold-gradient-bg flex items-center justify-center shadow-lg">
              <Building2 className="w-6 h-6 text-navy-900" />
            </div>
            <div>
              <span className="font-serif text-2xl font-bold text-white block leading-none">
                SURABHI
              </span>
              <span className="text-[10px] tracking-[0.2em] text-gold-400 uppercase font-medium">
                LUXURY REALTY
              </span>
            </div>
          </Link>

          <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
            Surabhi Luxury Real Estate Advisory is India's leading bespoke agency representing ultra-exclusive penthouses, oceanfront villas, architectural estates, and landmark commercial developments.
          </p>

          <div className="space-y-2.5 text-sm text-slate-300 pt-2">
            <div className="flex items-center gap-3">
              <MapPin className="w-4 h-4 text-gold-400 shrink-0" />
              <span>Headquarters: Pali Hill Promenade, Bandra West, Mumbai 400050</span>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="w-4 h-4 text-gold-400 shrink-0" />
              <span>+91 98765 43210 / +91 22 6700 8899</span>
            </div>
            <div className="flex items-center gap-3">
              <Mail className="w-4 h-4 text-gold-400 shrink-0" />
              <span>advisory@surabhirealtor.com</span>
            </div>
          </div>

          <div className="flex items-center gap-3 pt-2">
            {[
              { icon: Instagram, href: '#' },
              { icon: Facebook, href: '#' },
              { icon: Linkedin, href: '#' },
              { icon: Youtube, href: '#' },
            ].map((social, i) => {
              const IconComponent = social.icon;
              return (
                <a
                  key={i}
                  href={social.href}
                  className="w-9 h-9 rounded-lg bg-navy-800 border border-white/10 hover:border-gold-400 hover:text-gold-400 flex items-center justify-center transition-all"
                >
                  <IconComponent className="w-4 h-4" />
                </a>
              );
            })}
          </div>
        </div>

        {/* Col 2: Navigation Links */}
        <div className="space-y-4">
          <h4 className="font-serif text-lg font-semibold text-white border-b border-gold-500/30 pb-2 inline-block">
            Quick Links
          </h4>
          <ul className="space-y-2.5 text-sm">
            {[
              { label: 'Featured Properties', path: '/properties' },
              { label: 'Ongoing Developments', path: '/projects' },
              { label: 'Company Profile & Story', path: '/about' },
              { label: 'Market Insights & News', path: '/blogs' },
              { label: 'Private Advisory Team', path: '/about' },
              { label: 'Schedule Consultation', path: '/contact' },
            ].map((link, idx) => (
              <li key={idx}>
                <Link to={link.path} className="hover:text-gold-400 transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-gold-400 opacity-60" /> {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Col 4: Newsletter Signup */}
        <div className="space-y-4">
          <h4 className="font-serif text-lg font-semibold text-white border-b border-gold-500/30 pb-2 inline-block">
            Private Market Dispatch
          </h4>
          <p className="text-sm text-slate-400">
            Subscribe to receive monthly curated off-market portfolios and real estate legal insights.
          </p>

          <form onSubmit={handleSubscribe} className="space-y-2.5">
            <input
              type="email"
              required
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg bg-navy-800 border border-white/10 text-white text-sm focus:outline-none focus:border-gold-400 transition-colors"
            />
            <button
              type="submit"
              className="w-full py-2.5 rounded-lg gold-gradient-bg text-navy-900 font-semibold text-sm shadow-md hover:scale-[1.02] transition-transform flex items-center justify-center gap-2"
            >
              {subscribed ? <CheckCircle2 className="w-4 h-4" /> : null}
              {subscribed ? 'Subscribed!' : 'Subscribe Newsletter'}
            </button>
          </form>
          <span className="text-[11px] text-slate-500 block flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-gold-400" /> 100% Confidentiality Assured
          </span>
        </div>

      </div>

      {/* Bottom Legal Copyright Strip */}
      <div className="border-t border-white/10 py-6 px-4 text-xs text-slate-400 text-center md:flex md:justify-between max-w-7xl mx-auto">
        <p>© 2026 Surabhi Luxury Real Estate Advisory Ltd. All rights reserved.</p>
        <div className="flex justify-center gap-6 mt-3 md:mt-0">
          <Link to="/about" className="hover:text-gold-400">Privacy Policy</Link>
          <Link to="/about" className="hover:text-gold-400">Terms of Service</Link>
          <Link to="/about" className="hover:text-gold-400">RERA Disclaimer</Link>
          <Link to="/admin/login" className="text-gold-400 font-medium hover:underline">Admin Login</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
