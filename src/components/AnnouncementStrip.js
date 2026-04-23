import React, { useState, useEffect } from 'react';

const messages = [
  'Gift-ready Mother\'s Day Collection — now available',
  'Meaningful gifts for remarkable mothers',
  'Order early · Limited collection · Gift-ready designs',
  'Celebrating heritage, strength & love',
];

export default function AnnouncementStrip() {
  const [idx, setIdx] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const t = setInterval(() => {
      setVisible(false);
      setTimeout(() => { setIdx(i => (i + 1) % messages.length); setVisible(true); }, 400);
    }, 4500);
    return () => clearInterval(t);
  }, []);

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 600,
      height: 38,
      background: 'linear-gradient(90deg, #2A1710, #3D2214, #2A1710)',
      borderBottom: '1px solid rgba(201,165,88,0.35)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '0 16px',
    }}>
      <span style={{
        fontFamily: "'Montserrat', sans-serif",
        fontSize: 13,
        letterSpacing: '0.16em',
        color: '#E8CB82',
        textTransform: 'uppercase',
        opacity: visible ? 1 : 0,
        transition: 'opacity 0.4s ease',
        textAlign: 'center',
      }}>
        🌸 &nbsp; {messages[idx]}
      </span>
    </div>
  );
}
