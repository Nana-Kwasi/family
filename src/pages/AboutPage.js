import React from 'react';
import { products } from '../data/products';
import ProductCard from '../components/ProductCard';

const GoldDivider = () => (
  <div className="gold-divider">
    <span className="gold-divider-icon">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
        <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12z"/>
        <path d="M4 21.6c0-4.4 3.6-8 8-8s8 3.6 8 8"/>
      </svg>
    </span>
  </div>
);

const tracks = [
  { title: 'Golden Throne', genre: 'Afrobeats', duration: '3:42' },
  { title: 'Sankofa Dreams', genre: 'Highlife', duration: '4:15' },
  { title: 'Kente Rhythms', genre: 'Afro-fusion', duration: '3:58' },
  { title: "Friday's Child", genre: 'Neo-Soul', duration: '4:30' },
  { title: 'Adinkra Heart', genre: 'Afrobeats', duration: '3:22' },
];

const socials = [
  { name: 'Instagram', handle: '@afia.official', url: '#', icon: '📸' },
  { name: 'TikTok', handle: '@afia.music', url: '#', icon: '🎵' },
  { name: 'X (Twitter)', handle: '@AfiaAkan', url: '#', icon: '𝕏' },
  { name: 'YouTube', handle: '@mamaafricaafia', url: 'https://youtube.com/@mamaafricaafia?si=y0TOjenc86ksN-Ez', icon: '▶' },
  { name: 'Spotify', handle: 'Afia', url: '#', icon: '🎧' },
];

