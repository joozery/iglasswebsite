import Image from 'next/image';
import Link from 'next/link';

export default function ShopHighlight() {
  return (
    <section className="py-10 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="border border-zinc-100 rounded-[1.5rem] p-8 md:p-12 bg-white shadow-sm flex flex-col lg:flex-row items-center gap-12">
          
          {/* Left: Content */}
          <div className="lg:w-1/2 space-y-8">
            <h2 className="text-2xl md:text-3xl font-black text-zinc-950 tracking-tight">
               Iglass ร้านแว่นตาคุณภาพ
            </h2>
            
            <ul className="space-y-6">
               {[
                 'ตรวจวัดสายตาโดยนักทัศนมาตร ทุกขั้นตอน มีการตรวจวัดสายตาอย่างละเอียดและแม่นยำ',
                 'มีกรอบแว่นตาผู้ใหญ่และเด็กให้เลือกหลากหลาย น้ำหนักเบา ดีไซน์ทันสมัย',
                 'มีเลนส์แว่นตาหลากหลายยี่ห้อ เปิดราคาตาม price list และมีบริการหลังการขาย',
                 'บริการปรับ ดัด ซ่อม และรับประกันสินค้า'
               ].map((item, i) => (
                 <li key={i} className="flex gap-4 items-start">
                    <div className="mt-1 shrink-0 text-[#FFB800]">
                       <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4"><polyline points="20 6 9 17 4 12"/></svg>
                    </div>
                    <p className="text-zinc-600 text-[13px] md:text-sm font-semibold leading-relaxed">
                       {item}
                    </p>
                 </li>
               ))}
            </ul>

            <Link 
              href="https://lin.ee/KqzDyG3" 
              className="inline-flex items-center gap-3 bg-[#06C755] text-white px-10 py-4 rounded-xl font-black text-[13px] uppercase tracking-wider hover:bg-[#05a647] transition-all shadow-lg hover:shadow-[#06C755]/20 active:scale-95"
            >
               <div className="w-8 h-8 flex items-center justify-center p-0.5">
                  <Image src="/iconsocial/icons8-line-48.png" alt="Line" width={32} height={32} className="w-full h-full object-contain" />
               </div>
               นัดหมายผ่านแชท
            </Link>
          </div>

          {/* Right: Image */}
          <div className="lg:w-1/2 relative aspect-[4/3] w-full rounded-2xl overflow-hidden shadow-xl">
            <Image 
              src="/images/intro/collage.png" 
              alt="Customer Service" 
              fill 
              className="object-cover"
            />
          </div>

        </div>
      </div>
    </section>
  );
}
