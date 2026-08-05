import React, { useState, useEffect, useCallback, useRef } from 'react';
import ProductCard from './ProductCard';

const pi = (file) => encodeURI(`/images/${file}`);
const RED = '#CE1126'; const GOLD = '#C9A54C'; const GREEN = '#006B3F';

// Match-day commercials + lifestyle shots for the rotating banner.
const COMMERCIALS = [
  pi('ghana-spotlight/commercial-flag.jpeg'),
  pi('world-cup/wc-prod-4.jpg'),
  pi('ghana-spotlight/commercial-goal.png'),
  pi('world-cup/wc-prod-5.jpg'),
  pi('world-cup/wc-prod-6.jpg'),
];

function CommercialCarousel() {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const timer = useRef(null);
  const n = COMMERCIALS.length;

  const start = useCallback(() => {
    clearInterval(timer.current);
    timer.current = setInterval(() => { if (!paused) setI((c) => (c + 1) % n); }, 5000);
  }, [paused, n]);

  useEffect(() => { start(); return () => clearInterval(timer.current); }, [start, i]);

  return (
    <div
      style={{ position: 'relative', width: '100%', aspectRatio: '3 / 2', maxHeight: 'min(720px, 76vh)', overflow: 'hidden', background: '#1a1209' }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 5, display: 'flex', zIndex: 2 }}>
        <div style={{ flex: 1, background: RED }} /><div style={{ flex: 1, background: GOLD }} /><div style={{ flex: 1, background: GREEN }} />
      </div>
      {COMMERCIALS.map((src, idx) => (
        <img
          key={src}
          src={src}
          alt="Ghana Black Stars at the World Cup"
          loading={idx === 0 ? 'eager' : 'lazy'}
          style={{
            position: 'absolute', inset: 0, width: '100%', height: '100%',
            objectFit: 'cover', objectPosition: 'center',
            opacity: idx === i ? 1 : 0, transition: 'opacity 0.7s ease', display: 'block',
          }}
        />
      ))}
      {/* arrows */}
      {[{ d: -1, s: 'left', g: '‹' }, { d: 1, s: 'right', g: '›' }].map(({ d, s, g }) => (
        <button
          key={s}
          onClick={() => { setI((c) => (c + d + n) % n); setPaused(false); }}
          aria-label={s}
          style={{
            position: 'absolute', top: '50%', [s]: 14, transform: 'translateY(-50%)', zIndex: 3,
            width: 40, height: 40, borderRadius: '50%', border: '1px solid rgba(255,255,255,0.6)',
            background: 'rgba(20,12,4,0.4)', color: '#fff', fontSize: 22, cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(4px)',
          }}
        >{g}</button>
      ))}
      {/* dots */}
      <div style={{ position: 'absolute', bottom: 12, left: 0, right: 0, display: 'flex', justifyContent: 'center', gap: 6, zIndex: 3 }}>
        {COMMERCIALS.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setI(idx)}
            aria-label={`Slide ${idx + 1}`}
            style={{ width: idx === i ? 20 : 7, height: 7, borderRadius: 999, border: 'none', background: idx === i ? GOLD : 'rgba(255,255,255,0.6)', cursor: 'pointer', transition: 'all .3s', padding: 0 }}
          />
        ))}
      </div>
    </div>
  );
}

export default function GhanaSpotlight({ products }) {
  return (
    <section style={{ background: '#F3F1EC', paddingBottom: 64 }}>
      <CommercialCarousel />
      <div style={{ maxWidth: 1300, margin: '0 auto', padding: '0 20px' }}>
        <div style={{ textAlign: 'center', margin: '40px auto 28px', maxWidth: 720 }}>
          <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 11, letterSpacing: '0.22em', color: '#8B6914', textTransform: 'uppercase', marginBottom: 10, fontWeight: 700 }}>
            ★ Black Stars · World Cup
          </p>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(24px,4vw,40px)', color: '#1a1a1a', fontWeight: 700, lineHeight: 1.15, margin: '0 0 12px' }}>
            Wear Your Name. Represent Ghana.
          </h2>
          <p style={{ fontFamily: "'EB Garamond', serif", fontSize: 18, color: '#5a5a5a', lineHeight: 1.65, margin: 0 }}>
            Personalized Black Stars name &amp; number jerseys — one for every Akan day-born name. Add your own name and number at checkout.
          </p>
        </div>

        <div className="product-grid store-product-grid" style={{ width: '100%', maxWidth: 'none', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))' }}>
          {products.map((p, idx) => <ProductCard key={p.id} product={p} animationIndex={idx} />)}
        </div>
      </div>
    </section>
  );
}
