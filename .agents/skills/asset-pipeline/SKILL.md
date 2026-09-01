---
name: asset-pipeline
description: Manage, optimize, organize, and preload lunar frames and media assets for high-speed delivery.
---

# Asset Pipeline Skill

## Key Implementation Patterns
- Extract and validate 240 sequential frames into `/public/moon/frames/`.
- Provide zero-LCP poster frame.
- Implement tiered progressive preloading (`AssetLoader.ts`) with concurrency throttling.
