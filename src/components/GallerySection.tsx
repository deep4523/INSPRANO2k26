'use client';

import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Camera, Image as ImageIcon, X, ChevronLeft, ChevronRight, ArrowLeft } from 'lucide-react';

interface GalleryItem {
  id: number;
  title?: string;
  image_url: string;
  category?: string;
  caption?: string;
}

export default function GallerySection({ items = [] }: { items?: GalleryItem[] }) {
  const [activeImageIndex, setActiveImageIndex] = useState<number | null>(null);
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const defaultShowcase: GalleryItem[] = [
    {
      id: 1,
      title: 'Faculty Members of INSPRANO 2K26',
      category: 'FACULTY & CONVENERS',
      caption: 'Faculty members and event conveners of INSPRANO 2K26 at Government College of Engineering Kalahandi, Bhawanipatna.',
      image_url: 'https://i.ibb.co/S4mPXsL1/Whats-App-Image-2026-09-29-at-11-17-30-PM.jpg',
    },
    {
      id: 2,
      title: 'Coordinators of INSPRANO 2K26',
      category: 'COORDINATORS',
      caption: 'Student coordinators team leading event execution, technical challenges, and festival operations for INSPRANO 2K26.',
      image_url: 'https://i.ibb.co/MkmdqCYF/Whats-App-Image-2026-09-29-at-11-28-27-PM.jpg',
    },
    {
      id: 3,
      title: 'Co-Coordinators of INSPRANO 2K26',
      category: 'CO-COORDINATORS',
      caption: 'Student co-coordinators team supporting festival management, technical arena coordination, and event logistics.',
      image_url: 'https://i.ibb.co/vGvq1SX/Whats-App-Image-2026-09-29-at-11-36-22-PM.jpg',
    },
  ];

  const galleryList = items.length > 0 ? items : defaultShowcase;

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveImageIndex(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const openLightbox = (index: number) => {
    setActiveImageIndex(index);
  };

  const closeLightbox = () => {
    setActiveImageIndex(null);
  };

  const nextImage = () => {
    if (activeImageIndex !== null) {
      setActiveImageIndex((activeImageIndex + 1) % galleryList.length);
    }
  };

  const prevImage = () => {
    if (activeImageIndex !== null) {
      setActiveImageIndex((activeImageIndex - 1 + galleryList.length) % galleryList.length);
    }
  };

  if (galleryList.length === 0) return null;

  return (
    <section id="gallery" className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 scroll-mt-24 sm:scroll-mt-28">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono uppercase tracking-widest mb-3">
            <Camera className="w-3.5 h-3.5 text-cyan-400" />
            <span>FESTIVAL MEMORIES</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-mech tracking-wider text-transparent bg-clip-text bg-gradient-to-b from-white via-slate-100 to-cyan-300">
            GALLERY
          </h2>
          <p className="mt-1 text-sm text-slate-400 font-sans">
            Moments that inspire innovation and engineering excellence.
          </p>
        </div>

        <button
          onClick={() => {
            if (galleryList.length > 0) openLightbox(0);
          }}
          className="self-start sm:self-auto px-4 py-2 rounded-xl text-xs font-mech font-bold uppercase tracking-wider text-cyan-300 bg-slate-900/80 border border-cyan-500/30 hover:border-cyan-400 transition-colors"
        >
          View All Moments
        </button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {galleryList.map((item, idx) => (
          <div
            key={item.id}
            onClick={() => openLightbox(idx)}
            className="group relative h-48 sm:h-56 rounded-2xl overflow-hidden cursor-pointer border border-cyan-500/20 hover:border-cyan-400 transition-all duration-300 bg-slate-900"
          >
            <img
              src={item.image_url}
              alt={item.title || 'INSPRANO Moment'}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80 group-hover:opacity-100"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-70 group-hover:opacity-90 transition-opacity" />

            <div className="absolute bottom-3 left-3 right-3">
              {item.category && (
                <span className="text-[9px] font-mech uppercase tracking-widest text-cyan-400 bg-cyan-950/80 px-2 py-0.5 rounded border border-cyan-500/30 inline-block mb-1">
                  {item.category}
                </span>
              )}
              <h4 className="text-xs sm:text-sm font-mech font-bold text-white line-clamp-1">
                {item.title}
              </h4>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal with React Portal to body & z-[99999] */}
      {mounted && activeImageIndex !== null && createPortal(
        <div
          onClick={closeLightbox}
          className="fixed inset-0 z-[99999] bg-slate-950 text-white flex flex-col items-center justify-center p-4 sm:p-6 overflow-y-auto animate-fadeIn min-h-screen gap-4"
        >
          {/* Top Header Bar */}
          <div className="w-full max-w-5xl flex items-center justify-between gap-4 py-2 border-b border-cyan-500/20 z-20 shrink-0">
            <button
              onClick={closeLightbox}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-cyan-950/90 hover:bg-cyan-900 border border-cyan-500/50 text-cyan-300 hover:text-white text-xs font-mech font-bold uppercase tracking-wider shadow-[0_0_15px_rgba(0,210,255,0.3)] transition-all active:scale-95"
            >
              <ArrowLeft className="w-4 h-4 text-cyan-400" />
              <span>Back to Gallery</span>
            </button>

            <span className="text-xs font-mono text-slate-300 hidden sm:inline-block">
              Photo {activeImageIndex + 1} of {galleryList.length} • Click anywhere to close
            </span>

            <button
              onClick={closeLightbox}
              aria-label="Close photo preview"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-red-950/90 hover:bg-red-900 border border-red-500/50 text-red-300 hover:text-white text-xs font-mech font-bold uppercase tracking-wider shadow-[0_0_15px_rgba(255,30,66,0.3)] transition-all active:scale-95"
            >
              <X className="w-4 h-4 text-red-400" />
              <span>Close</span>
            </button>
          </div>

          {/* Center Main Lightbox Image View */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-5xl w-full flex-1 flex flex-col items-center justify-center py-2"
          >
            {/* Prev Image Button */}
            <button
              onClick={prevImage}
              aria-label="Previous image"
              className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-slate-900/90 text-cyan-400 hover:text-white hover:bg-cyan-950 border border-cyan-500/40 shadow-[0_0_20px_rgba(0,210,255,0.3)] transition-all active:scale-90"
            >
              <ChevronLeft className="w-6 h-6 sm:w-8 sm:h-8" />
            </button>

            <div className="relative group max-w-full flex flex-col items-center">
              <img
                src={galleryList[activeImageIndex].image_url}
                alt={galleryList[activeImageIndex].title || 'Gallery image'}
                className="max-w-full max-h-[50vh] sm:max-h-[58vh] object-contain rounded-2xl border-2 border-cyan-400/80 shadow-[0_0_50px_rgba(0,210,255,0.4)]"
              />
            </div>

            {/* Next Image Button */}
            <button
              onClick={nextImage}
              aria-label="Next image"
              className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-slate-900/90 text-cyan-400 hover:text-white hover:bg-cyan-950 border border-cyan-500/40 shadow-[0_0_20px_rgba(0,210,255,0.3)] transition-all active:scale-90"
            >
              <ChevronRight className="w-6 h-6 sm:w-8 sm:h-8" />
            </button>

            {/* Photo Title, Caption & Elevated Back Button */}
            <div className="mt-3 text-center px-4 max-w-2xl flex flex-col items-center">
              <h3 className="font-mech font-black text-base sm:text-lg text-white tracking-wide">
                {galleryList[activeImageIndex].title}
              </h3>
              {galleryList[activeImageIndex].caption && (
                <p className="text-xs sm:text-sm text-slate-300 font-sans mt-1 leading-relaxed max-w-xl mx-auto">
                  {galleryList[activeImageIndex].caption}
                </p>
              )}

              <button
                onClick={closeLightbox}
                className="mt-3.5 px-6 py-2.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-cyan-500/40 text-xs font-mech font-bold uppercase tracking-wider text-cyan-300 hover:text-white flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(0,210,255,0.2)] transition-all active:scale-95"
              >
                <ArrowLeft className="w-4 h-4 text-cyan-400" />
                <span>Back to INSPRANO Website</span>
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}
    </section>
  );
}
