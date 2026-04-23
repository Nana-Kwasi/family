import React, { useState } from 'react';
import { akanClans } from '../data/akanClans';

export default function ClansPage() {
  const [selected, setSelected] = useState(null);

  return (
    <div className="page-wrapper">
      <section style={{ padding: '72px 20px 48px', textAlign: 'center', background: 'radial-gradient(ellipse at 50% 0%, rgba(201,165,88,0.07) 0%, transparent 60%)' }}>
        <h1 className="section-title" style={{ fontSize: 'clamp(26px, 5vw, 42px)', marginBottom: 12 }}>The Akan Clan System</h1>
        <p className="section-subtitle" style={{ maxWidth: 660, margin: '0 auto 16px' }}>
          The Akan people are organised into eight matrilineal clans — called <strong style={{ color: '#C9A558' }}>Abusua</strong>. Your clan is determined entirely by your mother's lineage, not your father's. This is one of the most distinctive features of Akan society and has profound implications for inheritance, identity, and spiritual belonging.
        </p>
        <p style={{ color: '#7C5F48', fontStyle: 'italic', fontSize: 16, maxWidth: 560, margin: '0 auto' }}>
          "You may not know your clan name today — but it exists, and it has been waiting for you."
        </p>
      </section>

      {/* Matrilineal explainer */}
      <section style={{ maxWidth: 860, margin: '0 auto', padding: '0 20px 48px' }}>
        <div style={{ background: 'rgba(201,165,88,0.05)', border: '1px solid rgba(201,165,88,0.2)', borderRadius: 12, padding: '28px 32px' }}>
          <div style={{ fontFamily: "'Cinzel', serif", fontSize: 13, color: '#C9A558', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 14 }}>Understanding the Matrilineal System</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 24 }}>
            {[
              { icon: '👩', title: 'Identity from Mother', body: 'Your Abusua (clan) comes from your mother, not your father. If your mother is Oyoko, you are Oyoko — regardless of your father\'s clan.' },
              { icon: '🏠', title: 'Inheritance & Land', body: 'Property, chieftaincy, and land pass through the female line. A chief\'s successor is his nephew (sister\'s son), never his own son.' },
              { icon: '💍', title: 'Marriage Rules', body: 'You cannot marry within your own clan — it is considered taboo. Akan marriages are always between different clans, ensuring community bonding.' },
              { icon: '🌍', title: 'Diaspora & Identity', body: 'If you know your maternal grandmother\'s origin in Ghana, you may be able to identify your clan. This knowledge is your birthright.' },
            ].map(({ icon, title, body }) => (
              <div key={title}>
                <div style={{ fontSize: 24, marginBottom: 8 }}>{icon}</div>
                <div style={{ fontFamily: "'Cinzel', serif", fontSize: 12, color: '#C9A558', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 8 }}>{title}</div>
                <p style={{ color: '#BA9D7C', fontSize: 16, lineHeight: 1.8, margin: 0 }}>{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Clan grid */}
      <section style={{ padding: '0 20px 80px', maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 20 }}>
          {akanClans.map(clan => (
            <div key={clan.id} onClick={() => setSelected(clan)} style={{
              background: 'rgba(201,165,88,0.03)', border: '1px solid rgba(201,165,88,0.15)',
              borderRadius: 12, padding: '28px 24px', cursor: 'pointer',
              transition: 'all 0.2s', borderLeft: `3px solid ${clan.color}`,
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = `${clan.color}`; e.currentTarget.style.background = 'rgba(201,165,88,0.06)'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(201,165,88,0.15)'; e.currentTarget.style.background = 'rgba(201,165,88,0.03)'; e.currentTarget.style.borderLeftColor = clan.color; }}
            >
              <div style={{ fontSize: 36, marginBottom: 12 }}>{clan.symbol}</div>
              <div style={{ fontFamily: "'Cinzel', serif", fontSize: 18, color: clan.color, letterSpacing: '0.1em', marginBottom: 4 }}>{clan.name}</div>
              <div style={{ fontFamily: "'Cinzel', serif", fontSize: 11, color: '#9E7D42', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 12 }}>{clan.tagline}</div>
              <div style={{ fontFamily: "'EB Garamond', serif", fontSize: 15, color: '#7C5F48', fontStyle: 'italic', marginBottom: 14 }}>Totem: {clan.totem}</div>
              <p style={{ color: '#BA9D7C', fontSize: 15, lineHeight: 1.8, margin: '0 0 16px' }}>
                {clan.description.substring(0, 110)}…
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                {clan.traits.slice(0, 2).map(t => (
                  <span key={t} style={{ padding: '3px 10px', borderRadius: 50, fontSize: 12, background: 'rgba(201,165,88,0.06)', border: '1px solid rgba(201,165,88,0.15)', color: '#BA9D7C', fontFamily: "'Cinzel', serif", letterSpacing: '0.04em' }}>{t}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Detail modal */}
      {selected && (
        <div onClick={() => setSelected(null)} style={{
          position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.88)',
          display: 'flex', alignItems: 'flex-start', justifyContent: 'center',
          zIndex: 1000, padding: '40px 20px', overflowY: 'auto',
        }}>
          <div onClick={e => e.stopPropagation()} style={{
            background: '#100d00', border: `1px solid ${selected.color}40`,
            borderTop: `3px solid ${selected.color}`,
            borderRadius: 14, padding: '40px 36px', maxWidth: 680, width: '100%',
            position: 'relative',
          }}>
            <button onClick={() => setSelected(null)} style={{
              position: 'absolute', top: 16, right: 16, background: 'transparent',
              border: '1px solid rgba(201,165,88,0.2)', color: '#BA9D7C',
              borderRadius: '50%', width: 32, height: 32, cursor: 'pointer', fontSize: 16,
            }}>✕</button>

            <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24 }}>
              <div style={{ fontSize: 48 }}>{selected.symbol}</div>
              <div>
                <h2 style={{ fontFamily: "'Cinzel', serif", fontSize: 26, color: selected.color, letterSpacing: '0.1em', marginBottom: 4 }}>{selected.name}</h2>
                <div style={{ fontFamily: "'Cinzel', serif", fontSize: 12, color: '#9E7D42', letterSpacing: '0.12em', textTransform: 'uppercase' }}>{selected.tagline} · Totem: {selected.totem}</div>
              </div>
            </div>

            {[
              { label: 'About This Clan', body: selected.description, color: '#EDD9BC' },
              { label: 'Matrilineal Note', body: selected.matrilinealNote, color: '#BA9D7C' },
              { label: 'Spiritual Significance', body: selected.spiritualNote, color: '#BA9D7C' },
              { label: 'Clan Taboo', body: selected.taboo, color: '#7C5F48' },
              { label: 'For the Diaspora', body: selected.diasporaResonance, color: '#C9A558' },
            ].map(({ label, body, color }) => (
              <div key={label} style={{ borderTop: '1px solid rgba(201,165,88,0.08)', paddingTop: 18, marginBottom: 18 }}>
                <div style={{ fontFamily: "'Cinzel', serif", fontSize: 11, color: '#9E7D42', letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: 8 }}>{label}</div>
                <p style={{ color, fontSize: 16, lineHeight: 1.85, margin: 0, fontStyle: label === 'For the Diaspora' ? 'italic' : 'normal' }}>{body}</p>
              </div>
            ))}

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 8 }}>
              {selected.traits.map(t => (
                <span key={t} style={{ padding: '5px 14px', borderRadius: 50, fontSize: 13, background: 'rgba(201,165,88,0.08)', border: '1px solid rgba(201,165,88,0.2)', color: '#C9A558', fontFamily: "'Cinzel', serif", letterSpacing: '0.04em' }}>{t}</span>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
