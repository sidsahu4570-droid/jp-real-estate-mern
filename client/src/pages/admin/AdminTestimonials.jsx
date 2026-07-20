import React, { useState, useEffect } from 'react';
import API from '../../services/api';
import AdminLayout from '../../components/AdminLayout';
import { useApp } from '../../context/AppContext';
import { Plus, Edit3, Trash2, X, Star } from 'lucide-react';

const emptyTestimonial = {
  name: '',
  role: 'Property Investor',
  location: 'Mumbai',
  rating: 5,
  quote: '',
  avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
  propertyName: 'The Grand Pavilion Penthouse'
};

const AdminTestimonials = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formState, setFormState] = useState(emptyTestimonial);
  const [saving, setSaving] = useState(false);

  const { showToast } = useApp();

  const fetchItems = async () => {
    setLoading(true);
    try {
      const res = await API.get('/testimonials');
      if (res.data.success) {
        setItems(res.data.data);
      }
    } catch (err) {
      showToast('Error loading testimonials.', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleOpenAdd = () => {
    setEditingId(null);
    setFormState(emptyTestimonial);
    setModalOpen(true);
  };

  const handleOpenEdit = (item) => {
    setEditingId(item._id);
    setFormState({
      name: item.name || '',
      role: item.role || '',
      location: item.location || '',
      rating: item.rating || 5,
      quote: item.quote || '',
      avatar: item.avatar || '',
      propertyName: item.propertyName || ''
    });
    setModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete testimonial?')) return;
    try {
      const res = await API.delete(`/testimonials/${id}`);
      if (res.data.success) {
        showToast('Testimonial deleted.');
        fetchItems();
      }
    } catch (err) {
      showToast('Failed to delete.', 'error');
    }
  };

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (editingId) {
        const res = await API.put(`/testimonials/${editingId}`, formState);
        if (res.data.success) {
          showToast('Testimonial updated!');
          setModalOpen(false);
          fetchItems();
        }
      } else {
        const res = await API.post('/testimonials', formState);
        if (res.data.success) {
          showToast('Testimonial created!');
          setModalOpen(false);
          fetchItems();
        }
      }
    } catch (err) {
      showToast('Failed to save testimonial.', 'error');
    } finally {
      setSaving(false);
    }
  };

  return (
    <AdminLayout title="Client Testimonials Manager">
      <div className="space-y-6">
        
        <div className="flex items-center justify-between bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
          <div>
            <h3 className="font-serif text-lg font-bold text-navy-900">Client Reviews</h3>
            <p className="text-xs text-slate-500">Manage client endorsements shown on homepage.</p>
          </div>
          <button
            onClick={handleOpenAdd}
            className="px-5 py-2.5 rounded-xl gold-gradient-bg text-navy-900 font-bold text-xs shadow-md flex items-center gap-2"
          >
            <Plus className="w-4 h-4" /> Add Testimonial
          </button>
        </div>

        {loading ? (
          <div className="h-64 shimmer rounded-2xl"></div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {items.map((item) => (
              <div key={item._id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img src={item.avatar} alt="" className="w-10 h-10 rounded-full object-cover" />
                    <div>
                      <h4 className="font-serif font-bold text-navy-900 text-sm">{item.name}</h4>
                      <p className="text-xs text-gold-600 font-medium">{item.role} • {item.location}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button onClick={() => handleOpenEdit(item)} className="p-1.5 rounded-lg bg-slate-100 text-slate-700"><Edit3 className="w-4 h-4" /></button>
                    <button onClick={() => handleDelete(item._id)} className="p-1.5 rounded-lg bg-red-50 text-red-600"><Trash2 className="w-4 h-4" /></button>
                  </div>
                </div>

                <p className="text-xs text-slate-600 italic">"{item.quote}"</p>
                
                {item.propertyName && (
                  <span className="text-[10px] bg-slate-100 text-slate-700 px-2.5 py-1 rounded-md font-mono inline-block">
                    Asset: {item.propertyName}
                  </span>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Modal */}
        {modalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="fixed inset-0 bg-navy-900/80 backdrop-blur-sm" onClick={() => setModalOpen(false)}></div>
            <div className="relative bg-white rounded-3xl shadow-2xl border border-gold-500/40 w-full max-w-lg p-6 space-y-4 z-10 text-xs">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h3 className="font-serif text-xl font-bold text-navy-900">{editingId ? 'Edit Testimonial' : 'Add Testimonial'}</h3>
                <button onClick={() => setModalOpen(false)}><X className="w-5 h-5 text-slate-400" /></button>
              </div>

              <form onSubmit={handleSubmitForm} className="space-y-3">
                <div>
                  <label className="block font-semibold text-slate-700 uppercase mb-1">Client Name *</label>
                  <input type="text" required value={formState.name} onChange={(e) => setFormState({ ...formState, name: e.target.value })} className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm" />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-slate-700 uppercase mb-1">Role / Title</label>
                    <input type="text" value={formState.role} onChange={(e) => setFormState({ ...formState, role: e.target.value })} className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm" />
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-700 uppercase mb-1">Location</label>
                    <input type="text" value={formState.location} onChange={(e) => setFormState({ ...formState, location: e.target.value })} className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm" />
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 uppercase mb-1">Avatar Image URL</label>
                  <input type="url" value={formState.avatar} onChange={(e) => setFormState({ ...formState, avatar: e.target.value })} className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm" />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 uppercase mb-1">Purchased Property Tag</label>
                  <input type="text" value={formState.propertyName} onChange={(e) => setFormState({ ...formState, propertyName: e.target.value })} className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm" />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 uppercase mb-1">Quote Review</label>
                  <textarea rows="3" value={formState.quote} onChange={(e) => setFormState({ ...formState, quote: e.target.value })} className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm resize-none"></textarea>
                </div>

                <div className="flex justify-end gap-3 pt-3 border-t border-slate-100">
                  <button type="button" onClick={() => setModalOpen(false)} className="px-4 py-2 rounded-lg bg-slate-100 text-slate-700 font-bold">Cancel</button>
                  <button type="submit" disabled={saving} className="px-5 py-2 rounded-lg gold-gradient-bg text-navy-900 font-bold shadow-md">{saving ? 'Saving...' : 'Save Review'}</button>
                </div>
              </form>

            </div>
          </div>
        )}

      </div>
    </AdminLayout>
  );
};

export default AdminTestimonials;
