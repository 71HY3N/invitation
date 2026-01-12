
import React from 'react';
import { PawPrint, GraduationCap, Sparkles } from 'lucide-react';

const DecorativeBackground: React.FC = () => {
  const icons = [PawPrint, GraduationCap, Sparkles];
  
  const particles = Array.from({ length: 20 }).map((_, i) => {
    const Icon = icons[i % icons.length];
    return {
      id: i,
      left: `${Math.random() * 100}%`,
      animationDuration: `${10 + Math.random() * 15}s`,
      animationDelay: `${Math.random() * 10}s`,
      opacity: 0.05 + Math.random() * 0.15,
      size: 15 + Math.random() * 25,
      Icon,
    };
  });

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      <div className="absolute inset-0 bg-gradient-to-br from-orange-100/30 via-transparent to-yellow-100/30"></div>
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

export default DecorativeBackground;
