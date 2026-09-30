'use client';

import React from 'react';
import { Users, Info, Mail, Phone, Linkedin } from 'lucide-react';

interface LeaderItem {
  id: number;
  full_name: string;
  designation: string;
  department?: string;
  role_category: string;
  bio?: string;
  photo_url?: string;
  email?: string;
  phone?: string;
  linkedin_url?: string;
}

export default function LeadershipSection({ leadership = [] }: { leadership?: LeaderItem[] }) {
  const defaultLeadership: LeaderItem[] = [
    {
      id: 1,
      full_name: 'Prof. (Dr.) Shubranshu Sekhar Dash',
      designation: 'Principal',
      department: 'Government College of Engineering Kalahandi, Bhawanipatna',
      role_category: 'PRINCIPAL & CHIEF PATRON',
      bio: 'Principal & Chief Patron of INSPRANO 2K26, guiding technical innovation and academic excellence at Government College of Engineering Kalahandi, Bhawanipatna.',
      photo_url: 'https://i.ibb.co/JR2QZZCQ/Whats-App-Image-2026-09-28-at-11-49-02-AM.jpg',
    },
    {
      id: 2,
      full_name: 'Prof. (Dr.) Chitaranjan Dash',
      designation: 'Dean, Student Welfare (DSW)',
      department: 'Government College of Engineering Kalahandi, Bhawanipatna',
      role_category: 'DEAN STUDENT WELFARE (DSW)',
      bio: 'Dean Student Welfare at Government College of Engineering Kalahandi, Bhawanipatna, guiding student development, activities, and technical innovation for INSPRANO 2K26.',
      photo_url: 'https://i.ibb.co/21RJmXbf/Whats-App-Image-2026-09-28-at-11-05-52-PM.jpg',
    },
    {
      id: 3,
      full_name: 'Prof. Basanta Kumar Mahapatro',
      designation: 'Vice President (VP), INSPRANO 2K26',
      department: 'Government College of Engineering Kalahandi, Bhawanipatna',
      role_category: 'VICE PRESIDENT (VP)',
      bio: 'Vice President of INSPRANO 2K26, coordinating festival operations, technical events, and student innovation at Government College of Engineering Kalahandi, Bhawanipatna.',
      photo_url: 'https://i.ibb.co/9CH4ZbG/IMG-7310-Copy.avif',
      phone: '9438622015',
    },
    {
      id: 4,
      full_name: 'Assoc. Prof. (Dr.) Basanta Kumar Swain',
      designation: 'Registrar',
      department: 'Government College of Engineering Kalahandi, Bhawanipatna',
      role_category: 'REGISTRAR',
      bio: 'Registrar at Government College of Engineering Kalahandi, Bhawanipatna, administrative leader supporting technical innovation and INSPRANO 2K26 operations.',
      photo_url: 'https://i.ibb.co/2YYTCNbM/Whats-App-Image-2026-09-28-at-11-39-24-PM.jpg',
    },
    {
      id: 5,
      full_name: 'Sibaram Panigrahi',
      designation: 'Chief Student Coordinator',
      department: '3rd Year, Mechanical Engineering, GCEK',
      role_category: 'CHIEF STUDENT COORDINATOR',
      bio: 'Chief Student Coordinator of INSPRANO 2K26, leading student teams, festival operations, and event management.',
      photo_url: 'https://i.ibb.co/Ps0jJHHp/Whats-App-Image-2026-09-29-at-1-59-53-AM.jpg',
      phone: '8984705487',
    },
    {
      id: 6,
      full_name: 'Atreya Panda',
      designation: 'Student Chief Co-Coordinator',
      department: '3rd Year, Mechanical Engineering, GCEK',
      role_category: 'STUDENT CHIEF CO-COORDINATOR',
      bio: 'Student Chief Co-Coordinator of INSPRANO 2K26, coordinating festival operations, student leadership, and event execution.',
      photo_url: 'https://i.ibb.co/LXd5vgpX/atreya.jpg',
      phone: '9439574712',
    },
  ];

  const list = leadership.length > 0 ? leadership : defaultLeadership;

  return (
    <section id="leadership" className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono uppercase tracking-widest mb-3">
          <Users className="w-3.5 h-3.5 text-cyan-400" />
          <span>FESTIVAL PATRONS & ADVISORY</span>
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-mech tracking-wider text-transparent bg-clip-text bg-gradient-to-b from-white via-slate-100 to-cyan-300">
          LEADERSHIP
        </h2>
        <p className="mt-2 text-sm sm:text-base text-slate-400 max-w-2xl mx-auto font-sans">
          Guiding the vision, driving the future of Government College of Engineering Kalahandi.
        </p>
      </div>

      {/* Leadership Members Container - 2 Column Grid Layout */}
      {list.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-6xl mx-auto">
          {list.map((leader) => (
            <div
              key={leader.id}
              className="hud-panel rounded-3xl p-5 sm:p-6 border-2 border-cyan-500/30 hover:border-cyan-400 transition-all duration-300 shadow-[0_10px_40px_rgba(0,0,0,0.8),0_0_30px_rgba(0,210,255,0.15)] flex flex-col sm:flex-row items-center sm:items-start gap-5"
            >
              {/* Square Photo Frame */}
              <div className="relative w-40 h-40 sm:w-44 sm:h-44 flex-shrink-0 rounded-2xl overflow-hidden border-2 border-cyan-400/80 p-1 bg-slate-900 shadow-[0_0_20px_rgba(0,210,255,0.25)]">
                {leader.photo_url ? (
                  <img
                    src={leader.photo_url}
                    alt={leader.full_name}
                    className="w-full h-full object-cover object-top rounded-xl"
                  />
                ) : (
                  <div className="w-full h-full rounded-xl bg-slate-800 flex items-center justify-center text-cyan-400 font-mech font-bold text-3xl">
                    {leader.full_name.charAt(0)}
                  </div>
                )}
              </div>

              {/* Leader Information */}
              <div className="flex-1 text-center sm:text-left min-w-0 w-full">
                <div className="text-[10px] sm:text-xs font-mech font-bold uppercase tracking-wider text-cyan-300 px-3 py-0.5 rounded-full bg-cyan-950/80 border border-cyan-500/40 inline-block mb-2 shadow-[0_0_10px_rgba(0,210,255,0.2)]">
                  {leader.role_category}
                </div>

                <h3 className="font-mech font-black text-xl sm:text-2xl text-white tracking-wide leading-tight">
                  {leader.full_name}
                </h3>

                <p className="text-xs sm:text-sm font-semibold text-cyan-400 font-sans mt-1">
                  {leader.designation}
                </p>

                {leader.department && (
                  <p className="text-[11px] sm:text-xs font-mono text-slate-300 mt-1 leading-snug">
                    {leader.department}
                  </p>
                )}

                {leader.bio && (
                  <p className="text-xs text-slate-300 font-sans leading-relaxed mt-3 p-3 rounded-xl bg-slate-950/60 border border-slate-800/80">
                    {leader.bio}
                  </p>
                )}

                {(leader.email || leader.phone || leader.linkedin_url) && (
                  <div className="mt-3 pt-2.5 border-t border-slate-800/80 flex flex-wrap items-center justify-center sm:justify-start gap-3 text-slate-400">
                    {leader.email && (
                      <a href={`mailto:${leader.email}`} className="hover:text-cyan-400 flex items-center gap-1.5 text-xs font-mono transition-colors" title="Email">
                        <Mail className="w-3.5 h-3.5 text-cyan-400" />
                        <span>{leader.email}</span>
                      </a>
                    )}
                    {leader.phone && (
                      <a href={`tel:${leader.phone}`} className="hover:text-cyan-400 flex items-center gap-1.5 text-xs font-mono transition-colors" title="Phone">
                        <Phone className="w-3.5 h-3.5 text-cyan-400" />
                        <span>{leader.phone}</span>
                      </a>
                    )}
                    {leader.linkedin_url && (
                      <a href={leader.linkedin_url} target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition-colors" title="LinkedIn">
                        <Linkedin className="w-3.5 h-3.5 text-cyan-400" />
                      </a>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Graceful Announcement Banner matching Image 2 */
        <div className="hud-panel p-8 sm:p-10 rounded-2xl border border-cyan-500/20 text-center max-w-2xl mx-auto flex flex-col items-center justify-center">
          <div className="p-3.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 mb-3">
            <Info className="w-6 h-6" />
          </div>
          <h3 className="font-mech font-bold text-lg sm:text-xl text-slate-200">
            Leadership details will be announced.
          </h3>
          <p className="text-xs sm:text-sm text-slate-400 font-sans mt-2 max-w-md">
            The official patron council, advisory panel, and faculty conveners will be released soon by college administration.
          </p>
        </div>
      )}
    </section>
  );
}
