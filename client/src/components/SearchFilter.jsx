import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Search, 
  MapPin, 
  Home, 
  Bed, 
  RotateCcw
} from 'lucide-react';

const SearchFilter = ({ initialFilters = {}, onFilterChange }) => {
  const navigate = useNavigate();
  const [purpose, setPurpose] = useState(initialFilters.purpose || 'For Sale');
  const [search, setSearch] = useState(initialFilters.search || '');
  const [type, setType] = useState(initialFilters.type || 'All');
  const [city, setCity] = useState(initialFilters.city || 'All');
  const [bedrooms, setBedrooms] = useState(initialFilters.bedrooms || '');
  const [maxPrice, setMaxPrice] = useState(initialFilters.maxPrice || '');

  // Sync internal filter state when initialFilters prop changes
  useEffect(() => {
    setPurpose(initialFilters.purpose || 'For Sale');
    setSearch(initialFilters.search || '');
    setType(initialFilters.type || 'All');
    setCity(initialFilters.city || 'All');
    setBedrooms(initialFilters.bedrooms || '');
    setMaxPrice(initialFilters.maxPrice || '');
  }, [
    initialFilters.purpose, 
    initialFilters.search, 
    initialFilters.type, 
    initialFilters.city, 
    initialFilters.bedrooms, 
    initialFilters.maxPrice
  ]);

  const applyFilters = (overrideValues = {}) => {
    const filters = {
      purpose: overrideValues.purpose !== undefined ? overrideValues.purpose : purpose,
      search: overrideValues.search !== undefined ? overrideValues.search : search,
      type: overrideValues.type !== undefined ? overrideValues.type : type,
      city: overrideValues.city !== undefined ? overrideValues.city : city,
      bedrooms: overrideValues.bedrooms !== undefined ? overrideValues.bedrooms : bedrooms,
      maxPrice: overrideValues.maxPrice !== undefined ? overrideValues.maxPrice : maxPrice
    };

    if (onFilterChange) {
      onFilterChange(filters);
    } else {
      const queryParams = new URLSearchParams();
      if (filters.purpose && filters.purpose !== 'All') queryParams.set('purpose', filters.purpose);
      if (filters.search) queryParams.set('search', filters.search);
      if (filters.type && filters.type !== 'All') queryParams.set('type', filters.type);
      if (filters.city && filters.city !== 'All') queryParams.set('city', filters.city);
      if (filters.bedrooms) queryParams.set('bedrooms', filters.bedrooms);
      if (filters.maxPrice) queryParams.set('maxPrice', filters.maxPrice);

      navigate(`/properties?${queryParams.toString()}`);
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    applyFilters();
  };

  const handlePurposeChange = (newPurpose) => {
    setPurpose(newPurpose);
    applyFilters({ purpose: newPurpose });
  };

  const handleTypeChange = (newType) => {
    setType(newType);
    applyFilters({ type: newType });
  };

  const handleCityChange = (newCity) => {
    setCity(newCity);
    applyFilters({ city: newCity });
  };

  const handleBedroomsChange = (newBedrooms) => {
    setBedrooms(newBedrooms);
    applyFilters({ bedrooms: newBedrooms });
  };

  const handleReset = () => {
    setPurpose('For Sale');
    setSearch('');
    setType('All');
    setCity('All');
    setBedrooms('');
    setMaxPrice('');
    
    const resetObj = { purpose: 'For Sale', search: '', type: 'All', city: 'All', bedrooms: '', maxPrice: '' };
    if (onFilterChange) {
      onFilterChange(resetObj);
    } else {
      navigate('/properties');
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto bg-navy-900/95 border border-gold-500/30 rounded-2xl shadow-2xl backdrop-blur-xl p-4 sm:p-6 text-white transform -translate-y-6 sm:-translate-y-12 z-30 relative">
      
      {/* Purpose Tabs (Buy / Rent) */}
      <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-5">
        <div className="flex items-center gap-2 bg-navy-800 p-1 rounded-xl border border-white/10">
          {['For Sale', 'For Rent'].map((p) => (
            <button
              key={p}
              type="button"
              onClick={() => handlePurposeChange(p)}
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
            onChange={(e) => handleTypeChange(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-lg bg-navy-800 border border-white/15 text-white text-sm focus:outline-none focus:border-gold-400 transition-colors cursor-pointer"
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
            onChange={(e) => handleCityChange(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-lg bg-navy-800 border border-white/15 text-white text-sm focus:outline-none focus:border-gold-400 transition-colors cursor-pointer"
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
            onChange={(e) => handleBedroomsChange(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-lg bg-navy-800 border border-white/15 text-white text-sm focus:outline-none focus:border-gold-400 transition-colors cursor-pointer"
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