export default function AboutPage() {
  return (
    <div className="page-wrapper">
      {/* Meet Afia */}
      <section className="afia-section">
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <h2 className="section-title">Meet Afia</h2>
          <p className="section-subtitle">The Friday-Born Queen</p>
        </div>
        <GoldDivider />

        <img
          src="/images/afia-hero.jpg"
          alt="Meet Afia — The Friday-Born Queen"
          className="meet-afia-img"
          style={{ maxHeight: 560, objectFit: 'cover', objectPosition: 'top' }}
        />

        <div style={{ maxWidth: 700, margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16, marginBottom: 20 }}>
            <span style={{ color: '#C9A558', fontSize: 22, flexShrink: 0, marginTop: 2 }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="12" cy="12" r="10"/>
                <circle cx="12" cy="12" r="3"/>
              </svg>
            </span>
            <div>
              <h3 style={{ fontFamily: "'Cinzel', serif", fontSize: 16, color: '#C9A558', letterSpacing: '0.1em', marginBottom: 12, textTransform: 'uppercase' }}>
                Born on Friday
              </h3>
              <p style={{ color: '#EDD9BC', lineHeight: 1.9, fontSize: 19 }}>
                In the Akan naming tradition, <strong style={{ color: '#C9A558' }}>Afia</strong> is the name given to a female born on Friday. The name carries the spirit of fertility, the earth's abundance, and creative power.
              </p>
            </div>
          </div>

          <p style={{ color: '#BA9D7C', lineHeight: 1.9, fontSize: 17, marginBottom: 20 }}>
            Afia is an AI avatar who embodies the grace, wisdom, and strength of Ghanaian culture. Draped in the vibrant patterns of kente cloth and adorned with golden Adinkra symbols, she carries the heritage of the Ashanti kingdom into the digital age.
          </p>

          <p style={{ color: '#BA9D7C', lineHeight: 1.9, fontSize: 17, marginBottom: 20 }}>
            As a Friday-born child, Afia is associated with the planet Venus, representing love, beauty, and creativity. She channels these energies through her music, her art, and her connection with the community — bridging ancient traditions with modern expression.
          </p>

          <p style={{ color: '#BA9D7C', lineHeight: 1.9, fontSize: 19 }}>
            Her mission is to share the richness of Akan culture with the world — one name, one symbol, one song at a time.
          </p>
        </div>
      </section>

      {/* Music */}
      <section style={{ background: 'rgba(201,165,88,0.02)', borderTop: '1px solid rgba(201,165,88,0.1)', borderBottom: '1px solid rgba(201,165,88,0.1)', padding: '64px 0' }}>
        <div className="afia-section">
          <div style={{ textAlign: 'center', marginBottom: 32 }}>
            <h2 className="section-title">Afia's Music</h2>
            <p className="section-subtitle">Where ancient rhythms meet modern soul</p>
          </div>
          <GoldDivider />

          <div style={{ marginTop: 32 }}>
            {tracks.map((track, i) => (
              <div key={i} className="track-row">
                <button className="track-play-btn" aria-label={`Play ${track.title}`}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><polygon points="5,3 19,12 5,21"/></svg>
                </button>
                <div className="track-info">
                  <div className="track-title">{track.title}</div>
                  <div className="track-genre">{track.genre}</div>
                </div>
                <div className="track-duration">{track.duration}</div>
                <span style={{ color: '#9E7D42' }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>
                </span>
              </div>
            ))}
            <p style={{ textAlign: 'center', fontStyle: 'italic', color: '#7C5F48', marginTop: 16, fontSize: 15 }}>
              Full tracks coming soon — stay tuned
            </p>
          </div>
        </div>
      </section>

      {/* Connect */}
      <section className="afia-section">
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <h2 className="section-title">Connect With Afia</h2>
          <p className="section-subtitle">Follow the journey</p>
        </div>
        <GoldDivider />

        <div style={{ marginTop: 32, maxWidth: 560, margin: '32px auto 0' }}>
          {socials.map((s, i) => (
            <a key={i} href={s.url} className="social-link-row" target="_blank" rel="noreferrer">
              <span className="social-icon">{s.icon}</span>
              <div>
                <span className="social-link-name">{s.name}</span>
                <span className="social-link-handle">{s.handle}</span>
              </div>
              <span style={{ marginLeft: 'auto', color: '#9E7D42', fontSize: 18 }}>→</span>
            </a>
          ))}
        </div>
      </section>

      {/* Shop About */}
      <section style={{ background: 'rgba(201,165,88,0.03)', borderTop: '1px solid rgba(201,165,88,0.1)', borderBottom: '1px solid rgba(201,165,88,0.1)', padding: '64px 20px' }}>
        <div style={{ maxWidth: 720, margin: '0 auto', textAlign: 'center' }}>
          <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 11, letterSpacing: '0.2em', color: '#C9A558', textTransform: 'uppercase', marginBottom: 16 }}>Our Gift Shop</p>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(22px, 4vw, 32px)', color: '#EDD9BC', marginBottom: 24 }}>
            We believe mothers deserve more than ordinary gifts.
          </h2>
          <p style={{ color: '#BA9D7C', fontSize: 18, lineHeight: 1.95, marginBottom: 20, fontStyle: 'italic', fontFamily: "'Times New Roman', Times, serif" }}>
            They deserve words that feel true, timeless, and deeply appreciated.
          </p>
          <p style={{ color: '#BA9D7C', fontSize: 18, lineHeight: 1.95, marginBottom: 20, fontFamily: "'Times New Roman', Times, serif" }}>
            This shop was created to offer meaningful merchandise that celebrates motherhood with grace, gratitude, warmth, and beauty. From elegant mugs to wearable statements of love and honor, each design is made to help people give gifts that feel personal and memorable.
          </p>
          <p style={{ color: '#BA9D7C', fontSize: 18, lineHeight: 1.95, fontFamily: "'Times New Roman', Times, serif" }}>
            Our style is simple, refined, and heartfelt. We focus on messages of gratitude, sacrifice, faith, strength, joy, and the quiet power of mothers. Thank you for choosing thoughtful gifts that celebrate the women who give so much.
          </p>
          <div style={{ display: 'flex', gap: 20, justifyContent: 'center', flexWrap: 'wrap', marginTop: 28 }}>
            {['Respect', 'Heritage', 'Love', 'Legacy'].map(w => (
              <span key={w} style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 12, letterSpacing: '0.18em', color: 'rgba(201,165,88,0.6)', textTransform: 'uppercase' }}>{w}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Merchandise */}
      <section style={{ borderTop: '1px solid rgba(201,165,88,0.1)', padding: '64px 0 80px' }}>
        <div style={{ textAlign: 'center', marginBottom: 40, padding: '0 20px' }}>
          <h2 className="section-title">Merchandise</h2>
          <p className="section-subtitle">Heritage names, culture, and gift-ready keepsakes for every generation</p>
        </div>
        <GoldDivider />
        <div className="product-grid" style={{ paddingTop: 24 }}>
          {products.map(p => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>
    </div>
  );
}
