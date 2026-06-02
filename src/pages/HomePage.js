import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { trackEvent } from '../utils/analytics';
import useSEO from '../hooks/useSEO';
import TestimonialsSection from '../components/ui/TestimonialsSection';

const pi = (file) => encodeURI(`/images/${file}`);

// ─── All marketing images for the hero carousel ──────────────────────────────
const HERO_SLIDES = [
  // Group / Event shots — highest impact
  { src: pi('group of day borns.jpeg'),                                          label: 'Akan Heritage',       title: 'Wear Your Day Name. Carry Your Legacy.',              sub: 'Premium heritage clothing for the Akan day-born community.' },
  { src: pi('all white day borns naming ceremony.jpeg'),                         label: 'Naming Ceremony',     title: 'Dressed for Life\'s Most Sacred Moments',             sub: 'Heritage T-shirts crafted for naming ceremonies and milestones.' },
  { src: pi('group of men and women wearing white t shirt day born.jpeg'),       label: 'For Everyone',        title: 'The Whole Family. One Heritage.',                      sub: 'Day-born shirts for men, women, and children — premium cotton.' },
  { src: pi('child dedication of parents wearing day borns white t shirt.jpeg'), label: 'Family Heritage',     title: 'Every Milestone, Beautifully Dressed',                sub: 'From child dedications to everyday wear — your heritage, always.' },
  { src: pi('naming ceremony white t shirt day borns .jpeg'),                    label: 'Day Born Collection', title: 'Your Name. Your Culture. Your Gift.',                  sub: 'Authentic Akan day-born designs worn with pride.' },
  { src: pi('naming ceremony group picture(kwame and Ama).jpeg'),                label: 'Kwame & Ama',         title: 'Saturday Born. Beautifully Celebrated.',               sub: 'Day-born heritage sets for couples and families.' },
  { src: pi('ama and kwame t shirt under naming ceremony.jpeg'),                 label: 'Naming Ceremony',     title: 'The Gift They\'ll Cherish Forever',                   sub: 'Personalised day-born prints — the perfect cultural gift.' },
  // Kids / Family — emotional impact
  { src: pi('kid yaw.jpeg'),                                                     label: 'Thursday Born',       title: 'Kid Yaw — Thursday Born',                             sub: 'Heritage starts young. Day-born gifts for the little ones.' },
  { src: pi('kid kwadwo.jpeg'),                                                  label: 'Monday Born',         title: 'Kid Kwadwo — Monday Born',                            sub: 'Softly dressed. Proudly named.' },
  { src: pi('kid afia.jpeg'),                                                    label: 'Friday Born',         title: 'Kid Afia — Friday Born',                              sub: 'Wearing her name from day one.' },
  { src: pi('kid adwoa.jpeg'),                                                   label: 'Monday Born',         title: 'Kid Adwoa — Monday Born',                             sub: 'Soft fabric. Lasting pride.' },
  // T-shirts
  { src: pi('adwoa black t shirt.jpeg'),                                         label: 'T-Shirt',             title: 'Adwoa Monday Born — Black',                           sub: 'Premium Adinkra print · Black colourway.' },
  { src: pi('yaw men blue t.shirt.jpeg'),                                        label: 'T-Shirt',             title: 'Yaw Thursday Born — Blue',                            sub: 'Heritage meets modern style.' },
  { src: pi('kwaku white t shirt.jpeg'),                                         label: 'T-Shirt',             title: 'Kwaku Wednesday Born — White',                        sub: 'Clean. Premium. Gift-ready.' },
  { src: pi('afia day born white t shirt.jpeg'),                                 label: 'T-Shirt',             title: 'Afia Friday Born — White',                            sub: 'Soft premium cotton · Heritage Adinkra symbol.' },
  { src: pi('akosua t shirt blue color.jpeg'),                                   label: 'T-Shirt',             title: 'Akosua Sunday Born — Blue',                           sub: 'Bold colour · Cultural heritage.' },
  { src: pi('kofi t shirt white.jpeg'),                                          label: 'T-Shirt',             title: 'Kofi Friday Born — White',                            sub: 'Premium print · Sankofa symbol.' },
  { src: pi('kwame black t shirt.jpeg'),                                         label: 'T-Shirt',             title: 'Kwame Saturday Born — Black',                         sub: 'Strong. Heritage. Gift-ready.' },
  { src: pi('kwadwo day born black t shirt.jpeg'),                               label: 'T-Shirt',             title: 'Kwadwo Monday Born — Black',                          sub: 'Premium Adinkra design · Monday-born heritage.' },
  { src: pi('kwabena day born white t shirt.jpeg'),                              label: 'T-Shirt',             title: 'Kwabena Tuesday Born — White',                        sub: 'White colourway · Sankofa symbol on back.' },
  { src: pi('ama day born  black t.shirt.jpeg'),                                 label: 'T-Shirt',             title: 'Ama Saturday Born — Black',                           sub: 'Bold colourway · Heritage Adinkra design.' },
  { src: pi('yaa gray t shirtsss.jpeg'),                                         label: 'T-Shirt',             title: 'Yaa Thursday Born — Gray',                            sub: 'Neutral tone · Heritage print.' },
  { src: pi('yaa gray t shirts.jpeg'),                                           label: 'T-Shirt',             title: 'Yaa Thursday Born Collection',                        sub: 'Multiple styles · Heritage Adinkra prints.' },
  // Baby Bodysuits
  { src: pi('toddler abena cream baby suit.jpeg'),                               label: 'Baby Bodysuit',       title: 'Abena — Cream Baby Bodysuit',                         sub: 'Soft. Heritage. Perfect for the newest Tuesday-born.' },
  { src: pi('toddler kofi blue baby suit.jpeg'),                                 label: 'Baby Bodysuit',       title: 'Kofi — Blue Baby Bodysuit',                           sub: 'Snap-button closure · Heritage Adinkra print.' },
  { src: pi('kwame kid red babysuit-0.jpeg'),                                    label: 'Baby Bodysuit',       title: 'Kwame — Red Baby Bodysuit',                           sub: 'Bold. Adorable. Gift-ready.' },
  { src: pi('kwame day born cream babysuit.jpeg'),                               label: 'Baby Bodysuit',       title: 'Kwame Saturday Born — Cream',                         sub: 'Soft cream colourway · Heritage design.' },
  { src: pi('toddler white kwasy day born babysuit.jpeg'),                       label: 'Baby Bodysuit',       title: 'Kwasi Sunday Born — White',                           sub: 'Classic white · Premium baby bodysuit.' },
  { src: pi('akosua day born voilet babysuit.jpeg'),                             label: 'Baby Bodysuit',       title: 'Akosua Sunday Born — Violet',                         sub: 'Beautiful violet colourway · Heritage print.' },
  { src: pi('red akua day born babysuit.jpeg'),                                  label: 'Baby Bodysuit',       title: 'Akua Wednesday Born — Red',                           sub: 'Vibrant red · Heritage Adinkra design.' },
  { src: pi('kwaku day born red babysuit.jpeg'),                                 label: 'Baby Bodysuit',       title: 'Kwaku Wednesday Born — Red',                          sub: 'Soft. Bold. Perfect gift.' },
  { src: pi('yellow ama day born babysuit.jpeg'),                                label: 'Baby Bodysuit',       title: 'Ama Saturday Born — Yellow',                          sub: 'Warm yellow · Heritage baby bodysuit.' },
  // Mugs
  { src: pi('afia mug-0.jpeg'),                                                  label: 'Heritage Mug',        title: 'Afia Friday Born Mug',                                sub: 'Premium ceramic · Adinkra symbol · Perfect gift.' },
  { src: pi('kofi cup-0.jpeg'),                                                  label: 'Heritage Mug',        title: 'Kofi Friday Born Mug',                                sub: 'Daily heritage ritual. One mug at a time.' },
  { src: pi('kofi-cup.jpeg'),                                                    label: 'Heritage Mug',        title: 'Kofi Day Born — Cup',                                 sub: 'Quality ceramic · Dishwasher safe · Gift-ready.' },
  // Real community photos
  { src: pi('WhatsApp Image 2026-06-01 at 12.51.01.jpeg'),                       label: 'Community',           title: 'Real People. Real Pride.',                            sub: 'Join thousands celebrating their Akan day-born identity.' },
  { src: pi('WhatsApp Image 2026-06-01 at 12.51.11.jpeg'),                       label: 'Community',           title: 'Heritage Worn Every Day',                             sub: 'Our community wears their culture with pride.' },
  { src: pi('WhatsApp Image 2026-06-01 at 12.51.20 (1).jpeg'),                   label: 'Day Born',            title: 'Your Name. Your Culture.',                            sub: 'Authentic Akan heritage designs.' },
  { src: pi('WhatsApp Image 2026-06-01 at 12.51.20 (2).jpeg'),                   label: 'Day Born',            title: 'Premium Heritage Gifting',                            sub: 'Thoughtfully made. Meaningfully given.' },
  { src: pi('WhatsApp Image 2026-06-01 at 12.51.27 (1).jpeg'),                   label: 'Heritage',            title: 'Crafted with Culture',                                sub: 'Every piece tells a story of your day-born identity.' },
  { src: pi('WhatsApp Image 2026-06-01 at 12.51.30 (1).jpeg'),                   label: 'Day Born',            title: 'Discover Your Akan Name',                             sub: 'Born on a specific day? You carry a heritage name.' },
  { src: pi('WhatsApp Image 2026-06-01 at 12.51.32 (2).jpeg'),                   label: 'Community',           title: 'Wear Your Heritage',                                  sub: 'Premium day-born gifts for the whole family.' },
];

