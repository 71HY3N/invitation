
import React, { useState, useRef, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { 
  MapPin, Calendar, Clock, Phone, Volume2, VolumeX, 
  ArrowLeft, PawPrint, X, MessageCircle, Navigation,
  GraduationCap, Sparkles
} from 'lucide-react';

// --- CẤU HÌNH ---
const CONFIRM_ZALO_PHONE = "0814241333";
const SUPPORT_PHONE = "0332409003";
const ZALO_LINK = `https://zalo.me/${CONFIRM_ZALO_PHONE}`;
const GOOGLE_MAPS_URL = "https://maps.app.goo.gl/xxx"; // Thay bằng link thật nếu có
const DEFAULT_AUDIO = "https://cdn.pixabay.com/audio/2022/01/18/audio_d0a13f69d2.mp3";
const GRADUATE_IMAGE = "https://trello.com/1/cards/69631f06bd92aaa12c401a5d/attachments/696320174827511fe39dc0cf/download/image.png"; 
const MAP_IMAGE = "https://trello.com/1/cards/69631f06bd92aaa12c401a5d/attachments/69631fee7389b9ad77c6eb9a/download/image.png";

const DecorativeBackground = () => {
  const icons = [PawPrint, GraduationCap, Sparkles];
  const [particles, setParticles] = useState<any[]>([]);

  useEffect(() => {
    const newParticles = Array.from({ length: 12 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      animationDuration: `${15 + Math.random() * 20}s`,
      animationDelay: `${Math.random() * 5}s`,
      opacity: 0.1 + Math.random() * 0.15,
      size: 14 + Math.random() * 16,
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
    <div className="relative h-screen w-screen flex items-center justify-center p-2 sm:p-4 bg-orange-50/30 overflow-hidden">
      <DecorativeBackground />
      <audio ref={audioRef} src={DEFAULT_AUDIO} loop />

      {/* Map Zoom Modal */}
      {isMapZoomed && (
        <div 
          className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-md flex flex-col items-center justify-center p-4"
          onClick={() => setIsMapZoomed(false)}
        >
          <div className="relative w-full max-w-lg flex flex-col items-center">
             <img src={MAP_IMAGE} alt="Map" className="w-full rounded-2xl shadow-2xl border-2 border-white/20 object-contain max-h-[70vh]"/>
             <button className="mt-6 w-full max-w-[200px] text-white p-4 flex items-center justify-center gap-2 font-black bg-white/10 hover:bg-white/20 rounded-2xl transition-all">
               <X size={20} /> Đóng
             </button>
          </div>
        </div>
      )}

      {/* Music Toggle */}
      {isOpen && (
        <button 
          onClick={toggleMusic} 
          className="fixed top-4 right-4 z-[60] bg-white/90 backdrop-blur-md p-3 rounded-2xl text-orange-600 shadow-xl border-2 border-orange-100 active:scale-90 transition-all"
        >
          {isPlaying ? <Volume2 size={24} className="animate-pulse" /> : <VolumeX size={24} />}
        </button>
      )}

      {/* Main Container */}
      <div className="relative w-full max-w-[380px] h-full max-h-[700px] z-10 perspective-1000">
        
        {/* MẶT TRƯỚC (BÌA THIỆP) */}
        <div className={`absolute inset-0 bg-white rounded-[40px] shadow-2xl overflow-hidden flex flex-col z-20 transition-all duration-1000 ease-in-out border-[6px] border-white origin-top ${isOpen ? 'opacity-0 -translate-y-[110%] rotate-6 scale-90 pointer-events-none' : 'opacity-100'}`}>
          <div className="h-[52%] relative shrink-0">
            <img src={GRADUATE_IMAGE} alt="Khánh Huyền" className="w-full h-full object-cover"/>
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
            <div className="absolute bottom-6 left-0 right-0 text-center text-white px-4">
               <h1 className="text-lg font-black uppercase tracking-widest mb-1 opacity-90">Lễ Tốt Nghiệp Của</h1>
               <p className="text-3xl tracking-tighter text-orange-300 uppercase font-black">Khánh Huyền</p>
            </div>
          </div>

          <div className="flex-1 bg-white flex flex-col items-center pt-8 px-8 pb-8 text-center">
             <div className="w-full">
                <p className="text-gray-400 text-[10px] font-black uppercase tracking-[0.3em] mb-2">Trân trọng kính mời</p>
                <h3 className="text-3xl font-black text-gray-900 italic mb-3 border-b-2 border-orange-50 inline-block px-4">
                  {guestName}
                </h3>
                <p className="text-[12px] text-gray-500 italic leading-relaxed">
                  Rất mong được đón tiếp bạn cùng chung vui trong khoảnh khắc đáng nhớ này của mình!
                </p>
             </div>
             
             <button 
               onClick={handleOpen} 
               className="mt-auto w-full flex items-center justify-between p-2 bg-gray-900 rounded-3xl hover:bg-orange-600 transition-all shadow-xl active:scale-95 group"
             >
                <div className="bg-white text-gray-900 w-11 h-11 rounded-2xl flex items-center justify-center shadow-md">
                   <ArrowLeft size={22} className="rotate-180 group-hover:translate-x-1 transition-transform" />
                </div>
                <span className="flex-1 text-white font-black uppercase tracking-widest text-[11px]">Mở Thiệp Nè</span>
             </button>
          </div>
        </div>

        {/* NỘI DUNG THIỆP (KHI ĐÃ MỞ) */}
        <div className={`absolute inset-0 bg-white rounded-[40px] shadow-2xl overflow-hidden flex flex-col z-10 transition-all duration-700 border-[6px] border-white ${isOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}>
           {/* Header */}
           <div className="bg-gradient-to-br from-orange-500 to-orange-700 text-white p-6 pb-12 rounded-b-[40px] shadow-xl text-center relative shrink-0">
              <button onClick={() => setIsOpen(false)} className="absolute top-5 left-5 p-2 bg-white/20 rounded-xl hover:bg-white/30 transition-colors">
                <ArrowLeft size={20} />
              </button>
              <h2 className="text-2xl font-black uppercase tracking-widest">Khánh Huyền</h2>
              <p className="text-[10px] uppercase tracking-widest opacity-80 mt-1">HUTECH University</p>
              
              {/* Date/Time Floating Box */}
              <div className="absolute -bottom-10 left-6 right-6 bg-white text-gray-900 p-4 rounded-[24px] shadow-xl flex items-center justify-around border border-gray-100">
                  <div className="text-center w-1/2 border-r border-gray-100">
                    <p className="text-[9px] uppercase font-black text-orange-600 mb-0.5">Ngày</p>
                    <span className="font-black text-lg">17.01.26</span>
                  </div>
                  <div className="text-center w-1/2">
                    <p className="text-[9px] uppercase font-black text-orange-600 mb-0.5">Giờ</p>
                    <span className="font-black text-lg">09:30 AM</span>
                  </div>
              </div>
           </div>

           {/* Content Body */}
           <div className="flex-1 bg-gray-50/50 pt-14 px-6 pb-6 flex flex-col overflow-y-auto custom-scrollbar">
              {/* Địa điểm */}
              <div className="flex items-center justify-between mb-4 bg-white p-3 rounded-2xl shadow-sm border border-gray-100">
                 <div className="flex items-center gap-3">
                   <div className="p-2.5 bg-orange-100 rounded-xl text-orange-600"><MapPin size={22} /></div>
                   <div>
                      <p className="text-xs font-black uppercase leading-tight">Khu E - HUTECH</p>
                      <p className="text-[10px] text-gray-400">TP. Hồ Chí Minh</p>
                   </div>
                 </div>
                 <a href={GOOGLE_MAPS_URL} target="_blank" className="p-3 text-orange-600 border border-orange-100 rounded-xl hover:bg-orange-600 hover:text-white transition-all"><Navigation size={20} /></a>
              </div>
              
              {/* Bản đồ xem trước */}
              <div 
                className="relative h-44 bg-white rounded-2xl border-2 border-orange-50 overflow-hidden cursor-pointer group shadow-sm mb-4 shrink-0"
                onClick={() => setIsMapZoomed(true)}
              >
                <img src={MAP_IMAGE} className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors"></div>
                <div className="absolute bottom-2 right-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg text-[9px] font-black uppercase text-orange-600 shadow-sm border border-orange-50">Xem chi tiết</div>
              </div>

              {/* Nút bấm hành động */}
              <div className="mt-auto space-y-3">
                 <a 
                   href={ZALO_LINK} target="_blank"
                   className="w-full py-4 bg-blue-600 text-white rounded-2xl font-black uppercase text-[11px] tracking-widest flex items-center justify-center gap-2 shadow-lg active:scale-95 transition-all hover:bg-blue-700"
                 >
                   <MessageCircle size={20} /> Xác Nhận Tham Gia
                 </a>
                 <a href={`tel:${SUPPORT_PHONE}`} className="w-full flex items-center gap-3 bg-white p-2.5 rounded-2xl border border-gray-100 shadow-sm hover:border-emerald-200 transition-colors">
                    <div className="bg-emerald-100 p-3 rounded-xl text-emerald-600"><Phone size={20} fill="currentColor" /></div>
                    <div className="text-left leading-tight">
                      <p className="text-[10px] font-black text-gray-400 uppercase mb-0.5">Cần hỗ trợ? Gọi Hiệp</p>
                      <p className="font-black text-gray-800 text-sm tracking-tighter">0332 409 003</p>
                    </div>
                 </a>
              </div>
           </div>
        </div>
      </div>
      
      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #fee2e2; border-radius: 10px; }
      `}</style>
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
