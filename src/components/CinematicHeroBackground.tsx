'use client';

import React, { useEffect, useRef, useState } from 'react';
import { playOpticPulse, playMechArmorShift } from '@/lib/soundFx';

interface CinematicHeroBackgroundProps {
  faction?: 'autobot' | 'decepticon' | 'cybertron';
  onHoverMech?: (mech: 'autobot' | 'decepticon') => void;
}

export default function CinematicHeroBackground({
  faction = 'cybertron',
  onHoverMech,
}: CinematicHeroBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Mouse parallax state with smooth linear interpolation (lerp)
  const targetMouse = useRef({ x: 0, y: 0 });
  const currentMouse = useRef({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check mobile or touch device
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || 'ontouchstart' in window);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile, { passive: true });

    // Mouse move handler
    const handleMouseMove = (e: MouseEvent) => {
      if (isMobile) return;
      const x = (e.clientX / window.innerWidth - 0.5) * 2; // -1 to 1
      const y = (e.clientY / window.innerHeight - 0.5) * 2; // -1 to 1
      targetMouse.current = { x, y };
    };

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('resize', checkMobile);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isMobile]);

  // Canvas Particle & Perspective Road Streaks System
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };
    window.addEventListener('resize', handleResize);

    // Particle definition
    const particleCount = isMobile ? 30 : 75;
    const particles: Array<{
      x: number;
      y: number;
      size: number;
      speedY: number;
      speedX: number;
      alpha: number;
      maxAlpha: number;
      color: string;
      fadeSpeed: number;
    }> = [];

    for (let i = 0; i < particleCount; i++) {
      const isLeft = Math.random() < 0.45;
      const isRight = Math.random() > 0.55;
      let color = 'rgba(0, 210, 255, '; // Cyan Autobot
      if (isRight) {
        color = 'rgba(255, 30, 66, '; // Crimson Decepticon
      } else if (!isLeft) {
        color = 'rgba(255, 255, 255, '; // White Horizon Spark
      }

      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 2.2 + 0.8,
        speedY: -(Math.random() * 0.4 + 0.15),
        speedX: (Math.random() - 0.5) * 0.3,
        alpha: Math.random(),
        maxAlpha: Math.random() * 0.7 + 0.3,
        color,
        fadeSpeed: Math.random() * 0.01 + 0.005,
      });
    }

    // Perspective Road Photon Streaks
    // Vanishing Point is at horizon center: X = 0.5, Y = 0.62
    const streakCount = isMobile ? 6 : 14;
    const roadStreaks: Array<{
      progress: number; // 0 (horizon) to 1 (screen bottom)
      laneOffset: number; // -1 to 1 across the road spread
      speed: number;
      length: number;
      isRed: boolean;
      opacity: number;
    }> = [];

    for (let i = 0; i < streakCount; i++) {
      roadStreaks.push({
        progress: Math.random(),
        laneOffset: (Math.random() - 0.5) * 1.8,
        speed: Math.random() * 0.004 + 0.002,
        length: Math.random() * 0.08 + 0.04,
        isRed: Math.random() > 0.5,
        opacity: Math.random() * 0.6 + 0.4,
      });
    }

    let lastTime = performance.now();

    const render = (time: number) => {
      const dt = (time - lastTime) / 1000;
      lastTime = time;

      // Lerp mouse
      currentMouse.current.x += (targetMouse.current.x - currentMouse.current.x) * 0.06;
      currentMouse.current.y += (targetMouse.current.y - currentMouse.current.y) * 0.06;

      ctx.clearRect(0, 0, width, height);

      // 1. Draw Perspective Road Streaks
      const vpX = width * 0.5 + currentMouse.current.x * 6;
      const vpY = height * 0.62 + currentMouse.current.y * 4;

      roadStreaks.forEach((streak) => {
        streak.progress += streak.speed * (dt * 60);
        if (streak.progress > 1) {
          streak.progress = 0;
          streak.laneOffset = (Math.random() - 0.5) * 1.8;
          streak.isRed = Math.random() > 0.5;
        }

        // Perspective curve calculation
        const p1 = streak.progress;
        const p2 = Math.max(0, p1 - streak.length);

        // Exponential perspective spread from vanishing point to bottom width
        const spreadFactor1 = Math.pow(p1, 2.2);
        const spreadFactor2 = Math.pow(p2, 2.2);

        const roadHalfWidth = width * 0.46;
        const x1 = vpX + streak.laneOffset * roadHalfWidth * spreadFactor1;
        const y1 = vpY + (height - vpY) * p1;

        const x2 = vpX + streak.laneOffset * roadHalfWidth * spreadFactor2;
        const y2 = vpY + (height - vpY) * p2;

        const alpha = streak.opacity * Math.sin(p1 * Math.PI);
        const strokeColor = streak.isRed
          ? `rgba(255, 30, 66, ${alpha})`
          : `rgba(0, 210, 255, ${alpha})`;

        ctx.beginPath();
        ctx.moveTo(x2, y2);
        ctx.lineTo(x1, y1);
        ctx.strokeStyle = strokeColor;
        ctx.lineWidth = 1 + spreadFactor1 * 3.5;
        ctx.shadowColor = streak.isRed ? '#ff1e42' : '#00d2ff';
        ctx.shadowBlur = 8 * spreadFactor1;
        ctx.stroke();
        ctx.shadowBlur = 0;
      });

      // 2. Draw Floating Atmospheric Energon Particles & Dust
      particles.forEach((p) => {
        p.y += p.speedY * (dt * 60);
        p.x += p.speedX * (dt * 60);
        p.alpha += p.fadeSpeed;

        if (p.alpha > p.maxAlpha || p.alpha < 0.1) {
          p.fadeSpeed = -p.fadeSpeed;
        }

        if (p.y < 0) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color}${Math.max(0, Math.min(1, p.alpha))})`;
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, [isMobile]);

  // Depth Parallax values derived from mouse
  const mouseX = currentMouse.current.x;
  const mouseY = currentMouse.current.y;

  const bgParallax = `translate3d(${mouseX * -6}px, ${mouseY * -4 + scrollY * 0.1}px, 0px)`;
  const midParallax = `translate3d(${mouseX * -10}px, ${mouseY * -7 + scrollY * 0.15}px, 0px)`;
  const fgParallax = `translate3d(${mouseX * -14}px, ${mouseY * -10 + scrollY * 0.22}px, 0px)`;

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 pointer-events-none overflow-hidden select-none z-0"
      aria-hidden="true"
    >
      {/* ===================================================================== */}
      {/* 1. MASTER CINEMATIC VIEWPORT CONTAINER (Subtle 3D Camera Loop)        */}
      {/* ===================================================================== */}
      <div className="relative w-full h-full animate-cinematic-camera transform-gpu origin-center">
        {/* =================================================================== */}
        {/* 2. BASE IMAGE LAYER: INSPRANO 2K26 OFFICIAL HERO BACKGROUND         */}
        {/* =================================================================== */}
        <div
          className="absolute inset-0 w-full h-full transition-transform duration-700 ease-out"
          style={{ transform: fgParallax }}
        >
          <img
            src="/images/insprano-hero-bg.jpg"
            alt="INSPRANO 2K26 Transformers Sci-Fi Hero Art"
            className="w-full h-full object-cover object-top sm:object-center filter brightness-100 contrast-110 saturate-110 pointer-events-none"
            loading="eager"
            decoding="async"
          />
        </div>

        {/* =================================================================== */}
        {/* 3. SKY & ATMOSPHERE: STARS, NEBULA DRIFT, AND FLYING CRAFTS        */}
        {/* =================================================================== */}
        <div
          className="absolute inset-0 pointer-events-none transition-transform duration-700 ease-out"
          style={{ transform: bgParallax }}
        >
          {/* Subtle Twinkling High-Altitude Stars */}
          <div className="absolute top-[6%] left-[22%] w-1.5 h-1.5 rounded-full bg-white animate-star-1 shadow-[0_0_8px_#ffffff]" />
          <div className="absolute top-[12%] left-[45%] w-1.5 h-1.5 rounded-full bg-cyan-200 animate-star-2 shadow-[0_0_8px_#00d2ff]" />
          <div className="absolute top-[8%] left-[78%] w-1.5 h-1.5 rounded-full bg-white animate-star-3 shadow-[0_0_8px_#ffffff]" />

          {/* Distant Flying Futuristic Patrol Crafts */}
          <div className="absolute animate-flying-ship-1 z-10 flex items-center gap-1.5 opacity-80">
            <div className="w-10 h-[1px] bg-gradient-to-r from-transparent via-cyan-400 to-white blur-[0.5px]" />
            <div className="w-4 h-1.5 bg-slate-900 border border-cyan-400/80 rounded-sm shadow-[0_0_8px_rgba(0,210,255,0.8)] relative">
              <span className="absolute -top-0.5 right-0.5 w-1 h-1 bg-red-400 rounded-full animate-ping" />
            </div>
          </div>
        </div>

        {/* =================================================================== */}
        {/* 4. CENTRAL GLOWING PORTAL RING (Positioned at Horizon X: 50%, Y: 48%) */}
        {/* =================================================================== */}
        <div
          className="absolute top-[48%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-36 sm:w-56 md:w-68 h-36 sm:h-56 md:h-68 pointer-events-none transition-transform duration-700 ease-out"
          style={{ transform: `translate(-50%, -50%) ${bgParallax}` }}
        >
          {/* Rotating Outer Tech Ring */}
          <div className="absolute inset-0 rounded-full border border-cyan-400/40 border-dashed animate-ring-rotate shadow-[0_0_30px_rgba(0,210,255,0.5)]" />
          {/* Counter-Rotating Inner HUD Ring */}
          <div className="absolute inset-4 sm:inset-6 rounded-full border border-purple-400/50 animate-ring-counter" />
          {/* Core Portal Holographic Glow Arc */}
          <div className="absolute inset-6 sm:inset-10 rounded-full bg-gradient-to-t from-purple-500/25 via-cyan-400/20 to-blue-500/25 blur-lg animate-pulse" />
        </div>

        {/* =================================================================== */}
        {/* 5. LEFT ROBOT (OPTIMUS PRIME) — OPTIC VISOR & CHEST ENERGON GLOW    */}
        {/* =================================================================== */}
        <div
          className="absolute top-0 bottom-0 left-0 w-[45%] pointer-events-auto cursor-pointer animate-optimus-movement transition-transform duration-700 ease-out"
          style={{ transform: fgParallax }}
          onMouseEnter={() => {
            playOpticPulse();
            playMechArmorShift();
            if (onHoverMech) onHoverMech('autobot');
          }}
        >
          {/* Cyan Ambient Head Aura */}
          <div className="absolute top-[20%] left-[18%] w-32 sm:w-48 h-32 sm:h-48 rounded-full bg-cyan-400/25 blur-3xl animate-pulse pointer-events-none" />

          {/* Optimus Cyan Visor Beam Streak & Sweeping Target Laser */}
          <div className="absolute top-[23.5%] left-[18.5%] pointer-events-none -translate-x-1/2 -translate-y-1/2">
            <div className="relative w-8 sm:w-14 h-1.5 sm:h-2 rounded-full bg-cyan-200 animate-optic-cyan shadow-[0_0_20px_#00d2ff,0_0_45px_rgba(0,210,255,0.95)]">
              <div className="absolute -left-8 sm:-left-16 -right-8 sm:-right-16 top-1/2 -translate-y-1/2 h-[1.5px] bg-gradient-to-r from-transparent via-white to-transparent blur-[0.5px]" />
            </div>
          </div>

          {/* Chest Matrix Conduits */}
          <div className="absolute top-[42%] left-[18%] w-24 sm:w-36 h-24 sm:h-36 rounded-full bg-cyan-500/20 blur-2xl animate-pulse pointer-events-none" />
          <div className="absolute top-[44%] left-[18.5%] -translate-x-1/2 -translate-y-1/2 w-4 sm:w-5 h-4 sm:h-5 rounded-full bg-cyan-300 blur-[1px] opacity-85 animate-ping pointer-events-none" />
        </div>

        {/* =================================================================== */}
        {/* 6. RIGHT ROBOT (MEGATRON) — CRIMSON OPTICS & FUSION CANNON GLOW     */}
        {/* =================================================================== */}
        <div
          className="absolute top-0 bottom-0 right-0 w-[45%] pointer-events-auto cursor-pointer animate-megatron-movement transition-transform duration-700 ease-out"
          style={{ transform: fgParallax }}
          onMouseEnter={() => {
            playOpticPulse();
            playMechArmorShift();
            if (onHoverMech) onHoverMech('decepticon');
          }}
        >
          {/* Red Ambient Head Aura */}
          <div className="absolute top-[21%] right-[18%] w-32 sm:w-48 h-32 sm:h-48 rounded-full bg-red-500/25 blur-3xl animate-pulse pointer-events-none" />

          {/* Megatron Crimson Head Optics */}
          <div className="absolute top-[24.5%] right-[18.2%] pointer-events-none translate-x-1/2 -translate-y-1/2">
            <div className="relative w-8 sm:w-14 h-1.5 sm:h-2 rounded-full bg-red-400 animate-optic-crimson shadow-[0_0_20px_#ff1e42,0_0_45px_rgba(255,30,66,1)]">
              <div className="absolute -left-8 sm:-left-16 -right-8 sm:-right-16 top-1/2 -translate-y-1/2 h-[1.5px] bg-gradient-to-r from-transparent via-red-100 to-transparent blur-[0.5px]" />
            </div>
          </div>

          {/* Megatron Fusion Cannon Muzzle Glow */}
          <div className="absolute top-[78%] right-[28%] pointer-events-none translate-x-1/2 -translate-y-1/2">
            <div className="w-10 sm:w-16 h-10 sm:h-16 rounded-full bg-red-600/35 blur-xl animate-fusion-charge shadow-[0_0_35px_#ff1e42]" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 sm:w-5 h-3 sm:h-5 rounded-full bg-red-400 blur-[1px] animate-ping" />
          </div>
        </div>

        {/* =================================================================== */}
        {/* 7. HIGH-PERFORMANCE 2D CANVAS: PARTICLES & ROAD PHOTON STREAKS     */}
        {/* =================================================================== */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full pointer-events-none z-10"
        />

        {/* =================================================================== */}
        {/* 8. CINEMATIC CONTRAST GRADIENTS (Tuned for maximum robot clarity)  */}
        {/* =================================================================== */}
        {/* Edge Glows */}
        <div className="absolute top-0 bottom-0 left-0 w-1/4 bg-gradient-to-r from-cyan-950/20 via-transparent to-transparent pointer-events-none" />
        <div className="absolute top-0 bottom-0 right-0 w-1/4 bg-gradient-to-l from-red-950/20 via-transparent to-transparent pointer-events-none" />

        {/* Top/Bottom Subtle Vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-slate-950/60 pointer-events-none" />
      </div>
    </div>
  );
}
