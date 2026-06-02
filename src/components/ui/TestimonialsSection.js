import React, { useState, useEffect, useRef } from 'react';

const TESTIMONIALS = [
  {
    quote: "I ordered the Kofi Friday Born T-shirt for my nephew's naming ceremony. The quality is incredible — premium cotton and the print is bold and clear. He wore it with so much pride.",
    name: 'Abena A.',
    location: 'London, UK',
    day: 'Friday Born',
    img: '/images/afia day born white t shirt.jpeg',
  },
  {
    quote: "The baby bodysuit arrived gift-wrapped and looking absolutely beautiful. My cousin cried when she saw 'Kwame Saturday Born' on her son's first outfit. This is a gift people remember.",
    name: 'Yaa M.',
    location: 'Toronto, Canada',
    day: 'Thursday Born',
    img: '/images/kwame day born cream babysuit.jpeg',
  },
  {
    quote: "Shipping was fast and the mug is perfect. My dad is Kwadwo Monday-born and seeing his name with the Adinkra symbol every morning means the world to him. Best birthday gift I've ever given.",
    name: 'Nana K.',
    location: 'Amsterdam, Netherlands',
    day: 'Monday Born',
    img: '/images/Akosua Sunday Born Mug.png',
  },
  {
    quote: "I generated my Akan name for the first time on this site and discovered I'm Adwoa. I ordered the T-shirt immediately. It connects me back to my roots in a way I never expected.",
    name: 'Adwoa O.',
    location: 'New York, USA',
    day: 'Monday Born',
    img: '/images/adwoa black t shirt.jpeg',
  },
  {
    quote: "The hoodie for my mum's birthday was exactly what she needed. 'Best Mom Ever' with the Adinkra design — she hasn't taken it off. The whole family wants one now.",
    name: 'Kwesi B.',
    location: 'Accra, Ghana',
    day: 'Sunday Born',
    img: '/images/best mom ever hoodie.jpeg',
  },
];

export default function TestimonialsSection({ dark = false }) {
  const [active, setActive] = useState(0);
  const timerRef = useRef(null);

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setActive((a) => (a + 1) % TESTIMONIALS.length);
    }, 5000);
    return () => clearInterval(timerRef.current);
  }, []);

  const t = TESTIMONIALS[active];

  const bg = dark
    ? 'linear-gradient(180deg, #18100A 0%, #1C120A 100%)'
    : '#ffffff';
  const textPrimary = dark ? '#EDD9BC' : '#1a1a1a';
  const textSecondary = dark ? '#BA9D7C' : '#5a5a5a';
  const textAccent = '#C9A558';
  const cardBg = dark ? 'rgba(201,165,88,0.05)' : '#faf9f7';
  const cardBorder = dark ? 'rgba(201,165,88,0.2)' : 'rgba(201,165,88,0.25)';
  const dotInactive = dark ? 'rgba(201,165,88,0.25)' : 'rgba(201,165,88,0.35)';

  return (
    <section
      aria-label="Customer testimonials"
      style={{ background: bg, padding: 'clamp(48px,6vw,80px) clamp(16px,3vw,36px)' }}
    >
      <div style={{ maxWidth: 860, margin: '0 auto' }}>

        <div style={{ textAlign: 'center', marginBottom: 'clamp(24px,4vw,40px)' }}>
          <p style={{
            fontFamily: "'Cinzel', serif",
            fontSize: 11,
            letterSpacing: '0.22em',
            color: textAccent,
            textTransform: 'uppercase',
            marginBottom: 10,
          }}>
            Real Customers
          </p>
          <h2 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 'clamp(24px, 3.5vw, 36px)',
            color: textPrimary,
            fontWeight: 700,
            lineHeight: 1.2,
            marginBottom: 0,
          }}>
            What Our Community Says
          </h2>
          <div
            aria-hidden="true"
            style={{
              height: 2, width: 80,
              background: 'linear-gradient(to right, #C9A558, #E8CB82, #C9A558)',
              margin: '16px auto 0', borderRadius: 2,
            }}
          />
        </div>

        <div
          key={active}
          style={{
            background: cardBg,
            border: `1px solid ${cardBorder}`,
            borderRadius: 16,
            padding: 'clamp(24px,4vw,40px)',
            display: 'grid',
            gridTemplateColumns: 'minmax(0,1fr) auto',
            gap: 'clamp(16px,3vw,32px)',
            alignItems: 'start',
            animation: 'tmFadeIn 0.5s ease',
          }}
        >
          <div>
            <div style={{ fontSize: 32, color: textAccent, lineHeight: 1, marginBottom: 14, opacity: 0.6 }}>"</div>
            <p style={{
              fontFamily: "'Times New Roman', Times, serif",
              fontSize: 'clamp(15px,2vw,18px)',
              color: textPrimary,
              lineHeight: 1.85,
              fontStyle: 'italic',
              marginBottom: 20,
            }}>
              {t.quote}
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div>
                <div style={{
                  fontFamily: "'Cinzel', serif",
                  fontSize: 13,
                  color: textAccent,
                  letterSpacing: '0.08em',
                  marginBottom: 3,
                }}>
                  {t.name}
                </div>
                <div style={{ color: textSecondary, fontSize: 12 }}>
                  {t.location} · <span style={{ color: textAccent, opacity: 0.8 }}>{t.day}</span>
                </div>
              </div>
            </div>
          </div>

          <img
            src={t.img}
            alt=""
            aria-hidden="true"
            style={{
              width: 'clamp(80px,14vw,130px)',
              aspectRatio: '1 / 1',
              objectFit: 'cover',
              borderRadius: 12,
              border: `1px solid ${cardBorder}`,
              flexShrink: 0,
            }}
          />
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginTop: 24 }}>
          {TESTIMONIALS.map((_, i) => (
            <button
              key={i}
              aria-label={`Go to testimonial ${i + 1}`}
              onClick={() => { setActive(i); clearInterval(timerRef.current); }}
              style={{
                width: i === active ? 24 : 8,
                height: 8,
                borderRadius: 4,
                border: 'none',
                background: i === active ? textAccent : dotInactive,
                cursor: 'pointer',
                padding: 0,
                transition: 'width 0.3s ease, background 0.3s ease',
              }}
            />
          ))}
        </div>
      </div>

      <style>{`
        @keyframes tmFadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
}
