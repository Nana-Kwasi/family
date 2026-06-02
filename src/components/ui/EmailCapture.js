import React, { useState } from 'react';
import { db } from '../../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

/**
 * EmailCapture
 * Saves subscriber emails to Firestore `subscribers` collection.
 *
 * Props:
 *   akanName   string   — user's Akan name (for personalisation)
 *   day        string   — day of birth (Monday, Friday…)
 *   dob        string   — date string YYYY-MM-DD
 *   source     string   — where on the site this capture happened
 *   onSuccess  fn       — called with email when saved
 *   compact    bool     — smaller inline layout (for premium gate)
 */
export default function EmailCapture({
  akanName,
  day,
  dob,
  source = 'result_page',
  onSuccess,
  compact = false,
}) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle');
  const [errorMsg, setErrorMsg] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    const trimmed = email.trim().toLowerCase();
    if (!trimmed || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      setErrorMsg('Please enter a valid email address.');
      return;
    }
    setStatus('loading');
    setErrorMsg('');
    try {
      await addDoc(collection(db, 'subscribers'), {
        email: trimmed,
        akanName: akanName || '',
        day: day || '',
        dob: dob || '',
        source,
        createdAt: serverTimestamp(),
      });
      setStatus('done');
      if (onSuccess) onSuccess(trimmed);
    } catch {
      setStatus('error');
      setErrorMsg('Something went wrong. Please try again.');
    }
  }

  if (status === 'done') {
    return (
      <div style={{ textAlign: 'center', padding: compact ? '12px 0' : '20px 0' }}>
        <div style={{ fontSize: compact ? 22 : 30, marginBottom: 6, color: '#C9A558' }}>✓</div>
        <p style={{
          color: '#C9A558',
          fontFamily: "'Cinzel', serif",
          fontSize: compact ? 12 : 14,
          letterSpacing: '0.1em',
          marginBottom: 4,
        }}>
          You're on the list!
        </p>
        {!compact && (
          <p style={{ color: '#BA9D7C', fontSize: 13 }}>
            We'll send you cultural updates and exclusive drops for {akanName || 'you'}.
          </p>
        )}
      </div>
    );
  }

  return (
    <div style={{ textAlign: 'center' }}>
      {!compact && (
        <>
          <p style={{
            fontFamily: "'Cinzel', serif",
            fontSize: 11,
            letterSpacing: '0.18em',
            color: '#C9A558',
            textTransform: 'uppercase',
            marginBottom: 6,
          }}>
            Stay Connected to Your Heritage
          </p>
          <p style={{ color: '#BA9D7C', fontSize: 14, lineHeight: 1.7, marginBottom: 16 }}>
            New drops, cultural stories, and exclusive offers for {akanName || 'you'}.
          </p>
        </>
      )}

      <form
        onSubmit={handleSubmit}
        style={{
          display: 'flex',
          gap: 8,
          flexWrap: 'wrap',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <input
          type="email"
          value={email}
          onChange={(e) => { setEmail(e.target.value); setErrorMsg(''); }}
          placeholder="your@email.com"
          required
          style={{
            background: 'rgba(201,165,88,0.06)',
            border: '1px solid rgba(201,165,88,0.35)',
            borderRadius: 8,
            padding: compact ? '9px 14px' : '11px 16px',
            color: '#EDD9BC',
            fontFamily: "'Montserrat', sans-serif",
            fontSize: 13,
            outline: 'none',
            minWidth: compact ? 200 : 240,
            flex: 1,
            maxWidth: 300,
          }}
        />
        <button
          type="submit"
          disabled={status === 'loading'}
          style={{
            background: 'linear-gradient(135deg, #C9A558, #E8CB82)',
            color: '#1C0E04',
            border: 'none',
            borderRadius: 8,
            padding: compact ? '9px 18px' : '11px 22px',
            fontFamily: "'Cinzel', serif",
            fontSize: 11,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            cursor: status === 'loading' ? 'not-allowed' : 'pointer',
            fontWeight: 700,
            opacity: status === 'loading' ? 0.7 : 1,
            whiteSpace: 'nowrap',
          }}
        >
          {status === 'loading' ? 'Saving…' : compact ? 'Unlock' : 'Get Updates'}
        </button>
      </form>

      {errorMsg && (
        <p style={{ color: '#fca5a5', fontSize: 12, marginTop: 8 }}>{errorMsg}</p>
      )}
      {status === 'error' && !errorMsg && (
        <p style={{ color: '#fca5a5', fontSize: 12, marginTop: 8 }}>Something went wrong. Please try again.</p>
      )}
      <p style={{ color: '#4A3325', fontSize: 11, marginTop: compact ? 6 : 10 }}>
        No spam. Unsubscribe anytime.
      </p>
    </div>
  );
}
