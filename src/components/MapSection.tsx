import React from 'react';

export default function MapSection() {
  const address = "1888/5 ซ.ลาดกระบัง 46/3 เขต ลาดกระบัง แขวง ลาดกระบัง Bangkok, Thailand, 10520";
  
  return (
    <section className="py-10 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="relative w-full h-[450px] shadow-sm overflow-hidden border border-zinc-100">
           {/* Address Overlay Card */}
           <div className="absolute top-8 left-8 z-10 bg-zinc-900/95 backdrop-blur-md text-white p-8 max-w-[320px] shadow-2xl">
              <h3 className="text-xl font-black mb-4 tracking-tighter">Iglass Shop.</h3>
              <p className="text-[13px] text-zinc-400 font-semibold leading-relaxed mb-6">
                 {address}
              </p>
              <a 
                href="https://maps.app.goo.gl/YourActualMapLinkHere" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-[#FFB800] text-[11px] font-black uppercase tracking-widest hover:underline"
              >
                 Open in Maps
                 <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3"/></svg>
              </a>
           </div>

           {/* Google Maps Embed (Lat Krabang Area) */}
           <iframe 
             src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3876.0123!2d100.7850!3d13.7223!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x311d664a!2z4Lia4LmJ4Liy4LiZ4LmB4Lin4LmI4LiZ4Lia4Li04LiyIOC5gOC4reC4o-C4suC4muC4seC4hyA0Ni8z!5e0!3m2!1sth!2sth!4v1713430000000"
             width="100%" 
             height="100%" 
             style={{ border: 0 }} 
             allowFullScreen 
             loading="lazy" 
             referrerPolicy="no-referrer-when-downgrade"
             className="grayscale opacity-90 contrast-125"
           ></iframe>
        </div>
      </div>
    </section>
  );
}
