import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { products } from '../data/products';
import ProductCard from '../components/ProductCard';
import HeroBanner from '../components/HeroBanner';

const heroOptions = [
  { heading: 'Meaningful Gifts for Mothers', sub: 'Classy mugs, shirts, and keepsakes created to honor her love, strength, and sacrifice.' },
  { heading: 'Mother\'s Day, Beautifully Gifted', sub: 'Elegant merchandise designed with gratitude, warmth, and timeless style.' },
  { heading: 'For the Woman Who Gave So Much', sub: 'Shop meaningful gifts that celebrate a mother\'s quiet strength, care, and devotion.' },
  { heading: 'The Mother\'s Day Collection', sub: 'Sentimental, stylish, and memorable gifts made to honor motherhood beautifully.' },
];

const categories = ['All', 'Mugs', 'T-Shirts', 'Hoodies'];


export default function StorePage() {
  const [heroIdx] = useState(() => Math.floor(Math.random() * heroOptions.length));
  const [activeFilter, setActiveFilter] = useState('All');
  const hero = heroOptions[heroIdx];

  const filtered = products.filter(p => {
    if (activeFilter === 'All') return true;
    if (activeFilter === 'Mugs') return p.type === 'mug';
    if (activeFilter === 'T-Shirts') return p.type === 'tshirt';
    if (activeFilter === 'Hoodies') return p.type === 'hoodie';
    return true;
  });

  return (
    <div className="page-wrapper">

      {/* ── Hero Banner ──────────────────────────────────────── */}
      <HeroBanner
        eyebrow="AFIA · Mama Africa · Gift Collection"
        heading={hero.heading}
        subheading={hero.sub}
        smallText="Thoughtful Mother's Day gifting  ·  Gift-ready designs  ·  Made to be cherished"
        imageSrc="/images/hoodie1.png"
        imageAlt="Mama Africa Gift Collection"
        ctaPrimary={{ label: "Shop Mother's Day", action: () => setActiveFilter('All') }}
        ctaSecondary={{ label: 'Explore Gifts', action: () => setActiveFilter('Mugs') }}
      />

      {/* ── Promo Banner ─────────────────────────────────────── */}
      <section style={{
        background: 'linear-gradient(135deg, rgba(201,165,88,0.12) 0%, rgba(180,100,40,0.08) 50%, rgba(201,165,88,0.12) 100%)',
        borderTop: '1px solid rgba(201,165,88,0.2)',
        borderBottom: '1px solid rgba(201,165,88,0.2)',
        padding: '28px 20px',
        textAlign: 'center',
      }}>
        <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 10, letterSpacing: '0.28em', color: '#C9A558', textTransform: 'uppercase', marginBottom: 8 }}>
          Limited Collection
        </p>
        <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(20px, 4vw, 30px)', color: '#EDD9BC', fontWeight: 600, marginBottom: 8 }}>
          For the Woman Who Gave So Much
        </h2>
        <p style={{ fontFamily: "'Times New Roman', Times, serif", fontSize: 16, color: '#BA9D7C', fontStyle: 'italic', marginBottom: 16 }}>
          Thoughtful Mother's Day gifting &nbsp;·&nbsp; Gift-ready designs &nbsp;·&nbsp; Made to be cherished
        </p>
        <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
          {['Mugs', 'Tees', 'Hoodies', 'Bundles'].map(tag => (
            <span key={tag} style={{
              fontFamily: "'Montserrat', sans-serif", fontSize: 11,
              color: '#C9A558', border: '1px solid rgba(201,165,88,0.35)',
              borderRadius: 50, padding: '4px 14px', letterSpacing: '0.08em',
            }}>{tag}</span>
          ))}
        </div>
      </section>

      {/* ── Category Filters ─────────────────────────────────── */}
      <section style={{ padding: '32px 20px 0', textAlign: 'center' }}>
        <div style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap' }}>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              style={{
                fontFamily: "'Montserrat', sans-serif",
                fontSize: 12, letterSpacing: '0.1em', textTransform: 'uppercase',
                padding: '9px 20px', borderRadius: 50, cursor: 'pointer',
                transition: 'all 0.2s',
                background: activeFilter === cat ? 'linear-gradient(135deg, #C9A558, #E8CB82)' : 'transparent',
                color: activeFilter === cat ? '#1C0E04' : '#BA9D7C',
                border: activeFilter === cat ? '1px solid #C9A558' : '1px solid rgba(201,165,88,0.3)',
                fontWeight: activeFilter === cat ? 600 : 400,
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* ── Product Grid ─────────────────────────────────────── */}
      <section style={{ padding: '32px 0 56px' }}>
        {filtered.length === 0 ? (
          <p style={{ textAlign: 'center', color: '#7C5F48', fontStyle: 'italic', padding: '40px 20px' }}>
            More {activeFilter} coming soon — stay tuned.
          </p>
        ) : (
          <div className="product-grid">
            {filtered.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        )}
      </section>

      {/* ── Continue Shopping nudge ───────────────────────────── */}
      <section style={{ padding: '40px 20px 72px', textAlign: 'center' }}>
        <p style={{ fontFamily: "'Times New Roman', Times, serif", fontSize: 17, color: '#7C5F48', fontStyle: 'italic' }}>
          More pieces coming soon — stay tuned &nbsp;·&nbsp;{' '}
          <Link to="/" style={{ color: '#C9A558' }}>Back to home</Link>
        </p>
      </section>

    </div>
  );
}
