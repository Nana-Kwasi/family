import React from 'react';

export default function SoundPermissionModal({ pageName, onAllow, onDeny }) {
  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 3000,
      background: 'rgba(5,3,0,0.92)',
      backdropFilter: 'blur(8px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '20px',
      animation: 'soundModalIn 0.4s cubic-bezier(0.22,1,0.36,1)',
    }}>
      <style>{`@keyframes soundModalIn { from{opacity:0;transform:scale(0.94)} to{opacity:1;transform:scale(1)} }`}</style>
      <div style={{
        background: 'linear-gradient(160deg, #1C1005 0%, #2A1A08 60%, #1C1005 100%)',
        border: '1px solid rgba(201,165,88,0.4)',
        borderRadius: 20, padding: '40px 36px',
        maxWidth: 460, width: '100%', textAlign: 'center',
        boxShadow: '0 40px 100px rgba(0,0,0,0.8)',
      }}>
        <div style={{ fontSize: 44, marginBottom: 20 }}>🎧</div>
        <h2 style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: 'clamp(20px, 4vw, 26px)',
          color: '#FAF0E0', margin: '0 0 14px', lineHeight: 1.3,
        }}>
          This experience sounds better<br />
          <span style={{ color: '#C9A558' }}>with ambient sound</span>
        </h2>
        <p style={{
          fontFamily: "'EB Garamond', serif", fontSize: 17,
          color: '#BA9D7C', lineHeight: 1.8, margin: '0 0 28px',
        }}>
          {pageName === 'village'
            ? 'The Ancient Village experience uses layered bird calls, forest sounds, and stream ambience — one sound per scene — to place you inside the village as it breathes through a full day. With sound on, it becomes cinematic rather than a video playlist.'
            : 'Each section of Ghana\'s landscapes — castles, rivers, forests, mountains — plays its own ambient soundscape: coastal wind for the castles, flowing streams for the rivers, bird-filled forests for the parks. Together they make the narration feel like a documentary.'}
        </p>
        <p style={{
          fontFamily: "'Montserrat', sans-serif", fontSize: 11,
          color: '#7C5F48', letterSpacing: '0.1em', textTransform: 'uppercase',
          margin: '0 0 24px',
        }}>
          Volume stays at 25% — never overpowers narration
        </p>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
          <button
            onClick={onAllow}
            style={{
              background: 'linear-gradient(135deg, #C9A558, #8B6914)',
              border: 'none', borderRadius: 999, padding: '13px 28px',
              fontFamily: "'Montserrat', sans-serif", fontSize: 12,
              letterSpacing: '0.12em', textTransform: 'uppercase',
              color: '#111', fontWeight: 700, cursor: 'pointer',
              boxShadow: '0 6px 24px rgba(201,165,88,0.35)',
            }}
          >
            🔊 Allow Sound
          </button>
          <button
            onClick={onDeny}
            style={{
              background: 'transparent',
              border: '1px solid rgba(201,165,88,0.25)',
              borderRadius: 999, padding: '13px 28px',
              fontFamily: "'Montserrat', sans-serif", fontSize: 12,
              letterSpacing: '0.12em', textTransform: 'uppercase',
              color: '#7C5F48', cursor: 'pointer',
            }}
          >
            No thanks
          </button>
        </div>
        <p style={{
          marginTop: 18, fontFamily: "'Montserrat', sans-serif",
          fontSize: 10, color: 'rgba(201,165,88,0.3)',
          letterSpacing: '0.08em',
        }}>
          You can toggle sound off at any time during the experience
        </p>
      </div>
    </div>
  );
}
