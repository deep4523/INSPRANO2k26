'use client';

import React, { useState } from 'react';
import { Calendar, Clock, MapPin, ChevronRight, Zap } from 'lucide-react';

interface ScheduleItem {
  id: number;
  day_number: number;
  date_label: string;
  time_label: string;
  title: string;
  category?: string;
  venue?: string;
  description?: string;
}

export default function ScheduleSection({ items }: { items: ScheduleItem[] }) {
  const [selectedDay, setSelectedDay] = useState<number>(1);

  const days = [
    {
      day: 1,
      date: '8 OCTOBER 2026',
      title: 'Day 1 — Technical & General Events',
      highlights: [
        'Registration Verification & Kit Distribution',
        'Grand Inauguration Ceremony',
        'EV Working Model Challenge',
        'Poster Presentations & Tech Writing',
        'Cultural Tech Evening',
      ],
      gradient: 'from-cyan-950/40 via-slate-950 to-slate-900',
      border: 'border-cyan-500/40',
      tagColor: 'text-cyan-300 bg-cyan-950/80 border-cyan-500/30',
    },
    {
      day: 2,
      date: '9 OCTOBER 2026',
      title: 'Day 2 — Core Department Events',
      highlights: [
        'Mechanical Department Engineering Wars',
        'CSE 24-Hour Hackathon & Coding Battles',
        'Civil Bridge It & Structural Competitions',
        'EE / ECE Fault Hunt & Circuit Mania',
        'Esports Arena Championship (BGMI & Free Fire)',
      ],
      gradient: 'from-blue-950/40 via-slate-950 to-slate-900',
      border: 'border-blue-500/40',
      tagColor: 'text-blue-300 bg-blue-950/80 border-blue-500/30',
    },
    {
      day: 3,
      date: '10 OCTOBER 2026',
      title: 'Day 3 — Final Rounds & Valedictory',
      highlights: [
        'Final Presentation Rounds & Hackathon Jury',
        'Exhibition of Winning Working Models',
        'Grand Valedictory Ceremony',
        'Official Prize Distribution (₹85,000+ Awards)',
        'Closing Commemoration & Fest Finale',
      ],
      gradient: 'from-red-950/40 via-slate-950 to-slate-900',
      border: 'border-red-500/40',
      tagColor: 'text-red-300 bg-red-950/80 border-red-500/30',
    },
  ];

  const activeDayItems = items.filter(i => i.day_number === selectedDay);

  return (
    <section id="schedule" className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono uppercase tracking-widest mb-3">
          <Calendar className="w-3.5 h-3.5 text-cyan-400" />
          <span>FESTIVAL TIMELINE</span>
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-mech tracking-wider text-transparent bg-clip-text bg-gradient-to-b from-white via-slate-100 to-cyan-300">
          SCHEDULE
        </h2>
        <p className="mt-2 text-sm sm:text-base text-slate-400 max-w-2xl mx-auto font-sans">
          3 Days of Non-Stop Innovation, High-Stakes Competition & Technological Celebration.
        </p>
      </div>

      {/* 3 Day Cards Grid matching Image 2 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {days.map((d) => {
          const isSelected = selectedDay === d.day;
          return (
            <div
              key={d.day}
              onClick={() => setSelectedDay(d.day)}
              className={`cursor-pointer rounded-2xl p-6 transition-all duration-300 flex flex-col justify-between border bg-gradient-to-b ${d.gradient} ${
                isSelected
                  ? `${d.border} shadow-[0_0_30px_rgba(0,210,255,0.3)] scale-[1.02]`
                  : 'border-slate-800 hover:border-slate-700'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className={`text-[11px] font-mech font-bold uppercase tracking-wider px-3 py-1 rounded-full border ${d.tagColor}`}>
                    DAY {d.day}
                  </span>
                  <div className="flex items-center gap-1 text-xs font-mono text-cyan-400">
                    <Clock className="w-3.5 h-3.5" />
                    <span>OCT 2026</span>
                  </div>
                </div>

                <h3 className="text-xl sm:text-2xl font-black font-mech tracking-tight text-white mt-2">
                  {d.date}
                </h3>
                <p className="text-xs font-mono text-cyan-300/90 mt-1 mb-4">
                  {d.title}
                </p>

                <div className="space-y-2 mt-4 pt-4 border-t border-slate-800">
                  {d.highlights.map((h, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs font-sans text-slate-300">
                      <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-1.5 flex-shrink-0" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between">
                <span className="text-xs font-mech font-bold uppercase tracking-wider text-slate-400">
                  {isSelected ? 'Currently Viewing' : 'Select Day'}
                </span>
                <ChevronRight className={`w-4 h-4 transition-transform ${isSelected ? 'text-cyan-400 translate-x-1' : 'text-slate-600'}`} />
              </div>
            </div>
          );
        })}
      </div>

      {/* Selected Day Timeline Feed if detailed items exist in DB */}
      {activeDayItems.length > 0 && (
        <div className="hud-panel p-6 rounded-2xl border border-cyan-500/20">
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-cyan-500/20">
            <Zap className="w-5 h-5 text-cyan-400" />
            <h4 className="font-mech font-bold text-lg text-white">
              DETAILED TIMELINE — DAY {selectedDay}
            </h4>
          </div>

          <div className="space-y-4">
            {activeDayItems.map((item) => (
              <div
                key={item.id}
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-xl bg-slate-950/60 border border-slate-800 hover:border-cyan-500/40 transition-colors"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono text-cyan-400 font-semibold">{item.time_label}</span>
                    {item.category && (
                      <span className="text-[10px] font-mech px-2 py-0.5 rounded bg-slate-900 border border-slate-700 text-slate-300">
                        {item.category}
                      </span>
                    )}
                  </div>
                  <h5 className="font-mech font-bold text-base text-slate-100 mt-1">{item.title}</h5>
                  {item.description && <p className="text-xs text-slate-400 mt-0.5">{item.description}</p>}
                </div>
                {item.venue && (
                  <div className="flex items-center gap-1.5 text-xs font-mono text-slate-400 flex-shrink-0">
                    <MapPin className="w-3.5 h-3.5 text-cyan-500" />
                    <span>{item.venue}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
