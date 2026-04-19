import Link from 'next/link';

const AwardIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FFB800" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="8" r="7" /><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" />
  </svg>
);

const LabIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FFB800" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4.5 3h15M6 3v16a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V3M6 14h12" />
  </svg>
);

const ShakeIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FFB800" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="1" y="3" width="15" height="13" rx="1" /><path d="M16 8h4a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-4" /><path d="M10 21h4" /><path d="M12 16v5" />
  </svg>
);

export default function About() {
  return (
    <section id="about" className="relative py-32 bg-[#000000] overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-24 items-start">
          
          {/* Text Content */}
          <div className="lg:col-span-5 animate-fade-in-up">
            <p className="text-[11px] font-black uppercase tracking-[6px] text-[#FFB800] mb-6">Our Philosophy</p>
            <h2 className="text-[clamp(1.8rem,6vw,3.5rem)] font-playfair font-black text-white mb-10 leading-[1.1] tracking-tighter uppercase">
              Crafting <span className="italic text-[#FFB800]">Clarity</span><br /> 
              Since 2014.
            </h2>
            <p className="text-white/40 text-lg font-light leading-relaxed mb-12">
              เราเชื่อว่าแว่นตาไม่ได้มีไว้เพื่อการมองเห็นเพียงอย่างเดียว แต่คือส่วนหนึ่งของบุคลิกภาพที่สะท้อนความประณีตและการใส่ใจในรายละเอียด
            </p>
            <Link href="/stores"
              className="inline-block bg-[#FFB800] text-black font-black uppercase tracking-[4px] text-[10px] px-12 py-5 rounded-none hover:bg-white transition-all duration-700">
              Visit Laboratories
            </Link>
          </div>

          {/* Features Grid (Architectural) */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-px bg-white/5 border border-white/5">
            {[
              { icon: <AwardIcon />, title: 'Premium Standard', desc: 'รับประกันคุณภาพระดับสากล พร้อมวัสดุนำเข้าจากประเทศญี่ปุ่น' },
              { icon: <LabIcon />,   title: 'Advanced Optics', desc: 'ตรวจวัดสายตาด้วยเทคโนโลยี 3D Wavefront ความละเอียดสูงสุด' },
              { icon: <ShakeIcon />, title: 'Bespoke Service', desc: 'บริการปรับแต่งกรอบแว่นเฉพาะบุคคลให้รับกับสรีระใบหน้า 100%' },
              { icon: <AwardIcon />, title: 'Lifetime Support', desc: 'ดูแลทำความสะอาดและซ่อมบำรุงเบื้องต้นฟรีตลอดอายุการใช้งาน' },
            ].map((item, i) => (
              <div key={item.title} className="p-12 bg-black flex flex-col gap-8 hover:bg-white/[0.03] transition-colors duration-500 group">
                <div className="w-12 h-12 rounded-none border-2 border-[#FFB800] flex items-center justify-center group-hover:bg-[#FFB800] transition-colors">
                   <div className="group-hover:stroke-black transition-colors">
                      {item.icon}
                   </div>
                </div>
                <div>
                  <h4 className="text-white font-black text-sm uppercase tracking-widest mb-4">{item.title}</h4>
                  <p className="text-[12px] text-white/30 font-light leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
