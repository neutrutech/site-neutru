"use client";
import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';

export default function LoadingOverlay() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [visible, setVisible] = useState(false);
  const pathname = usePathname();

  const visibleRef = useRef<boolean>(false);
  useEffect(() => {
    visibleRef.current = visible;
  }, [visible]);

  useEffect(() => {
    // Show/hide overlay helper enforces a minimum visible duration (2s)
    const showStartRef = { current: 0 } as { current: number };
    const minElapsedRef = { current: false } as { current: boolean };
    const completedRef = { current: false } as { current: boolean };
    let minTimer: number | null = null;

    const clearMinTimer = () => {
      if (minTimer !== null) {
        clearTimeout(minTimer);
        minTimer = null;
      }
    };

    const showOverlay = () => {
      if (visible) return;
      setVisible(true);
      showStartRef.current = Date.now();
      minElapsedRef.current = false;
      completedRef.current = false;
      clearMinTimer();
      minTimer = window.setTimeout(() => {
        minElapsedRef.current = true;
        minTimer = null;
        if (completedRef.current) {
          setVisible(false);
        }
      }, 2000);
    };

    const hideOverlay = () => {
      completedRef.current = true;
      if (minElapsedRef.current) {
        setVisible(false);
      }
    };

    // Explicit events from other components only
    const startHandler = () => showOverlay();
    const stopHandler = () => hideOverlay();
    window.addEventListener('processing:start', startHandler);
    window.addEventListener('processing:stop', stopHandler);

    return () => {
      window.removeEventListener('processing:start', startHandler);
      window.removeEventListener('processing:stop', stopHandler);
      clearMinTimer();
    };
  }, [visible]);

  // Hide overlay when pathname changes (navigation completed)
  useEffect(() => {
    if (!visible) return;
    setVisible(false);
  }, [pathname]);

  // Start/stop canvas animation based on visibility
  useEffect(() => {
    if (!visible) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = 256;
    canvas.height = 256;

    let progress = 0;
    const speed = 0.015;
    type Point = { x: number; y: number };
    const trail: Point[] = [];
    let rafId: number | null = null;

    const getPosition = (t: number): Point | null => {
      if (t < 0.25) {
        const p = t / 0.25;
        return { x: 20, y: 236 - (216 * p) };
      } else if (t < 0.5) {
        const p = (t - 0.25) / 0.25;
        return { x: 20 + (216 * p), y: 20 + (216 * p) };
      } else if (t < 0.75) {
        const p = (t - 0.5) / 0.25;
        return { x: 236, y: 236 - (216 * p) };
      } else {
        return null;
      }
    };

    const animate = () => {
      ctx.fillStyle = 'white';
      ctx.fillRect(0, 0, 256, 256);

      const pos = getPosition(progress);

      if (pos) {
        trail.push({ x: pos.x, y: pos.y });

        if (trail.length > 1) {
          ctx.strokeStyle = 'black';
          ctx.lineWidth = 30;
          ctx.lineCap = 'round';
          ctx.lineJoin = 'round';

          ctx.beginPath();
          ctx.moveTo(trail[0].x, trail[0].y);

          for (let i = 1; i < trail.length; i++) {
            ctx.lineTo(trail[i].x, trail[i].y);
          }

          ctx.stroke();
        }

        ctx.fillStyle = 'black';
        ctx.beginPath();
        ctx.arc(pos.x, pos.y, 22, 0, Math.PI * 2);
        ctx.fill();
      }

      progress += speed;
      if (progress >= 1) {
        progress = 0;
        trail.length = 0;
      }

      rafId = requestAnimationFrame(animate);
    };

    rafId = requestAnimationFrame(animate);

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [visible]);

  if (!visible) return null;

  return (
    <div
      className="fixed inset-0 bg-black flex items-center justify-center z-[99999] pointer-events-auto"
      style={{ zIndex: 99999 }}
    >
      <div className="bg-white p-1 rounded shadow-2xl animate-spin-once">
        <canvas 
          ref={canvasRef}
          className="w-12 h-12"
          style={{ imageRendering: 'auto' }}
        />
      </div>
      
      <style jsx>{`
        @keyframes spin-once {
          0% {
            transform: rotate(0deg);
          }
          13.33% {
            transform: rotate(360deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
        
        .animate-spin-once {
          animation: spin-once 3s ease-out infinite;
        }
      `}</style>
    </div>
  );

}