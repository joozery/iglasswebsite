import Image from 'next/image';

const reviews = [
  {
    id: 1,
    name: 'คุณวิภาวรรณ K.',
    rating: 5,
    text: 'ตรวจสายตาได้ละเอียดมากค่ะ นักทัศนมาตรให้คำแนะนำดีมาก เลนส์โปรเกรสซีฟใส่สบายตาตั้งแต่วันแรกเลย แนะนำที่นี่จริงๆ ค่ะ',
    source: 'Google Maps',
    date: '2 สัปดาห์ที่แล้ว',
    image: '/images/intro/collage.png'
  },
  {
    id: 2,
    name: 'คุณธนพล S.',
    rating: 5,
    text: 'ร้านแว่นที่บริการดีที่สุดในย่านลาดกระบัง มีกรอบแว่นให้เลือกเยอะมาก งานประกอบเนี้ยบ ราคาสมเหตุสมผลครับ',
    source: 'Facebook Review',
    date: '1 เดือนที่แล้ว',
    image: '/images/hero-professional.png'
  },
  {
    id: 3,
    name: 'คุณเมธาวี P.',
    rating: 5,
    text: 'นัดหมายง่าย มาถึงไม่ต้องรอนาน เครื่องมือทันสมัยมากค่ะ ได้แว่นที่ใส่แล้วภาพชัดและคมกว่าร้านเดิมที่เคยตัดมา',
    source: 'Google Maps',
    date: '3 วันที่แล้ว',
    image: '/images/intro/exam.png'
  },
  {
    id: 4,
    name: 'คุณอรรถพล T.',
    rating: 5,
    text: 'ประทับใจความเชี่ยวชาญของนักทัศนมาตรครับ อธิบายจนเข้าใจปัญหาของสายตาจริงๆ คุ้มค่ามากครับ',
    source: 'Line Official',
    date: '1 เดือนที่แล้ว',
    image: '/images/intro/interior.png'
  }
];

export default function ReviewsPage() {
  return (
    <div className="bg-white min-h-screen pt-32 pb-20">
      <section className="max-w-6xl mx-auto px-6">
        
        {/* Refined Proportional Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-16 border-b border-zinc-100 pb-12">
          <div className="max-w-xl space-y-4">
            <div className="flex items-center gap-3">
               <span className="h-px w-8 bg-[#FFB800]"></span>
               <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#FFB800]">Testimonials</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-zinc-950 tracking-tighter leading-tight">
               ความประทับใจจาก <br />
               <span className="text-[#FFB800] italic">ลูกค้าของเรา.</span>
            </h1>
            <p className="text-zinc-500 font-medium text-base">
               ทุกเสียงตอบรับคือพลังใจที่ทำให้ Iglass ยังคงมุ่งมั่น <br className="hidden md:block" /> 
               ส่งมอบมาตรฐานการดูแลสายตาที่ดีที่สุดให้กับคุณ
            </p>
          </div>
          
          <div className="bg-zinc-950 px-8 py-6 rounded-2xl text-center shadow-xl w-full md:w-auto">
             <div className="text-3xl font-black text-[#FFB800] mb-1 tracking-tighter">4.9/5</div>
             <div className="flex gap-1 justify-center mb-2 scale-75 md:scale-90">
                {[1,2,3,4,5].map(i => <StarIcon key={i} />)}
             </div>
             <p className="text-white/40 text-[9px] font-black uppercase tracking-widest whitespace-nowrap">Google Trusted Service</p>
          </div>
        </div>

        {/* Balanced Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
           {reviews.map((review) => (
             <div key={review.id} className="bg-zinc-50 p-8 rounded-2xl border border-zinc-100 flex flex-col gap-6 transition-all hover:bg-white hover:shadow-xl hover:shadow-zinc-200/50">
                <div className="flex justify-between items-center">
                   <div className="flex gap-1">
                      {Array(review.rating).fill(0).map((_, i) => <StarIcon key={i} size={14} />)}
                   </div>
                   <span className="text-[8px] font-black uppercase tracking-widest text-zinc-400 border border-zinc-200 px-3 py-1 rounded-full">{review.source}</span>
                </div>
                
                <p className="text-zinc-800 text-base md:text-lg font-bold leading-relaxed italic">
                   "{review.text}"
                </p>

                <div className="flex items-center gap-4 pt-6 mt-auto">
                   <div className="w-11 h-11 rounded-full overflow-hidden grayscale border border-zinc-200">
                      <Image src={review.image} alt={review.name} width={44} height={44} className="object-cover h-full w-full" />
                   </div>
                   <div>
                      <h4 className="text-zinc-950 text-sm font-black tracking-tight">{review.name}</h4>
                      <span className="text-zinc-400 text-[10px] font-bold uppercase tracking-widest">{review.date}</span>
                   </div>
                </div>
             </div>
           ))}
        </div>

        {/* Repositioned CTA Section (More Professional/Less Massive) */}
        <div className="mt-24 py-16 px-8 bg-zinc-950 rounded-3xl relative overflow-hidden text-center border border-white/5">
            <div className="relative z-10 space-y-6">
               <h2 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tight">
                  แบ่งปันแชร์ประสบการณ์ <br />
                  <span className="text-[#FFB800]">ร่วมเป็นส่วนหนึ่งของครอบครัว IGlass.</span>
               </h2>
               <button className="bg-[#FFB800] text-black font-black uppercase tracking-widest text-[10px] px-8 py-4 rounded-full hover:scale-105 transition-all shadow-lg active:scale-95">
                  Write a Review Now
               </button>
            </div>
            <div className="absolute top-0 right-0 w-40 h-40 bg-[#FFB800] opacity-5 rounded-full blur-3xl"></div>
        </div>
      </section>
    </div>
  );
}

function StarIcon({ size = 20 }: { size?: number }) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className="text-[#FFB800]">
            <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z" />
        </svg>
    )
}
