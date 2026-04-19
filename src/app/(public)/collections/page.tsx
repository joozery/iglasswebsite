'use client';
import { useState } from 'react';

interface Product {
  id: number;
  name: string;
  category: string;
  price: string;
  image: string;
}

const productsData: Product[] = [
  { id: 1, name: 'Crystal Clear Aviator', category: 'Optical',    price: '฿4,500', image: '👓' },
  { id: 2, name: 'Midnight Sun Walker', category: 'Sunglasses', price: '฿5,200', image: '🕶️' },
  { id: 3, name: 'Digital Defender',     category: 'Blue-light', price: '฿3,800', image: '🖥️' },
  { id: 4, name: 'Titanium Edge',        category: 'Optical',    price: '฿7,900', image: '👓' },
  { id: 5, name: 'Vintage Havana',       category: 'Sunglasses', price: '฿6,100', image: '🕶️' },
  { id: 6, name: 'Office Pro',           category: 'Blue-light', price: '฿4,200', image: '🖥️' },
];

export default function CollectionsPage() {
  const [filter, setFilter] = useState('All');

  const filtered = filter === 'All' 
    ? productsData 
    : productsData.filter(p => p.category === filter);

  return (
    <div className="py-24 px-6 md:px-16 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
        <div>
          <h1 className="text-5xl font-black text-white mb-4 uppercase tracking-tight">
            Our <span className="text-[#FFB800]">Collections</span>
          </h1>
          <p className="text-white/40 max-w-xl font-light">
            สัมผัสประสบการณ์การมองเห็นที่เหนือระดับด้วยกรอบแว่นคุณภาพสูงและดีไซน์ที่เป็นเอกลักษณ์ของเรา
          </p>
        </div>
        
        <div className="flex gap-3 bg-white/5 p-1.5 rounded-full border border-white/10 backdrop-blur-md">
          {['All', 'Optical', 'Sunglasses', 'Blue-light'].map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-6 py-2 rounded-full text-xs font-bold transition-all duration-300 ${
                filter === cat 
                  ? 'bg-[#FFB800] text-black shadow-lg shadow-[#FFB800]/20' 
                  : 'text-white/60 hover:text-white hover:bg-white/5'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {filtered.map((p) => (
          <div key={p.id} className="group bg-[#0d0d0d] border border-white/5 rounded-[40px] overflow-hidden hover:border-[#FFB800]/40 transition-all duration-500 shadow-xl">
            <div className="h-72 bg-gradient-to-br from-white/5 to-transparent flex items-center justify-center text-7xl group-hover:scale-110 transition-transform duration-700">
              {p.image}
            </div>
            <div className="p-8 border-t border-white/5">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="text-[#FFB800] text-[10px] font-black uppercase tracking-widest mb-1">{p.category}</p>
                  <h3 className="text-xl font-bold text-white">{p.name}</h3>
                </div>
                <span className="text-xl font-black text-white">{p.price}</span>
              </div>
              <button className="w-full bg-white/5 text-white border border-white/10 py-4 rounded-full font-bold text-xs uppercase tracking-[2px] mt-4 hover:bg-[#FFB800] hover:text-black hover:border-[#FFB800] transition-all duration-500">
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
