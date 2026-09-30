'use client';

import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { ArrowLeft, Phone } from 'lucide-react';

export default function ContactPage() {
  const contacts = [
    { name: 'Prof. Basanta Kumar Mahapatro', phone: '9438622015' },
    { name: 'Sibaram Panigrahi', phone: '8984705487' },
    { name: 'Atreya Panda', phone: '9439574712' },
    { name: 'Deepti Ranjan Nayak', phone: '9861932511' },
  ];

  return (
    <main className="min-h-screen bg-slate-950 text-white relative selection:bg-cyan-500 selection:text-black">
      <Navbar />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 sm:pt-28 pb-16">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-mono text-slate-400 hover:text-cyan-400 transition-colors mb-6 group"
        >
          <ArrowLeft className="w-4 h-4 text-cyan-400 group-hover:-translate-x-1 transition-transform" />
          <span>Back to Festival Portal</span>
        </Link>

        <div className="space-y-6">
          <div className="text-center sm:text-left">
            <span className="text-[10px] sm:text-xs font-mono uppercase tracking-widest text-cyan-400 bg-cyan-950/80 px-3 py-1 rounded-full border border-cyan-500/40 inline-block mb-3 shadow-[0_0_10px_rgba(0,210,255,0.2)]">
              DIRECT COMMUNICATOR
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black font-mech text-white leading-tight">
              CONTACT ORGANIZERS
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 font-sans mt-2 leading-relaxed">
              Connect directly with the INSPRANO 2K26 team for immediate assistance or festival queries.
            </p>
          </div>

          {/* Contact Numbers Container */}
          <div className="hud-panel p-4 sm:p-6 rounded-2xl sm:rounded-3xl border-2 border-cyan-500/30 bg-slate-950/90 shadow-[0_10px_40px_rgba(0,0,0,0.8),0_0_30px_rgba(0,210,255,0.15)]">
            <div className="space-y-3.5 font-mono">
              {contacts.map((c) => (
                <div
                  key={c.phone}
                  className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-xl bg-slate-900/90 border border-slate-800 hover:border-cyan-500/50 transition-all group"
                >
                  <span className="text-white font-bold text-base sm:text-lg tracking-wide group-hover:text-cyan-300 transition-colors">
                    {c.name}
                  </span>
                  <a
                    href={`tel:${c.phone}`}
                    className="w-full sm:w-auto text-center text-cyan-400 hover:text-cyan-200 font-bold px-5 py-2.5 rounded-xl bg-cyan-950/90 hover:bg-cyan-900 border border-cyan-500/50 hover:border-cyan-400 text-xs sm:text-sm transition-all shadow-[0_0_15px_rgba(0,210,255,0.25)] active:scale-95 flex items-center justify-center gap-2"
                  >
                    <Phone className="w-4 h-4 text-cyan-400" />
                    <span>{c.phone}</span>
                  </a>
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
