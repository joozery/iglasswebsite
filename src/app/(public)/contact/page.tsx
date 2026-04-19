import Image from 'next/image';

export default function ContactPage() {
  return (
    <div className="bg-white min-h-screen pt-32 pb-20">
      <section className="max-w-6xl mx-auto px-6">
        {/* Professional Header */}
        <div className="text-center mb-16 space-y-4">
           <div className="inline-flex items-center gap-3">
              <span className="h-px w-8 bg-[#FFB800]"></span>
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#FFB800]">Get In Touch</span>
           </div>
           <h1 className="text-4xl md:text-5xl font-black text-zinc-950 tracking-tight">
              ติดต่อสอบถามข้อมูล.
           </h1>
           <p className="max-w-2xl mx-auto text-zinc-500 font-medium">
              ศูนย์บริการตรวจวัดสายตาพรีเมียมครบวงจร พร้อมดูแลคุณด้วยมาตรฐานระดับสากล <br className="hidden md:block" /> 
              โดยทีมนักทัศนมาตรผู้เชี่ยวชาญ
           </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 items-start">
          
          {/* Left: Contact Info (Refined) */}
          <div className="lg:w-5/12 grid grid-cols-1 gap-6 w-full">
            <div className="bg-zinc-50 p-8 rounded-2xl border border-zinc-100 group transition-all hover:bg-white hover:shadow-xl hover:shadow-zinc-200/50">
               <div className="flex items-center gap-6">
                  <div className="w-12 h-12 rounded-xl bg-zinc-950 flex items-center justify-center text-[#FFB800]">
                    <PhoneIcon />
                  </div>
                  <div>
                    <span className="block text-[9px] font-black uppercase tracking-widest text-[#FFB800] mb-1">Call Representative</span>
                    <a href="tel:0968282468" className="text-xl font-black text-zinc-900 tracking-tight hover:text-[#FFB800] transition-colors inline-block">096-828-2468</a>
                  </div>
               </div>
            </div>

            <div className="bg-zinc-50 p-8 rounded-2xl border border-zinc-100 group transition-all hover:bg-[#06C755] hover:border-[#06C755] hover:shadow-xl hover:shadow-[#06C755]/20">
               <div className="flex items-center gap-6">
                  <div className="w-12 h-12 rounded-xl bg-[#06C755] group-hover:bg-white/20 flex items-center justify-center text-white">
                    <span className="font-extrabold text-[10px]">LINE</span>
                  </div>
                  <div>
                    <span className="block text-[9px] font-black uppercase tracking-widest text-zinc-400 group-hover:text-white/60 mb-1">Online Support</span>
                    <p className="text-xl font-black text-zinc-900 group-hover:text-white tracking-tight">@iglass_official</p>
                  </div>
               </div>
            </div>

            <div className="bg-zinc-50 p-8 rounded-2xl border border-zinc-100 group transition-all hover:bg-white hover:shadow-xl hover:shadow-zinc-200/50">
               <div className="flex items-center gap-6">
                  <div className="w-12 h-12 rounded-xl bg-zinc-200 flex items-center justify-center text-zinc-600">
                    <ClockIcon />
                  </div>
                  <div>
                    <span className="block text-[9px] font-black uppercase tracking-widest text-zinc-400 mb-1">Operating Hours</span>
                    <p className="text-xl font-black text-zinc-900 tracking-tight">Every Day 11:00 — 21:00</p>
                  </div>
               </div>
            </div>

            <div className="p-8 rounded-2xl border border-zinc-100 bg-zinc-950 text-white relative overflow-hidden">
               <div className="relative z-10 space-y-4">
                  <h4 className="text-sm font-black uppercase tracking-widest text-[#FFB800]">Visit Our Store</h4>
                  <p className="text-zinc-400 text-[13px] leading-relaxed">
                     Iglass ร้านแว่นตาลาดกระบัง-สุวรรณภูมิ <br /> 
                     พร้อมให้บริการตรวจสายตาด้วยมาตรฐานระดับสากล
                  </p>
               </div>
               <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-[#FFB800]/10 rounded-full blur-3xl"></div>
            </div>
          </div>

          {/* Right: Contact Form (Professional/Minimal) */}
          <div className="lg:w-7/12 w-full">
             <div className="bg-white p-8 md:p-12 rounded-2xl border border-zinc-200 shadow-sm relative">
                <form className="space-y-6">
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-1.5">
                         <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 pl-1">Full Name</label>
                         <input type="text" className="w-full bg-zinc-50 rounded-xl px-5 py-3.5 border border-zinc-200 focus:bg-white focus:ring-2 focus:ring-[#FFB800] outline-none font-bold text-sm text-zinc-900" />
                      </div>
                      <div className="space-y-1.5">
                         <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 pl-1">Phone Number</label>
                         <input type="tel" className="w-full bg-zinc-50 rounded-xl px-5 py-3.5 border border-zinc-200 focus:bg-white focus:ring-2 focus:ring-[#FFB800] outline-none font-bold text-sm text-zinc-900" />
                      </div>
                   </div>
                   
                   <div className="space-y-1.5">
                      <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 pl-1">Inquiry Topic</label>
                      <select className="w-full bg-zinc-50 rounded-xl px-5 py-3.5 border border-zinc-200 focus:bg-white focus:ring-2 focus:ring-[#FFB800] outline-none font-bold text-sm text-zinc-900">
                         <option>นัดหมายตรวจวัดสายตา</option>
                         <option>ปรึกษาเรื่องเลนส์โปรเกรสซีฟ</option>
                         <option>สอบถามสินค้า / กรอบแว่น</option>
                         <option>อื่นๆ</option>
                      </select>
                   </div>
                   
                   <div className="space-y-1.5">
                      <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 pl-1">Message Details</label>
                      <textarea rows={3} className="w-full bg-zinc-50 rounded-xl px-5 py-3.5 border border-zinc-200 focus:bg-white focus:ring-2 focus:ring-[#FFB800] outline-none font-bold text-sm text-zinc-900"></textarea>
                   </div>
                   
                   <button className="w-full bg-zinc-950 text-white font-black uppercase tracking-widest text-[11px] py-5 rounded-xl hover:bg-[#FFB800] hover:text-black transition-all shadow-lg active:scale-[0.98]">
                      ยืนยันการนัดหมาย / ส่งข้อความ
                   </button>
                </form>
             </div>
          </div>
        </div>

        {/* Google Maps Integration */}
        <div className="mt-12 rounded-2xl overflow-hidden relative h-[450px] border border-zinc-100 shadow-lg">
           <iframe 
             src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3876.012354714658!2d100.7836881!3d13.7183023!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x311d6706fcd873e9%3A0xc07c569f168f184e!2s1888%2F5%20Lad%20Krabang%2046%2F3%20Alley%2C%20Khwaeng%20Lat%20Krabang%2C%20Lat%20Krabang%2C%20Bangkok%2010520!5e0!3m2!1sen!2sth!4v1713431234567!5m2!1sen!2sth"
             width="100%" 
             height="100%" 
             style={{ border: 0 }} 
             allowFullScreen 
             loading="lazy" 
             referrerPolicy="no-referrer-when-downgrade"
             className="grayscale hover:grayscale-0 transition-all duration-700"
           ></iframe>
           <div className="absolute top-6 left-6 bg-zinc-950/90 backdrop-blur-md p-6 rounded-2xl border border-white/10 max-w-sm pointer-events-none">
              <h4 className="text-white font-black text-lg mb-2">Iglass Shop.</h4>
              <p className="text-zinc-400 text-xs font-medium leading-relaxed">
                 1888/5 ซ.ลาดกระบัง 46/3 <br />
                 เขต ลาดกระบัง แขวง ลาดกระบัง <br />
                 Bangkok, Thailand, 10520
              </p>
           </div>
        </div>
      </section>
    </div>
  );
}

function PhoneIcon() {
    return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>;
}

function ClockIcon() {
    return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>;
}
