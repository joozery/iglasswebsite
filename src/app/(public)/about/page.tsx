import Image from 'next/image';

export default function AboutPage() {
  return (
    <div className="bg-white min-h-screen pt-32 pb-20">
      <section className="max-w-6xl mx-auto px-6">
        
        {/* Story Header */}
        <div className="flex flex-col lg:flex-row gap-16 items-center mb-32">
           <div className="lg:w-1/2 space-y-6">
              <div className="flex items-center gap-3">
                 <span className="h-px w-8 bg-[#FFB800]"></span>
                 <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#FFB800]">The Iglass Story</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-black text-zinc-950 tracking-tight leading-tight">
                 นิยามใหม่ของ <br />
                 <span className="text-[#FFB800]">การดูแลสายตาพรีเมียม.</span>
              </h1>
              <p className="text-zinc-500 font-medium leading-relaxed">
                 Iglass เราเชื่อว่า "ดวงตาคือหน้าต่างของหัวใจ" และการมองเห็นที่สมบูรณ์แบบคือจุดเริ่มต้นของคุณภาพชีวิตที่ดี 
                 เราจึงมุ่งมั่นที่จะเป็นมากกว่าร้านแว่นตา แต่เป็นศูนย์ดูแลสุขภาพดวงตาที่ครบวงจรที่สุดในย่านลาดกระบัง-สุวรรณภูมิ
              </p>
           </div>
           <div className="lg:w-1/2 relative aspect-square w-full">
              <div className="absolute inset-0 bg-zinc-100 rounded-2xl overflow-hidden shadow-2xl">
                 <Image src="/images/intro/interior.png" alt="Iglass Interior" fill className="object-cover grayscale hover:grayscale-0 transition-all duration-1000" />
              </div>
              {/* Floating Badge */}
              <div className="absolute -bottom-8 -left-8 bg-[#FFB800] p-8 rounded-2xl shadow-xl max-w-[200px]">
                 <p className="text-black font-black text-3xl tracking-tighter">10+</p>
                 <p className="text-black/60 text-[10px] font-bold uppercase tracking-widest leading-tight">Years of Visionary Excellence</p>
              </div>
           </div>
        </div>

        {/* Our Specialist Section */}
        <div className="bg-zinc-950 rounded-2xl p-8 md:p-16 mb-32 relative overflow-hidden">
           <div className="absolute top-0 right-0 w-64 h-64 bg-[#FFB800] opacity-5 rounded-full blur-[100px]"></div>
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="relative aspect-[4/5] rounded-xl overflow-hidden border border-white/10">
                 <Image src="/images/intro/exam.png" alt="Doctor of Optometry" fill className="object-cover" />
              </div>
              <div className="space-y-8">
                 <h2 className="text-3xl font-black text-white tracking-tight uppercase">
                    วัดสายตาโดย <br />
                    <span className="text-[#FFB800]">นักทัศนมาตร (OD) ทุกขั้นตอน.</span>
                 </h2>
                 <p className="text-zinc-400 font-medium leading-relaxed">
                    เพราะค่าสายตาไม่ใช่แค่ตัวเลข แต่คือความละเอียดอ่อนทางสรีรวิทยา ที่ Iglass เราให้บริการตรวจโดยนักทัศนมาตร 
                    (Doctor of Optometry) ผู้มีใบประกอบโรคศิลป์จากกระทรวงสาธารณสุข เพื่อรับประกันความแม่นยำสูงสุดในทุกการมองเห็น
                 </p>
                 <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-1">
                       <span className="text-[#FFB800] font-black text-lg">100% Specialist</span>
                       <p className="text-zinc-500 text-[10px] font-bold uppercase tracking-widest">Qualified Experts</p>
                    </div>
                    <div className="space-y-1">
                       <span className="text-[#FFB800] font-black text-lg">World Class Tech</span>
                       <p className="text-zinc-500 text-[10px] font-bold uppercase tracking-widest">Precision Tools</p>
                    </div>
                 </div>
              </div>
           </div>
        </div>

        {/* Core Values / Why Us Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-32">
           {[
             { title: 'Precision', desc: 'ความแม่นยำคือหัวใจสำคัญที่เรายึดถือในทุกการตรวจวัด' },
             { title: 'Care', desc: 'ดูแลเหมือนคนในครอบครัว ด้วยคำแนะนำที่จริงใจและเหมาะสมที่สุด' },
             { title: 'Innovation', desc: 'ไม่เคยหยุดอัปเดตนวัตกรรมเลนส์และกรอบแว่นระดับโลก' }
           ].map((v, i) => (
             <div key={i} className="p-10 bg-zinc-50 rounded-2xl border border-zinc-100 space-y-4 hover:bg-white hover:shadow-xl transition-all group">
                <div className="w-10 h-1 h-px bg-[#FFB800] group-hover:w-20 transition-all duration-500"></div>
                <h3 className="text-xl font-black text-zinc-900 uppercase tracking-tight">{v.title}</h3>
                <p className="text-zinc-500 text-sm font-medium leading-relaxed">{v.desc}</p>
             </div>
           ))}
        </div>

        {/* Local Commitment Section */}
        <div className="text-center space-y-8 py-16 border-t border-zinc-100">
           <h4 className="text-xl font-black text-zinc-950 uppercase tracking-tight">Iglass ร้านแว่นตาลาดกระบัง-สุวรรณภูมิ</h4>
           <div className="flex flex-wrap justify-center gap-4">
              {[
                '/images/intro/collage.png',
                '/images/articles/lens-tech.png',
                '/images/hero-professional.png'
              ].map((img, i) => (
                <div key={i} className="w-32 h-32 md:w-48 md:h-48 relative rounded-xl overflow-hidden opacity-40 hover:opacity-100 transition-opacity">
                   <Image src={img} alt="Store detail" fill className="object-cover" />
                </div>
              ))}
           </div>
           <p className="text-zinc-400 text-xs font-bold uppercase tracking-widest">
              Dedicated to Serving the Community Since 2014
           </p>
        </div>
      </section>
    </div>
  );
}
