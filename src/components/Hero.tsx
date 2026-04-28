'use client';
import { useState, useEffect, useRef, useCallback, MouseEvent } from 'react';
import Image from 'next/image';
import Link from 'next/link';

/* ─────────────────── Slide Data ─────────────────── */
const DEFAULT_SLIDES = [
  {
    id: '1',
    src: '/images/hero-professional.png',
    alt: 'Professional Eyewear',
    eyebrow: 'CERTIFIED OPTOMETRY',
    title: 'ความแม่นยำ',
    titleHighlight: 'ที่สมบูรณ์แบบ',
    subtitle: 'ศูนย์เลนส์โปรเกรสซีฟและวัดสายตาด้วยมาตรฐานระดับสากล โดยนักทัศนมาตรผู้เชี่ยวชาญ',
    accent: '#FFB800',
    tag: '01 / PRECISION',
  },
  {
    id: '2',
    src: '/images/intro/interior.png',
    alt: 'Store Interior',
    eyebrow: 'PREMIUM EXPERIENCE',
    title: 'ศิลปะแห่งการดูแล',
    titleHighlight: 'ดวงตาของคุณ',
    subtitle: 'สัมผัสประสบการณ์การตรวจวัดสายตาอย่างละเอียด ในบรรยากาศที่ผ่อนคลายและทันสมัยที่สุด',
    accent: '#FFB800',
    tag: '02 / EXPERTISE',
  },
  {
    id: '3',
    src: '/images/intro/collage.png',
    alt: 'Eyewear Collection',
    eyebrow: 'LUXURY EYEWEAR',
    title: 'ดีไซน์ที่สะท้อน',
    titleHighlight: 'ตัวตนของคุณ',
    subtitle: 'รวบรวมกรอบแว่นแบรนด์เนมระดับโลก คัดสรรเพื่อนำเสนอสไตล์ที่แสดงความเป็นตัวคุณ',
    accent: '#FFB800',
    tag: '03 / STYLE',
  },
];

const STATS = [
  { value: '15+', label: 'ปีประสบการณ์', en: 'Years Exp.' },
  { value: 'OD.', label: 'นักทัศนมาตร', en: 'Certified' },
  { value: '5K+', label: 'ลูกค้าพึงพอใจ', en: 'Happy Clients' },
];

/* ─────────────────── Particle ─────────────────── */
interface Particle {
  id: number;
  x: number;
  size: number;
  duration: number;
  delay: number;
}

function Particles() {
  const [particles, setParticles] = useState<Particle[]>([]);
  useEffect(() => {
    setParticles(
      Array.from({ length: 18 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        size: Math.random() * 4 + 2,
        duration: Math.random() * 12 + 8,
        delay: Math.random() * 8,
      }))
    );
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute bottom-0 rounded-full bg-[#FFB800]/30"
          style={{
            left: `${p.x}%`,
            width: p.size,
            height: p.size,
            animation: `particleDrift ${p.duration}s ${p.delay}s linear infinite`,
          }}
        />
      ))}
    </div>
  );
}

/* ─────────────────── Magnetic Button ─────────────────── */
function MagneticLink({
  href,
  children,
  className,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLAnchorElement>(null);

  const handleMouseMove = (e: MouseEvent<HTMLAnchorElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    el.style.transform = `translate(${x * 0.35}px, ${y * 0.35}px) scale(1.05)`;
  };

  const handleMouseLeave = () => {
    if (ref.current) ref.current.style.transform = '';
  };

  return (
    <Link
      href={href}
      ref={ref}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transition: 'transform 0.3s cubic-bezier(0.22,1,0.36,1), background 0.3s, color 0.3s, box-shadow 0.3s' }}
    >
      {children}
    </Link>
  );
}

