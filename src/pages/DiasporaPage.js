import React, { useState, useEffect } from 'react';
import { fetchDiasporaStories, fetchReviews, submitDiasporaStory, submitReview } from '../utils/cultureApi';
import { notifyAfiaBookFeedback } from '../utils/emailjs';

const countries = [
  'United States', 'United Kingdom', 'Canada', 'France', 'Germany', 'Netherlands',
  'Sweden', 'Norway', 'Denmark', 'Belgium', 'Switzerland', 'Italy', 'Spain',
  'Australia', 'Jamaica', 'Trinidad & Tobago', 'Barbados', 'Brazil', 'Other',
];

// ── Star Rating ───────────────────────────────────────────────────────────────
function StarRating({ value, onChange, readOnly }) {
  const [hover, setHover] = useState(0);
  return (
    <div style={{ display: 'flex', gap: 4 }}>
      {[1, 2, 3, 4, 5].map(star => (
        <button
          key={star} type="button"
          onClick={() => !readOnly && onChange(star)}
          onMouseEnter={() => !readOnly && setHover(star)}
          onMouseLeave={() => !readOnly && setHover(0)}
          style={{
            background: 'none', border: 'none', cursor: readOnly ? 'default' : 'pointer',
            fontSize: 'clamp(22px,5vw,28px)', padding: 0, lineHeight: 1,
            color: star <= (hover || value) ? '#C9A558' : 'rgba(201,165,88,0.25)',
            transition: 'color 0.15s',
          }}
        >★</button>
      ))}
    </div>
  );
}

