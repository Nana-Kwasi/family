import React, { useEffect, useState } from 'react';

// The panel beside the sign-in card. Slow crossfade rather than a slide: the images are
// artwork, and sliding them makes the page feel like a promotion instead of a doorway.

const SLIDE_MS = 6000;
const pi = (file) => encodeURI(`/images/login-images/${file}`);

/** Each slide carries a line, so the panel says something rather than just decorating. */
const SLIDES = [
  { src: pi('Ojadili by Agozie.jpeg'), caption: 'Every name carries a story older than the person holding it.' },
  { src: pi('Village Life.jpeg'), caption: 'Village life — where the day you were born is the first thing known about you.' },
  { src: pi('Gye Nyame Black and Gold - Adinkra Symbols….jpeg'), caption: 'Gye Nyame — except for God, I fear none.' },
  { src: pi('Walls that speak Igbo · Art by Chiagoziem Nneamaka Orji · Ijele.jpeg'), caption: 'Walls that speak — cloth, colour and memory.' },
  { src: pi('African Mask 🎭  Progress shot 📸🎨  Charcoal on….jpeg'), caption: 'The mask remembers what the face forgets.' },
  { src: pi('1083045410416704850.jpeg'), caption: 'Heritage worn, not just inherited.' },
  { src: pi('afro.jpeg'), caption: 'Crowned as you came.' },
  { src: pi('908742031071147543.jpeg'), caption: 'Akwaaba — you are welcome here.' },
  { src: pi('723742602665881513.jpeg'), caption: 'Gold, cloth and lineage.' },
  { src: pi('PeterK (PETER KAMALE) _ contemporary Burundi….jpeg'), caption: 'Contemporary hands, ancestral line.' },
  { src: pi('939422803521304759.jpeg'), caption: 'The colours of a continent.' },
  { src: pi('1144688430317182773.jpeg'), caption: 'Adinkra — wisdom written in symbol.' },
  { src: pi('962855595358818777.jpeg'), caption: 'Rhythm you can see.' },
  { src: pi('671317888246865963.jpeg'), caption: 'Beauty that predates the frame.' },
];

export default function AuthCarousel() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    // Respect a visitor who has asked the system for less motion.
    const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    if (reduced || paused) return undefined;

    const timer = setInterval(() => setIndex((i) => (i + 1) % SLIDES.length), SLIDE_MS);
    return () => clearInterval(timer);
  }, [paused]);

  return (
    <div
      className="ma-auth-carousel"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-roledescription="carousel"
      aria-label="Scenes from Ghana and the wider continent"
    >
      {SLIDES.map((slide, i) => (
        <div
          key={slide.src}
          aria-hidden={i !== index}
          style={{
            position: 'absolute', inset: 0,
            backgroundImage: `url("${slide.src}")`,
            backgroundSize: 'cover', backgroundPosition: 'center',
            opacity: i === index ? 1 : 0,
            // Slow zoom on the live slide only, so the panel breathes rather than sits still.
            transform: i === index ? 'scale(1.06)' : 'scale(1)',
            transition: 'opacity 1.6s ease, transform 7s ease-out',
          }}
        />
      ))}

      {/* Scrim: the caption has to stay readable over any of fourteen images. */}
      <div
        style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(180deg, rgba(20,12,6,0.42) 0%, rgba(20,12,6,0.12) 38%, rgba(20,12,6,0.86) 100%)',
        }}
      />

      <div style={{ position: 'relative', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '38px 40px' }}>
        <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 10.5, letterSpacing: '0.26em', textTransform: 'uppercase', color: '#E8CB82', marginBottom: 12 }}>
          Mama Africa Official
        </p>

        <p
          key={index}
          style={{
            fontFamily: "'EB Garamond', serif", fontSize: 21, lineHeight: 1.5,
            color: '#FAF0E0', margin: 0, maxWidth: 420,
            animation: 'maCaptionIn 1.1s ease both',
          }}
        >
          {SLIDES[index].caption}
        </p>

        <div style={{ display: 'flex', gap: 7, marginTop: 26 }}>
          {SLIDES.map((slide, i) => (
            <button
              key={slide.src}
              type="button"
              aria-label={`Show image ${i + 1} of ${SLIDES.length}`}
              onClick={() => setIndex(i)}
              style={{
                width: i === index ? 26 : 7, height: 7, borderRadius: 999, border: 'none', padding: 0,
                background: i === index ? '#E8CB82' : 'rgba(250,240,224,0.4)',
                cursor: 'pointer', transition: 'width 0.4s ease, background 0.4s ease',
              }}
            />
          ))}
        </div>
      </div>

      <style>{`
        @keyframes maCaptionIn {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
