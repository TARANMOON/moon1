# Visual System & Design Tokens — Taran Moon

## 1. Aesthetic Direction
- **Identity**: Lunar, cinematic, editorial, technical, minimal, monochrome.
- **Atmosphere**: Deep space silence, tactile high-contrast typography, precision orbital telemetry, subtle cosmic grain.
- **Strict Anti-Patterns**:
  - NO colorful SaaS rainbow gradients.
  - NO neon cyberpunk blues/purples/pinks.
  - NO bubbly rounded cards or playful illustrations.
  - NO fake 3D spinning donuts or generic AI floating blobs.

---

## 2. Color Palette & Design Tokens

```css
:root {
  /* Core Backgrounds */
  --color-space-black: #050507;
  --color-deep-surface: #0a0b0f;
  --color-lunar-slate: #12131a;
  --color-lunar-card: rgba(18, 19, 26, 0.75);
  
  /* Borders & Rules */
  --color-border-subtle: rgba(255, 255, 255, 0.08);
  --color-border-hover: rgba(255, 255, 255, 0.22);
  --color-border-active: rgba(138, 180, 248, 0.5);

  /* Typography */
  --color-text-pure: #ffffff;
  --color-text-secondary: #9aa0a6;
  --color-text-tertiary: #5f6368;
  --color-text-mono: #80868b;

  /* Accents */
  --color-lunar-cyan: #8ab4f8;
  --color-telemetry-green: #81c995;
  --color-telemetry-amber: #fdd663;
}
```

---

## 3. Typography Hierarchy
- **Display / Editorial Headers**:
  - Font: `Syne` / `Geist Display` / `Inter Display`
  - Style: Uppercase, tracking-widest, tight line-height, crisp anti-aliasing.
- **Body & Editorial Copy**:
  - Font: `Inter` / `Geist`
  - Weights: `300` (Light), `400` (Regular), `500` (Medium).
- **Technical & Telemetry Monospace**:
  - Font: `JetBrains Mono` / `Geist Mono` / `SF Mono`
  - Sizes: `10px` – `12px`, uppercase, tracking-wider (`tracking-[0.2em]`).

---

## 4. Geometric & Textural Details
- **Orbital Rules**: Fine 1px subtle borders (`border-white/10`) dividing telemetry panels and editorial sections.
- **Film Grain**: Ultra-subtle SVG noise layer overlaid across the entire viewport to give pre-rendered frames tactile warmth and eliminate digital banding.
- **Glassmorphism**: Crisp backdrop-blur (`backdrop-blur-md`) with subtle top-highlight border (`border-t-white/15`).
