import React, { useEffect, useMemo, useState, useCallback } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { products, resolveStoreBundle } from '../data/products';
import ProductCard from '../components/ProductCard';
import { buildTrackedExternalUrl } from '../utils/commerceLinks';
import { trackEvent } from '../utils/analytics';
import { getOfficialPurchaseTarget } from '../utils/storefront';

const FAQ_ITEMS = [
  { q: 'How long is delivery?', a: 'Production is typically 2-7 business days before shipping.' },
  { q: 'Will I receive tracking?', a: 'Yes. Tracking details are shared once your order ships.' },
  { q: 'Need support?', a: 'Contact Mamaafricaafia@gmail.com for delivery and order help.' },
];

const BUYER_FEEDBACK = [
  { n: 'Afua, Manchester', t: '“Beautiful finish and premium print quality.”' },
  { n: 'Yaw, Chicago', t: '“Great gift impact and easy support communication.”' },
  { n: 'Nana, Amsterdam', t: '“Tracking and delivery timeline were exactly as promised.”' },
];

export default function BundleDetailPage() {
  const { bundleId } = useParams();
  const navigate = useNavigate();
  const [previewProduct, setPreviewProduct] = useState(null);

  const bundle = useMemo(() => (bundleId ? resolveStoreBundle(bundleId) : null), [bundleId]);

  useEffect(() => {
    if (!bundle) return;
    trackEvent('view_bundle', { bundle_id: bundle.id });
  }, [bundle]);

  const closePreview = useCallback(() => setPreviewProduct(null), []);

  useEffect(() => {
    if (!previewProduct) return undefined;
    const onKey = (e) => {
      if (e.key === 'Escape') closePreview();
    };
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', onKey);
    };
  }, [previewProduct, closePreview]);

  if (!bundle) {
    return (
      <div className="page-wrapper" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '70vh', textAlign: 'center', padding: 20, background: '#F3F1EC' }}>
        <div>
          <p style={{ color: '#5a5a5a', marginBottom: 20, fontFamily: "'Montserrat', sans-serif" }}>This gift set could not be found.</p>
          <button type="button" className="btn-gold" style={{ width: 'auto', padding: '12px 28px' }} onClick={() => navigate('/store')}>
            Back to Store
          </button>
        </div>
      </div>
    );
  }

  const lead = bundle.items[0];
  const bundleIdSet = new Set(bundle.items.map((p) => p.id));
  const related = products.filter((p) => !bundleIdSet.has(p.id)).slice(0, 3);
  const mergedPerfectFor = [...new Set(bundle.items.flatMap((p) => p.perfectFor || []))].slice(0, 6);

  function openExternalBuy(product) {
    const { url: targetUrl } = getOfficialPurchaseTarget(product);
    if (!targetUrl) return;
    const trackedUrl = buildTrackedExternalUrl(targetUrl, {
      campaign: 'bundle_buy',
      content: `bundle_${bundle.id}_${product.id}`,
    });
    trackEvent('click_buy_external', {
      location: 'bundle_detail',
      product_id: product.id,
      product_name: product.name,
      bundle_id: bundle.id,
    });
    window.open(trackedUrl, '_blank', 'noopener,noreferrer');
  }

  return (
    <div className="page-wrapper store-shell store-detail-page" style={{ background: '#F3F1EC' }}>
      {previewProduct && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Product image full screen"
          onClick={closePreview}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 2147483000,
            background: 'rgba(0,0,0,0.94)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 'max(16px, env(safe-area-inset-top)) max(16px, env(safe-area-inset-right)) max(16px, env(safe-area-inset-bottom)) max(16px, env(safe-area-inset-left))',
            WebkitTapHighlightColor: 'transparent',
          }}
        >
          <button
            type="button"
            aria-label="Close image preview"
            onClick={(e) => {
              e.stopPropagation();
              closePreview();
            }}
            style={{
              position: 'absolute',
              top: 'max(12px, env(safe-area-inset-top))',
              right: 'max(12px, env(safe-area-inset-right))',
              zIndex: 2,
              width: 44,
              height: 44,
              borderRadius: '50%',
              border: '1px solid rgba(229,192,123,0.45)',
              background: 'rgba(20,20,20,0.95)',
              color: '#E5C07B',
              fontSize: 26,
              lineHeight: 1,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 0,
            }}
          >
            ×
          </button>
          <img
            src={previewProduct.image}
            alt={previewProduct.name}
            onClick={(e) => e.stopPropagation()}
            style={{
              maxWidth: 'min(96vw, 1200px)',
              maxHeight: 'min(88dvh, 88vh)',
              width: 'auto',
              height: 'auto',
              objectFit: 'contain',
              touchAction: 'pinch-zoom',
            }}
          />
        </div>
      )}

      <div className="store-detail-breadcrumb" style={{ padding: '20px 28px 0', width: '100%', maxWidth: 1440, margin: '0 auto' }}>
        <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 12, color: '#7a7a7a', letterSpacing: '0.08em' }}>
          <Link to="/store" style={{ color: '#8B6914', textDecoration: 'none' }}>Store</Link>
          <span style={{ margin: '0 8px' }}>›</span>
          <span style={{ color: '#3a3a3a' }}>{bundle.title}</span>
        </p>
      </div>

      <section className="store-detail-main-wrap" style={{ padding: '26px 28px 56px', width: '100%', maxWidth: 1440, margin: '0 auto' }}>
        <div className="store-detail-main-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: 34,
          alignItems: 'flex-start',
        }}
        >
          <div>
            <div style={{
              background: '#FAF9F7',
              borderRadius: 16,
              overflow: 'hidden',
              border: '1px solid rgba(26,26,26,0.1)',
              boxShadow: '0 8px 22px rgba(0,0,0,0.08)',
              position: 'relative',
            }}
            >
              <div
                style={{
                  background: '#E8E6E2',
                  minHeight: 280,
                  height: 'clamp(280px, 56vh, 560px)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 12,
                  padding: 12,
                  boxSizing: 'border-box',
                }}
              >
                {bundle.items.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setPreviewProduct(item)}
                    aria-label={`View ${item.name} full screen`}
                    style={{
                      flex: 1,
                      minHeight: 0,
                      padding: 10,
                      margin: 0,
                      cursor: 'zoom-in',
                      borderRadius: 10,
                      overflow: 'hidden',
                      position: 'relative',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      background: '#FAF9F7',
                      border: '1px solid rgba(0,0,0,0.06)',
                      WebkitAppearance: 'none',
                      boxSizing: 'border-box',
                    }}
                  >
                    <img
                      src={item.image}
                      alt=""
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
                    <span
                      style={{
                        position: 'absolute',
                        bottom: 8,
                        left: 8,
                        background: 'rgba(17,17,17,0.72)',
                        color: '#FAF9F7',
                        fontFamily: "'Montserrat', sans-serif",
                        fontSize: 10,
                        letterSpacing: '0.08em',
                        textTransform: 'uppercase',
                        padding: '4px 10px',
                        borderRadius: 6,
                      }}
                    >
                      {item.label}
                    </span>
                  </button>
                ))}
              </div>
              <span style={{
                position: 'absolute', top: 16, right: 16,
                pointerEvents: 'none',
                background: 'linear-gradient(135deg, #E5C07B 0%, #C9A54C 65%, #8A6B2D 100%)',
                color: '#111111',
                fontFamily: "'Montserrat', sans-serif", fontSize: 11, letterSpacing: '0.1em', fontWeight: 700,
                padding: '4px 12px', borderRadius: 50, textTransform: 'uppercase',
              }}
              >
                Gift set
              </span>
            </div>
            <p style={{
              margin: '10px 0 0',
              textAlign: 'center',
              fontFamily: "'Montserrat', sans-serif",
              fontSize: 11,
              letterSpacing: '0.08em',
              color: '#7a7a7a',
            }}
            >
              Tap any photo to view full screen
            </p>
          </div>

          <div className="store-detail-info-card" style={{
            border: '1px solid rgba(26,26,26,0.1)',
            borderRadius: 16,
            background: '#FAF9F7',
            boxShadow: '0 8px 22px rgba(0,0,0,0.06)',
            padding: 26,
          }}
          >
            <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 11, letterSpacing: '0.18em', color: '#8B6914', textTransform: 'uppercase', marginBottom: 10 }}>
              {bundle.subtitle}
            </p>
            <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(24px, 4vw, 38px)', color: '#1a1a1a', fontWeight: 700, lineHeight: 1.2, marginBottom: 12 }}>
              {bundle.title}
            </h1>
            <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 16, color: '#5a5a5a', lineHeight: 1.8, marginBottom: 24 }}>
              {bundle.desc}
            </p>

            <div style={{ marginBottom: 24 }}>
              <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 11, letterSpacing: '0.16em', color: '#6a6a6a', textTransform: 'uppercase', marginBottom: 10 }}>
                {"What's included"}
              </p>
              <ul style={{ listStyle: 'none', padding: 0 }}>
                {bundle.items.map((item) => (
                  <li key={item.id} style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 15, color: '#4a4a4a', padding: '7px 0', borderBottom: '1px solid rgba(0,0,0,0.08)', display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap' }}>
                    <span style={{ color: '#8B6914', flexShrink: 0 }}>+</span>
                    <Link to={`/product/${item.id}`} style={{ color: '#1a1a1a', fontWeight: 600, textDecoration: 'underline', textUnderlineOffset: 2 }}>
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {mergedPerfectFor.length > 0 && (
              <div style={{ marginBottom: 24 }}>
                <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 11, letterSpacing: '0.16em', color: '#6a6a6a', textTransform: 'uppercase', marginBottom: 10 }}>
                  Perfect for
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                  {mergedPerfectFor.map((f) => (
                    <span key={f} style={{
                      fontFamily: "'Montserrat', sans-serif", fontSize: 12, color: '#5c4510',
                      border: '1px solid rgba(201,165,76,0.35)',
                      background: 'rgba(229,192,123,0.12)',
                      borderRadius: 50, padding: '4px 14px', letterSpacing: '0.04em',
                    }}
                    >
                      {f}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div style={{ marginBottom: 28 }}>
              <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 11, letterSpacing: '0.16em', color: '#6a6a6a', textTransform: 'uppercase', marginBottom: 10 }}>
                Sizes & options
              </p>
              <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 14, color: '#5a5a5a', lineHeight: 1.65, margin: 0 }}>
                Open any piece above for full specs, size charts, and individual purchase. Mug sizes (11oz / 15oz) and apparel sizes are chosen on each product page.
              </p>
            </div>

            <div className="store-detail-cta-stack" style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <button
                type="button"
                className="store-btn-primary"
                onClick={() => {
                  openExternalBuy(lead);
                  trackEvent('click_bundle_buy', { bundle_id: bundle.id, product_id: lead.id, location: 'bundle_detail_main' });
                }}
                style={{
                  background: 'var(--store-gold-cta, #E5C07B)',
                  color: '#111111',
                  border: 'none',
                  borderRadius: 8,
                  padding: '13px 18px',
                  fontFamily: "'Montserrat', sans-serif",
                  fontSize: 13,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  fontWeight: 700,
                }}
              >
                Buy now — {lead.label} checkout
              </button>
              <p style={{ margin: 0, fontFamily: "'Montserrat', sans-serif", fontSize: 11, color: '#6a6a6a', textAlign: 'center', letterSpacing: '0.04em' }}>
                Opens the same official partner checkout as the store. Add other pieces from their site if you want the full set in one order when available.
              </p>
              <button
                type="button"
                className="store-btn-outline"
                onClick={() => navigate('/store')}
                style={{
                  background: 'transparent',
                  color: '#1a1a1a',
                  border: '1px solid rgba(139,105,20,0.45)',
                  borderRadius: 8,
                  padding: '13px 18px',
                  fontFamily: "'Montserrat', sans-serif",
                  fontSize: 13,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  fontWeight: 700,
                }}
              >
                Back to Store
              </button>
            </div>
            <div style={{ marginTop: 12, padding: '10px 12px', border: '1px solid rgba(201,165,76,0.3)', borderRadius: 8, background: 'rgba(229,192,123,0.1)' }}>
              <p style={{ margin: 0, fontFamily: "'Montserrat', sans-serif", fontSize: 12, color: '#4a4a4a', lineHeight: 1.6 }}>
                Secure checkout partner. Order processing, shipping updates, and delivery tracking are handled after purchase.
                {' '}
                <Link to="/shipping-returns" style={{ color: '#8B6914', textDecoration: 'underline' }}>Shipping & Returns</Link>
              </p>
            </div>
            <div style={{ marginTop: 10, border: '1px solid rgba(201,165,76,0.28)', borderRadius: 999, background: '#EFEDE8', padding: '7px 12px', display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ color: '#6B5420', fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', fontFamily: "'Cinzel', serif" }}>Legal & Trust</span>
              <Link to="/privacy-policy" style={{ color: '#8B6914', textDecoration: 'underline', fontSize: 11 }}>Privacy</Link>
              <Link to="/terms" style={{ color: '#8B6914', textDecoration: 'underline', fontSize: 11 }}>Terms</Link>
              <Link to="/cookie-policy" style={{ color: '#8B6914', textDecoration: 'underline', fontSize: 11 }}>Cookies</Link>
            </div>
            <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 13, color: '#7a7a7a', marginTop: 16, textAlign: 'center' }}>
              Thoughtful gifting. Gift-ready. Built to last.
            </p>
          </div>
        </div>
      </section>

      <section style={{ padding: '0 28px 40px', width: '100%', maxWidth: 1440, margin: '0 auto' }}>
        <div style={{ border: '1px solid rgba(26,26,26,0.08)', borderRadius: 12, background: '#FAF9F7', padding: 18, boxShadow: '0 6px 18px rgba(0,0,0,0.06)' }}>
          <h3 style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 14, letterSpacing: '0.14em', color: '#8B6914', textTransform: 'uppercase', marginBottom: 14 }}>
            Shipping & Trust FAQ
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 12 }}>
            {FAQ_ITEMS.map((item) => (
              <div key={item.q} style={{ border: '1px solid rgba(201,165,76,0.25)', borderRadius: 10, padding: 12, background: '#FFFCF9' }}>
                <p style={{ margin: '0 0 6px', color: '#8B6914', fontFamily: "'Cinzel', serif", fontSize: 12, letterSpacing: '0.08em' }}>
                  {item.q}
                </p>
                <p style={{ margin: 0, color: '#5a5a5a', fontSize: 13, lineHeight: 1.6 }}>{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: '0 28px 24px', width: '100%', maxWidth: 1440, margin: '0 auto' }}>
        <div style={{ border: '1px solid rgba(26,26,26,0.08)', borderRadius: 12, background: '#FAF9F7', padding: 18, boxShadow: '0 6px 18px rgba(0,0,0,0.06)' }}>
          <h3 style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 14, letterSpacing: '0.14em', color: '#8B6914', textTransform: 'uppercase', marginBottom: 12 }}>
            Buyer Feedback
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 10 }}>
            {BUYER_FEEDBACK.map((r) => (
              <div key={r.n} style={{ border: '1px solid rgba(201,165,76,0.25)', borderRadius: 10, padding: 12, background: '#FFFCF9' }}>
                <p style={{ margin: '0 0 6px', color: '#4a4a4a', fontSize: 13, lineHeight: 1.6 }}>{r.t}</p>
                <p style={{ margin: 0, color: '#8B6914', fontFamily: "'Cinzel', serif", fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase' }}>{r.n}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="store-mobile-sticky-buy">
        <div className="store-mobile-sticky-buy-inner">
          <div style={{ minWidth: 0 }}>
            <div style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#7C5F48' }}>
              Gift set · {bundle.subtitle}
            </div>
          </div>
          <button
            type="button"
            className="store-btn-primary"
            onClick={() => openExternalBuy(lead)}
            style={{
              background: '#111111',
              color: '#E5C07B',
              border: 'none',
              borderRadius: 10,
              padding: '12px 16px',
              fontFamily: "'Montserrat', sans-serif",
              fontSize: 12,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              fontWeight: 700,
              minWidth: 148,
              cursor: 'pointer',
            }}
          >
            Buy now
          </button>
        </div>
      </div>

      {related.length > 0 && (
        <section className="store-related-wrap" style={{ borderTop: '1px solid rgba(201,165,76,0.22)', padding: '56px 28px 80px', background: 'linear-gradient(180deg, rgba(243,241,236,0) 0%, rgba(138,107,45,0.06) 100%)' }}>
          <div style={{ textAlign: 'center', marginBottom: 32 }}>
            <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 11, letterSpacing: '0.2em', color: '#8A6B2D', textTransform: 'uppercase', marginBottom: 8 }}>
              You May Also Like
            </p>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(20px, 4vw, 28px)', color: '#1A1A1A' }}>
              More Thoughtful Gifts
            </h2>
          </div>
          <div className="product-grid store-product-grid" style={{ width: '100%', maxWidth: 'none', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))' }}>
            {related.map((p, idx) => <ProductCard key={p.id} product={p} animationIndex={idx} />)}
          </div>
        </section>
      )}

      <div style={{ textAlign: 'center', padding: '0 20px 64px' }}>
        <button
          type="button"
          className="store-btn-outline"
          style={{
            width: 'auto',
            padding: '12px 36px',
            background: 'transparent',
            border: '1px solid #9F9F9F',
            color: '#555555',
            borderRadius: 8,
            fontFamily: "'Montserrat', sans-serif",
            fontSize: 13,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
          }}
          onClick={() => navigate('/store')}
        >
          ← View Collection
        </button>
      </div>
    </div>
  );
}
