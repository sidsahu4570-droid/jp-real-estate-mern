import React, { useState, useEffect } from 'react';
import API from '../../services/api';
import AdminLayout from '../../components/AdminLayout';
import { useApp } from '../../context/AppContext';
import { Inbox, Phone, Mail, Clock, MessageSquare, Trash2, CheckCircle2, User } from 'lucide-react';

const AdminEnquiries = () => {
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('All');
  const [notesState, setNotesState] = useState({});

  const { showToast } = useApp();

  const fetchEnquiries = async () => {
    setLoading(true);
    try {
      const res = await API.get('/enquiries');
      if (res.data.success) {
        setEnquiries(res.data.data);
      }
    } catch (err) {
      showToast('Failed to load enquiries.', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEnquiries();
  }, []);

  const handleUpdateStatus = async (id, newStatus, currentNotes) => {
    try {
      const res = await API.patch(`/enquiries/${id}`, {
        status: newStatus,
        notes: notesState[id] !== undefined ? notesState[id] : currentNotes
      });
      if (res.data.success) {
        showToast(`Status updated to "${newStatus}"!`);
        fetchEnquiries();
      }
    } catch (err) {
      showToast('Failed to update status.', 'error');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete lead enquiry entry?')) return;
    try {
      const res = await API.delete(`/enquiries/${id}`);
      if (res.data.success) {
        showToast('Lead deleted.');
        fetchEnquiries();
      }
    } catch (err) {
      showToast('Failed to delete lead.', 'error');
    }
  };

  const filteredEnquiries = enquiries.filter((e) => {
    if (statusFilter === 'All') return true;
    return e.status === statusFilter;
  });

  return (
    <AdminLayout title="Customer Enquiry Lead Inbox">
      <div className="space-y-6">
        
        {/* Status Filter Toolbar */}
        <div className="flex items-center justify-between bg-white p-4 rounded-2xl border border-slate-200 shadow-sm overflow-x-auto gap-4">
          <div className="flex items-center gap-2">
            {['All', 'New Lead', 'Contacted', 'In Progress', 'Closed'].map((st) => (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 ${
                  statusFilter === st
                    ? 'gold-gradient-bg text-navy-900 shadow-sm'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {st}
              </button>
            ))}
          </div>

          <span className="text-xs text-slate-500 font-medium whitespace-nowrap">
            Showing {filteredEnquiries.length} leads
          </span>
        </div>

        {/* Lead Cards List */}
        {loading ? (
          <div className="h-64 shimmer rounded-2xl"></div>
        ) : filteredEnquiries.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-slate-200 p-8 space-y-3">
            <Inbox className="w-12 h-12 text-slate-300 mx-auto" />
            <h3 className="font-serif text-xl font-bold text-navy-900">No Enquiries Found</h3>
            <p className="text-sm text-slate-500">There are no lead enquiries logged under status "{statusFilter}".</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredEnquiries.map((enq) => (
              <div key={enq._id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all space-y-4">
                
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full gold-gradient-bg flex items-center justify-center font-bold text-navy-900 font-serif">
                      <User className="w-5 h-5 text-navy-900" />
                    </div>
                    <div>
                      <h4 className="font-serif text-lg font-bold text-navy-900">{enq.name}</h4>
                      <p className="text-xs text-slate-400">Received {new Date(enq.createdAt).toLocaleString()}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <select
                      value={enq.status || 'New Lead'}
                      onChange={(e) => handleUpdateStatus(enq._id, e.target.value, enq.notes)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold border focus:outline-none ${
                        enq.status === 'New Lead' ? 'bg-amber-50 text-amber-800 border-amber-300' :
                        enq.status === 'Contacted' ? 'bg-blue-50 text-blue-800 border-blue-300' :
                        enq.status === 'In Progress' ? 'bg-purple-50 text-purple-800 border-purple-300' :
                        'bg-emerald-50 text-emerald-800 border-emerald-300'
                      }`}
                    >
                      <option value="New Lead">New Lead</option>
                      <option value="Contacted">Contacted</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Closed">Closed</option>
                    </select>

                    <button
                      onClick={() => handleDelete(enq._id)}
                      className="p-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100"
                      title="Delete Lead"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Lead Contact Info & Asset */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-gold-600 shrink-0" />
                    <a href={`tel:${enq.phone}`} className="font-bold text-navy-900 hover:underline">{enq.phone}</a>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-gold-600 shrink-0" />
                    <span className="text-slate-700 font-medium">{enq.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-gold-600 shrink-0" />
                    <span className="text-slate-700">Time: {enq.preferredTime || 'Anytime'}</span>
                  </div>
                </div>

                {/* Property / Interest Tag */}
                {enq.propertyTitle && (
                  <div className="px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-100 text-xs text-slate-700 font-medium">
                    Requested Asset / Subject: <span className="font-bold text-navy-900">{enq.propertyTitle}</span> ({enq.interest})
                  </div>
                )}

                {/* Client Message */}
                {enq.message && (
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs text-slate-600 italic">
                    "{enq.message}"
                  </div>
                )}

                {/* Disposition Notes Input */}
                <div className="flex items-center gap-2 text-xs pt-2">
                  <span className="text-slate-400 font-semibold uppercase shrink-0">Lead Notes:</span>
                  <input
                    type="text"
                    placeholder="Add advisor disposition note (e.g. Called client, scheduled site tour on Sunday)..."
                    value={notesState[enq._id] !== undefined ? notesState[enq._id] : (enq.notes || '')}
                    onChange={(e) => setNotesState({ ...notesState, [enq._id]: e.target.value })}
                    className="flex-1 px-3 py-1.5 rounded-lg border border-slate-200 focus:outline-none focus:border-gold-500"
                  />
                  <button
                    onClick={() => handleUpdateStatus(enq._id, enq.status, notesState[enq._id])}
                    className="px-3 py-1.5 rounded-lg bg-navy-900 text-white font-bold hover:bg-navy-800"
                  >
                    Save Note
                  </button>
                </div>

              </div>
            ))}
          </div>
        )}

      </div>
    </AdminLayout>
  );
};

export default AdminEnquiries;
