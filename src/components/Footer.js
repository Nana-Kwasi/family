import React from 'react';
import { Link } from 'react-router-dom';

const PersonIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12z"/>
    <path d="M4 21.6c0-4.4 3.6-8 8-8s8 3.6 8 8"/>
  </svg>
);

export default function Footer() {
  return (
    <footer style={styles.footer}>
      <div style={styles.inner}>
        <div style={styles.icon}><PersonIcon /></div>
        <div style={styles.name}>AFIA</div>
        <div style={styles.tagline}>Heritage names, culture & meaningful keepsakes for every generation</div>
        <div style={{ ...styles.tagline, fontSize: 13, opacity: 0.6, marginTop: -2 }}>Gye Nyame — Except God, I fear none</div>
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', justifyContent: 'center', marginTop: 4 }}>
          <Link to="/shipping-returns" style={styles.link}>Shipping & Returns</Link>
          <Link to="/privacy-policy" style={styles.link}>Privacy Policy</Link>
          <Link to="/terms" style={styles.link}>Terms</Link>
          <Link to="/cookie-policy" style={styles.link}>Cookie Policy</Link>
        </div>
        <div style={styles.copy}>© 2026 Mama Africa Official. All rights reserved.</div>
      </div>
    </footer>
  );
}

const styles = {
  footer: {
    background: 'rgba(10, 8, 4, 0.98)',
    borderTop: '1px solid rgba(201,165,88,0.15)',
    padding: '48px 20px',
    textAlign: 'center',
  },
  inner: {
    maxWidth: 480,
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 8,
  },
  icon: { color: '#C9A558', marginBottom: 4 },
  name: {
    fontFamily: "'Cinzel', serif",
    fontSize: 20,
    letterSpacing: '0.2em',
    color: '#C9A558',
    fontWeight: 600,
  },
  tagline: {
    fontFamily: "'Times New Roman', Times, serif",
    fontStyle: 'italic',
    color: '#BA9D7C',
    fontSize: 15,
    marginTop: 4,
  },
  copy: {
    color: '#7C5F48',
    fontSize: 13,
    fontFamily: "'Times New Roman', Times, serif",
    marginTop: 8,
    letterSpacing: '0.05em',
  },
  link: {
    color: '#C9A558',
    fontSize: 12,
    letterSpacing: '0.07em',
    textDecoration: 'underline',
  },
};
