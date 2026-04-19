'use client';

import React, { useState, useEffect, useRef } from 'react';
import ConfirmDialog from '@/components/ui/ConfirmDialog';
import StatusToast from '@/components/ui/StatusToast';

interface Brand {
  _id?: string;
  name: string;
  logo: string;
  order: number;
}

const API_BRANDS_URL = 'http://localhost:5001/api/brands';
const API_UPLOAD_URL = 'http://localhost:5001/api/upload';

export default function BrandManagementPage() {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBrand, setEditingBrand] = useState<Brand | null>(null);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState<Brand>({
    name: '', logo: '', order: 0
  });

  const [confirmConfig, setConfirmConfig] = useState<{isOpen: boolean; id: string; title: string; message: string} | null>(null);
  const [toast, setToast] = useState<{show: boolean; message: string; type: 'success' | 'error'}>({
    show: false, message: '', type: 'success'
  });

  const fetchBrands = async () => {
    try {
      const res = await fetch(API_BRANDS_URL);
      const data = await res.json();
      setBrands(data);
    } catch (error) {
      console.error('Error fetching brands:', error);
    }
  };

  useEffect(() => {
    fetchBrands();
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
        setFormData(prev => ({ ...prev, logo: data.url }));
        setToast({ show: true, message: 'อัปโหลดโลโก้สำเร็จ!', type: 'success' });
      } else {
        setToast({ show: true, message: 'อัปโหลดโลโก้ไม่สำเร็จ', type: 'error' });
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
      const method = editingBrand ? 'PUT' : 'POST';
      const url = editingBrand ? `${API_BRANDS_URL}/${editingBrand._id}` : API_BRANDS_URL;
      
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setIsModalOpen(false);
        setEditingBrand(null);
        fetchBrands();
        setToast({ show: true, message: editingBrand ? 'อัปเดตแบรนด์สำเร็จ' : 'เพิ่มแบรนด์สำเร็จ', type: 'success' });
      }
    } catch (error) {
        setToast({ show: true, message: 'เกิดข้อผิดพลาดในการบันทึกข้อมูล', type: 'error' });
    }
  };

  const confirmDelete = (id: string, title: string) => {
    setConfirmConfig({ isOpen: true, id, title: 'ลบแบรนด์?', message: `คุณแน่ใจหรือไม่ว่าต้องการลบแบรนด์ "${title}"?` });
  };

  const executeDelete = async () => {
    if (!confirmConfig) return;
    try {
      await fetch(`${API_BRANDS_URL}/${confirmConfig.id}`, { method: 'DELETE' });
      setConfirmConfig(null);
      fetchBrands();
      setToast({ show: true, message: 'ลบแบรนด์เรียบร้อยแล้ว', type: 'success' });
    } catch (error) {
      setToast({ show: true, message: 'ไม่สามารถลบแบรนด์ได้', type: 'error' });
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-10 animate-in fade-in duration-500 font-thai pb-20 px-4">
      
      <StatusToast 
        show={toast.show} message={toast.message} type={toast.type} 
        onClose={() => setToast({...toast, show: false})} 
      />

      <ConfirmDialog 
        isOpen={confirmConfig?.isOpen || false} title={confirmConfig?.title || ''} message={confirmConfig?.message || ''}
        type="danger" onConfirm={executeDelete} onCancel={() => setConfirmConfig(null)}
      />

      {/* Header Dashboard */}
      <div className="flex justify-between items-center bg-white px-8 py-6 rounded-xl border border-zinc-100 shadow-sm transition-all hover:shadow-md mt-8">
         <div>
            <h1 className="text-xl font-black text-zinc-950 uppercase tracking-tight">Brand Assets</h1>
            <p className="text-zinc-400 text-[9px] font-black uppercase tracking-[0.2em] mt-1">Manage partner logos & premium lens brands</p>
         </div>
         <button 
           onClick={() => {
             setEditingBrand(null);
             setFormData({ name: '', logo: '', order: brands.length + 1 });
             setIsModalOpen(true);
           }}
           className="bg-black text-[#FFB800] px-8 py-3 rounded-lg text-[10px] font-black uppercase tracking-widest hover:bg-zinc-900 transition-all flex items-center gap-2 active:scale-95 shadow-lg shadow-zinc-200"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
            เพิ่มแบรนด์ใหม่
         </button>
      </div>

      {/* Brands List Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
         {brands.map((brand) => (
           <div key={brand._id} className="bg-white rounded-2xl border border-zinc-100 shadow-sm overflow-hidden text-center group relative hover:shadow-xl transition-all duration-500 p-6 flex flex-col items-center">
              <div className="w-full aspect-video bg-zinc-50 rounded-xl flex items-center justify-center p-4 mb-4 border border-zinc-100">
                 {brand.logo ? (
                    <img src={brand.logo} alt={brand.name} className="max-w-full max-h-full object-contain filter grayscale group-hover:grayscale-0 transition-all duration-500" />
                 ) : (
                    <span className="text-[10px] font-black italic text-zinc-200 uppercase">Logo missing</span>
                 )}
              </div>
              <h4 className="text-[11px] font-black text-zinc-950 uppercase tracking-widest">{brand.name}</h4>
              <span className="text-[8px] font-black text-zinc-400 mt-1">ORDER: {brand.order}</span>

              <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0">
                 <button onClick={() => { setEditingBrand(brand); setFormData(brand); setIsModalOpen(true); }} className="p-2 text-zinc-400 hover:text-zinc-950 bg-white rounded-lg shadow-lg border border-zinc-100 transition-all">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                 </button>
                 <button onClick={() => confirmDelete(brand._id!, brand.name)} className="p-2 text-zinc-400 hover:text-red-500 bg-white rounded-lg shadow-lg border border-zinc-100 transition-all">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
                 </button>
              </div>
           </div>
         ))}
         {brands.length === 0 && (
           <div className="col-span-full py-20 text-center bg-zinc-50 rounded-2xl border border-dashed border-zinc-200">
              <p className="text-zinc-400 text-[11px] font-black uppercase tracking-widest">No brand logos uploaded yet</p>
           </div>
         )}
      </div>

      {/* BRAND CONSOLE MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[150] flex items-center justify-center p-6 backdrop-blur-sm bg-zinc-950/30">
           <div className="bg-white w-full max-w-lg rounded-[1.5rem] shadow-2xl overflow-hidden border border-zinc-100 animate-in zoom-in-95 duration-400">
              
              <div className="px-8 py-6 border-b border-zinc-50 flex justify-between items-center bg-zinc-50/50">
                 <h3 className="text-sm font-black text-zinc-950 uppercase tracking-widest flex items-center gap-2">
                    BRAND CONSOLE
                    <span className="w-1.5 h-1.5 bg-[#FFB800] rounded-full"></span>
                 </h3>
                 <button onClick={() => setIsModalOpen(false)} className="text-zinc-300 hover:text-zinc-950 transition-colors">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                 </button>
              </div>

              <form onSubmit={handleSubmit} className="p-8 space-y-6">
                 <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 pl-1">Brand Name (ชื่อแบรนด์)</label>
                    <input required type="text" placeholder="Ex: Essilor, Zeiss" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full bg-zinc-50/50 rounded-xl px-4 py-3 border border-zinc-100 focus:bg-white focus:ring-1 focus:ring-[#FFB800] outline-none font-black text-xs transition-all" />
                 </div>

                 <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                       <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 pl-1">Display Order</label>
                       <input type="number" value={formData.order} onChange={(e) => setFormData({...formData, order: parseInt(e.target.value)})} className="w-full bg-zinc-50/50 rounded-xl px-4 py-3 border border-zinc-100 outline-none text-xs font-black" />
                    </div>
                    <div className="space-y-2">
                       <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 pl-1">Upload Logo</label>
                       <button 
                         type="button" 
                         onClick={() => fileInputRef.current?.click()}
                         className="w-full h-[46px] bg-zinc-950 text-white rounded-xl text-[9px] font-black uppercase tracking-widest hover:bg-[#FFB800] hover:text-black transition-all shadow-lg active:scale-95"
                       >
                          {uploading ? 'Processing...' : (formData.logo ? 'Change Logo' : 'Choose File')}
                       </button>
                       <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleImageUpload} disabled={uploading} />
                    </div>
                 </div>

                 {formData.logo && (
                    <div className="mt-4 p-4 bg-zinc-50 rounded-xl border border-zinc-100 flex items-center justify-center h-24 overflow-hidden relative group">
                       <img src={formData.logo} alt="Preview" className="max-w-full max-h-full object-contain" />
                       <button type="button" onClick={() => setFormData({...formData, logo: ''})} className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full text-[8px] opacity-0 group-hover:opacity-100 transition-opacity translate-x-2 group-hover:translate-x-0">
                          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                       </button>
                    </div>
                 )}

                 <div className="flex justify-end gap-6 pt-4">
                    <button type="button" onClick={() => setIsModalOpen(false)} className="text-[10px] font-black uppercase tracking-widest text-zinc-300 hover:text-zinc-950 transition-all font-thai">ยกเลิก</button>
                    <button type="submit" className="bg-zinc-950 text-[#FFB800] px-10 py-3.5 rounded-xl text-[11px] font-black uppercase tracking-widest hover:bg-[#FFB800] hover:text-black transition-all shadow-xl active:scale-95 font-thai">
                       {editingBrand ? 'บันทึกการแก้ไข' : 'เพิ่มแบรนด์'}
                    </button>
                 </div>
              </form>
           </div>
        </div>
      )}
    </div>
  );
}
