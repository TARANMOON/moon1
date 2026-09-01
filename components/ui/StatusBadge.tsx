'use client';

import React from 'react';

interface StatusBadgeProps {
  label?: string;
  status?: 'nominal' | 'warning' | 'active';
  className?: string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({
  label = 'SYS: NOMINAL',
  status = 'nominal',
  className = '',
}) => {
  const dotColor =
    status === 'nominal'
      ? 'bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]'
      : status === 'active'
      ? 'bg-lunar-cyan shadow-[0_0_8px_rgba(138,180,248,0.8)]'
      : 'bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.8)]';

  return (
    <div
      className={`inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-space-800/80 border border-white/10 text-[10px] font-mono tracking-widest text-lunar-slate backdrop-blur-md ${className}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${dotColor} animate-pulse`} />
      <span className="uppercase">{label}</span>
    </div>
  );
};
