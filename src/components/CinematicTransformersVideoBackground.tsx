'use client';

import React, { useEffect, useRef, useState } from 'react';
import { playOpticPulse, playMechArmorShift } from '@/lib/soundFx';

interface CinematicTransformersVideoBackgroundProps {
  faction?: 'autobot' | 'decepticon' | 'cybertron';
  onHoverMech?: (mech: 'autobot' | 'decepticon') => void;
}

export default function CinematicTransformersVideoBackground({
  faction = 'cybertron',
  onHoverMech,
}: CinematicTransformersVideoBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  // Parallax tracking
  const targetMouse = useRef({ x: 0, y: 0 });
  const currentMouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || 'ontouchstart' in window);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile, { passive: true });

    const handleMouseMove = (e: MouseEvent) => {
      if (isMobile) return;
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      targetMouse.current = { x, y };
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener('resize', checkMobile);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isMobile]);

  // High-Performance Animated Energy & Lightning Canvas System
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Particle spark system
    const pCount = isMobile ? 35 : 85;
    const particles = Array.from({ length: pCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 2.5 + 0.8,
      speedY: -(Math.random() * 0.8 + 0.3),
      speedX: (Math.random() - 0.5) * 0.4,
      alpha: Math.random(),
      maxAlpha: Math.random() * 0.8 + 0.2,
      isRed: Math.random() > 0.5,
    }));

    // Flying photon pulses on the highway
    const streaks = Array.from({ length: isMobile ? 6 : 14 }, () => ({
      progress: Math.random(),
      lane: (Math.random() - 0.5) * 1.6,
      speed: Math.random() * 0.006 + 0.003,
      length: Math.random() * 0.12 + 0.05,
      isRed: Math.random() > 0.5,
    }));

    let clock = 0;

    const render = () => {
      animId = requestAnimationFrame(render);
      clock += 0.016;

      currentMouse.current.x += (targetMouse.current.x - currentMouse.current.x) * 0.06;
      currentMouse.current.y += (targetMouse.current.y - currentMouse.current.y) * 0.06;

      ctx.clearRect(0, 0, width, height);

      // 1. Draw Perspective Highway Light Streaks (Vanishing Point at 50%, 52%)
      const vpX = width * 0.5 + currentMouse.current.x * 6;
      const vpY = height * 0.52 + currentMouse.current.y * 4;

      streaks.forEach((st) => {
        st.progress += st.speed;
        if (st.progress > 1) {
          st.progress = 0;
          st.lane = (Math.random() - 0.5) * 1.6;
          st.isRed = Math.random() > 0.5;
        }

        const p1 = st.progress;
        const p2 = Math.max(0, p1 - st.length);

        const spread1 = Math.pow(p1, 2.2);
        const spread2 = Math.pow(p2, 2.2);

        const roadHalf = width * 0.38;
        const x1 = vpX + st.lane * roadHalf * spread1;
        const y1 = vpY + (height - vpY) * p1;

        const x2 = vpX + st.lane * roadHalf * spread2;
        const y2 = vpY + (height - vpY) * p2;

        const alpha = Math.sin(p1 * Math.PI) * 0.85;

        ctx.beginPath();
        ctx.moveTo(x2, y2);
        ctx.lineTo(x1, y1);
        ctx.strokeStyle = st.isRed
          ? `rgba(255, 30, 66, ${alpha})`
          : `rgba(0, 210, 255, ${alpha})`;
        ctx.lineWidth = 1.5 + spread1 * 3.5;
        ctx.shadowColor = st.isRed ? '#ff1e42' : '#00d2ff';
        ctx.shadowBlur = 10 * spread1;
        ctx.stroke();
        ctx.shadowBlur = 0;
      });

      // 2. Rising Energon Sparks
      particles.forEach((p) => {
        p.y += p.speedY;
        p.x += p.speedX;
        p.alpha += 0.01;
        if (p.alpha > p.maxAlpha) p.alpha = 0.1;

        if (p.y < 0) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.isRed
          ? `rgba(255, 30, 66, ${p.alpha})`
          : `rgba(0, 210, 255, ${p.alpha})`;
        ctx.fill();
      });

      // 3. Occasional Lightning Arcs between Portal & Spire
      if (Math.random() < 0.04) {
        ctx.save();
        ctx.strokeStyle = 'rgba(0, 210, 255, 0.8)';
        ctx.lineWidth = 1.5;
        ctx.shadowColor = '#00d2ff';
        ctx.shadowBlur = 12;
        ctx.beginPath();
        let lx = width * 0.5 + (Math.random() - 0.5) * 40;
        let ly = height * 0.48;
        ctx.moveTo(lx, ly);
        for (let seg = 0; seg < 5; seg++) {
          lx += (Math.random() - 0.5) * 35;
          ly -= Math.random() * 25;
          ctx.lineTo(lx, ly);
        }
        ctx.stroke();
        ctx.restore();
      }
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
    };
  }, [isMobile]);

  const mx = currentMouse.current.x;
  const my = currentMouse.current.y;

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 pointer-events-none overflow-hidden select-none z-0 bg-slate-950"
      aria-hidden="true"
    >
      {/* ===================================================================== */}
      {/* 1. MASTER HIGH-RESOLUTION ANIMATED TRANSFORMERS HERO VIDEO/IMAGE LAYER */}
      {/* ===================================================================== */}
      <div
        className="relative w-full h-full animate-cinematic-camera transform-gpu origin-center"
        style={{
          transform: `translate3d(${mx * -10}px, ${my * -6}px, 0px) scale(1.02)`,
          transition: 'transform 0.4s ease-out',
        }}
      >
        {/* Full-bleed Responsive Photorealistic Transformers Battle Artwork (Optimized for both Mobile & Desktop) */}
        <img
          src="/images/transformers_battle_bg.jpg"
          alt="Photorealistic Transformers Battle Ground"
          className="w-full h-full max-h-[55vh] sm:max-h-full object-contain sm:object-cover object-top sm:object-[center_75%] opacity-95 brightness-110 contrast-115 transition-all duration-700 mt-8 sm:mt-0"
        />

        {/* Looping High-Definition Battle Motion Video Overlay */}
        <video
          src="/videos/hero-loop.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full max-h-[55vh] sm:max-h-full object-contain sm:object-cover object-top sm:object-[center_75%] opacity-45 mix-blend-screen pointer-events-none mt-8 sm:mt-0"
        />

        {/* =================================================================== */}
        {/* 2. OPTIMUS PRIME ANIMATED OPTIC & ENERGON GLOW (LEFT FLANK)        */}
        {/* =================================================================== */}
        <div
          className="absolute top-0 bottom-0 left-0 w-[45%] pointer-events-auto cursor-pointer animate-optimus-movement"
          onMouseEnter={() => {
            playOpticPulse();
            playMechArmorShift();
            if (onHoverMech) onHoverMech('autobot');
          }}
        >
          {/* Cyan Optic Eyes Flare */}
          <div className="absolute top-[23.5%] left-[18.2%] -translate-x-1/2 -translate-y-1/2 pointer-events-none">
            <div className="relative w-10 sm:w-16 h-2 sm:h-2.5 rounded-full bg-cyan-200 animate-optic-cyan shadow-[0_0_25px_#00d2ff,0_0_50px_rgba(0,210,255,1)]">
              <div className="absolute -left-12 sm:-left-20 -right-12 sm:-right-20 top-1/2 -translate-y-1/2 h-[2px] bg-gradient-to-r from-transparent via-white to-transparent blur-[0.5px]" />
            </div>
            {/* Sweeping Laser Scanner */}
            <div className="absolute left-full top-1/2 -translate-y-1/2 w-[35vw] h-[1.5px] bg-gradient-to-r from-cyan-300 via-cyan-400/50 to-transparent blur-[0.5px] animate-laser-sweep-cyan" />
          </div>

          {/* Chest Matrix Spark */}
          <div className="absolute top-[42%] left-[18%] -translate-x-1/2 -translate-y-1/2 w-28 sm:w-44 h-28 sm:h-44 rounded-full bg-cyan-400/25 blur-3xl animate-pulse pointer-events-none" />
          <div className="absolute top-[42%] left-[18.2%] -translate-x-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-cyan-300 blur-[1px] animate-ping pointer-events-none" />
        </div>

        {/* =================================================================== */}
        {/* 3. MEGATRON ANIMATED CRIMSON OPTIC & FUSION CANNON (RIGHT FLANK)    */}
        {/* =================================================================== */}
        <div
          className="absolute top-0 bottom-0 right-0 w-[45%] pointer-events-auto cursor-pointer animate-megatron-movement"
          onMouseEnter={() => {
            playOpticPulse();
            playMechArmorShift();
            if (onHoverMech) onHoverMech('decepticon');
          }}
        >
          {/* Crimson Optic Eyes Flare */}
          <div className="absolute top-[24.5%] right-[18.2%] translate-x-1/2 -translate-y-1/2 pointer-events-none">
            <div className="relative w-10 sm:w-16 h-2 sm:h-2.5 rounded-full bg-red-400 animate-optic-crimson shadow-[0_0_25px_#ff1e42,0_0_55px_rgba(255,30,66,1)]">
              <div className="absolute -left-12 sm:-left-20 -right-12 sm:-right-20 top-1/2 -translate-y-1/2 h-[2px] bg-gradient-to-r from-transparent via-red-100 to-transparent blur-[0.5px]" />
            </div>
            {/* Sweeping Crimson Scanner */}
            <div className="absolute right-full top-1/2 -translate-y-1/2 w-[35vw] h-[1.5px] bg-gradient-to-l from-red-500 via-red-400/50 to-transparent blur-[0.5px] animate-laser-sweep-crimson" />
          </div>

          {/* Fusion Cannon Vortex Muzzle Glow */}
          <div className="absolute top-[78%] right-[28%] translate-x-1/2 -translate-y-1/2 pointer-events-none">
            <div className="w-14 sm:w-20 h-14 sm:h-20 rounded-full bg-red-600/40 blur-2xl animate-fusion-charge shadow-[0_0_45px_#ff1e42,0_0_80px_rgba(255,30,66,0.8)]" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-red-400 blur-[1px] animate-ping" />
          </div>
        </div>

        {/* =================================================================== */}
        {/* 4. CENTRAL GLOWING PORTAL RING & ROTATING HUD CONDUITS              */}
        {/* =================================================================== */}
        <div className="absolute top-[48%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-44 sm:w-64 md:w-80 h-44 sm:h-64 md:h-80 pointer-events-none">
          {/* Rotating Outer Portal Ring */}
          <div className="absolute inset-0 rounded-full border-2 border-cyan-400/50 border-dashed animate-ring-rotate shadow-[0_0_35px_rgba(0,210,255,0.6)]" />
          {/* Counter-Rotating Inner Portal Ring */}
          <div className="absolute inset-4 sm:inset-6 rounded-full border border-purple-400/60 animate-ring-counter" />
          {/* Core Portal Radiance */}
          <div className="absolute inset-8 sm:inset-12 rounded-full bg-gradient-to-t from-purple-500/30 via-cyan-400/25 to-blue-500/30 blur-xl animate-pulse" />
        </div>

        {/* =================================================================== */}
        {/* 5. 2D CANVAS: RUNWAY ENERGY STREAKS & SPARKS                        */}
        {/* =================================================================== */}
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-10" />

        {/* =================================================================== */}
        {/* 6. SUBTLE GRADIENTS FOR CRISP TEXT CONTRAST                         */}
        {/* =================================================================== */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-slate-950/60 pointer-events-none" />
      </div>
    </div>
  );
}
