// ─── Design Tokens ───────────────────────────────────────────────
export const COLORS = {
  dark: {
    bg: '#030409',
    bgSecondary: '#0a0e1a',
    brainGlow: '#00D9FF',
    neuralPath: '#22C55E',
    accent: '#A855F7',
    text: '#E8EAF0',
    textMuted: '#6B7280',
    cardBg: 'rgba(255,255,255,0.04)',
    cardBorder: 'rgba(255,255,255,0.08)',
    wireColor: '#00D9FF',
  },
  light: {
    bg: '#F5F0E8',
    bgSecondary: '#EDE8DC',
    brainGlow: '#D97706',
    neuralPath: '#EAB308',
    accent: '#D97706',
    text: '#2D1B00',
    textMuted: '#78716C',
    cardBg: 'rgba(0,0,0,0.03)',
    cardBorder: 'rgba(0,0,0,0.08)',
    wireColor: '#D97706',
  },
} as const;

// ─── Scroll Thresholds ──────────────────────────────────────────
export const SCROLL = {
  zoomStart: 0,
  zoomEnd: 0.6,
  neuralPulse: 0.6,
  brainDissolve: 0.65,
  cardsAppear: 0.68,
  cardsComplete: 0.78,
} as const;

// ─── Hub Card Definitions (single source of truth) ──────────────
// Routes, colors, subtitles, and layout positions are all colocated
// here so OrbitingCards and any future component can import from one place.
export const CARDS = [
  {
    id: 'about',
    title: 'About Me',
    subtitle: 'Who I am & what I do',
    icon: '👤',
    description: 'The human behind the code',
    color: '#0027f5',
    href: '/about',
    position: { x: -38, y: -32 },
  },
  {
    id: 'skills',
    title: 'Skills',
    subtitle: 'Technologies & tools I use',
    icon: '⚡',
    description: 'Tools & technologies I wield',
    color: '#ff0d0d',
    href: '/skills',
    position: { x: 38, y: -28 },
  },
  {
    id: 'projects',
    title: 'Projects',
    subtitle: "Things I've built & shipped",
    icon: '🚀',
    description: "Things I've built",
    color: '#40c549',
    href: '/projects',
    position: { x: 42, y: 14 },
  },
  {
    id: 'connect',
    title: 'Connect',
    subtitle: "Let's connect & build together",
    icon: '🔗',
    description: "Let's talk",
    color: '#7419c5',
    href: '/connect',
    position: { x: 0, y: 38 },
  },
  {
    id: 'game',
    title: 'Game',
    subtitle: "Let's play a little game",
    icon: '🎮',
    description: 'Mini-game + leaderboard',
    color: '#f2e903',
    href: '/game',
    position: { x: -42, y: 14 },
  },
] as const;

// ─── Flipboard Languages ────────────────────────────────────────
export const FLIPBOARD_WORDS = [
  { lang: 'English', text: 'NAMASTE', font: 'Rajdhani' },
  { lang: 'Hindi', text: 'नमस्ते', font: 'Tiro Devanagari Hindi' },
  { lang: 'Japanese', text: 'こんにちは', font: 'Noto Sans JP' },
] as const;

// ─── Breakpoints ────────────────────────────────────────────────
export const BREAKPOINTS = {
  mobile: 640,
  tablet: 1024,
  desktop: 1440,
} as const;
