'use client';

import { useRef, useCallback } from 'react';
import PageShell from '@/components/layout/PageShell';
import SkillFrame from '@/components/skills/SkillFrame';
import styles from './page.module.css';

/* ─── Skill Data ────────────────────────────────────── */
const SKILLS = [
  {
    name: 'C++',
    color: '#00599C',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M22.394 6c-.167-.29-.398-.543-.652-.69L12.926.22c-.509-.294-1.34-.294-1.848 0L2.26 5.31c-.508.293-.923 1.013-.923 1.6v10.18c0 .294.104.62.271.91.167.29.398.543.652.69l8.816 5.09c.508.293 1.34.293 1.848 0l8.816-5.09c.254-.147.485-.4.652-.69.167-.29.27-.616.27-.91V6.91c.003-.294-.1-.62-.268-.91zM12 19.11c-3.92 0-7.109-3.19-7.109-7.11 0-3.92 3.19-7.11 7.11-7.11a7.133 7.133 0 016.156 3.553l-3.076 1.78a3.567 3.567 0 00-3.08-1.78A3.56 3.56 0 008.444 12 3.56 3.56 0 0012 15.555a3.57 3.57 0 003.08-1.778l3.078 1.78A7.135 7.135 0 0112 19.11zm7.11-6.715h-.79v.79h-.79v-.79h-.79v-.79h.79v-.79h.79v.79h.79zm2.962 0h-.79v.79h-.79v-.79h-.79v-.79h.79v-.79h.79v.79h.79z"/>
      </svg>
    ),
  },
  {
    name: 'Python',
    color: '#3776AB',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M14.25.18l.9.2.73.26.59.3.45.32.34.34.25.34.16.33.1.3.04.26.02.2-.01.13V8.5l-.05.63-.13.55-.21.46-.26.38-.3.31-.33.25-.35.19-.35.14-.33.1-.3.07-.26.04-.21.02H8.77l-.69.05-.59.14-.5.22-.41.27-.33.32-.27.35-.2.36-.15.37-.1.35-.07.32-.04.27-.02.21v3.68H3.23l-.21-.03-.28-.07-.34-.12-.37-.17-.38-.22-.36-.27-.33-.32-.27-.35-.2-.36-.15-.36-.1-.34-.07-.3-.04-.25-.02-.2.01-.13v-5.34l.05-.64.13-.54.21-.46.26-.38.3-.32.33-.24.35-.2.35-.14.33-.1.3-.06.26-.04.21-.02.13-.01h5.84l.69-.05.59-.14.5-.21.41-.28.33-.32.27-.35.2-.36.15-.37.1-.35.07-.32.04-.27.02-.21v-3.68zM14.33 0a.72.72 0 01.72.72.72.72 0 01-.72.72.72.72 0 01-.72-.72A.72.72 0 0114.33 0zM9.67 21.82l-.9-.2-.73-.25-.59-.3-.45-.33-.34-.34-.25-.34-.16-.33-.1-.3-.04-.25-.02-.2.01-.14v-5.36l.05-.63.13-.55.21-.46.26-.38.3-.32.33-.24.35-.2.35-.14.33-.1.3-.06.26-.04.21-.02h5.08l.69-.05.59-.14.5-.22.41-.27.33-.32.27-.35.2-.36.15-.37.1-.35.07-.32.04-.27.02-.21V3.5h3.68l.21.03.28.07.34.12.37.18.38.22.36.27.33.32.27.35.2.36.15.37.1.34.07.3.04.25.02.2-.01.14v5.34l-.05.63-.13.55-.21.46-.26.38-.3.32-.33.24-.35.2-.35.14-.33.1-.3.06-.26.04-.21.02-.13.01h-5.84l-.69.05-.59.14-.5.22-.41.27-.33.32-.27.35-.2.36-.15.37-.1.35-.07.32-.04.27-.02.21v3.68h-1zm.58-1.38a.72.72 0 01-.72-.72.72.72 0 01.72-.72.72.72 0 01.72.72.72.72 0 01-.72.72z"/>
      </svg>
    ),
  },
  {
    name: 'Go',
    color: '#00ADD8',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M1.811 10.715S1.677 10.517 2.213 10.313C2.75 10.108 5.427 9.157 5.427 9.157L5.427 9.157S5.583 9.002 5.451 8.883C5.319 8.764 5.115 8.633 5.115 8.633L2.487 9.682S1.679 9.995 1.811 10.715Z"/>
        <path d="M1.541 11.398S1.363 11.237 1.952 10.932C2.541 10.627 5.67 9.327 5.67 9.327S5.86 9.147 5.703 9.032C5.546 8.917 5.299 8.822 5.299 8.822L2.171 10.16S1.279 10.564 1.541 11.398Z"/>
        <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
      </svg>
    ),
  },
  {
    name: 'React',
    color: '#61DAFB',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M14.23 12.004a2.236 2.236 0 0 1-2.235 2.236 2.236 2.236 0 0 1-2.236-2.236 2.236 2.236 0 0 1 2.235-2.236 2.236 2.236 0 0 1 2.236 2.236zm2.648-10.69c-1.346 0-3.107.96-4.888 2.622-1.78-1.653-3.542-2.602-4.887-2.602-.31 0-.592.068-.846.206-1.31.764-1.427 3.648-.23 7.19C2.705 10.284 1.6 12.23 1.6 13.88c0 .293.07.574.203.828.764 1.31 3.649 1.428 7.191.23 1.652 3.322 3.596 4.427 5.244 4.427.293 0 .574-.07.828-.203 1.31-.764 1.427-3.648.23-7.19 3.322-1.653 4.427-3.597 4.427-5.245 0-.293-.07-.574-.203-.828-.764-1.31-3.649-1.428-7.191-.23-1.652-3.322-3.596-4.427-5.244-4.427-.293 0-.574.07-.828.203zM12 14.47a2.47 2.47 0 1 1 0-4.94 2.47 2.47 0 0 1 0 4.94z"/>
      </svg>
    ),
  },
  {
    name: 'Product Mgmt',
    color: '#F59E0B',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2" />
        <rect x="9" y="3" width="6" height="4" rx="1" />
        <path d="M9 14l2 2 4-4" />
      </svg>
    ),
  },
];

