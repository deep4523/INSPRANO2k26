'use client';

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { ArrowLeft, Handshake, CheckCircle, Building2, User, Mail, Phone, Globe } from 'lucide-react';

export default function SponsorshipPage() {
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
    <main className="min-h-screen bg-slate-950 text-white relative">
      <Navbar />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16">
        <Link
          href="/#sponsors"
          className="inline-flex items-center gap-2 text-xs font-mono text-slate-400 hover:text-cyan-400 transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Sponsors Showcase</span>
        </Link>

        <div className="hud-panel cyber-clip rounded-3xl p-6 sm:p-10 border border-cyan-500/30">
          <div className="border-b border-cyan-500/20 pb-4 mb-6">
            <span className="text-[10px] font-mono uppercase tracking-widest text-cyan-400">
              CORPORATE PARTNERSHIP PORTAL
            </span>
            <h1 className="text-2xl sm:text-4xl font-black font-mech text-white mt-1">
              SPONSORSHIP APPLICATION
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 font-sans mt-2">
              Collaborate with Government College of Engineering Kalahandi for INSPRANO 2K26. Connect with 3000+ engineers, innovators, and academic talents.
            </p>
          </div>

          {success ? (
            <div className="text-center py-12 space-y-4">
              <div className="inline-flex p-4 rounded-full bg-emerald-500/10 border border-emerald-500/40 text-emerald-400">
                <CheckCircle className="w-10 h-10" />
              </div>
              <h2 className="text-2xl font-black font-mech text-white">
                PROPOSAL SUBMISSION CONFIRMED
              </h2>
              <p className="text-xs text-slate-300 font-sans max-w-md mx-auto leading-relaxed">
                Your partnership expression of interest has been safely stored in our database. The festival conveners and industry liaison officers will reach out to you shortly.
              </p>
              <div className="pt-4">
                <Link
                  href="/"
                  className="px-6 py-2.5 rounded-xl font-mech font-bold text-xs uppercase tracking-wider text-white bg-cyan-600 hover:bg-cyan-500 shadow-[0_0_15px_rgba(0,210,255,0.4)]"
                >
                  Return to Fest Portal
                </Link>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="p-3 rounded-xl bg-red-950/80 border border-red-500/50 text-red-200 text-xs font-mono">
                  {error}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                      placeholder="e.g. Acme Tech Solutions"
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
                      placeholder="Full name & designation"
                      className="w-full bg-slate-900 border border-slate-800 focus:border-cyan-400 rounded-xl pl-9 pr-3.5 py-2 text-xs sm:text-sm text-white focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-mono uppercase text-slate-400 mb-1">
                    Official Corporate Email *
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="partner@company.com"
                      className="w-full bg-slate-900 border border-slate-800 focus:border-cyan-400 rounded-xl pl-9 pr-3.5 py-2 text-xs sm:text-sm text-white focus:outline-none font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-mono uppercase text-slate-400 mb-1">
                    Phone / WhatsApp *
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+91..."
                      className="w-full bg-slate-900 border border-slate-800 focus:border-cyan-400 rounded-xl pl-9 pr-3.5 py-2 text-xs sm:text-sm text-white focus:outline-none font-mono"
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
                      className="w-full bg-slate-900 border border-slate-800 focus:border-cyan-400 rounded-xl pl-9 pr-3.5 py-2 text-xs sm:text-sm text-white focus:outline-none font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-mono uppercase text-slate-400 mb-1">
                    Tier Category of Interest
                  </label>
                  <select
                    value={interestTier}
                    onChange={(e) => setInterestTier(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 focus:border-cyan-400 rounded-xl px-3.5 py-2 text-xs sm:text-sm text-white focus:outline-none font-mono"
                  >
                    <option value="TITLE_SPONSOR">TITLE SPONSOR</option>
                    <option value="POWERED_BY">POWERED BY</option>
                    <option value="GOLD">GOLD SPONSOR</option>
                    <option value="SILVER">SILVER SPONSOR</option>
                    <option value="BRONZE">BRONZE SPONSOR</option>
                    <option value="TECH_PARTNER">TECH PARTNER</option>
                    <option value="MEDIA_PARTNER">MEDIA PARTNER</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-mono uppercase text-slate-400 mb-1">
                  Message & Partnership Vision *
                </label>
                <textarea
                  required
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Outline your sponsorship goals, booth exhibition requirements, recruitment plans, or branding integrations..."
                  className="w-full bg-slate-900 border border-slate-800 focus:border-cyan-400 rounded-xl p-3.5 text-xs sm:text-sm text-white focus:outline-none font-sans"
                />
              </div>

              <div className="pt-4 flex items-center justify-end gap-3 border-t border-slate-800">
                <Link
                  href="/#sponsors"
                  className="px-4 py-2 rounded-xl text-xs font-mech font-bold uppercase text-slate-400 hover:text-white"
                >
                  Cancel
                </Link>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-7 py-3 rounded-xl text-xs font-mech font-bold uppercase tracking-wider text-white bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 shadow-[0_0_20px_rgba(0,210,255,0.4)] border border-cyan-400/50 disabled:opacity-50"
                >
                  {loading ? 'Submitting Proposal...' : 'Transmit Sponsorship Proposal'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>

      <Footer />
    </main>
  );
}