/* ─────────────────── Hero ─────────────────── */
export default function Hero() {
  const [slides, setSlides] = useState<any[]>([]);
  const [current, setCurrent] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Cursor spotlight state
  const [cursor, setCursor] = useState({ x: -999, y: -999 });
  const sectionRef = useRef<HTMLElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setMounted(true);
    const fetchSlides = async () => {
      try {
        const res = await fetch('http://localhost:5001/api/hero');
        const data = await res.json();
        if (data && data.length > 0) {
          setSlides(
            data.map((item: any, i: number) => ({
              ...item,
              ...DEFAULT_SLIDES[i % 3],
            }))
          );
        } else {
          setSlides(DEFAULT_SLIDES);
        }
      } catch {
        setSlides(DEFAULT_SLIDES);
      } finally {
        setIsLoading(false);
      }
    };
    fetchSlides();
  }, []);

  /* Auto-advance */
  useEffect(() => {
    if (slides.length <= 1) return;
    timerRef.current = setInterval(() => go(1), 7000);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [slides, current]);

  const go = useCallback(
    (dir: 1 | -1) => {
      if (isTransitioning) return;
      setIsTransitioning(true);
      setCurrent((prev) => (prev + dir + slides.length) % slides.length);
      setTimeout(() => setIsTransitioning(false), 1000);
      if (timerRef.current) { clearInterval(timerRef.current); }
    },
    [isTransitioning, slides.length]
  );

  /* Cursor spotlight */
  const handleMouseMove = (e: MouseEvent<HTMLElement>) => {
    const rect = sectionRef.current?.getBoundingClientRect();
    if (!rect) return;
    setCursor({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  if (!mounted || (isLoading && slides.length === 0)) {
    return (
      <section className="w-full h-screen bg-[#080808] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-2 border-[#FFB800]/30 border-t-[#FFB800] rounded-full animate-spin" />
          <span className="text-zinc-500 text-xs tracking-[0.3em] uppercase">Loading</span>
        </div>
      </section>
    );
  }

  const slide = slides[current] || DEFAULT_SLIDES[0];

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      className="relative w-full h-[88vh] bg-[#080808] overflow-hidden font-thai select-none"
    >
      {/* ──── CURSOR SPOTLIGHT ──── */}
      <div
        className="pointer-events-none absolute inset-0 z-30 transition-opacity duration-300"
        style={{
          background: `radial-gradient(600px circle at ${cursor.x}px ${cursor.y}px, rgba(255,184,0,0.07), transparent 60%)`,
        }}
      />

      {/* ──── BACKGROUND IMAGES ──── */}
      <div className="absolute inset-0 z-0">
        {slides.map((s, i) => (
          <div
            key={s.id || i}
            className="absolute inset-0 transition-opacity duration-[1800ms] ease-in-out"
            style={{ opacity: i === current ? 1 : 0 }}
          >
            <Image
              src={s.src}
              alt={s.alt || 'iGlass'}
              fill
              className={`object-cover object-center transition-transform duration-[12000ms] ease-out ${
                i === current ? 'scale-110' : 'scale-100'
              }`}
              priority={i === 0}
            />
          </div>
        ))}
      </div>

      {/* ──── OVERLAYS ──── */}
      {/* Main: diagonal left-heavy gradient */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-r from-black/95 via-black/70 to-black/20" />
      {/* Bottom vignette */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-t from-black/80 via-transparent to-transparent" />
      {/* Noise texture */}
      <div
        className="absolute inset-0 z-[2] opacity-[0.03] pointer-events-none"
        style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\'/%3E%3C/svg%3E")' }}
      />

      {/* ──── FLOATING PARTICLES ──── */}
      <Particles />

      {/* ──── SCAN LINE EFFECT ──── */}
      <div className="absolute left-0 right-0 h-[2px] z-[3] pointer-events-none animate-scan-line"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(255,184,0,0.15), transparent)' }}
      />

      {/* ──── GRID LINES (subtle) ──── */}
      <div className="absolute inset-0 z-[2] pointer-events-none opacity-[0.025]"
        style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)', backgroundSize: '80px 80px' }}
      />

      {/* ──── YELLOW GLOW BLOB ──── */}
      <div className="absolute top-1/2 left-[30%] -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full z-[1] pointer-events-none animate-hero-glow"
        style={{ background: 'radial-gradient(circle, rgba(255,184,0,0.08), transparent 70%)' }}
      />

      {/* ──── MAIN CONTENT ──── */}
      <div className="relative z-20 h-full flex flex-col justify-between px-6 md:px-14 lg:px-20 pt-24 pb-0">

        {/* ── TOP BAR: Slide tag + Navigation dots ── */}
        <div className="flex items-center justify-between">
          {/* Slide tag (animated) */}
          <div
            key={`tag-${current}`}
            className="flex items-center gap-3 animate-slide-left"
          >
            <div className="w-5 h-[1.5px] bg-[#FFB800]" />
            <span className="text-[10px] font-bold tracking-[0.35em] text-[#FFB800] uppercase">
              {slide.tag}
            </span>
          </div>

          {/* Slide dots */}
          <div className="flex items-center gap-3">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => { if (!isTransitioning && i !== current) { setIsTransitioning(true); setCurrent(i); setTimeout(() => setIsTransitioning(false), 1000); } }}
                className="group relative flex items-center justify-center h-6 w-6"
                aria-label={`Slide ${i + 1}`}
              >
                <span className={`block rounded-full transition-all duration-500 ${
                  i === current
                    ? 'w-5 h-[2px] bg-[#FFB800]'
                    : 'w-[6px] h-[6px] bg-white/30 group-hover:bg-white/60'
                }`} />
              </button>
            ))}
          </div>
        </div>

        {/* ── CENTER: Main Typography ── */}
        <div className="flex-1 flex flex-col justify-center max-w-4xl">

          {/* Eyebrow */}
          <div
            key={`eyebrow-${current}`}
            className="flex items-center gap-4 mb-6 animate-reveal-up"
            style={{ animationDelay: '0.1s' }}
          >
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/15 bg-white/5 backdrop-blur-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-pulse-ring absolute inline-flex h-full w-full rounded-full bg-[#FFB800] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#FFB800]" />
              </span>
              <span className="text-[10px] font-bold tracking-[0.3em] text-white/70 uppercase">{slide.eyebrow}</span>
            </div>
          </div>

          {/* Main headline */}
          <div key={`title-${current}`} className="overflow-hidden mb-6">
            <h1
              className="font-black leading-[1] tracking-tight text-white animate-reveal-up"
              style={{
                fontSize: 'clamp(2rem, 5vw, 4rem)',
                animationDelay: '0.2s',
              }}
            >
              {slide.title}
              <br />
              <span
                className="animate-gradient"
                style={{
                  backgroundImage: 'linear-gradient(90deg, #FFB800, #FFD770, #FFB800)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                {slide.titleHighlight}
              </span>
            </h1>
          </div>

          {/* Subtitle */}
          <p
            key={`sub-${current}`}
            className="text-base md:text-lg text-white/60 max-w-lg leading-relaxed mb-8 font-medium animate-reveal-up"
            style={{ animationDelay: '0.35s' }}
          >
            {slide.subtitle}
          </p>

          {/* CTA Row */}
          <div
            key={`cta-${current}`}
            className="flex flex-wrap items-center gap-5 animate-reveal-up"
            style={{ animationDelay: '0.5s' }}
          >
            {/* Primary CTA – Magnetic */}
            <MagneticLink
              href="/appointment"
              className="group relative inline-flex items-center justify-center overflow-hidden rounded-full bg-[#FFB800] text-black px-7 py-3.5 font-black text-sm tracking-wide shadow-[0_8px_32px_rgba(255,184,0,0.35)] hover:shadow-[0_16px_48px_rgba(255,184,0,0.5)]"
            >
              <span className="relative z-10 flex items-center gap-2">
                จองคิววัดสายตา
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-1 transition-transform">
                  <path d="M5 12h14m-7-7 7 7-7 7" />
                </svg>
              </span>
              {/* Shimmer overlay */}
              <div className="absolute inset-0 -skew-x-12 -translate-x-full group-hover:translate-x-[200%] transition-transform duration-700 bg-gradient-to-r from-transparent via-white/30 to-transparent" />
            </MagneticLink>

            {/* Secondary CTA – Ghost */}
            <MagneticLink
              href="/promotions"
              className="group inline-flex items-center justify-center gap-2 rounded-full border border-white/20 px-6 py-3.5 text-white text-sm font-bold tracking-wide hover:bg-white hover:text-black hover:border-white"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" />
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
              </svg>
              โปรโมชั่น 590.-
            </MagneticLink>
          </div>
        </div>

        {/* ── BOTTOM BAR ── */}
        <div className="flex items-end justify-between pb-6 md:pb-10">

          {/* Stats */}
          <div className="flex items-center gap-6 md:gap-10">
            {STATS.map((s, i) => (
              <div key={i} className="flex flex-col">
                <span className="text-xl md:text-2xl font-black text-white leading-none">{s.value}</span>
                <span className="text-[9px] font-bold text-zinc-500 uppercase tracking-[0.2em] mt-1.5">{s.en}</span>
              </div>
            ))}
          </div>

          {/* Prev / Next + Scroll hint */}
          <div className="flex flex-col items-end gap-4">
            {/* Arrow controls */}
            <div className="flex gap-2">
              <button
                onClick={() => go(-1)}
                aria-label="Previous"
                className="group w-12 h-12 rounded-full border border-white/15 flex items-center justify-center text-white/50 hover:border-[#FFB800] hover:text-[#FFB800] transition-all"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:-translate-x-0.5 transition-transform">
                  <path d="m15 18-6-6 6-6" />
                </svg>
              </button>
              <button
                onClick={() => go(1)}
                aria-label="Next"
                className="group w-12 h-12 rounded-full bg-[#FFB800] flex items-center justify-center text-black hover:bg-white transition-colors"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-0.5 transition-transform">
                  <path d="m9 18 6-6-6-6" />
                </svg>
              </button>
            </div>

            {/* Scroll indicator */}
            <div className="hidden md:flex flex-col items-center gap-2">
              <div className="w-[1px] h-12 bg-white/10 relative overflow-hidden">
                <div className="absolute inset-x-0 top-0 h-full bg-[#FFB800]/50 animate-scroll-line" />
              </div>
              <span className="text-[8px] font-bold tracking-[0.4em] text-white/20 uppercase rotate-90 translate-y-8">Scroll</span>
            </div>
          </div>
        </div>
      </div>



      {/* ──── VERTICAL SIDE LABEL ──── */}
      <div className="absolute left-5 md:left-8 top-1/2 -translate-y-1/2 z-20 hidden lg:flex flex-col items-center gap-3">
        <div className="w-[1px] h-16 bg-white/10" />
        <span
          className="text-[8px] font-black tracking-[0.5em] text-white/20 uppercase"
          style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
        >
          iGlass Eyewear
        </span>
        <div className="w-[1px] h-16 bg-white/10" />
      </div>

      {/* ──── COUNTER STRIP (bottom edge) ──── */}
      <div className="absolute bottom-0 left-0 right-0 z-30 pointer-events-none">
        <div className="max-w-none h-[3px] bg-white/5 relative overflow-hidden">
          <div
            className="absolute left-0 top-0 h-full bg-[#FFB800] transition-all duration-700 ease-out"
            style={{ width: `${((current + 1) / (slides.length || 1)) * 100}%` }}
          />
        </div>
      </div>
    </section>
  );
}
