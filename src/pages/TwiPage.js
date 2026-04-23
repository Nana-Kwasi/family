import React, { useState } from 'react';
import { twiCategories } from '../data/twiPhrases';

export default function TwiPage() {
  const [activeTab, setActiveTab] = useState(twiCategories[0].id);
  const [playingId, setPlayingId] = useState(null);

  const current = twiCategories.find(c => c.id === activeTab);

  function handleListen(phrase) {
    if (!window.speechSynthesis) return;
    setPlayingId(phrase.twi);
    const utter = new window.SpeechSynthesisUtterance(phrase.twi);
    utter.lang = 'en-GH';
    utter.rate = 0.85;
    utter.onend = () => setPlayingId(null);
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utter);
  }

  return (
    <div className="page-wrapper">
      <section style={{ padding: '72px 20px 40px', textAlign: 'center', background: 'radial-gradient(ellipse at 50% 0%, rgba(201,165,88,0.07) 0%, transparent 60%)' }}>
        <h1 className="section-title" style={{ fontSize: 'clamp(26px, 5vw, 42px)', marginBottom: 12 }}>Twi Language Basics</h1>
        <p className="section-subtitle" style={{ maxWidth: 600, margin: '0 auto 12px' }}>
          Twi (Akan-Twi) is spoken by over 9 million people in Ghana and is the most widely understood language in the country. Learning even a few phrases is an act of reconnection with your heritage.
        </p>
        <p style={{ color: '#7C5F48', fontStyle: 'italic', fontSize: 16, marginBottom: 32 }}>
          Pronunciation guide: syllables in CAPS are stressed. The ɛ sounds like the "e" in "bed." The ɔ sounds like "aw."
        </p>

        {/* Tabs */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, justifyContent: 'center' }}>
          {twiCategories.map(cat => (
            <button key={cat.id} onClick={() => setActiveTab(cat.id)} style={{
              background: activeTab === cat.id ? 'linear-gradient(135deg,#C9A558,#E8CB82)' : 'transparent',
              color: activeTab === cat.id ? '#1C0E04' : '#BA9D7C',
              border: `1px solid ${activeTab === cat.id ? '#C9A558' : 'rgba(201,165,88,0.2)'}`,
              borderRadius: 50, padding: '8px 18px',
              fontFamily: "'Cinzel', serif", fontSize: 11, letterSpacing: '0.1em',
              cursor: 'pointer', transition: 'all 0.2s', textTransform: 'uppercase',
              display: 'flex', alignItems: 'center', gap: 6,
            }}>
              <span>{cat.icon}</span> {cat.label}
            </button>
          ))}
        </div>
      </section>

      <section style={{ padding: '24px 20px 80px', maxWidth: 820, margin: '0 auto' }}>
        {/* Category intro */}
        <div style={{
          background: 'rgba(201,165,88,0.04)', border: '1px solid rgba(201,165,88,0.15)',
          borderRadius: 10, padding: '18px 22px', marginBottom: 32,
        }}>
          <p style={{ color: '#BA9D7C', fontStyle: 'italic', fontSize: 17, lineHeight: 1.8, margin: 0 }}>
            {current.intro}
          </p>
        </div>

        {/* Phrase cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {current.phrases.map((phrase, i) => (
            <div key={i} style={{
              background: 'rgba(201,165,88,0.03)', border: '1px solid rgba(201,165,88,0.12)',
              borderRadius: 10, padding: '18px 22px',
              display: 'grid', gridTemplateColumns: '1fr 1fr 1fr auto', alignItems: 'center', gap: 16,
            }}>
              {/* Twi */}
              <div>
                <div style={{ fontFamily: "'Cinzel', serif", fontSize: 11, color: '#9E7D42', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 4 }}>Twi</div>
                <div style={{ fontFamily: "'EB Garamond', serif", fontSize: 20, color: '#C9A558', lineHeight: 1.3 }}>{phrase.twi}</div>
              </div>
              {/* Pronunciation */}
              <div>
                <div style={{ fontFamily: "'Cinzel', serif", fontSize: 11, color: '#9E7D42', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 4 }}>Pronunciation</div>
                <div style={{ fontFamily: "'EB Garamond', serif", fontSize: 17, color: '#BA9D7C', fontStyle: 'italic' }}>{phrase.pronunciation}</div>
              </div>
              {/* English */}
              <div>
                <div style={{ fontFamily: "'Cinzel', serif", fontSize: 11, color: '#9E7D42', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 4 }}>English</div>
                <div style={{ fontFamily: "'EB Garamond', serif", fontSize: 17, color: '#EDD9BC' }}>{phrase.english}</div>
              </div>
              {/* Listen button */}
              <button
                onClick={() => handleListen(phrase)}
                title="Listen (browser TTS)"
                style={{
                  background: playingId === phrase.twi ? 'rgba(201,165,88,0.2)' : 'transparent',
                  border: '1px solid rgba(201,165,88,0.25)', color: '#C9A558',
                  borderRadius: '50%', width: 36, height: 36, cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 16, transition: 'all 0.2s', flexShrink: 0,
                }}
              >
                {playingId === phrase.twi ? '⏸' : '▶'}
              </button>
            </div>
          ))}
        </div>

        {/* Note */}
        <div style={{ textAlign: 'center', marginTop: 48, padding: '24px', background: 'rgba(201,165,88,0.03)', border: '1px solid rgba(201,165,88,0.1)', borderRadius: 10 }}>
          <div style={{ fontSize: 28, marginBottom: 10 }}>📖</div>
          <p style={{ color: '#7C5F48', fontStyle: 'italic', fontSize: 16, lineHeight: 1.8, margin: 0 }}>
            The ▶ buttons use your browser's text-to-speech to approximate pronunciation.
            For authentic Twi audio, we recommend the <strong style={{ color: '#BA9D7C' }}>Duolingo Twi course</strong> or{' '}
            <strong style={{ color: '#BA9D7C' }}>LearnAkan.com</strong> for deeper study.
          </p>
        </div>
      </section>
    </div>
  );
}
