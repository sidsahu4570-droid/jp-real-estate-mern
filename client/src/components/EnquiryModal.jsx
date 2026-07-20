import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import API from '../services/api';
import { X, Building2, Send, CheckCircle2, Phone, Mail, User, Clock, ShieldCheck } from 'lucide-react';
import confetti from 'canvas-confetti';

const EnquiryModal = () => {
  const { enquiryModalOpen, enquiryPropertyContext, closeEnquiryModal, showToast } = useApp();
  
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

  useEffect(() => {
    if (enquiryPropertyContext) {
      setFormData(prev => ({
        ...prev,
        interest: `Property Tour: ${enquiryPropertyContext.title || enquiryPropertyContext.name}`,
        message: `I would like to schedule a private tour/consultation for "${enquiryPropertyContext.title || enquiryPropertyContext.name}".`
      }));
    } else {
      setFormData({
        name: '',
        email: '',
        phone: '',
        interest: 'Buy Property',
        message: 'I would like to request confidential advisory regarding luxury real estate opportunities.',
        preferredTime: 'Anytime'
      });
    }
    setSubmitted(false);
  }, [enquiryPropertyContext, enquiryModalOpen]);

  if (!enquiryModalOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = {
        ...formData,
        propertyTitle: enquiryPropertyContext?.title || enquiryPropertyContext?.name || 'General Inquiry',
        propertyId: enquiryPropertyContext?._id || null
      };

      const res = await API.post('/enquiries', payload);
      if (res.data.success) {
        setSubmitted(true);
        showToast(res.data.message || 'Enquiry submitted successfully!');
        
        // Trigger celebratory confetti animation
        confetti({
          particleCount: 60,
          spread: 70,
          origin: { y: 0.6 }
        });
      }
    } catch (err) {
      showToast(err.response?.data?.message || 'Failed to submit enquiry. Please try again.', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-navy-900/80 backdrop-blur-md transition-opacity" 
        onClick={closeEnquiryModal}
      ></div>

      {/* Modal Card */}
      <div className="relative bg-white rounded-2xl shadow-2xl border border-gold-500/40 w-full max-w-lg overflow-hidden z-10 animate-fade-in">
        
        {/* Header */}
        <div className="bg-navy-900 text-white p-6 border-b border-gold-500/30 relative">
          <button
            onClick={closeEnquiryModal}
            className="absolute top-5 right-5 p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 text-gold-400 text-xs font-semibold uppercase tracking-wider mb-1">
            <Building2 className="w-4 h-4" /> Surabhi Luxury Real Estate Desk
          </div>

          <h3 className="font-serif text-2xl font-bold">
            {enquiryPropertyContext ? 'Schedule Private Property Tour' : 'Request Private Consultation'}
          </h3>

          {enquiryPropertyContext && (
            <p className="text-xs text-gold-400 font-medium mt-1 line-clamp-1">
              Ref: {enquiryPropertyContext.title || enquiryPropertyContext.name}
            </p>
          )}
        </div>

        {/* Content Body */}
        <div className="p-6">
          {submitted ? (
            <div className="text-center py-8 space-y-4">
              <div className="w-16 h-16 rounded-full gold-gradient-bg flex items-center justify-center mx-auto shadow-xl">
                <CheckCircle2 className="w-9 h-9 text-navy-900" />
              </div>
              <h4 className="font-serif text-2xl font-bold text-navy-900">
                Thank You, {formData.name}!
              </h4>
              <p className="text-sm text-slate-600 max-w-sm mx-auto leading-relaxed">
                Your consultation request has been logged. Our Senior Luxury Advisor will reach out via telephone and WhatsApp within 2 hours.
              </p>
              <button
                onClick={closeEnquiryModal}
                className="mt-4 px-6 py-2.5 rounded-xl gold-gradient-bg text-navy-900 font-bold text-sm shadow-md"
              >
                Close Window
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Name Input */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">
                  Full Name *
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. Vikramaditya Singhania"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full pl-9 pr-4 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:border-gold-500 transition-colors"
                  />
                </div>
              </div>

              {/* Phone & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">
                    Phone Number *
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full pl-9 pr-4 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:border-gold-500 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">
                    Email Address *
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="email"
                      required
                      placeholder="name@domain.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full pl-9 pr-4 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:border-gold-500 transition-colors"
                    />
                  </div>
                </div>
              </div>

              {/* Interest & Preferred Time */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">
                    Interest Type
                  </label>
                  <select
                    value={formData.interest}
                    onChange={(e) => setFormData({ ...formData, interest: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:border-gold-500 transition-colors"
                  >
                    <option value="Buy Property">Buy Luxury Property</option>
                    <option value="Rent Property">Rent Luxury Property</option>
                    <option value="Investment Advisory">Investment Advisory</option>
                    <option value="Sell Property">List/Sell My Property</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">
                    Preferred Callback Time
                  </label>
                  <div className="relative">
                    <Clock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <select
                      value={formData.preferredTime}
                      onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
                      className="w-full pl-9 pr-3 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:border-gold-500 transition-colors"
                    >
                      <option value="Anytime">Anytime</option>
                      <option value="Morning (9 AM - 12 PM)">Morning (9 AM - 12 PM)</option>
                      <option value="Afternoon (12 PM - 4 PM)">Afternoon (12 PM - 4 PM)</option>
                      <option value="Evening (4 PM - 8 PM)">Evening (4 PM - 8 PM)</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">
                  Additional Notes / Specific Requirements
                </label>
                <textarea
                  rows="3"
                  placeholder="Mention budget range, location preferences, or specific questions..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:border-gold-500 transition-colors resize-none"
                ></textarea>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 rounded-xl gold-gradient-bg text-navy-900 font-bold text-sm shadow-xl hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2"
              >
                {loading ? (
                  <span>Sending Consultation Request...</span>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Submit Private Consultation Request</span>
                  </>
                )}
              </button>

              <span className="text-[11px] text-slate-400 text-center block flex items-center justify-center gap-1 pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-gold-600" /> Your information is kept strictly confidential under NDA.
              </span>

            </form>
          )}
        </div>

      </div>
    </div>
  );
};

export default EnquiryModal;
