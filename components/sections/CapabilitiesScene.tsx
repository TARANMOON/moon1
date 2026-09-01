'use client';

import React from 'react';
import { CAPABILITIES } from '@/lib/data/portfolioData';
import { Cpu } from 'lucide-react';

interface CapabilitiesSceneProps {
  progress: number;
}

export const CapabilitiesScene: React.FC<CapabilitiesSceneProps> = ({ progress }) => {
  // Visible between 0.76 and 0.90
  let opacity = 0;
  if (progress >= 0.76 && progress <= 0.90) {
    if (progress < 0.80) {
      opacity = (progress - 0.76) / 0.04;
    } else if (progress > 0.86) {
      opacity = 1 - (progress - 0.86) / 0.04;
    } else {
      opacity = 1;
    }
  }

  if (opacity <= 0) return null;

  return (
    <section
      className="fixed inset-0 flex flex-col justify-center px-6 md:px-16 py-20 z-20 transition-opacity duration-300 pointer-events-auto"
      style={{ opacity }}
    >
      <div className="max-w-6xl mx-auto w-full space-y-6">
        {/* Section Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div>
            <span className="text-[10px] font-mono text-lunar-cyan tracking-widest uppercase">
              PHASE 05 // SYSTEM CAPABILITIES
            </span>
            <h2 className="text-2xl sm:text-4xl font-display font-bold text-white uppercase tracking-tight">
              Technical Disciplines
            </h2>
          </div>
          <div className="flex items-center gap-2 text-[11px] font-mono text-lunar-slate">
            <Cpu className="w-4 h-4 text-lunar-cyan" />
            <span>FULL STACK // SPATIAL</span>
          </div>
        </div>

        {/* 4 Pillars Matrix */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {CAPABILITIES.map((cap) => (
            <div key={cap.number} className="lunar-card p-5 rounded-xl flex flex-col justify-between">
              <div className="space-y-3">
                <span className="text-[10px] font-mono text-lunar-cyan">{cap.number} // CORE</span>
                <h3 className="text-lg font-display font-semibold text-white tracking-tight leading-snug">
                  {cap.title}
                </h3>
                <p className="text-xs text-lunar-slate font-sans leading-relaxed">
                  {cap.description}
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-white/10 flex flex-wrap gap-1">
                {cap.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-1.5 py-0.5 rounded text-[9px] font-mono bg-white/5 text-lunar-muted"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
