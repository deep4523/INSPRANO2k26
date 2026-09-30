'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Shield, Zap, Sparkles, RefreshCw, Crosshair, Award, Flame, Disc, Radio, Eye } from 'lucide-react';
import {
  playTransformSound,
  playLaserCharge,
  playOpticPulse,
  playMechArmorShift,
  playHydraulicFootstep,
} from '@/lib/soundFx';

type TransformerCharacter = 'optimus' | 'megatron' | 'bumblebee' | 'grimlock';

interface CharacterProfile {
  id: TransformerCharacter;
  name: string;
  title: string;
  faction: 'autobot' | 'decepticon';
  primaryColor: string;
  accentColor: string;
  quote: string;
  weapon: string;
  fireLabel: string;
  specs: {
    strength: number;
    intelligence: number;
    speed: number;
    firepower: number;
  };
}

const TRANSFORMERS: CharacterProfile[] = [
  {
    id: 'optimus',
    name: 'OPTIMUS PRIME',
    title: 'AUTOBOT SUPREME COMMANDER',
    faction: 'autobot',
    primaryColor: '#00d2ff',
    accentColor: '#dc2626',
    quote: '"FREEDOM IS THE RIGHT OF ALL SENTIENT BEINGS. AUTOBOTS, TRANSFORM AND ROLL OUT!"',
    weapon: 'ION BLASTER & ENERGON AXE',
    fireLabel: 'FIRE ION BLASTER',
    specs: { strength: 10, intelligence: 10, speed: 8, firepower: 9.5 },
  },
  {
    id: 'megatron',
    name: 'MEGATRON',
    title: 'DECEPTICON SUPREME WARLORD',
    faction: 'decepticon',
    primaryColor: '#ff1e42',
    accentColor: '#a855f7',
    quote: '"PEACE THROUGH TYRANNY! CRUSH THE AUTOBOTS AND CLAIM THE ALL-SPARK!"',
    weapon: 'FUSION CANNON & DARK ENERGON BLADE',
    fireLabel: 'FIRE FUSION CANNON',
    specs: { strength: 10, intelligence: 9.5, speed: 8.5, firepower: 10 },
  },
  {
    id: 'bumblebee',
    name: 'BUMBLEBEE',
    title: 'AUTOBOT SCOUT & WARRIOR',
    faction: 'autobot',
    primaryColor: '#facc15',
    accentColor: '#0284c7',
    quote: '"STINGERS ARMED! READY TO DEFEND EARTH AND PROTECT THE ALL-SPARK!"',
    weapon: 'DUAL PLASMA STINGERS',
    fireLabel: 'FIRE PLASMA STINGERS',
    specs: { strength: 7.5, intelligence: 8.5, speed: 9.8, firepower: 8 },
  },
  {
    id: 'grimlock',
    name: 'GRIMLOCK',
    title: 'KING OF THE DINOBOTS',
    faction: 'autobot',
    primaryColor: '#f97316',
    accentColor: '#ef4444',
    quote: '"ME GRIMLOCK NO LIKE RULES! ME GRIMLOCK SMASH DECEPTICONS!"',
    weapon: 'MAGMA DOUBLE CANNON & ENERGO SWORD',
    fireLabel: 'FIRE MAGMA CANNON',
    specs: { strength: 10, intelligence: 6.5, speed: 7, firepower: 9.8 },
  },
];

