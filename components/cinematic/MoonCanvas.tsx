'use client';

import React, { useEffect, useRef } from 'react';

interface MoonCanvasProps {
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
  posterUrl?: string;
  isLoaded?: boolean;
}

export const MoonCanvas: React.FC<MoonCanvasProps> = ({
  canvasRef,
  posterUrl = '/moon/poster.jpg',
  isLoaded = false,
}) => {
  const posterRef = useRef<HTMLImageElement | null>(null);

  return (
    <div className="fixed inset-0 w-full h-full pointer-events-none z-0 overflow-hidden bg-space-950">
      {/* Fallback & instant poster frame */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        ref={posterRef}
        src={posterUrl}
        alt="Lunar Sequence Backdrop"
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-out ${
          isLoaded ? 'opacity-0' : 'opacity-100'
        }`}
      />

      {/* Primary Hardware-Accelerated 2D Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full block"
      />

      {/* Subtle Lunar Vignette gradient for editorial atmosphere */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(5,5,7,0.7)_80%,rgba(5,5,7,0.95)_100%)] pointer-events-none" />
    </div>
  );
};
