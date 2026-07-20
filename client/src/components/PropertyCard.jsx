import React from 'react';
import { Link } from 'react-router-dom';
import { 
  MapPin, 
  Bed, 
  Bath, 
  Maximize2, 
  Sparkles, 
  CheckCircle2, 
  PhoneCall, 
  ArrowRight 
} from 'lucide-react';
import { useApp } from '../context/AppContext';

const PropertyCard = ({ property }) => {
  const { openEnquiryModal } = useApp();

  if (!property) return null;

  const {
    _id,
    title,
    slug,
    type,
    purpose,
    priceDisplay,
    location,
    bedrooms,
    bathrooms,
    areaSqFt,
    coverImage,
    images,
    featured,
    verified,
    possessionStatus
  } = property;

  const displayImg = coverImage || (images && images[0]) || 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80';

  return (
    <div className="group bg-white rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-2xl hover:border-gold-500/50 transition-all duration-300 overflow-hidden flex flex-col h-full">
      
      {/* Property Image & Badges */}
      <div className="relative h-60 w-full overflow-hidden bg-slate-900">
        <img
          src={displayImg}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-900/80 via-transparent to-black/20"></div>

        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-2">
          <span className="px-3 py-1 rounded-full bg-navy-900/90 text-gold-400 text-xs font-semibold backdrop-blur-md border border-gold-500/40">
            {purpose}
          </span>
          {featured && (
            <span className="px-3 py-1 rounded-full gold-gradient-bg text-navy-900 text-xs font-bold shadow-md flex items-center gap-1">
              <Sparkles className="w-3 h-3" /> Featured
            </span>
          )}
        </div>

        {/* Verified Badge */}
        {verified && (
          <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-emerald-500/90 text-white text-[11px] font-medium backdrop-blur-md flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3" /> Verified
          </div>
        )}

        {/* Bottom Image Overlay: Price Tag & Type */}
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white">
          <div className="font-serif text-xl font-bold gold-gradient-text drop-shadow">
            {priceDisplay || `₹ ${(property.price / 10000000).toFixed(2)} Cr`}
          </div>
          <span className="text-xs bg-white/20 backdrop-blur-md px-2.5 py-1 rounded-md text-slate-200">
            {type}
          </span>
        </div>

      </div>

      {/* Property Details Body */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        
        <div>
          <div className="flex items-center gap-1.5 text-slate-500 text-xs font-medium mb-1.5">
            <MapPin className="w-3.5 h-3.5 text-gold-600 shrink-0" />
            <span>{location?.locality}, {location?.city}</span>
          </div>

          <Link to={`/properties/${slug || _id}`}>
            <h3 className="font-serif text-lg font-bold text-navy-900 group-hover:text-gold-600 transition-colors line-clamp-1">
              {title}
            </h3>
          </Link>

          <p className="text-xs text-slate-500 mt-1 font-medium">
            Possession: <span className="text-slate-800 font-semibold">{possessionStatus || 'Ready to Move'}</span>
          </p>
        </div>

        {/* Specs Grid Icons */}
        <div className="grid grid-cols-3 gap-2 py-3 px-3 rounded-xl bg-slate-50 border border-slate-100 text-xs font-medium text-slate-700">
          <div className="flex items-center gap-1.5">
            <Bed className="w-4 h-4 text-gold-600 shrink-0" />
            <span>{bedrooms > 0 ? `${bedrooms} BHK` : 'Studio'}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Bath className="w-4 h-4 text-gold-600 shrink-0" />
            <span>{bathrooms} Baths</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Maximize2 className="w-4 h-4 text-gold-600 shrink-0" />
            <span>{areaSqFt} sq.ft</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 pt-2 border-t border-slate-100">
          <Link
            to={`/properties/${slug || _id}`}
            className="flex-1 py-2.5 rounded-lg bg-navy-900 text-white hover:bg-navy-800 font-semibold text-xs text-center transition-colors flex items-center justify-center gap-1"
          >
            <span>View Details</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
          <button
            onClick={() => openEnquiryModal(property)}
            className="p-2.5 rounded-lg border border-gold-500/40 text-gold-600 hover:bg-gold-500/10 font-semibold text-xs transition-colors flex items-center justify-center"
            title="Request Callback"
          >
            <PhoneCall className="w-4 h-4" />
          </button>
        </div>

      </div>

    </div>
  );
};

export default PropertyCard;
