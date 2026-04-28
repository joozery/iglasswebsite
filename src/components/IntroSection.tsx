import Image from 'next/image';

const STRENGTHS = [
  { 
    title: 'DOCTOR OF OPTOMETRY', 
    desc: 'ตรวจสายตาอย่างละเอียดทุกขั้นตอนโดยนักทัศนมาตรผู้เชี่ยวชาญ',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 2v20m10-10H2"/><circle cx="12" cy="12" r="10"/></svg>
    )
  },
  { 
    title: 'PROGRESSIVE MASTER', 
    desc: 'เชี่ยวชาญการออกแบบเลนส์โปรเกรสซีฟเฉพาะบุคคลเพื่อความสบายตาสูงสุด',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
    )
  },
  { 
    title: 'DIGITAL TECHNOLOGY', 
    desc: 'ใช้เครื่องมือตรวจวัดสายตาระบบดิจิทัลที่ทันสมัยและแม่นยำระดับสากล',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>
    )
  }
];

export default function IntroSection() {
  return (
    <section className="bg-white py-20 md:py-32 overflow-hidden font-thai relative">
      
      {/* ── Background Decoration ── */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-zinc-50/50 -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-start mb-24">
          
          {/* Left: Heading Content */}
          <div className="lg:w-1/2 space-y-8">
            <div className="inline-flex items-center gap-4 group">
               <span className="h-[2px] w-12 bg-[#FFB800] transition-all group-hover:w-16"></span>
               <span className="text-[12px] font-black uppercase tracking-[0.4em] text-[#FFB800]">Since 2009 — Expertise Center</span>
            </div>
            
            <h2 className="text-4xl md:text-6xl font-black text-zinc-950 tracking-tighter leading-[1.05]">
              Iglass <span className="text-zinc-400">ร้านแว่นตา</span> <br /> 
              ลาดกระบัง-สุวรรณภูมิ.
            </h2>

            <p className="text-xl md:text-2xl font-bold text-zinc-800 leading-relaxed">
               ศูนย์บริการตรวจวัดสายตาและ <span className="text-[#FFB800]">ออกแบบเลนส์โปรเกรสซีฟ</span> เฉพาะบุคคล โดยทีมนักทัศนมาตรผู้เชี่ยวชาญทุกขั้นตอน
            </p>

            <div className="pt-8 border-t border-zinc-100 grid grid-cols-1 gap-8">
               {STRENGTHS.map((item, i) => (
                 <div key={i} className="flex gap-6 group">
                    <div className="w-14 h-14 shrink-0 rounded-2xl bg-zinc-950 text-[#FFB800] flex items-center justify-center transition-transform group-hover:scale-110 group-hover:rotate-3 shadow-lg">
                       {item.icon}
                    </div>
                    <div className="space-y-1">
                       <h4 className="font-black text-[13px] uppercase tracking-widest text-zinc-950">{item.title}</h4>
                       <p className="text-zinc-500 font-medium text-[14px] leading-relaxed max-w-sm">{item.desc}</p>
                    </div>
                 </div>
               ))}
            </div>
          </div>

          {/* Right: Modern Perspective Image */}
          <div className="lg:w-1/2 relative w-full h-[400px] md:h-[600px]">
             <div className="absolute inset-0 bg-zinc-100 rounded-[2.5rem] rotate-3 scale-95 opacity-50 border border-zinc-200" />
             <div className="absolute inset-0 overflow-hidden rounded-[2.5rem] shadow-2xl border-4 border-white">
                <Image 
                  src="/images/intro/interior.png" 
                  alt="Shop Interior" 
                  fill 
                  className="object-cover hover:scale-105 transition-transform duration-1000"
                />
             </div>
             
             {/* Floating Info Badge */}
             <div className="absolute -bottom-10 -right-6 md:-right-10 bg-white p-8 rounded-3xl shadow-[0_30px_60px_-15px_rgba(0,0,0,0.15)] border border-zinc-100 max-w-xs transition-transform hover:-translate-y-2">
                <div className="text-4xl font-black text-[#FFB800] mb-2">15+</div>
                <p className="text-[11px] font-black uppercase tracking-widest text-zinc-400 mb-2">Years of Service</p>
                <p className="text-zinc-600 font-bold text-[13px] leading-relaxed">
                   ให้บริการครอบคลุมถึงระบบชะลอสายตาสั้นในเด็กและวัดสายตามาตรฐาน Doctor Optometry
                </p>
             </div>
          </div>
        </div>

        {/* ── Secondary Visual Collage ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
           {[
             { src: '/images/intro/collage.png', label: 'Eyewear Gallery', desc: 'รวบรวมกรอบแว่นแบรนด์เนมคัดสรร' },
             { src: '/images/intro/exam.png', label: 'Examination Room', desc: 'ห้องตรวจมาตรฐานสากล' },
             { src: '/images/intro/collage.png', label: 'Lens Laboratory', desc: 'บริการตัดประกอบแว่นระบบดิจิทัล' },
           ].map((pic, i) => (
             <div key={i} className="group relative aspect-[4/3] md:aspect-square overflow-hidden rounded-[2.5rem] shadow-xl border border-zinc-100">
                <Image 
                  src={pic.src} 
                  alt={pic.label} 
                  fill 
                  className="object-cover transition-transform duration-1000 group-hover:scale-110"
                />
                <div className="absolute inset-x-0 bottom-0 p-8 bg-gradient-to-t from-black/80 via-black/20 to-transparent translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                   <h5 className="text-white font-black uppercase tracking-widest text-[11px] mb-1">{pic.label}</h5>
                   <p className="text-zinc-300 font-bold text-xs">{pic.desc}</p>
                </div>
             </div>
           ))}
        </div>

      </div>
    </section>
  );
}
