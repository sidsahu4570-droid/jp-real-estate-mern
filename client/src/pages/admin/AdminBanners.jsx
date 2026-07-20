import React, { useState, useEffect } from 'react';
import API from '../../services/api';
import AdminLayout from '../../components/AdminLayout';
import { useApp } from '../../context/AppContext';
import { Plus, Edit3, Trash2, X, Image as ImageIcon } from 'lucide-react';

const emptyBanner = {
  title: '',
  subtitle: '',
  badge: 'SURABHI EXCLUSIVE REALTY',
  image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=80',
  ctaText: 'Explore Portfolio',
  ctaLink: '/properties',
  active: true,
  order: 1
};

const AdminBanners = () => {
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formState, setFormState] = useState(emptyBanner);
  const [saving, setSaving] = useState(false);

  const { showToast } = useApp();

  const fetchBanners = async () => {
    setLoading(true);
    try {
      const res = await API.get('/banners');
      if (res.data.success) {
        setBanners(res.data.data);
      }
    } catch (err) {
      showToast('Error loading hero banners.', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBanners();
  }, []);

  const handleOpenAdd = () => {
    setEditingId(null);
    setFormState(emptyBanner);
    setModalOpen(true);
  };

  const handleOpenEdit = (ban) => {
    setEditingId(ban._id);
    setFormState({
      title: ban.title || '',
      subtitle: ban.subtitle || '',
      badge: ban.badge || '',
      image: ban.image || '',
      ctaText: ban.ctaText || 'Explore Portfolio',
      ctaLink: ban.ctaLink || '/properties',
      active: ban.active !== false,
      order: ban.order || 1
    });
    setModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete hero slider banner?')) return;
    try {
      const res = await API.delete(`/banners/${id}`);
      if (res.data.success) {
        showToast('Banner deleted.');
        fetchBanners();
      }
    } catch (err) {
      showToast('Failed to delete banner.', 'error');
    }
  };

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (editingId) {
        const res = await API.put(`/banners/${editingId}`, formState);
        if (res.data.success) {
          showToast('Banner updated!');
          setModalOpen(false);
          fetchBanners();
        }
      } else {
        const res = await API.post('/banners', formState);
        if (res.data.success) {
          showToast('New hero banner added!');
          setModalOpen(false);
          fetchBanners();
        }
      }
    } catch (err) {
      showToast('Failed to save banner.', 'error');
    } finally {
      setSaving(false);
    }
  };

  return (
    <AdminLayout title="Homepage Hero Banners Manager">
      <div className="space-y-6">
        
        <div className="flex items-center justify-between bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
          <div>
            <h3 className="font-serif text-lg font-bold text-navy-900">Hero Slider Banners</h3>
            <p className="text-xs text-slate-500">Manage headline slides displayed on top homepage banner.</p>
          </div>
          <button
            onClick={handleOpenAdd}
            className="px-5 py-2.5 rounded-xl gold-gradient-bg text-navy-900 font-bold text-xs shadow-md flex items-center gap-2"
          >
            <Plus className="w-4 h-4" /> Add Hero Slide
          </button>
        </div>

        {loading ? (
          <div className="h-64 shimmer rounded-2xl"></div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {banners.map((ban) => (
              <div key={ban._id} className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col justify-between">
                <div className="relative h-40 bg-slate-900">
                  <img src={ban.image} alt="" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-navy-900/60 p-4 flex flex-col justify-between text-white">
                    <span className="px-2.5 py-0.5 rounded-full bg-gold-500 text-navy-900 text-[10px] font-bold self-start">
                      {ban.badge}
                    </span>
                    <h4 className="font-serif font-bold text-base line-clamp-1">{ban.title}</h4>
                  </div>
                </div>

                <div className="p-4 flex items-center justify-between border-t border-slate-100 text-xs">
                  <span className="text-slate-500 font-medium">Link: {ban.ctaLink}</span>
                  <div className="flex items-center gap-2">
                    <button onClick={() => handleOpenEdit(ban)} className="p-1.5 rounded-lg bg-slate-100 text-slate-700 hover:bg-slate-200"><Edit3 className="w-4 h-4" /></button>
                    <button onClick={() => handleDelete(ban._id)} className="p-1.5 rounded-lg bg-red-50 text-red-600 hover:bg-red-100"><Trash2 className="w-4 h-4" /></button>
                  </div>
                </div>
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
                <h3 className="font-serif text-xl font-bold text-navy-900">{editingId ? 'Edit Slide' : 'Add Slide'}</h3>
                <button onClick={() => setModalOpen(false)}><X className="w-5 h-5 text-slate-400" /></button>
              </div>

              <form onSubmit={handleSubmitForm} className="space-y-3">
                <div>
                  <label className="block font-semibold text-slate-700 uppercase mb-1">Headline Title *</label>
                  <input type="text" required value={formState.title} onChange={(e) => setFormState({ ...formState, title: e.target.value })} className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm" />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 uppercase mb-1">Subtitle Description</label>
                  <textarea rows="2" value={formState.subtitle} onChange={(e) => setFormState({ ...formState, subtitle: e.target.value })} className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm resize-none"></textarea>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-slate-700 uppercase mb-1">Badge Tag</label>
                    <input type="text" value={formState.badge} onChange={(e) => setFormState({ ...formState, badge: e.target.value })} className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm" />
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-700 uppercase mb-1">CTA Button Text</label>
                    <input type="text" value={formState.ctaText} onChange={(e) => setFormState({ ...formState, ctaText: e.target.value })} className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm" />
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 uppercase mb-1">Background Image URL</label>
                  <input type="url" required value={formState.image} onChange={(e) => setFormState({ ...formState, image: e.target.value })} className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm" />
                </div>

                <div className="flex justify-end gap-3 pt-3 border-t border-slate-100">
                  <button type="button" onClick={() => setModalOpen(false)} className="px-4 py-2 rounded-lg bg-slate-100 text-slate-700 font-bold">Cancel</button>
                  <button type="submit" disabled={saving} className="px-5 py-2 rounded-lg gold-gradient-bg text-navy-900 font-bold shadow-md">{saving ? 'Saving...' : 'Save Banner Slide'}</button>
                </div>
              </form>

            </div>
          </div>
        )}

      </div>
    </AdminLayout>
  );
};

export default AdminBanners;
