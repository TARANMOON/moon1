'use client';

import React from 'react';
import { Project } from '@/lib/data/portfolioData';
import { ArrowUpRight, Github, Terminal } from 'lucide-react';

interface ProjectCardProps {
  project: Project;
  onOpenPreview?: (project: Project) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  return (
    <div className="lunar-card rounded-xl p-6 md:p-8 flex flex-col justify-between group relative overflow-hidden">
      {/* Corner telemetry label */}
      <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-5 text-[11px] font-mono text-lunar-slate tracking-wider">
        <span className="text-lunar-cyan">PRJ // {project.number}</span>
        <span>{project.year}</span>
      </div>

      {/* Main Title & Category */}
      <div className="space-y-3">
        <span className="text-[10px] font-mono uppercase tracking-widest text-lunar-muted">
          {project.category}
        </span>
        <h3 className="text-xl md:text-2xl font-display font-semibold text-white tracking-tight group-hover:text-lunar-cyan transition-colors">
          {project.title}
        </h3>
        <p className="text-xs md:text-sm text-lunar-slate leading-relaxed font-sans">
          {project.description}
        </p>
      </div>

      {/* Tech Tags */}
      <div className="flex flex-wrap gap-1.5 my-6">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="px-2 py-0.5 rounded text-[10px] font-mono bg-white/5 border border-white/10 text-lunar-slate"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Metrics & Action Link */}
      <div className="pt-4 border-t border-white/10 flex items-center justify-between">
        <div className="flex items-center gap-1.5 text-[11px] font-mono text-white/80">
          <Terminal className="w-3.5 h-3.5 text-lunar-cyan" />
          <span>{project.metrics}</span>
        </div>

        <div className="flex items-center gap-3">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-lunar-slate hover:text-white transition-colors"
              aria-label={`View ${project.title} source code`}
            >
              <Github className="w-4 h-4" />
            </a>
          )}
          {project.link && (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-[11px] font-mono text-white hover:text-lunar-cyan transition-colors"
            >
              <span>EXPLORE</span>
              <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
};
