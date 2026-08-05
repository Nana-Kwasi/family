import React, { useState, useEffect, useMemo } from 'react';
import { useCatalog } from '../contexts/CatalogContext';

// Shown when no promotion is scheduled, so the strip never renders empty.
const DEFAULT_MESSAGES = [
  'Gift-ready heritage collection now available',
  'Heritage names, culture & keepsakes for the whole family',
  'Order early for smooth delivery and tracking',
];

export default function AnnouncementStrip() {
  const [idx, setIdx] = useState(0);
  const [visible, setVisible] = useState(true);
  const { promotionsFor } = useCatalog();

  // Promotions are managed in the admin console; whatever is live wins over the defaults.
  const messages = useMemo(() => {
    const live = promotionsFor('ANNOUNCEMENT_STRIP').map((p) => p.headline).filter(Boolean);
    return live.length ? live : DEFAULT_MESSAGES;
  }, [promotionsFor]);

  // A shorter promotion list can leave the index past the end after a reload.
  useEffect(() => {
    setIdx((current) => (current < messages.length ? current : 0));
  }, [messages]);

  useEffect(() => {
    if (messages.length < 2) return undefined;
    const t = setInterval(() => {
      setVisible(false);
      setTimeout(() => { setIdx(i => (i + 1) % messages.length); setVisible(true); }, 400);
    }, 4500);
    return () => clearInterval(t);
  }, [messages]);

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
        🌸 &nbsp; {messages[idx] ?? messages[0]}
      </span>
    </div>
  );
}
