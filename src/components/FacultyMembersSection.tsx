'use client';

import React from 'react';
import { Award, GraduationCap } from 'lucide-react';

export interface FacultyMember {
  id: string;
  name: string;
  designation: string;
  department?: string;
  photo_url: string;
}

export default function FacultyMembersSection() {
  const facultyMembers: FacultyMember[] = [
    {
      id: 'fac-1',
      name: 'Asst. Prof. (Dr.) Sasmita Nayak',
      designation: 'Faculty Member — INSPRANO 2K26',
      department: 'Government College of Engineering Kalahandi',
      photo_url: 'https://i.ibb.co/4ncPYC1f/Sasmita-Nayak.jpg',
    },
    {
      id: 'fac-2',
      name: 'Asst. Prof. Amrita Dash',
      designation: 'Faculty Member — INSPRANO 2K26',
      department: 'Government College of Engineering Kalahandi',
      photo_url: 'https://i.ibb.co/vxPxpLf3/amritadash.jpg',
    },
    {
      id: 'fac-3',
      name: 'Asst. Prof. Mihir Kumar Nath',
      designation: 'Faculty Member — INSPRANO 2K26',
      department: 'Government College of Engineering Kalahandi',
      photo_url: 'https://i.ibb.co/cSxZZXrS/Whats-App-Image-2026-09-29-at-11-53-30-PM.jpg',
    },
    {
      id: 'fac-4',
      name: 'Asst. Prof. (Dr.) Kaliprasanna Sethy',
      designation: 'Faculty Member — INSPRANO 2K26',
      department: 'Government College of Engineering Kalahandi',
      photo_url: 'https://i.ibb.co/DDbRySXb/Dr-Kaliprasanna-Sethy.jpg',
    },
    {
      id: 'fac-5',
      name: 'Assoc. Prof. (Dr.) Subidita Pattanaik',
      designation: 'Faculty Member — INSPRANO 2K26',
      department: 'Government College of Engineering Kalahandi',
      photo_url: 'https://i.ibb.co/nM2KpTWL/SUBIDITAPATTANAIK.jpg',
    },
    {
      id: 'fac-6',
      name: 'Asst. Prof. (Dr.) Pravas Kumar Panigrahi',
      designation: 'Faculty Member — INSPRANO 2K26',
      department: 'Government College of Engineering Kalahandi',
      photo_url: 'https://i.ibb.co/LdVwyx8z/Pravas-Kr-Panigrahi.jpg',
    },
  ];

  return (
    <section id="faculty-members" className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono uppercase tracking-widest mb-3">
          <GraduationCap className="w-3.5 h-3.5 text-cyan-400" />
          <span>FESTIVAL ADVISORY & FACULTY COUNCIL</span>
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-mech tracking-wider text-transparent bg-clip-text bg-gradient-to-b from-white via-slate-100 to-cyan-300">
          FACULTY MEMBERS OF INSPRANO
        </h2>
        <p className="mt-2 text-sm sm:text-base text-slate-400 max-w-2xl mx-auto font-sans">
          Distinguished faculty members and academic conveners guiding technical innovation and event management for INSPRANO 2K26.
        </p>
      </div>

      {/* Grid Container */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
        {facultyMembers.map((fac) => (
          <div
            key={fac.id}
            className="hud-panel rounded-3xl p-5 sm:p-6 border-2 border-cyan-500/30 hover:border-cyan-400 transition-all duration-300 shadow-[0_10px_40px_rgba(0,0,0,0.8),0_0_30px_rgba(0,210,255,0.15)] flex flex-col items-center text-center group"
          >
            {/* Square Photo Frame */}
            <div className="relative w-40 h-40 sm:w-44 sm:h-44 rounded-2xl overflow-hidden border-2 border-cyan-400/80 p-1 bg-slate-900 shadow-[0_0_20px_rgba(0,210,255,0.25)] mb-4">
              <img
                src={fac.photo_url}
                alt={fac.name}
                className="w-full h-full object-cover object-top rounded-xl group-hover:scale-105 transition-transform duration-300"
              />
            </div>

            {/* Faculty Details */}
            <div className="text-[10px] sm:text-xs font-mech font-bold uppercase tracking-wider text-cyan-300 px-3 py-0.5 rounded-full bg-cyan-950/80 border border-cyan-500/40 inline-block mb-2 shadow-[0_0_10px_rgba(0,210,255,0.2)]">
              FACULTY MEMBER
            </div>

            <h3 className="font-mech font-black text-lg sm:text-xl text-white tracking-wide leading-tight">
              {fac.name}
            </h3>

            <p className="text-xs font-semibold text-cyan-400 font-sans mt-1">
              {fac.designation}
            </p>

            <p className="text-[11px] font-mono text-slate-400 mt-1 leading-snug">
              {fac.department}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
