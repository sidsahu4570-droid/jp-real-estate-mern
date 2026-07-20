import React, { useState, useEffect } from 'react';
import API from '../../services/api';
import AdminLayout from '../../components/AdminLayout';
import { useApp } from '../../context/AppContext';
import { 
  Plus, 
  Edit3, 
  Trash2, 
  Sparkles, 
  Search, 
  X, 
  CheckCircle2, 
  Building2,
  MapPin,
  Bed,
  Bath,
  Maximize2
} from 'lucide-react';

const emptyProperty = {
  title: '',
  type: 'Apartment',
  purpose: 'For Sale',
  price: 15000000,
  priceDisplay: '₹ 1.5 Cr',
  location: { city: 'Mumbai', locality: 'Bandra West', address: '' },
  bedrooms: 3,
  bathrooms: 3,
  areaSqFt: 2200,
  coverImage: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
  images: ['https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80'],
  featured: true,
  possessionStatus: 'Ready to Move',
  description: 'Ultra-luxury penthouse featuring panoramic skyline views, private elevator, and Italian marble finishes.'
};

const AdminProperties = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formState, setFormState] = useState(emptyProperty);
  const [saving, setSaving] = useState(false);

  const { showToast } = useApp();

  const fetchProperties = async () => {
    setLoading(true);
    try {
      const res = await API.get('/properties');
      if (res.data.success) {
        setProperties(res.data.data);
      }
    } catch (err) {
      showToast('Error loading property list.', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  const handleOpenAdd = () => {
    setEditingId(null);
    setFormState(emptyProperty);
    setModalOpen(true);
  };

  const handleOpenEdit = (prop) => {
    setEditingId(prop._id);
    setFormState({
      title: prop.title || '',
      type: prop.type || 'Apartment',
      purpose: prop.purpose || 'For Sale',
      price: prop.price || 10000000,
      priceDisplay: prop.priceDisplay || '',
      location: prop.location || { city: 'Mumbai', locality: '', address: '' },
      bedrooms: prop.bedrooms || 0,
      bathrooms: prop.bathrooms || 0,
      areaSqFt: prop.areaSqFt || 1000,
      coverImage: prop.coverImage || '',
      images: prop.images || [],
      featured: prop.featured || false,
      possessionStatus: prop.possessionStatus || 'Ready to Move',
      description: prop.description || ''
    });
    setModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this property listing?')) return;
    try {
      const res = await API.delete(`/properties/${id}`);
      if (res.data.success) {
        showToast('Property deleted successfully!');
        fetchProperties();
      }
    } catch (err) {
      showToast('Failed to delete property.', 'error');
    }
  };

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (editingId) {
        const res = await API.put(`/properties/${editingId}`, formState);
        if (res.data.success) {
          showToast('Property updated successfully!');
          setModalOpen(false);
          fetchProperties();
        }
      } else {
        const res = await API.post('/properties', formState);
        if (res.data.success) {
          showToast('New property created successfully!');
          setModalOpen(false);
          fetchProperties();
        }
      }
    } catch (err) {
      showToast(err.response?.data?.message || 'Failed to save property.', 'error');
    } finally {
      setSaving(false);
    }
  };

  const filteredProperties = properties.filter((p) =>
    p.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.location?.locality?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.location?.city?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <AdminLayout title="Property Listings Manager">
      <div className="space-y-6">
        
        {/* Top Action Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              placeholder="Search properties by title or location..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-gold-500"
            />
          </div>

          <button
            onClick={handleOpenAdd}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl gold-gradient-bg text-navy-900 font-bold text-xs shadow-md flex items-center justify-center gap-2"
          >
            <Plus className="w-4 h-4" /> Add New Property
          </button>
        </div>

        {/* Properties Table / Grid */}
        {loading ? (
          <div className="h-64 shimmer rounded-2xl"></div>
        ) : (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50 text-slate-500 uppercase font-semibold">
                    <th className="py-3.5 px-4">Property</th>
                    <th className="py-3.5 px-4">Type & Purpose</th>
                    <th className="py-3.5 px-4">Price</th>
                    <th className="py-3.5 px-4">Specs</th>
                    <th className="py-3.5 px-4">Featured</th>
                    <th className="py-3.5 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  {filteredProperties.map((p) => (
                    <tr key={p._id} className="hover:bg-slate-50 transition-colors">
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={p.coverImage || 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=200&q=80'}
                            alt=""
                            className="w-12 h-12 rounded-lg object-cover shrink-0"
                          />
                          <div>
                            <span className="font-serif font-bold text-navy-900 block text-sm line-clamp-1">{p.title}</span>
                            <span className="text-[11px] text-slate-400 flex items-center gap-1">
                              <MapPin className="w-3 h-3 text-gold-600" /> {p.location?.locality}, {p.location?.city}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="font-semibold text-slate-800 block">{p.type}</span>
                        <span className="text-[10px] text-slate-400 uppercase font-bold">{p.purpose}</span>
                      </td>
                      <td className="py-3.5 px-4 font-serif font-bold text-navy-900 text-sm">
                        {p.priceDisplay || `₹ ${(p.price / 10000000).toFixed(2)} Cr`}
                      </td>
                      <td className="py-3.5 px-4 text-slate-500">
                        {p.bedrooms} BHK | {p.bathrooms} Baths | {p.areaSqFt} sq.ft
                      </td>
                      <td className="py-3.5 px-4">
                        {p.featured ? (
                          <span className="px-2.5 py-1 rounded-full gold-gradient-bg text-navy-900 text-[10px] font-bold">
                            Featured
                          </span>
                        ) : (
                          <span className="text-[10px] text-slate-400">Standard</span>
                        )}
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => handleOpenEdit(p)}
                            className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700"
                            title="Edit"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(p._id)}
                            className="p-1.5 rounded-lg bg-red-50 hover:bg-red-100 text-red-600"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Add / Edit Modal Drawer */}
        {modalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="fixed inset-0 bg-navy-900/80 backdrop-blur-sm" onClick={() => setModalOpen(false)}></div>
            
            <div className="relative bg-white rounded-3xl shadow-2xl border border-gold-500/40 w-full max-w-2xl max-h-[90vh] overflow-y-auto z-10 p-6 sm:p-8 space-y-6">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <h3 className="font-serif text-2xl font-bold text-navy-900">
                  {editingId ? 'Edit Property Listing' : 'Add New Property Listing'}
                </h3>
                <button onClick={() => setModalOpen(false)} className="text-slate-400 hover:text-slate-700">
                  <X className="w-6 h-6" />
                </button>
              </div>

              <form onSubmit={handleSubmitForm} className="space-y-4 text-xs">
                
                {/* Title */}
                <div>
                  <label className="block font-semibold text-slate-700 uppercase mb-1">Property Title *</label>
                  <input
                    type="text"
                    required
                    value={formState.title}
                    onChange={(e) => setFormState({ ...formState, title: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-gold-500"
                  />
                </div>

                {/* Type & Purpose */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold text-slate-700 uppercase mb-1">Property Type</label>
                    <select
                      value={formState.type}
                      onChange={(e) => setFormState({ ...formState, type: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm"
                    >
                      <option value="Apartment">Apartment</option>
                      <option value="Villa">Villa</option>
                      <option value="Penthouse">Penthouse</option>
                      <option value="Commercial">Commercial</option>
                      <option value="Independent House">Independent House</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 uppercase mb-1">Listing Purpose</label>
                    <select
                      value={formState.purpose}
                      onChange={(e) => setFormState({ ...formState, purpose: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm"
                    >
                      <option value="For Sale">For Sale</option>
                      <option value="For Rent">For Rent</option>
                    </select>
                  </div>
                </div>

                {/* Price Numeric & Price Display */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold text-slate-700 uppercase mb-1">Raw Numeric Price (INR)</label>
                    <input
                      type="number"
                      required
                      value={formState.price}
                      onChange={(e) => setFormState({ ...formState, price: Number(e.target.value) })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 uppercase mb-1">Display Price (e.g. ₹ 3.8 Cr)</label>
                    <input
                      type="text"
                      value={formState.priceDisplay}
                      onChange={(e) => setFormState({ ...formState, priceDisplay: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm"
                    />
                  </div>
                </div>

                {/* Location: City & Locality */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold text-slate-700 uppercase mb-1">City</label>
                    <input
                      type="text"
                      required
                      value={formState.location.city}
                      onChange={(e) => setFormState({
                        ...formState,
                        location: { ...formState.location, city: e.target.value }
                      })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 uppercase mb-1">Locality / Area</label>
                    <input
                      type="text"
                      required
                      value={formState.location.locality}
                      onChange={(e) => setFormState({
                        ...formState,
                        location: { ...formState.location, locality: e.target.value }
                      })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm"
                    />
                  </div>
                </div>

                {/* Specs: BHK, Baths, SqFt */}
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block font-semibold text-slate-700 uppercase mb-1">Bedrooms</label>
                    <input
                      type="number"
                      value={formState.bedrooms}
                      onChange={(e) => setFormState({ ...formState, bedrooms: Number(e.target.value) })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 uppercase mb-1">Bathrooms</label>
                    <input
                      type="number"
                      value={formState.bathrooms}
                      onChange={(e) => setFormState({ ...formState, bathrooms: Number(e.target.value) })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 uppercase mb-1">Area (Sq Ft)</label>
                    <input
                      type="number"
                      value={formState.areaSqFt}
                      onChange={(e) => setFormState({ ...formState, areaSqFt: Number(e.target.value) })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm"
                    />
                  </div>
                </div>

                {/* Cover Image URL */}
                <div>
                  <label className="block font-semibold text-slate-700 uppercase mb-1">Cover Image URL</label>
                  <input
                    type="url"
                    required
                    value={formState.coverImage}
                    onChange={(e) => setFormState({ ...formState, coverImage: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm"
                  />
                </div>

                {/* Featured Checkbox */}
                <div className="flex items-center gap-2 pt-2">
                  <input
                    type="checkbox"
                    id="featured"
                    checked={formState.featured}
                    onChange={(e) => setFormState({ ...formState, featured: e.target.checked })}
                    className="w-4 h-4 text-gold-600 rounded"
                  />
                  <label htmlFor="featured" className="font-semibold text-slate-800">
                    Mark as Featured Asset on Homepage
                  </label>
                </div>

                {/* Description */}
                <div>
                  <label className="block font-semibold text-slate-700 uppercase mb-1">Description</label>
                  <textarea
                    rows="4"
                    value={formState.description}
                    onChange={(e) => setFormState({ ...formState, description: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm resize-none"
                  ></textarea>
                </div>

                <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => setModalOpen(false)}
                    className="px-5 py-2.5 rounded-xl bg-slate-100 text-slate-700 font-bold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={saving}
                    className="px-6 py-2.5 rounded-xl gold-gradient-bg text-navy-900 font-bold shadow-md"
                  >
                    {saving ? 'Saving...' : 'Save Property Listing'}
                  </button>
                </div>

              </form>

            </div>
          </div>
        )}

      </div>
    </AdminLayout>
  );
};

export default AdminProperties;
