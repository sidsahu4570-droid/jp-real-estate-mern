import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Building, Calendar, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useApp } from '../context/AppContext';

const ProjectCard = ({ project }) => {
  const { openEnquiryModal } = useApp();

  if (!project) return null;

  const {
    _id,
    name,
    slug,
    developer,
    location,
    status,
    priceRange,
    completionYear,
    coverImage,
    bhkTypes,
    overview
  } = project;

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden flex flex-col md:flex-row group">
      
      {/* Cover Image */}
      <div className="relative md:w-2/5 h-64 md:h-auto overflow-hidden bg-slate-900">
        <img
          src={coverImage || 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80'}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-900/80 via-transparent to-transparent md:bg-none"></div>
        <span className="absolute top-4 left-4 px-3 py-1 rounded-full gold-gradient-bg text-navy-900 text-xs font-bold shadow-md">
          {status}
        </span>
      </div>

      {/* Content */}
      <div className="p-6 md:w-3/5 flex flex-col justify-between space-y-4">
        <div>
          <div className="flex items-center gap-2 text-gold-600 text-xs font-semibold uppercase tracking-wider mb-1">
            <Building className="w-3.5 h-3.5" />
            <span>{developer}</span>
          </div>

          <h3 className="font-serif text-2xl font-bold text-navy-900 group-hover:text-gold-600 transition-colors">
            {name}
          </h3>

          <div className="flex items-center gap-2 text-slate-500 text-sm mt-1.5">
            <MapPin className="w-4 h-4 text-gold-600 shrink-0" />
            <span>{location}</span>
          </div>

          <p className="text-slate-600 text-xs sm:text-sm mt-3 line-clamp-2 leading-relaxed">
            {overview}
          </p>
        </div>

        {/* Configurations & Specs */}
        <div className="grid grid-cols-2 gap-3 py-3 px-4 rounded-xl bg-slate-50 border border-slate-100 text-xs">
          <div>
            <span className="text-slate-400 block text-[10px] uppercase font-semibold">Starting Price</span>
            <span className="font-serif font-bold text-navy-900 text-sm">{priceRange}</span>
          </div>
          <div>
            <span className="text-slate-400 block text-[10px] uppercase font-semibold">Possession Target</span>
            <span className="font-semibold text-slate-700 flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-gold-600" /> {completionYear || '2027'}
            </span>
          </div>
        </div>

        {/* BHK Badges */}
        {bhkTypes && bhkTypes.length > 0 && (
          <div className="flex flex-wrap gap-1.5 text-xs text-slate-600">
            {bhkTypes.map((type, idx) => (
              <span key={idx} className="px-2.5 py-1 rounded-md bg-navy-900/5 text-navy-900 font-medium">
                {type}
              </span>
            ))}
          </div>
        )}

        {/* Buttons */}
        <div className="flex items-center gap-3 pt-2">
          <button
            onClick={() => openEnquiryModal({ title: name, _id })}
            className="flex-1 py-2.5 rounded-lg gold-gradient-bg text-navy-900 font-bold text-xs shadow-md hover:scale-[1.01] transition-transform flex items-center justify-center gap-1.5"
          >
            <CheckCircle2 className="w-4 h-4" /> Download Brochure & Pricing
          </button>
          <Link
            to="/properties"
            className="px-4 py-2.5 rounded-lg bg-navy-900 text-white font-semibold text-xs hover:bg-navy-800 transition-colors flex items-center gap-1"
          >
            <span>Units</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

      </div>

    </div>
  );
};

export default ProjectCard;
