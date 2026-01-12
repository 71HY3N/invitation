
import React, { useState, useRef, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { 
  MapPin, Calendar, Clock, Phone, Volume2, VolumeX, Music, 
  ArrowLeft, PawPrint, ExternalLink, X, MessageCircle, Navigation,
  GraduationCap, Sparkles
} from 'lucide-react';

// --- CONFIGURATION ---
const CONFIRM_ZALO_PHONE = "0814241333";
const SUPPORT_PHONE = "0332409003";
const ZALO_LINK = `https://zalo.me/${CONFIRM_ZALO_PHONE}`;
const GOOGLE_MAPS_URL = "https://maps.app.goo.gl/xxx";
const DEFAULT_AUDIO = "https://cdn.pixabay.com/audio/2022/01/18/audio_d0a13f69d2.mp3";
const GRADUATE_IMAGE = "https://trello.com/1/cards/69631f06bd92aaa12c401a5d/attachments/696320174827511fe39dc0cf/download/image.png"; 
const MAP_IMAGE = "https://trello.com/1/cards/69631f06bd92aaa12c401a5d/attachments/69631fee7389b9ad77c6eb9a/download/image.png";

// --- COMPONENTS ---

const DecorativeBackground = () => {
  const icons = [PawPrint, GraduationCap, Sparkles];
  const [particles, setParticles] = useState<any[]>([]);

  useEffect(() => {
    const newParticles = Array.from({ length: 15 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      animationDuration: `${10 + Math.random() * 15}s`,
      animationDelay: `${Math.random() * 5}s`,
      opacity: 0.1 + Math.random() * 0.2,
      size: 15 + Math.random() * 20,
      Icon: icons[i % icons.length],
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      <div className="absolute inset-0 bg-gradient-to-br from-orange-100/40 via-transparent to-yellow-100/40"></div>
      {particles.map((p) => (
        <div 
          key={p.id} 
          className="absolute top-[-50px] text-orange-400 animate-fall" 
          style={{ 
            left: p.left, 
            animationDuration: p.animationDuration, 
            animationDelay: p.animationDelay, 
            opacity: p.opacity, 
            fontSize: `${p.size}px` 
          }}
        >
          <p.Icon fill="currentColor" />
        </div>
      ))}
      <style>{`
        @keyframes fall {
          0% { transform: translateY(-50px) rotate(0deg); }
          100% { transform: translateY(110vh) rotate(360deg); }
        }
        .animate-fall { 
          animation-name: fall; 
          animation-timing-function: linear; 
          animation-iteration-count: infinite; 
        }
      `}</style>
    </div>
  );
};

const App = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMapZoomed, setIsMapZoomed] = useState(false);
  const [guestName, setGuestName] = useState("Mọi người");
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const name = params.get('name');
    if (name) setGuestName(name);
  }, []);

  const handleOpen = () => {
    setIsOpen(true);
    if (audioRef.current && !isPlaying) {
      audioRef.current.play()
        .then(() => setIsPlaying(true))
        .catch(e => console.log("Audio auto-play blocked", e));
    }
  };

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center p-4 overflow-hidden bg-orange-50/50">
      <DecorativeBackground />
      <audio ref={audioRef} src={DEFAULT_AUDIO} loop />

      {/* Map Zoom Modal */}
      {isMapZoomed && (
        <div 
          className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4"
          onClick={() => setIsMapZoomed(false)}
        >
          <div className="relative w-full max-w-lg">
             <img src={MAP_IMAGE} alt="Map Zoomed" className="w-full rounded-2xl shadow-2xl border-2 border-white/20"/>
             <button className="mt-6 w-full text-white p-3 flex items-center justify-center gap-2 font-black bg-white/10 hover:bg-white/20 rounded-2xl transition-all">
               <X size={20} /> Đóng bản đồ
             </button>
          </div>
        </div>
      )}

      {/* Music Toggle */}
      {isOpen && (
        <button 
          onClick={toggleMusic} 
          className="fixed top-6 right-6 z-[60] bg-white/90 backdrop-blur-md p-3 rounded-2xl text-orange-600 shadow-xl border-2 border-orange-100 active:scale-90 transition-all"
        >
          {isPlaying ? <Volume2 size={24} className="animate-pulse" /> : <VolumeX size={24} />}
        </button>
      )}

      <div className="relative w-full max-w-sm h-[700px] z-10">
        
        {/* MẶT TRƯỚC (BÌA THIỆP) */}
        <div className={`absolute inset-0 bg-white rounded-[45px] shadow-2xl overflow-hidden flex flex-col z-20 transition-all duration-1000 ease-in-out border-[8px] border-white origin-top ${isOpen ? 'opacity-0 -translate-y-[110%] rotate-6 scale-90 pointer-events-none' : 'opacity-100 scale-100'}`}>
          <div className="h-[55%] relative">
            <img src={GRADUATE_IMAGE} alt="Khánh Huyền" className="w-full h-full object-cover"/>
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
            <div className="absolute bottom-6 left-0 right-0 text-center text-white px-4">
               <h1 className="text-xl font-black uppercase tracking-tight mb-1">Lễ Tốt Nghiệp Của</h1>
               <p className="text-3xl tracking-widest text-orange-300 uppercase font-black">Khánh Huyền</p>
            </div>
          </div>

          <div className="flex-1 bg-white flex flex-col items-center pt-10 px-8 pb-8 text-center">
             <p className="text-gray-400 text-[10px] font-black uppercase tracking-[0.3em] mb-2">Trân trọng kính mời</p>
             <h3 className="text-4xl font-black text-gray-900 italic mb-4">
               {guestName}
             </h3>
             <p className="text-[13px] text-gray-500 italic mb-10">
               Rất mong được đón tiếp bạn cùng chung vui trong khoảnh khắc đáng nhớ này của mình!
             </p>
             <button 
               onClick={handleOpen} 
               className="mt-auto w-full flex items-center justify-between p-2 bg-gray-900 rounded-3xl hover:bg-orange-600 transition-all shadow-xl active:scale-95"
             >
                <div className="bg-white text-gray-900 w-12 h-12 rounded-2xl flex items-center justify-center shadow-md">
                   <ArrowLeft size={24} className="rotate-180" />
                </div>
                <span className="flex-1 text-white font-black uppercase tracking-widest text-[11px] pr-4">Mở Thiệp Nè</span>
             </button>
          </div>
        </div>

        {/* NỘI DUNG THIỆP (KHI ĐÃ MỞ) */}
        <div className={`absolute inset-0 bg-white rounded-[45px] shadow-2xl overflow-hidden flex flex-col z-10 transition-all duration-700 border-[8px] border-white ${isOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}>
           <div className="bg-gradient-to-br from-orange-500 to-orange-700 text-white p-8 pb-14 rounded-b-[45px] shadow-xl text-center relative">
              <button onClick={() => setIsOpen(false)} className="absolute top-6 left-6 p-2 bg-white/20 rounded-xl">
                <ArrowLeft size={20} />
              </button>
              <h2 className="text-2xl font-black uppercase tracking-widest">Khánh Huyền</h2>
              <p className="text-[10px] uppercase tracking-widest opacity-80 mt-1">HUTECH University</p>
              
              <div className="absolute -bottom-10 left-6 right-6 bg-white text-gray-900 p-5 rounded-3xl shadow-xl flex items-center justify-around border border-gray-100">
                  <div className="text-center w-1/2 border-r border-gray-100">
                    <p className="text-[10px] uppercase font-black text-orange-600">Ngày</p>
                    <span className="font-black text-lg">17.01.26</span>
                  </div>
                  <div className="text-center w-1/2">
                    <p className="text-[10px] uppercase font-black text-orange-600">Giờ</p>
                    <span className="font-black text-lg">09:30 AM</span>
                  </div>
              </div>
           </div>

           <div className="flex-1 bg-gray-50/50 pt-16 px-6 pb-6 flex flex-col">
              <div className="flex items-center justify-between mb-4 bg-white p-3 rounded-2xl shadow-sm">
                 <div className="flex items-center gap-3">
                   <div className="p-2 bg-orange-100 rounded-xl text-orange-600"><MapPin size={20} /></div>
                   <div>
                      <p className="text-xs font-black uppercase">Khu E - HUTECH</p>
                      <p className="text-[10px] text-gray-400">TP. Hồ Chí Minh</p>
                   </div>
                 </div>
                 <a href={GOOGLE_MAPS_URL} target="_blank" className="p-2 text-orange-600 border border-orange-100 rounded-xl"><Navigation size={18} /></a>
              </div>
              
              <div 
                className="flex-1 bg-white rounded-3xl border-2 border-orange-50 overflow-hidden cursor-pointer"
                onClick={() => setIsMapZoomed(true)}
              >
                <img src={MAP_IMAGE} className="w-full h-full object-cover opacity-80 hover:scale-110 transition-transform duration-500" />
              </div>

              <div className="mt-6 space-y-3">
                 <a 
                   href={ZALO_LINK} target="_blank"
                   className="w-full py-4 bg-blue-600 text-white rounded-2xl font-black uppercase text-xs tracking-widest flex items-center justify-center gap-2 shadow-lg active:scale-95 transition-all"
                 >
                   <MessageCircle size={20} /> Xác Nhận Tham Gia
                 </a>
                 <a href={`tel:${SUPPORT_PHONE}`} className="w-full flex items-center gap-3 bg-white p-2 rounded-2xl border border-gray-100">
                    <div className="bg-emerald-100 p-3 rounded-xl text-emerald-600"><Phone size={20} fill="currentColor" /></div>
                    <div className="text-left">
                      <p className="text-[10px] font-black text-gray-400 uppercase leading-none">Hỗ trợ đường đi</p>
                      <p className="font-black text-gray-800">0332 409 003 (Hiệp)</p>
                    </div>
                 </a>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
