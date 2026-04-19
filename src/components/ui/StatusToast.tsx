'use client';

import React, { useEffect } from 'react';

interface StatusToastProps {
  show: boolean;
  message: string;
  type?: 'success' | 'error';
  onClose: () => void;
}

export default function StatusToast({
  show,
  message,
  type = 'success',
  onClose
}: StatusToastProps) {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [show, onClose]);

  if (!show) return null;

  return (
    <div className="fixed bottom-10 right-10 z-[300] animate-in slide-in-from-right-10 duration-500 font-thai">
       <div className={`flex items-center gap-4 px-6 py-4 rounded-2xl shadow-2xl border ${
         type === 'success' 
           ? 'bg-zinc-950 border-[#FFB800]/20' 
           : 'bg-red-500 border-red-600'
       }`}>
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
            type === 'success' ? 'bg-[#FFB800] text-zinc-950' : 'bg-white text-red-500'
          }`}>
             {type === 'success' ? (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
             ) : (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
             )}
          </div>
          <div>
             <p className={`text-[10px] font-black uppercase tracking-widest leading-none mb-1 ${
               type === 'success' ? 'text-zinc-500' : 'text-white/60'
             }`}>System Notification</p>
             <p className="text-white text-sm font-black tracking-tight">{message}</p>
          </div>
          <button onClick={onClose} className="ml-4 text-white/20 hover:text-white transition-colors">
             <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
       </div>
    </div>
  );
}
