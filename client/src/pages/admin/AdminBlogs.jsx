import React, { useState, useEffect } from 'react';
import API from '../../services/api';
import AdminLayout from '../../components/AdminLayout';
import { useApp } from '../../context/AppContext';
import { Plus, Edit3, Trash2, X, FileText } from 'lucide-react';

const emptyBlog = {
  title: '',
  category: 'Market Insights',
  author: 'Surabhi Insights Desk',
  readTime: '5 min read',
  excerpt: '',
  content: '',
  coverImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
  tags: ['Real Estate', 'Investment']
};

const AdminBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formState, setFormState] = useState(emptyBlog);
  const [saving, setSaving] = useState(false);

  const { showToast } = useApp();

  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const res = await API.get('/blogs');
      if (res.data.success) {
        setBlogs(res.data.data);
      }
    } catch (err) {
      showToast('Error loading blogs.', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleOpenAdd = () => {
    setEditingId(null);
    setFormState(emptyBlog);
    setModalOpen(true);
  };

  const handleOpenEdit = (blog) => {
    setEditingId(blog._id);
    setFormState({
      title: blog.title || '',
      category: blog.category || 'Market Insights',
      author: blog.author || '',
      readTime: blog.readTime || '5 min read',
      excerpt: blog.excerpt || '',
      content: blog.content || '',
      coverImage: blog.coverImage || '',
      tags: blog.tags || []
    });
    setModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete blog article?')) return;
    try {
      const res = await API.delete(`/blogs/${id}`);
      if (res.data.success) {
        showToast('Blog deleted.');
        fetchBlogs();
      }
    } catch (err) {
      showToast('Failed to delete blog.', 'error');
    }
  };

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (editingId) {
        const res = await API.put(`/blogs/${editingId}`, formState);
        if (res.data.success) {
          showToast('Blog updated successfully!');
          setModalOpen(false);
          fetchBlogs();
        }
      } else {
        const res = await API.post('/blogs', formState);
        if (res.data.success) {
          showToast('Blog created successfully!');
          setModalOpen(false);
          fetchBlogs();
        }
      }
    } catch (err) {
      showToast('Failed to save blog.', 'error');
    } finally {
      setSaving(false);
    }
  };

  return (
    <AdminLayout title="Market Insights & Blog Manager">
      <div className="space-y-6">
        
        <div className="flex items-center justify-between bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
          <div>
            <h3 className="font-serif text-lg font-bold text-navy-900">Articles & Insights</h3>
            <p className="text-xs text-slate-500">Publish market commentary and real estate guides.</p>
          </div>
          <button
            onClick={handleOpenAdd}
            className="px-5 py-2.5 rounded-xl gold-gradient-bg text-navy-900 font-bold text-xs shadow-md flex items-center gap-2"
          >
            <Plus className="w-4 h-4" /> Add New Article
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
                    <th className="py-3.5 px-4">Article Title</th>
                    <th className="py-3.5 px-4">Category</th>
                    <th className="py-3.5 px-4">Author</th>
                    <th className="py-3.5 px-4">Date</th>
                    <th className="py-3.5 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  {blogs.map((b) => (
                    <tr key={b._id} className="hover:bg-slate-50">
                      <td className="py-3.5 px-4 font-bold text-navy-900 max-w-xs truncate">{b.title}</td>
                      <td className="py-3.5 px-4"><span className="px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 font-medium">{b.category}</span></td>
                      <td className="py-3.5 px-4">{b.author}</td>
                      <td className="py-3.5 px-4 text-slate-400">{new Date(b.createdAt).toLocaleDateString()}</td>
                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button onClick={() => handleOpenEdit(b)} className="p-1.5 rounded-lg bg-slate-100 text-slate-700 hover:bg-slate-200"><Edit3 className="w-4 h-4" /></button>
                          <button onClick={() => handleDelete(b._id)} className="p-1.5 rounded-lg bg-red-50 text-red-600 hover:bg-red-100"><Trash2 className="w-4 h-4" /></button>
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
            <div className="relative bg-white rounded-3xl shadow-2xl border border-gold-500/40 w-full max-w-xl max-h-[90vh] overflow-y-auto p-6 sm:p-8 space-y-4 z-10 text-xs">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h3 className="font-serif text-xl font-bold text-navy-900">{editingId ? 'Edit Article' : 'Add Article'}</h3>
                <button onClick={() => setModalOpen(false)}><X className="w-5 h-5 text-slate-400" /></button>
              </div>

              <form onSubmit={handleSubmitForm} className="space-y-3">
                <div>
                  <label className="block font-semibold text-slate-700 uppercase mb-1">Title *</label>
                  <input type="text" required value={formState.title} onChange={(e) => setFormState({ ...formState, title: e.target.value })} className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm" />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-slate-700 uppercase mb-1">Category</label>
                    <input type="text" value={formState.category} onChange={(e) => setFormState({ ...formState, category: e.target.value })} className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm" />
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-700 uppercase mb-1">Author</label>
                    <input type="text" value={formState.author} onChange={(e) => setFormState({ ...formState, author: e.target.value })} className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm" />
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 uppercase mb-1">Cover Image URL</label>
                  <input type="url" value={formState.coverImage} onChange={(e) => setFormState({ ...formState, coverImage: e.target.value })} className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm" />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 uppercase mb-1">Excerpt Summary</label>
                  <textarea rows="2" value={formState.excerpt} onChange={(e) => setFormState({ ...formState, excerpt: e.target.value })} className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm resize-none"></textarea>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 uppercase mb-1">Full Content</label>
                  <textarea rows="6" value={formState.content} onChange={(e) => setFormState({ ...formState, content: e.target.value })} className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm resize-none"></textarea>
                </div>

                <div className="flex justify-end gap-3 pt-3 border-t border-slate-100">
                  <button type="button" onClick={() => setModalOpen(false)} className="px-4 py-2 rounded-lg bg-slate-100 text-slate-700 font-bold">Cancel</button>
                  <button type="submit" disabled={saving} className="px-5 py-2 rounded-lg gold-gradient-bg text-navy-900 font-bold shadow-md">{saving ? 'Saving...' : 'Save Article'}</button>
                </div>
              </form>

            </div>
          </div>
        )}

      </div>
    </AdminLayout>
  );
};

export default AdminBlogs;
