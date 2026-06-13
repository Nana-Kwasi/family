import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { products } from '../data/products';

// Real active products — day-born T-shirts and baby bodysuits
const featured = [
  products.find((p) => p.id === 27),  // Kofi Friday Born T-Shirt
  products.find((p) => p.id === 39),  // Kwabena Tuesday Born T-Shirt — Blue
  products.find((p) => p.id === 65),  // Akosua Sunday Born Baby Bodysuit
  products.find((p) => p.id === 80),  // Kwame Saturday Born Baby Bodysuit
].filter(Boolean);

export default function WelcomePopup() {
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 900);
    return () => clearTimeout(t);
  }, []);

  if (!visible) return null;

  function close() { setVisible(false); }
  function goStore() { setVisible(false); navigate('/store'); }

  return (
    <div
      onClick={close}
      style={{
        position: 'fixed', inset: 0, zIndex: 2000,
        background: 'rgba(12, 7, 3, 0.85)',
        backdropFilter: 'blur(6px)',
        display: 'flex', alignItems: 'flex-start', justifyContent: 'center',
        overflowY: 'auto',
        padding: '16px 16px 32px',
        animation: 'fadeInOverlay 0.45s ease',
      }}
    >
      <style>{`
        @keyframes fadeInOverlay { from { opacity: 0 } to { opacity: 1 } }
        @keyframes slideUpCard { from { opacity: 0; transform: translateY(28px) } to { opacity: 1; transform: translateY(0) } }
      `}</style>

      <div style={{ width: '100%', maxWidth: 520, margin: 'auto', paddingTop: 8 }}>

        {/* Close button */}
        <div
          onClick={e => e.stopPropagation()}
          style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 6 }}
        >
          <button
            onClick={close}
            style={{
              background: 'rgba(44,26,14,0.95)',
              border: '1px solid rgba(201,165,88,0.4)',
              borderRadius: 50,
              color: '#E8CB82',
              fontSize: 18,
              width: 38, height: 38,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer',
              flexShrink: 0,
              transition: 'background 0.2s',
            }}
            onMouseEnter={e => e.currentTarget.style.background = 'rgba(201,165,88,0.25)'}
            onMouseLeave={e => e.currentTarget.style.background = 'rgba(44,26,14,0.95)'}
            aria-label="Close"
          >
            ×
          </button>
        </div>

        {/* Main card */}
        <div
          onClick={e => e.stopPropagation()}
          style={{
            background: 'linear-gradient(160deg, #2C1A0E 0%, #3A2010 45%, #2A180C 100%)',
            border: '1px solid rgba(201,165,88,0.45)',
            borderRadius: 16,
            padding: 'clamp(24px, 5vw, 40px) clamp(20px, 5vw, 36px) 28px',
            boxShadow: '0 24px 80px rgba(0,0,0,0.7)',
            animation: 'slideUpCard 0.45s cubic-bezier(0.22,1,0.36,1)',
          }}
        >
          {/* Eyebrow */}
          <p style={{
            fontFamily: "'Montserrat', sans-serif", fontSize: 12, fontWeight: 600,
            letterSpacing: '0.24em', color: '#C9A558',
            textTransform: 'uppercase', marginBottom: 14, textAlign: 'center',
          }}>
            ✦ &nbsp; Akan Heritage Collection
          </p>

          {/* Headline */}
          <h2 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 'clamp(20px, 5vw, 30px)',
            color: '#FAF0E0',
            fontWeight: 700,
            lineHeight: 1.25,
            textAlign: 'center',
            marginBottom: 14,
          }}>
            Wear the Name You Were<br />
            <span style={{ color: '#C9A558' }}>Born With.</span>
          </h2>

          {/* Body */}
          <p style={{
            fontFamily: "'Times New Roman', Times, serif",
            fontSize: 17, color: '#D4B896', fontStyle: 'italic',
            lineHeight: 1.8, textAlign: 'center', marginBottom: 22,
          }}>
            In Akan tradition, the day you were born gives you a name, a spirit, and a legacy.
            Our premium day-born T-shirts and baby bodysuits let you carry that heritage
            with pride — for every generation.
          </p>

          {/* Product grid */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 24 }}>
            {featured.map(p => (
              <div
                key={p.id}
                onClick={() => { setVisible(false); navigate(`/product/${p.id}`); }}
                style={{
                  background: 'rgba(201,165,88,0.06)',
                  border: '1px solid rgba(201,165,88,0.22)',
                  borderRadius: 10, overflow: 'hidden',
                  cursor: 'pointer', transition: 'border-color 0.2s',
                }}
                onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(201,165,88,0.55)'}
                onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(201,165,88,0.22)'}
              >
                <img
                  src={p.image} alt={p.name}
                  style={{ width: '100%', height: 110, objectFit: 'cover', display: 'block' }}
                />
                <div style={{ padding: '10px 12px' }}>
                  <p style={{
                    fontFamily: "'Playfair Display', serif", fontSize: 13,
                    color: '#EDD9BC', lineHeight: 1.3,
                  }}>{p.name}</p>
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <button
            onClick={goStore}
            className="btn-gold"
            style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 13, letterSpacing: '0.14em' }}
          >
            Shop the Collection →
          </button>

          <p style={{
            textAlign: 'center', marginTop: 14,
            fontFamily: "'Montserrat', sans-serif", fontSize: 12,
            color: '#7C5F48', letterSpacing: '0.06em',
            cursor: 'pointer',
          }} onClick={close}>
            No thanks, I'll browse later
          </p>
        </div>
      </div>
    </div>
  );
}
