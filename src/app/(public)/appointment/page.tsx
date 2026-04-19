'use client';
import { useState } from 'react';
import Image from 'next/image';

const SERVICES = ['ตรวจสายตาประกอบแว่น', 'ปรึกษาเลนส์โปรเกรสซีฟ', 'ตรวจสุขภาพดวงตาทั่วไป', 'ปรับดัด / ซ่อมแว่นตา'];
const TIME_SLOTS = ['ช่วงเช้า (11:00 - 14:00)', 'ช่วงบ่าย (14:00 - 17:00)', 'ช่วงเย็น (17:00 - 20:00)'];

export default function AppointmentPage() {
  const [formData, setFormData] = useState({
    service: '',
    date: '',
    timeSlot: '',
    fullName: '',
    phone: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.service || !formData.date || !formData.timeSlot || !formData.fullName || !formData.phone) {
      setMessage({ type: 'error', text: 'กรุณากรอกข้อมูลให้ครบสมบูรณ์' });
      return;
    }

    setIsSubmitting(true);
    setMessage(null);

    try {
      const res = await fetch('http://localhost:5001/api/appointments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setMessage({ type: 'success', text: 'นัดหมายสำเร็จ! เจ้าหน้าที่จะติดต่อกลับเพื่อยืนยันคิวโดยเร็วที่สุดครับ' });
        setFormData({ service: '', date: '', timeSlot: '', fullName: '', phone: '' });
      } else {
        throw new Error('Something went wrong');
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'เกิดข้อผิดพลาดในการทำรายการ กรุณาลองใหม่อีกครั้ง' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-zinc-50 min-h-screen pt-32 pb-20 font-thai">
      <section className="max-w-6xl mx-auto px-6">
        
        {/* Header Section */}
        <div className="text-center mb-16 space-y-4">
           <div className="inline-flex items-center gap-3">
              <span className="h-px w-8 bg-[#FFB800]"></span>
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#FFB800]">Booking Service</span>
           </div>
           <h1 className="text-4xl md:text-5xl font-black text-zinc-950 tracking-tight">
              นัดหมายตรวจวัดสายตา.
           </h1>
           {message && (
             <div className={`max-w-xl mx-auto p-4 rounded-xl text-sm font-bold animate-bounce ${message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
               {message.text}
             </div>
           )}
        </div>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Main Appointment Form */}
          <div className="lg:w-7/12">
             <div className="bg-white p-8 md:p-12 rounded-2xl border border-zinc-200 shadow-sm">
                <form className="space-y-10" onSubmit={handleSubmit}>
                   
                   {/* Step 1: Service */}
                   <div className="space-y-6">
                      <div className="flex items-center gap-4">
                         <div className="w-8 h-8 rounded-full bg-zinc-950 text-[#FFB800] flex items-center justify-center text-xs font-black">01</div>
                         <h3 className="font-black text-zinc-950 uppercase tracking-tight">เลือกบริการที่ต้องการ</h3>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                         {SERVICES.map((service) => (
                           <label key={service} className="relative group cursor-pointer">
                              <input 
                                type="radio" 
                                name="service" 
                                value={service}
                                checked={formData.service === service}
                                onChange={(e) => setFormData({...formData, service: e.target.value})}
                                className="peer sr-only" 
                              />
                              <div className="p-4 border border-zinc-100 rounded-xl bg-zinc-50 group-hover:border-[#FFB800] peer-checked:border-[#FFB800] peer-checked:bg-[#FFB800]/5 transition-all">
                                 <span className="text-sm font-bold text-zinc-600 peer-checked:text-zinc-950">{service}</span>
                              </div>
                           </label>
                         ))}
                      </div>
                   </div>

                   {/* Step 2: Date & Time */}
                   <div className="space-y-6">
                      <div className="flex items-center gap-4">
                         <div className="w-8 h-8 rounded-full bg-zinc-950 text-[#FFB800] flex items-center justify-center text-xs font-black">02</div>
                         <h3 className="font-black text-zinc-950 uppercase tracking-tight">ระบุวันและเวลา</h3>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                         <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase text-zinc-400 pl-1">เลือกวันที่</label>
                            <input 
                              type="date" 
                              value={formData.date}
                              onChange={(e) => setFormData({...formData, date: e.target.value})}
                              className="w-full bg-zinc-50 rounded-xl px-5 py-4 border border-zinc-100 focus:bg-white focus:ring-2 focus:ring-[#FFB800] outline-none font-bold text-zinc-900" 
                            />
                         </div>
                         <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase text-zinc-400 pl-1">เลือกช่วงเวลา</label>
                            <select 
                              value={formData.timeSlot}
                              onChange={(e) => setFormData({...formData, timeSlot: e.target.value})}
                              className="w-full bg-zinc-50 rounded-xl px-5 py-4 border border-zinc-100 focus:bg-white focus:ring-2 focus:ring-[#FFB800] outline-none font-bold text-zinc-900 appearance-none"
                            >
                               <option value="">กรุณาเลือกช่วงเวลา</option>
                               {TIME_SLOTS.map(t => <option key={t} value={t}>{t}</option>)}
                            </select>
                         </div>
                      </div>
                   </div>

                   {/* Step 3: Contact Info */}
                   <div className="space-y-6">
                      <div className="flex items-center gap-4">
                         <div className="w-8 h-8 rounded-full bg-zinc-950 text-[#FFB800] flex items-center justify-center text-xs font-black">03</div>
                         <h3 className="font-black text-zinc-950 uppercase tracking-tight">ข้อมูลการติดต่อ</h3>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                         <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase text-zinc-400 pl-1">ชื่อ-นามสกุล</label>
                            <input 
                              type="text" 
                              placeholder="Your Full Name" 
                              value={formData.fullName}
                              onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                              className="w-full bg-zinc-50 rounded-xl px-5 py-4 border border-zinc-100 focus:bg-white focus:ring-2 focus:ring-[#FFB800] outline-none font-bold text-zinc-900" 
                            />
                         </div>
                         <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase text-zinc-400 pl-1">เบอร์โทรศัพท์</label>
                            <input 
                              type="tel" 
                              placeholder="09X-XXX-XXXX" 
                              value={formData.phone}
                              onChange={(e) => setFormData({...formData, phone: e.target.value})}
                              className="w-full bg-zinc-50 rounded-xl px-5 py-4 border border-zinc-100 focus:bg-white focus:ring-2 focus:ring-[#FFB800] outline-none font-bold text-zinc-900" 
                            />
                         </div>
                      </div>
                   </div>

                   <button 
                     disabled={isSubmitting}
                     className={`w-full bg-zinc-950 text-white font-black uppercase tracking-[0.2em] text-xs py-6 rounded-xl hover:bg-[#FFB800] hover:text-black transition-all shadow-xl active:scale-[0.98] ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                   >
                      {isSubmitting ? 'กําลังส่งข้อมูล...' : 'ยืนยันการนัดหมายตอนนี้'}
                   </button>
                </form>
             </div>
          </div>

          {/* Sidebar */}
          <div className="lg:w-5/12 space-y-8">
             <div className="bg-zinc-950 p-10 rounded-2xl text-white relative overflow-hidden">
                <div className="relative z-10 space-y-6">
                   <h4 className="text-2xl font-black tracking-tight text-[#FFB800]">ทําไมต้องนัดหมาย?</h4>
                   <ul className="space-y-6">
                      {[
                        { title: 'ไม่ต้องรอคิว', desc: 'ได้รับการตรวจตรงตามเวลาที่นัดหมายทันที' },
                        { title: 'ตรวจละเอียด 30-45 นาที', desc: 'ให้นักทัศนมาตรดูแลคุณอย่างเต็มที่ทุกขั้นตอน' },
                        { title: 'ผู้เชี่ยวชาญเฉพาะทาง', desc: 'มั่นใจในผลการตรวจด้วยเครื่องมือวัดที่ทันสมัยที่สุด' }
                      ].map((item, i) => (
                        <li key={i} className="flex gap-4">
                           <div className="mt-1 text-[#FFB800]">
                              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M20 6L9 17l-5-5"/></svg>
                           </div>
                           <div>
                              <p className="font-black text-sm uppercase tracking-wider">{item.title}</p>
                              <p className="text-zinc-500 text-xs font-medium mt-1">{item.desc}</p>
                           </div>
                        </li>
                      ))}
                   </ul>
                </div>
                <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-[#FFB800]/10 rounded-full blur-[100px]"></div>
             </div>
          </div>
        </div>
      </section>
    </div>
  );
}
