import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { products } from '../data/products';
import { useCart } from '../contexts/CartContext';

export default function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const product = products.find(p => p.id === Number(id));
  const [selectedSize, setSelectedSize] = useState('');
  const [addedMsg, setAddedMsg] = useState('');

  function handleAddToCart() {
    const needsSize = product.sizes && product.sizes.length > 0 && !['11oz','15oz'].includes(product.sizes[0]);
    if (needsSize && !selectedSize) {
      setAddedMsg('Please select a size first.');
      setTimeout(() => setAddedMsg(''), 3000);
      return;
    }
    addToCart(product, selectedSize || product.sizes[0] || 'One Size');
    setAddedMsg('Added to cart!');
    setTimeout(() => setAddedMsg(''), 3000);
  }

  if (!product) {
    return (
      <div className="page-wrapper" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '70vh', textAlign: 'center', padding: 20 }}>
        <div>
          <p style={{ color: '#BA9D7C', marginBottom: 20, fontStyle: 'italic' }}>This product could not be found.</p>
          <button className="btn-gold" style={{ width: 'auto', padding: '12px 28px' }} onClick={() => navigate('/store')}>
            Back to Store
          </button>
        </div>
      </div>
    );
  }

  const related = products.filter(p => p.type === product.type && p.id !== product.id).slice(0, 3);

  return (
    <div className="page-wrapper">

      {/* ── Breadcrumb ───────────────────────────────────────── */}
      <div style={{ padding: '20px 32px 0', maxWidth: 1100, margin: '0 auto' }}>
        <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 12, color: '#7C5F48', letterSpacing: '0.08em' }}>
          <Link to="/store" style={{ color: '#C9A558', textDecoration: 'none' }}>Store</Link>
          <span style={{ margin: '0 8px' }}>›</span>
          <span style={{ color: '#BA9D7C' }}>{product.name}</span>
        </p>
      </div>

      {/* ── Main Layout ──────────────────────────────────────── */}
      <section style={{ padding: '32px 32px 72px', maxWidth: 1100, margin: '0 auto' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: 56,
          alignItems: 'flex-start',
        }}>

          {/* Left — Image */}
          <div>
            <div style={{
              background: '#231510',
              borderRadius: 12,
              overflow: 'hidden',
              border: '1px solid rgba(201,165,88,0.2)',
              position: 'relative',
            }}>
              <img
                src={product.image}
                alt={product.name}
                style={{ width: '100%', aspectRatio: '4/5', objectFit: 'cover', display: 'block' }}
              />
              {/* Type badge */}
              <div style={{
                position: 'absolute', top: 16, right: 16,
                background: 'rgba(201,165,88,0.92)', color: '#1C0E04',
                fontFamily: "'Cinzel', serif", fontSize: 11, letterSpacing: '0.1em',
                padding: '4px 12px', borderRadius: 50, textTransform: 'uppercase',
              }}>
                {product.label}
              </div>
              {/* Gift Ready badge */}
              <div style={{
                position: 'absolute', top: 16, left: 16,
                background: 'rgba(160,80,40,0.88)', color: '#fff',
                fontFamily: "'Montserrat', sans-serif", fontSize: 10, letterSpacing: '0.1em',
                padding: '4px 10px', borderRadius: 50, textTransform: 'uppercase',
              }}>
                Gift Ready
              </div>
            </div>
          </div>

          {/* Right — Details */}
          <div>
            {/* Eyebrow */}
            {product.tagline && (
              <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 11, letterSpacing: '0.18em', color: '#C9A558', textTransform: 'uppercase', marginBottom: 10 }}>
                {product.tagline}
              </p>
            )}

            {/* Name */}
            <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(24px, 4vw, 36px)', color: '#EDD9BC', fontWeight: 700, lineHeight: 1.25, marginBottom: 16 }}>
              {product.name}
            </h1>

            {/* Price */}
            <div style={{ fontFamily: "'Cinzel', serif", fontSize: 32, color: '#C9A558', letterSpacing: '0.05em', marginBottom: 20 }}>
              ${product.price}
            </div>

            {/* Description */}
            <p style={{ fontFamily: "'Times New Roman', Times, serif", fontSize: 18, color: '#BA9D7C', lineHeight: 1.95, marginBottom: 24, fontStyle: 'italic' }}>
              {product.description}
            </p>

            {/* Perfect For */}
            {product.perfectFor && product.perfectFor.length > 0 && (
              <div style={{ marginBottom: 24 }}>
                <p style={{ fontFamily: "'Cinzel', serif", fontSize: 11, letterSpacing: '0.16em', color: '#9E7D42', textTransform: 'uppercase', marginBottom: 10 }}>
                  Perfect For
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                  {product.perfectFor.map((f, i) => (
                    <span key={i} style={{
                      fontFamily: "'Montserrat', sans-serif", fontSize: 12,
                      color: '#C9A558', border: '1px solid rgba(201,165,88,0.35)',
                      borderRadius: 50, padding: '4px 14px', letterSpacing: '0.04em',
                    }}>{f}</span>
                  ))}
                </div>
              </div>
            )}

            {/* Product Details */}
            {product.details && product.details.length > 0 && (
              <div style={{ marginBottom: 24 }}>
                <p style={{ fontFamily: "'Cinzel', serif", fontSize: 11, letterSpacing: '0.16em', color: '#9E7D42', textTransform: 'uppercase', marginBottom: 10 }}>
                  Product Details
                </p>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  {product.details.map((d, i) => (
                    <li key={i} style={{ fontFamily: "'Times New Roman', Times, serif", fontSize: 16, color: '#BA9D7C', padding: '6px 0', borderBottom: '1px solid rgba(201,165,88,0.08)', display: 'flex', gap: 10, alignItems: 'center' }}>
                      <span style={{ color: '#C9A558', flexShrink: 0 }}>✦</span> {d}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Size Selector */}
            {product.sizes && product.sizes.length > 0 && (
              <div style={{ marginBottom: 28 }}>
                <p style={{ fontFamily: "'Cinzel', serif", fontSize: 11, letterSpacing: '0.16em', color: '#9E7D42', textTransform: 'uppercase', marginBottom: 10 }}>
                  Select Size
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                  {product.sizes.map(s => (
                    <button
                      key={s}
                      onClick={() => setSelectedSize(s)}
                      style={{
                        fontFamily: "'Cinzel', serif", fontSize: 13, letterSpacing: '0.08em',
                        padding: '8px 16px', borderRadius: 6, cursor: 'pointer',
                        transition: 'all 0.2s',
                        background: selectedSize === s ? 'linear-gradient(135deg, #C9A558, #E8CB82)' : 'transparent',
                        color: selectedSize === s ? '#1C0E04' : '#BA9D7C',
                        border: selectedSize === s ? '1px solid #C9A558' : '1px solid rgba(201,165,88,0.25)',
                        fontWeight: selectedSize === s ? 700 : 400,
                      }}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* CTA Buttons */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <button
                onClick={handleAddToCart}
                className="btn-gold"
                style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 13, letterSpacing: '0.1em' }}
              >
                Add to Cart
              </button>
              <button
                onClick={() => { handleAddToCart(); navigate('/cart'); }}
                className="btn-gold"
                style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 13, letterSpacing: '0.1em', background: 'linear-gradient(135deg,#8b5e3c,#c07840)' }}
              >
                Buy for Mom — Go to Cart
              </button>
              <button
                onClick={() => navigate('/store')}
                className="btn-ghost"
                style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 13, letterSpacing: '0.1em' }}
              >
                Continue Shopping
              </button>
            </div>

            {/* Feedback */}
            {addedMsg && (
              <div className={addedMsg.includes('select') ? 'error-msg' : 'success-msg'} style={{ marginTop: 12 }}>
                {addedMsg}
              </div>
            )}

            {/* Assurance note */}
            <p style={{ fontFamily: "'Times New Roman', Times, serif", fontSize: 14, color: '#7C5F48', fontStyle: 'italic', marginTop: 16, textAlign: 'center' }}>
              Thoughtful gifting · Gift-ready designs · Made to be cherished
            </p>
          </div>
        </div>
      </section>

      {/* ── Size Chart (apparel only) ─────────────────────────── */}
      {product.sizeChart && product.sizeChart.length > 0 && (
        <section style={{ padding: '0 32px 64px', maxWidth: 1100, margin: '0 auto' }}>
          <h3 style={{ fontFamily: "'Cinzel', serif", fontSize: 14, letterSpacing: '0.14em', color: '#9E7D42', textTransform: 'uppercase', marginBottom: 16 }}>
            Size Chart
          </h3>
          <div style={{ overflowX: 'auto' }}>
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

      {/* ── Related Products ─────────────────────────────────── */}
      {related.length > 0 && (
        <section style={{ borderTop: '1px solid rgba(201,165,88,0.1)', padding: '56px 20px 80px' }}>
          <div style={{ textAlign: 'center', marginBottom: 32 }}>
            <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 11, letterSpacing: '0.2em', color: '#C9A558', textTransform: 'uppercase', marginBottom: 8 }}>
              You May Also Like
            </p>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(20px, 4vw, 28px)', color: '#EDD9BC' }}>
              More Thoughtful Gifts
            </h2>
          </div>
          <div className="product-grid">
            {related.map(p => (
              <Link key={p.id} to={`/product/${p.id}`} style={{ textDecoration: 'none' }}>
                <div className="afia-card" style={{ overflow: 'hidden', padding: 0 }}>
                  <div style={{ height: 200, overflow: 'hidden' }}>
                    <img src={p.image} alt={p.name} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s' }}
                      onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
                      onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                    />
                  </div>
                  <div style={{ padding: '16px 18px' }}>
                    <p style={{ fontFamily: "'Playfair Display', serif", fontSize: 16, color: '#EDD9BC', marginBottom: 4 }}>{p.name}</p>
                    <p style={{ fontFamily: "'Cinzel', serif", fontSize: 16, color: '#C9A558' }}>${p.price}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* ── Back to store ────────────────────────────────────── */}
      <div style={{ textAlign: 'center', padding: '0 20px 64px' }}>
        <button className="btn-ghost" style={{ width: 'auto', padding: '12px 36px' }} onClick={() => navigate('/store')}>
          ← View Collection
        </button>
      </div>

    </div>
  );
}
