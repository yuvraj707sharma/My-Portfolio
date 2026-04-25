'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { FLIPBOARD_WORDS } from '@/lib/constants';
import styles from './FlipBoard.module.css';

const CYCLE_INTERVAL = 2500; // ms between language changes
const CHAR_STAGGER = 35; // ms delay per character

// Pad strings to same length for consistent tile count
const maxLen = Math.max(...FLIPBOARD_WORDS.map(w => [...w.text].length));

export default function FlipBoard() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState(0);
  const [isFlipping, setIsFlipping] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);

  // Cycle through languages
  useEffect(() => {
    const timer = setInterval(() => {
      setPrevIndex(currentIndex);
      setCurrentIndex(prev => (prev + 1) % FLIPBOARD_WORDS.length);
      setIsFlipping(true);

      // Reset flipping state after all tiles have finished
      const resetTimer = setTimeout(() => setIsFlipping(false), maxLen * CHAR_STAGGER + 400);
      return () => clearTimeout(resetTimer);
    }, CYCLE_INTERVAL);

    return () => clearInterval(timer);
  }, [currentIndex]);

  // Play tick sound per character flip
  const playTick = useCallback((delay: number) => {
    if (!audioCtxRef.current) {
      try {
        audioCtxRef.current = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      } catch {
        return; // Audio not supported
      }
    }

    const ctx = audioCtxRef.current;
    if (ctx.state === 'suspended') ctx.resume();

    setTimeout(() => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.frequency.value = 800 + Math.random() * 200;
      osc.type = 'square';
      gain.gain.value = 0.04;
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.03);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.03);
    }, delay);
  }, []);

  // Trigger tick sounds when flipping
  useEffect(() => {
    if (!isFlipping) return;
    const currentChars = [...FLIPBOARD_WORDS[currentIndex].text];
    currentChars.forEach((_, i) => {
      playTick(i * CHAR_STAGGER);
    });
  }, [isFlipping, currentIndex, playTick]);

  const currentWord = FLIPBOARD_WORDS[currentIndex];
  const prevWord = FLIPBOARD_WORDS[prevIndex];
  const currentChars = [...currentWord.text];
  const prevChars = [...prevWord.text];

  // Pad to maxLen
  while (currentChars.length < maxLen) currentChars.push(' ');
  while (prevChars.length < maxLen) prevChars.push(' ');

  return (
    <div className={styles.container} role="heading" aria-level={1} aria-label="Namaste greeting">
      <div className={styles.board}>
        {currentChars.map((char, i) => {
          const prevChar = prevChars[i] || ' ';
          const changed = char !== prevChar || isFlipping;

          return (
            <div
              key={`tile-${i}`}
              className={`${styles.tile} ${changed && isFlipping ? styles.flipping : ''}`}
              style={{
                animationDelay: `${i * CHAR_STAGGER}ms`,
                fontFamily: currentWord.font,
              } as React.CSSProperties}
            >
              {/* Top half */}
              <div className={styles.tileTop}>
                <span
                  className={styles.tileChar}
                  style={{ fontFamily: changed && isFlipping ? prevWord.font : currentWord.font }}
                >
                  {changed && isFlipping ? prevChar : char}
                </span>
              </div>

              {/* Bottom half */}
              <div className={styles.tileBottom}>
                <span className={styles.tileChar} style={{ fontFamily: currentWord.font }}>
                  {char}
                </span>
              </div>

              {/* Flap overlay (animated) */}
              {changed && isFlipping && (
                <div
                  className={styles.flap}
                  style={{ animationDelay: `${i * CHAR_STAGGER}ms` }}
                >
                  <div className={styles.flapFront}>
                    <span className={styles.tileChar} style={{ fontFamily: prevWord.font }}>
                      {prevChar}
                    </span>
                  </div>
                  <div className={styles.flapBack}>
                    <span className={styles.tileChar} style={{ fontFamily: currentWord.font }}>
                      {char}
                    </span>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Language indicator */}
      <div className={styles.langLabel}>
        {currentWord.lang}
      </div>
    </div>
  );
}
