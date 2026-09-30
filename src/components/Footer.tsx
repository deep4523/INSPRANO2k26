'use client';

import React from 'react';
import Link from 'next/link';
import GcekLogo from './GcekLogo';
import { Mail, Phone, MapPin, Instagram, Youtube, Twitter, Linkedin, ExternalLink, Sparkles } from 'lucide-react';

export default function Footer({ settings }: { settings?: Record<string, string> }) {
  const currentYear = 2026;
  const officialEmail = settings?.official_email || 'insprano2026.gcek@gmail.com';
  const officialPhone = settings?.official_phone || '';
  const collegeLocation = settings?.college_location || 'Bhawanipatna, Odisha';

  return (
    <footer id="contact" className="relative z-10 bg-slate-950 border-t border-cyan-500/20 pt-16 pb-12 overflow-hidden scroll-mt-24 sm:scroll-mt-28">
      {/* Background accents */}
      <div className="absolute inset-0 bg-cyber-grid opacity-20 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 pb-12 border-b border-slate-800">
          {/* Brand Info */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <GcekLogo className="w-12 h-12" />
              <div>
                <h3 className="font-mech font-black text-xl tracking-wider text-white">
                  INSPRANO <span className="text-red-500 text-sm">2K26</span>
                </h3>
                <a
                  href="https://gcekbpatna.ac.in/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-cyan-400 hover:text-cyan-200 font-mono tracking-wide inline-flex items-center gap-1 transition-colors group/footlink"
                >
                  <span>Government College of Engineering Kalahandi, Bhawanipatna</span>
                  <ExternalLink className="w-3 h-3 text-cyan-400 group-hover/footlink:translate-x-0.5 transition-transform" />
                </a>
              </div>
            </div>

            <p className="text-xs font-mech font-semibold tracking-widest text-slate-400 uppercase">
              ENGINEERING BEYOND LIMITS
            </p>

            <p className="text-xs text-slate-400 font-sans leading-relaxed max-w-sm">
              The premier annual national technical symposium of GCEK, driving collaborative innovation, robotics, engineering challenges, and coding marathons.
            </p>

            <div className="pt-2">
              <a
                href="https://www.instagram.com/gcek.insprano?utm_source=ig_web_button_share_sheet&stkn=ZDNlZDc0MzIxNw=="
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow GCEK INSPRANO on Instagram"
                className="inline-flex items-center gap-2.5 px-4 py-2 rounded-xl bg-slate-900/90 hover:bg-cyan-950/80 border border-slate-800 hover:border-cyan-500/50 text-slate-300 hover:text-cyan-300 text-xs font-mono transition-all shadow-[0_0_15px_rgba(0,210,255,0.15)] group/insta"
              >
                <Instagram className="w-4 h-4 text-cyan-400 group-hover/insta:scale-110 transition-transform" />
                <span className="font-semibold tracking-wide">@gcek.insprano</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-3">
            <h4 className="font-mech font-bold text-sm tracking-wider uppercase text-cyan-400 mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2 text-xs font-mono text-slate-400">
              <li>
                <a href="#home" className="hover:text-cyan-300 transition-colors">Home</a>
              </li>
              <li>
                <a href="#events" className="hover:text-cyan-300 transition-colors">Events Arena</a>
              </li>
              <li>
                <a href="#schedule" className="hover:text-cyan-300 transition-colors">Timeline & Schedule</a>
              </li>
              <li>
                <a href="#leadership" className="hover:text-cyan-300 transition-colors">Leadership & Patrons</a>
              </li>
              <li>
                <a href="#gallery" className="hover:text-cyan-300 transition-colors">Moments Gallery</a>
              </li>
              <li>
                <a href="/rules" className="hover:text-cyan-300 transition-colors">Rules & Regulations</a>
              </li>
              <li className="pt-1">
                <button
                  onClick={() => {
                    sessionStorage.removeItem('insprano_intro_seen_v6');
                    window.location.href = '/?intro=true';
                  }}
                  className="text-cyan-400 hover:text-cyan-200 transition-colors flex items-center gap-1.5 font-bold cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-spin" />
                  <span>Replay Intro Animation</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="lg:col-span-4">
            <h4 className="font-mech font-bold text-sm tracking-wider uppercase text-cyan-400 mb-4">
              Campus Contact
            </h4>
            <div className="space-y-3 text-xs font-sans text-slate-300">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
                <a
                  href="https://gcekbpatna.ac.in/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-cyan-300 transition-colors"
                >
                  Government College of Engineering Kalahandi,<br />
                  Bandopala, {collegeLocation} — 766002
                </a>
              </div>

              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                <a href={`mailto:${officialEmail}`} className="hover:text-cyan-300 font-mono transition-colors">
                  {officialEmail}
                </a>
              </div>

              {officialPhone && (
                <div className="flex items-center gap-2.5">
                  <Phone className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                  <a href={`tel:${officialPhone}`} className="hover:text-cyan-300 font-mono transition-colors">
                    {officialPhone}
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-500">
          <div>
            © {currentYear} INSPRANO 2K26 • <a href="https://gcekbpatna.ac.in/" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition-colors">Government College of Engineering Kalahandi, Bhawanipatna</a>. All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <Link href="/privacy" className="hover:text-slate-400 transition-colors">Privacy Policy</Link>
            <span>•</span>
            <Link href="/terms" className="hover:text-slate-400 transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
