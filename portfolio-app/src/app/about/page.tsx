'use client';

import PageShell from '@/components/layout/PageShell';
import styles from './page.module.css';

export default function AboutPage() {
  return (
    <PageShell title="About Me" accentColor="#0027f5">
      <div className={styles.about}>
        {/* Laptop Frame */}
        <div className={styles.laptopFrame}>
          <div className={styles.laptopScreen}>
            <div className={styles.profile}>
              <div className={styles.avatarPlaceholder}>
                <span>Y</span>
              </div>
              <div className={styles.profileInfo}>
                <h2 className={styles.profileName}>Yuvraj</h2>
                <p className={styles.profileRole}>Developer & Engineer</p>
                <div className={styles.profileStats}>
                  <div className={styles.stat}>
                    <span className={styles.statNumber}>5+</span>
                    <span className={styles.statLabel}>Projects</span>
                  </div>
                  <div className={styles.stat}>
                    <span className={styles.statNumber}>3+</span>
                    <span className={styles.statLabel}>Years Coding</span>
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.bio}>
              <p>
                I&apos;m a developer who builds things that think. From AI-powered applications
                to interactive web experiences, I love working at the intersection of
                technology and creativity.
              </p>
              <p>
                When I&apos;m not coding, you&apos;ll find me exploring new technologies,
                contributing to open source, or designing interfaces that push boundaries.
              </p>
            </div>

            <div className={styles.details}>
              <div className={styles.detailRow}>
                <span className={styles.detailLabel}>Location</span>
                <span className={styles.detailValue}>India</span>
              </div>
              <div className={styles.detailRow}>
                <span className={styles.detailLabel}>Education</span>
                <span className={styles.detailValue}>Computer Science</span>
              </div>
              <div className={styles.detailRow}>
                <span className={styles.detailLabel}>Focus</span>
                <span className={styles.detailValue}>Full-Stack, AI, Product</span>
              </div>
              <div className={styles.detailRow}>
                <span className={styles.detailLabel}>Interests</span>
                <span className={styles.detailValue}>Open Source, Design, Gaming</span>
              </div>
            </div>
          </div>
          {/* Laptop base */}
          <div className={styles.laptopBase}>
            <div className={styles.laptopNotch} />
          </div>
        </div>
      </div>
    </PageShell>
  );
}
