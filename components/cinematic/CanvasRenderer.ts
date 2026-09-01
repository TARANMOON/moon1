/**
 * CanvasRenderer.ts
 * High-performance 2D Canvas rendering engine with DPR capping and aspect-ratio preservation.
 */

export class CanvasRenderer {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private sourceWidth: number = 1280;
  private sourceHeight: number = 720;
  private lastDrawnFrame: number = -1;

  constructor(canvas: HTMLCanvasElement, sourceWidth: number = 1280, sourceHeight: number = 720) {
    this.canvas = canvas;
    const context = canvas.getContext('2d', { alpha: false, desynchronized: true });
    if (!context) {
      throw new Error('Failed to get 2D rendering context from canvas');
    }
    this.ctx = context;
    this.sourceWidth = sourceWidth;
    this.sourceHeight = sourceHeight;
    this.ctx.imageSmoothingEnabled = true;
    this.ctx.imageSmoothingQuality = 'high';
  }

  /**
   * Resizes canvas to match container dimensions while normalizing for devicePixelRatio.
   */
  public resize(): void {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const rect = this.canvas.getBoundingClientRect();
    const width = Math.floor(rect.width);
    const height = Math.floor(rect.height);

    if (this.canvas.width !== width * dpr || this.canvas.height !== height * dpr) {
      this.canvas.width = width * dpr;
      this.canvas.height = height * dpr;
    }
  }

  /**
   * Clears and draws the specified image frame using 'cover' aspect ratio geometry.
   */
  public draw(image: HTMLImageElement | null, frameIndex: number): void {
    if (!image) return;

    const canvasWidth = this.canvas.width;
    const canvasHeight = this.canvas.height;

    if (canvasWidth === 0 || canvasHeight === 0) return;

    // Calculate aspect ratio cover fitting
    const canvasAspect = canvasWidth / canvasHeight;
    const imageAspect = this.sourceWidth / this.sourceHeight;

    let drawWidth: number;
    let drawHeight: number;
    let offsetX: number;
    let offsetY: number;

    if (canvasAspect > imageAspect) {
      drawWidth = canvasWidth;
      drawHeight = canvasWidth / imageAspect;
      offsetX = 0;
      offsetY = (canvasHeight - drawHeight) / 2;
    } else {
      drawHeight = canvasHeight;
      drawWidth = canvasHeight * imageAspect;
      offsetX = (canvasWidth - drawWidth) / 2;
      offsetY = 0;
    }

    // Direct draw
    this.ctx.drawImage(image, offsetX, offsetY, drawWidth, drawHeight);
    this.lastDrawnFrame = frameIndex;
  }

  public getLastDrawnFrame(): number {
    return this.lastDrawnFrame;
  }
}
