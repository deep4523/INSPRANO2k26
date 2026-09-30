import React from 'react';

export default function GcekLogo({ className = "w-10 h-10" }: { className?: string }) {
  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      <img
        src="/images/insprano-logo.png"
        alt="Insprano Official Logo"
        className="w-full h-full object-contain filter drop-shadow-[0_0_10px_rgba(0,210,255,0.75)] hover:drop-shadow-[0_0_22px_rgba(0,210,255,1)] transition-all duration-300 group-hover:scale-110"
      />
    </div>
  );
}
