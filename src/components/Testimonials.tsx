interface Testimonial { name: string; avatar: string; text: string; role: string; }

const testimonials: Testimonial[] = [
  { name: 'Piyanuch W.', avatar: 'PW', text: '“The attention to detail in their frames is unlike anything I’ve seen. The Progressive lenses are incredibly clear and settled instantly.”', role: 'Creative Director' },
  { name: 'Kitti S.',    avatar: 'KS', text: '“Professional service and cutting-edge equipment. My eye test was thoroughly detailed, and the handcrafted frames are lightweight yet durable.”', role: 'Architech' },
  { name: 'Malinee P.',   avatar: 'MP', text: '“A true masterpiece of optics. The gold trimming on the Aura series is subtle but exudes sophistication. Highly recommended for professionals.”', role: 'Senior Analyst' },
];

export default function Testimonials() {
  return (
    <section className="py-32 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-24 gap-8">
          <div className="max-w-xl">
            <p className="text-[11px] font-bold uppercase tracking-[5px] text-[#c5a059] mb-4">Voices</p>
            <h2 className="text-[clamp(1.5rem,5vw,3rem)] font-playfair font-bold text-black leading-tight">
              Client <span className="italic">Experiences</span>
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-20">
          {testimonials.map((t) => (
            <div key={t.name} className="flex flex-col group">
              <div className="flex gap-1 mb-10 opacity-30 group-hover:opacity-100 transition-opacity duration-700">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} width="12" height="12" viewBox="0 0 24 24" fill="#c5a059"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                ))}
              </div>
              
              <p className="text-black/70 text-base md:text-lg font-light leading-relaxed mb-12 flex-1 italic">
                {t.text}
              </p>
              
              <div className="flex items-center gap-6 pt-10 border-t border-gray-100">
                <div className="w-10 h-10 rounded-full bg-[#0a0a0b] flex items-center justify-center text-[#c5a059] font-bold text-[9px] grayscale group-hover:grayscale-0 transition-all">
                  {t.avatar}
                </div>
                <div>
                  <span className="block font-bold text-[11px] text-black uppercase tracking-[3px] mb-1">{t.name}</span>
                  <span className="block text-[10px] text-gray-400 uppercase tracking-widest font-light">{t.role}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
