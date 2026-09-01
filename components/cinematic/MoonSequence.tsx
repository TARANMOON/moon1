'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { MoonCanvas } from './MoonCanvas';
import { AssetLoader } from './AssetLoader';
import { CanvasRenderer } from './CanvasRenderer';
import { SequenceController } from './SequenceController';
import { Header } from '@/components/navigation/Header';
import { TelemetryBar } from '@/components/navigation/TelemetryBar';
import { OrbitHero } from '@/components/sections/OrbitHero';
import { ApproachScene } from '@/components/sections/ApproachScene';
import { DescentScene } from '@/components/sections/DescentScene';
import { WorksScene } from '@/components/sections/WorksScene';
import { CapabilitiesScene } from '@/components/sections/CapabilitiesScene';
import { ContactScene } from '@/components/sections/ContactScene';
import Lenis from 'lenis';

export const MoonSequence: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const lenisRef = useRef<Lenis | null>(null);
  const assetLoaderRef = useRef<AssetLoader | null>(null);
  const rendererRef = useRef<CanvasRenderer | null>(null);
  const controllerRef = useRef<SequenceController>(new SequenceController(240));

  const [progress, setProgress] = useState<number>(0);
  const [currentFrame, setCurrentFrame] = useState<number>(1);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [currentChapter, setCurrentChapter] = useState<string>('ORBIT');

  // Chapter name computation
  const computeChapter = useCallback((prog: number) => {
    if (prog < 0.18) return 'ORBIT';
    if (prog < 0.38) return 'APPROACH';
    if (prog < 0.58) return 'DESCENT';
    if (prog < 0.78) return 'WORKS';
    if (prog < 0.90) return 'SYSTEM';
    return 'CONTACT';
  }, []);

  // Frame drawing routine
  const renderCurrentFrame = useCallback((targetProgress: number) => {
    if (!rendererRef.current || !assetLoaderRef.current) return;

    const frameIdx = controllerRef.current.progressToFrame(targetProgress);
    const img = assetLoaderRef.current.getFrame(frameIdx);

    rendererRef.current.draw(img, frameIdx);
    setCurrentFrame(frameIdx);
    setProgress(targetProgress);
    setCurrentChapter(computeChapter(targetProgress));
  }, [computeChapter]);

  // Navigate to chapter smoothly
  const handleNavigateChapter = (targetProgress: number) => {
    if (!containerRef.current || !lenisRef.current) return;
    const maxScroll = containerRef.current.scrollHeight - window.innerHeight;
    const targetScroll = targetProgress * maxScroll;
    lenisRef.current.scrollTo(targetScroll, { duration: 1.6 });
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // 1. Initialize Canvas Renderer
    const renderer = new CanvasRenderer(canvas, 1280, 720);
    rendererRef.current = renderer;
    renderer.resize();

    // 2. Initialize Asset Loader
    const loader = new AssetLoader(240);
    assetLoaderRef.current = loader;

    // Load initial critical tier
    loader.loadInitialTier().then(() => {
      setIsLoaded(true);
      const initialImg = loader.getFrame(1);
      renderer.draw(initialImg, 1);
      // Start background streaming of remaining frames
      loader.startBackgroundPreload(5);
    });

    // 3. Initialize Lenis Smooth Scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.5,
    });
    lenisRef.current = lenis;

    // 4. Scroll Tracking & RAF Loop
    let rafId: number;
    const onScroll = () => {
      if (!containerRef.current) return;
      const scrollY = window.scrollY || window.pageYOffset;
      const maxScroll = containerRef.current.scrollHeight - window.innerHeight;
      const currentProg = maxScroll > 0 ? Math.min(1, Math.max(0, scrollY / maxScroll)) : 0;
      renderCurrentFrame(currentProg);
    };

    const rafLoop = (time: number) => {
      lenis.raf(time);
      onScroll();
      rafId = requestAnimationFrame(rafLoop);
    };

    rafId = requestAnimationFrame(rafLoop);

    // 5. Window Resize Handler
    const handleResize = () => {
      if (rendererRef.current) {
        rendererRef.current.resize();
        if (assetLoaderRef.current) {
          const img = assetLoaderRef.current.getFrame(currentFrame);
          rendererRef.current.draw(img, currentFrame);
        }
      }
    };

    window.addEventListener('resize', handleResize, { passive: true });

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      window.removeEventListener('resize', handleResize);
    };
  }, [renderCurrentFrame, currentFrame]);

  return (
    <div ref={containerRef} className="relative w-full h-[650vh] bg-space-950">
      {/* Fixed Fullscreen 2D Canvas */}
      <MoonCanvas canvasRef={canvasRef} isLoaded={isLoaded} />

      {/* Global Persistent Header */}
      <Header
        currentChapter={currentChapter}
        onNavigateChapter={handleNavigateChapter}
      />

      {/* Scene Overlays Choreographed by Scroll Progress */}
      <OrbitHero progress={progress} />
      <ApproachScene progress={progress} />
      <DescentScene progress={progress} />
      <WorksScene progress={progress} />
      <CapabilitiesScene progress={progress} />
      <ContactScene progress={progress} />

      {/* Global Persistent Bottom Telemetry Bar */}
      <TelemetryBar progress={progress} currentFrame={currentFrame} />
    </div>
  );
};
