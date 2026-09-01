# Experience Timeline Specification — Taran Moon

The entire website is choreographed as a continuous cinematic timeline where user scroll controls the camera trajectory from lunar orbit down to the surface, unlocking narrative chapters and portfolio milestones.

---

## Timeline Master Track (0% – 100%)

```
0% ──────────── 15% ──────────── 35% ──────────── 55% ──────────── 75% ──────────── 88% ──────────── 100%
[Scene 01: Orbit]   [Scene 02: Approach]  [Scene 03: Descent]   [Scene 04: Works]     [Scene 05: System]    [Scene 06: Contact]
Frames 1 – 36       Frames 37 – 84        Frames 85 – 132       Frames 133 – 180      Frames 181 – 216      Frames 217 – 240
```

---

### Scene 01 — Orbit
- **Scroll Range**: `0.00` – `0.15` (Frames 1 – 36)
- **Visual State**: Tiny Moon floating in deep space (#050507), subtle orbital lines, faint stars/grain.
- **Copy & Typography**:
  - `TARAN MOON` (Display Header, uppercase, tracking-tight).
  - Telemetry: `LAT 23.4° N` / `LON 019.2° E` / `SYS: NOMINAL` / `ORBIT: 110 KM`.
- **Interaction**: Initial scroll hint indicator (`[ SCROLL TO COMMENCE DESCENT ]`).
- **Transition**: As scroll crosses 15%, typography dissolves outward, moon begins rapid scale expansion.

---

### Scene 02 — Approach
- **Scroll Range**: `0.15` – `0.35` (Frames 37 – 84)
- **Visual State**: Moon scales aggressively toward the viewer, revealing dark maria and bright crater ridges.
- **Copy & Typography**:
  - `CREATIVE TECHNOLOGIST & SYSTEMS ARCHITECT`
  - Subtitle: *Engineering cinematic web experiences, high-performance canvas systems, and next-generation human-machine interfaces.*
- **Interaction**: Telemetry updates altitude in real time (`ALT: 42,000 M` -> `ALT: 18,500 M`).
- **Transition**: Smooth cross-fade to descent phase.

---

### Scene 03 — Descent
- **Scroll Range**: `0.35` – `0.55` (Frames 85 – 132)
- **Visual State**: Camera enters low lunar orbit, crater ridges sweep dynamically across the viewport.
- **Copy & Typography**:
  - `MISSION ARCHITECTURE`
  - Pillars:
    1. *01 / Spatial Engineering* — High-fidelity Canvas & WebGL storytelling.
    2. *02 / Performance Precision* — 60fps synchronous scrubbing & zero layout shifts.
    3. *03 / Systems Thinking* — Full-stack architectures engineered for scale and resilience.
- **Transition**: Camera descends toward surface landing zone as project cards emerge.

---

### Scene 04 — Surface / Selected Works
- **Scroll Range**: `0.55` – `0.75` (Frames 133 – 180)
- **Visual State**: Lunar surface textures fill lower viewport; glassmorphic editorial project showcase cards slide into view.
- **Featured Works**:
  1. **Aetheria Engine**: Ultra-low latency canvas visualization system for real-time spatial telemetry.
  2. **Chronos Interface**: Multi-agent orchestration dashboard with interactive visual workflows.
  3. **Nova OS**: Editorial design system & component framework for high-density spatial web apps.
  4. **Singularity**: Generative audio-reactive canvas experience with WebAudio synthesis.
- **Interaction**: Project cards feature live links, technology badges, modal previews, and architecture deep-dives.

---

### Scene 05 — Capabilities & System Architecture
- **Scroll Range**: `0.75` – `0.88` (Frames 181 – 216)
- **Visual State**: Surface slows to stationary horizon; structured 4-column capability matrix.
- **Content**:
  - `01 / Frontend Core`: Next.js App Router, TypeScript, React 19, Tailwind CSS.
  - `02 / Motion & Canvas`: GSAP ScrollTrigger, HTML5 2D Canvas, WebGL, Lenis smooth scrolling.
  - `03 / AI & Agent Systems`: Parallel agent orchestration, prompt architecture, tool-augmented systems.
  - `04 / Infrastructure & Cloud`: Vercel, Edge Workers, Cloudflare, CI/CD automated QA.

---

### Scene 06 — Contact / Transmission
- **Scroll Range**: `0.88` – `1.00` (Frames 217 – 240)
- **Visual State**: Horizon settles into deep monochrome background; terminal transmission console activates.
- **Content**:
  - `COMMENCE TRANSMISSION`
  - Direct one-click copy email button with feedback tooltip (`taran@moon.dev` / `contact@taranmoon.io`).
  - Terminal transmission status log (`SIGNAL ACQUIRED`, `ENCRYPTION: AES-256-GCM`, `STATUS: ONLINE`).
  - Links: GitHub, X / Twitter, LinkedIn, Read CV.
  - Footer telemetry with live UTC clock and coordinate tracker.
