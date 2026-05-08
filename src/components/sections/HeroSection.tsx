import { motion } from 'framer-motion';

const stagger = {
  container: {
    animate: { transition: { staggerChildren: 0.15, delayChildren: 0.3 } },
  },
  item: {
    initial: { opacity: 0, y: 32 },
    animate: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
    },
  },
};

const floatAnim = {
  initial: { opacity: 0, scale: 0.92 },
  animate: {
    opacity: 1,
    scale: 1,
    transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function HeroSection() {
  return (
    <section className="hero">
      {/* Background image with overlay */}
      <div className="hero-bg" aria-hidden="true">
        <img
          src="/assets/portfolio/frameless-90/corner-showers-1.webp"
          alt=""
          className="hero-bg-img"
          fetchPriority="high"
        />
        <div className="hero-overlay" />
      </div>

      {/* Glassmorphism floating badge */}
      <motion.div
        className="hero-badge glass"
        {...floatAnim}
        style={{ animationDelay: '0.8s' }}
      >
        <span className="stars" aria-hidden="true">★★★★★</span>
        <span>4.9/5 — 40 Google Reviews</span>
      </motion.div>

      {/* Main content */}
      <motion.div
        className="hero-content"
        variants={stagger.container}
        initial="initial"
        animate="animate"
      >
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
          <a href="/contact" className="btn-hero-primary">
            Get a Free Quote
          </a>
          <a href="/portfolio" className="btn-hero-secondary">
            View Our Work
          </a>
        </motion.div>

        {/* Trust signals */}
        <motion.div variants={stagger.item} className="hero-trust">
          <span>✓ Free Estimates</span>
          <span>✓ Licensed & Insured</span>
          <span>✓ Serving All DFW</span>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="scroll-indicator"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0, transition: { delay: 1.5, duration: 0.6 } }}
        aria-hidden="true"
      >
        <div className="scroll-dot" />
      </motion.div>

      <style>{`
        .hero {
          position: relative;
          min-height: 100svh;
          display: flex;
          align-items: center;
          overflow: hidden;
        }
        .hero-bg {
          position: absolute;
          inset: 0;
          z-index: 0;
        }
        .hero-bg-img {
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
            rgba(13, 17, 23, 0.90) 0%,
            rgba(0, 40, 104, 0.50) 50%,
            rgba(13, 17, 23, 0.35) 100%
          );
        }
        html.light .hero-overlay {
          background: linear-gradient(
            135deg,
            rgba(255, 255, 255, 0.88) 0%,
            rgba(0, 40, 104, 0.25) 50%,
            rgba(255, 255, 255, 0.3) 100%
          );
        }
        .hero-badge {
          position: absolute;
          top: 7rem;
          right: 2rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.625rem 1rem;
          border-radius: 999px;
          font-size: 0.8rem;
          font-weight: 500;
          color: var(--text);
          z-index: 2;
        }
        .hero-content {
          position: relative;
          z-index: 1;
          max-width: 1280px;
          margin: 0 auto;
          padding: 8rem 2rem 6rem;
          width: 100%;
        }
        .hero-eyebrow {
          font-size: 0.8rem;
          font-weight: 600;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: var(--color-gold);
          margin-bottom: 1rem;
        }
        .hero-title {
          font-family: var(--font-display);
          font-size: clamp(2.8rem, 6vw, 5rem);
          font-weight: 700;
          line-height: 1.1;
          color: var(--text);
          max-width: 700px;
          margin-bottom: 1.5rem;
        }
        .hero-subtitle {
          font-size: clamp(1rem, 2vw, 1.2rem);
          color: var(--text-muted);
          max-width: 560px;
          line-height: 1.7;
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
          padding: 1rem 2rem;
          background: var(--color-red);
          color: #ffffff;
          font-weight: 700;
          font-size: 0.95rem;
          border-radius: var(--radius-sm);
          text-decoration: none;
          transition: background 0.2s, transform 0.2s, box-shadow 0.2s;
          box-shadow: 0 4px 24px rgba(191, 10, 48, 0.35);
        }
        .btn-hero-primary:hover {
          background: var(--color-red-hover);
          transform: translateY(-2px);
          box-shadow: 0 8px 32px rgba(191, 10, 48, 0.5);
        }
        .btn-hero-secondary {
          display: inline-flex;
          align-items: center;
          padding: 1rem 2rem;
          background: transparent;
          color: var(--text);
          font-weight: 600;
          font-size: 0.95rem;
          border-radius: var(--radius-sm);
          border: 1.5px solid rgba(255,255,255,0.3);
          text-decoration: none;
          transition: border-color 0.2s, color 0.2s, background 0.2s;
        }
        .btn-hero-secondary:hover {
          border-color: var(--color-gold);
          color: var(--color-gold);
          background: rgba(255, 215, 0, 0.06);
        }
        .hero-trust {
          display: flex;
          gap: 1.5rem;
          flex-wrap: wrap;
          font-size: 0.8rem;
          color: var(--text-muted);
          font-weight: 500;
        }
        .scroll-indicator {
          position: absolute;
          bottom: 2rem;
          left: 50%;
          transform: translateX(-50%);
          z-index: 2;
        }
        .scroll-dot {
          width: 24px;
          height: 40px;
          border: 2px solid rgba(191, 10, 48, 0.4);
          border-radius: 12px;
          position: relative;
        }
        .scroll-dot::after {
          content: '';
          position: absolute;
          top: 6px;
          left: 50%;
          transform: translateX(-50%);
          width: 4px;
          height: 8px;
          background: var(--color-red);
          border-radius: 2px;
          animation: scrollDot 1.5s ease-in-out infinite;
        }
        @keyframes scrollDot {
          0%, 100% { transform: translateX(-50%) translateY(0); opacity: 1; }
          50% { transform: translateX(-50%) translateY(10px); opacity: 0.3; }
        }
        @media (max-width: 768px) {
          .hero-badge { display: none; }
          .hero-content { padding: 7rem 1.5rem 5rem; }
        }
      `}</style>
    </section>
  );
}
