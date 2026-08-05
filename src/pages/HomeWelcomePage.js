import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useSEO from '../hooks/useSEO';
import { WELCOME_SEEN_KEY } from '../constants/welcome';

// The doorway. Before anything is asked of a visitor, they are welcomed — the way a compound
// welcomes someone who has travelled a long way. The lines type themselves out because an
// arrival should feel like it is happening now, not like a banner that was already there.

const GOLD = '#C9A558';
const GOLD_DEEP = '#8B6914';
// The copy sits on its own dark panel rather than on the artwork, so the picture is never
// tinted, washed out or covered — see .ma-welcome-panel.

const BACKGROUND = encodeURI('/images/login-images/hh.png');

/** Typed in order. Each line waits for the one above it to finish. */
const LINES = [
  { text: 'Akwaaba.', kind: 'kicker' },
  { text: 'Welcome to Africa — to Ghana.', kind: 'heading' },
  {
    text: 'You have come a long way to stand in this compound. '
      + 'The elders have heard you were coming. Someone has already set a stool by the fire, '
      + 'and the drums know your footsteps before they know your name.',
    kind: 'body',
  },
  {
    // No visitor leaves a Ghanaian home empty-handed. The store is introduced as the ending
    // of that custom rather than as a sales line — it earns the click by being true.
    text: 'And no one leaves a Ghanaian home empty-handed. '
      + 'Before you go, take something back with you — your name on cloth, a mug, '
      + 'a keepsake for a child not yet born — so the visit stays with you long after you close this page.',
    kind: 'body',
  },
];

const SPEED_MS = { kicker: 90, heading: 55, body: 22 };

/** Either way out of the doorway counts as having been welcomed. */
function markWelcomed() {
  try {
    sessionStorage.setItem(WELCOME_SEEN_KEY, '1');
  } catch {
    /* storage blocked — the landing gate falls through to the home page anyway */
  }
}

