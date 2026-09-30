'use client';

import React, { useState, useEffect, useRef } from 'react';
import * as THREE from 'three';
import { Sparkles, Zap, Shield, Volume2, VolumeX, FastForward, ArrowRight, Power } from 'lucide-react';
import {
  playTransformSound,
  playLaserCharge,
  playOpticPulse,
  playMechArmorShift,
  playHydraulicFootstep,
  isSoundEnabled,
  toggleSound,
} from '@/lib/soundFx';

interface CinematicRobotIntroProps {
  onComplete: () => void;
  isOpenDefault?: boolean;
}

export default function CinematicRobotIntro({
  onComplete,
  isOpenDefault = true,
}: CinematicRobotIntroProps) {
  // Timeline Stages (Total ~6.5 seconds):
  // 0: 0.0s–1.0s -> Darkness, blue point of light, "INITIALIZING INSPRANO 2K26"
  // 1: 1.0s–2.2s -> Energy Activation (Blue & Red dual energy, mechanical silhouettes)
  // 2: 2.2s–3.5s -> Forward Camera Movement, Energy Trails, Central Core Charge
  // 3: 3.5s–5.2s -> Core Light Pulse, INSPRANO 2K26 Metallic Logo Reveal & Mechanical Lock
  // 4: 5.2s–6.0s -> Metallic Light Sweep & Final Energy Pulse
  // 5: 6.0s–6.8s -> Seamless Warp/Fade Transition to Existing Homepage
  const [stage, setStage] = useState<number>(3);
  const [soundActive, setSoundActive] = useState<boolean>(true);
  const [isExiting, setIsExiting] = useState<boolean>(false);
  const [warpFlash, setWarpFlash] = useState<boolean>(false);
  const [isSkipped, setIsSkipped] = useState<boolean>(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const threeContainerRef = useRef<HTMLDivElement>(null);

  // Three.js Scene References
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const animFrameRef = useRef<number | null>(null);

  // 3D Objects & Lights
  const coreLightRef = useRef<THREE.PointLight | null>(null);
  const leftBlueLightRef = useRef<THREE.SpotLight | null>(null);
  const rightRedLightRef = useRef<THREE.SpotLight | null>(null);
  const coreMeshRef = useRef<THREE.Mesh | null>(null);
  const lockRing1Ref = useRef<THREE.Mesh | null>(null);
  const lockRing2Ref = useRef<THREE.Mesh | null>(null);
  const mechGroupRef = useRef<THREE.Group | null>(null);
  const particlesRef = useRef<THREE.Points | null>(null);

  const stageRef = useRef(3);
  stageRef.current = stage;

  // Handle transition to existing homepage
  const handleTransitionToHomepage = () => {
    if (isExiting || isSkipped) return;
    setIsSkipped(true);
    playTransformSound();
    setWarpFlash(true);

    setTimeout(() => {
      setIsExiting(true);
      setTimeout(() => {
        if (typeof window !== 'undefined') {
          sessionStorage.setItem('insprano_intro_seen_v6', 'true');
        }
        onComplete();
      }, 500);
    }, 400);
  };

  // Timeline Orchestration
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Check reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      onComplete();
      return;
    }

    setSoundActive(isSoundEnabled());
    playOpticPulse();
    playLaserCharge();
  }, [isOpenDefault, onComplete]);

  // THREE.JS 3D CINEMATIC INTRO SCENE
  useEffect(() => {
    if (!threeContainerRef.current) return;
    const container = threeContainerRef.current;
    const width = window.innerWidth;
    const height = window.innerHeight;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x030712, 0.02);
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 0, 24);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.35;
    container.innerHTML = '';
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Ambient Darkness
    scene.add(new THREE.AmbientLight(0x030712, 0.5));

    // Left Electric Blue Spot Light
    const leftBlueLight = new THREE.SpotLight(0x00d2ff, 0, 50, Math.PI / 3, 0.5, 1);
    leftBlueLight.position.set(-12, 6, 12);
    leftBlueLightRef.current = leftBlueLight;
    scene.add(leftBlueLight);

    // Right Crimson Red Spot Light
    const rightRedLight = new THREE.SpotLight(0xff1e42, 0, 50, Math.PI / 3, 0.5, 1);
    rightRedLight.position.set(12, 6, 12);
    rightRedLightRef.current = rightRedLight;
    scene.add(rightRedLight);

    // Center Core Light
    const coreLight = new THREE.PointLight(0x00d2ff, 0, 35);
    coreLight.position.set(0, 0, 2);
    coreLightRef.current = coreLight;
    scene.add(coreLight);

    // =========================================================================
    // 1. CENTRAL ENERGY CORE & MECHANICAL LOCK RINGS
    // =========================================================================
    const coreMesh = new THREE.Mesh(
      new THREE.IcosahedronGeometry(1.2, 3),
      new THREE.MeshStandardMaterial({
        color: 0x00ffff,
        emissive: 0x00d2ff,
        emissiveIntensity: 0.8,
        metalness: 0.9,
        roughness: 0.1,
      })
    );
    coreMesh.position.set(0, 0, 0);
    coreMeshRef.current = coreMesh;
    scene.add(coreMesh);

    // Outer Mechanical Lock Rings
    const ringMat = new THREE.MeshStandardMaterial({
      color: 0x94a3b8,
      metalness: 0.95,
      roughness: 0.2,
      emissive: 0x00d2ff,
      emissiveIntensity: 0.2,
    });

    const lockRing1 = new THREE.Mesh(new THREE.TorusGeometry(2.4, 0.08, 16, 48), ringMat);
    lockRing1Ref.current = lockRing1;
    scene.add(lockRing1);

    const lockRing2 = new THREE.Mesh(new THREE.TorusGeometry(3.2, 0.06, 16, 48), ringMat.clone());
    lockRing2.rotation.x = Math.PI / 3;
    lockRing2Ref.current = lockRing2;
    scene.add(lockRing2);

    // =========================================================================
    // 2. ORIGINAL MECHANICAL ARCHITECTURE & SILHOUETTES
    // =========================================================================
    const mechGroup = new THREE.Group();
    mechGroupRef.current = mechGroup;

    const matArmor = new THREE.MeshStandardMaterial({
      color: 0x0f172a,
      metalness: 0.92,
      roughness: 0.25,
    });

    // Left & Right Mechanical Flanker Panels & Joints
    for (let i = 0; i < 6; i++) {
      const side = i % 2 === 0 ? -1 : 1;
      const panel = new THREE.Mesh(new THREE.BoxGeometry(1.2, 4 + i * 0.8, 0.8), matArmor);
      panel.position.set(side * (6 + i * 1.5), (i - 2.5) * 1.2, -2 - i);
      panel.rotation.y = side * 0.3;
      mechGroup.add(panel);
    }

    scene.add(mechGroup);

    // =========================================================================
    // 3. CONTROLLED ENERGY PARTICLES
    // =========================================================================
    const pCount = 140;
    const pGeom = new THREE.BufferGeometry();
    const pPos = new Float32Array(pCount * 3);
    const pColors = new Float32Array(pCount * 3);

    const colBlue = new THREE.Color(0x00d2ff);
    const colRed = new THREE.Color(0xff1e42);
    const colWhite = new THREE.Color(0xffffff);

    for (let i = 0; i < pCount; i++) {
      pPos[i * 3] = (Math.random() - 0.5) * 40;
      pPos[i * 3 + 1] = (Math.random() - 0.5) * 25;
      pPos[i * 3 + 2] = (Math.random() - 0.5) * 30;

      const col = Math.random() > 0.6 ? colBlue : Math.random() > 0.3 ? colRed : colWhite;
      pColors[i * 3] = col.r;
      pColors[i * 3 + 1] = col.g;
      pColors[i * 3 + 2] = col.b;
    }

    pGeom.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
    pGeom.setAttribute('color', new THREE.BufferAttribute(pColors, 3));

    const pMat = new THREE.PointsMaterial({
      size: 0.22,
      vertexColors: true,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending,
    });
    const particles = new THREE.Points(pGeom, pMat);
    particlesRef.current = particles;
    scene.add(particles);

    // Resize Handler
    const handleResize = () => {
      if (!camera || !renderer) return;
      const w = window.innerWidth;
      const h = window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    // RENDER LOOP
    let clock = new THREE.Clock();

    const render = () => {
      animFrameRef.current = requestAnimationFrame(render);
      const elapsed = clock.getElapsedTime();
      const currentStage = stageRef.current;

      // STAGE-BASED ANIMATION
      if (currentStage === 0) {
        // 0.0s–1.0s: Single central blue point of light, dark silhouettes
        camera.position.z = THREE.MathUtils.lerp(camera.position.z, 24, 0.04);
        if (coreLightRef.current) coreLightRef.current.intensity = 8 + Math.sin(elapsed * 4) * 4;
        if (leftBlueLightRef.current) leftBlueLightRef.current.intensity = 2;
        if (rightRedLightRef.current) rightRedLightRef.current.intensity = 2;
      } else if (currentStage === 1) {
        // 1.0s–2.2s: Blue & Red dual energy activation, mechanical silhouettes catch edge light
        camera.position.z = THREE.MathUtils.lerp(camera.position.z, 20, 0.035);
        if (leftBlueLightRef.current) leftBlueLightRef.current.intensity = THREE.MathUtils.lerp(leftBlueLightRef.current.intensity, 30, 0.05);
        if (rightRedLightRef.current) rightRedLightRef.current.intensity = THREE.MathUtils.lerp(rightRedLightRef.current.intensity, 28, 0.05);
        if (coreLightRef.current) coreLightRef.current.intensity = 25 + Math.sin(elapsed * 8) * 10;
      } else if (currentStage === 2) {
        // 2.2s–3.5s: Forward camera acceleration, energy trails, central core charge
        camera.position.z = THREE.MathUtils.lerp(camera.position.z, 14, 0.04);
        if (coreLightRef.current) coreLightRef.current.intensity = THREE.MathUtils.lerp(coreLightRef.current.intensity, 65, 0.06);
        if (leftBlueLightRef.current) leftBlueLightRef.current.intensity = 40;
        if (rightRedLightRef.current) rightRedLightRef.current.intensity = 40;
      } else if (currentStage >= 3) {
        // 3.5s+: Core pulse, mechanical lock, logo reveal hold
        camera.position.z = THREE.MathUtils.lerp(camera.position.z, 16.5, 0.03);
        if (coreLightRef.current) coreLightRef.current.intensity = 70;
      }

      // Continuous Rotation
      if (coreMeshRef.current) {
        coreMeshRef.current.rotation.y = elapsed * 0.5;
        coreMeshRef.current.rotation.x = elapsed * 0.3;
      }

      if (lockRing1Ref.current && lockRing2Ref.current) {
        lockRing1Ref.current.rotation.z = elapsed * 0.6;
        lockRing2Ref.current.rotation.z = -elapsed * 0.8;
      }

      // Particle Drift
      if (particlesRef.current) {
        const pos = particlesRef.current.geometry.attributes.position.array as Float32Array;
        for (let i = 0; i < pCount; i++) {
          pos[i * 3 + 2] += 0.08;
          if (pos[i * 3 + 2] > 25) pos[i * 3 + 2] = -20;
        }
        particlesRef.current.geometry.attributes.position.needsUpdate = true;
      }

      renderer.render(scene, camera);
    };

    render();

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
    };
  }, []);

  const handleToggleSound = (e: React.MouseEvent) => {
    e.stopPropagation();
    const next = toggleSound();
    setSoundActive(next);
  };

  return (
    <div
      ref={containerRef}
      className={`fixed inset-0 z-[9999] bg-slate-950 flex flex-col items-center justify-center overflow-hidden select-none transition-all duration-700 ${
        isExiting ? 'opacity-0 scale-105 pointer-events-none' : 'opacity-100 scale-100'
      }`}
    >
      {/* 3D WebGL Background Scene */}
      <div ref={threeContainerRef} className="absolute inset-0 w-full h-full pointer-events-none z-0" />

      {/* Cinematic Sci-Fi Vignette Mask */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/90 pointer-events-none z-10" />
      <div className="absolute inset-0 bg-radial-gradient from-transparent via-slate-950/30 to-slate-950/90 pointer-events-none z-10" />

      {/* Screen Warp Energy Flash (Scene 11 Transition) */}
      <div
        className={`absolute inset-0 bg-gradient-to-r from-cyan-400 via-white to-blue-500 pointer-events-none transition-opacity duration-300 z-50 ${
          warpFlash ? 'opacity-85' : 'opacity-0'
        }`}
      />

      {/* TOP CONTROLS: SOUND TOGGLE */}
      <div className="absolute top-6 right-6 z-40 flex items-center gap-3">
        {/* Sound Toggle */}
        <button
          onClick={handleToggleSound}
          className="p-2.5 rounded-xl border border-cyan-500/30 bg-slate-900/80 text-cyan-400 hover:text-white flex items-center gap-2 text-xs font-mono transition-all shadow-[0_0_15px_rgba(0,210,255,0.2)]"
          title="Toggle Audio"
        >
          {soundActive ? <Volume2 className="w-4 h-4 text-cyan-400 animate-pulse" /> : <VolumeX className="w-4 h-4 text-slate-500" />}
          <span className="hidden sm:inline text-[10px]">{soundActive ? 'SOUND ON' : 'SOUND OFF'}</span>
        </button>
      </div>

      {/* ===================================================================== */}
      {/* INSPRANO 2K26 METALLIC LOGO REVEAL & ANIMATED ROUND PRESS BUTTON      */}
      {/* ===================================================================== */}
      {stage >= 3 && (
        <div className="relative z-30 flex flex-col items-center justify-center text-center px-4 animate-fade-in pointer-events-none">
          {/* Institution Header Badge */}
          <a
            href="https://gcekbpatna.ac.in/"
            target="_blank"
            rel="noopener noreferrer"
            title="Government College of Engineering Kalahandi, Bhawanipatna"
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-950/90 hover:bg-cyan-950 border border-cyan-400/60 text-cyan-300 hover:text-white text-[10px] sm:text-xs font-mono uppercase tracking-[0.25em] shadow-[0_0_25px_rgba(0,210,255,0.45)] mb-3 backdrop-blur-md pointer-events-auto transition-all group/introbadge"
          >
            <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-spin" />
            <span>GOVERNMENT COLLEGE OF ENGINEERING KALAHANDI, BHAWANIPATNA</span>
          </a>

          {/* Forged Metallic INSPRANO Title with Chrome Light Sweep */}
          <div className="relative flex flex-col items-center select-none">
            <h1 className="text-6xl sm:text-8xl md:text-9xl font-black font-mech tracking-wider uppercase animate-chrome-sweep drop-shadow-[0_20px_50px_rgba(0,0,0,0.98)] text-transparent bg-clip-text bg-gradient-to-b from-white via-slate-200 to-slate-400">
              INSPRANO
            </h1>

            {/* Metallic 2K26 with Blue & Red Accents */}
            <div className="flex items-center gap-4 sm:gap-8 -mt-2 sm:-mt-4">
              <div className="h-[2px] w-12 sm:w-28 bg-gradient-to-r from-transparent via-cyan-400 to-red-500" />
              <span className="text-3xl sm:text-5xl md:text-6xl font-black font-mech tracking-[0.4em] text-cyan-400 drop-shadow-[0_0_30px_rgba(0,210,255,0.95)]">
                2K26
              </span>
              <div className="h-[2px] w-12 sm:w-28 bg-gradient-to-l from-transparent via-cyan-400 to-red-500" />
            </div>
          </div>

          {/* Tagline: ENGINEERING BEYOND LIMITS */}
          <div className="mt-4 text-xs sm:text-base font-mech font-black tracking-[0.35em] text-slate-200 uppercase flex items-center gap-3 drop-shadow-[0_4px_12px_rgba(0,0,0,0.9)]">
            <span className="w-2 h-2 rotate-45 bg-red-500 animate-ping inline-block" />
            <span>ENGINEERING BEYOND LIMITS</span>
            <span className="w-2 h-2 rotate-45 bg-cyan-400 animate-ping inline-block" />
          </div>

          {/* Dates & Location */}
          <div className="mt-3 text-xs sm:text-sm font-mono tracking-widest text-cyan-300 hud-panel px-5 py-1.5 rounded-full border border-cyan-400/50 shadow-[0_0_20px_rgba(0,210,255,0.35)]">
            8 OCTOBER — 10 OCTOBER 2026
          </div>

          {/* HIGH-TECH ANIMATED ROUND PRESS BUTTON */}
          <div className="mt-5 sm:mt-7 relative flex flex-col items-center group pointer-events-auto">
            {/* Outer Ambient Glow Aura */}
            <div className="absolute -inset-4 rounded-full bg-gradient-to-r from-cyan-500/40 via-red-500/30 to-cyan-400/40 blur-xl group-hover:blur-2xl group-hover:scale-125 transition-all duration-500 animate-pulse" />

            {/* Concentric Rotating Cyber Tech Rings */}
            <div className="absolute -inset-3.5 sm:-inset-4 rounded-full border-2 border-dashed border-cyan-400/70 animate-[spin_10s_linear_infinite] pointer-events-none" />
            <div className="absolute -inset-5 sm:-inset-6 rounded-full border border-dotted border-red-500/60 animate-[spin_14s_linear_infinite_reverse] pointer-events-none" />
            <div className="absolute inset-0 rounded-full border-2 border-cyan-300/40 animate-ping pointer-events-none opacity-40" />

            {/* Main Round Press Button Core */}
            <button
              onClick={handleTransitionToHomepage}
              aria-label="Enter INSPRANO website"
              className="relative w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-full bg-gradient-to-br from-slate-900 via-cyan-950 to-slate-950 border-2 border-cyan-400 hover:border-white flex flex-col items-center justify-center gap-1 sm:gap-1.5 shadow-[0_0_40px_rgba(0,210,255,0.85),inset_0_0_25px_rgba(0,210,255,0.5)] hover:shadow-[0_0_75px_rgba(0,210,255,1),inset_0_0_35px_rgba(0,210,255,0.8)] transition-all duration-300 transform group-hover:scale-110 active:scale-95 cursor-pointer backdrop-blur-md overflow-hidden z-10"
            >
              {/* Inner Energon Core Shimmer */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,210,255,0.4)_0%,transparent_75%)] group-hover:opacity-100 opacity-70 transition-opacity" />
              
              {/* Center Glowing Power Core Icon */}
              <div className="relative z-10 p-2 sm:p-2.5 rounded-full bg-cyan-950/90 border border-cyan-400/70 shadow-[0_0_20px_rgba(0,210,255,0.9)] group-hover:scale-110 transition-transform">
                <Power className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-cyan-300 group-hover:text-white animate-pulse" />
              </div>

              {/* Eye-catching Round Button Label */}
              <span className="relative z-10 text-[10px] sm:text-xs md:text-sm font-mech font-black uppercase tracking-widest text-cyan-300 group-hover:text-white drop-shadow-[0_0_10px_#00d2ff]">
                ENTER
              </span>
            </button>

            {/* Glowing Tech Subtitle Indicator */}
            <div className="mt-2.5 flex items-center gap-1.5 text-[10px] sm:text-xs font-mono tracking-widest text-cyan-300/90 uppercase group-hover:text-white transition-colors">
              <Zap className="w-3.5 h-3.5 text-cyan-400 animate-bounce" />
              <span>TAP ORB TO ENTER</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
