/**
 * AssetLoader.ts
 * Progressive, tiered image preloader for 240 lunar frames.
 */

export interface FrameManifest {
  totalFrames: number;
  framePattern: string;
  poster: string;
  width: number;
  height: number;
}

export class AssetLoader {
  private totalFrames: number = 240;
  private imageCache: Map<number, HTMLImageElement> = new Map();
  private loadPromises: Map<number, Promise<HTMLImageElement>> = new Map();
  private loadedCount: number = 0;
  private onProgressCallback?: (loaded: number, total: number, percentage: number) => void;
  private isBackgroundLoadingStarted = false;
  private lastServedFrame: HTMLImageElement | null = null;

  constructor(totalFrames: number = 240) {
    this.totalFrames = totalFrames;
  }

  public getFramePath(index: number): string {
    const clamped = Math.max(1, Math.min(this.totalFrames, Math.floor(index)));
    const padded = String(clamped).padStart(3, '0');
    return `/moon/frames/ezgif-frame-${padded}.jpg`;
  }

  public setProgressCallback(cb: (loaded: number, total: number, percentage: number) => void) {
    this.onProgressCallback = cb;
  }

  public getLoadedCount(): number {
    return this.loadedCount;
  }

  public getTotalFrames(): number {
    return this.totalFrames;
  }

  public hasFrame(index: number): boolean {
    const img = this.imageCache.get(index);
    return !!img && img.complete && img.naturalWidth > 0;
  }

  public getFrame(index: number): HTMLImageElement | null {
    const img = this.imageCache.get(index);
    if (img && img.complete && img.naturalWidth > 0) {
      this.lastServedFrame = img;
      return img;
    }
    // If not loaded, HOLD the last successfully served frame instead of
    // snapping to a nearby frame. Snapping to a random nearby frame is what
    // produces the perceived "flicker" between non-adjacent frames.
    return this.lastServedFrame ?? this.getFirstLoadedFrame();
  }

  private getFirstLoadedFrame(): HTMLImageElement | null {
    if (this.imageCache.size === 0) return null;
    for (const [, img] of this.imageCache.entries()) {
      if (img.complete && img.naturalWidth > 0) {
        this.lastServedFrame = img;
        return img;
      }
    }
    return null;
  }

  private getClosestLoadedFrame(target: number): HTMLImageElement | null {
    if (this.imageCache.size === 0) return null;
    let closestIndex = 1;
    let minDiff = Infinity;

    for (const [idx, img] of this.imageCache.entries()) {
      if (img.complete && img.naturalWidth > 0) {
        const diff = Math.abs(idx - target);
        if (diff < minDiff) {
          minDiff = diff;
          closestIndex = idx;
        }
      }
    }

    return this.imageCache.get(closestIndex) || null;
  }

  /**
   * Loads a single frame with caching and Promise deduplication.
   */
  public loadFrame(index: number): Promise<HTMLImageElement> {
    const clamped = Math.max(1, Math.min(this.totalFrames, Math.floor(index)));

    if (this.imageCache.has(clamped)) {
      return Promise.resolve(this.imageCache.get(clamped)!);
    }

    if (this.loadPromises.has(clamped)) {
      return this.loadPromises.get(clamped)!;
    }

    const supportsDecode = typeof Image.prototype.decode === 'function';

    const promise = new Promise<HTMLImageElement>((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.src = this.getFramePath(clamped);

      const finalize = () => {
        this.imageCache.set(clamped, img);
        this.loadedCount++;
        if (this.onProgressCallback) {
          this.onProgressCallback(
            this.loadedCount,
            this.totalFrames,
            (this.loadedCount / this.totalFrames) * 100
          );
        }
        resolve(img);
      };

      img.onload = () => {
        if (supportsDecode) {
          img
            .decode()
            .then(finalize)
            .catch(() => {
              this.imageCache.set(clamped, img);
              this.loadedCount++;
              resolve(img);
            });
        } else {
          finalize();
        }
      };

      img.onerror = () => {
        reject(new Error(`Failed to load frame ${clamped}`));
      };
    });

    this.loadPromises.set(clamped, promise);
    return promise;
  }

  /**
   * Tier 1: Loads critical initial frames (1-10) for instant interactivity.
   */
  public async loadInitialTier(): Promise<void> {
    const criticalIndices = [1, 2, 3, 4, 5, 10, 20, 40, 80, 120, 160, 200, 240];
    await Promise.allSettled(criticalIndices.map(idx => this.loadFrame(idx)));
  }

  /**
   * Tier 2 & 3: Progressively streams all remaining frames with controlled concurrency.
   */
  public startBackgroundPreload(concurrency: number = 4) {
    if (this.isBackgroundLoadingStarted) return;
    this.isBackgroundLoadingStarted = true;

    const queue: number[] = [];
    for (let i = 1; i <= this.totalFrames; i++) {
      if (!this.imageCache.has(i)) {
        queue.push(i);
      }
    }

    let activeWorkers = 0;

    const next = () => {
      while (activeWorkers < concurrency && queue.length > 0) {
        const frameIndex = queue.shift();
        if (frameIndex) {
          activeWorkers++;
          this.loadFrame(frameIndex)
            .catch(() => {})
            .finally(() => {
              activeWorkers--;
              next();
            });
        }
      }
    };

    next();
  }
}
