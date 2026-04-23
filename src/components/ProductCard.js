import React from 'react';
import { Link } from 'react-router-dom';

// Replace with Afia's real Printify storefront URL when available
const PRINTIFY_STORE_URL = '#';

const ExternalIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/>
    <polyline points="15 3 21 3 21 9"/>
    <line x1="10" y1="14" x2="21" y2="3"/>
  </svg>
);

export default function ProductCard({ product }) {
  function handleShop() {
    if (PRINTIFY_STORE_URL === '#') {
      alert('Our store is coming soon! Check back shortly.');
      return;
    }
    window.open(PRINTIFY_STORE_URL, '_blank', 'noopener,noreferrer');
  }

  return (
    <div className="afia-card" style={{ display: 'flex', flexDirection: 'column', gap: 0, padding: 0, overflow: 'hidden' }}>
      {/* Product image — links to detail page */}
      <Link to={`/product/${product.id}`} style={{ textDecoration: 'none' }}>
      <div style={{ background: '#231510', height: 240, overflow: 'hidden', position: 'relative', cursor: 'pointer' }}>
        <img
          src={product.image}
          alt={product.name}
          style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s ease' }}
          onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.04)'}
          onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
        />
        <div style={{
          position: 'absolute', top: 12, right: 12,
          background: 'rgba(201,165,88,0.92)', color: '#1C0E04',
          fontFamily: "'Cinzel', serif", fontSize: 11, letterSpacing: '0.1em',
          padding: '3px 10px', borderRadius: 50, textTransform: 'uppercase',
        }}>
          {product.label || product.type}
        </div>
        {/* Gift Ready badge */}
        <div style={{
          position: 'absolute', top: 12, left: 12,
          background: 'rgba(180,100,60,0.85)', color: '#fff',
          fontFamily: "'Montserrat', sans-serif", fontSize: 9, letterSpacing: '0.1em',
          padding: '3px 8px', borderRadius: 50, textTransform: 'uppercase',
        }}>
          Gift Ready
        </div>
      </div>
      </Link>

      <div style={{ padding: '20px 20px 24px', display: 'flex', flexDirection: 'column', flex: 1 }}>
        {/* Tagline */}
        {product.tagline && (
          <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 11, letterSpacing: '0.12em', color: '#C9A558', textTransform: 'uppercase', marginBottom: 6 }}>
            {product.tagline}
          </p>
        )}

        {/* Name — links to detail page */}
        <Link to={`/product/${product.id}`} style={{ textDecoration: 'none' }}>
          <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 19, color: '#EDD9BC', letterSpacing: '0.02em', marginBottom: 8, lineHeight: 1.4, transition: 'color 0.2s' }}
            onMouseEnter={e => e.currentTarget.style.color = '#C9A558'}
            onMouseLeave={e => e.currentTarget.style.color = '#EDD9BC'}
          >
            {product.name}
          </h3>
        </Link>

        {/* Description */}
        <p style={{ color: '#BA9D7C', fontSize: 16, lineHeight: 1.85, marginBottom: 14, fontFamily: "'Times New Roman', Times, serif" }}>
          {product.description}
        </p>

        {/* Perfect For */}
        {product.perfectFor && product.perfectFor.length > 0 && (
          <div style={{ marginBottom: 14 }}>
            <p style={{ fontFamily: "'Cinzel', serif", fontSize: 10, letterSpacing: '0.14em', color: '#9E7D42', textTransform: 'uppercase', marginBottom: 6 }}>
              Perfect For
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {product.perfectFor.map((f, i) => (
                <span key={i} style={{
                  fontFamily: "'Montserrat', sans-serif", fontSize: 11,
                  color: '#C9A558', border: '1px solid rgba(201,165,88,0.3)',
                  borderRadius: 50, padding: '2px 10px', letterSpacing: '0.04em',
                }}>{f}</span>
              ))}
            </div>
          </div>
        )}

        {/* Sizes */}
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 18 }}>
          {product.sizes.slice(0, 6).map(s => (
            <span key={s} style={{
              fontFamily: "'Cinzel', serif", fontSize: 12, letterSpacing: '0.08em',
              color: '#BA9D7C', border: '1px solid rgba(201,165,88,0.2)',
              borderRadius: 3, padding: '3px 9px',
            }}>{s}</span>
          ))}
        </div>

        {/* Price + CTA */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 'auto' }}>
          <div style={{ fontFamily: "'Cinzel', serif", fontSize: 24, color: '#C9A558', letterSpacing: '0.05em' }}>
            ${product.price}
          </div>
          <button
            onClick={handleShop}
            style={{
              background: 'linear-gradient(135deg, #C9A558, #E8CB82)',
              color: '#1C0E04', border: 'none', borderRadius: 6,
              padding: '10px 18px', fontFamily: "'Montserrat', sans-serif",
              fontSize: 12, letterSpacing: '0.1em', cursor: 'pointer',
              display: 'flex', alignItems: 'center', gap: 7,
              textTransform: 'uppercase', fontWeight: 600,
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.boxShadow = '0 4px 16px rgba(201,165,88,0.35)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = ''; }}
          >
            <ExternalIcon /> Gift This
          </button>
        </div>
      </div>
    </div>
  );
}
