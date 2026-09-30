'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

interface FuturisticRobotBackgroundProps {
  className?: string;
}

export default function FuturisticRobotBackground({ className = '' }: FuturisticRobotBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const hudCanvasRef = useRef<HTMLCanvasElement>(null);

  // Parallax tracking refs
  const targetMouse = useRef({ x: 0, y: 0 });
  const currentMouse = useRef({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || 'ontouchstart' in window);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile, { passive: true });

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

  // 1. THREE.JS 3D CINEMATIC ROBOT SILHOUETTE & ENVIRONMENT SYSTEM
  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    // Check reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // 1.1 Scene & Camera Setup (Deep Depth of Field)
    const scene = new THREE.Scene();
    // Dark Charcoal / Pitch Black Fog
    scene.fog = new THREE.FogExp2(0x020617, 0.022);

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 3, 30);

    // 1.2 WebGL Renderer
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: !isMobile,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1 : 1.75));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // 1.3 Controlled Cinematic Lighting
    const ambientLight = new THREE.AmbientLight(0x030712, 1.2);
    scene.add(ambientLight);

    // Left Electric Blue Rim / Key Light
    const blueSpot = new THREE.SpotLight(0x00d2ff, 45, 60, Math.PI / 4, 0.6, 1.5);
    blueSpot.position.set(-16, 15, 12);
    scene.add(blueSpot);

    // Right Deep Red Rim Light
    const redSpot = new THREE.SpotLight(0xff1e42, 35, 60, Math.PI / 4, 0.6, 1.5);
    redSpot.position.set(16, 12, 10);
    scene.add(redSpot);

    // Top Specular White Rim Light
    const whiteRim = new THREE.DirectionalLight(0xffffff, 1.4);
    whiteRim.position.set(0, 20, -10);
    scene.add(whiteRim);

    // 1.4 MATERIALS (Dark Metallic Armor with Specular Edges)
    const matArmorDark = new THREE.MeshStandardMaterial({
      color: 0x090d16,
      metalness: 0.95,
      roughness: 0.25,
    });

    const matArmorCharcoal = new THREE.MeshStandardMaterial({
      color: 0x030712,
      metalness: 0.9,
      roughness: 0.35,
    });

    const matChromeTrim = new THREE.MeshStandardMaterial({
      color: 0x64748b,
      metalness: 0.98,
      roughness: 0.15,
    });

    const matCyanGlow = new THREE.MeshStandardMaterial({
      color: 0x00ffff,
      emissive: 0x00d2ff,
      emissiveIntensity: 3.5,
      roughness: 0.1,
    });

    const matRedGlow = new THREE.MeshStandardMaterial({
      color: 0xff0033,
      emissive: 0xff1e42,
      emissiveIntensity: 2.8,
      roughness: 0.1,
    });

    // 1.5 BACKGROUND: ENORMOUS FUTURISTIC HUMANOID ROBOT SILHOUETTE (Partially hidden in darkness)
    const robotMasterGroup = new THREE.Group();
    robotMasterGroup.position.set(0, 1.5, -4); // Set back into the fog to leave center clean
    scene.add(robotMasterGroup);

    // Main Torso Armor
    const torso = new THREE.Mesh(new THREE.BoxGeometry(7.2, 8.4, 5.0), matArmorDark);
    torso.position.set(0, 4.2, 0);
    robotMasterGroup.add(torso);

    // Pectoral / Chest Plates with Inset Shadow
    const chestPlateLeft = new THREE.Mesh(new THREE.BoxGeometry(3.0, 2.8, 1.2), matArmorCharcoal);
    chestPlateLeft.position.set(-1.8, 6.0, 2.4);
    chestPlateLeft.rotation.y = -0.12;
    robotMasterGroup.add(chestPlateLeft);

    const chestPlateRight = new THREE.Mesh(new THREE.BoxGeometry(3.0, 2.8, 1.2), matArmorCharcoal);
    chestPlateRight.position.set(1.8, 6.0, 2.4);
    chestPlateRight.rotation.y = 0.12;
    robotMasterGroup.add(chestPlateRight);

    // Glowing Chest Energy Core Matrix (Slow pulsating core)
    const coreMesh = new THREE.Mesh(new THREE.OctahedronGeometry(1.2, 0), matCyanGlow);
    coreMesh.position.set(0, 4.8, 2.5);
    robotMasterGroup.add(coreMesh);

    const coreRing = new THREE.Mesh(new THREE.TorusGeometry(1.8, 0.08, 16, 48), matChromeTrim);
    coreRing.position.set(0, 4.8, 2.5);
    robotMasterGroup.add(coreRing);

    // Spine & Collar Conduits (Subtle Red & Blue Fiber Optic Conduits)
    for (let c = 0; c < 3; c++) {
      const conduitLeft = new THREE.Mesh(new THREE.BoxGeometry(0.15, 2.4, 0.15), matCyanGlow);
      conduitLeft.position.set(-0.8 - c * 0.4, 2.8 + c * 0.4, 2.55);
      robotMasterGroup.add(conduitLeft);

      const conduitRight = new THREE.Mesh(new THREE.BoxGeometry(0.15, 2.4, 0.15), matRedGlow);
      conduitRight.position.set(0.8 + c * 0.4, 2.8 + c * 0.4, 2.55);
      robotMasterGroup.add(conduitRight);
    }

    // Massive Shoulders / Pauldrons (Flanking silhouettes)
    const shoulderGeom = new THREE.BoxGeometry(3.6, 3.8, 3.6);
    const leftShoulder = new THREE.Mesh(shoulderGeom, matArmorDark);
    leftShoulder.position.set(-5.6, 7.2, 0);
    leftShoulder.rotation.z = -0.15;
    robotMasterGroup.add(leftShoulder);

    const rightShoulder = new THREE.Mesh(shoulderGeom, matArmorDark);
    rightShoulder.position.set(5.6, 7.2, 0);
    rightShoulder.rotation.z = 0.15;
    robotMasterGroup.add(rightShoulder);

    // Robot Head & Helmet (Glowing Eyes)
    const headGroup = new THREE.Group();
    headGroup.position.set(0, 9.8, 0.5);
    robotMasterGroup.add(headGroup);

    const headBase = new THREE.Mesh(new THREE.BoxGeometry(2.4, 2.6, 2.4), matArmorDark);
    headGroup.add(headBase);

    const facePlate = new THREE.Mesh(new THREE.BoxGeometry(1.8, 1.2, 0.6), matChromeTrim);
    facePlate.position.set(0, -0.4, 1.1);
    headGroup.add(facePlate);

    const helmetCrest = new THREE.Mesh(new THREE.BoxGeometry(0.5, 2.2, 1.8), matArmorCharcoal);
    helmetCrest.position.set(0, 1.3, 0);
    headGroup.add(helmetCrest);

    // Glowing Blue Optic Visor Eyes (Slow rhythmic pulse)
    const eyeGeom = new THREE.BoxGeometry(0.65, 0.22, 0.3);
    const leftEye = new THREE.Mesh(eyeGeom, matCyanGlow);
    leftEye.position.set(-0.55, 0.35, 1.2);
    headGroup.add(leftEye);

    const rightEye = new THREE.Mesh(eyeGeom, matCyanGlow);
    rightEye.position.set(0.55, 0.35, 1.2);
    headGroup.add(rightEye);

    // 1.6 MIDGROUND: DARK ROBOTIC GANTRY STRUCTURES & COLUMNS
    const gantryGroup = new THREE.Group();
    scene.add(gantryGroup);

    for (let i = 0; i < 4; i++) {
      const isLeft = i % 2 === 0;
      const depthZ = -6 + Math.floor(i / 2) * 12;
      const posX = isLeft ? -18 : 18;

      const column = new THREE.Mesh(new THREE.BoxGeometry(2.8, 38, 2.8), matArmorCharcoal);
      column.position.set(posX, 10, depthZ);
      gantryGroup.add(column);

      // Neon Conduit Line on Column
      const lineGlow = new THREE.Mesh(
        new THREE.BoxGeometry(0.1, 38, 0.1),
        isLeft ? matCyanGlow : matRedGlow
      );
      lineGlow.position.set(isLeft ? posX + 1.4 : posX - 1.4, 10, depthZ);
      gantryGroup.add(lineGlow);
    }

    // 1.7 CYBER HIGHWAY PERSPECTIVE GROUND GRID
    const floorGrid = new THREE.GridHelper(160, 48, 0x00d2ff, 0x090d16);
    floorGrid.position.y = -6;
    scene.add(floorGrid);

    // 1.8 FOREGROUND: FLOATING METALLIC PARTICLES & SPARKS
    const particleCount = isMobile ? 40 : 120;
    const pGeom = new THREE.BufferGeometry();
    const pPos = new Float32Array(particleCount * 3);
    const pVel = new Float32Array(particleCount * 3);
    const pColors = new Float32Array(particleCount * 3);

    const colorCyan = new THREE.Color(0x00d2ff);
    const colorWhite = new THREE.Color(0xffffff);
    const colorRed = new THREE.Color(0xff1e42);

    for (let p = 0; p < particleCount; p++) {
      pPos[p * 3] = (Math.random() - 0.5) * 60;
      pPos[p * 3 + 1] = -5 + Math.random() * 30;
      pPos[p * 3 + 2] = -10 + Math.random() * 40;

      pVel[p * 3] = (Math.random() - 0.5) * 0.02;
      pVel[p * 3 + 1] = 0.02 + Math.random() * 0.05; // upward floating
      pVel[p * 3 + 2] = (Math.random() - 0.5) * 0.02;

      const c = Math.random() > 0.45 ? colorCyan : Math.random() > 0.6 ? colorWhite : colorRed;
      pColors[p * 3] = c.r;
      pColors[p * 3 + 1] = c.g;
      pColors[p * 3 + 2] = c.b;
    }

    pGeom.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
    pGeom.setAttribute('color', new THREE.BufferAttribute(pColors, 3));

    const pMat = new THREE.PointsMaterial({
      size: isMobile ? 0.28 : 0.38,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
    });
    const particles = new THREE.Points(pGeom, pMat);
    scene.add(particles);

    // Handle Window Resize
    const handleResize = () => {
      if (!container || !renderer || !camera) return;
      const newW = container.clientWidth || window.innerWidth;
      const newH = container.clientHeight || window.innerHeight;
      camera.aspect = newW / newH;
      camera.updateProjectionMatrix();
      renderer.setSize(newW, newH);
    };
    window.addEventListener('resize', handleResize);

    // 1.9 ANIMATION & PARALLAX RENDER LOOP
    let animId: number;
    let clock = new THREE.Clock();

    const renderLoop = () => {
      animId = requestAnimationFrame(renderLoop);
      const elapsed = clock.getElapsedTime();

      // Smooth mouse damping
      currentMouse.current.x += (targetMouse.current.x - currentMouse.current.x) * 0.05;
      currentMouse.current.y += (targetMouse.current.y - currentMouse.current.y) * 0.05;

      const mx = currentMouse.current.x;
      const my = currentMouse.current.y;

      if (!prefersReducedMotion) {
        // Robot Slow Breathing & Idle Hover
        robotMasterGroup.position.y = 1.5 + Math.sin(elapsed * 1.2) * 0.18;
        robotMasterGroup.rotation.y = Math.sin(elapsed * 0.6) * 0.03 + mx * 0.12;
        robotMasterGroup.rotation.x = -my * 0.08;

        // Head subtle tracking
        headGroup.rotation.y = mx * 0.25 + Math.sin(elapsed * 1.5) * 0.02;
        headGroup.rotation.x = -my * 0.15;

        // Chest Core Pulse (Slow, Elegant)
        const coreScale = 1 + Math.sin(elapsed * 2.2) * 0.12;
        coreMesh.scale.set(coreScale, coreScale, coreScale);
        coreMesh.rotation.y += 0.015;
        coreMesh.rotation.x += 0.01;
        coreRing.rotation.z -= 0.02;

        // Optic Visor & Core Intensity Pulse
        matCyanGlow.emissiveIntensity = 3.2 + Math.sin(elapsed * 2.2) * 1.2;
        matRedGlow.emissiveIntensity = 2.4 + Math.cos(elapsed * 1.8) * 0.8;

        // Midground Gantry Parallax
        gantryGroup.position.x = -mx * 2.5;
        gantryGroup.position.y = my * 1.5;

        // Foreground Particles Drift & Elevate
        const posArray = pGeom.attributes.position.array as Float32Array;
        for (let p = 0; p < particleCount; p++) {
          posArray[p * 3 + 1] += pVel[p * 3 + 1];
          posArray[p * 3] += pVel[p * 3] + mx * 0.01;

          if (posArray[p * 3 + 1] > 25) {
            posArray[p * 3 + 1] = -5;
            posArray[p * 3] = (Math.random() - 0.5) * 60;
          }
        }
        pGeom.attributes.position.needsUpdate = true;
      }

      // Camera Parallax & Scroll Depth
      camera.position.x = mx * 1.8;
      camera.position.y = 3 - my * 1.2;

      renderer.render(scene, camera);
    };

    renderLoop();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
    };
  }, [isMobile]);

  // 2. HUD & HOLOGRAPHIC OVERLAY CANVAS (Subtle 2D Holograms & Faint Energy Streaks)
  useEffect(() => {
    const hudCanvas = hudCanvasRef.current;
    if (!hudCanvas) return;
    const ctx = hudCanvas.getContext('2d');
    if (!ctx) return;

    let hudAnimId: number;
    let w = (hudCanvas.width = window.innerWidth);
    let h = (hudCanvas.height = window.innerHeight);

    const handleResize = () => {
      if (!hudCanvas) return;
      w = hudCanvas.width = window.innerWidth;
      h = hudCanvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Energy line particles
    const lines = Array.from({ length: 6 }, () => ({
      x: Math.random() * w,
      y: h * 0.5 + Math.random() * h * 0.5,
      length: 80 + Math.random() * 140,
      speed: 1 + Math.random() * 2,
      opacity: 0.15 + Math.random() * 0.25,
      isRed: Math.random() > 0.6,
    }));

    let radarAngle = 0;

    const renderHud = () => {
      hudAnimId = requestAnimationFrame(renderHud);
      ctx.clearRect(0, 0, w, h);

      radarAngle += 0.008;

      // 2.1 Subtle Holographic Radar Ring in Upper Corner (Left & Right)
      if (!isMobile) {
        // Left Radar Arc
        ctx.save();
        ctx.translate(w * 0.1, h * 0.18);
        ctx.strokeStyle = 'rgba(0, 210, 255, 0.18)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(0, 0, 48, 0, Math.PI * 2);
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(0, 0, 32, radarAngle, radarAngle + Math.PI * 0.8);
        ctx.strokeStyle = 'rgba(0, 210, 255, 0.4)';
        ctx.stroke();
        ctx.restore();

        // Right HUD Telemetry Box
        ctx.save();
        ctx.translate(w * 0.9, h * 0.22);
        ctx.strokeStyle = 'rgba(255, 30, 66, 0.22)';
        ctx.strokeRect(-40, -25, 80, 50);
        ctx.fillStyle = 'rgba(255, 30, 66, 0.4)';
        ctx.font = '9px monospace';
        ctx.fillText('CORE: 98.4%', -35, 0);
        ctx.restore();
      }

      // 2.2 Faint Perspective Energy Lines
      lines.forEach((line) => {
        line.y -= line.speed * 0.5;
        if (line.y < h * 0.45) {
          line.y = h + 10;
          line.x = Math.random() * w;
        }

        ctx.beginPath();
        ctx.moveTo(line.x, line.y);
        ctx.lineTo(line.x + (line.x > w * 0.5 ? 40 : -40), line.y + line.length);
        ctx.strokeStyle = line.isRed
          ? `rgba(255, 30, 66, ${line.opacity})`
          : `rgba(0, 210, 255, ${line.opacity})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      });
    };

    renderHud();

    return () => {
      cancelAnimationFrame(hudAnimId);
      window.removeEventListener('resize', handleResize);
    };
  }, [isMobile]);

  // Depth Parallax derived values
  const mouseX = currentMouse.current.x;
  const mouseY = currentMouse.current.y;

  return (
    <div
      className={`fixed inset-0 pointer-events-none select-none z-0 overflow-hidden bg-slate-950 ${className}`}
      aria-hidden="true"
    >
      {/* 1. Deep 3D Robot & Gantry WebGL Viewport */}
      <div ref={containerRef} className="absolute inset-0 w-full h-full pointer-events-none" />

      {/* 2. 2D HUD Telemetry & Faint Energy Streaks Canvas */}
      <canvas ref={hudCanvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />

      {/* 3. Controlled Atmospheric Lighting Overlays */}
      {/* Left Electric Blue Glow */}
      <div
        className="absolute top-0 bottom-0 left-0 w-1/3 bg-gradient-to-r from-cyan-950/30 via-cyan-950/10 to-transparent pointer-events-none transition-transform duration-700 ease-out"
        style={{ transform: `translate3d(${mouseX * -8}px, 0px, 0px)` }}
      />

      {/* Right Deep Red Glow */}
      <div
        className="absolute top-0 bottom-0 right-0 w-1/3 bg-gradient-to-l from-red-950/30 via-red-950/10 to-transparent pointer-events-none transition-transform duration-700 ease-out"
        style={{ transform: `translate3d(${mouseX * 8}px, 0px, 0px)` }}
      />

      {/* 4. Center Dark Negative Space & Readability Scrims */}
      {/* Center Dark Radial Scrim ensuring 100% crisp text readability */}
      <div className="absolute inset-0 bg-radial-gradient from-slate-950/40 via-slate-950/75 to-slate-950 pointer-events-none" />

      {/* Top & Bottom Cinematic Edge Vignettes */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950/90 via-transparent to-slate-950 pointer-events-none" />
    </div>
  );
}
