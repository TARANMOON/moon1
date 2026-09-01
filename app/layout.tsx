import type { Metadata, Viewport } from 'next';
import { Inter, Syne, JetBrains_Mono } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const syne = Syne({
  subsets: ['latin'],
  variable: '--font-syne',
  display: 'swap',
  weight: ['400', '600', '700', '800'],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
  weight: ['400', '500'],
});

export const viewport: Viewport = {
  themeColor: '#050507',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: 'TARAN MOON — Creative Technologist & Systems Architect',
  description:
    'Editorial, cinematic, and technical personal portfolio. Spatial web experiences, canvas image sequences, and next-generation interactive systems.',
  keywords: [
    'Taran Moon',
    'Creative Technologist',
    'Systems Architect',
    'Frontend Engineer',
    'Canvas Animation',
    'Next.js',
    'Editorial Design',
  ],
  authors: [{ name: 'Taran Moon' }],
  openGraph: {
    title: 'TARAN MOON — Lunar Cinematic Portfolio',
    description:
      'Explore a scroll-driven cinematic journey across lunar orbit, selected engineering works, and spatial systems.',
    url: 'https://taranmoon.com',
    siteName: 'Taran Moon Portfolio',
    images: [
      {
        url: '/moon/poster.jpg',
        width: 1280,
        height: 720,
        alt: 'Taran Moon Cinematic Experience',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TARAN MOON — Creative Technologist',
    description: 'Spatial web engineering & lunar cinematic journey.',
    images: ['/moon/poster.jpg'],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${syne.variable} ${jetbrainsMono.variable}`}>
      <body className="bg-space-900 text-white selection:bg-lunar-cyan/20 selection:text-white">
        <div className="lunar-grain" aria-hidden="true" />
        {children}
      </body>
    </html>
  );
}
