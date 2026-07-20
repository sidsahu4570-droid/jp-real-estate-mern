import React from 'react';
import { useApp } from '../context/AppContext';
import { CheckCircle2, AlertCircle, X } from 'lucide-react';

const ToastNotification = () => {
  const { toastMessage, showToast } = useApp();

  if (!toastMessage) return null;

  const isSuccess = toastMessage.type === 'success';

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-fade-in flex items-center gap-3 px-5 py-3.5 rounded-xl shadow-2xl bg-navy-900 border border-gold-500/40 text-white min-w-[300px]">
      {isSuccess ? (
        <CheckCircle2 className="w-5 h-5 text-gold-400 shrink-0" />
      ) : (
        <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />
      )}
      <p className="text-sm font-medium flex-1">{toastMessage.text}</p>
      <button 
        onClick={() => showToast(null)} 
        className="text-slate-400 hover:text-white transition-colors"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};

export default ToastNotification;
