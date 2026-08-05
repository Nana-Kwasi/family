import React, { useState } from 'react';
import { sendSupportMessage, SupportRateLimitError } from '../utils/supportApi';
import SupportChat from './SupportChat';
import { trackEvent } from '../utils/analytics';

const GOLD = '#c4963e';

export default function SupportButton() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('idle'); // idle | sending | sent | error
  // Asking Afia first is the point: most support questions are already answered on the site.
  const [tab, setTab] = useState('chat'); // chat | email
  const [error, setError] = useState('');

  function close() {
    setOpen(false);
    // reset after the closing animation
    setTimeout(() => { if (status === 'sent') { setName(''); setEmail(''); setMessage(''); setStatus('idle'); } }, 250);
  }

  const emailValid = !email || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  async function submit(e) {
    e.preventDefault();
    setError('');
    if (message.trim().length < 5) { setError('Please type your question (at least a few words).'); return; }
    if (!emailValid) { setError('Please enter a valid email so we can reply.'); return; }
    if (!email.trim()) { setError('Please enter your email so we can reply.'); return; }

    setStatus('sending');
    try {
      await sendSupportMessage({ name: name.trim(), email: email.trim(), message: message.trim() });
      setStatus('sent');
      trackEvent('support_question_sent');
    } catch (err) {
      if (err instanceof SupportRateLimitError) {
        // Not an error on the visitor's part — say what the server said and let them retry.
        setStatus('idle');
        setError(err.message);
        trackEvent('support_send_blocked');
        return;
      }
      setStatus('error');
      setError(`${err.message} Or email Mamaafricaafia@gmail.com directly.`);
    }
  }

  const inputStyle = {
    width: '100%', boxSizing: 'border-box', padding: '11px 13px', borderRadius: 10,
    border: '1px solid rgba(0,0,0,0.15)', background: '#fff', fontSize: 14,
    fontFamily: "'Montserrat', sans-serif", color: '#1a1a1a', outline: 'none',
  };

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => { setOpen(true); trackEvent('support_open', {}); }}
        aria-label="Contact support"
        style={{
          position: 'fixed', right: 'clamp(16px,3vw,28px)', bottom: 'clamp(16px,3vw,28px)', zIndex: 950,
          display: 'inline-flex', alignItems: 'center', gap: 9,
          background: `linear-gradient(135deg, ${GOLD}, #9a7224)`, color: '#fff',
          border: '1px solid rgba(255,255,255,0.25)', borderRadius: 999,
          padding: '12px 20px', cursor: 'pointer',
          fontFamily: "'Montserrat', sans-serif", fontSize: 13, fontWeight: 700, letterSpacing: '0.06em',
          boxShadow: '0 10px 28px rgba(154,114,36,0.42)',
        }}
      >
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
        </svg>
        Support
      </button>

      {/* Modal */}
      {open && (
        <div
          onClick={close}
          style={{
            position: 'fixed', inset: 0, zIndex: 2100,
            background: 'rgba(20,12,4,0.6)', backdropFilter: 'blur(5px)',
            display: 'flex', alignItems: 'flex-start', justifyContent: 'center',
            overflowY: 'auto', padding: '20px 16px 32px', animation: 'fadeInOverlay 0.35s ease',
          }}
        >
          <style>{`
            @keyframes fadeInOverlay { from {opacity:0} to {opacity:1} }
            @keyframes supCardIn { from {opacity:0; transform:translateY(22px)} to {opacity:1; transform:translateY(0)} }
            .sup-input:focus { border-color: ${GOLD} !important; box-shadow: 0 0 0 3px rgba(196,150,62,0.15); }
          `}</style>

          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              width: '100%', maxWidth: 460, marginTop: '6vh', background: '#FAF9F7',
              borderRadius: 18, border: '1px solid rgba(0,0,0,0.08)', overflow: 'hidden',
              boxShadow: '0 28px 80px rgba(0,0,0,0.4)', animation: 'supCardIn 0.4s cubic-bezier(0.22,1,0.36,1)',
            }}
          >
            {/* header */}
            <div style={{ background: `linear-gradient(135deg, ${GOLD} 0%, #9a7224 100%)`, padding: '20px 22px', position: 'relative' }}>
              <button
                onClick={close}
                aria-label="Close"
                style={{ position: 'absolute', top: 12, right: 12, width: 30, height: 30, borderRadius: 50, border: 'none', background: 'rgba(0,0,0,0.18)', color: '#fff', fontSize: 17, cursor: 'pointer', lineHeight: 1 }}
              >×</button>
              <div style={{ fontFamily: "'Cinzel', serif", fontSize: 17, fontWeight: 700, color: '#fff', letterSpacing: '0.04em' }}>How can we help?</div>
              <div style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 12, color: 'rgba(255,255,255,0.9)', marginTop: 4 }}>
                Ask Afia, or send the team a message.
              </div>
            </div>

            {/* Tabs */}
            <div style={{ display: 'flex', borderBottom: '1px solid rgba(0,0,0,0.08)', background: '#fff' }}>
              {[['chat', 'Ask Afia'], ['email', 'Message the team']].map(([value, label]) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setTab(value)}
                  style={{
                    flex: 1, padding: '13px 8px', border: 'none', cursor: 'pointer', background: 'none',
                    fontFamily: "'Montserrat', sans-serif", fontSize: 13, fontWeight: 700,
                    letterSpacing: '0.04em',
                    color: tab === value ? '#8B6914' : '#9a9a9a',
                    borderBottom: tab === value ? `2px solid ${GOLD}` : '2px solid transparent',
                  }}
                >
                  {label}
                </button>
              ))}
            </div>

            <div style={{ padding: '22px' }}>
              {tab === 'chat' ? (
                <SupportChat onSwitchToEmail={() => setTab('email')} />
              ) : status === 'sent' ? (
                <div style={{ textAlign: 'center', padding: '14px 4px 6px' }}>
                  <div style={{ fontSize: 40, marginBottom: 10 }}>✅</div>
                  <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, color: '#1a1a1a', margin: '0 0 8px' }}>Message sent!</h3>
                  <p style={{ fontFamily: "'EB Garamond', serif", fontSize: 16, color: '#5a5a5a', lineHeight: 1.6, margin: '0 0 18px' }}>
                    Thank you{name ? `, ${name}` : ''}. Mama Africa will get back to you{email ? ` at ${email}` : ''} soon.
                  </p>
                  <button onClick={close} className="store-btn-primary" style={{ padding: '11px 26px', borderRadius: 999, border: 'none', background: `linear-gradient(135deg, ${GOLD}, #9a7224)`, color: '#fff', fontFamily: "'Montserrat', sans-serif", fontWeight: 700, fontSize: 13, letterSpacing: '0.08em', cursor: 'pointer' }}>
                    Done
                  </button>
                </div>
              ) : (
                <form onSubmit={submit}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                    <input className="sup-input" style={inputStyle} type="text" placeholder="Your name (optional)" value={name} onChange={(e) => setName(e.target.value)} maxLength={80} />
                    <input className="sup-input" style={inputStyle} type="email" placeholder="Your email (so we can reply)" value={email} onChange={(e) => setEmail(e.target.value)} maxLength={120} />
                    <textarea className="sup-input" style={{ ...inputStyle, minHeight: 120, resize: 'vertical', lineHeight: 1.5 }} placeholder="Your question…" value={message} onChange={(e) => setMessage(e.target.value)} maxLength={1500} />
                  </div>

                  {error && <p style={{ color: '#b3261e', fontSize: 13, margin: '12px 0 0', fontFamily: "'Montserrat', sans-serif" }}>{error}</p>}

                  <button
                    type="submit"
                    disabled={status === 'sending'}
                    style={{
                      width: '100%', marginTop: 16, padding: '13px', borderRadius: 999, border: 'none',
                      background: `linear-gradient(135deg, ${GOLD}, #9a7224)`, color: '#fff',
                      fontFamily: "'Montserrat', sans-serif", fontSize: 14, fontWeight: 700, letterSpacing: '0.1em',
                      cursor: status === 'sending' ? 'default' : 'pointer', opacity: status === 'sending' ? 0.7 : 1,
                    }}
                  >
                    {status === 'sending' ? 'Sending…' : 'Send message'}
                  </button>
                  <p style={{ textAlign: 'center', marginTop: 12, fontFamily: "'Montserrat', sans-serif", fontSize: 11.5, color: '#8a8a8a' }}>
                    One message a minute, five an hour.
                    <br />
                    Or email <a href="mailto:Mamaafricaafia@gmail.com" style={{ color: '#8B6914' }}>Mamaafricaafia@gmail.com</a>
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
