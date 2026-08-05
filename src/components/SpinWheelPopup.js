import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import confetti from 'canvas-confetti';
import { useCatalog } from '../contexts/CatalogContext';
import { trackEvent } from '../utils/analytics';

// Sunday → Saturday, with authentic kente-cloth colours.
const DAYS = [
  { day: 'Sunday',    female: 'Akosua', male: 'Kwasi',   spirit: 'Strength, leadership, and the power of the sun.',          color: '#E3A81D', accent: '#FFD75E' },
  { day: 'Monday',    female: 'Adwoa',  male: 'Kwadwo',  spirit: 'Peace, patience, and the calm of still water.',            color: '#1B8A4C', accent: '#3FD07F' },
  { day: 'Tuesday',   female: 'Abena',  male: 'Kwabena', spirit: 'Passion, fire, and the heart of a protector.',             color: '#CC1E2C', accent: '#FF6B6B' },
  { day: 'Wednesday', female: 'Akua',   male: 'Kwaku',   spirit: 'Wisdom and wit — born under Anansi the storyteller.',      color: '#161616', accent: '#E5C158' },
  { day: 'Thursday',  female: 'Yaa',    male: 'Yaw',     spirit: 'Endurance and nurture — the foundation others build on.',  color: '#1F5FA6', accent: '#5EA8E5' },
  { day: 'Friday',    female: 'Afia',   male: 'Kofi',    spirit: 'Love, beauty, and boundless creativity.',                  color: '#E0761A', accent: '#FFB061' },
  { day: 'Saturday',  female: 'Ama',    male: 'Kwame',   spirit: 'Divinely touched — a gift meant for the world.',           color: '#8E2233', accent: '#D85A6E' },
];
const N = DAYS.length;
const SEG = 360 / N;
const R = 150;

function rim(angleDeg, radius = R) {
  const a = ((angleDeg - 90) * Math.PI) / 180;
  return [radius * Math.cos(a), radius * Math.sin(a)];
}
function slicePath(i) {
  const [x1, y1] = rim(i * SEG);
  const [x2, y2] = rim((i + 1) * SEG);
  return `M 0 0 L ${x1.toFixed(2)} ${y1.toFixed(2)} A ${R} ${R} 0 0 1 ${x2.toFixed(2)} ${y2.toFixed(2)} Z`;
}

// A type-varied set of that day's products: a jersey, a mug, and a shirt.
function pickDayProducts(products, day) {
  const all = products.filter((p) => p.bornDay === day);
  const pick = [];
  const used = new Set();
  const take = (pred) => {
    const p = all.find((x) => pred(x) && !used.has(x.id));
    if (p) { pick.push(p); used.add(p.id); }
  };
  take((p) => p.collection === 'Ghana Spotlight');                        // a Black Stars jersey
  take((p) => p.type === 'mug');                                          // a mug
  take((p) => p.type === 'tshirt' && p.collection !== 'Ghana Spotlight'); // a heritage shirt
  take((p) => p.type === 'babysuit');                                     // a baby onesie
  for (const p of all) { if (pick.length >= 3) break; if (!used.has(p.id)) { pick.push(p); used.add(p.id); } }
  return pick.slice(0, 3);
}

