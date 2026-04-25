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

// ─── Card Definitions ───────────────────────────────────────────
export const CARDS = [
  {
    id: 'about',
    title: 'About Me',
    icon: '👤',
    description: 'The human behind the code',
    href: '/sections/about',
    position: { x: -30, y: -8 },
  },
  {
    id: 'skills',
    title: 'Skills',
    icon: '⚡',
    description: 'Tools & technologies I wield',
    href: '/sections/skills',
    position: { x: 30, y: -8 },
  },
  {
    id: 'projects',
    title: 'Projects',
    icon: '🚀',
    description: 'Things I\'ve built',
    href: '/sections/projects',
    position: { x: 0, y: -30 },
  },
  {
    id: 'connect',
    title: 'Connect',
    icon: '🔗',
    description: 'Let\'s talk',
    href: '/sections/connect',
    position: { x: -24, y: 18 },
  },
  {
    id: 'scribble',
    title: 'Scribble',
    icon: '✏️',
    description: 'Leave your mark',
    href: '/sections/scribble',
    position: { x: 24, y: 18 },
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
