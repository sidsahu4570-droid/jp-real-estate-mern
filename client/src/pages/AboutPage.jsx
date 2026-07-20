import React from 'react';
import { Sparkles, Building2, ShieldCheck, Award, Users, CheckCircle2, PhoneCall } from 'lucide-react';
import { useApp } from '../context/AppContext';

const AboutPage = () => {
  const { openEnquiryModal } = useApp();

  return (
    <div className="min-h-screen bg-pearl pb-20">
      
      {/* Header Banner */}
      <div className="bg-navy-900 text-white py-16 px-4 relative overflow-hidden">
        <div className="max-w-7xl mx-auto text-center space-y-4 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-500/10 text-gold-400 text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" /> Corporate Profile & Heritage
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-white">
            About Surabhi Luxury Realty
          </h1>
          <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto">
            India’s leading bespoke real estate advisory firm representing ultra-exclusive penthouses, oceanfront villas, and flagship corporate headquarters.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 space-y-20">
        
        {/* Story Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-500/10 text-gold-600 text-xs font-semibold uppercase tracking-wider">
              <Award className="w-3.5 h-3.5" /> Established Excellence
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-navy-900 leading-tight">
              Eighteen Years of Discreet High-Value Real Estate Representation
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Founded with a commitment to integrity and luxury representation, Surabhi Luxury Realty has engineered landmark property transactions exceeding ₹ 4,800 Crores across Mumbai, Goa, Gurugram, and Bengaluru.
            </p>
            <p className="text-slate-600 text-sm leading-relaxed">
              We specialize in off-market acquisitions for High-Net-Worth Individuals (HNWIs), Ultra-HNWIs, family offices, and corporate leaders who require discretion, legal rigor, and unmatched market access.
            </p>
          </div>

          <div className="relative">
            <div className="rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
              <img
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80"
                alt="Surabhi Advisory Desk"
                className="w-full h-[400px] object-cover"
              />
            </div>
          </div>
        </div>

        {/* Core Pillars */}
        <div className="bg-navy-900 text-white rounded-3xl p-10 sm:p-14 border border-gold-500/30 shadow-2xl space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h3 className="font-serif text-3xl font-bold text-white">Our Core Advisory Pillars</h3>
            <p className="text-slate-400 text-sm">Guided by uncompromising standards of legal clarity and privacy.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Confidentiality & Privacy',
                desc: 'All off-market penthouses and sea-front estates are handled under strict NDA guidelines to protect client identity.'
              },
              {
                title: '360-Degree Legal Protection',
                desc: 'Every listed asset undergoes 30-year title searches, RERA compliance checks, and structural audits before presentation.'
              },
              {
                title: 'Bespoke Wealth Preservation',
                desc: 'We structure transactions to maximize capital appreciation and long-term asset security for multi-generational wealth.'
              }
            ].map((pillar, idx) => (
              <div key={idx} className="bg-navy-800 p-6 rounded-2xl border border-white/10 space-y-3">
                <div className="w-10 h-10 rounded-lg gold-gradient-bg flex items-center justify-center font-bold text-navy-900 font-serif">
                  0{idx + 1}
                </div>
                <h4 className="font-serif text-xl font-bold text-white">{pillar.title}</h4>
                <p className="text-xs text-slate-300 leading-relaxed">{pillar.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Executive Leadership Team */}
        <div className="space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h3 className="font-serif text-3xl font-bold text-navy-900">Executive Leadership Desk</h3>
            <p className="text-slate-500 text-sm">Seasoned professionals leading India’s luxury real estate sector.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: 'Aditya Surabhi',
                role: 'Founder & Principal Advisor',
                img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
                bio: '18+ years of experience representing sea-front sky mansions and luxury developments.'
              },
              {
                name: 'Meera Singhania',
                role: 'Head of Legal & Title Due Diligence',
                img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
                bio: 'Specialist in RERA regulations, high-value conveyancing, and property title security.'
              },
              {
                name: 'Devraj Merchant',
                role: 'Senior Vice President - Commercial & Estates',
                img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
                bio: 'Manages Grade-A commercial leasing and private estate transactions in NCR and Goa.'
              }
            ].map((member, idx) => (
              <div key={idx} className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden text-center p-6 space-y-4">
                <div className="w-24 h-24 rounded-full mx-auto p-1 gold-gradient-bg shadow-lg overflow-hidden">
                  <img src={member.img} alt={member.name} className="w-full h-full object-cover rounded-full" />
                </div>
                <div>
                  <h4 className="font-serif text-xl font-bold text-navy-900">{member.name}</h4>
                  <p className="text-xs text-gold-600 font-semibold">{member.role}</p>
                </div>
                <p className="text-xs text-slate-500">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-r from-navy-900 to-navy-800 text-white rounded-3xl p-10 text-center space-y-4 shadow-xl">
          <h3 className="font-serif text-3xl font-bold">Connect With Our Senior Advisory Desk</h3>
          <p className="text-slate-300 text-sm max-w-xl mx-auto">
            Schedule a confidential consultation to explore off-market penthouses or list your landmark property.
          </p>
          <button
            onClick={() => openEnquiryModal()}
            className="px-8 py-3.5 rounded-xl gold-gradient-bg text-navy-900 font-bold text-sm shadow-xl hover:scale-105 transition-all inline-flex items-center gap-2"
          >
            <PhoneCall className="w-4 h-4" /> Book Consultation Call
          </button>
        </div>

      </div>

    </div>
  );
};

export default AboutPage;
