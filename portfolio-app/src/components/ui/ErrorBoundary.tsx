'use client';

import { Component, type ReactNode } from 'react';
import styles from './ErrorBoundary.module.css';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) return this.props.fallback;

      return (
        <div className={styles.fallback} role="alert">
          <div className={styles.content}>
            {/* Static SVG brain as fallback */}
            <svg
              width="120"
              height="120"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={styles.icon}
            >
              <path d="M12 2a7 7 0 0 0-7 7c0 3 1.5 5.5 3 7l1 1.5V20a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1v-2.5L16 16c1.5-1.5 3-4 3-7a7 7 0 0 0-7-7Z" />
              <path d="M12 2v4" />
              <path d="m8 8 2 2" />
              <path d="m14 8-2 2" />
              <path d="M9 21h6" />
            </svg>
            <h2 className={styles.title}>3D rendering unavailable</h2>
            <p className={styles.text}>
              Your browser doesn&apos;t support WebGL, which is needed for the 3D experience.
              Try using a modern browser like Chrome, Firefox, or Edge.
            </p>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
