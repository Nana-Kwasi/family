import React, { useState, useEffect, useLayoutEffect, useCallback, useRef } from 'react';

const videos = [
  { src: '/video/f.mp4', eyebrow: 'Heritage & Heart', heading: 'She Never Asked for Anything.', sub: 'Honour her quietly. Honour her deeply — a gift rooted in culture and gratitude.' },
  { src: '/video/f1.mp4', eyebrow: 'Limited Collection', heading: 'This Year, Make It Mean Something.', sub: 'Premium gift-ready pieces that celebrate legacy, identity, and the people who raised us.' },
];

function isCoarsePointer() {
  if (typeof window === 'undefined') return false;
  try {
    if (window.matchMedia('(pointer: coarse)').matches) return true;
  } catch { /* ignore */ }
  try {
    return 'ontouchstart' in window && window.matchMedia('(max-width: 768px)').matches;
  } catch {
    return false;
  }
}

export default function VideoShowcase({ compact = false }) {
  const [current, setCurrent] = useState(0);
  const [slideDir, setSlideDir] = useState('none');
  const [animating, setAnimating] = useState(false);
  const videoRef = useRef(null);
  const total = videos.length;

  const goTo = useCallback((idx, dir = 'left') => {
    if (animating) return;
    if (isCoarsePointer()) {
      setCurrent((idx + total) % total);
      setSlideDir('none');
      return;
    }
    setSlideDir(dir);
    setAnimating(true);
    setTimeout(() => {
      setCurrent((idx + total) % total);
      setSlideDir('none');
      setTimeout(() => setAnimating(false), 50);
    }, 350);
  }, [animating, total]);

  useLayoutEffect(() => {
    const el = videoRef.current;
    if (!el) return;
    el.muted = true;
    el.defaultMuted = true;
    el.setAttribute('muted', '');
    el.setAttribute('playsinline', '');
    el.setAttribute('webkit-playsinline', '');
    const p = el.play();
    if (p !== undefined && typeof p.catch === 'function') {
      p.catch(() => {});
    }
  }, [current]);

  useEffect(() => {
    const t = setInterval(() => goTo(current + 1, 'left'), 6000);
    return () => clearInterval(t);
  }, [current, goTo]);

  const slideStyle = {
    none:  { transform: 'translateX(0)',     transition: 'transform 0.38s ease' },
    left:  { transform: 'translateX(-60px)', transition: 'transform 0.35s ease' },
    right: { transform: 'translateX(60px)',  transition: 'transform 0.35s ease' },
  };

  const v = videos[current];

  const inner = (
    <div style={{
      position: 'relative',
      width: '100%',
      height: '100%',
      minHeight: compact ? '100%' : 560,
      borderRadius: 16,
      overflow: 'hidden',
      background: '#1C1209',
      border: '1px solid rgba(201,165,88,0.25)',
      boxShadow: '0 8px 48px rgba(0,0,0,0.5)',
    }}>
      {/* Video */}
      <video
        key={v.src}
        ref={videoRef}
        src={v.src}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        style={{
          width: '100%', height: '100%',
          objectFit: 'cover', display: 'block',
          position: 'absolute', inset: 0,
          ...slideStyle[slideDir],
        }}
      />

      {/* Gradient overlay */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(to top, rgba(8,4,2,0.98) 0%, rgba(12,7,4,0.78) 42%, rgba(12,7,4,0.3) 72%, rgba(12,7,4,0.12) 100%)',
        pointerEvents: 'none',
      }} />

      {/* Top-right badge */}
      <div style={{ position: 'absolute', top: 16, right: 16 }}>
        <span style={{
          fontFamily: "'Montserrat', sans-serif", fontSize: 11, fontWeight: 700,
          letterSpacing: '0.14em', color: '#1C0E04', textTransform: 'uppercase',
          background: 'rgba(255,215,140,0.96)', border: '1px solid rgba(255,225,165,1)',
          borderRadius: 50, padding: '6px 14px',
          boxShadow: '0 4px 14px rgba(0,0,0,0.35)',
        }}>Limited Edition</span>
      </div>

      {/* Bottom text overlay */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        padding: 'clamp(20px,3vw,32px)',
        background: 'linear-gradient(to top, rgba(8,4,2,0.72) 0%, rgba(8,4,2,0.34) 60%, rgba(8,4,2,0) 100%)',
        ...slideStyle[slideDir],
      }}>
        <p style={{
          fontFamily: "'Montserrat', sans-serif", fontSize: 11, fontWeight: 600,
          letterSpacing: '0.24em', color: '#C9A558',
          textTransform: 'uppercase', marginBottom: 8,
          textShadow: '0 2px 10px rgba(0,0,0,0.75)',
        }}>{v.eyebrow}</p>
        <h3 style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: 'clamp(22px, 3.1vw, 34px)',
          color: '#FAF0E0', fontWeight: 700,
          lineHeight: 1.2, marginBottom: 8,
          textShadow: '0 2px 12px rgba(0,0,0,0.78)',
        }}>{v.heading}</h3>
        <p style={{
          fontFamily: "'Times New Roman', Times, serif",
          fontSize: 16, color: '#F6E3CC',
          fontStyle: 'italic', lineHeight: 1.65,
          marginBottom: 20, maxWidth: 400,
          textShadow: '0 2px 10px rgba(0,0,0,0.82)',
        }}>{v.sub}</p>

        {/* Dots + counter row */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', gap: 6 }}>
            {videos.map((_, i) => (
              <button key={i} onClick={() => goTo(i, i > current ? 'left' : 'right')} style={{
                width: i === current ? 22 : 7, height: 7,
                borderRadius: 50, border: 'none', cursor: 'pointer', padding: 0,
                background: i === current ? '#C9A558' : 'rgba(201,165,88,0.3)',
                transition: 'all 0.3s ease',
              }} />
            ))}
          </div>
          <span style={{
            fontFamily: "'Cinzel', serif", fontSize: 10,
            color: 'rgba(201,165,88,0.55)', letterSpacing: '0.1em',
          }}>
            {String(current + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
          </span>
        </div>
      </div>

      {/* Prev / Next arrows */}
      {[{ dir: -1, side: 'left', sd: 'right', sym: '‹' }, { dir: 1, side: 'right', sd: 'left', sym: '›' }].map(({ dir, side, sd, sym }) => (
        <button key={side} onClick={() => goTo(current + dir, sd)} style={{
          position: 'absolute', top: '42%', [side]: 16,
          transform: 'translateY(-50%)',
          background: 'rgba(201,165,88,0.15)', border: '1px solid rgba(201,165,88,0.3)',
          color: '#C9A558', borderRadius: '50%',
          width: 40, height: 40, fontSize: 22,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: 'pointer', transition: 'all 0.2s', fontFamily: 'serif',
        }}
          onMouseEnter={e => e.currentTarget.style.background = 'rgba(201,165,88,0.35)'}
          onMouseLeave={e => e.currentTarget.style.background = 'rgba(201,165,88,0.15)'}
        >{sym}</button>
      ))}
    </div>
  );

  if (compact) {
    return (
      <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        {inner}
      </div>
    );
  }

  /* Standalone full-width section */
  return (
    <section style={{
      background: '#18100A', padding: '40px 20px',
      borderTop: '1px solid rgba(201,165,88,0.12)',
      borderBottom: '1px solid rgba(201,165,88,0.12)',
    }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', height: 560 }}>
        {inner}
      </div>
    </section>
  );
}
