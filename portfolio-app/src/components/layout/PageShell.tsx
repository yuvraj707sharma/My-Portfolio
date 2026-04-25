'use client';

import { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import gsap from 'gsap';
import styles from './PageShell.module.css';

interface PageShellProps {
  children: React.ReactNode;
  title: string;
  accentColor: string;
}

export default function PageShell({ children, title, accentColor }: PageShellProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Entrance animation
  useEffect(() => {
    const tl = gsap.timeline();

    tl.fromTo(
      overlayRef.current,
      { scaleX: 1 },
      { scaleX: 0, duration: 0.6, ease: 'expo.inOut', transformOrigin: 'right' }
    );

    tl.fromTo(
      contentRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' },
      '-=0.2'
    );
  }, []);

  const handleExit = () => {
    const tl = gsap.timeline({
      onComplete: () => router.push('/'),
    });

    tl.to(contentRef.current, {
      opacity: 0,
      y: -20,
      duration: 0.3,
      ease: 'power2.in',
    });

    tl.fromTo(
      overlayRef.current,
      { scaleX: 0 },
      { scaleX: 1, duration: 0.5, ease: 'expo.inOut', transformOrigin: 'left' }
    );
  };

  return (
    <div ref={containerRef} className={styles.shell}>
      {/* Slide overlay */}
      <div
        ref={overlayRef}
        className={styles.overlay}
        style={{ background: accentColor }}
      />

      {/* Header */}
      <header className={styles.header}>
        <button className={styles.backBtn} onClick={handleExit}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="20" height="20">
            <line x1="19" y1="12" x2="5" y2="12" />
            <polyline points="12 19 5 12 12 5" />
          </svg>
          <span>Back to Hub</span>
        </button>
        <h1 className={styles.pageTitle} style={{ color: accentColor }}>{title}</h1>
      </header>

      {/* Page content */}
      <div ref={contentRef} className={styles.content}>
        {children}
      </div>
    </div>
  );
}
