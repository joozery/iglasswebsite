'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

interface SidebarProps {
  activeUser?: {
    id: string;
    name: string;
    role: string;
    status: string;
  };
}

const AdminSidebar: React.FC<SidebarProps> = ({ activeUser }) => {
  const pathname = usePathname();
  const router = useRouter();

  const menuItems = [
    { name: 'Dashboard', icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
    ), path: '/admin' },
    { name: 'จัดการแบนเนอร์', icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M8 12h8"/><path d="M12 8v8"/></svg>
    ), path: '/admin/hero' },
    { name: 'จัดการบทความ', icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z"/><path d="M8 7h6"/><path d="M8 11h8"/></svg>
    ), path: '/admin/articles' },
    { name: 'รายการนัดหมาย', icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
    ), path: '/admin/appointments' },
    { name: 'จัดการบริการ', icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a2 2 0 0 1-2.78-2.78L14.7 6.3Z"/><path d="m3.13 13.39 6.74-6.74a2.83 2.83 0 0 1 4 4l-6.74 6.74a10.73 10.73 0 0 1-4 2.68l-2.63.88.88-2.63a10.73 10.73 0 0 1 2.68-4Z"/><path d="m15.43 15.43 2.57 2.57"/><path d="m11.57 11.57 2.57 2.57"/></svg>
    ), path: '/admin/services' },
    { name: 'จัดการแบรนด์', icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></svg>
    ), path: '/admin/brands' },
    { name: 'จัดการแกลเลอรี', icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="m21 15-5-5L5 21"/></svg>
    ), path: '/admin/gallery' },
    { name: 'ผู้ดูแลระบบ', icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="8.5" cy="7" r="4"/><polyline points="17 11 19 13 23 9"/></svg>
    ), path: '/admin/admins' },
    { name: 'ตั้งค่าระบบ', icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
    ), path: '/admin/settings' },
  ];

  const handleLogout = async () => {
    try {
      const adminData = localStorage.getItem('adminUser');
      if (adminData) {
        const { id } = JSON.parse(adminData);
        await fetch(`http://localhost:5001/api/admins/logout/${id}`, { method: 'POST' });
      }
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      localStorage.removeItem('adminUser');
      router.push('/admin/login');
    }
  };

  return (
    <aside className="w-64 bg-zinc-950 h-screen fixed top-0 left-0 text-white flex flex-col font-thai z-50">
      {/* Brand Header */}
      <div className="p-8 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-[#FFB800] rounded-xl flex items-center justify-center shadow-[0_0_25px_rgba(255,184,0,0.2)]">
            <span className="text-zinc-950 font-black text-lg tracking-tighter">I</span>
          </div>
          <div>
            <h1 className="text-sm font-black uppercase tracking-[0.2em]">Iglass</h1>
            <p className="text-[#FFB800] text-[8px] font-black uppercase tracking-[0.3em] opacity-80">Administration</p>
          </div>
        </div>
      </div>

      <div className="h-px w-full bg-white/5 my-4" />

      {/* Navigation Menu */}
      <nav className="flex-1 px-4 space-y-1.5 overflow-y-auto mt-2">
        {menuItems.map((item) => {
          const isActive = pathname === item.path;
          return (
            <Link 
              key={item.name} 
              href={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all group relative overflow-hidden ${
                isActive 
                ? 'bg-[#FFB800] text-zinc-950 shadow-[0_10px_20px_rgba(255,184,0,0.1)]' 
                : 'text-zinc-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <span className={`transition-transform duration-300 ${isActive ? 'scale-110' : 'group-hover:scale-110'}`}>
                {item.icon}
              </span>
              <span className="text-[11px] font-black uppercase tracking-widest">{item.name}</span>
              {isActive && (
                <div className="absolute right-0 top-0 bottom-0 w-1 bg-zinc-950/20" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Profile & Logout Section */}
      <div className="px-4 py-6 mt-auto">
        <div className="bg-white/5 rounded-2xl p-4 border border-white/[0.03]">
           <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-white/10 flex items-center justify-center text-[#FFB800] font-black text-xs ring-2 ring-white/5">
                 {activeUser?.name?.substring(0, 2).toUpperCase() || 'AD'}
              </div>
              <div className="overflow-hidden">
                 <p className="text-[10px] font-black uppercase text-white truncate px-0">{activeUser?.name || 'Authorized User'}</p>
                 <p className="text-[8px] font-black uppercase text-[#FFB800] tracking-widest mt-0.5">{activeUser?.role || 'Admin Account'}</p>
              </div>
           </div>

           <button 
             onClick={handleLogout}
             className="w-full flex items-center justify-center gap-2 py-3 bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white rounded-xl transition-all duration-300 group"
           >
              <svg className="w-4 h-4 transition-transform group-hover:-translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
              <span className="text-[10px] font-black uppercase tracking-widest">ออกจากระบบ</span>
           </button>
        </div>
      </div>
    </aside>
  );
};

export default AdminSidebar;
