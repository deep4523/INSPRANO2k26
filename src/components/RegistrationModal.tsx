'use client';

import React, { useState, useMemo } from 'react';
import { X, ExternalLink, Search, Sparkles, Award, Users, MapPin, CheckCircle, Info, Zap, Calendar } from 'lucide-react';
import { playCyberClick, playLaserCharge } from '@/lib/soundFx';

interface RegistrationModalProps {
  events: any[];
  initialEvent?: any;
  onClose: () => void;
}

export default function RegistrationModal({
  events,
  initialEvent,
  onClose,
}: RegistrationModalProps) {
  const [selectedEventId, setSelectedEventId] = useState<number>(
    initialEvent?.id || (events.find(e => e.id === 5)?.id || events[0]?.id || 1)
  );
  const [searchFilter, setSearchFilter] = useState('');
  const [branchFilter, setBranchFilter] = useState<string>('all');

  const branches = [
    { id: 'all', label: 'All Disciplines' },
    { id: 'cse', label: 'CSE' },
    { id: 'mechanical', label: 'ME' },
    { id: 'ee-ece', label: 'EE / ECE' },
    { id: 'civil', label: 'CE (Civil)' },
    { id: 'general', label: 'General' },
    { id: 'esports', label: 'Esports' },
  ];

  const filteredEvents = useMemo(() => {
    return events.filter(e => {
      if (branchFilter !== 'all') {
        const dept = (e.department || '').toLowerCase();
        const catId = e.category_id;
        if (branchFilter === 'cse' && catId !== 3 && !dept.includes('cse')) return false;
        if (branchFilter === 'mechanical' && catId !== 2 && !dept.includes('mech')) return false;
        if (branchFilter === 'ee-ece' && catId !== 5 && !dept.includes('ee') && !dept.includes('ece')) return false;
        if (branchFilter === 'civil' && catId !== 4 && !dept.includes('civil')) return false;
        if (branchFilter === 'general' && catId !== 1 && !dept.includes('general')) return false;
        if (branchFilter === 'esports' && catId !== 6 && !dept.includes('esports')) return false;
      }
      if (searchFilter.trim()) {
        const q = searchFilter.toLowerCase();
        const matchesName = e.name.toLowerCase().includes(q);
        const matchesDept = (e.department || '').toLowerCase().includes(q);
        if (!matchesName && !matchesDept) return false;
      }
      return true;
    });
  }, [events, branchFilter, searchFilter]);

  const currentEvent = events.find(e => e.id === Number(selectedEventId)) || events[0];

  const handleOpenForm = (url?: string) => {
    if (url && url !== 'NA') {
      playLaserCharge();
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="hud-panel cyber-clip w-full max-w-3xl rounded-3xl border border-cyan-500/40 bg-slate-950 p-5 sm:p-8 relative shadow-[0_0_60px_rgba(0,210,255,0.3)] my-6 max-h-[92vh] flex flex-col justify-between overflow-hidden">
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute top-5 right-5 p-2 rounded-full bg-slate-900 text-slate-400 hover:text-white border border-slate-800 transition-colors z-20"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="border-b border-cyan-500/20 pb-4 mb-4">
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-[10px] font-mech font-bold uppercase tracking-widest text-cyan-400 px-2.5 py-0.5 rounded-full bg-cyan-950/80 border border-cyan-500/30 flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-cyan-400" />
              OFFICIAL REGISTRATION PORTAL
            </span>
            <span className="text-[10px] font-mono text-slate-400">INSPRANO 2K26</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black font-mech tracking-tight text-white">
            SELECT EVENT TO REGISTER
          </h2>
          <p className="text-xs text-slate-400 font-sans mt-1">
            Choose your competition below. Clicking register opens the official Google Form registration sheet.
          </p>
        </div>

        {/* Main Body: Event Selector + Active Spotlight */}
        <div className="flex-1 overflow-y-auto pr-1 space-y-4">
          {/* Active Event Showcase Card */}
          {currentEvent && (
            <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-950 to-cyan-950/50 border-2 border-cyan-400/80 shadow-[0_0_25px_rgba(0,210,255,0.25)] relative overflow-hidden">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="text-[10px] font-mech font-bold uppercase tracking-wider text-cyan-300 px-2 py-0.5 rounded bg-cyan-950/80 border border-cyan-500/30">
                      {currentEvent.department || 'General'}
                    </span>
                    {currentEvent.featured && (
                      <span className="text-[10px] font-mono font-bold uppercase text-amber-300 bg-amber-950/80 px-2 py-0.5 rounded border border-amber-500/30 flex items-center gap-1">
                        <Zap className="w-2.5 h-2.5" />
                        STAR EVENT
                      </span>
                    )}
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black font-mech text-white leading-tight">
                    {currentEvent.name}
                  </h3>
                  <div className="mt-2 flex flex-wrap items-center gap-3 sm:gap-4 text-xs font-mono text-slate-300">
                    <div className="flex items-center gap-1 text-amber-400 font-bold">
                      <Award className="w-3.5 h-3.5" />
                      <span>₹{currentEvent.prize_amount.toLocaleString('en-IN')} Cash Prize</span>
                    </div>
                  </div>
                </div>

                {/* Direct Action Button */}
                <div className="sm:text-right">
                  {currentEvent.google_form_url && currentEvent.google_form_url !== 'NA' ? (
                    <button
                      onClick={() => handleOpenForm(currentEvent.google_form_url)}
                      className="w-full sm:w-auto px-6 py-3 rounded-xl font-mech font-black text-xs sm:text-sm uppercase tracking-wider text-white bg-gradient-to-r from-red-600 via-rose-600 to-red-600 hover:from-red-500 hover:to-rose-500 shadow-[0_0_20px_rgba(255,30,66,0.6)] border border-red-400 transition-all transform hover:scale-105 flex items-center justify-center gap-2"
                    >
                      <span>REGISTER NOW</span>
                      <ExternalLink className="w-4 h-4" />
                    </button>
                  ) : (
                    <div className="p-3 rounded-xl bg-slate-900 border border-slate-700 text-xs font-mono text-cyan-300 text-center">
                      On-Spot Registration at GCEK Venue
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Quick Filters Bar */}
          <div className="flex flex-col sm:flex-row gap-2 pt-1">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search all 28 events..."
                value={searchFilter}
                onChange={(e) => setSearchFilter(e.target.value)}
                className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-900/80 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
              />
            </div>

            {/* Branch Filter Pills */}
            <div className="flex items-center gap-1 overflow-x-auto no-scrollbar pb-1">
              {branches.map(b => (
                <button
                  key={b.id}
                  onClick={() => {
                    playCyberClick();
                    setBranchFilter(b.id);
                  }}
                  className={`px-3 py-1.5 rounded-lg text-[11px] font-mech font-bold uppercase tracking-wider whitespace-nowrap transition-colors ${
                    branchFilter === b.id
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                      : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                  }`}
                >
                  {b.label}
                </button>
              ))}
            </div>
          </div>

          {/* All Events List (Clicking any event selects it and offers instant 1-click Google Form launch) */}
          <div className="space-y-2 max-h-[220px] sm:max-h-[260px] overflow-y-auto pr-1">
            {filteredEvents.map((ev, index) => {
              const isSelected = ev.id === currentEvent?.id;
              return (
                <div
                  key={ev.id}
                  onClick={() => {
                    playCyberClick();
                    setSelectedEventId(ev.id);
                  }}
                  className={`p-3 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                    isSelected
                      ? 'bg-cyan-950/40 border-cyan-400/80 shadow-[0_0_12px_rgba(0,210,255,0.2)]'
                      : 'bg-slate-900/50 hover:bg-slate-900 border-slate-800 hover:border-cyan-500/40'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="text-[10px] font-mono text-slate-500 w-5 text-right font-bold">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <div className="min-w-0">
                      <h4 className={`text-xs sm:text-sm font-mech font-bold truncate ${isSelected ? 'text-cyan-300' : 'text-slate-200'}`}>
                        {ev.name}
                      </h4>
                      <div className="text-[10px] font-mono text-slate-400 truncate">
                        {ev.department || 'General Competition'} • ₹{ev.prize_amount.toLocaleString('en-IN')}
                      </div>
                    </div>
                  </div>

                  {/* Direct Launch Button */}
                  {ev.google_form_url && ev.google_form_url !== 'NA' ? (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleOpenForm(ev.google_form_url);
                      }}
                      className="px-3 py-1.5 rounded-lg text-[10px] font-mech font-bold tracking-wider text-white bg-red-600 hover:bg-red-500 border border-red-400/40 flex items-center gap-1 shadow-[0_0_8px_rgba(255,30,66,0.3)] shrink-0"
                    >
                      <span>Form</span>
                      <ExternalLink className="w-3 h-3" />
                    </button>
                  ) : (
                    <span className="text-[10px] font-mono text-slate-500 px-2 py-1 bg-slate-800 rounded shrink-0">
                      On-Spot
                    </span>
                  )}
                </div>
              );
            })}

            {filteredEvents.length === 0 && (
              <div className="text-center py-6 text-slate-500 font-mono text-xs">
                No events matched your search keyword.
              </div>
            )}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs font-mono text-slate-400">
          <span>Total 28 Official Events • ₹85,000+ Prize Pool</span>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white px-3 py-1 rounded-lg hover:bg-slate-900 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
