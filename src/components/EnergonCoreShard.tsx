'use client';

import React from 'react';

interface EnergonCoreShardProps {
  className?: string;
  glowColor?: string;
}

export default function EnergonCoreShard({ className = "w-12 sm:w-16 md:w-20 lg:w-24 h-16 sm:h-24 md:h-28 lg:h-36" }: EnergonCoreShardProps) {
  return (
    <div className={`relative inline-flex items-center justify-center select-none ${className}`}>
      {/* Vertical Emitter Laser Beam */}
      <div className="absolute -top-32 sm:-top-44 left-1/2 -translate-x-1/2 w-1.5 sm:w-2 animate-laser-beam pointer-events-none z-0">
        <div className="w-full h-full bg-gradient-to-t from-red-600 via-rose-500 to-transparent blur-[1px]" />
        <div className="absolute inset-0 bg-white/70 blur-[3px]" />
      </div>

      {/* Plasma Flare Backlight */}
      <div className="absolute inset-0 rounded-full bg-red-600/40 blur-2xl animate-pulse pointer-events-none" />

      {/* Chiseled Energon Spear SVG */}
      <svg
        viewBox="0 0 100 140"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full relative z-10 animate-energon-flare"
      >
        <defs>
          {/* Outer Bevel Chrome/Red Gradient */}
          <linearGradient id="facetLeft" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ff4d6d" />
            <stop offset="40%" stopColor="#c9184a" />
            <stop offset="85%" stopColor="#590d22" />
            <stop offset="100%" stopColor="#1e050b" />
          </linearGradient>

          <linearGradient id="facetRight" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#ff758f" />
            <stop offset="35%" stopColor="#e5383b" />
            <stop offset="75%" stopColor="#800f2f" />
            <stop offset="100%" stopColor="#2b0910" />
          </linearGradient>

          {/* Central Molten Plasma Fissure */}
          <linearGradient id="plasmaCore" x1="50%" y1="0%" x2="50%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="20%" stopColor="#ff85a1" />
            <stop offset="50%" stopColor="#ff0040" />
            <stop offset="85%" stopColor="#b30026" />
            <stop offset="100%" stopColor="#4a000f" />
          </linearGradient>

          {/* Metallic Edge Highlight */}
          <linearGradient id="edgeGleam" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
            <stop offset="50%" stopColor="#ffb3c1" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0.9" />
          </linearGradient>

          {/* Core Glow Filter */}
          <filter id="coreGleamFilter" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Outer Shadow Silhouette */}
        <polygon
          points="50,2 14,136 34,136 50,78 66,136 86,136"
          fill="#0a0204"
          filter="drop-shadow(0 10px 15px rgba(0, 0, 0, 0.9))"
        />

        {/* Left Crystal Pillar / Wing */}
        <polygon
          points="50,4 16,134 33,134 50,78"
          fill="url(#facetLeft)"
          stroke="#ff85a1"
          strokeWidth="0.8"
        />

        {/* Right Crystal Pillar / Wing */}
        <polygon
          points="50,4 50,78 67,134 84,134"
          fill="url(#facetRight)"
          stroke="#ffb3c1"
          strokeWidth="0.8"
        />

        {/* Central Inverted Core Shard (The glowing heart) */}
        <polygon
          points="50,14 42,78 50,86 58,78"
          fill="url(#plasmaCore)"
          filter="url(#coreGleamFilter)"
        />

        {/* Horizontal Cross-Beam Connector Bar */}
        <polygon
          points="35,102 65,102 63,112 37,112"
          fill="#ff0040"
          stroke="#ffffff"
          strokeWidth="0.6"
          opacity="0.95"
        />

        {/* Ultra-hot Plasma Spine Filament */}
        <line
          x1="50"
          y1="8"
          x2="50"
          y2="82"
          stroke="#ffffff"
          strokeWidth="1.5"
          strokeLinecap="round"
          filter="drop-shadow(0 0 4px #ffffff)"
        />

        {/* Sharp Tip Apex Spark */}
        <circle cx="50" cy="5" r="2.5" fill="#ffffff" filter="drop-shadow(0 0 6px #ff0040)" />
      </svg>
    </div>
  );
}
