import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { askMamaAfrica, AiUnavailableError, SignInRequiredError } from '../utils/mamaAfricaAi';
import { useAuth } from '../contexts/AuthContext';

// Afia inside the support modal. Most people opening support have a question the site already
// answers — delivery times, sizes, why an account is needed — and the knowledge base now
// contains a guide to the website, so she can answer those without anyone waiting on an email.

const GOLD = '#c4963e';

const OPENERS = [
  'How long is delivery?',
  'How do I get my certificate?',
  'What sizes do you offer?',
  'Why do I need an account?',
];

export default function SupportChat({ onSwitchToEmail }) {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [messages, setMessages] = useState(() => [
    {
      role: 'afia',
      // Said up front rather than after they have typed a question and been turned away.
      text: user
        ? 'Akwaaba. Ask me anything about the store, your Akan name, or how the site works.'
        : 'Akwaaba. I can answer questions about the store, your Akan name, and how the site '
          + 'works — sign in and I will know who I am speaking with. For anything about an '
          + 'order, message the team above; that needs no account.',
      needsSignIn: !user,
    },
  ]);
  const [input, setInput] = useState('');
  const [sending, setSending] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    // Keep the newest message in view as the thread grows.
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, sending]);

  async function ask(question) {
    const trimmed = question.trim();
    if (!trimmed || sending) return;

    setMessages((current) => [...current, { role: 'you', text: trimmed }]);
    setInput('');
    setSending(true);

    try {
      const { text } = await askMamaAfrica(trimmed);
      setMessages((current) => [...current, { role: 'afia', text }]);
    } catch (err) {
      // Never leave the question hanging: say what happened and offer the human route.
      // Sign-in is a different failure from a broken one: it has a way forward.
      if (err instanceof SignInRequiredError) {
        setMessages((current) => [...current, {
          role: 'afia',
          text: 'Sign in and I can talk with you properly — I will know your name and remember our conversation. You can also message the team above, which needs no account.',
          needsSignIn: true,
        }]);
        return;
      }
      const text = err instanceof AiUnavailableError
        ? 'I cannot reach my thoughts just now. You can send the team a message instead — the tab above.'
        : 'Something went wrong answering that. Try again, or send the team a message.';
      setMessages((current) => [...current, { role: 'afia', text, failed: true }]);
    } finally {
      setSending(false);
    }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: 380 }}>
      <div
        ref={scrollRef}
        style={{ flex: 1, overflowY: 'auto', padding: '4px 2px', display: 'flex', flexDirection: 'column', gap: 10 }}
      >
        {messages.map((message, index) => (
          <div
            key={index}
            style={{
              alignSelf: message.role === 'you' ? 'flex-end' : 'flex-start',
              maxWidth: '85%',
              padding: '10px 13px',
              borderRadius: 14,
              background: message.role === 'you' ? `linear-gradient(135deg, ${GOLD}, #9a7224)` : '#F0EDE7',
              color: message.role === 'you' ? '#fff' : '#2a2a2a',
              fontFamily: "'EB Garamond', serif",
              fontSize: 15.5,
              lineHeight: 1.55,
              whiteSpace: 'pre-wrap',
            }}
          >
            {message.text}
            {message.needsSignIn && (
              <button
                type="button"
                onClick={() => navigate('/auth', { state: { from: window.location.pathname } })}
                style={{
                  display: 'block', marginTop: 10, padding: '8px 16px', borderRadius: 999,
                  border: 'none', cursor: 'pointer', color: '#fff',
                  background: `linear-gradient(135deg, ${GOLD}, #9a7224)`,
                  fontFamily: "'Montserrat', sans-serif", fontSize: 12, fontWeight: 700,
                  letterSpacing: '0.08em',
                }}
              >
                Sign in
              </button>
            )}
          </div>
        ))}

        {sending && (
          <div style={{ alignSelf: 'flex-start', color: '#8a8a8a', fontSize: 13, fontFamily: "'Montserrat', sans-serif" }}>
            Afia is thinking…
          </div>
        )}

        {messages.length === 1 && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 4 }}>
            {OPENERS.map((opener) => (
              <button
                key={opener}
                type="button"
                onClick={() => ask(opener)}
                style={{
                  padding: '6px 12px', borderRadius: 999, cursor: 'pointer',
                  border: '1px solid rgba(196,150,62,0.4)', background: '#fff',
                  fontFamily: "'Montserrat', sans-serif", fontSize: 12, color: '#8B6914',
                }}
              >
                {opener}
              </button>
            ))}
          </div>
        )}
      </div>

      <form
        onSubmit={(e) => { e.preventDefault(); ask(input); }}
        style={{ display: 'flex', gap: 8, marginTop: 12 }}
      >
        <input
          className="sup-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask Afia…"
          maxLength={500}
          style={{
            flex: 1, padding: '11px 13px', borderRadius: 10, fontSize: 14,
            border: '1px solid rgba(0,0,0,0.15)', background: '#fff',
            fontFamily: "'Montserrat', sans-serif", outline: 'none',
          }}
        />
        <button
          type="submit"
          disabled={sending || !input.trim()}
          style={{
            padding: '11px 18px', borderRadius: 999, border: 'none', color: '#fff',
            background: `linear-gradient(135deg, ${GOLD}, #9a7224)`,
            fontFamily: "'Montserrat', sans-serif", fontSize: 13, fontWeight: 700,
            cursor: sending || !input.trim() ? 'default' : 'pointer',
            opacity: sending || !input.trim() ? 0.6 : 1,
          }}
        >
          Ask
        </button>
      </form>

      <p style={{ textAlign: 'center', marginTop: 10, fontFamily: "'Montserrat', sans-serif", fontSize: 11.5, color: '#8a8a8a' }}>
        Afia cannot see your order.{' '}
        <button
          type="button"
          onClick={onSwitchToEmail}
          style={{ background: 'none', border: 'none', padding: 0, color: '#8B6914', fontSize: 11.5, cursor: 'pointer', textDecoration: 'underline' }}
        >
          Message the team
        </button>{' '}
        for anything about a specific purchase.
      </p>
    </div>
  );
}
