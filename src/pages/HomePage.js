import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { products } from '../data/products';
import VideoShowcase from '../components/VideoShowcase';
import { trackEvent } from '../utils/analytics';

const GoldDivider = () => (
  <div className="gold-divider">
    <span className="gold-divider-icon">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
        <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12z"/>
        <path d="M4 21.6c0-4.4 3.6-8 8-8s8 3.6 8 8"/>
      </svg>
    </span>
  </div>
);

function ProductCarousel({ asColumn = false }) {
  const navigate = useNavigate();
  const [current, setCurrent] = useState(0);
  const [slideDir, setSlideDir] = useState('none'); // 'left' | 'right' | 'none'
  const [animating, setAnimating] = useState(false);
  const total = products.length;

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
    const t = setInterval(() => goTo(current + 1, 'left'), 5000);
    return () => clearInterval(t);
  }, [current, goTo]);

  const product = products[current];

  const slideStyle = {
    none:  { transform: 'translateX(0)',      transition: 'transform 0.38s ease' },
    left:  { transform: 'translateX(-80px)',  transition: 'transform 0.35s ease' },
    right: { transform: 'translateX(80px)',   transition: 'transform 0.35s ease' },
  };

  const card = (
    <div style={{
      position: 'relative',
      width: '100%',
      height: '100%',
      overflow: 'hidden',
      borderRadius: 16,
      background: '#1C1209',
      border: '1px solid rgba(201,165,88,0.25)',
      boxShadow: '0 8px 48px rgba(0,0,0,0.5)',
      cursor: 'pointer',
    }} onClick={() => navigate(`/product/${product.id}`)}>

      {/* Full-bleed image */}
      <img
        src={product.image}
        alt={product.name}
        style={{
          width: '100%', height: '100%',
          objectFit: 'cover', display: 'block',
          position: 'absolute', inset: 0,
          ...slideStyle[slideDir],
          transition: (slideStyle[slideDir]?.transition || 'transform 0.38s ease') + ', transform 0.6s ease',
        }}
      />

      {/* Gradient overlay — bottom-heavy */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(to top, rgba(8,4,2,0.98) 0%, rgba(12,7,4,0.8) 42%, rgba(12,7,4,0.32) 72%, rgba(12,7,4,0.12) 100%)',
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
        }}>Gift Ready</span>
      </div>

      {/* Bottom text overlay */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        padding: 'clamp(20px,3vw,32px)',
        background: 'linear-gradient(to top, rgba(8,4,2,0.74) 0%, rgba(8,4,2,0.36) 60%, rgba(8,4,2,0) 100%)',
        ...slideStyle[slideDir],
      }} onClick={e => e.stopPropagation()}>
        <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 11, fontWeight: 600, letterSpacing: '0.22em', color: '#E3BE72', textTransform: 'uppercase', marginBottom: 6, textShadow: '0 2px 10px rgba(0,0,0,0.75)' }}>
          {product.label} &nbsp;·&nbsp; {product.tagline}
        </p>
        <h2
          onClick={() => navigate(`/product/${product.id}`)}
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 'clamp(22px, 3.1vw, 34px)',
            color: '#FAF0E0', fontWeight: 700,
            lineHeight: 1.2, marginBottom: 8, cursor: 'pointer', textShadow: '0 2px 12px rgba(0,0,0,0.78)',
          }}
        >{product.name}</h2>
        <p style={{
          fontFamily: "'Times New Roman', Times, serif",
          fontSize: 16, color: '#F6E3CC', fontStyle: 'italic',
          lineHeight: 1.65, marginBottom: 16, maxWidth: 400,
          textShadow: '0 2px 10px rgba(0,0,0,0.82)',
        }}>{product.description.slice(0, 100)}…</p>

        {/* Price + CTA */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 18 }}>
          <span style={{ fontFamily: "'Cinzel', serif", fontSize: 22, color: '#C9A558' }}>${product.price}</span>
          <button
            onClick={e => { e.stopPropagation(); navigate(`/product/${product.id}`); }}
            className="btn-gold"
            style={{ width: 'auto', padding: '9px 22px', fontFamily: "'Montserrat', sans-serif", fontSize: 11, letterSpacing: '0.1em' }}
          >View Product</button>
        </div>

        {/* Dots + counter */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'nowrap', overflowX: 'auto', maxWidth: 'min(100%, 220px)', paddingBottom: 2, WebkitOverflowScrolling: 'touch' }}>
            {products.map((_, i) => (
              <button key={i} onClick={e => { e.stopPropagation(); goTo(i, i > current ? 'left' : 'right'); }} style={{
                width: i === current ? 22 : 7, height: 7,
                borderRadius: 50, border: 'none', cursor: 'pointer', padding: 0,
                background: i === current ? '#C9A558' : 'rgba(201,165,88,0.3)',
                transition: 'all 0.3s ease',
              }} />
            ))}
          </div>
          <span style={{ fontFamily: "'Cinzel', serif", fontSize: 10, color: 'rgba(201,165,88,0.5)', letterSpacing: '0.1em' }}>
            {String(current + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
          </span>
        </div>
      </div>

      {/* Prev / Next arrows */}
      {[{ dir: -1, side: 'left', sd: 'right', sym: '‹' }, { dir: 1, side: 'right', sd: 'left', sym: '›' }].map(({ dir, side, sd, sym }) => (
        <button key={side} onClick={e => { e.stopPropagation(); goTo(current + dir, sd); }} style={{
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

  if (asColumn) return card;

  return (
    <div style={{ padding: '24px 20px 40px', background: 'var(--bg-main)' }}>
      {card}
    </div>
  );
}

export default function HomePage() {
  const navigate = useNavigate();
  const [dob, setDob] = useState('');
  const [gender, setGender] = useState('female');
  const [error, setError] = useState('');

  function handleReveal() {
    if (!dob) {
      setError('Please select your birthday first.');
      trackEvent('name_reveal_validation_error', { reason: 'missing_dob' });
      return;
    }
    trackEvent('start_name_reveal', { gender });
    navigate(`/result?dob=${dob}&gender=${gender}`);
  }

  return (
    <div className="page-wrapper">

      <style>{`
        .home-carousels { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; padding: 24px 20px; background: #F3F1EC; align-items: stretch; }
        .home-carousel-cell { min-height: 580px; height: 580px; }
        .home-row2 { display: grid; grid-template-columns: 1fr 1fr repeat(4, 1fr); gap: 18px; }
        @media (max-width: 1100px) { .home-row2 { grid-template-columns: 1fr 1fr 1fr 1fr; } }
        @media (max-width: 768px)  { .home-carousels { grid-template-columns: 1fr; } .home-row2 { grid-template-columns: 1fr 1fr; } }
        @media (max-width: 480px)  { .home-row2 { grid-template-columns: 1fr; } }
      `}</style>

      {/* Row 1 — Video Carousel + Product Carousel, equal width, full row */}
      <div className="home-carousels">
        <div className="home-carousel-cell">
          <VideoShowcase compact />
        </div>
        <div className="home-carousel-cell">
          <ProductCarousel asColumn />
        </div>
      </div>

      <GoldDivider />

      {/* Row 2 — Info Cards + Discover Cards, all one row */}
      <section style={{ padding: '40px 20px 52px', background: 'linear-gradient(180deg, #18100A 0%, #221408 100%)', borderBottom: '1px solid rgba(201,165,88,0.12)' }}>
        <div className="home-row2">

          {/* Card 1 — Celebrate Her */}
          <div style={{ background: '#2E1E12', border: '1px solid rgba(201,165,88,0.28)', borderRadius: 12, padding: '24px 20px', boxShadow: '0 4px 24px rgba(0,0,0,0.3)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 11, letterSpacing: '0.18em', color: '#C9A558', textTransform: 'uppercase', marginBottom: 8 }}>
                Because Her Love Deserves Honoring
              </p>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(18px, 2.2vw, 24px)', color: '#EDD9BC', fontWeight: 700, marginBottom: 10, lineHeight: 1.25 }}>
                Celebrate Her Beautifully
              </h2>
              <p style={{ fontFamily: "'Times New Roman', Times, serif", fontSize: 15, color: '#D4B896', fontStyle: 'italic', lineHeight: 1.8, marginBottom: 18 }}>
                Elegant gifts with heartfelt meaning — created to honor the women who give everything.
              </p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <button className="btn-gold" style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 12, padding: '10px 14px' }} onClick={() => navigate('/store')}>Find Her Gift</button>
              <button className="btn-ghost" style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 12, padding: '9px 14px' }} onClick={() => navigate('/store')}>Browse Collection</button>
            </div>
          </div>

          {/* Card 2 — Our Story */}
          <div style={{ background: '#2E1E12', border: '1px solid rgba(201,165,88,0.28)', borderRadius: 12, padding: '24px 20px', boxShadow: '0 4px 24px rgba(0,0,0,0.3)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 11, letterSpacing: '0.18em', color: '#C9A558', textTransform: 'uppercase', marginBottom: 8 }}>Our Story</p>
              <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(16px, 2vw, 22px)', color: '#EDD9BC', marginBottom: 10, lineHeight: 1.3 }}>
                We believe mothers deserve more than ordinary gifts.
              </h3>
              <p style={{ fontFamily: "'Times New Roman', Times, serif", fontSize: 15, color: '#D4B896', lineHeight: 1.8, fontStyle: 'italic' }}>
                Heartfelt mugs, shirts, and keepsakes crafted to honour the women whose love shapes our lives every day.
              </p>
            </div>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginTop: 14 }}>
              {['Respect', 'Heritage', 'Love', 'Legacy'].map(w => (
                <span key={w} style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 11, letterSpacing: '0.12em', color: 'rgba(201,165,88,0.7)', textTransform: 'uppercase' }}>{w}</span>
              ))}
            </div>
          </div>

          {/* 4 Discover cards */}
          {[
            { icon: '📖', title: 'Origin & Heritage', desc: 'The deep cultural roots of your Akan day name' },
            { icon: '⚡', title: 'Traits & Soul', desc: 'Spiritual qualities the Akan associate with your soul' },
            { icon: '✦', title: 'Appellations', desc: 'Ancient praise names your ancestors would have called you' },
            { icon: '🌍', title: 'Divine Energy', desc: 'The planet, deity, or element that governs your day' },
          ].map(({ icon, title, desc }) => (
            <div key={title} style={{ background: '#261A11', border: '1px solid rgba(201,165,88,0.2)', borderRadius: 12, padding: '22px 16px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
              <div style={{ fontSize: 28 }}>{icon}</div>
              <div style={{ fontFamily: "'Cinzel', serif", fontSize: 13, color: '#C9A558', letterSpacing: '0.1em', textTransform: 'uppercase' }}>{title}</div>
              <p style={{ color: '#BA9D7C', fontSize: 15, lineHeight: 1.7, margin: 0 }}>{desc}</p>
            </div>
          ))}

        </div>
      </section>

      {/* 7 Akan Day Names */}
      <section style={{ borderTop: '1px solid rgba(201,165,88,0.1)', padding: '64px 20px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 40 }}>
            <h2 className="section-title">The Seven Akan Day Names</h2>
            <p className="section-subtitle">Every soul born carries a name from the day they arrived</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 16 }}>
            {[
              { day: 'Sunday',    male: 'Kwasi',   female: 'Akosua', symbol: '☀️', color: '#C9A558' },
              { day: 'Monday',    male: 'Kwadwo',  female: 'Adwoa',  symbol: '🌙', color: '#a0b4c8' },
              { day: 'Tuesday',   male: 'Kwabena', female: 'Abena',  symbol: '🌊', color: '#b05060' },
              { day: 'Wednesday', male: 'Kwaku',   female: 'Akua',   symbol: '🕷️', color: '#8aaccf' },
              { day: 'Thursday',  male: 'Yaw',     female: 'Yaa',    symbol: '⚡', color: '#5a9e6a' },
              { day: 'Friday',    male: 'Kofi',    female: 'Afia',   symbol: '✨', color: '#C9A558' },
              { day: 'Saturday',  male: 'Kwame',   female: 'Ama',    symbol: '🌟', color: '#9b7fc8' },
            ].map(({ day, male, female, symbol, color }) => (
              <div key={day} style={{
                background: 'rgba(201,165,88,0.04)', border: '1px solid rgba(201,165,88,0.15)',
                borderRadius: 10, padding: '20px 14px', textAlign: 'center', cursor: 'pointer',
                transition: 'border-color 0.2s, background 0.2s',
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(201,165,88,0.45)'; e.currentTarget.style.background = 'rgba(201,165,88,0.08)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(201,165,88,0.15)'; e.currentTarget.style.background = 'rgba(201,165,88,0.04)'; }}
              >
                <div style={{ fontSize: 28, marginBottom: 8 }}>{symbol}</div>
                <div style={{ fontFamily: "'Cinzel', serif", fontSize: 11, letterSpacing: '0.15em', color, textTransform: 'uppercase', marginBottom: 6 }}>{day}</div>
                <div style={{ fontFamily: "'Times New Roman', Times, serif", fontSize: 16, color: '#EDD9BC', lineHeight: 1.5 }}>{female}</div>
                <div style={{ fontFamily: "'Times New Roman', Times, serif", fontSize: 15, color: '#BA9D7C', lineHeight: 1.5 }}>{male}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Name Generator + Explore More */}
      <section style={{ borderTop: '1px solid rgba(201,165,88,0.1)', padding: '64px 20px 80px', background: 'rgba(201,165,88,0.02)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 48, alignItems: 'start' }}>

          {/* Name Generator */}
          <div>
            <div style={{ textAlign: 'center', marginBottom: 24 }}>
              <h2 className="gen-title" style={{ marginBottom: 12 }}>Ghanaian (Akan)<br />Name Generator</h2>
              <p className="gen-desc">In Akan tradition, every child is given a day name based on the day of the week they were born.</p>
              <p style={{ marginTop: 10, color: '#C9A558', fontFamily: "'Cinzel', serif", fontSize: 12, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                Discover your name. Gift your heritage.
              </p>
            </div>
            <div className="afia-card" style={{ textAlign: 'left' }}>
              <div className="form-field">
                <label className="field-label">Your Birthday</label>
                <div className="input-wrapper">
                  <span className="input-icon">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                      <line x1="16" y1="2" x2="16" y2="6"/>
                      <line x1="8" y1="2" x2="8" y2="6"/>
                      <line x1="3" y1="10" x2="21" y2="10"/>
                    </svg>
                  </span>
                  <input
                    type="date"
                    className="afia-input"
                    value={dob}
                    onChange={e => { setDob(e.target.value); setError(''); }}
                    style={{ colorScheme: 'dark' }}
                  />
                </div>
              </div>
              <div className="form-field">
                <label className="field-label">Gender</label>
                <div className="gender-toggle">
                  <button className={`gender-btn ${gender === 'female' ? 'active' : ''}`} onClick={() => setGender('female')}>Female</button>
                  <button className={`gender-btn ${gender === 'male' ? 'active' : ''}`} onClick={() => setGender('male')}>Male</button>
                </div>
              </div>
              {error && <div className="error-msg" style={{ marginBottom: 16 }}>{error}</div>}
              <button className="btn-gold" onClick={handleReveal}>Reveal Your Day Name</button>
              <button
                className="btn-ghost"
                style={{ marginTop: 10, width: '100%', fontFamily: "'Montserrat', sans-serif", fontSize: 12, letterSpacing: '0.1em' }}
                onClick={() => {
                  trackEvent('home_shop_meaningful_gifts_click', { source: 'generator_block' });
                  navigate('/store');
                }}
              >
                Shop Meaningful Gifts
              </button>
              <p style={{ marginTop: 10, color: '#BA9D7C', fontSize: 13, lineHeight: 1.6, textAlign: 'center' }}>
                After your name reveal, explore curated gifts inspired by your heritage.
              </p>
            </div>
          </div>

          {/* Explore More */}
          <div>
            <div style={{ textAlign: 'center', marginBottom: 24 }}>
              <h2 className="gen-title" style={{ marginBottom: 12 }}>Explore More</h2>
              <p className="gen-desc">Stories, culture, and heritage — all in one place</p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {[
                { to: '/store',   icon: '🛍️', label: 'The Store',      desc: 'Find meaningful gifts designed for mothers, heritage, and legacy moments' },
                { to: '/stories', icon: '📚', label: 'Stories & Book', desc: 'Read Ghanaian folktales, proverbs, and the full book "Outdooring (Aba-Dinto)"' },
                { to: '/about',   icon: '👑', label: 'About Mama Africa', desc: 'Her voice, her mission, and the cultural legacy behind this platform' },
              ].map(({ to, icon, label, desc }) => (
                <Link key={to} to={to} style={{ textDecoration: 'none' }}>
                  <div className="afia-card" style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '20px 22px', transition: 'border-color 0.2s' }}
                    onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(201,165,88,0.5)'}
                    onMouseLeave={e => e.currentTarget.style.borderColor = ''}
                  >
                    <div style={{ fontSize: 28, flexShrink: 0 }}>{icon}</div>
                    <div>
                      <div style={{ fontFamily: "'Cinzel', serif", fontSize: 13, color: '#C9A558', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 6 }}>{label}</div>
                      <p style={{ color: '#BA9D7C', fontSize: 15, lineHeight: 1.7, margin: 0 }}>{desc}</p>
                    </div>
                    <span style={{ marginLeft: 'auto', color: '#9E7D42', fontSize: 18, flexShrink: 0 }}>→</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
