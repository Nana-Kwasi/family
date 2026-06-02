import React from 'react';
import { Link } from 'react-router-dom';
import { buildTrackedExternalUrl } from '../utils/commerceLinks';
import { trackEvent } from '../utils/analytics';
import { getOfficialPurchaseTarget } from '../utils/storefront';

const ExternalIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/>
    <polyline points="15 3 21 3 21 9"/>
    <line x1="10" y1="14" x2="21" y2="3"/>
  </svg>
);

export default function ProductCard({ product, animationIndex = 0 }) {
  const { url: targetUrl } = getOfficialPurchaseTarget(product);
  const buyLabel = 'Buy now';

  function handleShop(e) {
    e.preventDefault();
    e.stopPropagation();
    if (!targetUrl) {
      alert('Our store is coming soon! Check back shortly.');
      return;
    }
    const trackedUrl = buildTrackedExternalUrl(targetUrl, {
      campaign: 'store_buy',
      content: `card_${product.id}`,
    });
    trackEvent('click_buy_external', {
      location: 'product_card',
      product_id: product.id,
      product_name: product.name,
    });
    window.open(trackedUrl, '_blank', 'noopener,noreferrer');
  }

  const blurb = product.cardBlurb || product.tagline || '';

  return (
    <article
      className="store-product-card store-card-fade-in store-product-card--split"
      aria-labelledby={`store-card-title-${product.id}`}
      style={{
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        borderRadius: 14,
        animationDelay: `${Math.min(animationIndex, 11) * 55}ms`,
      }}
    >
      <Link
        to={`/product/${product.id}`}
        className="store-product-card__media"
        style={{
          position: 'relative',
          display: 'block',
          textDecoration: 'none',
          color: 'inherit',
        }}
      >
        <span
          style={{
            position: 'absolute',
            top: 10,
            right: 10,
            zIndex: 1,
            background: 'linear-gradient(135deg, #E5C07B 0%, #C9A54C 70%, #8A6B2D 100%)',
            color: '#111111',
            fontFamily: "'Montserrat', sans-serif",
            fontSize: 9,
            letterSpacing: '0.1em',
            fontWeight: 700,
            padding: '4px 9px',
            borderRadius: 999,
            textTransform: 'uppercase',
            boxShadow: '0 2px 8px rgba(0,0,0,0.12)',
          }}
        >
          {product.label || product.type}
        </span>
        {product.bornDay && (
          <span
            style={{
              position: 'absolute',
              top: 10,
              left: 10,
              zIndex: 1,
              background: 'rgba(26,26,26,0.82)',
              color: '#E5C07B',
              fontFamily: "'Montserrat', sans-serif",
              fontSize: 9,
              letterSpacing: '0.08em',
              fontWeight: 600,
              padding: '4px 9px',
              borderRadius: 999,
              backdropFilter: 'blur(4px)',
            }}
          >
            {product.bornDay}-born
          </span>
        )}
        <div
          className="store-product-card__well"
          style={{
            aspectRatio: '1 / 1',
            width: '100%',
            background: '#E8E6E2',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 16,
            boxSizing: 'border-box',
          }}
        >
          <img
            className="store-product-image store-product-card__img"
            src={product.image}
            alt={product.name}
            decoding="async"
            style={{
              maxWidth: '100%',
              maxHeight: '100%',
              width: 'auto',
              height: 'auto',
              objectFit: 'contain',
              objectPosition: 'center',
              display: 'block',
            }}
          />
        </div>
      </Link>

      <div
        className="store-product-card__body"
        style={{
          padding: '16px 16px 18px',
          background: '#FAF9F7',
          borderTop: '1px solid rgba(0,0,0,0.06)',
          display: 'flex',
          flexDirection: 'column',
          gap: 0,
          flex: 1,
        }}
      >
        <Link
          to={`/product/${product.id}`}
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            gap: 14,
            textDecoration: 'none',
            marginBottom: 8,
          }}
        >
          <h3
            id={`store-card-title-${product.id}`}
            className="store-product-title"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(16px, 2.2vw, 19px)',
              color: '#1a1a1a',
              letterSpacing: '0.01em',
              margin: 0,
              lineHeight: 1.35,
              fontWeight: 700,
              flex: '1 1 auto',
              minWidth: 0,
            }}
          >
            {product.name}
          </h3>
        </Link>

        <p
          style={{
            margin: '0 0 14px',
            fontFamily: "'Montserrat', sans-serif",
            fontSize: 13,
            lineHeight: 1.45,
            color: '#5a5a5a',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          {blurb}
        </p>

        <div className="store-product-card-actions store-product-card-actions--official" style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 'auto' }}>
          <button
            type="button"
            className="store-btn-primary store-btn-primary--full"
            onClick={handleShop}
            style={{
              width: '100%',
              background: 'linear-gradient(135deg, #E5C07B 0%, #C9A54C 100%)',
              color: '#111111',
              border: '1px solid rgba(139,105,20,0.35)',
              borderRadius: 999,
              padding: '11px 16px',
              fontFamily: "'Montserrat', sans-serif",
              fontSize: 12,
              letterSpacing: '0.1em',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
              textTransform: 'uppercase',
              fontWeight: 700,
              transition: 'all 0.2s ease',
              boxShadow: '0 4px 14px rgba(139,105,20,0.2)',
            }}
          >
            <ExternalIcon /> {buyLabel}
          </button>
          <Link
            to={`/product/${product.id}`}
            style={{
              display: 'block',
              textAlign: 'center',
              fontFamily: "'Montserrat', sans-serif",
              fontSize: 11,
              letterSpacing: '0.06em',
              color: '#8B6914',
              textDecoration: 'underline',
            }}
          >
            Sizes & details
          </Link>
        </div>
      </div>
    </article>
  );
}
