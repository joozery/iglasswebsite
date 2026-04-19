'use client';

import React, { useState, useEffect, useRef } from 'react';
import ConfirmDialog from '@/components/ui/ConfirmDialog';
import StatusToast from '@/components/ui/StatusToast';

interface Service {
  _id?: string;
  title: string;
  description: string;
  image: string;
  order: number;
}

const API_SERVICES_URL = 'http://localhost:5001/api/services';
const API_UPLOAD_URL = 'http://localhost:5001/api/upload';

export default function ServiceManagementPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState<Service>({
    title: '', description: '', image: '', order: 0
  });

  const [confirmConfig, setConfirmConfig] = useState<{isOpen: boolean; id: string; title: string; message: string} | null>(null);
  const [toast, setToast] = useState<{show: boolean; message: string; type: 'success' | 'error'}>({
    show: false, message: '', type: 'success'
  });

  const fetchServices = async () => {
    try {
      const res = await fetch(API_SERVICES_URL);
      const data = await res.json();
      setServices(data);
    } catch (error) {
      console.error('Error fetching services:', error);
    }
  };

  useEffect(() => {
    fetchServices();
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
      const method = editingService ? 'PUT' : 'POST';
      const url = editingService ? `${API_SERVICES_URL}/${editingService._id}` : API_SERVICES_URL;
      
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setIsModalOpen(false);
        setEditingService(null);
        fetchServices();
        setToast({ show: true, message: editingService ? 'อัปเดตบริการสำเร็จ' : 'เพิ่มบริการสำเร็จ', type: 'success' });
      }
    } catch (error) {
        setToast({ show: true, message: 'เกิดข้อผิดพลาดในการบันทึกข้อมูล', type: 'error' });
    }
  };

  const confirmDelete = (id: string, title: string) => {
    setConfirmConfig({ isOpen: true, id, title: 'ลบบริการ?', message: `คุณแน่ใจหรือไม่ว่าต้องการลบบริการ "${title}"?` });
  };

  const executeDelete = async () => {
    if (!confirmConfig) return;
    try {
      await fetch(`${API_SERVICES_URL}/${confirmConfig.id}`, { method: 'DELETE' });
      setConfirmConfig(null);
      fetchServices();
      setToast({ show: true, message: 'ลบบริการเรียบร้อยแล้ว', type: 'success' });
    } catch (error) {
      setToast({ show: true, message: 'ไม่สามารถลบบริการได้', type: 'error' });
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
            <h1 className="text-xl font-black text-zinc-950 uppercase tracking-tight">Service Management</h1>
            <p className="text-zinc-400 text-[9px] font-black uppercase tracking-[0.2em] mt-1">Manage shop highlights & customer benefits</p>
         </div>
         <button 
           onClick={() => {
             setEditingService(null);
             setFormData({ title: '', description: '', image: '', order: services.length + 1 });
             setIsModalOpen(true);
           }}
           className="bg-black text-[#FFB800] px-8 py-3 rounded-lg text-[10px] font-black uppercase tracking-widest hover:bg-zinc-900 transition-all flex items-center gap-2 active:scale-95 shadow-lg shadow-zinc-200"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
            เพิ่มบริการใหม่
         </button>
      </div>

      {/* Services List Table Style */}
      <div className="bg-white rounded-2xl border border-zinc-100 shadow-sm overflow-hidden text-left">
         <table className="w-full border-collapse">
            <thead>
               <tr className="bg-zinc-50/50 border-b border-zinc-100">
                  <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-zinc-400">Preview</th>
                  <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-zinc-400">Service Info</th>
                  <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-zinc-400 text-center">Order</th>
                  <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-zinc-400 text-right">Actions</th>
               </tr>
            </thead>
            <tbody className="divide-y divide-zinc-50">
               {services.map((svc) => (
                 <tr key={svc._id} className="hover:bg-zinc-50/30 transition-colors group">
                    <td className="px-8 py-4">
                       <div className="w-16 h-16 rounded-xl overflow-hidden bg-zinc-100 border border-zinc-200">
                          {svc.image ? (
                             <img src={svc.image} alt="" className="w-full h-full object-cover" />
                          ) : (
                             <div className="w-full h-full flex items-center justify-center text-[10px] text-zinc-300 font-black italic">IMG</div>
                          )}
                       </div>
                    </td>
                    <td className="px-8 py-4">
                       <p className="font-black text-zinc-950 text-sm whitespace-pre-line leading-tight">{svc.title}</p>
                       <p className="text-[11px] text-zinc-400 mt-1 line-clamp-1">{svc.description}</p>
                    </td>
                    <td className="px-8 py-4 text-center">
                       <span className="bg-zinc-100 text-zinc-950 px-3 py-1 rounded-full text-[10px] font-black">{svc.order}</span>
                    </td>
                    <td className="px-8 py-4 text-right">
                       <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button onClick={() => { setEditingService(svc); setFormData(svc); setIsModalOpen(true); }} className="p-2 text-zinc-400 hover:text-zinc-950 bg-zinc-50 rounded-lg transition-all">
                             <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                          </button>
                          <button onClick={() => confirmDelete(svc._id!, svc.title)} className="p-2 text-zinc-400 hover:text-red-500 bg-zinc-50 rounded-lg transition-all">
                             <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
                          </button>
                       </div>
                    </td>
                 </tr>
               ))}
               {services.length === 0 && (
                 <tr>
                    <td colSpan={4} className="px-8 py-20 text-center text-zinc-400 text-sm font-bold animate-pulse uppercase tracking-widest">No services created yet</td>
                 </tr>
               )}
            </tbody>
         </table>
      </div>

      {/* SERVICE CONSOLE MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[150] flex items-center justify-center p-6 backdrop-blur-sm bg-zinc-950/30">
           <div className="bg-white w-full max-w-xl rounded-[1.5rem] shadow-2xl overflow-hidden border border-zinc-100 animate-in zoom-in-95 duration-400">
              
              <div className="px-8 py-6 border-b border-zinc-50 flex justify-between items-center">
                 <h3 className="text-sm font-black text-zinc-950 uppercase tracking-widest flex items-center gap-2">
                    SERVICE CONSOLE
                    <span className="w-1.5 h-1.5 bg-[#FFB800] rounded-full"></span>
                 </h3>
                 <button onClick={() => setIsModalOpen(false)} className="text-zinc-300 hover:text-zinc-950">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                 </button>
              </div>

              <form onSubmit={handleSubmit} className="p-8 space-y-6">
                 <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 pl-1">Title (หัวข้อบริการ)</label>
                    <textarea required placeholder="Ex: รับประกันค่าสายตานานสูงสุด 90 วัน" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} className="w-full bg-zinc-50/50 rounded-xl px-4 py-3 border border-zinc-100 focus:bg-white focus:ring-1 focus:ring-[#FFB800] outline-none font-black text-xs transition-all resize-none leading-relaxed h-20" />
                 </div>

                 <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 pl-1">Description (คำบรรยาย)</label>
                    <textarea required placeholder="ระบุสิทธิประโยชน์..." value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} className="w-full bg-zinc-50/50 rounded-xl px-4 py-3 border border-zinc-100 focus:bg-white focus:ring-1 focus:ring-[#FFB800] outline-none font-bold text-xs transition-all resize-none leading-relaxed h-28" />
                 </div>

                 <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                       <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 pl-1">Display Order</label>
                       <input type="number" value={formData.order} onChange={(e) => setFormData({...formData, order: parseInt(e.target.value)})} className="w-full bg-zinc-50/50 rounded-xl px-4 py-3 border border-zinc-100 outline-none text-xs font-black" />
                    </div>
                    <div className="space-y-2">
                       <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 pl-1">Icon/Image</label>
                       <button 
                         type="button" 
                         onClick={() => fileInputRef.current?.click()}
                         className="w-full py-3 bg-zinc-50 border border-dashed border-zinc-200 rounded-xl text-[10px] font-black uppercase text-zinc-400 hover:text-zinc-950 hover:border-zinc-950 transition-all overflow-hidden truncate px-4"
                       >
                          {uploading ? 'Uploading...' : formData.image || 'CLICK TO UPLOAD'}
                       </button>
                       <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleImageUpload} disabled={uploading} />
                    </div>
                 </div>

                 <div className="flex justify-end gap-6 pt-4">
                    <button type="button" onClick={() => setIsModalOpen(false)} className="text-[10px] font-black uppercase tracking-widest text-zinc-300 hover:text-zinc-950 transition-all font-thai">ยกเลิก</button>
                    <button type="submit" className="bg-zinc-950 text-[#FFB800] px-10 py-3.5 rounded-xl text-[11px] font-black uppercase tracking-widest hover:bg-[#FFB800] hover:text-black transition-all shadow-xl active:scale-95 font-thai">
                       {editingService ? 'บันทึกการแก้ไข' : 'เพิ่มบริการ'}
                    </button>
                 </div>
              </form>
           </div>
        </div>
      )}
    </div>
  );
}
