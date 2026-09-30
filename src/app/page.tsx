'use client';

import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import CyberHeroCanvas from '@/components/CyberHeroCanvas';
import CountdownTimer from '@/components/CountdownTimer';
import EventCommandCenter from '@/components/EventCommandCenter';
import EventsSection from '@/components/EventsSection';
import ScheduleSection from '@/components/ScheduleSection';
import LeadershipSection from '@/components/LeadershipSection';
import FacultyMembersSection from '@/components/FacultyMembersSection';
import BranchCoordinatorsSection from '@/components/BranchCoordinatorsSection';
import GallerySection from '@/components/GallerySection';
import AboutSection from '@/components/AboutSection';
import Footer from '@/components/Footer';
import CinematicRobotIntro from '@/components/CinematicRobotIntro';

import EventDetailModal from '@/components/EventDetailModal';
import RegistrationModal from '@/components/RegistrationModal';
import SearchModal from '@/components/SearchModal';

import { Calendar, MapPin, ChevronDown, Wrench, Zap, Cpu, Landmark, Beaker, Radio, Sparkles, ShieldAlert, ExternalLink } from 'lucide-react';
import MechEmblem from '@/components/MechEmblem';
import TransformerHeroFlankers from '@/components/TransformerHeroFlankers';
import CinematicHeroBackground from '@/components/CinematicHeroBackground';
import CinematicTransformersVideoBackground from '@/components/CinematicTransformersVideoBackground';
import FuturisticRobotBackground from '@/components/FuturisticRobotBackground';
import RealTransformers3D from '@/components/RealTransformers3D';
import EnergonCoreShard from '@/components/EnergonCoreShard';
import TransformerAutobotShield from '@/components/TransformerAutobotShield';
import TransformerBranchHUD from '@/components/TransformerBranchHUD';
import { playTransformSound, playCyberClick, playLaserCharge } from '@/lib/soundFx';


