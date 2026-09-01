'use client';

import React from 'react';

interface DescentSceneProps {
  progress: number;
}

export const DescentScene: React.FC<DescentSceneProps> = ({ progress }) => {
  // Visible between 0.36 and 0.58
  let opacity = 0;
  if (progress >= 0.36 && progress <= 0.58) {
    if (progress < 0.42) {
      opacity = (progress - 0.36) / 0.06;
    } else if (progress > 0.52) {
      opacity = 1 - (progress - 0.52) / 0.06;
    } else {
      opacity = 1;
    }
  }

  if (opacity <= 0) return null;

  return (
    <section
      className="fixed inset-0 flex items-center justify-end p-8 md:p-20 z-20 pointer-events-none transition-opacity duration-300"
      style={{ opacity }}
    >
      <div className="max-w-xl space-y-6 text-right">
        <div className="flex items-center justify-end gap-3">
          <div className="h-[1px] w-16 bg-lunar-cyan/40" />
          <span className="text-[11px] font-mono text-lunar-cyan tracking-widest uppercase">
            PHASE 03 // SURFACE DESCENT
          </span>
        </div>

        <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-white tracking-tight leading-tight">
          Engineered for extreme performance and spatial depth.
        </h2>

        <div className="space-y-4 text-left">
          <div className="lunar-card p-4 rounded-lg">
            <div className="text-[11px] font-mono text-lunar-cyan mb-1">01 // PRE-RENDERED CANVAS PIPELINE</div>
            <div className="text-xs text-lunar-slate">
              Scrubbing 240 high-resolution camera frames with progressive preloading tiers instead of fragile WebGL models.
            </div>
          </div>

          <div className="lunar-card p-4 rounded-lg">
            <div className="text-[11px] font-mono text-lunar-cyan mb-1">02 // DETERMINISTIC SCROLL SYNCHRONIZATION</div>
            <div className="text-xs text-lunar-slate">
              Lenis smooth inertia piped directly into GSAP ScrollTrigger ticker for continuous 60fps pacing.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
