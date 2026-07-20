import React, { useState, useEffect } from 'react';
import API from '../../services/api';
import AdminLayout from '../../components/AdminLayout';
import { useApp } from '../../context/AppContext';
import { Plus, Edit3, Trash2, X, Building } from 'lucide-react';

const emptyProject = {
  name: '',
  developer: 'Surabhi Luxury Infrastructure Ltd',
  location: 'Mumbai Waterfront',
  status: 'Under Construction',
  priceRange: '₹ 10 Cr - ₹ 25 Cr',
  completionYear: '2027',
  overview: 'Iconic twin sky towers featuring panoramic views and bespoke amenities.',
  coverImage: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80'
};

const AdminProjects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formState, setFormState] = useState(emptyProject);
  const [saving, setSaving] = useState(false);

  const { showToast } = useApp();

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const res = await API.get('/projects');
      if (res.data.success) {
        setProjects(res.data.data);
      }
    } catch (err) {
      showToast('Error loading projects list.', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleOpenAdd = () => {
    setEditingId(null);
    setFormState(emptyProject);
    setModalOpen(true);
  };

  const handleOpenEdit = (proj) => {
    setEditingId(proj._id);
    setFormState({
      name: proj.name || '',
      developer: proj.developer || '',
      location: proj.location || '',
      status: proj.status || 'Under Construction',
      priceRange: proj.priceRange || '',
      completionYear: proj.completionYear || '2027',
      overview: proj.overview || '',
      coverImage: proj.coverImage || ''
    });
    setModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this project development?')) return;
    try {
      const res = await API.delete(`/projects/${id}`);
      if (res.data.success) {
        showToast('Project deleted successfully!');
        fetchProjects();
      }
    } catch (err) {
      showToast('Failed to delete project.', 'error');
    }
  };

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (editingId) {
        const res = await API.put(`/projects/${editingId}`, formState);
        if (res.data.success) {
          showToast('Project updated successfully!');
          setModalOpen(false);
          fetchProjects();
        }
      } else {
        const res = await API.post('/projects', formState);
        if (res.data.success) {
          showToast('New project created successfully!');
          setModalOpen(false);
          fetchProjects();
        }
      }
    } catch (err) {
      showToast(err.response?.data?.message || 'Failed to save project.', 'error');
    } finally {
      setSaving(false);
    }
  };

  return (
    <AdminLayout title="Flagship Projects Manager">
      <div className="space-y-6">
        
        <div className="flex items-center justify-between bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
          <div>
            <h3 className="font-serif text-lg font-bold text-navy-900">Landmark Project Developments</h3>
            <p className="text-xs text-slate-500">Manage ongoing, upcoming, and ready-to-move projects.</p>
          </div>
          <button
            onClick={handleOpenAdd}
            className="px-5 py-2.5 rounded-xl gold-gradient-bg text-navy-900 font-bold text-xs shadow-md flex items-center gap-2"
          >
            <Plus className="w-4 h-4" /> Add New Project
          </button>
        </div>

        {loading ? (
          <div className="h-64 shimmer rounded-2xl"></div>
        ) : (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50 text-slate-500 uppercase font-semibold">
                    <th className="py-3.5 px-4">Project Name</th>
                    <th className="py-3.5 px-4">Developer</th>
                    <th className="py-3.5 px-4">Location</th>
                    <th className="py-3.5 px-4">Status</th>
                    <th className="py-3.5 px-4">Price Range</th>
                    <th className="py-3.5 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  {projects.map((proj) => (
                    <tr key={proj._id} className="hover:bg-slate-50">
                      <td className="py-3.5 px-4 font-bold text-navy-900">{proj.name}</td>
                      <td className="py-3.5 px-4 text-slate-600">{proj.developer}</td>
                      <td className="py-3.5 px-4 text-slate-600">{proj.location}</td>
                      <td className="py-3.5 px-4">
                        <span className="px-2.5 py-1 rounded-full bg-gold-500/10 text-gold-700 font-bold text-[10px]">
                          {proj.status}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 font-bold text-slate-900">{proj.priceRange}</td>
                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => handleOpenEdit(proj)}
                            className="p-1.5 rounded-lg bg-slate-100 text-slate-700 hover:bg-slate-200"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(proj._id)}
                            className="p-1.5 rounded-lg bg-red-50 text-red-600 hover:bg-red-100"
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

        {/* Modal */}
        {modalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="fixed inset-0 bg-navy-900/80 backdrop-blur-sm" onClick={() => setModalOpen(false)}></div>
            <div className="relative bg-white rounded-3xl shadow-2xl border border-gold-500/40 w-full max-w-xl p-6 sm:p-8 space-y-4 z-10 text-xs">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h3 className="font-serif text-xl font-bold text-navy-900">
                  {editingId ? 'Edit Project' : 'Add Project'}
                </h3>
                <button onClick={() => setModalOpen(false)}><X className="w-5 h-5 text-slate-400" /></button>
              </div>

              <form onSubmit={handleSubmitForm} className="space-y-3">
                <div>
                  <label className="block font-semibold text-slate-700 uppercase mb-1">Project Name *</label>
                  <input
                    type="text"
                    required
                    value={formState.name}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-slate-700 uppercase mb-1">Developer</label>
                    <input
                      type="text"
                      value={formState.developer}
                      onChange={(e) => setFormState({ ...formState, developer: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 uppercase mb-1">Status</label>
                    <select
                      value={formState.status}
                      onChange={(e) => setFormState({ ...formState, status: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm"
                    >
                      <option value="Under Construction">Under Construction</option>
                      <option value="Upcoming">Upcoming</option>
                      <option value="Ready to Move">Ready to Move</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-slate-700 uppercase mb-1">Location</label>
                    <input
                      type="text"
                      value={formState.location}
                      onChange={(e) => setFormState({ ...formState, location: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 uppercase mb-1">Price Range</label>
                    <input
                      type="text"
                      value={formState.priceRange}
                      onChange={(e) => setFormState({ ...formState, priceRange: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 uppercase mb-1">Cover Image URL</label>
                  <input
                    type="url"
                    value={formState.coverImage}
                    onChange={(e) => setFormState({ ...formState, coverImage: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 uppercase mb-1">Overview</label>
                  <textarea
                    rows="3"
                    value={formState.overview}
                    onChange={(e) => setFormState({ ...formState, overview: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm resize-none"
                  ></textarea>
                </div>

                <div className="flex justify-end gap-3 pt-3 border-t border-slate-100">
                  <button type="button" onClick={() => setModalOpen(false)} className="px-4 py-2 rounded-lg bg-slate-100 text-slate-700 font-bold">
                    Cancel
                  </button>
                  <button type="submit" disabled={saving} className="px-5 py-2 rounded-lg gold-gradient-bg text-navy-900 font-bold shadow-md">
                    {saving ? 'Saving...' : 'Save Project'}
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

export default AdminProjects;
