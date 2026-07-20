import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import API from '../services/api';
import { useApp } from '../context/AppContext';
import { 
  MapPin, 
  Bed, 
  Bath, 
  Maximize2, 
  Sparkles, 
  CheckCircle2, 
  ShieldCheck, 
  PhoneCall, 
  ArrowLeft,
  Calendar,
  Layers,
  Calculator,
  Share2,
  Heart
} from 'lucide-react';

const PropertyDetailPage = () => {
  const { slug } = useParams();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState('');
  const [mortgageAmount, setMortgageAmount] = useState(0);
  const [downPayment, setDownPayment] = useState(0);
  const [interestRate, setInterestRate] = useState(8.5);
  const [tenureYears, setTenureYears] = useState(20);
  const [monthlyEmi, setMonthlyEmi] = useState(0);

  const { openEnquiryModal, showToast } = useApp();

  useEffect(() => {
    const fetchDetail = async () => {
      setLoading(true);
      try {
        const res = await API.get(`/properties/${slug}`);
        if (res.data.success) {
          const propData = res.data.data;
          setProperty(propData);
          setActiveImage(propData.coverImage || (propData.images && propData.images[0]));
          
          // Initial Mortgage calculation defaults
          const price = propData.price || 10000000;
          setMortgageAmount(price);
          setDownPayment(Math.round(price * 0.2));
        }
      } catch (err) {
        console.error('Error fetching property detail:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchDetail();
  }, [slug]);

  // Mortgage EMI Calculation effect
  useEffect(() => {
    if (mortgageAmount > 0) {
      const loanPrincipal = Math.max(0, mortgageAmount - downPayment);
      const monthlyRate = interestRate / 12 / 100;
      const totalMonths = tenureYears * 12;
      
      if (monthlyRate === 0) {
        setMonthlyEmi(Math.round(loanPrincipal / totalMonths));
      } else {
        const emi = (loanPrincipal * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) / 
                    (Math.pow(1 + monthlyRate, totalMonths) - 1);
        setMonthlyEmi(Math.round(emi));
      }
    }
  }, [mortgageAmount, downPayment, interestRate, tenureYears]);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: property?.title,
        url: window.location.href
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      showToast('Property link copied to clipboard!');
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 space-y-8">
        <div className="h-12 w-48 shimmer rounded-lg"></div>
        <div className="h-[450px] w-full shimmer rounded-3xl"></div>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="font-serif text-3xl font-bold text-navy-900">Property Not Found</h2>
        <p className="text-slate-500">The property you are searching for may have been sold or removed.</p>
        <Link to="/properties" className="px-6 py-2.5 rounded-lg gold-gradient-bg text-navy-900 font-bold inline-block">
          Return to All Listings
        </Link>
      </div>
    );
  }

  const imagesList = property.images && property.images.length > 0 
    ? property.images 
    : [property.coverImage];

  return (
    <div className="min-h-screen bg-pearl pb-20">
      
      {/* Top Breadcrumb Header */}
      <div className="bg-navy-900 text-white py-8 border-b border-gold-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <Link to="/properties" className="inline-flex items-center gap-1.5 text-xs text-gold-400 font-medium hover:underline mb-2">
              <ArrowLeft className="w-3.5 h-3.5" /> Back to Properties
            </Link>
            <h1 className="font-serif text-2xl sm:text-4xl font-bold tracking-tight text-white">
              {property.title}
            </h1>
            <div className="flex items-center gap-2 text-slate-300 text-xs sm:text-sm mt-1">
              <MapPin className="w-4 h-4 text-gold-400 shrink-0" />
              <span>{property.location?.address || `${property.location?.locality}, ${property.location?.city}`}</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleShare}
              className="p-2.5 rounded-lg bg-navy-800 border border-white/10 hover:border-gold-400 text-slate-300 hover:text-gold-400 transition-colors"
              title="Share Property"
            >
              <Share2 className="w-4 h-4" />
            </button>
            <button
              onClick={() => openEnquiryModal(property)}
              className="px-6 py-3 rounded-xl gold-gradient-bg text-navy-900 font-bold text-sm shadow-xl hover:scale-105 transition-all flex items-center gap-2"
            >
              <PhoneCall className="w-4 h-4" /> Request Site Visit
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 grid grid-cols-1 lg:grid-cols-3 gap-10">
        
        {/* Left Col: Gallery, Overview, Specs, Amenities, Mortgage */}
        <div className="lg:col-span-2 space-y-10">
          
          {/* Main Gallery Viewer */}
          <div className="space-y-4">
            <div className="relative h-[420px] sm:h-[500px] rounded-3xl overflow-hidden shadow-2xl bg-navy-900 border border-slate-200">
              <img
                src={activeImage || property.coverImage}
                alt={property.title}
                className="w-full h-full object-cover transition-all duration-500"
              />
              <div className="absolute top-4 left-4 flex gap-2">
                <span className="px-3.5 py-1 rounded-full gold-gradient-bg text-navy-900 text-xs font-bold shadow-md">
                  {property.purpose}
                </span>
                {property.featured && (
                  <span className="px-3.5 py-1 rounded-full bg-navy-900/90 border border-gold-500 text-gold-400 text-xs font-bold backdrop-blur-md">
                    Featured Asset
                  </span>
                )}
              </div>
            </div>

            {/* Thumbnail Strip */}
            {imagesList.length > 1 && (
              <div className="flex items-center gap-3 overflow-x-auto pb-2">
                {imagesList.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImage(img)}
                    className={`w-24 h-16 rounded-xl overflow-hidden shrink-0 border-2 transition-all ${
                      activeImage === img ? 'border-gold-500 scale-105 shadow-md' : 'border-transparent opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Key Specs Card */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
            <div>
              <span className="text-slate-400 text-[11px] uppercase font-semibold block">Asking Price</span>
              <span className="font-serif text-2xl font-bold gold-gradient-text">
                {property.priceDisplay || `₹ ${(property.price / 10000000).toFixed(2)} Cr`}
              </span>
            </div>
            <div>
              <span className="text-slate-400 text-[11px] uppercase font-semibold block">Bedrooms</span>
              <span className="font-bold text-navy-900 text-lg flex items-center justify-center gap-1 mt-1">
                <Bed className="w-4 h-4 text-gold-600" /> {property.bedrooms} BHK
              </span>
            </div>
            <div>
              <span className="text-slate-400 text-[11px] uppercase font-semibold block">Bathrooms</span>
              <span className="font-bold text-navy-900 text-lg flex items-center justify-center gap-1 mt-1">
                <Bath className="w-4 h-4 text-gold-600" /> {property.bathrooms} Baths
              </span>
            </div>
            <div>
              <span className="text-slate-400 text-[11px] uppercase font-semibold block">Carpet Area</span>
              <span className="font-bold text-navy-900 text-lg flex items-center justify-center gap-1 mt-1">
                <Maximize2 className="w-4 h-4 text-gold-600" /> {property.areaSqFt} sq.ft
              </span>
            </div>
          </div>

          {/* Overview & Description */}
          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <h3 className="font-serif text-2xl font-bold text-navy-900 border-b border-slate-100 pb-3">
              Property Description & Highlights
            </h3>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed whitespace-pre-line">
              {property.description}
            </p>
          </div>

          {/* Amenities Checklist */}
          {property.amenities && property.amenities.length > 0 && (
            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
              <h3 className="font-serif text-2xl font-bold text-navy-900 border-b border-slate-100 pb-3">
                Exclusive Amenities & Features
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {property.amenities.map((amenity, idx) => (
                  <div key={idx} className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs font-semibold text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-gold-600 shrink-0" />
                    <span>{amenity}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Mortgage EMI Estimator */}
          <div className="bg-navy-900 text-white p-8 rounded-2xl border border-gold-500/30 shadow-xl space-y-6">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center gap-2">
                <Calculator className="w-5 h-5 text-gold-400" />
                <h3 className="font-serif text-2xl font-bold">Mortgage EMI Estimator</h3>
              </div>
              <span className="text-xs text-gold-400 font-mono">Indicative Financial Calculator</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm">
              <div>
                <label className="text-xs text-slate-400 font-semibold uppercase block mb-1">
                  Property Value: ₹ {(mortgageAmount).toLocaleString('en-IN')}
                </label>
                <input
                  type="range"
                  min={1000000}
                  max={500000000}
                  step={1000000}
                  value={mortgageAmount}
                  onChange={(e) => setMortgageAmount(Number(e.target.value))}
                  className="w-full accent-gold-500"
                />
              </div>

              <div>
                <label className="text-xs text-slate-400 font-semibold uppercase block mb-1">
                  Down Payment: ₹ {(downPayment).toLocaleString('en-IN')}
                </label>
                <input
                  type="range"
                  min={0}
                  max={mortgageAmount}
                  step={500000}
                  value={downPayment}
                  onChange={(e) => setDownPayment(Number(e.target.value))}
                  className="w-full accent-gold-500"
                />
              </div>

              <div>
                <label className="text-xs text-slate-400 font-semibold uppercase block mb-1">
                  Interest Rate: {interestRate}% p.a.
                </label>
                <input
                  type="range"
                  min={6}
                  max={14}
                  step={0.1}
                  value={interestRate}
                  onChange={(e) => setInterestRate(Number(e.target.value))}
                  className="w-full accent-gold-500"
                />
              </div>

              <div>
                <label className="text-xs text-slate-400 font-semibold uppercase block mb-1">
                  Loan Tenure: {tenureYears} Years
                </label>
                <input
                  type="range"
                  min={5}
                  max={30}
                  step={1}
                  value={tenureYears}
                  onChange={(e) => setTenureYears(Number(e.target.value))}
                  className="w-full accent-gold-500"
                />
              </div>
            </div>

            {/* Estimated EMI Output Box */}
            <div className="p-4 rounded-xl bg-navy-800 border border-gold-500/40 flex items-center justify-between">
              <div>
                <span className="text-xs text-slate-400 block font-semibold uppercase">Estimated Monthly Installment</span>
                <span className="font-serif text-3xl font-bold gold-gradient-text">
                  ₹ {monthlyEmi.toLocaleString('en-IN')} / mo
                </span>
              </div>
              <button
                onClick={() => openEnquiryModal(property)}
                className="px-4 py-2.5 rounded-lg gold-gradient-bg text-navy-900 font-bold text-xs shadow-md"
              >
                Apply for Loan Assistance
              </button>
            </div>

          </div>

        </div>

        {/* Right Col: Agent Box & Fast Enquiry */}
        <div className="space-y-6">
          
          {/* Agent Profile Box */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-lg space-y-5 sticky top-24">
            
            <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
              <div className="w-14 h-14 rounded-full gold-gradient-bg flex items-center justify-center font-serif font-bold text-navy-900 text-xl shadow-md">
                SR
              </div>
              <div>
                <h4 className="font-serif font-bold text-navy-900 text-lg">
                  {property.agent?.name || 'Surabhi Luxury Advisory'}
                </h4>
                <p className="text-xs text-gold-600 font-semibold uppercase">Senior Luxury Desk</p>
              </div>
            </div>

            <div className="space-y-3 text-xs text-slate-600">
              <div className="flex items-center justify-between">
                <span>Phone:</span>
                <a href={`tel:${property.agent?.phone || '+919876543210'}`} className="font-bold text-navy-900 hover:text-gold-600">
                  {property.agent?.phone || '+91 98765 43210'}
                </a>
              </div>
              <div className="flex items-center justify-between">
                <span>Email:</span>
                <span className="font-medium text-slate-800">{property.agent?.email || 'advisory@surabhirealtor.com'}</span>
              </div>
            </div>

            <button
              onClick={() => openEnquiryModal(property)}
              className="w-full py-3.5 rounded-xl gold-gradient-bg text-navy-900 font-bold text-sm shadow-lg hover:scale-[1.02] transition-transform flex items-center justify-center gap-2"
            >
              <PhoneCall className="w-4 h-4" /> Book Confidential Tour
            </button>

            <span className="text-[11px] text-slate-400 text-center block flex items-center justify-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-gold-600" /> RERA Registered Agent Representation
            </span>

          </div>

        </div>

      </div>

    </div>
  );
};

export default PropertyDetailPage;
