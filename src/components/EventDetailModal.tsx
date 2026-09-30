'use client';

import React, { useState } from 'react';
import { X, Award, MapPin, Calendar, ShieldCheck, Zap, ExternalLink } from 'lucide-react';
import { playLaserCharge } from '@/lib/soundFx';

interface EventDetailModalProps {
  event: any | null;
  onClose: () => void;
  onRegister?: (event: any) => void;
}

export default function EventDetailModal({ event, onClose, onRegister }: EventDetailModalProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'prizes'>('overview');

  if (!event) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto min-h-screen">
      <div className="hud-panel cyber-clip w-full max-w-2xl sm:max-w-3xl rounded-2xl border border-cyan-500/40 bg-slate-950 p-5 sm:p-8 relative shadow-[0_0_50px_rgba(0,210,255,0.3)] my-auto max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close modal"
          className="absolute top-5 right-5 p-2 rounded-full bg-slate-900 text-slate-400 hover:text-white border border-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="border-b border-cyan-500/20 pb-4 mb-6">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[10px] font-mech font-bold uppercase tracking-widest text-cyan-400 px-2.5 py-0.5 rounded-full bg-cyan-950/80 border border-cyan-500/30">
              {event.department || 'General Competition'}
            </span>
            {event.featured && (
              <span className="text-[10px] font-mech font-bold uppercase tracking-widest text-amber-400 px-2.5 py-0.5 rounded-full bg-amber-950/80 border border-amber-500/30 flex items-center gap-1">
                <Zap className="w-3 h-3" />
                Featured Event
              </span>
            )}
          </div>
          <h2 className="text-2xl sm:text-3xl font-black font-mech tracking-tight text-white">
            {event.name}
          </h2>
          <div className="mt-2 flex items-center gap-3">
            <span className="text-xs font-mono text-slate-400">Total Prize:</span>
            <span className="text-lg font-black font-mech text-amber-400">
              ₹{event.prize_amount.toLocaleString('en-IN')}
            </span>
          </div>
        </div>

        {/* Tabs: Overview & Prizes & Awards */}
        <div className="flex items-center gap-2 border-b border-slate-800 pb-3 mb-6 overflow-x-auto no-scrollbar">
          {[
            { id: 'overview', label: 'Overview' },
            { id: 'prizes', label: 'Prizes & Awards' },
          ].map((t) => (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id as any)}
              className={`text-xs font-mech font-bold uppercase tracking-wider px-4 py-1.5 rounded-lg transition-colors whitespace-nowrap ${
                activeTab === t.id
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="min-h-[160px] text-sm">
          {activeTab === 'overview' && (
            <div className="space-y-4">
              <p className="text-slate-300 font-sans leading-relaxed">
                {event.short_description || event.full_description || 'Official challenge guidelines and challenge framework for INSPRANO 2K26.'}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center gap-2.5">
                  <Calendar className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                  <div>
                    <div className="text-[10px] font-mono text-slate-400 uppercase">Date</div>
                    <div className="text-xs font-mech font-bold text-slate-200">
                      {event.event_date || '8 — 10 October 2026'}
                    </div>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center gap-2.5">
                  <MapPin className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                  <div>
                    <div className="text-[10px] font-mono text-slate-400 uppercase">Venue</div>
                    <div className="text-xs font-mech font-bold text-slate-200">
                      {event.venue || 'GCEK Campus, Bhawanipatna'}
                    </div>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center gap-2.5">
                  <ShieldCheck className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                  <div>
                    <div className="text-[10px] font-mono text-slate-400 uppercase">Registration Fee</div>
                    <div className="text-xs font-mech font-bold text-slate-200">
                      {event.registration_fee ? `₹${event.registration_fee}` : 'Free / Included'}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'prizes' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-gradient-to-r from-amber-950/40 to-slate-900 border border-amber-500/30 flex items-center justify-between">
                <div>
                  <div className="text-xs font-mono text-amber-400 uppercase tracking-wider">First Prize / Winner</div>
                  <div className="text-2xl font-black font-mech text-white mt-0.5">
                    ₹{(event.first_prize || event.prize_amount).toLocaleString('en-IN')}
                  </div>
                </div>
                <Award className="w-8 h-8 text-amber-400" />
              </div>

              {event.trophy_info && (
                <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center gap-2">
                  <Award className="w-4 h-4 text-cyan-400" />
                  <span className="text-xs font-mono text-slate-300">
                    Additional Awards: <strong className="text-white">{event.trophy_info}</strong>
                  </span>
                </div>
              )}


            </div>
          )}
        </div>

        {/* Modal Actions */}
        <div className="mt-8 pt-4 border-t border-slate-800 flex items-center justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-mech font-bold uppercase tracking-wider text-slate-400 hover:text-white"
          >
            Close
          </button>

          {event.google_form_url && event.google_form_url !== 'NA' ? (
            <a
              href={event.google_form_url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => playLaserCharge()}
              className="px-6 py-2.5 rounded-xl text-xs font-mech font-bold uppercase tracking-wider text-white bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 shadow-[0_0_15px_rgba(255,30,66,0.4)] border border-red-400/50 flex items-center gap-2"
            >
              <span>Register Now</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          ) : (
            <div className="text-xs font-mono text-cyan-400 px-4 py-2 rounded-xl bg-cyan-950/40 border border-cyan-500/30">
              Registration On-Spot at Venue
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
