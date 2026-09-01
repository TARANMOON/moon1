---
name: scroll-experience
description: Implement scroll-controlled storytelling using GSAP ScrollTrigger, Lenis smooth scrolling, and Canvas 2D frame sequences.
---

# Scroll Experience Skill

## Key Implementation Patterns
- Map scroll progress (`0.00` to `1.00`) directly to frame index (`1` to `240`).
- Sync Lenis RAF ticks with GSAP ScrollTrigger ticker.
- Implement responsive canvas cover math and aspect-ratio preservation.
