import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  getAfiaWelcome,
  extractNameFromMessage,
} from '../utils/afiaChat';
import { streamMamaAfrica, AiUnavailableError, SignInRequiredError } from '../utils/mamaAfricaAi';
import { trackEvent } from '../utils/analytics';

const GOLD = '#C9A558';
const GOLD_LIGHT = '#E8CB82';
const CREAM = '#FAF0E0';
const INK = '#18100A';

function nowLabel() {
  return new Date().toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
}

function AfiaMessageBody({ message, onNavigate }) {
  if (message.streaming && message.text !== undefined) {
    return (
      <>
        {message.text}
        <span
          style={{
            display: 'inline-block',
            width: 2,
            height: '1em',
            marginLeft: 2,
            background: GOLD,
            verticalAlign: 'text-bottom',
            animation: 'afiaPulse 0.9s ease-in-out infinite',
          }}
        />
      </>
    );
  }

  const segments = message.segments || [{ text: message.text || '' }];
  return segments.map((seg, i) => {
    if (seg.link) {
      return (
        <button
          key={`${seg.link}-${i}`}
          type="button"
          onClick={() => onNavigate(seg.link)}
          style={{
            background: 'none',
            border: 'none',
            padding: 0,
            margin: 0,
            color: GOLD_LIGHT,
            fontFamily: "'Cinzel', serif",
            fontSize: 'inherit',
            fontWeight: 600,
            letterSpacing: '0.04em',
            textDecoration: 'underline',
            textUnderlineOffset: 3,
            cursor: 'pointer',
          }}
        >
          {seg.text}
        </button>
      );
    }
    return <span key={i}>{seg.text}</span>;
  });
}

function SuggestionChips({ suggestions, disabled, onPick }) {
  if (!suggestions?.length) return null;
  return (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: 8,
        marginTop: 10,
        maxWidth: 'min(92%, 520px)',
      }}
    >
      {suggestions.map((s) => (
        <button
          key={s.id}
          type="button"
          disabled={disabled}
          onClick={() => onPick(s.prompt)}
          style={{
            padding: '8px 14px',
            borderRadius: 999,
            border: `1px solid rgba(201,165,88,0.45)`,
            background: 'rgba(201,165,88,0.12)',
            color: CREAM,
            fontFamily: "'Montserrat', sans-serif",
            fontSize: 11,
            fontWeight: 600,
            letterSpacing: '0.04em',
            cursor: disabled ? 'default' : 'pointer',
            opacity: disabled ? 0.45 : 1,
            transition: 'background 0.2s ease, border-color 0.2s ease',
          }}
        >
          {s.label}
        </button>
      ))}
    </div>
  );
}

