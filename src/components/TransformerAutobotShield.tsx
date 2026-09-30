'use client';

import React, { useState } from 'react';
import MechEmblem from './MechEmblem';
import { playTransformSound, playLaserCharge } from '@/lib/soundFx';

interface TransformerAutobotShieldProps {
  className?: string;
}

export default function TransformerAutobotShield({ className = "" }: TransformerAutobotShieldProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isActivated, setIsActivated] = useState(false);

  const handleClick = () => {
    setIsActivated(true);
    playTransformSound();
    playLaserCharge();
    setTimeout(() => setIsActivated(false), 1200);
  };

  return (
    <div className={`relative flex flex-col items-center justify-center my-6 select-none ${className}`}>
      {/* Container for Script Quote + Arrow + Shield */}
      <div className="relative flex flex-col md:flex-row items-center justify-center gap-4 sm:gap-8 max-w-4xl mx-auto px-4">
        {/* Left Calligraphic Script Tagline: "Different Branches One Vision" */}
        <div className="relative text-center md:text-right group">
          <div className="inline-block transform -rotate-3 transition-transform duration-300 group-hover:scale-105">
            <span
              className="text-2xl sm:text-3xl md:text-4xl font-serif italic font-bold tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-slate-200 via-cyan-200 to-white drop-shadow-[0_0_15px_rgba(0,210,255,0.7)]"
              style={{ fontFamily: "'Brush Script MT', 'Dancing Script', 'Caveat', cursive, sans-serif" }}
            >
              Different Branches
            </span>
            <div
              className="text-xl sm:text-2xl md:text-3xl font-serif italic font-bold tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-400 drop-shadow-[0_0_15px_rgba(0,210,255,0.8)] -mt-1 sm:-mt-2"
              style={{ fontFamily: "'Brush Script MT', 'Dancing Script', 'Caveat', cursive, sans-serif" }}
            >
              One Vision
            </div>
          </div>

          {/* Curved Cyber Neon Arrow pointing toward the Autobot Shield */}
          <div className="hidden md:block absolute -right-6 top-8 w-12 h-8 pointer-events-none">
            <svg viewBox="0 0 50 30" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full stroke-cyan-400 drop-shadow-[0_0_6px_#00d2ff]">
              <path d="M 5 22 Q 25 28 42 12" strokeWidth="2" strokeDasharray="3 2" strokeLinecap="round" />
              <polyline points="36,10 44,11 41,18" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>

        {/* Center 3D Floating Metallic Autobot Shield */}
        <div
          onClick={handleClick}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="relative cursor-pointer group p-3 transition-all duration-500 transform hover:scale-110"
          style={{ perspective: '1000px' }}
        >
          {/* Ground Reflection & Cyber Pool */}
          <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-40 sm:w-52 h-10 bg-cyan-500/20 rounded-full blur-xl transition-all duration-300 group-hover:bg-cyan-400/40 group-hover:w-60" />

          {/* Energy Surge Ripple When Clicked */}
          {isActivated && (
            <div className="absolute inset-0 rounded-full border-2 border-cyan-400 animate-ping pointer-events-none" />
          )}

          {/* The Beveled Metallic Mech Shield */}
          <div
            className={`relative transition-transform duration-300 ease-out ${
              isHovered ? 'rotate-y-6 rotate-x-3' : ''
            }`}
          >
            <MechEmblem className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 filter drop-shadow-[0_10px_25px_rgba(0,0,0,0.9)]" />

            {/* Glowing Optical Visor in Shield Eyes */}
            <div className="absolute top-[46%] left-[36%] w-2.5 h-1 bg-cyan-300 rounded-sm shadow-[0_0_8px_#00f0ff] animate-pulse" />
            <div className="absolute top-[46%] right-[36%] w-2.5 h-1 bg-cyan-300 rounded-sm shadow-[0_0_8px_#00f0ff] animate-pulse" />
          </div>

          {/* Interactive Tap Hint */}
          <div className="text-center mt-2">
            <span className="text-[9px] font-mono tracking-widest text-cyan-400/80 uppercase group-hover:text-cyan-300 transition-colors">
              [ CLICK TO TRANSFORM ]
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
