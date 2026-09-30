import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://insprano.gcekbpatna.ac.in'),
  title: 'INSPRANO 2K26 | Government College of Engineering Kalahandi',
  description: 'Official technical festival of Government College of Engineering Kalahandi (GCEK), Bhawanipatna (8 — 10 October 2026). Engineering Beyond Limits with 28 challenges and ₹85,000+ prize pool.',
  keywords: [
    'INSPRANO',
    'INSPRANO 2026',
    'INSPRANO 2K26',
    'GCEK',
    'Government College of Engineering Kalahandi',
    'Bhawanipatna Tech Fest',
    'Engineering Beyond Limits',
    'Hackathon Odisha',
    'Robotics EV Challenge',
  ],
  authors: [{ name: 'GCEK Tech Council' }],
  openGraph: {
    title: 'INSPRANO 2K26 | Government College of Engineering Kalahandi',
    description: 'Engineering Beyond Limits. Official Technical Festival 8 — 10 October 2026, Bhawanipatna, Odisha.',
    url: 'https://insprano.gcekbpatna.ac.in',
    siteName: 'INSPRANO 2K26',
    images: [
      {
        url: '/images/insprano-poster.jpg',
        width: 1200,
        height: 630,
        alt: 'INSPRANO 2K26 Poster — Government College of Engineering Kalahandi',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'INSPRANO 2K26 | Government College of Engineering Kalahandi',
    description: 'Engineering Beyond Limits. Official Technical Festival 8 — 10 October 2026, Bhawanipatna, Odisha.',
    images: ['/images/insprano-poster.jpg'],
  },
  icons: {
    icon: '/favicon.ico',
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#020617',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className="bg-slate-950 text-slate-100 antialiased selection:bg-cyan-500 selection:text-black overflow-x-hidden w-full min-h-screen relative">
        {children}
      </body>
    </html>
  );
}
