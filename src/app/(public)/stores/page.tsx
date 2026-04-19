interface Store {
  id: number;
  name: string;
  address: string;
  phone: string;
  hours: string;
}

const storesData: Store[] = [
  { id: 1, name: 'iGlass Flagship - สยามสแควร์', address: 'สยามสแควร์ ซอย 7, ปทุมวัน, กรุงเทพฯ 10330', phone: '02-123-4567', hours: '10:00 - 21:00' },
  { id: 2, name: 'iGlass - เซ็นทรัล เวิลด์',   address: 'ชั้น 2 โซน Beacon, เซ็นทรัล เวิลด์, กรุงเทพฯ',  phone: '02-765-4321', hours: '10:00 - 22:00' },
  { id: 3, name: 'iGlass - ไอคอนสยาม',       address: 'ชั้น 3 โซนเครื่องประดับ, ไอคอนสยาม, กรุงเทพฯ', phone: '02-999-8888', hours: '10:00 - 22:00' },
];

export default function StoresPage() {
  return (
    <div className="py-24 px-6 md:px-16 max-w-7xl mx-auto">
      <div className="text-center mb-20 animate-fade-in-up">
        <h1 className="text-5xl md:text-6xl font-black text-white mb-6 uppercase tracking-tight">
          Our <span className="text-[#FFB800]">Stores</span>
        </h1>
        <p className="text-white/40 max-w-2xl mx-auto font-light text-lg">
          แวะมาทดลองสวมใส่และรับคำปรึกษาจากผู้เชี่ยวชาญด้านสายตาได้ที่สาขาใกล้บ้านคุณ
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {storesData.map((store) => (
          <div key={store.id} className="group bg-[#0d0d0d] border border-white/5 rounded-[40px] p-10 hover:border-[#FFB800]/40 transition-all duration-500 shadow-xl">
            <div className="w-16 h-16 bg-[#FFB800]/10 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-[#FFB800]/20 transition-colors">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#FFB800" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
            </div>
            <h3 className="text-2xl font-bold text-white mb-6 tracking-wide group-hover:text-[#FFB800] transition-colors">{store.name}</h3>
            
            <div className="space-y-6 text-white/50">
              <div className="flex gap-4">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 mt-1"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                <p className="text-sm leading-relaxed">{store.address}</p>
              </div>
              <div className="flex gap-4">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                <p className="text-sm">{store.phone}</p>
              </div>
              <div className="flex gap-4">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                <p className="text-sm">{store.hours}</p>
              </div>
            </div>
            
            <button className="w-full mt-10 bg-white/5 text-white border border-white/10 py-4 rounded-full font-black text-[13px] uppercase tracking-widest hover:bg-[#FFB800] hover:text-black hover:border-[#FFB800] transition-all duration-500">
              Get Directions
            </button>
          </div>
        ))}
      </div>

      <div className="mt-20 h-[500px] w-full bg-[#0d0d0d] rounded-[50px] border border-white/5 flex items-center justify-center overflow-hidden relative shadow-2xl">
        <div className="absolute inset-0 opacity-20 bg-[url('https://www.google.com/maps/vt/pb=!1m4!1m3!1i12!2i2048!3i2048!2m3!1e0!2sm!3i420120488!3m8!2sth!3e0!4m2!1s0x30e29938749a2153%3A0x67a3314e3852277c!5m2!1zMTMuNzUzNjQwOCwgMTAwLjQ5MDQ5MTM!6m1!1e1!8m2!1e1!3m1!1e1')] bg-cover bg-center" />
        <div className="relative z-10 text-center px-6">
           <h3 className="text-white font-bold text-2xl mb-4">Interactive Map</h3>
           <p className="text-white/30 text-sm font-light uppercase tracking-widest">Coming Soon in v2.0</p>
        </div>
      </div>
    </div>
  );
}
