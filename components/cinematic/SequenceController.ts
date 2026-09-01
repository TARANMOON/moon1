/**
 * SequenceController.ts
 * Interpolates scroll progress (0.0 to 1.0) into deterministic frame indices (1 to 240).
 */

export class SequenceController {
  private totalFrames: number;

  constructor(totalFrames: number = 240) {
    this.totalFrames = totalFrames;
  }

  /**
   * Computes exact integer frame index based on normalized scroll progress (0.0 to 1.0).
   */
  public progressToFrame(progress: number): number {
    const clampedProgress = Math.max(0, Math.min(1, progress));
    const frame = Math.floor(clampedProgress * (this.totalFrames - 1)) + 1;
    return Math.max(1, Math.min(this.totalFrames, frame));
  }

  /**
   * Computes normalized scroll progress from frame index.
   */
  public frameToProgress(frameIndex: number): number {
    const clamped = Math.max(1, Math.min(this.totalFrames, frameIndex));
    return (clamped - 1) / (this.totalFrames - 1);
  }
}
