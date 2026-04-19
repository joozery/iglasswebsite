import React from 'react';

const services = [
  { id: 1, title: 'ตรวจโดยหมอสายตา', subtitle: 'ตรวจโดยหมอสายตาทุกเคส', icon: <StethoscopeIcon /> },
  { id: 2, title: 'ได้รับการรับรอง', subtitle: 'จากกระทรวงสาธารณสุข', icon: <MedalIcon /> },
  { id: 3, title: 'ประสบการณ์กว่า 3000 เคส', subtitle: 'มีประสบการณ์กว่า 3000 เคส', icon: <ChartIcon /> },
  { id: 4, title: 'กรอบแว่นคุณภาพ', subtitle: 'ให้เลือกมากกว่า 300 แบบ', icon: <GlassesIcon /> },
  { id: 5, title: 'บริการดี ราคา󰀄เหมาะสม', subtitle: 'บริการดี ราคาสมเหตุสมผล', icon: <DollarIcon /> },
  { id: 6, title: 'รีวิวแน่น เครื่องมือทันสมัย', subtitle: 'รีวิวแน่น เครื่องมือทันสมัย', icon: <StarIcon /> },
  { id: 7, title: 'บริการหลังการขาย', subtitle: 'บริการหลังการขายที่ดี', icon: <SupportIcon /> },
  { id: 8, title: 'ราคาเหมาะสม', subtitle: 'ไม่ขายในสิ่งที่เกินความจำเป็น', icon: <HeartIcon /> },
];

export default function KeyServices() {
  return (
    <section className="py-12 bg-zinc-50/50">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16 space-y-4">
           <h2 className="text-3xl font-black text-zinc-950 uppercase tracking-tight">บริการเด่นของเรา</h2>
           <p className="text-zinc-500 font-medium text-sm md:text-base">
              บริการตรวจวัดสายตาและจำหน่ายแว่นคุณภาพ โดยทีมงานมืออาชีพ
           </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
           {services.map((s) => (
             <div key={s.id} className="bg-white p-6 rounded-2xl border border-zinc-100 shadow-sm flex items-center justify-between group hover:shadow-md transition-all cursor-pointer">
                <div className="flex items-center gap-4">
                   <div className="w-12 h-12 rounded-xl bg-zinc-50 flex items-center justify-center text-[#FFB800] group-hover:bg-[#FFB800] group-hover:text-white transition-colors">
                      {s.icon}
                   </div>
                   <div>
                      <h4 className="text-[13px] font-black text-zinc-950 leading-tight mb-1">{s.title}</h4>
                      <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-tight">{s.subtitle}</p>
                   </div>
                </div>
                <div className="text-[#FFB800] opacity-0 group-hover:opacity-100 transition-opacity">
                   <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M5 12h14m-7-7 7 7-7 7" /></svg>
                </div>
             </div>
           ))}
        </div>
      </div>
    </section>
  );
}

function StethoscopeIcon() {
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M4.8 2.3A.3.3 0 1 0 5 2a.3.3 0 0 0-.2.3Z"/><path d="M3.9 4.6l-1.4 1.4A.3.3 0 0 0 2.7 6.3l1.4-1.4a.3.3 0 0 0-.2-.3z"/><path d="M8.2 2.3a.3.3 0 1 0 .2.3.3.3 0 0 0-.2-.3z"/><path d="M9.1 4.6l1.4 1.4a.3.3 0 0 0 .2.3.3.3 0 0 0-.2-.3z"/><path d="M12 11c0 3.5-1.5 6-4 6s-4-2.5-4-6V5h8v6Z"/><path d="M12 12h5"/><path d="M17 12a3 3 0 0 1 3 3v2a3 3 0 0 1-3 3h-2a3 3 0 0 1-3-3v-2a3 3 0 0 1 3-3z"/></svg>;
}
function MedalIcon() {
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="8" r="7"/><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/></svg>;
}
function ChartIcon() {
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M22 7L13.5 15.5L8.5 10.5L2 17"/><path d="M16 7H22V13"/></svg>;
}
function GlassesIcon() {
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="6" cy="15" r="4"/><circle cx="18" cy="15" r="4"/><path d="M14 15a2 2 0 0 0-4 0"/><path d="M2.5 13L5 7"/><path d="M21.5 13L19 7"/></svg>;
}
function DollarIcon() {
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>;
}
function StarIcon() {
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>;
}
function SupportIcon() {
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>;
}
function HeartIcon() {
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>;
}
