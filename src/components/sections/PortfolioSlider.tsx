import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { portfolioCategories } from '../../data/portfolio';

const featured = portfolioCategories
  .filter(cat => ['frameless-90', 'frameless-80', 'mirrors', 'commercial', 'angled-showers'].includes(cat.id))
  .flatMap(cat => cat.images.slice(0, 3).map(img => ({ ...img, category: cat.name })));

export default function PortfolioSlider() {
  const [current, setCurrent] = useState(0);
  const total = featured.length;

  const prev = () => setCurrent(i => (i - 1 + total) % total);
  const next = () => setCurrent(i => (i + 1) % total);

  return (
    <section className="portfolio-slider-section" aria-labelledby="portfolio-preview-title">
      <div className="portfolio-slider-header">
        <p className="eyebrow">Our Work</p>
        <h2 id="portfolio-preview-title" className="section-title">
          Over 500 Projects Completed
        </h2>
        <p className="section-subtitle">
          Each installation is measured, templated, and installed with precision.
          Browse a sample of our recent work.
        </p>
      </div>

      <div className="slider-wrap">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            className="slide"
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -60 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <img
              src={featured[current].src}
              alt={featured[current].alt}
              className="slide-img"
              loading="lazy"
            />
            <div className="slide-caption glass">
              <span>{featured[current].category}</span>
              <span className="slide-counter">{current + 1} / {total}</span>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Thumbnails */}
        <div className="thumbnails">
          {featured.slice(0, 8).map((img, i) => (
            <button
              key={i}
              className={`thumb ${i === current ? 'active' : ''}`}
              onClick={() => setCurrent(i)}
              aria-label={`View ${img.alt}`}
            >
              <img src={img.src} alt="" loading="lazy" />
            </button>
          ))}
        </div>

        {/* Controls */}
        <div className="slider-controls">
          <button onClick={prev} className="ctrl-btn" aria-label="Previous image">←</button>
          <button onClick={next} className="ctrl-btn" aria-label="Next image">→</button>
        </div>
      </div>

      <div className="portfolio-cta">
        <a href="/portfolio" className="btn-accent">
          View Full Portfolio
        </a>
      </div>

      <style>{`
        .portfolio-slider-section {
          padding-block: 6rem;
          max-width: 1280px;
          margin: 0 auto;
          padding-inline: 2rem;
        }
        .portfolio-slider-header {
          text-align: center;
          max-width: 640px;
          margin: 0 auto 3rem;
        }
        .eyebrow {
          font-size: 0.75rem;
          font-weight: 600;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: var(--color-accent);
          margin-bottom: 0.75rem;
        }
        .section-title {
          font-family: var(--font-display);
          font-size: clamp(1.8rem, 3.5vw, 2.75rem);
          font-weight: 700;
          color: var(--text);
          margin-bottom: 1rem;
        }
        .section-subtitle {
          color: var(--text-muted);
          line-height: 1.7;
        }
        .slider-wrap {
          position: relative;
          max-width: 900px;
          margin: 0 auto;
        }
        .slide {
          position: relative;
          border-radius: var(--radius-lg);
          overflow: hidden;
          aspect-ratio: 16/9;
          background: var(--bg-card);
        }
        .slide-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .slide-caption {
          position: absolute;
          bottom: 1rem;
          left: 1rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 2rem;
          padding: 0.5rem 1rem;
          border-radius: 999px;
          font-size: 0.8rem;
          font-weight: 500;
          color: var(--text);
        }
        .slide-counter { color: var(--text-muted); }
        .thumbnails {
          display: flex;
          gap: 0.5rem;
          margin-top: 1rem;
          overflow-x: auto;
          padding-bottom: 0.25rem;
          scrollbar-width: thin;
        }
        .thumb {
          flex-shrink: 0;
          width: 72px;
          height: 52px;
          border-radius: var(--radius-sm);
          overflow: hidden;
          border: 2px solid transparent;
          background: none;
          padding: 0;
          transition: border-color 0.2s;
        }
        .thumb.active { border-color: var(--color-accent); }
        .thumb img { width: 100%; height: 100%; object-fit: cover; }
        .slider-controls {
          position: absolute;
          top: 50%;
          left: 0;
          right: 0;
          transform: translateY(-50%);
          display: flex;
          justify-content: space-between;
          pointer-events: none;
          padding: 0 -1rem;
        }
        .ctrl-btn {
          pointer-events: all;
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background: rgba(10,10,15,0.7);
          border: 1px solid var(--border);
          color: var(--text);
          font-size: 1.1rem;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background 0.2s, border-color 0.2s;
          transform: translateX(-50%);
        }
        .ctrl-btn:last-child { transform: translateX(50%); }
        .ctrl-btn:hover { background: var(--color-accent); border-color: var(--color-accent); color: #0a0a0f; }
        .portfolio-cta {
          text-align: center;
          margin-top: 2.5rem;
        }
        .btn-accent {
          display: inline-flex;
          align-items: center;
          padding: 0.875rem 2rem;
          background: var(--color-accent);
          color: #0a0a0f;
          border-radius: var(--radius-sm);
          text-decoration: none;
          font-weight: 700;
          font-size: 0.9rem;
          transition: background 0.2s, transform 0.2s;
        }
        .btn-accent:hover { background: var(--color-accent-hover); transform: translateY(-2px); }
      `}</style>
    </section>
  );
}
