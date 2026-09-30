'use client';

import React from 'react';
import { Target, Compass, Cpu, Wrench, Zap, Landmark, Radio, Beaker, ShieldCheck } from 'lucide-react';
import MechEmblem from './MechEmblem';

export default function AboutSection() {
  const departments = [
    { name: 'CSE', icon: Cpu, desc: 'AI, Algorithms, Systems & Hackathons' },
    { name: 'ME', icon: Wrench, desc: 'Dynamics, EV Tech, CAD & Robotics' },
    { name: 'EE', icon: Zap, desc: 'Power Grids, Circuits & Renewable Energy' },
    { name: 'CE', icon: Landmark, desc: 'Structural Engineering & Smart Infrastructure' },
    { name: 'ECE', icon: Radio, desc: 'Embedded Systems, Signals & Telemetry' },
  ];


  return (
    <section id="about" className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="hud-panel rounded-3xl p-6 sm:p-10 border border-cyan-500/20 overflow-hidden relative">
        {/* Background circuit glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-red-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Vision & About */}
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono uppercase tracking-widest mb-4">
              <Compass className="w-3.5 h-3.5 text-cyan-400" />
              <span>ABOUT INSPRANO 2K26</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-black font-mech tracking-wider text-white">
              ENGINEERING BEYOND LIMITS
            </h2>
            <p className="text-sm sm:text-base text-cyan-300/90 font-mono mt-1 mb-4">
              Government College of Engineering Kalahandi, Bhawanipatna
            </p>

            <p className="text-sm text-slate-300 font-sans leading-relaxed">
              INSPRANO 2K26 is the annual flagship national technical festival of Government College of Engineering Kalahandi (GCEK). Bringing together brightest engineering minds, innovators, makers, and coders from across the country for three high-octane days of competitive challenge, cutting-edge showcase, and technological celebration.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
              <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
                <div className="flex items-center gap-2 text-cyan-400 font-mech font-bold text-sm mb-1">
                  <Target className="w-4 h-4" />
                  <span>OUR MISSION</span>
                </div>
                <p className="text-xs text-slate-400 font-sans">
                  Fostering a platform where theoretical knowledge transforms into practical engineered solutions, empowering students to challenge conventional boundaries.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
                <div className="flex items-center gap-2 text-red-400 font-mech font-bold text-sm mb-1">
                  <ShieldCheck className="w-4 h-4" />
                  <span>THE VISION</span>
                </div>
                <p className="text-xs text-slate-400 font-sans">
                  Cultivating a national hub for technological synergy — uniting different engineering branches under one unified vision of limitless innovation.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Mechanical Emblem & Branches */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="relative mb-6">
              <div className="absolute inset-0 bg-cyan-500/20 rounded-full blur-2xl animate-pulse" />
              <MechEmblem className="w-32 h-32 sm:w-40 sm:h-40 relative z-10" />
            </div>

            <div className="text-center mb-4">
              <div className="font-mech font-bold text-xs uppercase tracking-widest text-slate-400">
                DIFFERENT BRANCHES • ONE VISION
              </div>
            </div>

            {/* Department chips */}
            <div className="grid grid-cols-5 gap-1.5 w-full">
              {departments.map((dept) => {
                const Icon = dept.icon;
                return (
                  <div
                    key={dept.name}
                    className="p-2 rounded-lg bg-slate-950/80 border border-slate-800/80 hover:border-cyan-500/40 text-center transition-colors group"
                  >
                    <Icon className="w-4 h-4 mx-auto text-cyan-400 group-hover:scale-110 transition-transform mb-1" />
                    <div className="text-[10px] font-mech font-bold text-slate-200 truncate">
                      {dept.name}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
