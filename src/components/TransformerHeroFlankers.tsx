'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Shield, Flame, Activity } from 'lucide-react';
import { playOpticPulse, playMechArmorShift } from '@/lib/soundFx';

interface TransformerHeroFlankersProps {
  faction?: 'autobot' | 'decepticon' | 'cybertron';
  onHoverMech?: (mech: 'autobot' | 'decepticon') => void;
}

export default function TransformerHeroFlankers({
  faction = 'cybertron',
  onHoverMech
}: TransformerHeroFlankersProps) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [opticsTrigger, setOpticsTrigger] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      setMousePos({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // Periodic optic flare trigger
    const opticInterval = setInterval(() => {
      setOpticsTrigger(prev => !prev);
    }, 4000);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearInterval(opticInterval);
    };
  }, []);

  // Parallax offsets
  const leftX = mousePos.x * 12;
  const leftY = mousePos.y * 8;
  const rightX = -mousePos.x * 12;
  const rightY = -mousePos.y * 8;

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 pointer-events-none z-[1] overflow-hidden select-none"
      aria-hidden="true"
    >
      {/* ===================================================================== */}
      {/* 1. LEFT FLANK: OPTIMUS PRIME (AUTOBOT SUPREME COMMANDER)              */}
      {/* ===================================================================== */}
      <div
        className="absolute top-0 bottom-0 left-0 w-[85%] sm:w-[50%] md:w-[42%] lg:w-[36%] xl:w-[32%] transition-transform duration-700 ease-out animate-mech-left"
        style={{
          transform: `translate3d(${leftX}px, ${leftY}px, 0px) scale(${faction === 'autobot' ? 1.05 : 1})`,
          opacity: faction === 'decepticon' ? 0.35 : 1,
        }}
      >
        {/* Optimus Prime High-Fidelity Poster Cutout Layer */}
        <div
          className="absolute inset-0 bg-no-repeat pointer-events-auto cursor-pointer transition-all duration-500 filter contrast-125 brightness-110 drop-shadow-[0_0_40px_rgba(0,210,255,0.35)]"
          style={{
            backgroundImage: `url('/images/insprano-poster.jpg')`,
            backgroundSize: '240% auto',
            backgroundPosition: 'left 4% top 2%',
            maskImage: 'radial-gradient(ellipse 85% 85% at 35% 32%, black 48%, rgba(0,0,0,0.6) 68%, transparent 92%)',
            WebkitMaskImage: 'radial-gradient(ellipse 85% 85% at 35% 32%, black 48%, rgba(0,0,0,0.6) 68%, transparent 92%)',
          }}
          onMouseEnter={() => {
            playOpticPulse();
            playMechArmorShift();
            if (onHoverMech) onHoverMech('autobot');
          }}
        />

        {/* Ambient Cyan Energon Aura */}
        <div className="absolute top-[8%] left-[10%] w-72 h-72 rounded-full bg-cyan-500/20 blur-3xl pointer-events-none" />

        {/* Dynamic Glowing Optic Visor Beam (Optimus Eyes) */}
        <div className="absolute top-[16.5%] left-[29.5%] pointer-events-none">
          {/* Cyan Optic Glow Sensor Strip */}
          <div className="relative w-12 sm:w-16 h-2 rounded-full bg-cyan-300 animate-optic-cyan filter blur-[0.5px]">
            {/* Horizontal High-Intensity Laser Flare Streak */}
            <div className="absolute -left-12 -right-12 top-1/2 -translate-y-1/2 h-[2px] bg-gradient-to-r from-transparent via-cyan-200 to-transparent blur-[1px] opacity-90" />
            <div className="absolute -left-4 -right-4 top-1/2 -translate-y-1/2 h-[5px] bg-cyan-400 blur-[2px] opacity-80" />
          </div>
        </div>

        {/* Floating Autobot Shoulder Insignia HUD Badge */}
        <div className="absolute top-[28%] left-[8%] hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg hud-panel border border-cyan-400/40 bg-slate-950/80 backdrop-blur-md text-[10px] font-mono tracking-widest text-cyan-300 shadow-[0_0_15px_rgba(0,210,255,0.4)]">
          <Shield className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
          <div>
            <div className="font-mech font-bold text-white tracking-wider">AUTOBOT // PRIME</div>
            <div className="text-[8px] text-cyan-400/80 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping inline-block" />
              <span>CORE MATRIX ONLINE</span>
            </div>
          </div>
        </div>
      </div>

      {/* ===================================================================== */}
      {/* 2. RIGHT FLANK: MEGATRON (DECEPTICON WARLORD)                         */}
      {/* ===================================================================== */}
      <div
        className="absolute top-0 bottom-0 right-0 w-[85%] sm:w-[50%] md:w-[42%] lg:w-[36%] xl:w-[32%] transition-transform duration-700 ease-out animate-mech-right"
        style={{
          transform: `translate3d(${rightX}px, ${rightY}px, 0px) scale(${faction === 'decepticon' ? 1.05 : 1})`,
          opacity: faction === 'autobot' ? 0.35 : 1,
        }}
      >
        {/* Megatron High-Fidelity Poster Cutout Layer */}
        <div
          className="absolute inset-0 bg-no-repeat pointer-events-auto cursor-pointer transition-all duration-500 filter contrast-130 brightness-110 drop-shadow-[0_0_40px_rgba(255,30,66,0.35)]"
          style={{
            backgroundImage: `url('/images/insprano-poster.jpg')`,
            backgroundSize: '240% auto',
            backgroundPosition: 'right 4% top 2%',
            maskImage: 'radial-gradient(ellipse 85% 85% at 65% 32%, black 48%, rgba(0,0,0,0.6) 68%, transparent 92%)',
            WebkitMaskImage: 'radial-gradient(ellipse 85% 85% at 65% 32%, black 48%, rgba(0,0,0,0.6) 68%, transparent 92%)',
          }}
          onMouseEnter={() => {
            playOpticPulse();
            playMechArmorShift();
            if (onHoverMech) onHoverMech('decepticon');
          }}
        />

        {/* Ambient Dark Energon Crimson Aura */}
        <div className="absolute top-[8%] right-[10%] w-72 h-72 rounded-full bg-red-600/20 blur-3xl pointer-events-none" />

        {/* Dynamic Glowing Optic Visor Beam (Megatron Menacing Red Eyes) */}
        <div className="absolute top-[23%] right-[32%] pointer-events-none">
          {/* Crimson Optic Glow Sensor Strip */}
          <div className="relative w-10 sm:w-14 h-2 rounded-full bg-red-500 animate-optic-crimson filter blur-[0.5px]">
            {/* Horizontal Menacing Crimson Flare Streak */}
            <div className="absolute -left-12 -right-12 top-1/2 -translate-y-1/2 h-[2px] bg-gradient-to-r from-transparent via-red-300 to-transparent blur-[1px] opacity-95" />
            <div className="absolute -left-4 -right-4 top-1/2 -translate-y-1/2 h-[5px] bg-red-600 blur-[2px] opacity-80" />
          </div>
        </div>

        {/* Floating Decepticon Shoulder Insignia HUD Badge */}
        <div className="absolute top-[28%] right-[8%] hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg hud-panel-red border border-red-500/40 bg-slate-950/80 backdrop-blur-md text-[10px] font-mono tracking-widest text-red-300 shadow-[0_0_15px_rgba(255,30,66,0.4)]">
          <div>
            <div className="font-mech font-bold text-white tracking-wider text-right">DECEPTICON // MEGATRON</div>
            <div className="text-[8px] text-red-400/80 flex items-center justify-end gap-1">
              <span>DARK ENERGON PRIMED</span>
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping inline-block" />
            </div>
          </div>
          <Flame className="w-3.5 h-3.5 text-red-500 animate-pulse" />
        </div>
      </div>

      {/* Cyber Grid Scanning Line (Occasional Horizon Sweep) */}
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-cyan-500 via-white to-red-500 opacity-60 shadow-[0_0_10px_rgba(0,210,255,0.8)]" />
    </div>
  );
}
