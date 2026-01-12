
import React, { useState, useRef, useEffect } from 'react';
import { 
  MapPin, Calendar, Clock, Phone, Volume2, VolumeX, Music, 
  ArrowLeft, PawPrint, ExternalLink, ZoomIn, X, MessageCircle, UserPlus, Info, Navigation
} from 'lucide-react';
import { InvitationProps } from '../types.ts';
import DecorativeBackground from './DecorativeBackground.tsx';

const CONFIRM_ZALO_PHONE = "0814241333";
const SUPPORT_PHONE = "0332409003";
const ZALO_LINK = `https://zalo.me/${CONFIRM_ZALO_PHONE}`;
const GOOGLE_MAPS_URL = "https://maps.app.goo.gl/xxx";

const DEFAULT_AUDIO = "https://cdn.pixabay.com/audio/2022/01/18/audio_d0a13f69d2.mp3";

const InvitationCard: React.FC<InvitationProps> = ({ guestName, onOpenAdmin }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMapZoomed, setIsMapZoomed] = useState(false);
  const [audioSrc, setAudioSrc] = useState(DEFAULT_AUDIO);
  const [isMusicDisabled, setIsMusicDisabled] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const musicParam = params.get('music');
    const noMusicParam = params.get('nomusic');
    
    if (noMusicParam === 'true') {
      setIsMusicDisabled(true);
    } else if (musicParam) {
      setAudioSrc(musicParam);
    }
  }, []);

  const finalGuestName = guestName || "Mọi người";

  const handleOpen = () => {
    setIsOpen(true);
    if (!isMusicDisabled && audioRef.current && !isPlaying) {
      audioRef.current.play()
        .then(() => setIsPlaying(true))
        .catch(e => console.log("Audio autoplay blocked", e));
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

  const handleConfirm = () => {
    window.open(ZALO_LINK, '_blank');
  };

  const graduateImage = "https://trello.com/1/cards/69631f06bd92aaa12c401a5d/attachments/696320174827511fe39dc0cf/download/image.png"; 
  const mapImage = "https://trello.com/1/cards/69631f06bd92aaa12c401a5d/attachments/69631fee7389b9ad77c6eb9a/download/image.png";

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center p-4 overflow-hidden bg-orange-50/50">
      <DecorativeBackground />
      {!isMusicDisabled && <audio key={audioSrc} ref={audioRef} src={audioSrc} loop />}

      <button 
        onClick={onOpenAdmin}
        className="fixed bottom-4 left-4 z-50 p-2 text-orange-400/30 hover:text-orange-500 transition-all hover:opacity-100 flex items-center gap-1 text-[10px] font-black uppercase tracking-tighter"
      >
        <UserPlus size={14} /> Admin
      </button>

      {isMapZoomed && (
        <div 
          className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 animate-in fade-in duration-300"
          onClick={() => setIsMapZoomed(false)}
        >
          <div className="relative w-full max-w-5xl h-[80vh] flex flex-col items-center">
             <div className="w-full text-center mb-4 text-white">
                <h3 className="text-xl font-black uppercase tracking-widest">Sơ Đồ Lối Vào</h3>
                <p className="text-orange-400 text-xs font-bold">Khu E - HUTECH University</p>
             </div>
             <img src={mapImage} alt="Map Zoomed" className="flex-1 object-contain rounded-2xl shadow-2xl border-2 border-white/20"/>
             <button className="mt-6 text-white p-3 flex items-center gap-2 font-black bg-white/10 hover:bg-white/20 rounded-2xl px-8 transition-all active:scale-95">
               <X size={20} /> Đóng
             </button>
          </div>
        </div>
      )}

      {isOpen && !isMusicDisabled && (
        <button 
          onClick={toggleMusic} 
          className="fixed top-6 right-6 z-[60] bg-white/90 backdrop-blur-md p-3 rounded-2xl text-orange-600 hover:bg-orange-600 hover:text-white transition-all shadow-xl border-2 border-orange-100 active:scale-90"
        >
          {isPlaying ? <Volume2 size={24} className="animate-bounce" /> : <VolumeX size={24} />}
        </button>
      )}

      <div className="relative w-full max-w-sm h-[740px] perspective-1000 z-10">
        
        {/* FRONT */}
        <div className={`absolute inset-0 bg-white rounded-[45px] shadow-2xl overflow-hidden flex flex-col z-20 transition-all duration-1000 ease-[cubic-bezier(0.4,0,0.2,1)] border-[10px] border-white origin-top ${isOpen ? 'opacity-0 -translate-y-[110%] rotate-6 scale-90 pointer-events-none' : 'opacity-100 translate-y-0 rotate-0 scale-100'}`}>
          <div className="h-[55%] relative overflow-hidden">
            <img src={graduateImage} alt="Huyền" className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-[10s]"/>
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>
            <div className="absolute bottom-0 left-0 right-0 p-8 text-center text-white">
               <div className="inline-flex items-center gap-2 border-2 border-orange-300/40 px-5 py-2 rounded-full mb-3 backdrop-blur-md bg-white/10 shadow-lg">
                 <PawPrint size={14} className="text-yellow-400 fill-yellow-400" />
                 <span className="text-[10px] tracking-[0.3em] font-black uppercase text-white">Graduation Invite</span>
               </div>
               <h1 className="text-xl font-black uppercase tracking-tight text-white mb-1 drop-shadow-2xl leading-none whitespace-nowrap">Lễ Tốt Nghiệp Của</h1>
               <p className="text-3xl tracking-[0.05em] text-orange-300 uppercase font-black opacity-95">Khánh Huyền</p>
            </div>
          </div>

          <div className="flex-1 bg-white flex flex-col items-center pt-12 px-8 pb-8 text-center relative">
             <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-gradient-to-br from-orange-400 to-orange-600 p-5 rounded-3xl shadow-2xl border-[6px] border-white">
                <Music size={28} className="text-white animate-pulse" />
             </div>

             <div className="space-y-1 mb-6 mt-2">
               <p className="text-gray-400 text-[10px] font-black uppercase tracking-[0.3em]">Trân trọng kính mời</p>
               <h3 className="text-4xl font-black text-gray-900 leading-tight py-2 border-b-2 border-orange-50 italic">
                 {finalGuestName}
               </h3>
             </div>

             <p className="text-[13px] text-gray-500 leading-relaxed italic font-medium px-2 mb-6">
               Em rất mong được đón tiếp {finalGuestName} cùng chung vui trong khoảnh khắc đáng yêu này của em!
             </p>

             <button 
               onClick={handleOpen} 
               className="mt-auto w-full group relative flex items-center justify-between p-2 bg-gray-900 rounded-[24px] hover:bg-orange-600 transition-all duration-500 shadow-2xl active:scale-95 overflow-hidden"
             >
                <div className="bg-white text-gray-900 w-12 h-12 rounded-[18px] flex items-center justify-center font-bold shadow-md transform group-hover:rotate-180 transition-transform duration-700">
                   <ArrowLeft size={24} className="rotate-180 group-hover:text-orange-600 transition-colors" />
                </div>
                <span className="flex-1 text-center text-white font-black uppercase tracking-[0.2em] text-[11px] pr-3">Mở Thiệp Nè</span>
             </button>
          </div>
        </div>

        {/* BACK */}
        <div className={`absolute inset-0 bg-white rounded-[45px] shadow-2xl overflow-hidden flex flex-col z-10 transition-all duration-700 border-[10px] border-white ${isOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-50 translate-y-10'}`}>
           <div className="bg-gradient-to-br from-orange-500 to-orange-700 text-white p-8 pb-14 relative shrink-0 rounded-b-[45px] shadow-2xl">
              <button 
                onClick={() => setIsOpen(false)} 
                className="absolute top-6 left-6 p-3 bg-white/20 hover:bg-white/40 rounded-2xl backdrop-blur-lg transition-all active:scale-90"
              >
                <ArrowLeft size={20} strokeWidth={3} />
              </button>
              <div className="text-center mt-4">
                <h2 className="text-2xl font-black uppercase tracking-widest text-white">Khánh Huyền</h2>
                <div className="flex items-center justify-center gap-2 mt-2 opacity-90">
                  <div className="h-[1px] w-4 bg-orange-200"></div>
                  <p className="text-[10px] uppercase tracking-[0.3em] font-black">HUTECH UNIVERSITY</p>
                  <div className="h-[1px] w-4 bg-orange-200"></div>
                </div>
              </div>
              
              <div className="absolute -bottom-10 left-6 right-6 bg-white text-gray-900 p-5 rounded-[32px] shadow-2xl flex items-center justify-around border border-gray-100">
                  <div className="flex flex-col items-center w-1/2 border-r-2 border-gray-100 text-center">
                    <div className="flex items-center justify-center gap-2 text-orange-600 font-black mb-1">
                      <Calendar size={18} />
                      <span className="text-[10px] uppercase tracking-widest">Ngày</span>
                    </div>
                    <span className="font-black text-lg">17 / 01 / 26</span>
                  </div>
                  <div className="flex flex-col items-center w-1/2 text-center">
                    <div className="flex items-center justify-center gap-2 text-orange-600 font-black mb-1">
                      <Clock size={18} />
                      <span className="text-[10px] uppercase tracking-widest">Giờ</span>
                    </div>
                    <span className="font-black text-lg">09:30 AM</span>
                  </div>
              </div>
           </div>

           <div className="flex-1 bg-gray-50/50 pt-16 px-7 pb-6 flex flex-col overflow-hidden">
              <div className="flex items-center justify-between mb-4 px-1">
                 <div className="flex items-center gap-3">
                   <div className="p-2.5 bg-orange-100 rounded-2xl text-orange-600">
                      <MapPin size={22} strokeWidth={3} />
                   </div>
                   <div className="flex flex-col leading-tight">
                      <span className="text-xs font-black uppercase tracking-wider text-gray-900">Khu E - HUTECH</span>
                      <span className="text-[10px] font-bold text-gray-400">TP. Hồ Chí Minh</span>
                   </div>
                 </div>
                 <a href={GOOGLE_MAPS_URL} target="_blank" rel="noreferrer" className="p-3 bg-white border-2 border-orange-100 text-orange-600 rounded-2xl shadow-sm hover:bg-orange-600 hover:text-white transition-all active:scale-95">
                   <Navigation size={18} strokeWidth={3} />
                 </a>
              </div>
              
              <div className="flex-1 flex flex-col gap-2 min-h-0">
                <div 
                  className="flex-1 w-full bg-white rounded-[32px] border-2 border-orange-100 shadow-xl relative overflow-hidden group cursor-pointer hover:border-orange-400 transition-all p-1.5"
                  onClick={() => setIsMapZoomed(true)}
                >
                   <div className="w-full h-full bg-orange-50/30 rounded-[26px] overflow-hidden flex items-center justify-center border-2 border-dashed border-orange-100 group-hover:border-solid transition-all">
                      <img src={mapImage} alt="Campus Map" className="max-w-[120%] max-h-[120%] object-contain p-2 group-hover:scale-125 transition-transform duration-700"/>
                   </div>
                </div>
              </div>
              
              <div className="mt-5 space-y-3">
                 <button 
                   onClick={handleConfirm}
                   className="w-full py-4 bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-3xl font-black uppercase text-xs tracking-[0.2em] flex items-center justify-center gap-3 shadow-xl hover:shadow-blue-500/40 active:scale-[0.98] transition-all"
                 >
                   <MessageCircle size={20} /> Xác Nhận Tham Gia
                 </button>
                 
                 <a href={`tel:${SUPPORT_PHONE}`} className="w-full flex items-center justify-between bg-white border-2 border-gray-100 p-2 rounded-[28px] hover:border-emerald-400 transition-all active:scale-[0.98] group shadow-sm">
                    <div className="flex items-center gap-3 pl-2">
                       <div className="bg-emerald-100 p-3 rounded-2xl text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-all">
                         <Phone size={20} fill="currentColor" />
                       </div>
                       <div className="flex flex-col items-start leading-none text-left">
                         <span className="text-[10px] uppercase font-black tracking-widest text-gray-400">Hỗ trợ đường đi</span>
                         <span className="font-black text-md text-gray-800 tabular-nums">Gọi Hiệp: 0332 409 003</span>
                       </div>
                    </div>
                 </a>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default InvitationCard;
