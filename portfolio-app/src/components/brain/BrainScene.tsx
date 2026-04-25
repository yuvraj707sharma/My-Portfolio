'use client';

import { useCallback, useState } from 'react';
import dynamic from 'next/dynamic';
import { useTheme } from '@/contexts/ThemeContext';
import styles from './BrainScene.module.css';
import type { Application } from '@splinetool/runtime';

const Spline = dynamic(() => import('@splinetool/react-spline'), {
  ssr: false,
  loading: () => null,
});

interface BrainSceneProps {
  onLoad?: () => void;
}

export default function BrainScene({ onLoad }: BrainSceneProps) {
  const { theme } = useTheme();
  const [loaded, setLoaded] = useState(false);

  const handleLoad = useCallback((splineApp: Application) => {
    setLoaded(true);
    onLoad?.();
  }, [onLoad]);

  // Light theme: red brain with white outline effect
  const lightFilter = 'hue-rotate(320deg) saturate(3) brightness(1.2) contrast(1.1)';

  return (
    <div className={`${styles.container} ${loaded ? styles.loaded : ''}`}>
      <div
        className={styles.brainWrapper}
        style={{ filter: theme === 'light' ? lightFilter : 'none' }}
      >
        <Spline
          scene="/scene.splinecode"
          onLoad={handleLoad}
          className={styles.splineCanvas}
        />
      </div>
    </div>
  );
}
