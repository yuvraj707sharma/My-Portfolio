'use client';

import styles from './SkillFrame.module.css';

interface SkillFrameProps {
  label: string;
  color: string;
  children: React.ReactNode;
}

export default function SkillFrame({ label, color, children }: SkillFrameProps) {
  return (
    <div className={styles.frame} style={{ '--accent': color } as React.CSSProperties}>
      <div className={styles.outerRing}>
        <div className={styles.innerPattern}>
          <div className={styles.center}>
            {children}
          </div>
        </div>
      </div>
      <span className={styles.label}>{label}</span>
    </div>
  );
}