export default function HomeWelcomePage() {
  const navigate = useNavigate();
  const [lineIndex, setLineIndex] = useState(0);
  const [typed, setTyped] = useState('');
  const [done, setDone] = useState(false);
  const timer = useRef(null);

  useSEO({
    title: 'Akwaaba — Welcome to Mama Africa',
    description: 'Welcome to Ghana. Discover your Akan day name, your heritage, and the stories behind it.',
    image: '/images/afia-hero.jpg',
  });

  // Someone who has asked for less motion gets the whole text at once rather than nothing.
  const reducedMotion = useMemo(
    () => typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches,
    [],
  );

  useEffect(() => {
    if (reducedMotion) {
      setLineIndex(LINES.length);
      setDone(true);
      return undefined;
    }
    if (lineIndex >= LINES.length) {
      setDone(true);
      return undefined;
    }

    const line = LINES[lineIndex];
    let position = 0;

    timer.current = setInterval(() => {
      position += 1;
      setTyped(line.text.slice(0, position));

      if (position >= line.text.length) {
        clearInterval(timer.current);
        // A beat between lines, longer after the short ones so they land.
        const pause = line.kind === 'body' ? 700 : 420;
        timer.current = setTimeout(() => {
          setLineIndex((i) => i + 1);
          setTyped('');
        }, pause);
      }
    }, SPEED_MS[line.kind]);

    return () => {
      clearInterval(timer.current);
      clearTimeout(timer.current);
    };
  }, [lineIndex, reducedMotion]);

  /** Lines already finished render in full; the current one renders as far as it has typed. */
  const renderLine = (line, index) => {
    const isPast = index < lineIndex;
    const isCurrent = index === lineIndex;
    if (!isPast && !isCurrent) return null;

    const content = isPast ? line.text : typed;
    const showCaret = isCurrent && !done;

    if (line.kind === 'kicker') {
      return (
        <p key={index} style={{
          fontFamily: "'Cinzel', serif", fontSize: 'clamp(13px,1.6vw,16px)',
          letterSpacing: '0.34em', textTransform: 'uppercase', color: '#9C7318',
          textShadow: '0 1px 12px rgba(255,252,245,0.9)',
          margin: '0 0 18px',
        }}>
          {content}{showCaret && <Caret />}
        </p>
      );
    }

    if (line.kind === 'heading') {
      return (
        <h1 key={index} style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: 'clamp(30px,5.4vw,62px)', lineHeight: 1.14,
          color: '#9C7318', margin: '0 0 24px', fontWeight: 700,
          textShadow: '0 2px 22px rgba(255,252,245,0.92), 0 1px 3px rgba(255,252,245,0.95)',
        }}>
          {content}{showCaret && <Caret />}
        </h1>
      );
    }

    return (
      <p key={index} style={{
        fontFamily: "'EB Garamond', serif",
        fontSize: 'clamp(16px,2.1vw,22px)', lineHeight: 1.75,
        color: '#9C7318', margin: 0,
        textShadow: '0 1px 14px rgba(255,252,245,0.92)',
      }}>
        {content}{showCaret && <Caret />}
      </p>
    );
  };

  return (
    <div style={{ position: 'relative', minHeight: '100vh', overflow: 'hidden', background: '#140C06' }}>
      {/* Background sits in its own layer so it can drift slowly without moving the text. */}
      <div
        aria-hidden
        style={{
          position: 'absolute', inset: '-4%',
          backgroundImage: `url("${BACKGROUND}")`,
          backgroundSize: 'cover', backgroundPosition: 'center',
          animation: reducedMotion ? 'none' : 'maWelcomeDrift 34s ease-in-out infinite alternate',
        }}
      />
      <main
        style={{
          position: 'relative', minHeight: '100vh', display: 'flex', flexDirection: 'column',
          justifyContent: 'center', alignItems: 'flex-end',
          // Less padding on the right than the left: the panel needs to sit clear of the
          // map, which reaches well past the centre of the frame.
          // Almost no gutter on the right: the map reaches well past centre, so the copy is
          // pushed as close to the edge as it can sit without touching it.
          padding: 'clamp(28px,5vw,64px) clamp(16px,1.4vw,26px) clamp(28px,5vw,64px) clamp(28px,7vw,110px)',
          maxWidth: 'none', margin: '0 auto',
        }}
      >
        <div className="ma-welcome-panel">
          <div className="ma-welcome-copy">
            {LINES.map(renderLine)}
          </div>

        {/* The way onward appears only once the welcome has finished speaking. */}
        <div
          className="ma-welcome-copy"
          style={{
            marginTop: 'clamp(28px,4vw,44px)',
            opacity: done ? 1 : 0,
            transform: done ? 'translateY(0)' : 'translateY(14px)',
            transition: 'opacity 0.9s ease 0.2s, transform 0.9s ease 0.2s',
            pointerEvents: done ? 'auto' : 'none',
          }}
        >
          <button
            type="button"
            onClick={() => {
              markWelcomed();
              navigate('/');
            }}
            className="ma-welcome-enter"
            aria-label="Enter the site"
          >
            <span>Step inside</span>
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
              <line x1="4" y1="12" x2="19" y2="12" />
              <polyline points="13 6 19 12 13 18" />
            </svg>
          </button>

          <button
            type="button"
            onClick={() => {
              markWelcomed();
              navigate('/store');
            }}
            className="ma-welcome-store"
          >
            Take something home
          </button>

          <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 12, letterSpacing: '0.12em', color: '#9C7318', marginTop: 18, textShadow: '0 1px 10px rgba(255,252,245,0.9)' }}>
            Discover your Akan day name &middot; Heritage keepsakes
          </p>
        </div>
        </div>
      </main>

      <style>{`
        @keyframes maWelcomeDrift {
          from { transform: scale(1.04) translate3d(0, 0, 0); }
          to   { transform: scale(1.12) translate3d(-2%, -1.5%, 0); }
        }
        @keyframes maCaretBlink { 0%, 45% { opacity: 1; } 50%, 100% { opacity: 0; } }

        /* The words get their own surface rather than tinting the artwork.
           This background is busy everywhere — lettering bottom-left, the map through the
           middle, symbols along the bottom — so there is no clear space to sit text on.
           Shading the image to make room bleached it; a contained panel keeps the picture
           exactly as shot and still gives the copy the contrast it needs. */
        .ma-welcome-panel {
          width: 100%;
          max-width: 440px;
          /* No card. The words sit directly on the artwork in gold — so the picture is
             never covered, tinted or washed. A soft light halo behind the glyphs is the only
             concession, and it is what keeps gold readable where the map runs dark. */
        }
        .ma-welcome-copy { width: 100%; }
        @media (max-width: 900px) {
          .ma-welcome-panel { max-width: 100%; }
        }

        .ma-welcome-enter {
          display: inline-flex; align-items: center; gap: 16px;
          padding: 15px 30px; border-radius: 999px; cursor: pointer;
          background: linear-gradient(135deg, ${GOLD} 0%, #B98F3E 55%, ${GOLD_DEEP} 100%);
          border: none;
          color: #FFFDF7;
          box-shadow: 0 10px 26px rgba(139,105,20,0.28);
          font-family: 'Cinzel', serif; font-size: 14px; letter-spacing: 0.2em;
          text-transform: uppercase;
          backdrop-filter: blur(6px);
          transition: background 0.35s ease, border-color 0.35s ease, transform 0.35s ease;
        }
        .ma-welcome-enter:hover {
          transform: translateX(6px);
          box-shadow: 0 14px 32px rgba(139,105,20,0.38);
        }
        .ma-welcome-enter svg { transition: transform 0.35s ease; }
        .ma-welcome-enter:hover svg { transform: translateX(5px); }

        /* Quieter than the primary way onward: an invitation, not a demand. */
        .ma-welcome-store {
          margin-left: 18px;
          padding: 15px 4px;
          background: none; border: none; cursor: pointer;
          color: #9C7318;
          text-shadow: 0 1px 10px rgba(255,252,245,0.9);
          font-family: 'Montserrat', sans-serif; font-size: 12.5px;
          letter-spacing: 0.14em; text-transform: uppercase;
          border-bottom: 1px solid rgba(139,105,20,0.5);
          transition: color 0.3s ease, border-color 0.3s ease;
        }
        .ma-welcome-store:hover { color: #6E4F0C; border-color: #9C7318; }
        @media (max-width: 620px) {
          .ma-welcome-store { display: block; margin: 18px 0 0; }
        }
      `}</style>
    </div>
  );
}

function Caret() {
  return (
    <span
      aria-hidden
      style={{
        display: 'inline-block', width: '0.055em', minWidth: 2, height: '1em',
        background: '#8B6914', marginLeft: '0.12em', verticalAlign: '-0.12em',
        animation: 'maCaretBlink 1s step-end infinite',
      }}
    />
  );
}
