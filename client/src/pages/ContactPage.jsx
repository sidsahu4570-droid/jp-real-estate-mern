import React, { useState } from 'react';
import API from '../services/api';
import { useApp } from '../context/AppContext';
import { 
  Building2, 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Send, 
  ShieldCheck, 
  CheckCircle2, 
  Sparkles 
} from 'lucide-react';
import confetti from 'canvas-confetti';

const ContactPage = () => {
  const { showToast } = useApp();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    interest: 'Buy Property',
    message: '',
    preferredTime: 'Anytime'
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await API.post('/enquiries', {
        ...formData,
        propertyTitle: 'General Contact Inquiry'
      });
      if (res.data.success) {
        setSubmitted(true);
        showToast(res.data.message || 'Enquiry received successfully!');
        confetti({ particleCount: 50, origin: { y: 0.6 } });
      }
    } catch (err) {
      showToast(err.response?.data?.message || 'Failed to submit contact request.', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-pearl pb-20">
      
      {/* Header Banner */}
      <div className="bg-navy-900 text-white py-16 px-4 relative overflow-hidden">
        <div className="max-w-7xl mx-auto text-center space-y-4 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-500/10 text-gold-400 text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" /> Confidential Advisory Desk
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-white">
            Contact Surabhi Luxury Realty
          </h1>
          <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto">
            Connect with our principal advisors for confidential penthouse listings, private site tours, or property management.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 grid grid-cols-1 lg:grid-cols-3 gap-12">
        
        {/* Left Column: Office Footprints */}
        <div className="space-y-8">
          <div>
            <h3 className="font-serif text-2xl font-bold text-navy-900 mb-2">Private Advisory Offices</h3>
            <p className="text-sm text-slate-500">Visit our private lounges in prime metropolitan centers.</p>
          </div>

          <div className="space-y-4">
            {[
              {
                city: 'Mumbai Headquarters',
                address: 'Pali Hill Promenade, Bandra West, Mumbai 400050',
                phone: '+91 98200 11223',
                email: 'mumbai@surabhirealtor.com'
              },
              {
                city: 'Goa Coastal Desk',
                address: 'Beachfront Quarter, Candolim, North Goa 403515',
                phone: '+91 98900 44556',
                email: 'goa@surabhirealtor.com'
              },
              {
                city: 'NCR Regional Office',
                address: 'Golf Course Extension Road, Sector 65, Gurugram 122018',
                phone: '+91 98111 88990',
                email: 'ncr@surabhirealtor.com'
              }
            ].map((office, idx) => (
              <div key={idx} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-2">
                <h4 className="font-serif font-bold text-navy-900 text-lg flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-gold-600" /> {office.city}
                </h4>
                <p className="text-xs text-slate-600 flex items-start gap-2">
                  <MapPin className="w-3.5 h-3.5 text-gold-600 shrink-0 mt-0.5" /> {office.address}
                </p>
                <div className="pt-2 text-xs text-slate-700 space-y-1 font-medium">
                  <div className="flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 text-gold-600" /> {office.phone}
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="w-3.5 h-3.5 text-gold-600" /> {office.email}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Contact Form */}
        <div className="lg:col-span-2">
          <div className="bg-white p-8 sm:p-12 rounded-3xl border border-slate-200 shadow-xl space-y-6">
            
            <div>
              <h3 className="font-serif text-3xl font-bold text-navy-900">Send an Online Enquiry</h3>
              <p className="text-sm text-slate-500 mt-1">
                Fill in your contact details below and our senior advisor will contact you shortly.
              </p>
            </div>

            {submitted ? (
              <div className="text-center py-12 space-y-4">
                <div className="w-16 h-16 rounded-full gold-gradient-bg flex items-center justify-center mx-auto shadow-xl">
                  <CheckCircle2 className="w-9 h-9 text-navy-900" />
                </div>
                <h4 className="font-serif text-2xl font-bold text-navy-900">Enquiry Received!</h4>
                <p className="text-slate-600 text-sm max-w-md mx-auto">
                  Thank you, {formData.name}. Our luxury advisory desk will contact you at {formData.phone} shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Vikramaditya Singhania"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-gold-500 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-gold-500 transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="name@domain.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-gold-500 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">
                      Primary Interest
                    </label>
                    <select
                      value={formData.interest}
                      onChange={(e) => setFormData({ ...formData, interest: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-gold-500 transition-colors"
                    >
                      <option value="Buy Property">Buy Luxury Penthouse / Villa</option>
                      <option value="Rent Property">Rent High-End Commercial Suite</option>
                      <option value="Investment Advisory">Bespoke Real Estate Advisory</option>
                      <option value="Sell Property">List & Sell My Property</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">
                    Message / Preferred Requirements
                  </label>
                  <textarea
                    rows="4"
                    placeholder="Provide details about your preferred location, BHK size, or timeline..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-gold-500 transition-colors resize-none"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 rounded-xl gold-gradient-bg text-navy-900 font-bold text-base shadow-xl hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2"
                >
                  {loading ? 'Submitting Enquiry...' : (
                    <>
                      <Send className="w-5 h-5" /> Submit Enquiry Request
                    </>
                  )}
                </button>

                <span className="text-[11px] text-slate-400 text-center block flex items-center justify-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-gold-600" /> Confidentiality guaranteed under NDA agreement.
                </span>

              </form>
            )}

          </div>
        </div>

      </div>

    </div>
  );
};

export default ContactPage;
