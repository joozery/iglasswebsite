'use client';

import React, { useState, useEffect, useRef } from 'react';
import ConfirmDialog from '@/components/ui/ConfirmDialog';
import StatusToast from '@/components/ui/StatusToast';

interface Promotion {
  _id?: string;
  title: string;
  subtitle: string;
  price: string;
  originalPrice: string;
  tag: string;
  image: string;
  isFeatured: boolean;
  isActive: boolean;
  order: number;
}

const API_PROMOTIONS_URL = 'http://localhost:5001/api/promotions';
const API_UPLOAD_URL = 'http://localhost:5001/api/upload';

export default function PromotionManagementPage() {
  const [promotions, setPromotions] = useState<Promotion[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPromotion, setEditingPromotion] = useState<Promotion | null>(null);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState<Promotion>({
    title: '', subtitle: '', price: '', originalPrice: '', tag: '', image: '', isFeatured: false, isActive: true, order: 0
  });

  const [confirmConfig, setConfirmConfig] = useState<{isOpen: boolean; id: string; title: string; message: string} | null>(null);
  const [toast, setToast] = useState<{show: boolean; message: string; type: 'success' | 'error'}>({
    show: false, message: '', type: 'success'
  });

  const fetchPromotions = async () => {
    try {
      // Need to add auth token in a real app, assuming not strictly enforced yet or added by an interceptor
      const token = localStorage.getItem('token');
      const headers: any = {};
      if (token) headers['Authorization'] = `Bearer ${token}`;
      
      const res = await fetch(API_PROMOTIONS_URL, { headers });
      const data = await res.json();
      if (Array.isArray(data)) {
        setPromotions(data);
      }
    } catch (error) {
      console.error('Error fetching promotions:', error);
    }
  };

  useEffect(() => {
    fetchPromotions();
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
      const token = localStorage.getItem('token');
      const headers: any = { 'Content-Type': 'application/json' };
      if (token) headers['Authorization'] = `Bearer ${token}`;

      const method = editingPromotion ? 'PUT' : 'POST';
      const url = editingPromotion ? `${API_PROMOTIONS_URL}/${editingPromotion._id}` : API_PROMOTIONS_URL;
      
      const res = await fetch(url, {
        method,
        headers,
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setIsModalOpen(false);
        setEditingPromotion(null);
        fetchPromotions();
        setToast({ show: true, message: editingPromotion ? 'อัปเดตโปรโมชั่นสำเร็จ' : 'เพิ่มโปรโมชั่นสำเร็จ', type: 'success' });
      } else {
        setToast({ show: true, message: 'บันทึกไม่สำเร็จ อาจต้องล็อกอินใหม่', type: 'error' });
      }
    } catch (error) {
        setToast({ show: true, message: 'เกิดข้อผิดพลาดในการบันทึกข้อมูล', type: 'error' });
    }
  };

  const confirmDelete = (id: string, title: string) => {
    setConfirmConfig({ isOpen: true, id, title: 'ลบโปรโมชั่น?', message: `คุณแน่ใจหรือไม่ว่าต้องการลบโปรโมชั่น "${title}"?` });
  };

  const executeDelete = async () => {
    if (!confirmConfig) return;
    try {
      const token = localStorage.getItem('token');
      const headers: any = {};
      if (token) headers['Authorization'] = `Bearer ${token}`;

      const res = await fetch(`${API_PROMOTIONS_URL}/${confirmConfig.id}`, { method: 'DELETE', headers });
      if (res.ok) {
        setConfirmConfig(null);
        fetchPromotions();
        setToast({ show: true, message: 'ลบโปรโมชั่นเรียบร้อยแล้ว', type: 'success' });
      }
    } catch (error) {
      setToast({ show: true, message: 'ไม่สามารถลบโปรโมชั่นได้', type: 'error' });
    }
  };

  const toggleStatus = async (promo: Promotion) => {
    try {
      const token = localStorage.getItem('token');
      const headers: any = { 'Content-Type': 'application/json' };
      if (token) headers['Authorization'] = `Bearer ${token}`;

      const res = await fetch(`${API_PROMOTIONS_URL}/${promo._id}`, {
        method: 'PUT',
        headers,
        body: JSON.stringify({ ...promo, isActive: !promo.isActive }),
      });

      if (res.ok) {
        fetchPromotions();
        setToast({ show: true, message: 'อัปเดตสถานะสำเร็จ', type: 'success' });
      }
    } catch (error) {
      setToast({ show: true, message: 'เกิดข้อผิดพลาดในการอัปเดตสถานะ', type: 'error' });
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-10 animate-in fade-in duration-500 font-thai pb-20">
      
      <StatusToast 
        show={toast.show} message={toast.message} type={toast.type} 
        onClose={() => setToast({...toast, show: false})} 
      />

      <ConfirmDialog 
        isOpen={confirmConfig?.isOpen || false} title={confirmConfig?.title || ''} message={confirmConfig?.message || ''}
        type="danger" onConfirm={executeDelete} onCancel={() => setConfirmConfig(null)}
      />

      {/* Header Dashboard */}
      <div className="flex justify-between items-center bg-white px-8 py-6 rounded-xl border border-zinc-100 shadow-sm transition-all hover:shadow-md">
         <div>
            <h1 className="text-xl font-black text-zinc-950 uppercase tracking-tight">Promotion Management</h1>
            <p className="text-zinc-400 text-[9px] font-black uppercase tracking-[0.2em] mt-1">Manage special offers and hot deals</p>
         </div>
         <button 
           onClick={() => {
             setEditingPromotion(null);
             setFormData({ title: '', subtitle: '', price: '', originalPrice: '', tag: '', image: '', isFeatured: false, isActive: true, order: promotions.length + 1 });
             setIsModalOpen(true);
           }}
           className="bg-black text-[#FFB800] px-8 py-3 rounded-lg text-[10px] font-black uppercase tracking-widest hover:bg-zinc-900 transition-all flex items-center gap-2 active:scale-95 shadow-lg shadow-zinc-200"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
            เพิ่มโปรโมชั่นใหม่
         </button>
      </div>

      {/* Promotions List Table */}
      <div className="bg-white rounded-2xl border border-zinc-100 shadow-sm overflow-hidden text-left">
         <table className="w-full border-collapse">
            <thead>
               <tr className="bg-zinc-50/50 border-b border-zinc-100">
                  <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-zinc-400">Image</th>
                  <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-zinc-400">Details</th>
                  <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-zinc-400 text-center">Status</th>
                  <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-zinc-400 text-right">Actions</th>
               </tr>
            </thead>
            <tbody className="divide-y divide-zinc-50">
               {promotions.map((promo) => (
                 <tr key={promo._id} className="hover:bg-zinc-50/30 transition-colors group">
                    <td className="px-8 py-4">
                       <div className="w-24 h-16 rounded-xl overflow-hidden bg-zinc-100 border border-zinc-200 relative">
                          {promo.image ? (
                             <img src={promo.image} alt="" className="w-full h-full object-cover" />
                          ) : (
                             <div className="w-full h-full flex items-center justify-center text-[10px] text-zinc-300 font-black italic">IMG</div>
                          )}
                          {promo.isFeatured && (
                            <div className="absolute top-1 left-1 bg-[#FFB800] text-black text-[8px] px-1.5 py-0.5 rounded font-black uppercase">HOT</div>
                          )}
                       </div>
                    </td>
                    <td className="px-8 py-4">
                       <p className="font-black text-zinc-950 text-sm leading-tight flex items-center gap-2">
                         {promo.title}
                         {promo.tag && <span className="bg-zinc-100 text-zinc-500 text-[9px] px-2 py-0.5 rounded-md">{promo.tag}</span>}
                       </p>
                       <p className="text-[11px] text-zinc-400 mt-1 line-clamp-1">{promo.subtitle}</p>
                       <div className="flex gap-2 mt-2 items-center">
                          <span className="text-[#FFB800] font-black text-xs">{promo.price}</span>
                          {promo.originalPrice && <span className="text-zinc-400 line-through text-[10px]">{promo.originalPrice}</span>}
                       </div>
                    </td>
                    <td className="px-8 py-4 text-center">
                       <button onClick={() => toggleStatus(promo)} className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-colors ${promo.isActive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-600'}`}>
                          {promo.isActive ? 'ACTIVE' : 'HIDDEN'}
                       </button>
                    </td>
                    <td className="px-8 py-4 text-right">
                       <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button onClick={() => { setEditingPromotion(promo); setFormData(promo); setIsModalOpen(true); }} className="p-2 text-zinc-400 hover:text-zinc-950 bg-zinc-50 rounded-lg transition-all">
                             <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                          </button>
                          <button onClick={() => confirmDelete(promo._id!, promo.title)} className="p-2 text-zinc-400 hover:text-red-500 bg-zinc-50 rounded-lg transition-all">
                             <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
                          </button>
                       </div>
                    </td>
                 </tr>
               ))}
               {promotions.length === 0 && (
                 <tr>
                    <td colSpan={4} className="px-8 py-20 text-center text-zinc-400 text-sm font-bold animate-pulse uppercase tracking-widest">No promotions created yet</td>
                 </tr>
               )}
            </tbody>
         </table>
      </div>

      {/* PROMOTION CONSOLE MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[150] flex items-center justify-center p-6 backdrop-blur-sm bg-zinc-950/30">
           <div className="bg-white w-full max-w-2xl rounded-[1.5rem] shadow-2xl overflow-hidden border border-zinc-100 animate-in zoom-in-95 duration-400 max-h-[90vh] overflow-y-auto">
              
              <div className="px-8 py-6 border-b border-zinc-50 flex justify-between items-center sticky top-0 bg-white/90 backdrop-blur-md z-10">
                 <h3 className="text-sm font-black text-zinc-950 uppercase tracking-widest flex items-center gap-2">
                    PROMOTION CONSOLE
                    <span className="w-1.5 h-1.5 bg-[#FFB800] rounded-full"></span>
                 </h3>
                 <button onClick={() => setIsModalOpen(false)} className="text-zinc-300 hover:text-zinc-950">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                 </button>
              </div>

              <form onSubmit={handleSubmit} className="p-8 space-y-6">
                 
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 pl-1">Title (หัวข้อโปรโมชั่น)</label>
                      <input required placeholder="Ex: Premium Bundle Set" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} className="w-full bg-zinc-50/50 rounded-xl px-4 py-3 border border-zinc-100 focus:bg-white focus:ring-1 focus:ring-[#FFB800] outline-none font-black text-xs transition-all" />
                   </div>
                   <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 pl-1">Tag / Badge</label>
                      <input placeholder="Ex: Bestseller, Hot Deal" value={formData.tag} onChange={(e) => setFormData({...formData, tag: e.target.value})} className="w-full bg-zinc-50/50 rounded-xl px-4 py-3 border border-zinc-100 focus:bg-white focus:ring-1 focus:ring-[#FFB800] outline-none text-xs" />
                   </div>
                 </div>

                 <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 pl-1">Subtitle (รายละเอียดสั้นๆ)</label>
                    <textarea required placeholder="ตรวจสายตาพร้อมรับกรอบแว่น..." value={formData.subtitle} onChange={(e) => setFormData({...formData, subtitle: e.target.value})} className="w-full bg-zinc-50/50 rounded-xl px-4 py-3 border border-zinc-100 focus:bg-white focus:ring-1 focus:ring-[#FFB800] outline-none font-bold text-xs transition-all resize-none h-20" />
                 </div>

                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                       <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 pl-1">Price (ราคาขาย)</label>
                       <input required placeholder="Ex: ฿3,990" value={formData.price} onChange={(e) => setFormData({...formData, price: e.target.value})} className="w-full bg-zinc-50/50 rounded-xl px-4 py-3 border border-zinc-100 focus:bg-white focus:ring-1 focus:ring-[#FFB800] outline-none font-black text-xs text-[#FFB800]" />
                    </div>
                    <div className="space-y-2">
                       <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 pl-1">Original Price (ราคาปกติ - ขีดฆ่า)</label>
                       <input placeholder="Ex: ฿5,900" value={formData.originalPrice} onChange={(e) => setFormData({...formData, originalPrice: e.target.value})} className="w-full bg-zinc-50/50 rounded-xl px-4 py-3 border border-zinc-100 focus:bg-white focus:ring-1 focus:ring-[#FFB800] outline-none text-xs text-zinc-500" />
                    </div>
                 </div>

                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-end">
                    <div className="space-y-2">
                       <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 pl-1">Image Upload</label>
                       <button 
                         type="button" 
                         onClick={() => fileInputRef.current?.click()}
                         className="w-full py-3 bg-zinc-50 border border-dashed border-zinc-200 rounded-xl text-[10px] font-black uppercase text-zinc-400 hover:text-zinc-950 hover:border-zinc-950 transition-all overflow-hidden truncate px-4"
                       >
                          {uploading ? 'Uploading...' : formData.image ? 'CHANGE IMAGE' : 'CLICK TO UPLOAD'}
                       </button>
                       <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleImageUpload} disabled={uploading} />
                    </div>
                    <div className="space-y-2">
                       <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 pl-1">Order</label>
                       <input type="number" value={formData.order} onChange={(e) => setFormData({...formData, order: parseInt(e.target.value)})} className="w-full bg-zinc-50/50 rounded-xl px-4 py-3 border border-zinc-100 outline-none text-xs font-black" />
                    </div>
                 </div>

                 <div className="flex gap-6 border-t border-zinc-100 pt-6">
                   <label className="flex items-center gap-3 cursor-pointer">
                     <input type="checkbox" checked={formData.isFeatured} onChange={(e) => setFormData({...formData, isFeatured: e.target.checked})} className="w-4 h-4 rounded text-[#FFB800] focus:ring-[#FFB800]" />
                     <span className="text-xs font-black uppercase text-zinc-950">Featured (แสดงเด่น)</span>
                   </label>
                   <label className="flex items-center gap-3 cursor-pointer">
                     <input type="checkbox" checked={formData.isActive} onChange={(e) => setFormData({...formData, isActive: e.target.checked})} className="w-4 h-4 rounded text-[#FFB800] focus:ring-[#FFB800]" />
                     <span className="text-xs font-black uppercase text-zinc-950">Active (เปิดใช้งาน)</span>
                   </label>
                 </div>

                 <div className="flex justify-end gap-6 pt-4">
                    <button type="button" onClick={() => setIsModalOpen(false)} className="text-[10px] font-black uppercase tracking-widest text-zinc-300 hover:text-zinc-950 transition-all font-thai">ยกเลิก</button>
                    <button type="submit" className="bg-zinc-950 text-[#FFB800] px-10 py-3.5 rounded-xl text-[11px] font-black uppercase tracking-widest hover:bg-[#FFB800] hover:text-black transition-all shadow-xl active:scale-95 font-thai">
                       {editingPromotion ? 'บันทึกการแก้ไข' : 'เพิ่มโปรโมชั่น'}
                    </button>
                 </div>
              </form>
           </div>
        </div>
      )}
    </div>
  );
}
