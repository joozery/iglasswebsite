'use client';

import React, { useState, useEffect } from 'react';
import ConfirmDialog from '@/components/ui/ConfirmDialog';
import StatusToast from '@/components/ui/StatusToast';

interface AdminUser {
  _id?: string;
  name: string;
  email: string;
  role: string;
  status: string;
  username: string;
  password?: string;
}

const API_BAR_URL = 'http://localhost:5001/api/admins';

export default function AdminManagementPage() {
  const [admins, setAdmins] = useState<AdminUser[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAdmin, setEditingAdmin] = useState<AdminUser | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'Editor',
    username: '',
    password: '',
  });

  // UI State for Dialogs
  const [confirmConfig, setConfirmConfig] = useState<{isOpen: boolean; id: string; title: string; message: string} | null>(null);
  const [toast, setToast] = useState<{show: boolean; message: string; type: 'success' | 'error'}>({
    show: false,
    message: '',
    type: 'success'
  });

  const fetchAdmins = async () => {
    try {
      const res = await fetch(API_BAR_URL);
      const data = await res.json();
      setAdmins(data);
    } catch (error) {
       console.error('Error fetching admins:', error);
    }
  };

  useEffect(() => {
    fetchAdmins();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const method = editingAdmin ? 'PUT' : 'POST';
      const url = editingAdmin ? `${API_BAR_URL}/${editingAdmin._id}` : API_BAR_URL;
      
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setIsModalOpen(false);
        setEditingAdmin(null);
        setFormData({ name: '', email: '', role: 'Editor', username: '', password: '' });
        fetchAdmins();
        setToast({ 
           show: true, 
           message: editingAdmin ? 'อัปเดตข้อมูลผู้ดูแลระบบสำเร็จ' : 'สร้างบัญชีผู้ดูแลระบบใหม่สำเร็จ', 
           type: 'success' 
        });
      }
    } catch (error) {
        setToast({ show: true, message: 'เกิดข้อผิดพลาดในการบันทึกข้อมูล', type: 'error' });
    }
  };

  const confirmDelete = (id: string, name: string) => {
    setConfirmConfig({
      isOpen: true,
      id,
      title: 'ลบผู้ดูแลระบบ?',
      message: `คุณแน่ใจหรือไม่ว่าต้องการลบ ${name} ออกจากระบบ? การดำเนินการนี้ไม่สามารถย้อนกลับได้`
    });
  };

  const executeDelete = async () => {
    if (!confirmConfig) return;
    try {
      await fetch(`${API_BAR_URL}/${confirmConfig.id}`, { method: 'DELETE' });
      setConfirmConfig(null);
      fetchAdmins();
      setToast({ show: true, message: 'ลบข้อมูลผู้ดูแลระบบเรียบร้อยแล้ว', type: 'success' });
    } catch (error) {
      setToast({ show: true, message: 'ไม่สามารถลบข้อมูลได้', type: 'error' });
    }
  };

  const openEditModal = (admin: AdminUser) => {
    setEditingAdmin(admin);
    setFormData({
      name: admin.name,
      email: admin.email,
      role: admin.role,
      username: admin.username,
      password: '', 
    });
    setIsModalOpen(true);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6 animate-in fade-in duration-500 font-thai">
      
      {/* Toast Notification */}
      <StatusToast 
        show={toast.show} 
        message={toast.message} 
        type={toast.type} 
        onClose={() => setToast({...toast, show: false})} 
      />

      {/* Confirmation Dialog */}
      <ConfirmDialog 
        isOpen={confirmConfig?.isOpen || false}
        title={confirmConfig?.title || ''}
        message={confirmConfig?.message || ''}
        type="danger"
        onConfirm={executeDelete}
        onCancel={() => setConfirmConfig(null)}
      />

      {/* Compact Header */}
      <div className="flex justify-between items-center bg-white px-6 py-5 rounded-xl border border-zinc-200 shadow-sm">
         <div>
            <h1 className="text-lg font-black text-zinc-950 uppercase tracking-tight">จัดการผู้ดูแลระบบ</h1>
            <p className="text-zinc-400 text-[10px] font-bold uppercase tracking-widest mt-0.5">รวมทั้งหมด {admins.length} บัญชี</p>
         </div>
         <button 
           onClick={() => {
             setEditingAdmin(null);
             setFormData({ name: '', email: '', role: 'Editor', username: '', password: '' });
             setIsModalOpen(true);
           }}
           className="bg-zinc-950 text-[#FFB800] px-5 py-2.5 rounded-lg text-[10px] font-black uppercase tracking-widest hover:bg-[#FFB800] hover:text-black transition-all shadow-md active:scale-95 flex items-center gap-2"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
            เพิ่มผู้ดูแลระบบ
         </button>
      </div>

      {/* Admin List */}
      <div className="bg-white rounded-xl border border-zinc-200 shadow-sm overflow-hidden overflow-x-auto">
         <table className="w-full text-left">
            <thead>
               <tr className="bg-zinc-50/50 text-zinc-400 text-[9px] font-black uppercase tracking-widest border-b border-zinc-100">
                  <th className="px-6 py-4">ข้อมูลผู้ใช้งาน</th>
                  <th className="px-6 py-4">บทบาท</th>
                  <th className="px-6 py-4">สถานะล่าสุด</th>
                  <th className="px-6 py-4 text-right">จัดการ</th>
               </tr>
            </thead>
            <tbody className="divide-y divide-zinc-50">
               {admins.map((admin) => (
                 <tr key={admin._id} className="group hover:bg-zinc-50/50 transition-colors">
                    <td className="px-6 py-3">
                       <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-zinc-950 flex items-center justify-center text-[#FFB800] font-black text-[10px]">
                             {admin.name.substring(0, 2).toUpperCase()}
                          </div>
                          <div>
                             <p className="text-xs font-black text-zinc-950 leading-none">{admin.name}</p>
                             <p className="text-[9px] text-zinc-400 font-bold uppercase mt-1">ID: {admin.username}</p>
                          </div>
                       </div>
                    </td>
                    <td className="px-6 py-3">
                       <span className="text-[9px] font-black uppercase text-zinc-500 bg-zinc-100 px-2 py-0.5 rounded leading-none inline-block">
                          {admin.role}
                       </span>
                    </td>
                    <td className="px-6 py-3">
                       <div className="flex items-center gap-2">
                          <span className={`w-1.5 h-1.5 rounded-full ${admin.status === 'Active Now' ? 'bg-emerald-500 animate-pulse' : 'bg-zinc-300'}`}></span>
                          <span className="text-[9px] font-black uppercase text-zinc-400">{admin.status || 'Offline'}</span>
                       </div>
                    </td>
                    <td className="px-6 py-3 text-right">
                        <div className="flex justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                           <button onClick={() => openEditModal(admin)} className="p-1.5 text-zinc-400 hover:text-zinc-950 transition-all">
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                           </button>
                           <button onClick={() => confirmDelete(admin._id!, admin.name)} className="p-1.5 text-zinc-400 hover:text-red-500 transition-all">
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
                           </button>
                        </div>
                    </td>
                 </tr>
               ))}
            </tbody>
         </table>
      </div>

      {/* Edit/Create Modal code ... (remains mostly same, just ensuring correct styling) */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[150] flex items-center justify-center p-4">
           <div className="absolute inset-0 bg-zinc-950/40 backdrop-blur-sm" onClick={() => setIsModalOpen(false)}></div>
           <div className="relative bg-white w-full max-w-sm rounded-2xl shadow-2xl overflow-hidden border border-zinc-200">
              <div className="px-6 py-4 border-b border-zinc-100 flex justify-between items-center bg-zinc-50/50">
                 <h3 className="text-xs font-black text-zinc-950 uppercase tracking-widest font-thai">
                    {editingAdmin ? 'แก้ไขข้อมูลแอดมิน' : 'เพิ่มแอดมินคนใหม่'}
                 </h3>
                 <button onClick={() => setIsModalOpen(false)} className="text-zinc-400 hover:text-zinc-950 transition-colors">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                 </button>
              </div>

              <form onSubmit={handleSubmit} className="p-6 space-y-4 font-thai">
                 <div className="space-y-1">
                    <label className="text-[9px] font-black uppercase tracking-widest text-zinc-400 pl-1">ชื่อ-นามสกุล และ ID (สำหรับการล็อกอิน)</label>
                    <div className="grid grid-cols-2 gap-2">
                       <input required type="text" placeholder="ชื่อจริง-นามสกุล" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full bg-zinc-50 rounded-lg px-3 py-2 border border-zinc-200 focus:bg-white focus:ring-1 focus:ring-[#FFB800] outline-none font-bold text-xs" />
                       <input required type="text" placeholder="ID (Username)" value={formData.username} onChange={(e) => setFormData({...formData, username: e.target.value})} className="w-full bg-zinc-50 rounded-lg px-3 py-2 border border-zinc-200 focus:bg-white focus:ring-1 focus:ring-[#FFB800] outline-none font-bold text-xs" />
                    </div>
                 </div>

                 <div className="space-y-1">
                    <label className="text-[9px] font-black uppercase tracking-widest text-zinc-400 pl-1">รหัสผ่าน และ สิทธิ์การใช้งาน (Security)</label>
                    <div className="space-y-2">
                       <input 
                         required={!editingAdmin}
                         type="password" 
                         placeholder={editingAdmin ? "•••••• (เว้นว่างไว้ถ้าไม่ต้องการเปลี่ยน)" : "ตั้งรหัสผ่าน (Password)"}
                         value={formData.password} 
                         onChange={(e) => setFormData({...formData, password: e.target.value})} 
                         className="w-full bg-zinc-50 rounded-lg px-3 py-2 border border-zinc-200 focus:bg-white focus:ring-1 focus:ring-[#FFB800] outline-none font-bold text-xs" 
                       />
                       <select 
                         value={formData.role} 
                         onChange={(e) => setFormData({...formData, role: e.target.value})} 
                         className="w-full bg-zinc-50 rounded-lg px-3 py-2 border border-zinc-200 focus:bg-white focus:ring-1 focus:ring-[#FFB800] outline-none font-black text-[10px] text-zinc-950"
                       >
                          <option value="Super Admin">Super Admin (สิทธิ์สูงสุด)</option>
                          <option value="Manager">Manager (ตัวจัดการทั่วไป)</option>
                          <option value="Editor">Editor (ผู้แก้ไขเนื้อหา)</option>
                       </select>
                    </div>
                 </div>

                 <div className="space-y-1">
                    <label className="text-[9px] font-black uppercase tracking-widest text-zinc-400 pl-1">อีเมลติดต่อ (สำหรับการกู้คืนบัญชี)</label>
                    <input required type="email" placeholder="example@iglass.com" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="w-full bg-zinc-50 rounded-lg px-3 py-2 border border-zinc-200 focus:bg-white focus:ring-1 focus:ring-[#FFB800] outline-none font-bold text-xs" />
                 </div>

                 <button type="submit" className="w-full bg-zinc-950 text-[#FFB800] font-black uppercase tracking-widest text-[10px] py-4 rounded-xl hover:bg-[#FFB800] hover:text-black transition-all shadow-lg mt-2">
                    {editingAdmin ? 'บันทึกข้อมูลที่แก้ไข' : 'สร้างบัญชีผู้ใช้งานใหม่'}
                 </button>
              </form>
           </div>
        </div>
      )}

    </div>
  );
}
