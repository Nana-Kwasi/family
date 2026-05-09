import React from 'react';

export default function HeroBanner({
  eyebrow,
  heading,
  subheading,
  smallText,
  ctaPrimary,
  ctaSecondary,
  imageSrc,
  imageAlt = '',
  bgColor = 'var(--bg-main)',
}) {
  return (
    <section style={{
      background: `radial-gradient(ellipse at 30% 50%, rgba(201,165,88,0.07) 0%, transparent 60%), ${bgColor}`,
      borderBottom: '1px solid rgba(201,165,88,0.12)',
      padding: '64px 32px',
    }}>
      <div style={{
        maxWidth: 1100,
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: imageSrc ? '55% 45%' : '1fr',
        gap: 48,
        alignItems: 'center',
      }}>
        {/* Left — Text block */}
        <div>
          {eyebrow && (
            <p style={{
              fontFamily: "'Montserrat', sans-serif",
              fontSize: 12, letterSpacing: '0.22em',
              color: '#C9A558', textTransform: 'uppercase', marginBottom: 16,
            }}>
              {eyebrow}
            </p>
          )}
          <h1 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 'clamp(26px, 5vw, 50px)',
            color: '#EDD9BC',
            fontWeight: 700,
            lineHeight: 1.2,
            marginBottom: 20,
          }}>
            {heading}
          </h1>
          {subheading && (
            <p style={{
              fontFamily: "'Times New Roman', Times, serif",
              fontSize: 'clamp(16px, 2.5vw, 20px)',
              color: '#BA9D7C',
              lineHeight: 1.85,
              fontStyle: 'italic',
              marginBottom: 16,
              maxWidth: 520,
            }}>
              {subheading}
            </p>
          )}
          {smallText && (
            <p style={{
              fontFamily: "'Montserrat', sans-serif",
              fontSize: 13, letterSpacing: '0.08em',
              color: 'rgba(201,165,88,0.6)',
              marginBottom: 28,
            }}>
              {smallText}
            </p>
          )}
          {(ctaPrimary || ctaSecondary) && (
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              {ctaPrimary && (
                <button
                  onClick={ctaPrimary.action}
                  className="btn-gold"
                  style={{ width: 'auto', padding: '12px 28px', fontFamily: "'Montserrat', sans-serif", fontSize: 13 }}
                >
                  {ctaPrimary.label}
                </button>
              )}
              {ctaSecondary && (
                <button
                  onClick={ctaSecondary.action}
                  className="btn-ghost"
                  style={{ width: 'auto', padding: '12px 28px', fontFamily: "'Montserrat', sans-serif", fontSize: 13 }}
                >
                  {ctaSecondary.label}
                </button>
              )}
            </div>
          )}
        </div>

        {/* Right — Image */}
        {imageSrc && (
          <div style={{
            borderRadius: 12,
            overflow: 'hidden',
            border: '1px solid rgba(201,165,88,0.2)',
            maxHeight: 420,
          }}>
            <img
              src={imageSrc}
              alt={imageAlt}
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            />
          </div>
        )}
      </div>
    </section>
  );
}
