'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface Promotion {
  _id: string;
  title: string;
  subtitle: string;
  price: string;
  originalPrice: string;
  tag: string;
  image: string;
  isFeatured: boolean;
}

export default function PromotionsPage() {
  const [promotions, setPromotions] = useState<Promotion[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPromotions = async () => {
      try {
        const res = await fetch('http://localhost:5001/api/promotions?activeOnly=true');
        const data = await res.json();
        if (Array.isArray(data)) {
          setPromotions(data);
        }
      } catch (error) {
        console.error('Error fetching promotions:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPromotions();
  }, []);

  const featuredPromo = promotions.find(p => p.isFeatured);
  const regularPromos = promotions.filter(p => !p.isFeatured);

  return (
    <div className="bg-white min-h-screen pt-32 pb-20">
      <section className="max-w-6xl mx-auto px-6">
        
        {/* Refined Proportional Header */}
        <div className="text-center mb-16 space-y-3">
           <div className="inline-flex items-center gap-3">
              <span className="h-px w-6 bg-[#FFB800]"></span>
              <span className="text-[9px] font-black uppercase tracking-[0.4em] text-[#FFB800]">Exclusive Offers</span>
           </div>
           <h1 className="text-3xl md:text-4xl font-black text-zinc-950 tracking-tight leading-tight">
              โปรโมชั่นพิเศษ <span className="text-[#FFB800]">แด่คุณคนสำคัญ.</span>
           </h1>
           <p className="max-w-xl mx-auto text-zinc-500 font-medium text-sm md:text-base">
              ดีลสุดคุ้มที่คัดสรรมาเพื่อการดูแลสายตาที่ดีที่สุดของคุณ
           </p>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#FFB800]"></div>
          </div>
        ) : promotions.length === 0 ? (
          <div className="text-center py-20 text-zinc-400">
            ยังไม่มีโปรโมชั่นในขณะนี้
          </div>
        ) : (
          <>
            {/* Featured Promotion (Refined Size & Rounding) */}
            {featuredPromo && (
              <div className="mb-12 group">
                 <div className="bg-zinc-950 rounded-2xl overflow-hidden flex flex-col lg:flex-row items-stretch shadow-xl border border-white/5">
                    <div className="lg:w-[50%] relative aspect-video lg:aspect-auto">
                       <Image src={featuredPromo.image || '/images/hero-professional.png'} alt="Featured Promo" fill className="object-cover opacity-80" />
                       <div className="absolute top-6 left-6">
                          <span className="bg-[#FFB800] text-black text-[9px] font-black uppercase tracking-widest px-4 py-2 rounded-full">
                            {featuredPromo.tag || 'HOT DEAL'}
                          </span>
                       </div>
                    </div>
                    <div className="lg:w-[50%] p-8 md:p-12 flex flex-col justify-center text-white">
                       <h2 className="text-3xl font-black mb-3 tracking-tighter uppercase leading-tight">
                          {featuredPromo.title.split(' ')[0]} <span className="text-[#FFB800]">{featuredPromo.title.substring(featuredPromo.title.indexOf(' ') + 1)}</span>
                       </h2>
                       <p className="text-zinc-400 text-sm font-medium mb-6 leading-relaxed">
                          {featuredPromo.subtitle}
                       </p>
                       <div className="text-4xl font-black text-white mb-8 tracking-tighter">
                          {featuredPromo.price} 
                          {featuredPromo.originalPrice && (
                            <span className="text-base text-zinc-600 line-through ml-3">{featuredPromo.originalPrice}</span>
                          )}
                       </div>
                       <Link href="/appointment" className="bg-[#FFB800] text-black font-black uppercase tracking-widest text-[10px] px-8 py-4 rounded-full hover:bg-white transition-all text-center lg:w-fit active:scale-95">
                          นัดหมายรับสิทธิ์
                       </Link>
                    </div>
                 </div>
              </div>
            )}

            {/* Promotions Grid (Refined Cards) */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
               {regularPromos.map((p, index) => {
                 // Alternating colors for non-featured promos
                 const colors = [
                   { bg: 'bg-zinc-950', text: 'text-white', btn: 'bg-[#FFB800] text-black' },
                   { bg: 'bg-[#FFB800]', text: 'text-zinc-950', btn: 'bg-zinc-950 text-white' },
                   { bg: 'bg-white', text: 'text-zinc-950', btn: 'bg-zinc-950 text-white' }
                 ];
                 const colorObj = colors[index % colors.length];

                 return (
                   <div key={p._id} className={`${colorObj.bg} border border-zinc-100 rounded-2xl overflow-hidden flex flex-col shadow-md transition-all hover:shadow-xl`}>
                      <div className="relative aspect-[16/10]">
                         <Image src={p.image} alt={p.title} fill className="object-cover" />
                         {p.tag && (
                           <div className="absolute top-4 left-4">
                              <span className="bg-white/90 backdrop-blur-md text-zinc-900 text-[8px] font-black uppercase tracking-widest px-3 py-1.5 rounded-lg shadow-sm">
                                {p.tag}
                              </span>
                           </div>
                         )}
                      </div>
                      <div className={`p-6 flex flex-col flex-grow ${colorObj.text}`}>
                         <h3 className="text-lg font-black uppercase tracking-tight mb-2 line-clamp-1">{p.title}</h3>
                         <p className="text-[11px] font-medium opacity-60 leading-relaxed mb-6 flex-grow line-clamp-2">
                             {p.subtitle}
                         </p>
                         <div className="flex items-center justify-between pt-4 border-t border-zinc-500/10">
                            <div className="flex items-center gap-2">
                              <span className="text-xl font-black tracking-tighter">{p.price}</span>
                              {p.originalPrice && <span className="text-sm line-through opacity-50">{p.originalPrice}</span>}
                            </div>
                            <Link href="/appointment" className={`w-9 h-9 rounded-full flex items-center justify-center transition-all ${colorObj.btn}`}>
                               <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M5 12h14m-7-7 7 7-7 7" /></svg>
                            </Link>
                         </div>
                      </div>
                   </div>
                 );
               })}
            </div>
          </>
        )}

        {/* Professional Footer Info */}
        <div className="mt-16 pt-8 border-t border-zinc-100 text-zinc-400">
           <p className="text-[9px] font-bold uppercase tracking-widest leading-loose">
              * โปรโมชั่นนี้ใช้ได้จนถึงสิ้นเดือนนี้เท่านั้น เงื่อนไขเป็นไปตามที่บริษัทกำหนด
           </p>
        </div>
      </section>
    </div>
  );
}
