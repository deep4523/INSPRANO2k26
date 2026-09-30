'use client';

import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { ArrowLeft, Scale, ShieldCheck, CheckCircle2 } from 'lucide-react';

export default function RulesPage() {
  const coreRules = [
    'Participants must maintain discipline and respectful conduct throughout INSPRANO and follow all event guidelines, schedules, and instructions.',
    'Cheating, misconduct, abusive behavior, or violation of rules may result in disqualification.',
    'Participants must report on time with valid registration details and required materials.',
    'For every event, the decision of the respective Coordinators and Co-Coordinators shall be final and binding.',
    'By participating in INSPRANO, all participants agree to follow the rules and decisions of the organizing committee.',
  ];

  return (
    <main className="min-h-screen bg-slate-950 text-white relative selection:bg-cyan-500 selection:text-black">
      <Navbar />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 sm:pt-28 pb-16">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-mono text-slate-400 hover:text-cyan-400 transition-colors mb-6 group"
        >
          <ArrowLeft className="w-4 h-4 text-cyan-400 group-hover:-translate-x-1 transition-transform" />
          <span>Back to Festival Portal</span>
        </Link>

        {/* Header */}
        <div className="text-center mb-10">
          <span className="text-[10px] sm:text-xs font-mono uppercase tracking-widest text-cyan-400 bg-cyan-950/80 px-3 py-1 rounded-full border border-cyan-500/40 inline-block mb-3 shadow-[0_0_10px_rgba(0,210,255,0.2)]">
            OFFICIAL POLICY & CODE OF CONDUCT
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black font-mech tracking-wider text-white">
            INSPRANO – RULES & REGULATIONS
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 font-sans mt-2 max-w-xl mx-auto leading-relaxed">
            Official guidelines, code of conduct, and coordinator authority binding all INSPRANO participants.
          </p>
        </div>

        {/* Main Official Rules & Regulations Card */}
        <div className="hud-panel p-6 sm:p-8 rounded-3xl border-2 border-cyan-500/30 bg-slate-950/90 shadow-[0_10px_40px_rgba(0,0,0,0.8),0_0_30px_rgba(0,210,255,0.15)] space-y-6">
          <div className="flex items-center gap-3 border-b border-cyan-500/20 pb-4">
            <div className="p-2.5 rounded-xl bg-cyan-950 border border-cyan-500/40 text-cyan-400 shadow-[0_0_15px_rgba(0,210,255,0.25)]">
              <Scale className="w-6 h-6 text-cyan-400" />
            </div>
            <div>
              <h2 className="font-mech font-black text-lg sm:text-xl text-white tracking-wide">
                FESTIVAL CODE OF CONDUCT & BINDING RULES
              </h2>
              <span className="text-xs font-mono text-cyan-400">
                Government College of Engineering Kalahandi, Bhawanipatna
              </span>
            </div>
          </div>

          {/* Full Official Paragraph Text */}
          <div className="p-4 sm:p-5 rounded-2xl bg-slate-900/90 border border-slate-800 text-xs sm:text-sm text-slate-200 leading-relaxed font-sans shadow-inner">
            Participants must maintain discipline and respectful conduct throughout INSPRANO and follow all event guidelines, schedules, and instructions. Cheating, misconduct, abusive behavior, or violation of rules may result in disqualification. Participants must report on time with valid registration details and required materials. For every event, the decision of the respective Coordinators and Co-Coordinators shall be final and binding. By participating in INSPRANO, all participants agree to follow the rules and decisions of the organizing committee.
          </div>

          {/* Bulleted Key Points Breakdown */}
          <div className="space-y-3 pt-2">
            <h3 className="text-xs font-mech font-bold uppercase tracking-wider text-cyan-300 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-cyan-400" />
              <span>KEY REGULATION HIGHLIGHTS</span>
            </h3>
            <div className="grid grid-cols-1 gap-2.5 font-sans">
              {coreRules.map((rule, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-cyan-500/40 transition-colors"
                >
                  <div className="w-2 h-2 rounded-full bg-cyan-400 mt-1.5 flex-shrink-0 shadow-[0_0_8px_rgba(0,210,255,0.6)]" />
                  <span className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
                    {rule}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
