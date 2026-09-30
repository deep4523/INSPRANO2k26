'use client';

import React, { useState, useEffect } from 'react';
import { Search, X, ChevronRight, Sparkles } from 'lucide-react';

interface SearchModalProps {
  onClose: () => void;
  onSelectEvent: (event: any) => void;
}

export default function SearchModal({ onClose, onSelectEvent }: SearchModalProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<{ events: any[]; categories: any[] }>({
    events: [],
    categories: [],
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  useEffect(() => {
    if (!query.trim()) {
      setResults({ events: [], categories: [] });
      setLoading(false);
      return;
    }

    const timer = setTimeout(async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
        const json = await res.json();
        if (json.success && json.data) {
          if (Array.isArray(json.data)) {
            setResults({ events: json.data, categories: [] });
          } else {
            setResults({
              events: Array.isArray(json.data.events) ? json.data.events : [],
              categories: Array.isArray(json.data.categories) ? json.data.categories : [],
            });
          }
        } else {
          setResults({ events: [], categories: [] });
        }
      } catch (err) {
        console.error('Search query error:', err);
        setResults({ events: [], categories: [] });
      } finally {
        setLoading(false);
      }
    }, 200);

    return () => clearTimeout(timer);
  }, [query]);

  const eventsList = results?.events || [];
  const categoriesList = results?.categories || [];

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-[100] bg-slate-950/85 backdrop-blur-md flex items-start justify-center pt-16 sm:pt-24 p-4 animate-fadeIn"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="hud-panel cyber-clip w-full max-w-xl rounded-3xl border-2 border-cyan-500/40 bg-slate-950 p-4 sm:p-6 shadow-[0_0_60px_rgba(0,210,255,0.35)] flex flex-col max-h-[80vh]"
      >
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 border-b border-cyan-500/20 pb-3">
          <Search className="w-5 h-5 text-cyan-400 flex-shrink-0" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search events (e.g. Hackathon, EV, Robotics, Code)..."
            className="flex-1 bg-transparent text-sm sm:text-base text-white placeholder-slate-500 focus:outline-none font-sans"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-xs font-mono text-slate-500 hover:text-slate-300 px-1.5"
            >
              Clear
            </button>
          )}
          <button
            onClick={onClose}
            aria-label="Close search"
            className="p-1.5 rounded-full hover:bg-red-950/60 text-slate-400 hover:text-red-400 border border-transparent hover:border-red-500/40 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results Container */}
        <div className="mt-4 overflow-y-auto flex-1 space-y-4 pr-1">
          {loading && (
            <div className="py-8 text-center text-xs font-mono text-cyan-400 animate-pulse flex items-center justify-center gap-2">
              <Sparkles className="w-4 h-4 animate-spin text-cyan-400" />
              <span>Scanning festival database for "{query}"...</span>
            </div>
          )}

          {!loading && query.trim() && eventsList.length === 0 && categoriesList.length === 0 && (
            <div className="py-8 text-center text-xs font-mono text-slate-400">
              No matching festival events found for "{query}". Try searching for <span className="text-cyan-400">Hackathon</span>, <span className="text-cyan-400">EV</span>, <span className="text-cyan-400">Robotics</span>, or <span className="text-cyan-400">Gaming</span>.
            </div>
          )}

          {!loading && !query.trim() && (
            <div className="py-6 text-center text-xs font-mono text-slate-500">
              Type to search all 28 INSPRANO 2K26 events by name, branch, or keywords.
            </div>
          )}

          {eventsList.length > 0 && (
            <div>
              <div className="text-[10px] font-mono uppercase tracking-widest text-cyan-400 mb-2 flex items-center justify-between">
                <span>Matching Events</span>
                <span className="bg-cyan-950/80 px-2 py-0.5 rounded border border-cyan-500/30">
                  {eventsList.length} Found
                </span>
              </div>
              <div className="space-y-2">
                {eventsList.map((ev: any) => (
                  <div
                    key={ev.id || ev.name}
                    onClick={() => {
                      onClose();
                      onSelectEvent(ev);
                    }}
                    className="p-3 rounded-xl bg-slate-900/80 hover:bg-cyan-950/60 border border-slate-800 hover:border-cyan-400 cursor-pointer flex items-center justify-between transition-all group shadow-sm"
                  >
                    <div>
                      <div className="font-mech font-bold text-xs sm:text-sm text-slate-100 group-hover:text-cyan-300">
                        {ev.name}
                      </div>
                      <div className="text-[11px] font-mono text-slate-400 mt-0.5 flex items-center gap-2">
                        <span className="text-cyan-400">{ev.department || 'General'}</span>
                        {ev.prize_amount && (
                          <span>• Prize: ₹{Number(ev.prize_amount).toLocaleString('en-IN')}</span>
                        )}
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-cyan-400 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {categoriesList.length > 0 && (
            <div>
              <div className="text-[10px] font-mono uppercase tracking-widest text-blue-400 mb-2">
                Categories ({categoriesList.length})
              </div>
              <div className="flex flex-wrap gap-2">
                {categoriesList.map((cat: any) => (
                  <span
                    key={cat.id || cat.name}
                    className="text-xs font-mech px-3 py-1 rounded-full bg-slate-900 border border-slate-700 text-slate-300"
                  >
                    {cat.name}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
