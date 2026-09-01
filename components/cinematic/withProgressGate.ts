'use client';

import React from 'react';

/**
 * Quantizes progress to a coarse step (~0.5%) so that re-renders only fire
 * when there is a perceptible change. CSS transitions on opacity/transform
 * smooth the remaining sub-frame deltas.
 *
 * Also memoizes the component so referential equality of the function body
 * holds when props are unchanged.
 */
export function withProgressGate<P extends { progress: number }>(
  Component: React.ComponentType<P>,
  step: number = 0.005,
): React.MemoExoticComponent<React.ComponentType<P>> {
  const Memo = React.memo(Component, (prev, next) => {
    const a = Math.floor(prev.progress / step);
    const b = Math.floor(next.progress / step);
    if (a !== b) return false; // re-render
    // Otherwise shallow-equal on remaining props (none in our scenes).
    return true;
  });
  Memo.displayName = `Gated(${Component.displayName || Component.name || 'Scene'})`;
  return Memo;
}

/**
 * Two-prop gate: (progress, currentFrame). Useful for the TelemetryBar.
 */
export function withProgressAndFrameGate<P extends { progress: number; currentFrame: number }>(
  Component: React.ComponentType<P>,
  step: number = 0.005,
): React.MemoExoticComponent<React.ComponentType<P>> {
  const Memo = React.memo(Component, (prev, next) => {
    const a = Math.floor(prev.progress / step);
    const b = Math.floor(next.progress / step);
    if (a !== b) return false;
    if (prev.currentFrame !== next.currentFrame) return false;
    return true;
  });
  Memo.displayName = `GatedPF(${Component.displayName || Component.name || 'Bar'})`;
  return Memo;
}