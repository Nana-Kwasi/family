import React from 'react';
import { Link } from 'react-router-dom';

const hubs = [
  {
    to: '/culture/adinkra',
    icon: '✦',
    title: 'Adinkra Symbols',
    subtitle: '20 Sacred Symbols',
    desc: 'Every Adinkra symbol is a philosophy encoded in art — wisdom, faith, resilience, and love expressed in form. Explore all 20 symbols with their meanings and cultural significance.',
    color: '#C9A558',
  },
  {
    to: '/culture/twi',
    icon: '🗣️',
    title: 'Twi Language Basics',
    subtitle: 'Spoken by 9 million+',
    desc: 'Learn greetings, family terms, numbers, and cultural phrases in Twi — the most widely spoken language in Ghana. Reconnect through the very words your ancestors spoke.',
    color: '#5a9e6a',
  },
  {
    to: '/culture/clans',
    icon: '🌳',
    title: 'Akan Clan System',
    subtitle: '8 Matrilineal Clans',
    desc: 'Discover the eight Akan clans (Abusua) — a matrilineal system where your identity, inheritance, and spiritual belonging flow through your mother\'s bloodline.',
    color: '#e07020',
  },
  {
    to: '/culture/calendar',
    icon: '📅',
    title: 'Cultural Calendar',
    subtitle: 'Festivals & Sacred Days',
    desc: 'From Homowo to PANAFEST to Independence Day — discover Ghana\'s most important festivals and how to mark them from anywhere in the diaspora.',
    color: '#9b7fc8',
  },
  {
    to: '/diaspora',
    icon: '✊',
    title: 'Diaspora Stories',
    subtitle: 'Community Voices',
    desc: 'Black Americans and Africans in Europe sharing their journeys of reconnection. Read real stories of homecoming — and add your own to the record.',
    color: '#b05060',
  },
];

export default function CultureHubPage() {
  return (
    <div className="page-wrapper">
      <section style={{ padding: '72px 20px 56px', textAlign: 'center', background: 'radial-gradient(ellipse at 50% 0%, rgba(201,165,88,0.08) 0%, transparent 60%)' }}>
        <h1 className="section-title" style={{ fontSize: 'clamp(28px, 5vw, 46px)', marginBottom: 14 }}>Culture Hub</h1>
        <p className="section-subtitle" style={{ maxWidth: 640, margin: '0 auto 12px' }}>
          Your ancestral heritage is not lost — it is waiting. This is your gateway to the living culture of the Akan people and the broader Ghanaian world.
        </p>
        <p style={{ color: '#7C5F48', fontStyle: 'italic', fontSize: 17, maxWidth: 520, margin: '0 auto' }}>
          "Sankofa — it is not wrong to go back and fetch what you forgot."
        </p>
      </section>

      <section style={{ padding: '0 20px 80px', maxWidth: 1100, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 24 }}>
          {hubs.map(({ to, icon, title, subtitle, desc, color }) => (
            <Link key={to} to={to} style={{ textDecoration: 'none' }}>
              <div style={{
                background: 'rgba(201,165,88,0.03)', border: '1px solid rgba(201,165,88,0.15)',
                borderTop: `3px solid ${color}`, borderRadius: 12, padding: '32px 28px',
                height: '100%', transition: 'all 0.2s', cursor: 'pointer',
              }}
                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(201,165,88,0.06)'; e.currentTarget.style.borderColor = `${color}60`; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'rgba(201,165,88,0.03)'; e.currentTarget.style.borderColor = 'rgba(201,165,88,0.15)'; }}
              >
                <div style={{ fontSize: 40, marginBottom: 16 }}>{icon}</div>
                <div style={{ fontFamily: "'Cinzel', serif", fontSize: 18, color: color, letterSpacing: '0.08em', marginBottom: 4 }}>{title}</div>
                <div style={{ fontFamily: "'Cinzel', serif", fontSize: 11, color: '#9E7D42', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 16 }}>{subtitle}</div>
                <p style={{ color: '#BA9D7C', fontSize: 16, lineHeight: 1.85, margin: '0 0 20px' }}>{desc}</p>
                <div style={{ color: color, fontFamily: "'Cinzel', serif", fontSize: 12, letterSpacing: '0.12em', textTransform: 'uppercase' }}>
                  Explore →
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Quote section */}
        <div style={{ marginTop: 64, textAlign: 'center', padding: '40px 24px', border: '1px solid rgba(201,165,88,0.15)', borderRadius: 12, background: 'rgba(201,165,88,0.02)' }}>
          <div style={{ fontSize: 32, marginBottom: 16 }}>🌍</div>
          <p style={{ fontFamily: "'EB Garamond', serif", fontSize: 'clamp(18px, 3vw, 24px)', color: '#C9A558', fontStyle: 'italic', lineHeight: 1.7, maxWidth: 700, margin: '0 auto 16px' }}>
            "Until the lion learns to write, every story will glorify the hunter."
          </p>
          <p style={{ color: '#7C5F48', fontSize: 16, fontStyle: 'italic' }}>— African Proverb</p>
          <p style={{ color: '#BA9D7C', fontSize: 16, lineHeight: 1.8, maxWidth: 560, margin: '20px auto 0' }}>
            This platform exists so that you — the lion — can learn to write your own story, in your own language, rooted in your own tradition.
          </p>
        </div>
      </section>
    </div>
  );
}
