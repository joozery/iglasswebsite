import React from 'react';

const steps = [
  { id: '1', title: 'ลงทะเบียน', desc: 'ลงทะเบียนและประวัติสุขภาพ', icon: <UserIcon /> },
  { id: '2', title: 'ตรวจวัดสายตา', desc: 'ตรวจวัดความชัดด้วยระบบ Digital', icon: <EyeIcon /> },
  { id: '3', title: 'เลือกกรอบและเลนส์', desc: 'แบรนด์เนมชั้นนำหลากหลายสไตล์', icon: <GlassesIcon /> },
  { id: '4', title: 'Fitting ตา', desc: 'ปรับแต่งให้เข้ากับโฟกัสสายตา', icon: <LayoutIcon /> },
  { id: '5', title: 'ตรวจสอบคุณภาพ', desc: 'เช็คความถูกต้องและงานประกอบ', icon: <CheckDoneIcon /> },
  { id: '6', title: 'ส่งมอบงาน', desc: 'แนะนำการดูแลรักษาแว่นตา', icon: <DeliveryIcon /> },
];

export default function ServiceSteps() {
  return (
    <section className="py-16 bg-white border-t border-zinc-100">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
           <h2 className="text-xl font-bold text-zinc-950 uppercase tracking-widest mb-2">Service Process</h2>
           <p className="text-zinc-400 text-[10px] font-black uppercase tracking-[0.4em]">ขั้นตอนการรับบริการ</p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-6 gap-4">
           {steps.map((s) => (
             <div key={s.id} className="p-6 border border-zinc-100 flex flex-col items-center text-center group hover:border-[#FFB800] transition-all bg-white shadow-sm">
                <div className="text-zinc-950 mb-4 group-hover:text-[#FFB800] transition-colors">
                   {s.icon}
                </div>
                <div className="space-y-1">
                   <h3 className="text-[12px] font-black text-zinc-950 uppercase leading-tight">
                      {s.id}. {s.title}
                   </h3>
                   <p className="text-zinc-400 text-[9px] font-bold leading-relaxed px-2">
                      {s.desc}
                   </p>
                </div>
             </div>
           ))}
        </div>
      </div>
    </section>
  );
}

function UserIcon() {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>;
}
function EyeIcon() {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>;
}
function GlassesIcon() {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="6" cy="15" r="4"/><circle cx="18" cy="15" r="4"/><path d="M14 15a2 2 0 0 0-4 0"/><path d="M2.5 13L5 7h14l2.5 6"/></svg>;
}
function LayoutIcon() {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="12" y1="3" x2="12" y2="21"/><line x1="3" y1="12" x2="21" y2="12"/></svg>;
}
function CheckDoneIcon() {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>;
}
function DeliveryIcon() {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="3" width="15" height="13"/><polyline points="16 8 20 8 23 11 23 16 16 16"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>;
}
