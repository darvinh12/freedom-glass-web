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
      style={{ position: 'fixed', top: 0, left: 0, height: '3px', width: `${progress}%`,
        background: 'var(--color-accent)', zIndex: 200, transition: 'width 0.1s linear', pointerEvents: 'none' }}
      role="progressbar" aria-valuenow={Math.round(progress)} aria-valuemin={0} aria-valuemax={100}
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
    const onMove = (e: MouseEvent) => { pos.current = { x: e.clientX, y: e.clientY }; };
    window.addEventListener('mousemove', onMove);
    const animate = () => {
      if (dotRef.current)
        dotRef.current.style.transform = `translate(${pos.current.x - 4}px, ${pos.current.y - 4}px)`;
      ringPos.current.x += (pos.current.x - ringPos.current.x) * 0.22;
      ringPos.current.y += (pos.current.y - ringPos.current.y) * 0.22;
      if (ringRef.current)
        ringRef.current.style.transform = `translate(${ringPos.current.x - 20}px, ${ringPos.current.y - 20}px)`;
      raf.current = requestAnimationFrame(animate);
    };
    raf.current = requestAnimationFrame(animate);
    const onEnter = () => ringRef.current?.classList.add('hover');
    const onLeave = () => ringRef.current?.classList.remove('hover');
    document.querySelectorAll('a, button, [data-cursor-hover]').forEach(el => {
      el.addEventListener('mouseenter', onEnter);
      el.addEventListener('mouseleave', onLeave);
    });
    return () => { window.removeEventListener('mousemove', onMove); cancelAnimationFrame(raf.current); };
  }, []);

  return (
    <>
      <div ref={dotRef} className="cursor-dot" aria-hidden="true" />
      <div ref={ringRef} className="cursor-ring" aria-hidden="true" />
      <style>{`
        .cursor-dot { position:fixed;top:0;left:0;width:8px;height:8px;background:#0a0a0a;border-radius:50%;pointer-events:none;z-index:9999;will-change:transform;box-shadow:0 0 8px 3px rgba(255,255,255,0.55),0 0 2px 1px rgba(255,255,255,0.9); }
        .cursor-ring { position:fixed;top:0;left:0;width:40px;height:40px;border:1.5px solid #0a0a0a;border-radius:50%;pointer-events:none;z-index:9998;will-change:transform;transition:width .2s,height .2s,opacity .2s,border-color .2s,box-shadow .2s;opacity:.8;box-shadow:0 0 10px 2px rgba(255,255,255,0.35),0 0 1px 1px rgba(255,255,255,0.6); }
        .cursor-ring.hover { width:56px;height:56px;opacity:1;border-color:#0a0a0a;box-shadow:0 0 16px 4px rgba(255,255,255,0.5),0 0 2px 1px rgba(255,255,255,0.8); }
      `}</style>
    </>
  );
}

// Two ambient gradient blobs — pure radial-gradient, NO filter:blur (expensive)
function AmbientOrbs() {
  return (
    <>
      <div aria-hidden="true" className="ambient-orbs">
        <div className="orb orb-1" />
        <div className="orb orb-2" />
      </div>
      <style>{`
        .ambient-orbs { position:fixed;inset:0;z-index:0;pointer-events:none;overflow:hidden; }
        .orb { position:absolute;border-radius:50%; }
        .orb-1 {
          width:900px;height:900px;
          background:radial-gradient(circle at center,rgba(31,96,168,.12) 0%,rgba(31,96,168,.04) 45%,transparent 70%);
          top:-25%;left:-15%;
          animation:orbDrift1 32s ease-in-out infinite;
        }
        .orb-2 {
          width:750px;height:750px;
          background:radial-gradient(circle at center,rgba(0,40,104,.10) 0%,rgba(0,40,104,.03) 45%,transparent 70%);
          bottom:-20%;right:-10%;
          animation:orbDrift2 28s ease-in-out infinite;
          animation-delay:-14s;
        }
        @keyframes orbDrift1 {
          0%,100%{transform:translate(0,0);}
          40%{transform:translate(60px,-50px);}
          70%{transform:translate(-30px,40px);}
        }
        @keyframes orbDrift2 {
          0%,100%{transform:translate(0,0);}
          35%{transform:translate(-70px,35px);}
          65%{transform:translate(45px,-60px);}
        }
        @media(prefers-reduced-motion:reduce){.orb{animation:none;}}
      `}</style>
    </>
  );
}

export default function GlobalEffects() {
  // Lenis smooth scroll — only on pointer:fine (mouse) devices
  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return;
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    let rafId: number;
    const raf = (time: number) => { lenis.raf(time); rafId = requestAnimationFrame(raf); };
    rafId = requestAnimationFrame(raf);
    return () => { lenis.destroy(); cancelAnimationFrame(rafId); };
  }, []);

  // Reveal observer — blur-reveal + all directional variants
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>(
      '.blur-reveal, .reveal, .reveal-left, .reveal-right, .reveal-scale'
    );
    if (!els.length) return;
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); }
      });
    }, { threshold: 0.12 });
    els.forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);

  // Stagger observer — cascades .visible onto grid children with 80ms delay
  useEffect(() => {
    const grids = document.querySelectorAll<HTMLElement>('.stagger-grid');
    if (!grids.length) return;
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (!e.isIntersecting) return;
        const children = [...e.target.children] as HTMLElement[];
        children.forEach((child, i) => {
          setTimeout(() => child.classList.add('visible'), Math.min(i, 7) * 80);
        });
        io.unobserve(e.target);
      });
    }, { threshold: 0.08 });
    grids.forEach(g => io.observe(g));
    return () => io.disconnect();
  }, []);

  return (
    <>
      <AmbientOrbs />
      <ScrollProgress />
      <CustomCursor />
    </>
  );
}
