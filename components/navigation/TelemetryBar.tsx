'use client';

import React, { useEffect, useState } from 'react';
import { TELEMETRY_CONSTANTS } from '@/lib/data/portfolioData';

interface TelemetryBarProps {
  progress: number;
  currentFrame: number;
}

export const TelemetryBar: React.FC<TelemetryBarProps> = ({
  progress,
  currentFrame,
}) => {
  const [timeStr, setTimeStr] = useState<string>('00:00:00 UTC');

  useEffect(() => {
    const update = () => {
      const now = new Date();
      setTimeStr(`${now.toISOString().substring(11, 19)} UTC`);
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  // Compute simulated altitude from progress
  const altitude = Math.max(0, Math.floor((1 - progress) * 110000));
  const altitudeStr = `${altitude.toLocaleString()} M`;

  return (
    <footer className="fixed bottom-0 left-0 right-0 z-50 px-5 md:px-10 py-3 flex items-center justify-between border-t border-white/5 backdrop-blur-md bg-space-950/50 text-[10px] md:text-[11px] font-mono text-lunar-slate">
      {/* Left Coordinates & Mission */}
      <div className="flex items-center gap-4">
        <span className="text-white/80">{TELEMETRY_CONSTANTS.mission}</span>
        <span className="hidden sm:inline-block text-white/30">|</span>
        <span className="hidden sm:inline-block">
          POS {TELEMETRY_CONSTANTS.latitude} {TELEMETRY_CONSTANTS.longitude}
        </span>
      </div>

      {/* Center Progress Scrubber info */}
      <div className="flex items-center gap-3">
        <span className="text-lunar-muted hidden md:inline-block">TRAJECTORY</span>
        <div className="w-24 md:w-36 h-1 bg-white/10 rounded-full overflow-hidden">
          <div
            className="h-full bg-lunar-cyan transition-all duration-75"
            style={{ width: `${Math.round(progress * 100)}%` }}
          />
        </div>
        <span className="text-white font-medium">
          {String(currentFrame).padStart(3, '0')}/240 ({Math.round(progress * 100)}%)
        </span>
      </div>

      {/* Right Altitude & UTC Time */}
      <div className="flex items-center gap-4">
        <span className="hidden md:inline-block">ALT: {altitudeStr}</span>
        <span className="hidden md:inline-block text-white/30">|</span>
        <span className="text-white/90">{timeStr}</span>
      </div>
    </footer>
  );
};