const TOTAL = HERO_SLIDES.length;

// ─── Hero Carousel ────────────────────────────────────────────────────────────
function HeroCarousel() {
  const navigate = useNavigate();
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef(null);

  const goTo = useCallback((idx) => {
    setCurrent(((idx % TOTAL) + TOTAL) % TOTAL);
  }, []);

  const startTimer = useCallback(() => {
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      if (!paused) setCurrent((c) => (c + 1) % TOTAL);
    }, 6000);
  }, [paused]);

  useEffect(() => {
    startTimer();
    return () => clearInterval(timerRef.current);
  }, [startTimer, current]);

  // Preload next image
  useEffect(() => {
    const next = (current + 1) % TOTAL;
    const img = new window.Image();
    img.src = HERO_SLIDES[next].src;
  }, [current]);

  const slide = HERO_SLIDES[current];
  const progress = ((current + 1) / TOTAL) * 100;

  return (
    <div
      style={{ position: 'relative', width: '100%', height: 'clamp(480px, 72vh, 860px)', overflow: 'hidden', background: '#0a0602', userSelect: 'none' }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <style>{`
        @keyframes heroFadeIn {
          from { opacity: 0; transform: scale(1.05); }
          to   { opacity: 1; transform: scale(1); }
        }
        @keyframes heroTextIn {
          from { opacity: 0; transform: translateY(18px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      {/* Slide image */}
      <img
        key={current}
        src={slide.src}
        alt={slide.title}
        style={{
          position: 'absolute', inset: 0,
          width: '100%', height: '100%',
          objectFit: 'cover', objectPosition: 'center 30%',
          animation: 'heroFadeIn 0.85s ease forwards',
          display: 'block',
        }}
      />

      {/* Gradient overlay */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(to top, rgba(5,2,1,0.96) 0%, rgba(8,4,2,0.68) 38%, rgba(8,4,2,0.22) 68%, rgba(8,4,2,0.06) 100%)',
        pointerEvents: 'none',
      }} />

      {/* Top-left category badge */}
      <div style={{ position: 'absolute', top: 22, left: 24, zIndex: 3 }}>
        <span style={{
          fontFamily: "'Montserrat', sans-serif", fontSize: 10, fontWeight: 700,
          letterSpacing: '0.18em', textTransform: 'uppercase',
          color: '#1C0E04', background: 'rgba(229,192,123,0.95)',
          borderRadius: 50, padding: '5px 14px',
          boxShadow: '0 2px 12px rgba(0,0,0,0.3)',
        }}>
          {slide.label}
        </span>
      </div>

      {/* Bottom content overlay */}
      <div
        key={`text-${current}`}
        style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 3,
          padding: 'clamp(24px,4vw,52px) clamp(20px,5vw,72px)',
          animation: 'heroTextIn 0.7s ease 0.15s both',
        }}
      >
        <h1 style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: 'clamp(26px, 3.8vw, 52px)',
          color: '#FAF0E0', fontWeight: 700,
          lineHeight: 1.15, marginBottom: 10,
          textShadow: '0 3px 16px rgba(0,0,0,0.9)',
          maxWidth: 700,
        }}>
          {slide.title}
        </h1>
        <p style={{
          fontFamily: "'Montserrat', sans-serif",
          fontSize: 'clamp(13px, 1.4vw, 17px)',
          color: 'rgba(245,228,200,0.88)',
          lineHeight: 1.65, marginBottom: 24,
          maxWidth: 520,
          textShadow: '0 2px 10px rgba(0,0,0,0.85)',
          letterSpacing: '0.02em',
        }}>
          {slide.sub}
        </p>

        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center', marginBottom: 28 }}>
          <button
            className="btn-gold"
            onClick={() => { trackEvent('hero_shop_click', { slide: current }); navigate('/store'); }}
            style={{ width: 'auto', padding: '12px 28px', fontSize: 12, letterSpacing: '0.12em', fontFamily: "'Montserrat', sans-serif" }}
          >
            Shop the Collection
          </button>
          <button
            className="btn-ghost"
            onClick={() => { document.getElementById('name-gen')?.scrollIntoView({ behavior: 'smooth' }); }}
            style={{ width: 'auto', padding: '11px 22px', fontSize: 12, letterSpacing: '0.1em', fontFamily: "'Montserrat', sans-serif" }}
          >
            Discover Your Name
          </button>
        </div>

        {/* Progress bar + counter */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <div style={{ flex: 1, height: 2, background: 'rgba(201,165,88,0.25)', borderRadius: 2, overflow: 'hidden', maxWidth: 200 }}>
            <div style={{ height: '100%', width: `${progress}%`, background: '#C9A558', borderRadius: 2, transition: 'width 0.5s ease' }} />
          </div>
          <span style={{ fontFamily: "'Cinzel', serif", fontSize: 10, color: 'rgba(201,165,88,0.55)', letterSpacing: '0.12em' }}>
            {String(current + 1).padStart(2, '0')} / {String(TOTAL).padStart(2, '0')}
          </span>
        </div>
      </div>

      {/* Prev / Next arrows */}
      {[
        { dir: -1, side: 'left', sym: '‹' },
        { dir: 1,  side: 'right', sym: '›' },
      ].map(({ dir, side, sym }) => (
        <button
          key={side}
          onClick={() => { goTo(current + dir); setPaused(false); }}
          style={{
            position: 'absolute', top: '50%', [side]: 18, zIndex: 4,
            transform: 'translateY(-50%)',
            background: 'rgba(10,6,2,0.5)', border: '1px solid rgba(201,165,88,0.35)',
            color: '#C9A558', borderRadius: '50%',
            width: 46, height: 46, fontSize: 24,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', transition: 'background 0.2s', fontFamily: 'serif',
            backdropFilter: 'blur(6px)',
          }}
          onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(201,165,88,0.25)'; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(10,6,2,0.5)'; }}
        >
          {sym}
        </button>
      ))}
    </div>
  );
}

// ─── Trust Bar ────────────────────────────────────────────────────────────────
const TRUST_ITEMS = [
  { icon: '✦', text: 'Authentic Akan Heritage Prints' },
  { icon: '◈', text: 'Premium Cotton Quality' },
  { icon: '◻', text: 'Gift-Ready Packaging' },
  { icon: '◊', text: 'Ships Worldwide' },
];

function TrustBar() {
  return (
    <div style={{
      background: '#1C0E04', borderBottom: '1px solid rgba(201,165,88,0.15)',
      padding: '14px 20px',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      gap: 'clamp(16px,4vw,52px)', flexWrap: 'wrap',
    }}>
      {TRUST_ITEMS.map(({ icon, text }) => (
        <div key={text} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ color: '#C9A558', fontSize: 12 }}>{icon}</span>
          <span style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 11, letterSpacing: '0.1em', color: 'rgba(201,165,88,0.75)', textTransform: 'uppercase', fontWeight: 600 }}>{text}</span>
        </div>
      ))}
    </div>
  );
}

// ─── Category Tiles ───────────────────────────────────────────────────────────
const CATEGORIES = [
  { label: 'T-Shirts', img: pi('group of men and women wearing white t shirt day born.jpeg'), filter: 'T-Shirts' },
  { label: 'Baby Bodysuits', img: pi('toddler abena cream baby suit.jpeg'), filter: 'Babysuits' },
  { label: 'Mugs', img: pi('Akosua Sunday Born Mug.png'), filter: 'Mugs' },
  { label: 'Hoodies', img: pi('new kwabena and abena hoodie.png'), filter: 'Hoodies' },
];

function ShopByCategory() {
  const navigate = useNavigate();
  return (
    <section style={{ padding: 'clamp(32px,5vw,64px) clamp(16px,3vw,36px)', background: '#FAF9F7' }}>
      <div style={{ maxWidth: 1300, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 'clamp(22px,3vw,40px)' }}>
          <p style={{ fontFamily: "'Cinzel', serif", fontSize: 11, letterSpacing: '0.22em', color: '#8A6B2D', textTransform: 'uppercase', marginBottom: 8 }}>Heritage Collection</p>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(24px,3.5vw,36px)', color: '#1a1a1a', fontWeight: 700, lineHeight: 1.2 }}>Shop by Category</h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 'clamp(10px,2vw,20px)' }}>
          {CATEGORIES.map(({ label, img, filter }) => (
            <button
              key={label}
              onClick={() => navigate(`/store?category=${encodeURIComponent(filter)}`)}
              style={{
                position: 'relative', overflow: 'hidden', borderRadius: 14,
                height: 'clamp(200px,28vw,320px)',
                border: 'none', cursor: 'pointer', padding: 0,
                background: '#E8E6E2', display: 'block', width: '100%',
              }}
            >
              <img
                src={img}
                alt={label}
                style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 20%', transition: 'transform 0.4s ease' }}
                onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.04)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}
              />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(5,2,1,0.82) 0%, rgba(5,2,1,0.22) 60%, rgba(5,2,1,0) 100%)', pointerEvents: 'none' }} />
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '18px 18px 20px', textAlign: 'left', pointerEvents: 'none' }}>
                <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(16px,2vw,22px)', color: '#FAF0E0', fontWeight: 700, marginBottom: 6 }}>{label}</div>
                <div style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 11, color: '#C9A558', letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 600 }}>Shop Now →</div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Gold Divider ─────────────────────────────────────────────────────────────
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

// ─── HomePage ─────────────────────────────────────────────────────────────────
export default function HomePage() {
  const navigate = useNavigate();
  const [dob, setDob] = useState('');
  const [gender, setGender] = useState('female');
  const [error, setError] = useState('');

  useSEO({
    title: 'Discover Your Ghanaian Akan Day Name',
    description: 'Enter your birthday and discover your Ghanaian Akan day name. Premium heritage T-shirts, baby bodysuits, mugs, and gift sets celebrating Akan culture. Ships worldwide.',
    image: '/images/afia-hero.jpg',
  });

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

      {/* ── 1. Full-width Hero Carousel ── */}
      <HeroCarousel />

      {/* ── 2. Trust Bar ── */}
      <TrustBar />

      {/* ── 3. Shop by Category ── */}
      <ShopByCategory />

      <GoldDivider />

      {/* ── 4. Name Generator + Cultural Context ── */}
      <section id="name-gen" style={{ padding: 'clamp(40px,6vw,80px) clamp(16px,3vw,36px)', background: 'linear-gradient(180deg, #18100A 0%, #221408 100%)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 'clamp(28px,4vw,60px)', alignItems: 'start' }}>

          {/* Name Generator */}
          <div>
            <div style={{ textAlign: 'center', marginBottom: 24 }}>
              <p style={{ fontFamily: "'Cinzel', serif", fontSize: 11, letterSpacing: '0.22em', color: '#C9A558', textTransform: 'uppercase', marginBottom: 10 }}>
                Akan Tradition
              </p>
              <h2 className="gen-title" style={{ marginBottom: 12 }}>
                Discover Your<br />Ghanaian Day Name
              </h2>
              <p className="gen-desc">
                In Akan tradition, every child is given a name based on the day of the week they were born. Discover yours — then wear it with pride.
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
                    onChange={(e) => { setDob(e.target.value); setError(''); }}
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
                onClick={() => { trackEvent('home_shop_click', { source: 'name_gen' }); navigate('/store'); }}
              >
                Shop Day-Born Gifts
              </button>
            </div>
          </div>

          {/* Cultural context cards */}
          <div>
            <div style={{ textAlign: 'center', marginBottom: 24 }}>
              <p style={{ fontFamily: "'Cinzel', serif", fontSize: 11, letterSpacing: '0.22em', color: '#C9A558', textTransform: 'uppercase', marginBottom: 10 }}>Heritage & Identity</p>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(22px,3vw,30px)', color: '#EDD9BC', marginBottom: 10, fontWeight: 700 }}>What Your Name Reveals</h2>
              <p style={{ fontFamily: "'Times New Roman', Times, serif", fontSize: 15, color: '#D4B896', fontStyle: 'italic', lineHeight: 1.8 }}>
                Every Akan day name carries spiritual meaning, character traits, and a connection to ancestors who bore the same name before you.
              </p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
              {[
                { icon: '📖', title: 'Origin & Heritage', desc: 'The deep cultural roots of your Akan day name' },
                { icon: '⚡', title: 'Traits & Soul', desc: 'Spiritual qualities the Akan associate with your soul' },
                { icon: '✦', title: 'Appellations', desc: 'Ancient praise names your ancestors would have called you' },
                { icon: '🌍', title: 'Divine Energy', desc: 'The planet or element that governs your day' },
              ].map(({ icon, title, desc }) => (
                <div key={title} style={{ background: '#261A11', border: '1px solid rgba(201,165,88,0.2)', borderRadius: 12, padding: '18px 14px', textAlign: 'center' }}>
                  <div style={{ fontSize: 26, marginBottom: 8 }}>{icon}</div>
                  <div style={{ fontFamily: "'Cinzel', serif", fontSize: 12, color: '#C9A558', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 6 }}>{title}</div>
                  <p style={{ color: '#BA9D7C', fontSize: 13, lineHeight: 1.65, margin: 0 }}>{desc}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* ── 5. The Seven Akan Day Names ── */}
      <section style={{ borderTop: '1px solid rgba(201,165,88,0.1)', padding: 'clamp(40px,6vw,72px) clamp(16px,3vw,36px)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 'clamp(24px,4vw,44px)' }}>
            <p style={{ fontFamily: "'Cinzel', serif", fontSize: 11, letterSpacing: '0.22em', color: '#8A6B2D', textTransform: 'uppercase', marginBottom: 10 }}>Akan Calendar</p>
            <h2 className="section-title">The Seven Akan Day Names</h2>
            <p className="section-subtitle">Every soul born carries a name from the day they arrived</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 14 }}>
            {[
              { day: 'Sunday',    male: 'Kwasi',   female: 'Akosua', symbol: '☀️', color: '#C9A558' },
              { day: 'Monday',    male: 'Kwadwo',  female: 'Adwoa',  symbol: '🌙', color: '#a0b4c8' },
              { day: 'Tuesday',   male: 'Kwabena', female: 'Abena',  symbol: '🌊', color: '#b05060' },
              { day: 'Wednesday', male: 'Kwaku',   female: 'Akua',   symbol: '🕷️', color: '#8aaccf' },
              { day: 'Thursday',  male: 'Yaw',     female: 'Yaa',    symbol: '⚡', color: '#5a9e6a' },
              { day: 'Friday',    male: 'Kofi',    female: 'Afia',   symbol: '✨', color: '#C9A558' },
              { day: 'Saturday',  male: 'Kwame',   female: 'Ama',    symbol: '🌟', color: '#9b7fc8' },
            ].map(({ day, male, female, symbol, color }) => (
              <button
                key={day}
                onClick={() => navigate('/store')}
                style={{
                  background: 'rgba(201,165,88,0.04)', border: '1px solid rgba(201,165,88,0.15)',
                  borderRadius: 10, padding: '20px 14px', textAlign: 'center', cursor: 'pointer',
                  transition: 'border-color 0.2s, background 0.2s', width: '100%',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'rgba(201,165,88,0.45)'; e.currentTarget.style.background = 'rgba(201,165,88,0.08)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(201,165,88,0.15)'; e.currentTarget.style.background = 'rgba(201,165,88,0.04)'; }}
              >
                <div style={{ fontSize: 26, marginBottom: 8 }}>{symbol}</div>
                <div style={{ fontFamily: "'Cinzel', serif", fontSize: 10, letterSpacing: '0.14em', color, textTransform: 'uppercase', marginBottom: 6 }}>{day}</div>
                <div style={{ fontFamily: "'Times New Roman', Times, serif", fontSize: 16, color: '#EDD9BC', lineHeight: 1.45 }}>{female}</div>
                <div style={{ fontFamily: "'Times New Roman', Times, serif", fontSize: 14, color: '#BA9D7C', lineHeight: 1.45 }}>{male}</div>
              </button>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: 30 }}>
            <button
              className="btn-gold"
              style={{ width: 'auto', padding: '12px 32px', fontFamily: "'Montserrat', sans-serif", fontSize: 12, letterSpacing: '0.12em' }}
              onClick={() => navigate('/store')}
            >
              Shop All Day-Born Gifts
            </button>
          </div>
        </div>
      </section>

      <GoldDivider />

      {/* ── 6. Testimonials ── */}
      <TestimonialsSection dark />

      {/* ── 7. Explore More ── */}
      <section style={{ borderTop: '1px solid rgba(201,165,88,0.1)', padding: 'clamp(40px,5vw,72px) clamp(16px,3vw,36px)', background: 'rgba(201,165,88,0.02)' }}>
        <div style={{ maxWidth: 860, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 'clamp(22px,3vw,36px)' }}>
            <h2 className="gen-title" style={{ marginBottom: 8 }}>Explore More</h2>
            <p className="gen-desc">Heritage, culture, and stories — all in one place</p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {[
              { to: '/store',   icon: '🛍️', label: 'The Store',         desc: 'Browse the full collection of heritage T-shirts, mugs, baby bodysuits, and hoodies' },
              { to: '/stories', icon: '📚', label: 'Stories & Culture',  desc: 'Read Ghanaian folktales, proverbs, and the full book "Outdooring (Aba-Dinto)"' },
              { to: '/about',   icon: '👑', label: 'About Mama Africa',  desc: 'The mission, voice, and cultural legacy behind MamaAfrica Couture' },
            ].map(({ to, icon, label, desc }) => (
              <Link key={to} to={to} style={{ textDecoration: 'none' }}>
                <div
                  className="afia-card"
                  style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '20px 22px', transition: 'border-color 0.2s' }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'rgba(201,165,88,0.5)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = ''; }}
                >
                  <div style={{ fontSize: 28, flexShrink: 0 }}>{icon}</div>
                  <div>
                    <div style={{ fontFamily: "'Cinzel', serif", fontSize: 13, color: '#C9A558', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 5 }}>{label}</div>
                    <p style={{ color: '#BA9D7C', fontSize: 14, lineHeight: 1.7, margin: 0 }}>{desc}</p>
                  </div>
                  <span style={{ marginLeft: 'auto', color: '#9E7D42', fontSize: 20, flexShrink: 0 }}>→</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
