'use client';

import React from 'react';
import Link from 'next/link';
import { Award, ExternalLink, Handshake } from 'lucide-react';

interface SponsorItem {
  id: number;
  name: string;
  logo_url?: string;
  website?: string;
  tier: string;
}

export default function SponsorsSection({
  sponsors = [],
  onOpenSponsorship,
}: {
  sponsors?: SponsorItem[];
  onOpenSponsorship?: () => void;
}) {
  const tiers = [
    { id: 'TITLE_SPONSOR', label: 'TITLE SPONSOR', border: 'border-amber-400/50', glow: 'shadow-[0_0_20px_rgba(251,191,36,0.3)]', color: 'text-amber-400' },
    { id: 'GOLD', label: 'GOLD', border: 'border-yellow-500/40', glow: 'shadow-[0_0_15px_rgba(234,179,8,0.25)]', color: 'text-yellow-400' },
    { id: 'SILVER', label: 'SILVER', border: 'border-slate-300/40', glow: 'shadow-[0_0_15px_rgba(203,213,225,0.2)]', color: 'text-slate-300' },
    { id: 'BRONZE', label: 'BRONZE', border: 'border-amber-700/40', glow: 'shadow-[0_0_15px_rgba(180,83,9,0.2)]', color: 'text-amber-600' },
    { id: 'MEDIA_PARTNER', label: 'MEDIA PARTNER', border: 'border-cyan-500/40', glow: 'shadow-[0_0_15px_rgba(0,210,255,0.2)]', color: 'text-cyan-400' },
  ];

  return (
    <section id="sponsors" className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono uppercase tracking-widest mb-3">
          <Award className="w-3.5 h-3.5 text-cyan-400" />
          <span>FESTIVAL PARTNERS</span>
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-mech tracking-wider text-transparent bg-clip-text bg-gradient-to-b from-white via-slate-100 to-cyan-300">
          OUR SPONSORS
        </h2>
        <p className="mt-2 text-sm sm:text-base text-slate-400 max-w-2xl mx-auto font-sans">
          We are grateful to our corporate and technical partners for powering engineering excellence.
        </p>
      </div>

      {/* Tiered Showcase matching Image 2 */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6 mb-10">
        {tiers.map((tier) => {
          const matchingSponsors = sponsors.filter(s => s.tier === tier.id);

          return (
            <div
              key={tier.id}
              className={`hud-panel rounded-2xl p-5 border ${tier.border} ${tier.glow} flex flex-col justify-between items-center text-center min-h-[170px] relative overflow-hidden`}
            >
              {/* Tier Name */}
              <div className={`text-[11px] font-mech font-black tracking-widest uppercase ${tier.color} mb-4`}>
                {tier.label}
              </div>

              {/* Sponsor Logo or Holographic Placeholder */}
              <div className="flex-1 flex flex-col items-center justify-center">
                {matchingSponsors.length > 0 ? (
                  <div className="space-y-3">
                    {matchingSponsors.map(s => (
                      <div key={s.id} className="group">
                        {s.logo_url ? (
                          <img src={s.logo_url} alt={s.name} className="h-10 max-w-[120px] object-contain mx-auto" />
                        ) : (
                          <span className="font-mech font-bold text-sm text-slate-200 group-hover:text-cyan-300">
                            {s.name}
                          </span>
                        )}
                        {s.website && (
                          <a
                            href={s.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-[10px] text-cyan-400 mt-1 hover:underline"
                          >
                            <span>Visit</span>
                            <ExternalLink className="w-2.5 h-2.5" />
                          </a>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center opacity-60 hover:opacity-100 transition-opacity">
                    {/* Cyber Hexagon Icon */}
                    <svg className="w-10 h-10 text-cyan-500/70 mb-2" viewBox="0 0 100 100" fill="none" stroke="currentColor">
                      <polygon points="50,5 90,25 90,75 50,95 10,75 10,25" strokeWidth="3" strokeDasharray="6 3" />
                      <circle cx="50" cy="50" r="14" strokeWidth="2" />
                    </svg>
                    <span className="text-[10px] font-mono tracking-wider text-slate-400 uppercase">
                      YOUR LOGO HERE
                    </span>
                  </div>
                )}
              </div>

              <div className="w-12 h-[1px] bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent mt-3" />
            </div>
          );
        })}
      </div>

      {/* Call to action for sponsors */}
      <div className="text-center">
        <button
          onClick={onOpenSponsorship}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs sm:text-sm font-mech font-bold uppercase tracking-wider text-cyan-300 bg-cyan-950/40 hover:bg-cyan-900/60 border border-cyan-500/40 hover:border-cyan-400 transition-all shadow-[0_0_15px_rgba(0,210,255,0.2)]"
        >
          <Handshake className="w-4 h-4 text-cyan-400" />
          <span>Become a Sponsor / Partner with INSPRANO</span>
        </button>
      </div>
    </section>
  );
}
