import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import API from '../services/api';
import PropertyCard from '../components/PropertyCard';
import SearchFilter from '../components/SearchFilter';
import { 
  Building2, 
  Grid, 
  List, 
  SlidersHorizontal, 
  RotateCcw, 
  Sparkles,
  Inbox
} from 'lucide-react';

const PropertiesPage = () => {
  const [searchParams] = useSearchParams();
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'list'
  const [sortBy, setSortBy] = useState('newest'); // 'newest' | 'price-low' | 'price-high'

  const [activeFilters, setActiveFilters] = useState({
    purpose: searchParams.get('purpose') || 'All',
    type: searchParams.get('type') || 'All',
    city: searchParams.get('city') || 'All',
    search: searchParams.get('search') || '',
    bedrooms: searchParams.get('bedrooms') || '',
    maxPrice: searchParams.get('maxPrice') || ''
  });

  const fetchProperties = async (filters) => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (filters.purpose && filters.purpose !== 'All') params.set('purpose', filters.purpose);
      if (filters.type && filters.type !== 'All') params.set('type', filters.type);
      if (filters.city && filters.city !== 'All') params.set('city', filters.city);
      if (filters.search) params.set('search', filters.search);
      if (filters.bedrooms) params.set('bedrooms', filters.bedrooms);
      if (filters.maxPrice) params.set('maxPrice', filters.maxPrice);

      const res = await API.get(`/properties?${params.toString()}`);
      if (res.data.success) {
        setProperties(res.data.data);
      }
    } catch (err) {
      console.error('Error loading properties:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProperties(activeFilters);
  }, []);

  const handleFilterChange = (newFilters) => {
    setActiveFilters(newFilters);
    fetchProperties(newFilters);
  };

  // Sorting logic
  const sortedProperties = [...properties].sort((a, b) => {
    if (sortBy === 'price-low') return a.price - b.price;
    if (sortBy === 'price-high') return b.price - a.price;
    return new Date(b.createdAt) - new Date(a.createdAt);
  });

  return (
    <div className="min-h-screen bg-pearl pb-20">
      
      {/* Header Banner */}
      <div className="bg-navy-900 text-white py-16 px-4 relative overflow-hidden">
        <div className="max-w-7xl mx-auto text-center space-y-4 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-500/10 text-gold-400 text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" /> Prime Real Estate Directory
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-white">
            Exclusive Property Portfolio
          </h1>
          <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto">
            Discover verified sea-front penthouses, beachfront villas, architectural houses, and commercial suites.
          </p>
        </div>
      </div>

      {/* Floating Filter Bar */}
      <div className="px-4">
        <SearchFilter 
          initialFilters={activeFilters} 
          onFilterChange={handleFilterChange} 
        />
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Controls Toolbar: Result Count, Sort & View Mode */}
        <div className="flex flex-col sm:flex-row items-center justify-between bg-white p-4 rounded-xl border border-slate-200 shadow-sm mb-8 gap-4">
          <div>
            <span className="font-serif text-lg font-bold text-navy-900">
              {sortedProperties.length} Properties Available
            </span>
            <span className="text-xs text-slate-500 block">
              Showing verified listings matching your filter criteria
            </span>
          </div>

          <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
            
            {/* Sort Dropdown */}
            <div className="flex items-center gap-2 text-xs">
              <span className="text-slate-500 font-medium hidden sm:inline">Sort By:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 rounded-lg border border-slate-200 bg-slate-50 text-slate-700 font-medium focus:outline-none focus:border-gold-500"
              >
                <option value="newest">Newest Listed</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>

            {/* Grid vs List Mode Toggle */}
            <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg border border-slate-200">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded ${viewMode === 'grid' ? 'bg-navy-900 text-gold-400' : 'text-slate-500 hover:text-slate-800'}`}
                title="Grid View"
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-1.5 rounded ${viewMode === 'list' ? 'bg-navy-900 text-gold-400' : 'text-slate-500 hover:text-slate-800'}`}
                title="List View"
              >
                <List className="w-4 h-4" />
              </button>
            </div>

          </div>
        </div>

        {/* Listings Grid / Empty state */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <div key={n} className="h-96 rounded-2xl shimmer"></div>
            ))}
          </div>
        ) : sortedProperties.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl border border-slate-200 p-8 space-y-4 max-w-md mx-auto">
            <Inbox className="w-12 h-12 text-slate-300 mx-auto" />
            <h3 className="font-serif text-xl font-bold text-navy-900">No Matching Properties Found</h3>
            <p className="text-sm text-slate-500">
              Try adjusting your filter criteria or clearing search terms to see available properties.
            </p>
            <button
              onClick={() => handleFilterChange({ purpose: 'All', type: 'All', city: 'All', search: '', bedrooms: '', maxPrice: '' })}
              className="px-5 py-2.5 rounded-lg gold-gradient-bg text-navy-900 font-bold text-xs shadow-md"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <div className={
            viewMode === 'grid'
              ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              : "grid grid-cols-1 gap-6 max-w-4xl mx-auto"
          }>
            {sortedProperties.map((property) => (
              <PropertyCard key={property._id} property={property} />
            ))}
          </div>
        )}

      </div>

    </div>
  );
};

export default PropertiesPage;
