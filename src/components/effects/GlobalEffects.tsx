import { useEffect, useRef, useState } from 'react';
import Lenis from 'lenis';

function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const update = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0);
    };
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, []);

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        height: '3px',
        width: `${progress}%`,
        background: 'var(--color-accent)',
        zIndex: 200,
        transition: 'width 0.1s linear',
        pointerEvents: 'none',
      }}
      role="progressbar"
      aria-valuenow={Math.round(progress)}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="Page scroll progress"
    />
  );
}

function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });
  const raf = useRef<number>(0);

  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return;

    const onMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener('mousemove', onMove);

    const animate = () => {
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${pos.current.x - 4}px, ${pos.current.y - 4}px)`;
      }
      ringPos.current.x += (pos.current.x - ringPos.current.x) * 0.22;
      ringPos.current.y += (pos.current.y - ringPos.current.y) * 0.22;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ringPos.current.x - 20}px, ${ringPos.current.y - 20}px)`;
      }
      raf.current = requestAnimationFrame(animate);
    };
    raf.current = requestAnimationFrame(animate);

    const onEnter = () => ringRef.current?.classList.add('hover');
    const onLeave = () => ringRef.current?.classList.remove('hover');
    const targets = document.querySelectorAll('a, button, [data-cursor-hover]');
    targets.forEach(el => {
      el.addEventListener('mouseenter', onEnter);
      el.addEventListener('mouseleave', onLeave);
    });

    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(raf.current);
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="cursor-dot" aria-hidden="true" />
      <div ref={ringRef} className="cursor-ring" aria-hidden="true" />
      <style>{`
        .cursor-dot {
          position: fixed;
          top: 0; left: 0;
          width: 8px; height: 8px;
          background: var(--color-accent);
          border-radius: 50%;
          pointer-events: none;
          z-index: 9999;
          will-change: transform;
        }
        .cursor-ring {
          position: fixed;
          top: 0; left: 0;
          width: 40px; height: 40px;
          border: 1.5px solid var(--color-accent);
          border-radius: 50%;
          pointer-events: none;
          z-index: 9998;
          will-change: transform;
          transition: width 0.2s, height 0.2s, opacity 0.2s, border-color 0.2s;
          opacity: 0.5;
        }
        .cursor-ring.hover {
          width: 56px; height: 56px;
          opacity: 1;
          border-color: var(--color-accent-hover);
        }
      `}</style>
    </>
  );
}

function AmbientOrbs() {
  return (
    <>
      <div aria-hidden="true" className="ambient-orbs">
        <div className="orb orb-1" />
        <div className="orb orb-2" />
        <div className="orb orb-3" />
      </div>
      <style>{`
        .ambient-orbs {
          position: fixed;
          inset: 0;
          z-index: 0;
          pointer-events: none;
          overflow: hidden;
        }
        .orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
          will-change: transform;
        }
        .orb-1 {
          width: 700px; height: 700px;
          background: radial-gradient(circle, rgba(31, 96, 168, 0.14) 0%, transparent 65%);
          top: -20%; left: -12%;
          animation: orbDrift1 30s ease-in-out infinite;
        }
        .orb-2 {
          width: 600px; height: 600px;
          background: radial-gradient(circle, rgba(0, 40, 104, 0.12) 0%, transparent 65%);
          bottom: -12%; right: -8%;
          animation: orbDrift2 26s ease-in-out infinite;
          animation-delay: -10s;
        }
        .orb-3 {
          width: 450px; height: 450px;
          background: radial-gradient(circle, rgba(31, 96, 168, 0.07) 0%, transparent 65%);
          top: 45%; left: 55%;
          animation: orbDrift3 38s ease-in-out infinite;
          animation-delay: -18s;
        }
        @keyframes orbDrift1 {
          0%, 100% { transform: translate(0, 0); }
          40%       { transform: translate(55px, -45px); }
          70%       { transform: translate(-25px, 35px); }
        }
        @keyframes orbDrift2 {
          0%, 100% { transform: translate(0, 0); }
          35%       { transform: translate(-65px, 30px); }
          65%       { transform: translate(40px, -55px); }
        }
        @keyframes orbDrift3 {
          0%, 100% { transform: translate(0, 0); }
          30%       { transform: translate(30px, 40px); }
          60%       { transform: translate(-40px, -20px); }
        }
        @media (prefers-reduced-motion: reduce) {
          .orb { animation: none; }
        }
      `}</style>
    </>
  );
}

function GrainOverlay() {
  return (
    <>
      <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true">
        <filter id="pg-grain">
          <feTurbulence type="fractalNoise" baseFrequency="0.72" numOctaves="4" stitchTiles="stitch" result="noise" />
          <feColorMatrix type="saturate" values="0" in="noise" />
        </filter>
      </svg>
      <div
        aria-hidden="true"
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 9990,
          pointerEvents: 'none',
          opacity: 0.032,
          filter: 'url(#pg-grain)',
          background: 'white',
        }}
      />
    </>
  );
}

export default function GlobalEffects() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    let rafId: number;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <>
      <AmbientOrbs />
      <GrainOverlay />
      <ScrollProgress />
      <CustomCursor />
    </>
  );
}