export default function RealTransformers3D() {
  const [selectedBot, setSelectedBot] = useState<TransformerCharacter>('optimus');
  const [isFiring, setIsFiring] = useState(false);
  const [isTransforming, setIsTransforming] = useState(false);
  const [voiceQuote, setVoiceQuote] = useState<string | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const activeMeshGroupRef = useRef<THREE.Group | null>(null);
  const headRef = useRef<THREE.Group | null>(null);
  const coreRef = useRef<THREE.Mesh | null>(null);
  const weaponMeshRef = useRef<THREE.Group | null>(null);
  const projectileBeamRef = useRef<THREE.Mesh | null>(null);
  const thrusterParticlesRef = useRef<THREE.Points | null>(null);

  const mousePos = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });
  const isDragging = useRef(false);
  const prevMouse = useRef({ x: 0, y: 0 });
  const manualRot = useRef({ x: 0, y: 0 });

  const activeProfile = TRANSFORMERS.find((b) => b.id === selectedBot) || TRANSFORMERS[0];

  // BUILD REAL TRANSFORMER 3D MESH BASED ON SELECTED BOT
  const buildTransformerMesh = (scene: THREE.Scene, botType: TransformerCharacter) => {
    // Remove previous mesh
    if (activeMeshGroupRef.current) {
      scene.remove(activeMeshGroupRef.current);
    }

    const botGroup = new THREE.Group();
    activeMeshGroupRef.current = botGroup;
    scene.add(botGroup);

    // Common materials
    const matChrome = new THREE.MeshStandardMaterial({
      color: 0xf1f5f9,
      metalness: 0.98,
      roughness: 0.12,
    });
    const matDarkSteel = new THREE.MeshStandardMaterial({
      color: 0x0f172a,
      metalness: 0.95,
      roughness: 0.25,
    });
    const matGunmetal = new THREE.MeshStandardMaterial({
      color: 0x334155,
      metalness: 0.92,
      roughness: 0.22,
    });

    if (botType === 'optimus') {
      // =====================================================================
      // 1. REAL OPTIMUS PRIME 3D MODEL (Peterbilt Truck Chest, Smokestacks, Faceplate)
      // =====================================================================
      const matPrimeRed = new THREE.MeshStandardMaterial({
        color: 0xb91c1c,
        metalness: 0.88,
        roughness: 0.28,
      });
      const matPrimeBlue = new THREE.MeshStandardMaterial({
        color: 0x0369a1,
        metalness: 0.88,
        roughness: 0.28,
      });
      const matCyanOptic = new THREE.MeshStandardMaterial({
        color: 0x00ffff,
        emissive: 0x00d2ff,
        emissiveIntensity: 4.0,
      });

      // Torso & Dual Windshields
      const torso = new THREE.Mesh(new THREE.BoxGeometry(4.4, 4.8, 3.4), matPrimeRed);
      torso.position.y = 1.4;
      botGroup.add(torso);

      // Left & Right Truck Windshields
      const winLeft = new THREE.Mesh(new THREE.BoxGeometry(1.6, 1.4, 0.35), matPrimeBlue);
      winLeft.position.set(-1.15, 2.4, 1.75);
      winLeft.rotation.y = -0.15;
      botGroup.add(winLeft);

      const winRight = new THREE.Mesh(new THREE.BoxGeometry(1.6, 1.4, 0.35), matPrimeBlue);
      winRight.position.set(1.15, 2.4, 1.75);
      winRight.rotation.y = 0.15;
      botGroup.add(winRight);

      // Silver Front Grille Abdomen
      for (let g = 0; g < 4; g++) {
        const grille = new THREE.Mesh(new THREE.BoxGeometry(2.4, 0.2, 0.3), matChrome);
        grille.position.set(0, 0.3 + g * 0.42, 1.75);
        botGroup.add(grille);
      }

      // Matrix of Leadership Core in Chest
      const matrix = new THREE.Mesh(new THREE.OctahedronGeometry(0.75, 0), matCyanOptic);
      matrix.position.set(0, 1.6, 1.4);
      coreRef.current = matrix;
      botGroup.add(matrix);

      // Dual Chrome Smokestacks on Back Shoulders
      for (let s = 0; s < 2; s++) {
        const isLeft = s === 0;
        const stack = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.2, 5.2, 16), matChrome);
        stack.position.set(isLeft ? -2.6 : 2.6, 4.2, -1.2);
        botGroup.add(stack);
      }

      // Head & Helmet
      const head = new THREE.Group();
      head.position.set(0, 4.6, 0.2);
      headRef.current = head;
      botGroup.add(head);

      head.add(new THREE.Mesh(new THREE.BoxGeometry(1.5, 1.6, 1.5), matPrimeBlue));

      const faceplate = new THREE.Mesh(new THREE.BoxGeometry(1.1, 0.75, 0.45), matChrome);
      faceplate.position.set(0, -0.3, 0.7);
      head.add(faceplate);

      const crest = new THREE.Mesh(new THREE.BoxGeometry(0.35, 1.3, 1.3), matPrimeBlue);
      crest.position.set(0, 0.85, 0);
      head.add(crest);

      // Side Audio Fins
      const finL = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.12, 1.8, 8), matChrome);
      finL.position.set(-0.9, 0.6, 0);
      finL.rotation.z = -0.15;
      head.add(finL);

      const finR = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.12, 1.8, 8), matChrome);
      finR.position.set(0.9, 0.6, 0);
      finR.rotation.z = 0.15;
      head.add(finR);

      // Eyes
      const eyeL = new THREE.Mesh(new THREE.BoxGeometry(0.38, 0.16, 0.2), matCyanOptic);
      eyeL.position.set(-0.32, 0.2, 0.78);
      head.add(eyeL);

      const eyeR = new THREE.Mesh(new THREE.BoxGeometry(0.38, 0.16, 0.2), matCyanOptic);
      eyeR.position.set(0.32, 0.2, 0.78);
      head.add(eyeR);

      // Right Arm with Ion Blaster
      const rightArm = new THREE.Group();
      rightArm.position.set(2.8, 3.2, 0);
      weaponMeshRef.current = rightArm;
      botGroup.add(rightArm);

      rightArm.add(new THREE.Mesh(new THREE.BoxGeometry(1.6, 1.8, 1.8), matPrimeRed));
      const rForearm = new THREE.Mesh(new THREE.BoxGeometry(1.3, 2.4, 1.3), matPrimeBlue);
      rForearm.position.y = -2.2;
      rightArm.add(rForearm);

      // Ion Blaster Cannon Barrel
      const blaster = new THREE.Mesh(new THREE.CylinderGeometry(0.35, 0.48, 3.8, 16), matDarkSteel);
      blaster.rotation.x = Math.PI / 2;
      blaster.position.set(0.35, -2.2, 2.4);
      rightArm.add(blaster);

      // Left Arm with Energon Axe / Blade
      const leftArm = new THREE.Group();
      leftArm.position.set(-2.8, 3.2, 0);
      botGroup.add(leftArm);

      leftArm.add(new THREE.Mesh(new THREE.BoxGeometry(1.6, 1.8, 1.8), matPrimeRed));
      const lForearm = new THREE.Mesh(new THREE.BoxGeometry(1.3, 2.4, 1.3), matPrimeBlue);
      lForearm.position.y = -2.2;
      leftArm.add(lForearm);

      const axeBlade = new THREE.Mesh(new THREE.BoxGeometry(0.12, 3.6, 1.2), new THREE.MeshStandardMaterial({
        color: 0xf97316,
        emissive: 0xf97316,
        emissiveIntensity: 3.5,
      }));
      axeBlade.position.set(-0.6, -2.8, 0.8);
      leftArm.add(axeBlade);

      // Legs & Cylindrical Fuel Tanks
      const pelvis = new THREE.Mesh(new THREE.BoxGeometry(3.6, 1.2, 2.6), matDarkSteel);
      pelvis.position.y = -1.6;
      botGroup.add(pelvis);

      for (let l = 0; l < 2; l++) {
        const isLeft = l === 0;
        const posX = isLeft ? -1.3 : 1.3;

        const thigh = new THREE.Mesh(new THREE.BoxGeometry(1.2, 2.8, 1.2), matChrome);
        thigh.position.set(posX, -3.2, 0);
        botGroup.add(thigh);

        const shin = new THREE.Mesh(new THREE.BoxGeometry(1.7, 3.8, 1.8), matPrimeBlue);
        shin.position.set(posX, -6.2, 0.2);
        botGroup.add(shin);

        // Chrome Fuel Tank attached to outer leg
        const tank = new THREE.Mesh(new THREE.CylinderGeometry(0.4, 0.4, 3.2, 16), matChrome);
        tank.position.set(isLeft ? posX - 1.1 : posX + 1.1, -6.0, 0.2);
        botGroup.add(tank);

        const foot = new THREE.Mesh(new THREE.BoxGeometry(1.8, 0.8, 2.8), matDarkSteel);
        foot.position.set(posX, -8.2, 0.7);
        botGroup.add(foot);
      }
    } else if (botType === 'megatron') {
      // =====================================================================
      // 2. REAL MEGATRON 3D MODEL (Gunmetal Armor, Fusion Cannon, Red Optics)
      // =====================================================================
      const matMegatronCrimson = new THREE.MeshStandardMaterial({
        color: 0xff0033,
        emissive: 0xff1e42,
        emissiveIntensity: 4.5,
      });
      const matDarkEnergon = new THREE.MeshStandardMaterial({
        color: 0x9333ea,
        emissive: 0xa855f7,
        emissiveIntensity: 3.5,
      });

      // Angular Heavy Gunmetal Torso
      const torso = new THREE.Mesh(new THREE.BoxGeometry(4.8, 5.0, 3.6), matGunmetal);
      torso.position.y = 1.4;
      botGroup.add(torso);

      // Decepticon Chest Ingot & Purple Spark Core
      const spark = new THREE.Mesh(new THREE.DodecahedronGeometry(0.85, 0), matDarkEnergon);
      spark.position.set(0, 1.6, 1.6);
      coreRef.current = spark;
      botGroup.add(spark);

      // Razor Shoulder Pauldrons
      for (let s = 0; s < 2; s++) {
        const isLeft = s === 0;
        const pauldron = new THREE.Mesh(new THREE.BoxGeometry(2.2, 2.4, 2.2), matDarkSteel);
        pauldron.position.set(isLeft ? -3.2 : 3.2, 3.6, 0);
        pauldron.rotation.z = isLeft ? 0.35 : -0.35;
        botGroup.add(pauldron);
      }

      // Head with Angled Crown
      const head = new THREE.Group();
      head.position.set(0, 4.8, 0.2);
      headRef.current = head;
      botGroup.add(head);

      head.add(new THREE.Mesh(new THREE.BoxGeometry(1.6, 1.8, 1.6), matGunmetal));

      // Bucket Crown Helmet
      const crown = new THREE.Mesh(new THREE.BoxGeometry(2.0, 0.8, 1.8), matDarkSteel);
      crown.position.set(0, 1.0, 0);
      head.add(crown);

      // Sinister Red Optics
      const eyeL = new THREE.Mesh(new THREE.BoxGeometry(0.38, 0.16, 0.2), matMegatronCrimson);
      eyeL.position.set(-0.35, 0.18, 0.85);
      head.add(eyeL);

      const eyeR = new THREE.Mesh(new THREE.BoxGeometry(0.38, 0.16, 0.2), matMegatronCrimson);
      eyeR.position.set(0.35, 0.18, 0.85);
      head.add(eyeR);

      // Signature Right Arm Mounted FUSION CANNON
      const rightArm = new THREE.Group();
      rightArm.position.set(3.0, 3.2, 0);
      weaponMeshRef.current = rightArm;
      botGroup.add(rightArm);

      rightArm.add(new THREE.Mesh(new THREE.BoxGeometry(1.6, 2.0, 1.6), matGunmetal));

      // Massive Fusion Cannon Cylinder Barrel
      const fusionCannon = new THREE.Mesh(new THREE.CylinderGeometry(0.75, 0.9, 5.2, 20), matDarkSteel);
      fusionCannon.rotation.x = Math.PI / 2;
      fusionCannon.position.set(0.6, -1.8, 2.6);
      rightArm.add(fusionCannon);

      const cannonMuzzle = new THREE.Mesh(new THREE.CylinderGeometry(0.85, 0.85, 0.6, 20), matMegatronCrimson);
      cannonMuzzle.rotation.x = Math.PI / 2;
      cannonMuzzle.position.set(0.6, -1.8, 5.2);
      rightArm.add(cannonMuzzle);

      // Left Arm
      const leftArm = new THREE.Group();
      leftArm.position.set(-3.0, 3.2, 0);
      botGroup.add(leftArm);
      leftArm.add(new THREE.Mesh(new THREE.BoxGeometry(1.6, 2.0, 1.6), matGunmetal));
      const lForearm = new THREE.Mesh(new THREE.BoxGeometry(1.4, 2.6, 1.4), matDarkSteel);
      lForearm.position.y = -2.2;
      leftArm.add(lForearm);

      // Legs
      for (let l = 0; l < 2; l++) {
        const posX = l === 0 ? -1.4 : 1.4;
        const thigh = new THREE.Mesh(new THREE.BoxGeometry(1.4, 3.0, 1.4), matGunmetal);
        thigh.position.set(posX, -3.2, 0);
        botGroup.add(thigh);

        const shin = new THREE.Mesh(new THREE.BoxGeometry(1.9, 4.0, 2.0), matDarkSteel);
        shin.position.set(posX, -6.4, 0.2);
        botGroup.add(shin);

        const foot = new THREE.Mesh(new THREE.BoxGeometry(2.0, 0.9, 3.0), matGunmetal);
        foot.position.set(posX, -8.5, 0.8);
        botGroup.add(foot);
      }
    } else if (botType === 'bumblebee') {
      // =====================================================================
      // 3. REAL BUMBLEBEE 3D MODEL (Canary Yellow, Black Stripes, Door Wings)
      // =====================================================================
      const matBeeYellow = new THREE.MeshStandardMaterial({
        color: 0xeab308,
        metalness: 0.85,
        roughness: 0.25,
      });
      const matBlackStripe = new THREE.MeshStandardMaterial({
        color: 0x09090b,
        metalness: 0.95,
        roughness: 0.2,
      });
      const matCyanBeeOptic = new THREE.MeshStandardMaterial({
        color: 0x38bdf8,
        emissive: 0x0ea5e9,
        emissiveIntensity: 4.0,
      });

      // Compact Torso
      const torso = new THREE.Mesh(new THREE.BoxGeometry(3.8, 4.2, 3.0), matBeeYellow);
      torso.position.y = 1.2;
      botGroup.add(torso);

      // Black Racing Stripes down Chest
      const stripeL = new THREE.Mesh(new THREE.BoxGeometry(0.5, 4.25, 0.2), matBlackStripe);
      stripeL.position.set(-0.9, 1.2, 1.55);
      botGroup.add(stripeL);

      const stripeR = new THREE.Mesh(new THREE.BoxGeometry(0.5, 4.25, 0.2), matBlackStripe);
      stripeR.position.set(0.9, 1.2, 1.55);
      botGroup.add(stripeR);

      // Headlights on Chest
      const lightL = new THREE.Mesh(new THREE.CylinderGeometry(0.35, 0.35, 0.2, 16), matCyanBeeOptic);
      lightL.rotation.x = Math.PI / 2;
      lightL.position.set(-1.4, 2.2, 1.55);
      botGroup.add(lightL);

      const lightR = new THREE.Mesh(new THREE.CylinderGeometry(0.35, 0.35, 0.2, 16), matCyanBeeOptic);
      lightR.rotation.x = Math.PI / 2;
      lightR.position.set(1.4, 2.2, 1.55);
      botGroup.add(lightR);

      // Camaro Door Wings on Back
      for (let w = 0; w < 2; w++) {
        const isLeft = w === 0;
        const door = new THREE.Mesh(new THREE.BoxGeometry(0.2, 3.8, 1.8), matBeeYellow);
        door.position.set(isLeft ? -2.2 : 2.2, 2.4, -1.2);
        door.rotation.z = isLeft ? 0.45 : -0.45;
        door.rotation.y = isLeft ? -0.3 : 0.3;
        botGroup.add(door);
      }

      // Head
      const head = new THREE.Group();
      head.position.set(0, 4.0, 0.2);
      headRef.current = head;
      botGroup.add(head);

      head.add(new THREE.Mesh(new THREE.BoxGeometry(1.3, 1.4, 1.3), matBeeYellow));

      const eyeL = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.2, 0.2, 12), matCyanBeeOptic);
      eyeL.rotation.x = Math.PI / 2;
      eyeL.position.set(-0.3, 0.15, 0.7);
      head.add(eyeL);

      const eyeR = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.2, 0.2, 12), matCyanBeeOptic);
      eyeR.rotation.x = Math.PI / 2;
      eyeR.position.set(0.3, 0.15, 0.7);
      head.add(eyeR);

      // Dual Plasma Stingers
      const rightArm = new THREE.Group();
      rightArm.position.set(2.4, 2.8, 0);
      weaponMeshRef.current = rightArm;
      botGroup.add(rightArm);
      rightArm.add(new THREE.Mesh(new THREE.BoxGeometry(1.2, 1.6, 1.2), matBeeYellow));

      const stingerR = new THREE.Mesh(new THREE.CylinderGeometry(0.25, 0.35, 3.2, 12), matBlackStripe);
      stingerR.rotation.x = Math.PI / 2;
      stingerR.position.set(0.2, -1.6, 1.8);
      rightArm.add(stingerR);

      const leftArm = new THREE.Group();
      leftArm.position.set(-2.4, 2.8, 0);
      botGroup.add(leftArm);
      leftArm.add(new THREE.Mesh(new THREE.BoxGeometry(1.2, 1.6, 1.2), matBeeYellow));

      const stingerL = new THREE.Mesh(new THREE.CylinderGeometry(0.25, 0.35, 3.2, 12), matBlackStripe);
      stingerL.rotation.x = Math.PI / 2;
      stingerL.position.set(-0.2, -1.6, 1.8);
      leftArm.add(stingerL);

      // Legs
      for (let l = 0; l < 2; l++) {
        const posX = l === 0 ? -1.1 : 1.1;
        const thigh = new THREE.Mesh(new THREE.BoxGeometry(1.0, 2.4, 1.0), matBlackStripe);
        thigh.position.set(posX, -2.6, 0);
        botGroup.add(thigh);

        const shin = new THREE.Mesh(new THREE.BoxGeometry(1.5, 3.4, 1.6), matBeeYellow);
        shin.position.set(posX, -5.2, 0.2);
        botGroup.add(shin);

        const foot = new THREE.Mesh(new THREE.BoxGeometry(1.6, 0.7, 2.4), matBlackStripe);
        foot.position.set(posX, -7.0, 0.6);
        botGroup.add(foot);
      }
    } else {
      // =====================================================================
      // 4. REAL GRIMLOCK 3D MODEL (Dinobot King - Gold, Magma Orange, Heavy Armor)
      // =====================================================================
      const matGrimlockGold = new THREE.MeshStandardMaterial({
        color: 0xd97706,
        metalness: 0.9,
        roughness: 0.25,
      });
      const matMagmaGlow = new THREE.MeshStandardMaterial({
        color: 0xff5500,
        emissive: 0xff3300,
        emissiveIntensity: 4.5,
      });

      const torso = new THREE.Mesh(new THREE.BoxGeometry(5.2, 5.2, 4.2), matDarkSteel);
      torso.position.y = 1.4;
      botGroup.add(torso);

      const goldPlate = new THREE.Mesh(new THREE.BoxGeometry(4.2, 3.2, 1.2), matGrimlockGold);
      goldPlate.position.set(0, 2.2, 2.2);
      botGroup.add(goldPlate);

      // Magma Chest Core
      const magmaCore = new THREE.Mesh(new THREE.OctahedronGeometry(0.9, 0), matMagmaGlow);
      magmaCore.position.set(0, 1.4, 2.4);
      coreRef.current = magmaCore;
      botGroup.add(magmaCore);

      // Head
      const head = new THREE.Group();
      head.position.set(0, 4.8, 0.3);
      headRef.current = head;
      botGroup.add(head);

      head.add(new THREE.Mesh(new THREE.BoxGeometry(1.8, 1.8, 2.2), matGrimlockGold));

      const eye = new THREE.Mesh(new THREE.BoxGeometry(1.4, 0.25, 0.3), matMagmaGlow);
      eye.position.set(0, 0.2, 1.15);
      head.add(eye);

      // Arms with Magma Cannon
      const rightArm = new THREE.Group();
      rightArm.position.set(3.4, 3.2, 0);
      weaponMeshRef.current = rightArm;
      botGroup.add(rightArm);

      const cannon = new THREE.Mesh(new THREE.CylinderGeometry(0.65, 0.8, 4.8, 16), matDarkSteel);
      cannon.rotation.x = Math.PI / 2;
      cannon.position.set(0.5, -1.8, 2.4);
      rightArm.add(cannon);

      const leftArm = new THREE.Group();
      leftArm.position.set(-3.4, 3.2, 0);
      botGroup.add(leftArm);
      leftArm.add(new THREE.Mesh(new THREE.BoxGeometry(1.8, 2.2, 1.8), matGrimlockGold));

      // Legs
      for (let l = 0; l < 2; l++) {
        const posX = l === 0 ? -1.5 : 1.5;
        const leg = new THREE.Mesh(new THREE.BoxGeometry(2.0, 6.0, 2.2), matDarkSteel);
        leg.position.set(posX, -4.8, 0.2);
        botGroup.add(leg);

        const foot = new THREE.Mesh(new THREE.BoxGeometry(2.2, 1.0, 3.4), matGrimlockGold);
        foot.position.set(posX, -8.2, 0.8);
        botGroup.add(foot);
      }
    }

    // Add Firing Laser Beam Projectile to Weapon
    const laserGeom = new THREE.CylinderGeometry(0.15, 0.4, 28, 12);
    const laserMat = new THREE.MeshBasicMaterial({
      color: botType === 'megatron' ? 0xff1e42 : botType === 'bumblebee' ? 0xfacc15 : 0x00d2ff,
      transparent: true,
      opacity: 0,
    });
    const laserBeam = new THREE.Mesh(laserGeom, laserMat);
    laserBeam.rotation.x = Math.PI / 2;
    laserBeam.position.set(0.4, -2.0, 18);
    projectileBeamRef.current = laserBeam;
    if (weaponMeshRef.current) {
      weaponMeshRef.current.add(laserBeam);
    }
  };

  // 3D Scene Initialization
  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    const width = container.clientWidth || 700;
    const height = container.clientHeight || 520;

    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 1.5, 24);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.3;
    container.innerHTML = '';
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Lights
    scene.add(new THREE.AmbientLight(0x0a192f, 2.2));
    const blueKey = new THREE.PointLight(0x00d2ff, 60, 50);
    blueKey.position.set(-12, 10, 14);
    scene.add(blueKey);

    const redRim = new THREE.PointLight(0xff1e42, 50, 50);
    redRim.position.set(12, 8, 12);
    scene.add(redRim);

    const topWhite = new THREE.DirectionalLight(0xffffff, 2.0);
    topWhite.position.set(0, 18, -10);
    scene.add(topWhite);

    // Build initial bot
    buildTransformerMesh(scene, selectedBot);

    // Mouse events for 3D Orbit
    const handlePointerMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
      mousePos.current.targetX = x;
      mousePos.current.targetY = y;

      if (isDragging.current) {
        const deltaX = e.clientX - prevMouse.current.x;
        const deltaY = e.clientY - prevMouse.current.y;
        manualRot.current.y += deltaX * 0.008;
        manualRot.current.x += deltaY * 0.008;
        manualRot.current.x = Math.max(-0.4, Math.min(0.4, manualRot.current.x));
      }
      prevMouse.current = { x: e.clientX, y: e.clientY };
    };

    const handlePointerDown = (e: MouseEvent) => {
      isDragging.current = true;
      prevMouse.current = { x: e.clientX, y: e.clientY };
    };

    const handlePointerUp = () => {
      isDragging.current = false;
    };

    container.addEventListener('mousemove', handlePointerMove);
    container.addEventListener('mousedown', handlePointerDown);
    window.addEventListener('mouseup', handlePointerUp);

    // Render loop
    let animId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      mousePos.current.x += (mousePos.current.targetX - mousePos.current.x) * 0.08;
      mousePos.current.y += (mousePos.current.targetY - mousePos.current.y) * 0.08;

      const mx = mousePos.current.x;
      const my = mousePos.current.y;

      // Transformer Idle Hover
      if (activeMeshGroupRef.current) {
        activeMeshGroupRef.current.position.y = Math.sin(elapsed * 2.0) * 0.3 + 0.2;
        activeMeshGroupRef.current.rotation.y =
          manualRot.current.y + Math.sin(elapsed * 0.8) * 0.06 + mx * 0.35;
        activeMeshGroupRef.current.rotation.x =
          manualRot.current.x + Math.sin(elapsed * 1.2) * 0.03 - my * 0.2;
      }

      // Head LookAt Mouse
      if (headRef.current) {
        headRef.current.rotation.y = mx * 0.6;
        headRef.current.rotation.x = -my * 0.4;
      }

      // Core Matrix Pulse
      if (coreRef.current) {
        coreRef.current.rotation.y += 0.03;
        coreRef.current.rotation.x += 0.015;
        const scale = 1 + Math.sin(elapsed * 5) * 0.12;
        coreRef.current.scale.set(scale, scale, scale);
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      container.removeEventListener('mousemove', handlePointerMove);
      container.removeEventListener('mousedown', handlePointerDown);
      window.removeEventListener('mouseup', handlePointerUp);
      renderer.dispose();
    };
  }, []);

  // Update 3D model when switching Transformer
  const handleSelectCharacter = (botId: TransformerCharacter) => {
    setSelectedBot(botId);
    setIsTransforming(true);
    playTransformSound();
    playMechArmorShift();

    const profile = TRANSFORMERS.find((b) => b.id === botId);
    if (profile) {
      setVoiceQuote(profile.quote);
      setTimeout(() => setVoiceQuote(null), 5000);
    }

    if (sceneRef.current) {
      buildTransformerMesh(sceneRef.current, botId);
    }

    setTimeout(() => setIsTransforming(false), 600);
  };

  // Fire Weapon Blast
  const handleFireWeapon = () => {
    setIsFiring(true);
    playLaserCharge();
    playOpticPulse();
    playHydraulicFootstep();

    if (projectileBeamRef.current) {
      const mat = projectileBeamRef.current.material as THREE.MeshBasicMaterial;
      mat.opacity = 0.95;
      setTimeout(() => {
        mat.opacity = 0;
        setIsFiring(false);
      }, 350);
    }

    // Recoil
    if (activeMeshGroupRef.current) {
      activeMeshGroupRef.current.position.z -= 0.8;
      setTimeout(() => {
        if (activeMeshGroupRef.current) activeMeshGroupRef.current.position.z = 0;
      }, 250);
    }
  };

  return (
    <div className="relative w-full max-w-6xl mx-auto my-8 rounded-3xl border-2 border-cyan-500/40 bg-slate-950/90 backdrop-blur-2xl p-4 sm:p-8 shadow-[0_0_80px_rgba(0,210,255,0.25)] overflow-hidden">
      {/* Top Banner Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-cyan-500/20 pb-4 mb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
            <h2 className="text-lg sm:text-2xl font-black font-mech tracking-wider uppercase text-white drop-shadow-[0_0_15px_rgba(0,210,255,0.6)]">
              REAL TRANSFORMERS 3D CYBERTRON HANGAR
            </h2>
          </div>
          <p className="text-[11px] font-mono tracking-widest text-cyan-400 uppercase mt-0.5">
            AUTHENTIC ARTICULATED 3D MECHS // CHOOSE YOUR TRANSFORMER
          </p>
        </div>

        {/* Real Transformer Selector Pills */}
        <div className="flex flex-wrap items-center gap-2">
          {TRANSFORMERS.map((bot) => (
            <button
              key={bot.id}
              onClick={() => handleSelectCharacter(bot.id)}
              className={`px-3.5 py-1.5 rounded-xl font-mech font-bold text-xs tracking-wider uppercase transition-all flex items-center gap-2 border ${
                selectedBot === bot.id
                  ? bot.faction === 'autobot'
                    ? 'bg-cyan-500 text-black border-cyan-400 shadow-[0_0_20px_#00d2ff]'
                    : 'bg-red-600 text-white border-red-500 shadow-[0_0_20px_#ff1e42]'
                  : 'bg-slate-900/80 text-slate-300 border-slate-700 hover:border-cyan-400'
              }`}
            >
              <Shield className={`w-3.5 h-3.5 ${selectedBot === bot.id ? 'animate-pulse' : ''}`} />
              <span>{bot.name.split(' ')[0]}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid: 3D Viewport on Left/Center, Tech Specs & Bio on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* 3D WebGL Transformer Canvas Viewport */}
        <div className="lg:col-span-8 relative h-[400px] sm:h-[480px] md:h-[540px] rounded-2xl overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900/60 to-slate-950 border border-cyan-500/30 group">
          <div ref={containerRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

          {/* Voice Quote Banner */}
          {voiceQuote && (
            <div className="absolute top-4 left-4 right-4 z-20 animate-fade-in pointer-events-none">
              <div className="hud-panel p-3 rounded-xl border border-cyan-400/80 bg-slate-950/90 backdrop-blur-xl text-center text-xs sm:text-sm font-mech font-bold text-cyan-300 shadow-[0_0_30px_rgba(0,210,255,0.4)]">
                {voiceQuote}
              </div>
            </div>
          )}

          {/* Crosshair Target HUD */}
          <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-30 group-hover:opacity-75 transition-opacity">
            <div className="w-32 h-32 rounded-full border border-cyan-400/30 border-dashed animate-spin flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
            </div>
          </div>

          {/* Action Toolbar */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-3">
            <button
              onClick={handleFireWeapon}
              disabled={isFiring}
              className={`cyber-button px-6 py-2.5 rounded-xl font-mech font-bold text-xs sm:text-sm tracking-wider uppercase text-white shadow-[0_0_25px_rgba(0,210,255,0.6)] flex items-center gap-2 hover:scale-105 active:scale-95 transition-transform ${
                activeProfile.faction === 'decepticon'
                  ? 'bg-gradient-to-r from-red-600 to-purple-600 shadow-[0_0_25px_rgba(255,30,66,0.7)]'
                  : 'bg-gradient-to-r from-cyan-500 to-blue-600 shadow-[0_0_25px_rgba(0,210,255,0.7)]'
              }`}
            >
              <Zap className={`w-4 h-4 ${isFiring ? 'animate-spin' : ''}`} />
              <span>{isFiring ? 'DISCHARGING ENERGY...' : activeProfile.fireLabel}</span>
            </button>

            <button
              onClick={() => {
                playMechArmorShift();
                manualRot.current = { x: 0, y: 0 };
              }}
              className="p-2.5 rounded-xl border border-cyan-500/40 bg-slate-900/90 text-cyan-400 hover:text-white hover:bg-cyan-950 transition-colors shadow-[0_0_15px_rgba(0,210,255,0.2)]"
              title="Reset 3D Angle"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Right Panel: Official Tech Specs & Transformer Lore */}
        <div className="lg:col-span-4 flex flex-col gap-4">
          {/* Character Identity HUD */}
          <div className="hud-panel p-5 rounded-2xl border border-cyan-500/30 bg-slate-950/80">
            <div className="flex items-center justify-between mb-1">
              <span className={`text-[10px] font-mono tracking-widest uppercase font-bold px-2.5 py-0.5 rounded-full ${
                activeProfile.faction === 'autobot'
                  ? 'bg-cyan-950 border border-cyan-500/50 text-cyan-400'
                  : 'bg-red-950 border border-red-500/50 text-red-400'
              }`}>
                {activeProfile.faction.toUpperCase()}
              </span>
              <span className="text-[10px] font-mono text-slate-400">CYBERTRON ID // MK-2026</span>
            </div>

            <h3 className="text-xl sm:text-2xl font-black font-mech text-white mt-1">
              {activeProfile.name}
            </h3>
            <p className="text-xs font-mono text-cyan-400 font-bold tracking-wider">
              {activeProfile.title}
            </p>

            <div className="mt-3 pt-3 border-t border-slate-800 text-[11px] font-mono text-slate-300">
              <span className="text-slate-400 block mb-1 font-bold">PRIMARY WEAPON SYSTEM:</span>
              <span className="text-cyan-300 font-mech font-bold tracking-wide">{activeProfile.weapon}</span>
            </div>
          </div>

          {/* Combat Telemetry Gauges */}
          <div className="hud-panel p-5 rounded-2xl border border-cyan-500/30 bg-slate-950/80 flex flex-col gap-3 font-mono text-xs">
            <div className="text-[10px] font-mono tracking-widest text-slate-400 uppercase font-bold border-b border-slate-800 pb-2">
              COMBAT TELEMETRY // RATINGS
            </div>

            <div>
              <div className="flex justify-between text-slate-300 mb-1">
                <span>STRENGTH</span>
                <span className="text-cyan-400 font-bold">{activeProfile.specs.strength}/10</span>
              </div>
              <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-cyan-400 h-full rounded-full transition-all duration-500"
                  style={{ width: `${(activeProfile.specs.strength / 10) * 100}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-slate-300 mb-1">
                <span>INTELLIGENCE</span>
                <span className="text-purple-400 font-bold">{activeProfile.specs.intelligence}/10</span>
              </div>
              <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-purple-400 h-full rounded-full transition-all duration-500"
                  style={{ width: `${(activeProfile.specs.intelligence / 10) * 100}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-slate-300 mb-1">
                <span>SPEED & AGILITY</span>
                <span className="text-emerald-400 font-bold">{activeProfile.specs.speed}/10</span>
              </div>
              <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-emerald-400 h-full rounded-full transition-all duration-500"
                  style={{ width: `${(activeProfile.specs.speed / 10) * 100}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-slate-300 mb-1">
                <span>FIREPOWER</span>
                <span className="text-red-400 font-bold">{activeProfile.specs.firepower}/10</span>
              </div>
              <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-red-500 h-full rounded-full transition-all duration-500"
                  style={{ width: `${(activeProfile.specs.firepower / 10) * 100}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
