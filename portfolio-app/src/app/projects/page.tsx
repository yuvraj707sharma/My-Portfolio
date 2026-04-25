'use client';

import PageShell from '@/components/layout/PageShell';
import styles from './page.module.css';

const PROJECTS = [
  {
    title: 'CliniQ AI',
    description: 'AI-powered multilingual clinical assistant for diagnostics and prescriptions.',
    tags: ['Python', 'AI', 'Healthcare'],
    year: '2026',
    link: '#',
  },
  {
    title: 'Stream Buddy',
    description: 'Elgato-inspired Stream Deck for live streaming — web-based macro controller.',
    tags: ['React', 'WebSocket', 'OBS'],
    year: '2026',
    link: '#',
  },
  {
    title: 'MACRO Agent',
    description: 'Terminal AI agent with code-graph intelligence and intent routing.',
    tags: ['Go', 'AI', 'CLI'],
    year: '2026',
    link: '#',
  },
  {
    title: 'Portfolio Hub',
    description: 'This gamified brain-hub portfolio you\'re exploring right now.',
    tags: ['Next.js', 'Spline', 'GSAP'],
    year: '2026',
    link: '#',
  },
];

export default function ProjectsPage() {
  return (
    <PageShell title="Projects" accentColor="#40c549">
      <div className={styles.newspaper}>
        <header className={styles.masthead}>
          <div className={styles.mastheadLine} />
          <h2 className={styles.mastheadTitle}>THE YUVRAJ TIMES</h2>
          <p className={styles.mastheadDate}>Vol. I — Issue {PROJECTS.length} — 2026</p>
          <div className={styles.mastheadLine} />
        </header>

        <div className={styles.grid}>
          {PROJECTS.map((project, i) => (
            <article
              key={project.title}
              className={`${styles.poster} ${i === 0 ? styles.posterFeatured : ''}`}
              style={{ '--delay': `${i * 0.12}s` } as React.CSSProperties}
            >
              <div className={styles.posterContent}>
                <span className={styles.posterYear}>{project.year}</span>
                <h3 className={styles.posterTitle}>{project.title}</h3>
                <p className={styles.posterDesc}>{project.description}</p>
                <div className={styles.posterTags}>
                  {project.tags.map((tag) => (
                    <span key={tag} className={styles.tag}>{tag}</span>
                  ))}
                </div>
                <a href={project.link} className={styles.posterLink}>
                  Read More →
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </PageShell>
  );
}
