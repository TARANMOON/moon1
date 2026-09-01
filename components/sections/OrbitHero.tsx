'use client';

import React from 'react';
import { ArrowDown } from 'lucide-react';

interface OrbitHeroProps {
  progress: number;
}

export const OrbitHero: React.FC<OrbitHeroProps> = ({ progress }) => {
  // Visible between 0.00 and 0.18
  const opacity = progress <= 0.1 ? 1 : Math.max(0, 1 - (progress - 0.1) / 0.08);

  if (opacity <= 0) return null;

  return (
    <section
      className="fixed inset-0 flex flex-col items-center justify-between p-8 md:p-16 z-20 pointer-events-none transition-opacity duration-300"
      style={{ opacity }}
    >
      {/* Top telemetry spacer */}
      <div className="w-full flex justify-between items-center text-[10px] font-mono text-lunar-muted pt-16">
        <span>LUNAR ORBIT INSERTION // 110 KM</span>
        <span>SYS: ONLINE</span>
      </div>

      {/* Main Title Center */}
      <div className="text-center space-y-4 max-w-4xl">
        <div className="inline-block px-3 py-1 rounded-full border border-white/10 bg-white/5 text-[10px] md:text-[11px] font-mono tracking-widest text-lunar-cyan uppercase mb-2">
          Portfolio & Spatial Archives
        </div>
        <h1 className="text-4xl sm:text-6xl md:text-8xl font-display font-extrabold tracking-tight text-white uppercase leading-none">
          TARAN MOON
        </h1>
        <p className="text-sm md:text-lg font-sans text-lunar-slate max-w-xl mx-auto font-light leading-relaxed">
          Creative Technologist & Systems Architect. Engineering cinematic web experiences and high-performance canvas systems.
        </p>
      </div>

      {/* Bottom Scroll Prompt */}
      <div className="flex flex-col items-center gap-2 pb-16">
        <span className="text-[10px] font-mono tracking-widest text-lunar-muted uppercase animate-pulse">
          [ SCROLL TO COMMENCE DESCENT ]
        </span>
        <ArrowDown className="w-4 h-4 text-lunar-cyan animate-bounce" />
      </div>
    </section>
  );
};
