'use client';

import React, { useState, useMemo } from 'react';
import { Award, Users, MapPin, Calendar, ArrowUpRight, Zap, Sparkles, ExternalLink, Info } from 'lucide-react';
import { playCyberClick, playLaserCharge } from '@/lib/soundFx';

interface EventItem {
  id: number;
  name: string;
  slug: string;
  category_id: number;
  department?: string;
  short_description?: string;
  prize_amount: number;
  trophy_info?: string;
  min_team_size?: number;
  max_team_size?: number;
  venue?: string;
  event_date?: string;
  registration_status?: string;
  featured?: boolean;
  google_form_url?: string;
}

interface CategoryItem {
  id: number;
  name: string;
  slug: string;
}

interface EventsSectionProps {
  events: EventItem[];
  categories: CategoryItem[];
  onSelectEvent: (event: EventItem) => void;
  onRegisterEvent: (event: EventItem) => void;
}

export default function EventsSection({
  events,
  categories,
  onSelectEvent,
  onRegisterEvent,
}: EventsSectionProps) {
  const [activeTab, setActiveTab] = useState<string>('all');
  const [searchFilter, setSearchFilter] = useState('');
  const [naAlertEvent, setNaAlertEvent] = useState<string | null>(null);

  // 5 Branches & Festival Category Tabs
  const tabs = useMemo(() => [
    { id: 'all', label: 'All Events' },
    { id: 'cse', label: 'CSE' },
    { id: 'mechanical', label: 'ME' },
    { id: 'ee-ece', label: 'EE / ECE' },
    { id: 'civil', label: 'CE (Civil)' },
    { id: 'general', label: 'General' },
    { id: 'esports', label: 'Esports' },
    { id: 'school-students', label: 'School' },
  ], []);

  const filteredEvents = useMemo(() => {
    return events.filter(ev => {
      // Category filter
      if (activeTab !== 'all') {
        const cat = categories.find(c => c.slug.toLowerCase() === activeTab.toLowerCase());
        if (cat && ev.category_id !== cat.id) return false;
      }
      // Keyword filter
      if (searchFilter.trim()) {
        const q = searchFilter.toLowerCase();
        const matchesName = ev.name.toLowerCase().includes(q);
        const matchesDept = ev.department?.toLowerCase().includes(q);
        if (!matchesName && !matchesDept) return false;
      }
      return true;
    });
  }, [events, categories, activeTab, searchFilter]);

  // Color helper based on category
  const getCategoryColor = (catId: number) => {
    switch (catId) {
      case 2: return 'border-orange-500/40 text-orange-400 bg-orange-950/40'; // Mech
      case 3: return 'border-cyan-500/40 text-cyan-400 bg-cyan-950/40'; // CSE
      case 4: return 'border-emerald-500/40 text-emerald-400 bg-emerald-950/40'; // Civil
      case 5: return 'border-amber-500/40 text-amber-400 bg-amber-950/40'; // EE/ECE
      case 6: return 'border-purple-500/40 text-purple-400 bg-purple-950/40'; // Esports
      case 7: return 'border-pink-500/40 text-pink-400 bg-pink-950/40'; // School
      default: return 'border-blue-500/40 text-blue-400 bg-blue-950/40'; // General
    }
  };

  return (
    <section id="events" className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Section Title */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono uppercase tracking-widest mb-3">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          <span>OFFICIAL COMPETITION ARENA</span>
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-mech tracking-wider text-transparent bg-clip-text bg-gradient-to-b from-white via-slate-100 to-cyan-300">
          EVENTS
        </h2>
        <p className="mt-2 text-sm sm:text-base text-slate-400 max-w-2xl mx-auto font-sans">
          Explore a diverse range of events across different engineering domains. Total Prize Pool ₹85,000+.
        </p>
      </div>

      {/* Category Tabs Bar */}
      <div className="flex items-center justify-start sm:justify-center overflow-x-auto pb-4 gap-2 no-scrollbar mb-10">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`whitespace-nowrap px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-mech font-semibold tracking-wider transition-all duration-300 ${
                isActive
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-[0_0_20px_rgba(0,210,255,0.5)] border border-cyan-300 scale-105'
                  : 'bg-slate-900/60 text-slate-400 hover:text-cyan-300 hover:bg-slate-800/80 border border-slate-800'
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
        {filteredEvents.map((ev) => {
          const cat = categories.find(c => c.id === ev.category_id);
          const colorClass = getCategoryColor(ev.category_id);

          return (
            <div
              key={ev.id}
              className="hud-panel group relative rounded-xl overflow-hidden border border-cyan-500/20 hover:border-cyan-400/80 transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between"
            >
              {/* Card Header Media Placeholder / Graphic */}
              <div className="relative h-36 bg-gradient-to-br from-slate-900 via-slate-950 to-cyan-950/40 p-4 flex flex-col justify-between overflow-hidden">
                {/* Circuit Grid Accent */}
                <div className="absolute inset-0 bg-cyber-grid opacity-30 group-hover:opacity-50 transition-opacity" />
                
                {/* Top Badge: Category */}
                <div className="relative z-10 flex items-center justify-between">
                  <span className={`text-[10px] font-mech font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${colorClass}`}>
                    {cat?.name || ev.department || 'General'}
                  </span>
                  {ev.featured && (
                    <span className="text-[9px] font-mono font-bold text-amber-300 bg-amber-950/80 px-2 py-0.5 rounded border border-amber-500/40 flex items-center gap-1">
                      <Zap className="w-2.5 h-2.5" />
                      STAR
                    </span>
                  )}
                </div>

                {/* Prize Amount Highlight */}
                <div className="relative z-10">
                  <div className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">
                    Cash Prize
                  </div>
                  <div className="text-xl sm:text-2xl font-black font-mech tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-300 to-amber-400 drop-shadow-[0_0_8px_rgba(245,158,11,0.5)]">
                    ₹{ev.prize_amount.toLocaleString('en-IN')}
                    {ev.trophy_info && <span className="text-xs text-slate-300 font-sans ml-1">+ Trophy</span>}
                  </div>
                </div>

                {/* Cyber Corner Line */}
                <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent group-hover:via-cyan-400 transition-colors" />
              </div>

              {/* Card Body */}
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-mech font-bold text-base text-slate-100 group-hover:text-cyan-300 transition-colors leading-snug line-clamp-2">
                    {ev.name}
                  </h3>

                  <div className="mt-2.5 flex flex-col gap-1 text-[11px] font-mono text-slate-400">
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-slate-500" />
                      <span className="truncate">{ev.venue || 'GCEK Campus'}</span>
                    </div>
                  </div>
                </div>

                {/* Card Action Buttons */}
                <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center gap-2">
                  <button
                    onClick={() => {
                      playCyberClick();
                      onSelectEvent(ev);
                    }}
                    className="flex-1 py-1.5 px-3 rounded-lg text-xs font-mech font-bold tracking-wider text-slate-300 hover:text-white bg-slate-900/80 hover:bg-slate-800 border border-slate-700/60 hover:border-cyan-500/40 transition-colors flex items-center justify-center gap-1"
                  >
                    <span>View Details</span>
                    <ArrowUpRight className="w-3 h-3 text-cyan-400" />
                  </button>

                  {ev.google_form_url && ev.google_form_url !== 'NA' ? (
                    <a
                      href={ev.google_form_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => playLaserCharge()}
                      className="py-1.5 px-3 rounded-lg text-xs font-mech font-bold tracking-wider text-white bg-gradient-to-r from-red-600 via-rose-600 to-red-600 hover:from-red-500 hover:to-rose-500 shadow-[0_0_12px_rgba(255,30,66,0.4)] border border-red-400/50 transition-all flex items-center gap-1 group/btn"
                    >
                      <span>Register</span>
                      <ExternalLink className="w-3 h-3 group-hover/btn:translate-x-0.5 transition-transform" />
                    </a>
                  ) : (
                    <button
                      onClick={() => {
                        playCyberClick();
                        setNaAlertEvent(ev.name);
                      }}
                      className="py-1.5 px-3 rounded-lg text-xs font-mech font-bold tracking-wider text-slate-300 bg-slate-800 hover:bg-slate-700 border border-slate-600/50 transition-colors flex items-center gap-1"
                    >
                      <Info className="w-3 h-3 text-cyan-400" />
                      <span>On-Spot</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filteredEvents.length === 0 && (
        <div className="text-center py-12 hud-panel rounded-xl">
          <p className="text-slate-400 font-mono text-sm">No events found matching your criteria.</p>
        </div>
      )}

      {/* Info Modal for NA / On-Spot Events (e.g., Science Exhibition for School Students) */}
      {naAlertEvent && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="hud-panel p-6 rounded-2xl max-w-md w-full border border-cyan-500/40 bg-slate-950 text-center">
            <div className="w-12 h-12 rounded-full bg-cyan-500/20 border border-cyan-400/50 flex items-center justify-center mx-auto mb-4 text-cyan-400">
              <Info className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-mech font-bold text-white mb-2">{naAlertEvent}</h3>
            <p className="text-xs text-slate-300 font-sans leading-relaxed mb-6">
              Registration for this event is conducted directly on-spot at the GCEK Campus during fest days (8 — 10 October 2026) or via respective School/College institutional coordinators.
            </p>
            <button
              onClick={() => setNaAlertEvent(null)}
              className="w-full py-2.5 rounded-xl font-mech font-bold text-xs uppercase tracking-wider text-white bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400"
            >
              Understood
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
