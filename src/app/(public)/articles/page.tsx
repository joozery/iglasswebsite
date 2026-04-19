'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

interface Article {
  _id: string;
  title: string;
  content: string;
  image: string;
  category: string;
  author: string;
  createdAt: string;
}

export default function ArticlesPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const res = await fetch('http://localhost:5001/api/articles');
        const data = await res.json();
        setArticles(data);
      } catch (error) {
        console.error('Failed to fetch articles:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchArticles();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center font-thai text-zinc-950">
        <div className="w-10 h-10 border-4 border-zinc-100 border-t-[#FFB800] rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white font-thai pt-40 pb-40"> {/* Increased pt-24 to pt-40 to clear Navbar */}
      
      {/* Title Section */}
      <section className="max-w-7xl mx-auto px-6 mb-20">
         <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-zinc-100 pb-12">
            <div className="space-y-4">
               <div className="flex items-center gap-3">
                  <div className="w-2 h-10 bg-[#FFB800]"></div>
                  <div>
                    <h1 className="text-3xl md:text-4xl font-black text-zinc-950 uppercase tracking-tight">บทความและสาระน่ารู้</h1>
                    <p className="text-zinc-400 text-sm font-semibold italic">เจาะลึกทุกมุมมองเรื่องดวงตาและการเลือกแว่นตาที่ใช่สำหรับคุณ</p>
                  </div>
               </div>
            </div>
            <div className="flex gap-6">
               {['ทั้งหมด', 'แฟชั่น', 'การดูแลสายตา', 'ไลฟ์สไตล์'].map(cat => (
                 <button key={cat} className="text-[11px] font-black uppercase tracking-widest text-zinc-400 hover:text-zinc-950 transition-colors">
                   {cat}
                 </button>
               ))}
            </div>
         </div>
      </section>

      {/* Articles Grid */}
      <section className="max-w-7xl mx-auto px-6">
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 gap-y-20">
            {articles.map((art) => (
              <Link 
                href={`/articles/${art._id}`} 
                key={art._id}
                className="group flex flex-col"
              >
                 <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden mb-6 bg-zinc-50 border border-zinc-100 shadow-sm transition-all duration-500 group-hover:shadow-2xl">
                    {art.image ? (
                       <img src={art.image} alt={art.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                    ) : (
                       <div className="w-full h-full flex items-center justify-center font-black text-4xl text-zinc-200 uppercase italic opacity-20">IGLASS</div>
                    )}
                    <div className="absolute top-4 left-4">
                       <span className="bg-zinc-950 text-white text-[9px] font-black uppercase tracking-widest px-4 py-2 rounded-md shadow-xl">
                          {art.category}
                       </span>
                    </div>
                 </div>

                 <div className="space-y-4">
                    <div className="flex items-center gap-2 text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
                       <span>{new Date(art.createdAt).toLocaleDateString('th-TH', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                       <span className="opacity-30">|</span>
                       <span>โดย {art.author}</span>
                    </div>
                    <h2 className="text-2xl font-black text-zinc-950 leading-tight uppercase group-hover:text-[#FFB800] transition-colors line-clamp-2">
                       {art.title}
                    </h2>
                    <p className="text-zinc-500 leading-relaxed text-[15px] font-medium line-clamp-3 opacity-80">
                       {art.content}
                    </p>
                    <div className="pt-4 flex items-center gap-2 text-[#FFB800] text-[10px] font-black uppercase tracking-widest group-hover:gap-4 transition-all">
                       อ่านเนื้อหาฉบับเต็ม
                       <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                    </div>
                 </div>
              </Link>
            ))}
         </div>
      </section>

    </div>
  );
}
