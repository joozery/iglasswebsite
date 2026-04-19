'use client';

import React, { useState, useEffect, useRef } from 'react';
import ConfirmDialog from '@/components/ui/ConfirmDialog';
import StatusToast from '@/components/ui/StatusToast';

interface GalleryItem {
  _id?: string;
  src: string;
  order: number;
}

const API_GALLERY_URL = 'http://localhost:5001/api/gallery';
const API_UPLOAD_URL = 'http://localhost:5001/api/upload';

const SLOTS = [
  { label: 'รูปใหญ่ (Featured)', span: 'col-span-2 row-span-2' },
  { label: 'ปกติ 2', span: 'col-span-1 row-span-1' },
  { label: 'ปกติ 3', span: 'col-span-1 row-span-1' },
  { label: 'ปกติ 4', span: 'col-span-1 row-span-1' },
  { label: 'ปกติ 5', span: 'col-span-1 row-span-1' },
  { label: 'ปกติ 6', span: 'col-span-1 row-span-1' },
  { label: 'ปกติ 7', span: 'col-span-1 row-span-1' },
  { label: 'รูปกว้าง (Wide Bottom)', span: 'col-span-2 row-span-1' },
];

export default function GalleryManagementPage() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<GalleryItem | null>(null);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState<GalleryItem>({
    src: '', order: 0
  });

  const [confirmConfig, setConfirmConfig] = useState<{isOpen: boolean; id: string; title: string; message: string} | null>(null);
  const [toast, setToast] = useState<{show: boolean; message: string; type: 'success' | 'error'}>({
    show: false, message: '', type: 'success'
  });

  const fetchItems = async () => {
    try {
      const res = await fetch(API_GALLERY_URL);
      const data = await res.json();
      setItems(data);
    } catch (error) {
      console.error('Error fetching gallery:', error);
    }
  };

  useEffect(() => {
    fetchItems();
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
        setFormData(prev => ({ ...prev, src: data.url }));
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
      const method = editingItem ? 'PUT' : 'POST';
      const url = editingItem ? `${API_GALLERY_URL}/${editingItem._id}` : API_GALLERY_URL;
      
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setIsModalOpen(false);
        setEditingItem(null);
        fetchItems();
        setToast({ show: true, message: editingItem ? 'อัปเดตแกลเลอรีสำเร็จ' : 'เพิ่มรูปภาพสำเร็จ', type: 'success' });
      }
    } catch (error) {
        setToast({ show: true, message: 'เกิดข้อผิดพลาดในการบันทึกข้อมูล', type: 'error' });
    }
  };

  const executeDelete = async () => {
    if (!confirmConfig) return;
    try {
      await fetch(`${API_GALLERY_URL}/${confirmConfig.id}`, { method: 'DELETE' });
      setConfirmConfig(null);
      fetchItems();
      setToast({ show: true, message: 'ลบรูปภาพเรียบร้อยแล้ว', type: 'success' });
    } catch (error) {
      setToast({ show: true, message: 'ไม่สามารถลบรูปภาพได้', type: 'error' });
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

      <div className="flex justify-between items-center bg-white px-8 py-6 rounded-xl border border-zinc-100 shadow-sm transition-all hover:shadow-md mt-8">
         <div>
            <h1 className="text-xl font-black text-zinc-950 uppercase tracking-tight">Gallery Showcase</h1>
            <p className="text-zinc-400 text-[9px] font-black uppercase tracking-[0.2em] mt-1">Manage shop ambiance & specialist moments</p>
         </div>
         <button 
           onClick={() => {
             setEditingItem(null);
             setFormData({ src: '', order: items.length + 1 });
             setIsModalOpen(true);
           }}
           className="bg-black text-[#FFB800] px-8 py-3 rounded-lg text-[10px] font-black uppercase tracking-widest hover:bg-zinc-900 transition-all flex items-center gap-2 active:scale-95 shadow-lg shadow-zinc-200"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
            เพิ่มรูปภาพใหม่
         </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[160px]">
         {SLOTS.map((slot, i) => {
           const item = items.find(it => it.order === i + 1);
           return (
             <div key={i} className={`relative rounded-2xl overflow-hidden border-2 border-dashed border-zinc-200 hover:border-zinc-400 transition-all group ${slot.span}`}>
                {item ? (
                   <>
                     <img src={item.src} alt="" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                     <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center p-4">
                        <div className="flex gap-2 mb-2">
                           <button onClick={() => { setEditingItem(item); setFormData(item); setIsModalOpen(true); }} className="w-8 h-8 rounded-lg bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all">
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                           </button>
                           <button onClick={() => setConfirmConfig({ isOpen: true, id: item._id!, title: 'ลบรูปภาพ?', message: 'คุณแน่ใจหรือไม่?' })} className="w-8 h-8 rounded-lg bg-red-500/20 backdrop-blur-md border border-red-500/20 flex items-center justify-center text-red-500 hover:bg-red-500 hover:text-white transition-all">
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
                           </button>
                        </div>
                        <span className="text-[9px] font-black uppercase text-white/50 tracking-widest">{slot.label}</span>
                     </div>
                   </>
                ) : (
                   <div 
                     onClick={() => { setFormData({ src: '', order: i + 1 }); setIsModalOpen(true); }}
                     className="w-full h-full flex flex-col items-center justify-center cursor-pointer hover:bg-zinc-50 transition-colors"
                   >
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="zinc-300" strokeWidth="2.5" className="mb-2"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="m21 15-5-5L5 21"/></svg>
                      <span className="text-[9px] font-black uppercase text-zinc-300 tracking-widest">{slot.label}</span>
                   </div>
                )}
             </div>
           );
         })}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-[150] flex items-center justify-center p-6 backdrop-blur-sm bg-zinc-950/30">
           <div className="bg-white w-full max-w-lg rounded-[1.5rem] shadow-2xl overflow-hidden border border-zinc-100 animate-in zoom-in-95 duration-400">
              <div className="px-8 py-6 border-b border-zinc-50 flex justify-between items-center bg-zinc-50/50">
                 <h3 className="text-sm font-black text-zinc-950 uppercase tracking-widest flex items-center gap-2">
                    GALLERY CONSOLE
                    <span className="w-1.5 h-1.5 bg-[#FFB800] rounded-full"></span>
                 </h3>
                 <button onClick={() => setIsModalOpen(false)} className="text-zinc-300 hover:text-zinc-950 transition-colors">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                 </button>
              </div>

              <form onSubmit={handleSubmit} className="p-8 space-y-6">
                 <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 pl-1">Display Slot (1-8)</label>
                    <input type="number" min={1} max={8} required value={formData.order} onChange={(e) => setFormData({...formData, order: parseInt(e.target.value)})} className="w-full bg-zinc-50/50 rounded-xl px-4 py-3 border border-zinc-100 outline-none text-xs font-black" />
                    <p className="text-[8px] text-zinc-400 font-bold uppercase mt-1 italic pl-1 text-center">
                       {SLOTS[formData.order - 1]?.label || 'Invalid Slot'}
                    </p>
                 </div>

                 <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 pl-1">Photo Upload</label>
                    <button 
                      type="button" 
                      onClick={() => fileInputRef.current?.click()}
                      className="w-full h-40 bg-zinc-50 border-2 border-dashed border-zinc-100 rounded-2xl flex flex-col items-center justify-center group overflow-hidden relative"
                    >
                       {formData.src ? (
                          <img src={formData.src} alt="" className="w-full h-full object-cover" />
                       ) : (
                          <>
                            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#ddd" strokeWidth="2.5" className="mb-2 group-hover:stroke-black transition-colors"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="m21 15-5-5L5 21"/></svg>
                            <span className="text-[9px] font-black uppercase text-zinc-300 group-hover:text-black">Click to upload photo</span>
                          </>
                       )}
                       {uploading && <div className="absolute inset-0 bg-white/80 flex items-center justify-center text-[10px] font-black uppercase italic">Uploading...</div>}
                    </button>
                    <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleImageUpload} disabled={uploading} />
                 </div>

                 <div className="flex justify-end gap-6 pt-4">
                    <button type="button" onClick={() => setIsModalOpen(false)} className="text-[10px] font-black uppercase tracking-widest text-zinc-300 hover:text-zinc-950 transition-all font-thai text-center md:text-left">ยกเลิก</button>
                    <button type="submit" className="bg-zinc-950 text-[#FFB800] px-10 py-3.5 rounded-xl text-[11px] font-black uppercase tracking-widest hover:bg-[#FFB800] hover:text-black transition-all shadow-xl active:scale-95 font-thai">
                       {editingItem ? 'บันทึกการแก้ไข' : 'บันทึกรูปภาพ'}
                    </button>
                 </div>
              </form>
           </div>
        </div>
      )}
    </div>
  );
}
