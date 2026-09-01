# Motion Specification — Taran Moon

## 1. Philosophy
- **Scroll as Master Timeline**: Scrolling is the direct, deterministic driver of cinematic time. The moon is not an autoplaying loop; user scroll scrubs the exact trajectory frame-by-frame.
- **Continuous & Deliberate**: Animations must never jump, stutter, or feel like disconnected hover effects. Every element has a clear start, progress, and exit state tied to scroll markers.
- **Zero Distraction**: Motion serves narrative and typography clarity. No arbitrary bouncy springs, floating badges, or parallax that obscures reading.

---

## 2. Mathematical Mapping

$$\text{frameIndex} = \text{clamp}\left(\lfloor \text{progress} \times (\text{totalFrames} - 1) \rfloor + 1, 1, 240\right)$$

| Scroll Progress | Frame Index | Visual Transition | UI Choreography |
|---|---|---|---|
| `0.00` | Frame 001 | Distant Moon in Deep Orbit | Hero Title In, Telemetry Online |
| `0.15` | Frame 036 | Approach Start | Hero fades out, Approach Statement emerges |
| `0.35` | Frame 084 | Full Lunar Silhouette | Approach Statement fades, Mission Architecture emerges |
| `0.55` | Frame 132 | Surface Descent | Mission Pillars fade, Works Grid sweeps in |
| `0.75` | Frame 180 | Low Orbit Terrain | Works Grid settles, Capabilities Grid enters |
| `0.88` | Frame 216 | Horizon Stabilization | Capabilities fade, Transmission Console docks |
| `1.00` | Frame 240 | Final Landing & Signal Active | Terminal Transmission complete |

---

## 3. Libraries & Integrations
- **Lenis Smooth Scroll**:
  - Damping: `0.1`
  - Lerp: `0.08`
  - Touch multiplier: `1.5`
- **GSAP & ScrollTrigger**:
  - Main timeline pinned over virtual scroll container (e.g. `600vh` scroll height for optimal scrubbing resistance).
  - Canvas render triggered via `gsap.ticker` synced with Lenis RAF loop.
- **Reduced Motion Support**:
  - When `prefers-reduced-motion: reduce` is active:
    - Lenis smooth scrolling disables smoothly.
    - Moon canvas displays keyframe posters or smooth low-frequency crossfades.
    - UI elements render with static high-contrast layouts.
