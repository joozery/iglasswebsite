'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

/* ── Icons (SVG Clean) ── */
const PhoneIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <path d="M6.62 10.79a15.15 15.15 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.11-.27c1.12.45 2.33.69 3.58.69a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.24 2.46.69 3.58a1 1 0 0 1-.27 1.11z" />
  </svg>
);

const MailIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m22 2-10 11" /><path d="m22 2-7 20-4-9-9-4Z" />
  </svg>
);

const ClockIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
  </svg>
);

const FacebookIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const LinkedInIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z" /><circle cx="4" cy="4" r="2" />
  </svg>
);

export default function Navbar(): JSX.Element {
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'หน้าแรก', href: '/' },
    { label: 'เกี่ยวกับเรา', href: '/about' },
    { label: 'โปรโมชั่น', href: '/promotions' },
    { label: 'นัดหมาย', href: '/appointment' },
    { label: 'บทความ', href: '/articles' },
    { label: 'รีวิว', href: '/reviews' },
    { label: 'ติดต่อเรา', href: '/contact' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 w-full font-thai`}>
      {/* ── Top Bar (Responsive) ── */}
      <div className="w-full bg-[#FFB800] text-black py-2 px-4 md:px-8 border-b border-black/5">
        <div className="max-w-7xl mx-auto flex justify-between items-center text-[10px] md:text-[11px] font-black uppercase tracking-wider">
          <div className="flex items-center gap-4 md:gap-8 overflow-x-auto no-scrollbar scroll-smooth">
            <a href="tel:0968282468" className="flex items-center gap-2 whitespace-nowrap active:scale-95 transition-all">
              <PhoneIcon /> <span>096-828-2468</span>
            </a>
            <div className="hidden sm:flex items-center gap-2 whitespace-nowrap">
              <MailIcon /> <span>iglassoptical99@gmail.com</span>
            </div>
            <div className="flex items-center gap-2 whitespace-nowrap">
              <ClockIcon /> <span>11.00 - 21.00 น.</span>
            </div>
          </div>
          <div className="flex items-center gap-4 ml-4 shrink-0">
             <Link href="#" className="hover:text-black/70 transition-colors"><LinkedInIcon /></Link>
             <a href="https://www.facebook.com/iglassoptical/" target="_blank" className="hover:text-black/70 transition-colors"><FacebookIcon /></a>
          </div>
        </div>
      </div>

      {/* ── Main Navbar ── */}
      <div className={`w-full transition-all duration-500 bg-white shadow-sm border-b border-zinc-100 ${scrolled ? 'py-3' : 'py-5 md:py-6'}`}>
        <div className="max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between">
          
          {/* Brand/Logo */}
          <Link href="/" className="flex items-center relative z-[110]">
             <Image 
              src="/logo/logoglass.png" 
              alt="Iglass Logo" 
              width={140} 
              height={40} 
              className="h-8 md:h-10 w-auto object-contain"
              priority
             />
          </Link>

          {/* Nav Links (Desktop) */}
          <div className="hidden lg:flex items-center gap-8 xl:gap-10">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-[14px] font-black text-zinc-900 hover:text-[#FFB800] transition-all relative group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#FFB800] transition-all duration-500 group-hover:w-full" />
              </Link>
            ))}
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-3 relative z-[110]">
            <Link
              href="/contact"
              className="hidden sm:flex bg-[#FFB800] hover:bg-black hover:text-white text-black px-6 py-2.5 rounded-full text-[11px] font-black uppercase tracking-widest transition-all shadow-md active:scale-95 border border-black/5"
            >
              Contact Us
            </Link>
            
            {/* Mobile Toggle (Hamburger) */}
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2.5 text-zinc-900 bg-zinc-50 rounded-xl transition-all active:scale-90"
              aria-label="Toggle Menu"
            >
               {isMobileMenuOpen ? (
                 <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
               ) : (
                 <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
               )}
            </button>
          </div>
        </div>
      </div>

      {/* ── Mobile Menu (Overlay Drawer) ── */}
      <div className={`fixed inset-0 bg-white z-[90] transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] lg:hidden ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
         {/* Decorative Background Elements */}
         <div className="absolute top-0 right-0 w-1/2 h-full bg-zinc-50/50 -z-10" />
         
         <div className="flex flex-col h-full pt-32 pb-12 px-8">
            <div className="space-y-4 flex-grow overflow-y-auto no-scrollbar">
               {navLinks.map((link, i) => (
                 <Link
                   key={link.label}
                   href={link.href}
                   onClick={() => setIsMobileMenuOpen(false)}
                   className={`block text-[28px] font-black tracking-tight flex items-center justify-between transition-all duration-700 transform ${isMobileMenuOpen ? 'translate-x-0 opacity-100' : 'translate-x-12 opacity-0'}`}
                   style={{ transitionDelay: `${(i + 1) * 70}ms` }}
                 >
                   <span className="text-zinc-950 hover:text-[#FFB800] transition-colors">{link.label}</span>
                   <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#eee" strokeWidth="4"><path d="M5 12h14m-7-7 7 7-7 7"/></svg>
                 </Link>
               ))}
            </div>
            
            {/* Bottom Contact Section */}
            <div className="mt-auto space-y-8 pt-10 border-t border-zinc-100 relative pb-4">
               <div className="flex flex-col gap-5">
                  <a href="tel:0968282468" className="flex items-center gap-4 text-zinc-900 font-black text-lg transition-transform active:scale-95">
                     <div className="w-11 h-11 rounded-2xl bg-[#FFB800]/10 border border-[#FFB800]/20 flex items-center justify-center text-[#FFB800] shadow-sm"><PhoneIcon /></div>
                     096-828-2468
                  </a>
                  <div className="flex items-center gap-4 text-zinc-600 font-bold text-[13px] uppercase tracking-wide">
                     <div className="w-11 h-11 rounded-2xl bg-zinc-50 border border-zinc-100 flex items-center justify-center text-zinc-400"><ClockIcon /></div>
                     Open Daily: 11.00 - 21.00 น.
                  </div>
               </div>
               
               <Link 
                 href="https://lin.ee/KqzDyG3" 
                 target="_blank"
                 onClick={() => setIsMobileMenuOpen(false)}
                 className="block w-full bg-[#FFB800] hover:bg-black text-black hover:text-white px-6 py-5 rounded-2xl font-black uppercase tracking-widest shadow-[0_20px_40px_-10px_rgba(255,184,0,0.3)] transition-all active:scale-95 text-center text-sm"
               >
                 Contact Official Account
               </Link>
            </div>
         </div>
      </div>
    </nav>
  );
}
