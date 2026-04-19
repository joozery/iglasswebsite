'use client';

import React, { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import AdminSidebar from '@/components/admin/Sidebar';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const isLoginPage = pathname === '/admin/login';
  const isStudioPage = pathname === '/admin/articles/create' || pathname.startsWith('/admin/articles/edit');
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [adminUser, setAdminUser] = useState<any>(null);

  useEffect(() => {
    // Check authentication
    const storedUser = localStorage.getItem('adminUser');
    
    if (!storedUser && !isLoginPage) {
      router.push('/admin/login');
    } else {
      if (storedUser) {
        setAdminUser(JSON.parse(storedUser));
      }
      setIsCheckingAuth(false);
    }
  }, [pathname, isLoginPage, router]);

  if (isLoginPage || isStudioPage) {
    return <div className="bg-[#0D0D0F] min-h-screen text-white">{children}</div>;
  }

  if (isCheckingAuth) {
    return <div className="min-h-screen bg-zinc-950 flex items-center justify-center font-thai">
       <div className="w-8 h-8 border-4 border-[#FFB800] border-t-transparent rounded-full animate-spin"></div>
    </div>;
  }

  return (
    <div className="bg-zinc-50 min-h-screen font-thai">
      <AdminSidebar activeUser={adminUser} />
      <main className="pl-64">
        {/* Real-time Header */}
        <header className="h-16 bg-white border-b border-zinc-200 px-8 flex items-center justify-between sticky top-0 z-40">
           <div className="flex items-center gap-4">
              <span className="text-zinc-400 font-medium text-sm uppercase tracking-widest text-[10px] font-black">Dashboard Overview</span>
              <span className="w-1.5 h-1.5 bg-zinc-200 rounded-full"></span>
              <span className="text-zinc-950 font-black text-xs uppercase tracking-tight">Real-time Control Panel</span>
           </div>
           
           <div className="flex items-center gap-6">
              <button className="text-zinc-400 hover:text-zinc-950 transition-colors relative">
                 <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
                 <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
              </button>
              <div className="h-4 w-px bg-zinc-200" />
              <div className="flex items-center gap-3">
                 <div className="text-right hidden sm:block">
                    <p className="text-[11px] font-black text-zinc-950 leading-none uppercase">{adminUser?.name || 'แอดมิน Iglass'}</p>
                    <p className="text-[9px] text-[#FFB800] font-black uppercase mt-1 tracking-widest">
                       {adminUser?.role || 'Authorized Access'}
                    </p>
                 </div>
                 <div className="w-9 h-9 rounded-lg bg-zinc-950 border border-zinc-800 flex items-center justify-center text-[#FFB800] text-xs font-black shadow-lg">
                    {adminUser?.name?.substring(0, 2).toUpperCase() || 'AD'}
                 </div>
              </div>
           </div>
        </header>

        {/* Content Area */}
        <div className="p-8">
           {children}
        </div>
      </main>
    </div>
  );
}
