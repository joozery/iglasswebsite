'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const res = await fetch('http://localhost:5001/api/admins/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem('adminUser', JSON.stringify(data.admin));
        router.push('/admin');
        router.refresh();
      } else {
        setError(data.message || 'รหัสผ่านหรือชื่อผู้ใช้งานไม่ถูกต้อง');
      }
    } catch (err) {
      setError('ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์ได้');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#09090b] flex items-center justify-center p-6 font-thai select-none overflow-hidden relative">
      
      {/* Background Decor */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
         <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-[#FFB800]/5 rounded-full blur-[120px]" />
         <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-white/[0.02] rounded-full blur-[120px]" />
      </div>

      <div className="w-full max-w-[380px] z-10 animate-in fade-in slide-in-from-bottom-4 duration-1000">
        
        {/* Logo Section */}
        <div className="flex flex-col items-center mb-10 text-center">
           <div className="w-12 h-12 bg-[#FFB800] rounded-xl flex items-center justify-center mb-4 shadow-[0_0_40px_rgba(255,184,0,0.15)]">
              <span className="text-zinc-950 font-black text-xl tracking-tighter">I</span>
           </div>
           <h2 className="text-white text-lg font-black uppercase tracking-[0.2em] mb-1">Iglass Control</h2>
           <div className="h-px w-8 bg-[#FFB800]/30 mb-2" />
           <p className="text-zinc-500 text-[10px] font-black uppercase tracking-[0.15em]">ระบบบริหารจัดการ 2026</p>
        </div>

        {/* Login Box */}
        <div className="bg-zinc-900/40 backdrop-blur-xl border border-white/[0.05] p-8 rounded-[2rem] shadow-2xl relative group">
           <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[#FFB800]/20 rounded-tl-[2rem] group-hover:border-[#FFB800]/40 transition-colors duration-700" />
           <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-[#FFB800]/20 rounded-br-[2rem] group-hover:border-[#FFB800]/40 transition-colors duration-700" />

           <form onSubmit={handleLogin} className="space-y-5">
              
              {error && (
                <div className="bg-red-500/10 border border-red-500/20 text-red-500 text-[10px] font-bold py-3 px-4 rounded-xl text-center flex items-center justify-center gap-2">
                   <div className="w-1 h-1 rounded-full bg-red-500 animate-pulse" />
                   {error}
                </div>
              )}

              <div className="space-y-1.5">
                 <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 pl-1">ชื่อผู้ใช้งาน (LOGIN ID)</label>
                 <div className="relative">
                    <input 
                      required
                      type="text" 
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder="ระบุชื่อผู้ใช้งาน"
                      className="w-full bg-zinc-950/50 border border-white/[0.05] rounded-xl px-5 py-3.5 text-zinc-300 text-xs focus:ring-1 focus:ring-[#FFB800]/50 outline-none transition-all placeholder:text-zinc-700 focus:bg-zinc-950 font-medium" 
                    />
                 </div>
              </div>

              <div className="space-y-1.5">
                 <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 pl-1">รหัสผ่าน (PASSWORD)</label>
                 <div className="relative">
                    <input 
                      required
                      type="password" 
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="ระบุรหัสประจำตัว"
                      className="w-full bg-zinc-950/50 border border-white/[0.05] rounded-xl px-5 py-3.5 text-zinc-300 text-xs focus:ring-1 focus:ring-[#FFB800]/50 outline-none transition-all placeholder:text-zinc-700 focus:bg-zinc-950 font-medium" 
                    />
                 </div>
              </div>

              <button 
                disabled={isLoading}
                className="w-full mt-4 bg-zinc-950 text-[#FFB800] border border-[#FFB800]/20 font-black uppercase tracking-[0.2em] text-[10px] py-4 rounded-xl hover:bg-[#FFB800] hover:text-black transition-all shadow-xl active:scale-[0.98] flex items-center justify-center gap-3 overflow-hidden group/btn"
              >
                 {isLoading ? (
                    <div className="w-4 h-4 border-2 border-[#FFB800] border-t-transparent rounded-full animate-spin" />
                 ) : (
                    <>
                       <span>ยืนยันเข้าสู่ระบบ</span>
                       <svg className="w-3 h-3 transition-transform group-hover/btn:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                    </>
                 )}
              </button>
           </form>
        </div>

        <div className="mt-8 text-center opacity-40">
           <p className="text-zinc-500 text-[9px] font-bold uppercase tracking-[0.2em]">
             Authorized Access Only &bull; Secured with SHA-256
           </p>
        </div>

      </div>
    </div>
  );
}
