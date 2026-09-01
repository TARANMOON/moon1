export interface Project {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  category: string;
  year: string;
  description: string;
  tags: string[];
  metrics: string;
  role: string;
  link?: string;
  github?: string;
}

export interface Capability {
  number: string;
  title: string;
  subtitle: string;
  description: string;
  skills: string[];
}

export const SELECTED_PROJECTS: Project[] = [
  {
    id: 'aetheria',
    number: '01',
    title: 'Aetheria Telemetry Engine',
    subtitle: 'High-Frequency Spatial Canvas Visualizer',
    category: 'Spatial Engineering',
    year: '2025',
    description:
      'Engineered an ultra-low latency Canvas 2D & WebGL streaming visualization system capable of rendering 100,000+ real-time telemetry particles at 60fps with sub-5ms input response.',
    tags: ['Canvas 2D', 'WebGL', 'TypeScript', 'Web Workers', 'Performance'],
    metrics: '60 FPS / 100K Particles',
    role: 'Lead Architect & Motion Engineer',
    link: 'https://github.com/taranmoon/aetheria',
    github: 'https://github.com/taranmoon/aetheria',
  },
  {
    id: 'chronos',
    number: '02',
    title: 'Chronos Multi-Agent System',
    subtitle: 'Parallel AI Workflow Orchestration',
    category: 'AI & Systems Architecture',
    year: '2025',
    description:
      'Architected an autonomous multi-agent development environment connecting reasoning models, persistent memory vectors, and automated browser verification pipelines.',
    tags: ['Next.js 15', 'Python SDK', 'Distributed Agents', 'Tailwind'],
    metrics: '4.8x Dev Velocity',
    role: 'Systems Architect',
    link: 'https://github.com/taranmoon/chronos',
    github: 'https://github.com/taranmoon/chronos',
  },
  {
    id: 'nova-os',
    number: '03',
    title: 'Nova Spatial Design System',
    subtitle: 'Monochrome Editorial Component Kit',
    category: 'Design Engineering',
    year: '2024',
    description:
      'Crafted a high-density, accessible design system for spatial and technical web applications with strict typography tokens, micro-animations, and zero layout shift.',
    tags: ['Design System', 'Accessibility', 'CSS Architecture', 'React 19'],
    metrics: '100% A11y Compliance',
    role: 'Design Engineer',
    link: 'https://github.com/taranmoon/nova-ui',
    github: 'https://github.com/taranmoon/nova-ui',
  },
  {
    id: 'singularity',
    number: '04',
    title: 'Singularity Audio-Reactive Synthesizer',
    subtitle: 'Generative Spatial Audio Experience',
    category: 'Creative Technology',
    year: '2024',
    description:
      'Created a browser-native procedural soundscape engine driven by real-time WebAudio frequency analysis and dynamic canvas wave deformers.',
    tags: ['WebAudio API', 'Canvas', 'Generative Math', 'GSAP'],
    metrics: '< 10ms Audio Latency',
    role: 'Creative Technologist',
    link: 'https://github.com/taranmoon/singularity',
    github: 'https://github.com/taranmoon/singularity',
  },
];

export const CAPABILITIES: Capability[] = [
  {
    number: '01',
    title: 'Spatial & Canvas Engineering',
    subtitle: 'Deterministic 60fps Visual Systems',
    description:
      'Building pre-rendered and generative canvas engines, scroll-scrubbed narratives, and custom GPU-accelerated rendering pipelines without bloated 3D dependencies.',
    skills: ['HTML5 2D Canvas', 'GSAP ScrollTrigger', 'Lenis Smooth Scroll', 'Memory Management', 'DPR Normalization'],
  },
  {
    number: '02',
    title: 'Frontend Architecture & Next.js',
    subtitle: 'Production-Grade Editorial Systems',
    description:
      'Engineering high-scale Next.js App Router applications with strict TypeScript typing, sub-second LCP, zero layout shifts, and robust server/client boundaries.',
    skills: ['Next.js 15', 'React 19', 'TypeScript', 'Tailwind CSS', 'Turbopack', 'Vercel Edge'],
  },
  {
    number: '03',
    title: 'Agentic AI & Systems Orchestration',
    subtitle: 'Parallel Reasoning & Automation',
    description:
      'Designing agent workflows, tool-use protocols, structured multi-agent loops, and deterministic verification frameworks for advanced software intelligence.',
    skills: ['Autonomous Agents', 'MCP Protocols', 'Context Engineering', 'Browser Automation', 'Workflow Orchestration'],
  },
  {
    number: '04',
    title: 'Editorial Art Direction & Craft',
    subtitle: 'Monochrome, Spatial, Restrained UI',
    description:
      'Fusing technical rigor with brutalist and editorial design sensibilities. Crafting typography hierarchies, fine orbital grids, and tactile textures.',
    skills: ['Editorial Typography', 'Micro-Interactions', 'Monochrome Palettes', 'WCAG AAA Compliance', 'Motion Systems'],
  },
];

export const TELEMETRY_CONSTANTS = {
  mission: 'APOLLO-TM',
  target: 'LUNA-PRIME',
  latitude: '23.442° N',
  longitude: '019.215° E',
  orbitalPeriod: '118.2 MIN',
  signalStatus: 'OPTIMAL (99.98%)',
  encryption: 'AES-256-GCM',
  contactEmail: 'taran@moon.dev',
  githubUrl: 'https://github.com/taranmoon',
  xUrl: 'https://x.com/taranmoon',
  linkedinUrl: 'https://linkedin.com/in/taranmoon',
};
