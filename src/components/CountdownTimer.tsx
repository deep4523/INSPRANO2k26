'use client';

import React, { useState, useEffect } from 'react';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export default function CountdownTimer({ targetDate = '2026-10-08T09:00:00+05:30' }: { targetDate?: string }) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const calculate = () => {
      const difference = +new Date(targetDate) - +new Date();
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculate();
    const interval = setInterval(calculate, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  if (!mounted) {
    return (
      <div className="flex justify-center items-center gap-3 md:gap-5 my-6">
        {['Days', 'Hours', 'Minutes', 'Seconds'].map((lbl) => (
          <div key={lbl} className="hud-panel cyber-clip px-4 py-3 min-w-[70px] md:min-w-[90px] text-center">
            <span className="text-2xl md:text-4xl font-extrabold font-mech text-cyan-400">--</span>
            <span className="block text-[10px] md:text-xs tracking-widest text-slate-400 uppercase mt-1">{lbl}</span>
          </div>
        ))}
      </div>
    );
  }

  const items = [
    { label: 'Days', value: timeLeft.days },
    { label: 'Hours', value: timeLeft.hours },
    { label: 'Minutes', value: timeLeft.minutes },
    { label: 'Seconds', value: timeLeft.seconds },
  ];

  return (
    <div className="flex flex-wrap justify-center items-center gap-2.5 sm:gap-4 md:gap-6 my-6">
      {items.map((item, idx) => (
        <div
          key={item.label}
          className="hud-panel cyber-clip relative group px-3.5 py-2.5 sm:px-5 sm:py-3.5 min-w-[72px] sm:min-w-[88px] md:min-w-[104px] text-center border border-cyan-500/30 hover:border-cyan-400 transition-all duration-300"
        >
          {/* Top corner cyber marker */}
          <div className="absolute top-1 right-1 w-1.5 h-1.5 bg-cyan-400 opacity-60 rounded-full" />
          
          <div className="text-2xl sm:text-3xl md:text-4xl font-black font-mech tracking-wider text-transparent bg-clip-text bg-gradient-to-b from-white via-cyan-200 to-cyan-400 drop-shadow-[0_0_12px_rgba(0,210,255,0.6)]">
            {String(item.value).padStart(2, '0')}
          </div>
          <div className="text-[9px] sm:text-[10px] md:text-xs font-mono font-semibold tracking-widest text-slate-400 uppercase mt-1">
            {item.label}
          </div>
          {/* Subtle bottom indicator */}
          <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent mt-1" />
        </div>
      ))}
    </div>
  );
}