/* ─── Wall Engraving SVGs ───────────────────────────── */
const ENGRAVINGS = [
  // Brain (top-right)
  { id: 'brain', x: '72%', y: '8%', size: 160, svg: (
    <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="0.8">
      <path d="M50 15c-8 0-15 5-18 12-5 1-10 6-10 13 0 5 3 10 7 12 0 8 5 15 12 18 3 1 6 2 9 2s6-1 9-2c7-3 12-10 12-18 4-2 7-7 7-12 0-7-5-12-10-13-3-7-10-12-18-12z"/>
      <path d="M50 15v57M35 30c5 5 10 8 15 8s10-3 15-8M30 45c7 3 13 5 20 5s13-2 20-5"/>
      <path d="M40 55c3 4 7 7 10 8 3-1 7-4 10-8"/>
    </svg>
  )},
  // Heart (top-left area)
  { id: 'heart', x: '8%', y: '12%', size: 130, svg: (
    <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="0.8">
      <path d="M50 85L20 50c-8-10-8-25 0-32 6-6 16-6 22 0l8 8 8-8c6-6 16-6 22 0 8 7 8 22 0 32L50 85z"/>
      <path d="M35 35c-4 4-4 12 0 18l15 18"/>
      <path d="M42 28l-4 8M58 28l4 8M50 40v20"/>
      <path d="M30 55l8-5M70 55l-8-5"/>
      <path d="M45 30c0 0-3 5 5 10 8-5 5-10 5-10"/>
    </svg>
  )},
  // Car (bottom-left)
  { id: 'car', x: '5%', y: '65%', size: 180, svg: (
    <svg viewBox="0 0 120 60" fill="none" stroke="currentColor" strokeWidth="0.7">
      <path d="M20 45h80c3 0 5-2 5-5v-8c0-2-1-4-3-5l-15-12c-2-2-5-3-8-3H40c-3 0-6 1-8 3L17 27c-2 1-3 3-3 5v8c0 3 2 5 5 5z"/>
      <circle cx="30" cy="45" r="8"/><circle cx="30" cy="45" r="3"/>
      <circle cx="90" cy="45" r="8"/><circle cx="90" cy="45" r="3"/>
      <path d="M40 15h35l12 12H35z"/>
      <path d="M55 15v12M15 35h90"/>
    </svg>
  )},
  // Dollar/Money (right side)
  { id: 'money', x: '88%', y: '40%', size: 100, svg: (
    <svg viewBox="0 0 60 80" fill="none" stroke="currentColor" strokeWidth="0.8">
      <path d="M30 5v70M20 20c0-8 20-8 20 0s-20 8-20 0"/>
      <path d="M20 45c0-8 20-8 20 0s-20 8-20 0"/>
      <circle cx="30" cy="40" r="25" strokeDasharray="4 3"/>
      <path d="M15 10l5 5M45 10l-5 5M15 70l5-5M45 70l-5-5"/>
    </svg>
  )},
  // Rocket (bottom-center)
  { id: 'rocket', x: '48%', y: '75%', size: 120, svg: (
    <svg viewBox="0 0 80 100" fill="none" stroke="currentColor" strokeWidth="0.7">
      <path d="M40 10c-5 10-8 25-8 40h16c0-15-3-30-8-40z"/>
      <path d="M32 50l-10 15 10-5M48 50l10 15-10-5"/>
      <circle cx="40" cy="35" r="5"/>
      <path d="M35 55h10v10l-5 8-5-8z"/>
      <path d="M30 75l-5 10M50 75l5 10M40 73l0 12"/>
    </svg>
  )},
  // Globe (bottom-right)
  { id: 'globe', x: '82%', y: '70%', size: 110, svg: (
    <svg viewBox="0 0 80 80" fill="none" stroke="currentColor" strokeWidth="0.7">
      <circle cx="40" cy="40" r="30"/>
      <ellipse cx="40" cy="40" rx="12" ry="30"/>
      <path d="M10 30h60M10 50h60M40 10v60"/>
      <path d="M18 20c7 3 14 4 22 4s15-1 22-4"/>
      <path d="M18 60c7-3 14-4 22-4s15 1 22 4"/>
    </svg>
  )},
  // Molecule (mid-right)
  { id: 'molecule', x: '90%', y: '15%', size: 90, svg: (
    <svg viewBox="0 0 70 70" fill="none" stroke="currentColor" strokeWidth="0.8">
      <circle cx="35" cy="20" r="6"/><circle cx="20" cy="45" r="6"/>
      <circle cx="50" cy="45" r="6"/><circle cx="55" cy="15" r="4"/>
      <circle cx="10" cy="25" r="4"/>
      <line x1="35" y1="26" x2="23" y2="40"/><line x1="35" y1="26" x2="47" y2="40"/>
      <line x1="26" y1="45" x2="44" y2="45"/>
      <line x1="40" y1="17" x2="52" y2="16"/><line x1="16" y1="28" x2="30" y2="22"/>
    </svg>
  )},
  // Gears (left side)
  { id: 'gears', x: '3%', y: '42%', size: 100, svg: (
    <svg viewBox="0 0 80 80" fill="none" stroke="currentColor" strokeWidth="0.7">
      <circle cx="30" cy="35" r="10"/><circle cx="30" cy="35" r="4"/>
      <circle cx="55" cy="50" r="8"/><circle cx="55" cy="50" r="3"/>
      <path d="M30 22v-5M30 48v5M17 35h-5M43 35h5"/>
      <path d="M21 26l-3-3M39 44l3 3M21 44l-3 3M39 26l3-3"/>
      <path d="M55 39v-4M55 61v4M45 50h-4M65 50h4"/>
    </svg>
  )},
];

