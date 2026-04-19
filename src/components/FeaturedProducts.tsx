import Link from 'next/link';

interface Product { id: number; name: string; desc: string; price: string; tag: string; stroke: string; }

const products: Product[] = [
  { id: 1, name: 'Aura Midnight Gold', desc: 'Japanese Titanium • Blue Light Pro', price: '฿8,500', tag: 'Bestseller', stroke: '#FFB800' },
  { id: 2, name: 'Noir Eclipse',        desc: 'Handcrafted Acetate • Noir Series',  price: '฿6,200', tag: 'New Arrival',   stroke: '#000000' },
  { id: 3, name: 'Solar Shield Pro',    desc: 'Polarized UV400 • Sport Classic',      price: '฿4,900', tag: 'Limited',        stroke: '#FFB800' },
];

function GlassesIcon({ stroke = '#FFB800' }: { stroke?: string }) {
  return (
    <svg width="100%" viewBox="0 0 400 150" fill="none">
      <rect x="50"  y="40" width="120" height="80" stroke={stroke} strokeWidth="2.5" />
      <rect x="230" y="40" width="120" height="80" stroke={stroke} strokeWidth="2.5" />
      <path d="M170 80 Q200 65 230 80" stroke={stroke} strokeWidth="2.5" />
      <path d="M50 80 L0 80"          stroke={stroke} strokeWidth="2.5" />
      <path d="M350 80 L400 80"        stroke={stroke} strokeWidth="2.5" />
    </svg>
  );
}

export default function FeaturedProducts() {
  return (
    <section id="collections" className="py-32 bg-white">
      <div className="max-w-6xl mx-auto px-6">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-24 gap-8 border-b-2 border-zinc-100 pb-10">
        <div className="max-w-xl">
          <p className="text-[11px] font-black uppercase tracking-[5px] text-[#FFB800] mb-4">The Selection</p>
          <h2 className="text-4xl font-black text-black leading-tight uppercase">
            Curated <span className="text-[#FFB800]">Masterpieces</span>
          </h2>
        </div>
        <Link href="/collections" className="text-[11px] font-black uppercase tracking-[3px] border-b-2 border-[#FFB800] pb-2 hover:bg-[#FFB800] hover:text-white px-6 transition-all">
          Explore All Shop
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-16 lg:gap-24">
        {products.map((p) => (
          <div key={p.id} className="group cursor-pointer">
            <div className="relative aspect-[4/5] bg-[#fafafa] mb-10 overflow-hidden flex items-center justify-center p-12 transition-all duration-700 group-hover:bg-[#000000]">
               <div className="w-full transform transition-transform duration-700 group-hover:scale-110 opacity-100 group-hover:invert-0">
                  <GlassesIcon stroke={p.stroke} />
               </div>
               <span className="absolute top-8 left-8 text-[9px] font-black uppercase tracking-[3px] bg-[#FFB800] text-black px-4 py-1.5 font-sans">
                 {p.tag}
               </span>
            </div>
            
            <div className="text-left space-y-4">
              <h3 className="text-xl font-black text-black tracking-tight group-hover:text-[#FFB800] transition-colors uppercase">{p.name}</h3>
              <p className="text-[12px] text-gray-500 font-bold uppercase tracking-wider">{p.desc}</p>
              <div className="flex items-center justify-between pt-6 border-t font-sans border-gray-100">
                <span className="text-2xl font-black text-black">{p.price}</span>
                <button className="text-[10px] font-black uppercase tracking-[2px] bg-black text-white px-8 py-3 group-hover:bg-[#FFB800] group-hover:text-black transition-all rounded-full">
                  Get It Now +
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      </div>
    </section>
  );
}
