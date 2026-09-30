'use client';

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function CyberHeroCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x020617, 0.0022);

    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
    camera.position.set(0, 5, 80);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);

    // =========================================================================
    // 1. DUAL-FACTION ENERGON SPARK SYSTEM
    // =========================================================================
    const particleCount = 260;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const velocities = new Float32Array(particleCount * 3);

    const colorCyan = new THREE.Color(0x00d2ff);
    const colorBlue = new THREE.Color(0x0055ff);
    const colorRed = new THREE.Color(0xff1e42);
    const colorPurple = new THREE.Color(0xa855f7);
    const colorGold = new THREE.Color(0xfbbf24);

    for (let i = 0; i < particleCount; i++) {
      const x = (Math.random() - 0.5) * 160;
      const y = (Math.random() - 0.5) * 110;
      const z = (Math.random() - 0.5) * 100;

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      // Color assignment based on X coordinate:
      // Left = Autobot (Cyan/Blue), Right = Decepticon (Red/Purple), Center = Core Gold
      let chosenColor: THREE.Color;
      if (Math.abs(x) < 15 && Math.random() > 0.5) {
        chosenColor = colorGold;
      } else if (x < 0) {
        chosenColor = Math.random() > 0.3 ? colorCyan : colorBlue;
      } else {
        chosenColor = Math.random() > 0.3 ? colorRed : colorPurple;
      }

      colors[i * 3] = chosenColor.r;
      colors[i * 3 + 1] = chosenColor.g;
      colors[i * 3 + 2] = chosenColor.b;

      // Velocities (upward energon drift)
      velocities[i * 3] = (Math.random() - 0.5) * 0.05;
      velocities[i * 3 + 1] = 0.08 + Math.random() * 0.12;
      velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.05;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const pMaterial = new THREE.PointsMaterial({
      size: 2.8,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(geometry, pMaterial);
    scene.add(particles);

    // =========================================================================
    // 2. CYBERTRONIAN HIGHWAY GRID FLOOR
    // =========================================================================
    const gridHelper = new THREE.GridHelper(260, 48, 0x00d2ff, 0x0f2b48);
    gridHelper.position.y = -36;
    scene.add(gridHelper);

    // Secondary Decepticon Red Horizon Line
    const gridRed = new THREE.GridHelper(260, 24, 0xff1e42, 0x2b0d16);
    gridRed.position.y = -36.5;
    scene.add(gridRed);

    // =========================================================================
    // 3. CURSOR INTERACTION & ANIMATION LOOP
    // =========================================================================
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });

    let animationFrameId: number;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      // Smooth camera interpolation
      targetX += (mouseX * 14 - targetX) * 0.04;
      targetY += (-mouseY * 8 - targetY) * 0.04;

      camera.position.x = targetX;
      camera.position.y = 5 + targetY;
      camera.lookAt(0, 0, 0);

      // Particle physics: upward energon float & wrapping
      const posAttr = geometry.attributes.position as THREE.BufferAttribute;
      const posArray = posAttr.array as Float32Array;

      for (let i = 0; i < particleCount; i++) {
        posArray[i * 3 + 1] += velocities[i * 3 + 1];
        posArray[i * 3] += velocities[i * 3];

        // Wrap around top to bottom
        if (posArray[i * 3 + 1] > 60) {
          posArray[i * 3 + 1] = -50;
          posArray[i * 3] = (Math.random() - 0.5) * 160;
        }
      }
      posAttr.needsUpdate = true;

      // Scrolling grid floor effect (moving forward)
      gridHelper.position.z = (gridHelper.position.z + 0.16) % 5.4;
      gridRed.position.z = (gridRed.position.z + 0.16) % 10.8;

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!containerRef.current) return;
      const w = containerRef.current.clientWidth;
      const h = containerRef.current.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      if (containerRef.current && renderer.domElement) {
        containerRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
      geometry.dispose();
      pMaterial.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 z-0 pointer-events-none overflow-hidden"
      aria-hidden="true"
    />
  );
}
