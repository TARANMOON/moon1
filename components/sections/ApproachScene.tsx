'use client';

import React from 'react';

interface ApproachSceneProps {
  progress: number;
}

export const ApproachScene: React.FC<ApproachSceneProps> = ({ progress }) => {
  // Visible between 0.16 and 0.38
  let opacity = 0;
  if (progress >= 0.16 && progress <= 0.38) {
    if (progress < 0.22) {
      opacity = (progress - 0.16) / 0.06;
    } else if (progress > 0.32) {
      opacity = 1 - (progress - 0.32) / 0.06;
    } else {
      opacity = 1;
    }
  }

  if (opacity <= 0) return null;

  return (
    <section
      className="fixed inset-0 flex items-center justify-start p-8 md:p-20 z-20 pointer-events-none transition-opacity duration-300"
      style={{ opacity }}
    >
      <div className="max-w-2xl space-y-6">
        <div className="flex items-center gap-3">
          <span className="text-[11px] font-mono text-lunar-cyan tracking-widest uppercase">
            PHASE 02 // LUNAR APPROACH
          </span>
          <div className="h-[1px] w-16 bg-lunar-cyan/40" />
        </div>

        <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-white tracking-tight leading-tight">
          Bridging cinematic aesthetics with rigorous systems architecture.
        </h2>

        <p className="text-sm md:text-base text-lunar-slate font-sans leading-relaxed">
          I build high-density interactive web experiences, autonomous multi-agent pipelines, and canvas graphics engines that demand sub-millisecond precision, uncompromising typography, and silky smooth responsiveness.
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4 border-t border-white/10 text-[11px] font-mono">
          <div>
            <div className="text-white font-medium">60 FPS</div>
            <div className="text-lunar-muted text-[10px]">DETERMINISTIC SCRUB</div>
          </div>
          <div>
            <div className="text-white font-medium">ZERO CLS</div>
            <div className="text-lunar-muted text-[10px]">LAYOUT STABILITY</div>
          </div>
          <div>
            <div className="text-white font-medium">&lt; 1.2S LCP</div>
            <div className="text-lunar-muted text-[10px]">INSTANT PERCEPTION</div>
          </div>
        </div>
      </div>
    </section>
  );
};
