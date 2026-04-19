export default function Marquee() {
  const text = "Iglass ร้านแว่นตาลาดกระบัง-สุวรรณภูมิ ตรวจสายตา ตัดแว่น";
  
  return (
    <div className="overflow-hidden bg-gradient-to-r from-[#FFB800] to-[#fcc419] py-2.5 flex items-center shadow-inner">
      <div className="flex whitespace-nowrap animate-marquee items-center border-y border-black/5">
        {Array(5).fill(0).map((_, i) => (
          <div key={i} className="flex items-center">
            <span className="mx-8 text-[12px] font-bold tracking-wider text-black flex items-center gap-2">
               <SparkleIcon /> {text} <SparkleIcon />
            </span>
          </div>
        ))}
      </div>
      {/* Duplicate for seamless loop */}
      <div className="flex whitespace-nowrap animate-marquee items-center" aria-hidden="true">
        {Array(5).fill(0).map((_, i) => (
          <div key={i} className="flex items-center">
            <span className="mx-8 text-[12px] font-bold tracking-wider text-black flex items-center gap-2">
               <SparkleIcon /> {text} <SparkleIcon />
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

const SparkleIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="text-black/80">
    <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
  </svg>
);
