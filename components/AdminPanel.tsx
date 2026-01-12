
import React, { useState, useEffect } from 'react';
import { Users, LogOut, Eye, Copy, Check, PlusCircle, Music, Globe, Share2, Lock, KeyRound } from 'lucide-react';
import { AdminProps } from '../types';

const ADMIN_PASSWORD = "71h3n";

const PRESET_MUSIC = [
  { id: 'cute_bouncy', name: 'Cute & Funny (Video Vibe)', url: 'https://cdn.pixabay.com/audio/2022/01/18/audio_d0a13f69d2.mp3' },
  { id: 'gentle_piano', name: 'Piano Nhẹ Nhàng', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3' },
  { id: 'acoustic_happy', name: 'Acoustic Vui Vẻ', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3' },
];

const AdminPanel: React.FC<AdminProps> = ({ onExit, onPreview }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");
  const [authError, setAuthError] = useState(false);

  const [inputName, setInputName] = useState("");
  const [musicUrl, setMusicUrl] = useState(PRESET_MUSIC[0].url);
  const [isMusicEnabled, setIsMusicEnabled] = useState(true);
  const [customMusicUrl, setCustomMusicUrl] = useState("");
  const [manualBaseUrl, setManualBaseUrl] = useState("");
  const [showConfig, setShowConfig] = useState(false);
  const [generatedLink, setGeneratedLink] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const currentUrl = window.location.origin + window.location.pathname;
    setManualBaseUrl(currentUrl.endsWith('/') ? currentUrl : currentUrl + '/');
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      setAuthError(false);
    } else {
      setAuthError(true);
      setTimeout(() => setAuthError(false), 2000);
    }
  };

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputName.trim()) return;
    
    let baseUrl = manualBaseUrl.trim();
    if (!baseUrl) {
      baseUrl = window.location.origin + window.location.pathname;
    }
    baseUrl = baseUrl.split('?')[0].split('#')[0];

    const finalMusicUrl = customMusicUrl.trim() || musicUrl;
    let link = `${baseUrl}${baseUrl.includes('?') ? '&' : '?'}name=${encodeURIComponent(inputName)}`;
    
    if (!isMusicEnabled) {
      link += `&nomusic=true`;
    } else if (finalMusicUrl !== PRESET_MUSIC[0].url) {
      link += `&music=${encodeURIComponent(finalMusicUrl)}`;
    }
    
    setGeneratedLink(link);
    setCopied(false);
  };

  const handleCopy = () => {
    if (!generatedLink) return;
    navigator.clipboard.writeText(generatedLink).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-orange-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-[40px] shadow-2xl p-10 w-full max-w-md border-t-[10px] border-orange-500 text-center animate-in fade-in zoom-in duration-500">
           <div className="bg-orange-100 w-20 h-20 rounded-3xl flex items-center justify-center text-orange-600 mx-auto mb-6">
             <Lock size={40} />
           </div>
           <h2 className="text-2xl font-black text-gray-900 mb-2">Quản Trị Viên</h2>
           <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-8">Vui lòng nhập mật khẩu để tiếp tục</p>
           
           <form onSubmit={handleLogin} className="space-y-4">
              <input 
                type="password" 
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                placeholder="Mật khẩu truy cập"
                className={`w-full px-6 py-4 bg-gray-50 border-2 rounded-2xl focus:outline-none transition-all font-bold ${authError ? 'border-red-500' : 'border-transparent focus:border-orange-500'}`}
              />
              <button type="submit" className="w-full bg-gray-900 text-white py-4 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-orange-600 transition-all">
                Đăng Nhập
              </button>
              <button type="button" onClick={onExit} className="text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-orange-500">
                Quay lại
              </button>
           </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-orange-50 flex items-center justify-center p-4 font-sans">
      <div className="bg-white rounded-[40px] shadow-2xl p-8 w-full max-w-lg border-t-[10px] border-orange-500 relative">
        <button onClick={onExit} className="absolute top-8 right-8 text-gray-400 hover:text-orange-500 flex items-center gap-2 text-[10px] font-black uppercase tracking-widest">
          <LogOut size={16}/> Thoát
        </button>

        <div className="flex items-center gap-4 mb-8">
          <div className="bg-orange-100 p-3 rounded-2xl text-orange-600">
            <Users size={32}/>
          </div>
          <div>
            <h1 className="text-2xl font-black text-gray-900 leading-none">Tạo Link Mời</h1>
          </div>
        </div>

        <form onSubmit={handleGenerate} className="space-y-6">
          <div className="space-y-4">
            <input 
              type="text" 
              value={inputName}
              onChange={(e) => setInputName(e.target.value)}
              placeholder="Tên khách mời"
              className="w-full px-6 py-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:outline-none focus:border-orange-500 text-gray-800 font-bold"
            />

            <button type="button" onClick={() => setShowConfig(!showConfig)} className="text-[10px] font-black uppercase tracking-widest text-orange-500 underline ml-1">
              {showConfig ? "- Ẩn cài đặt nâng cao" : "+ Cài đặt Nhạc & Link"}
            </button>

            {showConfig && (
              <div className="space-y-4 p-5 bg-gray-50 rounded-3xl border-2 border-gray-100 animate-in slide-in-from-top duration-300">
                <input 
                  type="text" 
                  value={manualBaseUrl}
                  onChange={(e) => setManualBaseUrl(e.target.value)}
                  placeholder="URL Web của bạn"
                  className="w-full px-4 py-3 bg-white border-2 border-gray-100 rounded-xl focus:border-blue-500 text-[10px] font-bold"
                />
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black uppercase tracking-widest flex items-center gap-2"><Music size={14}/> Âm nhạc cute</span>
                  <input type="checkbox" checked={isMusicEnabled} onChange={(e) => setIsMusicEnabled(e.target.checked)} className="w-5 h-5 accent-orange-500" />
                </div>
                {isMusicEnabled && (
                  <div className="space-y-2">
                    <div className="flex gap-2">
                      {PRESET_MUSIC.map(m => (
                        <button key={m.id} type="button" onClick={() => { setMusicUrl(m.url); setCustomMusicUrl(""); }} className={`flex-1 p-2 rounded-xl text-[8px] font-black border-2 transition-all ${musicUrl === m.url ? 'bg-orange-500 border-orange-500 text-white' : 'bg-white border-gray-100 text-gray-400'}`}>
                          {m.name}
                        </button>
                      ))}
                    </div>
                    <input 
                      type="text" 
                      value={customMusicUrl} 
                      onChange={(e) => setCustomMusicUrl(e.target.value)} 
                      placeholder="Dán link nhạc (.mp3) khác vào đây" 
                      className="w-full px-4 py-3 bg-white border-2 border-gray-100 rounded-xl text-[10px] font-bold"
                    />
                  </div>
                )}
              </div>
            )}
          </div>

          <button type="submit" className="w-full bg-orange-500 text-white py-4 rounded-2xl font-black uppercase tracking-widest text-xs shadow-xl active:scale-95 transition-all">
            Tạo Thiệp Mời
          </button>
        </form>

        {generatedLink && (
          <div className="mt-8 p-6 bg-orange-50 rounded-3xl border-2 border-orange-100 space-y-4 animate-in slide-in-from-bottom duration-500">
            <div className="flex gap-2">
              <div className="flex-1 bg-white px-4 py-3 rounded-2xl text-[10px] font-bold text-gray-400 truncate italic">
                {generatedLink}
              </div>
              <button onClick={handleCopy} className={`px-6 py-3 rounded-2xl font-black uppercase text-[10px] text-white transition-all ${copied ? 'bg-emerald-500' : 'bg-gray-900'}`}>
                {copied ? "Xong" : "Copy"}
              </button>
            </div>
            <div className="flex gap-2">
              <button onClick={() => onPreview(inputName)} className="flex-1 py-4 bg-white border-2 border-orange-200 text-orange-600 rounded-2xl font-black uppercase text-[10px]">
                Xem thử
              </button>
              <button onClick={() => window.open(`https://zalo.me/share?url=${encodeURIComponent(generatedLink)}`, '_blank')} className="flex-1 py-4 bg-blue-600 text-white rounded-2xl font-black uppercase text-[10px]">
                Gửi Zalo
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;
