// Single-row infinite marquee — natural aspect ratio, no distortion

const images = [
  { src: '/assets/portfolio/frameless-90/corner-showers-1.webp',       alt: 'Frameless shower 90°' },
  { src: '/assets/portfolio/mirrors/custom-mirrors-3.webp',            alt: 'Custom mirror wall' },
  { src: '/assets/portfolio/frameless-90/IMG_7786.jpeg.webp',          alt: 'Glass shower enclosure' },
  { src: '/assets/portfolio/commercial/Commercial-Glass-1.webp',       alt: 'Office glass partition' },
  { src: '/assets/portfolio/angled/Angled-showers-1.jpeg.webp',        alt: 'Custom angled shower' },
  { src: '/assets/portfolio/frameless-90/corner-showers-3.webp',       alt: 'Corner shower glass' },
  { src: '/assets/portfolio/mirrors/custom-mirrors-4.webp',            alt: 'Decorative mirror' },
  { src: '/assets/portfolio/commercial/Commercial-Glass-3.webp',       alt: 'Glass wall office' },
  { src: '/assets/portfolio/frameless-90/IMG_8014.jpeg.webp',          alt: 'Premium shower door' },
  { src: '/assets/portfolio/angled/Custom-angled-showers-2.webp',      alt: 'Angled enclosure' },
  { src: '/assets/portfolio/frameless-80/Imagen-de-WhatsApp-2023-10-24-a-las-14.05.21-scaled-1.webp', alt: '80° shower enclosure' },
  { src: '/assets/portfolio/tub/IMG_1945.jpeg.webp',                   alt: 'Glass tub enclosure' },
  { src: '/assets/portfolio/frameless-doors/IMG_2729.jpeg-scaled.webp', alt: 'Frameless glass door' },
  { src: '/assets/portfolio/steam/Full-HEIGHT-Steam-showers-1-1-1.jpeg.webp', alt: 'Full height steam shower' },
  { src: '/assets/portfolio/frameless-80/IMG_7899.jpeg.webp',          alt: 'Glass shower 80°' },
  { src: '/assets/portfolio/tub/IMG_4793-1.jpeg.webp',                 alt: 'Custom tub glass' },
  { src: '/assets/portfolio/frameless-doors/IMG_5641-1-rotated.jpeg.webp', alt: 'Interior glass door' },
  { src: '/assets/portfolio/wine-rooms/Custom-wine-rooms-3-rotated.jpeg.webp', alt: 'Glass wine room' },
  { src: '/assets/portfolio/mirrors/Imagen-de-WhatsApp-2023-10-24-a-las-14.05.36-1-scaled-1.webp', alt: 'Custom bathroom mirror' },
  { src: '/assets/portfolio/commercial/Commercial-Glass-6.webp',       alt: 'Commercial glass install' },
];

const doubled = [...images, ...images];

export default function PortfolioSlider() {
  return (
    <section className="portfolio-section" aria-labelledby="portfolio-title">

      <div className="portfolio-header">
        <p className="eyebrow">Our Work</p>
        <h2 id="portfolio-title" className="section-title">
          500+ Projects Completed
        </h2>
        <p className="section-subtitle">
          Frameless showers, custom mirrors, commercial partitions, and more
          — each project built with precision and premium materials.
        </p>
      </div>

      <div className="marquee-mask">
        <div className="marquee-track">
          {doubled.map((img, i) => (
            <div key={i} className="marquee-item">
              <img
                src={img.src}
                alt={img.alt}
                loading="lazy"
                className="marquee-img"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="portfolio-cta">
        <a href="/portfolio" className="btn-primary">View Full Portfolio</a>
        <a href="/contact"   className="btn-ghost">Start Your Project</a>
      </div>

      <style>{`
        .portfolio-section {
          padding-block: 5rem;
          overflow: hidden;
        }
        .portfolio-header {
          text-align: center;
          max-width: 600px;
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
          font-size: 0.95rem;
        }

        /* === MARQUEE === */
        .marquee-mask {
          overflow: hidden;
          width: 100%;
        }

        .marquee-track {
          display: flex;
          gap: 0.75rem;
          width: max-content;
          will-change: transform;
          animation: scrollLeft 70s linear infinite;
        }

        .marquee-mask:hover .marquee-track {
          animation-play-state: paused;
        }

        @keyframes scrollLeft {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        .marquee-item {
          flex-shrink: 0;
          height: clamp(220px, 28vw, 340px);
          border-radius: var(--radius-md);
          overflow: hidden;
        }
        .marquee-img {
          height: 100%;
          width: auto;
          object-fit: cover;
          display: block;
          transition: transform 0.4s ease;
        }
        .marquee-item:hover .marquee-img {
          transform: scale(1.04);
        }

        /* CTA */
        .portfolio-cta {
          display: flex;
          gap: 1rem;
          justify-content: center;
          flex-wrap: wrap;
          padding-top: 3rem;
          padding-inline: 2rem;
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
          box-shadow: 0 4px 20px rgba(31, 96, 168, 0.35);
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
          .marquee-item { height: clamp(160px, 40vw, 240px); }
        }

        @media (prefers-reduced-motion: reduce) {
          .marquee-track { animation: none; }
        }
      `}</style>
    </section>
  );
}