export default function SkillsPage() {
  const wallRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const wall = wallRef.current;
    if (!wall) return;
    const rect = wall.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    wall.style.setProperty('--mx', `${x}px`);
    wall.style.setProperty('--my', `${y}px`);
  }, []);

  return (
    <PageShell title="Skills" accentColor="#ff0d0d">
      <div
        ref={wallRef}
        className={styles.wall}
        onMouseMove={handleMouseMove}
      >
        {/* Noise texture overlay */}
        <div className={styles.noise} aria-hidden="true" />

        {/* Spotlight that follows cursor */}
        <div className={styles.spotlight} aria-hidden="true" />

        {/* Wall engravings — revealed by cursor proximity */}
        <div className={styles.engravings} aria-hidden="true">
          {ENGRAVINGS.map((eng) => (
            <div
              key={eng.id}
              className={styles.engraving}
              style={{
                left: eng.x,
                top: eng.y,
                width: eng.size,
                height: eng.size,
              }}
            >
              {eng.svg}
            </div>
          ))}
        </div>

        {/* Header */}
        <div className={styles.header}>
          <h2 className={styles.title}>Skills</h2>
          <p className={styles.subtitle}>Tools, technologies & superpowers</p>
          <div className={styles.diamond}>◇</div>
        </div>

        {/* Skill Frames Grid */}
        <div className={styles.framesGrid}>
          {/* Row 1: 3 frames */}
          <div className={styles.row}>
            {SKILLS.slice(0, 3).map((skill) => (
              <SkillFrame key={skill.name} label={skill.name} color={skill.color}>
                {skill.icon}
              </SkillFrame>
            ))}
          </div>
          {/* Row 2: 2 frames */}
          <div className={styles.row}>
            {SKILLS.slice(3).map((skill) => (
              <SkillFrame key={skill.name} label={skill.name} color={skill.color}>
                {skill.icon}
              </SkillFrame>
            ))}
          </div>
        </div>

        {/* Hint */}
        <div className={styles.hint}>
          <span className={styles.hintIcon}>🖱</span>
          <span>Move your cursor around the wall to discover hidden details</span>
        </div>
      </div>
    </PageShell>
  );
}
