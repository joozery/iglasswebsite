'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import ConfirmDialog from '@/components/ui/ConfirmDialog';
import StatusToast from '@/components/ui/StatusToast';

interface Article {
  _id?: string;
  title: string;
  content: string;
  image: string;
  category: string;
  author: string;
  metaTitle?: string;
  metaDescription?: string;
  shortAnswer?: string;
  keyTakeaways?: string;
  createdAt?: string;
}

const API_ARTICLES_URL = 'http://localhost:5001/api/articles';
const API_UPLOAD_URL = 'http://localhost:5001/api/upload';

export default function ArticleManagementPage() {
  const router = useRouter();
  const [articles, setArticles] = useState<Article[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'content' | 'ai-seo'>('content');
  const [editingArticle, setEditingArticle] = useState<Article | null>(null);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({
    title: '', content: '', image: '', category: 'Fashion', author: '',
    metaTitle: '', metaDescription: '', shortAnswer: '', keyTakeaways: '',
  });

  const [confirmConfig, setConfirmConfig] = useState<{isOpen: boolean; id: string; title: string; message: string} | null>(null);
  const [toast, setToast] = useState<{show: boolean; message: string; type: 'success' | 'error'}>({
    show: false, message: '', type: 'success'
  });

  const fetchArticles = async () => {
    try {
      const res = await fetch(API_ARTICLES_URL);
      const data = await res.json();
      setArticles(data);
    } catch (error) {
       console.error('Error fetching articles:', error);
    }
  };

  useEffect(() => {
    fetchArticles();
    const storedUser = localStorage.getItem('adminUser');
    if (storedUser) {
       const user = JSON.parse(storedUser);
       setFormData(prev => ({ ...prev, author: user.name }));
    }
  }, []);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const body = new FormData();
    body.append('image', file);

    try {
      const res = await fetch(API_UPLOAD_URL, {
        method: 'POST',
        body: body,
      });
      const data = await res.json();
      if (res.ok) {
        setFormData(prev => ({ ...prev, image: data.url }));
        setToast({ show: true, message: 'อัปโหลดรูปภาพสำเร็จ!', type: 'success' });
      } else {
        setToast({ show: true, message: 'อัปโหลดรูปภาพไม่สำเร็จ', type: 'error' });
      }
    } catch (error) {
      setToast({ show: true, message: 'เกิดข้อผิดพลาดในการอัปโหลด', type: 'error' });
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const method = editingArticle ? 'PUT' : 'POST';
      const url = editingArticle ? `${API_ARTICLES_URL}/${editingArticle._id}` : API_ARTICLES_URL;
      
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setIsModalOpen(false);
        setEditingArticle(null);
        setActiveTab('content');
        fetchArticles();
        setToast({ show: true, message: editingArticle ? 'อัปเดตบทความสำเร็จ' : 'เผยแพร่บทความสำเร็จ', type: 'success' });
      }
    } catch (error) {
        setToast({ show: true, message: 'เกิดข้อผิดพลาดในการบันทึกข้อมูล', type: 'error' });
    }
  };

  const confirmDelete = (id: string, title: string) => {
    setConfirmConfig({ isOpen: true, id, title: 'ลบบทความ?', message: `คุณแน่ใจหรือไม่ว่าต้องการลบบทความ "${title}"?` });
  };

  const executeDelete = async () => {
    if (!confirmConfig) return;
    try {
      await fetch(`${API_ARTICLES_URL}/${confirmConfig.id}`, { method: 'DELETE' });
      setConfirmConfig(null);
      fetchArticles();
      setToast({ show: true, message: 'ลบบทความเรียบร้อยแล้ว', type: 'success' });
    } catch (error) {
      setToast({ show: true, message: 'ไม่สามารถลบบทความได้', type: 'error' });
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-10 animate-in fade-in duration-500 font-thai pb-20 px-8 pt-8">
      
      <StatusToast 
        show={toast.show} message={toast.message} type={toast.type} 
        onClose={() => setToast({...toast, show: false})} 
      />

      <ConfirmDialog 
        isOpen={confirmConfig?.isOpen || false} title={confirmConfig?.title || ''} message={confirmConfig?.message || ''}
        type="danger" onConfirm={executeDelete} onCancel={() => setConfirmConfig(null)}
      />

      {/* Header Dashboard (Refined & Compact) */}
      <div className="flex justify-between items-center bg-white px-8 py-6 rounded-xl border border-zinc-100 shadow-sm transition-all hover:shadow-md">
         <div>
            <h1 className="text-xl font-black text-zinc-950 uppercase tracking-tight">Article Management</h1>
            <p className="text-zinc-400 text-[9px] font-black uppercase tracking-[0.2em] mt-1">Ready for AEO & GEO Optimization</p>
         </div>
         <button 
           onClick={() => {
             setEditingArticle(null);
             setFormData({ 
                title: '', content: '', image: '', category: 'Fashion', author: formData.author,
                metaTitle: '', metaDescription: '', shortAnswer: '', keyTakeaways: ''
             });
             setIsModalOpen(true);
           }}
           className="bg-black text-[#FFB800] px-8 py-3 rounded-lg text-[10px] font-black uppercase tracking-widest hover:bg-zinc-900 transition-all flex items-center gap-2 active:scale-95 shadow-lg shadow-zinc-200"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
            สร้างบทความใหม่
         </button>
      </div>

      {/* Articles Grid (Modern & Sharp) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
         {articles.map((art) => (
           <div key={art._id} className="bg-white rounded-xl border border-zinc-100 shadow-sm overflow-hidden group hover:shadow-xl transition-all duration-400 flex flex-col relative">
              <div className="h-56 bg-zinc-50 relative overflow-hidden flex items-center justify-center">
                 {art.image ? (
                    <img src={art.image} alt={art.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                 ) : (
                    <div className="w-full h-full flex items-center justify-center text-zinc-100 italic font-black text-[30px] opacity-10 uppercase tracking-tighter">IGLASS</div>
                 )}
                 <div className="absolute top-4 left-4">
                    <span className="bg-black/90 backdrop-blur-md text-[#FFB800] text-[8px] font-black uppercase tracking-widest px-3 py-1.5 rounded-lg shadow-xl">
                       {art.category}
                    </span>
                 </div>
              </div>
              <div className="p-6 flex-1 flex flex-col bg-white">
                 <h3 className="text-sm font-black text-zinc-900 line-clamp-2 mb-3 leading-tight group-hover:text-[#FFB800] transition-colors">{art.title}</h3>
                 <p className="text-[11px] text-zinc-500 line-clamp-3 mb-6 leading-relaxed flex-1 opacity-70">{art.content}</p>
                 
                 <div className="flex items-center justify-between pt-4 border-t border-zinc-50">
                    <div className="flex items-center gap-3">
                       <div className="w-8 h-8 rounded-full bg-zinc-900 border-2 border-white flex items-center justify-center text-[#FFB800] text-[9px] font-black uppercase shadow-sm">
                          {art.author.substring(0, 1)}
                       </div>
                       <div>
                          <p className="text-[9px] text-zinc-950 font-black uppercase leading-none">{art.author}</p>
                          <p className="text-[7px] text-zinc-400 font-bold mt-1 uppercase tracking-widest leading-none">Publisher</p>
                       </div>
                    </div>
                    <div className="flex gap-1 opacity-20 group-hover:opacity-100 transition-opacity">
                       <button onClick={() => { setEditingArticle(art); setFormData({ title: art.title, content: art.content, image: art.image, category: art.category, author: art.author, metaTitle: art.metaTitle || '', metaDescription: art.metaDescription || '', shortAnswer: art.shortAnswer || '', keyTakeaways: art.keyTakeaways || '' }); setIsModalOpen(true); }} className="p-2 text-zinc-400 hover:text-zinc-950 bg-zinc-50 rounded-lg transition-all">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                       </button>
                       <button onClick={() => confirmDelete(art._id!, art.title)} className="p-2 text-zinc-400 hover:text-red-500 bg-zinc-50 rounded-lg transition-all">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
                       </button>
                    </div>
                 </div>
              </div>
           </div>
         ))}
      </div>

      {/* UPDATE CONSOLE MODAL (Compact & Refined) */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[150] flex items-center justify-center p-6 backdrop-blur-sm bg-zinc-950/30">
           <div className="bg-white w-full max-w-3xl rounded-[1.5rem] shadow-2xl overflow-hidden border border-zinc-100 animate-in zoom-in-95 duration-400 overflow-y-auto max-h-[90vh]">
              
              {/* Header */}
              <div className="px-8 py-6 bg-white border-b border-zinc-50 flex flex-col md:flex-row justify-between items-center gap-4">
                 <div>
                    <h3 className="text-sm font-black text-zinc-950 uppercase tracking-widest flex items-center gap-2">
                       UPDATE CONSOLE
                       <span className="w-1.5 h-1.5 bg-[#FFB800] rounded-full"></span>
                    </h3>
                 </div>

                 <div className="flex bg-zinc-50 p-1 rounded-xl shadow-inner border border-zinc-100">
                    <button 
                      onClick={() => setActiveTab('content')}
                      className={`px-6 py-2 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all ${
                        activeTab === 'content' ? 'bg-white text-zinc-950 shadow-sm' : 'text-zinc-400 hover:text-zinc-600'
                      }`}
                    >
                       CONTENT
                    </button>
                    <button 
                      onClick={() => setActiveTab('ai-seo')}
                      className={`px-6 py-2 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all ${
                        activeTab === 'ai-seo' ? 'bg-white text-zinc-950 shadow-sm' : 'text-zinc-400 hover:text-zinc-600'
                      }`}
                    >
                       AI & SEO
                    </button>
                 </div>

                 <button onClick={() => setIsModalOpen(false)} className="md:absolute md:top-6 md:right-8 text-zinc-300 hover:text-zinc-950">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                 </button>
              </div>

              <form onSubmit={handleSubmit} className="p-8 space-y-6">
                 
                 {activeTab === 'content' ? (
                    <div className="space-y-6 animate-in slide-in-from-left-2 duration-400">
                       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-2">
                             <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 pl-1">หัวข้อบทความ</label>
                             <input required type="text" placeholder="ระบุหัวข้อ..." value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} className="w-full bg-zinc-50/50 rounded-xl px-4 py-3 border border-zinc-100 focus:bg-white focus:ring-1 focus:ring-[#FFB800] outline-none font-bold text-xs transition-all" />
                          </div>
                          <div className="space-y-2">
                             <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 pl-1">หมวดหมู่</label>
                             <select value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})} className="w-full bg-zinc-50/50 rounded-xl px-4 py-3 border border-zinc-100 focus:bg-white focus:ring-1 focus:ring-[#FFB800] outline-none font-black text-xs transition-all appearance-none cursor-pointer">
                                <option>Fashion</option>
                                <option>Eye Care</option>
                                <option>Lifestyle</option>
                                <option>Technology</option>
                             </select>
                          </div>
                       </div>

                       <div className="space-y-2">
                          <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 pl-1">ภาพหน้าปก (R2 Cloud)</label>
                          <div className="relative group flex items-center">
                             <input type="text" placeholder="https://pub-..." value={formData.image} onChange={(e) => setFormData({...formData, image: e.target.value})} className="w-full bg-zinc-50/50 rounded-xl px-4 py-3 border border-zinc-100 focus:bg-white focus:ring-1 focus:ring-[#FFB800] outline-none font-bold text-[10px] transition-all pl-12" />
                             <div className="absolute left-4 text-zinc-300">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
                             </div>
                             <button 
                               type="button" 
                               onClick={() => fileInputRef.current?.click()}
                               className="absolute right-3 bg-zinc-950 text-white px-4 py-1.5 rounded-lg text-[8px] font-black uppercase tracking-widest hover:bg-[#FFB800] hover:text-black transition-all"
                             >
                                {uploading ? '...' : 'UPLOAD'}
                             </button>
                             <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleImageUpload} disabled={uploading} />
                          </div>
                       </div>

                       <div className="space-y-2">
                          <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 pl-1">เนื้อหาแบบละเอียด</label>
                          <textarea required rows={8} placeholder="..." value={formData.content} onChange={(e) => setFormData({...formData, content: e.target.value})} className="w-full bg-zinc-50/50 rounded-2xl px-6 py-6 border border-zinc-100 focus:bg-white focus:ring-1 focus:ring-[#FFB800] outline-none font-bold text-xs transition-all resize-none leading-relaxed" />
                       </div>
                    </div>
                 ) : (
                    <div className="space-y-6 animate-in slide-in-from-right-2 duration-400">
                       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="p-6 bg-zinc-50/50 rounded-2xl border border-zinc-100 space-y-4">
                             <h4 className="text-[10px] font-black uppercase tracking-widest text-zinc-400">SEO DATA</h4>
                             <input type="text" placeholder="Meta Title" value={formData.metaTitle} onChange={(e) => setFormData({...formData, metaTitle: e.target.value})} className="w-full bg-white rounded-lg px-4 py-3 border border-zinc-100 outline-none text-[10px] font-bold" />
                             <textarea placeholder="Meta Description" value={formData.metaDescription} onChange={(e) => setFormData({...formData, metaDescription: e.target.value})} className="w-full bg-white rounded-lg px-4 py-3 border border-zinc-100 outline-none text-[10px] font-bold resize-none h-20" />
                          </div>
                          <div className="p-6 bg-zinc-950 rounded-2xl text-white space-y-4 shadow-xl">
                             <h4 className="text-[10px] font-black uppercase tracking-widest text-[#FFB800]">AI OPTIMIZATION</h4>
                             <textarea placeholder="Direct Answer (AEO)" value={formData.shortAnswer} onChange={(e) => setFormData({...formData, shortAnswer: e.target.value})} className="w-full bg-zinc-900 border border-zinc-800 text-white rounded-lg px-4 py-3 outline-none text-[10px] font-bold h-16" />
                             <textarea placeholder="Key Takeaways (GEO)" value={formData.keyTakeaways} onChange={(e) => setFormData({...formData, keyTakeaways: e.target.value})} className="w-full bg-zinc-900 border border-zinc-800 text-white rounded-lg px-4 py-3 outline-none text-[10px] font-bold h-20" />
                          </div>
                       </div>
                    </div>
                 )}

                 <div className="flex justify-end items-center gap-8 pt-4">
                    <button type="button" onClick={() => setIsModalOpen(false)} className="text-[10px] font-black uppercase tracking-widest text-zinc-300 hover:text-zinc-950 transition-all">Cancel</button>
                    <button type="submit" className="bg-zinc-950 text-[#FFB800] px-10 py-3.5 rounded-xl text-[11px] font-black uppercase tracking-widest hover:bg-[#FFB800] hover:text-black transition-all shadow-xl active:scale-95">
                       {editingArticle ? 'Update Console' : 'Publish Article'}
                    </button>
                 </div>
              </form>
           </div>
        </div>
      )}
    </div>
  );
}
