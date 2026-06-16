import React, { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { products, STORE_BUNDLE_SETS, DAY_NAMES } from '../data/products';
import ProductCard from '../components/ProductCard';
import { buildTrackedExternalUrl } from '../utils/commerceLinks';
import { trackEvent } from '../utils/analytics';
import { getOfficialPurchaseTarget } from '../utils/storefront';
import useSEO from '../hooks/useSEO';

const categories = ['All', 'Mugs', 'T-Shirts', 'Hoodies', 'Babysuits'];

const DAY_FILTERS = ['All Days', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

/** Product ids shown on the store hero (right column). */
const STORE_HERO_IMAGE_IDS = [201, 226, 234];

export default function StorePage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [activeFilter, setActiveFilter] = useState('All');
  const [activeDayFilter, setActiveDayFilter] = useState('All Days');
  const [sortBy, setSortBy] = useState('featured');

  // Apply category/day pre-filters when arriving from a homepage link
  // (e.g. /store?category=Mugs&day=Tuesday).
  useEffect(() => {
    const cat = searchParams.get('category');
    if (cat && categories.includes(cat)) setActiveFilter(cat);
    const day = searchParams.get('day');
    if (day && DAY_FILTERS.includes(day)) setActiveDayFilter(day);
  }, [searchParams]);

  useSEO({
    title: 'Shop Akan Heritage Gifts — Day-Born T-Shirts, Mugs & Baby Bodysuits',
    description: 'Shop premium Ghanaian day-born heritage gifts. T-shirts, mugs, baby bodysuits, hoodies, and gift bundles for every Akan day name. Ships worldwide.',
    image: '/images/group of day borns.jpeg',
  });

  useEffect(() => {
    trackEvent('view_store', { filter: activeFilter, day: activeDayFilter, sort: sortBy });
  }, [activeFilter, activeDayFilter, sortBy]);

  const filtered = products.filter((p) => {
    const typeMatch = activeFilter === 'All'
      || (activeFilter === 'Mugs' && p.type === 'mug')
      || (activeFilter === 'T-Shirts' && p.type === 'tshirt')
      || (activeFilter === 'Hoodies' && p.type === 'hoodie')
      || (activeFilter === 'Babysuits' && p.type === 'babysuit');
    const dayMatch = activeDayFilter === 'All Days' || p.bornDay === activeDayFilter;
    return typeMatch && dayMatch;
  });

  const arranged = useMemo(() => {
    const list = [...filtered];
    if (sortBy === 'price_asc') { list.sort((a, b) => a.price - b.price); return list; }
    if (sortBy === 'price_desc') { list.sort((a, b) => b.price - a.price); return list; }
    if (sortBy === 'name') { list.sort((a, b) => a.name.localeCompare(b.name)); return list; }
    // Featured: mix BOTH product type and day-born so neither clusters on a row.
    // 1) Bucket by type. 2) Order each type bucket so its days rotate, offset
    //    per type so buckets don't all start on the same day. 3) Greedily merge,
    //    always drawing from the largest remaining type bucket (keeps types
    //    evenly spread — no pile-up of one type at the end) while avoiding the
    //    previous card's type and any day used in the last few cards.
    const typeOrder = ['mug', 'tshirt', 'babysuit', 'hoodie'];
    const dayIdx = (d) => { const i = DAY_NAMES.indexOf(d); return i < 0 ? 99 : i; };
    const typeBuckets = {};
    const order = [];
    list.forEach((p) => {
      const key = p.type || '_other';
      if (!typeBuckets[key]) { typeBuckets[key] = []; }
      typeBuckets[key].push(p);
    });
    typeOrder.forEach((t) => { if (typeBuckets[t]) order.push(t); });
    Object.keys(typeBuckets).forEach((t) => { if (!order.includes(t)) order.push(t); });
    const dayRoundRobin = (arr, offset) => {
      const byDay = {};
      arr.slice().sort((a, b) => a.id - b.id).forEach((p) => { (byDay[p.bornDay] = byDay[p.bornDay] || []).push(p); });
      const days = Object.keys(byDay).sort((a, b) => dayIdx(a) - dayIdx(b));
      const out = [];
      let i = offset;
      while (out.length < arr.length) {
        let added = false;
        for (let b = 0; b < days.length; b++) {
          const bk = byDay[days[(b + i) % days.length]];
          if (bk.length) { out.push(bk.shift()); added = true; break; }
        }
        if (!added) break;
        i++;
      }
      return out;
    };
    order.forEach((t, ti) => { typeBuckets[t] = dayRoundRobin(typeBuckets[t], ti * 2); });
    const LOOKBACK = 3;
    const mixed = [];
    while (mixed.length < list.length) {
      const avail = order.filter((t) => typeBuckets[t].length).sort((a, b) => typeBuckets[b].length - typeBuckets[a].length);
      const recentDays = mixed.slice(-LOOKBACK).map((p) => p.bornDay);
      const prevType = mixed.length ? mixed[mixed.length - 1].type : null;
      const chosen = avail.find((t) => t !== prevType && !recentDays.includes(typeBuckets[t][0].bornDay))
        || avail.find((t) => !recentDays.includes(typeBuckets[t][0].bornDay))
        || avail.find((t) => t !== prevType)
        || avail[0];
      mixed.push(typeBuckets[chosen].shift());
    }
    return mixed;
  }, [filtered, sortBy]);

  const spotlight = arranged[0];
  const rest = arranged.slice(1);

  function openExternalBuy(product) {
    const { url: targetUrl } = getOfficialPurchaseTarget(product);
    if (!targetUrl) return;
    const trackedUrl = buildTrackedExternalUrl(targetUrl, {
      campaign: 'store_spotlight_buy',
      content: `spotlight_${product.id}`,
    });
    trackEvent('click_buy_external', {
      location: 'store_spotlight',
      product_id: product.id,
      product_name: product.name,
    });
    window.open(trackedUrl, '_blank', 'noopener,noreferrer');
  }

  const bundles = useMemo(
    () =>
      STORE_BUNDLE_SETS.map((b) => ({
        id: b.id,
        title: b.title,
        subtitle: b.subtitle,
        desc: b.desc,
        items: b.productIds.map((id) => products.find((p) => p.id === id)).filter(Boolean),
      })),
    [],
  );

  const heroShowcaseProducts = useMemo(
    () => STORE_HERO_IMAGE_IDS.map((id) => products.find((p) => p.id === id)).filter(Boolean),
    [],
  );

  const productCount = filtered.length;

  return (
    <div className="page-wrapper store-shell" style={{ background: '#F3F1EC' }}>

      {/* Shop identity strip — Etsy-style branding */}
      <div style={{
        background: '#fff',
        borderBottom: '1px solid rgba(0,0,0,0.08)',
        padding: '10px 20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: 10,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{
            width: 42, height: 42, borderRadius: '50%',
            background: 'linear-gradient(135deg, #c4963e, #9a7224)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexShrink: 0,
          }}>
            <span style={{ color: '#fff', fontFamily: "'Cinzel', serif", fontSize: 16, fontWeight: 700 }}>MA</span>
          </div>
          <div>
            <div style={{ fontFamily: "'Cinzel', serif", fontSize: 13, fontWeight: 700, color: '#1a1a1a', letterSpacing: '0.06em' }}>MamaAfrica Couture</div>
            <div style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 11, color: '#6a6a6a', letterSpacing: '0.04em' }}>
              ★★★★★ <span style={{ color: '#8B6914', fontWeight: 600 }}>5.0</span>
              <span style={{ margin: '0 6px', color: '#ccc' }}>·</span>
              Heritage gifts for Akan day-borns
            </div>
          </div>
        </div>
        <a
          href="https://www.amazon.com/dp/B0H58WLSV2"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            background: '#FF9900', color: '#111', border: '1px solid #e88a00',
            borderRadius: 999, padding: '6px 14px',
            fontFamily: "'Montserrat', sans-serif", fontSize: 11,
            fontWeight: 700, letterSpacing: '0.08em', textDecoration: 'none',
            textTransform: 'uppercase',
          }}
        >
          View on Amazon →
        </a>
      </div>

      <section className="store-hero-wrap" style={{ padding: '38px 20px 26px', background: 'linear-gradient(180deg, rgba(158, 116, 40, 0.22) 0%, rgba(243, 241, 236, 0) 72%)' }}>
        <div className="store-hero-card" style={{
          width: '100%',
          borderRadius: 18,
          border: '1px solid rgba(255, 255, 255, 0.22)',
          background: 'linear-gradient(145deg, #c4963e 0%, #b88932 40%, #9a7224 100%)',
          boxShadow: '0 14px 40px rgba(55, 38, 10, 0.28)',
          padding: '42px 28px',
        }}>
          <div className="store-hero-card-inner">
            <div>
              <p style={{ color: '#FFFFFF', textShadow: '0 1px 3px rgba(0,0,0,0.35)', fontFamily: "'Montserrat', sans-serif", textTransform: 'uppercase', fontSize: 11, letterSpacing: '0.18em', marginBottom: 14 }}>
                Afia Premium Store
              </p>
              <h1 style={{ color: '#FFFFFF', textShadow: '0 2px 6px rgba(0,0,0,0.35)', fontFamily: "'Playfair Display', serif", fontSize: 'clamp(30px, 4vw, 46px)', lineHeight: 1.2, marginBottom: 12 }}>
                Curated gifts with a warm, heritage feel
              </h1>
              <p style={{ color: '#FFFFFF', textShadow: '0 1px 3px rgba(0,0,0,0.3)', fontFamily: "'Montserrat', sans-serif", fontSize: 16, lineHeight: 1.7, maxWidth: 560 }}>
                Neutral grounds and gold accents so product photography stays true. Thoughtfully grouped for calm browsing and confident checkout.
              </p>
            </div>
            {heroShowcaseProducts.length > 0 && (
              <div className="store-hero-visual">
                {heroShowcaseProducts.slice(0, 2).map((p) => (
                  <div key={p.id} className="store-hero-visual__cell">
                    <img src={p.image} alt={p.name} />
                  </div>
                ))}
                {heroShowcaseProducts[2] && (
                  <div className="store-hero-visual__cell store-hero-visual__cell--wide">
                    <img src={heroShowcaseProducts[2].image} alt={heroShowcaseProducts[2].name} />
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="store-controls-wrap" style={{ padding: '0 20px 18px' }}>
        <div style={{
          width: '100%',
          marginBottom: 14,
          border: '1px solid rgba(201,165,76,0.35)',
          borderRadius: 10,
          background: '#FAF9F7',
          padding: '10px 14px',
          color: '#4a4a4a',
          fontFamily: "'Montserrat', sans-serif",
          fontSize: 12,
          letterSpacing: '0.04em',
        }}>
          Secure Amazon checkout · Premium print quality · Delivery tracking after purchase
          {' '}
          <Link to="/shipping-returns" style={{ color: '#8B6914', textDecoration: 'underline' }}>Shipping & Returns</Link>
        </div>

        {/* Browse by Day Born */}
        <div style={{ width: '100%', marginBottom: 14 }}>
          <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 10, letterSpacing: '0.14em', color: '#8A6B2D', textTransform: 'uppercase', marginBottom: 8 }}>
            Browse by Day Born
          </p>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {DAY_FILTERS.map((day) => (
              <button
                key={day}
                onClick={() => setActiveDayFilter(day)}
                style={{
                  background: activeDayFilter === day ? '#1a1a1a' : '#fff',
                  color: activeDayFilter === day ? '#E5C07B' : '#4a4a4a',
                  border: activeDayFilter === day ? '1px solid #1a1a1a' : '1px solid rgba(0,0,0,0.15)',
                  padding: '7px 14px',
                  borderRadius: 999,
                  fontFamily: "'Montserrat', sans-serif",
                  fontSize: 11,
                  letterSpacing: '0.06em',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.18s ease',
                }}
              >
                {day === 'All Days' ? '✦ All Days' : day}
              </button>
            ))}
          </div>
        </div>

        <div className="store-controls-row" style={{
          width: '100%',
          display: 'flex',
          gap: 10,
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, alignItems: 'center', flex: 1 }}>
            <div className="store-filter-group" style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {categories.map((cat) => (
                <button
                  className={`store-filter-btn ${activeFilter === cat ? 'active' : ''}`}
                  key={cat}
                  onClick={() => setActiveFilter(cat)}
                  style={{
                    background: activeFilter === cat ? '#E5C07B' : 'transparent',
                    color: activeFilter === cat ? '#111111' : '#6F6F6F',
                    border: activeFilter === cat ? '1px solid #E5C07B' : '1px solid #B8B8B8',
                    padding: '9px 14px',
                    borderRadius: 999,
                    fontFamily: "'Montserrat', sans-serif",
                    letterSpacing: '0.08em',
                    fontSize: 11,
                    textTransform: 'uppercase',
                    fontWeight: 600,
                    cursor: 'pointer',
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>
            <span style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 11, color: '#8a8a8a', letterSpacing: '0.04em', marginLeft: 4 }}>
              {productCount} item{productCount !== 1 ? 's' : ''}
            </span>
          </div>
          <select
            className="store-sort-select"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            style={{
              background: '#FAF9F7',
              color: '#1a1a1a',
              border: '1px solid rgba(0,0,0,0.12)',
              borderRadius: 8,
              padding: '10px 12px',
              fontFamily: "'Montserrat', sans-serif",
              fontSize: 13,
            }}
          >
            <option value="featured">Featured</option>
            <option value="name">Name</option>
          </select>
        </div>
        <div style={{ width: '100%', marginTop: 10, border: '1px solid rgba(201,165,76,0.28)', borderRadius: 999, background: '#EFEDE8', padding: '7px 12px', display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'center' }}>
          <span style={{ color: '#6B5420', fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', fontFamily: "'Cinzel', serif" }}>Legal & Trust</span>
          <Link to="/privacy-policy" style={{ color: '#8B6914', textDecoration: 'underline', fontSize: 11 }}>Privacy</Link>
          <Link to="/terms" style={{ color: '#8B6914', textDecoration: 'underline', fontSize: 11 }}>Terms</Link>
          <Link to="/cookie-policy" style={{ color: '#8B6914', textDecoration: 'underline', fontSize: 11 }}>Cookies</Link>
        </div>
      </section>

      <section style={{ padding: '0 20px 20px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 10 }}>
          {[
            { title: 'Delivery Window', text: 'US 3-8 business days · EU 5-12 business days after production.' },
            { title: 'Return SLA', text: 'Report damaged/incorrect items within 7 days for fast replacement review.' },
            { title: 'Support', text: 'Mamaafricaafia@gmail.com for shipping and order support.' },
          ].map((item) => (
            <div key={item.title} style={{ border: '1px solid rgba(201,165,76,0.3)', borderRadius: 10, background: '#FAF9F7', padding: 12 }}>
              <p style={{ margin: '0 0 6px', color: '#8B6914', fontFamily: "'Cinzel', serif", fontSize: 12, letterSpacing: '0.08em', textTransform: 'uppercase' }}>{item.title}</p>
              <p style={{ margin: 0, color: '#5a5a5a', fontSize: 13, lineHeight: 1.6 }}>{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="store-spotlight-wrap" style={{ padding: '0 20px 24px' }}>
        <div style={{ width: '100%' }}>
          {spotlight && (
            <div className="store-spotlight-card" style={{
              display: 'grid',
              gridTemplateColumns: 'minmax(260px, 1fr) minmax(300px, 1.2fr)',
              gap: 0,
              border: '1px solid rgba(26,26,26,0.1)',
              borderRadius: 16,
              overflow: 'hidden',
              background: '#FAF9F7',
              boxShadow: '0 10px 28px rgba(0,0,0,0.07)',
            }}>
              <div style={{
                minHeight: 300,
                background: '#E8E6E2',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: 16,
              }}
              >
                <img
                  src={spotlight.image}
                  alt={spotlight.name}
                  style={{ maxWidth: '100%', maxHeight: 420, width: 'auto', height: 'auto', objectFit: 'contain' }}
                />
              </div>
              <div className="store-spotlight-content" style={{ padding: 24, borderLeft: '1px solid rgba(0,0,0,0.06)' }}>
                <p style={{ color: '#8B6914', fontFamily: "'Montserrat', sans-serif", textTransform: 'uppercase', fontSize: 11, letterSpacing: '0.12em', marginBottom: 8 }}>
                  Spotlight product
                </p>
                <h2 style={{ color: '#1a1a1a', fontFamily: "'Playfair Display', serif", fontSize: 'clamp(24px, 3vw, 34px)', marginBottom: 10 }}>
                  {spotlight.name}
                </h2>
                <p style={{ color: '#5a5a5a', fontFamily: "'Montserrat', sans-serif", fontSize: 15, lineHeight: 1.7, marginBottom: 16 }}>
                  {spotlight.description}
                </p>
                <button
                  type="button"
                  className="store-btn-primary"
                  style={{
                    width: '100%',
                    fontSize: 12,
                    background: 'var(--store-gold-cta, #E5C07B)',
                    color: '#111111',
                    border: '1px solid var(--store-gold-cta, #E5C07B)',
                    borderRadius: 8,
                    padding: '12px 14px',
                    fontFamily: "'Montserrat', sans-serif",
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    fontWeight: 700,
                    cursor: 'pointer',
                  }}
                  onClick={() => openExternalBuy(spotlight)}
                >
                  Buy now
                </button>
                <button
                  type="button"
                  onClick={() => navigate(`/product/${spotlight.id}`)}
                  style={{
                    marginTop: 10,
                    width: '100%',
                    background: 'transparent',
                    border: 'none',
                    color: '#8B6914',
                    fontFamily: "'Montserrat', sans-serif",
                    fontSize: 12,
                    letterSpacing: '0.06em',
                    textDecoration: 'underline',
                    cursor: 'pointer',
                  }}
                >
                  Product details
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Signature Bundles — removed for now */}
      {false && (
      <section style={{ padding: '0 20px 24px' }}>
        <div style={{ width: '100%', marginBottom: 12 }}>
          <p style={{ color: '#8A6B2D', fontFamily: "'Montserrat', sans-serif", textTransform: 'uppercase', fontSize: 11, letterSpacing: '0.14em', marginBottom: 8 }}>
            Signature Bundles
          </p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 12 }}>
          {bundles.map((bundle) => {
            const lead = bundle.items[0];
            if (!lead) return null;
            return (
              <article
                key={bundle.id}
                className="store-bundle-card"
                style={{ border: '1px solid rgba(26,26,26,0.08)', borderRadius: 12, background: '#FAF9F7', padding: 14, boxShadow: '0 6px 18px rgba(0,0,0,0.06)' }}
              >
                <div
                  className="store-bundle-thumbs"
                  style={{
                    display: 'flex',
                    gap: 8,
                    marginBottom: 12,
                  }}
                >
                  {bundle.items.map((item) => (
                    <div
                      key={item.id}
                      className="store-bundle-thumb-well"
                      style={{
                        flex: 1,
                        minWidth: 0,
                        aspectRatio: '1 / 1',
                        background: '#E8E6E2',
                        borderRadius: 10,
                        border: '1px solid rgba(0,0,0,0.06)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: 8,
                        boxSizing: 'border-box',
                      }}
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        decoding="async"
                        style={{
                          maxWidth: '100%',
                          maxHeight: '100%',
                          width: 'auto',
                          height: 'auto',
                          objectFit: 'contain',
                          display: 'block',
                          pointerEvents: 'none',
                          userSelect: 'none',
                        }}
                      />
                    </div>
                  ))}
                </div>
                <Link
                  to={`/bundle/${bundle.id}`}
                  className="store-bundle-card-hit"
                  style={{ display: 'block', textDecoration: 'none', color: 'inherit' }}
                  aria-labelledby={`bundle-title-${bundle.id}`}
                >
                  <p style={{ color: '#8B6914', fontFamily: "'Cinzel', serif", letterSpacing: '0.08em', fontSize: 12, textTransform: 'uppercase', marginBottom: 6 }}>
                    {bundle.subtitle}
                  </p>
                  <h3 id={`bundle-title-${bundle.id}`} style={{ color: '#1a1a1a', fontFamily: "'Playfair Display', serif", fontSize: 22, marginBottom: 8 }}>
                    {bundle.title}
                  </h3>
                  <p style={{ color: '#5a5a5a', fontSize: 14, lineHeight: 1.6, marginBottom: 12 }}>
                    {bundle.desc}
                  </p>
                  <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 4 }}>
                    {bundle.items.map((item) => (
                      <span key={item.id} style={{ fontSize: 11, color: '#5c4510', border: '1px solid rgba(201,165,76,0.35)', background: 'rgba(229,192,123,0.12)', borderRadius: 999, padding: '3px 10px' }}>
                        {item.label}
                      </span>
                    ))}
                  </div>
                </Link>
                <button
                  type="button"
                  className="store-btn-primary store-bundle-card__buy"
                  onClick={() => {
                    openExternalBuy(lead);
                    trackEvent('click_bundle_buy', { bundle_id: bundle.id, product_id: lead.id });
                  }}
                >
                  Buy set (official checkout)
                </button>
                <Link to={`/bundle/${bundle.id}`} className="store-bundle-card__view-set">
                  View full set
                </Link>
              </article>
            );
          })}
        </div>
      </section>
      )}

      <section style={{ padding: '0 20px 26px' }}>
        <div style={{ width: '100%' }}>
          <p style={{ color: '#8A6B2D', fontFamily: "'Montserrat', sans-serif", textTransform: 'uppercase', fontSize: 11, letterSpacing: '0.14em', marginBottom: 8 }}>
            Buyer Proof
          </p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 10 }}>
          {[
            { n: 'Ama, London', t: '“Quality felt premium and delivery updates were clear from start to finish.”' },
            { n: 'Esi, New York', t: '“The gift looked even better in person. My mother loved it immediately.”' },
            { n: 'Kojo, Berlin', t: '“Fast support response and smooth replacement handling. Very trustworthy.”' },
          ].map((r) => (
            <div key={r.n} style={{ border: '1px solid rgba(201,165,76,0.28)', borderRadius: 10, background: '#FAF9F7', padding: 12 }}>
              <p style={{ margin: '0 0 8px', color: '#4a4a4a', fontSize: 14, lineHeight: 1.7 }}>{r.t}</p>
              <p style={{ margin: 0, color: '#8B6914', fontFamily: "'Cinzel', serif", fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase' }}>{r.n}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="store-grid-wrap" style={{ padding: '0 0 64px', background: 'linear-gradient(180deg, rgba(243,241,236,0) 0%, rgba(138,107,45,0.06) 100%)' }}>
        {arranged.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 20px' }}>
            <p style={{ color: '#6a6a6a', fontStyle: 'italic', marginBottom: 16 }}>
              No {activeFilter === 'All' ? '' : activeFilter + ' '}products found
              {activeDayFilter !== 'All Days' ? ` for ${activeDayFilter}-born` : ''}.
            </p>
            <button
              onClick={() => { setActiveFilter('All'); setActiveDayFilter('All Days'); }}
              style={{
                background: '#E5C07B', color: '#111', border: 'none', borderRadius: 999,
                padding: '10px 24px', fontFamily: "'Montserrat', sans-serif",
                fontSize: 12, fontWeight: 700, letterSpacing: '0.1em', cursor: 'pointer',
              }}
            >
              View all products
            </button>
          </div>
        ) : (
          <div className="product-grid store-product-grid" style={{ width: '100%', maxWidth: 'none', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))' }}>
            {(rest.length ? rest : arranged).map((p, idx) => <ProductCard key={p.id} product={p} animationIndex={idx} />)}
          </div>
        )}
      </section>
    </div>
  );
}
