'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';

const DEFAULT_SLIDES = [
  { id: '1', src: '/images/hero-professional.png', alt: 'Professional Eyewear' },
  { id: '2', src: '/images/intro/interior.png', alt: 'Store Interior' },
  { id: '3', src: '/images/intro/collage.png', alt: 'Eyewear Collection' },
];

export default function Hero() {
  const [slides, setSlides] = useState<any[]>([]);
  const [current, setCurrent] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSlides = async () => {
      try {
        const res = await fetch('http://localhost:5001/api/hero');
        const data = await res.json();
        if (data && data.length > 0) {
          setSlides(data);
        } else {
          setSlides(DEFAULT_SLIDES);
        }
      } catch (error) {
        console.error('Failed to fetch hero slides:', error);
        setSlides(DEFAULT_SLIDES);
      } finally {
        setIsLoading(false);
      }
    };
    fetchSlides();
  }, []);

  useEffect(() => {
    if (slides.length <= 1) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides]);

  if (isLoading && slides.length === 0) {
    return <div className="w-full h-[50vh] md:h-[80vh] bg-zinc-950 mt-16 lg:mt-24 animate-pulse"></div>;
  }

  return (
    <section className="relative w-full h-[50vh] md:h-[80vh] overflow-hidden bg-black mt-16 lg:mt-24 group">
      {/* Slider Images */}
      {slides.map((slide, index) => (
        <div
          key={slide._id || slide.id}
          className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
            index === current ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
          }`}
        >
          <Image
            src={slide.src}
            alt={slide.alt || 'Iglass Hero'}
            fill
            className="object-cover"
            priority={index === 0}
          />
          {/* Subtle Overlay */}
          <div className="absolute inset-0 bg-black/10" />
        </div>
      ))}

      {/* Navigation Dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`h-1 transition-all duration-500 rounded-full ${
              index === current ? 'w-10 bg-[#FFB800]' : 'w-4 bg-white/30 hover:bg-white/50'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Left/Right Controls */}
      <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 z-20 px-4 md:px-8 flex justify-between pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
         <button 
           onClick={() => setCurrent((prev) => (prev - 1 + slides.length) % slides.length)}
           className="pointer-events-auto p-4 text-white/50 hover:text-[#FFB800] transition-colors"
         >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M15 18l-6-6 6-6"/></svg>
         </button>
         <button 
           onClick={() => setCurrent((prev) => (prev + 1) % slides.length)}
           className="pointer-events-auto p-4 text-white/50 hover:text-[#FFB800] transition-colors"
         >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M9 18l6-6-6-6"/></svg>
         </button>
      </div>
    </section>
  );
}
