'use client';

import dynamic from 'next/dynamic';
import styles from './page.module.css';
import SlidingGreeting from '@/components/hub/SlidingGreeting';
import ThemeToggle from '@/components/hub/ThemeToggle';

const BrainScene = dynamic(() => import('@/components/brain/BrainScene'), {
  ssr: false,
});

const OrbitingCards = dynamic(() => import('@/components/hub/OrbitingCards'), {
  ssr: false,
});

export default function HubPage() {
  return (
    <main className={styles.hub}>
      {/* ─── Brain: fullscreen fixed background layer ──── */}
      <BrainScene />

      {/* ─── Top Bar ─────────────────────────────────── */}
      <header className={styles.topBar}>
        <div className={styles.topLeft}>
          <button className={styles.musicBtn} aria-label="Toggle music">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
              <path d="M9 18V5l12-2v13" />
              <circle cx="6" cy="18" r="3" />
              <circle cx="18" cy="16" r="3" />
            </svg>
            <span>Music</span>
          </button>
        </div>
        <div className={styles.topRight}>
          <ThemeToggle />
        </div>
      </header>

      {/* ─── Center Stage: greeting + cards overlay ───── */}
      <div className={styles.stage}>
        <div className={styles.greetingArea}>
          <SlidingGreeting />
        </div>

        <OrbitingCards />
      </div>

      {/* ─── Bottom bar ──────────────────────────────── */}
      <footer className={styles.bottomBar}>
        <div className={styles.nowPlaying}>
          <div className={styles.eqBars}>
            <span /><span /><span /><span />
          </div>
          <div>
            <p className={styles.npLabel}>Now Playing</p>
            <p className={styles.npTrack}>Neural Drift — Synthwave Mix</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
