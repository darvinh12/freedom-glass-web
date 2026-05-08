import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { portfolioCategories } from '../../data/portfolio';

const slides = portfolioCategories
  .filter(cat => ['frameless-90', 'frameless-80', 'mirrors', 'commercial', 'angled-showers', 'frameless-doors', 'tub-glass'].includes(cat.id))
  .flatMap(cat =>
    cat.images.slice(0, 2).map(img => ({ ...img, category: cat.name, label: cat.label }))
  );

const INTERVAL_MS = 4500;

export default function PortfolioSlider() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const total = slides.length;

  const next = useCallback(() => setCurrent(i => (i + 1) % total), [total]);
  const prev = useCallback(() => setCurrent(i => (i - 1 + total) % total), [total]);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(next, INTERVAL_MS);
    return () => clearInterval(t);
  }, [paused, next]);

  return (
    <section className="portfolio-section" aria-labelledby="portfolio-slider-title">
      {/* Header — outside the slider */}
      <div className="portfolio-header">
        <p className="eyebrow">Our Work</p>
        <h2 id="portfolio-slider-title" className="section-title">
          Over 500 Projects Completed
        </h2>
        <p className="section-subtitle">
          Each installation is measured, templated, and built with precision.
          Premium glass, professional results.
        </p>
      </div>

      {/* Full-width slider */}
      <div
        className="slider-container"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {/* Images */}
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            className="slide"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7, ease: 'easeInOut' }}
          >
            <img
              src={slides[current].src}
              alt={slides[current].alt}
              className="slide-img"
              loading="lazy"
            />
            {/* Dark gradient overlay */}
            <div className="slide-overlay" />

            {/* Category badge — bottom left */}
            <div className="slide-info">
              <span className="slide-category">{slides[current].label}</span>
              <span className="slide-counter">{current + 1} / {total}</span>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Arrow buttons */}
        <button className="arrow arrow-left" onClick={prev} aria-label="Previous">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6"/>
          </svg>
        </button>
        <button className="arrow arrow-right" onClick={next} aria-label="Next">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6"/>
          </svg>
        </button>

        {/* Dot navigation */}
        <div className="dots" role="tablist">
          {slides.map((_, i) => (
            <button
              key={i}
              role="tab"
              aria-selected={i === current}
              aria-label={`Slide ${i + 1}`}
              className={`dot ${i === current ? 'active' : ''}`}
              onClick={() => setCurrent(i)}
            />
          ))}
        </div>

        {/* Progress bar */}
        <div className="progress-track">
          <motion.div
            key={`prog-${current}`}
            className="progress-fill"
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{ duration: paused ? 0 : INTERVAL_MS / 1000, ease: 'linear' }}
          />
        </div>
      </div>

      {/* CTA below slider */}
      <div className="portfolio-cta">
        <a href="/portfolio" className="btn-primary">
          View Full Portfolio
        </a>
        <a href="/contact" className="btn-ghost">
          Request a Custom Project
        </a>
      </div>

      <style>{`
        .portfolio-section {
          padding-block: 5rem 0;
        }
        .portfolio-header {
          text-align: center;
          max-width: 640px;
          margin: 0 auto 3rem;
          padding-inline: 2rem;
        }
        .eyebrow {
          font-size: 0.75rem;
          font-weight: 600;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: var(--color-gold);
          margin-bottom: 0.75rem;
        }
        .section-title {
          font-family: var(--font-display);
          font-size: clamp(1.8rem, 3.5vw, 2.75rem);
          font-weight: 700;
          color: var(--text);
          margin-bottom: 1rem;
          line-height: 1.15;
        }
        .section-subtitle {
          color: var(--text-muted);
          line-height: 1.7;
          font-size: 1rem;
        }

        /* === FULL-WIDTH SLIDER === */
        .slider-container {
          position: relative;
          width: 100%;
          height: clamp(420px, 65vh, 760px);
          overflow: hidden;
          background: var(--bg-card);
        }
        .slide {
          position: absolute;
          inset: 0;
        }
        .slide-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
          display: block;
        }
        .slide-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to top,
            rgba(13, 17, 23, 0.75) 0%,
            rgba(13, 17, 23, 0.15) 50%,
            transparent 100%
          );
        }

        /* Category info bottom-left */
        .slide-info {
          position: absolute;
          bottom: 4rem;
          left: 2rem;
          display: flex;
          align-items: center;
          gap: 1rem;
        }
        .slide-category {
          font-family: var(--font-display);
          font-size: clamp(1rem, 2vw, 1.4rem);
          font-weight: 600;
          color: #ffffff;
          letter-spacing: 0.02em;
        }
        .slide-counter {
          font-size: 0.8rem;
          color: rgba(255,255,255,0.5);
          font-weight: 500;
        }

        /* Arrows */
        .arrow {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          z-index: 10;
          width: 48px;
          height: 48px;
          border-radius: 50%;
          background: rgba(13, 17, 23, 0.65);
          border: 1px solid rgba(255,255,255,0.2);
          color: #ffffff;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background 0.2s, border-color 0.2s, transform 0.2s;
          backdrop-filter: blur(8px);
        }
        .arrow:hover {
          background: var(--color-accent);
          border-color: var(--color-accent);
          transform: translateY(-50%) scale(1.1);
        }
        .arrow-left  { left: 1.5rem; }
        .arrow-right { right: 1.5rem; }

        /* Dots */
        .dots {
          position: absolute;
          bottom: 1.5rem;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          gap: 0.5rem;
          z-index: 10;
        }
        .dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          border: none;
          background: rgba(255,255,255,0.35);
          padding: 0;
          transition: background 0.25s, transform 0.25s;
        }
        .dot.active {
          background: var(--color-accent);
          transform: scale(1.5);
        }

        /* Progress */
        .progress-track {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 3px;
          background: rgba(255,255,255,0.1);
          z-index: 10;
        }
        .progress-fill {
          height: 100%;
          background: var(--color-accent);
        }

        /* CTA row */
        .portfolio-cta {
          display: flex;
          gap: 1rem;
          justify-content: center;
          flex-wrap: wrap;
          padding: 3rem 2rem 5rem;
        }
        .btn-primary {
          display: inline-flex;
          align-items: center;
          padding: 0.875rem 2rem;
          background: var(--color-accent);
          color: #ffffff;
          border-radius: var(--radius-sm);
          text-decoration: none;
          font-weight: 700;
          font-size: 0.9rem;
          transition: background 0.2s, transform 0.2s;
          box-shadow: 0 4px 20px rgba(42, 109, 181, 0.35);
        }
        .btn-primary:hover { background: var(--color-accent-hover); transform: translateY(-2px); }
        .btn-ghost {
          display: inline-flex;
          align-items: center;
          padding: 0.875rem 2rem;
          background: transparent;
          color: var(--text);
          border-radius: var(--radius-sm);
          text-decoration: none;
          font-weight: 600;
          font-size: 0.9rem;
          border: 1.5px solid var(--border);
          transition: border-color 0.2s, color 0.2s;
        }
        .btn-ghost:hover { border-color: var(--color-accent); color: var(--color-accent); }

        @media (max-width: 640px) {
          .slider-container { height: 55vw; min-height: 300px; }
          .slide-info { left: 1rem; bottom: 3.5rem; }
          .arrow { width: 38px; height: 38px; }
          .arrow-left  { left: 0.75rem; }
          .arrow-right { right: 0.75rem; }
        }
      `}</style>
    </section>
  );
}
