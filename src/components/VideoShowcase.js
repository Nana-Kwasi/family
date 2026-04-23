import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

const videos = [
  { src: '/video/v1.mp4',                              eyebrow: "Mother's Day 2026",   heading: 'She Never Asked for Anything.',           sub: 'Honour her quietly. Honour her deeply. A gift made for the mother who gave you everything.' },
  { src: '/video/v2.mp4',                              eyebrow: 'Limited Collection',  heading: 'This Year, Make It Mean Something.',       sub: 'Premium gift-ready pieces crafted to celebrate the strength and legacy of remarkable mothers.' },
  { src: '/video/7763487-hd_1920_1080_30fps.mp4',      eyebrow: 'Gift Her Today',      heading: 'A Mother\'s Love Has No Equal.',           sub: 'Find something as extraordinary as the woman who raised you.' },
  { src: '/video/8828300-uhd_3840_2160_25fps.mp4',     eyebrow: 'Celebrate Her',       heading: 'She Carried You. Now Carry Her Heart.',   sub: 'Our limited edition Mother\'s Day collection is almost gone. Secure her gift now.' },
  { src: '/video/6250031-uhd_3840_2160_25fps.mp4',     eyebrow: 'Limited Edition',     heading: 'Because Ordinary Isn\'t Enough.',          sub: 'She gave you everything. Give her something she will treasure forever.' },
  { src: '/video/7352723-uhd_2160_4096_30fps.mp4',     eyebrow: 'For Remarkable Moms', heading: 'Heritage. Strength. Grace.',              sub: 'Crafted with intention. Gifted with love. Made to honour the women who shape our world.' },
  { src: '/video/7352724-uhd_2160_4096_30fps.mp4',     eyebrow: 'Last Few Remaining',  heading: 'Don\'t Let the Moment Pass.',              sub: 'Mother\'s Day comes once a year. Make sure she knows exactly how much she means to you.' },
];

export default function VideoShowcase({ compact = false }) {
  const navigate = useNavigate();
  const [current, setCurrent] = useState(0);
  const [slideDir, setSlideDir] = useState('none');
  const [animating, setAnimating] = useState(false);
  const total = videos.length;

  const goTo = useCallback((idx, dir = 'left') => {
    if (animating) return;
    setSlideDir(dir);
    setAnimating(true);
    setTimeout(() => {
      setCurrent((idx + total) % total);
      setSlideDir('none');
      setTimeout(() => setAnimating(false), 50);
    }, 350);
  }, [animating, total]);

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
        src={v.src}
        autoPlay
        muted
        loop
        playsInline
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
        background: 'linear-gradient(to top, rgba(18,10,4,0.93) 0%, rgba(18,10,4,0.4) 50%, rgba(18,10,4,0.15) 100%)',
        pointerEvents: 'none',
      }} />

      {/* Top-right badge */}
      <div style={{ position: 'absolute', top: 16, right: 16 }}>
        <span style={{
          fontFamily: "'Montserrat', sans-serif", fontSize: 9,
          letterSpacing: '0.16em', color: '#E8A882', textTransform: 'uppercase',
          background: 'rgba(200,130,108,0.22)', border: '1px solid rgba(200,130,108,0.4)',
          borderRadius: 50, padding: '4px 12px',
        }}>Limited Edition</span>
      </div>

      {/* Bottom text overlay */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        padding: 'clamp(20px,3vw,32px)',
        ...slideStyle[slideDir],
      }}>
        <p style={{
          fontFamily: "'Montserrat', sans-serif", fontSize: 9,
          letterSpacing: '0.24em', color: '#C9A558',
          textTransform: 'uppercase', marginBottom: 8,
        }}>{v.eyebrow}</p>
        <h3 style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: 'clamp(18px, 2.5vw, 26px)',
          color: '#FAF0E0', fontWeight: 700,
          lineHeight: 1.2, marginBottom: 8,
        }}>{v.heading}</h3>
        <p style={{
          fontFamily: "'Times New Roman', Times, serif",
          fontSize: 13, color: '#D4B896',
          fontStyle: 'italic', lineHeight: 1.65,
          marginBottom: 20, maxWidth: 400,
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
