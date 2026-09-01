---
name: performance
description: Enforce 60fps frame rate, memory efficiency, devicePixelRatio caps, and Core Web Vitals optimization.
---

# Performance Skill

## Guidelines
- Cap Canvas DPR at `Math.min(window.devicePixelRatio, 2)`.
- Avoid DOM image pollution (use single `<canvas>` element).
- Decode images off main thread via `Image.decode()` where supported.
- Keep layout shifts at 0.00.