export default function HomePage() {
  const [events, setEvents] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [scheduleItems, setScheduleItems] = useState<any[]>([]);
  const [sponsors, setSponsors] = useState<any[]>([]);
  const [leadership, setLeadership] = useState<any[]>([]);
  const [gallery, setGallery] = useState<any[]>([]);
  const [settings, setSettings] = useState<Record<string, string>>({});
  const [stats, setStats] = useState<any>({
    totalEvents: 28,
    totalPrizeFormatted: '₹85,000+',
    categoriesCount: 7,
    registrationOpen: true,
    upcomingEvents: 28,
  });

  // Transformers Faction Allegiance & Telemetry State
  const [currentFaction, setCurrentFaction] = useState<'cybertron' | 'autobot' | 'decepticon'>('cybertron');
  const [factionAlert, setFactionAlert] = useState<string | null>(null);

  const toggleFaction = () => {
    playTransformSound();
    let next: 'cybertron' | 'autobot' | 'decepticon';
    let alertMsg: string;

    if (currentFaction === 'cybertron') {
      next = 'autobot';
      alertMsg = 'AUTOBOT PROTOCOL ENGAGED // PRIMUS MATRIX ONLINE';
    } else if (currentFaction === 'autobot') {
      next = 'decepticon';
      alertMsg = 'DECEPTICON PROTOCOL ENGAGED // DARK ENERGON HARVESTING';
    } else {
      next = 'cybertron';
      alertMsg = 'ALL-SPARK BALANCED // DUAL CYBERTRON MATRIX ACTIVE';
    }

    setCurrentFaction(next);
    setFactionAlert(alertMsg);
    setTimeout(() => setFactionAlert(null), 3500);
  };

  // Modals state
  const [selectedEvent, setSelectedEvent] = useState<any | null>(null);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [registerEvent, setRegisterEvent] = useState<any | null>(null);
  const [isSponsorModalOpen, setIsSponsorModalOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isWelcomeOpen, setIsWelcomeOpen] = useState(true);

  useEffect(() => {
    // Smooth scroll to target section when navigating with hash (e.g., from /contact to /#events)
    const handleHashScroll = () => {
      if (typeof window !== 'undefined' && window.location.hash) {
        const targetId = window.location.hash.replace('#', '');
        setTimeout(() => {
          const el = document.getElementById(targetId);
          if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
          }
        }, 150);
      }
    };

    handleHashScroll();
    window.addEventListener('hashchange', handleHashScroll);
    return () => window.removeEventListener('hashchange', handleHashScroll);
  }, []);

  useEffect(() => {
    // Fetch live data from backend APIs
    const fetchData = async () => {
      try {
        const [
          eventsRes,
          categoriesRes,
          statsRes,
          scheduleRes,
          sponsorsRes,
          leadershipRes,
          galleryRes,
          settingsRes,
        ] = await Promise.all([
          fetch('/api/events'),
          fetch('/api/categories'),
          fetch('/api/command-center'),
          fetch('/api/schedule'),
          fetch('/api/sponsors'),
          fetch('/api/leadership'),
          fetch('/api/gallery'),
          fetch('/api/site-settings'),
        ]);

        const [
          eventsData,
          categoriesData,
          statsData,
          scheduleData,
          sponsorsData,
          leadershipData,
          galleryData,
          settingsData,
        ] = await Promise.all([
          eventsRes.json(),
          categoriesRes.json(),
          statsRes.json(),
          scheduleRes.json(),
          sponsorsRes.json(),
          leadershipRes.json(),
          galleryRes.json(),
          settingsRes.json(),
        ]);

        if (eventsData.success) setEvents(eventsData.data);
        if (categoriesData.success) setCategories(categoriesData.data);
        if (statsData.success) setStats(statsData.data);
        if (scheduleData.success) setScheduleItems(scheduleData.data);
        if (sponsorsData.success) setSponsors(sponsorsData.data.sponsors || []);
        if (leadershipData.success) setLeadership(leadershipData.data || []);
        if (galleryData.success) setGallery(galleryData.data || []);
        if (settingsData.success) setSettings(settingsData.data || {});
      } catch (err) {
        console.error('Failed to load live fest data:', err);
      }
    };

    fetchData();
  }, []);

  const handleIntroComplete = () => {
    setIsWelcomeOpen(false);
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('insprano_intro_seen_v6', 'true');
      if (window.location.search.includes('intro=true')) {
        window.history.replaceState({}, '', window.location.pathname);
      }
    }
  };

  const handleRegisterFromEvent = (ev: any) => {
    setSelectedEvent(null);
    setRegisterEvent(ev);
    setIsRegisterOpen(true);
  };

  const flagshipEvent = events.find(e => e.id === 5) || events[0]; // Hackathon or first

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 relative selection:bg-cyan-500 selection:text-black">
      {/* Global Futuristic Robot Background Environment */}
      <FuturisticRobotBackground />

      {/* Top Floating Cockpit Navbar with Sound FX & Faction Mode */}
      <Navbar
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenRegister={() => {
          setRegisterEvent(flagshipEvent);
          setIsRegisterOpen(true);
        }}
        currentFaction={currentFaction}
        onToggleFaction={toggleFaction}
      />

      {/* ========================================================================= */}
      {/* HERO SECTION — CINEMATIC FULLSCREEN TRANSFORMERS BATTLEGROUND INTERFACE    */}
      {/* ========================================================================= */}
      <section
        id="home"
        className="relative min-h-screen flex flex-col justify-between pt-24 sm:pt-28 pb-12 px-4 sm:px-6 lg:px-8 overflow-hidden"
      >
        {/* Layered Cinematic Animated Transformers Video Background */}
        <CinematicTransformersVideoBackground faction={currentFaction} />

        {/* Dynamic Holographic Faction Switch Alert Banner */}
        {factionAlert && (
          <div className="relative z-20 max-w-xl mx-auto mb-3 animate-bounce">
            <div className="hud-panel px-4 py-2 rounded-xl border border-cyan-400/80 bg-slate-950/90 backdrop-blur-xl flex items-center justify-center gap-3 text-xs font-mono text-cyan-300 shadow-[0_0_30px_rgba(0,210,255,0.6)]">
              <ShieldAlert className="w-4 h-4 text-cyan-400 animate-spin" />
              <span className="tracking-widest font-bold">{factionAlert}</span>
            </div>
          </div>
        )}

        {/* Top Header Tagline Banner */}
        <div className="relative z-10 max-w-7xl mx-auto w-full flex flex-col sm:flex-row items-center justify-between text-center sm:text-left gap-2 mb-2">
          <div>
            <a
              href="https://gcekbpatna.ac.in/"
              target="_blank"
              rel="noopener noreferrer"
              title="Visit Government College of Engineering Kalahandi, Bhawanipatna"
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900/80 hover:bg-cyan-950/70 border border-cyan-500/40 hover:border-cyan-400 text-cyan-300 hover:text-cyan-100 transition-all shadow-[0_0_15px_rgba(0,210,255,0.2)] group/college max-w-full"
            >
              <span className="text-[10px] sm:text-xs font-mono tracking-wider sm:tracking-[0.25em] font-bold uppercase drop-shadow-[0_0_10px_rgba(0,210,255,0.5)] truncate">
                GOVERNMENT COLLEGE OF ENGINEERING KALAHANDI, BHAWANIPATNA
              </span>
              <ExternalLink className="w-3.5 h-3.5 text-cyan-400 group-hover/college:translate-x-0.5 group-hover/college:-translate-y-0.5 transition-transform flex-shrink-0" />
            </a>
            <span className="text-[9px] sm:text-[10px] font-mech tracking-[0.3em] sm:tracking-[0.4em] text-slate-400 uppercase mt-1 block">
              PRESENTS THE ANNUAL TECH FESTIVAL
            </span>
          </div>

          <div className="hidden md:flex items-center gap-3 text-[10px] font-mono tracking-widest text-slate-300 hud-panel px-3 py-1 rounded-full border border-cyan-500/20">
            <span>LEARN</span>
            <span className="text-cyan-400">•</span>
            <span>BUILD</span>
            <span className="text-cyan-400">•</span>
            <span>INNOVATE</span>
            <span className="text-cyan-400">•</span>
            <span>TOGETHER</span>
          </div>
        </div>

        {/* Central Chiseled 3D Title & Date HUD */}
        <div className="relative z-10 max-w-5xl mx-auto w-full text-center flex-1 flex flex-col items-center justify-center my-2 sm:my-4">
          {/* Main 3D Title with Chrome Shimmer & Glowing Energon Core 'A' */}
          <div className="relative inline-flex flex-col items-center select-none max-w-full">
            <div className="flex items-center justify-center">
              <span className="text-4xl sm:text-7xl md:text-8xl lg:text-9xl font-black font-mech tracking-wider uppercase animate-chrome-sweep drop-shadow-[0_12px_30px_rgba(0,0,0,0.95)]">
                INSPR
              </span>
              <EnergonCoreShard className="w-10 sm:w-20 md:w-24 lg:w-28 h-16 sm:h-28 md:h-36 lg:h-44 -mx-1 sm:-mx-2" />
              <span className="text-4xl sm:text-7xl md:text-8xl lg:text-9xl font-black font-mech tracking-wider uppercase animate-chrome-sweep drop-shadow-[0_12px_30px_rgba(0,0,0,0.95)]">
                NO
              </span>
            </div>

            {/* Futuristic Metallic 2026 with Laser Line Accents */}
            <div className="flex items-center gap-3 sm:gap-6 mt-[-6px] sm:mt-[-16px]">
              <div className="h-[2px] w-6 sm:w-16 bg-gradient-to-r from-transparent to-cyan-400" />
              <div className="text-xl sm:text-4xl md:text-5xl font-black font-mech tracking-[0.25em] sm:tracking-[0.35em] text-cyan-400 drop-shadow-[0_0_20px_rgba(0,210,255,0.85)]">
                2026
              </div>
              <div className="h-[2px] w-6 sm:w-16 bg-gradient-to-l from-transparent to-cyan-400" />
            </div>
          </div>

          {/* Official Tagline */}
          <div className="mt-3 sm:mt-4 text-[11px] sm:text-base md:text-lg font-mech font-black tracking-widest sm:tracking-[0.35em] text-slate-200 uppercase flex items-center gap-2 sm:gap-3">
            <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rotate-45 bg-red-500 animate-ping inline-block" />
            <span>ENGINEERING BEYOND LIMITS</span>
            <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rotate-45 bg-cyan-400 animate-ping inline-block" />
          </div>

          {/* Date & Location Pill HUD */}
          <div className="mt-4 flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-xs sm:text-sm font-mono text-cyan-300">
            <div className="hud-panel px-4 py-1.5 rounded-full flex items-center gap-2 border border-cyan-500/40 shadow-[0_0_15px_rgba(0,210,255,0.2)]">
              <Calendar className="w-3.5 h-3.5 text-cyan-400" />
              <span>8 — 10 OCTOBER 2026</span>
            </div>
            <div className="hud-panel px-4 py-1.5 rounded-full flex items-center gap-2 border border-red-500/40 shadow-[0_0_15px_rgba(255,30,66,0.2)]">
              <MapPin className="w-3.5 h-3.5 text-red-400" />
              <span>GCE KALAHANDI • BHAWANIPATNA</span>
            </div>
          </div>

          {/* Live Reactive Countdown Timer */}
          <CountdownTimer targetDate="2026-10-08T09:00:00+05:30" />

          {/* Primary Action Buttons with Transformers Audio FX */}
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mt-3">
            <a
              href="#events"
              onMouseEnter={() => playCyberClick()}
              onClick={() => playCyberClick()}
              className="cyber-button cyber-clip px-7 py-3 text-xs sm:text-sm font-mech font-black tracking-widest uppercase text-white bg-gradient-to-r from-cyan-500 via-blue-600 to-cyan-500 hover:from-cyan-400 hover:to-blue-500 shadow-[0_0_25px_rgba(0,210,255,0.5)] border border-cyan-400 transition-all transform hover:scale-105"
            >
              EXPLORE EVENTS
            </a>

            <button
              onMouseEnter={() => playCyberClick()}
              onClick={() => {
                playTransformSound();
                setRegisterEvent(flagshipEvent);
                setIsRegisterOpen(true);
              }}
              className="cyber-button cyber-clip px-7 py-3 text-xs sm:text-sm font-mech font-black tracking-widest uppercase text-white bg-gradient-to-r from-red-600 via-rose-600 to-red-600 hover:from-red-500 hover:to-rose-500 shadow-[0_0_25px_rgba(255,30,66,0.6)] border border-red-400 transition-all transform hover:scale-105"
            >
              REGISTER NOW
            </button>

            {/* Interactive Theme Transformation Mode Button */}
            <button
              onClick={toggleFaction}
              className="px-4 py-2.5 rounded-xl text-xs font-mono tracking-wider uppercase border border-cyan-400/40 bg-slate-900/80 hover:bg-cyan-950/60 text-cyan-300 hover:text-white transition-all flex items-center gap-2 shadow-[0_0_15px_rgba(0,210,255,0.2)]"
              title="Click to engage transformation sequence"
            >
              <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-spin" />
              <span>TRANSFORM MODE</span>
            </button>

            {/* Grand Welcome Replay Button */}
            <button
              onClick={() => {
                playTransformSound();
                setIsWelcomeOpen(true);
              }}
              className="px-4 py-2.5 rounded-xl text-xs font-mono tracking-wider uppercase border border-red-500/40 bg-slate-900/80 hover:bg-red-950/60 text-red-300 hover:text-white transition-all flex items-center gap-2 shadow-[0_0_15px_rgba(255,30,66,0.2)]"
              title="Re-watch Transformers Grand Intro sequence"
            >
              <Zap className="w-3.5 h-3.5 text-red-400" />
              <span>GRAND INTRO</span>
            </button>
          </div>


          {/* Interactive Department Branch HUD (Mechanical, Electrical, CSE, Civil, Chemical, ECE) */}
          <TransformerBranchHUD />

          {/* 3D Center Autobot Shield & "Different Branches One Vision" Tagline */}
          <TransformerAutobotShield />
        </div>

        {/* Scroll Indicator */}
        <div className="relative z-10 text-center flex flex-col items-center mt-6">
          <a
            href="#command-center"
            className="inline-flex flex-col items-center gap-1 text-[10px] font-mono tracking-widest text-slate-400 hover:text-cyan-400 transition-colors"
          >
            <span>SCROLL DOWN TO COMMAND CENTER</span>
            <ChevronDown className="w-4 h-4 text-cyan-400 animate-bounce" />
          </a>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. EVENT COMMAND CENTER (LIVE HUD TELEMETRY)                             */}
      {/* ========================================================================= */}
      <EventCommandCenter
        stats={stats}
        featuredEvent={flagshipEvent}
        onSelectEvent={(ev) => setSelectedEvent(ev)}
      />

      {/* ========================================================================= */}
      {/* 3. EVENTS CATALOG & DYNAMIC CATEGORY ARENA                                */}
      {/* ========================================================================= */}
      <EventsSection
        events={events}
        categories={categories}
        onSelectEvent={(ev) => setSelectedEvent(ev)}
        onRegisterEvent={(ev) => {
          setRegisterEvent(ev);
          setIsRegisterOpen(true);
        }}
      />

      {/* ========================================================================= */}
      {/* 4. SCHEDULE TIMELINE (3 DAYS OF NON-STOP INNOVATION)                     */}
      {/* ========================================================================= */}
      <ScheduleSection items={scheduleItems} />

      {/* ========================================================================= */}
      {/* 5. ABOUT INSPRANO & GCE KALAHANDI                                         */}
      {/* ========================================================================= */}
      <AboutSection />

      {/* ========================================================================= */}
      {/* 6. LEADERSHIP SECTION (FESTIVAL PATRONS & ADVISORY)                        */}
      {/* ========================================================================= */}
      <LeadershipSection leadership={leadership} />

      {/* ========================================================================= */}
      {/* 7. FACULTY MEMBERS OF INSPRANO                                            */}
      {/* ========================================================================= */}
      <FacultyMembersSection />

      {/* ========================================================================= */}
      {/* 8. BRANCH HODS & STUDENT COORDINATORS (ME, CSE, EE, CE, ECE)              */}
      {/* ========================================================================= */}
      <BranchCoordinatorsSection />

      {/* ========================================================================= */}
      {/* 8. GALLERY MOMENTS                                                        */}
      {/* ========================================================================= */}
      <GallerySection items={gallery} />

      {/* ========================================================================= */}
      {/* 9. PUBLIC SCI-FI FOOTER                                                   */}
      {/* ========================================================================= */}
      <Footer settings={settings} />

      {/* ========================================================================= */}
      {/* MODALS: DETAILS, REGISTRATION, SPONSORSHIP & GLOBAL SEARCH                */}
      {/* ========================================================================= */}
      {selectedEvent && (
        <EventDetailModal
          event={selectedEvent}
          onClose={() => setSelectedEvent(null)}
          onRegister={(ev) => handleRegisterFromEvent(ev)}
        />
      )}

      {isRegisterOpen && (
        <RegistrationModal
          events={events}
          initialEvent={registerEvent}
          onClose={() => setIsRegisterOpen(false)}
        />
      )}

      {isSearchOpen && (
        <SearchModal
          onClose={() => setIsSearchOpen(false)}
          onSelectEvent={(ev) => setSelectedEvent(ev)}
        />
      )}

      {isWelcomeOpen && (
        <CinematicRobotIntro
          onComplete={handleIntroComplete}
          isOpenDefault={true}
        />
      )}
    </main>
  );
}
