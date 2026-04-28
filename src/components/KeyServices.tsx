import React from 'react';

const SERVICES = [
  {
    id: 1,
    title: 'ตรวจโดยหมอสายตา',
    desc: 'ตรวจวัดสายตาทุกเคสโดยนักทัศนมาตรผู้เชี่ยวชาญ',
    icon: <StethoscopeIcon />,
    accent: 'from-amber-400/10 to-amber-400/5',
  },
  {
    id: 2,
    title: 'ได้รับการรับรอง',
    desc: 'มาตรฐานจากกระทรวงสาธารณสุข',
    icon: <MedalIcon />,
    accent: 'from-amber-400/10 to-amber-400/5',
  },
  {
    id: 3,
    title: 'ประสบการณ์ 3,000+ เคส',
    desc: 'ดูแลลูกค้ามาแล้วมากกว่า 3,000 ราย',
    icon: <ChartIcon />,
    accent: 'from-amber-400/10 to-amber-400/5',
  },
  {
    id: 4,
    title: 'กรอบแว่นคุณภาพ',
    desc: 'ให้เลือกมากกว่า 300 แบบ ทุกสไตล์',
    icon: <GlassesIcon />,
    accent: 'from-amber-400/10 to-amber-400/5',
  },
  {
    id: 5,
    title: 'ราคาสมเหตุสมผล',
    desc: 'บริการดี ราคาเป็นธรรม ไม่บวกเกินจำเป็น',
    icon: <DollarIcon />,
    accent: 'from-amber-400/10 to-amber-400/5',
  },
  {
    id: 6,
    title: 'รีวิวดีและน่าเชื่อถือ',
    desc: 'รีวิวจริงจากลูกค้า เครื่องมือทันสมัย',
    icon: <StarIcon />,
    accent: 'from-amber-400/10 to-amber-400/5',
  },
  {
    id: 7,
    title: 'บริการหลังการขาย',
    desc: 'ปรับ ดัด ซ่อม พร้อมรับประกันสินค้า',
    icon: <SupportIcon />,
    accent: 'from-amber-400/10 to-amber-400/5',
  },
  {
    id: 8,
    title: 'ใส่ใจทุกรายละเอียด',
    desc: 'ไม่ขายสิ่งที่เกินความต้องการของลูกค้า',
    icon: <HeartIcon />,
    accent: 'from-amber-400/10 to-amber-400/5',
  },
];

export default function KeyServices() {
  return (
    <section className="py-16 md:py-24 bg-zinc-950 font-thai overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-10">

        {/* ── Header ── */}
        <div className="flex flex-col items-center text-center mb-14">
          <div className="inline-flex items-center gap-3 mb-4">
            <span className="h-[1.5px] w-7 bg-[#FFB800]" />
            <span className="text-[10px] font-black uppercase tracking-[0.35em] text-[#FFB800]">Key Services</span>
            <span className="h-[1.5px] w-7 bg-[#FFB800]" />
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight mb-3">
            บริการเด่น<span className="text-[#FFB800]">ของเรา</span>
          </h2>
          <p className="text-zinc-400 text-sm md:text-base max-w-md leading-relaxed">
            บริการตรวจวัดสายตาและจำหน่ายแว่นคุณภาพ โดยทีมงานมืออาชีพ
          </p>
        </div>

        {/* ── Service Grid ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {SERVICES.map((s, i) => (
            <div
              key={s.id}
              className="group relative flex flex-col gap-5 p-6 rounded-2xl bg-white/[0.03] border border-white/8 hover:bg-white/[0.07] hover:border-[#FFB800]/30 transition-all duration-300 cursor-default overflow-hidden"
            >
              {/* Subtle glow on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#FFB800]/0 to-[#FFB800]/0 group-hover:from-[#FFB800]/5 group-hover:to-transparent transition-all duration-500 pointer-events-none rounded-2xl" />

              {/* Number */}
              <span className="absolute top-4 right-5 text-[11px] font-black text-white/10 group-hover:text-[#FFB800]/20 transition-colors tabular-nums">
                {String(i + 1).padStart(2, '0')}
              </span>

              {/* Icon */}
              <div className="relative w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#FFB800] group-hover:bg-[#FFB800] group-hover:text-black group-hover:scale-110 group-hover:-rotate-3 transition-all duration-300 shadow-lg">
                {s.icon}
              </div>

              {/* Text */}
              <div className="relative">
                <h4 className="text-sm font-black text-white mb-1.5 leading-snug group-hover:text-[#FFB800] transition-colors">
                  {s.title}
                </h4>
                <p className="text-[12px] text-zinc-500 leading-relaxed group-hover:text-zinc-400 transition-colors">
                  {s.desc}
                </p>
              </div>

              {/* Bottom accent line */}
              <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-[#FFB800] group-hover:w-full transition-all duration-500 rounded-b-2xl" />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

/* ── Icons ── */
function StethoscopeIcon() {
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4.8 2.3A.3.3 0 1 0 5 2a.3.3 0 0 0-.2.3Z"/><path d="M12 11c0 3.5-1.5 6-4 6s-4-2.5-4-6V5h8v6Z"/><path d="M12 12h5"/><path d="M17 12a3 3 0 0 1 3 3v2a3 3 0 0 1-3 3h-2a3 3 0 0 1-3-3v-2a3 3 0 0 1 3-3z"/></svg>;
}
function MedalIcon() {
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="7"/><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/></svg>;
}
function ChartIcon() {
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 7L13.5 15.5L8.5 10.5L2 17"/><path d="M16 7H22V13"/></svg>;
}
function GlassesIcon() {
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="6" cy="15" r="4"/><circle cx="18" cy="15" r="4"/><path d="M14 15a2 2 0 0 0-4 0"/><path d="M2.5 13L5 7"/><path d="M21.5 13L19 7"/></svg>;
}
function DollarIcon() {
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>;
}
function StarIcon() {
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>;
}
function SupportIcon() {
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>;
}
function HeartIcon() {
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>;
}
