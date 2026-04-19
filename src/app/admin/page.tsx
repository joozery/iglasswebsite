import React from 'react';

export default function AdminDashboard() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      
      {/* ── Stats Grid ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
         <StatsCard 
           title="ยอดขายนัดหมายวันนี้" 
           value="฿12,450" 
           change="+12.5%" 
           icon={<MoneyIcon />}
           isPositive 
         />
         <StatsCard 
           title="คิวนัดหมายใหม่" 
           value="18 ราย" 
           change="+4" 
           icon={<CalendarIcon />}
           isPositive 
         />
         <StatsCard 
           title="สินค้าใกล้หมด" 
           value="5 รายการ" 
           change="-2" 
           icon={<PackageIcon />}
           isPositive={false} 
         />
         <StatsCard 
           title="ลูกค้าใหม่เดือนนี้" 
           value="124 ท่าน" 
           change="+24%" 
           icon={<UsersIcon />}
           isPositive 
         />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         {/* ── Recent Appointments (Main Table) ── */}
         <div className="lg:col-span-2 bg-white rounded-xl border border-zinc-200 shadow-sm overflow-hidden">
            <div className="p-8 border-b border-zinc-100 flex justify-between items-center">
               <h3 className="text-xl font-black text-zinc-950 uppercase tracking-tight">คิวนัดหมายล่าสุด</h3>
               <button className="text-[12px] font-black uppercase text-[#FFB800] hover:underline transition-all">ดูทั้งหมด</button>
            </div>
            <div className="p-0 overflow-x-auto">
               <table className="w-full text-left">
                  <thead>
                     <tr className="bg-zinc-50/50 text-zinc-400 text-[10px] font-black uppercase tracking-widest border-b border-zinc-100">
                        <th className="px-8 py-5">ชื่อลูกค้า</th>
                        <th className="px-8 py-5">บริการที่ต้องการ</th>
                        <th className="px-8 py-5">วัน/เวลา</th>
                        <th className="px-8 py-5 text-right">สถานะ</th>
                     </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-50">
                     <AppointmentRow 
                       name="นราธร บุญทัศน์" 
                       service="ตรวจสายตารอบที่ 2" 
                       time="วันนี้, 14:00" 
                       status="Confirmed" 
                     />
                     <AppointmentRow 
                       name="พัชราภรณ์ สุขใจ" 
                       service="ตัดแว่นเลนส์โปรเกรสซีฟ" 
                       time="วันนี้, 16:30" 
                       status="Pending" 
                     />
                     <AppointmentRow 
                       name="สมชาย มั่นคง" 
                       service="ซ่อมแซมแว่นตา" 
                       time="พรุ่งนี้, 10:00" 
                       status="Confirmed" 
                     />
                     <AppointmentRow 
                       name="รินลดา ทรัพย์เจริญ" 
                       service="ปรึกษาเรื่องคอนแทคเลนส์" 
                       time="19 เม.ย., 11:30" 
                       status="Processing" 
                     />
                  </tbody>
               </table>
            </div>
         </div>

         {/* ── Inventory Alerts ── */}
         <div className="bg-zinc-950 rounded-xl p-8 text-white shadow-xl shadow-zinc-950/20 flex flex-col">
            <h3 className="text-xl font-black uppercase tracking-tight mb-8">การแจ้งเตือนพัสดุ</h3>
            <div className="space-y-6 flex-1">
               <div className="flex gap-4 items-start border-l-2 border-[#FFB800] pl-4">
                  <div>
                     <p className="text-sm font-bold">Ray-Ban RB3025 Aviator</p>
                     <p className="text-zinc-500 text-xs mt-1">เหลือเพียง 2 ชิ้นในคลัง</p>
                  </div>
               </div>
               <div className="flex gap-4 items-start border-l-2 border-red-500 pl-4">
                  <div>
                     <p className="text-sm font-bold">Lenses Zeiss ClearView 1.6</p>
                     <p className="text-red-500 text-xs mt-1">สินค้าหมดชั่วคราว</p>
                  </div>
               </div>
            </div>
            <button className="w-full mt-8 bg-[#FFB800] text-black font-black uppercase tracking-widest text-[11px] py-4 rounded-xl hover:bg-white transition-all">
               จัดการสต็อกสินค้า
            </button>
         </div>
      </div>

    </div>
  );
}

/* ── Sub-components ── */

function StatsCard({ title, value, change, icon, isPositive }: any) {
  return (
    <div className="bg-white p-6 rounded-xl border border-zinc-200 shadow-sm group hover:border-[#FFB800] transition-all">
       <div className="flex justify-between items-start mb-6">
          <div className="w-12 h-12 rounded-lg bg-zinc-50 flex items-center justify-center text-zinc-400 group-hover:text-[#FFB800] transition-colors">
             {icon}
          </div>
          <span className={`text-[10px] font-black px-2 py-1 rounded-lg ${isPositive ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'}`}>
             {change}
          </span>
       </div>
       <p className="text-zinc-500 text-[11px] font-black uppercase tracking-widest mb-1">{title}</p>
       <h4 className="text-2xl font-black text-zinc-950 tracking-tighter">{value}</h4>
    </div>
  );
}

function AppointmentRow({ name, service, time, status }: any) {
   return (
      <tr className="group hover:bg-zinc-50/50 transition-colors">
         <td className="px-8 py-5">
            <div className="flex items-center gap-3">
               <div className="w-8 h-8 rounded-full bg-zinc-100 flex items-center justify-center font-bold text-xs text-zinc-900 border border-zinc-200 uppercase">
                  {name.charAt(0)}
               </div>
               <span className="text-sm font-black text-zinc-950">{name}</span>
            </div>
         </td>
         <td className="px-8 py-5 text-sm font-bold text-zinc-500">{service}</td>
         <td className="px-8 py-5">
            <span className="text-xs font-black text-zinc-950">{time}</span>
         </td>
         <td className="px-8 py-5 text-right">
            <span className={`text-[10px] font-black p-2 rounded-lg uppercase tracking-widest ${
               status === 'Confirmed' ? 'bg-emerald-50 text-emerald-600' : 
               status === 'Pending' ? 'bg-[#FFB800]/10 text-[#FFB800]' : 
               'bg-zinc-100 text-zinc-400'
            }`}>
               {status}
            </span>
         </td>
      </tr>
   );
}

/* ── Icons ── */

function MoneyIcon() {
  return <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>;
}
function CalendarIcon() {
  return <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>;
}
function PackageIcon() {
  return <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>;
}
function UsersIcon() {
  return <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>;
}
