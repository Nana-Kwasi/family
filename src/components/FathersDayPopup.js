import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fathersDayState } from '../utils/fathersDay';

const COPY = {
  pre: {
    eyebrow: "Father's Day · This Sunday",
    title: ['Behind Every Strong Family,', 'A Quiet Hero.'],
    body: 'This Sunday we honour the fathers, grandfathers, uncles, and father-figures who carried us — the men who gave us our name, our roots, and our strength. Celebrate yours with a heritage gift he will treasure.',
    cta: 'Shop for Your Hero →',
  },
  day: {
    eyebrow: 'Happy Father’s Day',
    title: ['Today, We Celebrate', 'You, Papa.'],
    body: 'To every father who taught us where we come from — Happy Father’s Day. May your name be honoured, your roots remembered, and your legacy worn with pride. Find the perfect gift for your hero.',
    cta: 'Celebrate Your Hero →',
  },
};

export default function FathersDayPopup({ onClose }) {
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();
  const state = fathersDayState();

  useEffect(() => {
    if (!state) return undefined;
    const t = setTimeout(() => setVisible(true), 900);
    return () => clearTimeout(t);
  }, [state]);

  if (!state || !visible) return null;
  const copy = COPY[state];

  function close() { setVisible(false); if (onClose) onClose(); }
  function goStore() { setVisible(false); if (onClose) onClose(); navigate('/store'); }

  return (
    <div
      onClick={close}
      style={{
        position: 'fixed', inset: 0, zIndex: 2000,
        background: 'rgba(10, 6, 3, 0.86)', backdropFilter: 'blur(6px)',
        display: 'flex', alignItems: 'flex-start', justifyContent: 'center',
        overflowY: 'auto', padding: '16px 16px 32px',
        animation: 'fadeInOverlay 0.45s ease',
      }}
    >
      <style>{`
        @keyframes fadeInOverlay { from { opacity: 0 } to { opacity: 1 } }
        @keyframes slideUpCard { from { opacity: 0; transform: translateY(28px) } to { opacity: 1; transform: translateY(0) } }
      `}</style>

      <div style={{ width: '100%', maxWidth: 540, margin: 'auto', paddingTop: 8 }}>
        {/* Close */}
        <div onClick={(e) => e.stopPropagation()} style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 6 }}>
          <button
            onClick={close}
            aria-label="Close"
            style={{
              background: 'rgba(44,26,14,0.95)', border: '1px solid rgba(201,165,88,0.4)', borderRadius: 50,
              color: '#E8CB82', fontSize: 18, width: 38, height: 38,
              display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', flexShrink: 0,
            }}
          >×</button>
        </div>

        {/* Card */}
        <div
          onClick={(e) => e.stopPropagation()}
          style={{
            background: 'linear-gradient(160deg, #20140A 0%, #34210F 45%, #1C1208 100%)',
            border: '1px solid rgba(201,165,88,0.45)', borderRadius: 18,
            padding: 'clamp(24px, 5vw, 40px) clamp(20px, 5vw, 36px) 28px',
            boxShadow: '0 24px 80px rgba(0,0,0,0.7)', animation: 'slideUpCard 0.45s cubic-bezier(0.22,1,0.36,1)',
            textAlign: 'center',
          }}
        >
          <div style={{ fontSize: 38, marginBottom: 10 }}>♔</div>
          <p style={{
            fontFamily: "'Montserrat', sans-serif", fontSize: 12, fontWeight: 600,
            letterSpacing: '0.24em', color: '#C9A558', textTransform: 'uppercase', marginBottom: 14,
          }}>
            {copy.eyebrow}
          </p>
          <h2 style={{
            fontFamily: "'Playfair Display', serif", fontSize: 'clamp(22px, 5vw, 32px)',
            color: '#FAF0E0', fontWeight: 700, lineHeight: 1.22, marginBottom: 16,
          }}>
            {copy.title[0]}<br />
            <span style={{ color: '#C9A558' }}>{copy.title[1]}</span>
          </h2>
          <p style={{
            fontFamily: "'Times New Roman', Times, serif", fontSize: 17, color: '#D4B896',
            fontStyle: 'italic', lineHeight: 1.8, marginBottom: 26, maxWidth: 440, marginLeft: 'auto', marginRight: 'auto',
          }}>
            {copy.body}
          </p>
          <button
            onClick={goStore}
            className="btn-gold"
            style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 13, letterSpacing: '0.14em' }}
          >
            {copy.cta}
          </button>
          <p
            onClick={close}
            style={{
              textAlign: 'center', marginTop: 14, fontFamily: "'Montserrat', sans-serif",
              fontSize: 12, color: '#7C5F48', letterSpacing: '0.06em', cursor: 'pointer',
            }}
          >
            Maybe later
          </p>
        </div>
      </div>
    </div>
  );
}