export default function SpinWheelPopup({ onClose }) {
  const navigate = useNavigate();
  const [rotation, setRotation] = useState(0);
  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState(null);
  const pending = useRef(0);
  const { products } = useCatalog();

  const dayProducts = result ? pickDayProducts(products, result.day) : [];

  function spin() {
    if (spinning) return;
    setResult(null);
    const i = Math.floor(Math.random() * N);
    pending.current = i;
    const targetMod = (360 - (i * SEG + SEG / 2)) % 360;
    const currentMod = ((rotation % 360) + 360) % 360;
    const delta = (targetMod - currentMod + 360) % 360;
    const jitter = (Math.random() - 0.5) * SEG * 0.6;
    setRotation(rotation + 360 * 6 + delta + jitter);
    setSpinning(true);
    trackEvent('spin_wheel', {});
  }

  function onDone() {
    if (!spinning) return;
    setSpinning(false);
    const r = DAYS[pending.current];
    setResult(r);
    confetti({ particleCount: 140, spread: 95, origin: { y: 0.4 }, zIndex: 3000, colors: ['#E3A81D', '#1B8A4C', '#CC1E2C', '#1F5FA6', '#E0761A', '#FFD75E', '#ffffff'] });
    trackEvent('spin_wheel_result', { day: r.day });
  }

  function close() { if (onClose) onClose(); }
  function openProduct(id) { close(); navigate(`/product/${id}`); }

  return (
    <div
      onClick={close}
      style={{
        position: 'fixed', inset: 0, zIndex: 2000,
        background: 'rgba(10,6,3,0.88)', backdropFilter: 'blur(7px)',
        display: 'flex', alignItems: 'flex-start', justifyContent: 'center',
        overflowY: 'auto', padding: '16px 16px 36px', animation: 'fadeInOverlay 0.45s ease',
      }}
    >
      <style>{`
        @keyframes fadeInOverlay { from {opacity:0} to {opacity:1} }
        @keyframes slideUpCard { from {opacity:0; transform:translateY(28px)} to {opacity:1; transform:translateY(0)} }
        @keyframes spinResultIn { from {opacity:0; transform:translateY(14px)} to {opacity:1; transform:translateY(0)} }
        .spin-prod:hover { transform: translateY(-3px); border-color: rgba(201,165,88,0.6) !important; }
      `}</style>

      <div style={{ width: '100%', maxWidth: 620, margin: 'auto', paddingTop: 6 }}>
        {/* close */}
        <div onClick={(e) => e.stopPropagation()} style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 6 }}>
          <button
            onClick={close}
            aria-label="Close"
            style={{ background: 'rgba(44,26,14,0.95)', border: '1px solid rgba(201,165,88,0.4)', borderRadius: 50, color: '#E8CB82', fontSize: 18, width: 38, height: 38, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
          >×</button>
        </div>

        {/* card */}
        <div
          onClick={(e) => e.stopPropagation()}
          style={{
            background: 'linear-gradient(165deg, #241608 0%, #3A2310 50%, #1E1206 100%)',
            border: '1px solid rgba(201,165,88,0.5)', borderRadius: 20,
            padding: 'clamp(22px,5vw,34px) clamp(18px,5vw,30px) 26px',
            boxShadow: '0 26px 90px rgba(0,0,0,0.75)', animation: 'slideUpCard 0.5s cubic-bezier(0.22,1,0.36,1)', textAlign: 'center',
          }}
        >
          {/* kente top bar */}
          <div style={{ display: 'flex', height: 5, borderRadius: 4, overflow: 'hidden', marginBottom: 18 }}>
            {['#E3A81D', '#1B8A4C', '#CC1E2C', '#161616', '#1F5FA6', '#E0761A', '#8E2233'].map((c, i) => <div key={i} style={{ flex: 1, background: c }} />)}
          </div>

          <p style={{ fontFamily: "'Cinzel', serif", fontSize: 11, letterSpacing: '0.24em', color: '#C9A558', textTransform: 'uppercase', marginBottom: 8 }}>
            ✦ &nbsp; Akan Day-Born Wheel &nbsp; ✦
          </p>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(20px,4.4vw,27px)', color: '#FAF0E0', fontWeight: 700, lineHeight: 1.2, margin: '0 0 14px' }}>
            Spin to Discover Your <span style={{ color: '#C9A558' }}>Day-Born Name</span>
          </h2>

          {/* wheel */}
          <div style={{ position: 'relative', width: 'min(280px, 62vw)', aspectRatio: '1 / 1', margin: '0 auto 12px' }}>
            <div style={{ position: 'absolute', top: -4, left: '50%', transform: 'translateX(-50%)', zIndex: 4, width: 0, height: 0, borderLeft: '14px solid transparent', borderRight: '14px solid transparent', borderTop: '24px solid #E8CB82', filter: 'drop-shadow(0 2px 3px rgba(0,0,0,0.5))' }} />
            <div
              onTransitionEnd={onDone}
              style={{ width: '100%', height: '100%', borderRadius: '50%', transform: `rotate(${rotation}deg)`, transition: spinning ? 'transform 4.6s cubic-bezier(0.16,0.84,0.25,1)' : 'none', boxShadow: '0 16px 44px rgba(0,0,0,0.5), 0 0 0 9px #1a1a1a, 0 0 0 12px #C9A558' }}
            >
              <svg viewBox="-160 -160 320 320" style={{ width: '100%', height: '100%', display: 'block', borderRadius: '50%' }}>
                {DAYS.map((d, i) => {
                  const mid = i * SEG + SEG / 2;
                  const [lx, ly] = rim(mid, R * 0.6);
                  const flip = mid > 90 && mid < 270;
                  return (
                    <g key={d.day}>
                      <path d={slicePath(i)} fill={d.color} stroke="#FBE9C2" strokeWidth="2.5" />
                      <text x={lx} y={ly} transform={`rotate(${flip ? mid + 180 : mid}, ${lx}, ${ly})`} fill="#fff" fontFamily="'Montserrat', sans-serif" fontWeight="700" fontSize="14.5" textAnchor="middle" dominantBaseline="middle" style={{ textShadow: '0 1px 2px rgba(0,0,0,0.45)' }}>
                        {d.day}
                      </text>
                    </g>
                  );
                })}
                <circle r="29" fill="#1a1a1a" stroke="#C9A558" strokeWidth="3" />
                <text y="1" fill="#C9A558" fontFamily="'Cinzel', serif" fontWeight="700" fontSize="26" textAnchor="middle" dominantBaseline="middle">★</text>
              </svg>
            </div>
          </div>

          <button
            onClick={spin}
            disabled={spinning}
            className="btn-gold"
            style={{ width: 'auto', padding: '13px 38px', fontSize: 14, letterSpacing: '0.16em', fontFamily: "'Montserrat', sans-serif", opacity: spinning ? 0.6 : 1, cursor: spinning ? 'default' : 'pointer' }}
          >
            {spinning ? 'Spinning…' : (result ? 'Spin Again' : 'Spin the Wheel')}
          </button>

          {/* result */}
          {result && (
            <div style={{ marginTop: 22, animation: 'spinResultIn 0.5s ease' }}>
              <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 11, letterSpacing: '0.2em', color: result.accent, textTransform: 'uppercase', marginBottom: 6, fontWeight: 700 }}>
                {result.day}-Born
              </p>
              <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(22px,5vw,30px)', color: '#FAF0E0', fontWeight: 700, margin: '0 0 6px', lineHeight: 1.2 }}>
                <span style={{ color: '#C9A558' }}>{result.female}</span> &amp; <span style={{ color: '#C9A558' }}>{result.male}</span>
              </h3>
              <p style={{ fontFamily: "'EB Garamond', serif", fontSize: 16, color: '#D4B896', fontStyle: 'italic', lineHeight: 1.65, margin: '0 auto 18px', maxWidth: 400 }}>
                {result.spirit}
              </p>

              {dayProducts.length > 0 && (
                <>
                  <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 10, letterSpacing: '0.16em', color: '#9E7D42', textTransform: 'uppercase', marginBottom: 12 }}>
                    Shop {result.day}-Born Gifts
                  </p>
                  <div style={{ display: 'grid', gridTemplateColumns: `repeat(${dayProducts.length}, 1fr)`, gap: 10, marginBottom: 18 }}>
                    {dayProducts.map((p) => (
                      <button
                        key={p.id}
                        type="button"
                        className="spin-prod"
                        onClick={() => openProduct(p.id)}
                        style={{ border: '1px solid rgba(201,165,88,0.3)', borderRadius: 12, overflow: 'hidden', cursor: 'pointer', padding: 0, background: 'linear-gradient(180deg,#FBF8F2,#EFE7D8)', display: 'block', transition: 'transform .2s, border-color .2s' }}
                      >
                        <div style={{ width: '100%', aspectRatio: '1 / 1', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <img src={p.image} alt={p.name} loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }} />
                        </div>
                        <div style={{ padding: '7px 6px 9px', fontFamily: "'Montserrat', sans-serif", fontSize: 9.5, color: '#5a4a2a', lineHeight: 1.3, textAlign: 'center' }}>
                          {p.collection === 'Ghana Spotlight' ? 'Jersey' : (p.label || p.type)}
                        </div>
                      </button>
                    ))}
                  </div>
                </>
              )}

              <button
                onClick={() => { close(); navigate(`/store?day=${encodeURIComponent(result.day)}`); }}
                className="btn-gold"
                style={{ width: 'auto', padding: '11px 26px', fontSize: 12, letterSpacing: '0.1em', fontFamily: "'Montserrat', sans-serif" }}
              >
                See all {result.day}-Born gifts →
              </button>
            </div>
          )}

          <p onClick={close} style={{ textAlign: 'center', marginTop: 16, fontFamily: "'Montserrat', sans-serif", fontSize: 12, color: '#7C5F48', letterSpacing: '0.06em', cursor: 'pointer' }}>
            Maybe later
          </p>
        </div>
      </div>
    </div>
  );
}
