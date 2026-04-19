'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import StatusToast from '@/components/ui/StatusToast';

export default function ArticleCreatePage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [toast, setToast] = useState<{show: boolean; message: string; type: 'success' | 'error'}>({
    show: false, message: '', type: 'success'
  });

  const [formData, setFormData] = useState({
    title: '', content: '', image: '', category: 'Fashion', author: '',
    metaTitle: '', metaDescription: '', shortAnswer: '', keyTakeaways: '',
  });

  useEffect(() => {
    const storedUser = localStorage.getItem('adminUser');
    if (storedUser) {
       const user = JSON.parse(storedUser);
       setFormData(prev => ({ ...prev, author: user.name }));
    }
  }, []);

  const handlePublish = async () => {
    if (!formData.title || !formData.content) {
      setToast({ show: true, message: 'กรุณากรอกหัวข้อและเนื้อหาบทความให้ครบถ้วน', type: 'error' });
      return;
    }
    setIsLoading(true);
    try {
      const res = await fetch('http://localhost:5001/api/articles', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setToast({ show: true, message: 'เผยแพร่บทความสำเร็จ!', type: 'success' });
        setTimeout(() => router.push('/admin/articles'), 1500);
      }
    } catch (error) {
        setToast({ show: true, message: 'เกิดข้อผิดพลาดในการเชื่อมต่อ', type: 'error' });
    } finally {
        setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F0F0F0] font-thai pb-20 overflow-x-hidden">
      <StatusToast show={toast.show} message={toast.message} type={toast.type} onClose={() => setToast({...toast, show: false})} />

      {/* Industrial Top Bar */}
      <nav className="h-16 bg-white border-b-2 border-zinc-900 px-10 flex items-center justify-between sticky top-0 z-50">
         <div className="flex items-center gap-8">
            <button onClick={() => router.back()} className="text-zinc-400 hover:text-black flex items-center gap-3 transition-colors group uppercase font-black text-[10px] tracking-[0.2em]">
               <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
               Back
            </button>
            <div className="h-6 w-px bg-zinc-200" />
            <div className="flex flex-col">
               <span className="text-[11px] font-black text-black uppercase tracking-[0.2em]">{formData.title || 'Draft Article'}</span>
               <span className="text-[8px] font-bold text-zinc-400 uppercase tracking-widest mt-0.5">Iglass Editorial Studio v2.0</span>
            </div>
         </div>

         <button 
           onClick={handlePublish}
           disabled={isLoading}
           className="bg-black text-[#FFB800] px-10 py-3 rounded-none text-[10px] font-black uppercase tracking-[0.2em] hover:bg-[#FFB800] hover:text-black transition-all disabled:opacity-50 flex items-center gap-3 active:scale-[0.98]"
         >
            {isLoading && <div className="w-3 h-3 border-2 border-[#FFB800] border-t-transparent rounded-full animate-spin"></div>}
            {isLoading ? 'Processing' : 'Publish to Feed'}
         </button>
      </nav>

      <div className="max-w-[1500px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-1 mt-1">
         
         {/* LEFT COLUMN: PRIMARY WRITING CANVAS */}
         <div className="lg:col-span-8">
            <div className="bg-white border border-zinc-200 p-16 min-h-[90vh] shadow-none">
               
               {/* Context Info */}
               <div className="flex items-center gap-4 mb-12">
                  <select 
                    value={formData.category} 
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                    className="bg-transparent border-b-2 border-zinc-900 px-1 py-1 text-[11px] font-black text-black uppercase tracking-widest outline-none cursor-pointer hover:border-[#FFB800] transition-colors"
                  >
                     <option>Fashion</option>
                     <option>Eye Care</option>
                     <option>Lifestyle</option>
                     <option>Technology</option>
                  </select>
                  <span className="text-zinc-200 text-xs">/</span>
                  <span className="text-[11px] font-black text-zinc-300 uppercase tracking-widest leading-none">Credit: {formData.author || 'ROOT'}</span>
               </div>

               {/* Headline Input */}
               <textarea 
                  rows={1}
                  placeholder="ADD HEADLINE..."
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  className="w-full text-6xl font-black text-black placeholder:text-zinc-100 outline-none border-none resize-none leading-none mb-12 overflow-hidden uppercase tracking-tighter"
                  onInput={(e) => { e.currentTarget.style.height = 'auto'; e.currentTarget.style.height = e.currentTarget.scrollHeight + 'px'; }}
               />

               <div className="h-0.5 w-16 bg-black mb-12" />

               {/* Body Content */}
               <textarea 
                  placeholder="Start writing the story..."
                  value={formData.content}
                  onChange={(e) => setFormData({...formData, content: e.target.value})}
                  className="w-full text-[18px] text-zinc-700 placeholder:text-zinc-50 outline-none border-none resize-none leading-relaxed min-h-[600px] font-medium"
               />
            </div>
         </div>

         {/* RIGHT COLUMN: CONFIGURATION PANELS */}
         <div className="lg:col-span-4 space-y-1">
            
            {/* Image Panel */}
            <div className="bg-white border border-zinc-200 p-10 space-y-6">
               <h3 className="text-[11px] font-black uppercase tracking-[0.3em] text-zinc-400 flex items-center justify-between">
                  Cover Media
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><rect x="3" y="3" width="18" height="18" rx="0" ry="0"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
               </h3>
               
               <div className="relative w-full aspect-[4/3] bg-zinc-50 border-2 border-zinc-100 flex flex-col items-center justify-center overflow-hidden transition-all group">
                  {formData.image ? (
                     <img src={formData.image} alt="preview" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500" />
                  ) : (
                     <p className="text-[9px] font-black text-zinc-300 uppercase tracking-[0.2em] animate-pulse">Waiting for source...</p>
                  )}
               </div>

               <div className="space-y-3 pt-4">
                  <label className="text-[9px] font-black uppercase text-zinc-900 tracking-widest pl-0">Source URL (R2 Cloud)</label>
                  <input 
                    type="text" 
                    placeholder="ENTER URL..." 
                    value={formData.image}
                    onChange={(e) => setFormData({...formData, image: e.target.value})}
                    className="w-full bg-zinc-50 border border-zinc-100 rounded-none px-5 py-4 text-[10px] font-bold text-zinc-600 outline-none focus:border-black transition-all placeholder:text-zinc-200"
                  />
               </div>
            </div>

            {/* SEO Panel */}
            <div className="bg-white border border-zinc-200 p-10 space-y-8">
               <h3 className="text-[11px] font-black uppercase tracking-[0.3em] text-zinc-400 flex items-center justify-between">
                  Internal SEO
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
               </h3>
               <div className="space-y-6">
                  <div className="space-y-3">
                     <label className="text-[10px] font-black uppercase text-zinc-900 tracking-widest">Meta Title Tag</label>
                     <input type="text" placeholder="GOOGLE HEADLINE..." value={formData.metaTitle} onChange={(e) => setFormData({...formData, metaTitle: e.target.value})} className="w-full bg-zinc-50 border border-zinc-100 rounded-none px-5 py-4 text-[11px] font-bold text-zinc-600 outline-none focus:border-black transition-all" />
                  </div>
                  <div className="space-y-3">
                     <label className="text-[10px] font-black uppercase text-zinc-900 tracking-widest">Meta Description</label>
                     <textarea rows={4} placeholder="SEARCH SNIPPET..." value={formData.metaDescription} onChange={(e) => setFormData({...formData, metaDescription: e.target.value})} className="w-full bg-zinc-50 border border-zinc-100 rounded-none px-5 py-4 text-[11px] font-bold text-zinc-600 outline-none focus:border-black transition-all resize-none leading-relaxed" />
                  </div>
               </div>
            </div>

            {/* AI Optimization (Strict Black Panel) */}
            <div className="bg-black border border-black p-10 space-y-8 text-white relative">
               <div className="absolute top-10 right-10">
                  <div className="w-2 h-2 bg-[#FFB800] rounded-none animate-ping"></div>
               </div>
               
               <h3 className="text-[11px] font-black uppercase tracking-[0.3em] text-[#FFB800] flex items-center gap-3">
                  AI Intelligence Core
               </h3>
               
               <div className="space-y-8">
                  <div className="space-y-3">
                     <label className="text-[9px] font-black uppercase text-zinc-600 tracking-widest pl-0">AEO: Automated Response</label>
                     <textarea rows={3} placeholder="DIRECT AI STRING..." value={formData.shortAnswer} onChange={(e) => setFormData({...formData, shortAnswer: e.target.value})} className="w-full bg-zinc-900 border border-zinc-800 text-zinc-300 rounded-none px-5 py-4 text-[11px] font-black outline-none focus:border-[#FFB800] transition-all resize-none" />
                  </div>
                  <div className="space-y-3">
                     <label className="text-[9px] font-black uppercase text-zinc-600 tracking-widest pl-0">GEO: Structured Data</label>
                     <textarea rows={5} placeholder="LLM FEEDBACK DATA..." value={formData.keyTakeaways} onChange={(e) => setFormData({...formData, keyTakeaways: e.target.value})} className="w-full bg-zinc-900 border border-zinc-800 text-zinc-300 rounded-none px-5 py-4 text-[11px] font-black outline-none focus:border-[#FFB800] transition-all resize-none leading-loose" />
                  </div>
               </div>
            </div>

         </div>
      </div>
    </div>
  );
}
