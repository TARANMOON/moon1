# Quality Assurance & Visual Verification Checklist — Taran Moon

## 1. Visual Verification
- [ ] **Hero Composition**: "TARAN MOON" display typography centered/aligned perfectly with initial moon scale.
- [ ] **Scroll Continuity**: Frame transitions scrub without flashing blank frames, stuttering, or tearing.
- [ ] **Section Cross-Fades**: Scenes 01 through 06 transition smoothly at designated scroll intervals.
- [ ] **Typography Alignment**: Monospaced telemetry headers align with orbital grid lines.
- [ ] **Responsive Breakpoints**:
  - [ ] Desktop (1920×1080 & 1440×900)
  - [ ] Laptop (1280×800)
  - [ ] Tablet (768×1024)
  - [ ] Mobile (375×812 & 412×915)

## 2. Interaction & Functionality
- [ ] **Smooth Scrolling**: Lenis inertial scrolling feels weighted, continuous, and responsive to trackpad/wheel/touch.
- [ ] **Chapter Navigation**: Clicking header navigation jumps smoothly to corresponding scene scroll percentages.
- [ ] **Copy Email Action**: Clicking email copies to clipboard and triggers confirmation state.
- [ ] **Project Modals / Links**: Works cards have accessible links and hover states.

## 3. Technical & Console
- [ ] Zero unhandled errors in browser console.
- [ ] Zero React hydration errors or SSR/CSR mismatches.
- [ ] Zero 404 image frame requests.
- [ ] Clean production build (`npm run build`).

## 4. Accessibility & Resilience
- [ ] Semantic HTML5 tags (`<main>`, `<header>`, `<section>`, `<footer>`, `<nav>`).
- [ ] `prefers-reduced-motion` delivers static high-legibility experience.
- [ ] Sufficient contrast ratios across all text elements against space black backgrounds.
