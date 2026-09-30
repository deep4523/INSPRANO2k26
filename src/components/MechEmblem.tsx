import React from 'react';

export default function MechEmblem({ className = "w-16 h-16" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="metalGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="30%" stopColor="#cbd5e1" />
          <stop offset="70%" stopColor="#64748b" />
          <stop offset="100%" stopColor="#1e293b" />
        </linearGradient>
        <linearGradient id="coreGlow" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#ff1e42" />
          <stop offset="100%" stopColor="#991b1b" />
        </linearGradient>
      </defs>

      {/* Outer Crown Chevrons */}
      <path
        d="M20 18 L32 30 L45 22 L50 26 L55 22 L68 30 L80 18 L76 38 L88 44 L78 56 L82 82 L65 72 L50 92 L35 72 L18 82 L22 56 L12 44 L24 38 Z"
        fill="url(#metalGrad)"
        stroke="#00d2ff"
        strokeWidth="1.5"
        filter="drop-shadow(0 0 10px rgba(0, 210, 255, 0.4))"
      />

      {/* Inner Mechanical Plates */}
      <path
        d="M32 36 L44 32 L46 54 L34 50 Z"
        fill="#0f172a"
        stroke="#94a3b8"
        strokeWidth="1"
      />
      <path
        d="M68 36 L56 32 L54 54 L66 50 Z"
        fill="#0f172a"
        stroke="#94a3b8"
        strokeWidth="1"
      />

      {/* Cybernetic Eyes / Optical Sensors */}
      <polygon points="36,46 44,45 42,49 35,49" fill="#00f0ff" filter="drop-shadow(0 0 4px #00f0ff)" />
      <polygon points="64,46 56,45 58,49 65,49" fill="#00f0ff" filter="drop-shadow(0 0 4px #00f0ff)" />

      {/* Central Energy Core */}
      <polygon points="50,30 53,52 50,56 47,52" fill="url(#coreGlow)" filter="drop-shadow(0 0 6px #ff1e42)" />
      <polygon points="50,60 55,75 50,82 45,75" fill="#00f0ff" opacity="0.8" />

      {/* Chevrons and Chin Grid */}
      <path
        d="M40 64 L50 58 L60 64 L50 70 Z"
        fill="#090d16"
        stroke="#00d2ff"
        strokeWidth="1"
      />
    </svg>
  );
}