// ── Story Reading Modal ───────────────────────────────────────────────────────
function StoryModal({ story, onClose }) {
  const [reviews, setReviews] = useState([]);
  const [form, setForm] = useState({ name: '', rating: 0, comment: '' });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formError, setFormError] = useState('');

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  useEffect(() => {
    if (!story?.id) {
      setReviews([]);
      return undefined;
    }

    let cancelled = false;
    fetchReviews('DIASPORA', story.id)
      .then((list) => { if (!cancelled) setReviews(list); })
      .catch(() => { if (!cancelled) setReviews([]); });
    return () => { cancelled = true; };
  }, [story.id, submitted]);

  const avgRating = reviews.length
    ? (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1)
    : null;

  async function handleSubmit(e) {
    e.preventDefault();
    if (!form.rating) { setFormError('Please select a star rating.'); return; }
    if (!form.comment.trim()) { setFormError('Please write a comment.'); return; }
    setSubmitting(true);
    setFormError('');
    try {
      await submitReview({
        subject: 'DIASPORA',
        subjectId: story.id,
        subjectTitle: story.name,
        name: form.name.trim() || 'Anonymous',
        rating: form.rating,
        comment: form.comment.trim(),
      });
      await notifyAfiaBookFeedback({
        name: form.name || 'Anonymous',
        rating: form.rating,
        comment: form.comment,
        book_title: `Diaspora Story by ${story.name}`,
      }).catch(() => {});
      setSubmitted(true);
    } catch {
      setFormError('Failed to submit. Please try again.');
    } finally {
      setSubmitting(false);
    }
  }

  const date = story.createdAt?.toDate?.();

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.9)',
        zIndex: 1000, overflowY: 'auto', padding: '40px 20px',
        display: 'flex', justifyContent: 'center', alignItems: 'flex-start',
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          background: '#0d0b00', border: '1px solid rgba(201,165,88,0.25)',
          borderRadius: 14, maxWidth: 740, width: '100%', position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Header */}
        <div style={{ padding: '28px 32px 24px', borderBottom: '1px solid rgba(201,165,88,0.1)', background: 'rgba(201,165,88,0.03)' }}>
          <button
            onClick={onClose}
            style={{ position: 'absolute', top: 16, right: 16, background: 'rgba(201,165,88,0.08)', border: '1px solid rgba(201,165,88,0.2)', color: '#BA9D7C', borderRadius: '50%', width: 32, height: 32, cursor: 'pointer', fontSize: 16 }}
          >✕</button>

          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12, flexWrap: 'wrap' }}>
            <span style={{ background: 'rgba(201,165,88,0.1)', border: '1px solid rgba(201,165,88,0.2)', borderRadius: 50, padding: '3px 12px', fontFamily: "'Cinzel', serif", fontSize: 11, color: '#C9A558', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
              Diaspora Story
            </span>
            {avgRating && (
              <span style={{ fontFamily: "'Cinzel', serif", fontSize: 13, color: '#C9A558' }}>
                ★ {avgRating} <span style={{ color: '#7C5F48', fontSize: 11 }}>({reviews.length})</span>
              </span>
            )}
          </div>

          <h2 style={{ fontFamily: "'Cinzel', serif", fontSize: 'clamp(18px,4vw,24px)', color: '#C9A558', letterSpacing: '0.08em', marginBottom: 8 }}>
            {story.name}'s Story
          </h2>
          <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
            {story.country && <span style={{ fontSize: 14, color: '#7C5F48', fontStyle: 'italic' }}>📍 {story.country}</span>}
            {story.akanName && <span style={{ fontSize: 14, color: '#9E7D42', fontFamily: "'Cinzel', serif" }}>Known as {story.akanName}</span>}
            {date && <span style={{ fontSize: 13, color: '#7C5F48' }}>{date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>}
          </div>
        </div>

        {/* Story body */}
        <div style={{ padding: '32px 32px 28px' }}>
          <p style={{ fontFamily: "'EB Garamond', serif", fontSize: 'clamp(17px,2.5vw,20px)', color: '#EDD9BC', lineHeight: 2, whiteSpace: 'pre-wrap', margin: 0 }}>
            {story.story}
          </p>
        </div>

        {/* Feedback section */}
        <div style={{ borderTop: '1px solid rgba(201,165,88,0.1)', padding: '28px 32px 36px' }}>
          <h3 style={{ fontFamily: "'Cinzel', serif", fontSize: 14, color: '#C9A558', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 6 }}>
            Share Your Reflection
          </h3>
          <p style={{ color: '#7C5F48', fontStyle: 'italic', fontSize: 15, marginBottom: 20 }}>
            What did this story stir in you?
          </p>

          {!submitted ? (
            <form onSubmit={handleSubmit}>
              <div className="form-field">
                <label className="field-label">Your Name (optional)</label>
                <input
                  type="text" placeholder="Anonymous" value={form.name}
                  onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                  className="afia-input-plain"
                />
              </div>
              <div className="form-field">
                <label className="field-label">Your Rating</label>
                <StarRating value={form.rating} onChange={r => { setForm(f => ({ ...f, rating: r })); setFormError(''); }} />
              </div>
              <div className="form-field">
                <label className="field-label">Your Thoughts</label>
                <textarea
                  rows={3} placeholder="What resonated with you?"
                  value={form.comment}
                  onChange={e => { setForm(f => ({ ...f, comment: e.target.value })); setFormError(''); }}
                  className="afia-input-plain"
                  style={{ resize: 'vertical', lineHeight: 1.7 }}
                />
              </div>
              {formError && <div className="error-msg" style={{ marginBottom: 12 }}>{formError}</div>}
              <button type="submit" disabled={submitting} className="btn-gold" style={{ marginTop: 4 }}>
                {submitting ? 'Sending...' : 'Submit Reflection'}
              </button>
            </form>
          ) : (
            <div style={{ textAlign: 'center', padding: '20px 0' }}>
              <div style={{ fontSize: 28, marginBottom: 10 }}>✨</div>
              <p style={{ fontFamily: "'Cinzel', serif", color: '#C9A558', fontSize: 14 }}>
                Thank you for your reflection.
              </p>
            </div>
          )}

          {/* Existing reviews */}
          {reviews.length > 0 && (
            <div style={{ marginTop: 32, borderTop: '1px solid rgba(201,165,88,0.08)', paddingTop: 24 }}>
              <div style={{ fontFamily: "'Cinzel', serif", fontSize: 11, letterSpacing: '0.18em', color: '#9E7D42', textTransform: 'uppercase', marginBottom: 16 }}>
                Reader Reflections
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {reviews.map(rev => {
                  const d = rev.createdAt?.toDate?.();
                  return (
                    <div key={rev.id} style={{ borderLeft: '2px solid rgba(201,165,88,0.2)', paddingLeft: 16 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6, flexWrap: 'wrap' }}>
                        <span style={{ fontFamily: "'Cinzel', serif", fontSize: 13, color: '#EDD9BC' }}>{rev.name}</span>
                        <span style={{ color: '#C9A558', fontSize: 14 }}>{'★'.repeat(rev.rating)}<span style={{ color: 'rgba(201,165,88,0.25)' }}>{'★'.repeat(5 - rev.rating)}</span></span>
                        {d && <span style={{ fontSize: 11, color: '#7C5F48' }}>{d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>}
                      </div>
                      <p style={{ fontFamily: "'EB Garamond', serif", fontSize: 17, color: '#BA9D7C', lineHeight: 1.75, fontStyle: 'italic', margin: 0 }}>"{rev.comment}"</p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ── Story Card ────────────────────────────────────────────────────────────────
function StoryCard({ story, onRead }) {
  const date = story.createdAt?.toDate?.();
  const preview = story.story?.length > 200 ? story.story.substring(0, 200) + '…' : story.story;

  return (
    <div style={{
      background: 'rgba(201,165,88,0.03)', border: '1px solid rgba(201,165,88,0.15)',
      borderRadius: 12, padding: '24px', display: 'flex', flexDirection: 'column',
      gap: 12, transition: 'border-color 0.2s',
    }}
      onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(201,165,88,0.35)'}
      onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(201,165,88,0.15)'}
    >
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 8 }}>
        <div>
          <div style={{ fontFamily: "'Cinzel', serif", fontSize: 15, color: '#C9A558', letterSpacing: '0.08em', marginBottom: 4 }}>
            {story.name}
            {story.akanName && <span style={{ color: '#9E7D42', fontSize: 12, marginLeft: 8 }}>· {story.akanName}</span>}
          </div>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            {story.country && <span style={{ fontSize: 13, color: '#7C5F48', fontStyle: 'italic' }}>📍 {story.country}</span>}
            {date && <span style={{ fontSize: 12, color: '#7C5F48' }}>{date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>}
          </div>
        </div>
        <div style={{ fontSize: 22, flexShrink: 0 }}>✊</div>
      </div>

      <p style={{ fontFamily: "'EB Garamond', serif", fontSize: 17, color: '#BA9D7C', lineHeight: 1.8, margin: 0, fontStyle: 'italic' }}>
        "{preview}"
      </p>

      <button
        onClick={() => onRead(story)}
        style={{
          marginTop: 'auto', background: 'transparent', border: '1px solid rgba(201,165,88,0.3)',
          color: '#C9A558', borderRadius: 6, padding: '9px 18px',
          fontFamily: "'Cinzel', serif", fontSize: 11, letterSpacing: '0.12em',
          cursor: 'pointer', textTransform: 'uppercase', transition: 'all 0.2s', alignSelf: 'flex-start',
        }}
        onMouseEnter={e => { e.currentTarget.style.background = 'rgba(201,165,88,0.1)'; }}
        onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; }}
      >
        Read Full Story →
      </button>
    </div>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────
export default function DiasporaPage() {
  const [stories, setStories] = useState([]);
  const [reading, setReading] = useState(null);
  const [form, setForm] = useState({ name: '', country: '', akanName: '', story: '' });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);

  // Re-read after a submission so the writer sees their own story on the wall.
  useEffect(() => {
    let cancelled = false;
    fetchDiasporaStories()
      .then((list) => { if (!cancelled) setStories(list); })
      .catch(() => { if (!cancelled) setStories([]); });
    return () => { cancelled = true; };
  }, [submitted]);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!form.name.trim() || !form.story.trim()) { setError('Please fill in your name and your story.'); return; }
    if (form.story.trim().length < 50) { setError('Please share a bit more — at least 50 characters.'); return; }
    setSubmitting(true); setError('');
    try {
      await submitDiasporaStory({
        name: form.name.trim(),
        country: form.country,
        akanName: form.akanName,
        story: form.story.trim(),
      });
      setSubmitted(true);
      setForm({ name: '', country: '', akanName: '', story: '' });
      setShowForm(false);
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="page-wrapper">
      <section style={{ padding: '72px 20px 48px', textAlign: 'center', background: 'radial-gradient(ellipse at 50% 0%, rgba(201,165,88,0.07) 0%, transparent 60%)' }}>
        <h1 className="section-title" style={{ fontSize: 'clamp(26px, 5vw, 42px)', marginBottom: 12 }}>Diaspora Stories</h1>
        <p className="section-subtitle" style={{ maxWidth: 620, margin: '0 auto 12px' }}>
          Black Americans and Africans in Europe sharing their journeys of reconnecting with their roots. Every story is an act of reclaiming what was taken.
        </p>
        <p style={{ color: '#7C5F48', fontStyle: 'italic', fontSize: 16, maxWidth: 500, margin: '0 auto 32px' }}>
          "The diaspora does not end at the water's edge. It begins again every time someone asks — where do I come from?"
        </p>

        {!showForm && !submitted && (
          <button onClick={() => setShowForm(true)} style={{ background: 'linear-gradient(135deg,#C9A558,#E8CB82)', color: '#1C0E04', border: 'none', borderRadius: 8, padding: '14px 32px', fontFamily: "'Cinzel', serif", fontSize: 12, letterSpacing: '0.14em', cursor: 'pointer', textTransform: 'uppercase' }}>
            Share Your Story
          </button>
        )}

        {submitted && (
          <div style={{ display: 'inline-block', background: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.25)', borderRadius: 10, padding: '16px 28px' }}>
            <p style={{ color: '#4ade80', fontFamily: "'Cinzel', serif", fontSize: 13, letterSpacing: '0.1em', margin: 0 }}>
              ✨ Your story has been added to the record.
            </p>
          </div>
        )}
      </section>

      {/* Submission form */}
      {showForm && (
        <section style={{ maxWidth: 780, margin: '0 auto', padding: '0 20px 40px' }}>
          <form onSubmit={handleSubmit} style={{ background: 'rgba(201,165,88,0.03)', border: '1px solid rgba(201,165,88,0.2)', borderRadius: 12, padding: '32px 28px' }}>
            <h3 style={{ fontFamily: "'Cinzel', serif", fontSize: 15, color: '#C9A558', letterSpacing: '0.1em', marginBottom: 24, textAlign: 'center' }}>Your Reconnection Story</h3>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 16, marginBottom: 16 }}>
              <div>
                <label className="field-label">Your Name *</label>
                <input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                  placeholder="How you'd like to be known" className="afia-input-plain" />
              </div>
              <div>
                <label className="field-label">Country</label>
                <select value={form.country} onChange={e => setForm(f => ({ ...f, country: e.target.value }))}
                  style={{ width: '100%', background: '#100d00', border: '1px solid rgba(201,165,88,0.2)', borderRadius: 8, padding: '14px 16px', color: '#BA9D7C', fontFamily: "'EB Garamond', serif", fontSize: 16, outline: 'none', boxSizing: 'border-box' }}>
                  <option value="">Select country</option>
                  {countries.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="field-label">Your Akan Name</label>
                <input value={form.akanName} onChange={e => setForm(f => ({ ...f, akanName: e.target.value }))}
                  placeholder="e.g. Kofi, Abena…" className="afia-input-plain" />
              </div>
            </div>

            <div className="form-field">
              <label className="field-label">Your Story *</label>
              <textarea value={form.story} onChange={e => setForm(f => ({ ...f, story: e.target.value }))}
                rows={6} placeholder="Share your journey of reconnecting with your roots…"
                className="afia-input-plain" style={{ resize: 'vertical', lineHeight: 1.8 }} />
            </div>

            {error && <div className="error-msg" style={{ marginBottom: 16 }}>{error}</div>}

            <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end' }}>
              <button type="button" onClick={() => setShowForm(false)} style={{ background: 'transparent', border: '1px solid rgba(201,165,88,0.2)', color: '#BA9D7C', borderRadius: 6, padding: '10px 20px', fontFamily: "'Cinzel', serif", fontSize: 12, letterSpacing: '0.1em', cursor: 'pointer' }}>
                Cancel
              </button>
              <button type="submit" disabled={submitting} className="btn-gold" style={{ width: 'auto', padding: '10px 28px' }}>
                {submitting ? 'Sharing…' : 'Share Story'}
              </button>
            </div>
          </form>
        </section>
      )}

      {/* Stories grid */}
      <section style={{ padding: '0 20px 80px', maxWidth: 1200, margin: '0 auto' }}>
        {stories.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '64px 20px' }}>
            <div style={{ fontSize: 40, marginBottom: 16 }}>✊</div>
            <p style={{ color: '#7C5F48', fontStyle: 'italic', fontSize: 18 }}>No stories yet — be the first to share yours.</p>
          </div>
        ) : (
          <>
            <div style={{ textAlign: 'center', marginBottom: 32 }}>
              <p style={{ color: '#7C5F48', fontSize: 16 }}>{stories.length} {stories.length === 1 ? 'story' : 'stories'} shared</p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 24 }}>
              {stories.map(s => (
                <StoryCard key={s.id} story={s} onRead={setReading} />
              ))}
            </div>
          </>
        )}
      </section>

      {reading && <StoryModal story={reading} onClose={() => setReading(null)} />}
    </div>
  );
}
