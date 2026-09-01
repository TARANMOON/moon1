# Technical Architecture — Taran Moon

## 1. Stack Overview
- **Framework**: Next.js 15+ (App Router) with React 19 and TypeScript.
- **Styling**: Tailwind CSS with custom design tokens.
- **Motion & Scrolling**: GSAP 3.12+ with ScrollTrigger + `@studio-freight/lenis` (or `lenis`).
- **Rendering Engine**: HTML5 Canvas 2D image sequence renderer.
- **Icons**: `lucide-react`.

---

## 2. Component Boundaries & Directory Structure

```
app/
├── layout.tsx             # Root layout with font imports, metadata, SEO, GrainOverlay
├── page.tsx               # Primary page container assembling MoonSequence & overlay scenes
└── globals.css            # Base design tokens, typography, utilities, grain overlay

components/
├── cinematic/
│   ├── MoonSequence.tsx   # React client container, attaches Lenis & ScrollTrigger pin
│   ├── MoonCanvas.tsx     # Canvas component with resize handler & DPR normalization
│   ├── CanvasRenderer.ts  # Core 2D canvas drawing logic (cover math, clear, draw)
│   ├── AssetLoader.ts     # Progressive image loader & frame buffer cache
│   └── SequenceController.ts # Linear interpolator mapping scroll progress to frame index
├── navigation/
│   ├── Header.tsx         # Fixed navigation with chapter indicators & telemetry status
│   └── TelemetryBar.tsx   # Fixed bottom telemetry bar with real-time coordinates
├── sections/
│   ├── OrbitHero.tsx      # Scene 01 UI
│   ├── ApproachScene.tsx  # Scene 02 UI
│   ├── DescentScene.tsx   # Scene 03 UI
│   ├── WorksScene.tsx     # Scene 04 UI (Project cards & modal previews)
│   ├── CapabilitiesScene.tsx # Scene 05 UI (Technical pillars matrix)
│   └── ContactScene.tsx   # Scene 06 UI (Terminal transmission & email copy)
└── ui/
    ├── ProjectCard.tsx    # Editorial glassmorphic project card
    ├── GrainOverlay.tsx   # Subtle SVG noise filter
    └── TelemetryBadge.tsx # Glowing pulse status badge
```

---

## 3. Rendering Pipeline & Memory Management
1. **Initial Page Load**:
   - `poster.jpg` is embedded in the initial HTML or painted immediately into `<canvas>`.
   - `AssetLoader` immediately begins downloading priority frames (frames 1–15).
2. **Progressive Background Buffering**:
   - As frames arrive, they are decoded via `new Image()` and retained in an `HTMLImageElement[]` cache array.
   - Decoded images are cached in memory (240 JPEG images total ~4MB, highly efficient in modern V8/Blink memory).
3. **Scroll Scrubbing Loop**:
   - Lenis emits smooth scroll position.
   - GSAP ScrollTrigger computes normalized progress `0.000` to `1.000`.
   - `SequenceController` calculates `targetFrame = Math.floor(progress * 239) + 1`.
   - `CanvasRenderer.drawFrame(targetFrame)` uses `ctx.drawImage` with aspect ratio cover scaling.
