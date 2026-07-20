import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { 
  Building2, 
  LayoutDashboard, 
  Home, 
  Building, 
  Inbox, 
  FileText, 
  Star, 
  Image, 
  LogOut, 
  Menu, 
  X, 
  Globe, 
  UserCheck 
} from 'lucide-react';

const AdminLayout = ({ children, title = 'Control Center' }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { adminUser, logoutAdmin } = useApp();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutAdmin();
    navigate('/admin/login');
  };

  const navItems = [
    { label: 'Overview Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
    { label: 'Manage Properties', path: '/admin/properties', icon: Home },
    { label: 'Flagship Projects', path: '/admin/projects', icon: Building },
    { label: 'Enquiry Inbox Leads', path: '/admin/enquiries', icon: Inbox },
    { label: 'Blog Insights', path: '/admin/blogs', icon: FileText },
    { label: 'Client Testimonials', path: '/admin/testimonials', icon: Star },
    { label: 'Hero Banners', path: '/admin/banners', icon: Image },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <div className="min-h-screen bg-slate-100 flex text-slate-800">
      
      {/* Sidebar Navigation */}
      <aside className={`fixed inset-y-0 left-0 z-40 w-64 bg-navy-900 text-white transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } flex flex-col justify-between border-r border-gold-500/20`}>
        
        <div>
          {/* Logo Branding */}
          <div className="p-6 border-b border-white/10 flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl gold-gradient-bg flex items-center justify-center shadow-lg">
                <Building2 className="w-5 h-5 text-navy-900" />
              </div>
              <div>
                <span className="font-serif text-lg font-bold text-white block leading-none">
                  SURABHI
                </span>
                <span className="text-[9px] tracking-[0.2em] text-gold-400 uppercase font-semibold">
                  ADMIN CONSOLE
                </span>
              </div>
            </Link>
            <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-slate-400 hover:text-white">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="p-4 space-y-1.5">
            {navItems.map((item) => {
              const IconComp = item.icon;
              const active = isActive(item.path);
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                    active
                      ? 'gold-gradient-bg text-navy-900 shadow-md font-bold'
                      : 'text-slate-300 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <IconComp className={`w-4 h-4 ${active ? 'text-navy-900' : 'text-gold-400'}`} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Footer Admin User profile */}
        <div className="p-4 border-t border-white/10 space-y-3">
          <div className="flex items-center gap-3 px-2">
            <div className="w-9 h-9 rounded-full gold-gradient-bg flex items-center justify-center font-bold text-navy-900 text-xs">
              <UserCheck className="w-5 h-5 text-navy-900" />
            </div>
            <div className="flex-1 truncate">
              <span className="text-xs font-bold text-white block truncate">{adminUser?.name || 'Super Admin'}</span>
              <span className="text-[10px] text-gold-400 font-mono block truncate">{adminUser?.email || 'admin@realestate.com'}</span>
            </div>
          </div>

          <div className="flex items-center gap-2 pt-1">
            <Link
              to="/"
              target="_blank"
              className="flex-1 py-2 rounded-lg bg-navy-800 text-slate-300 hover:text-gold-400 text-xs text-center border border-white/10 flex items-center justify-center gap-1"
            >
              <Globe className="w-3.5 h-3.5" /> View Live Site
            </Link>

            <button
              onClick={handleLogout}
              className="p-2 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500/30 text-xs border border-red-500/30"
              title="Log Out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>

      </aside>

      {/* Main Content Area */}
      <div className="flex-1 lg:ml-64 flex flex-col min-w-0">
        
        {/* Top Header */}
        <header className="bg-white border-b border-slate-200 py-4 px-6 sticky top-0 z-30 flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100"
            >
              <Menu className="w-6 h-6" />
            </button>
            <h1 className="font-serif text-xl sm:text-2xl font-bold text-navy-900">{title}</h1>
          </div>

          <div className="flex items-center gap-3">
            <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-semibold flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span> System Online
            </span>
          </div>
        </header>

        {/* Dynamic Page Body */}
        <main className="p-6 flex-1 max-w-7xl w-full mx-auto">
          {children}
        </main>

      </div>

    </div>
  );
};

export default AdminLayout;
