
import React, { useState, useRef, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { 
  MapPin, Phone, Volume2, VolumeX, 
  ArrowLeft, PawPrint, X, MessageCircle, Navigation,
  GraduationCap, Sparkles, Heart
} from 'lucide-react';

// --- THÔNG TIN ---
const MY_NAME = "Khánh Huyền";
const ZALO_PHONE = "0814241333";
const HELP_PHONE = "0332409003";
const DATE = "17.01.2026";
const TIME = "09:30 AM";
const LOCATION_NAME = "Khu E - HUTECH";
const LOCATION_SUB = "Thành phố Hồ Chí Minh";

// --- LINKS ---
const ZALO_LINK = `https://zalo.me/${ZALO_PHONE}`;
const GOOGLE_MAPS_LINK = "https://maps.app.goo.gl/xxx"; 
const MUSIC_URL = "https://cdn.pixabay.com/audio/2022/01/18/audio_d0a13f69d2.mp3";
const COVER_IMAGE = "https://trello.com/1/cards/69631f06bd92aaa12c401a5d/attachments/696320174827511fe39dc0cf/download/image.png"; 
const MAP_IMAGE = "https://trello.com/1/cards/69631f06bd92aaa12c401a5d/attachments/69631fee7389b9ad77c6eb9a/download/image.png";

const DecorativeIcons = () => {
  const icons = [PawPrint, GraduationCap, Sparkles, Heart];
  return (
    <div className="fixed inset-0 pointer-events-none z-0 opacity-10">
      {Array.from({ length: 10 }).map((_, i) => {
        const Icon = icons[i % icons.length];
        return (
          <div 
            key={i}
            className="absolute animate-bounce"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDuration: `${3 + Math.random() * 5}s`,
              transform: `rotate(${Math.random() * 360}deg)`
            }}
          >
            <Icon size={24 + Math.random() * 20} />
          </div>
        );
      })}
    </div>
  );
};

