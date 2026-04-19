'use client';

import React from 'react';

interface ConfirmDialogProps {
  isOpen: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
  type?: 'danger' | 'warning' | 'success';
}

export default function ConfirmDialog({
  isOpen,
  title,
  message,
  onConfirm,
  onCancel,
  type = 'warning'
}: ConfirmDialogProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 font-thai">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-zinc-950/60 backdrop-blur-sm animate-in fade-in duration-300" onClick={onCancel}></div>
      
      {/* Dialog Box */}
      <div className="relative bg-white w-full max-w-[340px] rounded-[2rem] shadow-2xl overflow-hidden border border-zinc-100 animate-in zoom-in-95 duration-300">
        
        {/* Accent Bar */}
        <div className={`h-1.5 w-full ${type === 'danger' ? 'bg-red-500' : 'bg-[#FFB800]'}`} />

        <div className="p-8 text-center">
            {/* Icon Circle */}
            <div className={`w-16 h-16 rounded-full mx-auto mb-6 flex items-center justify-center ${type === 'danger' ? 'bg-red-50' : 'bg-[#FFB800]/10'}`}>
                {type === 'danger' ? (
                   <svg className="w-8 h-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                ) : (
                   <svg className="w-8 h-8 text-[#FFB800]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                )}
            </div>

            <h3 className="text-zinc-950 font-black text-xl uppercase tracking-tighter mb-2">{title}</h3>
            <p className="text-zinc-500 text-sm font-bold leading-relaxed mb-8 px-2">{message}</p>

            <div className="flex flex-col gap-2">
                <button 
                  onClick={onConfirm}
                  className={`w-full py-4 rounded-xl text-xs font-black uppercase tracking-widest transition-all active:scale-95 shadow-lg ${
                    type === 'danger' 
                      ? 'bg-red-500 text-white hover:bg-red-600 shadow-red-500/20' 
                      : 'bg-zinc-950 text-[#FFB800] hover:bg-[#FFB800] hover:text-black shadow-zinc-950/20'
                  }`}
                >
                   ยืนยันดำเนินการ
                </button>
                <button 
                  onClick={onCancel}
                  className="w-full py-3 text-zinc-400 hover:text-zinc-950 text-[10px] font-black uppercase tracking-widest transition-colors"
                >
                   ยกเลิก
                </button>
            </div>
        </div>
      </div>
    </div>
  );
}
