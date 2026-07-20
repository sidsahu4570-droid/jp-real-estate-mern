import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../../services/api';
import { useApp } from '../../context/AppContext';
import { Building2, Lock, Mail, Key, ShieldCheck, ArrowRight } from 'lucide-react';

const AdminLogin = () => {
  const [email, setEmail] = useState('admin@realestate.com');
  const [password, setPassword] = useState('admin123');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const { loginAdmin } = useApp();
  const navigate = useNavigate();

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    try {
      const res = await API.post('/auth/login', { email, password });
      if (res.data.success) {
        loginAdmin(res.data.token, res.data.admin);
        navigate('/admin/dashboard');
      }
    } catch (err) {
      setErrorMsg(err.response?.data?.message || 'Invalid admin credentials');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-navy-900 flex items-center justify-center p-4 relative overflow-hidden">
      
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gold-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="w-full max-w-md bg-navy-800/90 border border-gold-500/30 rounded-3xl p-8 shadow-2xl backdrop-blur-xl relative z-10 space-y-6">
        
        {/* Header Branding */}
        <div className="text-center space-y-2">
          <div className="w-14 h-14 rounded-2xl gold-gradient-bg flex items-center justify-center mx-auto shadow-xl">
            <Building2 className="w-8 h-8 text-navy-900" />
          </div>
          <h2 className="font-serif text-3xl font-bold text-white tracking-tight">
            Admin Management Console
          </h2>
          <p className="text-xs text-gold-400 font-medium tracking-wider uppercase">
            Surabhi Luxury Realty Control Center
          </p>
        </div>

        {/* Demo Credentials Helper Pill */}
        <div className="p-3.5 rounded-xl bg-gold-500/10 border border-gold-500/30 text-xs text-gold-300 flex items-center justify-between">
          <div>
            <span className="font-bold text-white block">Default Demo Login:</span>
            <span>admin@realestate.com / admin123</span>
          </div>
          <button
            type="button"
            onClick={() => {
              setEmail('admin@realestate.com');
              setPassword('admin123');
            }}
            className="px-2.5 py-1 rounded bg-gold-500 text-navy-900 font-bold text-[10px]"
          >
            Auto Fill
          </button>
        </div>

        {errorMsg && (
          <div className="p-3.5 rounded-xl bg-red-500/20 border border-red-500/40 text-red-300 text-xs text-center font-medium">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleLoginSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">
              Admin Email
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-9 pr-4 py-3 rounded-xl bg-navy-900 border border-white/15 text-white text-sm focus:outline-none focus:border-gold-400 transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-9 pr-4 py-3 rounded-xl bg-navy-900 border border-white/15 text-white text-sm focus:outline-none focus:border-gold-400 transition-colors"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-xl gold-gradient-bg text-navy-900 font-bold text-sm shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 mt-2"
          >
            {loading ? 'Authenticating...' : (
              <>
                <Key className="w-4 h-4" /> Log Into Dashboard <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        <div className="text-center pt-2">
          <span className="text-[11px] text-slate-400 flex items-center justify-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-gold-400" /> Authorized Admin Personnel Only
          </span>
        </div>

      </div>

    </div>
  );
};

export default AdminLogin;
