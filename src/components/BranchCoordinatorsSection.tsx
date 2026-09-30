'use client';

import React, { useState } from 'react';
import { Award, UserCheck, Phone, Mail, ChevronRight, GraduationCap, Building2, Zap, Cpu, Settings, Radio } from 'lucide-react';
import { playCyberClick } from '@/lib/soundFx';

export interface BranchCoordinator {
  id: string;
  name: string;
  role: string;
  department: string;
  year?: string;
  phone?: string;
  email?: string;
  photo_url?: string;
}

export interface BranchData {
  slug: string;
  name: string;
  fullName: string;
  icon: any;
  hod: {
    name: string;
    designation: string;
    photo_url?: string;
    email?: string;
    phone?: string;
  };
  studentCoordinators: BranchCoordinator[];
}

export default function BranchCoordinatorsSection() {
  const [selectedBranch, setSelectedBranch] = useState<string>('me');

  const branchesData: Record<string, BranchData> = {
    me: {
      slug: 'me',
      name: 'ME',
      fullName: 'Mechanical Engineering',
      icon: Settings,
      hod: {
        name: 'Dr. Mrutyunjay Rout',
        designation: 'Head of Department (HOD) — Mechanical Engineering',
        photo_url: 'https://i.ibb.co/vxZVyVD5/Whats-App-Image-2026-09-29-at-12-14-07-AM.jpg',
      },
      studentCoordinators: [
        {
          id: 'me-1',
          name: 'Deepti Ranjan Nayak',
          role: 'ME Student Coordinator',
          department: 'Mechanical Engineering (ME)',
          phone: '9861932511',
          photo_url: 'https://i.ibb.co/NdtfBMSs/Whats-App-Image-2026-09-29-at-1-15-37-AM.jpg',
        },
      ],
    },
    cse: {
      slug: 'cse',
      name: 'CSE',
      fullName: 'Computer Science & Engineering',
      icon: Cpu,
      hod: {
        name: 'Dr. Dillip Ranjan Nayak',
        designation: 'Head of Department (HOD) — Computer Science & Engineering',
        photo_url: 'https://i.ibb.co/4RSWqxG4/Whats-App-Image-2026-09-29-at-12-28-28-AM.jpg',
      },
      studentCoordinators: [
        {
          id: 'cse-1',
          name: 'Deepak Kumar Kar',
          role: 'CSE Student Coordinator',
          department: 'Computer Science & Engineering (CSE)',
          phone: '9078322252',
          photo_url: 'https://i.ibb.co/tjcTndV/Whats-App-Image-2026-09-29-at-12-29-07-AM.jpg',
        },
      ],
    },
    ee: {
      slug: 'ee',
      name: 'EE',
      fullName: 'Electrical Engineering',
      icon: Zap,
      hod: {
        name: 'Dr. ASINI KUMAR BALIARSINGH',
        designation: 'Head of Department (HOD) — Electrical Engineering',
        photo_url: 'https://i.ibb.co/gbcRry6b/Whats-App-Image-2026-09-29-at-12-51-07-AM.jpg',
      },
      studentCoordinators: [
        {
          id: 'ee-1',
          name: 'Susil Kumar Sahu',
          role: 'EE Student Coordinator',
          department: 'Electrical Engineering (EE)',
          phone: '8249924075',
          photo_url: 'https://i.ibb.co/4RS5rcwB/Whats-App-Image-2026-09-29-at-12-53-39-AM.jpg',
        },
      ],
    },
    ce: {
      slug: 'ce',
      name: 'CE',
      fullName: 'Civil Engineering',
      icon: Building2,
      hod: {
        name: 'Dr. P Sanghamitra',
        designation: 'Head of Department (HOD) — Civil Engineering',
        photo_url: 'https://i.ibb.co/pvpWtrVj/Whats-App-Image-2026-09-29-at-12-56-20-AM.jpg',
      },
      studentCoordinators: [
        {
          id: 'ce-1',
          name: 'Subhasree Nayak',
          role: 'CE Student Coordinator',
          department: 'Civil Engineering (CE)',
          phone: '8338002322',
          photo_url: 'https://i.ibb.co/27bVDkXq/IMG-20251116-150926068-jpg-2.jpg',
        },
      ],
    },
    ece: {
      slug: 'ece',
      name: 'ECE',
      fullName: 'Electronics & Communication Engineering',
      icon: Radio,
      hod: {
        name: 'Dr. Jayanta Kumar Panigrahi',
        designation: 'Head of Department (HOD) — Electronics & Communication Engineering',
        photo_url: 'https://i.ibb.co/ynnNgfff/Whats-App-Image-2026-09-29-at-1-02-16-AM.jpg',
      },
      studentCoordinators: [
        {
          id: 'ece-1',
          name: 'Subrat Kumar Mahanta',
          role: 'ECE Student Coordinator',
          department: 'Electronics & Communication Engineering (ECE)',
          phone: '7008585565',
          photo_url: 'https://i.ibb.co/nNDdzcfj/Whats-App-Image-2026-09-29-at-1-02-27-AM.jpg',
        },
      ],
    },
  };

  const currentBranch = branchesData[selectedBranch] || branchesData.me;

  return (
    <section id="departments" className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Header */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono uppercase tracking-widest mb-3">
          <GraduationCap className="w-3.5 h-3.5 text-cyan-400" />
          <span>DEPARTMENT HODS & STUDENT COORDINATORS</span>
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-mech tracking-wider text-transparent bg-clip-text bg-gradient-to-b from-white via-slate-100 to-cyan-300">
          BRANCH LEADERSHIP
        </h2>
        <p className="mt-2 text-sm sm:text-base text-slate-400 max-w-2xl mx-auto font-sans">
          Head of Departments & Branch Student Coordinators across 5 Engineering Disciplines.
        </p>
      </div>

      {/* Branch Selector Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-10">
        {Object.values(branchesData).map((b) => {
          const Icon = b.icon;
          const isActive = selectedBranch === b.slug;

          return (
            <button
              key={b.slug}
              onClick={() => {
                playCyberClick();
                setSelectedBranch(b.slug);
              }}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-mech font-bold text-xs sm:text-sm tracking-wider uppercase transition-all duration-300 ${
                isActive
                  ? 'bg-cyan-500 text-black border-2 border-cyan-300 shadow-[0_0_20px_rgba(0,210,255,0.5)] scale-105'
                  : 'bg-slate-900/80 text-slate-300 hover:text-cyan-300 border border-slate-800 hover:border-cyan-500/40'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{b.name}</span>
            </button>
          );
        })}
      </div>

      {/* Active Branch Display Panel */}
      <div className="hud-panel rounded-3xl p-6 sm:p-8 border-2 border-cyan-500/30 shadow-[0_10px_40px_rgba(0,0,0,0.8),0_0_30px_rgba(0,210,255,0.15)] max-w-5xl mx-auto">
        {/* Branch Title Bar */}
        <div className="flex items-center gap-3 pb-6 mb-6 border-b border-slate-800">
          <div className="p-3 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
            {React.createElement(currentBranch.icon, { className: 'w-6 h-6' })}
          </div>
          <div>
            <h3 className="font-mech font-black text-2xl sm:text-3xl text-white tracking-wide">
              {currentBranch.fullName} ({currentBranch.name})
            </h3>
            <p className="text-xs font-mono text-cyan-400 mt-0.5">
              Government College of Engineering Kalahandi, Bhawanipatna
            </p>
          </div>
        </div>

        {/* HOD Showcase Card */}
        <div className="mb-8">
          <div className="text-xs font-mono uppercase tracking-widest text-slate-400 mb-3 flex items-center gap-2">
            <Award className="w-4 h-4 text-cyan-400" />
            <span>HEAD OF DEPARTMENT (HOD)</span>
          </div>

          <div className="hud-panel rounded-2xl p-5 border border-cyan-500/40 bg-slate-900/80 flex flex-col sm:flex-row items-center sm:items-start gap-5">
            {/* HOD Photo */}
            <div className="relative w-36 h-36 sm:w-40 sm:h-40 flex-shrink-0 rounded-xl overflow-hidden border-2 border-cyan-400 p-1 bg-slate-950 shadow-[0_0_20px_rgba(0,210,255,0.3)]">
              {currentBranch.hod.photo_url ? (
                <img
                  src={currentBranch.hod.photo_url}
                  alt={currentBranch.hod.name}
                  className="w-full h-full object-cover object-top rounded-lg"
                />
              ) : (
                <div className="w-full h-full rounded-lg bg-slate-800 flex items-center justify-center text-cyan-400 font-mech font-bold text-3xl">
                  {currentBranch.hod.name.charAt(0)}
                </div>
              )}
            </div>

            {/* HOD Details */}
            <div className="flex-1 text-center sm:text-left">
              <div className="text-[10px] font-mech font-bold uppercase tracking-wider text-cyan-300 px-3 py-0.5 rounded-full bg-cyan-950/90 border border-cyan-500/40 inline-block mb-2">
                HOD — {currentBranch.name}
              </div>
              <h4 className="font-mech font-black text-xl sm:text-2xl text-white tracking-wide">
                {currentBranch.hod.name}
              </h4>
              <p className="text-xs sm:text-sm font-semibold text-cyan-400 font-sans mt-1">
                {currentBranch.hod.designation}
              </p>
              <p className="text-xs text-slate-300 font-sans mt-2 leading-relaxed">
                Leading academic excellence, technical research, and event guidance for {currentBranch.fullName} at Government College of Engineering Kalahandi.
              </p>
            </div>
          </div>
        </div>

        {/* Student Coordinators Section */}
        <div>
          <div className="text-xs font-mono uppercase tracking-widest text-slate-400 mb-3 flex items-center gap-2">
            <UserCheck className="w-4 h-4 text-cyan-400" />
            <span>BRANCH STUDENT COORDINATORS</span>
          </div>

          {currentBranch.studentCoordinators.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {currentBranch.studentCoordinators.map((coord) => (
                <div
                  key={coord.id}
                  className="rounded-2xl p-4 border border-slate-800 bg-slate-950/70 flex items-center gap-4 hover:border-cyan-500/40 transition-colors"
                >
                  <div className="w-16 h-16 rounded-xl overflow-hidden border border-cyan-400/60 p-0.5 bg-slate-900 flex-shrink-0">
                    {coord.photo_url ? (
                      <img src={coord.photo_url} alt={coord.name} className="w-full h-full object-cover rounded-lg" />
                    ) : (
                      <div className="w-full h-full rounded-lg bg-slate-800 flex items-center justify-center text-cyan-400 font-bold text-lg">
                        {coord.name.charAt(0)}
                      </div>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <h5 className="font-mech font-bold text-base text-white truncate">{coord.name}</h5>
                    <p className="text-xs text-cyan-400 font-mono">{coord.role}</p>
                    {coord.year && <p className="text-[11px] text-slate-400 font-sans">{coord.year}</p>}
                    {coord.phone && (
                      <a href={`tel:${coord.phone}`} className="inline-flex items-center gap-1 text-[11px] font-mono text-slate-300 hover:text-cyan-400 mt-1">
                        <Phone className="w-3 h-3 text-cyan-400" />
                        <span>{coord.phone}</span>
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="rounded-2xl p-6 border border-dashed border-slate-800 text-center bg-slate-950/40">
              <p className="text-xs sm:text-sm text-slate-400 font-mono">
                Student Coordinators for {currentBranch.name} branch will be announced soon.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
