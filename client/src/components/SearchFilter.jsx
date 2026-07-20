import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Search, 
  MapPin, 
  Home, 
  Bed, 
  SlidersHorizontal, 
  RotateCcw,
  IndianRupee 
} from 'lucide-react';

const SearchFilter = ({ initialFilters = {}, onFilterChange }) => {
  const navigate = useNavigate();
  const [purpose, setPurpose] = useState(initialFilters.purpose || 'For Sale');
  const [search, setSearch] = useState(initialFilters.search || '');
  const [type, setType] = useState(initialFilters.type || 'All');
  const [city, setCity] = useState(initialFilters.city || 'All');
  const [bedrooms, setBedrooms] = useState(initialFilters.bedrooms || '');
  const [maxPrice, setMaxPrice] = useState(initialFilters.maxPrice || '');

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const queryParams = new URLSearchParams();
    if (purpose) queryParams.set('purpose', purpose);
    if (search) queryParams.set('search', search);
    if (type && type !== 'All') queryParams.set('type', type);
    if (city && city !== 'All') queryParams.set('city', city);
    if (bedrooms) queryParams.set('bedrooms', bedrooms);
    if (maxPrice) queryParams.set('maxPrice', maxPrice);

    if (onFilterChange) {
      onFilterChange({ purpose, search, type, city, bedrooms, maxPrice });
    } else {
      navigate(`/properties?${queryParams.toString()}`);
    }
  };

  const handleReset = () => {
    setPurpose('For Sale');
    setSearch('');
    setType('All');
    setCity('All');
    setBedrooms('');
    setMaxPrice('');
    if (onFilterChange) {
      onFilterChange({ purpose: 'For Sale', search: '', type: 'All', city: 'All', bedrooms: '', maxPrice: '' });
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto bg-navy-900/90 border border-gold-500/30 rounded-2xl shadow-2xl backdrop-blur-xl p-4 sm:p-6 text-white transform -translate-y-12 z-30 relative">
      
      {/* Purpose Tabs (Buy / Rent) */}
      <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-5">
        <div className="flex items-center gap-2 bg-navy-800 p-1 rounded-xl border border-white/10">
          {['For Sale', 'For Rent'].map((p) => (
            <button
              key={p}
              type="button"
              onClick={() => setPurpose(p)}
              className={`px-6 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
                purpose === p
                  ? 'gold-gradient-bg text-navy-900 shadow-md'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              {p === 'For Sale' ? 'Buy Property' : 'Rent Property'}
            </button>
          ))}
        </div>

        <button
          type="button"
          onClick={handleReset}
          className="text-xs text-slate-400 hover:text-gold-400 flex items-center gap-1 transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" /> Clear Filters
        </button>
      </div>

      {/* Filter Form Grid */}
      <form onSubmit={handleSearchSubmit} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        
        {/* Search Input */}
        <div className="space-y-1.5">
          <label className="text-[11px] font-semibold text-gold-400 uppercase tracking-wider flex items-center gap-1">
            <Search className="w-3 h-3" /> Location / Title
          </label>
          <div className="relative">
            <input
              type="text"
              placeholder="e.g. Bandra, Goa, Penthouse"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-lg bg-navy-800 border border-white/15 text-white text-sm focus:outline-none focus:border-gold-400 transition-colors"
            />
          </div>
        </div>

        {/* Property Type Dropdown */}
        <div className="space-y-1.5">
          <label className="text-[11px] font-semibold text-gold-400 uppercase tracking-wider flex items-center gap-1">
            <Home className="w-3 h-3" /> Property Type
          </label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-lg bg-navy-800 border border-white/15 text-white text-sm focus:outline-none focus:border-gold-400 transition-colors"
          >
            <option value="All">All Property Types</option>
            <option value="Apartment">Apartment</option>
            <option value="Villa">Villa</option>
            <option value="Penthouse">Penthouse</option>
            <option value="Commercial">Commercial</option>
            <option value="Independent House">Independent House</option>
          </select>
        </div>

        {/* City Filter */}
        <div className="space-y-1.5">
          <label className="text-[11px] font-semibold text-gold-400 uppercase tracking-wider flex items-center gap-1">
            <MapPin className="w-3 h-3" /> Select City
          </label>
          <select
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-lg bg-navy-800 border border-white/15 text-white text-sm focus:outline-none focus:border-gold-400 transition-colors"
          >
            <option value="All">All Cities</option>
            <option value="Mumbai">Mumbai</option>
            <option value="Goa">Goa</option>
            <option value="Gurugram">Gurugram</option>
            <option value="Bengaluru">Bengaluru</option>
            <option value="Lonavala">Lonavala</option>
          </select>
        </div>

        {/* Bedrooms Filter */}
        <div className="space-y-1.5">
          <label className="text-[11px] font-semibold text-gold-400 uppercase tracking-wider flex items-center gap-1">
            <Bed className="w-3 h-3" /> Bedrooms (BHK)
          </label>
          <select
            value={bedrooms}
            onChange={(e) => setBedrooms(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-lg bg-navy-800 border border-white/15 text-white text-sm focus:outline-none focus:border-gold-400 transition-colors"
          >
            <option value="">Any Bedrooms</option>
            <option value="2">2+ BHK</option>
            <option value="3">3+ BHK</option>
            <option value="4">4+ BHK</option>
            <option value="5">5+ BHK Mansion</option>
          </select>
        </div>

        {/* Submit Button */}
        <div className="flex items-end">
          <button
            type="submit"
            className="w-full py-2.5 rounded-lg gold-gradient-bg text-navy-900 font-bold text-sm shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
          >
            <Search className="w-4 h-4" /> Search Properties
          </button>
        </div>

      </form>
    </div>
  );
};

export default SearchFilter;
