'use client';

import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ScheduleSection from '@/components/ScheduleSection';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function SchedulePage() {
  const [scheduleItems, setScheduleItems] = useState<any[]>([]);

  useEffect(() => {
    fetch('/api/schedule')
      .then(res => res.json())
      .then(json => {
        if (json.success) setScheduleItems(json.data || []);
      })
      .catch(console.error);
  }, []);

  return (
    <main className="min-h-screen bg-slate-950 text-white relative">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-mono text-slate-400 hover:text-cyan-400 transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Festival Portal</span>
        </Link>

        <ScheduleSection items={scheduleItems} />
      </div>

      <Footer />
    </main>
  );
}
