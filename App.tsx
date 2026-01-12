
import React, { useState, useEffect } from 'react';
import { AppMode } from './types';
import InvitationCard from './components/InvitationCard';
import AdminPanel from './components/AdminPanel';

const App: React.FC = () => {
  const [mode, setMode] = useState<AppMode>('guest');
  const [currentGuestName, setCurrentGuestName] = useState<string>("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    
    // Check if we are in admin mode via URL
    if (params.get('mode') === 'admin') {
      setMode('admin');
    }

    // Get guest name from URL if present
    const nameFromUrl = params.get('name');
    if (nameFromUrl) {
      setCurrentGuestName(nameFromUrl);
    }
  }, []);

  const handlePreviewGuest = (name: string) => {
    setCurrentGuestName(name);
    setMode('guest');
  };

  return (
    <div className="min-h-screen bg-orange-50 selection:bg-orange-200">
      {mode === 'admin' ? (
        <AdminPanel 
          onExit={() => setMode('guest')} 
          onPreview={handlePreviewGuest}
        />
      ) : (
        <InvitationCard 
          guestName={currentGuestName} 
          onOpenAdmin={() => setMode('admin')} 
        />
      )}
    </div>
  );
};

export default App;
