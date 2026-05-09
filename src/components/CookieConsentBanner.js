import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getConsentKey, setAnalyticsConsent } from '../utils/analytics';

export default function CookieConsentBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const v = window.localStorage.getItem(getConsentKey());
    if (!v) setVisible(true);
  }, []);

  function handleConsent(granted) {
    setAnalyticsConsent(granted);
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div style={{
      position: 'fixed',
      left: 12,
      right: 12,
      bottom: 12,
      zIndex: 2200,
      border: '1px solid var(--gold-border)',
      borderRadius: 12,
      background: 'rgba(18,11,6,0.96)',
      boxShadow: '0 12px 40px rgba(0,0,0,0.45)',
      padding: '14px 14px 12px',
    }}
    >
      <p style={{ margin: '0 0 10px', color: 'var(--cream)', fontSize: 'var(--type-ui)', lineHeight: 1.6 }}>
        We use cookies for essential operation; analytics run only if you accept (Google Analytics with Consent Mode).
        {' '}
        <Link to="/cookie-policy" style={{ color: 'var(--store-gold-cta)', textDecoration: 'underline' }}>Cookie Policy</Link>.
      </p>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        <button className="btn-gold" style={{ width: 'auto', padding: '10px 14px', fontSize: 11 }} onClick={() => handleConsent(true)}>
          Accept Analytics Cookies
        </button>
        <button className="btn-ghost" style={{ width: 'auto', padding: '10px 14px', fontSize: 11 }} onClick={() => handleConsent(false)}>
          Necessary Only
        </button>
      </div>
    </div>
  );
}

