'use client';

import React from 'react';
import { SELECTED_PROJECTS } from '@/lib/data/portfolioData';
import { ProjectCard } from '@/components/ui/ProjectCard';

interface WorksSceneProps {
  progress: number;
}

export const WorksScene: React.FC<WorksSceneProps> = ({ progress }) => {
  // Visible between 0.56 and 0.78
  let opacity = 0;
  if (progress >= 0.56 && progress <= 0.78) {
    if (progress < 0.60) {
      opacity = (progress - 0.56) / 0.04;
    } else if (progress > 0.74) {
      opacity = 1 - (progress - 0.74) / 0.04;
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
        {/* Header telemetry */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-white/10 pb-4 gap-2">
          <div>
            <span className="text-[10px] font-mono text-lunar-cyan tracking-widest uppercase">
              PHASE 04 // SURFACE ARCHIVES
            </span>
            <h2 className="text-2xl sm:text-4xl font-display font-bold text-white uppercase tracking-tight">
              Selected Works & Systems
            </h2>
          </div>
          <span className="text-[11px] font-mono text-lunar-muted">
            4 ARTIFACTS / PRODUCTION GRADE
          </span>
        </div>

        {/* 2x2 Grid of Project Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 max-h-[60vh] overflow-y-auto pr-1">
          {SELECTED_PROJECTS.map((proj) => (
            <ProjectCard key={proj.id} project={proj} />
          ))}
        </div>
      </div>
    </section>
  );
};
