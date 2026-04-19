import Image from 'next/image';
import Link from 'next/link';

const promos = [
  {
    id: 1,
    title: 'Progressive Lens Perfect Set',
    subtitle: 'กรอบแว่นแบรนด์เนม + เลนส์โปรเกรสซีฟเฉพาะบุคคล',
    price: '฿8,900',
    originalPrice: '฿12,900',
    tag: 'Bestseller',
    image: '/images/articles/lens-tech.png',
    color: 'bg-zinc-950',
    textColor: 'text-white'
  },
  {
    id: 2,
    title: 'Blue Control Upgrade FREE',
    subtitle: 'อัปเกรดเลนส์กรองแสงสีฟ้าฟรี เมื่อตัดแว่นพร้อมเลนส์มัลติโค้ต',
    price: 'Free Upgrade',
    tag: 'Limited Time',
    image: '/images/intro/exam.png',
    color: 'bg-[#FFB800]',
    textColor: 'text-zinc-950'
  },
  {
    id: 3,
    title: 'Brand Name Clearance',
    subtitle: 'กรอบแว่นแบรนด์ดังลดสูงสุด 50% (Ray-Ban, Oakley, Gucci)',
    price: 'Sale 50%',
    tag: 'Clearance',
    image: '/images/intro/collage.png',
    color: 'bg-white',
    textColor: 'text-zinc-950'
  }
];

export default function PromotionsPage() {
  return (
    <div className="bg-white min-h-screen pt-32 pb-20">
      <section className="max-w-6xl mx-auto px-6">
        
        {/* Refined Proportional Header */}
        <div className="text-center mb-16 space-y-3">
           <div className="inline-flex items-center gap-3">
              <span className="h-px w-6 bg-[#FFB800]"></span>
              <span className="text-[9px] font-black uppercase tracking-[0.4em] text-[#FFB800]">Exclusive Offers</span>
           </div>
           <h1 className="text-3xl md:text-4xl font-black text-zinc-950 tracking-tight leading-tight">
              โปรโมชั่นพิเศษ <span className="text-[#FFB800]">แด่คุณคนสำคัญ.</span>
           </h1>
           <p className="max-w-xl mx-auto text-zinc-500 font-medium text-sm md:text-base">
              ดีลสุดคุ้มที่คัดสรรมาเพื่อการดูแลสายตาที่ดีที่สุดของคุณ
           </p>
        </div>

        {/* Featured Promotion (Refined Size & Rounding) */}
        <div className="mb-12 group">
           <div className="bg-zinc-950 rounded-2xl overflow-hidden flex flex-col lg:flex-row items-stretch shadow-xl border border-white/5">
              <div className="lg:w-[50%] relative aspect-video lg:aspect-auto">
                 <Image src="/images/hero-professional.png" alt="Featured Promo" fill className="object-cover opacity-80" />
                 <div className="absolute top-6 left-6">
                    <span className="bg-[#FFB800] text-black text-[9px] font-black uppercase tracking-widest px-4 py-2 rounded-full">Hot Deal</span>
                 </div>
              </div>
              <div className="lg:w-[50%] p-8 md:p-12 flex flex-col justify-center text-white">
                 <h2 className="text-3xl font-black mb-3 tracking-tighter uppercase leading-tight">
                    Premium <span className="text-[#FFB800]">Bundle Set.</span>
                 </h2>
                 <p className="text-zinc-400 text-sm font-medium mb-6 leading-relaxed">
                    ตรวจสายตาโดยนักทัศนมาตร พร้อมรับกรอบแว่น Titanium และเลนส์คุณภาพสูงในราคาสุดพิเศษ
                 </p>
                 <div className="text-4xl font-black text-white mb-8 tracking-tighter">
                    ฿3,990 <span className="text-base text-zinc-600 line-through ml-3">฿5,900</span>
                 </div>
                 <Link href="/appointment" className="bg-[#FFB800] text-black font-black uppercase tracking-widest text-[10px] px-8 py-4 rounded-full hover:bg-white transition-all text-center lg:w-fit active:scale-95">
                    นัดหมายรับสิทธิ์
                 </Link>
              </div>
           </div>
        </div>

        {/* Promotions Grid (Refined Cards) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
           {promos.map((p) => (
             <div key={p.id} className={`${p.color} border border-zinc-100 rounded-2xl overflow-hidden flex flex-col shadow-md transition-all hover:shadow-xl`}>
                <div className="relative aspect-[16/10]">
                   <Image src={p.image} alt={p.title} fill className="object-cover" />
                   <div className="absolute top-4 left-4">
                      <span className="bg-white/90 backdrop-blur-md text-zinc-900 text-[8px] font-black uppercase tracking-widest px-3 py-1.5 rounded-lg shadow-sm">
                        {p.tag}
                      </span>
                   </div>
                </div>
                <div className={`p-6 flex flex-col flex-grow ${p.textColor}`}>
                   <h3 className="text-lg font-black uppercase tracking-tight mb-2 line-clamp-1">{p.title}</h3>
                   <p className="text-[11px] font-medium opacity-60 leading-relaxed mb-6 flex-grow line-clamp-2">
                       {p.subtitle}
                   </p>
                   <div className="flex items-center justify-between pt-4 border-t border-zinc-500/10">
                      <span className="text-xl font-black tracking-tighter">{p.price}</span>
                      <button className={`w-9 h-9 rounded-full flex items-center justify-center transition-all ${p.color === 'bg-zinc-950' ? 'bg-[#FFB800] text-black' : 'bg-zinc-950 text-white'}`}>
                         <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M5 12h14m-7-7 7 7-7 7" /></svg>
                      </button>
                   </div>
                </div>
             </div>
           ))}
        </div>

        {/* Professional Footer Info */}
        <div className="mt-16 pt-8 border-t border-zinc-100 text-zinc-400">
           <p className="text-[9px] font-bold uppercase tracking-widest leading-loose">
              * โปรโมชั่นนี้ใช้ได้จนถึงสิ้นเดือนนี้เท่านั้น เงื่อนไขเป็นไปตามที่บริษัทกำหนด
           </p>
        </div>
      </section>
    </div>
  );
}
