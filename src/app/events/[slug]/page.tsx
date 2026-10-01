'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import RegistrationModal from '@/components/RegistrationModal';
import {
  Calendar,
  Clock,
  MapPin,
  Award,
  ArrowLeft,
  Zap,
  CheckCircle2,
  ExternalLink,
} from 'lucide-react';
import { playLaserCharge } from '@/lib/soundFx';

export default function EventDetailPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params?.slug as string;

  const [event, setEvent] = useState<any | null>(null);
  const [allEvents, setAllEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);

  useEffect(() => {
    if (!slug) return;

    const fetchEvent = async () => {
      try {
        const [detailRes, allRes] = await Promise.all([
          fetch(`/api/events/${slug}`),
          fetch('/api/events'),
        ]);

        const detailData = await detailRes.json();
        const allData = await allRes.json();

        if (!detailRes.ok || !detailData.success) {
          throw new Error(detailData.error || 'Event not found');
        }

        setEvent(detailData.data);
        if (allData.success) setAllEvents(allData.data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [slug]);

  if (loading) {
    return (
      <main className="min-h-screen bg-slate-950 text-white flex flex-col justify-between">
        <Navbar />
        <div className="flex-1 flex flex-col items-center justify-center py-32">
          <div className="w-12 h-12 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin mb-4" />
          <p className="font-mono text-xs uppercase tracking-widest text-cyan-400">Loading Event Challenge...</p>
        </div>
        <Footer />
      </main>
    );
  }

  if (error || !event) {
    return (
      <main className="min-h-screen bg-slate-950 text-white flex flex-col justify-between">
        <Navbar />
        <div className="flex-1 flex flex-col items-center justify-center py-32 px-4 text-center">
          <h1 className="text-3xl font-black font-mech text-red-500">EVENT NOT FOUND</h1>
          <p className="text-slate-400 font-mono text-sm mt-2">The requested competition challenge was not found in the festival registry.</p>
          <Link
            href="/#events"
            className="mt-6 px-6 py-2.5 rounded-xl font-mech font-bold text-xs uppercase tracking-wider text-white bg-slate-900 border border-cyan-500/40 hover:border-cyan-400"
          >
            ← Back to All Events
          </Link>
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white relative">
      <Navbar />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16">
        {/* Back Link */}
        <Link
          href="/#events"
          className="inline-flex items-center gap-2 text-xs font-mono text-slate-400 hover:text-cyan-400 transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Arena Events</span>
        </Link>

        {/* ========================================================================= */}
        {/* 1. EVENT HEADER                                                           */}
        {/* ========================================================================= */}
        <div className="hud-panel rounded-3xl p-6 sm:p-10 border border-cyan-500/30 relative overflow-hidden mb-8">
          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div>
              <div className="flex flex-wrap items-center gap-2.5 mb-3">
                <span className="text-[11px] font-mech font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-cyan-300">
                  {event.department || event.category?.name || 'General'}
                </span>
                <span className="text-[11px] font-mono font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  REGISTRATION OPEN
                </span>
                {event.featured && (
                  <span className="text-[11px] font-mech font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-amber-950/80 border border-amber-500/40 text-amber-300 flex items-center gap-1.5">
                    <Zap className="w-3.5 h-3.5" />
                    FLAGSHIP EVENT
                  </span>
                )}
              </div>

              <h1 className="text-3xl sm:text-5xl font-black font-mech tracking-tight text-white">
                {event.name}
              </h1>

              <p className="text-sm text-slate-400 font-sans mt-3 max-w-2xl leading-relaxed">
                {event.short_description || 'Official challenge and competitive benchmark at INSPRANO 2K26.'}
              </p>
            </div>

            {/* Prize & CTA Card */}
            <div className="lg:text-right flex flex-col items-start lg:items-end justify-between p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400">Total Prize Pool</span>
              <div className="text-3xl sm:text-4xl font-black font-mech text-amber-400 drop-shadow-[0_0_12px_rgba(245,158,11,0.5)] my-1">
                ₹{event.prize_amount.toLocaleString('en-IN')}
              </div>
              {event.trophy_info && (
                <div className="text-xs font-mono text-slate-300 mb-3">{event.trophy_info}</div>
              )}
              {event.google_form_url && event.google_form_url !== 'NA' ? (
                <a
                  href={event.google_form_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => playLaserCharge()}
                  className="w-full sm:w-auto px-8 py-3 rounded-xl font-mech font-black text-xs sm:text-sm uppercase tracking-wider text-white bg-gradient-to-r from-red-600 via-rose-600 to-red-600 hover:from-red-500 shadow-[0_0_20px_rgba(255,30,66,0.5)] border border-red-400 transition-all flex items-center justify-center gap-2"
                >
                  <span>Register Now</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              ) : (
                <div className="text-xs font-mono text-cyan-400 px-6 py-3 rounded-xl bg-cyan-950/60 border border-cyan-500/40">
                  On-Spot Registration at GCEK Venue
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 2. EVENT INFORMATION CARDS (Date, Time, Venue)                             */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="hud-panel p-4 rounded-2xl border border-slate-800">
            <Calendar className="w-5 h-5 text-cyan-400 mb-2" />
            <div className="text-[10px] font-mono uppercase text-slate-400">Event Date</div>
            <div className="text-sm font-mech font-bold text-white mt-0.5">
              {event.event_date || '8 — 10 Oct 2026'}
            </div>
          </div>

          <div className="hud-panel p-4 rounded-2xl border border-slate-800">
            <Clock className="w-5 h-5 text-cyan-400 mb-2" />
            <div className="text-[10px] font-mono uppercase text-slate-400">Schedule Time</div>
            <div className="text-sm font-mech font-bold text-white mt-0.5">
              {event.start_time ? `${event.start_time} - ${event.end_time || ''}` : 'To be announced'}
            </div>
          </div>

          <div className="hud-panel p-4 rounded-2xl border border-slate-800">
            <MapPin className="w-5 h-5 text-cyan-400 mb-2" />
            <div className="text-[10px] font-mono uppercase text-slate-400">Venue</div>
            <div className="text-sm font-mech font-bold text-white mt-0.5 truncate">
              {event.venue || 'GCEK Campus, Bhawanipatna'}
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 3. DETAILS: ABOUT & PRIZES                                               */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content (2 Columns) */}
          <div className="lg:col-span-2 space-y-6">
            {/* About Event */}
            <div className="hud-panel p-6 sm:p-8 rounded-2xl border border-slate-800">
              <h2 className="text-lg font-mech font-bold text-white mb-3">ABOUT THE EVENT</h2>
              <div className="text-sm text-slate-300 font-sans leading-relaxed whitespace-pre-line">
                {event.full_description || event.short_description || 'Details regarding competition parameters and evaluation rubrics will be announced.'}
              </div>
            </div>

            {/* Rounds Flow */}
            <div className="hud-panel p-6 sm:p-8 rounded-2xl border border-slate-800">
              <h2 className="text-lg font-mech font-bold text-white mb-3">EVENT FLOW / ROUNDS</h2>
              <div className="space-y-3">
                <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-mech text-xs font-bold flex-shrink-0">
                    1
                  </div>
                  <div>
                    <h3 className="font-mech font-bold text-sm text-white">Round 1: Preliminary Assessment</h3>
                    <p className="text-xs text-slate-400 font-sans mt-0.5">Initial screening, submission review, or qualifier challenge.</p>
                  </div>
                </div>

                {event.rounds_count > 1 && (
                  <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-mech text-xs font-bold flex-shrink-0">
                      2
                    </div>
                    <div>
                      <h3 className="font-mech font-bold text-sm text-white">Round 2: Grand Finals & Live Defense</h3>
                      <p className="text-xs text-slate-400 font-sans mt-0.5">Podium defense, live working model demo, or final evaluation before jury.</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar (1 Column): Prizes Breakdown */}
          <div className="space-y-6">
            {/* Prizes Box */}
            <div className="hud-panel p-6 rounded-2xl border border-amber-500/30">
              <div className="flex items-center gap-2 text-amber-400 font-mech font-bold text-sm mb-4">
                <Award className="w-5 h-5" />
                <span>PRIZE DISTRIBUTION</span>
              </div>

              <div className="space-y-3 font-mono">
                <div className="p-3 rounded-xl bg-amber-950/30 border border-amber-500/30 flex justify-between items-center">
                  <span className="text-xs text-slate-300">Total Prize</span>
                  <span className="text-base font-black font-mech text-amber-400">
                    ₹{event.prize_amount.toLocaleString('en-IN')}
                  </span>
                </div>

                {event.second_prize > 0 && (
                  <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 flex justify-between items-center">
                    <span className="text-xs text-slate-300">2nd Place / Runner Up</span>
                    <span className="text-sm font-black font-mech text-slate-200">
                      ₹{event.second_prize.toLocaleString('en-IN')}
                    </span>
                  </div>
                )}

                {event.third_prize > 0 && (
                  <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 flex justify-between items-center">
                    <span className="text-xs text-slate-300">3rd Place</span>
                    <span className="text-sm font-black font-mech text-slate-300">
                      ₹{event.third_prize.toLocaleString('en-IN')}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Quick Registration Button */}
            <button
              onClick={() => setIsRegisterOpen(true)}
              className="w-full py-3.5 rounded-xl font-mech font-bold text-xs uppercase tracking-wider text-white bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 shadow-[0_0_20px_rgba(0,210,255,0.4)] border border-cyan-400"
            >
              Register For {event.name}
            </button>
          </div>
        </div>
      </div>

      <Footer />

      {/* Registration Modal */}
      {isRegisterOpen && (
        <RegistrationModal
          events={allEvents.length > 0 ? allEvents : [event]}
          initialEvent={event}
          onClose={() => setIsRegisterOpen(false)}
        />
      )}
    </main>
  );
}
