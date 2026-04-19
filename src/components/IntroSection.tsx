import Image from 'next/image';

export default function IntroSection() {
  return (
    <section className="bg-white py-12 md:py-20 overflow-hidden font-thai">
      {/* Header Content */}
      <div className="max-w-6xl mx-auto px-6 text-center mb-10 md:mb-20 space-y-4 md:space-y-6">
        <h2 className="text-2xl md:text-5xl font-black text-zinc-950 tracking-tight leading-tight">
          Iglass ร้านแว่นตา <br className="md:hidden" /> ลาดกระบัง-สุวรรณภูมิ
        </h2>
        <p className="text-base md:text-2xl font-black text-zinc-800 tracking-wide uppercase">
          ตรวจสายตา ตัดแว่น โดยนักทัศนมาตร
        </p>
        
        <div className="space-y-4 md:space-y-8 max-w-4xl mx-auto">
          <p className="text-[#FFB800] font-black text-lg md:text-2xl leading-relaxed">
            ศูนย์เลนส์โปรเกรสซีฟเฉพาะบุคคล <br className="md:hidden" /> และวัดสายตาโดยนักทัศนมาตรทุกขั้นตอน
          </p>
          <p className="text-zinc-500 font-semibold text-sm md:text-lg leading-relaxed max-w-2xl mx-auto">
            วัดสายตาโดยนักทัศนมาตร - Doctor of Optometry : OD (Optometry) และเครื่องมือที่ทันสมัยและมีเลนส์ให้เลือกทุกแบรนด์
          </p>
          <div className="pt-6 border-t border-zinc-100 flex flex-col items-center">
            <p className="text-zinc-400 text-[12px] md:text-base leading-relaxed max-w-3xl">
              Iglass ร้านแว่นตาลาดกระบัง-สุวรรณภูมิ โดยนักทัศนมาตร ออกแบบเลนส์โปรเกรสซีฟเฉพาะบุคคล และ ชะลอสายตาสั้นในเด็ก<br className="hidden md:block" />
              ให้บริการตรวจวัดสายตาโดยนักทัศนมาตรมีใบประกอบโรคศิลป์จากกระทรวงสาธารณสุข (Doctor Optometry)
            </p>
          </div>
        </div>
      </div>

      {/* Collage Section (Responsive) */}
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="relative group">
          {/* Desktop Grid Layout */}
          <div className="hidden md:grid grid-cols-12 gap-4 aspect-[2.5/1]">
            <div className="col-span-5 relative overflow-hidden rounded-[2rem] shadow-2xl">
              <Image src="/images/intro/interior.png" alt="Store Interior" fill className="object-cover transition-transform duration-1000 group-hover:scale-110" />
            </div>
            <div className="col-span-4 grid grid-rows-2 gap-4">
               <div className="relative overflow-hidden rounded-[2rem] shadow-2xl">
                  <Image src="/images/intro/collage.png" alt="Collection" fill className="object-cover transition-transform duration-1000 group-hover:scale-110" />
               </div>
               <div className="relative overflow-hidden rounded-[2rem] shadow-2xl">
                  <Image src="/images/intro/exam.png" alt="Exam" fill className="object-cover transition-transform duration-1000 group-hover:scale-110" />
               </div>
            </div>
            <div className="col-span-3 relative overflow-hidden rounded-[2rem] shadow-2xl">
              <Image src="/images/intro/collage.png" alt="Shop" fill className="object-cover transition-transform duration-1000 group-hover:scale-110" />
              <div className="absolute bottom-6 right-6 bg-red-900/90 text-white px-6 py-3 rounded-2xl text-[14px] font-black shadow-2xl backdrop-blur-md border border-white/20">
                ห้องตรวจวัดสายตา<br />ทันสมัยได้มาตรฐาน
              </div>
            </div>
          </div>

          {/* Mobile Layout Style */}
          <div className="md:hidden space-y-4">
             <div className="relative aspect-[4/3] overflow-hidden rounded-3xl shadow-xl">
                <Image src="/images/intro/interior.png" alt="Interior" fill className="object-cover" />
             </div>
             <div className="grid grid-cols-2 gap-4 h-48">
                <div className="relative overflow-hidden rounded-3xl shadow-xl">
                   <Image src="/images/intro/collage.png" alt="Collage" fill className="object-cover" />
                </div>
                <div className="relative overflow-hidden rounded-3xl shadow-xl">
                   <Image src="/images/intro/exam.png" alt="Exam" fill className="object-cover" />
                </div>
             </div>
          </div>

          {/* Floating Badge (Adjusted for both) */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 md:-translate-y-1/2 z-20 w-[90%] md:w-auto md:min-w-[700px]">
            <div className="bg-[#FFB800] px-6 py-5 md:px-12 md:py-8 rounded-2xl md:rounded-[2rem] shadow-[0_30px_60px_-15px_rgba(255,184,0,0.4)] border-4 border-white text-center transform hover:scale-105 transition-all duration-500">
              <h3 className="text-black text-sm md:text-2xl font-black uppercase tracking-tight md:tracking-widest leading-tight">
                Iglass ร้านแว่นตาลาดกระบัง-สุวรรณภูมิ <br className="md:hidden" /> | ศูนย์เลนส์โปรเกรสซีฟ
              </h3>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
