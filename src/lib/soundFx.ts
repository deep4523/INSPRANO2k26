'use client';

// Web Audio API Synthesizer for Authentic Transformers Sci-Fi Mechanical Sound Effects
// 100% synthesized in-browser with zero external asset dependencies

let audioCtx: AudioContext | null = null;
let soundEnabled = true;

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume().catch(() => {});
  }
  return audioCtx;
}

export function isSoundEnabled(): boolean {
  if (typeof window === 'undefined') return true;
  const stored = localStorage.getItem('insprano_sound_fx');
  return stored !== 'false';
}

export function toggleSound(): boolean {
  soundEnabled = !isSoundEnabled();
  localStorage.setItem('insprano_sound_fx', String(soundEnabled));
  if (soundEnabled) {
    playCyberClick();
  }
  return soundEnabled;
}

// 1. Iconic Transformers Mechanical Servo Transformation Sound
export function playTransformSound() {
  if (!isSoundEnabled()) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;

  // Layer 1: Pitch-shifting Frequency Sweep (The classic "chk-chk-chk-ch-khoo" servo)
  const steps = [
    { freq: 160, time: 0.0, dur: 0.08, type: 'sawtooth' as OscillatorType },
    { freq: 320, time: 0.09, dur: 0.08, type: 'square' as OscillatorType },
    { freq: 240, time: 0.18, dur: 0.09, type: 'sawtooth' as OscillatorType },
    { freq: 480, time: 0.28, dur: 0.11, type: 'triangle' as OscillatorType },
    { freq: 180, time: 0.40, dur: 0.25, type: 'sawtooth' as OscillatorType },
  ];

  steps.forEach((s) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const filter = ctx.createBiquadFilter();

    osc.type = s.type;
    osc.frequency.setValueAtTime(s.freq, now + s.time);
    osc.frequency.exponentialRampToValueAtTime(s.freq * 1.5, now + s.time + s.dur);

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(1400, now + s.time);

    gain.gain.setValueAtTime(0.08, now + s.time);
    gain.gain.exponentialRampToValueAtTime(0.001, now + s.time + s.dur);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now + s.time);
    osc.stop(now + s.time + s.dur);
  });

  // Layer 2: Deep Hydraulic Sub-Bass Thud
  const subOsc = ctx.createOscillator();
  const subGain = ctx.createGain();
  subOsc.type = 'sine';
  subOsc.frequency.setValueAtTime(90, now);
  subOsc.frequency.exponentialRampToValueAtTime(35, now + 0.5);

  subGain.gain.setValueAtTime(0.18, now);
  subGain.gain.exponentialRampToValueAtTime(0.001, now + 0.55);

  subOsc.connect(subGain);
  subGain.connect(ctx.destination);
  subOsc.start(now);
  subOsc.stop(now + 0.55);
}

// 2. High-Tech Cyber UI Hover Click
export function playCyberClick() {
  if (!isSoundEnabled()) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = 'sine';
  osc.frequency.setValueAtTime(800, now);
  osc.frequency.exponentialRampToValueAtTime(400, now + 0.04);

  gain.gain.setValueAtTime(0.04, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);

  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start(now);
  osc.stop(now + 0.04);
}

// 3. Laser Beam Charge Surge
export function playLaserCharge() {
  if (!isSoundEnabled()) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = 'sawtooth';
  osc.frequency.setValueAtTime(150, now);
  osc.frequency.exponentialRampToValueAtTime(1200, now + 0.25);

  gain.gain.setValueAtTime(0.06, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);

  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start(now);
  osc.stop(now + 0.25);
}

// 4. Optical Visor Scanning Beam Pulse
export function playOpticPulse() {
  if (!isSoundEnabled()) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = 'sine';
  osc.frequency.setValueAtTime(1400, now);
  osc.frequency.linearRampToValueAtTime(1800, now + 0.08);
  osc.frequency.linearRampToValueAtTime(1100, now + 0.16);

  gain.gain.setValueAtTime(0.03, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);

  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start(now);
  osc.stop(now + 0.18);
}

// 5. Heavy Mechanical Armor Plate Shift
export function playMechArmorShift() {
  if (!isSoundEnabled()) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;

  // Heavy mechanical clank
  const noiseBuffer = ctx.createBuffer(1, Math.floor(ctx.sampleRate * 0.12), ctx.sampleRate);
  const output = noiseBuffer.getChannelData(0);
  for (let i = 0; i < noiseBuffer.length; i++) {
    output[i] = Math.random() * 2 - 1;
  }

  const whiteNoise = ctx.createBufferSource();
  whiteNoise.buffer = noiseBuffer;

  const filter = ctx.createBiquadFilter();
  filter.type = 'bandpass';
  filter.frequency.setValueAtTime(320, now);
  filter.Q.setValueAtTime(3.0, now);

  const gain = ctx.createGain();
  gain.gain.setValueAtTime(0.07, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);

  whiteNoise.connect(filter);
  filter.connect(gain);
  gain.connect(ctx.destination);

  whiteNoise.start(now);
  whiteNoise.stop(now + 0.12);
}

// 6. Powerful Hydraulic Mech Step
export function playHydraulicFootstep() {
  if (!isSoundEnabled()) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;

  // Sub-bass impact
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = 'sine';
  osc.frequency.setValueAtTime(110, now);
  osc.frequency.exponentialRampToValueAtTime(25, now + 0.45);

  gain.gain.setValueAtTime(0.35, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.45);

  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start(now);
  osc.stop(now + 0.45);

  // Hydraulic hiss
  const hissBuffer = ctx.createBuffer(1, Math.floor(ctx.sampleRate * 0.25), ctx.sampleRate);
  const hissData = hissBuffer.getChannelData(0);
  for (let i = 0; i < hissData.length; i++) {
    hissData[i] = (Math.random() * 2 - 1) * (1 - i / hissData.length);
  }
  const hissNode = ctx.createBufferSource();
  hissNode.buffer = hissBuffer;
  const filter = ctx.createBiquadFilter();
  filter.type = 'highpass';
  filter.frequency.setValueAtTime(2000, now);
  const hissGain = ctx.createGain();
  hissGain.gain.setValueAtTime(0.06, now + 0.05);
  hissGain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);

  hissNode.connect(filter);
  filter.connect(hissGain);
  hissGain.connect(ctx.destination);
  hissNode.start(now + 0.05);
  hissNode.stop(now + 0.25);
}


