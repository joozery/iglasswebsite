'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';

interface Service {
  _id: string;
  title: string;
  description: string;
  image: string;
  order: number;
}

const INITIAL_SERVICES = [
  {
    id: '1',
    title: 'รับประกันค่าสายตาที่ตรวจวัดได้\nนานสูงสุด 90 วัน',
    description: 'เปลี่ยนแป้นจมูก และปรับแต่งทรงแว่นฟรีตลอดอายุการใช้งาน',
    image: '/images/services/guarantee.png',
  },
  {
    id: '2',
    title: 'บริการหลังการขาย\n(After Sales Service)',
    description: 'เปลี่ยนแป้นจมูก และปรับแต่งทรงแว่นฟรีตลอดอายุการใช้งาน',
    image: '/images/services/aftersales.png',
  },
  {
    id: '3',
    title: 'สามารถออกใบกำกับภาษี\nเพื่อนำไปเบิกสวัสดิการ',
    description: 'ออกใบกำกับภาษี เพื่อนำไปเบิกสวัสดิการพนักงานกับบริษัทของลูกค้าได้',
    image: '/images/services/tax.png',
  },
  {
    id: '4',
    title: 'บริการจัดส่งสินค้าด้วยขนส่ง\nทุกออเดอร์ถึงหน้าบ้าน',
    description: 'บริการจัดส่งรวดเร็ว ปลอดภัย โดยไม่มีค่าใช้จ่ายเพิ่มเติม',
    image: '/images/services/delivery.png',
  },
];

export default function OtherServices() {
  const [services, setServices] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await fetch('http://localhost:5001/api/services');
        const data = await res.json();
        if (data && data.length > 0) {
          setServices(data);
        } else {
          setServices(INITIAL_SERVICES);
        }
      } catch (error) {
        console.error('Failed to fetch services:', error);
        setServices(INITIAL_SERVICES);
      } finally {
        setIsLoading(false);
      }
    };
    fetchServices();
  }, []);

  return (
    <section className="py-24 bg-white border-t border-zinc-50 font-thai">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
           <h2 className="text-3xl font-black text-zinc-950 uppercase tracking-tight">บริการอื่นๆของทางร้าน</h2>
           <div className="w-12 h-1 bg-[#FFB800] mx-auto mt-4 rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-10 gap-y-20">
           {services.map((service, index) => (
             <div key={service._id || service.id} className="group animate-in fade-in slide-in-from-bottom-4 duration-700" style={{ animationDelay: `${index * 150}ms` }}>
                <div className="relative aspect-square overflow-hidden rounded-2xl mb-10 shadow-lg group-hover:shadow-2xl transition-all duration-700 bg-zinc-50 border border-zinc-100">
                   <img 
                     src={service.image} 
                     alt={service.title} 
                     className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                   />
                </div>
                <div className="space-y-5 px-1">
                   <div className="flex gap-4 items-start">
                      <div className="shrink-0 mt-1 text-[#FFB800]">
                         <div className="w-6 h-6 rounded-full bg-zinc-950 flex items-center justify-center shadow-lg">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                         </div>
                      </div>
                      <h3 className="text-[17px] font-black text-zinc-950 leading-[1.4] whitespace-pre-line min-h-[48px]">
                         {service.title}
                      </h3>
                   </div>
                   <p className="text-[14px] text-zinc-500 font-semibold leading-relaxed pl-10 opacity-80">
                      {service.description || service.desc}
                   </p>
                </div>
             </div>
           ))}
        </div>
      </div>
    </section>
  );
}
