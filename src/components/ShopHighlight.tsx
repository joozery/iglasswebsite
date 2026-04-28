import Image from 'next/image';
import Link from 'next/link';

const FEATURES = [
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
      </svg>
    ),
    title: 'ตรวจวัดสายตาโดยนักทัศนมาตร',
    desc: 'ทุกขั้นตอนละเอียดและแม่นยำในมาตรฐานระดับคลินิก',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="8" r="7"/><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/>
      </svg>
    ),
    title: 'กรอบแว่นหลากหลายสไตล์',
    desc: 'ผู้ใหญ่และเด็ก น้ำหนักเบา ดีไซน์ทันสมัยทุกรูปแบบ',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
      </svg>
    ),
    title: 'เลนส์แว่นหลากยี่ห้อ',
    desc: 'เปิดราคาตาม price list โปร่งใส มีบริการหลังการขาย',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    ),
    title: 'รับประกันและบริการซ่อม',
    desc: 'ปรับ ดัด ซ่อม และรับประกันสินค้าทุกชิ้น',
  },
];

const IMAGES = [
  { src: '/images/intro/interior.png', alt: 'Store Interior', span: 'row-span-2' },
  { src: '/images/intro/collage.png', alt: 'Eyewear Collection', span: '' },
  { src: '/images/intro/exam.png', alt: 'Exam Room', span: '' },
];

export default function ShopHighlight() {
  return (
    <section className="py-16 md:py-24 bg-white font-thai">
      <div className="max-w-7xl mx-auto px-6 md:px-10">

        {/* ── Header ── */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-3 mb-3">
              <span className="h-[2px] w-7 bg-[#FFB800]" />
              <span className="text-[10px] font-black uppercase tracking-[0.35em] text-[#FFB800]">Why Choose Us</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-zinc-950 tracking-tight leading-tight">
              iGlass <span className="text-zinc-400">ร้านแว่นตาคุณภาพ</span>
            </h2>
          </div>

          {/* LINE CTA */}
          <Link
            href="https://lin.ee/KqzDyG3"
            className="group inline-flex items-center gap-3 bg-[#06C755] hover:bg-[#05b34d] text-white px-6 py-3.5 rounded-full font-bold text-sm tracking-wide transition-all shadow-lg shadow-[#06C755]/20 hover:shadow-[#06C755]/30 hover:-translate-y-0.5 active:scale-95 self-start md:self-auto"
          >
            <Image src="/iconsocial/icons8-line-48.png" alt="Line" width={22} height={22} className="object-contain" />
            นัดหมายผ่านแชท
          </Link>
        </div>

        {/* ── Main Grid ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">

          {/* Left: Feature Cards */}
          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {FEATURES.map((f, i) => (
              <div
                key={i}
                className="group flex flex-col gap-4 p-6 rounded-2xl bg-zinc-50 border border-zinc-100 hover:bg-white hover:border-[#FFB800]/30 hover:shadow-lg hover:shadow-[#FFB800]/5 transition-all duration-300 cursor-default"
              >
                <div className="w-10 h-10 rounded-xl bg-zinc-950 text-[#FFB800] flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-300 shadow-md">
                  {f.icon}
                </div>
                <div>
                  <h4 className="text-sm font-black text-zinc-900 mb-1 leading-snug">{f.title}</h4>
                  <p className="text-xs text-zinc-500 leading-relaxed">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Right: Image Bento Grid */}
          <div className="lg:col-span-7 grid grid-cols-2 grid-rows-2 gap-3 md:gap-4 h-[420px] md:h-[480px]">

            {/* Large image — left, full height */}
            <div className="row-span-2 relative rounded-2xl overflow-hidden group shadow-sm">
              <Image
                src="/images/intro/interior.png"
                alt="Store Interior"
                fill
                className="object-cover transition-transform duration-[1200ms] group-hover:scale-105"
                sizes="33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 p-5">
                <p className="text-white text-sm font-black leading-snug">Premium<br />Studio</p>
              </div>
            </div>

            {/* Top-right */}
            <div className="relative rounded-2xl overflow-hidden group shadow-sm">
              <Image
                src="/images/intro/collage.png"
                alt="Eyewear Collection"
                fill
                className="object-cover transition-transform duration-[1200ms] group-hover:scale-105"
                sizes="22vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 p-4">
                <p className="text-white text-xs font-bold">Collection</p>
              </div>
            </div>

            {/* Bottom-right */}
            <div className="relative rounded-2xl overflow-hidden group shadow-sm">
              <Image
                src="/images/intro/exam.png"
                alt="Exam Room"
                fill
                className="object-cover transition-transform duration-[1200ms] group-hover:scale-105"
                sizes="22vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 p-4">
                <p className="text-white text-xs font-bold">Exam Room</p>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
