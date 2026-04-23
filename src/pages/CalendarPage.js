import React, { useState } from 'react';
import { culturalEvents, eventTypes } from '../data/culturalCalendar';

export default function CalendarPage() {
  const [activeType, setActiveType] = useState('All');
  const [expanded, setExpanded] = useState(null);

  const filtered = activeType === 'All'
    ? culturalEvents
    : culturalEvents.filter(e => e.type === activeType);

  return (
    <div className="page-wrapper">
      <section style={{ padding: '72px 20px 40px', textAlign: 'center', background: 'radial-gradient(ellipse at 50% 0%, rgba(201,165,88,0.07) 0%, transparent 60%)' }}>
        <h1 className="section-title" style={{ fontSize: 'clamp(26px, 5vw, 42px)', marginBottom: 12 }}>Ghanaian Cultural Calendar</h1>
        <p className="section-subtitle" style={{ maxWidth: 620, margin: '0 auto 32px' }}>
          Ghana's festivals and ceremonies are living history — each one a thread connecting the present to thousands of years of Akan, Ga, Dagomba, and Pan-African culture. Wherever you are in the world, you can mark these days.
        </p>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, justifyContent: 'center' }}>
          {eventTypes.map(type => (
            <button key={type} onClick={() => setActiveType(type)} style={{
              background: activeType === type ? 'linear-gradient(135deg,#C9A558,#E8CB82)' : 'transparent',
              color: activeType === type ? '#1C0E04' : '#BA9D7C',
              border: `1px solid ${activeType === type ? '#C9A558' : 'rgba(201,165,88,0.2)'}`,
              borderRadius: 50, padding: '6px 16px',
              fontFamily: "'Cinzel', serif", fontSize: 11, letterSpacing: '0.08em',
              cursor: 'pointer', transition: 'all 0.2s', textTransform: 'uppercase',
            }}>
              {type}
            </button>
          ))}
        </div>
      </section>

      <section style={{ padding: '24px 20px 80px', maxWidth: 900, margin: '0 auto' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {filtered.map(event => (
            <div key={event.id} style={{
              background: 'rgba(201,165,88,0.03)', border: '1px solid rgba(201,165,88,0.12)',
              borderLeft: `4px solid ${event.color}`, borderRadius: 10,
              overflow: 'hidden', transition: 'border-color 0.2s',
            }}>
              {/* Header row */}
              <div
                onClick={() => setExpanded(expanded === event.id ? null : event.id)}
                style={{ padding: '22px 24px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 16 }}
              >
                <div style={{ fontSize: 32, flexShrink: 0 }}>{event.icon}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap', marginBottom: 4 }}>
                    <h3 style={{ fontFamily: "'Cinzel', serif", fontSize: 16, color: '#C9A558', letterSpacing: '0.08em', margin: 0 }}>{event.name}</h3>
                    <span style={{ padding: '2px 10px', borderRadius: 50, fontSize: 11, background: 'rgba(201,165,88,0.08)', border: '1px solid rgba(201,165,88,0.15)', color: '#BA9D7C', fontFamily: "'Cinzel', serif", letterSpacing: '0.06em' }}>{event.type}</span>
                  </div>
                  <div style={{ fontFamily: "'EB Garamond', serif", fontSize: 15, color: '#7C5F48', fontStyle: 'italic' }}>{event.date}</div>
                </div>
                <div style={{ color: '#9E7D42', fontSize: 20, flexShrink: 0, transition: 'transform 0.2s', transform: expanded === event.id ? 'rotate(180deg)' : 'none' }}>▾</div>
              </div>

              {/* Expanded content */}
              {expanded === event.id && (
                <div style={{ borderTop: '1px solid rgba(201,165,88,0.08)', padding: '24px 24px 28px' }}>
                  <p style={{ color: '#EDD9BC', fontSize: 17, lineHeight: 1.85, marginBottom: 20 }}>{event.description}</p>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 20 }}>
                    <div style={{ background: 'rgba(201,165,88,0.04)', borderRadius: 8, padding: '16px 18px' }}>
                      <div style={{ fontFamily: "'Cinzel', serif", fontSize: 11, color: '#9E7D42', letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: 8 }}>Why It Matters</div>
                      <p style={{ color: '#BA9D7C', fontSize: 15, lineHeight: 1.8, margin: 0 }}>{event.significance}</p>
                    </div>
                    <div style={{ background: 'rgba(201,165,88,0.04)', borderRadius: 8, padding: '16px 18px' }}>
                      <div style={{ fontFamily: "'Cinzel', serif", fontSize: 11, color: '#9E7D42', letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: 8 }}>How to Mark It</div>
                      <p style={{ color: '#BA9D7C', fontSize: 15, lineHeight: 1.8, margin: 0 }}>{event.howToMark}</p>
                    </div>
                  </div>

                  {event.learnMore && (
                    <div style={{ marginTop: 16, padding: '12px 16px', borderRadius: 8, background: 'rgba(201,165,88,0.02)', border: '1px solid rgba(201,165,88,0.1)' }}>
                      <span style={{ fontFamily: "'Cinzel', serif", fontSize: 11, color: '#9E7D42', letterSpacing: '0.15em', textTransform: 'uppercase' }}>Learn More: </span>
                      <span style={{ color: '#7C5F48', fontSize: 15, fontStyle: 'italic' }}>{event.learnMore}</span>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
