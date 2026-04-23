import React, { useState, useEffect, useRef } from 'react';
import {
  collection, addDoc, query, where, orderBy, onSnapshot, serverTimestamp,
} from 'firebase/firestore';
import { db } from '../firebase';
import { bookSections, bookMeta } from '../data/bookContent';
import { notifyAfiaBookFeedback } from '../utils/emailjs';

// ── Book Block Renderer ───────────────────────────────────────────────────────

function BookBlock({ block }) {
  const body = { fontFamily: "'EB Garamond', Georgia, serif", fontSize: 'clamp(18px,2.2vw,21px)', lineHeight: 1.9, color: '#EDD9BC', marginBottom: 20 };

  switch (block.type) {
    case 'title':
      return <h1 style={{ fontFamily: "'Cinzel', serif", fontSize: 'clamp(20px,4vw,34px)', color: '#C9A558', letterSpacing: '0.1em', lineHeight: 1.4, textAlign: 'center', marginBottom: 10 }}>{block.text}</h1>;
    case 'subtitle':
      return <p style={{ textAlign: 'center', fontFamily: "'EB Garamond', serif", fontSize: 'clamp(14px,2vw,18px)', color: '#BA9D7C', fontStyle: 'italic', marginBottom: 14 }}>{block.text}</p>;
    case 'author':
      return <p style={{ textAlign: 'center', fontFamily: "'Cinzel', serif", fontSize: 13, color: '#9E7D42', letterSpacing: '0.14em', marginTop: 24, textTransform: 'uppercase' }}>{block.text}</p>;
    case 'heading':
      return <h2 style={{ fontFamily: "'Cinzel', serif", fontSize: 'clamp(16px,3vw,22px)', color: '#C9A558', letterSpacing: '0.08em', marginBottom: 20, borderBottom: '1px solid rgba(201,165,88,0.2)', paddingBottom: 10 }}>{block.text}</h2>;
    case 'chapter':
      return (
        <div style={{ marginBottom: 28 }}>
          <div style={{ fontFamily: "'Cinzel', serif", fontSize: 11, color: '#9E7D42', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 6 }}>Chapter {block.number}</div>
          <h2 style={{ fontFamily: "'Cinzel', serif", fontSize: 'clamp(16px,3vw,24px)', color: '#C9A558', letterSpacing: '0.06em', lineHeight: 1.4 }}>{block.text}</h2>
          <div style={{ height: 2, width: 48, background: 'linear-gradient(to right,#C9A558,transparent)', marginTop: 14 }} />
        </div>
      );
    case 'subheading':
      return <h3 style={{ fontFamily: "'Cinzel', serif", fontSize: 'clamp(12px,2vw,15px)', color: '#EDD9BC', letterSpacing: '0.1em', marginTop: 22, marginBottom: 12, textTransform: 'uppercase' }}>{block.text}</h3>;
    case 'body':
      return <p style={body}>{block.text.split('\n').map((l, i, a) => <React.Fragment key={i}>{l}{i < a.length - 1 && <br />}</React.Fragment>)}</p>;
    case 'dedication':
      return <p style={{ fontFamily: "'EB Garamond', serif", fontSize: 'clamp(16px,2.5vw,20px)', color: '#C9A558', fontStyle: 'italic', textAlign: 'center', lineHeight: 1.8, margin: '24px 0' }}>{block.text}</p>;
    case 'quote':
      return (
        <blockquote style={{ borderLeft: '3px solid #C9A558', paddingLeft: 20, margin: '24px 0', fontFamily: "'EB Garamond', serif", fontSize: 'clamp(16px,2.5vw,20px)', fontStyle: 'italic', color: '#C9A558', lineHeight: 1.8 }}>
          {block.text.split('\n').map((l, i, a) => <React.Fragment key={i}>{l}{i < a.length - 1 && <br />}</React.Fragment>)}
        </blockquote>
      );
    case 'list':
      return (
        <ul style={{ margin: '6px 0 20px', paddingLeft: 22 }}>
          {block.items.map((item, i) => (
            <li key={i} style={{ fontFamily: "'EB Garamond', serif", fontSize: 'clamp(15px,2vw,18px)', color: '#EDD9BC', lineHeight: 1.85, marginBottom: 5 }}>{item}</li>
          ))}
        </ul>
      );
    case 'table':
      return (
        <div style={{ overflowX: 'auto', margin: '20px 0 28px', borderRadius: 8, border: '1px solid rgba(201,165,88,0.2)' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: "'EB Garamond', serif", fontSize: 'clamp(14px,2vw,18px)' }}>
            <thead>
              <tr style={{ background: 'rgba(201,165,88,0.08)' }}>
                {block.headers.map((h, i) => (
                  <th key={i} style={{ padding: '14px 16px', borderBottom: '2px solid rgba(201,165,88,0.35)', borderRight: i < block.headers.length - 1 ? '1px solid rgba(201,165,88,0.15)' : 'none', color: '#EDD9BC', fontFamily: "'EB Garamond', serif", fontSize: 'clamp(14px,2vw,19px)', fontWeight: 'bold', textAlign: 'left' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row, ri) => (
                <tr key={ri} style={{ borderBottom: ri < block.rows.length - 1 ? '1px solid rgba(201,165,88,0.12)' : 'none' }}>
                  {row.map((cell, ci) => (
                    <td key={ci} style={{ padding: '14px 16px', borderRight: ci < row.length - 1 ? '1px solid rgba(201,165,88,0.1)' : 'none', color: '#EDD9BC', lineHeight: 1.75, verticalAlign: 'top' }}>{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    case 'toc':
      return (
        <div style={{ margin: '8px 0 20px' }}>
          {block.items.map((item, i) => (
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', padding: '7px 0', borderBottom: '1px dotted rgba(201,165,88,0.15)' }}>
              <span style={{ fontFamily: "'EB Garamond', serif", fontSize: 'clamp(14px,2vw,17px)', color: '#EDD9BC' }}>{item.label}</span>
              <span style={{ fontFamily: "'Cinzel', serif", fontSize: 11, color: '#9E7D42', marginLeft: 12, flexShrink: 0 }}>{item.page}</span>
            </div>
          ))}
        </div>
      );
    default: return null;
  }
}

// ── Star Rating ───────────────────────────────────────────────────────────────

function StarRating({ value, onChange, readOnly }) {
  const [hover, setHover] = useState(0);
  return (
    <div style={{ display: 'flex', gap: 4 }}>
      {[1,2,3,4,5].map(star => (
        <button key={star} type="button"
          onClick={() => !readOnly && onChange?.(star)}
          onMouseEnter={() => !readOnly && setHover(star)}
          onMouseLeave={() => !readOnly && setHover(0)}
          style={{ background: 'none', border: 'none', cursor: readOnly ? 'default' : 'pointer', fontSize: 'clamp(22px,5vw,28px)', padding: 0, lineHeight: 1, color: star <= (hover || value) ? '#C9A558' : 'rgba(201,165,88,0.25)', transition: 'color 0.15s' }}
        >★</button>
      ))}
    </div>
  );
}

// ── Book Reading Modal ────────────────────────────────────────────────────────

function BookModal({ onClose }) {
  const [activeSection, setActiveSection] = useState('title');
  const [hasFinished, setHasFinished] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [reviewForm, setReviewForm] = useState({ name: '', rating: 0, comment: '' });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [reviewError, setReviewError] = useState('');
  const [tocOpen, setTocOpen] = useState(false);
  const contentRef = useRef(null);

  const currentIndex = bookSections.findIndex(s => s.id === activeSection);
  const currentSection = bookSections[currentIndex] || bookSections[0];

  useEffect(() => {
    const q = query(collection(db, 'bookReviews'), orderBy('createdAt', 'desc'));
    return onSnapshot(q, snap => setReviews(snap.docs.map(d => ({ id: d.id, ...d.data() }))));
  }, []);

  // Record read once per session
  useEffect(() => {
    if (!sessionStorage.getItem('afia_book_read')) {
      sessionStorage.setItem('afia_book_read', '1');
      addDoc(collection(db, 'bookReads'), { readAt: serverTimestamp() }).catch(() => {});
    }
  }, []);

  // Close on Escape
  useEffect(() => {
    const handler = e => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  function goTo(id) {
    setActiveSection(id);
    setTocOpen(false);
    contentRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
    if (bookSections.findIndex(s => s.id === id) === bookSections.length - 1) setHasFinished(true);
  }

  function navigate(dir) {
    const next = bookSections[currentIndex + dir];
    if (!next) return;
    goTo(next.id);
  }

  async function handleReviewSubmit(e) {
    e.preventDefault();
    if (!reviewForm.rating) { setReviewError('Please select a star rating.'); return; }
    if (!reviewForm.comment.trim()) { setReviewError('Please write a comment.'); return; }
    setSubmitting(true);
    try {
      await addDoc(collection(db, 'bookReviews'), {
        name: reviewForm.name.trim() || 'Anonymous',
        rating: reviewForm.rating,
        comment: reviewForm.comment.trim(),
        createdAt: serverTimestamp(),
      });
      await notifyAfiaBookFeedback({ name: reviewForm.name, rating: reviewForm.rating, comment: reviewForm.comment, book_title: 'Outdooring (Aba-Dinto)' }).catch(() => {});
      setSubmitted(true);
    } catch {
      setReviewError('Failed to submit. Please try again.');
    } finally {
      setSubmitting(false);
    }
  }

  const avgRating = reviews.length ? (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1) : null;

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 1000, background: 'rgba(0,0,0,0.85)', display: 'flex', alignItems: 'stretch', justifyContent: 'center', padding: '0', overflowY: 'auto' }}
      onClick={onClose}>
      <div style={{ background: '#0d0a02', width: '100%', maxWidth: 1000, margin: 'auto', display: 'flex', flexDirection: 'column', maxHeight: '100vh', position: 'relative' }}
        onClick={e => e.stopPropagation()}>

        {/* Modal Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 20px', borderBottom: '1px solid rgba(201,165,88,0.15)', flexShrink: 0, flexWrap: 'wrap', gap: 10 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            {/* Mobile TOC toggle */}
            <button onClick={() => setTocOpen(!tocOpen)}
              style={{ display: 'none', background: 'none', border: '1px solid rgba(201,165,88,0.3)', color: '#C9A558', cursor: 'pointer', padding: '6px 12px', borderRadius: 6, fontFamily: "'Cinzel', serif", fontSize: 11, letterSpacing: '0.1em' }}
              className="toc-toggle-btn">
              ☰ Contents
            </button>
            <div>
              <div style={{ fontFamily: "'Cinzel', serif", fontSize: 'clamp(11px,2vw,13px)', color: '#C9A558', letterSpacing: '0.1em' }}>{bookMeta.title}</div>
              <div style={{ fontFamily: "'EB Garamond', serif", fontSize: 12, color: '#7C5F48', fontStyle: 'italic' }}>{currentSection.label}</div>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            {avgRating && <span style={{ color: '#C9A558', fontFamily: "'Cinzel', serif", fontSize: 13 }}>★ {avgRating}</span>}
            <button onClick={onClose} style={{ background: 'rgba(201,165,88,0.1)', border: '1px solid rgba(201,165,88,0.25)', color: '#C9A558', borderRadius: 6, padding: '6px 14px', cursor: 'pointer', fontFamily: "'Cinzel', serif", fontSize: 12, letterSpacing: '0.1em' }}>✕ Close</button>
          </div>
        </div>

        {/* Body: TOC sidebar + content */}
        <div style={{ display: 'flex', flex: 1, overflow: 'hidden', minHeight: 0 }}>

          {/* TOC Sidebar */}
          <div style={{ width: 200, borderRight: '1px solid rgba(201,165,88,0.1)', overflowY: 'auto', flexShrink: 0 }} className="book-toc-sidebar">
            {bookSections.map(sec => (
              <button key={sec.id} onClick={() => goTo(sec.id)}
                style={{ display: 'block', width: '100%', textAlign: 'left', padding: '9px 14px', background: activeSection === sec.id ? 'rgba(201,165,88,0.1)' : 'none', border: 'none', borderLeft: activeSection === sec.id ? '2px solid #C9A558' : '2px solid transparent', color: activeSection === sec.id ? '#C9A558' : '#7C5F48', fontFamily: activeSection === sec.id ? "'Cinzel', serif" : "'EB Garamond', serif", fontSize: activeSection === sec.id ? 11 : 14, letterSpacing: activeSection === sec.id ? '0.08em' : 0, cursor: 'pointer', transition: 'all 0.2s', lineHeight: 1.4 }}>
                {sec.label}
              </button>
            ))}
          </div>

          {/* Mobile TOC dropdown */}
          {tocOpen && (
            <div style={{ position: 'absolute', top: 60, left: 0, right: 0, background: '#0d0a02', borderBottom: '1px solid rgba(201,165,88,0.2)', zIndex: 10 }} className="book-toc-mobile">
              {bookSections.map(sec => (
                <button key={sec.id} onClick={() => goTo(sec.id)}
                  style={{ display: 'block', width: '100%', textAlign: 'left', padding: '12px 20px', background: activeSection === sec.id ? 'rgba(201,165,88,0.1)' : 'none', border: 'none', borderLeft: activeSection === sec.id ? '3px solid #C9A558' : '3px solid transparent', color: activeSection === sec.id ? '#C9A558' : '#BA9D7C', fontFamily: "'EB Garamond', serif", fontSize: 16, cursor: 'pointer' }}>
                  {sec.label}
                </button>
              ))}
            </div>
          )}

          {/* Content area */}
          <div ref={contentRef} style={{ flex: 1, overflowY: 'auto', padding: 'clamp(20px,4vw,48px)' }}>
            {currentSection.content.map((block, i) => <BookBlock key={i} block={block} />)}

            {/* Prev / Next */}
            <div style={{ display: 'flex', gap: 12, marginTop: 32, paddingTop: 24, borderTop: '1px solid rgba(201,165,88,0.1)' }}>
              <button onClick={() => navigate(-1)} disabled={currentIndex === 0} className="btn-ghost" style={{ flex: 1, opacity: currentIndex === 0 ? 0.3 : 1, fontSize: 'clamp(11px,2vw,13px)' }}>← Previous</button>
              <button onClick={() => navigate(1)} disabled={currentIndex === bookSections.length - 1} className="btn-gold" style={{ flex: 1, opacity: currentIndex === bookSections.length - 1 ? 0.4 : 1, fontSize: 'clamp(11px,2vw,13px)' }}>
                {currentIndex === bookSections.length - 2 ? 'Finish Reading →' : 'Next →'}
              </button>
            </div>

            {/* Reviews — only after finishing */}
            {hasFinished && (
              <div style={{ marginTop: 40, paddingTop: 32, borderTop: '1px solid rgba(201,165,88,0.15)' }}>
                <h3 style={{ fontFamily: "'Cinzel', serif", fontSize: 'clamp(14px,2.5vw,20px)', color: '#C9A558', letterSpacing: '0.1em', marginBottom: 8 }}>Share Your Thoughts</h3>
                <p style={{ color: '#7C5F48', fontStyle: 'italic', marginBottom: 24, fontSize: 14 }}>Your reflection helps keep this tradition alive</p>

                {!submitted ? (
                  <form onSubmit={handleReviewSubmit} style={{ marginBottom: 32 }}>
                    <div className="form-field">
                      <label className="field-label">Your Name (optional)</label>
                      <input type="text" placeholder="How would you like to be known?" value={reviewForm.name} onChange={e => setReviewForm(f => ({ ...f, name: e.target.value }))} className="afia-input-plain" />
                    </div>
                    <div className="form-field">
                      <label className="field-label">Your Rating</label>
                      <StarRating value={reviewForm.rating} onChange={r => { setReviewForm(f => ({ ...f, rating: r })); setReviewError(''); }} />
                    </div>
                    <div className="form-field">
                      <label className="field-label">Your Comment</label>
                      <textarea placeholder="What will you carry forward from this book?" value={reviewForm.comment} onChange={e => { setReviewForm(f => ({ ...f, comment: e.target.value })); setReviewError(''); }} className="afia-input-plain" rows={3} style={{ resize: 'vertical', minHeight: 80 }} />
                    </div>
                    {reviewError && <div className="error-msg" style={{ marginBottom: 14 }}>{reviewError}</div>}
                    <button type="submit" className="btn-gold" disabled={submitting}>{submitting ? 'Submitting...' : 'Submit Review'}</button>
                  </form>
                ) : (
                  <div style={{ textAlign: 'center', padding: '24px', background: 'rgba(201,165,88,0.05)', borderRadius: 10, marginBottom: 32 }}>
                    <div style={{ fontSize: 28, marginBottom: 10 }}>✨</div>
                    <p style={{ fontFamily: "'Cinzel', serif", color: '#C9A558', fontSize: 14 }}>Thank you for your reflection.</p>
                  </div>
                )}

                {reviews.length > 0 && (
                  <>
                    <div style={{ fontFamily: "'Cinzel', serif", fontSize: 11, letterSpacing: '0.18em', color: '#9E7D42', textTransform: 'uppercase', marginBottom: 16 }}>Reader Reflections</div>
                    {reviews.map(rev => {
                      const d = rev.createdAt?.toDate?.() || (rev.createdAt ? new Date(rev.createdAt) : null);
                      return (
                        <div key={rev.id} style={{ background: 'rgba(201,165,88,0.04)', border: '1px solid rgba(201,165,88,0.1)', borderRadius: 8, padding: '16px 20px', marginBottom: 12 }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8, marginBottom: 8 }}>
                            <span style={{ fontFamily: "'Cinzel', serif", fontSize: 13, color: '#EDD9BC' }}>{rev.name}</span>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                              <StarRating value={rev.rating} readOnly />
                              {d && <span style={{ fontSize: 11, color: '#7C5F48' }}>{d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>}
                            </div>
                          </div>
                          <p style={{ fontFamily: "'EB Garamond', serif", fontSize: 18, color: '#BA9D7C', lineHeight: 1.75, fontStyle: 'italic' }}>"{rev.comment}"</p>
                        </div>
                      );
                    })}
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 640px) {
          .book-toc-sidebar { display: none !important; }
          .toc-toggle-btn { display: block !important; }
        }
      `}</style>
    </div>
  );
}

// ── Admin Story Card ──────────────────────────────────────────────────────────

function StoryCard({ story }) {
  const [expanded, setExpanded] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [form, setForm] = useState({ name: '', rating: 0, comment: '' });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formError, setFormError] = useState('');

  const isShort = !story.content || story.content.length <= 300;
  const preview = story.content?.length > 300 ? story.content.slice(0, 300) + '…' : story.content;
  const date = story.createdAt?.toDate?.() || (story.createdAt ? new Date(story.createdAt) : null);
  const hasLinks = story.socialLinks?.length > 0;
  const showReviews = expanded || isShort;

  // Load this story's reviews from Firestore
  useEffect(() => {
    if (!showReviews) return;
    const q = query(
      collection(db, 'storyReviews'),
      where('storyId', '==', story.id),
      orderBy('createdAt', 'desc')
    );
    const unsub = onSnapshot(q, snap => setReviews(snap.docs.map(d => ({ id: d.id, ...d.data() }))));
    return () => unsub();
  }, [story.id, showReviews]);

  const avgRating = reviews.length
    ? (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1)
    : null;

  async function handleSubmit(e) {
    e.preventDefault();
    if (!form.rating) { setFormError('Please select a star rating.'); return; }
    if (!form.comment.trim()) { setFormError('Please write a comment.'); return; }
    setSubmitting(true);
    try {
      await addDoc(collection(db, 'storyReviews'), {
        storyId: story.id,
        storyTitle: story.title || story.type,
        name: form.name.trim() || 'Anonymous',
        rating: form.rating,
        comment: form.comment.trim(),
        createdAt: serverTimestamp(),
      });
      await notifyAfiaBookFeedback({
        name: form.name || 'Anonymous',
        rating: form.rating,
        comment: form.comment,
        book_title: story.title || `a ${story.type}`,
      }).catch(() => {});
      setSubmitted(true);
    } catch {
      setFormError('Failed to submit. Please try again.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="story-card">
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12, flexWrap: 'wrap' }}>
        <span className="story-card-category">{story.type === 'proverb' ? 'Proverb' : 'Story'}</span>
        {date && <span style={{ fontSize: 12, color: '#7C5F48' }}>{date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</span>}
        {avgRating && (
          <span style={{ marginLeft: 'auto', fontFamily: "'Cinzel', serif", fontSize: 12, color: '#C9A558' }}>
            ★ {avgRating} <span style={{ color: '#7C5F48', fontSize: 11 }}>({reviews.length})</span>
          </span>
        )}
      </div>

      {story.title && <h2 className="story-card-title">{story.title}</h2>}

      <p className="story-card-preview" style={{ fontStyle: story.type === 'proverb' ? 'italic' : 'normal' }}>
        {expanded || isShort ? story.content : preview}
      </p>

      {!isShort && (
        <button className="story-card-read" onClick={() => setExpanded(!expanded)}>
          {expanded ? '← Read Less' : 'Read Full Story →'}
        </button>
      )}

      {/* Social links */}
      {hasLinks && (
        <div style={{ marginTop: 20, paddingTop: 16, borderTop: '1px solid rgba(201,165,88,0.12)' }}>
          <p style={{ fontFamily: "'EB Garamond', serif", fontSize: 18, color: '#BA9D7C', fontStyle: 'italic', marginBottom: 12 }}>
            To listen to more stories like this,{' '}
            {story.socialLinks.length === 1 ? (
              <a href={story.socialLinks[0].url} target="_blank" rel="noopener noreferrer"
                style={{ color: '#C9A558', textDecoration: 'underline' }}>
                click here
              </a>
            ) : 'click the links below:'}
          </p>
          {story.socialLinks.length > 1 && (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
              {story.socialLinks.map((link, i) => (
                <a key={i} href={link.url} target="_blank" rel="noopener noreferrer"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'rgba(201,165,88,0.1)', border: '1px solid rgba(201,165,88,0.25)', color: '#C9A558', padding: '7px 14px', borderRadius: 6, fontFamily: "'Cinzel', serif", fontSize: 11, letterSpacing: '0.1em', textDecoration: 'none', transition: 'all 0.2s' }}
                  onMouseEnter={e => { e.currentTarget.style.background = 'rgba(201,165,88,0.2)'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'rgba(201,165,88,0.1)'; }}>
                  ↗ {link.label}
                </a>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Ratings & feedback — shown after full content is visible */}
      {showReviews && (
        <div style={{ marginTop: 28, paddingTop: 24, borderTop: '1px solid rgba(201,165,88,0.1)' }}>
          <h4 style={{ fontFamily: "'Cinzel', serif", fontSize: 13, color: '#C9A558', letterSpacing: '0.12em', marginBottom: 6, textTransform: 'uppercase' }}>
            Share Your Thoughts
          </h4>
          <p style={{ color: '#7C5F48', fontStyle: 'italic', fontSize: 13, marginBottom: 20 }}>
            What did this {story.type} stir in you?
          </p>

          {!submitted ? (
            <form onSubmit={handleSubmit}>
              <div className="form-field">
                <label className="field-label">Your Name (optional)</label>
                <input type="text" placeholder="Anonymous" value={form.name}
                  onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                  className="afia-input-plain" />
              </div>
              <div className="form-field">
                <label className="field-label">Your Rating</label>
                <StarRating value={form.rating} onChange={r => { setForm(f => ({ ...f, rating: r })); setFormError(''); }} />
              </div>
              <div className="form-field">
                <label className="field-label">Your Comment</label>
                <textarea placeholder="Leave your reflection..." value={form.comment}
                  onChange={e => { setForm(f => ({ ...f, comment: e.target.value })); setFormError(''); }}
                  className="afia-input-plain" rows={3} style={{ resize: 'vertical', minHeight: 80 }} />
              </div>
              {formError && <div className="error-msg" style={{ marginBottom: 14 }}>{formError}</div>}
              <button type="submit" className="btn-gold" style={{ width: 'auto', padding: '10px 28px' }} disabled={submitting}>
                {submitting ? 'Submitting...' : 'Submit'}
              </button>
            </form>
          ) : (
            <div style={{ textAlign: 'center', padding: '20px', background: 'rgba(201,165,88,0.05)', borderRadius: 10, marginBottom: 20 }}>
              <div style={{ fontSize: 24, marginBottom: 8 }}>✨</div>
              <p style={{ fontFamily: "'Cinzel', serif", color: '#C9A558', fontSize: 13 }}>Thank you for sharing.</p>
            </div>
          )}

          {reviews.length > 0 && (
            <div style={{ marginTop: 24 }}>
              <div style={{ fontFamily: "'Cinzel', serif", fontSize: 10, letterSpacing: '0.18em', color: '#9E7D42', textTransform: 'uppercase', marginBottom: 14 }}>
                Reflections ({reviews.length})
              </div>
              {reviews.map(rev => {
                const d = rev.createdAt?.toDate?.() || (rev.createdAt ? new Date(rev.createdAt) : null);
                return (
                  <div key={rev.id} style={{ background: 'rgba(201,165,88,0.04)', border: '1px solid rgba(201,165,88,0.1)', borderRadius: 8, padding: '14px 18px', marginBottom: 10 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8, marginBottom: 8 }}>
                      <span style={{ fontFamily: "'Cinzel', serif", fontSize: 13, color: '#EDD9BC' }}>{rev.name}</span>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <StarRating value={rev.rating} readOnly />
                        {d && <span style={{ fontSize: 11, color: '#7C5F48' }}>{d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>}
                      </div>
                    </div>
                    <p style={{ fontFamily: "'EB Garamond', serif", fontSize: 18, color: '#BA9D7C', lineHeight: 1.75, fontStyle: 'italic' }}>"{rev.comment}"</p>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ── Main Stories Page ─────────────────────────────────────────────────────────

export default function StoriesPage() {
  const [bookOpen, setBookOpen] = useState(false);
  const [adminStories, setAdminStories] = useState([]);

  useEffect(() => {
    const q = query(collection(db, 'stories'), orderBy('createdAt', 'desc'));
    return onSnapshot(q, snap => setAdminStories(snap.docs.map(d => ({ id: d.id, ...d.data() }))));
  }, []);

  // Prevent body scroll when book modal open
  useEffect(() => {
    document.body.style.overflow = bookOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [bookOpen]);

  return (
    <div className="page-wrapper">
      <section style={{ padding: '80px 20px 48px', textAlign: 'center' }}>
        <h1 className="section-title" style={{ fontSize: 'clamp(28px,6vw,48px)' }}>Stories</h1>
        <p className="section-subtitle">Ancient wisdom for the modern soul</p>
      </section>

      <div style={{ height: 1, background: 'linear-gradient(to right,transparent,rgba(201,165,88,0.3),transparent)', maxWidth: 400, margin: '0 auto 56px' }} />

      {/* Book Card */}
      <section style={{ padding: '0 20px 64px' }}>
        <div style={{ maxWidth: 860, margin: '0 auto' }}>
          <div style={{ fontFamily: "'Cinzel', serif", fontSize: 11, letterSpacing: '0.22em', color: '#9E7D42', textTransform: 'uppercase', marginBottom: 20, textAlign: 'center' }}>
            Featured Book
          </div>
          <div onClick={() => setBookOpen(true)}
            style={{ cursor: 'pointer', background: 'linear-gradient(135deg, #1C0E04 0%, #0d0a02 60%, #1C0E04 100%)', border: '1px solid rgba(201,165,88,0.25)', borderRadius: 12, padding: 'clamp(24px,5vw,48px)', display: 'flex', gap: 'clamp(20px,4vw,40px)', alignItems: 'center', flexWrap: 'wrap', transition: 'all 0.3s ease', boxShadow: '0 4px 32px rgba(0,0,0,0.5)' }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = '#C9A558'; e.currentTarget.style.boxShadow = '0 8px 48px rgba(201,165,88,0.15)'; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(201,165,88,0.25)'; e.currentTarget.style.boxShadow = '0 4px 32px rgba(0,0,0,0.5)'; }}>

            {/* Book spine visual */}
            <div style={{ position: 'relative', flexShrink: 0, width: 'clamp(80px,15vw,130px)', height: 'clamp(100px,20vw,180px)' }}>
              <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 'clamp(10px,2vw,18px)', background: 'linear-gradient(135deg,#9E7D42,#C9A558,#9E7D42)', borderRadius: '4px 0 0 4px' }} />
              <div style={{ marginLeft: 'clamp(10px,2vw,18px)', height: '100%', background: 'linear-gradient(160deg,#2a1f00,#231510)', border: '1px solid rgba(201,165,88,0.3)', borderLeft: 'none', borderRadius: '0 6px 6px 0', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '12px 8px', gap: 8 }}>
                <div style={{ fontSize: 'clamp(20px,4vw,36px)' }}>📖</div>
                <div style={{ fontFamily: "'Cinzel', serif", fontSize: 'clamp(8px,1.5vw,11px)', color: '#C9A558', letterSpacing: '0.1em', textAlign: 'center', lineHeight: 1.5 }}>AKAN<br/>HERITAGE</div>
              </div>
            </div>

            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontFamily: "'Cinzel', serif", fontSize: 'clamp(10px,2vw,12px)', letterSpacing: '0.18em', color: '#9E7D42', textTransform: 'uppercase', marginBottom: 10 }}>
                Cultural Guide · 2026
              </div>
              <h2 style={{ fontFamily: "'Cinzel', serif", fontSize: 'clamp(18px,3.5vw,28px)', color: '#C9A558', letterSpacing: '0.06em', lineHeight: 1.35, marginBottom: 10 }}>
                {bookMeta.title}
              </h2>
              <p style={{ fontFamily: "'EB Garamond', serif", fontSize: 'clamp(14px,2vw,17px)', color: '#BA9D7C', fontStyle: 'italic', marginBottom: 16, lineHeight: 1.7 }}>
                {bookMeta.subtitle}
              </p>
              <p style={{ fontFamily: "'Cinzel', serif", fontSize: 'clamp(10px,1.8vw,12px)', color: '#7C5F48', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 20 }}>
                By {bookMeta.author}
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
                <button className="btn-gold" style={{ width: 'auto', padding: 'clamp(10px,2vw,12px) clamp(20px,4vw,32px)', fontSize: 'clamp(11px,2vw,13px)' }}
                  onClick={e => { e.stopPropagation(); setBookOpen(true); }}>
                  Open & Read
                </button>
                <span style={{ fontFamily: "'EB Garamond', serif", fontSize: 14, color: '#7C5F48', fontStyle: 'italic' }}>
                  {bookSections.length} sections · Free to read
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Admin Stories & Proverbs */}
      {adminStories.length > 0 && (
        <section style={{ padding: '0 20px 80px', background: 'rgba(201,165,88,0.02)' }}>
          <div style={{ maxWidth: 860, margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: 40 }}>
              <div style={{ fontFamily: "'Cinzel', serif", fontSize: 10, letterSpacing: '0.22em', color: '#9E7D42', textTransform: 'uppercase', marginBottom: 10 }}>From Mama Africa</div>
              <h2 style={{ fontFamily: "'Cinzel', serif", fontSize: 'clamp(20px,4vw,32px)', color: '#C9A558', letterSpacing: '0.1em' }}>Stories & Proverbs</h2>
            </div>
            {adminStories.map(s => <StoryCard key={s.id} story={s} />)}
          </div>
        </section>
      )}

      {/* Static fallback stories when no admin posts yet */}
      {adminStories.length === 0 && (
        <section className="afia-section">
          {[
            { id: 1, title: "How Anansi Won the World's Stories", category: 'Akan Folklore', content: `Long ago, all the stories in the world belonged to Nyame, the Sky God. No tale could be told on earth without his permission.\n\nKwaku Anansi the spider climbed to the sky and asked Nyame for his stories. Nyame laughed and named a price he believed impossible: Anansi must bring him Onini the Python, Osebo the Leopard, the Mmoboro Hornets, and the invisible fairy Mmoatia.\n\nOne by one, using only his wit, Anansi captured each. He brought them all to Nyame, who was so astounded he gave Anansi every story in the world. That is why, to this day, stories are called "Spider Stories" — Anansesem — in Akan tradition.` },
            { id: 2, title: 'Sankofa: The Bird That Looks Back', category: 'Adinkra Symbols', content: `The Sankofa bird flies forward while looking back — its egg held safely in its mouth. Its name in Akan means: "Go back and get it."\n\nThe full proverb says: "Se wo were fi na wosankofa a yenkyi" — It is not wrong to go back for what you forgot.\n\nSankofa speaks directly to the African diaspora experience. It says to those carried away from their homelands: your roots are not a source of shame. They are the egg you carry in your mouth — precious, intact, ready to bloom in new soil.\n\nAfia, draped in kente and crowned in gold, is herself a living Sankofa: ancient wisdom wearing a contemporary crown.` },
          ].map(s => (
            <div key={s.id} className="story-card">
              <div className="story-card-category">{s.category}</div>
              <h2 className="story-card-title">{s.title}</h2>
              <p className="story-card-preview">{s.content.slice(0, 280)}…</p>
            </div>
          ))}
        </section>
      )}

      {bookOpen && <BookModal onClose={() => setBookOpen(false)} />}
    </div>
  );
}
