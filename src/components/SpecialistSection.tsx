import Image from 'next/image';
import Link from 'next/link';

export default function SpecialistSection() {
  return (
    <section className="py-10 bg-white overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          
          {/* Left Side: Featured Image with Badge */}
          <div className="lg:w-[45%] relative group">
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl bg-zinc-100">
              <Image 
                src="/images/specialist-v2.png" 
                alt="OD Specialist" 
                fill 
                className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
              />
              
              {/* Overlay Top Left (Matches Reference) */}
              <div className="absolute top-6 left-6 bg-[#FFB800] p-5 rounded-2xl shadow-lg max-w-[180px]">
                 <h3 className="text-black font-black text-sm leading-tight uppercase tracking-tight">ตรวจวัดสายตา<br />โดยนักทัศนมาตร</h3>
                 <p className="text-black/60 text-[9px] font-bold mt-2 leading-relaxed">
                    ที่ได้รับใบอนุญาต <br />
                    จากกระทรวงสาธารณสุข
                 </p>
              </div>

              {/* Bottom Name Banner (Matches Reference) */}
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-[85%]">
                 <div className="bg-white/95 backdrop-blur-sm px-6 py-4 rounded-xl shadow-lg text-center">
                    <h4 className="text-[#FFB800] text-xl font-black tracking-tight leading-none mb-1">
                       OD. สูดาวัน หงษ์ภักดี
                    </h4>
                    <p className="text-zinc-400 text-[10px] font-extrabold uppercase tracking-widest">
                       นักทัศนมาตรประจำร้าน Iglass
                    </p>
                 </div>
              </div>
            </div>
          </div>

          {/* Right Side: Content */}
          <div className="lg:w-[55%] space-y-8">
            <div className="space-y-3">
               <span className="text-[#FFB800] text-[10px] font-black uppercase tracking-[0.3em] mb-2 block">About Us</span>
               <h2 className="text-3xl md:text-5xl font-black text-zinc-950 tracking-tighter leading-[1.1]">
                  Iglass ร้านแว่นตา <br />
                  ที่ดูแลโดยผู้เชี่ยวชาญ.
               </h2>
               <p className="text-zinc-500 text-sm md:text-base font-medium leading-relaxed max-w-xl">
                  ร้านแว่นตาที่ดูแลโดย <strong>นักทัศนมาตรผู้เชี่ยวชาญด้านสายตา</strong> ให้บริการตรวจวัดสายตาและตัดแว่นอย่างละเอียดสำหรับทั้งเด็กและผู้ใหญ่ เราคัดสรรกรอบและเลนส์คุณภาพ เพื่อให้ลูกค้าได้รับการมองเห็นที่ชัดเจนที่สุด
               </p>
            </div>

            {/* Feature Grid with Solid Theme Icons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6">
               <div className="flex gap-4 items-start group">
                  <div className="text-[#FFB800] shrink-0 mt-1">
                     <EyeIcon />
                  </div>
                  <div>
                     <h4 className="font-black text-zinc-900 text-[13px] uppercase mb-1">ตรวจสายตาโดยนักทัศนมาตร</h4>
                     <p className="text-zinc-400 text-[10px] font-medium leading-relaxed">การตรวจแม่นยำ พร้อมคำแนะนำเฉพาะบุคคล</p>
                  </div>
               </div>
               
               <div className="flex gap-4 items-start group">
                  <div className="text-[#FFB800] shrink-0 mt-1">
                     <GlassesIcon />
                  </div>
                  <div>
                     <h4 className="font-black text-zinc-900 text-[13px] uppercase mb-1">ตัดแว่นสายตา เด็ก-ผู้ใหญ่</h4>
                     <p className="text-zinc-400 text-[10px] font-medium leading-relaxed">กรอบหลากหลาย ขนาดเหมาะกับแต่ละบุคคล</p>
                  </div>
               </div>

               <div className="flex gap-4 items-start group">
                  <div className="text-[#FFB800] shrink-0 mt-1">
                     <MedalIcon />
                  </div>
                  <div>
                     <h4 className="font-black text-zinc-900 text-[13px] uppercase mb-1">เลนส์คุณภาพหลายยี่ห้อ</h4>
                     <p className="text-zinc-400 text-[10px] font-medium leading-relaxed">เลนส์ลดแสงสะท้อน และเลนส์เฉพาะทาง</p>
                  </div>
               </div>

               <div className="flex gap-4 items-start group">
                  <div className="text-[#FFB800] shrink-0 mt-1">
                     <SupportIcon />
                  </div>
                  <div>
                     <h4 className="font-black text-zinc-900 text-[13px] uppercase mb-1">บริการหลังการขาย</h4>
                     <p className="text-zinc-400 text-[10px] font-medium leading-relaxed">ปรับแว่น ซ่อมแว่น และการรับประกัน</p>
                  </div>
               </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4 pt-2">
               <Link href="/appointment" className="bg-[#FFB800] text-black font-black uppercase tracking-widest text-[10px] px-8 py-4 rounded-xl hover:shadow-lg transition-all active:scale-95">
                  นัดหมายตรวจสายตา
               </Link>
               <Link href="/collections" className="bg-white text-zinc-950 font-black uppercase tracking-widest text-[10px] px-8 py-4 rounded-xl border border-zinc-200 hover:bg-zinc-50 transition-all active:scale-95">
                  ดูบริการทั้งหมด
               </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

function EyeIcon() {
  return (
    <div className="w-5 h-5 flex items-center justify-center">
       <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/></svg>
    </div>
  );
}
function GlassesIcon() {
  return (
    <div className="w-5 h-5 flex items-center justify-center">
       <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M21 5h-4.3l-1.5 2.5H8.8L7.3 5H3c-1.1 0-2 .9-2 2v1h1v10c0 1.1.9 2 2 2h4c1.1 0 2-.9 2-2v-1h4v1c0 1.1.9 2 2 2h4c1.1 0 2-.9 2-2V8h1V7c0-1.1-.9-2-2-2zM8 18H4v-8h4v8zm12 0h-4v-8h4v8z"/></svg>
    </div>
  );
}
function MedalIcon() {
  return (
    <div className="w-5 h-5 flex items-center justify-center">
       <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 1L9 9H1l7 5-3 9 7-5 7 5-3-9 7-5h-8l-3-8z"/></svg>
    </div>
  );
}
function SupportIcon() {
  return (
    <div className="w-5 h-5 flex items-center justify-center">
       <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/></svg>
    </div>
  );
}
