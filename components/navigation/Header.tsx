'use client';

import React, { useState } from 'react';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { Compass, Volume2, VolumeX } from 'lucide-react';

interface HeaderProps {
  currentChapter?: string;
  onNavigateChapter?: (percentage: number) => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentChapter = 'ORBIT',
  onNavigateChapter,
}) => {
  const [isMuted, setIsMuted] = useState(true);

  const chapters = [
    { label: '01 ORBIT', target: 0.0 },
    { label: '02 APPROACH', target: 0.27 },
    { label: '03 DESCENT', target: 0.47 },
    { label: '04 WORKS', target: 0.67 },
    { label: '05 SYSTEM', target: 0.83 },
    { label: '06 CONTACT', target: 0.96 },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-5 md:px-10 py-5 flex items-center justify-between border-b border-white/5 backdrop-blur-md bg-space-950/40">
      {/* Brand Identity */}
      <div className="flex items-center gap-3 cursor-pointer" onClick={() => onNavigateChapter?.(0)}>
        <div className="w-2.5 h-2.5 rounded-full bg-white animate-pulse" />
        <span className="font-display font-bold tracking-widest-xl text-xs md:text-sm uppercase text-white">
          TARAN MOON
        </span>
        <span className="hidden md:inline-block text-[10px] font-mono text-lunar-muted tracking-wider">
          // CREATIVE TECH
        </span>
      </div>

      {/* Chapter Indicator Navigation (Desktop) */}
      <nav className="hidden lg:flex items-center gap-6" aria-label="Timeline navigation">
        {chapters.map((ch) => (
          <button
            key={ch.label}
            onClick={() => onNavigateChapter?.(ch.target)}
            className={`text-[11px] font-mono tracking-wider transition-colors uppercase ${
              currentChapter.includes(ch.label.split(' ')[1])
                ? 'text-white font-semibold'
                : 'text-lunar-muted hover:text-lunar-slate'
            }`}
          >
            {ch.label}
          </button>
        ))}
      </nav>

      {/* Telemetry Status & Controls */}
      <div className="flex items-center gap-3">
        <StatusBadge label={`PHASE: ${currentChapter}`} status="active" />

        <button
          onClick={() => setIsMuted(!isMuted)}
          className="p-1.5 rounded-full border border-white/10 bg-space-800/80 text-lunar-slate hover:text-white transition-colors"
          aria-label={isMuted ? 'Atmosphere audio muted' : 'Atmosphere audio active'}
          title={isMuted ? 'Audio Offline' : 'Audio Active'}
        >
          {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5 text-lunar-cyan" />}
        </button>
      </div>
    </header>
  );
};
