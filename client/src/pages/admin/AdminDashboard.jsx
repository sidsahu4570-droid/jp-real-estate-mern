import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import API from '../../services/api';
import AdminLayout from '../../components/AdminLayout';
import { 
  Home, 
  Building, 
  Inbox, 
  FileText, 
  Sparkles, 
  TrendingUp, 
  ArrowRight, 
  Plus, 
  CheckCircle2, 
  Clock 
} from 'lucide-react';

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [recentEnquiries, setRecentEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [statsRes, enqRes] = await Promise.allSettled([
          API.get('/stats'),
          API.get('/enquiries')
        ]);

        if (statsRes.status === 'fulfilled' && statsRes.value.data.success) {
          setStats(statsRes.value.data.stats);
        }
        if (enqRes.status === 'fulfilled' && enqRes.value.data.success) {
          setRecentEnquiries(enqRes.value.data.data.slice(0, 5));
        }
      } catch (err) {
        console.error('Error loading admin dashboard stats:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <AdminLayout title="Analytics & Executive Dashboard">
      <div className="space-y-8">
        
        {/* Top Summary Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { label: 'Total Properties', value: stats?.totalProperties || 0, icon: Home, link: '/admin/properties', color: 'text-amber-500' },
            { label: 'Featured Listings', value: stats?.featuredProperties || 0, icon: Sparkles, link: '/admin/properties', color: 'text-amber-500' },
            { label: 'Total Customer Leads', value: stats?.totalEnquiries || 0, icon: Inbox, link: '/admin/enquiries', color: 'text-emerald-500' },
            { label: 'Flagship Projects', value: stats?.totalProjects || 0, icon: Building, link: '/admin/projects', color: 'text-blue-500' },
          ].map((card, idx) => {
            const IconComp = card.icon;
            return (
              <div key={idx} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
                <div>
                  <span className="text-xs text-slate-400 font-semibold uppercase block">{card.label}</span>
                  <span className="font-serif text-3xl font-bold text-navy-900 mt-1 block">
                    {loading ? '...' : card.value}
                  </span>
                  <Link to={card.link} className="text-[11px] text-gold-600 font-semibold hover:underline flex items-center gap-1 mt-2">
                    Manage Section <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
                <div className="w-12 h-12 rounded-xl bg-navy-900 text-gold-400 flex items-center justify-center shrink-0 shadow-md">
                  <IconComp className="w-6 h-6" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Quick Management Shortcuts */}
        <div className="bg-navy-900 text-white p-6 rounded-2xl border border-gold-500/30 shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-serif text-xl font-bold text-white">Quick Administration Actions</h3>
            <span className="text-xs text-gold-400 font-mono">Control Shortcuts</span>
          </div>

          <div className="flex flex-wrap gap-4">
            <Link
              to="/admin/properties"
              className="px-5 py-2.5 rounded-xl gold-gradient-bg text-navy-900 font-bold text-xs shadow-md flex items-center gap-2"
            >
              <Plus className="w-4 h-4" /> Add New Property Listing
            </Link>
            <Link
              to="/admin/projects"
              className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold text-xs transition-colors flex items-center gap-2"
            >
              <Plus className="w-4 h-4 text-gold-400" /> Create New Project
            </Link>
            <Link
              to="/admin/enquiries"
              className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold text-xs transition-colors flex items-center gap-2"
            >
              <Inbox className="w-4 h-4 text-gold-400" /> View Customer Inbox
            </Link>
          </div>
        </div>

        {/* Recent Customer Enquiries Table */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden space-y-4 p-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <h3 className="font-serif text-xl font-bold text-navy-900">Recent Customer Lead Enquiries</h3>
              <p className="text-xs text-slate-500">Inbound lead inquiries submitted through website forms.</p>
            </div>
            <Link to="/admin/enquiries" className="text-xs text-gold-600 font-bold hover:underline">
              View All Enquiries ({stats?.totalEnquiries || 0})
            </Link>
          </div>

          {loading ? (
            <div className="h-32 shimmer rounded-xl"></div>
          ) : recentEnquiries.length === 0 ? (
            <p className="text-sm text-slate-500 text-center py-6">No customer enquiries logged yet.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-400 uppercase font-semibold">
                    <th className="py-3 px-3">Client Name</th>
                    <th className="py-3 px-3">Contact</th>
                    <th className="py-3 px-3">Interest / Asset</th>
                    <th className="py-3 px-3">Status</th>
                    <th className="py-3 px-3">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  {recentEnquiries.map((enq) => (
                    <tr key={enq._id} className="hover:bg-slate-50">
                      <td className="py-3 px-3 font-bold text-navy-900">{enq.name}</td>
                      <td className="py-3 px-3">{enq.phone} <br/><span className="text-[10px] text-slate-400">{enq.email}</span></td>
                      <td className="py-3 px-3 font-medium">{enq.propertyTitle || enq.interest}</td>
                      <td className="py-3 px-3">
                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                          enq.status === 'New Lead' ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'
                        }`}>
                          {enq.status}
                        </span>
                      </td>
                      <td className="py-3 px-3 text-slate-400">{new Date(enq.createdAt).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
