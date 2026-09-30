'use client';

import React, { useState } from 'react';
import { X, CheckCircle, Handshake, Building2, User, Mail, Phone, Globe, MessageSquare } from 'lucide-react';

export default function SponsorshipModal({ onClose }: { onClose: () => void }) {
  const [organizationName, setOrganizationName] = useState('');
  const [contactPerson, setContactPerson] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [website, setWebsite] = useState('');
  const [interestTier, setInterestTier] = useState('GOLD');
  const [message, setMessage] = useState('');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch('/api/sponsorship', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          organizationName,
          contactPerson,
          email,
          phone,
          website,
          interestTier,
          message,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to submit proposal.');
      }

      setSuccess(true);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="hud-panel cyber-clip w-full max-w-xl rounded-2xl border border-cyan-500/40 bg-slate-950 p-6 sm:p-8 relative shadow-[0_0_50px_rgba(0,210,255,0.3)] my-8">
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute top-5 right-5 p-2 rounded-full bg-slate-900 text-slate-400 hover:text-white border border-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {success ? (
          <div className="text-center py-6 space-y-4">
            <div className="inline-flex p-3 rounded-full bg-emerald-500/10 border border-emerald-500/40 text-emerald-400 mb-2">
              <CheckCircle className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-black font-mech text-white">
              PROPOSAL TRANSMITTED
            </h3>
            <p className="text-xs text-slate-300 font-sans max-w-md mx-auto leading-relaxed">
              Thank you for supporting INSPRANO 2K26. Our corporate sponsorship and public relations committee will review your submission and connect with you shortly.
            </p>
            <div className="pt-4">
              <button
                onClick={onClose}
                className="px-6 py-2.5 rounded-xl text-xs font-mech font-bold uppercase tracking-wider text-white bg-cyan-600 hover:bg-cyan-500 transition-colors shadow-[0_0_15px_rgba(0,210,255,0.4)]"
              >
                Done
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="border-b border-cyan-500/20 pb-3 mb-4">
              <div className="inline-flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-widest text-cyan-400 mb-1">
                <Handshake className="w-3.5 h-3.5" />
                <span>CORPORATE PARTNERSHIP PORTAL</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black font-mech text-white">
                BECOME AN OFFICIAL SPONSOR
              </h2>
            </div>

            {error && (
              <div className="p-3 rounded-lg bg-red-950/80 border border-red-500/50 text-red-200 text-xs font-mono">
                {error}
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-mono uppercase text-slate-400 mb-1">
                  Organization / Company *
                </label>
                <div className="relative">
                  <Building2 className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                  <input
                    type="text"
                    required
                    value={organizationName}
                    onChange={(e) => setOrganizationName(e.target.value)}
                    placeholder="e.g. Acme Technologies"
                    className="w-full bg-slate-900 border border-slate-800 focus:border-cyan-400 rounded-xl pl-9 pr-3.5 py-2 text-xs sm:text-sm text-white focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-mono uppercase text-slate-400 mb-1">
                  Contact Person *
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                  <input
                    type="text"
                    required
                    value={contactPerson}
                    onChange={(e) => setContactPerson(e.target.value)}
                    placeholder="Full name & title"
                    className="w-full bg-slate-900 border border-slate-800 focus:border-cyan-400 rounded-xl pl-9 pr-3.5 py-2 text-xs sm:text-sm text-white focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-mono uppercase text-slate-400 mb-1">
                  Corporate Email *
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="contact@company.com"
                    className="w-full bg-slate-900 border border-slate-800 focus:border-cyan-400 rounded-xl pl-9 pr-3.5 py-2 text-xs sm:text-sm text-white focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-mono uppercase text-slate-400 mb-1">
                  Phone Number *
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91..."
                    className="w-full bg-slate-900 border border-slate-800 focus:border-cyan-400 rounded-xl pl-9 pr-3.5 py-2 text-xs sm:text-sm text-white focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-mono uppercase text-slate-400 mb-1">
                  Website URL
                </label>
                <div className="relative">
                  <Globe className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                  <input
                    type="url"
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                    placeholder="https://..."
                    className="w-full bg-slate-900 border border-slate-800 focus:border-cyan-400 rounded-xl pl-9 pr-3.5 py-2 text-xs sm:text-sm text-white focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-mono uppercase text-slate-400 mb-1">
                  Tier Interest
                </label>
                <select
                  value={interestTier}
                  onChange={(e) => setInterestTier(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 focus:border-cyan-400 rounded-xl px-3.5 py-2 text-xs sm:text-sm text-white focus:outline-none"
                >
                  <option value="TITLE_SPONSOR">Title Sponsor</option>
                  <option value="POWERED_BY">Powered By</option>
                  <option value="GOLD">Gold Sponsor</option>
                  <option value="SILVER">Silver Sponsor</option>
                  <option value="BRONZE">Bronze Sponsor</option>
                  <option value="TECH_PARTNER">Tech Partner</option>
                  <option value="MEDIA_PARTNER">Media Partner</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-mono uppercase text-slate-400 mb-1">
                Message / Partnership Goals *
              </label>
              <textarea
                required
                rows={3}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Describe your sponsorship objectives, exhibition booth requirements, or brand integration ideas..."
                className="w-full bg-slate-900 border border-slate-800 focus:border-cyan-400 rounded-xl px-3.5 py-2 text-xs sm:text-sm text-white focus:outline-none"
              />
            </div>

            <div className="pt-4 flex items-center justify-end gap-3 border-t border-slate-800">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl text-xs font-mech font-bold uppercase tracking-wider text-slate-400 hover:text-white"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-2.5 rounded-xl text-xs font-mech font-bold uppercase tracking-wider text-white bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 shadow-[0_0_20px_rgba(0,210,255,0.4)] border border-cyan-400/50 disabled:opacity-50"
              >
                {loading ? 'Submitting...' : 'Submit Partnership Proposal'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
