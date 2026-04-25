'use client';

import { useRef, useEffect, useState, useCallback } from 'react';
import type { ReactElement } from 'react';
import { useRouter } from 'next/navigation';
import gsap from 'gsap';
import styles from './OrbitingCards.module.css';
import { CARDS } from '@/lib/constants';

const ICONS: Record<string, ReactElement> = {
  about: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  ),
  skills: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
      <line x1="14" y1="4" x2="10" y2="20" />
    </svg>
  ),
  projects: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
    </svg>
  ),
  connect: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="22" y1="2" x2="11" y2="13" />
      <polygon points="22 2 15 22 11 13 2 9 22 2" />
    </svg>
  ),
  game: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="6" y1="11" x2="10" y2="11" />
      <line x1="8" y1="9" x2="8" y2="13" />
      <circle cx="15" cy="12" r="1" />
      <circle cx="18" cy="10" r="1" />
      <rect x="2" y="6" width="20" height="12" rx="4" />
    </svg>
  ),
};

// Elliptical positions are colocated in constants.ts alongside the card data.
// We derive the positions from the shared CARDS array here.

export default function OrbitingCards() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLButtonElement | null)[]>([]);
  const router = useRouter();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Mouse parallax on cards — use absolute offsets to prevent drift
  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;

      cardsRef.current.forEach((card, i) => {
        if (!card) return;
        // Alternating depth creates subtle layered parallax (even cards move more)
        const depth = (i % 2 === 0) ? 6 : 4;
        gsap.to(card, {
          x: x * depth,
          y: y * depth,
          duration: 0.8,
          ease: 'power2.out',
          overwrite: 'auto',
        });
      });
    };

    const handleLeave = () => {
      cardsRef.current.forEach((card) => {
        if (!card) return;
        gsap.to(card, {
          x: 0,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
          overwrite: 'auto',
        });
      });
    };

    window.addEventListener('mousemove', handleMove);
    document.documentElement.addEventListener('mouseleave', handleLeave);
    return () => {
      window.removeEventListener('mousemove', handleMove);
      document.documentElement.removeEventListener('mouseleave', handleLeave);
    };
  }, []);

  // Keyboard: press number to navigate
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      const num = parseInt(e.key);
      if (num >= 1 && num <= 5) {
        router.push(CARDS[num - 1].href);
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [router]);

  const handleCardClick = useCallback((card: typeof CARDS[number]) => {
    router.push(card.href);
  }, [router]);

  return (
    <div ref={containerRef} className={styles.container}>
      {/* Orbital ring */}
      <div className={styles.orbitalRing} aria-hidden="true" />

      {/* Connection lines from center to cards */}
      <svg className={styles.connectionLines} viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
        {CARDS.map((card, i) => (
          <line
            key={i}
            x1="50"
            y1="50"
            x2={50 + card.position.x * 0.9}
            y2={50 + card.position.y * 0.9}
            stroke={card.color}
            strokeWidth="0.15"
            strokeOpacity={hoveredIndex === i ? 0.6 : 0.15}
            strokeDasharray="2 2"
            style={{ transition: 'stroke-opacity 0.4s ease' }}
          />
        ))}
      </svg>

      {/* Cards positioned around the brain */}
      {CARDS.map((card, i) => {
        const pos = card.position;
        const isHovered = hoveredIndex === i;

        return (
          <button
            key={card.id}
            ref={(el) => { cardsRef.current[i] = el; }}
            className={`${styles.card} ${isHovered ? styles.cardHovered : ''}`}
            style={{
              '--card-color': card.color,
              '--card-x': `${pos.x}%`,
              '--card-y': `${pos.y}%`,
            } as React.CSSProperties}
            onClick={() => handleCardClick(card)}
            onMouseEnter={() => setHoveredIndex(i)}
            onMouseLeave={() => setHoveredIndex(null)}
            aria-label={`Navigate to ${card.title}`}
          >
            <div className={styles.cardGlow} aria-hidden="true" />
            <div className={styles.cardContent}>
              <div className={styles.icon}>
                {ICONS[card.id]}
              </div>
              <span className={styles.title}>{card.title}</span>
              <span className={styles.subtitle}>{card.subtitle}</span>
              <div className={styles.cardLine} />
            </div>
          </button>
        );
      })}

      {/* Hint */}
      <p className={styles.hint}>
        Press <span className={styles.hintKeys}>1–5</span> to navigate
        <span className={styles.hintDot}>•</span>
        Click a card to explore
      </p>
    </div>
  );
}
