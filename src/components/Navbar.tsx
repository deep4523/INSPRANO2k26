'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import GcekLogo from './GcekLogo';
import { Menu, X, Search, Shield, ChevronRight, Volume2, VolumeX, Sparkles, ExternalLink } from 'lucide-react';
import { isSoundEnabled, toggleSound, playCyberClick, playTransformSound } from '@/lib/soundFx';

interface NavbarProps {
  onOpenSearch?: () => void;
  onOpenRegister?: () => void;
  currentFaction?: 'autobot' | 'decepticon' | 'cybertron';
  onToggleFaction?: () => void;
}

export default function Navbar({ onOpenSearch, onOpenRegister, currentFaction = 'cybertron', onToggleFaction }: NavbarProps) {
  const pathname = usePathname();
  const router = useRouter();

  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [soundOn, setSoundOn] = useState(true);

  const isHomePage = pathname === '/';

  useEffect(() => {
    setSoundOn(isSoundEnabled());

    if (pathname === '/contact') {
      setActiveSection('contact');
      return;
    }

    const handleScroll = () => {
      setScrolled(window.scrollY > 40);

      if (!isHomePage) return;

      const sections = ['home', 'command-center', 'events', 'schedule', 'about', 'leadership', 'faculty-members', 'gallery', 'contact'];
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 160 && rect.bottom >= 160) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [pathname, isHomePage]);

  const rawNavLinks = [
    { label: 'Home', href: '#home', id: 'home' },
    { label: 'Events', href: '#events', id: 'events' },
    { label: 'Schedule', href: '#schedule', id: 'schedule' },
    { label: 'About', href: '#about', id: 'about' },
    { label: 'Leadership', href: '#leadership', id: 'leadership' },
    { label: 'Faculty', href: '#faculty-members', id: 'faculty-members' },
    { label: 'Gallery', href: '#gallery', id: 'gallery' },
    { label: 'Contact', href: '/contact', id: 'contact' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, link: typeof rawNavLinks[0]) => {
    playCyberClick();

    if (mobileMenuOpen) {
      setMobileMenuOpen(false);
    }

    if (link.id === 'contact') {
      if (pathname === '/contact') {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
      return;
    }

    if (isHomePage) {
      const targetId = link.href.replace('#', '');
      const el = document.getElementById(targetId);
      if (el) {
        e.preventDefault();
        el.scrollIntoView({ behavior: 'smooth' });
        setActiveSection(link.id);
      }
    }
  };

  const getFullHref = (link: typeof rawNavLinks[0]) => {
    if (link.id === 'contact') return '/contact';
    if (isHomePage) return link.href;
    return `/${link.href}`;
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled || mobileMenuOpen
            ? 'bg-slate-950/95 backdrop-blur-md border-b border-cyan-500/20 py-2.5 shadow-[0_4px_30px_rgba(0,0,0,0.8)]'
            : 'bg-transparent py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Brand Logo & Title */}
            <div className="flex items-center gap-3">
              <Link
                href={isHomePage ? '#home' : '/#home'}
                onClick={(e) => {
                  playCyberClick();
                  if (mobileMenuOpen) setMobileMenuOpen(false);
                  if (isHomePage) {
                    e.preventDefault();
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }
                }}
                className="flex items-center gap-2.5 group"
              >
                <div className="relative">
                  <GcekLogo className="w-10 h-10 sm:w-11 sm:h-11 transition-transform duration-300 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-cyan-400/20 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <div>
                  <div className="font-mech font-black text-lg sm:text-xl tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-200 to-cyan-400">
                    INSPRANO
                    <span className="text-red-500 text-sm ml-1 px-1.5 py-0.5 rounded bg-red-950/60 border border-red-500/40">2K26</span>
                  </div>
                </div>
              </Link>

              <a
                href="https://gcekbpatna.ac.in/"
                target="_blank"
                rel="noopener noreferrer"
                title="Government College of Engineering Kalahandi, Bhawanipatna Official Portal"
                className="text-[9px] sm:text-[10px] font-mono tracking-wider text-cyan-300/90 hover:text-cyan-200 uppercase hidden md:inline-flex items-center gap-1.5 bg-cyan-950/50 hover:bg-cyan-900/70 border border-cyan-500/40 hover:border-cyan-400 px-2.5 py-1 rounded-full transition-all group/gcek shadow-[0_0_10px_rgba(0,210,255,0.15)] hover:shadow-[0_0_15px_rgba(0,210,255,0.4)]"
              >
                <span className="font-semibold tracking-widest truncate max-w-[240px] xl:max-w-none">GCE KALAHANDI, BHAWANIPATNA</span>
                <ExternalLink className="w-3 h-3 text-cyan-400 group-hover/gcek:translate-x-0.5 group-hover/gcek:-translate-y-0.5 transition-transform" />
              </a>
            </div>

            {/* Desktop Nav Links */}
            <nav className="hidden lg:flex items-center gap-1 xl:gap-2 hud-panel px-4 py-1.5 rounded-full border border-cyan-500/20">
              {rawNavLinks.map((link) => {
                const isActive = (pathname === '/contact' && link.id === 'contact') || activeSection === link.id;
                const href = getFullHref(link);
                return (
                  <Link
                    key={link.id}
                    href={href}
                    onClick={(e) => handleNavClick(e, link)}
                    onMouseEnter={() => playCyberClick()}
                    className={`text-xs xl:text-sm font-mech font-medium px-3 py-1.5 rounded-full transition-all duration-200 ${
                      isActive
                        ? 'text-cyan-300 bg-cyan-500/20 shadow-[0_0_12px_rgba(0,210,255,0.4)] border border-cyan-500/40'
                        : 'text-slate-300 hover:text-cyan-400 hover:bg-white/5'
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>

            {/* Right Action Icons & Transformers Audio / Faction HUD */}
            <div className="hidden lg:flex items-center gap-2 xl:gap-3">
              {/* Audio Synthesizer FX Toggle with Animated Equalizer Bars */}
              <button
                onClick={() => {
                  const nextState = toggleSound();
                  setSoundOn(nextState);
                }}
                title={soundOn ? "Transformers Audio FX: Active" : "Transformers Audio FX: Muted"}
                aria-label="Toggle Transformers Sound Effects"
                className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border transition-all duration-200 text-xs font-mono ${
                  soundOn
                    ? 'border-cyan-500/40 bg-cyan-950/40 text-cyan-300 shadow-[0_0_10px_rgba(0,210,255,0.25)]'
                    : 'border-slate-800 bg-slate-900/60 text-slate-500 hover:text-slate-300'
                }`}
              >
                {soundOn ? (
                  <>
                    <Volume2 className="w-3.5 h-3.5 text-cyan-400" />
                    <div className="flex items-end gap-[2px] h-3">
                      <span className="w-[2px] bg-cyan-400 rounded-full animate-eq-1" />
                      <span className="w-[2px] bg-cyan-400 rounded-full animate-eq-2" />
                      <span className="w-[2px] bg-cyan-400 rounded-full animate-eq-3" />
                      <span className="w-[2px] bg-cyan-400 rounded-full animate-eq-4" />
                    </div>
                  </>
                ) : (
                  <>
                    <VolumeX className="w-3.5 h-3.5 text-slate-500" />
                    <span className="text-[10px]">SFX OFF</span>
                  </>
                )}
              </button>

              {/* Faction / Mode Toggle Trigger */}
              {onToggleFaction && (
                <button
                  onClick={() => {
                    playTransformSound();
                    onToggleFaction();
                  }}
                  title="Transform Fest Theme Faction"
                  className={`px-2.5 py-1 rounded-lg text-[10px] font-mech font-bold tracking-wider uppercase border transition-all duration-300 flex items-center gap-1 ${
                    currentFaction === 'autobot'
                      ? 'border-cyan-400 bg-cyan-950/50 text-cyan-300 shadow-[0_0_12px_rgba(0,210,255,0.35)]'
                      : currentFaction === 'decepticon'
                      ? 'border-red-500 bg-red-950/50 text-red-300 shadow-[0_0_12px_rgba(255,30,66,0.35)]'
                      : 'border-slate-700 bg-slate-900/60 text-slate-300 hover:border-cyan-400/60'
                  }`}
                >
                  <Sparkles className="w-3 h-3 text-cyan-400 animate-spin" style={{ animationDuration: '6s' }} />
                  <span>{currentFaction === 'autobot' ? 'AUTOBOT' : currentFaction === 'decepticon' ? 'DECEPTICON' : 'TRANSFORM'}</span>
                </button>
              )}

              {onOpenSearch && (
                <button
                  onClick={() => {
                    playCyberClick();
                    onOpenSearch();
                  }}
                  aria-label="Search festival events"
                  className="p-2 text-slate-300 hover:text-cyan-400 hover:bg-cyan-500/10 rounded-lg transition-colors border border-transparent hover:border-cyan-500/30"
                >
                  <Search className="w-4 h-4" />
                </button>
              )}

              <button
                onClick={() => {
                  playTransformSound();
                  if (onOpenRegister) {
                    onOpenRegister();
                  } else {
                    router.push('/#events');
                  }
                }}
                className="cyber-button cyber-clip px-5 py-2 text-xs font-mech font-bold tracking-wider uppercase text-white bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 shadow-[0_0_15px_rgba(0,210,255,0.4)] border border-cyan-400/50"
              >
                Register
              </button>
            </div>

            {/* Mobile Menu Toggle */}
            <div className="flex items-center gap-2 lg:hidden">
              {onOpenSearch && (
                <button
                  onClick={onOpenSearch}
                  aria-label="Search"
                  className="p-2 text-slate-300 hover:text-cyan-400"
                >
                  <Search className="w-5 h-5" />
                </button>
              )}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle navigation menu"
                className="p-2 text-cyan-400 hover:text-white border border-cyan-500/30 rounded-lg bg-slate-900/60"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 top-[60px] bg-slate-950/98 backdrop-blur-2xl border-t border-cyan-500/30 z-40 px-6 py-6 overflow-y-auto shadow-[0_20px_50px_rgba(0,0,0,0.9)]">
          <div className="flex flex-col gap-3 pb-8">
            {rawNavLinks.map((link) => {
              const href = getFullHref(link);
              const isActive = (pathname === '/contact' && link.id === 'contact') || activeSection === link.id;
              return (
                <Link
                  key={link.id}
                  href={href}
                  onClick={(e) => handleNavClick(e, link)}
                  className={`flex items-center justify-between text-base font-mech py-3 px-4 rounded-xl border transition-colors ${
                    isActive
                      ? 'border-cyan-400/80 bg-cyan-950/50 text-cyan-300 shadow-[0_0_15px_rgba(0,210,255,0.3)]'
                      : 'border-slate-800/80 bg-slate-900/40 text-slate-200 hover:text-cyan-300 hover:border-cyan-500/40'
                  }`}
                >
                  <span>{link.label}</span>
                  <ChevronRight className="w-4 h-4 text-cyan-500/60" />
                </Link>
              );
            })}

            <div className="pt-4 flex flex-col gap-3 border-t border-slate-800/80 mt-2">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    const next = toggleSound();
                    setSoundOn(next);
                  }}
                  className="flex-1 py-2.5 px-3 rounded-xl border border-cyan-500/30 bg-slate-900/60 text-xs font-mono text-cyan-300 flex items-center justify-center gap-2"
                >
                  {soundOn ? <Volume2 className="w-4 h-4 text-cyan-400" /> : <VolumeX className="w-4 h-4 text-slate-500" />}
                  <span>SFX: {soundOn ? 'ACTIVE' : 'MUTED'}</span>
                </button>

                {onToggleFaction && (
                  <button
                    onClick={() => {
                      playTransformSound();
                      onToggleFaction();
                    }}
                    className="flex-1 py-2.5 px-3 rounded-xl border border-cyan-500/30 bg-slate-900/60 text-xs font-mech font-bold uppercase tracking-wider text-white flex items-center justify-center gap-2"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                    <span>{currentFaction === 'autobot' ? 'AUTOBOT' : currentFaction === 'decepticon' ? 'DECEPTICON' : 'TRANSFORM'}</span>
                  </button>
                )}
              </div>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  playTransformSound();
                  if (onOpenRegister) {
                    onOpenRegister();
                  } else {
                    router.push('/#events');
                  }
                }}
                className="w-full py-3.5 text-sm font-mech font-bold uppercase tracking-wider text-white bg-gradient-to-r from-red-600 via-rose-500 to-red-600 rounded-xl shadow-[0_0_20px_rgba(255,30,66,0.4)] border border-red-400/50"
              >
                Register Now
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

