'use client';

import React from 'react';
import { Calendar, Award, CheckCircle2, Layers, Rocket, ArrowRight } from 'lucide-react';
import { playCyberClick, playLaserCharge } from '@/lib/soundFx';

interface CommandCenterProps {
  stats: {
    totalEvents: number;
    totalPrizeFormatted: string;
    categoriesCount: number;
    registrationOpen: boolean;
    upcomingEvents: number;
  };
  featuredEvent?: any;
  onSelectEvent?: (event: any) => void;
}

export default function EventCommandCenter({ stats, featuredEvent, onSelectEvent }: CommandCenterProps) {
  const metrics = [
    {
      label: 'Total Events',
      value: stats.totalEvents || 28,
      subtext: 'Official Competitions',
      icon: Calendar,
      color: 'text-cyan-400',
      border: 'border-cyan-500/30',
      bg: 'bg-cyan-500/10',
    },
    {
      label: 'Registration Status',
      value: stats.registrationOpen ? 'OPEN' : 'CLOSED',
      subtext: 'Global Portal Active',
      icon: CheckCircle2,
      color: 'text-emerald-400',
      border: 'border-emerald-500/30',
      bg: 'bg-emerald-500/10',
      isBadge: true,
    },
    {
      label: 'Total Prize Pool',
      value: stats.totalPrizeFormatted || '₹85,000+',
      subtext: 'Cash Awards & Trophies',
      icon: Award,
      color: 'text-amber-400',
      border: 'border-amber-500/30',
      bg: 'bg-amber-500/10',
    },
    {
      label: 'Categories',
      value: stats.categoriesCount || 7,
      subtext: 'Engineering Domains',
      icon: Layers,
      color: 'text-blue-400',
      border: 'border-blue-500/30',
      bg: 'bg-blue-500/10',
    },
    {
      label: 'Upcoming Events',
      value: stats.upcomingEvents || stats.totalEvents || 28,
      subtext: 'Scheduled for Oct 8-10',
      icon: Rocket,
      color: 'text-rose-400',
      border: 'border-rose-500/30',
      bg: 'bg-rose-500/10',
    },
  ];

  return (
    <section id="command-center" className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 sm:-mt-12 mb-16">
      <div className="hud-panel cyber-clip p-4 sm:p-6 rounded-2xl border border-cyan-500/30 shadow-[0_10px_40px_rgba(0,0,0,0.8)]">
        {/* Top Header bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-cyan-500/20 pb-4 mb-6">
          <div className="flex items-center gap-3">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-cyan-500"></span>
            </span>
            <h2 className="text-xs sm:text-sm font-mech font-bold tracking-widest text-cyan-300 uppercase">
              EVENT COMMAND CENTER • LIVE HUD TELEMETRY
            </h2>
          </div>
          <div className="text-[11px] font-mono text-slate-400">
            SYSTEM STATUS: <span className="text-emerald-400 font-semibold">ALL SYSTEMS NOMINAL</span>
          </div>
        </div>

        {/* Grid of Telemetry Metrics + Spotlight */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {metrics.map((m) => {
            const Icon = m.icon;
            return (
              <div
                key={m.label}
                className="bg-slate-950/60 border border-slate-800/80 hover:border-cyan-500/40 p-3.5 sm:p-4 rounded-xl transition-all duration-300 group flex flex-col justify-between"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className={`p-2 rounded-lg ${m.bg} ${m.color}`}>
                    <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <span className="text-[9px] font-mono text-slate-500 group-hover:text-cyan-400 transition-colors">
                    #LIVE
                  </span>
                </div>
                <div>
                  <div className="text-[10px] sm:text-xs font-mono font-medium text-slate-400 uppercase tracking-wider">
                    {m.label}
                  </div>
                  <div className={`text-lg sm:text-xl md:text-2xl font-black font-mech tracking-tight mt-0.5 ${m.color}`}>
                    {m.value}
                  </div>
                  <div className="text-[9px] font-sans text-slate-500 mt-1 truncate">
                    {m.subtext}
                  </div>
                </div>
              </div>
            );
          })}

          {/* Featured Event Spotlight Tile */}
          <div className="col-span-2 sm:col-span-1 md:col-span-1 lg:col-span-1 bg-gradient-to-br from-red-950/40 via-slate-950 to-slate-900 border border-red-500/30 hover:border-red-400/60 p-3.5 sm:p-4 rounded-xl flex flex-col justify-between group">
            <div className="flex items-center justify-between mb-1">
              <span className="text-[9px] font-mech font-bold uppercase tracking-wider text-red-400 bg-red-950/80 px-2 py-0.5 rounded border border-red-500/30">
                FLAGSHIP
              </span>
              <span className="text-amber-400 font-mech font-bold text-xs">
                ₹35,000
              </span>
            </div>
            <div>
              <h3 className="font-mech font-bold text-sm text-slate-100 group-hover:text-cyan-300 transition-colors">
                Hackathon
              </h3>
              <p className="text-[10px] text-slate-400 line-clamp-1 mt-0.5">
                24-Hour Code Sprint
              </p>
            </div>
            <button
              onClick={() => {
                playLaserCharge();
                if (onSelectEvent && featuredEvent) {
                  onSelectEvent(featuredEvent);
                } else {
                  const el = document.getElementById('events');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              onMouseEnter={() => playCyberClick()}
              className="mt-2 text-[10px] font-mech font-bold uppercase tracking-wider text-cyan-400 hover:text-cyan-300 flex items-center justify-between group-hover:translate-x-0.5 transition-transform"
            >
              <span>View Details</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
