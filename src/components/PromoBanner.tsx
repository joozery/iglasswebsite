import Image from 'next/image';

export default function PromoBanner() {
  return (
    <section className="py-10 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="relative w-full aspect-[2.2/1] md:aspect-[21/9] overflow-hidden rounded-3xl md:rounded-[2.5rem] shadow-2xl border border-zinc-100">
           <Image 
             src="/cover/cover.jpg" 
             alt="Promotional Banner" 
             fill 
             className="object-cover"
             priority
           />
        </div>
      </div>
    </section>
  );
}
