import Image from 'next/image';
import Link from 'next/link';

const FEATURES = [
  {
    icon: <EyeIcon />,
    title: 'ตรวจสายตาโดยนักทัศนมาตร',
    desc: 'การตรวจแม่นยำ พร้อมคำแนะนำเฉพาะบุคคล',
  },
  {
    icon: <GlassesIcon />,
    title: 'ตัดแว่นสายตา เด็ก-ผู้ใหญ่',
    desc: 'กรอบหลากหลาย ขนาดเหมาะกับแต่ละบุคคล',
  },
  {
    icon: <MedalIcon />,
    title: 'เลนส์คุณภาพหลายยี่ห้อ',
    desc: 'เลนส์ลดแสงสะท้อน และเลนส์เฉพาะทาง',
  },
  {
    icon: <SupportIcon />,
    title: 'บริการหลังการขาย',
    desc: 'ปรับแว่น ซ่อมแว่น และการรับประกัน',
  },
];

export default function SpecialistSection() {
  return (
    <section className="py-16 md:py-24 bg-[#F7F7F5] font-thai overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-center">

          {/* ── LEFT: Doctor Image ── */}
          <div className="lg:col-span-5 relative group">

            {/* Decorative background block */}
            <div className="absolute -bottom-4 -right-4 w-full h-full rounded-3xl bg-[#FFB800]/15 -z-10" />

            {/* Main photo card */}
            <div className="relative rounded-3xl overflow-hidden shadow-xl bg-zinc-200 aspect-[3/4]">
              <Image
                src="/images/specialist-v2.png"
                alt="OD Specialist"
                fill
                className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 42vw"
              />

              {/* Dark gradient bottom */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

              {/* Top-left badge */}
              <div className="absolute top-5 left-5 bg-[#FFB800] px-4 py-3 rounded-2xl shadow-lg max-w-[170px]">
                <h3 className="text-black font-black text-[13px] leading-snug">
                  ตรวจวัดสายตา<br />โดยนักทัศนมาตร
                </h3>
                <p className="text-black/60 text-[10px] font-bold mt-1.5 leading-snug">
                  ที่ได้รับใบอนุญาต<br />จากกระทรวงสาธารณสุข
                </p>
              </div>

              {/* Bottom name card */}
              <div className="absolute bottom-5 left-5 right-5">
                <div className="bg-white/95 backdrop-blur-sm px-5 py-4 rounded-2xl shadow-lg flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#FFB800]/15 flex items-center justify-center shrink-0">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FFB800" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-[#FFB800] text-base font-black leading-none mb-0.5">
                      OD. สูดาวัน หงษ์ภักดี
                    </h4>
                    <p className="text-zinc-400 text-[10px] font-bold uppercase tracking-wider">
                      นักทัศนมาตรประจำร้าน iGlass
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating years badge */}
            <div className="absolute -top-5 -right-5 w-20 h-20 rounded-full bg-zinc-950 flex flex-col items-center justify-center shadow-xl border-4 border-[#F7F7F5]">
              <span className="text-[#FFB800] text-xl font-black leading-none">15+</span>
              <span className="text-white/40 text-[7px] font-bold uppercase tracking-wide mt-0.5">Years</span>
            </div>
          </div>

          {/* ── RIGHT: Content ── */}
          <div className="lg:col-span-7 space-y-8">

            {/* Eyebrow */}
            <div className="inline-flex items-center gap-3">
              <span className="h-[2px] w-7 bg-[#FFB800]" />
              <span className="text-[10px] font-black uppercase tracking-[0.35em] text-[#FFB800]">About Us</span>
            </div>

            {/* Heading */}
            <div>
              <h2 className="text-3xl md:text-5xl font-black text-zinc-950 tracking-tight leading-[1.1] mb-5">
                iGlass ร้านแว่นตา<br />
                <span className="text-zinc-400">ที่ดูแลโดยผู้เชี่ยวชาญ.</span>
              </h2>
              <p className="text-zinc-500 text-base leading-relaxed max-w-xl">
                ร้านแว่นตาที่ดูแลโดย <strong className="text-zinc-800">นักทัศนมาตรผู้เชี่ยวชาญด้านสายตา</strong> ให้บริการตรวจวัดสายตาและตัดแว่นอย่างละเอียด สำหรับทั้งเด็กและผู้ใหญ่ เราคัดสรรกรอบและเลนส์คุณภาพ เพื่อให้ลูกค้าได้รับการมองเห็นที่ชัดเจนที่สุด
              </p>
            </div>

            {/* Divider */}
            <div className="h-px bg-zinc-200" />

            {/* Feature 2×2 grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {FEATURES.map((f, i) => (
                <div key={i} className="group flex gap-4 items-start p-4 rounded-2xl hover:bg-white hover:shadow-md transition-all duration-300 cursor-default border border-transparent hover:border-zinc-100">
                  <div className="w-10 h-10 shrink-0 rounded-xl bg-zinc-950 text-[#FFB800] flex items-center justify-center group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-300 shadow-md">
                    {f.icon}
                  </div>
                  <div>
                    <h4 className="text-[13px] font-black text-zinc-900 mb-1 uppercase tracking-wide">{f.title}</h4>
                    <p className="text-[12px] text-zinc-400 leading-relaxed">{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 pt-2">
              <Link
                href="/appointment"
                className="group inline-flex items-center gap-2 bg-zinc-950 text-white font-bold text-sm px-7 py-3.5 rounded-full hover:bg-[#FFB800] hover:text-black transition-all duration-300 shadow-lg hover:shadow-[#FFB800]/30 hover:-translate-y-0.5"
              >
                นัดหมายตรวจสายตา
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-1 transition-transform">
                  <path d="M5 12h14m-7-7 7 7-7 7"/>
                </svg>
              </Link>
              <Link
                href="/collections"
                className="inline-flex items-center gap-2 bg-white text-zinc-800 font-bold text-sm px-7 py-3.5 rounded-full border border-zinc-200 hover:border-zinc-400 hover:bg-zinc-50 transition-all duration-300"
              >
                ดูบริการทั้งหมด
              </Link>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Icons ── */
function EyeIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
    </svg>
  );
}
function GlassesIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M21 5h-4.3l-1.5 2.5H8.8L7.3 5H3c-1.1 0-2 .9-2 2v1h1v10c0 1.1.9 2 2 2h4c1.1 0 2-.9 2-2v-1h4v1c0 1.1.9 2 2 2h4c1.1 0 2-.9 2-2V8h1V7c0-1.1-.9-2-2-2zM8 18H4v-8h4v8zm12 0h-4v-8h4v8z"/>
    </svg>
  );
}
function MedalIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 1L9 9H1l7 5-3 9 7-5 7 5-3-9 7-5h-8l-3-8z"/>
    </svg>
  );
}
function SupportIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/>
    </svg>
  );
}