const App = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMapOpen, setIsMapOpen] = useState(false);
  const [guestName, setGuestName] = useState("Bạn thân mến");
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const name = params.get('name');
    if (name) setGuestName(name.replace(/_/g, ' '));
  }, []);

  const handleOpenInvitation = () => {
    setIsOpen(true);
    if (audioRef.current && !isPlaying) {
      audioRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  };

  const toggleMusic = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="relative h-screen w-full flex items-center justify-center p-4 bg-[#fffaf5] select-none overflow-hidden">
      <DecorativeIcons />
      <audio ref={audioRef} src={MUSIC_URL} loop />

      {/* Nút Nhạc */}
      {isOpen && (
        <button 
          onClick={toggleMusic}
          className="fixed top-6 right-6 z-50 p-3 bg-white shadow-lg rounded-2xl text-orange-500 border border-orange-100 active:scale-90 transition-all"
        >
          {isPlaying ? <Volume2 size={24} className="animate-pulse" /> : <VolumeX size={24} />}
        </button>
      )}

      {/* Modal Ảnh Bản Đồ */}
      {isMapOpen && (
        <div className="fixed inset-0 z-[100] bg-black/90 flex flex-col items-center justify-center p-4" onClick={() => setIsMapOpen(false)}>
          <img src={MAP_IMAGE} className="max-w-full max-h-[80vh] rounded-xl shadow-2xl border-2 border-white/20" alt="Map" />
          <button className="mt-8 px-6 py-3 bg-white/10 text-white rounded-full flex items-center gap-2 font-bold">
            <X size={20} /> Đóng bản đồ
          </button>
        </div>
      )}

      <div className="relative w-full max-w-[360px] h-[640px]">
        {/* MÀN HÌNH BÌA */}
        <div className={`absolute inset-0 bg-white rounded-[40px] shadow-2xl flex flex-col overflow-hidden border-[6px] border-white transition-all duration-1000 ease-in-out z-20 ${isOpen ? 'opacity-0 -translate-y-full scale-90 pointer-events-none' : 'opacity-100'}`}>
          <div className="h-1/2 relative">
            <img src={COVER_IMAGE} className="w-full h-full object-cover" alt="Cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            <div className="absolute bottom-6 w-full text-center text-white px-4">
              <p className="text-xs font-bold uppercase tracking-[0.2em] mb-1 opacity-80">Lễ Tốt Nghiệp Của</p>
              <h1 className="text-3xl font-black uppercase tracking-tight text-orange-300">{MY_NAME}</h1>
            </div>
          </div>

          <div className="flex-1 p-8 flex flex-col items-center text-center">
            <p className="text-[10px] font-black uppercase text-gray-400 tracking-[0.3em] mb-2">Trân trọng kính mời</p>
            <h2 className="text-3xl font-black text-gray-800 italic mb-4 border-b-2 border-orange-100 pb-2">{guestName}</h2>
            <p className="text-xs text-gray-500 leading-relaxed mb-8 italic">
              Sự hiện diện của bạn là niềm vinh hạnh lớn đối với mình trong ngày lễ quan trọng này.
            </p>
            
            <button 
              onClick={handleOpenInvitation}
              className="mt-auto w-full group bg-gray-900 text-white p-2 rounded-3xl flex items-center justify-between hover:bg-orange-600 transition-all shadow-xl active:scale-95"
            >
              <div className="bg-white text-gray-900 p-3 rounded-2xl">
                <ArrowLeft className="rotate-180" size={20} />
              </div>
              <span className="flex-1 font-black uppercase text-[10px] tracking-widest">Bấm để mở thiệp</span>
            </button>
          </div>
        </div>

        {/* MÀN HÌNH NỘI DUNG */}
        <div className={`absolute inset-0 bg-white rounded-[40px] shadow-2xl flex flex-col overflow-hidden border-[6px] border-white transition-all duration-700 z-10 ${isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
          <div className="bg-gradient-to-br from-orange-500 to-orange-700 p-8 pt-10 pb-16 text-center text-white relative shrink-0">
            <button onClick={() => setIsOpen(false)} className="absolute top-6 left-6 p-2 bg-white/20 rounded-xl">
              <ArrowLeft size={18} />
            </button>
            <h3 className="text-2xl font-black uppercase tracking-widest">{MY_NAME}</h3>
            <p className="text-[9px] uppercase tracking-widest opacity-70 mt-1">HUTECH Graduation Ceremony</p>

            <div className="absolute -bottom-10 left-6 right-6 bg-white rounded-3xl p-4 shadow-xl flex items-center justify-around text-gray-800 border border-orange-50">
              <div className="text-center w-1/2 border-r border-gray-100">
                <p className="text-[9px] font-black text-orange-500 uppercase mb-1">Ngày</p>
                <p className="font-black text-base">{DATE}</p>
              </div>
              <div className="text-center w-1/2">
                <p className="text-[9px] font-black text-orange-500 uppercase mb-1">Giờ</p>
                <p className="font-black text-base">{TIME}</p>
              </div>
            </div>
          </div>

          <div className="flex-1 pt-14 px-6 pb-6 overflow-y-auto">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl mb-4 border border-gray-100">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-orange-100 text-orange-600 rounded-xl"><MapPin size={20} /></div>
                <div>
                  <p className="text-[11px] font-black uppercase leading-none mb-1">{LOCATION_NAME}</p>
                  <p className="text-[10px] text-gray-400">{LOCATION_SUB}</p>
                </div>
              </div>
              <a href={GOOGLE_MAPS_LINK} target="_blank" className="p-3 bg-white text-orange-600 rounded-xl shadow-sm border border-orange-50">
                <Navigation size={18} />
              </a>
            </div>

            <div 
              onClick={() => setIsMapOpen(true)}
              className="relative h-40 w-full bg-gray-100 rounded-2xl overflow-hidden mb-6 cursor-pointer border-2 border-orange-50 group"
            >
              <img src={MAP_IMAGE} className="w-full h-full object-cover opacity-80 group-hover:scale-110 transition-transform duration-700" alt="Map View" />
              <div className="absolute inset-0 flex items-center justify-center bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity">
                <p className="bg-white px-3 py-1 rounded-full text-[10px] font-bold shadow-lg">Phóng to bản đồ</p>
              </div>
            </div>

            <div className="space-y-3">
              <a href={ZALO_LINK} target="_blank" className="w-full py-4 bg-blue-600 text-white rounded-2xl font-black uppercase text-[11px] tracking-[0.2em] flex items-center justify-center gap-2 shadow-lg active:scale-95 transition-all">
                <MessageCircle size={18} /> Xác Nhận Tham Gia
              </a>
              <a href={`tel:${HELP_PHONE}`} className="w-full p-2 bg-white border border-gray-100 rounded-2xl flex items-center gap-3 shadow-sm hover:border-emerald-200 transition-all">
                <div className="bg-emerald-100 text-emerald-600 p-3 rounded-xl"><Phone size={18} fill="currentColor" /></div>
                <div className="text-left">
                  <p className="text-[9px] font-black text-gray-400 uppercase leading-none">Cần hỗ trợ? Gọi Hiệp</p>
                  <p className="text-sm font-black text-gray-800">0332 409 003</p>
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
