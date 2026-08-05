import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCatalog } from '../contexts/CatalogContext';
import { getTodayBornDay } from '../utils/dayBorn';

export default function WelcomePopup() {
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();
  const { activeDayFeatured, loading } = useCatalog();
  const today = getTodayBornDay();
  const featured = activeDayFeatured(3);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 900);
    return () => clearTimeout(t);
  }, []);

  // The pop-up is built around three product cards, so there is nothing to show until the
  // catalogue has arrived.
  if (!visible || loading || featured.length === 0) return null;

  function close() { setVisible(false); }
  function goStore() { setVisible(false); navigate('/store'); }
  function openProduct(id) { setVisible(false); navigate(`/product/${id}`); }

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
        .wp-tile { transition: transform 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease; }
        .wp-tile:hover { transform: translateY(-4px); border-color: rgba(201,165,88,0.65) !important; box-shadow: 0 12px 28px rgba(0,0,0,0.45); }
      `}</style>

      <div style={{ width: '100%', maxWidth: 560, margin: 'auto', paddingTop: 8 }}>

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
            borderRadius: 18,
            padding: 'clamp(22px, 5vw, 36px) clamp(18px, 5vw, 34px) 26px',
            boxShadow: '0 24px 80px rgba(0,0,0,0.7)',
            animation: 'slideUpCard 0.45s cubic-bezier(0.22,1,0.36,1)',
          }}
        >
          {/* Eyebrow */}
          <p style={{
            fontFamily: "'Montserrat', sans-serif", fontSize: 12, fontWeight: 600,
            letterSpacing: '0.24em', color: '#C9A558',
            textTransform: 'uppercase', marginBottom: 12, textAlign: 'center',
          }}>
            ✦ &nbsp; {today}-Born · Akan Heritage
          </p>

          {/* Headline */}
          <h2 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 'clamp(20px, 5vw, 30px)',
            color: '#FAF0E0',
            fontWeight: 700,
            lineHeight: 1.25,
            textAlign: 'center',
            marginBottom: 12,
          }}>
            Wear the Name You Were<br />
            <span style={{ color: '#C9A558' }}>Born With.</span>
          </h2>

          {/* Body */}
          <p style={{
            fontFamily: "'Times New Roman', Times, serif",
            fontSize: 16, color: '#D4B896', fontStyle: 'italic',
            lineHeight: 1.7, textAlign: 'center', marginBottom: 22,
            maxWidth: 460, marginLeft: 'auto', marginRight: 'auto',
          }}>
            In Akan tradition, the day you were born gives you a name, a spiritual identity, and a legacy.
            Today we celebrate the <strong style={{ color: '#E8CB82', fontStyle: 'normal' }}>{today}-born</strong> —
            carry the name with our premium pieces.
          </p>

          {/* Featured tiles — today's day-born product photography */}
          <div style={{ display: 'grid', gridTemplateColumns: `repeat(${Math.max(featured.length, 1)}, 1fr)`, gap: 'clamp(8px, 2vw, 14px)', marginBottom: 24 }}>
            {featured.map((p) => (
              <button
                key={p.id}
                type="button"
                className="wp-tile"
                onClick={() => openProduct(p.id)}
                style={{
                  border: '1px solid rgba(201,165,88,0.3)',
                  borderRadius: 12,
                  overflow: 'hidden',
                  cursor: 'pointer',
                  padding: 0,
                  background: 'linear-gradient(180deg, #FBF8F2 0%, #EFE7D8 100%)',
                  display: 'block',
                }}
              >
                <div style={{
                  width: '100%', aspectRatio: '3 / 4',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <img
                    src={p.image}
                    alt={p.name}
                    loading="lazy"
                    style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }}
                  />
                </div>
              </button>
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
