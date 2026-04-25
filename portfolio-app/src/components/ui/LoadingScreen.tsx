'use client';

import { useEffect, useState } from 'react';
import styles from './LoadingScreen.module.css';

interface LoadingScreenProps {
  isLoaded: boolean;
}

export default function LoadingScreen({ isLoaded }: LoadingScreenProps) {
  const [visible, setVisible] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    if (isLoaded) {
      // Small delay to ensure smooth transition
      const timer = setTimeout(() => setFadeOut(true), 300);
      const removeTimer = setTimeout(() => setVisible(false), 1500);
      return () => {
        clearTimeout(timer);
        clearTimeout(removeTimer);
      };
    }
  }, [isLoaded]);

  if (!visible) return null;

  return (
    <div
      className={`${styles.overlay} ${fadeOut ? styles.fadeOut : ''}`}
      role="status"
      aria-label="Loading portfolio"
    >
      <div className={styles.content}>
        {/* Brain silhouette pulse */}
        <div className={styles.brainIcon}>
          <svg
            width="80"
            height="80"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 2a7 7 0 0 0-7 7c0 3 1.5 5.5 3 7l1 1.5V20a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1v-2.5L16 16c1.5-1.5 3-4 3-7a7 7 0 0 0-7-7Z" />
            <path d="M12 2v4" />
            <path d="m8 8 2 2" />
            <path d="m14 8-2 2" />
            <path d="M9 21h6" />
          </svg>
        </div>

        {/* Shimmer progress bar */}
        <div className={styles.progressTrack}>
          <div className={styles.progressBar} />
        </div>

        <p className={styles.text}>Initializing neural pathways...</p>
      </div>
    </div>
  );
}
