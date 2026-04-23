import React, { useState } from 'react';
import { adinkraSymbols, adinkraCategories } from '../data/adinkraSymbols';

export default function AdinkraPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [selected, setSelected] = useState(null);

  const filtered = activeCategory === 'All'
    ? adinkraSymbols
    : adinkraSymbols.filter(s => s.category === activeCategory);

  return (
    <div className="page-wrapper">
      <section style={{ padding: '72px 20px 40px', textAlign: 'center', background: 'radial-gradient(ellipse at 50% 0%, rgba(201,165,88,0.07) 0%, transparent 60%)' }}>
        <h1 className="section-title" style={{ fontSize: 'clamp(26px, 5vw, 42px)', marginBottom: 12 }}>Adinkra Symbols</h1>
        <p className="section-subtitle" style={{ maxWidth: 620, margin: '0 auto 32px' }}>
          Sacred symbols of the Akan people — each one a philosophy, a prayer, a way of life. Originating with the Gyaman people of Ghana and Côte d'Ivoire, Adinkra are stamped on cloth and carved into gold to communicate the deepest values of African civilisation.
        </p>

        {/* Category filter */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, justifyContent: 'center' }}>
          {adinkraCategories.map(cat => (
            <button key={cat} onClick={() => setActiveCategory(cat)} style={{
              background: activeCategory === cat ? 'linear-gradient(135deg,#C9A558,#E8CB82)' : 'transparent',
              color: activeCategory === cat ? '#1C0E04' : '#BA9D7C',
              border: `1px solid ${activeCategory === cat ? '#C9A558' : 'rgba(201,165,88,0.2)'}`,
              borderRadius: 50, padding: '6px 16px',
              fontFamily: "'Cinzel', serif", fontSize: 11, letterSpacing: '0.1em',
              cursor: 'pointer', transition: 'all 0.2s', textTransform: 'uppercase',
            }}>
              {cat}
            </button>
          ))}
        </div>
      </section>

      <section style={{ padding: '16px 20px 80px', maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 20 }}>
          {filtered.map(sym => (
            <div key={sym.id} onClick={() => setSelected(sym)} style={{
              background: 'rgba(201,165,88,0.03)',
              border: `1px solid ${selected?.id === sym.id ? 'rgba(201,165,88,0.5)' : 'rgba(201,165,88,0.15)'}`,
              borderRadius: 12, padding: '28px 22px', cursor: 'pointer',
              transition: 'all 0.2s', textAlign: 'center',
            }}
              onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(201,165,88,0.45)'}
              onMouseLeave={e => e.currentTarget.style.borderColor = selected?.id === sym.id ? 'rgba(201,165,88,0.5)' : 'rgba(201,165,88,0.15)'}
            >
              <div style={{ fontSize: 40, marginBottom: 14, lineHeight: 1 }}>{sym.symbol}</div>
              <div style={{ fontFamily: "'Cinzel', serif", fontSize: 15, color: '#C9A558', letterSpacing: '0.08em', marginBottom: 4 }}>{sym.name}</div>
              <div style={{ fontFamily: "'EB Garamond', serif", fontSize: 14, color: '#7C5F48', fontStyle: 'italic', marginBottom: 12 }}>"{sym.translation}"</div>
              <span style={{
                display: 'inline-block', padding: '3px 10px', borderRadius: 50,
                background: 'rgba(201,165,88,0.08)', border: '1px solid rgba(201,165,88,0.15)',
                fontSize: 11, color: '#BA9D7C', fontFamily: "'Cinzel', serif", letterSpacing: '0.08em',
              }}>{sym.category}</span>
              <p style={{ color: '#BA9D7C', fontSize: 14, lineHeight: 1.75, marginTop: 12, marginBottom: 0 }}>
                {sym.meaning.substring(0, 100)}…
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Detail modal */}
      {selected && (
        <div onClick={() => setSelected(null)} style={{
          position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          zIndex: 1000, padding: 20, overflowY: 'auto',
        }}>
          <div onClick={e => e.stopPropagation()} style={{
            background: '#100d00', border: '1px solid rgba(201,165,88,0.3)',
            borderRadius: 14, padding: '40px 36px', maxWidth: 620, width: '100%',
            position: 'relative',
          }}>
            <button onClick={() => setSelected(null)} style={{
              position: 'absolute', top: 16, right: 16,
              background: 'transparent', border: '1px solid rgba(201,165,88,0.2)',
              color: '#BA9D7C', borderRadius: '50%', width: 32, height: 32, cursor: 'pointer', fontSize: 16,
            }}>✕</button>

            <div style={{ textAlign: 'center', marginBottom: 28 }}>
              <div style={{ fontSize: 56, marginBottom: 16 }}>{selected.symbol}</div>
              <h2 style={{ fontFamily: "'Cinzel', serif", fontSize: 26, color: '#C9A558', letterSpacing: '0.1em', marginBottom: 6 }}>{selected.name}</h2>
              <p style={{ fontFamily: "'EB Garamond', serif", fontSize: 18, color: '#7C5F48', fontStyle: 'italic', marginBottom: 0 }}>"{selected.translation}"</p>
            </div>

            <div style={{ borderTop: '1px solid rgba(201,165,88,0.1)', paddingTop: 24, marginBottom: 20 }}>
              <div style={{ fontFamily: "'Cinzel', serif", fontSize: 11, color: '#9E7D42', letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: 10 }}>Meaning</div>
              <p style={{ color: '#EDD9BC', fontSize: 17, lineHeight: 1.85 }}>{selected.meaning}</p>
            </div>

            <div style={{ borderTop: '1px solid rgba(201,165,88,0.1)', paddingTop: 20, marginBottom: 20 }}>
              <div style={{ fontFamily: "'Cinzel', serif", fontSize: 11, color: '#9E7D42', letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: 10 }}>Traditional Usage</div>
              <p style={{ color: '#BA9D7C', fontSize: 16, lineHeight: 1.8 }}>{selected.usage}</p>
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {selected.attributes.map(a => (
                <span key={a} style={{
                  padding: '5px 14px', borderRadius: 50, fontSize: 13,
                  background: 'rgba(201,165,88,0.08)', border: '1px solid rgba(201,165,88,0.2)',
                  color: '#C9A558', fontFamily: "'Cinzel', serif", letterSpacing: '0.06em',
                }}>{a}</span>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
