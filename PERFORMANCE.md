# Performance & Optimization Specification — Taran Moon

## 1. Targets & Benchmarks
- **Lighthouse Desktop**: 95+ Performance, 100 Accessibility, 100 Best Practices, 100 SEO.
- **Lighthouse Mobile**: 85+ Performance.
- **Core Web Vitals**:
  - **LCP (Largest Contentful Paint)**: < 1.2s (Achieved by instant poster frame paint).
  - **CLS (Cumulative Layout Shift)**: 0.00 (Fixed canvas viewport, pinned scroll layout).
  - **INP (Interaction to Next Paint)**: < 50ms (Off-main-thread image decoding, decoupled scroll ticks).
  - **Frame Rate**: Steady 60fps / 120fps during active scroll scrubbing.

---

## 2. Optimization Strategies

### A. Asset Loading Strategy
- **Critical Tier (0s)**: Poster frame (`poster.jpg`) + Frame 1 loaded instantly.
- **Priority Tier (0.5s)**: First 20 frames loaded in parallel (`Promise.allSettled`).
- **Progressive Stream Tier (1s+)**: Remaining 220 frames streamed with dynamic concurrency limit (5 parallel requests) to avoid network congestion.

### B. Canvas Rendering Strategy
- **Device Pixel Ratio (DPR) Cap**:
  ```typescript
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  ```
  Prevents memory blowup and 4K GPU rendering penalties on retina screens.
- **Direct 2D Context**:
  Canvas 2D with `imageSmoothingQuality: 'high'` avoids the high overhead of Three.js or complex WebGL context setup.

### C. Bundle Size & Script Loading
- Only essential motion libraries loaded: `gsap`, `@gsap/react`, `lenis`.
- Modular icons imported directly from `lucide-react`.
- Static site export capable.
