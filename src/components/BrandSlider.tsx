'use client';

import React, { useState, useEffect } from 'react';

const DEFAULT_BRANDS = [
  { name: 'Essilor', logo: '' },
  { name: 'Nikon', logo: '' },
  { name: 'Hoya', logo: '' },
  { name: 'Zeiss', logo: '' },
  { name: 'Rodenstock', logo: '' },
  { name: 'Shamir', logo: '' },
  { name: 'TOG', logo: '' },
  { name: 'Tokai', logo: '' },
];

export default function BrandSlider() {
  const [brands, setBrands] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const res = await fetch('http://localhost:5001/api/brands');
        const data = await res.json();
        if (data && data.length > 0) {
          setBrands(data);
        } else {
          setBrands(DEFAULT_BRANDS);
        }
      } catch (error) {
        console.error('Failed to fetch brands:', error);
        setBrands(DEFAULT_BRANDS);
      } finally {
        setIsLoading(false);
      }
    };
    fetchBrands();
  }, []);

  // Duplicate brands for infinite loop effect
  const displayBrands = [...brands, ...brands, ...brands];

  return (
    <section className="py-20 bg-white border-t border-zinc-50 font-thai overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
           <h2 className="text-2xl font-black text-zinc-950 tracking-tight">เลนส์แว่นตาคุณภาพ</h2>
           <div className="w-10 h-1 bg-[#FFB800] mx-auto mt-3 rounded-full"></div>
        </div>
      </div>

      {/* Infinite Marquee Container */}
      <div className="relative w-full overflow-hidden flex whitespace-nowrap">
         <div className="flex animate-marquee hover:pause-animation items-center">
            {displayBrands.map((b, i) => (
              <div 
                key={i} 
                className="inline-flex items-center justify-center mx-2 md:mx-4 p-4 md:p-8 w-[140px] md:w-[220px] h-[90px] md:h-[120px] border border-zinc-100 rounded-xl md:rounded-2xl hover:border-[#FFB800] hover:shadow-lg transition-all duration-500 bg-white group-brand flex-shrink-0"
              >
                 {b.logo ? (
                    <img 
                      src={b.logo} 
                      alt={b.name} 
                      className="max-w-full max-h-[35px] md:max-h-[50px] object-contain transition-all duration-500" 
                    />
                 ) : (
                    <span className="text-[13px] font-black text-zinc-400 tracking-widest uppercase opacity-40">
                      {b.name}
                    </span>
                 )}
              </div>
            ))}
         </div>
      </div>

      {/* Tailwind and Global Styles for Marquee */}
      <style jsx global>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          display: flex;
          width: fit-content;
          animation: marquee 40s linear infinite;
        }
        .hover\:pause-animation:hover {
          animation-play-state: paused;
        }
      `}</style>

    </section>
  );
}