export default function AfiaChatAgent() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [userName, setUserName] = useState('');
  const [messages, setMessages] = useState([]);
  const [thinking, setThinking] = useState(false);
  const [streamingId, setStreamingId] = useState(null);
  const abortRef = useRef(null);
  const scrollRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = useCallback(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, []);

  // Cancel any in-flight stream if the component unmounts mid-answer.
  useEffect(() => () => {
    if (abortRef.current) abortRef.current.abort();
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  useEffect(() => {
    scrollToBottom();
  }, [messages, thinking, streamingId, open, scrollToBottom]);

  const isBusy = thinking || Boolean(streamingId);

  function handleNavigate(path) {
    trackEvent('afia_chat_navigate', { path });
    navigate(path);
    closeChat();
  }

  function openChat() {
    setOpen(true);
    trackEvent('afia_chat_open', {});
    if (messages.length === 0) {
      const welcome = getAfiaWelcome();
      setMessages([{
        id: 'welcome',
        role: 'afia',
        segments: welcome.segments,
        suggestions: welcome.suggestions,
        time: nowLabel(),
      }]);
    }
    setTimeout(() => inputRef.current?.focus(), 350);
  }

  function closeChat() {
    if (abortRef.current) abortRef.current.abort();
    setThinking(false);
    setStreamingId(null);
    setOpen(false);
    trackEvent('afia_chat_close', {});
  }

  async function dispatchUserMessage(text) {
    if (!text.trim() || isBusy) return;

    const parsedName = extractNameFromMessage(text);
    if (!userName.trim() && parsedName) setUserName(parsedName);

    const userMsg = { id: `u-${Date.now()}`, role: 'user', text, time: nowLabel() };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setThinking(true);
    trackEvent('afia_chat_message', { length: text.length });

    const replyId = `a-${Date.now()}`;
    abortRef.current = new AbortController();
    let streamed = '';

    try {
      await streamMamaAfrica(text, {
        signal: abortRef.current.signal,
        onToken: (chunk) => {
          streamed += chunk;
          // The first token is the cue to swap the thinking dots for the answer bubble.
          if (streamed === chunk) {
            setThinking(false);
            setStreamingId(replyId);
            setMessages((prev) => [
              ...prev,
              { id: replyId, role: 'afia', text: chunk, streaming: true, time: '', followUp: null },
            ]);
          } else {
            setMessages((prev) => prev.map((m) => (
              m.id === replyId ? { ...m, text: streamed } : m
            )));
          }
          scrollToBottom();
        },
      });
    } catch (error) {
      if (error.name === 'AbortError') return;
      setThinking(false);
      setStreamingId(null);
      setMessages((prev) => [
        ...prev.filter((m) => m.id !== replyId),
        {
          id: replyId,
          role: 'afia',
          // Needing an account is not a failure — it has a way forward, and the link makes
          // that the obvious next step instead of a dead end.
          segments: error instanceof SignInRequiredError
            ? [
              { text: 'Akwaaba. Before we talk properly, I need to know who you are — ' },
              { text: 'sign in or create an account', link: '/auth' },
              { text: '. It takes a moment, and then I will greet you by name and remember our conversation.' },
            ]
            : [{
              text: error instanceof AiUnavailableError
                ? 'Forgive me — I cannot reach my thoughts just now. Please try again in a moment.'
                : 'Something went wrong on my side. Please try again.',
            }],
          time: nowLabel(),
        },
      ]);
      trackEvent('afia_chat_error', { message: error.message });
      return;
    }

    // Settle the bubble: stop the cursor and stamp the time.
    setStreamingId(null);
    setThinking(false);
    setMessages((prev) => prev.map((m) => (
      m.id === replyId
        ? { ...m, text: undefined, segments: [{ text: streamed }], streaming: false, time: nowLabel() }
        : m
    )));
  }

  function sendMessage(e) {
    e?.preventDefault();
    void dispatchUserMessage(input.trim());
  }

  function handleSuggestion(prompt) {
    void dispatchUserMessage(prompt);
  }

  return (
    <>
      <style>{`
        @keyframes afiaFabPulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(201,165,88,0.55), 0 16px 40px rgba(0,0,0,0.45); }
          50% { box-shadow: 0 0 0 14px rgba(201,165,88,0), 0 20px 48px rgba(154,114,36,0.5); }
        }
        @keyframes afiaFabShine {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .afia-fab:hover { transform: translateY(-3px) scale(1.02); }
        .afia-fab:active { transform: translateY(0) scale(0.98); }
      `}</style>

      <button
        type="button"
        className="afia-fab"
        onClick={openChat}
        aria-label="Chat with Afia"
        style={{
          position: 'fixed',
          right: 'clamp(16px, 3vw, 28px)',
          bottom: 'clamp(16px, 3vw, 28px)',
          zIndex: 960,
          display: 'inline-flex',
          alignItems: 'center',
          gap: 12,
          padding: '8px 20px 8px 8px',
          borderRadius: 999,
          border: '2px solid #fff',
          background: `linear-gradient(120deg, ${GOLD} 0%, #f0d78a 35%, ${GOLD} 70%, #9a7224 100%)`,
          backgroundSize: '200% 200%',
          animation: 'afiaFabPulse 2.4s ease-in-out infinite, afiaFabShine 4s ease infinite',
          color: INK,
          cursor: 'pointer',
          fontFamily: "'Cinzel', serif",
          fontSize: 13,
          fontWeight: 700,
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
          transition: 'transform 0.2s ease',
        }}
      >
        <span
          style={{
            width: 46,
            height: 46,
            borderRadius: '50%',
            overflow: 'hidden',
            border: `3px solid ${INK}`,
            flexShrink: 0,
            boxShadow: 'inset 0 0 0 2px rgba(255,255,255,0.5)',
          }}
        >
          <img
            src={`${process.env.PUBLIC_URL || ''}/images/afia-hero.jpg`}
            alt=""
            style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }}
          />
        </span>
        <span style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', lineHeight: 1.2 }}>
          <span>Chat with Afia</span>
          <span style={{ fontSize: 9, letterSpacing: '0.2em', opacity: 0.75, fontFamily: "'Montserrat', sans-serif" }}>Ask me anything</span>
        </span>
      </button>

      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="afia-chat-title"
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 2200,
            display: 'flex',
            flexDirection: 'column',
            background: `radial-gradient(ellipse 120% 80% at 50% -10%, rgba(201,165,88,0.18) 0%, transparent 55%), linear-gradient(180deg, #120a04 0%, ${INK} 42%, #0d0704 100%)`,
            animation: 'afiaFadeIn 0.35s ease',
          }}
        >
          <style>{`
            @keyframes afiaFadeIn { from { opacity: 0 } to { opacity: 1 } }
            @keyframes afiaPulse { 0%,100%{opacity:0.35} 50%{opacity:1} }
            .afia-chat-input:focus {
              border-color: rgba(201,165,88,0.65) !important;
              box-shadow: 0 0 0 3px rgba(201,165,88,0.14);
            }
          `}</style>

          <header
            style={{
              flexShrink: 0,
              display: 'flex',
              alignItems: 'center',
              gap: 14,
              padding: 'clamp(14px, 3vw, 22px) clamp(16px, 4vw, 28px)',
              borderBottom: '1px solid rgba(201,165,88,0.18)',
              background: 'rgba(0,0,0,0.28)',
            }}
          >
            <div
              style={{
                width: 'clamp(48px, 10vw, 64px)',
                height: 'clamp(48px, 10vw, 64px)',
                borderRadius: '50%',
                overflow: 'hidden',
                border: `2px solid ${GOLD}`,
                boxShadow: '0 0 24px rgba(201,165,88,0.25)',
                flexShrink: 0,
              }}
            >
              <img
                src={`${process.env.PUBLIC_URL || ''}/images/afia-hero.jpg`}
                alt="Afia"
                style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }}
              />
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div id="afia-chat-title" style={{ fontFamily: "'Cinzel', serif", fontSize: 'clamp(16px, 3vw, 22px)', color: GOLD, letterSpacing: '0.08em' }}>
                Afia
              </div>
              <div style={{ fontFamily: "'EB Garamond', serif", fontSize: 'clamp(13px, 2vw, 16px)', color: '#BA9D7C', fontStyle: 'italic' }}>
                Cultural guide · Tap links to explore
              </div>
            </div>
            <button
              type="button"
              onClick={closeChat}
              aria-label="Close chat"
              style={{
                width: 40,
                height: 40,
                borderRadius: 10,
                border: '1px solid rgba(201,165,88,0.3)',
                background: 'rgba(201,165,88,0.08)',
                color: GOLD,
                fontSize: 22,
                cursor: 'pointer',
                lineHeight: 1,
                flexShrink: 0,
              }}
            >
              ×
            </button>
          </header>

          <div
            ref={scrollRef}
            style={{
              flex: 1,
              overflowY: 'auto',
              padding: 'clamp(16px, 4vw, 32px) clamp(16px, 4vw, 28px)',
              display: 'flex',
              flexDirection: 'column',
              gap: 6,
              maxWidth: 820,
              width: '100%',
              margin: '0 auto',
              boxSizing: 'border-box',
            }}
          >
            {messages.length <= 1 && (
              <div style={{ textAlign: 'center', marginBottom: 8 }}>
                <p style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(20px, 4vw, 28px)', color: CREAM, margin: '0 0 8px', fontStyle: 'italic' }}>
                  Akwaaba
                </p>
                <p style={{ fontFamily: "'EB Garamond', serif", fontSize: 'clamp(14px, 2vw, 17px)', color: '#7C5F48', margin: 0, lineHeight: 1.6 }}>
                  Try “Hi, I am Nana — here to learn history about Ghana” or tap a topic below.
                </p>
              </div>
            )}

            {messages.map((m) => (
              <div key={m.id}>
                <div
                  style={{
                    alignSelf: m.role === 'user' ? 'flex-end' : 'flex-start',
                    maxWidth: 'min(92%, 520px)',
                    marginLeft: m.role === 'user' ? 'auto' : 0,
                  }}
                >
                  <div
                    style={{
                      padding: '12px 16px',
                      borderRadius: m.role === 'user' ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
                      background: m.role === 'user'
                        ? 'linear-gradient(135deg, rgba(239,219,160,0.95), rgba(214,182,94,0.9))'
                        : 'rgba(232,212,150,0.16)',
                      border: m.role === 'user'
                        ? '1px solid rgba(201,165,88,0.28)'
                        : '1px solid rgba(201,165,88,0.2)',
                      color: m.role === 'user' ? '#2c2417' : CREAM,
                      fontFamily: "'EB Garamond', serif",
                      fontSize: 'clamp(16px, 2.2vw, 19px)',
                      lineHeight: 1.75,
                      whiteSpace: 'pre-wrap',
                    }}
                  >
                    {m.role === 'user' ? m.text : (
                      <AfiaMessageBody message={m} onNavigate={handleNavigate} />
                    )}
                  </div>
                  {m.time && (
                    <div
                      style={{
                        fontSize: 10,
                        color: '#7C5F48',
                        marginTop: 4,
                        textAlign: m.role === 'user' ? 'right' : 'left',
                        fontFamily: "'Montserrat', sans-serif",
                        letterSpacing: '0.06em',
                      }}
                    >
                      {m.time}
                    </div>
                  )}
                </div>
                {m.role === 'afia' && !m.streaming && (
                  <SuggestionChips
                    suggestions={m.suggestions}
                    disabled={isBusy}
                    onPick={handleSuggestion}
                  />
                )}
              </div>
            ))}

            {thinking && (
              <div style={{ alignSelf: 'flex-start', padding: '10px 14px', borderRadius: 14, background: 'rgba(201,165,88,0.06)', border: '1px solid rgba(201,165,88,0.15)' }}>
                <span style={{ fontFamily: "'EB Garamond', serif", fontSize: 13, color: '#9E7D42', fontStyle: 'italic', marginRight: 8 }}>Afia is writing</span>
                <span style={{ display: 'inline-flex', gap: 5, verticalAlign: 'middle' }}>
                  {[0, 1, 2].map((i) => (
                    <span
                      key={i}
                      style={{
                        width: 7,
                        height: 7,
                        borderRadius: '50%',
                        background: GOLD,
                        animation: `afiaPulse 1.1s ease-in-out ${i * 0.15}s infinite`,
                      }}
                    />
                  ))}
                </span>
              </div>
            )}
          </div>

          <footer
            style={{
              flexShrink: 0,
              padding: 'clamp(12px, 3vw, 20px) clamp(16px, 4vw, 28px) clamp(16px, 4vw, 24px)',
              borderTop: '1px solid rgba(201,165,88,0.15)',
              background: 'rgba(0,0,0,0.35)',
            }}
          >
            <form
              onSubmit={sendMessage}
              style={{
                maxWidth: 820,
                margin: '0 auto',
                display: 'flex',
                flexDirection: 'column',
                gap: 10,
              }}
            >
              <input
                type="text"
                placeholder="Your name (optional)"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                maxLength={40}
                className="afia-chat-input"
                style={{
                  width: '100%',
                  boxSizing: 'border-box',
                  padding: '10px 14px',
                  borderRadius: 10,
                  border: '1px solid rgba(201,165,88,0.22)',
                  background: 'rgba(0,0,0,0.35)',
                  color: CREAM,
                  fontFamily: "'Montserrat', sans-serif",
                  fontSize: 13,
                  outline: 'none',
                }}
              />
              <div style={{ display: 'flex', gap: 10, alignItems: 'flex-end' }}>
                <textarea
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      sendMessage(e);
                    }
                  }}
                  placeholder="Say hi to Afia…"
                  rows={2}
                  maxLength={500}
                  className="afia-chat-input"
                  style={{
                    flex: 1,
                    resize: 'none',
                    boxSizing: 'border-box',
                    padding: '12px 14px',
                    borderRadius: 12,
                    border: '1px solid rgba(201,165,88,0.22)',
                    background: 'rgba(0,0,0,0.35)',
                    color: CREAM,
                    fontFamily: "'EB Garamond', serif",
                    fontSize: 'clamp(16px, 2.2vw, 18px)',
                    lineHeight: 1.5,
                    outline: 'none',
                  }}
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isBusy}
                  style={{
                    flexShrink: 0,
                    padding: '12px 20px',
                    borderRadius: 12,
                    border: 'none',
                    background: `linear-gradient(135deg, ${GOLD}, #9a7224)`,
                    color: INK,
                    fontFamily: "'Cinzel', serif",
                    fontSize: 11,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    cursor: !input.trim() || isBusy ? 'default' : 'pointer',
                    opacity: !input.trim() || isBusy ? 0.5 : 1,
                  }}
                >
                  Send
                </button>
              </div>
            </form>
          </footer>
        </div>
      )}
    </>
  );
}
