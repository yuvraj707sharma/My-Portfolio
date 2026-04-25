'use client';

import { useState, useEffect } from 'react';
import styles from './SlidingGreeting.module.css';

const GREETINGS = [
  { text: 'Namaste', lang: 'en' },
  { text: 'नमस्ते', lang: 'hi' },
  { text: 'こんにちは', lang: 'ja' },
  { text: 'Bonjour', lang: 'fr' },
  { text: 'Hola', lang: 'es' },
  { text: '안녕하세요', lang: 'ko' },
  { text: 'Ciao', lang: 'it' },
  { text: 'مرحبا', lang: 'ar' },
];

const ROLES = ['Developer', 'Designer', 'Problem Solver'];

export default function SlidingGreeting() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [roleIndex, setRoleIndex] = useState(0);
  const [slideDirection, setSlideDirection] = useState<'left' | 'right'>('left');

  useEffect(() => {
    const interval = setInterval(() => {
      setSlideDirection((prev) => (prev === 'left' ? 'right' : 'left'));
      setCurrentIndex((prev) => (prev + 1) % GREETINGS.length);
    }, 2800);

    return () => clearInterval(interval);
  }, []);

  // Cycle roles separately
  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % ROLES.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const greeting = GREETINGS[currentIndex];

  return (
    <div className={styles.container}>
      <div
        key={`${currentIndex}-${greeting.text}`}
        className={`${styles.text} ${slideDirection === 'left' ? styles.slideLeft : styles.slideRight}`}
        lang={greeting.lang}
      >
        {greeting.text}
      </div>
      <p className={styles.name}>I&apos;m <span className={styles.nameHighlight}>Yuvraj</span></p>
      <div className={styles.roles}>
        <span key={roleIndex} className={styles.role}>
          {ROLES[roleIndex]}
        </span>
        <span className={styles.roleSep}>•</span>
        <span key={`${roleIndex}-next`} className={styles.roleStatic}>
          {ROLES[(roleIndex + 1) % ROLES.length]}
        </span>
        <span className={styles.roleSep}>•</span>
        <span className={styles.roleStatic}>
          {ROLES[(roleIndex + 2) % ROLES.length]}
        </span>
      </div>
    </div>
  );
}
