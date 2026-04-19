'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

const SPAN_CONFIGS = [
  'md:col-span-2 md:row-span-2', // Slot 1 (Featured Large)
  'md:col-span-1 md:row-span-1', // Slot 2
  'md:col-span-1 md:row-span-1', // Slot 3
  'md:col-span-1 md:row-span-1', // Slot 4
  'md:col-span-1 md:row-span-1', // Slot 5
  'md:col-span-1 md:row-span-1', // Slot 6
  'md:col-span-1 md:row-span-1', // Slot 7
  'md:col-span-2 md:row-span-1', // Slot 8 (Wide Bottom)
];

const DEFAULT_GALLERY = [
  { id: 1, src: '/images/gallery/lifestyle-1.png' },
  { id: 2, src: '/images/gallery/macro-1.png' },
  { id: 3, src: '/images/gallery/interior.png' },
  { id: 4, src: '/images/gallery/exam.png' },
  { id: 5, src: '/images/gallery/collage.png' },
  { id: 6, src: '/images/gallery/guarantee.png' },
  { id: 7, src: '/images/gallery/aftersales.png' },
  { id: 8, src: '/images/gallery/delivery.png' },
];

export default function GallerySection() {
  const [selectedImg, setSelectedImg] = useState<string | null>(null);
  const [items, setItems] = useState<any[]>([]);

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const res = await fetch('http://localhost:5001/api/gallery');
        const data = await res.json();
        
        if (data && data.length > 0) {
          // Fill placeholders for a consistent look if fewer than 8 items
          const filled = Array(8).fill(null).map((_, i) => {
            const found = data.find((it: any) => it.order === i + 1);
            return found || DEFAULT_GALLERY[i];
          });
          setItems(filled);
        } else {
          setItems(DEFAULT_GALLERY);
        }
      } catch (error) {
        setItems(DEFAULT_GALLERY);
      }
    };
    fetchGallery();
  }, []);

  return (
    <section className="py-12 bg-zinc-950 font-thai">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
           <div>
              <h2 className="text-3xl font-black text-white uppercase tracking-tighter mb-4">Gallery Showcase</h2>
              <div className="h-1 w-20 bg-[#FFB800]" />
           </div>
           <p className="text-zinc-400 text-sm font-medium max-w-[300px] leading-relaxed">
              สัมผัสประสบการณ์การดูแลสายตาที่เหนือระดับผ่านมุมมองต่างๆ ของร้าน Iglass.
           </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-[240px]">
           {items.map((item, i) => (
             <div 
               key={item._id || item.id} 
               onClick={() => setSelectedImg(item.src)}
               className={`relative overflow-hidden group ${SPAN_CONFIGS[i]} shadow-xl border border-white/5 hover:border-[#FFB800]/30 transition-all duration-500 cursor-pointer animate-in fade-in duration-700`}
               style={{ animationDelay: `${i * 100}ms` }}
             >
                <Image 
                  src={item.src} 
                  alt="Gallery Image" 
                  fill 
                  className="object-cover transition-transform duration-1000 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                   <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 scale-50 group-hover:scale-100 transition-transform duration-500">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5"><path d="M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16zM21 21l-4.35-4.35"/></svg>
                   </div>
                </div>
             </div>
           ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedImg && (
        <div 
          className="fixed inset-0 z-[160] bg-black/95 backdrop-blur-md flex items-center justify-center p-4 md:p-12 animate-in fade-in duration-300"
          onClick={() => setSelectedImg(null)}
        >
           <button 
             className="absolute top-8 right-8 text-white/50 hover:text-white transition-colors z-[170]"
             onClick={() => setSelectedImg(null)}
           >
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
           </button>
           
           <div className="relative w-full h-full flex items-center justify-center">
              <div className="relative w-full h-full max-w-5xl max-h-[85vh]">
                 <Image 
                   src={selectedImg} 
                   alt="Zoom view" 
                   fill 
                   className="object-contain"
                   quality={100}
                 />
              </div>
           </div>
        </div>
      )}
    </section>
  );
}
