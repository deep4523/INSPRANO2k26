'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, Shield, Zap, ChevronRight, Volume2, VolumeX, X, Play, Award, Calendar, MapPin, Power } from 'lucide-react';
import { playTransformSound, playLaserCharge, playOpticPulse, playCyberClick, isSoundEnabled, toggleSound } from '@/lib/soundFx';
import EnergonCoreShard from './EnergonCoreShard';
import MechEmblem from './MechEmblem';

interface GrandWelcomeIntroProps {
  onEnterArena?: () => void;
  isOpenDefault?: boolean;
}

export default function GrandWelcomeIntro({ onEnterArena, isOpenDefault = true }: GrandWelcomeIntroProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [soundActive, setSoundActive] = useState(true);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [step, setStep] = useState(1); // 1: Initial Hologram, 2: Transformers Lock-In
  const [hasInteracted, setHasInteracted] = useState(false);

  useEffect(() => {
    // Check if user has already visited in this session, or show on first load
    const shown = sessionStorage.getItem('insprano_welcome_shown');
    if (!shown || isOpenDefault) {
      setIsOpen(true);
      // Auto play intro sound after short mount delay
      const timer = setTimeout(() => {
        setSoundActive(isSoundEnabled());
        playTransformSound();
        playOpticPulse();
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isOpenDefault]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      setMousePos({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleEnter = () => {
    playTransformSound();
    playLaserCharge();
    sessionStorage.setItem('insprano_welcome_shown', 'true');
    setIsOpen(false);
    if (onEnterArena) onEnterArena();
  };

  const handleSoundToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    const next = toggleSound();
    setSoundActive(next);
  };

  if (!isOpen) return null;

  // 3D Parallax Tilt Calculation
  const tiltX = mousePos.y * -8;
  const tiltY = mousePos.x * 12;

  return (
    <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-2xl flex items-center justify-center p-3 sm:p-6 overflow-hidden select-none">
      {/* Dynamic Cybertronian Starfield & Dark Grid Background */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Glowing Nebula Orbs */}
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-cyan-500/15 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-red-600/15 rounded-full blur-[120px] animate-pulse" style={{ animationDuration: '4s' }} />

        {/* Animated Speed Lines & Perspective Floor */}
        <div className="absolute inset-0 opacity-20 bg-[linear-gradient(to_right,#00d2ff_1px,transparent_1px),linear-gradient(to_bottom,#00d2ff_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
      </div>

      {/* Main Holographic Container */}
      <div
        className="relative w-full max-w-5xl rounded-3xl border-2 border-cyan-500/40 bg-gradient-to-b from-slate-950/90 via-slate-950/95 to-slate-900/90 backdrop-blur-2xl p-6 sm:p-10 shadow-[0_0_80px_rgba(0,210,255,0.35)] overflow-hidden flex flex-col items-center text-center transition-all duration-300"
        style={{
          transform: `perspective(1200px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`,
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Sound Toggle Button */}
        <button
          onClick={handleSoundToggle}
          className="absolute top-5 left-5 z-30 p-2.5 rounded-xl border border-cyan-500/30 bg-slate-900/80 text-cyan-400 hover:text-white flex items-center gap-1.5 text-xs font-mono transition-colors shadow-[0_0_15px_rgba(0,210,255,0.2)]"
          title="Toggle Audio"
        >
          {soundActive ? <Volume2 className="w-4 h-4 text-cyan-400 animate-pulse" /> : <VolumeX className="w-4 h-4 text-slate-500" />}
          <span className="hidden sm:inline text-[10px]">{soundActive ? 'SFX ONLINE' : 'MUTED'}</span>
        </button>

        {/* Close Button */}
        <button
          onClick={handleEnter}
          aria-label="Skip Intro"
          className="absolute top-5 right-5 z-30 p-2.5 rounded-full border border-slate-700 bg-slate-900/80 text-slate-400 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Top Institution Banner */}
        <div className="relative z-10 flex flex-col items-center gap-1.5 mb-3">
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-cyan-950/80 border border-cyan-400/40 text-cyan-300 text-[10px] sm:text-xs font-mono uppercase tracking-[0.25em] shadow-[0_0_15px_rgba(0,210,255,0.25)]">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-spin" style={{ animationDuration: '4s' }} />
            <span>GOVERNMENT COLLEGE OF ENGINEERING KALAHANDI, BHAWANIPATNA</span>
          </div>
          <span className="text-[11px] font-mech font-bold tracking-[0.4em] text-slate-400 uppercase">
            PRESENTS THE ANNUAL NATIONAL TECH FESTIVAL
          </span>
        </div>

        {/* Centerpiece 3D Knight Optimus Prime & Holographic Matrix */}
        <div className="relative z-10 w-full max-w-3xl my-2 flex flex-col items-center justify-center">
          {/* Transformers Knight Prime Cinematic Image Layer with 3D Depth */}
          <div className="relative w-full h-48 sm:h-64 md:h-72 rounded-2xl overflow-hidden border border-cyan-500/30 shadow-[0_10px_35px_rgba(0,0,0,0.8)] group">
            <img
              src="/images/optimus-sword-cinematic.jpg"
              alt="Knight Optimus Prime - INSPRANO 2K26"
              className="w-full h-full object-cover object-center filter contrast-125 brightness-110 transform transition-transform duration-700 group-hover:scale-105"
            />

            {/* Glowing Optic Cyan Eyes with Flare Streak */}
            <div className="absolute top-[28%] left-[49.5%] -translate-x-1/2 pointer-events-none">
              <div className="relative w-12 sm:w-16 h-2 bg-cyan-300 rounded-full animate-optic-cyan filter blur-[0.5px]">
                <div className="absolute -left-16 -right-16 top-1/2 -translate-y-1/2 h-[2px] bg-gradient-to-r from-transparent via-cyan-200 to-transparent blur-[1px]" />
                <div className="absolute -left-6 -right-6 top-1/2 -translate-y-1/2 h-[6px] bg-cyan-400 blur-[3px]" />
              </div>
            </div>

            {/* Sword Blade Energon Spark Conduit */}
            <div className="absolute top-[40%] bottom-[5%] left-1/2 -translate-x-1/2 w-[3px] bg-gradient-to-b from-cyan-300 via-blue-400 to-transparent blur-[1px] animate-pulse pointer-events-none" />

            {/* Vignette Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950/70 via-transparent to-slate-950/70" />

            {/* Live Holographic Telemetry Strip */}
            <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-[10px] font-mono text-cyan-300 bg-slate-950/80 backdrop-blur-md px-3 py-1 rounded-lg border border-cyan-500/30">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                <span className="font-bold">AUTOBOT COMMAND // OPTIMUS CLASS</span>
              </div>
              <div className="hidden sm:block text-slate-400">
                STATUS: ALL SYSTEMS ENGAGED • ENERGON 100%
              </div>
            </div>
          </div>
        </div>

        {/* Chiseled 3D Title: INSPRANO 2K26 with Glowing Energon 'A' */}
        <div className="relative z-10 flex flex-col items-center select-none my-1">
          <div className="flex items-center justify-center">
            <span className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black font-mech tracking-wider uppercase animate-chrome-sweep drop-shadow-[0_12px_30px_rgba(0,0,0,0.95)]">
              INSPR
            </span>
            <EnergonCoreShard className="w-12 sm:w-16 md:w-20 lg:w-24 h-16 sm:h-24 md:h-32 lg:h-36 -mx-1" />
            <span className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black font-mech tracking-wider uppercase animate-chrome-sweep drop-shadow-[0_12px_30px_rgba(0,0,0,0.95)]">
              NO
            </span>
          </div>

          <div className="flex items-center gap-3 sm:gap-6 -mt-2 sm:-mt-4">
            <div className="h-[2px] w-8 sm:w-16 bg-gradient-to-r from-transparent to-cyan-400" />
            <div className="text-xl sm:text-3xl md:text-4xl font-black font-mech tracking-[0.35em] text-cyan-400 drop-shadow-[0_0_15px_rgba(0,210,255,0.8)]">
              2K26
            </div>
            <div className="h-[2px] w-8 sm:w-16 bg-gradient-to-l from-transparent to-cyan-400" />
          </div>

          {/* Official Tagline */}
          <div className="mt-2 text-xs sm:text-sm md:text-base font-mech font-black tracking-[0.35em] text-slate-200 uppercase flex items-center gap-2">
            <span className="w-1.5 h-1.5 rotate-45 bg-red-500 animate-ping inline-block" />
            <span>ENGINEERING BEYOND LIMITS</span>
            <span className="w-1.5 h-1.5 rotate-45 bg-cyan-400 animate-ping inline-block" />
          </div>
        </div>

        {/* Festival Highlights Pill HUD */}
        <div className="relative z-10 flex flex-wrap items-center justify-center gap-2 sm:gap-4 my-3 text-[11px] font-mono text-slate-300">
          <div className="px-3 py-1 rounded-full bg-slate-900/80 border border-cyan-500/30 flex items-center gap-1.5 text-cyan-300">
            <Calendar className="w-3.5 h-3.5 text-cyan-400" />
            <span>8 — 10 OCTOBER 2026</span>
          </div>
          <div className="px-3 py-1 rounded-full bg-slate-900/80 border border-amber-500/30 flex items-center gap-1.5 text-amber-300 font-bold">
            <Award className="w-3.5 h-3.5 text-amber-400" />
            <span>28 EVENTS • ₹85,000+ PRIZE POOL</span>
          </div>
          <div className="px-3 py-1 rounded-full bg-slate-900/80 border border-red-500/30 flex items-center gap-1.5 text-red-300">
            <MapPin className="w-3.5 h-3.5 text-red-400" />
            <span>GCEK CAMPUS, BHAWANIPATNA</span>
          </div>
        </div>

        {/* 5 Engineering Branches Matrix Ribbon */}
        <div className="relative z-10 flex items-center justify-center gap-2 sm:gap-4 my-1 text-[10px] sm:text-xs font-mono text-cyan-400/90 font-bold">
          <span>CSE</span>
          <span className="text-slate-600">•</span>
          <span>ME</span>
          <span className="text-slate-600">•</span>
          <span>EE</span>
          <span className="text-slate-600">•</span>
          <span>CE</span>
          <span className="text-slate-600">•</span>
          <span>ECE</span>
        </div>

        {/* Grand Enter Action Buttons with Animated Round Shape Core */}
        <div className="relative z-10 flex flex-col items-center justify-center gap-3 mt-4 w-full">
          <div className="relative flex flex-col items-center group cursor-pointer">
            {/* Outer Ambient Glow Aura */}
            <div className="absolute -inset-3 rounded-full bg-gradient-to-r from-cyan-500/40 via-red-500/30 to-cyan-400/40 blur-lg group-hover:blur-xl group-hover:scale-125 transition-all duration-500 animate-pulse" />

            {/* Concentric Rotating Cyber Tech Rings */}
            <div className="absolute -inset-3 rounded-full border-2 border-dashed border-cyan-400/70 animate-[spin_10s_linear_infinite] pointer-events-none" />
            <div className="absolute -inset-4.5 rounded-full border border-dotted border-red-500/60 animate-[spin_14s_linear_infinite_reverse] pointer-events-none" />

            <button
              onClick={handleEnter}
              aria-label="Press to enter website"
              className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-br from-slate-900 via-cyan-950 to-slate-950 border-2 border-cyan-400 hover:border-white flex flex-col items-center justify-center gap-1 shadow-[0_0_35px_rgba(0,210,255,0.8)] hover:shadow-[0_0_60px_rgba(0,210,255,1)] transition-all duration-300 transform group-hover:scale-110 active:scale-95 cursor-pointer backdrop-blur-md overflow-hidden z-10"
            >
              <div className="relative z-10 p-1.5 rounded-full bg-cyan-950/90 border border-cyan-400/70 shadow-[0_0_15px_rgba(0,210,255,0.9)] group-hover:scale-110 transition-transform">
                <Power className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-300 group-hover:text-white animate-pulse" />
              </div>
              <span className="relative z-10 text-[9px] sm:text-[10px] font-mech font-black uppercase tracking-wider text-cyan-300 group-hover:text-white drop-shadow-[0_0_8px_#00d2ff]">
                ENTER
              </span>
            </button>
          </div>

          <button
            onClick={handleEnter}
            className="w-full max-w-md py-3 px-6 rounded-2xl font-mech font-black text-xs uppercase tracking-widest text-white bg-gradient-to-r from-cyan-500 via-blue-600 to-cyan-500 hover:from-cyan-400 hover:to-blue-500 shadow-[0_0_25px_rgba(0,210,255,0.5)] border border-cyan-300 transition-all transform hover:scale-105 flex items-center justify-center gap-2 group"
          >
            <Zap className="w-4 h-4 text-cyan-200 group-hover:animate-bounce" />
            <span>TRANSFORM & ROLL OUT // ENTER ARENA</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
}
