import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { products } from '../data/products';

const featured = [
  products.find((p) => p.type === 'hoodie'),
  products.find((p) => p.type === 'mug'),
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

      {/* Card wrapper — centres vertically when content fits, otherwise scrolls */}
      <div style={{ width: '100%', maxWidth: 520, margin: 'auto', paddingTop: 8 }}>

        {/* Close bar — always visible at the top */}
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
            🌸 &nbsp; Limited Edition · Mother's Day Collection
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
            She Gave You Everything —<br />
            <span style={{ color: '#C9A558' }}>Now Give Her Something Unforgettable.</span>
          </h2>

          {/* Body */}
          <p style={{
            fontFamily: "'Times New Roman', Times, serif",
            fontSize: 17, color: '#D4B896', fontStyle: 'italic',
            lineHeight: 1.8, textAlign: 'center', marginBottom: 22,
          }}>
            Our Mother's Day collection features premium, heartfelt gifts crafted to honour
            the remarkable women who shape our world. These are{' '}
            <strong style={{ color: '#E8CB82', fontStyle: 'normal' }}>limited edition</strong> — once
            they're gone, they're gone. Secure hers today before it's too late.
          </p>

          {/* Urgency pill */}
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 22 }}>
            <span style={{
              fontFamily: "'Montserrat', sans-serif", fontSize: 12, fontWeight: 600,
              letterSpacing: '0.12em', textTransform: 'uppercase',
              background: 'rgba(200,130,108,0.18)', color: '#E8A882',
              border: '1px solid rgba(200,130,108,0.35)',
              borderRadius: 50, padding: '5px 16px',
            }}>
              ⏳ &nbsp; Selling fast — limited stock remaining
            </span>
          </div>

          {/* Product previews */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 24 }}>
            {featured.map(p => p && (
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
                    fontFamily: "'Playfair Display', serif", fontSize: 14,
                    color: '#EDD9BC', lineHeight: 1.3, marginBottom: 4,
                  }}>{p.name}</p>
                  <p style={{ fontFamily: "'Cinzel', serif", fontSize: 14, color: '#C9A558' }}>
                    ${p.price}
                  </p>
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
