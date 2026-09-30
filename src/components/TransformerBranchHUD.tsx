'use client';

import React, { useState } from 'react';
import { Settings, Zap, Cpu, Building2, FlaskConical, Radio } from 'lucide-react';
import { playCyberClick, playOpticPulse } from '@/lib/soundFx';

interface TransformerBranchHUDProps {
  onSelectBranch?: (branchSlug: string) => void;
}

export default function TransformerBranchHUD({ onSelectBranch }: TransformerBranchHUDProps) {
  const [activeBranch, setActiveBranch] = useState<string | null>(null);

  const branches = [
    { id: 'cse', name: 'CSE', icon: Cpu, slug: 'cse', desc: 'Computer Science & Eng' },
    { id: 'me', name: 'ME', icon: Settings, slug: 'mechanical', desc: 'Mechanical Eng' },
    { id: 'ee', name: 'EE', icon: Zap, slug: 'ee-ece', desc: 'Electrical Eng' },
    { id: 'ce', name: 'CE', icon: Building2, slug: 'civil', desc: 'Civil Eng' },
    { id: 'ece', name: 'ECE', icon: Radio, slug: 'ee-ece', desc: 'Electronics & Comm' },
  ];

  const handleBranchClick = (slug: string) => {
    setActiveBranch(slug);
    playCyberClick();
    playOpticPulse();

    if (onSelectBranch) {
      onSelectBranch(slug);
    } else {
      // Smooth scroll to events section
      const el = document.getElementById('events');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto my-4 px-2">
      {/* HUD Chamfered Outer Housing */}
      <div className="relative p-1 rounded-2xl bg-gradient-to-r from-cyan-500/20 via-blue-500/20 to-cyan-500/20 border border-cyan-500/30 backdrop-blur-md shadow-[0_0_25px_rgba(0,210,255,0.15)]">
        {/* Animated Corner Brackets */}
        <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-cyan-400" />
        <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-cyan-400" />
        <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-cyan-400" />
        <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-cyan-400" />

        {/* Inner Grid of 5 Department Badges */}
        <div className="grid grid-cols-5 gap-1 sm:gap-2">
          {branches.map((b) => {
            const Icon = b.icon;
            const isActive = activeBranch === b.slug;

            return (
              <button
                key={b.id}
                onClick={() => handleBranchClick(b.slug)}
                className={`relative flex flex-col items-center justify-center py-2.5 px-2 rounded-xl transition-all duration-300 group overflow-hidden ${
                  isActive
                    ? 'bg-cyan-500/25 border border-cyan-400 shadow-[0_0_15px_rgba(0,210,255,0.4)] scale-105'
                    : 'bg-slate-900/60 hover:bg-cyan-500/10 border border-slate-700/60 hover:border-cyan-500/40'
                }`}
              >
                {/* Active Conduit Glow Stripe */}
                {isActive && (
                  <div className="absolute top-0 left-0 right-0 h-0.5 bg-cyan-400 shadow-[0_0_8px_#00d2ff]" />
                )}

                {/* Hexagonal / Rounded Icon Badge */}
                <div className="relative p-1.5 rounded-lg mb-1 transition-transform duration-200 group-hover:scale-110">
                  <Icon
                    className={`w-5 h-5 transition-colors ${
                      isActive ? 'text-cyan-300' : 'text-slate-400 group-hover:text-cyan-400'
                    }`}
                  />
                  {/* Subtle Icon Glow */}
                  <div className="absolute inset-0 bg-cyan-400/20 rounded-lg blur opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>

                {/* Branch Name */}
                <span
                  className={`text-[10px] sm:text-xs font-mono font-bold tracking-widest transition-colors ${
                    isActive ? 'text-white' : 'text-slate-300 group-hover:text-cyan-200'
                  }`}
                >
                  {b.name}
                </span>

                {/* Status Dot */}
                <span
                  className={`w-1 h-1 rounded-full mt-1 transition-all ${
                    isActive
                      ? 'bg-cyan-400 shadow-[0_0_4px_#00d2ff] scale-125'
                      : 'bg-slate-600 group-hover:bg-cyan-500/60'
                  }`}
                />
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
