'use client';

import { useRef, useEffect, useState, useCallback } from 'react';
import PageShell from '@/components/layout/PageShell';
import styles from './page.module.css';

const COLORS = ['#f2e903', '#ff0d0d', '#0027f5', '#40c549', '#7419c5', '#ffffff'];

export default function GamePage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState(COLORS[0]);
  const [brushSize, setBrushSize] = useState(4);

  const getCtx = useCallback(() => {
    return canvasRef.current?.getContext('2d') ?? null;
  }, []);

  // Resize canvas to fit
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resize = () => {
      const rect = canvas.parentElement?.getBoundingClientRect();
      if (!rect) return;
      canvas.width = rect.width;
      canvas.height = rect.height;

      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.fillStyle = '#111';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
    };

    resize();
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, []);

  const startDraw = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    setIsDrawing(true);
    const ctx = getCtx();
    if (!ctx) return;

    const rect = canvasRef.current!.getBoundingClientRect();
    const pos = 'touches' in e
      ? { x: e.touches[0].clientX - rect.left, y: e.touches[0].clientY - rect.top }
      : { x: (e as React.MouseEvent).clientX - rect.left, y: (e as React.MouseEvent).clientY - rect.top };

    ctx.beginPath();
    ctx.moveTo(pos.x, pos.y);
  }, [getCtx]);

  const draw = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing) return;
    const ctx = getCtx();
    if (!ctx) return;

    const rect = canvasRef.current!.getBoundingClientRect();
    const pos = 'touches' in e
      ? { x: e.touches[0].clientX - rect.left, y: e.touches[0].clientY - rect.top }
      : { x: (e as React.MouseEvent).clientX - rect.left, y: (e as React.MouseEvent).clientY - rect.top };

    ctx.strokeStyle = color;
    ctx.lineWidth = brushSize;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.lineTo(pos.x, pos.y);
    ctx.stroke();
  }, [isDrawing, color, brushSize, getCtx]);

  const stopDraw = useCallback(() => {
    setIsDrawing(false);
  }, []);

  const clearCanvas = useCallback(() => {
    const ctx = getCtx();
    const canvas = canvasRef.current;
    if (!ctx || !canvas) return;
    ctx.fillStyle = '#111';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }, [getCtx]);

  return (
    <PageShell title="Scribble" accentColor="#f2e903">
      <div className={styles.game}>
        {/* Toolbar */}
        <div className={styles.toolbar}>
          <div className={styles.colors}>
            {COLORS.map((c) => (
              <button
                key={c}
                className={`${styles.colorBtn} ${c === color ? styles.colorActive : ''}`}
                style={{ background: c }}
                onClick={() => setColor(c)}
                aria-label={`Color ${c}`}
              />
            ))}
          </div>

          <div className={styles.brushControl}>
            <span className={styles.brushLabel}>Size</span>
            <input
              type="range"
              min="1"
              max="20"
              value={brushSize}
              onChange={(e) => setBrushSize(Number(e.target.value))}
              className={styles.brushSlider}
            />
          </div>

          <button className={styles.clearBtn} onClick={clearCanvas}>
            Clear
          </button>
        </div>

        {/* Canvas */}
        <div className={styles.canvasWrapper}>
          <canvas
            ref={canvasRef}
            className={styles.canvas}
            onMouseDown={startDraw}
            onMouseMove={draw}
            onMouseUp={stopDraw}
            onMouseLeave={stopDraw}
            onTouchStart={startDraw}
            onTouchMove={draw}
            onTouchEnd={stopDraw}
          />
        </div>

        <p className={styles.prompt}>
          Draw something fun! ✨
        </p>
      </div>
    </PageShell>
  );
}
