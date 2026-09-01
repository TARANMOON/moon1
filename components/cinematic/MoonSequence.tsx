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
import { withProgressGate, withProgressAndFrameGate } from './withProgressGate';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const GatedOrbitHero = withProgressGate(OrbitHero, 0.005);
const GatedApproachScene = withProgressGate(ApproachScene, 0.005);
const GatedDescentScene = withProgressGate(DescentScene, 0.005);
const GatedWorksScene = withProgressGate(WorksScene, 0.005);
const GatedCapabilitiesScene = withProgressGate(CapabilitiesScene, 0.005);
const GatedContactScene = withProgressGate(ContactScene, 0.005);
const GatedTelemetryBar = withProgressAndFrameGate(TelemetryBar, 0.005);
const GatedHeader = React.memo(Header);

// State update intervals (ms). Canvas itself draws every RAF.
const STATE_UPDATE_INTERVAL_MS = 50; // ~20Hz
const PROGRESS_EPSILON = 0.0025;     // skip writes for sub-pixel progress deltas
const FRAME_EPSILON = 1;             // skip writes for sub-frame deltas

export const MoonSequence: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const lenisRef = useRef<Lenis | null>(null);
  const assetLoaderRef = useRef<AssetLoader | null>(null);
  const rendererRef = useRef<CanvasRenderer | null>(null);
  const controllerRef = useRef<SequenceController>(new SequenceController(240));

  // Refs for values consumed inside RAF without re-renders
  const lastStateUpdateRef = useRef<number>(0);
  const lastReportedProgressRef = useRef<number>(-1);
  const lastReportedFrameRef = useRef<number>(-1);
  const lastReportedChapterRef = useRef<string>('');
  const lastCanvasFrameRef = useRef<number>(-1);

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

  // Navigate to chapter smoothly (stable identity for memoized Header)
  const handleNavigateChapter = useCallback((targetProgress: number) => {
    if (!containerRef.current || !lenisRef.current) return;
    const maxScroll = containerRef.current.scrollHeight - window.innerHeight;
    const targetScroll = targetProgress * maxScroll;
    lenisRef.current.scrollTo(targetScroll, { duration: 1.6 });
  }, []);

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
      const initialImg = loader.getFrame(1);
      renderer.draw(initialImg, 1);
      lastCanvasFrameRef.current = 1;
      setIsLoaded(true);
      // Aggressive background streaming of remaining frames
      loader.startBackgroundPreload(12);
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
    // - Drive Lenis from GSAP's ticker so motion, scroll, and any future
    //   ScrollTrigger timelines share a single, deterministic clock.
    // - Draw canvas at native RAF (60Hz) for smoothness.
    // - setState throttled to ~20Hz and deduped.
    let rafId: number;
    const onLenisRaf = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(onLenisRaf);
    gsap.ticker.lagSmoothing(0);

    const computeScrollProgress = (): number => {
      if (!containerRef.current) return 0;
      const scrollY = window.scrollY || window.pageYOffset;
      const maxScroll = containerRef.current.scrollHeight - window.innerHeight;
      return maxScroll > 0 ? Math.min(1, Math.max(0, scrollY / maxScroll)) : 0;
    };

    const drawFrame = (frameIdx: number) => {
      const r = rendererRef.current;
      const l = assetLoaderRef.current;
      if (!r || !l) return;
      if (frameIdx === lastCanvasFrameRef.current) return;
      const img = l.getFrame(frameIdx);
      if (!img) return;
      r.draw(img, frameIdx);
      lastCanvasFrameRef.current = frameIdx;
    };

    const maybeUpdateState = (now: number, currentProg: number, frameIdx: number) => {
      if (now - lastStateUpdateRef.current < STATE_UPDATE_INTERVAL_MS) return;
      lastStateUpdateRef.current = now;

      const chapter = computeChapter(currentProg);
      const progressChanged =
        Math.abs(currentProg - lastReportedProgressRef.current) >= PROGRESS_EPSILON;
      const frameChanged =
        Math.abs(frameIdx - lastReportedFrameRef.current) >= FRAME_EPSILON;
      const chapterChanged = chapter !== lastReportedChapterRef.current;

      if (!progressChanged && !frameChanged && !chapterChanged) return;

      lastReportedProgressRef.current = currentProg;
      lastReportedFrameRef.current = frameIdx;
      lastReportedChapterRef.current = chapter;

      if (frameChanged) setCurrentFrame(frameIdx);
      if (progressChanged) setProgress(currentProg);
      if (chapterChanged) setCurrentChapter(chapter);
    };

    const tick = (time: number) => {
      const currentProg = computeScrollProgress();
      const frameIdx = controllerRef.current.progressToFrame(currentProg);

      // 1. Draw canvas at full RAF rate
      drawFrame(frameIdx);

      // 2. Push to React state at throttled rate
      maybeUpdateState(time, currentProg, frameIdx);

      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);

    // 5. Window Resize Handler
    const handleResize = () => {
      if (rendererRef.current) {
        rendererRef.current.resize();
        if (assetLoaderRef.current) {
          const img = assetLoaderRef.current.getFrame(lastCanvasFrameRef.current);
          rendererRef.current.draw(img, lastCanvasFrameRef.current);
        }
      }
    };

    window.addEventListener('resize', handleResize, { passive: true });

    return () => {
      cancelAnimationFrame(rafId);
      gsap.ticker.remove(onLenisRaf);
      lenis.destroy();
      window.removeEventListener('resize', handleResize);
    };
  }, [computeChapter]);

  return (
    <div ref={containerRef} className="relative w-full h-[650vh] bg-space-950">
      {/* Fixed Fullscreen 2D Canvas */}
      <MoonCanvas canvasRef={canvasRef} isLoaded={isLoaded} />

      {/* Global Persistent Header */}
      <GatedHeader
        currentChapter={currentChapter}
        onNavigateChapter={handleNavigateChapter}
      />

      {/* Scene Overlays Choreographed by Scroll Progress (memoized, coarse-grained) */}
      <GatedOrbitHero progress={progress} />
      <GatedApproachScene progress={progress} />
      <GatedDescentScene progress={progress} />
      <GatedWorksScene progress={progress} />
      <GatedCapabilitiesScene progress={progress} />
      <GatedContactScene progress={progress} />

      {/* Global Persistent Bottom Telemetry Bar */}
      <GatedTelemetryBar progress={progress} currentFrame={currentFrame} />

      {/* Cinematic Loading Gate */}
      {!isLoaded && (
        <div
          className="fixed inset-0 z-[60] flex flex-col items-center justify-center bg-space-950 text-white"
          role="status"
          aria-live="polite"
        >
          <div className="flex flex-col items-center gap-5">
            <div className="w-10 h-10 rounded-full border border-white/15 border-t-lunar-cyan animate-spin" />
            <div className="text-[11px] font-mono tracking-widest-xl text-lunar-slate uppercase">
              Initializing Lunar Sequence
            </div>
            <div className="text-[10px] font-mono text-lunar-muted">
              SYNCING ORBITAL TELEMETRY
            </div>
          </div>
        </div>
      )}

      {/* Mobile / repeat visitor escape hatch */}
      {isLoaded && (
        <button
          onClick={() => handleNavigateChapter(0.66)}
          className="fixed bottom-16 right-5 z-[55] hidden md:inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-space-900/70 backdrop-blur-md text-[10px] font-mono tracking-widest text-lunar-slate hover:text-white hover:border-white/25 transition-colors"
          aria-label="Skip cinematic intro to works"
        >
          <span>SKIP INTRO</span>
          <span className="text-lunar-cyan">→</span>
        </button>
      )}
    </div>
  );
};