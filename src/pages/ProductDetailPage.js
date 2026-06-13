import React, { useEffect, useState, useCallback } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { products } from '../data/products';
import ProductCard from '../components/ProductCard';
import { buildTrackedExternalUrl } from '../utils/commerceLinks';
import { trackEvent } from '../utils/analytics';
import { getOfficialPurchaseTarget } from '../utils/storefront';

export default function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = products.find(p => p.id === Number(id));
  const [selectedSize, setSelectedSize] = useState('');
  const [feedbackMsg, setFeedbackMsg] = useState('');
  const [imagePreviewOpen, setImagePreviewOpen] = useState(false);
  const [activeImgIdx, setActiveImgIdx] = useState(0);
  const { url: targetUrl } = product ? getOfficialPurchaseTarget(product) : { url: '' };
  const buyLabel = 'Buy now';
  const galleryImages = product?.images || (product ? [product.image] : []);
  const currentImage = galleryImages[activeImgIdx] || (product?.image ?? '');

  useEffect(() => {
    if (!product) return;
    trackEvent('view_product', {
      product_id: product.id,
      product_name: product.name,
      product_type: product.type,
    });
  }, [product]);

  const closeImagePreview = useCallback(() => setImagePreviewOpen(false), []);

  useEffect(() => {
    if (!imagePreviewOpen) return undefined;
    const onKey = (e) => {
      if (e.key === 'Escape') closeImagePreview();
    };
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', onKey);
    };
  }, [imagePreviewOpen, closeImagePreview]);

  function handleExternalPurchase() {
    if (!targetUrl) {
      setFeedbackMsg('Store link is not configured yet.');
      setTimeout(() => setFeedbackMsg(''), 3000);
      return;
    }
    const trackedUrl = buildTrackedExternalUrl(targetUrl, {
      campaign: 'product_detail_buy',
      content: `detail_${product.id}`,
    });
    trackEvent('click_buy_external', {
      location: 'product_detail',
      product_id: product.id,
      product_name: product.name,
      selected_size: selectedSize || '',
    });
    window.open(trackedUrl, '_blank', 'noopener,noreferrer');
  }

  if (!product) {
    return (
      <div className="page-wrapper" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '70vh', textAlign: 'center', padding: 20, background: '#F3F1EC' }}>
        <div>
          <p style={{ color: '#5a5a5a', marginBottom: 20, fontFamily: "'Montserrat', sans-serif" }}>This product could not be found.</p>
          <button className="btn-gold" style={{ width: 'auto', padding: '12px 28px' }} onClick={() => navigate('/store')}>
            Back to Store
          </button>
        </div>
      </div>
    );
  }

  const needsSize = product.sizes && product.sizes.length > 0 && !['11oz', '15oz'].includes(product.sizes[0]) && !['0–3M', '3–6M'].includes(product.sizes[0]);

  // Prefer same day-born (any type), then fall back to same type
  const sameDayRelated = product.bornDay
    ? products.filter(p => p.bornDay === product.bornDay && p.id !== product.id)
    : [];
  const related = sameDayRelated.length >= 3
    ? sameDayRelated.slice(0, 4)
    : [
        ...sameDayRelated,
        ...products.filter(p => p.type === product.type && p.id !== product.id && !sameDayRelated.includes(p)),
      ].slice(0, 4);

  return (
    <div className="page-wrapper store-shell store-detail-page" style={{ background: '#F3F1EC' }}>
      {imagePreviewOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Product image full screen"
          onClick={closeImagePreview}
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
              closeImagePreview();
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
            src={currentImage}
            alt={product.name}
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
          <span style={{ color: '#3a3a3a' }}>{product.name}</span>
        </p>
      </div>

      <section className="store-detail-main-wrap" style={{ padding: '26px 28px 56px', width: '100%', maxWidth: 1440, margin: '0 auto' }}>
        <div className="store-detail-main-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: 34,
          alignItems: 'flex-start',
        }}>
          <div>
            <div style={{
              background: '#FAF9F7',
              borderRadius: 16,
              overflow: 'hidden',
              border: '1px solid rgba(26,26,26,0.1)',
              boxShadow: '0 8px 22px rgba(0,0,0,0.08)',
              position: 'relative',
            }}>
              <button
                type="button"
                onClick={() => setImagePreviewOpen(true)}
                aria-label="View product image full screen"
                style={{
                  display: 'block',
                  width: '100%',
                  border: 'none',
                  padding: 0,
                  margin: 0,
                  cursor: 'zoom-in',
                  background: '#E8E6E2',
                  position: 'relative',
                }}
              >
                <div style={{
                  position: 'relative',
                  minHeight: 280,
                  height: 'clamp(280px, 56vh, 560px)',
                  overflow: 'hidden',
                  boxSizing: 'border-box',
                }}>
                  <img
                    src={currentImage}
                    alt={product.name}
                    style={{
                      position: 'absolute',
                      inset: 0,
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      objectPosition: 'center',
                      display: 'block',
                    }}
                  />
                </div>
              </button>
              <span style={{
                position: 'absolute', top: 16, right: 16,
                pointerEvents: 'none',
                background: 'linear-gradient(135deg, #E5C07B 0%, #C9A54C 65%, #8A6B2D 100%)',
                color: '#111111',
                fontFamily: "'Montserrat', sans-serif", fontSize: 11, letterSpacing: '0.1em', fontWeight: 700,
                padding: '4px 12px', borderRadius: 50, textTransform: 'uppercase',
              }}>
                {product.label}
              </span>
            </div>
            <p style={{
              margin: '10px 0 0',
              textAlign: 'center',
              fontFamily: "'Montserrat', sans-serif",
              fontSize: 11,
              letterSpacing: '0.08em',
              color: '#7a7a7a',
            }}>
              Tap photo to view full screen
            </p>

            {/* Thumbnail strip — only shown when product has multiple images */}
            {galleryImages.length > 1 && (
              <div style={{
                display: 'flex',
                gap: 8,
                marginTop: 12,
                overflowX: 'auto',
                paddingBottom: 4,
                WebkitOverflowScrolling: 'touch',
              }}>
                {galleryImages.map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActiveImgIdx(idx)}
                    aria-label={`View image ${idx + 1}`}
                    style={{
                      flexShrink: 0,
                      width: 68,
                      height: 68,
                      padding: 3,
                      borderRadius: 8,
                      border: activeImgIdx === idx
                        ? '2px solid #C9A54C'
                        : '1px solid rgba(0,0,0,0.12)',
                      background: activeImgIdx === idx ? '#FFF8EC' : '#E8E6E2',
                      cursor: 'pointer',
                      overflow: 'hidden',
                      boxSizing: 'border-box',
                      boxShadow: activeImgIdx === idx ? '0 2px 8px rgba(201,165,76,0.35)' : 'none',
                      transition: 'border-color 0.15s, box-shadow 0.15s',
                    }}
                  >
                    <img
                      src={img}
                      alt={`Variant ${idx + 1}`}
                      style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 5, display: 'block' }}
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="store-detail-info-card" style={{
            border: '1px solid rgba(26,26,26,0.1)',
            borderRadius: 16,
            background: '#FAF9F7',
            boxShadow: '0 8px 22px rgba(0,0,0,0.06)',
            padding: 26,
          }}>
            {product.tagline && (
              <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 11, letterSpacing: '0.18em', color: '#8B6914', textTransform: 'uppercase', marginBottom: 10 }}>
                {product.tagline}
              </p>
            )}
            <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(24px, 4vw, 38px)', color: '#1a1a1a', fontWeight: 700, lineHeight: 1.2, marginBottom: 12 }}>
              {product.name}
            </h1>
            <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 16, color: '#5a5a5a', lineHeight: 1.8, marginBottom: 24 }}>
              {product.description}
            </p>

            {product.perfectFor && product.perfectFor.length > 0 && (
              <div style={{ marginBottom: 24 }}>
                <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 11, letterSpacing: '0.16em', color: '#6a6a6a', textTransform: 'uppercase', marginBottom: 10 }}>
                  Perfect For
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                  {product.perfectFor.map((f, i) => (
                    <span key={i} style={{
                      fontFamily: "'Montserrat', sans-serif", fontSize: 12, color: '#5c4510',
                      border: '1px solid rgba(201,165,76,0.35)',
                      background: 'rgba(229,192,123,0.12)',
                      borderRadius: 50, padding: '4px 14px', letterSpacing: '0.04em',
                    }}>{f}</span>
                  ))}
                </div>
              </div>
            )}

            {product.details && product.details.length > 0 && (
              <div style={{ marginBottom: 24 }}>
                <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 11, letterSpacing: '0.16em', color: '#6a6a6a', textTransform: 'uppercase', marginBottom: 10 }}>
                  Product Details
                </p>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  {product.details.map((d, i) => (
                    <li key={i} style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 15, color: '#4a4a4a', padding: '7px 0', borderBottom: '1px solid rgba(0,0,0,0.08)', display: 'flex', gap: 10, alignItems: 'center' }}>
                      <span style={{ color: '#8B6914', flexShrink: 0 }}>+</span> {d}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {product.sizes && product.sizes.length > 0 && (
              <div style={{ marginBottom: 28 }}>
                <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 11, letterSpacing: '0.16em', color: '#6a6a6a', textTransform: 'uppercase', marginBottom: 10 }}>
                  Select Size
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                  {product.sizes.map(s => (
                    <button
                      className={`store-size-choice ${selectedSize === s ? 'active' : ''}`}
                      key={s}
                      onClick={() => setSelectedSize(s)}
                      style={{
                        fontFamily: "'Montserrat', sans-serif", fontSize: 13, letterSpacing: '0.08em',
                        padding: '8px 16px', borderRadius: 6, cursor: 'pointer',
                        transition: 'all 0.2s',
                        background: selectedSize === s ? '#E5C07B' : 'transparent',
                        color: selectedSize === s ? '#111111' : '#5a5a5a',
                        border: selectedSize === s ? '1px solid #E5C07B' : '1px solid rgba(0,0,0,0.12)',
                        fontWeight: selectedSize === s ? 700 : 400,
                      }}
                    >
                      {s}
                    </button>
                  ))}
                </div>
                <div style={{ marginTop: 10 }}>
                  <span style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 8,
                    fontFamily: "'Montserrat', sans-serif",
                    fontSize: 12,
                    letterSpacing: '0.06em',
                    color: selectedSize ? '#111111' : '#6a6a6a',
                    background: selectedSize ? '#E5C07B' : 'rgba(0,0,0,0.04)',
                    border: selectedSize ? '1px solid #C9A54C' : '1px solid rgba(0,0,0,0.1)',
                    borderRadius: 999,
                    padding: '5px 12px',
                    textTransform: 'uppercase',
                    fontWeight: 600,
                  }}>
                    {selectedSize ? `Selected size: ${selectedSize}` : 'No size selected'}
                  </span>
                </div>
              </div>
            )}

            <div className="store-detail-cta-stack" style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <button
                className="store-btn-primary"
                onClick={handleExternalPurchase}
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
                {buyLabel}
              </button>
              <p style={{ margin: 0, fontFamily: "'Montserrat', sans-serif", fontSize: 11, color: '#6a6a6a', textAlign: 'center', letterSpacing: '0.04em' }}>
                Official checkout opens on our fulfillment partner (same link as Buy on the store).
              </p>
              <button
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

            {feedbackMsg && (
              <div className={feedbackMsg.includes('select') || feedbackMsg.includes('not configured') ? 'error-msg' : 'success-msg'} style={{ marginTop: 12 }}>
                {feedbackMsg}
              </div>
            )}
            <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 13, color: '#7a7a7a', marginTop: 16, textAlign: 'center' }}>
              Thoughtful gifting. Gift-ready. Built to last.
            </p>
          </div>
        </div>
      </section>

      {product.sizeChart && product.sizeChart.length > 0 && (
        <section className="store-size-chart-wrap" style={{ padding: '0 28px 64px', width: '100%', maxWidth: 1440, margin: '0 auto' }}>
          <h3 style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 14, letterSpacing: '0.14em', color: '#8B6914', textTransform: 'uppercase', marginBottom: 16 }}>
            Size Chart
          </h3>
          <div style={{ overflowX: 'auto', border: '1px solid rgba(26,26,26,0.1)', borderRadius: 12, background: '#FAF9F7', boxShadow: '0 6px 18px rgba(0,0,0,0.06)' }}>
            <table className="size-table">
              <thead>
                <tr>
                  <th>Size</th><th>US Chest</th><th>EU Chest</th><th>US Length</th><th>EU Length</th>
                </tr>
              </thead>
              <tbody>
                {product.sizeChart.map(row => (
                  <tr key={row.size}>
                    <td style={{ color: '#C9A558', fontWeight: 600 }}>{row.size}</td>
                    <td>{row.usChest}</td><td>{row.euChest}</td>
                    <td>{row.usLength}</td><td>{row.euLength}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      <section style={{ padding: '0 28px 40px', width: '100%', maxWidth: 1440, margin: '0 auto' }}>
        <div style={{ border: '1px solid rgba(26,26,26,0.08)', borderRadius: 12, background: '#FAF9F7', padding: 18, boxShadow: '0 6px 18px rgba(0,0,0,0.06)' }}>
          <h3 style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 14, letterSpacing: '0.14em', color: '#8B6914', textTransform: 'uppercase', marginBottom: 14 }}>
            Shipping & Trust FAQ
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 12 }}>
            {[
              { q: 'How long is delivery?', a: 'Production is typically 2-7 business days before shipping.' },
              { q: 'Will I receive tracking?', a: 'Yes. Tracking details are shared once your order ships.' },
              { q: 'Need support?', a: 'Contact Mamaafricaafia@gmail.com for delivery and order help.' },
            ].map((item) => (
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
            {[
              { n: 'Afua, Manchester', t: '“Beautiful finish and premium print quality.”' },
              { n: 'Yaw, Chicago', t: '“Great gift impact and easy support communication.”' },
              { n: 'Nana, Amsterdam', t: '“Tracking and delivery timeline were exactly as promised.”' },
            ].map((r) => (
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
              {selectedSize ? `Size: ${selectedSize}` : 'Select a size (optional)'}
            </div>
          </div>
          <button
            className="store-btn-primary"
            onClick={handleExternalPurchase}
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
              cursor: needsSize && !selectedSize ? 'not-allowed' : 'pointer',
            }}
          >
            {buyLabel}
          </button>
        </div>
      </div>

      {related.length > 0 && (
        <section className="store-related-wrap" style={{ borderTop: '1px solid rgba(201,165,76,0.22)', padding: '56px 28px 80px', background: 'linear-gradient(180deg, rgba(243,241,236,0) 0%, rgba(138,107,45,0.06) 100%)' }}>
          <div style={{ textAlign: 'center', marginBottom: 32 }}>
            <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 11, letterSpacing: '0.2em', color: '#8A6B2D', textTransform: 'uppercase', marginBottom: 8 }}>
              {product.bornDay ? `More ${product.bornDay}-Born Gifts` : 'You May Also Like'}
            </p>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(20px, 4vw, 28px)', color: '#1A1A1A' }}>
              {product.bornDay ? `Complete the ${product.bornDay}-Born Collection` : 'More Thoughtful Gifts'}
            </h2>
          </div>
          <div className="product-grid store-product-grid" style={{ width: '100%', maxWidth: 'none', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))' }}>
            {related.map((p, idx) => <ProductCard key={p.id} product={p} animationIndex={idx} />)}
          </div>
        </section>
      )}

      <div style={{ textAlign: 'center', padding: '0 20px 64px' }}>
        <button
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
