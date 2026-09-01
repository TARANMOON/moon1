# Architectural Decision Records (ADRs) — Taran Moon

## ADR 01: Canvas Image-Sequence over WebGL / Three.js
- **Status**: Accepted
- **Context**: The lunar landing sequence is pre-rendered into 240 high-definition frames.
- **Decision**: Render frames to an HTML5 `<canvas>` element using Canvas 2D context rather than a complex Three.js 3D sphere or WebGL shader mesh.
- **Consequences**:
  - Eliminates 600KB+ of 3D library bundles.
  - Guarantees 100% art-directed lighting, textures, and camera path.
  - Rock-solid 60fps performance across low-tier mobile devices.

## ADR 02: Next.js App Router with Client-Component Motion Boundaries
- **Status**: Accepted
- **Context**: Modern React architecture requires separating static SEO metadata from high-frequency interactive canvas rendering.
- **Decision**: Keep root layout and metadata on the server, while isolating the `MoonSequence` and interactive scenes within client components marked with `'use client'`.
- **Consequences**: Fast initial server render, crisp SEO tags, and optimal dynamic performance.

## ADR 03: Lenis + GSAP ScrollTrigger Motion Sync
- **Status**: Accepted
- **Context**: Browsers have varied wheel and touch inertia curves which can cause jittery scrubbing.
- **Decision**: Standardize on Lenis smooth scrolling and pipe Lenis's `raf` tick directly into `gsap.ticker`.
- **Consequences**: Silky smooth scrubbing across macOS trackpads, Windows mice, iOS Safari, and Android Chrome.
