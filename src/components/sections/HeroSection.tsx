import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

const heroSlides = [
  { src: '/assets/portfolio/frameless-90/corner-showers-1.webp',    alt: 'Frameless glass shower enclosure 90°', label: 'Frameless Shower Doors' },
  { src: '/assets/portfolio/commercial/Commercial-Glass-1.webp',    alt: 'Modern office glass partition',        label: 'Commercial Partitions' },
  { src: '/assets/portfolio/mirrors/custom-mirrors-3.webp',         alt: 'Custom mirror wall installation',     label: 'Custom Mirrors' },
  { src: '/assets/portfolio/frameless-80/Imagen-de-WhatsApp-2023-10-24-a-las-14.05.21-scaled-1.webp', alt: '80° frameless shower glass', label: 'Custom Enclosures' },
  { src: '/assets/portfolio/frameless-90/IMG_7786.jpeg.webp',       alt: 'Premium frameless glass shower',      label: 'Premium Installations' },
];

const INTERVAL_MS = 5000;

const stagger = {
  container: { animate: { transition: { staggerChildren: 0.15, delayChildren: 0.4 } } },
  item: {
    initial: { opacity: 0, y: 32 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
  },
};

export default function HeroSection() {
  const [current, setCurrent] = useState(0);

  // Autoplay
  useEffect(() => {
    const timer = setInterval(() => setCurrent(i => (i + 1) % heroSlides.length), INTERVAL_MS);
    return () => clearInterval(timer);
  }, []);

  // Parallax + progressive blur on scroll (desktop pointer devices only)
  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return;

    const bg   = document.querySelector<HTMLElement>('.hero-bg');
    const hero = document.querySelector<HTMLElement>('.hero');
    if (!bg || !hero) return;

    let rafId  = 0;
    let pending = false;

    const update = () => {
      const y = window.scrollY;
      const h = hero.offsetHeight;
      if (y < h + 100) {
        // translateY: bg moves 12% of scroll speed (subtle parallax, mathematically safe)
        const py   = y * 0.12;
        // blur: 0px at top → 20px when hero fully scrolled
        const blur = Math.min((y / h) * 20, 20);
        // brightness: dims slightly as you scroll away
        const bri  = Math.max(1 - (y / h) * 0.25, 0.75);
        bg.style.transform = `translateY(${py}px)`;
        bg.style.filter    = `blur(${blur}px) brightness(${bri})`;
      } else {
        bg.style.transform = '';
        bg.style.filter    = '';
      }
      pending = false;
    };

    const onScroll = () => {
      if (!pending) { pending = true; rafId = requestAnimationFrame(update); }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => { window.removeEventListener('scroll', onScroll); cancelAnimationFrame(rafId); };
  }, []);

  return (
    <section className="hero">
      {/* Background — extended above for parallax buffer */}
      <div className="hero-bg" aria-hidden="true">
        <AnimatePresence mode="wait">
          <motion.img
            key={current}
            src={heroSlides[current].src}
            alt={heroSlides[current].alt}
            className="hero-bg-img"
            fetchPriority={current === 0 ? 'high' : 'low'}
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 1.0, ease: 'easeInOut' }}
          />
        </AnimatePresence>
        <div className="hero-overlay" />
      </div>

      {/* Shimmer — sibling of hero-bg so it's not blurred by parallax filter */}
      <div className="hero-shimmer" aria-hidden="true" />

      {/* Category label */}
      <AnimatePresence mode="wait">
        <motion.div key={`label-${current}`} className="hero-label glass"
          initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 8 }} transition={{ duration: 0.4 }}>
          <span className="stars" aria-hidden="true">★★★★★</span>
          <span>{heroSlides[current].label}</span>
        </motion.div>
      </AnimatePresence>

      {/* Main content */}
      <motion.div className="hero-content" variants={stagger.container} initial="initial" animate="animate">
        <motion.p variants={stagger.item} className="hero-eyebrow">
          Dallas / Fort Worth Premier Glass Specialists
        </motion.p>
        <motion.h1 variants={stagger.item} className="hero-title">
          Crafted in Glass,{' '}
          <span className="gradient-text">Built to Last</span>
        </motion.h1>
        <motion.p variants={stagger.item} className="hero-subtitle">
          Custom frameless shower doors, mirrors, commercial partitions
          and window replacement — precision installed across the DFW metroplex.
        </motion.p>
        <motion.div variants={stagger.item} className="hero-actions">
          <a href="/contact" className="btn-hero-primary">Get a Free Quote</a>
          <a href="/portfolio" className="btn-hero-secondary">View Our Work</a>
        </motion.div>
        <motion.div variants={stagger.item} className="hero-trust">
          <span>✓ Free Estimates</span>
          <span>✓ Licensed &amp; Insured</span>
          <span>✓ Serving All DFW</span>
          <span>✓ Same-Week Installations</span>
        </motion.div>
      </motion.div>

      {/* Dots */}
      <div className="hero-dots" role="tablist" aria-label="Hero slides">
        {heroSlides.map((slide, i) => (
          <button key={i} role="tab" aria-selected={i === current}
            aria-label={`Go to slide ${i + 1}: ${slide.label}`}
            className={`hero-dot ${i === current ? 'active' : ''}`}
            onClick={() => setCurrent(i)} />
        ))}
      </div>

      {/* Progress bar */}
      <div className="slide-progress" aria-hidden="true">
        <motion.div key={current} className="slide-progress-fill"
          initial={{ width: '0%' }} animate={{ width: '100%' }}
          transition={{ duration: INTERVAL_MS / 1000, ease: 'linear' }} />
      </div>

      <style>{`
        .hero {
          position: relative;
          min-height: 100svh;
          display: flex;
          align-items: center;
          overflow: hidden;
        }

        /* Extended 15% above for parallax buffer — no gap ever */
        .hero-bg {
          position: absolute;
          top: -15%;
          left: 0;
          right: 0;
          height: 130%;
          z-index: 0;
          will-change: transform, filter;
        }
        .hero-bg-img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
        }
        .hero-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            135deg,
            rgba(13,17,23,.88) 0%,
            rgba(0,40,104,.45) 55%,
            rgba(13,17,23,.30) 100%
          );
        }
        html.light .hero-overlay {
          background: linear-gradient(
            135deg,
            rgba(255,255,255,.85) 0%,
            rgba(0,40,104,.20) 55%,
            rgba(255,255,255,.25) 100%
          );
        }

        /* Shimmer — not inside hero-bg so blur on scroll doesn't affect it */
        .hero-shimmer {
          position: absolute;
          top: 0;
          left: -45%;
          width: 38%;
          height: 100%;
          background: linear-gradient(108deg,transparent 30%,rgba(255,255,255,.035) 50%,transparent 70%);
          transform: skewX(-12deg);
          animation: heroShimmer 9s ease-in-out infinite;
          pointer-events: none;
          z-index: 1;
        }
        @keyframes heroShimmer {
          0%,80%,100%{ transform:translateX(-60px) skewX(-12deg);opacity:0; }
          83%         { opacity:1; }
          96%         { transform:translateX(calc(100vw + 200px)) skewX(-12deg);opacity:0; }
        }
        @media(prefers-reduced-motion:reduce){ .hero-shimmer{animation:none;opacity:0;} }

        .hero-label {
          position: absolute;
          top: 7rem;
          right: 2rem;
          display: flex;
          align-items: center;
          gap: .5rem;
          padding: .5rem 1rem;
          border-radius: 999px;
          font-size: .8rem;
          font-weight: 500;
          color: var(--text);
          z-index: 2;
        }
        .hero-content {
          position: relative;
          z-index: 2;
          max-width: 1280px;
          margin: 0 auto;
          padding: 9rem 2rem 7rem;
          width: 100%;
        }
        .hero-eyebrow {
          font-size: .78rem;
          font-weight: 600;
          letter-spacing: .15em;
          text-transform: uppercase;
          color: var(--color-silver);
          margin-bottom: 1rem;
        }
        .hero-title {
          font-family: var(--font-display);
          font-size: clamp(2.8rem,6vw,5rem);
          font-weight: 700;
          line-height: 1.1;
          color: var(--text);
          max-width: 720px;
          margin-bottom: 1.5rem;
        }
        .hero-subtitle {
          font-size: clamp(1rem,2vw,1.15rem);
          color: var(--text-muted);
          max-width: 540px;
          line-height: 1.75;
          margin-bottom: 2.5rem;
        }
        .hero-actions {
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
          margin-bottom: 2rem;
        }
        .btn-hero-primary {
          display: inline-flex;
          align-items: center;
          padding: 1rem 2.25rem;
          background: var(--color-accent);
          color: #fff;
          font-weight: 700;
          font-size: .95rem;
          border-radius: var(--radius-sm);
          text-decoration: none;
          transition: background .25s,transform .25s,box-shadow .25s;
          box-shadow: 0 4px 24px rgba(31,96,168,.4);
        }
        .btn-hero-primary:hover {
          background: var(--color-accent-hover);
          transform: translateY(-2px);
          box-shadow: 0 8px 32px rgba(31,96,168,.55);
        }
        .btn-hero-secondary {
          display: inline-flex;
          align-items: center;
          padding: 1rem 2.25rem;
          background: transparent;
          color: #fff;
          font-weight: 600;
          font-size: .95rem;
          border-radius: var(--radius-sm);
          border: 1.5px solid rgba(255,255,255,.35);
          text-decoration: none;
          transition: border-color .2s,background .2s;
        }
        .btn-hero-secondary:hover {
          border-color: rgba(255,255,255,.7);
          background: rgba(255,255,255,.08);
        }
        html.light .btn-hero-secondary { color:var(--text);border-color:rgba(0,40,104,.3); }
        .hero-trust {
          display: flex;
          gap: 1.5rem;
          flex-wrap: wrap;
          font-size: .8rem;
          color: rgba(255,255,255,.6);
          font-weight: 500;
        }
        html.light .hero-trust { color:var(--text-muted); }
        .hero-dots {
          position: absolute;
          bottom: 4rem;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          gap: .5rem;
          z-index: 2;
        }
        .hero-dot {
          width: 8px;height: 8px;
          border-radius: 50%;
          border: none;
          background: rgba(255,255,255,.3);
          padding: 0;
          transition: background .3s,transform .3s;
        }
        .hero-dot.active { background:var(--color-accent);transform:scale(1.4); }
        .slide-progress {
          position: absolute;
          bottom: 0;left: 0;right: 0;
          height: 2px;
          background: rgba(255,255,255,.1);
          z-index: 3;
        }
        .slide-progress-fill { height:100%;background:var(--color-accent); }
        @media(max-width:768px){
          .hero-label{display:none;}
          .hero-content{padding:7rem 1.5rem 6rem;}
          .hero-dots{bottom:2.5rem;}
        }
        @media(max-width:480px){
          .hero-content{padding:5.5rem 1rem 4rem;}
          .hero-dots{bottom:1.5rem;}
          .hero-trust{gap:0.625rem;font-size:0.72rem;}
          .btn-hero-primary,.btn-hero-secondary{padding:0.75rem 1.25rem;font-size:0.85rem;}
        }
      `}</style>
    </section>
  );
}
