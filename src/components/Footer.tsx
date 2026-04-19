import Link from 'next/link';
import Image from 'next/image';

export default function Footer(): JSX.Element {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-zinc-950 text-white py-12 px-6 sm:px-10 overflow-hidden border-t border-zinc-900">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-12">
          
          {/* Brand Identity */}
          <div className="space-y-6">
            <Link href="/" className="inline-block transform hover:scale-105 transition-transform duration-300">
              <Image 
                src="/logo/logoglass.png" 
                alt="Iglass Logo" 
                width={150} 
                height={50} 
                className="h-10 w-auto brightness-110 grayscale invert"
              />
            </Link>
            <div className="space-y-3">
              <h3 className="text-zinc-100 font-bold text-base leading-tight">
                Iglass ร้านแว่นตาลาดกระบัง-สุวรรณภูมิ
              </h3>
              <p className="text-zinc-500 text-[12px] leading-relaxed max-w-xs font-medium">
                ศูนย์เลนส์โปรเกรสซีฟเฉพาะบุคคลและวัดสายตาโดยนักทัศนมาตร มาตรฐานสากล
              </p>
            </div>
             <div className="flex items-center gap-3">
                {['Facebook', 'Line', 'Instagram'].map(social => (
                  <Link 
                    key={social} 
                    href={social === 'Facebook' ? 'https://www.facebook.com/iglassoptical/' : '#'} 
                    target={social === 'Facebook' ? '_blank' : '_self'}
                    className="w-8 h-8 flex items-center justify-center rounded-full bg-zinc-900 hover:bg-[#FFB800] hover:text-black transition-all duration-300 text-zinc-400"
                  >
                     <SocialIcon name={social} />
                  </Link>
                ))}
             </div>
          </div>

          {/* Quick Links */}
          <div className="lg:pl-10">
            <h4 className="text-white font-black uppercase tracking-[3px] text-[10px] mb-6 border-l-2 border-[#FFB800] pl-4">หน้าเว็บไซต์</h4>
            <ul className="space-y-3">
              {['หน้าแรก', 'เกี่ยวกับเรา', 'โปรโมชั่นล่าสุด', 'บทความทัศนมาตร', 'รีวิวจากลูกค้า'].map(item => (
                <li key={item}>
                  <Link href="#" className="text-zinc-500 hover:text-[#FFB800] transition-colors font-semibold text-[13px] flex items-center group">
                    <span className="w-0 group-hover:w-2 h-[1px] bg-[#FFB800] mr-0 group-hover:mr-2 transition-all"></span>
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-black uppercase tracking-[3px] text-[10px] mb-6 border-l-2 border-[#FFB800] pl-4">บริการของเรา</h4>
            <ul className="space-y-3">
              {['ตรวจวัดสายตาอย่างละเอียด', 'เลนส์โปรเกรสซีฟเฉพาะบุคคล', 'ประกอบแว่นด้วยเครื่องมาตรฐาน', 'ดูแลซ่อมแซมแว่นตา'].map(item => (
                <li key={item}>
                  <Link href="#" className="text-zinc-500 hover:text-[#FFB800] transition-colors font-semibold text-[13px] flex items-center group">
                    <span className="w-0 group-hover:w-2 h-[1px] bg-[#FFB800] mr-0 group-hover:mr-2 transition-all"></span>
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details */}
          <div className="space-y-6">
            <h4 className="text-white font-black uppercase tracking-[3px] text-[10px] mb-6 border-l-2 border-[#FFB800] pl-4">ติดต่อเรา</h4>
            <div className="space-y-4">
               <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-lg bg-zinc-900 flex items-center justify-center text-[#FFB800] shrink-0">
                    <PhoneIcon />
                  </div>
                  <div>
                    <span className="block text-[9px] uppercase text-zinc-600 font-bold tracking-widest mb-0.5">เบอร์โทรศัพท์</span>
                    <Link href="tel:0968282468" className="text-zinc-200 font-black text-sm tracking-wider hover:text-[#FFB800] transition-colors">096-828-2468</Link>
                  </div>
               </div>
               <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-lg bg-zinc-900 flex items-center justify-center text-[#FFB800] shrink-0">
                    <ClockIcon />
                  </div>
                  <div>
                    <span className="block text-[9px] uppercase text-zinc-600 font-bold tracking-widest mb-0.5">เวลาทำการ</span>
                    <p className="text-zinc-200 font-black text-[12px] tracking-wider uppercase">11.00 - 21.00 น.</p>
                  </div>
               </div>
               <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-lg bg-zinc-900 flex items-center justify-center text-[#FFB800] shrink-0">
                    <LocationIcon />
                  </div>
                  <div>
                    <span className="block text-[9px] uppercase text-zinc-600 font-bold tracking-widest mb-0.5">ที่ตั้งร้าน</span>
                    <p className="text-zinc-200 font-black text-[12px] leading-relaxed">ลาดกระบัง-สุวรรณภูมิ</p>
                  </div>
               </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-zinc-900 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[10px] font-bold text-zinc-600 uppercase tracking-[3px]">
            &copy; {currentYear} Iglass Eyewear Thailand.
          </p>
          <div className="flex gap-6">
             <Link href="#" className="text-[9px] font-bold uppercase text-zinc-700 tracking-[2px] hover:text-[#FFB800] transition-colors">Privacy Policy</Link>
             <Link href="#" className="text-[9px] font-bold uppercase text-zinc-700 tracking-[2px] hover:text-[#FFB800] transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ── Inline Icons ────────────────────────────────── */

function SocialIcon({ name }: { name: string }) {
    switch (name) {
        case 'Facebook': return <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>;
        case 'Line': return <span className="font-bold text-[8px]">LINE</span>;
        case 'Instagram': return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>;
        default: return null;
    }
}

function PhoneIcon() {
    return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>;
}

function ClockIcon() {
    return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>;
}

function LocationIcon() {
    return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>;
}
