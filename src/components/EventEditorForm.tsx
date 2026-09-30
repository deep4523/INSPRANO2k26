'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  Save,
  CheckCircle,
  Eye,
  Smartphone,
  Tablet,
  Monitor,
  Upload,
  ArrowLeft,
  Award,
  Zap,
} from 'lucide-react';
import Link from 'next/link';

interface EventEditorProps {
  initialData?: any;
  isNew?: boolean;
}

export default function EventEditorForm({ initialData, isNew = false }: EventEditorProps) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'basic' | 'info' | 'prizes' | 'media' | 'preview'>('basic');
  const [previewDevice, setPreviewDevice] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [categories, setCategories] = useState<any[]>([]);

  // Form State
  const [name, setName] = useState(initialData?.name || '');
  const [categoryId, setCategoryId] = useState(initialData?.category_id || 1);
  const [department, setDepartment] = useState(initialData?.department || 'General');
  const [shortDescription, setShortDescription] = useState(initialData?.short_description || '');
  const [fullDescription, setFullDescription] = useState(initialData?.full_description || '');
  const [date, setDate] = useState(initialData?.event_date || '2026-10-09');
  const [startTime, setStartTime] = useState(initialData?.start_time || '09:30');
  const [endTime, setEndTime] = useState(initialData?.end_time || '17:00');
  const [venue, setVenue] = useState(initialData?.venue || 'GCEK Campus');
  const [minTeamSize, setMinTeamSize] = useState(initialData?.min_team_size || 1);
  const [maxTeamSize, setMaxTeamSize] = useState(initialData?.max_team_size || 1);
  const [registrationFee, setRegistrationFee] = useState(initialData?.registration_fee || 0);
  const [prizeAmount, setPrizeAmount] = useState(initialData?.prize_amount || 1500);
  const [firstPrize, setFirstPrize] = useState(initialData?.first_prize || 1500);
  const [secondPrize, setSecondPrize] = useState(initialData?.second_prize || 0);
  const [thirdPrize, setThirdPrize] = useState(initialData?.third_prize || 0);
  const [trophyInfo, setTrophyInfo] = useState(initialData?.trophy_info || '');
  const [rules, setRules] = useState(initialData?.rules || '');
  const [guidelines, setGuidelines] = useState(initialData?.guidelines || '');
  const [coordinatorName, setCoordinatorName] = useState(initialData?.coordinator_name || '');
  const [coordinatorPhone, setCoordinatorPhone] = useState(initialData?.coordinator_phone || '');
  const [coordinatorEmail, setCoordinatorEmail] = useState(initialData?.coordinator_email || '');
  const [registrationStatus, setRegistrationStatus] = useState(initialData?.registration_status || 'OPEN');
  const [publishStatus, setPublishStatus] = useState(initialData?.publish_status || 'PUBLISHED');
  const [featured, setFeatured] = useState(Boolean(initialData?.featured));
  const [imageUrl, setImageUrl] = useState(initialData?.image_url || '');
  const [googleFormUrl, setGoogleFormUrl] = useState(initialData?.google_form_url || '');

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    fetch('/api/categories')
      .then(res => res.json())
      .then(json => {
        if (json.success) setCategories(json.data);
      })
      .catch(console.error);
  }, []);

  const handleSave = async (targetPublishStatus = publishStatus) => {
    setLoading(true);
    setMessage(null);

    const payload = {
      name,
      categoryId,
      department,
      shortDescription,
      fullDescription,
      date,
      startTime,
      endTime,
      venue,
      minTeamSize,
      maxTeamSize,
      registrationFee,
      prizeAmount,
      firstPrize,
      secondPrize,
      thirdPrize,
      trophyInfo,
      rules,
      guidelines,
      coordinatorName,
      coordinatorPhone,
      coordinatorEmail,
      registrationStatus,
      publishStatus: targetPublishStatus,
      featured,
      imageUrl,
      googleFormUrl,
    };


    try {
      const url = isNew ? '/api/admin/events' : `/api/admin/events/${initialData.id}`;
      const method = isNew ? 'POST' : 'PUT';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to save event.');
      }

      setMessage({ type: 'success', text: `Event successfully ${isNew ? 'created' : 'updated'}.` });
      if (isNew) {
        router.push('/admin/events');
      }
    } catch (err: any) {
      setMessage({ type: 'error', text: err.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Link
            href="/admin/events"
            className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <h1 className="text-xl sm:text-2xl font-black font-mech text-white">
              {isNew ? 'CREATE COMPETITION EVENT' : `EDIT: ${name}`}
            </h1>
            <p className="text-xs font-mono text-slate-400 mt-0.5">
              INSPRANO 2K26 Challenge Registry
            </p>
          </div>
        </div>

        {/* Action Buttons matching Image 2 */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => handleSave('DRAFT')}
            disabled={loading}
            className="px-4 py-2 rounded-xl text-xs font-mech font-bold uppercase tracking-wider text-slate-300 bg-slate-900 border border-slate-700 hover:border-slate-500 disabled:opacity-50"
          >
            Save Draft
          </button>
          <button
            type="button"
            onClick={() => handleSave('PUBLISHED')}
            disabled={loading}
            className="px-6 py-2 rounded-xl text-xs font-mech font-bold uppercase tracking-wider text-white bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 shadow-[0_0_15px_rgba(0,210,255,0.4)] disabled:opacity-50"
          >
            {loading ? 'Saving...' : 'Publish Event'}
          </button>
        </div>
      </div>

      {message && (
        <div
          className={`p-3 rounded-xl border text-xs font-mono ${
            message.type === 'success'
              ? 'bg-emerald-950/80 border-emerald-500/50 text-emerald-200'
              : 'bg-red-950/80 border-red-500/50 text-red-200'
          }`}
        >
          {message.text}
        </div>
      )}

      {/* Tab Navigation matching Image 2 */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-3 overflow-x-auto no-scrollbar">
        {[
          { id: 'basic', label: 'Basic Details' },
          { id: 'info', label: 'Event Info' },
          { id: 'prizes', label: 'Prizes & Rules' },
          { id: 'media', label: 'Media' },
          { id: 'preview', label: 'Preview' },
        ].map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setActiveTab(t.id as any)}
            className={`px-4 py-2 rounded-xl text-xs font-mech font-bold uppercase tracking-wider transition-colors whitespace-nowrap ${
              activeTab === t.id
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Tab 1: Basic Details */}
      {activeTab === 'basic' && (
        <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
          <div>
            <label className="block text-xs font-mono uppercase text-slate-400 mb-1.5">
              Event Name *
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. EV Working Model Challenge"
              className="w-full bg-slate-950 border border-slate-800 focus:border-cyan-400 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono uppercase text-slate-400 mb-1.5">
                Category *
              </label>
              <select
                value={categoryId}
                onChange={(e) => setCategoryId(Number(e.target.value))}
                className="w-full bg-slate-950 border border-slate-800 focus:border-cyan-400 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none"
              >
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-mono uppercase text-slate-400 mb-1.5">
                Department
              </label>
              <input
                type="text"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                placeholder="e.g. Computer Science & Engineering"
                className="w-full bg-slate-950 border border-slate-800 focus:border-cyan-400 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono uppercase text-slate-400 mb-1.5">
              Short Description / Elevator Pitch
            </label>
            <input
              type="text"
              value={shortDescription}
              onChange={(e) => setShortDescription(e.target.value)}
              placeholder="e.g. Build, Code, Innovate in 24 hours."
              className="w-full bg-slate-950 border border-slate-800 focus:border-cyan-400 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-mono uppercase text-slate-400 mb-1.5">
              Full Description & Challenge Scope
            </label>
            <textarea
              rows={4}
              value={fullDescription}
              onChange={(e) => setFullDescription(e.target.value)}
              placeholder="Provide complete competition parameters, problem statements, and requirements..."
              className="w-full bg-slate-950 border border-slate-800 focus:border-cyan-400 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none font-sans"
            />
          </div>

          <div>
            <label className="block text-xs font-mono uppercase text-slate-400 mb-1.5">
              Official Google Form Link (Redirect URL)
            </label>
            <input
              type="url"
              value={googleFormUrl}
              onChange={(e) => setGoogleFormUrl(e.target.value)}
              placeholder="e.g. https://forms.gle/..."
              className="w-full bg-slate-950 border border-slate-800 focus:border-cyan-400 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none font-mono"
            />
          </div>

          <div className="flex items-center gap-6 pt-2">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={featured}
                onChange={(e) => setFeatured(e.target.checked)}
                className="w-4 h-4 rounded text-cyan-500 bg-slate-950 border-slate-800 focus:ring-0"
              />
              <span className="text-xs font-mono text-slate-300">Feature this event on Homepage Spotlight</span>
            </label>
          </div>
        </div>
      )}

      {/* Tab 2: Event Info */}
      {activeTab === 'info' && (
        <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-mono uppercase text-slate-400 mb-1.5">Date</label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 focus:border-cyan-400 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-mono uppercase text-slate-400 mb-1.5">Start Time</label>
              <input
                type="text"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                placeholder="09:30"
                className="w-full bg-slate-950 border border-slate-800 focus:border-cyan-400 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-mono uppercase text-slate-400 mb-1.5">End Time</label>
              <input
                type="text"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                placeholder="17:00"
                className="w-full bg-slate-950 border border-slate-800 focus:border-cyan-400 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none font-mono"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-mono uppercase text-slate-400 mb-1.5">Venue</label>
              <input
                type="text"
                value={venue}
                onChange={(e) => setVenue(e.target.value)}
                placeholder="e.g. CSE Block / Mechanical Lab"
                className="w-full bg-slate-950 border border-slate-800 focus:border-cyan-400 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-mono uppercase text-slate-400 mb-1.5">Min Team Size</label>
              <input
                type="number"
                min={1}
                max={10}
                value={minTeamSize}
                onChange={(e) => setMinTeamSize(Number(e.target.value))}
                className="w-full bg-slate-950 border border-slate-800 focus:border-cyan-400 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-mono uppercase text-slate-400 mb-1.5">Max Team Size</label>
              <input
                type="number"
                min={1}
                max={10}
                value={maxTeamSize}
                onChange={(e) => setMaxTeamSize(Number(e.target.value))}
                className="w-full bg-slate-950 border border-slate-800 focus:border-cyan-400 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none font-mono"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono uppercase text-slate-400 mb-1.5">Registration Status</label>
              <select
                value={registrationStatus}
                onChange={(e) => setRegistrationStatus(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 focus:border-cyan-400 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none font-mono"
              >
                <option value="OPEN">OPEN</option>
                <option value="UPCOMING">UPCOMING</option>
                <option value="CLOSED">CLOSED</option>
                <option value="COMPLETED">COMPLETED</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-mono uppercase text-slate-400 mb-1.5">Registration Fee (₹)</label>
              <input
                type="number"
                min={0}
                value={registrationFee}
                onChange={(e) => setRegistrationFee(Number(e.target.value))}
                className="w-full bg-slate-950 border border-slate-800 focus:border-cyan-400 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none font-mono"
              />
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Prizes & Rules */}
      {activeTab === 'prizes' && (
        <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <div>
              <label className="block text-xs font-mono uppercase text-slate-400 mb-1.5">Total Prize (₹) *</label>
              <input
                type="number"
                required
                value={prizeAmount}
                onChange={(e) => {
                  setPrizeAmount(Number(e.target.value));
                  if (!firstPrize) setFirstPrize(Number(e.target.value));
                }}
                className="w-full bg-slate-950 border border-slate-800 focus:border-cyan-400 rounded-xl px-4 py-2.5 text-sm text-amber-400 font-mech font-bold focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-mono uppercase text-slate-400 mb-1.5">1st Prize (₹)</label>
              <input
                type="number"
                value={firstPrize}
                onChange={(e) => setFirstPrize(Number(e.target.value))}
                className="w-full bg-slate-950 border border-slate-800 focus:border-cyan-400 rounded-xl px-4 py-2.5 text-sm text-white font-mono focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-mono uppercase text-slate-400 mb-1.5">2nd Prize (₹)</label>
              <input
                type="number"
                value={secondPrize}
                onChange={(e) => setSecondPrize(Number(e.target.value))}
                className="w-full bg-slate-950 border border-slate-800 focus:border-cyan-400 rounded-xl px-4 py-2.5 text-sm text-white font-mono focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-mono uppercase text-slate-400 mb-1.5">3rd Prize (₹)</label>
              <input
                type="number"
                value={thirdPrize}
                onChange={(e) => setThirdPrize(Number(e.target.value))}
                className="w-full bg-slate-950 border border-slate-800 focus:border-cyan-400 rounded-xl px-4 py-2.5 text-sm text-white font-mono focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono uppercase text-slate-400 mb-1.5">Trophy & Certificate Info</label>
            <input
              type="text"
              value={trophyInfo}
              onChange={(e) => setTrophyInfo(e.target.value)}
              placeholder="e.g. Winner Trophy + Merit Certificates"
              className="w-full bg-slate-950 border border-slate-800 focus:border-cyan-400 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-mono uppercase text-slate-400 mb-1.5">Rules & Regulations</label>
            <textarea
              rows={4}
              value={rules}
              onChange={(e) => setRules(e.target.value)}
              placeholder="1. Standard AICTE regulations apply...&#10;2. Hardware specs must comply..."
              className="w-full bg-slate-950 border border-slate-800 focus:border-cyan-400 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none font-mono"
            />
          </div>
        </div>
      )}

      {/* Tab 4: Media */}
      {activeTab === 'media' && (
        <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
          <div>
            <label className="block text-xs font-mono uppercase text-slate-400 mb-1.5">Event Image / Banner URL</label>
            <input
              type="text"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="https://... or /uploads/..."
              className="w-full bg-slate-950 border border-slate-800 focus:border-cyan-400 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none font-mono"
            />
          </div>

          <div className="border-2 border-dashed border-slate-800 rounded-2xl p-8 text-center bg-slate-950/40">
            <Upload className="w-8 h-8 text-slate-500 mx-auto mb-2" />
            <div className="text-xs font-mono text-slate-400">
              Drag & drop event graphics or enter image link above
            </div>
            <p className="text-[10px] text-slate-600 mt-1">Accepts PNG, WebP, JPG up to 5MB</p>
          </div>
        </div>
      )}

      {/* Tab 5: Live 3-Device Preview */}
      {activeTab === 'preview' && (
        <div className="space-y-4">
          {/* Device Toggle */}
          <div className="flex items-center justify-center gap-2 p-2 rounded-xl bg-slate-900 border border-slate-800 w-fit mx-auto">
            <button
              type="button"
              onClick={() => setPreviewDevice('desktop')}
              className={`p-2 rounded-lg text-xs font-mono flex items-center gap-1.5 ${
                previewDevice === 'desktop' ? 'bg-cyan-500/20 text-cyan-300' : 'text-slate-400'
              }`}
            >
              <Monitor className="w-4 h-4" />
              <span>Desktop</span>
            </button>
            <button
              type="button"
              onClick={() => setPreviewDevice('tablet')}
              className={`p-2 rounded-lg text-xs font-mono flex items-center gap-1.5 ${
                previewDevice === 'tablet' ? 'bg-cyan-500/20 text-cyan-300' : 'text-slate-400'
              }`}
            >
              <Tablet className="w-4 h-4" />
              <span>Tablet</span>
            </button>
            <button
              type="button"
              onClick={() => setPreviewDevice('mobile')}
              className={`p-2 rounded-lg text-xs font-mono flex items-center gap-1.5 ${
                previewDevice === 'mobile' ? 'bg-cyan-500/20 text-cyan-300' : 'text-slate-400'
              }`}
            >
              <Smartphone className="w-4 h-4" />
              <span>Mobile</span>
            </button>
          </div>

          {/* Device Frame */}
          <div
            className={`mx-auto transition-all duration-300 hud-panel p-6 rounded-3xl border border-cyan-500/30 ${
              previewDevice === 'desktop'
                ? 'max-w-4xl'
                : previewDevice === 'tablet'
                ? 'max-w-md'
                : 'max-w-xs'
            }`}
          >
            <div className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest mb-2">
              {department} • INSPRANO 2K26
            </div>
            <h2 className="text-xl sm:text-2xl font-black font-mech text-white">
              {name || 'Untitled Event Challenge'}
            </h2>
            <div className="text-2xl font-black font-mech text-amber-400 mt-2">
              ₹{(prizeAmount || 0).toLocaleString('en-IN')}
            </div>
            <p className="text-xs text-slate-300 mt-2">
              {shortDescription || fullDescription || 'Challenge parameters will be rendered live on public portal.'}
            </p>
            <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs font-mono text-slate-400">
              <span>Venue: {venue}</span>
              <span>Squad: {maxTeamSize > 1 ? `1 - ${maxTeamSize}` : 'Solo'}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
