'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Shield, Zap, Sparkles, RefreshCw, Eye, Crosshair, Volume2 } from 'lucide-react';
import { playTransformSound, playLaserCharge, playOpticPulse, playMechArmorShift } from '@/lib/soundFx';

interface Transformer3DModelProps {
  faction?: 'autobot' | 'decepticon' | 'cybertron';
  onFactionChange?: (faction: 'autobot' | 'decepticon' | 'cybertron') => void;
}

export default function Transformer3DModel({
  faction = 'cybertron',
  onFactionChange,
}: Transformer3DModelProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeMode, setActiveMode] = useState<'prime' | 'megatron' | 'overdrive'>('prime');
  const [isFiring, setIsFiring] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [stats, setStats] = useState({
    energonPower: 98,
    shieldIntegrity: 100,
    coreTemp: '3,450 K',
    firingRate: '850 RPM',
  });

  // Three.js scene references
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const transformerGroupRef = useRef<THREE.Group | null>(null);
  const headRef = useRef<THREE.Group | null>(null);
  const leftArmRef = useRef<THREE.Group | null>(null);
  const rightArmRef = useRef<THREE.Group | null>(null);
  const coreMatrixRef = useRef<THREE.Mesh | null>(null);
  const ring1Ref = useRef<THREE.Mesh | null>(null);
  const ring2Ref = useRef<THREE.Mesh | null>(null);
  const leftEyeRef = useRef<THREE.Mesh | null>(null);
  const rightEyeRef = useRef<THREE.Mesh | null>(null);
  const wingsGroupRef = useRef<THREE.Group | null>(null);
  const laserBeamRef = useRef<THREE.Mesh | null>(null);
  const thrusterParticlesRef = useRef<THREE.Points | null>(null);

  const mousePos = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });
  const isDragging = useRef(false);
  const previousMousePosition = useRef({ x: 0, y: 0 });
  const manualRotation = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    const width = container.clientWidth || 600;
    const height = container.clientHeight || 500;

    // 1. Scene & Camera
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 2, 22);

    // 2. High-Performance WebGL Renderer
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.3;
    container.innerHTML = '';
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // 3. Dynamic Studio Lighting
    const ambientLight = new THREE.AmbientLight(0x0a192f, 2.5);
    scene.add(ambientLight);

    const keyLightCyan = new THREE.PointLight(0x00d2ff, 80, 50);
    keyLightCyan.position.set(-10, 8, 12);
    scene.add(keyLightCyan);

    const rimLightRed = new THREE.PointLight(0xff1e42, 70, 50);
    rimLightRed.position.set(10, 6, 10);
    scene.add(rimLightRed);

    const backRimLight = new THREE.DirectionalLight(0xffffff, 2.5);
    backRimLight.position.set(0, 15, -15);
    scene.add(backRimLight);

    // 4. TRANSFORMER 3D MESH HIERARCHY
    const transformer = new THREE.Group();
    transformerGroupRef.current = transformer;
    scene.add(transformer);

    // Materials
    const metalDark = new THREE.MeshStandardMaterial({
      color: 0x111827,
      metalness: 0.95,
      roughness: 0.25,
    });

    const metalSilver = new THREE.MeshStandardMaterial({
      color: 0xe2e8f0,
      metalness: 0.98,
      roughness: 0.15,
    });

    const metalGold = new THREE.MeshStandardMaterial({
      color: 0xf59e0b,
      metalness: 0.9,
      roughness: 0.2,
    });

    const armorAutobotBlue = new THREE.MeshStandardMaterial({
      color: 0x0284c7,
      metalness: 0.85,
      roughness: 0.3,
    });

    const armorAutobotRed = new THREE.MeshStandardMaterial({
      color: 0xdc2626,
      metalness: 0.85,
      roughness: 0.3,
    });

    const energonCyanEmissive = new THREE.MeshStandardMaterial({
      color: 0x00ffff,
      emissive: 0x00d2ff,
      emissiveIntensity: 3.5,
      roughness: 0.1,
    });

    const energonRedEmissive = new THREE.MeshStandardMaterial({
      color: 0xff0033,
      emissive: 0xff1e42,
      emissiveIntensity: 3.5,
      roughness: 0.1,
    });

    // 4.1 TORSO & CHEST CAVITY
    const torsoGroup = new THREE.Group();
    transformer.add(torsoGroup);

    // Main chest plate
    const chestGeom = new THREE.BoxGeometry(4.2, 4.8, 3.2);
    const chestMesh = new THREE.Mesh(chestGeom, armorAutobotRed);
    chestMesh.position.y = 1.5;
    torsoGroup.add(chestMesh);

    // Upper chest windshield pectoral plates
    const windowGeom = new THREE.BoxGeometry(1.6, 1.4, 0.4);
    const windowMat = new THREE.MeshStandardMaterial({
      color: 0x0284c7,
      metalness: 0.95,
      roughness: 0.1,
      emissive: 0x0284c7,
      emissiveIntensity: 0.6,
    });

    const leftWindow = new THREE.Mesh(windowGeom, windowMat);
    leftWindow.position.set(-1.1, 2.5, 1.6);
    leftWindow.rotation.y = -0.15;
    torsoGroup.add(leftWindow);

    const rightWindow = new THREE.Mesh(windowGeom, windowMat);
    rightWindow.position.set(1.1, 2.5, 1.6);
    rightWindow.rotation.y = 0.15;
    torsoGroup.add(rightWindow);

    // Radiator Grille (Optimus prime signature abdomen grille)
    for (let g = 0; g < 4; g++) {
      const grilleGeom = new THREE.BoxGeometry(2.4, 0.18, 0.25);
      const grilleMesh = new THREE.Mesh(grilleGeom, metalSilver);
      grilleMesh.position.set(0, 0.3 + g * 0.4, 1.6);
      torsoGroup.add(grilleMesh);
    }

    // Energon Core Matrix of Leadership (Glowing Center Diamond)
    const coreGeom = new THREE.OctahedronGeometry(0.7, 0);
    const coreMatrix = new THREE.Mesh(coreGeom, energonCyanEmissive);
    coreMatrix.position.set(0, 1.6, 1.3);
    coreMatrixRef.current = coreMatrix;
    torsoGroup.add(coreMatrix);

    // Core Rotating Gyro Rings
    const ringGeom = new THREE.TorusGeometry(1.1, 0.05, 16, 40);
    const ring1 = new THREE.Mesh(ringGeom, metalGold);
    ring1.position.set(0, 1.6, 1.3);
    ring1Ref.current = ring1;
    torsoGroup.add(ring1);

    const ring2 = new THREE.Mesh(ringGeom, metalSilver);
    ring2.position.set(0, 1.6, 1.3);
    ring2Ref.current = ring2;
    torsoGroup.add(ring2);

    // Waist / Pelvis
    const pelvisGeom = new THREE.BoxGeometry(3.6, 1.2, 2.6);
    const pelvisMesh = new THREE.Mesh(pelvisGeom, metalDark);
    pelvisMesh.position.y = -1.4;
    torsoGroup.add(pelvisMesh);

    // 4.2 HEAD & HELMET (Animated with Mouse Tracking)
    const headGroup = new THREE.Group();
    headGroup.position.set(0, 4.4, 0.2);
    headRef.current = headGroup;
    torsoGroup.add(headGroup);

    // Head base
    const headGeom = new THREE.BoxGeometry(1.4, 1.6, 1.4);
    const headMesh = new THREE.Mesh(headGeom, armorAutobotBlue);
    headGroup.add(headMesh);

    // Optimus Battle Faceplate / Mouthguard
    const faceplateGeom = new THREE.BoxGeometry(1.1, 0.7, 0.4);
    const faceplateMesh = new THREE.Mesh(faceplateGeom, metalSilver);
    faceplateMesh.position.set(0, -0.3, 0.65);
    headGroup.add(faceplateMesh);

    // Helmet Crest (Center Spire)
    const crestGeom = new THREE.BoxGeometry(0.35, 1.2, 1.2);
    const crestMesh = new THREE.Mesh(crestGeom, armorAutobotBlue);
    crestMesh.position.set(0, 0.8, 0);
    headGroup.add(crestMesh);

    // Helmet Side Antennae / Audio Sensors
    const antennaGeom = new THREE.CylinderGeometry(0.1, 0.15, 1.8, 8);
    const leftAntenna = new THREE.Mesh(antennaGeom, metalSilver);
    leftAntenna.position.set(-0.85, 0.6, 0);
    leftAntenna.rotation.z = -0.15;
    headGroup.add(leftAntenna);

    const rightAntenna = new THREE.Mesh(antennaGeom, metalSilver);
    rightAntenna.position.set(0.85, 0.6, 0);
    rightAntenna.rotation.z = 0.15;
    headGroup.add(rightAntenna);

    // Glowing Optical Visor Eyes
    const eyeGeom = new THREE.BoxGeometry(0.38, 0.18, 0.2);
    const leftEye = new THREE.Mesh(eyeGeom, energonCyanEmissive);
    leftEye.position.set(-0.32, 0.2, 0.72);
    leftEyeRef.current = leftEye;
    headGroup.add(leftEye);

    const rightEye = new THREE.Mesh(eyeGeom, energonCyanEmissive);
    rightEye.position.set(0.32, 0.2, 0.72);
    rightEyeRef.current = rightEye;
    headGroup.add(rightEye);

    // 4.3 SHOULDERS & ARMS (Ion Cannon & Shield)
    // Left Shoulder & Arm
    const leftArmGroup = new THREE.Group();
    leftArmGroup.position.set(-2.8, 3.2, 0);
    leftArmRef.current = leftArmGroup;
    torsoGroup.add(leftArmGroup);

    const shoulderGeom = new THREE.BoxGeometry(1.6, 1.8, 1.8);
    const leftShoulder = new THREE.Mesh(shoulderGeom, armorAutobotRed);
    leftArmGroup.add(leftShoulder);

    // Left Bicep & Forearm
    const bicepGeom = new THREE.BoxGeometry(0.9, 1.8, 0.9);
    const leftBicep = new THREE.Mesh(bicepGeom, metalSilver);
    leftBicep.position.y = -1.5;
    leftArmGroup.add(leftBicep);

    const forearmGeom = new THREE.BoxGeometry(1.3, 2.2, 1.3);
    const leftForearm = new THREE.Mesh(forearmGeom, armorAutobotBlue);
    leftForearm.position.y = -3.2;
    leftArmGroup.add(leftForearm);

    // Autobot Energon Blade attached to Left Forearm
    const bladeGeom = new THREE.BoxGeometry(0.1, 3.8, 0.6);
    const bladeMesh = new THREE.Mesh(bladeGeom, energonCyanEmissive);
    bladeMesh.position.set(-0.6, -3.8, 0.5);
    bladeMesh.rotation.x = 0.2;
    leftArmGroup.add(bladeMesh);

    // Right Shoulder & Ion Blaster Arm
    const rightArmGroup = new THREE.Group();
    rightArmGroup.position.set(2.8, 3.2, 0);
    rightArmRef.current = rightArmGroup;
    torsoGroup.add(rightArmGroup);

    const rightShoulder = new THREE.Mesh(shoulderGeom, armorAutobotRed);
    rightArmGroup.add(rightShoulder);

    const rightBicep = new THREE.Mesh(bicepGeom, metalSilver);
    rightBicep.position.y = -1.5;
    rightArmGroup.add(rightBicep);

    const rightForearm = new THREE.Mesh(forearmGeom, armorAutobotBlue);
    rightForearm.position.y = -3.2;
    rightArmGroup.add(rightForearm);

    // Massive Ion Blaster Cannon Barrel
    const blasterBase = new THREE.BoxGeometry(1.2, 1.4, 2.5);
    const blasterMesh = new THREE.Mesh(blasterBase, metalDark);
    blasterMesh.position.set(0.4, -3.2, 1.4);
    rightArmGroup.add(blasterMesh);

    const barrelGeom = new THREE.CylinderGeometry(0.35, 0.45, 3.2, 16);
    const barrelMesh = new THREE.Mesh(barrelGeom, metalSilver);
    barrelMesh.rotation.x = Math.PI / 2;
    barrelMesh.position.set(0.4, -3.2, 3.2);
    rightArmGroup.add(barrelMesh);

    const muzzleGeom = new THREE.CylinderGeometry(0.48, 0.48, 0.6, 16);
    const muzzleMesh = new THREE.Mesh(muzzleGeom, energonCyanEmissive);
    muzzleMesh.rotation.x = Math.PI / 2;
    muzzleMesh.position.set(0.4, -3.2, 4.8);
    rightArmGroup.add(muzzleMesh);

    // Laser Beam Projectile Mesh (Hidden until firing)
    const laserGeom = new THREE.CylinderGeometry(0.12, 0.3, 24, 12);
    const laserMat = new THREE.MeshBasicMaterial({
      color: 0x00ffff,
      transparent: true,
      opacity: 0,
    });
    const laserBeam = new THREE.Mesh(laserGeom, laserMat);
    laserBeam.rotation.x = Math.PI / 2;
    laserBeam.position.set(0.4, -3.2, 16);
    laserBeamRef.current = laserBeam;
    rightArmGroup.add(laserBeam);

    // 4.4 LEGS & HYDRAULICS
    const legsGroup = new THREE.Group();
    legsGroup.position.y = -1.8;
    torsoGroup.add(legsGroup);

    // Left Leg
    const thighGeom = new THREE.BoxGeometry(1.2, 2.8, 1.2);
    const leftThigh = new THREE.Mesh(thighGeom, metalSilver);
    leftThigh.position.set(-1.3, -1.4, 0);
    legsGroup.add(leftThigh);

    const shinGeom = new THREE.BoxGeometry(1.7, 3.6, 1.8);
    const leftShin = new THREE.Mesh(shinGeom, armorAutobotBlue);
    leftShin.position.set(-1.3, -4.2, 0.2);
    legsGroup.add(leftShin);

    const footGeom = new THREE.BoxGeometry(1.8, 0.8, 2.8);
    const leftFoot = new THREE.Mesh(footGeom, metalDark);
    leftFoot.position.set(-1.3, -6.1, 0.7);
    legsGroup.add(leftFoot);

    // Right Leg
    const rightThigh = new THREE.Mesh(thighGeom, metalSilver);
    rightThigh.position.set(1.3, -1.4, 0);
    legsGroup.add(rightThigh);

    const rightShin = new THREE.Mesh(shinGeom, armorAutobotBlue);
    rightShin.position.set(1.3, -4.2, 0.2);
    legsGroup.add(rightShin);

    const rightFoot = new THREE.Mesh(footGeom, metalDark);
    rightFoot.position.set(1.3, -6.1, 0.7);
    legsGroup.add(rightFoot);

    // 4.5 CYBERTRONIAN ENERGON WINGS / THRUSTER BACKPACK
    const wingsGroup = new THREE.Group();
    wingsGroup.position.set(0, 2.2, -1.6);
    wingsGroupRef.current = wingsGroup;
    torsoGroup.add(wingsGroup);

    for (let w = 0; w < 2; w++) {
      const isLeftWing = w === 0;
      const wingPlate = new THREE.BoxGeometry(0.2, 4.5, 1.8);
      const wingMesh = new THREE.Mesh(wingPlate, armorAutobotBlue);
      wingMesh.position.set(isLeftWing ? -2.2 : 2.2, 1.2, 0);
      wingMesh.rotation.z = isLeftWing ? 0.35 : -0.35;
      wingMesh.rotation.y = isLeftWing ? -0.2 : 0.2;
      wingsGroup.add(wingMesh);

      // Glowing Wing Edge Conduit
      const wingConduit = new THREE.BoxGeometry(0.25, 4.6, 0.2);
      const conduitMesh = new THREE.Mesh(wingConduit, energonCyanEmissive);
      conduitMesh.position.set(isLeftWing ? -2.8 : 2.8, 1.2, 0.8);
      conduitMesh.rotation.z = isLeftWing ? 0.35 : -0.35;
      wingsGroup.add(conduitMesh);
    }

    // 4.6 THRUSTER JET PARTICLES
    const thrusterCount = 45;
    const tGeom = new THREE.BufferGeometry();
    const tPos = new Float32Array(thrusterCount * 3);
    for (let p = 0; p < thrusterCount; p++) {
      tPos[p * 3] = (Math.random() - 0.5) * 1.5;
      tPos[p * 3 + 1] = -1 - Math.random() * 3;
      tPos[p * 3 + 2] = -1.8 - Math.random() * 0.8;
    }
    tGeom.setAttribute('position', new THREE.BufferAttribute(tPos, 3));
    const tMat = new THREE.PointsMaterial({
      color: 0x00d2ff,
      size: 0.4,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
    });
    const thrusterPoints = new THREE.Points(tGeom, tMat);
    thrusterParticlesRef.current = thrusterPoints;
    torsoGroup.add(thrusterPoints);

    // Resize handler
    const handleResize = () => {
      if (!container || !renderer || !camera) return;
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };
    window.addEventListener('resize', handleResize);

    // Mouse movement inside container
    const handlePointerMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
      mousePos.current.targetX = x;
      mousePos.current.targetY = y;

      if (isDragging.current) {
        const deltaX = e.clientX - previousMousePosition.current.x;
        const deltaY = e.clientY - previousMousePosition.current.y;
        manualRotation.current.y += deltaX * 0.008;
        manualRotation.current.x += deltaY * 0.008;
        manualRotation.current.x = Math.max(-0.4, Math.min(0.4, manualRotation.current.x));
      }
      previousMousePosition.current = { x: e.clientX, y: e.clientY };
    };

    const handlePointerDown = (e: MouseEvent) => {
      isDragging.current = true;
      previousMousePosition.current = { x: e.clientX, y: e.clientY };
    };

    const handlePointerUp = () => {
      isDragging.current = false;
    };

    container.addEventListener('mousemove', handlePointerMove);
    container.addEventListener('mousedown', handlePointerDown);
    window.addEventListener('mouseup', handlePointerUp);

    // 5. ANIMATION & RENDER LOOP
    let animationId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth mouse interpolation
      mousePos.current.x += (mousePos.current.targetX - mousePos.current.x) * 0.08;
      mousePos.current.y += (mousePos.current.targetY - mousePos.current.y) * 0.08;

      const mx = mousePos.current.x;
      const my = mousePos.current.y;

      // 1. Transformer Hover & Dynamic Sway
      if (transformerGroupRef.current) {
        transformerGroupRef.current.position.y = Math.sin(elapsedTime * 2) * 0.35 + 0.2;
        transformerGroupRef.current.rotation.y =
          manualRotation.current.y + Math.sin(elapsedTime * 0.8) * 0.08 + mx * 0.45;
        transformerGroupRef.current.rotation.x =
          manualRotation.current.x + Math.sin(elapsedTime * 1.2) * 0.04 - my * 0.25;
        transformerGroupRef.current.rotation.z = Math.cos(elapsedTime * 1.5) * 0.02 - mx * 0.08;
      }

      // 2. Head Tracks Cursor in 3D Space
      if (headRef.current) {
        headRef.current.rotation.y = mx * 0.75 + Math.sin(elapsedTime * 3) * 0.03;
        headRef.current.rotation.x = -my * 0.5;
      }

      // 3. Left Arm Blade Idle Stance
      if (leftArmRef.current) {
        leftArmRef.current.rotation.x = Math.sin(elapsedTime * 1.6) * 0.12 - 0.2;
        leftArmRef.current.rotation.z = Math.cos(elapsedTime * 1.2) * 0.06 - 0.15;
      }

      // 4. Right Arm Blaster Aiming
      if (rightArmRef.current) {
        rightArmRef.current.rotation.x = -my * 0.4 - 0.3 + Math.sin(elapsedTime * 2.2) * 0.06;
        rightArmRef.current.rotation.y = mx * 0.35;
      }

      // 5. Energon Matrix Core Rotating Rings
      if (coreMatrixRef.current) {
        coreMatrixRef.current.rotation.y += 0.03;
        coreMatrixRef.current.rotation.x += 0.02;
        const scalePulse = 1 + Math.sin(elapsedTime * 6) * 0.12;
        coreMatrixRef.current.scale.set(scalePulse, scalePulse, scalePulse);
      }

      if (ring1Ref.current) {
        ring1Ref.current.rotation.x += 0.025;
        ring1Ref.current.rotation.y += 0.015;
      }

      if (ring2Ref.current) {
        ring2Ref.current.rotation.y -= 0.035;
        ring2Ref.current.rotation.z += 0.02;
      }

      // 6. Wings Flapping Thruster Expansion
      if (wingsGroupRef.current) {
        wingsGroupRef.current.rotation.y = Math.sin(elapsedTime * 1.5) * 0.08;
      }

      // 7. Dynamic Thruster Particle Jet Burn
      if (thrusterParticlesRef.current) {
        const positions = thrusterParticlesRef.current.geometry.attributes.position.array as Float32Array;
        for (let i = 0; i < thrusterCount; i++) {
          positions[i * 3 + 1] -= 0.15; // move downwards fast
          if (positions[i * 3 + 1] < -6) {
            positions[i * 3 + 1] = -1;
            positions[i * 3] = (Math.random() - 0.5) * 1.2;
            positions[i * 3 + 2] = -1.8 - Math.random() * 0.5;
          }
        }
        thrusterParticlesRef.current.geometry.attributes.position.needsUpdate = true;
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
      container.removeEventListener('mousemove', handlePointerMove);
      container.removeEventListener('mousedown', handlePointerDown);
      window.removeEventListener('mouseup', handlePointerUp);
      renderer.dispose();
    };
  }, []);

  // Mode Switch Handler
  const handleModeSwitch = (mode: 'prime' | 'megatron' | 'overdrive') => {
    setActiveMode(mode);
    playTransformSound();
    playLaserCharge();

    if (!sceneRef.current) return;

    // Change Core & Eye Colors based on mode
    let targetColor = 0x00d2ff;
    if (mode === 'megatron') targetColor = 0xff1e42;
    if (mode === 'overdrive') targetColor = 0xf59e0b;

    if (coreMatrixRef.current && (coreMatrixRef.current.material as any)) {
      (coreMatrixRef.current.material as any).emissive.setHex(targetColor);
    }
    if (leftEyeRef.current && (leftEyeRef.current.material as any)) {
      (leftEyeRef.current.material as any).emissive.setHex(targetColor);
    }
    if (rightEyeRef.current && (rightEyeRef.current.material as any)) {
      (rightEyeRef.current.material as any).emissive.setHex(targetColor);
    }

    if (onFactionChange) {
      onFactionChange(mode === 'megatron' ? 'decepticon' : 'autobot');
    }
  };

  // Interactive Ion Blaster Fire Trigger
  const handleFireCannon = () => {
    setIsFiring(true);
    playLaserCharge();
    playOpticPulse();

    if (laserBeamRef.current) {
      const mat = laserBeamRef.current.material as THREE.MeshBasicMaterial;
      mat.opacity = 0.95;
      setTimeout(() => {
        mat.opacity = 0;
        setIsFiring(false);
      }, 350);
    }

    // Shake camera effect or recoil
    if (transformerGroupRef.current) {
      transformerGroupRef.current.position.z -= 0.6;
      setTimeout(() => {
        if (transformerGroupRef.current) transformerGroupRef.current.position.z = 0;
      }, 200);
    }
  };

  return (
    <div className="relative w-full max-w-4xl mx-auto my-6 rounded-3xl border-2 border-cyan-500/40 bg-slate-950/85 backdrop-blur-2xl p-4 sm:p-6 shadow-[0_0_60px_rgba(0,210,255,0.3)] overflow-hidden">
      {/* Top Cockpit HUD Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-cyan-500/20 pb-3 mb-2">
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 rounded-full bg-cyan-400 animate-ping" />
          <div>
            <span className="text-xs font-mono tracking-widest text-cyan-400 font-bold uppercase block">
              3D CYBERTRONIAN MECH COMBAT CHASSIS
            </span>
            <span className="text-[10px] font-mono text-slate-400">
              OPTIMUS PRIME MK-VI // REAL-TIME 3D RIGGED MODEL
            </span>
          </div>
        </div>

        {/* Faction Mode Controls */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-900/90 border border-cyan-500/30">
          <button
            onClick={() => handleModeSwitch('prime')}
            className={`px-3 py-1 rounded-lg text-xs font-mono font-bold transition-all ${
              activeMode === 'prime'
                ? 'bg-cyan-500 text-black shadow-[0_0_12px_#00d2ff]'
                : 'text-cyan-400 hover:text-white'
            }`}
          >
            AUTOBOT
          </button>
          <button
            onClick={() => handleModeSwitch('megatron')}
            className={`px-3 py-1 rounded-lg text-xs font-mono font-bold transition-all ${
              activeMode === 'megatron'
                ? 'bg-red-600 text-white shadow-[0_0_12px_#ff1e42]'
                : 'text-red-400 hover:text-white'
            }`}
          >
            DECEPTICON
          </button>
          <button
            onClick={() => handleModeSwitch('overdrive')}
            className={`px-3 py-1 rounded-lg text-xs font-mono font-bold transition-all ${
              activeMode === 'overdrive'
                ? 'bg-amber-500 text-black shadow-[0_0_12px_#f59e0b]'
                : 'text-amber-400 hover:text-white'
            }`}
          >
            ALL-SPARK
          </button>
        </div>
      </div>

      {/* 3D WebGL Canvas Viewport */}
      <div
        className="relative w-full h-[360px] sm:h-[450px] md:h-[500px] cursor-grab active:cursor-grabbing rounded-2xl overflow-hidden bg-gradient-to-b from-slate-950/60 via-cyan-950/20 to-slate-950/80 border border-cyan-500/20 group"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div ref={containerRef} className="w-full h-full" />

        {/* Interactive Aim Crosshair Overlay */}
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
          <div className="w-24 h-24 rounded-full border border-cyan-400/20 border-dashed animate-spin flex items-center justify-center opacity-40 group-hover:opacity-80 transition-opacity">
            <div className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
          </div>
        </div>

        {/* Left Telemetry Float HUD */}
        <div className="absolute top-4 left-4 pointer-events-none flex flex-col gap-2 font-mono text-[10px] text-cyan-300 bg-slate-950/80 backdrop-blur-md p-3 rounded-xl border border-cyan-500/30">
          <div className="flex items-center justify-between gap-4">
            <span className="text-slate-400">ENERGON MATRIX:</span>
            <span className="font-bold text-cyan-400">{stats.energonPower}%</span>
          </div>
          <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
            <div className="bg-cyan-400 h-full w-[98%] animate-pulse" />
          </div>
          <div className="flex items-center justify-between gap-4">
            <span className="text-slate-400">SHIELD INTEGRITY:</span>
            <span className="font-bold text-emerald-400">{stats.shieldIntegrity}%</span>
          </div>
          <div className="flex items-center justify-between gap-4">
            <span className="text-slate-400">CORE TEMP:</span>
            <span className="font-bold text-amber-400">{stats.coreTemp}</span>
          </div>
        </div>

        {/* Right Interaction Instructions */}
        <div className="absolute top-4 right-4 pointer-events-none hidden sm:flex flex-col gap-1 font-mono text-[9px] text-slate-400 bg-slate-950/80 backdrop-blur-md p-2.5 rounded-xl border border-cyan-500/20 text-right">
          <span className="text-cyan-400 font-bold">INTERACTION PROTOCOLS:</span>
          <span>• DRAG TO ROTATE 3D CHASSIS</span>
          <span>• MOVE MOUSE: HEAD TRACKS AIM</span>
          <span>• CLICK "FIRE CANNON" FOR LASERS</span>
        </div>

        {/* Bottom Interactive Action Toolbar */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-3">
          <button
            onClick={handleFireCannon}
            disabled={isFiring}
            className="cyber-button px-5 py-2.5 rounded-xl font-mech font-bold text-xs sm:text-sm tracking-wider uppercase bg-gradient-to-r from-red-600 via-red-500 to-amber-500 text-white shadow-[0_0_25px_rgba(255,30,66,0.6)] flex items-center gap-2 hover:scale-105 active:scale-95 transition-transform"
          >
            <Zap className={`w-4 h-4 ${isFiring ? 'animate-spin' : ''}`} />
            <span>{isFiring ? 'FIRING ION BEAM...' : 'DISCHARGE ION CANNON'}</span>
          </button>

          <button
            onClick={() => {
              playMechArmorShift();
              manualRotation.current = { x: 0, y: 0 };
            }}
            className="p-2.5 rounded-xl border border-cyan-500/40 bg-slate-900/90 text-cyan-400 hover:text-white hover:bg-cyan-950 transition-colors shadow-[0_0_15px_rgba(0,210,255,0.2)]"
            title="Reset 3D Orientation"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
