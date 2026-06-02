import React from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../ProductCard';

/**
 * WhiteProductSection
 * White-background section displaying products grouped by category.
 * Used on the About page and the Name Result page.
 *
 * Props:
 *   heading       string                           — main section title
 *   subtitle      string                           — italic subtitle (optional)
 *   categories    Array<{ label, products, limit? }> — product groups
 *   viewAllHref   string                           — Link path for CTA (optional)
 *   viewAllLabel  string                           — CTA button text (default "View All")
 *   loading       boolean                          — show skeleton cards
 *
 * category shape:
 *   label     string      — e.g. "T-Shirts"
 *   products  Product[]   — array from products.js
 *   limit     number      — max cards shown per category (default 4)
 */
export default function WhiteProductSection({
  heading,
  subtitle,
  categories = [],
  viewAllHref,
  viewAllLabel = 'View All',
  loading = false,
}) {
  const visible = categories.filter((c) => c.products?.length > 0);

  return (
    <section aria-label={heading} style={{ background: '#ffffff', padding: '64px 0 80px' }}>

      {/* ── Section heading ── */}
      <div style={{ textAlign: 'center', marginBottom: 32, padding: '0 20px' }}>
        <h2
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 'clamp(28px,5vw,42px)',
            color: '#1a1a1a',
            letterSpacing: '0.06em',
            marginBottom: subtitle ? 10 : 0,
          }}
        >
          {heading}
        </h2>

        {subtitle && (
          <p
            style={{
              fontFamily: "'Montserrat', sans-serif",
              fontSize: 14,
              color: '#5a5a5a',
              letterSpacing: '0.04em',
              fontStyle: 'italic',
              margin: 0,
            }}
          >
            {subtitle}
          </p>
        )}

        {/* Gold accent bar */}
        <div
          aria-hidden="true"
          style={{
            height: 2,
            width: 80,
            background: 'linear-gradient(to right, #C9A558, #E8CB82, #C9A558)',
            margin: '20px auto 0',
            borderRadius: 2,
          }}
        />
      </div>

      {/* ── Loading skeletons ── */}
      {loading && (
        <div
          style={{
            maxWidth: 1100,
            margin: '0 auto',
            padding: '0 20px',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 280px))',
            gap: 20,
            justifyContent: 'center',
          }}
        >
          {Array.from({ length: 4 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      )}

      {/* ── Empty state ── */}
      {!loading && visible.length === 0 && (
        <div style={{ textAlign: 'center', padding: '48px 20px' }}>
          <div style={{ fontSize: 40, marginBottom: 14 }}>🛍️</div>
          <p
            style={{
              fontFamily: "'Cinzel', serif",
              fontSize: 13,
              color: '#8B6914',
              letterSpacing: '0.1em',
            }}
          >
            Products coming soon
          </p>
        </div>
      )}

      {/* ── Category groups ── */}
      {!loading &&
        visible.map(({ label, products, limit = 4 }) => (
          <div
            key={label}
            style={{ maxWidth: 1100, margin: '40px auto 0', padding: '0 20px' }}
          >
            {/* Category label */}
            <div
              style={{
                fontFamily: "'Cinzel', serif",
                fontSize: 11,
                letterSpacing: '0.2em',
                color: '#8B6914',
                textTransform: 'uppercase',
                marginBottom: 18,
                textAlign: 'center',
              }}
            >
              {label}
            </div>

            {/* Product grid */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 280px))',
                gap: 20,
                justifyContent: 'center',
              }}
            >
              {products.slice(0, limit).map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        ))}

      {/* ── View-all CTA ── */}
      {viewAllHref && (
        <div style={{ textAlign: 'center', marginTop: 48, padding: '0 20px' }}>
          <Link
            to={viewAllHref}
            style={{
              display: 'inline-block',
              padding: '14px 40px',
              textDecoration: 'none',
              fontFamily: "'Cinzel', serif",
              letterSpacing: '0.12em',
              fontSize: 13,
              background: 'linear-gradient(135deg, #E5C07B 0%, #C9A54C 100%)',
              color: '#111111',
              borderRadius: 999,
              fontWeight: 700,
              textTransform: 'uppercase',
              boxShadow: '0 4px 18px rgba(139,105,20,0.2)',
              transition: 'opacity 0.18s ease',
            }}
          >
            {viewAllLabel}
          </Link>
        </div>
      )}

      {/* Skeleton pulse animation */}
      <style>{`
        @keyframes wps-pulse {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0.45; }
        }
      `}</style>
    </section>
  );
}

/** Internal skeleton card — not exported */
function SkeletonCard() {
  return (
    <div
      aria-hidden="true"
      style={{ borderRadius: 14, overflow: 'hidden', background: '#f5f2ed' }}
    >
      <div
        style={{
          aspectRatio: '1 / 1',
          background: '#e8e3db',
          animation: 'wps-pulse 1.6s ease-in-out infinite',
        }}
      />
      <div style={{ padding: '16px', background: '#faf9f7' }}>
        <div
          style={{
            height: 14,
            width: '68%',
            background: '#e8e3db',
            borderRadius: 4,
            marginBottom: 10,
            animation: 'wps-pulse 1.6s ease-in-out infinite 0.15s',
          }}
        />
        <div
          style={{
            height: 11,
            width: '44%',
            background: '#e8e3db',
            borderRadius: 4,
            animation: 'wps-pulse 1.6s ease-in-out infinite 0.3s',
          }}
        />
      </div>
    </div>
  );
}
